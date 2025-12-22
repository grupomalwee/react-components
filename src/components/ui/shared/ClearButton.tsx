import React from "react";
import { ButtonBase } from "@/components/ui/form/ButtonBase";
import { cn } from "../../../lib/utils";
import { XIcon } from "@phosphor-icons/react/dist/ssr";

type ButtonVariant =
  | "ghost"
  | "default"
  | "destructive"
  | "outline"
  | "select"
  | "secondary"
  | "link";

type ButtonSize = "icon" | "default" | "select" | "sm" | "lg";

export interface ClearButtonProps {
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  ariaLabel?: string;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function ClearButton({
  onClick,
  ariaLabel = "Limpar seleção",
  className,
  variant = "ghost",
  size = "icon",
}: ClearButtonProps) {
  return (
    <ButtonBase
      variant={variant}
      size={size}
      aria-label={ariaLabel}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onClick?.(e);
      }}
      className={cn(
        "flex items-center justify-center hover:text-red-500",
        className
      )}
    >
      <XIcon className="w-4 h-4" />
    </ButtonBase>
  );
}
