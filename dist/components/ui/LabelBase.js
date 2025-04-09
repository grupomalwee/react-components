import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { Label as RadixLabel } from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
const LabelBase = React.forwardRef(({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "label";
    return (_jsx(RadixLabel, { asChild: true, children: _jsx(Comp, { ref: ref, className: cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className), ...props }) }));
});
LabelBase.displayName = "LabelBase";
export default LabelBase;
