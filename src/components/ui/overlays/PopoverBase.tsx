"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "../../../lib/utils";

const PopoverBase = PopoverPrimitive.Root;

const PopoverTriggerBase = PopoverPrimitive.Trigger;

const PopoverAnchorBase = PopoverPrimitive.Anchor;

type TestIdProps = { testid?: string };

const PopoverContentBase = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & TestIdProps
>(
  (
    {
      className,
      align = "center",
      sideOffset = 4,
      testid: dataTestId = "popover-content",
      ...props
    },
    ref,
  ) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className,
        )}
        data-testid={dataTestId}
        onInteractOutside={(event) => {
          props.onInteractOutside?.(event);
          if (event.defaultPrevented) return;
          event.stopPropagation();
        }}
        {...props}
      />
    </PopoverPrimitive.Portal>
  ),
);
PopoverContentBase.displayName = PopoverPrimitive.Content.displayName;

export {
  PopoverBase,
  PopoverTriggerBase,
  PopoverContentBase,
  PopoverAnchorBase,
};
