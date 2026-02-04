"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "@phosphor-icons/react";
import { cn } from "../../../lib/utils";

type TestIdProps = { testid?: string };

const ModalBase = DialogPrimitive.Root;

const ModalTriggerBase = DialogPrimitive.Trigger;

const ModalPortalBase = DialogPrimitive.Portal;

const ModalCloseBase = DialogPrimitive.Close;

const ModalOverlayBase = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & TestIdProps
>(({ className, testid: dataTestId = "modal-overlay", ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    data-testid={dataTestId}
    {...props}
  />
));
ModalOverlayBase.displayName = DialogPrimitive.Overlay.displayName;

type ModalSize = "sm" | "md" | "lg" | "full";

type ModalContentProps = React.ComponentPropsWithoutRef<
  typeof DialogPrimitive.Content
> &
  TestIdProps & {
    size?: ModalSize;
    centered?: boolean;
    backdropBlur?: boolean;
  };

const ModalContentBase = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  ModalContentProps
>(
  (
    {
      className,
      children,
      testid: dataTestId = "modal-content",
      size = "md",
      centered = true,
      backdropBlur = true,
      ...props
    },
    ref,
  ) => {
    const sizeClass =
      size === "sm"
        ? "max-w-md"
        : size === "lg"
          ? "max-w-4xl"
          : size === "full"
            ? "w-full max-w-[calc(100%-2rem)]"
            : "max-w-2xl";

    const positionClass = centered
      ? "left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
      : "left-[50%] top-20 translate-x-[-50%] translate-y-0 sm:translate-y-0";

    return (
      <ModalPortalBase>
        <ModalOverlayBase
          className={cn("bg-black/40", backdropBlur ? "backdrop-blur-sm" : "")}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @keyframes modal-fade-in { from { opacity: 0 } to { opacity: 1 } }
            @keyframes modal-fade-out { from { opacity: 1 } to { opacity: 0 } }
            @keyframes modal-scale-in { from { opacity: 0; transform: translate(-50%, -48%) scale(.98) } to { opacity:1; transform: translate(-50%, -50%) scale(1) } }
            @keyframes modal-scale-out { from { opacity:1; transform: translate(-50%, -50%) scale(1) } to { opacity: 0; transform: translate(-50%, -48%) scale(.98) } }
            @keyframes overlay-fade-in { from { opacity: 0 } to { opacity: 1 } }
            @keyframes overlay-fade-out { from { opacity: 1 } to { opacity: 0 } }
            .data-[state=open]\\:animate-modal-in { animation: modal-fade-in 220ms cubic-bezier(.16,.84,.24,1) both, modal-scale-in 220ms cubic-bezier(.16,.84,.24,1) both }
            .data-[state=closed]\\:animate-modal-out { animation: modal-scale-out 160ms cubic-bezier(.16,.84,.24,1) both, modal-fade-out 160ms cubic-bezier(.16,.84,.24,1) both }
            .data-[state=open]\\:animate-overlay-in { animation: overlay-fade-in 220ms cubic-bezier(.16,.84,.24,1) both }
            .data-[state=closed]\\:animate-overlay-out { animation: overlay-fade-out 160ms cubic-bezier(.16,.84,.24,1) both }
          `,
          }}
        />
        <DialogPrimitive.Content
          ref={ref}
          className={cn(
            "fixed z-50 grid w-[calc(100%-2rem)] gap-3 sm:gap-4 border bg-background p-4 sm:p-6 shadow-lg rounded-md sm:rounded-lg max-h-[calc(100dvh-2rem)] sm:max-h-[90dvh] overflow-auto",
            "data-[state=open]:animate-modal-in data-[state=closed]:animate-modal-out border-border",
            positionClass,
            sizeClass,
            className,
          )}
          data-testid={dataTestId}
          {...props}
        >
          {children}

          <DialogPrimitive.Close className="absolute right-2 top-2 sm:right-4 sm:top-4 rounded-md bg-muted/10 p-1.5 sm:p-1.5 opacity-80 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-10 hover:bg-muted/20 transition-colors">
            <XIcon className="h-5 w-5 sm:h-4 sm:w-4 text-foreground" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </ModalPortalBase>
    );
  },
);
ModalContentBase.displayName = DialogPrimitive.Content.displayName;

const ModalHeaderBase = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & TestIdProps
>(({ className, testid: dataTestId = "modal-header", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-1 sm:space-y-1.5 text-center sm:text-left pr-8 sm:pr-0",
      className,
    )}
    data-testid={dataTestId}
    {...props}
  />
));
ModalHeaderBase.displayName = "ModalHeader";

const ModalFooterBase = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & TestIdProps
>(({ className, testid: dataTestId = "modal-footer", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:space-x-2 sm:gap-0",
      className,
    )}
    data-testid={dataTestId}
    {...props}
  />
));
ModalFooterBase.displayName = "ModalFooter";

const ModalTitleBase = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> & TestIdProps
>(({ className, testid: dataTestId = "modal-title", ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className,
    )}
    data-testid={dataTestId}
    {...props}
  />
));
ModalTitleBase.displayName = DialogPrimitive.Title.displayName;

const ModalDescriptionBase = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> &
    TestIdProps
>(({ className, testid: dataTestId = "modal-description", ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    data-testid={dataTestId}
    {...props}
  />
));
ModalDescriptionBase.displayName = DialogPrimitive.Description.displayName;

export {
  ModalBase,
  ModalPortalBase,
  ModalOverlayBase,
  ModalTriggerBase,
  ModalCloseBase,
  ModalContentBase,
  ModalHeaderBase,
  ModalFooterBase,
  ModalTitleBase,
  ModalDescriptionBase,
};
