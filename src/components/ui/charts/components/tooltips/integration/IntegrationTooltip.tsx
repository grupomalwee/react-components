"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DotsSixVerticalIcon, XIcon } from "@phosphor-icons/react";
import { ButtonBase } from "@/components/ui/form/ButtonBase";
import { IntegrationData } from "../utils/integrationTooltipUtils";
import { useIsMobile } from "@/hooks/use-mobile";
import { TooltipBody } from "./TooltipBody";

export interface Position {
  top: number;
  left: number;
}

export interface IntegrationTooltipProps {
  id: string;
  data: IntegrationData;
  position: Position;
  title?: string;
  isLoading?: boolean;
  systemName?: string;
  onMouseDown?: (id: string, e: React.MouseEvent | React.TouchEvent) => void;
  onClose: (id: string) => void;
  onPositionChange?: (id: string, position: Position) => void;
}

const tooltipVariants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    transition: { type: "spring" as const, stiffness: 400, damping: 28 },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 28 },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { type: "spring" as const, stiffness: 400, damping: 28 },
  },
};

const IntegrationTooltip: React.FC<IntegrationTooltipProps> = ({
  id,
  data,
  position,
  title = "Conexões",
  isLoading = false,
  systemName,
  onMouseDown,
  onClose,
  onPositionChange,
}) => {
  const isMobile = useIsMobile();
  const [localPos, setLocalPos] = useState<Position>(position);
  const [dragging, setDragging] = useState(false);
  const offsetRef = useRef({ x: 0, y: 0 });
  const lastMouse = useRef({ x: 0, y: 0 });

  useEffect(() => setLocalPos(position), [position]);

  useEffect(() => {
    let rafId: number | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      lastMouse.current = { x: e.clientX, y: e.clientY };
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const newLeft = lastMouse.current.x - offsetRef.current.x;
        const newTop = lastMouse.current.y - offsetRef.current.y;
        const p = {
          top: Math.max(0, Math.min(newTop, window.innerHeight - 200)),
          left: Math.max(0, Math.min(newLeft, window.innerWidth - 320)),
        };
        setLocalPos(p);
        onPositionChange?.(id, p);
      });
    };
    const handleMouseUp = () => {
      if (dragging) {
        setDragging(false);
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
  }, [dragging, id, onPositionChange]);

  const handleMouseDownLocal = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const rect = (e.currentTarget as HTMLElement)
        .closest(".fixed")
        ?.getBoundingClientRect();
      if (!rect) return;
      offsetRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      setDragging(true);
      onMouseDown?.(id, e);
    },
    [id, onMouseDown],
  );

  const handleTouchStartLocal = useCallback(
    (e: React.TouchEvent) => {
      e.stopPropagation();
      const touch = e.touches[0];
      if (!touch) return;
      const rect = (e.currentTarget as HTMLElement)
        .closest(".fixed")
        ?.getBoundingClientRect();
      if (!rect) return;
      offsetRef.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
      setDragging(true);
      onMouseDown?.(id, e);
    },
    [id, onMouseDown],
  );

  const inputConnections = useMemo(
    () => data.connections.filter((c) => c.type === "entrada"),
    [data.connections],
  );
  const outputConnections = useMemo(
    () => data.connections.filter((c) => c.type === "saida"),
    [data.connections],
  );

  const isInput = inputConnections.length > 0;
  const connections = isInput ? inputConnections : outputConnections;
  const externalSystem = systemName ?? connections[0]?.name ?? "Sistema";

  const header = (
    <div
      className="flex items-center justify-between py-1 border-b border-border/10 bg-muted/30 shrink-0"
      onMouseDown={handleMouseDownLocal}
      onTouchStart={handleTouchStartLocal}
      style={{
        touchAction: "none",
        cursor: dragging ? "grabbing" : "grab",
      }}
    >
      <div className="flex items-center gap-2 px-3">
        <DotsSixVerticalIcon size={16} className="text-primary" />
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </span>
      </div>
      <ButtonBase
        variant="ghost"
        size="icon"
        onClick={() => onClose(id)}
        className="text-muted-foreground hover:text-destructive transition-colors hover:bg-destructive/10 mr-1"
        style={{ cursor: "pointer" }}
      >
        <XIcon size={16} />
      </ButtonBase>
    </div>
  );

  const bodyProps = { data, isLoading, connections, isInput, externalSystem };

  if (isMobile) {
    return (
      <AnimatePresence>
        <>
          <motion.div
            key={`overlay-${id}`}
            className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onClose(id)}
          />

          <motion.div
            key={`sheet-${id}`}
            className="fixed bottom-0 left-0 right-0 z-[10000] bg-card border-t border-border/50 rounded-t-2xl shadow-2xl flex flex-col"
            style={{ maxHeight: "85dvh" }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 36 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center pt-2.5 pb-1 shrink-0">
              <div className="w-10 h-1 rounded-full bg-border" />
            </div>

            {header}

            <div className="overflow-y-auto flex-1 pb-[env(safe-area-inset-bottom)]">
              <TooltipBody {...bodyProps} />
            </div>
          </motion.div>
        </>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        key={id}
        className="fixed bg-card/95 backdrop-blur-md border border-border/50 rounded-lg shadow-2xl z-[10000] w-[calc(100vw-32px)] max-w-sm sm:w-80 overflow-hidden flex flex-col"
        variants={tooltipVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={{ top: localPos.top, left: localPos.left }}
        onClick={(e) => e.stopPropagation()}
      >
        {header}
        <div className="max-h-[60vh] sm:max-h-[520px] overflow-hidden flex flex-col">
          <TooltipBody {...bodyProps} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default IntegrationTooltip;
