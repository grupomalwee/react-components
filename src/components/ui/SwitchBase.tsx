"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "../..//lib/utils";

const SwitchBase = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => {
  const [isChecked, setIsChecked] = React.useState(false);

  const handleChange = (checked: boolean) => {
    setIsChecked(checked);
    if (props.onCheckedChange) props.onCheckedChange(checked);
  };

  return (
    <SwitchPrimitives.Root
      {...props}
      ref={ref}
      onCheckedChange={handleChange}
      className={cn(
        "peer relative inline-flex h-5 w-11 cursor-pointer items-center rounded-full border-2 border-transparent shadow-md transition-colors duration-300 ease-in-out " +
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background " +
          "disabled:cursor-not-allowed disabled:opacity-50 " +
          (isChecked ? "bg-primary" : "bg-input"),
        className
      )}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-xl ring-0 transition-transform duration-350 ease-out " +
            "peer-focus:shadow-lg peer-focus:ring-2 peer-focus:ring-primary/70 " +
            "data-[state=unchecked]:translate-x-0 data-[state=checked]:translate-x-5 " +
            (isChecked
              ? "animate-bounce-thumb"
              : "") 
        )}
        style={{
          transformOrigin: "center",
          transition: "transform 350ms cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        }}
      />
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary opacity-50 blur-md transition-all duration-350 ease-in-out",
          isChecked ? "scale-95 opacity-60" : "scale-75 opacity-0"
        )}
      />
    </SwitchPrimitives.Root>
  );
});
SwitchBase.displayName = SwitchPrimitives.Root.displayName;

export { SwitchBase };
