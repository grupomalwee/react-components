import React from "react";
import Chart from "./Chart";
import { cn } from "@/lib/utils";

interface TimeSeriesData {
  [key: string]: string | number | boolean | null | undefined;
}

interface TimeSeriesProps extends Omit<
  React.ComponentProps<typeof Chart>,
  "data" | "xAxis" | "timeSeries"
> {
  data: TimeSeriesData[];
  xAxis: string;
  chartHeight?: number;
  height?: number;
  brushHeight?: number;
  start?: number;
  end?: number;
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
  chartHeight = 350,
  height,
  brushHeight,
  className,
  start,
  end,
  defaultStartIndex,
  defaultEndIndex,
  onRangeChange,
  brushColor,
  brushStroke,
  miniChartOpacity = 0.2,
  ...rest
}) => {
  const brushHeightValue = brushHeight ?? height ?? 60;
  const startIndex = defaultStartIndex ?? start ?? 0;
  const endIndex = defaultEndIndex ?? end;
  return (
    <div className={cn("w-full flex flex-col", className)}>
      <Chart
        {...rest}
        data={data}
        xAxis={xAxis}
        height={chartHeight + brushHeightValue + 40}
        timeSeries={{
          start: startIndex,
          end: endIndex,
          onRangeChange,
          height: brushHeightValue,
          brushColor,
          brushStroke,
          miniChartOpacity,
        }}
      />
    </div>
  );
};

export default TimeSeries;
