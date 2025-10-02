import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useLayoutEffect,
} from "react";
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
  generateAdditionalColors,
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
import { renderPillLabel } from "./utils";

interface ChartData {
  [key: string]: string | number | boolean | null | undefined;
}
interface XAxisConfig {
  dataKey: string;
  label?: string;
  formatter?: (value: string | number) => string;
  autoLabel?: boolean;
}
interface DataMapper {
  [dataKey: string]: {
    label?: string;
    formatter?: (value: string | number) => string | number;
    color?: string;
    type?: "number" | "string" | "auto";
    visible?: boolean;
  };
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
  xAxis?: XAxisConfig | string;
  enableHighlights?: boolean;
  enableShowOnly?: boolean;
  enablePeriodsDropdown?: boolean;
  enableDraggableTooltips?: boolean;
  showTooltipTotal?: boolean;
  maxTooltips?: number;
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
  labelMap,
  enableHighlights = false,
  enableShowOnly = false,
  enablePeriodsDropdown = false,
  enableDraggableTooltips = false,
  showTooltipTotal = false,
  maxTooltips = 5,
  chartMargin,
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
            formatter: (xAxis as XAxisConfig)?.formatter,
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

  type TooltipItem = {
    id: string;
    data: ChartData;
    position: { top: number; left: number };
  };

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

  const processedData = data.map((item) => ({
    ...item,
    name: String(item[xAxisConfig.dataKey] || "N/A"),
  }));

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [measuredWidth, setMeasuredWidth] = useState<number | null>(null);
  useLayoutEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const r = entries[0];
      if (r && typeof r.contentRect.width === "number") {
        setMeasuredWidth(Math.round(r.contentRect.width));
      }
    });
    ro.observe(el);

    setMeasuredWidth(Math.round(el.getBoundingClientRect().width));
    return () => ro.disconnect();
  }, []);

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
      seriesOrder.push({ type: "bar", key: k })
    );
  }

  const allKeys = seriesOrder.map((s) => s.key).filter(Boolean);

  const generateColors = useCallback(
    (dataKeys: string[]): Record<string, string> => {
      const colorMap: Record<string, string> = {};
      const allColors = generateAdditionalColors(colors, dataKeys.length);

      dataKeys.forEach((key, index) => {
        colorMap[key] =
          mapperConfig[key]?.color ||
          allColors[index] ||
          colors[index % colors.length];
      });

      return colorMap;
    },
    [colors, mapperConfig]
  );

  const finalColors = useMemo(
    () => generateColors(allKeys),
    [generateColors, allKeys]
  );

  const adaptDataForTooltip = useCallback(
    (universalData: ChartData) => ({
      ...universalData,
      name: String(universalData[xAxisConfig.dataKey] || "N/A"),
    }),
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

  const maxDataValue = useMemo(() => {
    let max = 0;
    const numericKeys = allKeys;
    for (const row of processedData) {
      const r = row as Record<string, unknown>;
      for (const key of numericKeys) {
        const v = r[key];
        if (typeof v === "number" && Number.isFinite(v) && v > max) max = v;
      }
    }
    return max;
  }, [processedData, allKeys]);

  const minDataValue = useMemo(() => {
    let min = 0;
    const numericKeys = allKeys;
    for (const row of processedData) {
      const r = row as Record<string, unknown>;
      for (const key of numericKeys) {
        const v = r[key];
        if (typeof v === "number" && Number.isFinite(v) && v < min)
          min = v as number;
      }
    }
    return min;
  }, [processedData, allKeys]);

  const niceMax = useMemo(() => {
    let padding = 0.08;
    if (maxDataValue > 1_000_000) padding = 0.05;
    if (maxDataValue > 10_000_000) padding = 0.03;
    if (maxDataValue === 0) padding = 0.12;
    const padded = maxDataValue * (1 + padding);
    return niceCeil(padded);
  }, [maxDataValue]);

  const computedWidth = useMemo(() => {
    if (typeof width === "number") return width;

    const points = Math.max(1, processedData.length);
    const barCount = series?.bar?.length ?? 0;
    const lineCount = series?.line?.length ?? 0;
    const areaCount = series?.area?.length ?? 0;

    // Base width calculation with better scaling
    const basePerPoint = 60;
    const perBarExtra = barCount > 0 ? Math.max(0, barCount - 1) * 8 : 0;
    const perOtherExtra = (lineCount + areaCount) * 4;

    // Size factor based on data magnitude
    let sizeFactor = 1;
    if (niceMax > 100_000) sizeFactor = 1.1;
    if (niceMax > 1_000_000) sizeFactor = 1.2;
    if (niceMax > 10_000_000) sizeFactor = 1.3;

    const perPoint = Math.round(
      (basePerPoint + perBarExtra + perOtherExtra) * sizeFactor
    );

    // More conservative margins
    const marginExtra = 120;
    const calculated = points * perPoint + marginExtra;

    // Improved bounds
    const minWidth = 300;
    const maxWidth = 1800;

    return Math.max(minWidth, Math.min(maxWidth, calculated));
  }, [
    width,
    processedData.length,
    series?.bar?.length,
    series?.line?.length,
    series?.area?.length,
    niceMax,
  ]);

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

  const titleClassName = useMemo(
    () => "text-xl font-semibold text-foreground mb-3",
    []
  );
  const finalEnableHighlights = enableHighlights;
  const finalEnableShowOnly = enableShowOnly;
  const finalEnablePeriodsDropdown =
    enablePeriodsDropdown && enableDraggableTooltips;

  const defaultChartRightMargin = 30;
  const defaultChartLeftMargin = 0;

  const containerPaddingLeft = 16;

  const finalChartRightMargin = chartMargin?.right ?? defaultChartRightMargin;
  const finalChartLeftMargin = chartMargin?.left ?? defaultChartLeftMargin;
  const finalChartTopMargin = chartMargin?.top ?? (showLabels ? 48 : 20);
  const finalChartBottomMargin = chartMargin?.bottom ?? 5;
  const measuredInner = measuredWidth
    ? Math.max(0, measuredWidth - 32)
    : undefined;
  const effectiveChartWidth =
    typeof width === "number" ? width : measuredInner ?? computedWidth;
  const chartInnerWidth =
    effectiveChartWidth - finalChartLeftMargin - finalChartRightMargin;

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
      <div
        className={cn(
          "rounded-lg bg-card p-4 relative w-full text-muted-foreground"
        )}
      >
        <div
          style={{
            paddingLeft: `${containerPaddingLeft + finalChartLeftMargin}px`,
          }}
        >
          Sem dados para exibir
        </div>
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      style={{
        width: "100%",
        overflowX: "hidden",
        overflowY: "hidden",
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
              maxWidth: `${chartInnerWidth}px`,
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
                    processedData={processedData}
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
              tickFormatter={xAxisConfig.formatter}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => Number(value).toLocaleString("pt-BR")}
              domain={[Math.min(minDataValue, 0), niceMax]}
              tickCount={6}
            />
            {minDataValue < 0 && (
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
                    <RechartTooltipWithTotal finalColors={finalColors} />
                  ) : (
                    <TooltipSimple finalColors={finalColors} />
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
              const color = finalColors[key];
              if (s.type === "bar") {
                return (
                  <Bar
                    key={`bar-${key}`}
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
                          renderPillLabel(color, "filled") as LabelListContent
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
                          renderPillLabel(color, "filled") as LabelListContent
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
                          renderPillLabel(color, "soft") as LabelListContent
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
              periodLabel="Período Selecionado"
              dataLabel="Dados do Período"
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
