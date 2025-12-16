import React, { useState, useEffect, useCallback, useMemo } from "react";
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
  formatFieldName,
  detectDataFields,
  detectXAxis,
  niceCeil,
} from "./utils/helpers";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Highlights,
  ShowOnly,
  TooltipSimple,
  DraggableTooltip,
  CloseAllButton,
  PeriodsDropdown,
} from "./components";
import RechartTooltipWithTotal from "./components/tooltips/TooltipWithTotal";
import NoData from "./NoData";
import { renderPillLabel, valueFormatter } from "./utils";
import {
  buildPercentFormatter,
  TITLE_CLASSNAME,
  createFinalValueFormatter,
  createYTickFormatter,
} from "./utils/formatters";
import {
  maxForKeys as maxForKeysUtil,
  minForKeys as minForKeysUtil,
} from "./utils/dataStats";
import { generateColors } from "./utils/generateColorMap";
import { adaptDataForTooltip as adaptDataForTooltipUtil } from "./utils/tooltip";
import {
  computeSeriesOrder,
  computeProcessedData,
  computeAllKeys,
  computeLeftRightKeys,
  computeLabelSample,
  computeNiceMax,
} from "./utils/chartHelpers";
import { useMeasureWidth } from "./hooks/useMeasureWidth";
import { useChartLayout } from "./hooks/useChartLayout";
import type {
  ChartData,
  XAxisConfig,
  SeriesProp,
  MapperConfig,
  YAxes,
  YAxisMap,
  TooltipItem,
} from "./types";

