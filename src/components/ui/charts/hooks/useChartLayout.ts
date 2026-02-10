import { useMemo } from "react";
import { computeYAxisTickWidth } from "../utils/helpers";

type Params = {
  chartMargin?: { left?: number; right?: number };
  yAxisLabel?: string | number;
  AXIS_LABEL_MARGIN: number;
  yTickFormatter: (v: number | string) => string;
  minLeftDataValue: number;
  niceMaxLeft: number;
  rightKeysLength: number;
  measuredWidth?: number | null;
  width: number | string;
  computedWidth: number;
};

export function useChartLayout({
  chartMargin,
  yAxisLabel,
  AXIS_LABEL_MARGIN,
  yTickFormatter,
  minLeftDataValue,
  niceMaxLeft,
  rightKeysLength,
  measuredWidth,
  width,
  computedWidth,
}: Params) {
  const finalChartRightMargin =
    chartMargin?.right ?? (rightKeysLength > 0 ? AXIS_LABEL_MARGIN : 30);
  const finalChartLeftMargin =
    chartMargin?.left ?? (yAxisLabel ? AXIS_LABEL_MARGIN : 0);

  const yAxisTickWidth = useMemo(() => {
    const yAxisLabelStr =
      yAxisLabel === null || yAxisLabel === undefined
        ? undefined
        : String(yAxisLabel);

    return computeYAxisTickWidth(
      chartMargin?.left,
      yAxisLabelStr,
      AXIS_LABEL_MARGIN,
      yTickFormatter,
      minLeftDataValue,
      niceMaxLeft,
    );
  }, [
    chartMargin?.left,
    yAxisLabel,
    AXIS_LABEL_MARGIN,
    yTickFormatter,
    minLeftDataValue,
    niceMaxLeft,
  ]);

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

  return {
    finalChartRightMargin,
    finalChartLeftMargin,
    yAxisTickWidth,
    effectiveChartWidth,
    chartInnerWidth,
    leftYAxisLabelDx,
    rightYAxisLabelDx,
  };
}
