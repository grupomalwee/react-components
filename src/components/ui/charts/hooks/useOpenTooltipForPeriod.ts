import { useCallback } from "react";
import { fnOpenTooltipForPeriod } from "../utils/filters";
import { ChartData, TooltipItem } from "../types/chart.types";

type Params = {
  enableDraggableTooltips: boolean;
  processedData: ChartData[];
  activeTooltips: TooltipItem[];
  setActiveTooltips: React.Dispatch<React.SetStateAction<TooltipItem[]>>;
  maxTooltips: number;
  effectiveChartWidth: number;
};

export function useOpenTooltipForPeriod({
  enableDraggableTooltips,
  processedData,
  activeTooltips,
  setActiveTooltips,
  maxTooltips,
  effectiveChartWidth,
}: Params) {
  return useCallback(
    (periodName: string) => {
      fnOpenTooltipForPeriod(
        enableDraggableTooltips,
        processedData,
        periodName,
        activeTooltips,
        setActiveTooltips,
        maxTooltips,
        effectiveChartWidth,
      );
    },
    [
      enableDraggableTooltips,
      processedData,
      activeTooltips,
      effectiveChartWidth,
      maxTooltips,
      setActiveTooltips,
    ],
  );
}