interface ChartProps {
  data: ChartData[];
  series?: SeriesProp;
  yAxisMap?: YAxisMap;
  yAxes?: YAxes;
  className?: string;
  chartMargin?: Partial<{
    top: number;
    right: number;
    left: number;
    bottom: number;
  }>;
  height?: number;
  width?: number | string;
  colors?: string[];
  gridColor?: string;
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  title?: string;
  titlePosition?: "left" | "center" | "right";
  showLabels?: boolean;
  labelMap?: Record<string, string>;
  valueFormatter?: valueFormatter;
  categoryFormatter?: (value: string | number) => string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  xAxis?: XAxisConfig | string;
  enableHighlights?: boolean;
  enableShowOnly?: boolean;
  enablePeriodsDropdown?: boolean;
  enableDraggableTooltips?: boolean;
  showTooltipTotal?: boolean;
  maxTooltips?: number;
  formatBR?: boolean;
  periodLabel?: string;
}

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
  maxTooltips = 5,
  formatBR = false,
  chartMargin,
  yAxisMap,
  yAxes,
  periodLabel = "Período",
}) => {
  type LabelListContent = (props: unknown) => React.ReactNode;
  const smartConfig = useMemo(() => {
    const resolvedXAxisKey =
      typeof xAxis === "string"
        ? xAxis
        : (xAxis && (xAxis as XAxisConfig).dataKey) || detectXAxis(data);

    const xAxisConfig: XAxisConfig =
      typeof xAxis === "string"
        ? {
            dataKey: resolvedXAxisKey,
            label: formatFieldName(resolvedXAxisKey),
            autoLabel: true,
          }
        : {
            dataKey: resolvedXAxisKey,
            label:
              (xAxis as XAxisConfig)?.label ??
              formatFieldName(resolvedXAxisKey),
            valueFormatter: (xAxis as XAxisConfig)?.valueFormatter,
            autoLabel: (xAxis as XAxisConfig)?.autoLabel ?? true,
          };

    const detectedFields = detectDataFields(data, xAxisConfig.dataKey);
    const mapperConfig = detectedFields.reduce((acc, field) => {
      acc[field] = {
        label: labelMap?.[field] ?? formatFieldName(field),
        type: "number" as const,
        visible: true,
      };
      return acc;
    }, {} as MapperConfig);

    return { xAxisConfig, mapperConfig };
  }, [data, xAxis, labelMap]);

  const { xAxisConfig, mapperConfig } = smartConfig;

  const [activeTooltips, setActiveTooltips] = useState<TooltipItem[]>([]);

  const [highlightedSeries, setHighlightedSeries] = useState<Set<string>>(
    new Set()
  );
  const [showOnlyHighlighted, setShowOnlyHighlighted] = useState(false);

  useEffect(() => {
    if (highlightedSeries.size === 0 && showOnlyHighlighted) {
      setShowOnlyHighlighted(false);
    }
  }, [highlightedSeries, showOnlyHighlighted]);

  const processedData = computeProcessedData(
    data as Array<Record<string, unknown>>,
    xAxisConfig.dataKey
  ) as unknown as ChartData[];

  const { wrapperRef, measuredWidth } = useMeasureWidth<HTMLDivElement>();

  const seriesOrder = computeSeriesOrder(series, mapperConfig);
  const allKeys = computeAllKeys(seriesOrder);

  const finalColors = useMemo(
    () => generateColors(allKeys, colors, mapperConfig),
    [allKeys, colors, mapperConfig]
  );

  const adaptDataForTooltip = useCallback(
    (universalData: ChartData) =>
      adaptDataForTooltipUtil(universalData, xAxisConfig.dataKey),
    [xAxisConfig.dataKey]
  );

  const activePeriods = useMemo(
    () => activeTooltips.map((t) => adaptDataForTooltip(t.data).name),
    [activeTooltips, adaptDataForTooltip]
  );

  useEffect(() => {
    window.dispatchEvent(new Event("recountTooltips"));
  }, [activeTooltips.length]);

  const toggleHighlight = useCallback((key: string) => {
    setHighlightedSeries((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const maxDataValue = useMemo(
    () => maxForKeysUtil(processedData, allKeys),
    [processedData, allKeys]
  );

  const minDataValue = useMemo(
    () => minForKeysUtil(processedData, allKeys),
    [processedData, allKeys]
  );

  const { leftKeys, rightKeys } = useMemo(
    () => computeLeftRightKeys(allKeys, yAxisMap),
    [allKeys, yAxisMap]
  );

  const maxLeft = useMemo(
    () => maxForKeysUtil(processedData, leftKeys),
    [leftKeys, processedData]
  );
  const minLeft = useMemo(
    () => minForKeysUtil(processedData, leftKeys),
    [leftKeys, processedData]
  );
  const maxRight = useMemo(
    () => (rightKeys.length > 0 ? maxForKeysUtil(processedData, rightKeys) : 0),
    [rightKeys, processedData]
  );
  const minRight = useMemo(
    () => (rightKeys.length > 0 ? minForKeysUtil(processedData, rightKeys) : 0),
    [rightKeys, processedData]
  );

  const niceMaxLeft = useMemo(
    () => niceCeil(computeNiceMax(maxLeft)),
    [maxLeft]
  );

  const niceMaxRight = useMemo(
    () => niceCeil(computeNiceMax(maxRight)),
    [maxRight]
  );

  const niceMax = useMemo(
    () => niceCeil(computeNiceMax(maxDataValue)),
    [maxDataValue]
  );

  const toggleTooltip = useCallback(
    (
      tooltipId: string,
      data: ChartData,
      basePosition: { top: number; left: number }
    ) => {
      const existingIndex = activeTooltips.findIndex((t) => t.id === tooltipId);

      if (existingIndex !== -1) {
        setActiveTooltips((prev) => prev.filter((t) => t.id !== tooltipId));
      } else {
        if (activeTooltips.length >= maxTooltips) {
          toast.warning(
            `Limite de ${maxTooltips} janelas de informação atingido. A mais antiga será substituída.`
          );
        }

        const offsetIndex = activeTooltips.length;
        const gap = 28;

        const newTooltip = {
          id: tooltipId,
          data,
          position: {
            top: basePosition.top + offsetIndex * gap,
            left: basePosition.left + offsetIndex * gap,
          },
        };

        setActiveTooltips((prev) => {
          const next = [...prev, newTooltip];
          return next.length > maxTooltips ? next.slice(1) : next;
        });
      }
    },
    [activeTooltips, maxTooltips]
  );

  const handleChartClick = useCallback(
    (e?: unknown) => {
      if (!enableDraggableTooltips) return;

      const ev = e as
        | {
            activePayload?: Array<{ payload: ChartData }>;
            chartX?: number;
            chartY?: number;
          }
        | undefined;

      if (ev?.activePayload?.length) {
        const clickedData = ev.activePayload[0].payload;
        const xAxisValue =
          clickedData[xAxisConfig.dataKey] || clickedData.name || "N/A";
        const tooltipId = String(xAxisValue);

        toggleTooltip(tooltipId, clickedData, {
          top: (ev.chartY || 100) - 10,
          left: (ev.chartX || 100) - 100,
        });
      } else {
        setActiveTooltips([]);
      }
    },
    [enableDraggableTooltips, xAxisConfig.dataKey, toggleTooltip]
  );

  const handleBarClick = useCallback(
    (data: ChartData, index: number, event: React.MouseEvent) => {
      if (!enableDraggableTooltips) return;

      event.stopPropagation();
      const xAxisValue = data[xAxisConfig.dataKey] || "N/A";
      const tooltipId = String(xAxisValue);
      const rect = (event.target as HTMLElement).getBoundingClientRect();

      toggleTooltip(tooltipId, data, {
        top: Math.max(8, rect.top - 10),
        left: rect.right + 10,
      });
    },
    [enableDraggableTooltips, xAxisConfig.dataKey, toggleTooltip]
  );

  const handleSeriesClick = useCallback(
    (...args: unknown[]) => {
      if (args.length >= 3) {
        const [data, index, event] = args as [unknown, number, unknown];
        handleBarClick(data as ChartData, index, event as React.MouseEvent);
        return;
      }
      handleChartClick(args[0]);
    },
    [handleBarClick, handleChartClick]
  );

  const onTooltipPositionChange = useCallback(
    (id: string, position: { top: number; left: number }) => {
      setActiveTooltips((prev) =>
        prev.map((t) => (t.id === id ? { ...t, position } : t))
      );
    },
    []
  );

  const titleClassName = TITLE_CLASSNAME;

  const finalValueFormatter = useMemo(
    () => createFinalValueFormatter(valueFormatter, formatBR),
    [valueFormatter, formatBR]
  );

  const yTickFormatter = useMemo(
    () => createYTickFormatter(finalValueFormatter),
    [finalValueFormatter]
  );
  const finalEnableHighlights = enableHighlights;
  const finalEnableShowOnly = enableShowOnly;
  const finalEnablePeriodsDropdown =
    enablePeriodsDropdown && enableDraggableTooltips;
  const leftLabelSample = useMemo(
    () =>
      computeLabelSample(
        leftKeys,
        [maxLeft, minLeft, niceMaxLeft],
        yTickFormatter
      ),
    [leftKeys, maxLeft, minLeft, niceMaxLeft, yTickFormatter]
  );

  const rightLabelSample = useMemo(
    () =>
      computeLabelSample(
        rightKeys,
        [maxRight, minRight, niceMaxRight],
        yTickFormatter
      ),
    [rightKeys, maxRight, minRight, niceMaxRight, yTickFormatter]
  );

  const {
    containerPaddingLeft,
    computedWidth,
    measuredInner,
    chartInnerWidth,
    finalChartLeftMargin,
    finalChartRightMargin,
    finalChartTopMargin,
    finalChartBottomMargin,
    leftYAxisLabelDx,
    rightYAxisLabelDx,
  } = useChartLayout({
    width,
    measuredWidth,
    points: Math.max(1, processedData.length),
    seriesCounts: {
      bar: series?.bar?.length ?? 0,
      line: series?.line?.length ?? 0,
      area: series?.area?.length ?? 0,
    },
    niceMax,
    yAxes,
    yAxisLabel,
    chartMargin,
    showLabels,
    showLegend,
    xAxisLabel,
    leftLabelSample,
    rightLabelSample,
  });

  const leftAxisTickFormatter = useMemo(() => {
    if (yAxes?.left?.percent)
      return buildPercentFormatter(yAxes.left.percentDecimals ?? 0);
    return yTickFormatter;
  }, [yAxes?.left, yTickFormatter]);

  const rightAxisTickFormatter = useMemo(() => {
    if (yAxes?.right?.percent)
      return buildPercentFormatter(yAxes.right.percentDecimals ?? 0);
    return yTickFormatter;
  }, [yAxes?.right, yTickFormatter]);

  const openTooltipForPeriod = useCallback(
    (periodName: string) => {
      if (!enableDraggableTooltips) return;

      const row = processedData.find((r) => String(r.name) === periodName);
      if (!row) return;

      const tooltipId = String(periodName);
      const existingIndex = activeTooltips.findIndex((t) => t.id === tooltipId);

      if (existingIndex !== -1) {
        setActiveTooltips((prev) => prev.filter((t) => t.id !== tooltipId));
        return;
      }

      if (activeTooltips.length >= maxTooltips) {
        toast.warning(
          `Limite de ${maxTooltips} janelas de informação atingido. A mais antiga será substituída.`
        );
      }

      const offsetIndex = activeTooltips.length;
      const availableWidth =
        typeof width === "number" ? width : measuredInner ?? computedWidth;
      const gap = 28;
      const leftGap = 28;

      const newTooltip = {
        id: tooltipId,
        data: row,
        position: {
          top: 48 + offsetIndex * gap,
          left: Math.max(120, availableWidth - 280 - offsetIndex * leftGap),
        },
      };

      setActiveTooltips((prev) => {
        const next = [...prev, newTooltip];
        return next.length > maxTooltips ? next.slice(1) : next;
      });
    },
    [
      enableDraggableTooltips,
      processedData,
      activeTooltips,
      width,
      measuredInner,
      computedWidth,
      maxTooltips,
    ]
  );

  if (!data) return null;

  if (Array.isArray(data) && data.length === 0) {
    return (
      <NoData
        paddingLeft={containerPaddingLeft + finalChartLeftMargin}
        height={height}
        message={"Sem dados para exibir"}
      />
    );
  }

  return (
    <div
      ref={wrapperRef}
      style={{
        width: "100%",
        overflow: "visible",
        minWidth: 0,
      }}
    >
      <div
        className={cn("rounded-lg bg-card p-2 relative", className)}
        style={{ width: "100%", maxWidth: "100%", minWidth: 0 }}
      >
        {title && (
          <div
            style={{
              paddingLeft: `${containerPaddingLeft + finalChartLeftMargin}px`,
              width: "100%",
              display: "flex",
              justifyContent:
                titlePosition === "center"
                  ? "center"
                  : titlePosition === "right"
                  ? "flex-end"
                  : "flex-start",
              alignItems: "center",
              marginTop: 4,
            }}
          >
            <h3 className={titleClassName}>{title}</h3>
          </div>
        )}

        {allKeys.length > 0 &&
          (finalEnableHighlights || finalEnableShowOnly) && (
            <div
              className="flex items-center w-full"
              style={{
                paddingLeft: `${containerPaddingLeft + finalChartLeftMargin}px`,
                width: "98%",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              {finalEnableHighlights && (
                <Highlights
                  allKeys={allKeys}
                  mapperConfig={mapperConfig}
                  finalColors={finalColors}
                  highlightedSeries={highlightedSeries}
                  toggleHighlight={toggleHighlight}
                  containerWidth={chartInnerWidth}
                />
              )}

              {finalEnableShowOnly && (
                <ShowOnly
                  showOnlyHighlighted={showOnlyHighlighted}
                  setShowOnlyHighlighted={setShowOnlyHighlighted}
                  highlightedSeriesSize={highlightedSeries.size}
                  clearHighlights={() => setHighlightedSeries(new Set())}
                />
              )}

              {finalEnablePeriodsDropdown && (
                <div
                  style={{
                    marginLeft: "auto",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <PeriodsDropdown
                    processedData={
                      processedData as unknown as { name: string }[]
                    }
                    onOpenPeriod={openTooltipForPeriod}
                    rightOffset={finalChartRightMargin}
                    activePeriods={activePeriods}
                  />
                </div>
              )}
            </div>
          )}

        {!(
          allKeys.length > 0 &&
          (finalEnableHighlights || finalEnableShowOnly)
        ) &&
          finalEnablePeriodsDropdown && (
            <div
              style={{
                paddingLeft: `${containerPaddingLeft + finalChartLeftMargin}px`,
                paddingRight: `${finalChartRightMargin}px`,
                width: "100%",
                maxWidth: `${chartInnerWidth}px`,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <PeriodsDropdown
                processedData={processedData as unknown as { name: string }[]}
                onOpenPeriod={openTooltipForPeriod}
                rightOffset={finalChartRightMargin}
              />
            </div>
          )}

        <ResponsiveContainer width="100%" height={height}>
          <ComposedChart
            data={
              processedData as unknown as Array<
                { name: string } & Record<string, unknown>
              >
            }
            height={height}
            margin={{
              top: finalChartTopMargin,
              right: finalChartRightMargin,
              left: finalChartLeftMargin,
              bottom: finalChartBottomMargin,
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
              dataKey={xAxisConfig.dataKey}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
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
                      position: "bottom",
                      offset: 12,
                      style: {
                        fontSize: 12,

                        fill: "hsl(var(--muted-foreground))",
                        fontWeight: 500,
                      },
                    }
                  : undefined
              }
            />
            {rightKeys.length > 0 ? (
              <>
                <YAxis
                  yAxisId="left"
                  stroke={yAxes?.left?.stroke || "hsl(var(--muted-foreground))"}
                  width={yAxes?.left?.width}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={leftAxisTickFormatter}
                  domain={[Math.min(minLeft, 0), niceMaxLeft]}
                  tickCount={6}
                  label={
                    yAxes?.left?.label ?? yAxisLabel
                      ? {
                          value: yAxes?.left?.label ?? yAxisLabel,
                          angle: -90,
                          position: "left",
                          dx: -leftYAxisLabelDx,
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

                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke={
                    yAxes?.right?.stroke || "hsl(var(--muted-foreground))"
                  }
                  width={yAxes?.right?.width}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={rightAxisTickFormatter}
                  domain={[Math.min(minRight, 0), niceMaxRight]}
                  tickCount={6}
                  label={
                    yAxes?.right?.label
                      ? {
                          value: yAxes?.right?.label,
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
              </>
            ) : (
              <>
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={yTickFormatter}
                  domain={[Math.min(minDataValue, 0), niceMax]}
                  tickCount={6}
                  label={
                    yAxisLabel
                      ? {
                          value: yAxisLabel,
                          angle: -90,
                          position: "left",
                          dx: -leftYAxisLabelDx,
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

            {(minDataValue < 0 || minLeft < 0 || minRight < 0) && (
              <ReferenceLine
                y={0}
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={1}
                strokeDasharray="4 4"
              />
            )}
            {showTooltip && (
              <Tooltip
                content={
                  showTooltipTotal ? (
                    <RechartTooltipWithTotal
                      periodLabel={periodLabel}
                      finalColors={finalColors}
                      valueFormatter={finalValueFormatter}
                      categoryFormatter={categoryFormatter}
                      yAxisMap={yAxisMap}
                      isBiaxial={rightKeys.length > 0}
                    />
                  ) : (
                    <TooltipSimple
                      periodLabel={periodLabel}
                      finalColors={finalColors}
                      valueFormatter={finalValueFormatter}
                      categoryFormatter={categoryFormatter}
                      yAxisMap={yAxisMap}
                      isBiaxial={rightKeys.length > 0}
                    />
                  )
                }
                cursor={{ fill: "hsl(var(--muted))", opacity: 0.1 }}
              />
            )}
            {showLegend && (
              <Legend
                wrapperStyle={{
                  color: "hsl(var(--foreground))",
                  fontSize: "14px",
                  paddingTop: "8px",
                }}
              />
            )}
            {seriesOrder.map((s) => {
              const key = s.key;
              const rawMapped =
                rightKeys.length > 0 ? yAxisMap?.[key] ?? "left" : undefined;
              const seriesYAxisId = (() => {
                if (rawMapped === undefined) return undefined;
                if (rawMapped === "left" || rawMapped === "right")
                  return rawMapped;
                if (
                  rawMapped === 1 ||
                  rawMapped === "1" ||
                  rawMapped === "right"
                )
                  return "right";
                // treat 0 / '0' as left, any unknown as left
                return "left";
              })();

              if (showOnlyHighlighted && !highlightedSeries.has(key))
                return null;
              const label =
                mapperConfig[key]?.label ??
                labelMap?.[key] ??
                formatFieldName(key);
              const color = finalColors[key];
              if (s.type === "bar") {
                return (
                  <Bar
                    key={`bar-${key}`}
                    yAxisId={seriesYAxisId}
                    dataKey={key}
                    name={label}
                    fill={color}
                    radius={[4, 4, 0, 0]}
                    onClick={handleBarClick}
                    style={{
                      cursor: "pointer",
                      opacity:
                        highlightedSeries.size > 0
                          ? highlightedSeries.has(key)
                            ? 1
                            : 0.25
                          : 1,
                    }}
                    activeBar={
                      <Rectangle
                        fill={color}
                        stroke={color}
                        strokeWidth={2}
                        opacity={0.8}
                      />
                    }
                  >
                    {(showLabels && highlightedSeries.size === 0) ||
                    highlightedSeries.has(key) ? (
                      <LabelList
                        dataKey={key}
                        position="top"
                        content={
                          renderPillLabel(
                            color,
                            "filled",
                            finalValueFormatter
                          ) as LabelListContent
                        }
                        offset={8}
                      />
                    ) : null}
                  </Bar>
                );
              }
              if (s.type === "line") {
                return (
                  <Line
                    key={`line-${key}`}
                    yAxisId={seriesYAxisId}
                    dataKey={key}
                    name={label}
                    stroke={color}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 6 }}
                    onClick={handleSeriesClick}
                    style={{
                      cursor: "pointer",
                      pointerEvents: "all",
                      opacity:
                        highlightedSeries.size > 0
                          ? highlightedSeries.has(key)
                            ? 1
                            : 0.25
                          : 1,
                    }}
                  >
                    {(showLabels && highlightedSeries.size === 0) ||
                    highlightedSeries.has(key) ? (
                      <LabelList
                        dataKey={key}
                        position="top"
                        content={
                          renderPillLabel(
                            color,
                            "filled",
                            finalValueFormatter
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
                    yAxisId={seriesYAxisId}
                    dataKey={key}
                    name={label}
                    stroke={color}
                    fill={color}
                    fillOpacity={0.35}
                    strokeWidth={2}
                    onClick={handleSeriesClick}
                    style={{
                      cursor: "pointer",
                      pointerEvents: "all",
                      opacity:
                        highlightedSeries.size > 0
                          ? highlightedSeries.has(key)
                            ? 1
                            : 0.25
                          : 1,
                    }}
                  >
                    {(showLabels && highlightedSeries.size === 0) ||
                    highlightedSeries.has(key) ? (
                      <LabelList
                        dataKey={key}
                        position="top"
                        content={
                          renderPillLabel(
                            color,
                            "soft",
                            finalValueFormatter
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

        {enableDraggableTooltips &&
          activeTooltips.map((tooltip) => (
            <DraggableTooltip
              key={tooltip.id}
              id={tooltip.id}
              data={adaptDataForTooltip(tooltip.data)}
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
      </div>
    </div>
  );
};

export default Chart;
