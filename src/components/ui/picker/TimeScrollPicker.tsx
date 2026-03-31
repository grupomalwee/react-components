import { cn } from "@/lib/utils";
import { useScrollColumn } from "./hooks/useScrollColumn";
import { getItems } from "./utils";
import { DisabledSlot } from "./DateTimePicker";


interface TimeScrollPickerProps {
  date: Date | null;
  setDate: (date: Date | null) => void;
  hideSeconds?: boolean;
  disabledSlots?: DisabledSlot[];
}

interface ScrollColumnProps {
  value: number;
  onChange: (value: number) => void;
  max: number;
  label: string;
  step?: number;
  currentDate?: Date | null;
  unit?: "hours" | "minutes" | "seconds";
  disabledRanges?: Array<{ start: Date; end: Date }>;
}

function ScrollColumn({
  value,
  onChange,
  max,
  label,
  step = 1,
  currentDate,
  unit,
  disabledRanges = [],
}: ScrollColumnProps) {
  const rawItems = getItems(max, step);

  const disabledSet = new Set<number>();
  rawItems.forEach((item) => {
    const candidate = new Date(currentDate ?? new Date());
    if (unit === "hours") candidate.setHours(item, 0, 0, 0);
    else if (unit === "minutes") candidate.setMinutes(item, 0, 0);
    else candidate.setSeconds(item);

    const isDisabled = disabledRanges.some(
      (r) => candidate >= r.start && candidate <= r.end,
    );
    if (isDisabled) disabledSet.add(item);
  });

  const disabledValues = Array.from(disabledSet);

  const {
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
  } = useScrollColumn({ value, onChange, max, step, disabledValues });

  return (
    <div className="flex flex-col items-center">
      <span className="text-muted-foreground rounded-md font-semibold text-sm text-center pb-2 uppercase tracking-wider">
        {label}
      </span>
      <div className={cn("relative w-20")}>
        <div
          className="absolute left-0 right-0 pointer-events-none bg-muted/50  rounded-md border border-border"
          style={{
            top: `${centerIndex * itemHeight}px`,
            height: `${itemHeight}px`,
          }}
        />

        <div
          ref={containerRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={cn(
            "overflow-y-scroll snap-y snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overscroll-contain",
            isDragging && "cursor-grabbing",
          )}
          style={{
            height: `${containerHeight}px`,
            paddingTop: `${centerIndex * itemHeight}px`,
            paddingBottom: `${centerIndex * itemHeight}px`,
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          {items.map((item, idx) => {
            const itemIndex = items.indexOf(value);
            const isCentered = idx === itemIndex;

            return (
              <div
                key={item}
                className={cn(
                  "snap-center flex items-center justify-center select-none font-bold tabular-nums transition-all duration-200",
                  isCentered
                    ? "text-foreground scale-110"
                    : "text-base sm:text-sm text-muted-foreground/60",
                )}
                style={{ height: `${itemHeight}px` }}
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
  disabledSlots = [],
}: TimeScrollPickerProps) {
  const currentDate = date || new Date();

  const overlapsDay = (start: Date, end: Date, day: Date) => {
    const dayStart = new Date(day);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(day);
    dayEnd.setHours(23, 59, 59, 999);
    return start <= dayEnd && end >= dayStart;
  };

  const clamp = (d: Date, min: Date, max: Date) => {
    if (d < min) return min;
    if (d > max) return max;
    return d;
  };

  const matchedSlots = (disabledSlots || []).filter((s) => {
    if (!s?.start || !s?.from) return false;
    return overlapsDay(s.start, s.from, currentDate);
  });

  const dayStart = new Date(currentDate);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(currentDate);
  dayEnd.setHours(23, 59, 59, 999);

  const disabledRanges: Array<{ start: Date; end: Date }> = matchedSlots.map(
    (s) => {
      const start = clamp(s.start, dayStart, dayEnd);
      const end = clamp(s.from, dayStart, dayEnd);
      return { start, end };
    },
  );

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
    <div className="flex items-center justify-center gap-2 p-1.5 sm:p-4">
      <div className="relative flex gap-2 sm:gap-3">
        <ScrollColumn
          value={currentDate.getHours()}
          onChange={(v) => handleTimeChange("hours", v)}
          max={24}
          label="Hora"
          step={1}
          currentDate={currentDate}
          unit="hours"
          disabledRanges={disabledRanges}
        />
        <ScrollColumn
          value={currentDate.getMinutes()}
          onChange={(v) => handleTimeChange("minutes", v)}
          max={60}
          step={5}
          label="Min"
          currentDate={currentDate}
          unit="minutes"
          disabledRanges={disabledRanges}
        />
        {!hideSeconds && (
          <ScrollColumn
            value={currentDate.getSeconds()}
            onChange={(v) => handleTimeChange("seconds", v)}
            max={60}
            label="Seg"
            step={1}
            currentDate={currentDate}
            unit="seconds"
            disabledRanges={disabledRanges}
          />
        )}
      </div>
    </div>
  );
}
