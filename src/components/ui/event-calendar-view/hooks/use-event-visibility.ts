"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";

interface EventVisibilityOptions {
  eventHeight: number;
  eventGap: number;
}

interface EventVisibilityResult {
  contentRef: React.RefObject<HTMLDivElement>;
  contentHeight: number | null;
  getVisibleEventCount: (totalEvents: number) => number;
}

/**
 * Hook for calculating event visibility based on container height
 * Uses ResizeObserver for efficient updates
 */
export function useEventVisibilityAgenda({
  eventHeight,
  eventGap,
}: EventVisibilityOptions): EventVisibilityResult {
  // Use the standard pattern for React refs
  const contentRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<ResizeObserver | null>(null);
  const [contentHeight, setContentHeight] = useState<number | null>(null);

  // Use layout effect for synchronous measurement before paint
  useLayoutEffect(() => {
    if (!contentRef.current) return;

    // Function to update the content height
    const updateHeight = () => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.clientHeight);
      }
    };

    // Initial measurement (synchronous)
    updateHeight();

    // Create observer only once and reuse it
    if (!observerRef.current) {
      observerRef.current = new ResizeObserver(() => {
        // Just call updateHeight when resize is detected
        updateHeight();
      });
    }

    // Start observing the content container
    observerRef.current.observe(contentRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const getVisibleEventCount = useMemo(() => {
    return (totalEvents: number): number => {
      if (!contentHeight) return totalEvents;
      const availableHeight = contentHeight + eventGap + 4;
      const slotHeight = eventHeight + eventGap;

      const maxSlots = Math.floor(availableHeight / slotHeight);

      if (totalEvents <= maxSlots) {
        return totalEvents;
      }
      return maxSlots > 0 ? maxSlots - 1 : 0;
    };
  }, [contentHeight, eventHeight, eventGap]);

  return {
    contentHeight,
    contentRef,
    getVisibleEventCount,
  } as EventVisibilityResult;
}
