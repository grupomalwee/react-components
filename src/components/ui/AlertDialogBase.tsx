"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "../..//lib/utils"
import { buttonVariantsBase } from "@/components/ui/ButtonBase"

const AlertDialogBase = AlertDialogPrimitive.Root

const AlertDialogTriggerBase = AlertDialogPrimitive.Trigger

const AlertDialogPortalBase = AlertDialogPrimitive.Portal

const AlertDialogOverlayBase = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay> & { "data-testid"?: string }
>(({ className, "data-testid": dataTestId = "alertdialog-overlay", ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    data-testid={dataTestId}
    {...props}
    ref={ref}
  />
))
AlertDialogOverlayBase.displayName = AlertDialogPrimitive.Overlay.displayName

const AlertDialogContentBase = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content> & { "data-testid"?: string }
>(({ className, "data-testid": dataTestId = "alertdialog-content", ...props }, ref) => (
  <AlertDialogPortalBase>
    <AlertDialogOverlayBase />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      data-testid={dataTestId}
      {...props}
    />
  </AlertDialogPortalBase>
))
AlertDialogContentBase.displayName = AlertDialogPrimitive.Content.displayName

const AlertDialogHeaderBase = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
AlertDialogHeaderBase.displayName = "AlertDialogHeaderBase"

const AlertDialogFooterBase = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
AlertDialogFooterBase.displayName = "AlertDialogFooterBase"

const AlertDialogTitleBase = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title> & { "data-testid"?: string }
>(({ className, "data-testid": dataTestId = "alertdialog-title", ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    data-testid={dataTestId}
    {...props}
  />
))
AlertDialogTitleBase.displayName = AlertDialogPrimitive.Title.displayName

const AlertDialogDescriptionBase = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description> & { "data-testid"?: string }
>(({ className, "data-testid": dataTestId = "alertdialog-description", ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    data-testid={dataTestId}
    {...props}
  />
))
AlertDialogDescriptionBase.displayName =
  AlertDialogPrimitive.Description.displayName

const AlertDialogActionBase = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> & { "data-testid"?: string }
>(({ className, "data-testid": dataTestId = "alertdialog-action", ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariantsBase(), className)}
    data-testid={dataTestId}
    {...props}
  />
))
AlertDialogActionBase.displayName = AlertDialogPrimitive.Action.displayName

const AlertDialogCancelBase = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel> & { "data-testid"?: string }
>(({ className, "data-testid": dataTestId = "alertdialog-cancel", ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariantsBase({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className
    )}
    data-testid={dataTestId}
    {...props}
  />
  ))
AlertDialogCancelBase.displayName = AlertDialogPrimitive.Cancel.displayName

export {
  AlertDialogBase,
  AlertDialogPortalBase,
  AlertDialogOverlayBase,
  AlertDialogTriggerBase,
  AlertDialogContentBase,
  AlertDialogHeaderBase,
  AlertDialogFooterBase,
  AlertDialogTitleBase,
  AlertDialogDescriptionBase,
  AlertDialogActionBase,
  AlertDialogCancelBase,
}