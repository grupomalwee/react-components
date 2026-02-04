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
  const velocityRef = useRef(0);
  const lastTouchY = useRef(0);
  const lastTouchTime = useRef(0);
  const momentumAnimationRef = useRef<number | null>(null);

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
    const animationRef = momentumAnimationRef.current;
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (animationRef) {
        cancelAnimationFrame(animationRef);
      }
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
    if (momentumAnimationRef.current) {
      cancelAnimationFrame(momentumAnimationRef.current);
      momentumAnimationRef.current = null;
    }
    setIsDragging(true);
    setStartY(pageY);
    setScrollTop(containerRef.current.scrollTop);
    velocityRef.current = 0;
    lastTouchY.current = pageY;
    lastTouchTime.current = Date.now();
  };

  const handleMove = (pageY: number) => {
    if (!isDragging || !containerRef.current) return;

    const now = Date.now();
    const timeDelta = now - lastTouchTime.current;

    if (timeDelta > 0) {
      const delta = pageY - lastTouchY.current;
      velocityRef.current = delta / timeDelta;
    }

    lastTouchY.current = pageY;
    lastTouchTime.current = now;

    const multiplier = isTouchRef.current ? 1 : 1;
    containerRef.current.scrollTop = scrollTop + (startY - pageY) * multiplier;
  };

  const handleEnd = () => {
    if (!containerRef.current) return;
    setIsDragging(false);

    // Aplicar momentum scrolling no mobile
    if (isTouchRef.current && Math.abs(velocityRef.current) > 0.1) {
      let velocity = velocityRef.current * -30;
      const friction = 0.92;
      const minVelocity = 0.5;

      const animate = () => {
        if (!containerRef.current) return;

        velocity *= friction;

        if (Math.abs(velocity) < minVelocity) {
          // Snap to nearest item
          const newIndex = Math.round(
            containerRef.current.scrollTop / itemHeight,
          );
          const newValue = items[newIndex];
          if (newValue !== undefined) {
            const targetScroll = newIndex * itemHeight;
            const currentScroll = containerRef.current.scrollTop;
            const diff = targetScroll - currentScroll;

            if (Math.abs(diff) > 0.5) {
              containerRef.current.scrollTop += diff * 0.3;
              momentumAnimationRef.current = requestAnimationFrame(animate);
            } else {
              containerRef.current.scrollTop = targetScroll;
              onChange(newValue);
              momentumAnimationRef.current = null;
            }
          }
          return;
        }

        containerRef.current.scrollTop += velocity;
        momentumAnimationRef.current = requestAnimationFrame(animate);
      };

      momentumAnimationRef.current = requestAnimationFrame(animate);
    } else {
      // Snap imediato sem momentum
      requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const newIndex = Math.round(
          containerRef.current.scrollTop / itemHeight,
        );
        const newValue = items[newIndex];
        if (newValue !== undefined) {
          containerRef.current.scrollTop = newIndex * itemHeight;
          onChange(newValue);
        }
      });
    }
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
