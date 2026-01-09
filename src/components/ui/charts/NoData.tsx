import React from "react";
import { cn } from "@/lib/utils";

interface NoDataProps {
  paddingLeft?: number;
  height?: number | string;
  message?: string;
  className?: string;
  title?: string;
  subtitle?: string;
  icon?: "chart" | "database" | "search";
  showSuggestion?: boolean;
  suggestionText?: string;
}

const NoData: React.FC<NoDataProps> = ({
  paddingLeft = 0,
  height = 400,
  message = "Sem dados para exibir",
  className,
  title,
}) => {
  const svgHeight = typeof height === "number" ? height : 400;

  const bars = [
    { x: 100, w: 100, h: svgHeight * 0.35 },
    { x: 220, w: 100, h: svgHeight * 0.65 },
    { x: 340, w: 100, h: svgHeight * 0.5 },
    { x: 460, w: 100, h: svgHeight * 0.75 },
    { x: 580, w: 100, h: svgHeight * 0.45 },
    { x: 700, w: 100, h: svgHeight * 0.3 },
  ];

  const styleVars = {
    ["--pl"]: `${paddingLeft}px`,
    ["--svg-h"]: typeof height === "number" ? `${height}px` : String(height),
  } as unknown as React.CSSProperties;


  return (
    <div
      className={cn(
        "rounded-xl bg-card relative overflow-hidden w-full border border-border/50 shadow-sm",
        className
      )}
      style={styleVars}
      role="img"
      aria-label={message}
    >

      <div className="w-full flex items-center justify-center pl-[var(--pl)] p-6 h-[var(--svg-h)]">
        <div className="w-full max-w-[900px] relative">
          <svg
            className="w-full h-[var(--svg-h)] opacity-40"
            width="100%"
            viewBox={`0 0 900 ${svgHeight}`}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="barGradient" x1="0" x2="0" y1="0" y2="1">
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

              <linearGradient id="gridGradient" x1="0" x2="0" y1="0" y2="1">
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

              <filter
                id="softShadow"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                <feOffset dx="0" dy="2" result="offsetblur" />
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
              height={svgHeight}
              fill="hsl(var(--muted)/0.2)"
              rx={8}
            />

            {Array.from({ length: 6 }).map((_, i) => {
              const y = 40 + ((svgHeight - 80) / 5) * i;
              return (
                <line
                  key={`g-${i}`}
                  x1={50}
                  x2={850}
                  y1={y}
                  y2={y}
                  stroke="url(#gridGradient)"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                />
              );
            })}

            <line
              x1={50}
              y1={30}
              x2={50}
              y2={svgHeight - 40}
              stroke="hsl(var(--foreground))"
              strokeWidth={2}
              opacity={0.5}
            />

            <line
              x1={50}
              y1={svgHeight - 40}
              x2={850}
              y2={svgHeight - 40}
              stroke="hsl(var(--foreground))"
              strokeWidth={2}
              opacity={0.5}
            />

            {bars.map((b, i) => (
              <g key={`barg-${i}`}>
                <rect
                  x={b.x}
                  y={svgHeight - 40 - b.h}
                  width={b.w}
                  height={b.h}
                  rx={4}
                  fill="url(#barGradient)"
                  filter="url(#softShadow)"
                />

                <rect
                  x={b.x}
                  y={svgHeight - 40 - b.h}
                  width={b.w}
                  height={b.h}
                  rx={4}
                  fill="none"
                  stroke="hsl(var(--foreground))"
                  strokeWidth={1}
                  opacity={0.3}
                />

                <line
                  x1={b.x + b.w / 2}
                  y1={svgHeight - 40}
                  x2={b.x + b.w / 2}
                  y2={svgHeight - 35}
                  stroke="hsl(var(--foreground))"
                  strokeWidth={1.5}
                  opacity={0.4}
                />
              </g>
            ))}
          </svg>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none h-[var(--svg-h)]">
            <div className="pointer-events-auto bg-card/95 backdrop-blur-sm px-8 py-6 rounded-xl border border-border/50 shadow-lg text-center max-w-md">           
              {title && (
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {title}
                </h3>
              )}

              <p className="text-lg font-medium text-foreground/90 mb-2">
                {message}
              </p>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoData;
