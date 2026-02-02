import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TimeScrollPickerProps {
  date: Date | null;
  setDate: (date: Date | null) => void;
  hideSeconds?: boolean;
}

const ITEM_HEIGHT = 38.5;
const VISIBLE_ITEMS = 5;
const CENTER_INDEX = Math.floor(VISIBLE_ITEMS / 2);

interface ScrollColumnProps {
  value: number;
  onChange: (value: number) => void;
  max: number;
  label: string;
  hideSeconds?: boolean;
}

function ScrollColumn({ value, onChange, max, label }: ScrollColumnProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const items = Array.from({ length: max }, (_, i) => i);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const itemHeight = ITEM_HEIGHT;
  const centerIndex = CENTER_INDEX;
  const visibleItems = VISIBLE_ITEMS;
  const containerHeight = visibleItems * itemHeight;

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

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
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

      const newValue = Math.round(containerRef.current.scrollTop / itemHeight);

      if (newValue >= 0 && newValue < max) {
        containerRef.current.scrollTop = newValue * itemHeight;
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
    containerRef.current.scrollTop = scrollTop + (startY - pageY) * 2;
  };

  const handleEnd = () => {
    if (!containerRef.current) return;
    setIsDragging(false);

    requestAnimationFrame(() => {
      if (!containerRef.current) return;
      const newValue = Math.round(containerRef.current.scrollTop / itemHeight);
      if (newValue >= 0 && newValue < max) {
        containerRef.current.scrollTop = newValue * itemHeight;
        onChange(newValue);
      }
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.pageY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      handleMove(e.pageY);
    }
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) handleEnd();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].pageY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      if (e.cancelable) e.preventDefault();
      handleMove(e.touches[0].pageY);
    }
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="flex flex-col items-center">
      <span className="text-muted-foreground rounded-md font-semibold text-sm sm:text-sm text-center pb-2 uppercase tracking-wider">
        {label}
      </span>
      <div className={cn("relative w-20 sm:w-16")}>
        <div
          ref={containerRef}
          className="overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] touch-action-pan-y"
          onScroll={handleScroll}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            height: `${containerHeight}px`,
            paddingTop: `${centerIndex * itemHeight}px`,
            paddingBottom: `${centerIndex * itemHeight}px`,
            cursor: isDragging ? "grabbing" : "",
          }}
        >
          {items.map((item) => {
            const isSelected = item === value;
            return (
              <div
                key={item}
                className={cn(
                  "flex items-center justify-center select-none font-semibold tabular-nums transition-all duration-150",
                  isDragging ? "cursor-grabbing" : "",
                  isSelected
                    ? "text-lg sm:text-xl text-foreground scale-110"
                    : "text-sm sm:text-base text-muted-foreground opacity-60",
                )}
                style={{ height: `${itemHeight}px` }}
                onClick={() => !isDragging && onChange(item)}
              >
                {item.toString().padStart(2, "0")}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function TimeScrollPicker({
  date,
  setDate,
  hideSeconds = false,
}: TimeScrollPickerProps) {
  const currentDate = date || new Date();

  const itemHeight = ITEM_HEIGHT;
  const centerIndex = CENTER_INDEX;

  const handleTimeChange = (
    type: "hours" | "minutes" | "seconds",
    value: number,
  ) => {
    const newDate = new Date(currentDate);
    if (type === "hours") newDate.setHours(value);
    else if (type === "minutes") newDate.setMinutes(value);
    else newDate.setSeconds(value);
    setDate(newDate);
  };

  return (
    <div className="flex items-center justify-center gap-2 p-3 sm:p-4">
      <div className={cn("relative flex gap-4 sm:gap-3")}>
        <div
          className="absolute left-0 right-0 pointer-events-none z-10 rounded-lg bg-primary/10 border border-primary/20"
          style={{
            top: `calc(1.85rem + ${centerIndex * itemHeight}px)`,
            height: `${itemHeight}px`,
          }}
        />
        <ScrollColumn
          value={currentDate.getHours()}
          onChange={(v) => handleTimeChange("hours", v)}
          max={24}
          label="Hora"
          hideSeconds={hideSeconds}
        />
        <ScrollColumn
          value={currentDate.getMinutes()}
          onChange={(v) => handleTimeChange("minutes", v)}
          max={60}
          label="Min"
          hideSeconds={hideSeconds}
        />
        {!hideSeconds && (
          <ScrollColumn
            value={currentDate.getSeconds()}
            onChange={(v) => handleTimeChange("seconds", v)}
            max={60}
            label="Seg"
            hideSeconds={hideSeconds}
          />
        )}
      </div>
    </div>
  );
}
