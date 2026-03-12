"use client";

import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from "react";

interface DrawingCanvasProps {
  imageData?: string;
  onChange: (imageData: string) => void;
  color: string;
  brushSize: number;
  mode: "draw" | "erase";
  tool?:
    | "pencil"
    | "rectangle"
    | "circle"
    | "line"
    | "arrow"
    | "highlighter"
    | "stamp";
  fill?: boolean;
  stampType?: "check" | "x" | "star" | "heart" | "warning";
  opacity?: number;
  onHistoryChange?: (hasUndo: boolean, hasRedo: boolean) => void;
}

export interface DrawingCanvasRef {
  undo: () => void;
  redo: () => void;
  clear: () => void;
}

export const DrawingCanvas = forwardRef<DrawingCanvasRef, DrawingCanvasProps>(
  (
    {
      imageData,
      onChange,
      color,
      brushSize,
      mode,
      tool = "pencil",
      fill = false,
      stampType = "check",
      opacity = 1,
      onHistoryChange,
    },
    ref,
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDrawingRef = useRef(false);
    const startPosRef = useRef({ x: 0, y: 0 });
    const [history, setHistory] = useState<string[]>([]);
    const [redoStack, setRedoStack] = useState<string[]>([]);
    const pendingImageData = useRef<string | undefined>(imageData);
    const snapshotRef = useRef<ImageData | null>(null);
    const pathRef = useRef<{ x: number; y: number }[]>([]);

    const getCssSize = () => {
      const c = containerRef.current;
      if (!c) return { w: 0, h: 0 };
      return { w: c.clientWidth, h: c.clientHeight };
    };

    const setupCanvas = useCallback((restoreSrc?: string) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const { w, h } = getCssSize();
      if (w === 0 || h === 0) return;

      const snapshot =
        restoreSrc ?? (canvas.width > 0 ? canvas.toDataURL() : undefined);

      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.resetTransform();
      ctx.scale(dpr, dpr);

      if (snapshot && snapshot !== "data:,") {
        const img = new Image();
        img.onload = () => ctx.drawImage(img, 0, 0, w, h);
        img.src = snapshot;
      }
    }, []);

    useEffect(() => {
      pendingImageData.current = imageData;
      if (imageData) setupCanvas(imageData);
    }, [imageData, setupCanvas]);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;
      setupCanvas(pendingImageData.current);
      const ro = new ResizeObserver(() =>
        setupCanvas(pendingImageData.current),
      );
      ro.observe(container);
      return () => ro.disconnect();
    }, [setupCanvas]);

    const getPos = (e: React.MouseEvent | React.TouchEvent) => {
      const canvas = canvasRef.current!;
      const r = canvas.getBoundingClientRect();
      const clientX =
        "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
      const clientY =
        "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
      const scaleX =
        r.width > 0
          ? canvas.width / (window.devicePixelRatio || 1) / r.width
          : 1;
      const scaleY =
        r.height > 0
          ? canvas.height / (window.devicePixelRatio || 1) / r.height
          : 1;
      return { x: (clientX - r.left) * scaleX, y: (clientY - r.top) * scaleY };
    };

    const drawLine = (
      ctx: CanvasRenderingContext2D,
      x1: number,
      y1: number,
      x2: number,
      y2: number,
    ) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    };

    const drawArrow = (
      ctx: CanvasRenderingContext2D,
      x1: number,
      y1: number,
      x2: number,
      y2: number,
    ) => {
      const headlen = brushSize * 3;
      const angle = Math.atan2(y2 - y1, x2 - x1);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineTo(
        x2 - headlen * Math.cos(angle - Math.PI / 6),
        y2 - headlen * Math.sin(angle - Math.PI / 6),
      );
      ctx.moveTo(x2, y2);
      ctx.lineTo(
        x2 - headlen * Math.cos(angle + Math.PI / 6),
        y2 - headlen * Math.sin(angle + Math.PI / 6),
      );
      ctx.stroke();
    };

    const drawRectangle = (
      ctx: CanvasRenderingContext2D,
      x1: number,
      y1: number,
      x2: number,
      y2: number,
    ) => {
      ctx.beginPath();
      ctx.rect(x1, y1, x2 - x1, y2 - y1);
      if (fill) ctx.fill();
      ctx.stroke();
    };

    const drawCircle = (
      ctx: CanvasRenderingContext2D,
      x1: number,
      y1: number,
      x2: number,
      y2: number,
    ) => {
      const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      ctx.beginPath();
      ctx.arc(x1, y1, radius, 0, 2 * Math.PI);
      if (fill) ctx.fill();
      ctx.stroke();
    };

    const drawStamp = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      type: string,
    ) => {
      const size = brushSize * 4;
      ctx.font = `${size}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const glyphs: Record<string, string> = {
        check: "✅",
        x: "❌",
        star: "⭐",
        heart: "❤️",
        warning: "⚠️",
      };
      ctx.fillText(glyphs[type] || glyphs.check, x, y);
    };

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      isDrawingRef.current = true;

      const { x, y } = getPos(e);
      startPosRef.current = { x, y };

      const isErase = mode === "erase";
      const isHighlighter = tool === "highlighter";

      ctx.globalCompositeOperation = isErase
        ? "destination-out"
        : "source-over";

      const finalOpacity = isHighlighter ? 0.4 : opacity;
      const rgbaColor = color.startsWith("#")
        ? `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${finalOpacity})`
        : color;

      ctx.strokeStyle = isErase ? "rgba(0,0,0,1)" : rgbaColor;
      ctx.fillStyle = isErase ? "rgba(0,0,0,1)" : rgbaColor;
      ctx.lineWidth = isHighlighter ? brushSize * 4 : brushSize;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      if (tool === "pencil" || tool === "highlighter" || isErase) {
        pathRef.current = [{ x, y }];
        if (!isHighlighter) {
          ctx.beginPath();
          ctx.arc(
            x,
            y,
            (isErase ? brushSize * 6 : brushSize) / 2,
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }
        ctx.beginPath();
        ctx.moveTo(x, y);

        if (isHighlighter) {
          snapshotRef.current = ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height,
          );
        }
      } else if (tool === "stamp") {
        drawStamp(ctx, x, y, stampType);
      } else {       
        snapshotRef.current = ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height,
        );
      }
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      if (!isDrawingRef.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      const { x, y } = getPos(e);

      if (mode === "erase" || tool === "pencil") {
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
      } else if (tool === "highlighter" && snapshotRef.current) {
        pathRef.current.push({ x, y });
        ctx.putImageData(snapshotRef.current, 0, 0);

        ctx.beginPath();
        const pts = pathRef.current;
        if (pts.length > 0) {
          ctx.moveTo(pts[0].x, pts[0].y);
          for (let i = 1; i < pts.length; i++) {
            ctx.lineTo(pts[i].x, pts[i].y);
          }
        }
        ctx.stroke();
      } else if (tool !== "stamp" && snapshotRef.current) {
        // Shape preview logic using snapshot
        ctx.putImageData(snapshotRef.current, 0, 0);

        const { x: x1, y: y1 } = startPosRef.current;
        if (tool === "line") drawLine(ctx, x1, y1, x, y);
        if (tool === "arrow") drawArrow(ctx, x1, y1, x, y);
        if (tool === "rectangle") drawRectangle(ctx, x1, y1, x, y);
        if (tool === "circle") drawCircle(ctx, x1, y1, x, y);
      }
    };

    const stop = useCallback(() => {
      if (!isDrawingRef.current) return;
      isDrawingRef.current = false;

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      ctx.globalCompositeOperation = "source-over";

      const url = canvas.toDataURL();
      pendingImageData.current = url;
      snapshotRef.current = null;
      pathRef.current = [];
      setHistory((h) => {
        const next = [...h, url].slice(-20);
        setRedoStack([]);
        onHistoryChange?.(next.length > 0, false);
        return next;
      });
      onChange(url);
    }, [onChange, onHistoryChange]);

    const undo = useCallback(() => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx || history.length === 0) return;

      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      const last = history[history.length - 1];
      const next = history.slice(0, -1);
      const prev = next[next.length - 1];

      setRedoStack((prevRedo) => [last, ...prevRedo]);

      if (next.length === 0) {
        ctx.clearRect(0, 0, w, h);
        setHistory([]);
        onHistoryChange?.(false, true);
        pendingImageData.current = undefined;
        onChange("");
        return;
      }

      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        setHistory(next);
        onHistoryChange?.(next.length > 0, true);
        pendingImageData.current = prev;
        onChange(prev);
      };
      img.src = prev;
    }, [history, onChange, onHistoryChange]);

    const redo = useCallback(() => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx || redoStack.length === 0) return;

      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      const nextImg = redoStack[0];
      const nextRedo = redoStack.slice(1);

      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        setHistory((h) => [...h, nextImg]);
        setRedoStack(nextRedo);
        onHistoryChange?.(true, nextRedo.length > 0);
        pendingImageData.current = nextImg;
        onChange(nextImg);
      };
      img.src = nextImg;
    }, [redoStack, onChange, onHistoryChange]);

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "z") {
          e.preventDefault();
          if (e.shiftKey) redo();
          else undo();
        } else if ((e.ctrlKey || e.metaKey) && e.key === "y") {
          e.preventDefault();
          redo();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [undo, redo]);

    const clear = useCallback(() => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      setHistory([]);
      setRedoStack([]);
      onHistoryChange?.(false, false);
      pendingImageData.current = undefined;
      onChange("");
    }, [onChange, onHistoryChange]);

    useImperativeHandle(ref, () => ({ undo, redo, clear }), [
      undo,
      redo,
      clear,
    ]);

    return (
      <div ref={containerRef} className="relative w-full h-full touch-none">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stop}
          onMouseLeave={stop}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stop}
          className="cursor-crosshair block"
        />
      </div>
    );
  },
);

DrawingCanvas.displayName = "DrawingCanvas";
