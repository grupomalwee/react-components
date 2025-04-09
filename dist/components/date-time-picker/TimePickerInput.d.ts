import React from "react";
import { Period, TimePickerType } from "./time-picker-utils";
export interface TimePickerInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    picker: TimePickerType;
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
    period?: Period;
    onRightFocus?: () => void;
    onLeftFocus?: () => void;
}
declare const TimePickerInput: React.ForwardRefExoticComponent<TimePickerInputProps & React.RefAttributes<HTMLInputElement>>;
export { TimePickerInput };
