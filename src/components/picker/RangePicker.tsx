"use client";

import * as React from "react";
import {
  DayPicker,
  DateRange,
  SelectRangeEventHandler,
} from "react-day-picker";
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
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { CalendarDotIcon } from "@phosphor-icons/react/dist/ssr";
import ErrorMessage, { ErrorMessageProps } from "../ui/ErrorMessage";

export interface RangePickerProps extends ErrorMessageProps {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  label?: string;
  minDate?: Date;
  maxDate?: Date;
  error?: string | undefined;
}

export function RangePicker({
  value,
  onChange,
  label = "Selecionar intervalo",
  minDate,
  maxDate,
  error,
}: RangePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [range, setRange] = React.useState<DateRange | undefined>(value);
  const controls = useAnimation();

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

  return (
    <PopoverBase open={open} onOpenChange={setOpen}>
      <PopoverTriggerBase asChild className={cn(error && "border-red-500")}>
        <motion.div
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: open ? 1.03 : 1.01 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <ButtonBase
            variant="outline"
            className={cn(
              "w-full justify-start text-left min-w-0 overflow-hidden",
              !range && "text-muted-foreground"
            )}
          >
            <motion.span
              className={cn(
                "truncate flex-1",
                !range && "text-muted-foreground"
              )}
              transition={{ duration: 0.2 }}
              animate={controls}
            >
              {range?.from && range?.to
                ? `${format(range.from, "P", {
                    locale: dateFnsLocale,
                  })} - ${format(range.to, "P", { locale: dateFnsLocale })}`
                : label}
            </motion.span>
            <motion.span
              animate={
                open ? { rotate: 8, scale: 1.15 } : { rotate: 0, scale: 1 }
              }
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              <CalendarBlankIcon className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
            </motion.span>
          </ButtonBase>
        </motion.div>
      </PopoverTriggerBase>

      <ErrorMessage error={error} />

      <AnimatePresence>
        {open && (
          <PopoverContentBase
            asChild
            className="w-auto min-w-[250px] p-0 shadow-xl  overflow-y-hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
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
                    fromDate={minDate}
                    toDate={maxDate}
                    className="min-w-0 flex flex-col"
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

                      table:
                        "w-full min-w-0 flex-1 grid grid-rows-[auto_1fr] gap-2",

                      head_row: "grid grid-cols-7 gap-1 mb-1",
                      head_cell:
                        "text-muted-foreground rounded-md font-semibold text-[clamp(0.575rem,1.2vw,0.75rem)] sm:text-[clamp(0.65rem,1.1vw,0.825rem)] text-center pb-1 uppercase tracking-wider",

                      row: "grid grid-cols-7 gap-1",

                      cell: cn(
                        "min-w-0 h-9 p-0 relative flex items-center justify-center",
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
                    }}
                    components={{
                      IconLeft: () => <CaretLeftIcon className="h-4 w-4" />,
                      IconRight: () => <CaretRightIcon className="h-4 w-4" />,
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
                      className="font-semibold w-full  text-center"
                      onClick={() => setOpen(false)}
                      disabled={!range?.from || !range?.to}
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
  );
}

RangePicker.displayName = "RangePicker";
