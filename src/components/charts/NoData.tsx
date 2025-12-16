import React from "react";
import { cn } from "@/lib/utils";

interface NoDataProps {
  paddingLeft?: number;
  height?: number | string;
  message?: string;
  className?: string;
}

const NoData: React.FC<NoDataProps> = ({
  paddingLeft = 0,
  height = 360,
  message = "Sem dados para exibir",
  className,
}) => {
  const svgHeight = typeof height === "number" ? height : 360;

  const bars = [
    { x: 120, w: 120, h: svgHeight * 0.45, label: "Label 0" },
    { x: 260, w: 120, h: svgHeight * 0.75, label: "Label 1" },
    { x: 400, w: 120, h: svgHeight * 0.65, label: "Label 2" },
    { x: 540, w: 120, h: svgHeight * 0.55, label: "Label 3" },
    { x: 680, w: 120, h: svgHeight * 0.25, label: "Label 4" },
  ];

  const styleVars = {
    ["--pl"]: `${paddingLeft}px`,
    ["--svg-h"]: typeof height === "number" ? `${height}px` : String(height),
  } as unknown as React.CSSProperties;

  return (
    <div
      className={cn(
        "rounded-lg bg-card p-2 relative overflow-visible w-full",
        className
      )}
      style={styleVars}
      role="img"
      aria-label={message}
    >
      <div className="w-full flex items-center justify-center pl-[var(--pl)] pr-3 h-[var(--svg-h)]">
        <div className="w-full max-w-[900px] relative">
          <svg
            className="w-full h-[var(--svg-h)]"
            width="100%"
            viewBox={`0 0 900 ${svgHeight}`}
            preserveAspectRatio="none"
          >
            <rect
              x={0}
              y={0}
              width={900}
              height={svgHeight}
              fill="transparent"
            />

            {Array.from({ length: 5 }).map((_, i) => {
              const y = 40 + ((svgHeight - 80) / 4) * i;
              return (
                <line
                  key={`g-${i}`}
                  x1={60}
                  x2={840}
                  y1={y}
                  y2={y}
                  stroke="rgba(0,0,0,0.06)"
                  strokeWidth={1}
                />
              );
            })}

            {bars.map((b, i) => (
              <g key={`barg-${i}`}>
                <rect
                  x={b.x}
                  y={svgHeight - 60 - b.h}
                  width={b.w}
                  height={b.h}
                  rx={6}
                  fill="rgba(0,0,0,0.06)"
                  stroke="rgba(0,0,0,0.04)"
                />

                <text
                  x={b.x + b.w / 2}
                  y={svgHeight - 20}
                  fill="rgba(0,0,0,0.35)"
                  fontSize={12}
                  textAnchor="middle"
                >
                  {b.label}
                </text>
              </g>
            ))}
          </svg>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none h-[var(--svg-h)]">
            <div className="pointer-events-auto bg-transparent px-3">
              <div className="text-2xl font-extrabold text-black/80">
                {message}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoData;
