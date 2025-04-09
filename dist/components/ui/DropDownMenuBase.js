"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, CaretRight, Circle } from "phosphor-react";
import { cn } from "@/lib/utils";
const DropDownMenuBase = DropdownMenuPrimitive.Root;
const DropDownMenuTriggerBase = DropdownMenuPrimitive.Trigger;
const DropDownMenuGroupBase = DropdownMenuPrimitive.Group;
const DropDownMenuPortalBase = DropdownMenuPrimitive.Portal;
const DropDownMenuSubBase = DropdownMenuPrimitive.Sub;
const DropDownMenuRadioGroupBase = DropdownMenuPrimitive.RadioGroup;
const DropDownMenuSubTriggerBase = React.forwardRef(({ className, inset, children, ...props }, ref) => (_jsxs(DropdownMenuPrimitive.SubTrigger, { ref: ref, className: cn("flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className), ...props, children: [children, _jsx(CaretRight, { className: "ml-auto" })] })));
DropDownMenuSubTriggerBase.displayName =
    DropdownMenuPrimitive.SubTrigger.displayName;
const DropDownMenuSubContentBase = React.forwardRef(({ className, ...props }, ref) => (_jsx(DropdownMenuPrimitive.SubContent, { ref: ref, className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className), ...props })));
DropDownMenuSubContentBase.displayName =
    DropdownMenuPrimitive.SubContent.displayName;
const DropDownMenuContentBase = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => (_jsx(DropdownMenuPrimitive.Portal, { children: _jsx(DropdownMenuPrimitive.Content, { ref: ref, sideOffset: sideOffset, className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className), ...props }) })));
DropDownMenuContentBase.displayName = DropdownMenuPrimitive.Content.displayName;
const DropDownMenuItemBase = React.forwardRef(({ className, inset, ...props }, ref) => (_jsx(DropdownMenuPrimitive.Item, { ref: ref, className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", inset && "pl-8", className), ...props })));
DropDownMenuItemBase.displayName = DropdownMenuPrimitive.Item.displayName;
const DropDownMenuCheckboxItemBase = React.forwardRef(({ className, children, checked, ...props }, ref) => (_jsxs(DropdownMenuPrimitive.CheckboxItem, { ref: ref, className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className), checked: checked, ...props, children: [_jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: _jsx(DropdownMenuPrimitive.ItemIndicator, { children: _jsx(Check, { className: "h-4 w-4" }) }) }), children] })));
DropDownMenuCheckboxItemBase.displayName =
    DropdownMenuPrimitive.CheckboxItem.displayName;
const DropDownMenuRadioItemBase = React.forwardRef(({ className, children, ...props }, ref) => (_jsxs(DropdownMenuPrimitive.RadioItem, { ref: ref, className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className), ...props, children: [_jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: _jsx(DropdownMenuPrimitive.ItemIndicator, { children: _jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }), children] })));
DropDownMenuRadioItemBase.displayName =
    DropdownMenuPrimitive.RadioItem.displayName;
const DropDownMenuLabelBase = React.forwardRef(({ className, inset, ...props }, ref) => (_jsx(DropdownMenuPrimitive.Label, { ref: ref, className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className), ...props })));
DropDownMenuLabelBase.displayName = DropdownMenuPrimitive.Label.displayName;
const DropDownMenuSeparatorBase = React.forwardRef(({ className, ...props }, ref) => (_jsx(DropdownMenuPrimitive.Separator, { ref: ref, className: cn("-mx-1 my-1 h-px bg-muted", className), ...props })));
DropDownMenuSeparatorBase.displayName =
    DropdownMenuPrimitive.Separator.displayName;
const DropDownMenuShortcutBase = ({ className, ...props }) => {
    return (_jsx("span", { className: cn("ml-auto text-xs tracking-widest opacity-60", className), ...props }));
};
DropDownMenuShortcutBase.displayName = "DropDownMenuShortcutBase";
export { DropDownMenuBase, DropDownMenuTriggerBase, DropDownMenuContentBase, DropDownMenuItemBase, DropDownMenuCheckboxItemBase, DropDownMenuRadioItemBase, DropDownMenuLabelBase, DropDownMenuSeparatorBase, DropDownMenuShortcutBase, DropDownMenuGroupBase, DropDownMenuPortalBase, DropDownMenuSubBase, DropDownMenuSubContentBase, DropDownMenuSubTriggerBase, DropDownMenuRadioGroupBase, };
