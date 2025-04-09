import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
declare const TooltipProviderBase: React.FC<TooltipPrimitive.TooltipProviderProps>;
declare const TooltipBase: React.FC<TooltipPrimitive.TooltipProps>;
declare const TooltipTriggerBase: React.ForwardRefExoticComponent<TooltipPrimitive.TooltipTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const TooltipContentBase: React.ForwardRefExoticComponent<Omit<TooltipPrimitive.TooltipContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export { TooltipBase, TooltipTriggerBase, TooltipContentBase, TooltipProviderBase, };
