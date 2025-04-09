import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
declare const DropDownMenuBase: React.FC<DropdownMenuPrimitive.DropdownMenuProps>;
declare const DropDownMenuTriggerBase: React.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const DropDownMenuGroupBase: React.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuGroupProps & React.RefAttributes<HTMLDivElement>>;
declare const DropDownMenuPortalBase: React.FC<DropdownMenuPrimitive.DropdownMenuPortalProps>;
declare const DropDownMenuSubBase: React.FC<DropdownMenuPrimitive.DropdownMenuSubProps>;
declare const DropDownMenuRadioGroupBase: React.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuRadioGroupProps & React.RefAttributes<HTMLDivElement>>;
declare const DropDownMenuSubTriggerBase: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSubTriggerProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
declare const DropDownMenuSubContentBase: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSubContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DropDownMenuContentBase: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DropDownMenuItemBase: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
declare const DropDownMenuCheckboxItemBase: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuCheckboxItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DropDownMenuRadioItemBase: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuRadioItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DropDownMenuLabelBase: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuLabelProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    inset?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
declare const DropDownMenuSeparatorBase: React.ForwardRefExoticComponent<Omit<DropdownMenuPrimitive.DropdownMenuSeparatorProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DropDownMenuShortcutBase: {
    ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export { DropDownMenuBase, DropDownMenuTriggerBase, DropDownMenuContentBase, DropDownMenuItemBase, DropDownMenuCheckboxItemBase, DropDownMenuRadioItemBase, DropDownMenuLabelBase, DropDownMenuSeparatorBase, DropDownMenuShortcutBase, DropDownMenuGroupBase, DropDownMenuPortalBase, DropDownMenuSubBase, DropDownMenuSubContentBase, DropDownMenuSubTriggerBase, DropDownMenuRadioGroupBase, };
