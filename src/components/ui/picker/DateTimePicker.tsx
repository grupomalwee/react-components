import { add, format } from "date-fns";

import { ButtonBase } from "@/components/ui/form/ButtonBase";
import { CalendarBase } from "@/components/ui/picker/calendar";

import { cn } from "../../../lib/utils";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
import { CalendarBlankIcon, CalendarDotIcon } from "@phosphor-icons/react";
import ErrorMessage, { ErrorMessageProps } from "../shared/ErrorMessage";
import { ClearButton } from "../shared/ClearButton";
import { TimeScrollPicker } from "./TimeScrollPicker";
import useAutoCenter from "@/hooks/use-auto-center";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  TabsBase,
  TabsListBase,
  TabsTriggerBase,
  TabsContentBase,
} from "../layout/TabsBase";

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
  hideClear?: boolean;
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
  hideClear = true,
}: DateTimePickerProps) {
  const [internalDate, setInternalDate] = useState<Date | null>(date);
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("calendar");
  const isMobile = useIsMobile();

  const handleSelect = (newDay: Date | null) => {
    if (!newDay) return;
    if (!internalDate) {
      const now = new Date();
      newDay.setUTCHours(
        now.getUTCHours(),
        now.getUTCMinutes(),
        now.getUTCSeconds(),
      );
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
    if (open) {
      setActiveTab("calendar");
    }
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
        !date && "text-muted-foreground",
      )}
    >
      <span className={cn("truncate flex-1", !date && "text-muted-foreground")}>
        {date
          ? format(date, getDisplayFormat(), { locale: ptBR })
          : "Selecione uma data"}
      </span>

      <motion.span className="flex items-center">
        <div className="flex flex-row gap-0 items-center ">
          {hideClear && (date || internalDate) && (
            <ClearButton
              onClick={(e) => {
                e?.stopPropagation();
                setInternalDate(null);
                onChange?.(null);
                onConfirm?.(null);
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
  );

  const renderPickerContent = () => (
    <div className="p-2 sm:p-3 border border-border rounded-md">
      {isMobile && !hideTime ? (
        <div className="flex flex-col min-h-0">
          {internalDate && (
            <div className="flex  items-center gap-3 px-4 py-3 rounded-lg ">
              <span className="text-md font-semibold">
                {format(internalDate, "dd 'de' MMMM 'de' yyyy", {
                  locale: ptBR,
                })}{" "}
                - {format(internalDate, hideSeconds ? "HH:mm" : "HH:mm:ss")}
              </span>
            </div>
          )}
          <TabsBase value={activeTab} onValueChange={setActiveTab}>
            <TabsListBase className="">
              <TabsTriggerBase value="calendar" className="flex-1">
                Data
              </TabsTriggerBase>
              <TabsTriggerBase value="time" className="flex-1">
                Horário
              </TabsTriggerBase>
            </TabsListBase>

            <TabsContentBase value="calendar" className="mt-0">
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
                      disabled: [
                        ...(fromDate ? [{ before: fromDate }] : []),
                        ...(toDate ? [{ after: toDate }] : []),
                      ],
                    }
                  : {})}
                className={cn("w-full rounded-none border-none")}
              />
            </TabsContentBase>

            <TabsContentBase value="time" className="mt-0">
              <div className="flex flex-col items-center justify-center gap-4 py-2">
                <TimeScrollPicker
                  setDate={(d) => handleTimeChange(d ?? null)}
                  date={internalDate}
                  hideSeconds={hideSeconds}
                />
              </div>
            </TabsContentBase>
          </TabsBase>
        </div>
      ) : (
        <div
          ref={contentRef}
          className="flex flex-col sm:flex-row max-h-auto overflow-y-auto border-none rounded-md"
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
                  disabled: [
                    ...(fromDate ? [{ before: fromDate }] : []),
                    ...(toDate ? [{ after: toDate }] : []),
                  ],
                }
              : {})}
            className={cn(
              "w-max rounded-none border-none",
              !hideTime && "sm:rounded-r-none",
            )}
          />

          {!hideTime && (
            <div
              className={cn(
                "flex flex-col items-center justify-center",
                "border-l",
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
      )}
      <div className="flex rounded-md p-1.5 gap-2">
        <ButtonBase
          variant={"outline"}
          className="no-active-animation"
          tooltip="Hoje"
          size="icon"
          onClick={() => {
            const now = new Date();
            const selected = hideTime
              ? new Date(
                  Date.UTC(
                    now.getUTCFullYear(),
                    now.getUTCMonth(),
                    now.getUTCDate(),
                    0,
                    0,
                    0,
                    0,
                  ),
                )
              : now;
            setInternalDate(selected);
            onChange?.(selected);
            onConfirm?.(selected);
          }}
        >
          <CalendarDotIcon className="h-4 w-4" />
        </ButtonBase>
        <div className="grid grid-cols-2 sm:flex-row w-full gap-2">
          <ButtonBase
            className="no-active-animation rounded-md bg-background text-primary border hover:bg-muted/50 overflow-hidden flex-1 min-w-0 border-border"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </ButtonBase>
          <ButtonBase
            className={cn(
              "no-active-animation rounded-md bg-emerald-600",
              internalDate
                ? "hover:bg-emerald-700"
                : "opacity-50 cursor-not-allowed",
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
    </div>
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

          <DialogContentBase className="p-0 max-h-[95vh] w-3/6 overflow-hidden flex flex-col">
            <div className="overflow-y-auto flex-1">
              {renderPickerContent()}
            </div>
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
