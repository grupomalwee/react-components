"use client";

import * as React from "react"
import { cn } from "../../lib/utils"
import { ButtonBase, buttonVariantsBase } from "./ButtonBase"
import { XCircle } from "@phosphor-icons/react"
import {
  AlertDialogBase,
  AlertDialogTriggerBase,
  AlertDialogContentBase,
  AlertDialogFooterBase,
  AlertDialogTitleBase,
  AlertDialogDescriptionBase,
  AlertDialogActionBase,
  AlertDialogCancelBase,
} from "./AlertDialogBase"

interface DestructiveDialogProps {
  title: string
  description: string
  onConfirm: () => void
  onCancel?: () => void
}

export const DestructiveDialog: React.FC<DestructiveDialogProps> = ({
  title,
  description,
  onConfirm,
  onCancel,
}) => {
  const titleId = "destructive-dialog-title"
  const descriptionId = "destructive-dialog-description"

  return (
    <AlertDialogBase>
      <AlertDialogContentBase
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className={cn("border border-destructive bg-background")}
      >
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-destructive/10 ring-1 ring-destructive/20">
            <XCircle className="w-6 h-6 text-destructive" />
          </div>

          <div className="flex-1">
            <AlertDialogTitleBase id={titleId} className="text-lg sm:text-xl font-semibold text-destructive">
              {title}
            </AlertDialogTitleBase>
            <AlertDialogDescriptionBase id={descriptionId} className="mt-2 text-sm text-muted-foreground">
              {description}
            </AlertDialogDescriptionBase>
          </div>
        </div>
        <AlertDialogFooterBase className="mt-2 flex justify-end gap-3">
          <AlertDialogCancelBase
            onClick={onCancel}
            className={cn(
              buttonVariantsBase({ variant: "outline", size: "sm" }),
              "px-4 py-2",
              // neutralizar hover: transparente, leve opacidade e sem shadow
              "hover:bg-transparent hover:opacity-90 hover:shadow-none"
            )}
          >
            Cancelar
          </AlertDialogCancelBase>

          <AlertDialogActionBase
            onClick={onConfirm}
            className={cn(buttonVariantsBase({ variant: "destructive", size: "default" }), "px-5 py-2 shadow-lg")}
          >
            Confirmar
          </AlertDialogActionBase>
        </AlertDialogFooterBase>
      </AlertDialogContentBase>
    </AlertDialogBase>
  )
}

interface DestructiveDialogTriggerProps {
  title: string
  description: string
  onConfirm: () => void
  onCancel?: () => void
  children?: React.ReactNode
  triggerContent?: React.ReactNode
}

export const DestructiveDialogTrigger: React.FC<DestructiveDialogTriggerProps> = ({
  title,
  description,
  onConfirm,
  onCancel,
  children,
  triggerContent,
}) => {
  const titleId = "destructive-dialog-title"
  const descriptionId = "destructive-dialog-description"

  const triggerEl = React.isValidElement(children) ? (
    <AlertDialogTriggerBase asChild>{children}</AlertDialogTriggerBase>
  ) : (
    <AlertDialogTriggerBase>
  <ButtonBase variant="destructive">{triggerContent ?? "Excluir"}</ButtonBase>
    </AlertDialogTriggerBase>
  )

  return (
    <AlertDialogBase>
      {triggerEl}

      <AlertDialogContentBase
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className={cn("border border-destructive bg-background")}
      >
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full ring-1 ring-destructive/30">
            <XCircle className="w-6 h-6 text-destructive" />
          </div>

          <div className="flex-1">
            <AlertDialogTitleBase id={titleId} className="text-lg sm:text-xl font-semibold text-destructive">
              {title}
            </AlertDialogTitleBase>
            <AlertDialogDescriptionBase id={descriptionId} className="mt-2 text-sm text-muted-foreground">
              {description}
            </AlertDialogDescriptionBase>
          </div>
        </div>

        <AlertDialogFooterBase className="mt-2 flex justify-end gap-3">
          <AlertDialogCancelBase
            onClick={onCancel}
            className={cn(
              buttonVariantsBase({ variant: "outline", size: "sm" }),
              "px-4 py-2",
              "hover:bg-foreground/5 hover:text-primary hover:opacity-90 hover:shadow-none"
            )}
          >
            Cancelar
          </AlertDialogCancelBase>

          <AlertDialogActionBase
            onClick={onConfirm}
            className={cn(buttonVariantsBase({ variant: "destructive", size: "default" }), "px-5 py-2 shadow-lg")}
          >
            Confirmar
          </AlertDialogActionBase>
        </AlertDialogFooterBase>
      </AlertDialogContentBase>
    </AlertDialogBase>
  )
}

export default DestructiveDialog
