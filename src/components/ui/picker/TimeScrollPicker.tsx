import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface TimeScrollPickerProps {
  date: Date | null;
  setDate: (date: Date | null) => void;
  hideSeconds?: boolean;
}

const ITEM_HEIGHT = 39;
const ITEM_HEIGHT_MOBILE = 32;
const VISIBLE_ITEMS = 5;
const VISIBLE_ITEMS_MOBILE = 3;
const CENTER_INDEX = Math.floor(VISIBLE_ITEMS / 2);
const CENTER_INDEX_MOBILE = Math.floor(VISIBLE_ITEMS_MOBILE / 2);

interface ScrollColumnProps {
  value: number;
  onChange: (value: number) => void;
  max: number;
  label: string;
  hideSeconds?: boolean;
}

function ScrollColumn({
  value,
  onChange,
  max,
  label,
  hideSeconds,
}: ScrollColumnProps) {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const items = Array.from({ length: max }, (_, i) => i);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const itemHeight = isMobile ? ITEM_HEIGHT_MOBILE : ITEM_HEIGHT;
  const centerIndex = isMobile ? CENTER_INDEX_MOBILE : CENTER_INDEX;
  const visibleItems = isMobile ? VISIBLE_ITEMS_MOBILE : VISIBLE_ITEMS;
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
    setStartY(e.pageY);
    setScrollTop(containerRef.current.scrollTop);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    containerRef.current.scrollTop = scrollTop + (startY - e.pageY) * 2;
  };

  const handleMouseUp = () => {
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

  const handleMouseLeave = () => {
    if (isDragging) handleMouseUp();
  };
  const containerWidth = isMobile ? (hideSeconds ? "w-16" : "w-8") : "w-16";

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-muted-foreground rounded-md font-semibold text-[clamp(0.575rem,1.2vw,0.75rem)] sm:text-[clamp(0.65rem,1.1vw,0.825rem)] text-center pb-1 uppercase tracking-wider">
        {label}
      </span>
      <div className={cn("relative", containerWidth)}>
        <div
          ref={containerRef}
          className="overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
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
                  "flex items-center justify-center select-none font-semibold tabular-nums",
                  isDragging ? "cursor-grabbing" : "",
                  isSelected
                    ? "sm:text-lg text-md text-foreground"
                    : "sm:text-sm text-xs text-muted-foreground"
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
  const isMobile = useIsMobile();
  const currentDate = date || new Date();

  const itemHeight = isMobile ? ITEM_HEIGHT_MOBILE : ITEM_HEIGHT;
  const centerIndex = isMobile ? CENTER_INDEX_MOBILE : CENTER_INDEX;

  const handleTimeChange = (
    type: "hours" | "minutes" | "seconds",
    value: number
  ) => {
    const newDate = new Date(currentDate);
    if (type === "hours") newDate.setHours(value);
    else if (type === "minutes") newDate.setMinutes(value);
    else newDate.setSeconds(value);
    setDate(newDate);
  };

  return (
    <div className="flex items-center justify-center gap-2 p-3">
      <div className={cn("relative flex gap-2")}>
        <div
          className="absolute left-0 right-0  pointer-events-none z-10 rounded-md bg-primary/5"
          style={{
            top: `calc(1.75rem + ${centerIndex * itemHeight}px)`,
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
