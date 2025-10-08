"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import {
  CaretLeftIcon,
  CaretRightIcon,
  XIcon,
  CalendarIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { buttonVariantsBase } from "@/components/ui/ButtonBase";
import { AnimatePresence } from "framer-motion";
import {
  PopoverBase,
  PopoverTriggerBase,
  PopoverContentBase,
} from "@/components/ui/PopoverBase";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

interface CalendarPopoverProps {
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  label?: string;
}

export function CalendarBase({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [month, setMonth] = React.useState<Date>(
    props.month || props.defaultMonth || new Date()
  );
  const [direction, setDirection] = React.useState(1);

  const handleMonthChange = (newMonth: Date) => {
    const isNext = newMonth > month ? 1 : -1;
    setDirection(isNext);
    setMonth(newMonth);
    props.onMonthChange?.(newMonth);
  };

  return (
    <div
      className={cn(
        "rounded-2xl border bg-background p-4 shadow-lg overflow-hidden w-full h-full flex flex-col",
        className
      )}
    >
      <div className="relative flex-1 flex flex-col min-h-0">
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <div
            key={month.toISOString()}
            className="w-full h-full flex flex-col"
          >
            <DayPicker
              showOutsideDays={showOutsideDays}
              month={month}
              onMonthChange={handleMonthChange}
              className="w-full h-full min-w-0 flex flex-col"
              classNames={{
                months:
                  "flex items-center flex-col sm:flex-row space-y-2 sm:space-x-2 sm:space-y-0 flex-1",
                month: "space-y-2 min-w-0 flex-1 flex flex-col",
                caption:
                  "flex justify-center pt-1 relative items-center h-[10%] min-h-[2rem] mb-2",
                caption_label:
                  "text-[clamp(0.875rem,2.5vw,1.25rem)] font-semibold truncate px-10 tracking-tight",
                nav: "space-x-1 flex items-center",
                nav_button: cn(
                  buttonVariantsBase({ variant: "outline" }),
                  "h-8 w-8 bg-background p-0 opacity-60 hover:opacity-100 hover:bg-muted flex-shrink-0 touch-manipulation transition-all duration-200 ease-out hover:scale-105 active:scale-95",
                  "[@media(min-width:400px)]:h-9 [@media(min-width:400px)]:w-9"
                ),
                nav_button_previous: "absolute left-0",
                nav_button_next: "absolute right-0",
                table: "w-full border-collapse min-w-0 flex-1 flex flex-col",
                head_row: "flex w-full gap-1 mb-1",
                head_cell:
                  "text-muted-foreground rounded-md flex-1 min-w-0 font-semibold text-[clamp(0.625rem,1.5vw,0.75rem)] text-center pb-1 uppercase tracking-wider",
                row: "flex w-full flex-1 gap-1",
                cell: cn(
                  "flex-1 min-w-0 aspect-square text-center p-0 relative",
                  "[&:has([aria-selected].day-range-end)]:rounded-r-lg",
                  "[&:has([aria-selected].day-range-start)]:rounded-l-lg",
                  "[&:has([aria-selected].day-outside)]:bg-muted/50",
                  "[&:has([aria-selected])]:bg-muted",
                  "first:[&:has([aria-selected])]:rounded-l-lg",
                  "last:[&:has([aria-selected])]:rounded-r-lg",
                  "focus-within:relative focus-within:z-20"
                ),
                day: cn(
                  buttonVariantsBase({ variant: "ghost" }),
                  "w-full h-full p-0 rounded-lg",
                  "aria-selected:opacity-100 hover:bg-muted text-[clamp(0.75rem,2vw,1rem)] flex items-center justify-center",
                  "touch-manipulation transition-all duration-200 ease-out hover:scale-105 active:scale-95"
                ),
                day_selected:
                  "bg-primary text-primary-foreground hover:bg-primary/90 focus:bg-primary/90 font-semibold",
                day_today:
                  "bg-muted text-foreground font-bold ring-2 ring-primary/30 ring-inset",
                day_outside:
                  "day-outside text-muted-foreground/40 opacity-40 aria-selected:bg-muted/50 aria-selected:text-foreground",
                day_disabled:
                  "text-muted-foreground/30 opacity-40 cursor-not-allowed",
                day_range_middle:
                  "aria-selected:bg-muted aria-selected:text-foreground",
                day_hidden: "invisible",
                ...classNames,
              }}
              components={{
                IconLeft: () => <CaretLeftIcon className="h-4 w-4" />,
                IconRight: () => <CaretRightIcon className="h-4 w-4" />,
              }}
              {...props}
            />
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}
CalendarBase.displayName = "CalendarBase";

export const CalendarPopover = ({
  selected,
  onSelect,
  label = "Selecionar data",
}: CalendarPopoverProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <PopoverBase open={open} onOpenChange={setOpen}>
      <PopoverTriggerBase asChild>
        <button
          aria-label="Abrir calendário"
          className={cn(
            buttonVariantsBase({ variant: "outline" }),
            "flex items-center gap-2 transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95"
          )}
          type="button"
        >
          <CalendarIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
          <span className="text-sm font-medium">{label}</span>
        </button>
      </PopoverTriggerBase>

      <PopoverContentBase className="w-auto max-w-[420px] p-0 shadow-xl">
        <div className="flex items-center justify-between p-4 border-b bg-muted/50">
          <span className="font-semibold text-sm tracking-tight">
            Selecione a data
          </span>
          <button
            className="p-1.5 rounded-lg hover:bg-muted transition-all duration-200 hover:scale-110 active:scale-95 group"
            onClick={() => setOpen(false)}
            aria-label="Fechar calendário"
            type="button"
          >
            <XIcon className="h-4 w-4 transition-transform group-hover:rotate-90" />
          </button>
        </div>

        <div className="p-3">
          <CalendarBase mode="single" selected={selected} onSelect={onSelect} />
        </div>
      </PopoverContentBase>
    </PopoverBase>
  );
};
