"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { CalendarBase } from "@/components/date-time-picker/calendar";
export const CalenderPage = () => {
    const [date, setDate] = React.useState(new Date());
    return (_jsx("div", { className: "mt-5 ml-5 flex gap-5 h-96 p-3 rounded-sm", children: _jsx(CalendarBase, { mode: "single", selected: date, onSelect: setDate, className: "rounded-md border shadow" }) }));
};
