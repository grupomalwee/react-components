import React, { useEffect, useRef, useState, useCallback } from "react";
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
  isDragging?: boolean;
  title?: string;
  dataKeys: string[];
  finalColors: Record<string, string>;
  onMouseDown?: (id: string, e: React.MouseEvent) => void;
  onClose: (id: string) => void;
  periodLabel?: string; // "Período Selecionado" ou "Ponto Selecionado"
  dataLabel?: string; // "Dados do Período" ou "Dados do Ponto"
  // Props para o CloseAllButton
  showCloseAllButton?: boolean;
  globalTooltipCount?: number;
  onCloseAll?: () => void;
  closeAllButtonPosition?: "top-left" | "top-right" | "top-center";
  closeAllButtonVariant?: "floating" | "inline";
  onPositionChange?: (
    id: string,
    position: { top: number; left: number }
  ) => void;
}

const DraggableTooltip: React.FC<DraggableTooltipProps> = ({
  id,
  data,
  position,
  title,
  dataKeys,
  finalColors,

  onClose,
  periodLabel = "Período Selecionado",
  dataLabel = "Dados do Período",
  showCloseAllButton = false,
  globalTooltipCount,
  onCloseAll,
  closeAllButtonPosition = "top-center",
  closeAllButtonVariant = "floating",
  onPositionChange,
}) => {
  // internal position state so tooltip can move locally and notify parent
  const [localPos, setLocalPos] = useState<{ top: number; left: number }>(
    position
  );
  const [dragging, setDragging] = useState(false);
  const offsetRef = useRef({ x: 0, y: 0 });

  const lastMouse = useRef({ x: 0, y: 0 });
  const [alignmentGuides, setAlignmentGuides] = useState<
    Array<{
      type: "horizontal" | "vertical";
      position: number;
      sourceTooltip: {
        top: number;
        left: number;
        width: number;
        height: number;
      };
      targetTooltip: {
        top: number;
        left: number;
        width: number;
        height: number;
      };
    }>
  >([]);
  const [globalTooltipCountLocal, setGlobalTooltipCountLocal] = useState(0);

  // Keep localPos in sync with incoming prop when parent updates
  useEffect(() => setLocalPos(position), [position]);

  const ALIGNMENT_THRESHOLD = 25;
  const GUIDE_THRESHOLD = 60;
  const STRONG_SNAP_THRESHOLD = 35;
  const PRECISION_SNAP_THRESHOLD = 8;

  const getAllTooltips = useCallback(() => {
    const response: Array<{
      id: string;
      position: { top: number; left: number };
    }> = [];
    const ev = new CustomEvent("requestGlobalTooltips", {
      detail: { requesterId: id, response },
    });
    window.dispatchEvent(ev);
    return response;
  }, [id]);

  const updateAlignmentGuides = useCallback(
    (currentPosition: { top: number; left: number }) => {
      const allTooltips = getAllTooltips();
      const otherTooltips = allTooltips.filter((t) => t.id !== id);
      const guides: typeof alignmentGuides = [];
      const tooltipDimensions = { width: 224, height: 120 };

      otherTooltips.forEach((tooltip) => {
        const topDiff = Math.abs(currentPosition.top - tooltip.position.top);
        if (topDiff <= GUIDE_THRESHOLD) {
          guides.push({
            type: "horizontal",
            position: tooltip.position.top,
            sourceTooltip: {
              top: currentPosition.top,
              left: currentPosition.left,
              width: tooltipDimensions.width,
              height: tooltipDimensions.height,
            },
            targetTooltip: {
              top: tooltip.position.top,
              left: tooltip.position.left,
              width: tooltipDimensions.width,
              height: tooltipDimensions.height,
            },
          });
        }
        const leftDiff = Math.abs(currentPosition.left - tooltip.position.left);
        if (leftDiff <= GUIDE_THRESHOLD) {
          guides.push({
            type: "vertical",
            position: tooltip.position.left,
            sourceTooltip: {
              top: currentPosition.top,
              left: currentPosition.left,
              width: tooltipDimensions.width,
              height: tooltipDimensions.height,
            },
            targetTooltip: {
              top: tooltip.position.top,
              left: tooltip.position.left,
              width: tooltipDimensions.width,
              height: tooltipDimensions.height,
            },
          });
        }
      });

      setAlignmentGuides(guides);
    },
    [getAllTooltips, id]
  );

  const snapToGuides = useCallback(
    (position: { top: number; left: number }) => {
      const snappedPosition = { ...position };
      let hasSnapped = false;
      alignmentGuides.forEach((guide) => {
        if (guide.type === "horizontal") {
          const diff = Math.abs(position.top - guide.position);
          if (diff <= PRECISION_SNAP_THRESHOLD) {
            snappedPosition.top = guide.position;
            hasSnapped = true;
          }
        } else {
          const diff = Math.abs(position.left - guide.position);
          if (diff <= PRECISION_SNAP_THRESHOLD) {
            snappedPosition.left = guide.position;
            hasSnapped = true;
          }
        }
      });
      if (!hasSnapped) {
        alignmentGuides.forEach((guide) => {
          if (guide.type === "horizontal") {
            const diff = Math.abs(position.top - guide.position);
            if (diff <= STRONG_SNAP_THRESHOLD)
              snappedPosition.top = guide.position;
          } else {
            const diff = Math.abs(position.left - guide.position);
            if (diff <= STRONG_SNAP_THRESHOLD)
              snappedPosition.left = guide.position;
          }
        });
      }
      alignmentGuides.forEach((guide) => {
        if (guide.type === "horizontal") {
          const diff = Math.abs(position.top - guide.position);
          if (
            diff <= ALIGNMENT_THRESHOLD &&
            snappedPosition.top === position.top
          )
            snappedPosition.top = guide.position;
        } else {
          const diff = Math.abs(position.left - guide.position);
          if (
            diff <= ALIGNMENT_THRESHOLD &&
            snappedPosition.left === position.left
          )
            snappedPosition.left = guide.position;
        }
      });
      return snappedPosition;
    },
    [alignmentGuides]
  );

  // Drag handlers using document mouse events and RAF
  useEffect(() => {
    let rafId: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      lastMouse.current = { x: e.clientX, y: e.clientY };
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const newLeft = lastMouse.current.x - offsetRef.current.x;
        const newTop = lastMouse.current.y - offsetRef.current.y;
        const rawPosition = {
          top: Math.max(0, Math.min(newTop, window.innerHeight - 200)),
          left: Math.max(0, Math.min(newLeft, window.innerWidth - 250)),
        };
        updateAlignmentGuides(rawPosition);
        const snapped = snapToGuides(rawPosition);
        setLocalPos(snapped);
        if (onPositionChange) onPositionChange(id, snapped);
      });
    };

    const handleMouseUp = () => {
      if (dragging) {
        setDragging(false);
        setAlignmentGuides([]);
        if (rafId) cancelAnimationFrame(rafId);
      }
    };

    if (dragging) {
      document.addEventListener("mousemove", handleMouseMove, {
        passive: true,
      });
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "grabbing";
      document.body.style.userSelect = "none";
    }
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [dragging, snapToGuides, updateAlignmentGuides, id, onPositionChange]);

  // Respond to global events and participate in tooltip counting
  useEffect(() => {
    const handleCloseAll = () => {
      onClose(id);
    };
    const handleRequestTooltipCount = () => {
      window.dispatchEvent(
        new CustomEvent("tooltipCountResponse", { detail: { count: 1 } })
      );
    };
    const handleRequestGlobalTooltips = (event: Event) => {
      const customEvent = event as CustomEvent<{
        requesterId: string;
        response: Array<{
          id: string;
          position: { top: number; left: number };
        }>;
      }>;
      const detail = customEvent.detail;
      if (detail && detail.response && detail.requesterId) {
        // append this tooltip if not already present
        if (!detail.response.find((t) => t.id === id)) {
          detail.response.push({ id, position: localPos });
        }
      }
    };

    window.addEventListener("closeAllTooltips", handleCloseAll);
    window.addEventListener("requestTooltipCount", handleRequestTooltipCount);
    window.addEventListener(
      "requestGlobalTooltips",
      handleRequestGlobalTooltips as EventListener
    );
    return () => {
      window.removeEventListener("closeAllTooltips", handleCloseAll);
      window.removeEventListener(
        "requestTooltipCount",
        handleRequestTooltipCount
      );
      window.removeEventListener(
        "requestGlobalTooltips",
        handleRequestGlobalTooltips as EventListener
      );
    };
  }, [id, localPos, onClose]);

  // Maintain local global tooltip count (used for CloseAllButton)
  useEffect(() => {
    if (dragging) return;
    let total = 0;
    const handleCountResponse = (event: Event) => {
      const customEvent = event as CustomEvent;
      total += customEvent.detail.count || 0;
    };
    window.addEventListener("tooltipCountResponse", handleCountResponse);
    window.dispatchEvent(new CustomEvent("requestTooltipCount"));
    const timeoutId = setTimeout(() => {
      window.removeEventListener("tooltipCountResponse", handleCountResponse);
      setGlobalTooltipCountLocal(total);
    }, 50);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("tooltipCountResponse", handleCountResponse);
    };
  }, [localPos, dragging]);

  // Allow external forces (e.g. Chart) to request a recount
  useEffect(() => {
    const recount = () => {
      if (dragging) return;
      let total = 0;
      const handleCountResponse = (event: Event) => {
        const customEvent = event as CustomEvent;
        total += customEvent.detail.count || 0;
      };
      window.addEventListener("tooltipCountResponse", handleCountResponse);
      window.dispatchEvent(new CustomEvent("requestTooltipCount"));
      setTimeout(() => {
        window.removeEventListener("tooltipCountResponse", handleCountResponse);
        setGlobalTooltipCountLocal(total);
      }, 50);
    };
    window.addEventListener("recountTooltips", recount as EventListener);
    return () =>
      window.removeEventListener("recountTooltips", recount as EventListener);
  }, [dragging]);

  const handleMouseDownLocal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    offsetRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setDragging(true);
  };

  return (
    <>
      {dragging &&
        alignmentGuides.map((guide, index) => {
          const isHorizontal = guide.type === "horizontal";
          const color = isHorizontal ? "#3b82f6" : "#ef4444";
          const startX = isHorizontal
            ? Math.min(
                guide.sourceTooltip.left + guide.sourceTooltip.width / 2,
                guide.targetTooltip.left + guide.targetTooltip.width / 2
              )
            : guide.sourceTooltip.left + guide.sourceTooltip.width / 2;
          const endX = isHorizontal
            ? Math.max(
                guide.sourceTooltip.left + guide.sourceTooltip.width / 2,
                guide.targetTooltip.left + guide.targetTooltip.width / 2
              )
            : guide.targetTooltip.left + guide.targetTooltip.width / 2;
          const startY = isHorizontal
            ? guide.sourceTooltip.top + guide.sourceTooltip.height / 2
            : Math.min(
                guide.sourceTooltip.top + guide.sourceTooltip.height / 2,
                guide.targetTooltip.top + guide.targetTooltip.height / 2
              );
          const endY = isHorizontal
            ? guide.targetTooltip.top + guide.targetTooltip.height / 2
            : Math.max(
                guide.sourceTooltip.top + guide.sourceTooltip.height / 2,
                guide.targetTooltip.top + guide.targetTooltip.height / 2
              );

          return (
            <div key={index}>
              <div
                className="fixed pointer-events-none z-30"
                style={{
                  left: startX,
                  top: startY,
                  width: isHorizontal ? endX - startX : "2px",
                  height: isHorizontal ? "2px" : endY - startY,
                  backgroundColor: color,
                  boxShadow: `0 0 8px ${color}60`,
                  opacity: 0.9,
                  borderStyle: "dashed",
                  borderWidth: "1px",
                  borderColor: color,
                  transform: "translateZ(0)",
                }}
              />
              <div
                className="fixed pointer-events-none z-31"
                style={{
                  left:
                    guide.sourceTooltip.left +
                    guide.sourceTooltip.width / 2 -
                    4,
                  top:
                    guide.sourceTooltip.top +
                    guide.sourceTooltip.height / 2 -
                    4,
                  width: "8px",
                  height: "8px",
                  backgroundColor: color,
                  borderRadius: "50%",
                  boxShadow: `0 0 4px ${color}80`,
                  opacity: 0.8,
                }}
              />
              <div
                className="fixed pointer-events-none z-31"
                style={{
                  left:
                    guide.targetTooltip.left +
                    guide.targetTooltip.width / 2 -
                    4,
                  top:
                    guide.targetTooltip.top +
                    guide.targetTooltip.height / 2 -
                    4,
                  width: "8px",
                  height: "8px",
                  backgroundColor: color,
                  borderRadius: "50%",
                  boxShadow: `0 0 4px ${color}80`,
                  opacity: 0.8,
                }}
              />
            </div>
          );
        })}

      <div
        className="fixed bg-card border border-border rounded-lg shadow-lg z-50 min-w-56 select-none"
        style={{
          top: localPos.top,
          left: localPos.left,
          cursor: dragging ? "grabbing" : "grab",
        }}
        onMouseDown={handleMouseDownLocal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-2 p-3 pb-2 border-b bg-muted/20 rounded-t-lg">
          <div className="flex flex-col gap-1">
            {title && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
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
          <p className="font-bold text-lg text-foreground mt-1">{data.name}</p>
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
          count={
            typeof globalTooltipCount === "number"
              ? globalTooltipCount
              : globalTooltipCountLocal
          }
          onCloseAll={onCloseAll}
          position={closeAllButtonPosition}
          variant={closeAllButtonVariant}
        />
      )}
    </>
  );
};

export default DraggableTooltip;
