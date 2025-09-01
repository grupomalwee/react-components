"use client"

import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { CaretUpDown } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"

const CollapsibleBase = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root>
>(({ ...props }, ref) => {
  return <CollapsiblePrimitive.Root ref={ref} data-slot="collapsible" {...props} />
})
CollapsibleBase.displayName = CollapsiblePrimitive.Root.displayName

const CollapsibleTriggerBase = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleTrigger>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleTrigger> & {
    leftIcon?: React.ReactNode;
    showCaret?: boolean;
  }
>(({ className, children, leftIcon, showCaret = true, ...props }, ref) => {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      ref={ref}
      className={cn(
        "flex w-full items-center justify-between p-3 text-left font-medium transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-accent hover:text-accent-foreground rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 [&[data-state=open]>*:last-child>svg]:rotate-180",
        className
      )}
      data-slot="collapsible-trigger"
      {...props}
    >
      <div className="flex items-center gap-2">
        {leftIcon && <span className="flex-shrink-0 [&>svg]:size-4">{leftIcon}</span>}
        <span>{children}</span>
      </div>
      {showCaret && (
        <span className="flex-shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
          <CaretUpDown className="h-4 w-4" />
        </span>
      )}
    </CollapsiblePrimitive.CollapsibleTrigger>
  )
})
CollapsibleTriggerBase.displayName = CollapsiblePrimitive.CollapsibleTrigger.displayName

const CollapsibleContentBase = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleContent>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleContent>
>(({ className, children, ...props }, ref) => {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      ref={ref}
      className={cn(
        "overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
        className
      )}
      data-slot="collapsible-content"
      {...props}
    >
      <div className="pb-3 pt-1">{children}</div>
    </CollapsiblePrimitive.CollapsibleContent>
  )
})
CollapsibleContentBase.displayName = CollapsiblePrimitive.CollapsibleContent.displayName

export { CollapsibleBase, CollapsibleTriggerBase, CollapsibleContentBase }
