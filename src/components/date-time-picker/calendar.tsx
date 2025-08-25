"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { CaretLeft, CaretRight, X, Calendar } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { buttonVariantsBase } from "@/components/ui/ButtonBase";
import { motion } from "framer-motion";
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

const variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 30 : -30,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -30 : 30,
  }),
};

export function CalendarBase({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [month, setMonth] = React.useState<Date>(
    props.month || props.defaultMonth || new Date()
  );
  const [direction, setDirection] = React.useState(1); // 1 pra frente, -1 pra trás

  const handleMonthChange = (newMonth: Date) => {
    const isNext = newMonth > month ? 1 : -1;
    setDirection(isNext);
    setMonth(newMonth);
    props.onMonthChange?.(newMonth);
  };

  return (
    <div
      className={cn(
        "rounded-xl border bg-background p-3 shadow-sm overflow-hidden",
        className
      )}
    >
      <motion.div
        key={month.toISOString()}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        custom={direction}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ position: "relative" }}
      >
        <DayPicker
          showOutsideDays={showOutsideDays}
          month={month}
          onMonthChange={handleMonthChange}
          className="w-full"
          classNames={{
            months:
              "flex items-center flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
            month: "space-y-4",
            caption: "flex justify-center pt-1 relative items-center",
            caption_label: "text-sm font-medium",
            nav: "space-x-1 flex items-center",
            nav_button: cn(
              buttonVariantsBase({ variant: "outline" }),
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
            ),
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            table: "w-full border-collapse space-y-1",
            head_row: "flex",
            head_cell:
              "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
            row: "flex w-full mt-2",
            cell: cn(
              "h-9 w-9 text-center text-sm p-0 relative",
              "[&:has([aria-selected].day-range-end)]:rounded-r-md",
              "[&:has([aria-selected].day-range-start)]:rounded-l-md",
              "[&:has([aria-selected].day-outside)]:bg-muted/50",
              "[&:has([aria-selected])]:bg-muted",
              "first:[&:has([aria-selected])]:rounded-l-md",
              "last:[&:has([aria-selected])]:rounded-r-md",
              "focus-within:relative focus-within:z-20"
            ),
            day: cn(
              buttonVariantsBase({ variant: "ghost" }),
              "h-9 w-9 p-0 font-normal rounded-md",
              "aria-selected:opacity-100 hover:bg-muted"
            ),
            day_selected:
              "bg-primary text-primary-foreground hover:bg-primary/90 focus:bg-primary/90",
            day_today:
              "bg-muted text-foreground dark:bg-muted dark:text-foreground",
            day_outside:
              "day-outside text-gray-500 opacity-50 aria-selected:bg-muted/50 aria-selected:text-black",
            day_disabled: "text-gray-500",
            day_range_middle:
              "aria-selected:bg-muted aria-selected:text-foreground",
            day_hidden: "invisible",
            ...classNames,
          }}
          components={{
            IconLeft: () => <CaretLeft className="h-4 w-4" />,
            IconRight: () => <CaretRight className="h-4 w-4" />,
          }}
          {...props}
        />
      </motion.div>
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
            "flex items-center gap-2"
          )}
          type="button"
        >
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{label}</span>
        </button>
      </PopoverTriggerBase>

      <PopoverContentBase className="w-auto max-w-96">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium text-sm">Selecione a data</span>
          <button
            className="p-1 rounded-md hover:bg-muted"
            onClick={() => setOpen(false)}
            aria-label="Fechar calendário"
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <CalendarBase mode="single" selected={selected} onSelect={onSelect} />
      </PopoverContentBase>
    </PopoverBase>
  );
};
