import { useMemo } from "react";
import {
  computeChartWidth,
  computeEstimatedAxisNeeded,
  computeAxisLabelWidth,
} from "../utils/chartHelpers";
import type { SeriesCounts } from "../types";

export function useChartLayout(args: {
  width: number | string | undefined;
  measuredWidth: number | null;
  points: number;
  seriesCounts: SeriesCounts;
  niceMax: number;
  yAxes?: Partial<{
    left: { label?: string };
    right: { label?: string };
  }>;
  yAxisLabel?: string;
  chartMargin?: Partial<{
    top: number;
    right: number;
    left: number;
    bottom: number;
  }>;
  showLabels?: boolean;
  showLegend?: boolean;
  xAxisLabel?: string | undefined;
  leftLabelSample?: string;
  rightLabelSample?: string;
}) {
  const {
    width,
    measuredWidth,
    points,
    seriesCounts,
    niceMax,
    yAxes,
    yAxisLabel,
    chartMargin,
    showLabels,
    showLegend,
    xAxisLabel,
    leftLabelSample,
    rightLabelSample,
  } = args;

  const containerPaddingLeft = 16;
  const defaultChartRightMargin = 30;
  const defaultChartLeftMargin = 0;

  const computedWidth = useMemo(() => {
    if (typeof width === "number") return width;
    return computeChartWidth(points, seriesCounts, niceMax, {
      minWidth: 300,
      maxWidth: 1800,
    });
  }, [
    width,
    points,
    seriesCounts.bar,
    seriesCounts.line,
    seriesCounts.area,
    niceMax,
  ]);

  const measuredInner = measuredWidth
    ? Math.max(0, measuredWidth - 32)
    : undefined;
  const effectiveChartWidth =
    typeof width === "number" ? width : measuredInner ?? computedWidth;

  const estimatedLeftNeeded = computeEstimatedAxisNeeded(
    leftLabelSample ?? "",
    yAxisLabel,
    containerPaddingLeft,
    defaultChartLeftMargin
  );

  const estimatedRightNeeded = computeEstimatedAxisNeeded(
    rightLabelSample ?? "",
    yAxes?.right?.label,
    containerPaddingLeft,
    defaultChartRightMargin
  );

  const finalChartLeftMargin =
    chartMargin?.left ??
    Math.max(estimatedLeftNeeded, yAxisLabel ? 40 : defaultChartLeftMargin);

  const finalChartRightMargin =
    chartMargin?.right ??
    Math.max(defaultChartRightMargin, estimatedRightNeeded);
  const finalChartTopMargin = chartMargin?.top ?? (showLabels ? 48 : 20);
  const baseBottom = chartMargin?.bottom ?? 5;
  const extraForXAxisLabel = xAxisLabel ? 22 : 0;
  const extraForLegend = showLegend ? 36 : 0;
  const finalChartBottomMargin =
    baseBottom + extraForXAxisLabel + extraForLegend;

  const chartInnerWidth =
    effectiveChartWidth - finalChartLeftMargin - finalChartRightMargin;

  const leftAxisLabelWidth = computeAxisLabelWidth(
    yAxes?.left?.label ?? yAxisLabel
  );
  const rightAxisLabelWidth = computeAxisLabelWidth(yAxes?.right?.label);

  const leftYAxisLabelDx = Math.ceil(leftAxisLabelWidth / 2) + 8;
  const rightYAxisLabelDx = Math.ceil(rightAxisLabelWidth / 2) + 8;

  return {
    containerPaddingLeft,
    computedWidth,
    measuredInner,
    effectiveChartWidth,
    chartInnerWidth,
    finalChartLeftMargin,
    finalChartRightMargin,
    finalChartTopMargin,
    finalChartBottomMargin,
    leftYAxisLabelDx,
    rightYAxisLabelDx,
  } as const;
}
