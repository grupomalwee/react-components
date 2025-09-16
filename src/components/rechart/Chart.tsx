import React, { useState, useEffect, useCallback, useMemo } from "react";
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
} from "recharts";
import { cn } from "../../lib/utils";
import DraggableTooltip from "./DraggableTooltip";
import renderPillLabel from "./pillLabelRenderer";
import {
  formatFieldName,
  detectDataFields,
  generateAdditionalColors,
} from "./helpers";

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
  // mapper and autoDetect removed: mapping must be provided via `series` and `labelMap`
}

const DEFAULT_COLORS = ["#55af7d", "#8e68ff", "#2273e1"];

const Chart: React.FC<ChartProps> = ({
  data,
  series,
  className,
  height = 350,
  width = 900,
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
}) => {
  type LabelListContent = (props: unknown) => React.ReactNode;
  const smartConfig = useMemo(() => {
    // xAxis is now required. Accept either a string dataKey or a full XAxisConfig.
    const xAxisConfig: XAxisConfig =
      typeof xAxis === "string"
        ? { dataKey: xAxis, label: formatFieldName(xAxis), autoLabel: true }
        : (xAxis as XAxisConfig);

    // Derive mapperConfig from data numeric fields and optional labelMap.
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
  type AlignmentGuide = {
    type: "horizontal" | "vertical";
    position: number;
    visible: boolean;
    sourceTooltip: { top: number; left: number; width: number; height: number };
    targetTooltip: { top: number; left: number; width: number; height: number };
  };

  const [activeTooltips, setActiveTooltips] = useState<TooltipItem[]>([]);
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [globalTooltipCount, setGlobalTooltipCount] = useState(0);
  const [alignmentGuides, setAlignmentGuides] = useState<AlignmentGuide[]>([]);

  const processedData = data.map((item) => ({
    ...item,
    name: String(item[xAxisConfig.dataKey] || "N/A"),
  }));

  // Build ordered keys from series if provided, otherwise from mapperConfig
  const seriesOrder: Array<{ type: "bar" | "line" | "area"; key: string }> = [];
  if (series) {
    if (series.bar)
      series.bar.forEach((k) => seriesOrder.push({ type: "bar", key: k }));
    if (series.line)
      series.line.forEach((k) => seriesOrder.push({ type: "line", key: k }));
    if (series.area)
      series.area.forEach((k) => seriesOrder.push({ type: "area", key: k }));
  } else {
    // fallback: treat all mapper keys as bars
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

  const adaptDataForTooltip = (universalData: ChartData) => ({
    ...universalData,
    name: String(universalData[xAxisConfig.dataKey] || "N/A"),
  });

  const niceCeil = (value: number) => {
    if (!isFinite(value) || value <= 0) return 1;
    const pow = Math.pow(10, Math.floor(Math.log10(value)));
    const normalized = value / pow;
    const multipliers = [
      1, 1.25, 1.5, 2, 2.5, 3, 4, 5, 7.5, 10, 15, 20, 25, 50, 100,
    ];
    for (const m of multipliers) {
      if (m >= normalized) return Math.ceil(m * pow);
    }
    return Math.ceil(100 * pow);
  };

  // Find maximum numeric value across the data series to guide axis and sizing
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

  const niceMax = useMemo(() => {
    // Add a small percentage padding above the maximum data value so labels
    // or pill renderings don't get clipped when the largest value is exactly at the top.
    let padding = 0.08; // default 8%
    if (maxDataValue > 1_000_000) padding = 0.05;
    if (maxDataValue > 10_000_000) padding = 0.03;
    if (maxDataValue === 0) padding = 0.12; // ensure non-zero domain
    const padded = maxDataValue * (1 + padding);
    return niceCeil(padded);
  }, [maxDataValue]);

  // Compute adaptive width when `width` prop is not a number.
  const computedWidth = useMemo(() => {
    if (typeof width === "number") return width;
    const points = processedData.length || 1;
    const barCount = series?.bar?.length ?? 0;
    const lineCount = series?.line?.length ?? 0;
    const areaCount = series?.area?.length ?? 0;

    // Base per-point width and adjustments for multiple series types
    const basePerPoint = 84; // comfortable default per category
    const perBarExtra = Math.max(0, barCount - 1) * 10; // extra for grouped bars
    const perOtherExtra = (lineCount + areaCount) * 6; // small extra for lines/areas

    // Scale width slightly based on the magnitude of the data (niceMax)
    let sizeFactor = 1;
    if (niceMax > 100000) sizeFactor = 1.18;
    if (niceMax > 1000000) sizeFactor = 1.36;
    if (niceMax > 10000000) sizeFactor = 1.6;

    const perPoint = Math.round(
      (basePerPoint + perBarExtra + perOtherExtra) * sizeFactor
    );
    const marginExtra = 140; // space for axes, paddings and legend

    const raw = Math.round(points * perPoint + marginExtra);
    const min = 380;
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

  // Use centralized pill label renderer

  const handleBarClick = (
    data: ChartData,
    index: number,
    event: React.MouseEvent
  ) => {
    event.stopPropagation();
    const xAxisValue = data[xAxisConfig.dataKey] || "N/A";
    const tooltipId = `${xAxisValue}`;
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const existingIndex = activeTooltips.findIndex((t) => t.id === tooltipId);
    if (existingIndex !== -1) {
      setActiveTooltips((prev) => prev.filter((t) => t.id !== tooltipId));
    } else {
      const newTooltip = {
        id: tooltipId,
        data,
        position: { top: rect.top - 10, left: rect.right + 10 },
      };
      setActiveTooltips((prev) => [...prev, newTooltip]);
    }
  };

  const handleChartClick = (e?: unknown) => {
    // If Recharts provides activePayload (click on a line/area point), open tooltip for that point
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
        const newTooltip = {
          id: tooltipId,
          data: clickedData,
          position: {
            top: (ev?.chartY || 100) - 10,
            left: (ev?.chartX || 100) - 100,
          },
        };
        setActiveTooltips((prev) => [...prev, newTooltip]);
      }
      return;
    }

    // Otherwise clear tooltips (click on background)
    setActiveTooltips([]);
  };

  // Simplified alignment/drag logic (reused from BarChart but lighter type annotations)
  const ALIGNMENT_THRESHOLD = 25;
  const GUIDE_THRESHOLD = 60;
  const STRONG_SNAP_THRESHOLD = 35;
  const PRECISION_SNAP_THRESHOLD = 8;

  const updateAlignmentGuides = useCallback(
    (
      draggedTooltipId: string,
      currentPosition: { top: number; left: number }
    ) => {
      if (!isDragging) return;
      const getAllTooltips = () => {
        const allTooltips: Array<{
          id: string;
          position: { top: number; left: number };
        }> = [];
        allTooltips.push(...activeTooltips);
        const globalEvent = new CustomEvent("requestGlobalTooltips", {
          detail: { requesterId: draggedTooltipId, response: allTooltips },
        });
        window.dispatchEvent(globalEvent);
        return allTooltips;
      };

      const allTooltips = getAllTooltips();
      const otherTooltips = allTooltips.filter(
        (t) => t.id !== draggedTooltipId
      );
      const guides: AlignmentGuide[] = [];
      const tooltipDimensions = { width: 224, height: 120 };

      otherTooltips.forEach((tooltip) => {
        const topDiff = Math.abs(currentPosition.top - tooltip.position.top);
        if (topDiff <= GUIDE_THRESHOLD) {
          guides.push({
            type: "horizontal",
            position: tooltip.position.top,
            visible: true,
            sourceTooltip: {
              top: currentPosition.top,
              left: currentPosition.left,
              width: tooltipDimensions.width,
              height: tooltipDimensions.height,
            },
            targetTooltip: {
              top: tooltip.position.top,
              left: tooltip.position.left,
              width: tooltipDimensions.width,
              height: tooltipDimensions.height,
            },
          });
        }
        const leftDiff = Math.abs(currentPosition.left - tooltip.position.left);
        if (leftDiff <= GUIDE_THRESHOLD) {
          guides.push({
            type: "vertical",
            position: tooltip.position.left,
            visible: true,
            sourceTooltip: {
              top: currentPosition.top,
              left: currentPosition.left,
              width: tooltipDimensions.width,
              height: tooltipDimensions.height,
            },
            targetTooltip: {
              top: tooltip.position.top,
              left: tooltip.position.left,
              width: tooltipDimensions.width,
              height: tooltipDimensions.height,
            },
          });
        }
      });

      setAlignmentGuides(guides);
    },
    [isDragging, activeTooltips]
  );

  const snapToGuides = useCallback(
    (position: { top: number; left: number }) => {
      const snappedPosition = { ...position };
      let hasSnapped = false;
      alignmentGuides.forEach((guide: AlignmentGuide) => {
        if (guide.type === "horizontal") {
          const diff = Math.abs(position.top - guide.position);
          if (diff <= PRECISION_SNAP_THRESHOLD) {
            snappedPosition.top = guide.position;
            hasSnapped = true;
          }
        } else {
          const diff = Math.abs(position.left - guide.position);
          if (diff <= PRECISION_SNAP_THRESHOLD) {
            snappedPosition.left = guide.position;
            hasSnapped = true;
          }
        }
      });
      if (!hasSnapped) {
        alignmentGuides.forEach((guide: AlignmentGuide) => {
          if (guide.type === "horizontal") {
            const diff = Math.abs(position.top - guide.position);
            if (diff <= STRONG_SNAP_THRESHOLD)
              snappedPosition.top = guide.position;
          } else {
            const diff = Math.abs(position.left - guide.position);
            if (diff <= STRONG_SNAP_THRESHOLD)
              snappedPosition.left = guide.position;
          }
        });
      }
      alignmentGuides.forEach((guide: AlignmentGuide) => {
        if (guide.type === "horizontal") {
          const diff = Math.abs(position.top - guide.position);
          if (
            diff <= ALIGNMENT_THRESHOLD &&
            snappedPosition.top === position.top
          )
            snappedPosition.top = guide.position;
        } else {
          const diff = Math.abs(position.left - guide.position);
          if (
            diff <= ALIGNMENT_THRESHOLD &&
            snappedPosition.left === position.left
          )
            snappedPosition.left = guide.position;
        }
      });
      return snappedPosition;
    },
    [alignmentGuides]
  );

  const handleMouseDown = (e: React.MouseEvent, tooltipId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const tooltip = activeTooltips.find((t) => t.id === tooltipId);
    if (!tooltip) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    setIsDragging(tooltipId);
    setDragOffset({ x: offsetX, y: offsetY });
  };

  useEffect(() => {
    let rafId: number;
    let lastMousePosition = { x: 0, y: 0 };
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      lastMousePosition = { x: e.clientX, y: e.clientY };
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const newLeft = lastMousePosition.x - dragOffset.x;
        const newTop = lastMousePosition.y - dragOffset.y;
        const rawPosition = {
          top: Math.max(0, Math.min(newTop, window.innerHeight - 200)),
          left: Math.max(0, Math.min(newLeft, window.innerWidth - 250)),
        };
        updateAlignmentGuides(isDragging as string, rawPosition);
        const snappedPosition = snapToGuides(rawPosition);
        setActiveTooltips((prev) =>
          prev.map((tooltip) =>
            tooltip.id === isDragging
              ? { ...tooltip, position: snappedPosition }
              : tooltip
          )
        );
      });
    };
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(null);
        setAlignmentGuides([]);
        if (rafId) cancelAnimationFrame(rafId);
      }
    };
    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove, {
        passive: true,
      });
      document.addEventListener("mouseup", handleGlobalMouseUp);
      document.body.style.cursor = "grabbing";
      document.body.style.userSelect = "none";
    }
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [
    isDragging,
    dragOffset,
    alignmentGuides,
    updateAlignmentGuides,
    snapToGuides,
  ]);

  useEffect(() => {
    const handleCloseAllTooltips = () => {
      setActiveTooltips([]);
      setGlobalTooltipCount(0);
    };
    window.addEventListener("closeAllTooltips", handleCloseAllTooltips);
    return () =>
      window.removeEventListener("closeAllTooltips", handleCloseAllTooltips);
  }, []);

  useEffect(() => {
    const handleTooltipCountRequest = () => {
      window.dispatchEvent(
        new CustomEvent("tooltipCountResponse", {
          detail: { count: activeTooltips.length },
        })
      );
    };
    const handleGlobalTooltipsRequest = (event: Event) => {
      const customEvent = event as CustomEvent<{
        requesterId: string;
        response: Array<{
          id: string;
          position: { top: number; left: number };
        }>;
      }>;
      const detail = customEvent.detail;
      if (detail && detail.response && detail.requesterId) {
        activeTooltips.forEach((tooltip) => {
          if (!detail.response.find((t) => t.id === tooltip.id)) {
            detail.response.push({
              id: tooltip.id,
              position: tooltip.position,
            });
          }
        });
      }
    };
    window.addEventListener("requestTooltipCount", handleTooltipCountRequest);
    window.addEventListener(
      "requestGlobalTooltips",
      handleGlobalTooltipsRequest as EventListener
    );
    return () => {
      window.removeEventListener(
        "requestTooltipCount",
        handleTooltipCountRequest
      );
      window.removeEventListener(
        "requestGlobalTooltips",
        handleGlobalTooltipsRequest as EventListener
      );
    };
  }, [activeTooltips]);

  useEffect(() => {
    if (isDragging) return;
    let totalCount = 0;
    const handleCountResponse = (event: Event) => {
      const customEvent = event as CustomEvent;
      totalCount += customEvent.detail.count;
    };
    window.addEventListener("tooltipCountResponse", handleCountResponse);
    window.dispatchEvent(new CustomEvent("requestTooltipCount"));
    const timeoutId = setTimeout(() => {
      window.removeEventListener("tooltipCountResponse", handleCountResponse);
      setGlobalTooltipCount(totalCount);
    }, 5);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("tooltipCountResponse", handleCountResponse);
    };
  }, [activeTooltips.length, isDragging]);

  type TooltipPayloadItem = {
    dataKey: string;
    value: number;
    name: string;
    color?: string;
  };
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: TooltipPayloadItem[];
    label?: string;
  }) => {
    if (!active || !payload) return null;
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="font-medium text-foreground mb-2">{label}</p>
        {payload.map((entry, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="w-3 h-3 rounded-sm"
              style={{
                backgroundColor: finalColors[entry.dataKey] || entry.color,
              }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="text-foreground font-medium">
              {entry.value?.toLocaleString("pt-BR")}
            </span>
          </div>
        ))}
        <p className="text-xs text-muted-foreground mt-1">
          Clique para fixar este tooltip
        </p>
      </div>
    );
  };

  const getTitleClassName = (position: "left" | "center" | "right") => {
    const baseClasses = "text-xl font-semibold text-foreground mb-3";
    switch (position) {
      case "center":
        return `${baseClasses} text-center`;
      case "right":
        return `${baseClasses} text-right`;
      default:
        return `${baseClasses} text-left`;
    }
  };

  return (
    <div
      className={cn("rounded-lg bg-card p-4 relative", className)}
      style={{
        width:
          typeof width === "number"
            ? `${width + 32}px`
            : `${computedWidth + 32}px`,
        maxWidth: "100%",
      }}
    >
      {title && <h3 className={getTitleClassName(titlePosition)}>{title}</h3>}

      <ComposedChart
        data={processedData}
        width={typeof width === "number" ? width : computedWidth}
        height={height}
        margin={{ top: showLabels ? 48 : 20, right: 30, left: 20, bottom: 5 }}
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
          domain={[0, niceMax]}
          tickCount={6}
        />
        {showTooltip && (
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "hsl(var(--muted))", opacity: 0.1 }}
          />
        )}
        {showLegend && (
          <Legend
            wrapperStyle={{ color: "hsl(var(--foreground))", fontSize: "14px" }}
          />
        )}

        {seriesOrder.map((s) => {
          const key = s.key;
          const label =
            mapperConfig[key]?.label ?? labelMap?.[key] ?? formatFieldName(key);
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
                style={{ cursor: "pointer" }}
                activeBar={
                  <Rectangle
                    fill={color}
                    stroke={color}
                    strokeWidth={2}
                    opacity={0.8}
                  />
                }
              >
                {showLabels && (
                  <LabelList
                    dataKey={key}
                    position="top"
                    content={
                      renderPillLabel(color, "filled") as LabelListContent
                    }
                    offset={8}
                  />
                )}
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
                onClick={handleChartClick}
                style={{ cursor: "pointer", pointerEvents: "all" }}
              >
                {showLabels && (
                  <LabelList
                    dataKey={key}
                    position="top"
                    content={
                      renderPillLabel(color, "filled") as LabelListContent
                    }
                    offset={14}
                  />
                )}
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
                fillOpacity={0.15}
                onClick={handleChartClick}
                style={{ cursor: "pointer", pointerEvents: "all" }}
              >
                {showLabels && (
                  <LabelList
                    dataKey={key}
                    position="top"
                    content={renderPillLabel(color, "soft") as LabelListContent}
                    offset={12}
                  />
                )}
              </Area>
            );
          }
          return null;
        })}
      </ComposedChart>

      {alignmentGuides.map((guide, index: number) => {
        const isHorizontal = guide.type === "horizontal";
        const color = isHorizontal ? "#3b82f6" : "#ef4444";
        const startX = isHorizontal
          ? Math.min(
              guide.sourceTooltip.left + guide.sourceTooltip.width / 2,
              guide.targetTooltip.left + guide.targetTooltip.width / 2
            )
          : guide.sourceTooltip.left +
            (isHorizontal ? 0 : guide.sourceTooltip.width / 2);
        const endX = isHorizontal
          ? Math.max(
              guide.sourceTooltip.left + guide.sourceTooltip.width / 2,
              guide.targetTooltip.left + guide.targetTooltip.width / 2
            )
          : guide.targetTooltip.left +
            (isHorizontal ? 0 : guide.targetTooltip.width / 2);
        const startY = isHorizontal
          ? guide.sourceTooltip.top +
            (isHorizontal ? guide.sourceTooltip.height / 2 : 0)
          : Math.min(
              guide.sourceTooltip.top + guide.sourceTooltip.height / 2,
              guide.targetTooltip.top + guide.targetTooltip.height / 2
            );
        const endY = isHorizontal
          ? guide.targetTooltip.top +
            (isHorizontal ? guide.targetTooltip.height / 2 : 0)
          : Math.max(
              guide.sourceTooltip.top + guide.sourceTooltip.height / 2,
              guide.targetTooltip.top + guide.targetTooltip.height / 2
            );

        return (
          <div key={index}>
            <div
              className="fixed pointer-events-none z-30"
              style={{
                left: startX,
                top: startY,
                width: isHorizontal ? endX - startX : "2px",
                height: isHorizontal ? "2px" : endY - startY,
                backgroundColor: color,
                boxShadow: `0 0 8px ${color}60`,
                opacity: 0.9,
                borderStyle: "dashed",
                borderWidth: "1px",
                borderColor: color,
                transform: "translateZ(0)",
              }}
            />
            <div
              className="fixed pointer-events-none z-31"
              style={{
                left:
                  guide.sourceTooltip.left + guide.sourceTooltip.width / 2 - 4,
                top:
                  guide.sourceTooltip.top + guide.sourceTooltip.height / 2 - 4,
                width: "8px",
                height: "8px",
                backgroundColor: color,
                borderRadius: "50%",
                boxShadow: `0 0 4px ${color}80`,
                opacity: 0.8,
              }}
            />
            <div
              className="fixed pointer-events-none z-31"
              style={{
                left:
                  guide.targetTooltip.left + guide.targetTooltip.width / 2 - 4,
                top:
                  guide.targetTooltip.top + guide.targetTooltip.height / 2 - 4,
                width: "8px",
                height: "8px",
                backgroundColor: color,
                borderRadius: "50%",
                boxShadow: `0 0 4px ${color}80`,
                opacity: 0.8,
              }}
            />
          </div>
        );
      })}

      {activeTooltips.map((tooltip, index) => (
        <DraggableTooltip
          key={tooltip.id}
          id={tooltip.id}
          data={adaptDataForTooltip(tooltip.data)}
          position={tooltip.position}
          isDragging={isDragging === tooltip.id}
          title={title}
          dataKeys={allKeys}
          finalColors={finalColors}
          onMouseDown={(id, e) => handleMouseDown(e, id)}
          onClose={(id) =>
            setActiveTooltips((prev) => prev.filter((t) => t.id !== id))
          }
          periodLabel="Período Selecionado"
          dataLabel="Dados do Período"
          showCloseAllButton={index === 0}
          globalTooltipCount={globalTooltipCount}
          onCloseAll={() => window.dispatchEvent(new Event("closeAllTooltips"))}
          closeAllButtonPosition="top-center"
          closeAllButtonVariant="floating"
        />
      ))}
    </div>
  );
};

export default Chart;
