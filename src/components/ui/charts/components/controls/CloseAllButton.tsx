import React from "react";
import { XIcon } from "@phosphor-icons/react/dist/ssr";
import { ButtonBase } from "@/components/ui/form/ButtonBase";

interface CloseAllButtonProps {
  count: number;
  onCloseAll: () => void;
  position?: "top-left" | "top-right" | "top-center";
  variant?: "floating" | "inline";
}

const CloseAllButton: React.FC<CloseAllButtonProps> = ({
  count,
  onCloseAll,
  position = "top-center",
  variant = "floating",
}) => {
  if (count <= 1) return null;

  const getPositionClasses = () => {
    if (variant === "inline") return "";

    switch (position) {
      case "top-left":
        return "fixed top-6 left-6 z-50";
      case "top-right":
        return "fixed top-6 right-6 z-50";
      case "top-center":
        return "fixed top-6 left-1/2 transform -translate-x-1/2 z-50";
      default:
        return "fixed top-6 left-1/2 transform -translate-x-1/2 z-50";
    }
  };

  const getVariantClasses = () => {
    if (variant === "inline") {
      return "text-xs px-2 py-1 h-auto bg-card border border-border shadow-sm hover:bg-accent";
    }

    return `
      rounded-full px-4 py-2.5
      text-white font-semibold text-sm
      transition-all duration-200 ease-in-out
      hover:scale-105 active:scale-95 hover:shadow-2xl
      flex items-center gap-2.5
      group
      min-w-max
    `;
  };

  if (variant === "inline") {
    return (
      <div className="absolute top-4 right-4 z-30">
        <ButtonBase
          variant="ghost"
          size="sm"
          onClick={onCloseAll}
          className={getVariantClasses()}
        >
          <XIcon size={12} className="mr-1" />
          Fechar Todos
        </ButtonBase>
      </div>
    );
  }

  return (
    <div
      className={`${getPositionClasses()} animate-in fade-in slide-in-from-top-2 duration-300`}
    >
      <div>
        <ButtonBase
          onClick={onCloseAll}
          size="sm"
          className={`bg-red-600 hover:bg-red-700${getVariantClasses()}`}
        >
          <XIcon
            size={18}
            className="
              group-hover:rotate-90 transition-all duration-300 ease-out
              drop-shadow-sm
            "
          />
          <span className="min-w-0 tracking-wide">Fechar Todos</span>
          <div className="mb-1 mx-2">{count}</div>
        </ButtonBase>
      </div>
    </div>
  );
};

export default CloseAllButton;
