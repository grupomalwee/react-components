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
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const startYRef = useRef(0);
  const startScrollRef = useRef(0);

  const itemHeight = ITEM_HEIGHT;
  const centerIndex = CENTER_INDEX;
  const visibleItems = VISIBLE_ITEMS;
  const containerHeight = visibleItems * itemHeight;

  useEffect(() => {
    if (containerRef.current && !isScrollingRef.current) {
      const index = Math.round(value / step);
      const clampedIndex = Math.max(0, Math.min(items.length - 1, index));
      const scrollPosition = clampedIndex * itemHeight;
      containerRef.current.scrollTop = scrollPosition;
    }
  }, [value, itemHeight, step, items.length]);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleScroll = () => {
    if (!containerRef.current) return;

    isScrollingRef.current = true;

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    scrollTimeoutRef.current = setTimeout(() => {
      if (!containerRef.current) return;

      const newIndex = Math.round(containerRef.current.scrollTop / itemHeight);
      const newValue = items[newIndex];

      if (newValue !== undefined && newValue !== value) {
        onChange(newValue);
      }

      isScrollingRef.current = false;
    }, 150);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    startYRef.current = e.clientY;
    startScrollRef.current = containerRef.current.scrollTop;
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    const deltaY = startYRef.current - e.clientY;
    containerRef.current.scrollTop = startScrollRef.current + deltaY;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return {
    items,
    containerRef,
    itemHeight,
    containerHeight,
    centerIndex,
    handleScroll,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    isDragging,
  };
}
