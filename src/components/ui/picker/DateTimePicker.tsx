import { add, format } from "date-fns";

import { ButtonBase } from "@/components/ui/form/ButtonBase";
import { CalendarBase } from "@/components/ui/picker/calendar";

import { cn } from "../../../lib/utils";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";
import {
  PopoverBase,
  PopoverTriggerBase,
  PopoverContentBase,
} from "../overlays/PopoverBase";
import LabelBase from "../form/LabelBase";
import { CalendarBlankIcon } from "@phosphor-icons/react";
import ErrorMessage, { ErrorMessageProps } from "../shared/ErrorMessage";
import { ClearButton } from "../shared/ClearButton";
import { TimeScrollPicker } from "./TimeScrollPicker";

interface DateTimePickerProps extends ErrorMessageProps {
  label?: string;
  date: Date | null;
  onChange?: (date: Date | null) => void;
  onConfirm?: (date: Date | null) => void;
  displayFormat?: boolean;
  hideTime?: boolean;
  hideSeconds?: boolean;
  fromDate?: Date;
  toDate?: Date;
  disabled?: boolean;
  className?: string;
  error?: string;
}

export function DateTimePicker({
  label,
  date,
  onChange,
  onConfirm,
  displayFormat,
  hideTime,
  hideSeconds,
  fromDate,
  toDate,
  disabled,
  className,
  error,
}: DateTimePickerProps) {
  const [internalDate, setInternalDate] = useState<Date | null>(date);
  const [open, setOpen] = useState(false);

  const handleSelect = (newDay: Date | null) => {
    if (!newDay) return;
    if (!internalDate) {
      setInternalDate(newDay);
      onChange?.(newDay);
      return;
    }
    const diff = newDay.getTime() - internalDate.getTime();
    const diffInDays = diff / (1000 * 60 * 60 * 24);
    const newDateFull = add(internalDate, { days: Math.ceil(diffInDays) });
    setInternalDate(newDateFull);
    onChange?.(newDateFull);
  };

  const handleTimeChange = (newDate: Date | null) => {
    setInternalDate(newDate);
    onChange?.(newDate);
  };

  const getTimeFormat = () => {
    if (hideTime) return "";
    return hideSeconds ? "HH:mm" : "HH:mm:ss";
  };

  const getDisplayFormat = () => {
    const timeFormat = getTimeFormat();

    if (displayFormat === true) {
      if (!timeFormat) return "dd/MM/yyyy";
      return `dd/MM/yyyy - ${timeFormat}`;
    }

    if (!timeFormat) return "dd MMMM yyyy";
    return `dd MMMM yyyy - ${timeFormat}`;
  };

  useEffect(() => {
    setInternalDate(date);
  }, [date, open]);

  return (
    <div className={cn("w-full sm:w-auto", className)}>
      {label && <LabelBase>{label}</LabelBase>}

      <PopoverBase open={open} onOpenChange={setOpen}>
        <PopoverTriggerBase
          disabled={disabled}
          asChild
          className={cn(error && "border-red-500")}
        >
          <ButtonBase
            variant={"outline"}
            disabled={disabled}
            className={cn(
              "w-full justify-start text-left min-w-0 overflow-hidden",
              !date && "text-muted-foreground"
            )}
          >
            <span
              className={cn(
                "truncate flex-1",
                !date && "text-muted-foreground"
              )}
            >
              {date
                ? format(date, getDisplayFormat(), { locale: ptBR })
                : "Selecione uma data"}
            </span>
            {date && (
              <ClearButton
                className="-mr-3"
                onClick={(e) => {
                  e?.stopPropagation();
                  setInternalDate(null);
                  onChange?.(null);
                  onConfirm?.(null);
                }}
              />
            )}

            <CalendarBlankIcon className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
          </ButtonBase>
        </PopoverTriggerBase>

        <ErrorMessage error={error} />

        <PopoverContentBase className="w-auto max-w-[calc(100vw-16px)] p-0 border-none shadow-none fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="flex flex-col sm:flex-row max-h-auto overflow-y-auto border-none rounded-md">
            <CalendarBase
              mode="single"
              locale={ptBR}
              selected={internalDate ?? undefined}
              onSelect={(d) => handleSelect(d ?? null)}
              initialFocus
              defaultMonth={fromDate ?? toDate ?? internalDate ?? undefined}
              fromDate={fromDate}
              toDate={toDate}
              className={cn(
                "w-max",
                !hideTime && "sm:rounded-r-none rounded-b-none"
              )}
            />

            {!hideTime && (
              <div className="flex flex-col items-center justify-center border border-t-0 sm:border-t sm:border-b sm:border-r rounded-b-md sm:rounded-b-none sm:rounded-r-md">
                <div className="text-[clamp(0.85rem,1.4vw,1.125rem)] sm:text-[clamp(0.9rem,1.6vw,1.125rem)] font-semibold capitalize text-left">
                  Horário
                </div>

                <TimeScrollPicker
                  setDate={(d) => handleTimeChange(d ?? null)}
                  date={internalDate}
                  hideSeconds={hideSeconds}
                />
              </div>
            )}
          </div>
          <div className="flex border-none rounded-md">
            <div className="grid grid-cols-2 w-full">
              <ButtonBase
                className="no-active-animation rounded-none rounded-bl-md bg-background text-gray-800 border-b-2 border-l-2 hover:bg-muted/50 overflow-y-hidden"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </ButtonBase>
              <ButtonBase
                className="no-active-animation rounded-none bg-emerald-600 hover:bg-emerald-700"
                onClick={() => {
                  setOpen(false);
                  onConfirm?.(internalDate);
                }}
              >
                Confirmar
              </ButtonBase>
            </div>
          </div>
        </PopoverContentBase>
      </PopoverBase>
    </div>
  );
}
