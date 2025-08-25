import  LabelBase  from "../ui/LabelBase";
import { Clock } from "@phosphor-icons/react";
import * as React from "react";
import { TimePickerInput } from "./TimePickerInput";

interface TimePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  hideSeconds?: boolean;
}

export function TimePicker({ date, setDate, hideSeconds }: TimePickerProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const secondRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-end gap-2">
      <div className="grid gap-1 text-center">
        <LabelBase htmlFor="hours" className="text-xs">
          Horas
        </LabelBase>
        <TimePickerInput
          picker="hours"
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div className="grid gap-1 text-center">
        <LabelBase htmlFor="minutes" className="text-xs">
          Minutos
        </LabelBase>
        <TimePickerInput
          picker="minutes"
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={() => secondRef.current?.focus()}
        />
      </div>
      {!hideSeconds && (
        <div className="grid gap-1 text-center">
          <LabelBase htmlFor="seconds" className="text-xs">
            Segundos
          </LabelBase>
          <TimePickerInput
            picker="seconds"
            date={date}
            setDate={setDate}
            ref={secondRef}
            onLeftFocus={() => minuteRef.current?.focus()}
          />
        </div>
      )}
      <div className="flex h-10 items-center">
        <Clock className="ml-2 h-4 w-4" />
      </div>
    </div>
  );
}
