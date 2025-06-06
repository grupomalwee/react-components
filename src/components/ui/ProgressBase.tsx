"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "../../lib/utils";
import LabelBase from "./LabelBase";

export interface ProgressBaseProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showValue?: boolean; // NOVO: se true, exibe o valor
  value?: number;
}

const ProgressBase = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressBaseProps
>(
  (
    {
      className,
      value,
      label,
      leftIcon,
      rightIcon,
      showValue = false, 
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-1 w-full min-w-[150px]">
        {label && <LabelBase className="py-2">{label}</LabelBase>}

        <div className="flex items-center gap-2">
          {leftIcon && <div className="flex items-center">{leftIcon}</div>}

          <div className="relative w-full">
            <ProgressPrimitive.Root
              ref={ref}
              className={cn(
                "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
                className
              )}
              value={value}
              {...props}
            >
              <ProgressPrimitive.Indicator
                className="h-full w-full flex-1 bg-primary transition-all "
                style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
              />
            </ProgressPrimitive.Root>

            {showValue && (
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                {Math.round(value ?? 0)}%
              </span>
            )}
          </div>

          {rightIcon && <div className="flex items-center">{rightIcon}</div>}
        </div>
      </div>
    );
  }
);

ProgressBase.displayName = "ProgressBase";

export { ProgressBase };
