import React, { useState, useMemo, useCallback } from "react";
import Chart from "./Chart";
import { cn } from "@/lib/utils";

interface TimeSeriesData {
  [key: string]: string | number | boolean | null | undefined;
}

interface TimeSeriesProps {
  data: TimeSeriesData[];
  xAxis: string;
  series?: {
    bar?: string[];
    line?: string[];
    area?: string[];
  };
  labelMap?: Record<string, string>;
  colors?: string[];
  height?: number;
  chartHeight?: number;
  brushHeight?: number;
  className?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  formatBR?: boolean;
  valueFormatter?: (props: {
    [key: string]: unknown;
    value: number | string | undefined;
    formattedValue: string;
  }) => string;
  categoryFormatter?: (value: string | number) => string;
  yAxisLabel?: string;
  biaxial?: {
    key: string[];
    label?: string;
    percentage?: boolean;
    decimals?: number;
    stroke?: string | Record<string, string>;
  };
  defaultStartIndex?: number;
  defaultEndIndex?: number;
  onRangeChange?: (startIndex: number, endIndex: number) => void;
  brushColor?: string;
  brushStroke?: string;
  miniChartOpacity?: number;
}

const TimeSeries: React.FC<TimeSeriesProps> = ({
  data,
  xAxis,
  series,
  labelMap,
  colors,
  chartHeight = 350,
  brushHeight = 80,
  className,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  formatBR = false,
  valueFormatter,
  categoryFormatter,
  yAxisLabel,
  biaxial,
  defaultStartIndex = 0,
  defaultEndIndex,
  onRangeChange,
  brushColor = "hsl(var(--primary))",
  brushStroke = "hsl(var(--primary))",
  miniChartOpacity = 0.3,
}) => {
  const actualEndIndex = defaultEndIndex ?? data.length - 1;
  const [startIndex, setStartIndex] = useState(defaultStartIndex);
  const [endIndex, setEndIndex] = useState(actualEndIndex);
  const [isDragging, setIsDragging] = useState<
    "start" | "end" | "middle" | null
  >(null);
  const [dragStartX, setDragStartX] = useState(0);
  const [initialStartIndex, setInitialStartIndex] = useState(0);
  const [initialEndIndex, setInitialEndIndex] = useState(0);

  const filteredData = useMemo(() => {
    return data.slice(startIndex, endIndex + 1);
  }, [data, startIndex, endIndex]);

  const brushRef = React.useRef<HTMLDivElement>(null);

  const handleRangeChange = useCallback(
    (newStart: number, newEnd: number) => {
      const clampedStart = Math.max(0, Math.min(newStart, data.length - 1));
      const clampedEnd = Math.max(
        clampedStart,
        Math.min(newEnd, data.length - 1),
      );

      setStartIndex(clampedStart);
      setEndIndex(clampedEnd);

      if (onRangeChange) {
        onRangeChange(clampedStart, clampedEnd);
      }
    },
    [data.length, onRangeChange],
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, type: "start" | "end" | "middle") => {
      e.preventDefault();
      setIsDragging(type);
      setDragStartX(e.clientX);
      setInitialStartIndex(startIndex);
      setInitialEndIndex(endIndex);
    },
    [startIndex, endIndex],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !brushRef.current) return;

      const brushWidth = brushRef.current.offsetWidth;
      const deltaX = e.clientX - dragStartX;
      const indexDelta = Math.round((deltaX / brushWidth) * data.length);

      if (isDragging === "start") {
        const newStart = Math.max(
          0,
          Math.min(initialStartIndex + indexDelta, endIndex - 1),
        );
        handleRangeChange(newStart, endIndex);
      } else if (isDragging === "end") {
        const newEnd = Math.max(
          startIndex + 1,
          Math.min(initialEndIndex + indexDelta, data.length - 1),
        );
        handleRangeChange(startIndex, newEnd);
      } else if (isDragging === "middle") {
        const rangeSize = initialEndIndex - initialStartIndex;
        let newStart = initialStartIndex + indexDelta;
        let newEnd = initialEndIndex + indexDelta;

        if (newStart < 0) {
          newStart = 0;
          newEnd = rangeSize;
        } else if (newEnd >= data.length) {
          newEnd = data.length - 1;
          newStart = newEnd - rangeSize;
        }

        handleRangeChange(newStart, newEnd);
      }
    },
    [
      isDragging,
      dragStartX,
      data.length,
      startIndex,
      endIndex,
      initialStartIndex,
      initialEndIndex,
      handleRangeChange,
    ],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const brushLeftPercent = (startIndex / (data.length - 1)) * 100;
  const brushRightPercent =
    ((data.length - 1 - endIndex) / (data.length - 1)) * 100;

  return (
    <div className={cn("w-full flex flex-col gap-2", className)}>
      {/* Main Chart */}
      <div style={{ height: chartHeight }}>
        <Chart
          data={filteredData}
          xAxis={xAxis}
          series={series}
          labelMap={labelMap}
          colors={colors}
          height={chartHeight}
          showGrid={showGrid}
          showLegend={showLegend}
          showTooltip={showTooltip}
          formatBR={formatBR}
          valueFormatter={valueFormatter}
          categoryFormatter={categoryFormatter}
          yAxisLabel={yAxisLabel}
          biaxial={biaxial}
        />
      </div>

      {/* Brush/Range Selector */}
      <div className="w-full px-4 pb-4">
        <div className="relative" style={{ height: brushHeight }}>
          {/* Mini Chart Background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ opacity: miniChartOpacity }}
          >
            <Chart
              data={data}
              xAxis={xAxis}
              series={series}
              labelMap={labelMap}
              colors={colors}
              height={brushHeight}
              showGrid={false}
              showLegend={false}
              showTooltip={false}
              formatBR={formatBR}
            />
          </div>

          {/* Brush Overlay */}
          <div
            ref={brushRef}
            className="absolute inset-0 cursor-move"
            style={{ userSelect: "none" }}
          >
            {/* Left Overlay (outside selection) */}
            <div
              className="absolute top-0 bottom-0 left-0 bg-muted/60 pointer-events-none"
              style={{ width: `${brushLeftPercent}%` }}
            />

            {/* Right Overlay (outside selection) */}
            <div
              className="absolute top-0 bottom-0 right-0 bg-muted/60 pointer-events-none"
              style={{ width: `${brushRightPercent}%` }}
            />

            {/* Selection Area */}
            <div
              className="absolute top-0 bottom-0 border-t-2 border-b-2 cursor-move"
              style={{
                left: `${brushLeftPercent}%`,
                right: `${brushRightPercent}%`,
                borderColor: brushStroke,
              }}
              onMouseDown={(e) => handleMouseDown(e, "middle")}
            >
              {/* Left Handle */}
              <div
                className="absolute top-0 bottom-0 w-2 -left-1 cursor-ew-resize hover:bg-primary/20 transition-colors"
                style={{
                  backgroundColor: brushColor,
                  opacity: 0.8,
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  handleMouseDown(e, "start");
                }}
              />

              {/* Right Handle */}
              <div
                className="absolute top-0 bottom-0 w-2 -right-1 cursor-ew-resize hover:bg-primary/20 transition-colors"
                style={{
                  backgroundColor: brushColor,
                  opacity: 0.8,
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  handleMouseDown(e, "end");
                }}
              />
            </div>
          </div>
        </div>

        {/* Range Info */}
        <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
          <span>
            {data[startIndex]?.[xAxis]} - {data[endIndex]?.[xAxis]}
          </span>
          <span>
            {endIndex - startIndex + 1} de {data.length} períodos
          </span>
        </div>
      </div>
    </div>
  );
};

export default TimeSeries;
