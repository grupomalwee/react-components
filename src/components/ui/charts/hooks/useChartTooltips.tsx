import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";

interface ChartData {
  [key: string]: string | number | boolean | null | undefined;
}

interface TooltipItem {
  id: string;
  data: ChartData;
  position: { top: number; left: number };
}

export const useChartTooltips = (maxTooltips: number = 5) => {
  const [activeTooltips, setActiveTooltips] = useState<TooltipItem[]>([]);

  useEffect(() => {
    window.dispatchEvent(new Event("recountTooltips"));
  }, [activeTooltips.length]);

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

  const onTooltipPositionChange = useCallback(
    (id: string, position: { top: number; left: number }) => {
      setActiveTooltips((prev) =>
        prev.map((t) => (t.id === id ? { ...t, position } : t))
      );
    },
    []
  );

  const closeTooltip = useCallback((id: string) => {
    setActiveTooltips((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const closeAllTooltips = useCallback(() => {
    setActiveTooltips([]);
  }, []);

  return {
    activeTooltips,
    toggleTooltip,
    onTooltipPositionChange,
    closeTooltip,
    closeAllTooltips,
    setActiveTooltips,
  };
};
