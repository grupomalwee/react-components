"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
  useId,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckIcon,
  CopyIcon,
  DotsSixVerticalIcon,
  XIcon,
} from "@phosphor-icons/react";
import { ButtonBase } from "@/components/ui/form/ButtonBase";
import { SkeletonBase } from "@/components/ui/feedback/SkeletonBase";
import { ScrollAreaBase } from "@/components/ui/layout/ScrollareaBase";
import {
  TooltipProviderBase,
  TooltipBase,
  TooltipTriggerBase,
  TooltipContentBase,
} from "@/components/ui/feedback/TooltipBase";
import { IntegrationData } from "../utils/integrationTooltipUtils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useIsTruncated } from "./hooks/useIsTruncated";
import { IntegrationProperties } from "../utils";

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

const CopyData: React.FC<{ value: string }> = ({ value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [value]);

  return (
    <TooltipProviderBase>
      <TooltipBase>
        <TooltipTriggerBase asChild>
          <button
            onClick={handleCopy}
            className="shrink-0 p-0.5 rounded transition-colors text-muted-foreground/40 hover:text-foreground hover:bg-muted"
            style={{ cursor: "pointer" }}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </button>
        </TooltipTriggerBase>
        <TooltipContentBase sideOffset={6} className="z-[10001]">
          {copied ? "Copiado!" : "Copiar"}
        </TooltipContentBase>
      </TooltipBase>
    </TooltipProviderBase>
  );
};

const propertyLabels: Record<string, string> = {
  Nome: "Nome",
  tipo: "Tipo",
  Tipo: "Tipo",
  Protocolos: "Protocolos",
  Ambiente: "Ambiente",
  Setor: "Setor",
  Contato: "Contato",
  Sustentacao: "Sustentação",
  Destino: "Destino",
  Origem: "Origem",
};

