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
  formatFieldName,
  detectDataFields,
  detectXAxis,
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
import { renderPillLabel, renderInsideBarLabel, valueFormatter } from "./utils";
import NoData from "./NoData";
import {
  useChartHighlights,
  useChartDimensions,
  useChartTooltips,
  useChartClick,
} from "./hooks";

interface ChartData {
  [key: string]: string | number | boolean | null | undefined;
}
interface XAxisConfig {
  dataKey: string;
  label?: string;
  valueFormatter?: (value: string | number) => string;
  autoLabel?: boolean;
}
interface DataMapper {
  [dataKey: string]: {
    label?: string;
    valueFormatter?: (value: string | number) => string | number;
    color?: string;
    type?: "number" | "string" | "auto";
    visible?: boolean;
  };
}
interface BiaxialConfig {
  key: string[];
  label?: string;
  percentage?: boolean;
  decimals?: number;
  stroke?: string | Record<string, string>;
}
interface TimeSeriesConfig {
  enabled: boolean;
  defaultStartIndex?: number;
  defaultEndIndex?: number;
  onRangeChange?: (startIndex: number, endIndex: number) => void;
  brushHeight?: number;
  brushColor?: string;
  brushStroke?: string;
  miniChartOpacity?: number;
  chartHeight?: number;
}
type SeriesProp = {
  bar?: string[];
  line?: string[];
  area?: string[];
};
interface ChartProps {
  data: ChartData[];
  series?: SeriesProp;
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
  periodLabel?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  xAxis?: XAxisConfig | string;
  biaxial?: BiaxialConfig | string | string[];
  enableHighlights?: boolean;
  enableShowOnly?: boolean;
  enablePeriodsDropdown?: boolean;
  enableDraggableTooltips?: boolean;
  showTooltipTotal?: boolean;
  maxTooltips?: number;
  formatBR?: boolean;
  legendUppercase?: boolean;
  isLoading?: boolean;
  timeSeries?: TimeSeriesConfig;
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
    }, {} as DataMapper);

    return { xAxisConfig, mapperConfig };
  }, [data, xAxis, labelMap]);

  const { xAxisConfig, mapperConfig } = smartConfig;

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

  // TimeSeries state management
  const [startIndex, setStartIndex] = React.useState(
    timeSeries?.defaultStartIndex ?? 0,
  );
  const [endIndex, setEndIndex] = React.useState(
    timeSeries?.defaultEndIndex ?? data.length - 1,
  );
  const [isDragging, setIsDragging] = React.useState<
    "start" | "end" | "middle" | null
  >(null);
  const [dragStartX, setDragStartX] = React.useState(0);
  const [initialStartIndex, setInitialStartIndex] = React.useState(0);
  const [initialEndIndex, setInitialEndIndex] = React.useState(0);
  const brushRef = React.useRef<HTMLDivElement>(null);

  // Update endIndex when data length changes
  React.useEffect(() => {
    if (timeSeries?.enabled) {
      const newEndIndex = timeSeries.defaultEndIndex ?? data.length - 1;
      setEndIndex(newEndIndex);
    }
  }, [data.length, timeSeries?.enabled, timeSeries?.defaultEndIndex]);

  const handleRangeChange = useCallback(
    (newStart: number, newEnd: number) => {
      const clampedStart = Math.max(0, Math.min(newStart, data.length - 1));
      const clampedEnd = Math.max(
        clampedStart,
        Math.min(newEnd, data.length - 1),
      );

      setStartIndex(clampedStart);
      setEndIndex(clampedEnd);

      if (timeSeries?.onRangeChange) {
        timeSeries.onRangeChange(clampedStart, clampedEnd);
      }
    },
    [data.length, timeSeries],
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, type: "start" | "end" | "middle") => {
      e.preventDefault();
      setIsDragging(type);
      setDragStartX(e.clientX);
      setInitialStartIndex(startIndex);
      setInitialEndIndex(endIndex);
    },
    [startIndex, endIndex],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !brushRef.current) return;

      const brushWidth = brushRef.current.offsetWidth;
      const deltaX = e.clientX - dragStartX;
      const indexDelta = Math.round((deltaX / brushWidth) * data.length);

      if (isDragging === "start") {
        const newStart = Math.max(
          0,
          Math.min(initialStartIndex + indexDelta, endIndex - 1),
        );
        handleRangeChange(newStart, endIndex);
      } else if (isDragging === "end") {
        const newEnd = Math.max(
          startIndex + 1,
          Math.min(initialEndIndex + indexDelta, data.length - 1),
        );
        handleRangeChange(startIndex, newEnd);
      } else if (isDragging === "middle") {
        const rangeSize = initialEndIndex - initialStartIndex;
        let newStart = initialStartIndex + indexDelta;
        let newEnd = initialEndIndex + indexDelta;

        if (newStart < 0) {
          newStart = 0;
          newEnd = rangeSize;
        } else if (newEnd >= data.length) {
          newEnd = data.length - 1;
          newStart = newEnd - rangeSize;
        }

        handleRangeChange(newStart, newEnd);
      }
    },
    [
      isDragging,
      dragStartX,
      data.length,
      startIndex,
      endIndex,
      initialStartIndex,
      initialEndIndex,
      handleRangeChange,
    ],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const processedData = useMemo(() => {
    const mapped = data.map((item) => ({
      ...item,
      name: String(item[xAxisConfig.dataKey] || "N/A"),
    }));

    // Filter data based on timeSeries range if enabled
    if (timeSeries?.enabled) {
      return mapped.slice(startIndex, endIndex + 1);
    }

    return mapped;
  }, [data, xAxisConfig.dataKey, timeSeries?.enabled, startIndex, endIndex]);

  const seriesOrder: Array<{ type: "bar" | "line" | "area"; key: string }> = [];
  if (series) {
    if (series.bar)
      series.bar.forEach((k) => seriesOrder.push({ type: "bar", key: k }));
    if (series.line)
      series.line.forEach((k) => seriesOrder.push({ type: "line", key: k }));
    if (series.area)
      series.area.forEach((k) => seriesOrder.push({ type: "area", key: k }));
  } else {
    Object.keys(mapperConfig).forEach((k) =>
      seriesOrder.push({ type: "bar", key: k }),
    );
  }

  const allKeys = seriesOrder.map((s) => s.key).filter(Boolean);

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

  const finalChartTopMargin = chartMargin?.top ?? (showLabels ? 48 : 20);
  const finalChartBottomMargin =
    (chartMargin?.bottom ?? 5) + (xAxisLabel ? 22 : 0) + (showLegend ? 36 : 0);
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
          `Limite de ${maxTooltips} janelas de informação atingido. A mais antiga será substituída.`,
        );
      }

      const offsetIndex = activeTooltips.length;
      const availableWidth = effectiveChartWidth;
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
    <div ref={wrapperRef} className="w-full overflow-hidden min-w-0">
      <div
        className={cn(
          "rounded-lg bg-card relative w-full max-w-full min-w-0",
          className,
        )}
      >
        {title && (
          <div
            className={cn(
              "w-full flex items-center mt-[19px] ml-[90px]",
              titlePosition === "center" && "justify-center",
              titlePosition === "right" && "justify-end",
              titlePosition === "left" && "justify-start",
            )}
          >
            <div className="text-[1.4rem] font-semibold text-foreground mb-3">
              {title}
            </div>
          </div>
        )}

        {allKeys.length > 0 && (enableHighlights || enableShowOnly) && (
          <div className="flex items-center w-[98%] ml-[90px] gap-2">
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
              className="w-full flex justify-end"
              style={{
                paddingLeft: `${CONTAINER_PADDING_LEFT + finalChartLeftMargin}px`,
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

        <ResponsiveContainer width="100%" height={height}>
          <ComposedChart
            data={processedData}
            height={height}
            margin={{
              top: finalChartTopMargin,
              right: finalChartRightMargin,
              left: finalChartLeftMargin,
              bottom: finalChartBottomMargin,
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
                      <stop offset="90%" stopColor={color} stopOpacity={0.1} />
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
                  return xAxisConfig.valueFormatter(value as string | number);
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
                const decimals =
                  typeof biaxialConfigNormalized?.decimals === "number"
                    ? Math.max(0, Math.floor(biaxialConfigNormalized!.decimals))
                    : 2;

                const rightTickFormatter = (v: number | string) => {
                  if (biaxialConfigNormalized?.percentage) {
                    const num = Number(String(v));
                    const nf = new Intl.NumberFormat("pt-BR", {
                      minimumFractionDigits: decimals,
                      maximumFractionDigits: decimals,
                    });
                    const out = Number.isNaN(num)
                      ? String(v ?? "")
                      : nf.format(num);
                    return `${out}%`;
                  }

                  return yTickFormatter(v);
                };

                const firstRightKey = (biaxialConfigNormalized?.key &&
                  biaxialConfigNormalized.key[0]) as string | undefined;
                const defaultRightColor =
                  (firstRightKey && finalColors[firstRightKey]) ||
                  "hsl(var(--muted-foreground))";

                const rightAxisColor = (() => {
                  if (!biaxialConfigNormalized) return defaultRightColor;
                  if (typeof biaxialConfigNormalized.stroke === "string")
                    return biaxialConfigNormalized.stroke;
                  if (
                    biaxialConfigNormalized.stroke &&
                    firstRightKey &&
                    typeof biaxialConfigNormalized.stroke === "object"
                  )
                    return (
                      (
                        biaxialConfigNormalized.stroke as Record<string, string>
                      )[firstRightKey] || defaultRightColor
                    );

                  return defaultRightColor;
                })();

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
                wrapperStyle={{
                  color: "hsl(var(--foreground))",
                  fontSize: "14px",
                  paddingTop: "8px",
                  letterSpacing: 0,
                }}
                formatter={(value) => {
                  const key = String(value);
                  const label =
                    mapperConfig[key]?.label ??
                    labelMap?.[key] ??
                    formatFieldName(key);
                  const displayLabel = legendUppercase
                    ? label.toUpperCase()
                    : label;
                  return <span className="tracking-[0]">{displayLabel}</span>;
                }}
              />
            )}
            {seriesOrder.map((s) => {
              const key = s.key;
              if (showOnlyHighlighted && !highlightedSeries.has(key))
                return null;
              const label =
                mapperConfig[key]?.label ??
                labelMap?.[key] ??
                formatFieldName(key);
              let color = finalColors[key];
              if (rightKeys.includes(key) && biaxialConfigNormalized?.stroke) {
                if (typeof biaxialConfigNormalized.stroke === "string") {
                  color = biaxialConfigNormalized.stroke;
                } else {
                  color = biaxialConfigNormalized.stroke[key] ?? color;
                }
              }
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
                    {(showLabels && highlightedSeries.size === 0) ||
                    highlightedSeries.has(key) ? (
                      <LabelList
                        dataKey={key}
                        /* Use a custom content renderer so that very small bars
                         * (in width or height) will show their label above the bar
                         * instead of being hidden inside the bar. We still reuse
                         * the existing `renderInsideBarLabel` for normal-sized bars.
                         */
                        content={(props) => {
                          const p = props as {
                            height?: number | string;
                            width?: number | string;
                            x?: number | string;
                            y?: number | string;
                            value?: number | string;
                            payload?: Record<string, unknown>;
                          };

                          const barHeight =
                            typeof p.height === "number"
                              ? p.height
                              : typeof p.height === "string"
                                ? Number(p.height)
                                : 0;
                          const barWidth =
                            typeof p.width === "number"
                              ? p.width
                              : typeof p.width === "string"
                                ? Number(p.width)
                                : 0;
                          const smallThreshold = 14;

                          const needsOutside =
                            (barHeight > 0 && barHeight < smallThreshold) ||
                            (barWidth > 0 && barWidth < smallThreshold);

                          if (needsOutside) {
                            return null;
                          }
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
                    {(showLabels && highlightedSeries.size === 0) ||
                    highlightedSeries.has(key) ? (
                      <LabelList
                        dataKey={key}
                        position="top"
                        content={
                          renderPillLabel(
                            color,
                            "filled",
                            finalValueFormatter,
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
                    {(showLabels && highlightedSeries.size === 0) ||
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

        {/* TimeSeries Brush/Range Selector */}
        {timeSeries?.enabled && (
          <div className="w-full px-4 pb-4">
            <div
              className="relative"
              style={{ height: timeSeries.brushHeight ?? 80 }}
            >
              {/* Mini Chart Background */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ opacity: timeSeries.miniChartOpacity ?? 0.3 }}
              >
                <ResponsiveContainer
                  width="100%"
                  height={timeSeries.brushHeight ?? 80}
                >
                  <ComposedChart
                    data={data.map((item) => ({
                      ...item,
                      name: String(item[xAxisConfig.dataKey] || "N/A"),
                    }))}
                    height={timeSeries.brushHeight ?? 80}
                    margin={{
                      top: 5,
                      right: finalChartRightMargin,
                      left: finalChartLeftMargin,
                      bottom: 5,
                    }}
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
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                      hide
                    />
                    <YAxis
                      yAxisId="left"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                      hide
                    />
                    {seriesOrder.map((s) => {
                      const key = s.key;
                      const color = finalColors[key];
                      if (s.type === "bar") {
                        return (
                          <Bar
                            key={`brush-bar-${key}`}
                            dataKey={key}
                            yAxisId="left"
                            fill={color}
                            radius={[2, 2, 0, 0]}
                          />
                        );
                      }
                      if (s.type === "line") {
                        return (
                          <Line
                            key={`brush-line-${key}`}
                            type="monotone"
                            dataKey={key}
                            yAxisId="left"
                            stroke={color}
                            strokeWidth={1.5}
                            dot={false}
                          />
                        );
                      }
                      if (s.type === "area") {
                        return (
                          <Area
                            key={`brush-area-${key}`}
                            type="monotone"
                            dataKey={key}
                            yAxisId="left"
                            stroke={color}
                            fill={`url(#gradient-${key})`}
                            strokeWidth={1.5}
                          />
                        );
                      }
                      return null;
                    })}
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              {/* Brush Overlay */}
              <div
                ref={brushRef}
                className="absolute inset-0 cursor-move"
                style={{ userSelect: "none" }}
              >
                {/* Left Overlay (outside selection) */}
                <div
                  className="absolute top-0 bottom-0 left-0 bg-muted/60 pointer-events-none"
                  style={{
                    width: `${(startIndex / (data.length - 1)) * 100}%`,
                  }}
                />

                {/* Right Overlay (outside selection) */}
                <div
                  className="absolute top-0 bottom-0 right-0 bg-muted/60 pointer-events-none"
                  style={{
                    width: `${((data.length - 1 - endIndex) / (data.length - 1)) * 100}%`,
                  }}
                />

                {/* Selection Area */}
                <div
                  className="absolute top-0 bottom-0 border-t-2 border-b-2 cursor-move"
                  style={{
                    left: `${(startIndex / (data.length - 1)) * 100}%`,
                    right: `${((data.length - 1 - endIndex) / (data.length - 1)) * 100}%`,
                    borderColor:
                      timeSeries.brushStroke ?? "hsl(var(--primary))",
                  }}
                  onMouseDown={(e) => handleMouseDown(e, "middle")}
                >
                  {/* Left Handle */}
                  <div
                    className="absolute top-0 bottom-0 w-2 -left-1 cursor-ew-resize hover:bg-primary/20 transition-colors"
                    style={{
                      backgroundColor:
                        timeSeries.brushColor ?? "hsl(var(--primary))",
                      opacity: 0.8,
                    }}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      handleMouseDown(e, "start");
                    }}
                  />

                  {/* Right Handle */}
                  <div
                    className="absolute top-0 bottom-0 w-2 -right-1 cursor-ew-resize hover:bg-primary/20 transition-colors"
                    style={{
                      backgroundColor:
                        timeSeries.brushColor ?? "hsl(var(--primary))",
                      opacity: 0.8,
                    }}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      handleMouseDown(e, "end");
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Range Info */}
            <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
              <span>
                {data[startIndex]?.[xAxisConfig.dataKey]} -{" "}
                {data[endIndex]?.[xAxisConfig.dataKey]}
              </span>
              <span>
                {endIndex - startIndex + 1} de {data.length} períodos
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chart;
