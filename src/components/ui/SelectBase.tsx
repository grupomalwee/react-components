"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "../..//lib/utils";
import type { ErrorMessageProps } from "@/components/ui/shared/ErrorMessage";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";

const SelectBase = SelectPrimitive.Root;

const SelectGroupBase = SelectPrimitive.Group;

const SelectValueBase = SelectPrimitive.Value;

const SelectTriggerBase = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> &
    ErrorMessageProps
>(({ className, children, error, ...props }, ref) => (
  <div className={cn("w-full", error && "mb-0")}>
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border bg-background px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        error
          ? "border-destructive focus:ring-1 focus:ring-destructive"
          : "border-input focus:ring-1 focus:ring-ring",
        className,
      )}
      {...props}
    >
      {children}
    </SelectPrimitive.Trigger>
    {error ? <ErrorMessage error={error} /> : null}
  </div>
));

SelectTriggerBase.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButtonBase = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className,
    )}
    {...props}
  >
    <CaretUpIcon className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButtonBase.displayName =
  SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButtonBase = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className,
    )}
    {...props}
  >
    <CaretDownIcon className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButtonBase.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContentBase = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
    testid?: string;
  }
>(
  (
    {
      className,
      children,
      position = "popper",
      testid: dataTestId = "select-content",
      ...props
    },
    ref,
  ) => (
    <SelectPrimitive.Portal>
      <AnimatePresence>
        <SelectPrimitive.Content
          ref={ref}
          className={cn(
            "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
            className,
          )}
          position={position}
          data-testid={dataTestId}
          onPointerDownOutside={(event) => {
            props.onPointerDownOutside?.(event);
            if (event.defaultPrevented) return;
            event.stopPropagation();
          }}
          {...props}
          asChild
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <>
              <SelectScrollUpButtonBase />
              <SelectPrimitive.Viewport
                className={cn(
                  "p-1",
                  position === "popper" &&
                    "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
                )}
              >
                {children}
              </SelectPrimitive.Viewport>
              <SelectScrollDownButtonBase />
            </>
          </motion.div>
        </SelectPrimitive.Content>
      </AnimatePresence>
    </SelectPrimitive.Portal>
  ),
);
SelectContentBase.displayName = SelectPrimitive.Content.displayName;

const SelectLabelBase = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabelBase.displayName = SelectPrimitive.Label.displayName;

const SelectItemBase = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-pointer gap-2 select-none items-center rounded-sm px-2 py-1.5 hover:bg-accent focus:bg-accent data-[highlighted]:bg-accent text-sm outline-none transition-all data-[disabled=true]:pointer-events-none data-[selected=true]:bg-muted data-[selected=true]:text-primary data-[disabled=true]:opacity-50",
      className,
    )}
    {...props}
    asChild
  >
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.1 }}
    >
      <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <CheckIcon className="h-4 w-4" />
          </motion.div>
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </motion.div>
  </SelectPrimitive.Item>
));
SelectItemBase.displayName = SelectPrimitive.Item.displayName;

const SelectSeparatorBase = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparatorBase.displayName = SelectPrimitive.Separator.displayName;

export {
  SelectBase,
  SelectGroupBase,
  SelectValueBase,
  SelectTriggerBase,
  SelectContentBase,
  SelectLabelBase,
  SelectItemBase,
  SelectSeparatorBase,
  SelectScrollUpButtonBase,
  SelectScrollDownButtonBase,
};
