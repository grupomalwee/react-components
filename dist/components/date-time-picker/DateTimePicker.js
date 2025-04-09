import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { add, format } from "date-fns";
import { ButtonBase } from "@/components/ui/ButtonBase";
import { CalendarBase } from "@/components/date-time-picker/calendar";
import { cn } from "@/lib/utils";
import { Calendar } from "phosphor-react";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";
import { DialogBase, DialogContentBase, DialogHeaderBase, DialogTitleBase, DialogTriggerBase, } from "../ui/DialogBase";
import LabelBase from "../ui/LabelBase";
import { TimePicker } from "./TimePicker";
export function DateTimePicker({ label, date, onChange, hideSeconds, fromDate, toDate, disabled, dialogTitle, }) {
    const [internalDate, setInternalDate] = useState(date);
    const handleSelect = (newDay) => {
        if (!newDay)
            return;
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
    return (_jsxs(_Fragment, { children: [label && _jsx(LabelBase, { className: "mb-[-1rem] pl-2", children: label }), _jsxs(DialogBase, { open: open, onOpenChange: setOpen, children: [_jsx(DialogTriggerBase, { disabled: disabled, asChild: true, children: _jsxs(ButtonBase, { variant: "default", size: "lg", className: cn("w-full justify-start text-left font-normal text-zinc-950", !date && "text-muted-foreground"), children: [date ? (format(date, "PPP - HH:mm", { locale: ptBR })) : (_jsx("span", { className: "text-zinc-400", children: "Pick a date" })), _jsx(Calendar, { className: "ml-auto text-gray-500", size: 24 })] }) }), _jsxs(DialogContentBase, { children: [_jsx(DialogHeaderBase, { children: _jsx(DialogTitleBase, { className: "text-xl font-semibold", children: dialogTitle ?? "Selecione a data" }) }), _jsx(CalendarBase, { mode: "single", locale: ptBR, selected: internalDate, onSelect: (d) => handleSelect(d), initialFocus: true, fromDate: fromDate, toDate: toDate }), _jsx("div", { className: "border-border flex justify-center border-t p-3", children: _jsx(TimePicker, { setDate: setInternalDate, date: internalDate, hideSeconds: hideSeconds }) }), _jsx(ButtonBase, { onClick: () => {
                                    onChange(internalDate);
                                    setOpen(false);
                                }, children: "Salvar" })] })] })] }));
}
