"use client";

import * as React from "react";
import {
  DayPicker,
  DateRange,
  SelectRangeEventHandler,
} from "react-day-picker";
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
      <PopoverTriggerBase asChild>
        <motion.div
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: open ? 1.03 : 1.01 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <ButtonBase
            variant="outline"
            className="flex  gap-2 transition-all duration-200 min-w-[250px] text-left justify-between items-center"
          >
            <motion.span
              className="text-sm font-medium"
              transition={{ duration: 0.2 }}
              animate={controls}
            >
              {range?.from && range?.to
                ? `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`
                : label}
            </motion.span>
            <motion.span
              animate={
                open ? { rotate: 8, scale: 1.15 } : { rotate: 0, scale: 1 }
              }
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              <CalendarBlankIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
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
                    showOutsideDays
                    fromDate={minDate}
                    toDate={maxDate}
                    className="min-w-0 flex flex-col"
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
                      table:
                        "w-full border-collapse min-w-0 flex-1 flex flex-col",
                      head_row: "flex w-full gap-1 mb-1",
                      head_cell:
                        "text-muted-foreground rounded-md flex-1 min-w-0 font-semibold text-[clamp(0.625rem,1.5vw,0.75rem)] text-center pb-1 uppercase tracking-wider",
                      row: "flex w-full flex-1 gap-1",
                      cell: cn(
                        "flex-1 min-w-0 aspect-square text-center  relative",
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
                        "w-full h-full min-w-9",
                        "aria-selected:opacity-100 hover:bg-muted flex items-center justify-center p-1",
                        "transition-all duration-200 ease-out !scale-100 aria-selected:!scale-100 hover:!scale-100 active:!scale-100"
                      ),
                      day_selected:
                        "bg-primary text-primary-foreground hover:bg-primary/90 focus:bg-primary/90 font-semibold hover:text-white !scale-100 p-1 !border-0 !outline-none",
                      day_today:
                        "bg-muted text-foreground font-bold ring-2 ring-primary/50 ring-inset p-1 !border-0 !outline-none",
                      day_outside:
                        "day-outside text-muted-foreground/40 opacity-40 aria-selected:bg-muted/50 aria-selected:text-foreground",
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
