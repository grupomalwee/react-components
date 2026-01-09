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
import { renderPillLabel, renderInsideBarLabel, valueFormatter } from "./utils";
import NoData from "./NoData";

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

  const biaxialConfigNormalized = useMemo(() => {
    if (!biaxial) return null;
    if (typeof biaxial === "string") return { key: [biaxial] } as BiaxialConfig;
    if (Array.isArray(biaxial)) return { key: biaxial } as BiaxialConfig;
    return biaxial as BiaxialConfig;
  }, [biaxial]);

  useMemo(() => {
    if (!biaxialConfigNormalized) return;
    const leftLabelMissing = !yAxisLabel || String(yAxisLabel).trim() === "";
    const rightLabelMissing =
      !biaxialConfigNormalized.label ||
      String(biaxialConfigNormalized.label).trim() === "";
    if (leftLabelMissing || rightLabelMissing) {
      throw new Error(
        "When using `biaxial`, you must provide both `yAxisLabel` (left axis) and `biaxial.label` (right axis)."
      );
    }
  }, [biaxialConfigNormalized, yAxisLabel]);

  const rightKeys = useMemo(
    () => biaxialConfigNormalized?.key ?? [],
    [biaxialConfigNormalized]
  );
  const leftKeys = useMemo(
    () => allKeys.filter((k) => !rightKeys.includes(k)),
    [allKeys, rightKeys]
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

  const maxLeftDataValue = useMemo(() => {
    let max = 0;
    const numericKeys = leftKeys.length > 0 ? leftKeys : allKeys;
    for (const row of processedData) {
      const r = row as Record<string, unknown>;
      for (const key of numericKeys) {
        const v = r[key];
        if (typeof v === "number" && Number.isFinite(v) && v > max) max = v;
      }
    }
    return max;
  }, [processedData, leftKeys, allKeys]);

  const minLeftDataValue = useMemo(() => {
    let min = 0;
    const numericKeys = leftKeys.length > 0 ? leftKeys : allKeys;
    for (const row of processedData) {
      const r = row as Record<string, unknown>;
      for (const key of numericKeys) {
        const v = r[key];
        if (typeof v === "number" && Number.isFinite(v) && v < min)
          min = v as number;
      }
    }
    return min;
  }, [processedData, leftKeys, allKeys]);

  const maxRightDataValue = useMemo(() => {
    let max = 0;
    if (rightKeys.length === 0) return max;
    for (const row of processedData) {
      const r = row as Record<string, unknown>;
      for (const key of rightKeys) {
        const v = r[key];
        if (typeof v === "number" && Number.isFinite(v) && v > max) max = v;
      }
    }
    return max;
  }, [processedData, rightKeys]);

  const minRightDataValue = useMemo(() => {
    let min = 0;
    if (rightKeys.length === 0) return min;
    for (const row of processedData) {
      const r = row as Record<string, unknown>;
      for (const key of rightKeys) {
        const v = r[key];
        if (typeof v === "number" && Number.isFinite(v) && v < min)
          min = v as number;
      }
    }
    return min;
  }, [processedData, rightKeys]);

  const computeNiceMax = useCallback((maxValue: number) => {
    let padding = 0.08;
    if (maxValue > 1_000_000) padding = 0.05;
    if (maxValue > 10_000_000) padding = 0.03;
    if (maxValue === 0) padding = 0.12;
    const padded = maxValue * (1 + padding);
    return niceCeil(padded);
  }, []);

  const niceMaxLeft = useMemo(
    () => computeNiceMax(maxLeftDataValue),
    [computeNiceMax, maxLeftDataValue]
  );
  const niceMaxRight = useMemo(
    () => computeNiceMax(maxRightDataValue),
    [computeNiceMax, maxRightDataValue]
  );

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

    // Size factor based on data magnitude (use the larger axis magnitude)
    const overallNiceMax = Math.max(niceMaxLeft || 0, niceMaxRight || 0);
    let sizeFactor = 1;
    if (overallNiceMax > 100_000) sizeFactor = 1.1;
    if (overallNiceMax > 1_000_000) sizeFactor = 1.2;
    if (overallNiceMax > 10_000_000) sizeFactor = 1.3;

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
    niceMaxLeft,
    niceMaxRight,
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
    () => "text-[1.4rem] font-semibold text-foreground mb-3",
    []
  );
  const finalValueFormatter = useMemo(() => {
    const nf = new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    if (valueFormatter) {
      if (formatBR) {
        const wrapped: valueFormatter = (props) => {
          const { value, formattedValue } = props as {
            value: number | string | undefined;
            formattedValue: string;
            [key: string]: unknown;
          };

          let num: number = NaN;
          if (typeof value === "number") num = value;
          else if (typeof value === "string" && value.trim() !== "") {
            const parsed = Number(value);
            num = Number.isNaN(parsed) ? NaN : parsed;
          }

          const brFormatted = !Number.isNaN(num)
            ? nf.format(num)
            : String(formattedValue ?? value ?? "");

          return valueFormatter({
            ...(props as object),
            formattedValue: brFormatted,
            value: undefined,
          });
        };
        return wrapped;
      }

      return valueFormatter;
    }

    if (!formatBR) return undefined;

    const builtIn: valueFormatter = (props) => {
      const { value, formattedValue } = props as {
        value: number | string | undefined;
        formattedValue: string;
        [key: string]: unknown;
      };

      let num: number = NaN;
      if (typeof value === "number") num = value;
      else if (typeof value === "string" && value.trim() !== "") {
        const parsed = Number(value);
        num = Number.isNaN(parsed) ? NaN : parsed;
      }

      if (!Number.isNaN(num)) return nf.format(num);

      return String(formattedValue ?? value ?? "");
    };

    return builtIn;
  }, [valueFormatter, formatBR]);

  const yTickFormatter = useMemo(() => {
    const nf = new Intl.NumberFormat("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    const stripCurrency = (s: string) => String(s).replace(/^\s*R\$\s?/, "");

    if (finalValueFormatter) {
      return (v: number | string) => {
        const num = Number(String(v));
        const formatted = Number.isNaN(num) ? String(v ?? "") : nf.format(num);
        const out = finalValueFormatter({
          value: v as number | string,
          formattedValue: formatted,
        });
        return stripCurrency(String(out));
      };
    }

    return (value: number | string) => {
      const num = Number(String(value));
      return Number.isNaN(num) ? String(value ?? "") : nf.format(num);
    };
  }, [finalValueFormatter]);
  const finalEnableHighlights = enableHighlights;
  const finalEnableShowOnly = enableShowOnly;
  const finalEnablePeriodsDropdown =
    enablePeriodsDropdown && enableDraggableTooltips;

  const defaultChartRightMargin = 30;
  const defaultChartLeftMargin = 0;
  const axisLabelMargin = 56;

  const containerPaddingLeft = -6;

  const finalChartRightMargin =
    chartMargin?.right ??
    (rightKeys.length > 0 ? axisLabelMargin : defaultChartRightMargin);
  const finalChartLeftMargin =
    chartMargin?.left ??
    (yAxisLabel ? axisLabelMargin : defaultChartLeftMargin);
  const yAxisTickWidth = useMemo(() => {
    if (typeof chartMargin?.left === "number") return chartMargin.left;

    if (yAxisLabel) return axisLabelMargin;
    const samples = [
      minLeftDataValue,
      niceMaxLeft,
      Math.round((minLeftDataValue + niceMaxLeft) / 2),
      0,
    ];
    const formatted = samples.map((v) => String(yTickFormatter(v)));
    const maxLen = formatted.reduce((m, s) => Math.max(m, s.length), 0);

    const estimated = Math.max(48, Math.min(220, maxLen * 8 + 24));
    return estimated;
  }, [
    chartMargin?.left,
    yAxisLabel,
    yTickFormatter,
    minLeftDataValue,
    niceMaxLeft,
  ]);

  const composedChartLeftMargin = chartMargin?.left ?? defaultChartLeftMargin;
  const composedChartRightMargin =
    chartMargin?.right ?? defaultChartRightMargin;
  const finalChartTopMargin = chartMargin?.top ?? (showLabels ? 48 : 20);
  const baseBottom = chartMargin?.bottom ?? 5;
  const extraForXAxisLabel = xAxisLabel ? 22 : 0;
  const extraForLegend = showLegend ? 36 : 0;
  const finalChartBottomMargin =
    baseBottom + extraForXAxisLabel + extraForLegend;
  const measuredInner = measuredWidth
    ? Math.max(0, measuredWidth - 32)
    : undefined;
  const effectiveChartWidth =
    typeof width === "number" ? width : measuredInner ?? computedWidth;
  const chartInnerWidth =
    effectiveChartWidth - composedChartLeftMargin - composedChartRightMargin;

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
          <NoData title={title} />
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
        className={cn("rounded-lg bg-card relative", className)}
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
              marginTop: "19px",
            }}
          >
            <div className={titleClassName}>{title}</div>
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
                        position="insideTop"
                        content={
                          renderInsideBarLabel(
                            color,
                            finalValueFormatter
                          ) as LabelListContent
                        }
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
                    dataKey={key}
                    yAxisId={rightKeys.includes(key) ? "right" : "left"}
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
