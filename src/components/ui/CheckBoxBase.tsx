"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "@phosphor-icons/react";
import { motion } from "framer-motion";

import { cn } from "../../lib/utils";

type CheckboxBaseProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
  testid?: string;
};

const CheckboxBase = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxBaseProps
>(({ className, testid: dataTestId = "checkbox-base", ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-md border border-primary shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground transition-colors",
      className
    )}
    data-testid={dataTestId}
    {...props}
  >
    <CheckboxPrimitive.Indicator asChild>
      <motion.div
        initial={{ scale: 0, opacity: 0, rotate: -90 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        exit={{ scale: 0, opacity: 0, rotate: 90 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="flex items-center justify-center text-current"
      >
        <Check className="h-4 w-4" weight="bold" />
      </motion.div>
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));

CheckboxBase.displayName = CheckboxPrimitive.Root.displayName;

export { CheckboxBase };
