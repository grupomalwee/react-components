import { useEffect, useRef, useState } from "react";

export interface UseScrollControlParams {
  value: number;
  onChange: (value: number) => void;
  max: number;
  itemHeight: number;
}

export function useScrollControl({
  value,
  onChange,
  max,
  itemHeight,
}: UseScrollControlParams) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startYRef = useRef(0);
  const scrollTopRef = useRef(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isClickScrollingRef = useRef(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (containerRef.current && !isDragging) {
      requestAnimationFrame(() => {
        if (containerRef.current) {
          const scrollPosition = value * itemHeight;
          containerRef.current.scrollTop = scrollPosition;
        }
      });
    }
  }, [value, isDragging, itemHeight]);

  const handleScroll = () => {
    if (!containerRef.current || isDragging) return;

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    scrollTimeoutRef.current = setTimeout(() => {
      if (!containerRef.current) return;

      const newValue = Math.round(containerRef.current.scrollTop / itemHeight);

      if (newValue >= 0 && newValue < max) {
        containerRef.current.scrollTop = newValue * itemHeight;
        if (newValue !== value) onChange(newValue);
      }
    }, 100);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    startYRef.current = e.pageY;
    scrollTopRef.current = containerRef.current.scrollTop;
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
    }
    isClickScrollingRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    containerRef.current.scrollTop =
      scrollTopRef.current + (startYRef.current - e.pageY) * 2;
  };

  const handleMouseUp = () => {
    if (!containerRef.current) return;
    setIsDragging(false);

    requestAnimationFrame(() => {
      if (!containerRef.current) return;
      const newValue = Math.round(containerRef.current.scrollTop / itemHeight);
      if (newValue >= 0 && newValue < max) {
        if (!isClickScrollingRef.current) {
          containerRef.current.scrollTop = newValue * itemHeight;
          onChange(newValue);
        }
      }
    });
  };

  const handleMouseLeave = () => {
    if (isDragging) handleMouseUp();
  };

  const handleItemClick = (item: number) => {
    if (!containerRef.current || isDragging) return;
    if (item === value) return;

    isClickScrollingRef.current = true;
    containerRef.current.scrollTo({
      top: item * itemHeight,
      behavior: "smooth",
    });

    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
      clickTimeoutRef.current = null;
      onChange(item);
    }, 260);
  };

  return {
    containerRef,
    isDragging,
    handleScroll,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    handleItemClick,
  } as const;
}

export default useScrollControl;
