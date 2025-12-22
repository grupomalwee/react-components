import { useState, useCallback } from "react";

interface UseChartHighlightsReturn {
  highlightedSeries: Set<string>;
  showOnlyHighlighted: boolean;
  toggleHighlight: (key: string) => void;
  setShowOnlyHighlighted: (show: boolean) => void;
  clearHighlights: () => void;
  getSeriesStyle: (key: string) => React.CSSProperties;
  isHighlighted: (key: string) => boolean;
}

export const useChartHighlights = (): UseChartHighlightsReturn => {
  const [highlightedSeries, setHighlightedSeries] = useState<Set<string>>(
    new Set()
  );
  const [showOnlyHighlighted, setShowOnlyHighlighted] = useState(false);

  const toggleHighlight = useCallback((key: string) => {
    setHighlightedSeries((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  const clearHighlights = useCallback(() => {
    setHighlightedSeries(new Set());
    setShowOnlyHighlighted(false);
  }, []);

  const isHighlighted = useCallback(
    (key: string) => {
      return highlightedSeries.has(key);
    },
    [highlightedSeries]
  );

  const getSeriesStyle = useCallback(
    (key: string): React.CSSProperties => {
      const hasHighlights = highlightedSeries.size > 0;
      const isSeriesHighlighted = highlightedSeries.has(key);

      if (showOnlyHighlighted && !isSeriesHighlighted) {
        return {
          opacity: 0,
          pointerEvents: "none",
          transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        };
      }

      if (!hasHighlights) {
        return {
          opacity: 1,
          transform: "scale(1)",
          transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        };
      }

      if (isSeriesHighlighted) {
        return {
          opacity: 1,
          transform: "scale(1.02)",
          filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15))",
          transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        };
      }

      return {
        opacity: 0.25,
        transform: "scale(0.98)",
        transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
      };
    },
    [highlightedSeries, showOnlyHighlighted]
  );

  return {
    highlightedSeries,
    showOnlyHighlighted,
    toggleHighlight,
    setShowOnlyHighlighted,
    clearHighlights,
    getSeriesStyle,
    isHighlighted,
  };
};