const IntegrationCard: React.FC<{
  title: string;
  details?: IntegrationProperties | null;
}> = ({ title, details }) => {
  const titleRef = useRef<HTMLSpanElement>(null);
  const isTitleTruncated = useIsTruncated(titleRef);

  const blackList = ["id", "elementId", "identity"];
  const entries = details
    ? Object.entries(details).filter(
        ([key, value]) =>
          value !== undefined &&
          value !== null &&
          value !== "" &&
          !blackList.includes(key),
      )
    : [];

  return (
    <div className="rounded-lg border border-border/40 bg-muted/20 overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border/30">
        <TooltipProviderBase>
          <TooltipBase>
            <TooltipTriggerBase asChild>
              <span
                ref={titleRef}
                className="text-sm font-bold text-foreground truncate flex-1 min-w-0 cursor-default"
              >
                {title}
              </span>
            </TooltipTriggerBase>
            {isTitleTruncated && (
              <TooltipContentBase sideOffset={6} className="z-[10001]">
                {title}
              </TooltipContentBase>
            )}
          </TooltipBase>
        </TooltipProviderBase>
        {entries.length > 0 && (
          <CopyData
            value={entries
              .map(([k, v]) => `${propertyLabels[k] || k}: ${String(v)}`)
              .join("\n")}
          />
        )}
      </div>

      {entries.length > 0 && (
        <div className="divide-y divide-border/20 px-0.5">
          {entries.map(([key, value]) => {
            const label = propertyLabels[key] || key;
            return (
              <div key={key} className="flex items-center gap-2 px-3 py-1.5">
                <span className="text-xs font-semibold text-muted-foreground shrink-0 w-[40%] sm:w-[38%]">
                  {label}:
                </span>
                <span className="text-xs text-foreground break-all flex-1 min-w-0">
                  {String(value)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const NameTooltip: React.FC<{ name: string; description?: string }> = ({
  name,
  description,
}) => {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const isNameTruncated = useIsTruncated(nameRef);
  const isDescTruncated = useIsTruncated(descRef);
  const showTooltip = isNameTruncated || isDescTruncated;

  return (
    <TooltipProviderBase>
      <TooltipBase>
        <TooltipTriggerBase asChild>
          <div className="cursor-default min-w-0">
            <h3
              ref={nameRef}
              className="text-xl font-bold text-foreground tracking-tight truncate"
            >
              {name}
            </h3>
            {description && (
              <p
                ref={descRef}
                className="text-xs text-foreground/70 truncate mt-0.5"
              >
                {description}
              </p>
            )}
          </div>
        </TooltipTriggerBase>
        {showTooltip && (
          <TooltipContentBase sideOffset={8} className="z-[10001]">
            <p className="font-semibold">{name}</p>
            {description && (
              <p className="text-xs text-foreground/70 mt-0.5">{description}</p>
            )}
          </TooltipContentBase>
        )}
      </TooltipBase>
    </TooltipProviderBase>
  );
};

const SystemNode: React.FC<{ label: string }> = ({ label }) => {
  const truncated = label.length > 9 ? label.substring(0, 9) + "…" : label;
  const needsTooltip = label.length > 9;

  const circle = (
    <div className="w-[76px] h-[76px] rounded-full bg-primary flex items-center justify-center shrink-0 z-10 cursor-default max-w-xs">
      <span className="text-[10px] font-bold text-primary-foreground text-center px-2 leading-tight select-none">
        {truncated}
      </span>
    </div>
  );

  if (!needsTooltip) return circle;
  return (
    <TooltipProviderBase>
      <TooltipBase>
        <TooltipTriggerBase asChild>{circle}</TooltipTriggerBase>
        <TooltipContentBase sideOffset={8} className="z-[10001]">
          {label}
        </TooltipContentBase>
      </TooltipBase>
    </TooltipProviderBase>
  );
};

const Beam: React.FC<{
  isInput: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  leftRef: React.RefObject<HTMLDivElement | null>;
  rightRef: React.RefObject<HTMLDivElement | null>;
}> = ({ isInput, containerRef, leftRef, rightRef }) => {
  const gradientId = useId();
  const [pathD, setPathD] = useState("");
  const [svgSize, setSvgSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    let rafId: number;

    const update = () => {
      const container = containerRef.current;
      const left = leftRef.current;
      const right = rightRef.current;
      if (!container || !left || !right) return;

      const cr = container.getBoundingClientRect();
      const lr = left.getBoundingClientRect();
      const rr = right.getBoundingClientRect();

      const cx1 = lr.left - cr.left + lr.width / 2;
      const cy1 = lr.top - cr.top + lr.height / 2;
      const cx2 = rr.left - cr.left + rr.width / 2;
      const cy2 = rr.top - cr.top + rr.height / 2;

      const dx = cx2 - cx1,
        dy = cy2 - cy1;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist === 0) return;
      const ux = dx / dist,
        uy = dy / dist;

      const r1 = lr.width / 2;
      const r2 = rr.width / 2;

      setSvgSize({ w: cr.width, h: cr.height });
      setPathD(
        `M ${cx1 + ux * r1},${cy1 + uy * r1} ` +
          `L ${cx2 - ux * r2},${cy2 - uy * r2}`,
      );
    };

    const schedule = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    requestAnimationFrame(() => requestAnimationFrame(update));
    schedule();

    const ro = new ResizeObserver(schedule);
    if (containerRef.current) ro.observe(containerRef.current);
    if (leftRef.current) ro.observe(leftRef.current);
    if (rightRef.current) ro.observe(rightRef.current);

    const mo = new MutationObserver(schedule);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });
    mo.observe(document.body, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      mo.disconnect();
    };
  }, [containerRef, leftRef, rightRef]);

  const animX1 = isInput ? ["90%", "-10%"] : ["10%", "110%"];
  const animX2 = isInput ? ["100%", "0%"] : ["0%", "100%"];

  if (!pathD) return null;

  return (
    <svg
      className="pointer-events-none absolute left-0 top-0 right-0"
      width={svgSize.w}
      height={svgSize.h}
      fill="none"
    >
      <path
        d={pathD}
        className="stroke-primary"
        strokeWidth={2}
        strokeOpacity={0.2}
        strokeLinecap="round"
      />
      <motion.path
        d={pathD}
        stroke={`url(#${gradientId})`}
        strokeWidth={2}
        strokeLinecap="round"
        initial={{ strokeOpacity: 0 }}
        animate={{ strokeOpacity: 1 }}
        transition={{ duration: 1 }}
      />
      <defs>
        <motion.linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
          animate={{
            x1: animX1,
            x2: animX2,
            y1: ["0%", "0%"],
            y2: ["0%", "0%"],
          }}
          transition={{
            duration: 4,
            ease: [0.16, 1, 0.3, 1],
            repeat: Infinity,
            repeatDelay: 0,
          }}
        >
          <stop stopColor="hsl(var(--primary))" stopOpacity="0" />
          <stop stopColor="hsl(var(--primary))" />
          <stop offset="32.5%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </svg>
  );
};

const SystemsDiagram: React.FC<{
  isInput: boolean;
  currentSystem: string;
  externalSystem: string;
}> = ({ isInput, currentSystem, externalSystem }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-between py-1 px-6 max-w-xs"
    >
      <div ref={leftRef}>
        <SystemNode label={isInput ? externalSystem : currentSystem} />
      </div>
      <div ref={rightRef}>
        <SystemNode label={isInput ? currentSystem : externalSystem} />
      </div>
      <Beam
        isInput={isInput}
        containerRef={containerRef}
        leftRef={leftRef}
        rightRef={rightRef}
      />
    </div>
  );
};

const TooltipBodyComponent: React.FC<{
  data: IntegrationData;
  isLoading: boolean;
  connections: IntegrationData["connections"];
  isInput: boolean;
  externalSystem: string;
}> = ({ data, isLoading, connections, isInput, externalSystem }) => (
  <ScrollAreaBase className="flex-1 min-h-0">
    <div className="px-3 py-3 space-y-3 max-w-xs">
      {isLoading ? (
        <div className="space-y-1.5">
          <SkeletonBase className="h-6 w-3/4" />
          <SkeletonBase className="h-3.5 w-1/2" />
        </div>
      ) : (
        <NameTooltip name={data.name} description={data.description} />
      )}

      <div className="border-t border-border/20" />

      {isLoading ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between py-1">
            <SkeletonBase className="w-[76px] h-[76px] rounded-full" />
            <SkeletonBase className="w-[76px] h-[76px] rounded-full" />
          </div>
          <div className="border-t border-border/20" />
          {[1, 2].map((i) => (
            <div
              key={i}
              className="rounded-lg border border-border/20 overflow-hidden"
            >
              <SkeletonBase className="h-8 w-full" />
              {[1, 2, 3].map((j) => (
                <SkeletonBase key={j} className="h-7 w-full mt-px" />
              ))}
            </div>
          ))}
        </div>
      ) : connections.length === 0 ? (
        <p className="text-xs text-muted-foreground text-center">
          Nenhuma conexão encontrada
        </p>
      ) : (
        <>
          <SystemsDiagram
            isInput={isInput}
            currentSystem={data.name}
            externalSystem={externalSystem}
          />

          <div className="border-t border-border/20" />

          <div className="flex items-center ">
            <span className="text-[10px] font-bold text-muted-foreground uppercase -mb-2">
              {isInput ? "Informações de Entrada" : "Informações de Saída"}
            </span>
          </div>

          <div>
            {connections.map((conn) => (
              <IntegrationCard
                key={conn.id}
                title={conn.name}
                details={conn.integration}
              />
            ))}
          </div>
        </>
      )}
    </div>
  </ScrollAreaBase>
);

const TooltipBody = React.memo(TooltipBodyComponent);

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
      className="flex items-center justify-between py-1 border-b border-border/10 bg-muted/30 shrink-0 max-w-lg"
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
            className="fixed bottom-0 left-0 right-0 z-[10000] bg-card border-t border-border/50 rounded-t-2xl shadow-2xl flex flex-col min-h-0"
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
            <div className="overflow-y-auto flex-1 min-h-0 pb-[env(safe-area-inset-bottom)] max-w-xs">
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
        <div className="max-h-[60vh] sm:max-h-[520px] overflow-hidden flex flex-col min-h-0">
          <TooltipBody {...bodyProps} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default IntegrationTooltip;
