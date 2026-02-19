import React, { useEffect, useCallback, useMemo } from "react";
import {
  ComposedChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from "recharts";

import {
  generateColorMap,
  computeNiceMax,
  getMaxDataValue,
  getMinDataValue,
  adaptDataForTooltip as adaptData,
  createValueFormatter,
  createYTickFormatter,
} from "./utils/helpers";
import { cn } from "@/lib/utils";
import {
  Highlights,
  ShowOnly,
  TooltipSimple,
  DraggableTooltip,
  CloseAllButton,
  PeriodsDropdown,
} from "./components";
import HorizontalLegend from "./components/HorizontalLegend";
import ChartTotalLegend from "./components/ChartTotalLegend";
import RechartTooltipWithTotal from "./components/tooltips/TooltipWithTotal";
import { renderInsideBarLabel } from "./utils";
import NoData from "./NoData";
import {
  useChartHighlights,
  useChartDimensions,
  useChartTooltips,
  useChartClick,
} from "./hooks";
import {
  ChartData,
  ChartProps,
  LabelListContent,
  PropsLabelList,
} from "./types/chart.types";
import {
  filtersOrder,
  fnBuildConfigData,
  fnOpenTooltipForPeriod,
  fnSmartConfig,
} from "./utils/filters";

const DEFAULT_COLORS = ["#0d1136", "#666655", "#1a1a1a"];

const HorizontalChart: React.FC<ChartProps> = ({
  data,
  series,
  className,
  height = 500,
  width = "100%",
  colors = DEFAULT_COLORS,
  gridColor,
  showGrid = true,
  showTooltip = true,
  showLegend = true,
  title,
  titlePosition = "left",
  showLabels = false,
  labelsVisibility = { bar: true },
  xAxis,
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
  customLegend,
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

  const processedData = useMemo(() => {
    const mapped = data.map((item) => ({
      ...item,
      name: String(item[xAxisConfig.dataKey] || "N/A"),
    }));

    if (orderBy && mapped.length > 0) {
      return [...mapped].sort((a, b) => {
        const valueA = Number((a as ChartData)[orderBy]) || 0;
        const valueB = Number((b as ChartData)[orderBy]) || 0;
        return valueB - valueA;
      });
    }

    return mapped;
  }, [data, xAxisConfig.dataKey, orderBy]);

  const seriesOrder = filtersOrder(mapperConfig, series!);
  const allKeys = seriesOrder.map((s) => s.key).filter(Boolean);

  const finalColors = useMemo(
    () => generateColorMap(allKeys, colors, mapperConfig),
    [allKeys, colors, mapperConfig],
  );

  const activePeriods = useMemo(
    () =>
      activeTooltips.map((t) => adaptData(t.data, xAxisConfig.dataKey).name),
    [activeTooltips, xAxisConfig.dataKey],
  );

  const maxDataValue = useMemo(() => {
    return getMaxDataValue(processedData, allKeys);
  }, [processedData, allKeys]);

  const minDataValue = useMemo(() => {
    return getMinDataValue(processedData, allKeys);
  }, [processedData, allKeys]);

  const niceMax = useMemo(() => computeNiceMax(maxDataValue), [maxDataValue]);

  const { handleChartClick, handleBarClick } = useChartClick({
    enableDraggableTooltips,
    xAxisDataKey: xAxisConfig.dataKey,
    toggleTooltip,
    setActiveTooltips,
  });

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

  const finalValueFormatter = useMemo(
    () => createValueFormatter(valueFormatter, formatBR),
    [valueFormatter, formatBR],
  );

  const yTickFormatter = useMemo(
    () => createYTickFormatter(finalValueFormatter),
    [finalValueFormatter],
  );
  const CONTAINER_PADDING_LEFT = -6;

  const finalChartRightMargin = chartMargin?.right ?? 0;
  const finalChartLeftMargin = chartMargin?.left ?? 0;

  const HORIZONTAL_PADDING_CLASS = "px-6";

  const effectiveChartWidth =
    typeof width === "number"
      ? width
      : measuredWidth
        ? Math.max(0, measuredWidth - 32)
        : 800;

  const chartInnerWidth =
    effectiveChartWidth - finalChartLeftMargin - finalChartRightMargin;

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

  const seriesTypeMap = useMemo(() => {
    const map: Record<string, string> = {};
    seriesOrder.forEach((s) => {
      map[s.key] = s.type;
    });
    return map;
  }, [seriesOrder]);

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
      <div>
        <NoData
          title={title}
          paddingLeft={CONTAINER_PADDING_LEFT + finalChartLeftMargin}
          height={height}
        />
      </div>
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
          <div
            className={cn("flex items-center gap-2", HORIZONTAL_PADDING_CLASS)}
          >
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
            >
              <PeriodsDropdown
                processedData={processedData}
                onOpenPeriod={openTooltipForPeriod}
                rightOffset={finalChartRightMargin}
              />
            </div>
          )}

        {showLegend && (
          <div className={cn("mb-3", HORIZONTAL_PADDING_CLASS)}>
            <HorizontalLegend
              allKeys={allKeys}
              mapperConfig={mapperConfig}
              finalColors={finalColors}
              labelMap={labelMap}
              legendUppercase={legendUppercase}
            />
          </div>
        )}

        <div
          className={cn(
            "overflow-y-auto overflow-x-hidden px-6",
            "scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent mb-2",
          )}
          style={{
            maxHeight: height,
          }}
        >
          <ResponsiveContainer
            width="100%"
            height={Math.max(height, processedData.length * 50)}
          >
            <ComposedChart
              layout="vertical"
              data={processedData}
              height={Math.max(height, processedData.length * 50)}
              margin={{
                top: 10,
                right: finalChartRightMargin,
                left: 55 + finalChartLeftMargin,
                bottom: 10,
              }}
              onClick={handleChartClick}
            >
              {showGrid && (
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={gridColor || "hsl(var(--muted-foreground))"}
                  opacity={0.5}
                />
              )}

              <XAxis
                type="number"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                orientation="top"
                axisLine={false}
                tickFormatter={yTickFormatter}
                domain={[Math.min(minDataValue, 0), niceMax]}
                label={
                  yAxisLabel
                    ? {
                        value: yAxisLabel,
                        position: "insideTopRight",
                        offset: -1,
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
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={true}
                minTickGap={24}
                axisLine={true}
                tickFormatter={(value) => {
                  if (categoryFormatter)
                    return categoryFormatter(value as string | number);
                  if (xAxisConfig.valueFormatter)
                    return xAxisConfig.valueFormatter(value as string | number);
                  return String(value ?? "");
                }}
                label={
                  xAxisLabel
                    ? {
                        value: xAxisLabel,
                        angle: -90,
                        position: "insideTopLeft",
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

              {showTooltip && (
                <Tooltip
                  content={
                    showTooltipTotal ? (
                      <RechartTooltipWithTotal
                        finalColors={finalColors}
                        valueFormatter={finalValueFormatter}
                        categoryFormatter={categoryFormatter}
                        periodLabel={periodLabel}
                        seriesTypeMap={seriesTypeMap}
                      />
                    ) : (
                      <TooltipSimple
                        finalColors={finalColors}
                        valueFormatter={finalValueFormatter}
                        categoryFormatter={categoryFormatter}
                        periodLabel={periodLabel}
                        seriesTypeMap={seriesTypeMap}
                      />
                    )
                  }
                  cursor={{ fill: "hsl(var(--muted))", opacity: 0.1 }}
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
                  [],
                  null,
                );

                if (s.type === "bar") {
                  return (
                    <Bar
                      key={`bar-${key}`}
                      dataKey={key}
                      name={label}
                      fill={color}
                      radius={[0, 4, 4, 0]}
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
                return null;
              })}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
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
            seriesTypeMap={seriesTypeMap}
          />
        ))}

      {enableDraggableTooltips && activeTooltips.length > 1 && (
        <CloseAllButton
          count={activeTooltips.length}
          onCloseAll={() => window.dispatchEvent(new Event("closeAllTooltips"))}
          position="top-center"
          variant="floating"
        />
      )}
    </div>
  );
};

export default HorizontalChart;
