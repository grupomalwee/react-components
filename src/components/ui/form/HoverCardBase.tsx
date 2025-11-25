"use client";

import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { cn } from "@/lib/utils";

function HoverCardBase(
  props: React.ComponentProps<typeof HoverCardPrimitive.Root>
) {
  return <HoverCardPrimitive.Root {...props} />;
}

function HoverCardTriggerBase(
  props: React.ComponentProps<typeof HoverCardPrimitive.Trigger>
) {
  return <HoverCardPrimitive.Trigger {...props} />;
}

const HoverCardContentBase = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(
  (
    { className, align = "center", sideOffset = 6, children, ...props },
    ref
  ) => {
    return (
      <HoverCardPrimitive.Portal>
        <HoverCardPrimitive.Content
          ref={ref}
          align={align}
          sideOffset={sideOffset}
          className={cn(
            "z-50 w-64 max-w-[90vw] rounded-lg border bg-popover p-4 text-popover-foreground shadow-lg outline-none backdrop-blur-sm relative transform-gpu",
            "motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out",
            "motion-reduce:transition-none motion-reduce:transform-none",
            "data-[state=open]:scale-100 data-[state=closed]:scale-95",
            "data-[state=open]:shadow-2xl data-[state=closed]:shadow-lg",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
            "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
            "data-[side=bottom]:origin-top data-[side=top]:origin-bottom data-[side=left]:origin-right data-[side=right]:origin-left",
            "data-[side=bottom]:slide-in-from-top-2",
            "data-[side=left]:slide-in-from-right-2",
            "data-[side=right]:slide-in-from-left-2",
            "data-[side=top]:slide-in-from-bottom-2",
            className
          )}
          {...props}
        >
          <HoverCardPrimitive.Arrow
            className={cn(
              "fill-popover stroke-[rgba(0,0,0,0.06)] dark:stroke-[rgba(255,255,255,0.06)]",
              "motion-safe:transition-transform motion-safe:duration-200",
              // subtle arrow nudge depending on side
              "data-[side=top]:-translate-y-1 data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1"
            )}
          />
          <div className="relative z-10">{children}</div>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Portal>
    );
  }
);
HoverCardContentBase.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCardBase, HoverCardTriggerBase, HoverCardContentBase };
