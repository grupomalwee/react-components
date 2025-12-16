import type { SeriesEntry, SeriesProp, SeriesCounts, YAxisMap } from "../types";

export function computeSeriesOrder(
  series: SeriesProp | undefined,
  mapperConfig: Record<string, unknown>
): SeriesEntry[] {
  const seriesOrder: SeriesEntry[] = [];
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
  return seriesOrder;
}

export function computeProcessedData(
  data: Array<Record<string, unknown>>,
  xAxisKey: string
): Array<Record<string, unknown> & { name: string }> {
  return data.map((item) => ({
    ...item,
    name: String(item[xAxisKey] ?? "N/A"),
  }));
}

export function computeAllKeys(seriesOrder: SeriesEntry[]) {
  return seriesOrder.map((s) => s.key).filter(Boolean);
}

export function computeLeftRightKeys(allKeys: string[], yAxisMap?: YAxisMap) {
  const normalize = (v: unknown) => {
    if (v === "left" || v === "right") return v as "left" | "right";
    if (v === 1 || v === "1" || v === true) return "right";
    return "left";
  };

  const leftKeys = !yAxisMap
    ? allKeys
    : allKeys.filter((k) => normalize(yAxisMap?.[k]) === "left");
  const rightKeys = !yAxisMap
    ? []
    : allKeys.filter((k) => normalize(yAxisMap?.[k]) === "right");
  return { leftKeys, rightKeys };
}

export function computeNiceMax(value: number) {
  let padding = 0.08;
  if (value > 1_000_000) padding = 0.05;
  if (value > 10_000_000) padding = 0.03;
  if (value === 0) padding = 0.12;
  const padded = value * (1 + padding);
  return padded;
}

export function computeChartWidth(
  dataLength: number,
  seriesCounts: SeriesCounts,
  niceMax: number,
  opts?: { minWidth?: number; maxWidth?: number }
) {
  const basePerPoint = 60;
  const perBarExtra =
    seriesCounts.bar > 0 ? Math.max(0, seriesCounts.bar - 1) * 8 : 0;
  const perOtherExtra = (seriesCounts.line + seriesCounts.area) * 4;

  let sizeFactor = 1;
  if (niceMax > 100_000) sizeFactor = 1.1;
  if (niceMax > 1_000_000) sizeFactor = 1.2;
  if (niceMax > 10_000_000) sizeFactor = 1.3;

  const perPoint = Math.round(
    (basePerPoint + perBarExtra + perOtherExtra) * sizeFactor
  );
  const marginExtra = 120;
  const calculated = Math.max(1, dataLength) * perPoint + marginExtra;

  const minWidth = opts?.minWidth ?? 300;
  const maxWidth = opts?.maxWidth ?? 1800;
  return Math.max(minWidth, Math.min(maxWidth, calculated));
}

export function computeLabelSample(
  keys: string[],
  candidates: number[],
  yTickFormatter: (v: number | string) => string
) {
  if (!keys || keys.length === 0) return "";
  return String(
    candidates
      .map((v) => yTickFormatter(v))
      .sort((a, b) => String(b).length - String(a).length)[0] ?? ""
  );
}

export function computeEstimatedAxisNeeded(
  labelSample: string,
  axisLabel?: string,
  containerPaddingLeft = 16,
  defaultLeftMargin = 0
) {
  const tickW = labelSample ? estimateTextWidth(labelSample) : 0;
  const axisW = axisLabel ? estimateTextWidth(axisLabel) + 8 : 0;
  return Math.max(
    defaultLeftMargin,
    Math.ceil(tickW + axisW + containerPaddingLeft / 2)
  );
}

export function computeAxisLabelWidth(label?: string) {
  return label ? estimateTextWidth(label) : 0;
}

import { estimateTextWidth } from "./measure";
