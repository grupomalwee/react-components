import { add, format } from "date-fns";

import { ButtonBase } from "@/components/ui/form/ButtonBase";
import { CalendarBase } from "@/components/picker/calendar";

import { cn } from "../../lib/utils";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";
import {
  PopoverBase,
  PopoverTriggerBase,
  PopoverContentBase,
} from "../ui/overlays/PopoverBase";
import LabelBase from "../ui/form/LabelBase";
import { TimePicker } from "./TimePicker";
import { CalendarBlankIcon, ClockIcon } from "@phosphor-icons/react";
import ErrorMessage, { ErrorMessageProps } from "../ui/ErrorMessage";

interface DateTimePickerProps extends ErrorMessageProps {
  label?: string;
  date: Date | undefined;
  onChange: (date: Date | undefined) => void;
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
  displayFormat,
  hideTime,
  hideSeconds,
  fromDate,
  toDate,
  disabled,
  className,
  error,
}: DateTimePickerProps) {
  const [internalDate, setInternalDate] = useState<Date | undefined>(date);
  const [open, setOpen] = useState(false);
  const [timePickerOpen, setTimePickerOpen] = useState(false);

  const handleSelect = (newDay: Date | undefined) => {
    if (!newDay) return;
    if (!internalDate) {
      setInternalDate(newDay);
      onChange(newDay);
      return;
    }
    const diff = newDay.getTime() - internalDate.getTime();
    const diffInDays = diff / (1000 * 60 * 60 * 24);
    const newDateFull = add(internalDate, { days: Math.ceil(diffInDays) });
    setInternalDate(newDateFull);
    onChange(newDateFull);
  };

  const handleTimeChange = (newDate: Date | undefined) => {
    setInternalDate(newDate);
    onChange(newDate);
  };

  const getTimeFormat = () => {
    if (hideTime) return "";
    return hideSeconds ? "HH:mm" : "HH:mm:ss";
  };

  const getDisplayFormat = () => {
    const timeFormat = getTimeFormat();

    if (displayFormat === true) {
      if (!timeFormat) return "dd/MM/yyyy";
      return `dd/MM/yyyy ${timeFormat}`;
    }

    if (!timeFormat) return "dd MMMM yyyy";
    return `dd MMMM yyyy ${timeFormat}`;
  };

  useEffect(() => {
    if (date) {
      setInternalDate(date);
    }
  }, [date, open]);

  return (
    <div className={cn("space-y-2 w-full sm:w-auto", className)}>
      {label && <LabelBase>{label}</LabelBase>}

      <PopoverBase open={open} onOpenChange={setOpen}>
        <PopoverTriggerBase
          disabled={disabled}
          asChild
          className={cn(error && "border-red-500")}
        >
          <ButtonBase
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left min-w-0 overflow-hidden ",
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

            <CalendarBlankIcon className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
          </ButtonBase>
        </PopoverTriggerBase>

        <ErrorMessage error={error} />

        <PopoverContentBase
          className="w-full p-0"
          align="center"
          sideOffset={4}
          side="bottom"
          avoidCollisions={true}
          collisionPadding={8}
        >
          <div className="flex flex-col space-y-2 sm:space-y-3 p-2 sm:p-3 md:p-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <CalendarBase
              mode="single"
              locale={ptBR}
              selected={internalDate}
              onSelect={(d) => handleSelect(d)}
              initialFocus
              defaultMonth={fromDate ?? toDate ?? internalDate}
              fromDate={fromDate}
              toDate={toDate}
              className={cn("w-full", hideTime && "border-0")}
            />

            {!hideTime && (
              <div className="flex justify-center w-full px-2">
                <PopoverBase
                  open={timePickerOpen}
                  onOpenChange={setTimePickerOpen}
                >
                  <PopoverTriggerBase asChild>
                    <ButtonBase
                      variant="outline"
                      size="default"
                      className={cn(
                        "flex items-center justify-center gap-1.5 sm:gap-2",
                        "px-2 sm:px-3 py-1.5 sm:py-2",
                        "text-sm sm:text-base font-semibold w-full max-w-xs",
                        "border-2 border-primary/20 rounded-lg",
                        "bg-background hover:bg-primary/10 hover:border-primary/30",
                        "transition-all duration-200",
                        "shadow-sm hover:shadow-md active:scale-[0.98]",
                        "min-h-[36px] sm:min-h-[40px]"
                      )}
                    >
                      <ClockIcon className="text-primary flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-black truncate">
                        {internalDate
                          ? format(internalDate, getTimeFormat() || "HH:mm", {
                              locale: ptBR,
                            })
                          : "00:00"}
                      </span>
                    </ButtonBase>
                  </PopoverTriggerBase>

                  <PopoverContentBase
                    className="w-[calc(100vw-2rem)] max-w-sm p-3 sm:p-3 rounded-md"
                    align="center"
                    side="top"
                    sideOffset={8}
                    avoidCollisions={true}
                    collisionPadding={8}
                  >
                    <div className="flex flex-col items-center space-y-2 sm:space-y-3">
                      <h4 className="text-sm sm:text-base font-medium text-center">
                        Alterar Horário
                      </h4>
                      <TimePicker
                        setDate={handleTimeChange}
                        date={internalDate}
                        hideSeconds={hideSeconds}
                      />
                      <ButtonBase
                        size="sm"
                        variant="destructive"
                        onClick={() => setTimePickerOpen(false)}
                        className="w-full text-xs sm:text-sm min-h-[36px] sm:min-h-[40px]"
                      >
                        Fechar
                      </ButtonBase>
                    </div>
                  </PopoverContentBase>
                </PopoverBase>
              </div>
            )}
          </div>
        </PopoverContentBase>
      </PopoverBase>
    </div>
  );
}
