import React from "react";
import {
  ComposedChart,
  Bar,
  Line,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  [key: string]: string | number | boolean | null | undefined;
}

interface BrushProps {
  data: ChartData[];
  legend?: string;
  startIndex: number;
  endIndex: number;
  onMouseDown: (e: React.MouseEvent, type: "start" | "end" | "middle") => void;
  brushRef: React.RefObject<HTMLDivElement | null>;
  xAxisKey: string;
  seriesOrder: Array<{ type: "bar" | "line" | "area"; key: string }>;
  finalColors: Record<string, string>;
  brushHeight?: number;
  brushColor?: string;
  miniChartOpacity?: number;
  showGrid?: boolean;
  gridColor?: string;
  margin?: {
    left?: number;
    right?: number;
  };
}

const Brush: React.FC<BrushProps> = ({
  data,
  legend,
  startIndex,
  endIndex,
  onMouseDown,
  brushRef,
  xAxisKey,
  seriesOrder,
  finalColors,
  brushHeight = 80,
  brushColor,
  miniChartOpacity = 0.3,
  margin = { left: 0, right: 0 },
}) => {
  const dataLength = data.length;

  return (
    <div className="w-full px-8 pb-4">
      {legend && (
        <div className="flex items-center justify-left p-2">
          <span className="text-sm font-medium text-foreground">
            {legend}
          </span>
        </div>
      )}
      <div
        className="relative rounded-md border bg-muted/5 shadow-inner"
        style={{ height: brushHeight }}
      >
        <div
          className="absolute inset-0 pointer-events-none rounded-md"
          style={{ opacity: miniChartOpacity }}
        >
          <ResponsiveContainer width="100%" height={brushHeight}>
            <ComposedChart
              data={data.map((item) => ({
                ...item,
                name: String(item[xAxisKey] || "N/A"),
              }))}
              height={brushHeight}
              margin={{
                top: 5,
                right: margin.right ?? 30,
                left: margin.left ?? 0,
                bottom: 5,
              }}
            >
              <XAxis dataKey={xAxisKey} hide />
              <YAxis yAxisId="left" hide />
              {seriesOrder.map((s) => {
                const key = s.key;
                const color = finalColors[key];
                if (s.type === "bar") {
                  return (
                    <Bar
                      key={`brush-bar-${key}`}
                      dataKey={key}
                      yAxisId="left"
                      fill={color}
                      radius={[2, 2, 0, 0]}
                    />
                  );
                }
                if (s.type === "line") {
                  return (
                    <Line
                      key={`brush-line-${key}`}
                      type="monotone"
                      dataKey={key}
                      yAxisId="left"
                      stroke={color}
                      strokeWidth={1.5}
                      dot={false}
                    />
                  );
                }
                if (s.type === "area") {
                  return (
                    <Area
                      key={`brush-area-${key}`}
                      type="monotone"
                      dataKey={key}
                      yAxisId="left"
                      stroke={color}
                      fill={`url(#gradient-${key})`}
                      strokeWidth={1.5}
                    />
                  );
                }
                return null;
              })}
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div
          ref={brushRef}
          className="absolute inset-0 cursor-move rounded-md"
          style={{ userSelect: "none" }}
        >
          <div
            className="absolute top-0 bottom-0 left-0 bg-background/80 backdrop-blur-[1px] pointer-events-none rounded-l-md border-r border-border/50"
            style={{
              width: `${(startIndex / (dataLength - 1)) * 100}%`,
            }}
          />

          <div
            className="absolute top-0 bottom-0 right-0 bg-background/80 backdrop-blur-[1px] pointer-events-none rounded-r-md border-l border-border/50"
            style={{
              width: `${((dataLength - 1 - endIndex) / (dataLength - 1)) * 100}%`,
            }}
          />

          <div
            className="absolute top-0 bottom-0 border-x-2 border-y border-primary/50 cursor-move group hover:bg-primary/5 rounded-md"
            style={{
              left: `${(startIndex / (dataLength - 1)) * 100}%`,
              right: `${((dataLength - 1 - endIndex) / (dataLength - 1)) * 100}%`,
              backgroundColor: "transparent",
            }}
            onMouseDown={(e) => onMouseDown(e, "middle")}
          >
            <div
              className="absolute top-1/2 -translate-y-1/2 -left-3.5 w-7 h-12 flex items-center justify-center cursor-ew-resize group/handle"
              onMouseDown={(e) => {
                e.stopPropagation();
                onMouseDown(e, "start");
              }}
            >
              <div
                className="w-1.5 h-6 rounded-sm flex flex-col items-center justify-center gap-1 border border-primary/20"
                style={{
                  backgroundColor: brushColor ?? "hsl(var(--primary))",
                }}
              ></div>
            </div>

            <div
              className="absolute top-1/2 -translate-y-1/2 -right-3.5 w-7 h-12 flex items-center justify-center cursor-ew-resize group/handle"
              onMouseDown={(e) => {
                e.stopPropagation();
                onMouseDown(e, "end");
              }}
            >
              <div
                className="w-1.5 h-6 rounded-sm flex flex-col items-center justify-center gap-1 border border-primary/20"
                style={{
                  backgroundColor: brushColor ?? "hsl(var(--primary))",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
        <span>
          {data[startIndex]?.[xAxisKey]} - {data[endIndex]?.[xAxisKey]}
        </span>
        <span>
          {endIndex - startIndex + 1} de {dataLength} períodos
        </span>
      </div>
    </div>
  );
};

export default Brush;
