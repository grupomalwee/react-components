import * as React from "react";
import { Label as RadixLabel } from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "../../lib/utils";

export type LabelBaseProps = React.ComponentPropsWithoutRef<"label"> & {
  asChild?: boolean;
  labelClassname?: string;
};

const LabelBase = React.forwardRef<HTMLLabelElement, LabelBaseProps>(
  ({ className, labelClassname, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "label";

    return (
      <RadixLabel asChild className={labelClassname}>
        <Comp
          ref={ref}
          className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            className
          )}
          {...props}
        />
      </RadixLabel>
    );
  }
);

LabelBase.displayName = "LabelBase";

export default LabelBase;
