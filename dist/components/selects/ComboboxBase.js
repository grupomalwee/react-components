import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ButtonBase } from "@/components/ui/ButtonBase";
import { CommandBase, CommandEmptyBase, CommandGroupBase, CommandInputBase, CommandItemBase, CommandListBase, } from "@/components/ui/CommandBase";
import { PopoverBase, PopoverContentBase, PopoverTriggerBase, } from "@/components/ui/PopoverBase";
import { cn } from "@/lib/utils";
// import { CaretUpDown, Check } from "@phosphor-icons/react";
import { useState } from "react";
export function ComboboxBase({ items, renderSelected, handleSelection, checkIsSelected, searchPlaceholder, }) {
    const [open, setOpen] = useState(false);
    return (_jsxs(PopoverBase, { open: open, onOpenChange: setOpen, modal: true, children: [_jsx(PopoverTriggerBase, { asChild: true, className: "flex w-full justify-between", children: _jsxs(ButtonBase, { variant: "outline", role: "combobox", "aria-expanded": open, children: [renderSelected, _jsx("button", { className: "text-gray-500" })] }) }), _jsx(PopoverContentBase, { className: "max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] p-0", children: _jsxs(CommandBase, { children: [_jsx(CommandInputBase, { placeholder: searchPlaceholder ?? "Busque uma opção..." }), _jsxs(CommandListBase, { children: [_jsx(CommandEmptyBase, { children: "Nenhum respons\u00E1vel encontrado" }), _jsx(CommandGroupBase, { children: items.map((item) => (_jsxs(CommandItemBase, { value: item.value, onSelect: (value) => {
                                            handleSelection(value);
                                            setOpen(false);
                                        }, children: [item.label, _jsx("button", { className: cn("ml-auto", checkIsSelected(item.value) ? "opacity-100" : "opacity-0") })] }, item.value))) })] })] }) })] }));
}
