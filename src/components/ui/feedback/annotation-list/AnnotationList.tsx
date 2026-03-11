"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  PlusIcon,
  XIcon,
  NoteIcon,
  EraserIcon,
  PencilIcon,
  SquareIcon,
  CircleIcon,
  MinusIcon,
  ArrowRightIcon,
  HighlighterIcon,
  PaintBucketIcon,
  StickerIcon,
  DownloadSimpleIcon,
  CheckIcon,
  WarningIcon,
  ArrowCounterClockwiseIcon,
  ArrowClockwiseIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { cn } from "../../../../lib/utils";
import { Annotation, AnnotationItem } from "./AnnotationItem";
import { DrawingCanvasRef } from "./DrawingCanvas";

interface AnnotationListProps {
  initialAnnotations?: Annotation[];
  onAnnotationsChange?: (annotations: Annotation[]) => void;
  className?: string;
}

const DRAW_COLORS = [
  { value: "#0f172a", label: "Tinta" },
  { value: "#2563eb", label: "Azul" },
  { value: "#dc2626", label: "Vermelho" },
  { value: "#16a34a", label: "Verde" },
  { value: "#d97706", label: "Âmbar" },
  { value: "#7c3aed", label: "Roxo" },
  { value: "#db2777", label: "Rosa" },
];

const BRUSH_SIZES = [
  { size: 2, label: "Fino" },
  { size: 4, label: "Médio" },
  { size: 9, label: "Espesso" },
];

