import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DotsSixVerticalIcon } from "@phosphor-icons/react";
import { XIcon } from "@phosphor-icons/react/dist/ssr";
import CloseAllButton from "../controls/CloseAllButton";

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
  periodLabel?: string;
  dataLabel?: string;
  showCloseAllButton?: boolean;
  globalTooltipCount?: number;
  onCloseAll?: () => void;
  closeAllButtonPosition?: "top-left" | "top-right" | "top-center";
  closeAllButtonVariant?: "floating" | "inline";
  onPositionChange?: (
    id: string,
    position: { top: number; left: number }
  ) => void;
  highlightedSeries?: Set<string>;
  toggleHighlight?: (key: string) => void;
  showOnlyHighlighted?: boolean;
}

const DraggableTooltip: React.FC<DraggableTooltipProps> = ({
  id,
  data,
  position,
  title,
  dataKeys,
  finalColors,

  onMouseDown,
  onClose,
  periodLabel = "Período Selecionado",
  dataLabel = "Dados do Período",
  showCloseAllButton = false,
  globalTooltipCount,
  onCloseAll,
  closeAllButtonPosition = "top-center",
  closeAllButtonVariant = "floating",
  onPositionChange,
  highlightedSeries,
  toggleHighlight,
  showOnlyHighlighted,
}) => {
  // keys currently visible inside the tooltip (respecting showOnlyHighlighted)
  const visibleKeys =
    showOnlyHighlighted && highlightedSeries && highlightedSeries.size > 0
      ? dataKeys.filter((k) => highlightedSeries.has(k))
      : dataKeys;
  // Componente interno para exibir total
  const TotalDisplay: React.FC<{ data: TooltipData }> = ({ data }) => {
    const numeric = visibleKeys
      .map((k) => data[k])
      .filter((v) => typeof v === "number") as number[];
    // total real (pode ser negativo)
    const total = numeric.reduce((s, v) => s + (v || 0), 0);
    return (
      <div className="text-sm">
        <div className="text-sm text-muted-foreground">Total</div>
        <div
          className={`text-base font-semibold ${
            total < 0 ? "text-destructive" : "text-foreground"
          }`}
        >
          {total.toLocaleString("pt-BR")}
        </div>
      </div>
    );
  };

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
    if (typeof onMouseDown === "function") onMouseDown(id, e);
  };

  const handleTouchStartLocal = (e: React.TouchEvent) => {
    e.stopPropagation();
    const touch = e.touches[0];
    if (!touch) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    offsetRef.current = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };
    setDragging(true);
    if (typeof onMouseDown === "function")
      onMouseDown(id, e as unknown as React.MouseEvent);
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
              <motion.div
                className="fixed pointer-events-none z-30"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 0.95,
                  left: startX,
                  top: startY,
                  width: isHorizontal ? endX - startX : 2,
                  height: isHorizontal ? 2 : endY - startY,
                }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
                style={{
                  backgroundColor: color,
                  boxShadow: `0 0 8px ${color}60`,
                  borderStyle: "dashed",
                  borderWidth: "1px",
                  borderColor: color,
                  transform: "translateZ(0)",
                }}
              />
              <motion.div
                className="fixed pointer-events-none z-31"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 0.9,
                  left:
                    guide.sourceTooltip.left +
                    guide.sourceTooltip.width / 2 -
                    4,
                  top:
                    guide.sourceTooltip.top +
                    guide.sourceTooltip.height / 2 -
                    4,
                }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ type: "spring", stiffness: 400, damping: 24 }}
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: color,
                  borderRadius: "50%",
                  boxShadow: `0 0 4px ${color}80`,
                }}
              />
              <motion.div
                className="fixed pointer-events-none z-31"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 0.9,
                  left:
                    guide.targetTooltip.left +
                    guide.targetTooltip.width / 2 -
                    4,
                  top:
                    guide.targetTooltip.top +
                    guide.targetTooltip.height / 2 -
                    4,
                }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ type: "spring", stiffness: 400, damping: 24 }}
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: color,
                  borderRadius: "50%",
                  boxShadow: `0 0 4px ${color}80`,
                }}
              />
            </div>
          );
        })}

      <AnimatePresence>
        <motion.div
          key={id}
          className="fixed bg-card border border-border rounded-lg shadow-lg z-50 min-w-80 select-none"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          style={{
            top: localPos.top,
            left: localPos.left,
            cursor: dragging ? "grabbing" : "grab",
            transform: "translateZ(0)",
          }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-label={title ? `Tooltip ${title}` : `Tooltip ${data.name}`}
        >
          <div
            className="flex items-center justify-between p-3 pb-2 border-b bg-muted/20 rounded-t-lg"
            onMouseDown={handleMouseDownLocal}
            onTouchStart={handleTouchStartLocal}
            style={{ touchAction: "none" }}
          >
            
            <DotsSixVerticalIcon size={16}/>
            <div className="flex flex-col gap-1">
              {title && (
                <div className="flex items-center gap-2 pb-0.5">
                  {/* <div className="w-2 h-2 bg-blue-500 rounded-full" /> */}
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

          <div className="px-3 py-2 bg-accent/5 border-l-4 border-primary">
            <div className="flex items-center justify-between gap-2">
              <div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {periodLabel}
                </span>
                <p className="font-bold text-lg text-foreground mt-1 truncate">
                  {data.name}
                </p>
              </div>
              <div className="text-right">
                <TotalDisplay data={data} />
              </div>
            </div>
          </div>

          <div className="p-3 pt-2 space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
              {dataLabel}
            </p>
            {(showOnlyHighlighted &&
            highlightedSeries &&
            highlightedSeries.size > 0
              ? dataKeys.filter((k) => highlightedSeries.has(k))
              : dataKeys
            ).map((key) => {
              const value = data[key];
              if (value === undefined) return null;
              const numericKeys = dataKeys.filter(
                (k) => typeof data[k] === "number"
              );
              const absDenominator = numericKeys.reduce(
                (s, k) => s + Math.abs(Number(data[k]) || 0),
                0
              );
              const val =
                typeof value === "number"
                  ? value
                  : Number(value as unknown) || 0;
              const pct =
                absDenominator > 0 ? (Math.abs(val) / absDenominator) * 100 : 0;
              const isDimmed =
                highlightedSeries &&
                highlightedSeries.size > 0 &&
                !highlightedSeries.has(key);
              const isHighlighted =
                highlightedSeries && highlightedSeries.has(key);

              return (
                <div
                  key={key}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleHighlight?.(key);
                    }
                  }}
                  onClick={() => toggleHighlight?.(key)}
                  className={`flex flex-col gap-1 text-sm mb-1 p-2 rounded transition-colors cursor-pointer bg-muted/20`}
                  style={{
                    boxShadow: isHighlighted
                      ? `0 6px 18px ${finalColors[key] || "#666"}33`
                      : undefined,
                    border: isHighlighted
                      ? `1px solid ${finalColors[key] || "#666"}22`
                      : undefined,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-sm shadow-sm"
                        style={{ backgroundColor: finalColors[key] || "#666" }}
                      />
                      <span className={`font-medium text-foreground truncate`}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span
                        className={`font-semibold tabular-nums ${
                          val < 0 ? "text-destructive" : "text-foreground"
                        }`}
                      >
                        {val.toLocaleString("pt-BR")}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {absDenominator > 0 ? `${pct.toFixed(1)}%` : "-"}
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-muted rounded-full h-1 overflow-hidden">
                    <div
                      className="h-1 rounded-full"
                      style={{
                        width: `${Math.max(0, Math.min(100, pct))}%`,
                        opacity: isDimmed ? 0.35 : 1,
                        background: finalColors[key] || "#666",
                        transition: "none",
                      }}
                    />
                  </div>
                </div>
              );
            })}

            <div className="mt-3 pt-2 border-t">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                Clique no <XIcon size={12} /> para remover
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
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
