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
import { cn } from "../../lib/utils";
import DraggableTooltip from "./DraggableTooltip";
import CloseAllButton from "./CloseAllButton";
import renderPillLabel from "./pillLabelRenderer";
import RechartTooltipWithTotal from "./TooltipWithTotal";
import TooltipSimple from "./TooltipSimple";
import {
  formatFieldName,
  detectDataFields,
  generateAdditionalColors,
  niceCeil,
} from "./helpers";

import ChartPeriodsDropdown from "./PeriodsDropdown";
import ShowOnly from "./ShowOnly";
import Highlights from "./Highlights";

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
  padding?:
    | number
    | Partial<{ left: number; right: number; top: number; bottom: number }>;
  margins?: Partial<{
    top: number;
    right: number;
    left: number;
    bottom: number;
  }>;
  chartMargins?: Partial<{
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
  xAxis: XAxisConfig | string;
  enableHighlights?: boolean;
  enableShowOnly?: boolean;
  enablePeriodsDropdown?: boolean;
  enableDraggableTooltips?: boolean;
  showTooltipTotal?: boolean;
  isLoading?: boolean;
  maxTooltips?: number;
  compactTooltips?: boolean;
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
  isLoading = false,
  maxTooltips = 5,
  compactTooltips = true,
  padding,
  margins,
  chartMargins,
}) => {
  type LabelListContent = (props: unknown) => React.ReactNode;
  const smartConfig = useMemo(() => {
    const xAxisConfig: XAxisConfig =
      typeof xAxis === "string"
        ? { dataKey: xAxis, label: formatFieldName(xAxis), autoLabel: true }
        : (xAxis as XAxisConfig);

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

  const generateColors = (dataKeys: string[]): Record<string, string> => {
    const colorMap: Record<string, string> = {};
    const allColors = generateAdditionalColors(colors, dataKeys.length);
    dataKeys.forEach((key, index) => {
      colorMap[key] =
        (mapperConfig[key] && mapperConfig[key].color) ||
        allColors[index] ||
        colors[index % colors.length];
    });
    return colorMap;
  };

  const finalColors = generateColors(allKeys);

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

  const openTooltipForPeriod = (periodName: string) => {
    if (!enableDraggableTooltips) return;
    const row = processedData.find((r) => String(r.name) === periodName);
    if (!row) return;
    const tooltipId = `${periodName}`;
    const existingIndex = activeTooltips.findIndex((t) => t.id === tooltipId);
    if (existingIndex !== -1) {
      setActiveTooltips((prev) => prev.filter((t) => t.id !== tooltipId));
      return;
    }
    const offsetIndex = activeTooltips.length;
    const availableWidth =
      typeof width === "number" ? width : measuredInner ?? computedWidth;
    const gap = compactTooltips ? 22 : 28;
    const leftGap = compactTooltips ? 18 : 28;
    const newTooltip = {
      id: tooltipId,
      data: row,
      position: {
        top: 48 + offsetIndex * gap,
        left: Math.max(120, availableWidth - 260 - offsetIndex * leftGap),
      },
    };
    setActiveTooltips((prev) => {
      // já existe verificação acima; aqui aplicamos limite de maxTooltips
      const next = [...prev, newTooltip];
      if (next.length > maxTooltips) {
        // remover o mais antigo
        next.shift();
      }
      return next;
    });
  };

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
    const points = processedData.length || 1;
    const barCount = series?.bar?.length ?? 0;
    const lineCount = series?.line?.length ?? 0;
    const areaCount = series?.area?.length ?? 0;
    const basePerPoint = 84;
    const perBarExtra = Math.max(0, barCount - 1) * 10;
    const perOtherExtra = (lineCount + areaCount) * 6;

    let sizeFactor = 1;
    if (niceMax > 100000) sizeFactor = 1.18;
    if (niceMax > 1000000) sizeFactor = 1.36;
    if (niceMax > 10000000) sizeFactor = 1.6;

    const perPoint = Math.round(
      (basePerPoint + perBarExtra + perOtherExtra) * sizeFactor
    );
    const marginExtra = 140;

    const raw = Math.round(points * perPoint + marginExtra);
    const min = 200;
    const max = 2200;
    return Math.max(min, Math.min(max, raw));
  }, [
    width,
    processedData.length,
    series?.bar?.length,
    series?.line?.length,
    series?.area?.length,
    niceMax,
  ]);

  const handleBarClick = (
    data: ChartData,
    index: number,
    event: React.MouseEvent
  ) => {
    if (!enableDraggableTooltips) return;
    event.stopPropagation();
    const xAxisValue = data[xAxisConfig.dataKey] || "N/A";
    const tooltipId = `${xAxisValue}`;
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const existingIndex = activeTooltips.findIndex((t) => t.id === tooltipId);
    if (existingIndex !== -1) {
      setActiveTooltips((prev) => prev.filter((t) => t.id !== tooltipId));
    } else {
      // construir posição com compact option e respeitar maxTooltips
      const offsetIndex = activeTooltips.length;
      const gap = compactTooltips ? 18 : 28;
      const baseTop = Math.max(8, rect.top - 10);
      const baseLeft = rect.right + 10;
      const newTooltip = {
        id: tooltipId,
        data,
        position: {
          top: baseTop + offsetIndex * gap,
          left: baseLeft + offsetIndex * gap,
        },
      };
      setActiveTooltips((prev) => {
        const next = [...prev, newTooltip];
        if (next.length > maxTooltips) next.shift();
        return next;
      });
    }
  };

  const handleChartClick = (e?: unknown) => {
    if (!enableDraggableTooltips) return;
    const ev = e as
      | {
          activePayload?: Array<{ payload: ChartData }>;
          chartX?: number;
          chartY?: number;
        }
      | undefined;
    if (ev && ev.activePayload && ev.activePayload.length > 0) {
      const clickedData = ev.activePayload[0].payload as ChartData;
      const xAxisValue =
        (clickedData as Record<string, unknown>)[xAxisConfig.dataKey] ||
        clickedData.name ||
        "N/A";
      const tooltipId = `${xAxisValue}`;
      const existingIndex = activeTooltips.findIndex((t) => t.id === tooltipId);
      if (existingIndex !== -1) {
        setActiveTooltips((prev) => prev.filter((t) => t.id !== tooltipId));
      } else {
        const offsetIndex = activeTooltips.length;
        const gap = compactTooltips ? 18 : 28;
        const newTooltip = {
          id: tooltipId,
          data: clickedData,
          position: {
            top: (ev?.chartY || 100) - 10 + offsetIndex * gap,
            left: (ev?.chartX || 100) - 100 + offsetIndex * gap,
          },
        };
        setActiveTooltips((prev) => {
          const next = [...prev, newTooltip];
          if (next.length > maxTooltips) next.shift();
          return next;
        });
      }
      return;
    }

    setActiveTooltips([]);
  };

  const handleSeriesClick = (...args: unknown[]) => {
    if (args.length >= 3) {
      const [data, index, event] = args as [unknown, number, unknown];
      handleBarClick(data as ChartData, index, event as React.MouseEvent);
      return;
    }

    handleChartClick(args[0]);
  };

  const onTooltipPositionChange = (
    id: string,
    position: { top: number; left: number }
  ) => {
    setActiveTooltips((prev) =>
      prev.map((t) => (t.id === id ? { ...t, position } : t))
    );
  };

  const getTitleClassName = () => {
    return "text-xl font-semibold text-foreground mb-3";
  };
  const finalEnableHighlights = enableHighlights;
  const finalEnableShowOnly = enableShowOnly;
  const finalEnablePeriodsDropdown =
    enablePeriodsDropdown && enableDraggableTooltips;

  const defaultChartRightMargin = 30;
  const defaultChartLeftMargin = 0;

  const resolvedContainerPaddingLeft = ((): number => {
    if (typeof padding === "number") return padding;
    if (padding && typeof padding === "object" && padding.left != null)
      return padding.left as number;
    return 16;
  })();

  const finalChartRightMargin =
    margins?.right ?? chartMargins?.right ?? defaultChartRightMargin;
  const finalChartLeftMargin =
    margins?.left ?? chartMargins?.left ?? defaultChartLeftMargin;
  const finalChartTopMargin =
    margins?.top ?? chartMargins?.top ?? (showLabels ? 48 : 20);
  const finalChartBottomMargin = margins?.bottom ?? chartMargins?.bottom ?? 5;
  const measuredInner = measuredWidth
    ? Math.max(0, measuredWidth - 32)
    : undefined;
  const effectiveChartWidth =
    typeof width === "number" ? width : measuredInner ?? computedWidth;
  const chartInnerWidth =
    effectiveChartWidth - finalChartLeftMargin - finalChartRightMargin;

  // skeleton / placeholder quando carrega ou dados indefinidos
  if (isLoading || !data) {
    return (
      <div className={cn("rounded-lg bg-card p-4 relative w-full")}>
        {/* skeleton simples */}
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-1/3 mb-3" />
          <div className="h-56 bg-muted rounded mb-2" />
          <div className="flex gap-2 mt-2">
            <div className="h-8 bg-muted rounded w-24" />
            <div className="h-8 bg-muted rounded w-24" />
            <div className="h-8 bg-muted rounded w-24" />
          </div>
        </div>
      </div>
    );
  }

  if (Array.isArray(data) && data.length === 0) {
    return (
      <div
        className={cn(
          "rounded-lg bg-card p-4 relative w-full text-muted-foreground"
        )}
      >
        <div
          style={{
            paddingLeft: `${
              resolvedContainerPaddingLeft + finalChartLeftMargin
            }px`,
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
              paddingLeft: `${
                resolvedContainerPaddingLeft + finalChartLeftMargin
              }px`,
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
            <h3 className={getTitleClassName()}>{title}</h3>
          </div>
        )}

        {allKeys.length > 0 &&
          (finalEnableHighlights || finalEnableShowOnly) && (
            <div
              className="flex items-center w-full"
              style={{
                paddingLeft: `${
                  resolvedContainerPaddingLeft + finalChartLeftMargin
                }px`,
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
                  <ChartPeriodsDropdown
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
                paddingLeft: `${
                  resolvedContainerPaddingLeft + finalChartLeftMargin
                }px`,
                paddingRight: `${finalChartRightMargin}px`,
                width: "100%",
                maxWidth: `${chartInnerWidth}px`,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <ChartPeriodsDropdown
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
