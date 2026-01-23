"use client";

import * as React from "react";
import {
  DayPicker,
  DateRange,
  SelectRangeEventHandler,
} from "react-day-picker";
import type { Matcher } from "react-day-picker";
import ptBR from "date-fns/locale/pt-BR";
import { format } from "date-fns";
import type { Locale } from "date-fns";
const dateFnsLocale = ((ptBR as unknown as { default?: Locale })?.default ??
  (ptBR as unknown as Locale)) as Locale;
import {
  CaretLeftIcon,
  CaretRightIcon,
  CalendarBlankIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import {
  ButtonBase,
  buttonVariantsBase,
} from "@/components/ui/form/ButtonBase";

import {
  PopoverBase,
  PopoverTriggerBase,
  PopoverContentBase,
} from "@/components/ui/overlays/PopoverBase";
import LabelBase from "../form/LabelBase";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDotIcon } from "@phosphor-icons/react/dist/ssr";
import ErrorMessage, { ErrorMessageProps } from "../shared/ErrorMessage";
import { ClearButton } from "../shared/ClearButton";
import useAutoCenter from "@/hooks/use-auto-center";

export interface RangePickerProps extends ErrorMessageProps {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  onConfirm?: (range: DateRange | undefined) => void;
  label?: string;
  minDate?: Date;
  maxDate?: Date;
  error?: string | undefined;
  disabled?: boolean;
  className?: string;
}

