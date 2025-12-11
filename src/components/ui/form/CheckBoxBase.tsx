"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon, MinusIcon } from "@phosphor-icons/react";
import { motion } from "framer-motion";

import { cn } from "../../../lib/utils";

type CheckboxBaseProps = React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
> & {
  testid?: string;
};

type CheckedState = boolean | "indeterminate";

const CheckboxBase = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxBaseProps
>(({ className, testid: dataTestId = "checkbox-base", checked: checkedProp, defaultChecked, onCheckedChange, ...props }, ref) => {
  const isControlled = checkedProp !== undefined;

  const [checkedState, setCheckedState] = React.useState<CheckedState>(
    (isControlled ? (checkedProp as CheckedState) : (defaultChecked ?? false)) as CheckedState
  );

  React.useEffect(() => {
    if (isControlled) setCheckedState(checkedProp as CheckedState);
  }, [checkedProp, isControlled]);

  const handleCheckedChange = (next: CheckedState) => {
    if (!isControlled) setCheckedState(next);
    onCheckedChange?.(next);
  };

  const stateClass = (checkedState === true || checkedState === "indeterminate")
    ? "bg-primary text-primary-foreground"
    : "";

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      checked={checkedProp}
      defaultChecked={defaultChecked}
      onCheckedChange={handleCheckedChange}
      className={cn(
        "group h-4 w-4 shrink-0 rounded-md border border-primary shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
        stateClass,
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
          {checkedState === true && (
            <CheckIcon className="h-4 w-4" weight="bold" />
          )}
          {checkedState === "indeterminate" && (
            <MinusIcon className="h-4 w-4" weight="bold" />
          )}
        </motion.div>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});

CheckboxBase.displayName = CheckboxPrimitive.Root.displayName;

export { CheckboxBase };
