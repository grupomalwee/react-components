import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LoadingBase } from "@/components/ui/feedback/LoadingBase";

interface NoDataProps {
  paddingLeft?: number;
  height?: number | string;
  message?: string;
  className?: string;
  title?: string;
  isLoading?: boolean;
  loadingMessage?: string;
}

const ChartBar: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  i: number;
  loading: boolean;
}> = ({ x, y, w, h, i, loading }) => {
  const baseY = y - h;
  const d = i * 0.08;
  const anim = loading
    ? { scaleY: [1, 0.85, 1], opacity: [0.5, 0.8, 0.5] }
    : { scaleY: 1, opacity: [0.7, 1, 0.7] };
  const trans = {
    duration: loading ? 3.5 : 3,
    repeat: Infinity,
    ease: "easeInOut" as const,
    delay: d,
  };

  return (
    <g>
      <motion.rect
        x={x}
        y={baseY}
        width={w}
        height={h}
        rx={4}
        fill="url(#bg)"
        filter="url(#s)"
        animate={anim}
        transition={trans}
        style={{ transformBox: "fill-box", originY: 1 }}
      />
      <motion.rect
        x={x}
        y={baseY}
        width={w}
        height={h}
        rx={4}
        fill="none"
        stroke="hsl(var(--foreground))"
        strokeWidth={1}
        animate={{ ...anim, opacity: loading ? [0.2, 0.4, 0.2] : 0.3 }}
        transition={trans}
        style={{ transformBox: "fill-box", originY: 1 }}
      />
      <motion.line
        x1={x + w / 2}
        y1={y}
        x2={x + w / 2}
        y2={y + 5}
        stroke="hsl(var(--foreground))"
        strokeWidth={1.5}
        animate={{ opacity: loading ? [0.3, 0.5, 0.3] : 0.4 }}
        transition={trans}
      />
    </g>
  );
};

const NoData: React.FC<NoDataProps> = ({
  paddingLeft = 0,
  height = 400,
  message = "Sem dados para exibir",
  className,
  title,
  isLoading = false,
  loadingMessage,
}) => {
  const h = typeof height === "number" ? height : 400;
  const baseY = h - 40;
  const bars = [
    { x: 100, w: 100, h: h * 0.35 },
    { x: 220, w: 100, h: h * 0.65 },
    { x: 340, w: 100, h: h * 0.5 },
    { x: 460, w: 100, h: h * 0.75 },
    { x: 580, w: 100, h: h * 0.35 },
    { x: 700, w: 100, h: h * 0.3 },
  ];

  const coords = bars.map((b) => ({ x: b.x + b.w / 2, y: baseY - b.h }));
  const path = coords.map((c, i) => `${i ? "L" : "M"} ${c.x} ${c.y}`).join(" ");
  const area = `${path} L ${coords[5].x} ${baseY} L ${coords[0].x} ${baseY} Z`;

  return (
    <div
      className={cn(
        "rounded-xl bg-card relative overflow-hidden w-full border border-border/50 shadow-sm",
        className
      )}
      style={
        {
          "--pl": `${paddingLeft}px`,
          "--svg-h":
            typeof height === "number" ? `${height}px` : String(height),
        } as React.CSSProperties
      }
      role="img"
      aria-label={message}
    >
      <div className="w-full flex items-center justify-center pl-[var(--pl)] p-6 h-[var(--svg-h)]">
        <div className="w-full max-w-[900px] relative">
          <svg
            className="w-full h-[var(--svg-h)] opacity-40"
            viewBox={`0 0 900 ${h}`}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="bg" x1="0" x2="0" y1="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity="0.15"
                />
                <stop
                  offset="100%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity="0.05"
                />
              </linearGradient>
              <linearGradient id="gg" x1="0" x2="0" y1="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="hsl(var(--border))"
                  stopOpacity="0.4"
                />
                <stop
                  offset="100%"
                  stopColor="hsl(var(--border))"
                  stopOpacity="0.1"
                />
              </linearGradient>
              <filter id="s" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                <feOffset dx="0" dy="2" />
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.2" />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <rect
              x={0}
              y={0}
              width={900}
              height={h}
              fill="hsl(var(--muted)/0.00000002)"
              rx={8}
            />
            {[...Array(6)].map((_, i) => (
              <line
                key={i}
                x1={50}
                x2={850}
                y1={40 + ((h - 80) / 5) * i}
                y2={40 + ((h - 80) / 5) * i}
                stroke="url(#gg)"
                strokeWidth={1.5}
                strokeDasharray="4 4"
              />
            ))}
            <line
              x1={50}
              y1={30}
              x2={50}
              y2={baseY}
              stroke="hsl(var(--foreground))"
              strokeWidth={2}
              opacity={0.5}
            />
            <line
              x1={50}
              y1={baseY}
              x2={850}
              y2={baseY}
              stroke="hsl(var(--foreground))"
              strokeWidth={2}
              opacity={0.5}
            />
            {bars.map((b, i) => (
              <ChartBar
                key={i}
                x={b.x}
                y={baseY}
                w={b.w}
                h={b.h}
                i={i}
                loading={isLoading}
              />
            ))}
            <motion.path
              d={path}
              stroke="hsl(var(--primary)/0.2)"
              strokeWidth={3}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 2, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{
                pathLength: { duration: 1.2, delay: 0.3, ease: "easeInOut" },
                opacity: { duration: 0.6, delay: 0.3 },
              }}
            />
            <motion.path
              d={area}
              fill="hsl(var(--primary))"
              opacity={0.1}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
            {coords.map((c, i) => (
              <g key={i}>
                <motion.circle
                  cx={c.x}
                  cy={c.y}
                  r={6}
                  fill="hsl(var(--card))"
                  stroke="hsl(var(--primary)/0.4)"
                  strokeWidth={3}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: 0.5 + i * 0.08,
                    duration: 0.4,
                    type: "spring",
                    stiffness: 200,
                  }}
                />
                <motion.circle
                  cx={c.x}
                  cy={c.y}
                  r={3}
                  fill="hsl(var(--primary)/0.4)"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.5 + i * 0.08,
                    duration: 0.4,
                    type: "spring",
                  }}
                />
              </g>
            ))}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none h-[var(--svg-h)]">
            <div className="pointer-events-auto bg-card/95 backdrop-blur-sm px-8 py-6 rounded-xl border border-border/50 shadow-lg text-center max-w-md">
              {isLoading ? (
                <div className="flex flex-col items-center gap-4">
                  <LoadingBase
                    size="xl"
                    message={loadingMessage ?? "Carregando"}
                  />
                </div>
              ) : (
                <>
                  {title && (
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {title}
                    </h3>
                  )}
                  <p className="text-lg font-medium text-foreground/90 mb-2">
                    {message}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoData;
