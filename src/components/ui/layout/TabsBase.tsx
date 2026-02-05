"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../../../lib/utils";

const TabsBase = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Root
    ref={ref}
    className={cn("w-full", className)}
    {...props}
  />
));
TabsBase.displayName = TabsPrimitive.Root.displayName;

const TabsListBase = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "relative flex w-full items-center justify-start gap-2 border-b border-border",
      "bg-transparent overflow-x-auto",
      "scrollbar-thin scrollbar-thumb-muted-foreground/30 scrollbar-track-transparent",
      "hover:scrollbar-thumb-muted-foreground/50",
      "[&::-webkit-scrollbar]:h-1.5",
      "[&::-webkit-scrollbar-track]:bg-transparent",
      "[&::-webkit-scrollbar-thumb]:bg-muted-foreground/30",
      "[&::-webkit-scrollbar-thumb]:rounded-full",
      "hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/50",
      className,
    )}
    {...props}
  />
));
TabsListBase.displayName = TabsPrimitive.List.displayName;

type TabsTriggerAnimation = "default" | "none" | "scale" | "underline" | string;

const TabsTriggerBase = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    animation?: TabsTriggerAnimation;
  }
>(({ className, animation = "default", ...props }, ref) => {
  const base = cn(
    "relative inline-flex items-center justify-center whitespace-nowrap px-4 py-2 text-sm font-medium",
    "text-muted-foreground hover:text-foreground",
    "transition-colors duration-300 ease-in-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "data-[state=active]:text-primary",
    className,
  );

  const animationClasses =
    animation === "none"
      ? ""
      : animation === "scale"
        ? "transform transition-transform data-[state=active]:scale-105"
        : "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:scale-x-0 after:bg-primary after:origin-left after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.34,1.56,0.64,1)] data-[state=active]:after:scale-x-100";

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(base, animationClasses)}
      {...props}
    />
  );
});

type TabsContentAnimation = "default" | "fade" | "slide" | "none" | string;

const TabsContentBase = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & {
    animation?: TabsContentAnimation;
  }
>(({ className, animation = "default", ...props }, ref) => {
  const animationClasses =
    animation === "none"
      ? ""
      : animation === "slide"
        ? "animate-in slide-in-from-left-2 duration-500 ease-in-out"
        : "animate-in fade-in-0 duration-500 ease-in-out";

  return (
    <TabsPrimitive.Content
      ref={ref}
      className={cn(
        "mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        animationClasses,
        className,
      )}
      {...props}
    />
  );
});
TabsContentBase.displayName = TabsPrimitive.Content.displayName;

export { TabsBase, TabsListBase, TabsTriggerBase, TabsContentBase };
