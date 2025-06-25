import * as React from "react";
import { Label as RadixLabel } from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "../../lib/utils";

export type LabelBaseProps = React.ComponentPropsWithoutRef<"label"> & {
  asChild?: boolean;
  "data-testid"?: string;
};

const LabelBase = React.forwardRef<HTMLLabelElement, LabelBaseProps>(
  ({ className, asChild = false, "data-testid": dataTestId = "label-base", ...props }, ref) => {
    const Comp = asChild ? Slot : "label";

    return (
      <RadixLabel>
        <Comp
          ref={ref}
          className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            className
          )}
          data-testid={dataTestId}
          {...props}
        />
      </RadixLabel>
    );
  }
);

LabelBase.displayName = "LabelBase";
 
export default LabelBase;