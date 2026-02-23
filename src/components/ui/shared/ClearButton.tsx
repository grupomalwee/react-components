import React from "react";
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
  onClick?: (e?: React.MouseEvent<HTMLElement>) => void;
  ariaLabel?: string;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function ClearButton({
  onClick,
  ariaLabel = "Limpar seleção",
  className,
}: ClearButtonProps) {
  return (
    <span    
      role="button"
      aria-label={ariaLabel}
      tabIndex={-1}
      onPointerDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onMouseDown={(e) => {
        e.preventDefault();
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      className={cn(
        "flex justify-center hover:text-red-500 hover:bg-transparent p-1 transition-all text-gray-500 cursor-pointer",
        className
      )}
    >
      <XIcon className={`w-4 h-4 ${className}`} />
    </span>
  );
}
