"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { MagnifyingGlass } from "phosphor-react";
import { cn } from "@/lib/utils";
import { DialogBase, DialogContentBase } from "@/components/ui/DialogBase";
const CommandBase = React.forwardRef(({ className, ...props }, ref) => (_jsx(CommandPrimitive, { ref: ref, className: cn("flex h-full w-full flex-col overflow-hidden rounded-md bg-background text-popover-foreground", className), ...props })));
CommandBase.displayName = CommandPrimitive.displayName;
const CommandDialogBase = ({ children, ...props }) => {
    return (_jsx(DialogBase, { ...props, children: _jsx(DialogContentBase, { className: "overflow-hidden p-0", children: _jsx(CommandBase, { className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5", children: children }) }) }));
};
const CommandInputBase = React.forwardRef(({ className, ...props }, ref) => (_jsxs("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [_jsx(MagnifyingGlass, { className: "mr-2 h-4 w-4 shrink-0 text-primary" }), _jsx(CommandPrimitive.Input, { ref: ref, className: cn("flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none text-primary placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50", className), ...props })] })));
CommandInputBase.displayName = CommandPrimitive.Input.displayName;
const CommandListBase = React.forwardRef(({ className, ...props }, ref) => (_jsx(CommandPrimitive.List, { ref: ref, className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className), ...props })));
CommandListBase.displayName = CommandPrimitive.List.displayName;
const CommandEmptyBase = React.forwardRef((props, ref) => (_jsx(CommandPrimitive.Empty, { ref: ref, className: "py-6 text-center text-sm", ...props })));
CommandEmptyBase.displayName = CommandPrimitive.Empty.displayName;
const CommandGroupBase = React.forwardRef(({ className, ...props }, ref) => (_jsx(CommandPrimitive.Group, { ref: ref, className: cn("overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground", className), ...props })));
CommandGroupBase.displayName = CommandPrimitive.Group.displayName;
const CommandSeparatorBase = React.forwardRef(({ className, ...props }, ref) => (_jsx(CommandPrimitive.Separator, { ref: ref, className: cn("-mx-1 h-px bg-border", className), ...props })));
CommandSeparatorBase.displayName = CommandPrimitive.Separator.displayName;
const CommandItemBase = React.forwardRef(({ className, ...props }, ref) => (_jsx(CommandPrimitive.Item, { ref: ref, className: cn("relative flex cursor-pointer gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-primary data-[selected=true]:text-background data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", className), ...props })));
CommandItemBase.displayName = CommandPrimitive.Item.displayName;
const CommandShortcutBase = ({ className, ...props }) => {
    return (_jsx("span", { className: cn("ml-auto text-xs tracking-widest text-muted-foreground", className), ...props }));
};
CommandShortcutBase.displayName = "CommandShortcut";
export { CommandBase, CommandDialogBase, CommandInputBase, CommandListBase, CommandEmptyBase, CommandGroupBase, CommandItemBase, CommandShortcutBase, CommandSeparatorBase, };
