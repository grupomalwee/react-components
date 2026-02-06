import React, { useEffect, useCallback, useMemo } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  Area,
  Rectangle,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
} from "recharts";

import {
  generateColorMap,
  computeNiceMax,
  getMaxDataValue,
  getMinDataValue,
  computeChartWidth,
  adaptDataForTooltip as adaptData,
  createValueFormatter,
  createYTickFormatter,
  computeYAxisTickWidth,
} from "./utils/helpers";
import { cn } from "@/lib/utils";
import {
  Highlights,
  ShowOnly,
  TooltipSimple,
  DraggableTooltip,
  CloseAllButton,
  PeriodsDropdown,
  Brush,
  HorizontalLegend,
} from "./components";
import ChartTotalLegend from "./components/ChartTotalLegend";
import RechartTooltipWithTotal from "./components/tooltips/TooltipWithTotal";
import { renderPillLabel, renderInsideBarLabel } from "./utils";
import NoData from "./NoData";
import {
  useChartHighlights,
  useChartDimensions,
  useChartTooltips,
  useChartClick,
  useTimeSeriesRange,
  useChartMinMax,
} from "./hooks";
import {
  BiaxialConfig,
  ChartData,
  ChartProps,
  LabelListContent,
  PropsLabelList,
} from "./types/chart.types";
import {
  filtersOrder,
  fnBuildConfigData,
  fnConfigRightKeys,
  fnContentLabelList,
  fnFormatterValueLegend,
  fnOpenTooltipForPeriod,
  fnSmartConfig,
} from "./utils/filters";
import { calcDivision } from "@/utils/calcDivision";

const DEFAULT_COLORS = ["#55af7d", "#8e68ff", "#2273e1"];

