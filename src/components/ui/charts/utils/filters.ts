import { ChartData, TooltipItem } from "../types";
import { detectDataFields, detectXAxis, formatFieldName } from "./helpers";
import {
  BiaxialConfig,
  ChartProps,
  DataMapper,
  PropsLabelList,
  SeriesOrder,
  SeriesProp,
  XAxisConfig,
} from "../types/chart.types";
import { toast } from "sonner";

export const filtersOrder = (mapperConfig: DataMapper, series: SeriesProp) => {
  const seriesOrder: Array<SeriesOrder> = [];

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

  return seriesOrder;
};

export const fnOpenTooltipForPeriod = (
  enableDraggableTooltips: boolean,
  processedData: Array<ChartData>,
  periodName: string,
  activeTooltips: TooltipItem[],
  setActiveTooltips: React.Dispatch<React.SetStateAction<TooltipItem[]>>,
  maxTooltips: number,
  effectiveChartWidth: number,
) => {
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
};

export const fnSmartConfig = ({ xAxis, data, labelMap }: ChartProps) => {
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
            (xAxis as XAxisConfig)?.label ?? formatFieldName(resolvedXAxisKey),
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
};

export const fnConfigRightKeys = (
  biaxialConfigNormalized: BiaxialConfig | null,
  yTickFormatter: (value: string | number) => string,
  finalColors: Record<string, string>,
) => {
  const decimals =
    typeof biaxialConfigNormalized?.decimals === "number"
      ? Math.max(0, Math.floor(biaxialConfigNormalized!.decimals))
      : 1;

  const rightTickFormatter = (v: number | string) => {
    if (biaxialConfigNormalized?.percentage) {
      const num = Number(String(v));
      const nf = new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
      const out = Number.isNaN(num) ? String(v ?? "") : nf.format(num);
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
        (biaxialConfigNormalized.stroke as Record<string, string>)[
          firstRightKey
        ] || defaultRightColor
      );

    return defaultRightColor;
  })();

  return { rightAxisColor, rightTickFormatter };
};

export const fnFormatterValueLegend = (
  value: string,
  mapperConfig: DataMapper,
  labelMap: Record<string, string> | undefined,
  legendUppercase: boolean,
) => {
  const key = String(value);
  const label =
    mapperConfig[key]?.label ?? labelMap?.[key] ?? formatFieldName(key);
  return legendUppercase ? label.toUpperCase() : label;
};

export const fnBuildConfigData = (
  s: SeriesOrder,
  mapperConfig: DataMapper,
  labelMap: Record<string, string> | undefined,
  finalColors: Record<string, string>,
  rightKeys: string[],
  biaxialConfigNormalized: BiaxialConfig | null,
) => {
  const key = s.key;
  const label =
    mapperConfig[key]?.label ?? labelMap?.[key] ?? formatFieldName(key);
  let color = finalColors[key];
  if (rightKeys.includes(key) && biaxialConfigNormalized?.stroke) {
    if (typeof biaxialConfigNormalized.stroke === "string") {
      color = biaxialConfigNormalized.stroke;
    } else {
      color = biaxialConfigNormalized.stroke[key] ?? color;
    }
  }

  return { label, color, key };
};

export const fnContentLabelList = (p: PropsLabelList) => {
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

  return needsOutside ? null : true;
};
