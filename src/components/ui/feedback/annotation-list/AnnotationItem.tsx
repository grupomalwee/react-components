"use client";

import React, { useState } from "react";
import { TextTIcon, PaintBrushIcon } from "@phosphor-icons/react";
import { cn } from "../../../../lib/utils";
import { TextEditor } from "./TextEditor";
import { DrawingCanvas, DrawingCanvasRef } from "./DrawingCanvas";

export interface Annotation {
  id: string;
  content: string;
  drawingLayer?: string;
  createdAt: Date;
  label?: string;
}

export interface AnnotationItemProps {
  annotation: Annotation;
  onChangeContent: (content: string) => void;
  onChangeDrawing: (drawingLayer: string) => void;
  onChangeLabel: (label: string) => void;
  autoFocus?: boolean;
  drawMode: boolean;
  onSetDrawMode: (v: boolean) => void;
  color: string;
  brushSize: number;
  drawTool: "draw" | "erase";
  onHistoryChange: (has: boolean) => void;
  canvasRef: React.Ref<DrawingCanvasRef>;
}

export const AnnotationItem: React.FC<AnnotationItemProps> = ({
  annotation,
  onChangeContent,
  onChangeDrawing,
  onChangeLabel,
  autoFocus,
  drawMode,
  onSetDrawMode,
  color,
  brushSize,
  drawTool,
  onHistoryChange,
  canvasRef,
}) => {
  const [editingLabel, setEditingLabel] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-border/40 gap-2 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          {editingLabel ? (
            <input
              autoFocus
              className="text-xs font-medium bg-transparent border-b border-primary/60 outline-none text-foreground w-36 py-0.5"
              value={annotation.label ?? ""}
              onChange={(e) => onChangeLabel(e.target.value)}
              onBlur={() => setEditingLabel(false)}
              onKeyDown={(e) => e.key === "Enter" && setEditingLabel(false)}
            />
          ) : (
            <button
              onClick={() => setEditingLabel(true)}
              className="text-xs font-medium text-foreground/60 hover:text-foreground transition-colors cursor-text truncate max-w-[140px]"
              title="Clique para renomear"
            >
              {annotation.label ?? "Nota"}
            </button>
          )}
        </div>

        <div className="flex items-center gap-0 p-0.5 rounded-lg bg-foreground/5 border border-border/40">
          <button
            onClick={() => onSetDrawMode(false)}
            className={cn(
              "flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all",
              !drawMode
                ? "bg-background text-foreground shadow-sm border border-border/50"
                : "text-foreground/40 hover:text-foreground/70",
            )}
          >
            <TextTIcon className="size-3" />
            Texto
          </button>
          <button
            onClick={() => onSetDrawMode(true)}
            className={cn(
              "flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all",
              drawMode
                ? "bg-background text-foreground shadow-sm border border-border/50"
                : "text-foreground/40 hover:text-foreground/70",
            )}
          >
            <PaintBrushIcon className="size-3" />
            Desenho
          </button>
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden" style={{ minHeight: 320 }}>

        <div
          className={cn(
            "absolute inset-0 flex flex-col transition-all duration-200",
            drawMode ? "pointer-events-none" : "pointer-events-auto",
          )}
        >
        
          <TextEditor
            content={annotation.content}
            onChange={onChangeContent}
            autoFocus={autoFocus && !drawMode}
            borderless
            hideToolbar={drawMode}      
            contentClassName={cn(
              "transition-opacity duration-200",
              drawMode ? "opacity-30" : "opacity-100",
            )}
          />
        </div>

        <div
          className={cn(
            "absolute inset-0 z-10 transition-opacity duration-200",
            drawMode ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-100",
          )}
        >
          <DrawingCanvas
            ref={canvasRef}
            imageData={annotation.drawingLayer}
            onChange={onChangeDrawing}
            color={color}
            brushSize={drawTool === "erase" ? brushSize * 6 : brushSize}
            mode={drawTool}
            onHistoryChange={onHistoryChange}
          />
        </div>

        {drawMode && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-foreground/8 border border-border/30 text-[10px] text-foreground/30 select-none">
              <PaintBrushIcon className="size-2.5" />
              modo desenho
            </span>
          </div>
        )}
      </div>
    </div>
  );
};