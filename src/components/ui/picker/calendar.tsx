"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { ptBR } from "date-fns/locale";
import {
  CaretLeftIcon,
  CaretRightIcon,
  XIcon,
  CalendarIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { buttonVariantsBase } from "@/components/ui/form/ButtonBase";
import {
  PopoverBase,
  PopoverTriggerBase,
  PopoverContentBase,
} from "@/components/ui/overlays/PopoverBase";
import { useIsMobile } from "@/hooks";

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
  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        "rounded-md border p-3 overflow-hidden flex flex-col",
        className,
      )}
    >
      <div className="relative flex-1 flex flex-col min-h-0">
        <DayPicker
          showOutsideDays={showOutsideDays}
          fixedWeeks
          weekStartsOn={1}
          locale={ptBR}
          navLayout="around"
          className="w-full h-full flex flex-col"
          classNames={{
            months: "flex flex-col sm:flex-row gap-3 sm:gap-4 w-full",
            month: "relative flex-1 min-w-0",

            month_caption: "flex items-center gap-2 min-h-[2.25rem] mb-4",
            caption_label:
              "text-[clamp(0.85rem,1.4vw,1.125rem)] sm:text-[clamp(0.9rem,1.6vw,1.125rem)] font-semibold capitalize",

            nav: "hidden ",

            button_previous: cn(
              buttonVariantsBase({ variant: "outline" }),
              "h-8 w-8 flex items-center justify-center p-0 rounded-md transition-transform duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/40 active:scale-95 absolute right-11 top-0 z-10",
              isMobile ? "" : "",
            ),
            button_next: cn(
              buttonVariantsBase({ variant: "outline" }),
              "h-8 w-8 flex items-center justify-center p-0 rounded-md transition-transform duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/40 active:scale-95 absolute right-0 top-0 z-10",
              isMobile ? "" : "",
            ),

            month_grid: "w-full min-w-0 flex-1 grid grid-rows-[auto_1fr] gap-2",

            weekdays: "grid grid-cols-7 gap-1 mb-1",
            weekday:
              "text-muted-foreground rounded-md font-semibold text-[clamp(0.575rem,1.2vw,0.75rem)] sm:text-[clamp(0.65rem,1.1vw,0.825rem)] text-center pb-1 uppercase tracking-wider",

            week: "grid grid-cols-7 gap-1",

            day: cn(
              "min-w-0 h-9 sm:h-10 md:h-10 p-0 relative flex items-center justify-center",
              "[&:has([aria-selected].day-range-end)]:rounded-r-lg",
              "[&:has([aria-selected].day-range-start)]:rounded-l-lg",
              "[&:has([aria-selected].day-outside)]:bg-muted/50",
              "[&:has([aria-selected])]:bg-muted",
            ),

            day_button: cn(
              buttonVariantsBase({ variant: "ghost" }),
              "w-full h-full p-0 m-0 flex items-center justify-center text-[clamp(0.775rem,1.2vw,0.95rem)] sm:text-sm",
              "aria-selected:opacity-100 hover:bg-muted transition-all duration-150 ease-out active:scale-95",
            ),

            selected:
              "bg-primary text-primary-foreground hover:bg-primary/90 focus:bg-primary/90 font-semibold hover:text-white rounded-md",
            today:
              "bg-muted text-foreground font-bold ring-2 ring-primary/30 ring-inset rounded-md",
            outside:
              "text-muted-foreground opacity-60 aria-selected:bg-muted/50 aria-selected:text-foreground",
            disabled:
              "text-muted-foreground cursor-not-allowed line-through decoration-2",
            range_middle:
              "aria-selected:bg-muted aria-selected:text-foreground",
            hidden: "invisible",

            ...classNames,
          }}
          components={{
            Chevron: ({ orientation }) => {
              if (orientation === "left") {
                return <CaretLeftIcon className="h-4 w-4" />;
              }
              return <CaretRightIcon className="h-4 w-4" />;
            },
          }}
          {...props}
        />
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
            "flex items-center gap-2 transition-all duration-200 hover:shadow-md active:scale-95",
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
            weekStartsOn={1}
            locale={ptBR}
          />
        </div>
      </PopoverContentBase>
    </PopoverBase>
  );
};
