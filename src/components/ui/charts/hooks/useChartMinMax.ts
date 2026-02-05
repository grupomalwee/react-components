import { useMemo } from "react";
import { ChartData } from "../types/chart.types";

interface UseChartMinMaxProps {
  processedData: ChartData[];
  orderBy?: string;
  xAxisDataKey: string;
  categoryFormatter?: (value: string) => string;
}

interface ChartMinMaxResult {
  maxPeriodLabel: string;
  minPeriodLabel: string;
}

export const useChartMinMax = ({
  processedData,
  orderBy,
  xAxisDataKey,
  categoryFormatter,
}: UseChartMinMaxProps): ChartMinMaxResult => {
  return useMemo(() => {
    if (!processedData || processedData.length === 0 || !orderBy) {
      return {
        maxPeriodLabel: "",
        minPeriodLabel: "",
      };
    }

    let maxValue = -Infinity;
    let minValue = Infinity;
    let maxPeriodLabel = "";
    let minPeriodLabel = "";

    processedData.forEach((item) => {
      const value = Number((item as ChartData)[orderBy]) || 0;
      const periodName = String(item[xAxisDataKey] || "N/A");
      const formattedPeriod = categoryFormatter
        ? categoryFormatter(periodName)
        : periodName;

      if (value > maxValue) {
        maxValue = value;
        maxPeriodLabel = formattedPeriod;
      }
      if (value < minValue) {
        minValue = value;
        minPeriodLabel = formattedPeriod;
      }
    });

    return {
      maxPeriodLabel,
      minPeriodLabel,
    };
  }, [processedData, orderBy, xAxisDataKey, categoryFormatter]);
};
