"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "@phosphor-icons/react";
import { cn } from "../../../lib/utils";

// Tipo utilitário para reaproveitar a prop `data-testid`
type TestIdProps = { testid?: string };

const DialogBase = DialogPrimitive.Root;

const DialogTriggerBase = DialogPrimitive.Trigger;

const DialogPortalBase = DialogPrimitive.Portal;

const DialogCloseBase = DialogPrimitive.Close;

const DialogOverlayBase = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & TestIdProps
>(({ className, testid: dataTestId = "dialog-overlay", ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    data-testid={dataTestId}
    {...props}
  />
));
DialogOverlayBase.displayName = DialogPrimitive.Overlay.displayName;

const DialogContentBase = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & TestIdProps
>(
  (
    { className, children, testid: dataTestId = "dialog-content", ...props },
    ref
  ) => (
    <DialogPortalBase>
      <DialogOverlayBase />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg max-h-[100dvh] overflow-hidden",
          className
        )}
        data-testid={dataTestId}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-3 top-3 sm:right-4 sm:top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10 touch-manipulation">
          <XIcon className="h-5 w-5 sm:h-4 sm:w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortalBase>
  )
);
DialogContentBase.displayName = DialogPrimitive.Content.displayName;

const DialogHeaderBase = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & TestIdProps
>(({ className, testid: dataTestId = "dialog-header", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    data-testid={dataTestId}
    {...props}
  />
));
DialogHeaderBase.displayName = "DialogHeader";

const DialogFooterBase = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & TestIdProps
>(({ className, testid: dataTestId = "dialog-footer", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    data-testid={dataTestId}
    {...props}
  />
));
DialogFooterBase.displayName = "DialogFooter";

const DialogTitleBase = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> & TestIdProps
>(({ className, testid: dataTestId = "dialog-title", ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    data-testid={dataTestId}
    {...props}
  />
));
DialogTitleBase.displayName = DialogPrimitive.Title.displayName;

const DialogDescriptionBase = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> &
    TestIdProps
>(({ className, testid: dataTestId = "dialog-description", ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    data-testid={dataTestId}
    {...props}
  />
));
DialogDescriptionBase.displayName = DialogPrimitive.Description.displayName;

export {
  DialogBase,
  DialogPortalBase,
  DialogOverlayBase,
  DialogTriggerBase,
  DialogCloseBase,
  DialogContentBase,
  DialogHeaderBase,
  DialogFooterBase,
  DialogTitleBase,
  DialogDescriptionBase,
};
