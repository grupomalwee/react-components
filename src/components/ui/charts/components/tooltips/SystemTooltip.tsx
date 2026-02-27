import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DotsSixVerticalIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { XIcon } from "@phosphor-icons/react";
import { ButtonBase } from "@/components/ui/form/ButtonBase";
import { SeparatorBase } from "@/components/ui/layout/SeparatorBase";
import { SkeletonBase } from "@/components/ui/feedback/SkeletonBase";
import type { SystemData, Connection} from "./utils/systemTooltipUtils";

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

interface Position {
  top: number;
  left: number;
}

interface SystemTooltipProps {
  id: string;
  data: SystemData;
  position: Position;
  title?: string;
  isLoading?: boolean;
  onMouseDown?: (id: string, e: React.MouseEvent | React.TouchEvent) => void;
  onClose: (id: string) => void;
  onPositionChange?: (id: string, position: Position) => void;
  onConnectionClick?: (conn: Connection, pos: { x: number; y: number }) => void;
  onProcessClick?: (conn: Connection, pos: { x: number; y: number }) => void;
}

const SystemTooltip: React.FC<SystemTooltipProps> = ({
  id,
  data,
  position,
  title = "Conexões",
  isLoading = false,
  onMouseDown,
  onClose,
  onPositionChange,
  onConnectionClick,
  onProcessClick,
}) => {
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
        const rawPosition = {
          top: Math.max(0, Math.min(newTop, window.innerHeight - 200)),
          left: Math.max(0, Math.min(newLeft, window.innerWidth - 320)),
        };
        setLocalPos(rawPosition);
        if (onPositionChange) onPositionChange(id, rawPosition);
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

  const handleConnClick = useCallback(
    (e: React.MouseEvent, conn: Connection) => {
      e.stopPropagation();
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const pos = { x: rect.right + 8, y: rect.top };

      if (conn.integration?.Nome) {
        onProcessClick?.(conn, pos);
      } else {
        onConnectionClick?.(conn, pos);
      }
    },
    [onConnectionClick, onProcessClick],
  );

  const entries = useMemo(
    () => data.connections.filter((c) => c.type === "entrada"),
    [data.connections],
  );
  const exits = useMemo(
    () => data.connections.filter((c) => c.type === "saida"),
    [data.connections],
  );

  const renderConnections = (
    connections: Connection[],
    color: "emerald" | "blue",
  ) => {
    const isEmerald = color === "emerald";
    return connections.map((conn) => (
      <div
        key={conn.id}
        className={`group flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all
          ${
            isEmerald
              ? "bg-emerald-500/5 border border-emerald-500/10 hover:border-emerald-500/30"
              : "bg-blue-500/5 border border-blue-500/10 hover:border-blue-500/30"
          }`}
        onClick={(e) => handleConnClick(e, conn)}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="text-sm font-medium truncate">{conn.name}</span>
        </div>
        <ArrowRightIcon
          size={14}
          className={`shrink-0 ${isEmerald ? "text-emerald-500 rotate-180" : "text-blue-500"}`}
        />
      </div>
    ));
  };

  return (
    <AnimatePresence>
      <motion.div
        key={id}
        className="fixed bg-card/95 backdrop-blur-md border border-border/50 rounded-xl shadow-2xl z-[10000] w-80 overflow-hidden"
        variants={tooltipVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={{
          top: localPos.top,
          left: localPos.left,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between py-1 border-b border-border/10 bg-muted/30"
          onMouseDown={handleMouseDownLocal}
          onTouchStart={handleTouchStartLocal}
          style={{
            touchAction: "none",
            cursor: dragging ? "grabbing" : "grab",
          }}
        >
          <div className="flex items-center gap-2 px-3">
            <div className="rounded">
              <DotsSixVerticalIcon size={16} className="text-primary" />
            </div>
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

        <div className="px-4 pt-4 pb-3">
          {isLoading ? (
            <div className="space-y-2">
              <SkeletonBase className="h-6 w-3/4" />
              <SkeletonBase className="h-4 w-1/2" />
            </div>
          ) : (
            <>
              <h3 className="text-xl font-bold text-foreground tracking-tight truncate">
                {data.name}
              </h3>
              {data.description && (
                <p className="text-sm text-muted-foreground tracking-tight truncate">
                  {data.description}
                </p>
              )}
            </>
          )}
        </div>

        <div className="px-3 pb-4 space-y-4 max-h-[300px] overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/40 transition-colors">
          <SeparatorBase className="w-full" />

          {isLoading ? (
            <>
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-1">
                  <SkeletonBase className="w-1.5 h-1.5 rounded-full" />
                  <SkeletonBase className="h-3 w-16" />
                </div>
                <div className="space-y-1">
                  {[1, 2, 3].map((i) => (
                    <SkeletonBase key={i} className="h-10 w-full rounded-lg" />
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-1">
                  <SkeletonBase className="w-1.5 h-1.5 rounded-full" />
                  <SkeletonBase className="h-3 w-16" />
                </div>
                <div className="space-y-1">
                  {[1, 2].map((i) => (
                    <SkeletonBase key={i} className="h-10 w-full rounded-lg" />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {entries.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 px-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">
                      Entradas
                    </span>
                  </div>
                  <div className="space-y-1">
                    {renderConnections(entries, "emerald")}
                  </div>
                </div>
              )}

              {exits.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 px-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">
                      Saídas
                    </span>
                  </div>
                  <div className="space-y-1">
                    {renderConnections(exits, "blue")}
                  </div>
                </div>
              )}

              {data.connections.length === 0 && !isLoading && (
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <p className="text-xs text-muted-foreground">
                    Nenhuma conexão encontrada
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SystemTooltip;