export const AnnotationList: React.FC<AnnotationListProps> = ({
  initialAnnotations = [],
  onAnnotationsChange,
  className,
}) => {
  const [annotations, setAnnotations] =
    useState<Annotation[]>(initialAnnotations);
  const [activeId, setActiveId] = useState<string | null>(
    initialAnnotations[0]?.id ?? null,
  );
  const [wordCount, setWordCount] = useState(0);

  const [drawMode, setDrawMode] = useState(false);
  const [color, setColor] = useState(DRAW_COLORS[0].value);
  const [brushSize, setBrushSize] = useState(3);
  const [drawTool, setDrawTool] = useState<
    | "draw"
    | "erase"
    | "rectangle"
    | "circle"
    | "line"
    | "arrow"
    | "highlighter"
    | "stamp"
  >("draw");
  const [fill, setFill] = useState(false);
  const [stampType, setStampType] = useState<
    "check" | "x" | "star" | "heart" | "warning"
  >("check");
  const [opacity, setOpacity] = useState(1);
  const [hasUndo, setHasUndo] = useState(false);
  const [hasRedo, setHasRedo] = useState(false);
  const canvasRef = useRef<DrawingCanvasRef>(null);

  const active = annotations.find((a) => a.id === activeId) ?? null;

  useEffect(() => {
    if (!active?.content) {
      setWordCount(0);
      return;
    }
    const text = active.content.replace(/<[^>]*>/g, " ").trim();
    setWordCount(text ? text.split(/\s+/).filter(Boolean).length : 0);
  }, [active?.content]);

  useEffect(() => {
    setDrawMode(false);
    setHasUndo(false);
    setHasRedo(false);
  }, [activeId]);

  const add = useCallback(() => {
    const n: Annotation = {
      id: Math.random().toString(36).slice(2, 9),
      content: "",
      drawingLayer: "",
      createdAt: new Date(),
      label: `Nota ${annotations.length + 1}`,
    };
    const next = [...annotations, n];
    setAnnotations(next);
    setActiveId(n.id);
    onAnnotationsChange?.(next);
  }, [annotations, onAnnotationsChange]);

  const update = useCallback(
    (id: string, patch: Partial<Annotation>) => {
      const next = annotations.map((a) =>
        a.id === id ? { ...a, ...patch } : a,
      );
      setAnnotations(next);
      onAnnotationsChange?.(next);
    },
    [annotations, onAnnotationsChange],
  );

  const remove = useCallback(
    (id: string) => {
      const next = annotations.filter((a) => a.id !== id);
      const idx = annotations.findIndex((a) => a.id === id);
      setActiveId(next[idx]?.id ?? next[Math.max(0, idx - 1)]?.id ?? null);
      setAnnotations(next);
      onAnnotationsChange?.(next);
    },
    [annotations, onAnnotationsChange],
  );

  const exportToImage = useCallback(() => {
    if (!active?.drawingLayer) return;
    const link = document.createElement("a");
    link.download = `${active.label || "nota"}.png`;
    link.href = active.drawingLayer;
    link.click();
  }, [active]);

  return (
    <div
      className={cn(
        "relative flex flex-col w-full min-w-[540px] max-w-3xl mx-auto",
        className,
      )}
    >
      <div
        className="flex items-stretch overflow-x-auto border border-b-0 border-border rounded-t-lg bg-muted/20 min-h-[36px]"
        style={{ scrollbarWidth: "none" }}
      >
        {annotations.map((a) => {
          const isActive = a.id === activeId;
          return (
            <button
              key={a.id}
              onClick={() => setActiveId(a.id)}
              className={cn(
                "group relative flex items-center gap-1.5 px-3.5 text-[11px] font-medium whitespace-nowrap border-1 border-t-0",
                "transition-all border-r border-border/50 shrink-0 cursor-pointer select-none",
                "min-w-[80px] max-w-[160px]",
                isActive
                  ? "bg-background text-foreground"
                  : "text-muted-foreground hover:text-foreground/70 hover:bg-background/40",
              )}
            >
              <span className="truncate flex-1 text-left">{a.label}</span>
              <span
                role="button"
                tabIndex={-1}
                onClick={(e) => {
                  e.stopPropagation();
                  remove(a.id);
                }}
                className="ml-auto opacity-0 group-hover:opacity-40 hover:!opacity-80 transition-opacity shrink-0 -mr-0.5"
              >
                <XIcon className="size-3" />
              </span>
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-px bg-background" />
              )}
            </button>
          );
        })}

        <button
          onClick={add}
          className="flex items-center justify-center px-3 text-muted-foreground/60 hover:text-foreground hover:bg-muted/30 transition-colors cursor-pointer shrink-0"
          title="Nova nota"
        >
          <PlusIcon className="size-3.5" />
        </button>

        <div className="flex-1" />

        {active && (
          <div className="flex items-center px-3 shrink-0">
            <span className="text-[10px] text-muted-foreground/40 tabular-nums">
              {wordCount} {wordCount === 1 ? "palavra" : "palavras"}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-stretch gap-2">
        <div className="flex flex-col flex-1 min-w-0 border border-t-0 border-border rounded-b-xl overflow-hidden bg-background shadow-[0_2px_16px_rgba(0,0,0,0.06)]">
          {active ? (
            <AnnotationItem
              key={active.id}
              annotation={active}
              onChangeContent={(content) => update(active.id, { content })}
              onChangeDrawing={(drawingLayer) =>
                update(active.id, { drawingLayer })
              }
              onChangeLabel={(label) => update(active.id, { label })}
              autoFocus={active.content === ""}
              drawMode={drawMode}
              onSetDrawMode={setDrawMode}
              color={color}
              brushSize={brushSize}
              drawTool={drawTool}
              fill={fill}
              stampType={stampType}
              opacity={opacity}
              onHistoryChange={(undo, redo) => {
                setHasUndo(undo);
                setHasRedo(redo);
              }}
              canvasRef={canvasRef}
            />
          ) : (
            <div className="flex flex-col items-center justify-center flex-1 min-h-[360px] gap-3 bg-muted/5">
              <div className="size-10 rounded-xl bg-muted/30 flex items-center justify-center">
                <NoteIcon className="size-5 text-muted-foreground/30" />
              </div>
              <div className="text-center space-y-0.5">
                <p className="text-xs font-medium text-foreground/40">
                  Nenhuma nota aberta
                </p>
                <p className="text-[10px] text-muted-foreground/30">
                  Clique em + para criar
                </p>
              </div>
              <button
                onClick={add}
                className="mt-1 text-xs text-primary/60 hover:text-primary underline-offset-2 hover:underline transition-all cursor-pointer"
              >
                Criar primeira nota
              </button>
            </div>
          )}
        </div>

        <AnimatePresence>
          {drawMode && active && (
            <>
              <motion.div
                key="draw-sidebar-left"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute top-0 bottom-0 right-[calc(100%+8px)] flex flex-col items-center justify-center gap-0.5 py-3 w-10 border border-border rounded-lg bg-background/80 backdrop-blur-sm shadow-sm z-20"
              >
                <button
                  onClick={() => setDrawTool("draw")}
                  title="Lápis"
                  className={cn(
                    "size-7 flex items-center justify-center rounded-lg transition-colors border border-border/60",
                    drawTool === "draw"
                      ? "bg-foreground/10 text-foreground border-foreground/20"
                      : "text-foreground/40 hover:text-foreground/70 hover:bg-foreground/5",
                  )}
                >
                  <PencilIcon className="size-3.5" />
                </button>

                <button
                  onClick={() => setDrawTool("highlighter")}
                  title="Marca-texto"
                  className={cn(
                    "size-7 flex items-center justify-center rounded-lg transition-colors border border-border/60",
                    drawTool === "highlighter"
                      ? "bg-foreground/10 text-foreground border-foreground/20"
                      : "text-foreground/40 hover:text-foreground/70 hover:bg-foreground/5",
                  )}
                >
                  <HighlighterIcon className="size-3.5" />
                </button>

                <div className="w-5 h-px bg-border/50 my-1" />

                <button
                  onClick={() => setDrawTool("rectangle")}
                  title="Retângulo"
                  className={cn(
                    "size-7 flex items-center justify-center rounded-lg transition-colors border border-border/60",
                    drawTool === "rectangle"
                      ? "bg-foreground/10 text-foreground border-foreground/20"
                      : "text-foreground/40 hover:text-foreground/70 hover:bg-foreground/5",
                  )}
                >
                  <SquareIcon className="size-3.5" />
                </button>

                <button
                  onClick={() => setDrawTool("circle")}
                  title="Círculo"
                  className={cn(
                    "size-7 flex items-center justify-center rounded-lg transition-colors border border-border/60",
                    drawTool === "circle"
                      ? "bg-foreground/10 text-foreground border-foreground/20"
                      : "text-foreground/40 hover:text-foreground/70 hover:bg-foreground/5",
                  )}
                >
                  <CircleIcon className="size-3.5" />
                </button>

                <button
                  onClick={() => setDrawTool("line")}
                  title="Linha"
                  className={cn(
                    "size-7 flex items-center justify-center rounded-lg transition-colors border border-border/60",
                    drawTool === "line"
                      ? "bg-foreground/10 text-foreground border-foreground/20"
                      : "text-foreground/40 hover:text-foreground/70 hover:bg-foreground/5",
                  )}
                >
                  <MinusIcon className="size-3.5" />
                </button>

                <button
                  onClick={() => setDrawTool("arrow")}
                  title="Seta"
                  className={cn(
                    "size-7 flex items-center justify-center rounded-lg transition-colors border border-border/60",
                    drawTool === "arrow"
                      ? "bg-foreground/10 text-foreground border-foreground/20"
                      : "text-foreground/40 hover:text-foreground/70 hover:bg-foreground/5",
                  )}
                >
                  <ArrowRightIcon className="size-3.5" />
                </button>

                <div className="w-5 h-px bg-border/50 my-1" />

                <button
                  onClick={() => setDrawTool("stamp")}
                  title="Carimbo"
                  className={cn(
                    "size-7 flex items-center justify-center rounded-lg transition-colors border border-border/60",
                    drawTool === "stamp"
                      ? "bg-foreground/10 text-foreground border-foreground/20"
                      : "text-foreground/40 hover:text-foreground/70 hover:bg-foreground/5",
                  )}
                >
                  <StickerIcon className="size-3.5" />
                </button>

                <button
                  onClick={() => setDrawTool("erase")}
                  title="Borracha"
                  className={cn(
                    "size-7 flex items-center justify-center rounded-lg transition-colors border border-border/60",
                    drawTool === "erase"
                      ? "bg-foreground/10 text-foreground border-foreground/20"
                      : "text-foreground/40 hover:text-foreground/70 hover:bg-foreground/5",
                  )}
                >
                  <EraserIcon className="size-3.5" />
                </button>

                <div className="w-5 h-px bg-border/50 my-1" />

                <button
                  onClick={() => canvasRef.current?.undo()}
                  disabled={!hasUndo}
                  title="Desfazer"
                  className="size-7 flex items-center justify-center rounded-lg text-foreground/40 hover:text-foreground/70 hover:bg-foreground/5 disabled:opacity-20 transition-colors border border-border/60"
                >
                  <ArrowCounterClockwiseIcon className="size-3.5" />
                </button>

                <button
                  onClick={() => canvasRef.current?.redo()}
                  disabled={!hasRedo}
                  title="Refazer"
                  className="size-7 flex items-center justify-center rounded-lg text-foreground/40 hover:text-foreground/70 hover:bg-foreground/5 disabled:opacity-20 transition-colors border border-border/60"
                >
                  <ArrowClockwiseIcon className="size-3.5" />
                </button>

                <button
                  onClick={() => canvasRef.current?.clear()}
                  title="Limpar tudo"
                  className="size-7 flex items-center justify-center rounded-lg text-destructive/60 hover:text-destructive hover:bg-destructive/5 transition-colors border border-border/60"
                >
                  <TrashIcon className="size-3.5" />
                </button>
              </motion.div>

              <motion.div
                key="draw-sidebar-right"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute top-0 bottom-0 left-[calc(100%+8px)] flex flex-col items-center justify-center gap-0.5 py-3 w-10 border border-border rounded-lg bg-background/80 backdrop-blur-sm shadow-sm z-20"
              >
                <div className="flex flex-col gap-1.5 mb-1">
                  {DRAW_COLORS.map((c) => (
                    <button
                      key={c.value}
                      title={c.label}
                      onClick={() => {
                        setColor(c.value);
                        if (drawTool === "erase") setDrawTool("draw");
                      }}
                      className={cn(
                        "size-4 rounded-full border-2 transition-all",
                        color === c.value && drawTool !== "erase"
                          ? "border-foreground/70 scale-125 shadow-sm"
                          : "border-transparent hover:scale-110",
                      )}
                      style={{ backgroundColor: c.value }}
                    />
                  ))}
                </div>

                <div className="w-5 h-px bg-border/50 my-1" />

                <div className="flex flex-col gap-1.5">
                  {BRUSH_SIZES.map(({ size, label }) => (
                    <button
                      key={size}
                      onClick={() => setBrushSize(size)}
                      title={label}
                      className={cn(
                        "size-7 flex items-center justify-center rounded-lg transition-colors border border-border/60",
                        brushSize === size
                          ? "bg-foreground/10 border-foreground/20"
                          : "hover:bg-foreground/5",
                      )}
                    >
                      <span
                        className="rounded-full block"
                        style={{
                          width: Math.min(size + 1, 12),
                          height: Math.min(size + 1, 12),
                          backgroundColor: color,
                        }}
                      />
                    </button>
                  ))}
                </div>

                <div className="w-5 h-px bg-border/50 my-1" />

                <button
                  onClick={() => setFill(!fill)}
                  title="Preencher formas"
                  className={cn(
                    "size-7 flex items-center justify-center rounded-lg transition-colors border border-border/60",
                    fill
                      ? "bg-foreground/10 border-foreground/20 text-foreground"
                      : "text-foreground/40 hover:bg-foreground/5",
                  )}
                >
                  <PaintBucketIcon className="size-3.5" />
                </button>

                {drawTool === "stamp" && (
                  <div className="flex flex-col gap-1 border-t border-border/40 pt-1.5 mt-0.5">
                    <button
                      onClick={() => setStampType("check")}
                      className={cn(
                        "size-6 flex items-center justify-center rounded-md transition-all",
                        stampType === "check"
                          ? "bg-foreground/10"
                          : "opacity-40 hover:opacity-100",
                      )}
                    >
                      <CheckIcon className="size-3" />
                    </button>
                    <button
                      onClick={() => setStampType("warning")}
                      className={cn(
                        "size-6 flex items-center justify-center rounded-md transition-all",
                        stampType === "warning"
                          ? "bg-foreground/10"
                          : "opacity-40 hover:opacity-100",
                      )}
                    >
                      <WarningIcon className="size-3" />
                    </button>
                  </div>
                )}

                <div className="w-5 h-px bg-border/50 my-1" />

                <button
                  onClick={exportToImage}
                  title="Exportar imagem"
                  className="size-7 flex items-center justify-center rounded-lg text-foreground/40 hover:text-foreground/70 hover:bg-foreground/5 transition-colors"
                >
                  <DownloadSimpleIcon className="size-3.5" />
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
