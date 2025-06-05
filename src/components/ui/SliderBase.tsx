"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";
import LabelBase from "./LabelBase";

export interface SliderBaseProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const SlideBase = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderBaseProps
>(
  (
    {
      className,
      orientation = "horizontal",
      label,
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    const isVertical = orientation === "vertical";

    return (
      <div
        className={cn(
          "flex flex-col gap-1",
          isVertical ? "h-full " : "w-full"
        )}
      >
        {label && <LabelBase className="py-2">{label}</LabelBase>}

        <div
          className={cn(
            "flex gap-2",
            isVertical ? "flex-col  h-full" : "flex-row items-center w-full"
          )}
        >
          {leftIcon && (
            <div className="flex items-center justify-center">
              {leftIcon}
            </div>
          )}

          <SliderPrimitive.Root
            ref={ref}
            orientation={orientation}
            className={cn(
              "relative flex touch-none select-none items-center",
              isVertical ? "flex-col h-full" : "flex-row w-full",
              className
            )}
            {...props}
          >
            <SliderPrimitive.Track
              className={cn(
                "relative overflow-hidden bg-primary/20 rounded-full",
                isVertical ? "w-1.5 h-full" : "h-1.5 w-full"
              )}
            >
              <SliderPrimitive.Range
                className={cn(
                  "absolute bg-primary",
                  isVertical ? "w-full" : "h-full"
                )}
              />
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb
              className={cn(
                "block h-4 w-4 rounded-full border border-primary/70 bg-background shadow-md transition-transform",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                "hover:scale-125 active:scale-125"
              )}
            />
          </SliderPrimitive.Root>

          {rightIcon && (
            <div className="flex items-center justify-center">
              {rightIcon}
            </div>
          )}
        </div>
      </div>
    );
  }
);

SlideBase.displayName = "SlideBase";

export { SlideBase };
