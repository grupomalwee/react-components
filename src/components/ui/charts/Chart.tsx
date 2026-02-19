import React, { useEffect, useMemo } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  Area,
  Rectangle,
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
} from "./utils/helpers";
import { cn } from "@/lib/utils";
import {
  TooltipSimple,
  DraggableTooltip,
  CloseAllButton,
  PeriodsDropdown,
  Brush,
} from "./components";
import RechartTooltipWithTotal from "./components/tooltips/TooltipWithTotal";
import { renderPillLabel, renderInsideBarLabel } from "./utils";
import NoData from "./NoData";
import {
  useChartHighlights,
  useChartDimensions,
  useChartTooltips,
  useChartClick,
  useTimeSeriesRange,
  useProcessedData,
  useBiaxial,
  useChartLayout,
  useSeriesOpacity,
  useOpenTooltipForPeriod,
} from "./hooks";
import ChartHeader from "./components/ChartHeader";
import ChartControls from "./components/ChartControls";
import {
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
  fnSmartConfig,
} from "./utils/filters";
import { formatLinePercentage } from "./utils/formatters";

const DEFAULT_COLORS = ["#55af7d", "#8e68ff", "#2273e1"];

function ChartWrapper({
  className,
  children,
  wrapperRef,
}: {
  className?: string;
  children: React.ReactNode;
  wrapperRef?: React.Ref<HTMLDivElement>;
}) {
  const cls = className ?? "";
  const hasExplicitSizing = /\bh-/.test(cls) || /\bflex-1\b/.test(cls);

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "w-full overflow-hidden min-w-0 rounded-lg border-border",
        !hasExplicitSizing && "h-[550px]",
        className,
      )}
    >
      {children}
    </div>
  );
}

const Chart: React.FC<ChartProps> = ({
  data,
  series,
  className,
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

  const processedData = useProcessedData({
    data,
    xAxisKey: xAxisConfig.dataKey,
    timeSeriesConfig,
    startIndex,
    endIndex,
  });

  const seriesOrder = filtersOrder(mapperConfig, series!);
  const allKeys = seriesOrder.map((s) => s.key).filter(Boolean);

  const finalColors = useMemo(
    () => generateColorMap(allKeys, colors, mapperConfig),
    [allKeys, colors, mapperConfig],
  );

  const biaxialConfigNormalized = useBiaxial(biaxial, yAxisLabel);

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

  const getSeriesOpacity = useSeriesOpacity(highlightedSeries);

  const finalValueFormatter = useMemo(
    () => createValueFormatter(valueFormatter, formatBR),
    [valueFormatter, formatBR],
  );

  const yTickFormatter = useMemo(
    () => createYTickFormatter(finalValueFormatter),
    [finalValueFormatter],
  );

  const AXIS_LABEL_MARGIN = 56;
  const CONTAINER_PADDING_LEFT = -6;
  const HORIZONTAL_PADDING_CLASS = "px-24";
  const teste = "pl-24 pr-4";

  const {
    finalChartRightMargin,
    finalChartLeftMargin,
    yAxisTickWidth,
    effectiveChartWidth,
    chartInnerWidth,
    leftYAxisLabelDx,
    rightYAxisLabelDx,
  } = useChartLayout({
    chartMargin,
    yAxisLabel,
    AXIS_LABEL_MARGIN,
    yTickFormatter,
    minLeftDataValue,
    niceMaxLeft,
    rightKeysLength: rightKeys.length,
    measuredWidth,
    width,
    computedWidth,
  });

  const openTooltipForPeriod = useOpenTooltipForPeriod({
    enableDraggableTooltips,
    processedData,
    activeTooltips,
    setActiveTooltips,
    maxTooltips,
    effectiveChartWidth,
  });

  if (!data && !isLoading) return null;

  if (isLoading) {
    return (
      <ChartWrapper className={className}>
        <NoData
          title={title}
          isLoading
          loadingMessage={
            typeof title === "string" ? `${title} — Carregando` : "Carregando"
          }
          paddingLeft={CONTAINER_PADDING_LEFT + finalChartLeftMargin}
          height="100%"
        />
      </ChartWrapper>
    );
  }

  if (Array.isArray(data) && data.length === 0) {
    return (
      <ChartWrapper className={className}>
        <NoData
          title={title}
          paddingLeft={CONTAINER_PADDING_LEFT + finalChartLeftMargin}
          height="100%"
        />
      </ChartWrapper>
    );
  }

  return (
    <>
      <ChartWrapper className={className} wrapperRef={wrapperRef}>
        <div className="h-full w-full flex flex-col rounded-lg bg-card py-1 overflow-hidden">
          <ChartHeader
            title={title}
            titlePosition={titlePosition}
            HORIZONTAL_PADDING_CLASS={HORIZONTAL_PADDING_CLASS}
            customLegend={customLegend}
            data={data}
            allKeys={allKeys}
            processedData={processedData}
            finalColors={finalColors}
            mapperConfig={mapperConfig}
            finalValueFormatter={finalValueFormatter}
            formatBR={formatBR}
          />

          {allKeys.length > 0 && (enableHighlights || enableShowOnly) && (
            <ChartControls
              allKeys={allKeys}
              mapperConfig={mapperConfig}
              finalColors={finalColors}
              highlightedSeries={highlightedSeries}
              toggleHighlight={toggleHighlight}
              showOnlyHighlighted={showOnlyHighlighted}
              setShowOnlyHighlighted={
                setShowOnlyHighlighted as React.Dispatch<
                  React.SetStateAction<boolean>
                >
              }
              highlightedSeriesSize={highlightedSeries.size}
              clearHighlights={clearHighlights}
              enableHighlights={enableHighlights}
              enableShowOnly={enableShowOnly}
              enablePeriodsDropdown={enablePeriodsDropdown}
              enableDraggableTooltips={enableDraggableTooltips}
              processedData={processedData}
              onOpenPeriod={openTooltipForPeriod}
              rightOffset={finalChartRightMargin}
              activePeriods={activePeriods}
              containerClass={cn("flex items-center gap-2", teste)}
              containerWidth={chartInnerWidth}
            />
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

          <div className="flex-1 min-h-0 relative overflow-hidden">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={processedData}
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
                          <stop
                            offset="0%"
                            stopColor={color}
                            stopOpacity={0.8}
                          />
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
                {showLegend && (
                  <Legend
                    iconSize={12}
                    formatter={(value) => (
                      <span className="tracking-[0] rounded-sm">
                        {fnFormatterValueLegend(
                          value,
                          mapperConfig,
                          labelMap,
                          legendUppercase,
                        )}
                      </span>
                    )}
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
                        radius={[4, 4, 0, 0]}
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
                                (props: {
                                  value?: number | string | undefined;
                                }) => formatLinePercentage(props.value),
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
      </ChartWrapper>

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
          onCloseAll={() => window.dispatchEvent(new Event("closeAllTooltips"))}
          position="top-center"
          variant="floating"
        />
      )}
    </>
  );
};

export default Chart;
