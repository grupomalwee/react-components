import { useCallback } from "react";

export function useSeriesOpacity(highlightedSeries: Set<string>) {
  return useCallback(
    (key: string) => {
      return highlightedSeries.size > 0
        ? highlightedSeries.has(key)
          ? 1
          : 0.25
        : 1;
    },
    [highlightedSeries],
  );
}
