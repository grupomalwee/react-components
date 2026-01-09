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
import {
  DialogBase,
  DialogTriggerBase,
  DialogContentBase,
} from "../feedback/DialogBase";
import LabelBase from "../form/LabelBase";
import { CalendarBlankIcon } from "@phosphor-icons/react";
import ErrorMessage, { ErrorMessageProps } from "../shared/ErrorMessage";
import { ClearButton } from "../shared/ClearButton";
import { TimeScrollPicker } from "./TimeScrollPicker";
import useAutoCenter from "@/hooks/use-auto-center";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

  const handleSelect = (newDay: Date | null) => {
    if (!newDay) return;
    if (!internalDate) {
      const now = new Date();
      newDay.setHours(now.getHours(), now.getMinutes(), now.getSeconds());
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

  const { ref: contentRef, center } = useAutoCenter(open);
  const basePopoverClass =
    "w-auto max-w-[calc(100vw-16px)] p-0 border-none shadow-none";
  const centeredPopoverClass =
    "w-auto max-w-[calc(100vw-16px)] p-0 border-none shadow-none fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50";

  const renderTriggerButton = () => (
    <ButtonBase
      variant={"outline"}
      disabled={disabled}
      className={cn(
        "w-full justify-start text-left min-w-0 overflow-hidden",
        !date && "text-muted-foreground"
      )}
    >
      <span className={cn("truncate flex-1", !date && "text-muted-foreground")}>
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
  );

  const renderPickerContent = () => (
    <>
      <div
        ref={contentRef}
        className="flex sm:flex-row max-h-auto overflow-y-auto border-none rounded-md"
      >
        <CalendarBase
          mode="single"
          locale={ptBR}
          selected={internalDate ?? undefined}
          onSelect={(d) => handleSelect(d ?? null)}
          autoFocus
          defaultMonth={fromDate ?? toDate ?? internalDate ?? undefined}
          {...(fromDate && { startMonth: fromDate })}
          {...(toDate && { endMonth: toDate })}
          {...(fromDate || toDate
            ? {
                hidden: [
                  ...(fromDate ? [{ before: fromDate }] : []),
                  ...(toDate ? [{ after: toDate }] : []),
                ],
              }
            : {})}
          className={cn(
            "w-max rounded-none",
            !hideTime && "sm:rounded-r-none rounded-b-none",
            isMobile ? "border-b-transparent w-full" : ""
          )}
        />

        {!hideTime && (
          <div
            className={cn(
              "flex flex-col items-center justify-center",
              isMobile
                ? "border-none"
                : " border border-t-0 sm:border-t sm:border-b sm:border-r rounded-b-md sm:rounded-b-none sm:rounded-r-md"
            )}
          >
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
      <div className="flex rounded-md -mt-4">
        <div className="grid grid-cols-2 w-full">
          <ButtonBase
            className="no-active-animation rounded-none rounded-bl-md bg-background text-gray-800 border-b border-l hover:bg-muted/50 overflow-y-hidden rounded-tl-none"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </ButtonBase>
          <ButtonBase
            className={cn(
              "no-active-animation rounded-none bg-emerald-600",
              internalDate
                ? "hover:bg-emerald-700"
                : "opacity-50 cursor-not-allowed",
              isMobile ? "rounded-md-md" : "rounded-none"
            )}
            disabled={!internalDate}
            onClick={() => {
              if (!internalDate) return;
              setOpen(false);
              onConfirm?.(internalDate);
            }}
          >
            Confirmar
          </ButtonBase>
        </div>
      </div>
    </>
  );

  return (
    <div className={cn("w-full sm:w-auto", className)}>
      {label && <LabelBase>{label}</LabelBase>}

      {isMobile ? (
        <DialogBase open={open} onOpenChange={setOpen}>
          <DialogTriggerBase
            disabled={disabled}
            asChild
            className={cn(error && "border-red-500")}
          >
            {renderTriggerButton()}
          </DialogTriggerBase>

          <ErrorMessage error={error} />

          <DialogContentBase className="p-0 max-w-[min(95vw,450px)] max-h-[90vh] overflow-hidden">
            {renderPickerContent()}
          </DialogContentBase>
        </DialogBase>
      ) : (
        <PopoverBase open={open} onOpenChange={setOpen}>
          <PopoverTriggerBase
            disabled={disabled}
            asChild
            className={cn(error && "border-red-500")}
          >
            {renderTriggerButton()}
          </PopoverTriggerBase>

          <ErrorMessage error={error} />

          <PopoverContentBase
            className={center ? centeredPopoverClass : basePopoverClass}
          >
            {renderPickerContent()}
          </PopoverContentBase>
        </PopoverBase>
      )}
    </div>
  );
}
