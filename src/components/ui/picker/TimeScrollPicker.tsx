import { cn } from "@/lib/utils";
import { useScrollColumn } from "./hooks/useScrollColumn";

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
    itemHeight,
    containerHeight,
    centerIndex,
    handleScroll,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    isDragging,
  } = useScrollColumn({ value, onChange, max, step });

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
}: TimeScrollPickerProps) {
  const currentDate = date || new Date();

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
        />
        <ScrollColumn
          value={currentDate.getMinutes()}
          onChange={(v) => handleTimeChange("minutes", v)}
          max={60}
          step={5}
          label="Min"
        />
        {!hideSeconds && (
          <ScrollColumn
            value={currentDate.getSeconds()}
            onChange={(v) => handleTimeChange("seconds", v)}
            max={60}
            label="Seg"
            step={1}
          />
        )}
      </div>
    </div>
  );
}