export function RangePicker({
  value,
  onChange,
  onConfirm,
  label,
  minDate,
  maxDate,
  error,
  disabled,
  className,
}: RangePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [range, setRange] = React.useState<DateRange | undefined>(value);

  React.useEffect(() => {
    setRange(value);
  }, [value]);

  const handleSelect: SelectRangeEventHandler = (selected) => {
    setRange(selected);
    onChange?.(selected);
  };

  const handleClear = () => {
    setRange(undefined);
    onChange?.(undefined);
  };

  const { ref: contentRef, center } = useAutoCenter(open);
  const basePopoverClass =
    "w-auto max-w-[calc(100vw-16px)] p-0 border shadow-none";
  const centeredPopoverClass =
    "w-auto max-w-[calc(100vw-16px)] p-0 border shadow-none fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50";

  return (
    <div className={cn("w-full sm:w-auto ", className)}>
      {label && <LabelBase>{label}</LabelBase>}

      <PopoverBase open={open} onOpenChange={setOpen}>
        <PopoverTriggerBase
          disabled={disabled}
          asChild
          className={cn(error && "border-red-500 ")}
        >
          <ButtonBase
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full justify-start text-left min-w-0 overflow-hidden",
              !range && "text-muted-foreground",
            )}
          >
            <span
              className={cn(
                "truncate flex-1",
                !range && "text-muted-foreground",
              )}
            >
              {range?.from && range?.to
                ? `${format(range.from, "P", {
                    locale: dateFnsLocale,
                  })} - ${format(range.to, "P", { locale: dateFnsLocale })}`
                : "Selecione um intervalo"}
            </span>

            <motion.span className="flex items-center">
              <div className="flex flex-row gap-0 items-center ">
                {range && (
                  <ClearButton
                    onClick={(e) => {
                      e?.stopPropagation();
                      handleClear();
                    }}
                  />
                )}

                <motion.div
                  animate={{ rotate: open ? 15 : 0 }}
                  transition={{ duration: 0.03 }}
                >
                  <CalendarBlankIcon className="h-4 w-4" />
                </motion.div>
              </div>
            </motion.span>
          </ButtonBase>
        </PopoverTriggerBase>

        <ErrorMessage error={error} />

        <AnimatePresence>
          {open && (
            <PopoverContentBase
              asChild
              className={center ? centeredPopoverClass : basePopoverClass}
              side="top"
              align="center"
              sideOffset={-240}
              
            >
              <motion.div
                ref={contentRef}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="border border-border rounded-md shadow-xl "
              >
                <div className="p-4">
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="w-full"
                  >
                    <DayPicker
                      mode="range"
                      selected={range}
                      onSelect={handleSelect}
                      locale={dateFnsLocale}
                      showOutsideDays
                      fixedWeeks
                      weekStartsOn={1}
                      navLayout="around"
                      hidden={
                        minDate || maxDate
                          ? ({
                              before: minDate,
                              after: maxDate,
                            } as unknown as Matcher)
                          : undefined
                      }
                      className="min-w-0 flex flex-col"
                      classNames={{
                        months:
                          "flex flex-col sm:flex-row gap-3 sm:gap-4 w-full",
                        month: "relative flex-1 min-w-0",

                        month_caption:
                          "flex items-center gap-2 min-h-[2.25rem] mb-4",
                        caption_label:
                          "text-[clamp(0.85rem,1.4vw,1.125rem)] sm:text-[clamp(0.9rem,1.6vw,1.125rem)] font-semibold capitalize",

                        nav: "block",

                        button_previous: cn(
                          buttonVariantsBase({ variant: "outline" }),
                          "h-8 w-8 flex items-center justify-center p-0 rounded-md transition-transform duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/40 active:scale-95 absolute right-11 top-0 z-10",
                        ),
                        button_next: cn(
                          buttonVariantsBase({ variant: "outline" }),
                          "h-8 w-8 flex items-center justify-center p-0 rounded-md transition-transform duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/40 active:scale-95 absolute right-0 top-0 z-10",
                        ),

                        month_grid:
                          "w-full min-w-0 flex-1 grid grid-rows-[auto_1fr] gap-2",

                        weekdays: "grid grid-cols-7 gap-1 mb-1",
                        weekday:
                          "text-muted-foreground rounded-md font-semibold text-[clamp(0.575rem,1.2vw,0.75rem)] sm:text-[clamp(0.65rem,1.1vw,0.825rem)] text-center pb-1 uppercase tracking-wider",

                        week: "grid grid-cols-7 gap-1",

                        day: cn(
                          "min-w-0 h-9 sm:h-10 md:h-10 p-0 relative flex items-center justify-center",
                          "[&:has([aria-selected].range-end)]:rounded-r-lg",
                          "[&:has([aria-selected].range-start)]:rounded-l-lg",
                          "[&:has([aria-selected].day-outside)]:bg-muted/50",
                          "[&:has([aria-selected])]:bg-muted",
                        ),

                        day_button: cn(
                          buttonVariantsBase({ variant: "ghost" }),
                          "w-full h-full p-0 m-0 flex items-center justify-center text-[clamp(0.775rem,1.2vw,0.95rem)] sm:text-sm",
                          "aria-selected:opacity-100  transition-all duration-150 ease-out active:scale-95 hover:bg-background/20 hover:text-primary/90 rounded-none ",
                        ),

                        selected:
                          "bg-primary text-primary-foreground font-semibold hover:text-white",
                        today:
                          "bg-muted text-foreground font-bold ring-2 ring-primary/30 ring-inset rounded-md",
                        outside:
                          "day-outside text-muted-foreground/40 opacity-60 aria-selected:bg-muted/50 aria-selected:text-foreground",
                        disabled:
                          "text-muted-foreground/30 opacity-40 cursor-not-allowed",
                        range_start:
                          "range-start rounded-l-lg aria-selected:bg-primary aria-selected:text-primary-foreground",
                        range_end:
                          "range-end rounded-r-lg aria-selected:bg-primary aria-selected:text-primary-foreground",
                        range_middle:
                          "range-middle rounded-none aria-selected:bg-muted aria-selected:text-foreground",
                        hidden: "invisible",
                      }}
                      components={{
                        Chevron: ({ orientation }) => {
                          if (orientation === "left") {
                            return <CaretLeftIcon className="h-4 w-4" />;
                          }
                          return <CaretRightIcon className="h-4 w-4" />;
                        },
                      }}
                    />
                  </motion.div>
                </div>
                <div className="flex justify-end gap-2 px-4 pb-4">
                  <div style={{ display: "inline-block" }}>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ButtonBase
                        variant="outline"
                        onClick={() => {
                          setRange({
                            from: new Date(),
                            to: new Date(),
                          });
                        }}
                      >
                        <CalendarDotIcon />
                      </ButtonBase>
                    </motion.div>
                  </div>
                  <div style={{ display: "inline-block" }}>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ButtonBase
                        variant="outline"
                        onClick={handleClear}
                        disabled={!range?.from && !range?.to}
                        className="hover:bg-destructive hover:text-white"
                      >
                        Limpar
                      </ButtonBase>
                    </motion.div>
                  </div>
                  <div style={{ display: "inline-block", width: "100%" }}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ButtonBase
                        className={cn(
                          "font-semibold w-full text-center",
                          range?.from && range?.to
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                            : "opacity-50 cursor-not-allowed",
                        )}
                        disabled={!range?.from || !range?.to}
                        onClick={() => {
                          if (!range?.from || !range?.to) return;
                          onConfirm?.(range);
                          setOpen(false);
                        }}
                      >
                        Selecionar
                      </ButtonBase>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </PopoverContentBase>
          )}
        </AnimatePresence>
      </PopoverBase>
    </div>
  );
}

RangePicker.displayName = "RangePicker";
