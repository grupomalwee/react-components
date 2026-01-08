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
import { buttonVariantsBase } from "@/components/ui/form/ButtonBase";
import { AnimatePresence } from "framer-motion";
import {
  PopoverBase,
  PopoverTriggerBase,
  PopoverContentBase,
} from "@/components/ui/overlays/PopoverBase";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

interface CalendarPopoverProps {
  selected?: Date;
  onSelect?: (date: Date | null) => void;
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
        "rounded-md border bg-background p-3 overflow-hidden flex flex-col",
        className
      )}
    >
      <div className="relative flex-1 flex flex-col min-h-0">
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          <div
            key={month.toISOString()}
            className="w-full h-full flex flex-col"
          >
             <div className="flex items-center justify-end mb-2 -mt-1">
         
        </div>
            <DayPicker
              showOutsideDays={showOutsideDays}
              month={month}
              onMonthChange={handleMonthChange}
              className="w-full h-full flex flex-col"
              classNames={{
                months: "flex flex-col sm:flex-row gap-3 sm:gap-4 w-full",
                month: "flex-1 min-w-0",

                caption:
                  "flex items-center justify-between gap-2 pr-1 min-h-[2.25rem] mb-2",
                caption_label:
                  "text-[clamp(0.85rem,1.4vw,1.125rem)] sm:text-[clamp(0.9rem,1.6vw,1.125rem)] font-semibold capitalize text-left",

                nav: "flex items-center gap-2",

                nav_button: cn(
                  buttonVariantsBase({ variant: "outline" }),
                  "h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 flex items-center justify-center p-0 rounded-md transition-transform duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/40 active:scale-95"
                ),
                nav_button_previous: "",
                nav_button_next: "",

                table: "w-full min-w-0 flex-1 grid grid-rows-[auto_1fr] gap-2",

                head_row: "grid grid-cols-7 gap-1 mb-1",
                head_cell:
                  "text-muted-foreground rounded-md font-semibold text-[clamp(0.575rem,1.2vw,0.75rem)] sm:text-[clamp(0.65rem,1.1vw,0.825rem)] text-center pb-1 uppercase tracking-wider",

                row: "grid grid-cols-7 gap-1",

                cell: cn(
                  "min-w-0 h-9 sm:h-10 md:h-10 p-0 relative flex items-center justify-center",
                  "[&:has([aria-selected].day-range-end)]:rounded-r-lg",
                  "[&:has([aria-selected].day-range-start)]:rounded-l-lg",
                  "[&:has([aria-selected].day-outside)]:bg-muted/50",
                  "[&:has([aria-selected])]:bg-muted"
                ),

                day: cn(
                  buttonVariantsBase({ variant: "ghost" }),
                  "w-full h-full p-0 m-0 flex items-center justify-center text-[clamp(0.775rem,1.2vw,0.95rem)] sm:text-sm",
                  "aria-selected:opacity-100 hover:bg-muted transition-all duration-150 ease-out active:scale-95"
                ),

                day_selected:
                  "bg-primary text-primary-foreground hover:bg-primary/90 focus:bg-primary/90 font-semibold hover:text-white",
                day_today:
                  "bg-muted text-foreground font-bold ring-2 ring-primary/30 ring-inset",
                day_outside:
                  "text-muted-foreground/40 opacity-60 aria-selected:bg-muted/50 aria-selected:text-foreground",
                day_disabled:
                  "text-muted-foreground/30 opacity-40 cursor-not-allowed",
                day_range_middle:
                  "aria-selected:bg-muted aria-selected:text-foreground",
                day_hidden: "invisible",

                button:
                  "p-0 m-0  border-0 outline-none focus:ring-0",
                

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
            "flex items-center gap-2 transition-all duration-200 hover:shadow-md active:scale-95"
          )}
          type="button"
        >
          <CalendarIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
          <span className="text-sm sm:text-base font-medium">{label}</span>
        </button>
      </PopoverTriggerBase>

      <PopoverContentBase className="w-auto max-w-[360px] sm:max-w-[420px] md:max-w-[520px] p-0 shadow-xl">
        <div className="flex items-center justify-between p-4 border-b bg-muted/50">
          <span className="font-semibold text-sm sm:text-[0.95rem] tracking-tight">
            Selecione a data
          </span>
          <button
            className="p-1.5 rounded-lg hover:bg-muted transition-all duration-200 active:scale-95 group"
            onClick={() => setOpen(false)}
            aria-label="Fechar calendário"
            type="button"
          >
            <XIcon className="h-4 w-4 transition-transform group-hover:rotate-90" />
          </button>
        </div>

        <div className="">
          <CalendarBase
            mode="single"
            selected={selected}
            onSelect={(date) => {
              onSelect?.(date as Date | null);
              setOpen(false);
            }}
          />
        </div>
      </PopoverContentBase>
    </PopoverBase>
  );
};
