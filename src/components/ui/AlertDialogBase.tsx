"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "../../lib/utils"
import { buttonVariantsBase } from "@/components/ui/ButtonBase"

const AlertDialogBase = AlertDialogPrimitive.Root
const AlertDialogTriggerBase = AlertDialogPrimitive.Trigger
const AlertDialogPortalBase = AlertDialogPrimitive.Portal

const AlertDialogOverlayBase = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay asChild>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1, ease: "easeOut" }}
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm",
        className
      )}
      {...props}
    />
  </AlertDialogPrimitive.Overlay>
))
AlertDialogOverlayBase.displayName = AlertDialogPrimitive.Overlay.displayName

const AlertDialogContentBase = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortalBase>
    <AnimatePresence>
      <AlertDialogOverlayBase />
      <AlertDialogPrimitive.Content asChild forceMount>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: "-50%", x: "-50%" }}
          animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
          exit={{ opacity: 0, scale: 0.9, y: "-50%", x: "-50%" }}
          transition={{ duration: 0.10, ease: "easeOut" }}
          ref={ref}
          className={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-xl sm:rounded-lg",
            className
          )}
          {...props}
        />
      </AlertDialogPrimitive.Content>
    </AnimatePresence>
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
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
))
AlertDialogTitleBase.displayName = AlertDialogPrimitive.Title.displayName

const AlertDialogDescriptionBase = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
AlertDialogDescriptionBase.displayName =
  AlertDialogPrimitive.Description.displayName

const AlertDialogActionBase = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariantsBase(), className)}
    {...props}
  />
))
AlertDialogActionBase.displayName = AlertDialogPrimitive.Action.displayName

const AlertDialogCancelBase = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariantsBase({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className
    )}
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
