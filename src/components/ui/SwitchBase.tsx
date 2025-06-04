"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "../../lib/utils";

const SwitchBase = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => {
  return (
    <SwitchPrimitives.Root
      {...props}
      ref={ref}
      className={cn(
        "peer relative inline-flex h-5 w-11 cursor-pointer items-center rounded-full border-2 border-transparent shadow-md transition-colors duration-300 ease-in-out " +
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background " +
          "disabled:cursor-not-allowed disabled:opacity-50 " +
          "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input " +
          "data-[state=checked]:shadow-[0_0_15px_4px_var(--tw-shadow-color)] data-[state=checked]:shadow-primary/30",
        className
      )}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-xl ring-0 transition-transform duration-350 ease-out " +
            "peer-focus:shadow-lg peer-focus:ring-2 peer-focus:ring-primary/70 " +
            "data-[state=unchecked]:translate-x-0 data-[state=checked]:translate-x-5 " +
            "data-[state=checked]:animate-bounce-thumb"
        )}
        style={{
          transformOrigin: "center",
          transition: "transform 350ms cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        }}
      />
    </SwitchPrimitives.Root>
  );
});

SwitchBase.displayName = SwitchPrimitives.Root.displayName;

export { SwitchBase };
