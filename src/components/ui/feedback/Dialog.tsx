import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";
import {
  DialogBase,
  DialogContentBase,
  DialogDescriptionBase,
  DialogFooterBase,
  DialogHeaderBase,
  DialogTitleBase,
  DialogTriggerBase,
} from "./DialogBase";

const dialogContentVariants = cva("", {
  variants: {
    variant: {
      default: "bg-background border-border shadow-lg",
      alert:
        "bg-background border-l-8 border-l-yellow-500 shadow-lg border-y border-r border-y-border border-r-border",
      destructive:
        "bg-background border-l-8 border-l-destructive shadow-lg border-y border-r border-y-border border-r-border",
      success:
        "bg-background border-l-8 border-l-green-500 shadow-lg border-y border-r border-y-border border-r-border",
      info: "bg-background border-l-8 border-l-blue-500 shadow-lg border-y border-r border-y-border border-r-border",
      warning:
        "bg-background border-l-8 border-l-amber-500 shadow-lg border-y border-r border-y-border border-r-border",
      brutal:
        "bg-white dark:bg-zinc-900 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none dark:border-white dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]",
      purple:
        "bg-background border-l-8 border-l-purple-500 shadow-lg border-y border-r border-y-border border-r-border",
    },
    size: {
      sm: "max-w-sm",
      md: "max-w-lg",
      lg: "max-w-2xl",
      xl: "max-w-4xl",
      full: "max-w-none w-[95vw] h-[95vh]",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export interface DialogProps extends VariantProps<
  typeof dialogContentVariants
> {
  title?: string;
  description?: string;
  trigger?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export default function Dialog({
  title,
  description,
  trigger,
  children,
  footer,
  open,
  onOpenChange,
  className,
  variant,
  size,
}: DialogProps) {
  return (
    <DialogBase open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTriggerBase asChild>{trigger}</DialogTriggerBase>}
      <DialogContentBase
        className={cn(dialogContentVariants({ variant, size }), className)}
      >
        {(title || description) && (
          <DialogHeaderBase>
            {title && (
              <DialogTitleBase
                className={cn("flex items-center gap-2", {
                  "font-bold uppercase tracking-wider": variant === "brutal",
                })}
              >
                {title}
              </DialogTitleBase>
            )}
            {description && (
              <DialogDescriptionBase>{description}</DialogDescriptionBase>
            )}
          </DialogHeaderBase>
        )}
        {children}
        {footer && <DialogFooterBase>{footer}</DialogFooterBase>}
      </DialogContentBase>
    </DialogBase>
  );
}
