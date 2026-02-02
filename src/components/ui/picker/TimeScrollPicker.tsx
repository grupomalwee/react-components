import { cn } from "@/lib/utils";
import { useScrollColumn } from "./hooks/useScrollColumn";
import { CENTER_INDEX, ITEM_HEIGHT } from "./utils";

interface TimeScrollPickerProps {
  date: Date | null;
  setDate: (date: Date | null) => void;
  hideSeconds?: boolean;
}

interface ScrollColumnProps {
  value: number;
  onChange: (value: number) => void;
  max: number;
  label: string;
  hideSeconds?: boolean;
  step?: number;
}

function ScrollColumn({
  value,
  onChange,
  max,
  label,
  step = 1,
}: ScrollColumnProps) {
  const {
    items,
    containerRef,
    isDragging,
    itemHeight,
    containerHeight,
    centerIndex,
    handlers,
  } = useScrollColumn({ value, onChange, max, step });

  return (
    <div className="flex flex-col items-center">
      <span className="text-muted-foreground rounded-md font-semibold text-sm sm:text-sm text-center pb-2 uppercase tracking-wider">
        {label}
      </span>
      <div className={cn("relative w-20 sm:w-16")}>
        <div
          ref={containerRef}
          className="overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] touch-action-pan-y"
          onScroll={handlers.onScroll}
          onWheel={handlers.onWheel}
          onMouseDown={handlers.onMouseDown}
          onMouseMove={handlers.onMouseMove}
          onMouseUp={handlers.onMouseUp}
          onMouseLeave={handlers.onMouseLeave}
          onTouchStart={handlers.onTouchStart}
          onTouchMove={handlers.onTouchMove}
          onTouchEnd={handlers.onTouchEnd}
          style={{
            height: `${containerHeight}px`,
            paddingTop: `${centerIndex * itemHeight}px`,
            paddingBottom: `${centerIndex * itemHeight}px`,
            cursor: isDragging ? "grabbing" : "",
          }}
        >
          {items.map((item, idx) => {
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
                onClick={() => {
                  if (isDragging || !containerRef.current) return;
                  containerRef.current.scrollTop = idx * itemHeight;
                  onChange(item);
                }}
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
    <div className="flex items-center justify-center gap-2 p-1.5 sm:p-4">
      <div className={cn("relative flex gap-2 sm:gap-3")}>
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
          step={5}
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
