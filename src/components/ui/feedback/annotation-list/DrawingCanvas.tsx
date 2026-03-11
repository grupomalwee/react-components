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
  onHistoryChange?: (hasHistory: boolean) => void;
}

export interface DrawingCanvasRef {
  undo: () => void;
  clear: () => void;
}

export const DrawingCanvas = forwardRef<DrawingCanvasRef, DrawingCanvasProps>(
  ({ imageData, onChange, color, brushSize, mode, onHistoryChange }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDrawingRef = useRef(false);
    const [history, setHistory] = useState<string[]>([]);
    const pendingImageData = useRef<string | undefined>(imageData);

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

      const snapshot = restoreSrc ?? (canvas.width > 0 ? canvas.toDataURL() : undefined);

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
      const ro = new ResizeObserver(() => setupCanvas(pendingImageData.current));
      ro.observe(container);
      return () => ro.disconnect();
    }, [setupCanvas]);

    const getPos = (e: React.MouseEvent | React.TouchEvent) => {
      const canvas = canvasRef.current!;
      const r = canvas.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
      const scaleX = r.width > 0 ? (canvas.width / (window.devicePixelRatio || 1)) / r.width : 1;
      const scaleY = r.height > 0 ? (canvas.height / (window.devicePixelRatio || 1)) / r.height : 1;
      return { x: (clientX - r.left) * scaleX, y: (clientY - r.top) * scaleY };
    };

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      isDrawingRef.current = true;

      const { x, y } = getPos(e);
      const isErase = mode === "erase";

      ctx.globalCompositeOperation = isErase ? "destination-out" : "source-over";
      ctx.strokeStyle = isErase ? "rgba(0,0,0,1)" : color;
      ctx.fillStyle = isErase ? "rgba(0,0,0,1)" : color;
      ctx.lineWidth = brushSize;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(x, y);
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      if (!isDrawingRef.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      const { x, y } = getPos(e);
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
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
      setHistory((h) => {
        const next = [...h, url].slice(-20);
        onHistoryChange?.(next.length > 0);
        return next;
      });
      onChange(url);
    }, [onChange, onHistoryChange]);

    const undo = useCallback(() => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      if (history.length <= 1) {
        ctx.clearRect(0, 0, w, h);
        setHistory([]);
        onHistoryChange?.(false);
        const url = canvas.toDataURL();
        pendingImageData.current = url;
        onChange(url);
        return;
      }

      const next = history.slice(0, -1);
      const prev = next[next.length - 1];
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        setHistory(next);
        onHistoryChange?.(next.length > 0);
        pendingImageData.current = prev;
        onChange(prev);
      };
      img.src = prev;
    }, [history, onChange, onHistoryChange]);

    const clear = useCallback(() => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      setHistory([]);
      onHistoryChange?.(false);
      const url = canvas.toDataURL();
      pendingImageData.current = url;
      onChange(url);
    }, [onChange, onHistoryChange]);

    useImperativeHandle(ref, () => ({ undo, clear }), [undo, clear]);

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