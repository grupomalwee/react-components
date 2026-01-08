import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TimeScrollPickerProps {
  date: Date | null;
  setDate: (date: Date | null) => void;
  hideSeconds?: boolean;
}

const ITEM_HEIGHT = 32;
const VISIBLE_ITEMS = 5;
const CENTER_INDEX = Math.floor(VISIBLE_ITEMS / 2);

interface ScrollColumnProps {
  value: number;
  onChange: (value: number) => void;
  max: number;
  label: string;
}

function ScrollColumn({ value, onChange, max, label }: ScrollColumnProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const items = Array.from({ length: max }, (_, i) => i);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    if (containerRef.current && !isDragging) {
      const scrollPosition = value * ITEM_HEIGHT;
      containerRef.current.scrollTop = scrollPosition;
    }
  }, [value, isDragging]);

  const handleScroll = () => {
    if (!containerRef.current || isDragging) return;

    const scrollTop = containerRef.current.scrollTop;
    const newValue = Math.round(scrollTop / ITEM_HEIGHT);

    if (newValue !== value && newValue >= 0 && newValue < max) {
      onChange(newValue);
    }
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
    const y = e.pageY;
    const walk = (startY - y) * 2;
    containerRef.current.scrollTop = scrollTop + walk;
  };

  const handleMouseUp = () => {
    if (!containerRef.current) return;
    setIsDragging(false);

    const currentScrollTop = containerRef.current.scrollTop;
    const newValue = Math.round(currentScrollTop / ITEM_HEIGHT);

    if (newValue >= 0 && newValue < max) {
      onChange(newValue);
      containerRef.current.scrollTop = newValue * ITEM_HEIGHT;
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 ">
      <span className="text-xs text-muted-foreground font-semibold tracking-wide uppercase">
        {label}
      </span>
      <div className="relative w-16">
        <div
          className="absolute left-0 right-0 border-y-2 border-primary/20 pointer-events-none z-10"
          style={{
            top: `${CENTER_INDEX * ITEM_HEIGHT}px`,
            height: `${ITEM_HEIGHT}px`,
          }}
        />
        <div
          ref={containerRef}
          className="h-[160px] overflow-y-auto snap-y snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          style={{
            paddingTop: `${CENTER_INDEX * ITEM_HEIGHT}px`,
            paddingBottom: `${CENTER_INDEX * ITEM_HEIGHT}px`,
            cursor: isDragging ? "grabbing" : "",
          }}
        >
          {items.map((item) => {
            const isSelected = item === value;
            return (
              <div
                key={item}
                className={cn(
                  "flex items-center justify-center select-none font-semibold tabular-nums snap-center",
                  isDragging ? "cursor-grabbing" : "",
                  isSelected
                    ? "text-lg text-foreground"
                    : "text-sm text-muted-foreground"
                )}
                style={{ height: `${ITEM_HEIGHT}px` }}
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
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  const handleHourChange = (newHour: number) => {
    const newDate = new Date(currentDate);
    newDate.setHours(newHour);
    setDate(newDate);
  };

  const handleMinuteChange = (newMinute: number) => {
    const newDate = new Date(currentDate);
    newDate.setMinutes(newMinute);
    setDate(newDate);
  };

  const handleSecondChange = (newSecond: number) => {
    const newDate = new Date(currentDate);
    newDate.setSeconds(newSecond);
    setDate(newDate);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4">
      <div className="flex gap-2">
        <ScrollColumn
          value={hours}
          onChange={handleHourChange}
          max={24}
          label="Hora"
        />
        <ScrollColumn
          value={minutes}
          onChange={handleMinuteChange}
          max={60}
          label="Min"
        />
        {!hideSeconds && (
          <>
            <ScrollColumn
              value={seconds}
              onChange={handleSecondChange}
              max={60}
              label="Seg"
            />
          </>
        )}
      </div>
    </div>
  );
}
