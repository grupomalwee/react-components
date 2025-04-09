import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
declare const PopoverBase: React.FC<PopoverPrimitive.PopoverProps>;
declare const PopoverTriggerBase: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const PopoverAnchorBase: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverAnchorProps & React.RefAttributes<HTMLDivElement>>;
declare const PopoverContentBase: React.ForwardRefExoticComponent<Omit<PopoverPrimitive.PopoverContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export { PopoverBase, PopoverTriggerBase, PopoverContentBase, PopoverAnchorBase };
