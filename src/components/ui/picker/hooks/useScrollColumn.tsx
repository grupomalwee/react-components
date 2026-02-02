import { useEffect, useRef, useState } from "react";
import { getItems, ITEM_HEIGHT, VISIBLE_ITEMS, CENTER_INDEX } from "../utils";

interface UseScrollColumnOptions {
  value: number;
  onChange: (value: number) => void;
  max: number;
  step?: number;
}

export function useScrollColumn({
  value,
  onChange,
  max,
  step = 1,
}: UseScrollColumnOptions) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const items = getItems(max, step);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isTouchRef = useRef(false);

  const itemHeight = ITEM_HEIGHT;
  const centerIndex = CENTER_INDEX;
  const visibleItems = VISIBLE_ITEMS;
  const containerHeight = visibleItems * itemHeight;

  useEffect(() => {
    if (containerRef.current && !isDragging) {
      requestAnimationFrame(() => {
        if (containerRef.current) {
          const index = Math.round(value / step);
          const clampedIndex = Math.max(0, Math.min(items.length - 1, index));
          const scrollPosition = clampedIndex * itemHeight;
          containerRef.current.scrollTop = scrollPosition;
        }
      });
    }
  }, [value, isDragging, itemHeight, step, items.length]);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (!containerRef.current || isDragging) return;

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    scrollTimeoutRef.current = setTimeout(() => {
      if (!containerRef.current) return;

      const newIndex = Math.round(containerRef.current.scrollTop / itemHeight);
      const newValue = items[newIndex];

      if (newValue !== undefined) {
        containerRef.current.scrollTop = newIndex * itemHeight;
        if (newValue !== value) onChange(newValue);
      }
    }, 100);
  };

  const handleStart = (pageY: number) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartY(pageY);
    setScrollTop(containerRef.current.scrollTop);
  };

  const handleMove = (pageY: number) => {
    if (!isDragging || !containerRef.current) return;
    const multiplier = isTouchRef.current ? 0.6 : 1;
    containerRef.current.scrollTop = scrollTop + (startY - pageY) * multiplier;
  };

  const handleEnd = () => {
    if (!containerRef.current) return;
    setIsDragging(false);

    requestAnimationFrame(() => {
      if (!containerRef.current) return;
      const newIndex = Math.round(containerRef.current.scrollTop / itemHeight);
      const newValue = items[newIndex];
      if (newValue !== undefined) {
        containerRef.current.scrollTop = newIndex * itemHeight;
        onChange(newValue);
      }
    });
  };

  const handlers = {
    onScroll: handleScroll,
    onWheel: (e: React.WheelEvent) => e.stopPropagation(),
    onMouseDown: (e: React.MouseEvent) => {
      isTouchRef.current = false;
      handleStart(e.pageY);
    },
    onMouseMove: (e: React.MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        handleMove(e.pageY);
      }
    },
    onMouseUp: () => handleEnd(),
    onMouseLeave: () => {
      if (isDragging) handleEnd();
    },
    onTouchStart: (e: React.TouchEvent) => {
      isTouchRef.current = true;
      handleStart(e.touches[0].pageY);
    },
    onTouchMove: (e: React.TouchEvent) => {
      if (isDragging) {
        if (e.cancelable) e.preventDefault();
        handleMove(e.touches[0].pageY);
      }
    },
    onTouchEnd: () => {
      isTouchRef.current = false;
      handleEnd();
    },
  };

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return;
    const clamped = Math.max(0, Math.min(items.length - 1, index));
    containerRef.current.scrollTop = clamped * itemHeight;
  };

  return {
    items,
    containerRef,
    isDragging,
    itemHeight,
    containerHeight,
    centerIndex,
    handlers,
    scrollToIndex,
  };
}
