"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../../lib/utils";

const TabsBase = TabsPrimitive.Root;

const TabsListBase = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "relative flex w-full items-center justify-start gap-4 border-b-2 border-border",
      className
    )}
    {...props}
  />
));
TabsListBase.displayName = TabsPrimitive.List.displayName;

const TabsTriggerBase = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative inline-flex items-center justify-center whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-3",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:text-primary",
      "after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full",
      "after:scale-x-0 after:bg-primary after:origin-left",
      "after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65,0,0.35,1)]",
      "data-[state=active]:after:scale-x-100",
      className
    )}
    {...props}
  />
));


const TabsContentBase = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "animate-fade-in",
      className
    )}
    {...props}
  />
));
TabsContentBase.displayName = TabsPrimitive.Content.displayName;

export { TabsBase, TabsListBase, TabsTriggerBase, TabsContentBase };
