import { useCallback } from "react";

interface ChartData {
  [key: string]: string | number | boolean | null | undefined;
}

interface TooltipItem {
  id: string;
  data: ChartData;
  position: { top: number; left: number };
}

interface UseChartClickProps {
  enableDraggableTooltips: boolean;
  xAxisDataKey: string;
  toggleTooltip: (
    tooltipId: string,
    data: ChartData,
    basePosition: { top: number; left: number }
  ) => void;
  setActiveTooltips: React.Dispatch<React.SetStateAction<TooltipItem[]>>;
}

export const useChartClick = ({
  enableDraggableTooltips,
  xAxisDataKey,
  toggleTooltip,
  setActiveTooltips,
}: UseChartClickProps) => {
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
          clickedData[xAxisDataKey] || clickedData.name || "N/A";
        const tooltipId = String(xAxisValue);

        toggleTooltip(tooltipId, clickedData, {
          top: (ev.chartY || 100) - 10,
          left: (ev.chartX || 100) - 100,
        });
      } else {
        setActiveTooltips([]);
      }
    },
    [enableDraggableTooltips, xAxisDataKey, toggleTooltip, setActiveTooltips]
  );

  const handleBarClick = useCallback(
    (data: ChartData, index: number, event: React.MouseEvent) => {
      if (!enableDraggableTooltips) return;

      event.stopPropagation();
      const xAxisValue = data[xAxisDataKey] || "N/A";
      const tooltipId = String(xAxisValue);
      const rect = (event.target as HTMLElement).getBoundingClientRect();

      toggleTooltip(tooltipId, data, {
        top: Math.max(8, rect.top - 10),
        left: rect.right + 10,
      });
    },
    [enableDraggableTooltips, xAxisDataKey, toggleTooltip]
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

  return {
    handleChartClick,
    handleBarClick,
    handleSeriesClick,
  };
};
