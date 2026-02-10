import { useMemo } from "react";
import { ChartData, TimeSeriesConfig } from "../types/chart.types";

type Params = {
  data: ChartData[];
  xAxisKey: string;
  timeSeriesConfig?: boolean | TimeSeriesConfig;
  startIndex: number;
  endIndex: number;
};

export function useProcessedData({
  data,
  xAxisKey,
  timeSeriesConfig,
  startIndex,
  endIndex,
}: Params) {
  return useMemo(() => {
    const mapped = data.map((item) => ({
      ...item,
      name: String(item[xAxisKey] || "N/A"),
    }));

    if (timeSeriesConfig) {
      return mapped.slice(startIndex, endIndex + 1);
    }

    return mapped;
  }, [data, xAxisKey, timeSeriesConfig, startIndex, endIndex]);
}
