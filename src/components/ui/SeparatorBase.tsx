"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { motion } from "framer-motion";

import { cn } from "../../lib/utils";

const SeparatorBase = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => {
    const isHorizontal = orientation === "horizontal";

    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        asChild
        {...props}
      >
        <motion.div
          className={cn(
            "shrink-0 bg-border",
            isHorizontal ? "h-[1px] w-full" : "h-full w-[1px]",
            className
          )}
          initial={{ scaleX: isHorizontal ? 0 : 1, scaleY: isHorizontal ? 1 : 0 }}
          animate={{ scaleX: 1, scaleY: 1 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        />
      </SeparatorPrimitive.Root>
    );
  }
);

SeparatorBase.displayName = SeparatorPrimitive.Root.displayName;

export { SeparatorBase };
