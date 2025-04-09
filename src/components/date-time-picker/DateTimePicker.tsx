import { add, format } from "date-fns";

import { ButtonBase } from "@/components/ui/ButtonBase";
import { CalendarBase } from "@/components/date-time-picker/calendar";
import { cn } from "@/lib/utils";
import { Calendar } from "phosphor-react";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";
import {
  DialogBase,
  DialogContentBase,
  DialogHeaderBase,
  DialogTitleBase,
  DialogTriggerBase,
} from "../ui/DialogBase";
import  LabelBase  from "../ui/LabelBase";
import { TimePicker } from "./TimePicker";

interface DateTimePickerProps {
  label?: string;
  date: Date | undefined;
  onChange: (date: Date | undefined) => void;
  hideSeconds?: boolean;
  fromDate?: Date;
  toDate?: Date;
  disabled?: boolean;
  dialogTitle?: string;
}

export function DateTimePicker({
  label,
  date,
  onChange,
  hideSeconds,
  fromDate,
  toDate,
  disabled,
  dialogTitle,
}: DateTimePickerProps) {
  const [internalDate, setInternalDate] = useState<Date | undefined>(date);

  const handleSelect = (newDay: Date | undefined) => {
    if (!newDay) return;
    if (!internalDate) {
      setInternalDate(newDay);
      return;
    }
    const diff = newDay.getTime() - internalDate.getTime();
    const diffInDays = diff / (1000 * 60 * 60 * 24);
    const newDateFull = add(internalDate, { days: Math.ceil(diffInDays) });
    setInternalDate(newDateFull);
  };

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (date) {
      setInternalDate(date);
    }
  }, [date, open]);

  return (
    <>
      {label && <LabelBase className="mb-[-1rem] pl-2">{label}</LabelBase>}

      <DialogBase open={open} onOpenChange={setOpen}>
        <DialogTriggerBase disabled={disabled} asChild>
          <ButtonBase
            variant={"default"}
            size={"lg"}
            className={cn(
              "w-full justify-start text-left font-normal text-zinc-950",
              !date && "text-muted-foreground"
            )}
          >
            {date ? (
              format(date, "PPP - HH:mm", { locale: ptBR })
            ) : (
              <span className="text-zinc-400">Pick a date</span>
            )}

            <Calendar className="ml-auto text-gray-500" size={24} />
          </ButtonBase>
        </DialogTriggerBase>
        <DialogContentBase>
          <DialogHeaderBase>
            <DialogTitleBase className="text-xl font-semibold">
              {dialogTitle ?? "Selecione a data"}
            </DialogTitleBase>
          </DialogHeaderBase>
          <CalendarBase
            mode="single"
            locale={ptBR}
            selected={internalDate}
            onSelect={(d) => handleSelect(d)}
            initialFocus
            fromDate={fromDate}
            toDate={toDate}
          />
          <div className="border-border flex justify-center border-t p-3">
            <TimePicker
              setDate={setInternalDate}
              date={internalDate}
              hideSeconds={hideSeconds}
            />
          </div>
          <ButtonBase
            onClick={() => {
              onChange(internalDate);
              setOpen(false);
            }}
          >
            Salvar
          </ButtonBase>
        </DialogContentBase>
      </DialogBase>
    </>
  );
}
