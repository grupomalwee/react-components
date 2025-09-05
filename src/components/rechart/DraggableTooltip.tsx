import React from "react";
import { MouseIcon } from "@phosphor-icons/react";
import { XIcon } from "@phosphor-icons/react/dist/ssr";
import CloseAllButton from "./CloseAllButton";

interface TooltipData {
  name: string;
  [key: string]: string | number;
}

interface DraggableTooltipProps {
  id: string;
  data: TooltipData;
  position: { top: number; left: number };
  isDragging: boolean;
  title?: string;
  dataKeys: string[];
  finalColors: Record<string, string>;
  onMouseDown: (id: string, e: React.MouseEvent) => void;
  onClose: (id: string) => void;
  periodLabel?: string; // "Período Selecionado" ou "Ponto Selecionado"
  dataLabel?: string; // "Dados do Período" ou "Dados do Ponto"
  // Props para o CloseAllButton
  showCloseAllButton?: boolean;
  globalTooltipCount?: number;
  onCloseAll?: () => void;
  closeAllButtonPosition?: "top-left" | "top-right" | "top-center";
  closeAllButtonVariant?: "floating" | "inline";
}

const DraggableTooltip: React.FC<DraggableTooltipProps> = ({
  id,
  data,
  position,
  isDragging,
  title,
  dataKeys,
  finalColors,
  onMouseDown,
  onClose,
  periodLabel = "Período Selecionado",
  dataLabel = "Dados do Período",
  showCloseAllButton = false,
  globalTooltipCount = 0,
  onCloseAll,
  closeAllButtonPosition = "top-center",
  closeAllButtonVariant = "floating",
}) => {
  return (
    <>
      <div
        className="fixed bg-card border border-border rounded-lg shadow-lg z-50 min-w-56 select-none"
        style={{
          top: position.top,
          left: position.left,
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onMouseDown={(e) => onMouseDown(id, e)}
        onClick={(e) => e.stopPropagation()}
      >
      <div className="flex items-center justify-between mb-2 p-3 pb-2 border-b bg-muted/20 rounded-t-lg">
        <div className="flex flex-col gap-1">
          {title && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="font-bold text-foreground text-base">{title}</p>
            </div>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose(id);
          }}
          className="text-muted-foreground hover:text-destructive ml-2 text-sm hover:bg-destructive/10 rounded p-1"
          title="Fechar este tooltip"
        >
          <XIcon size={14} />
        </button>
      </div>

      {/* Informação do item selecionado */}
      <div className="px-3 py-2 bg-accent/30 border-l-4 border-primary">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {periodLabel}
          </span>
        </div>
        <p className="font-bold text-lg text-foreground mt-1">
          {data.name}
        </p>
      </div>

      <div className="p-3 pt-2 space-y-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
          {dataLabel}
        </p>
        {dataKeys.map((key) => {
          const value = data[key];
          if (value === undefined) return null;

          return (
            <div
              key={key}
              className="flex items-center justify-between gap-3 text-sm mb-2 p-2 rounded bg-muted/20 hover:bg-muted/40 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-sm shadow-sm"
                  style={{ backgroundColor: finalColors[key] || "#666" }}
                />
                <span className="font-medium text-foreground">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
              </div>
              <span className="font-semibold text-foreground bg-background px-2 py-1 rounded text-xs">
                {(value as number).toLocaleString("pt-BR")}
              </span>
            </div>
          );
        })}

        <div className="mt-3 pt-2 border-t">
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <span>
              <MouseIcon />
            </span>
            Arraste para mover • Clique no <XIcon size={12} /> para remover
          </p>
        </div>
      </div>
      </div>

      {/* CloseAllButton - renderizado apenas se solicitado */}
      {showCloseAllButton && onCloseAll && (
        <CloseAllButton
          count={globalTooltipCount}
          onCloseAll={onCloseAll}
          position={closeAllButtonPosition}
          variant={closeAllButtonVariant}
        />
      )}
    </>
  );
};

export default DraggableTooltip;
