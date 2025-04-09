import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import LabelBase from "../ui/LabelBase";
import { Clock } from "phosphor-react";
import * as React from "react";
import { TimePickerInput } from "./TimePickerInput";
export function TimePicker({ date, setDate, hideSeconds }) {
    const minuteRef = React.useRef(null);
    const hourRef = React.useRef(null);
    const secondRef = React.useRef(null);
    return (_jsxs("div", { className: "flex items-end gap-2", children: [_jsxs("div", { className: "grid gap-1 text-center", children: [_jsx(LabelBase, { htmlFor: "hours", className: "text-xs", children: "Horas" }), _jsx(TimePickerInput, { picker: "hours", date: date, setDate: setDate, ref: hourRef, onRightFocus: () => minuteRef.current?.focus() })] }), _jsxs("div", { className: "grid gap-1 text-center", children: [_jsx(LabelBase, { htmlFor: "minutes", className: "text-xs", children: "Minutos" }), _jsx(TimePickerInput, { picker: "minutes", date: date, setDate: setDate, ref: minuteRef, onLeftFocus: () => hourRef.current?.focus(), onRightFocus: () => secondRef.current?.focus() })] }), !hideSeconds && (_jsxs("div", { className: "grid gap-1 text-center", children: [_jsx(LabelBase, { htmlFor: "seconds", className: "text-xs", children: "Segundos" }), _jsx(TimePickerInput, { picker: "seconds", date: date, setDate: setDate, ref: secondRef, onLeftFocus: () => minuteRef.current?.focus() })] })), _jsx("div", { className: "flex h-10 items-center", children: _jsx(Clock, { className: "ml-2 h-4 w-4" }) })] }));
}