const Chart: React.FC<ChartProps> = ({
  data,
  series,
  className,
  height = 350,
  width = "100%",
  colors = DEFAULT_COLORS,
  gridColor,
  showGrid = true,
  showTooltip = true,
  showLegend = true,
  title,
  titlePosition = "left",
  showLabels = false,
  labelsVisibility = { bar: true, line: true, area: true },
  xAxis,
  biaxial,
  xAxisLabel,
  yAxisLabel,
  labelMap,
  valueFormatter,
  categoryFormatter,
  enableHighlights = false,
  enableShowOnly = false,
  enablePeriodsDropdown = false,
  enableDraggableTooltips = false,
  showTooltipTotal = false,
  periodLabel = "Período",
  maxTooltips = 5,
  formatBR = false,
  legendUppercase = false,
  chartMargin,
  isLoading = false,
  timeSeries,
  timeSeriesLegend,
  customLegend,
  horizontal = false,
  orderBy,
}) => {
  const { xAxisConfig, mapperConfig } = useMemo(() => {
    return fnSmartConfig({ xAxis, data, labelMap });
  }, [data, xAxis, labelMap]);

  const {
    highlightedSeries,
    showOnlyHighlighted,
    toggleHighlight,
    setShowOnlyHighlighted,
    clearHighlights,
  } = useChartHighlights();

  const { wrapperRef, measuredWidth } = useChartDimensions();

  const {
    activeTooltips,
    toggleTooltip,
    onTooltipPositionChange,
    setActiveTooltips,
  } = useChartTooltips(maxTooltips);

  useEffect(() => {
    if (highlightedSeries.size === 0 && showOnlyHighlighted) {
      setShowOnlyHighlighted(false);
    }
  }, [highlightedSeries, showOnlyHighlighted, setShowOnlyHighlighted]);

  const timeSeriesConfig = useMemo(() => {
    if (typeof timeSeries === "boolean") {
      return timeSeries ? {} : undefined;
    }
    return timeSeries;
  }, [timeSeries]);

  const { startIndex, endIndex, brushRef, handleMouseDown } =
    useTimeSeriesRange({
      dataLength: data.length,
      defaultStartIndex: timeSeriesConfig?.start,
      defaultEndIndex: timeSeriesConfig?.end,
      onRangeChange: timeSeriesConfig?.onRangeChange,
    });

  const { maxPeriodLabel, minPeriodLabel } = useChartMinMax({
    processedData: data,
    orderBy,
    xAxisDataKey: xAxisConfig.dataKey,
    categoryFormatter,
  });

  const processedData = useMemo(() => {
    const mapped = data.map((item) => ({
      ...item,
      name: String(item[xAxisConfig.dataKey] || "N/A"),
    }));
    let result = mapped;

    if (timeSeriesConfig) {
      result = mapped.slice(startIndex, endIndex + 1);
    }

    if (orderBy && horizontal) {
      result = [...result].sort((a, b) => {
        const valueA = Number((a as ChartData)[orderBy]) || 0;
        const valueB = Number((b as ChartData)[orderBy]) || 0;
        return valueB - valueA;
      });
    }

    return result;
  }, [
    data,
    xAxisConfig.dataKey,
    timeSeriesConfig,
    startIndex,
    endIndex,
    orderBy,
    horizontal,
  ]);

  const seriesOrder = filtersOrder(mapperConfig, series!);

  const allKeys = seriesOrder.map((s) => s.key).filter(Boolean);

  const seriesTypeMap = useMemo(() => {
    const map: Record<string, string> = {};
    seriesOrder.forEach((s) => {
      map[s.key] = s.type;
    });
    return map;
  }, [seriesOrder]);

  const finalColors = useMemo(
    () => generateColorMap(allKeys, colors, mapperConfig),
    [allKeys, colors, mapperConfig],
  );

  const biaxialConfigNormalized = useMemo(() => {
    if (!biaxial) return null;
    if (typeof biaxial === "string") return { key: [biaxial] };
    if (Array.isArray(biaxial)) return { key: biaxial };
    return biaxial;
  }, [biaxial]) as BiaxialConfig | null;

  useMemo(() => {
    if (!biaxialConfigNormalized) return;
    const leftLabelMissing = !yAxisLabel || String(yAxisLabel).trim() === "";
    const rightLabelMissing =
      !biaxialConfigNormalized.label ||
      String(biaxialConfigNormalized.label).trim() === "";
    if (leftLabelMissing || rightLabelMissing) {
      throw new Error(
        "When using `biaxial`, you must provide both `yAxisLabel` (left axis) and `biaxial.label` (right axis).",
      );
    }
  }, [biaxialConfigNormalized, yAxisLabel]);

  const rightKeys = useMemo(
    () => biaxialConfigNormalized?.key ?? [],
    [biaxialConfigNormalized],
  );
  const leftKeys = useMemo(
    () => allKeys.filter((k) => !rightKeys.includes(k)),
    [allKeys, rightKeys],
  );

  const activePeriods = useMemo(
    () =>
      activeTooltips.map((t) => adaptData(t.data, xAxisConfig.dataKey).name),
    [activeTooltips, xAxisConfig.dataKey],
  );

  const maxLeftDataValue = useMemo(() => {
    const numericKeys = leftKeys.length > 0 ? leftKeys : allKeys;
    return getMaxDataValue(processedData, numericKeys);
  }, [processedData, leftKeys, allKeys]);

  const minLeftDataValue = useMemo(() => {
    const numericKeys = leftKeys.length > 0 ? leftKeys : allKeys;
    return getMinDataValue(processedData, numericKeys);
  }, [processedData, leftKeys, allKeys]);

  const maxRightDataValue = useMemo(() => {
    if (rightKeys.length === 0) return 0;
    return getMaxDataValue(processedData, rightKeys);
  }, [processedData, rightKeys]);

  const minRightDataValue = useMemo(() => {
    if (rightKeys.length === 0) return 0;
    return getMinDataValue(processedData, rightKeys);
  }, [processedData, rightKeys]);

  const niceMaxLeft = useMemo(
    () => computeNiceMax(maxLeftDataValue),
    [maxLeftDataValue],
  );
  const niceMaxRight = useMemo(
    () => computeNiceMax(maxRightDataValue),
    [maxRightDataValue],
  );

  const computedWidth = useMemo(
    () =>
      computeChartWidth(
        width,
        processedData.length,
        series,
        niceMaxLeft,
        niceMaxRight,
      ),
    [width, processedData.length, series, niceMaxLeft, niceMaxRight],
  );

  const { handleChartClick, handleBarClick, handleSeriesClick } = useChartClick(
    {
      enableDraggableTooltips,
      xAxisDataKey: xAxisConfig.dataKey,
      toggleTooltip,
      setActiveTooltips,
    },
  );

  const getSeriesOpacity = useCallback(
    (key: string) => {
      return highlightedSeries.size > 0
        ? highlightedSeries.has(key)
          ? 1
          : 0.25
        : 1;
    },
    [highlightedSeries],
  );

  const createFormatterForKey = useCallback(
    (dataKey: string) => {
      return createValueFormatter(valueFormatter, formatBR, dataKey);
    },
    [valueFormatter, formatBR],
  );

  const finalValueFormatter = useMemo(() => {
    const baseFormatter = createValueFormatter(valueFormatter, formatBR);
    return (props: {
      value: number | string | undefined;
      formattedValue: string;
      dataKey?: string;
      [key: string]: unknown;
    }) => {
      const isLine = props.dataKey && seriesTypeMap[props.dataKey] === "line";
      if (isLine) {
        const numValue =
          typeof props.value === "number"
            ? props.value
            : typeof props.value === "string"
              ? parseFloat(props.value)
              : 0;
        const percentage = calcDivision(numValue, 100);
        const formattedPercentage =
          typeof percentage === "number"
            ? percentage.toFixed(1).replace(".", ",")
            : String(percentage).replace(".", ",");
        return `${formattedPercentage}%`;
      }
      if (props.dataKey) {
        const keyFormatter = createFormatterForKey(props.dataKey);
        if (keyFormatter) {
          return keyFormatter(props);
        }
      }

      return baseFormatter ? baseFormatter(props) : props.formattedValue;
    };
  }, [valueFormatter, formatBR, seriesTypeMap, createFormatterForKey]);

  const yTickFormatter = useMemo(
    () => createYTickFormatter(finalValueFormatter),
    [finalValueFormatter],
  );

  const AXIS_LABEL_MARGIN = 56;
  const CONTAINER_PADDING_LEFT = -6;

  const finalChartRightMargin =
    chartMargin?.right ?? (rightKeys.length > 0 ? AXIS_LABEL_MARGIN : 30);
  const finalChartLeftMargin =
    chartMargin?.left ?? (yAxisLabel ? AXIS_LABEL_MARGIN : 0);

  const yAxisTickWidth = useMemo(
    () =>
      computeYAxisTickWidth(
        chartMargin?.left,
        yAxisLabel,
        AXIS_LABEL_MARGIN,
        yTickFormatter,
        minLeftDataValue,
        niceMaxLeft,
      ),
    [
      chartMargin?.left,
      yAxisLabel,
      yTickFormatter,
      minLeftDataValue,
      niceMaxLeft,
    ],
  );
  const HORIZONTAL_PADDING_CLASS = "px-24";
  const teste = "pl-24 pr-4";

  const effectiveChartWidth =
    typeof width === "number"
      ? width
      : measuredWidth
        ? Math.max(0, measuredWidth - 32)
        : computedWidth;
  const chartInnerWidth =
    effectiveChartWidth - finalChartLeftMargin - finalChartRightMargin;

  const leftYAxisLabelDx = -Math.max(12, Math.round(yAxisTickWidth / 2));
  const rightYAxisLabelDx = Math.max(12, Math.round(finalChartRightMargin / 2));

  const openTooltipForPeriod = useCallback(
    (periodName: string) => {
      fnOpenTooltipForPeriod(
        enableDraggableTooltips,
        processedData,
        periodName,
        activeTooltips,
        setActiveTooltips,
        maxTooltips,
        effectiveChartWidth,
      );
    },
    [
      enableDraggableTooltips,
      processedData,
      activeTooltips,
      effectiveChartWidth,
      maxTooltips,
      setActiveTooltips,
    ],
  );

  if (!data && !isLoading) return null;

  if (isLoading) {
    return (
      <NoData
        title={title}
        isLoading
        loadingMessage={
          typeof title === "string" ? `${title} — Carregando` : "Carregando"
        }
        paddingLeft={CONTAINER_PADDING_LEFT + finalChartLeftMargin}
        height={height}
      />
    );
  }

  if (Array.isArray(data) && data.length === 0) {
    return (
      <NoData
        title={title}
        paddingLeft={CONTAINER_PADDING_LEFT + finalChartLeftMargin}
        height={height}
      />
    );
  }

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "w-full overflow-hidden min-w-0 rounded-lg border-border",
        className,
      )}
    >
      <div className="rounded-lg bg-card relative w-full max-w-full min-w-0 py-1">
        {title && (
          <div
            className={cn(
              "w-full flex items-center mt-3 mb-2",
              HORIZONTAL_PADDING_CLASS,
              titlePosition === "center" && "justify-center",
              titlePosition === "right" && "justify-end",
              titlePosition === "left" && "justify-start",
            )}
          >
            <div className="text-[1.4rem] font-semibold text-foreground">
              {title}
            </div>
          </div>
        )}

        {customLegend && !!data.length && (
          <div className={cn("px-6 mb-2", HORIZONTAL_PADDING_CLASS)}>
            <ChartTotalLegend
              items={allKeys.map((key) => {
                const values = processedData.map((d) =>
                  Number((d as ChartData)[key] || 0),
                );
                const total = values.reduce((a, b) => a + b, 0);
                const first = values[0] || 0;
                const last = values[values.length - 1] || 0;

                const trendValue =
                  first !== 0 ? Math.round(((last - first) / first) * 100) : 0;

                const formattedTotal = finalValueFormatter
                  ? finalValueFormatter({
                      value: total,
                      formattedValue: String(total),
                    })
                  : new Intl.NumberFormat(formatBR ? "pt-BR" : "en-US").format(
                      total,
                    );

                return {
                  label: mapperConfig[key]?.label || key,
                  value: formattedTotal,
                  color: finalColors[key],
                  trend: {
                    value: Math.abs(trendValue),
                    positive: trendValue >= 0,
                    neutral: trendValue === 0,
                  },
                };
              })}
            />
          </div>
        )}

        {allKeys.length > 0 && (enableHighlights || enableShowOnly) && (
          <div className={cn("flex items-center gap-2", teste)}>
            {enableHighlights && (
              <Highlights
                allKeys={allKeys}
                mapperConfig={mapperConfig}
                finalColors={finalColors}
                highlightedSeries={highlightedSeries}
                toggleHighlight={toggleHighlight}
                containerWidth={chartInnerWidth}
              />
            )}

            {enableShowOnly && (
              <ShowOnly
                showOnlyHighlighted={showOnlyHighlighted}
                setShowOnlyHighlighted={
                  setShowOnlyHighlighted as React.Dispatch<
                    React.SetStateAction<boolean>
                  >
                }
                highlightedSeriesSize={highlightedSeries.size}
                clearHighlights={clearHighlights}
              />
            )}

            {enablePeriodsDropdown && enableDraggableTooltips && (
              <div className="ml-auto flex items-center">
                <PeriodsDropdown
                  processedData={processedData}
                  onOpenPeriod={openTooltipForPeriod}
                  rightOffset={finalChartRightMargin}
                  activePeriods={activePeriods}
                />
              </div>
            )}
          </div>
        )}

        {!(allKeys.length > 0 && (enableHighlights || enableShowOnly)) &&
          enablePeriodsDropdown &&
          enableDraggableTooltips && (
            <div
              className={cn(
                "w-full flex justify-end mb-2",
                HORIZONTAL_PADDING_CLASS,
              )}
              style={{
                paddingRight: `${finalChartRightMargin}px`,
                maxWidth: `${chartInnerWidth}px`,
              }}
            >
              <PeriodsDropdown
                processedData={processedData}
                onOpenPeriod={openTooltipForPeriod}
                rightOffset={finalChartRightMargin}
              />
            </div>
          )}

        {showLegend && horizontal && (
          <HorizontalLegend
            allKeys={allKeys}
            mapperConfig={mapperConfig}
            finalColors={finalColors}
            labelMap={labelMap}
            legendUppercase={legendUppercase}
            orderBy={orderBy}
            maxPeriodLabel={maxPeriodLabel}
            minPeriodLabel={minPeriodLabel}
            className={cn(HORIZONTAL_PADDING_CLASS)}
          />
        )}

        <div
          className={cn(
            horizontal && "overflow-y-auto overflow-x-hidden px-6",
            horizontal &&
              "scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent",
          )}
          style={{
            maxHeight: horizontal ? height : undefined,
          }}
        >
          <ResponsiveContainer
            width="100%"
            height={
              horizontal ? Math.max(height, processedData.length * 50) : height
            }
          >
            <ComposedChart
              data={processedData}
              height={
                horizontal
                  ? Math.max(height, processedData.length * 50)
                  : height
              }
              layout={horizontal ? "vertical" : "horizontal"}
              margin={{
                top: 10,
                right: finalChartRightMargin,
                left: finalChartLeftMargin,
                bottom: 10,
              }}
              onClick={handleChartClick}
            >
              <defs>
                {seriesOrder
                  .filter((s) => s.type === "area")
                  .map((s) => {
                    const key = s.key;
                    const color = finalColors[key];
                    return (
                      <linearGradient
                        key={`gradient-${key}`}
                        id={`gradient-${key}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="0.8"
                      >
                        <stop offset="0%" stopColor={color} stopOpacity={0.8} />
                        <stop
                          offset="90%"
                          stopColor={color}
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    );
                  })}
              </defs>
              {showGrid && (
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={gridColor || "hsl(var(--muted-foreground))"}
                  opacity={0.5}
                />
              )}
              {horizontal ? (
                <>
                  <XAxis
                    type="number"
                    orientation="top"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={yTickFormatter}
                    domain={[Math.min(minLeftDataValue, 0), niceMaxLeft]}
                    tickCount={6}
                    label={
                      yAxisLabel
                        ? {
                            value: yAxisLabel,
                            position: "insideTopRight",
                            offset: -5,
                            style: {
                              fontSize: 12,
                              fill: "hsl(var(--muted-foreground))",
                              fontWeight: 500,
                            },
                          }
                        : undefined
                    }
                  />
                  <YAxis
                    type="category"
                    dataKey={xAxisConfig.dataKey}
                    yAxisId="left"
                    width={yAxisTickWidth}
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => {
                      if (categoryFormatter)
                        return categoryFormatter(value as string | number);
                      if (xAxisConfig.valueFormatter)
                        return xAxisConfig.valueFormatter(
                          value as string | number,
                        );
                      return String(value ?? "");
                    }}
                    label={
                      xAxisLabel
                        ? {
                            value: xAxisLabel,
                            angle: -90,
                            position: "insideTop",
                            dx: leftYAxisLabelDx,
                            style: {
                              fontSize: 12,
                              fill: "hsl(var(--muted-foreground))",
                              fontWeight: 500,
                              textAnchor: "middle",
                            },
                          }
                        : undefined
                    }
                  />
                </>
              ) : (
                <>
                  <XAxis
                    dataKey={xAxisConfig.dataKey}
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => {
                      if (categoryFormatter)
                        return categoryFormatter(value as string | number);
                      if (xAxisConfig.valueFormatter)
                        return xAxisConfig.valueFormatter(
                          value as string | number,
                        );
                      return String(value ?? "");
                    }}
                    label={
                      xAxisLabel
                        ? {
                            value: xAxisLabel,
                            position: "insideBottomRight",
                            offset: -5,
                            style: {
                              fontSize: 12,
                              fill: "hsl(var(--muted-foreground))",
                              fontWeight: 500,
                            },
                          }
                        : undefined
                    }
                  />
                  <YAxis
                    yAxisId="left"
                    width={yAxisTickWidth}
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={yTickFormatter}
                    domain={[Math.min(minLeftDataValue, 0), niceMaxLeft]}
                    tickCount={6}
                    label={
                      yAxisLabel
                        ? {
                            value: yAxisLabel,
                            angle: -90,
                            position: "left",
                            dx: leftYAxisLabelDx,
                            style: {
                              fontSize: 12,
                              fill: "hsl(var(--muted-foreground))",
                              fontWeight: 500,
                              textAnchor: "middle",
                            },
                          }
                        : undefined
                    }
                  />
                </>
              )}
              {minLeftDataValue < 0 && (
                <ReferenceLine
                  y={0}
                  yAxisId="left"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={1}
                  strokeDasharray="4 4"
                />
              )}

              {rightKeys.length > 0 &&
                (() => {
                  const { rightAxisColor, rightTickFormatter } =
                    fnConfigRightKeys(
                      biaxialConfigNormalized,
                      yTickFormatter,
                      finalColors,
                    );

                  return (
                    <YAxis
                      yAxisId="right"
                      width={finalChartRightMargin}
                      orientation="right"
                      stroke={"hsl(var(--muted-foreground))"}
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: rightAxisColor }}
                      tickFormatter={rightTickFormatter}
                      domain={[Math.min(minRightDataValue, 0), niceMaxRight]}
                      tickCount={6}
                      label={
                        biaxialConfigNormalized?.label
                          ? {
                              value: biaxialConfigNormalized.label,
                              angle: -90,
                              position: "right",
                              dx: rightYAxisLabelDx,
                              style: {
                                fontSize: 12,
                                fill: "hsl(var(--muted-foreground))",
                                fontWeight: 500,
                                textAnchor: "middle",
                              },
                            }
                          : undefined
                      }
                    />
                  );
                })()}

              {showTooltip && (
                <Tooltip
                  content={
                    showTooltipTotal ? (
                      <RechartTooltipWithTotal
                        finalColors={finalColors}
                        valueFormatter={finalValueFormatter}
                        categoryFormatter={categoryFormatter}
                        periodLabel={periodLabel}
                      />
                    ) : (
                      <TooltipSimple
                        finalColors={finalColors}
                        valueFormatter={finalValueFormatter}
                        categoryFormatter={categoryFormatter}
                        periodLabel={periodLabel}
                      />
                    )
                  }
                  cursor={{ fill: "hsl(var(--muted))", opacity: 0.1 }}
                />
              )}
              {showLegend && !horizontal && (
                <Legend
                  iconSize={12}
                  formatter={(value) => {
                    return (
                      <span className="tracking-[0] rounded-sm">
                        {fnFormatterValueLegend(
                          value,
                          mapperConfig,
                          labelMap,
                          legendUppercase,
                        )}
                      </span>
                    );
                  }}
                />
              )}
              {seriesOrder.map((s) => {
                if (showOnlyHighlighted && !highlightedSeries.has(s.key))
                  return null;

                const { label, color, key } = fnBuildConfigData(
                  s,
                  mapperConfig,
                  labelMap,
                  finalColors,
                  rightKeys,
                  biaxialConfigNormalized,
                );

                if (s.type === "bar") {
                  return (
                    <Bar
                      key={`bar-${key}`}
                      dataKey={key}
                      yAxisId={rightKeys.includes(key) ? "right" : "left"}
                      name={label}
                      fill={color}
                      radius={horizontal ? [0, 4, 4, 0] : [4, 4, 0, 0]}
                      onClick={handleBarClick}
                      className="cursor-pointer"
                      style={{ opacity: getSeriesOpacity(key) }}
                      activeBar={
                        <Rectangle
                          fill={color}
                          stroke={color}
                          strokeWidth={2}
                          opacity={0.8}
                        />
                      }
                    >
                      {(showLabels &&
                        labelsVisibility.bar !== false &&
                        highlightedSeries.size === 0) ||
                      highlightedSeries.has(key) ? (
                        <LabelList
                          dataKey={key}
                          content={(props: PropsLabelList) => {
                            if (!fnContentLabelList(props)) return null;

                            const inside = renderInsideBarLabel(
                              color,
                              finalValueFormatter,
                            ) as LabelListContent;

                            return inside(props as unknown);
                          }}
                          offset={0}
                        />
                      ) : null}
                    </Bar>
                  );
                }
                if (s.type === "line") {
                  const lineFormatter = (props: {
                    value: number | string | undefined;
                    formattedValue: string;
                    [key: string]: unknown;
                  }) => {
                    const numValue =
                      typeof props.value === "number"
                        ? props.value
                        : typeof props.value === "string"
                          ? parseFloat(props.value)
                          : 0;
                    const percentage = calcDivision(numValue, 100);
                    const formattedPercentage =
                      typeof percentage === "number"
                        ? percentage.toFixed(1).replace(".", ",")
                        : String(percentage).replace(".", ",");
                    return `${formattedPercentage}%`;
                  };

                  return (
                    <Line
                      key={`line-${key}`}
                      dataKey={key}
                      yAxisId={rightKeys.includes(key) ? "right" : "left"}
                      name={label}
                      stroke={color}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 6 }}
                      onClick={handleSeriesClick}
                      className="cursor-pointer pointer-events-auto"
                      style={{ opacity: getSeriesOpacity(key) }}
                    >
                      {(showLabels &&
                        labelsVisibility.line !== false &&
                        highlightedSeries.size === 0) ||
                      highlightedSeries.has(key) ? (
                        <LabelList
                          dataKey={key}
                          position="top"
                          content={
                            renderPillLabel(
                              color,
                              "filled",
                              lineFormatter,
                            ) as LabelListContent
                          }
                          offset={14}
                        />
                      ) : null}
                    </Line>
                  );
                }
                if (s.type === "area") {
                  return (
                    <Area
                      key={`area-${key}`}
                      type="monotone"
                      dataKey={key}
                      yAxisId={rightKeys.includes(key) ? "right" : "left"}
                      name={label}
                      stroke={color}
                      fill={`url(#gradient-${key})`}
                      fillOpacity={1}
                      strokeWidth={2}
                      onClick={handleSeriesClick}
                      className="cursor-pointer pointer-events-auto"
                      style={{ opacity: getSeriesOpacity(key) }}
                      activeDot={{
                        r: 6,
                        fill: color,
                        stroke: "hsl(var(--background))",
                        strokeWidth: 2,
                      }}
                    >
                      {(showLabels &&
                        labelsVisibility.area !== false &&
                        highlightedSeries.size === 0) ||
                      highlightedSeries.has(key) ? (
                        <LabelList
                          dataKey={key}
                          position="top"
                          content={
                            renderPillLabel(
                              color,
                              "soft",
                              finalValueFormatter,
                            ) as LabelListContent
                          }
                          offset={12}
                        />
                      ) : null}
                    </Area>
                  );
                }
                return null;
              })}
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {enableDraggableTooltips &&
          activeTooltips.map((tooltip) => (
            <DraggableTooltip
              key={tooltip.id}
              id={tooltip.id}
              data={adaptData(tooltip.data, xAxisConfig.dataKey)}
              position={tooltip.position}
              title={title}
              dataKeys={allKeys}
              finalColors={finalColors}
              highlightedSeries={highlightedSeries}
              toggleHighlight={toggleHighlight}
              showOnlyHighlighted={showOnlyHighlighted}
              onClose={(id) =>
                setActiveTooltips((prev) => prev.filter((t) => t.id !== id))
              }
              onPositionChange={onTooltipPositionChange}
              periodLabel={periodLabel}
              dataLabel="Dados do Período"
              valueFormatter={finalValueFormatter}
              categoryFormatter={categoryFormatter}
              globalTooltipCount={activeTooltips.length}
              onCloseAll={() =>
                window.dispatchEvent(new Event("closeAllTooltips"))
              }
              closeAllButtonPosition="top-center"
              closeAllButtonVariant="floating"
            />
          ))}

        {enableDraggableTooltips && activeTooltips.length > 1 && (
          <CloseAllButton
            count={activeTooltips.length}
            onCloseAll={() =>
              window.dispatchEvent(new Event("closeAllTooltips"))
            }
            position="top-center"
            variant="floating"
          />
        )}

        {timeSeriesConfig && (
          <Brush
            legend={timeSeriesLegend}
            data={data}
            startIndex={startIndex}
            endIndex={endIndex}
            onMouseDown={handleMouseDown}
            brushRef={brushRef}
            xAxisKey={xAxisConfig.dataKey}
            seriesOrder={seriesOrder}
            finalColors={finalColors}
            brushHeight={timeSeriesConfig.height}
            brushColor={timeSeriesConfig.brushColor}
            miniChartOpacity={timeSeriesConfig.miniChartOpacity}
            showGrid={showGrid}
            gridColor={gridColor}
            margin={{
              left: finalChartLeftMargin,
              right: finalChartRightMargin,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Chart;
