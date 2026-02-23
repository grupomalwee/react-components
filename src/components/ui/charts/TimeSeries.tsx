import React from "react";
import Chart from "./Chart";
import { cn } from "@/lib/utils";

interface TimeSeriesData {
  [key: string]: string | number | boolean | null | undefined;
}

interface TimeSeriesProps extends Omit<
  React.ComponentProps<typeof Chart>,
  "data" | "xAxis" | "timeSeries" | "className"
> {
  data: TimeSeriesData[];
  xAxis: string;
  /**
   * className aplicado no wrapper externo do TimeSeries.
   * Controla a altura total (chart + brush).
   * Padrão: altura automática (chart 350px + brush natural)
   * Exemplo: className="h-[500px]" ou className="h-full"
   */
  className?: string;
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
  brushHeight = 60,
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
  const startIndex = defaultStartIndex ?? start ?? 0;
  const endIndex = defaultEndIndex ?? end;

  // Detecta se o usuário definiu uma altura explícita no wrapper
  const hasExplicitHeight = /\bh-/.test(className ?? "");

  return (
    <div className={cn("w-full flex flex-col overflow-hidden", className)}>
      <Chart
        {...rest}
        data={data}
        xAxis={xAxis}
        className={hasExplicitHeight ? "flex-1 min-h-0" : undefined}
        timeSeries={{
          start: startIndex,
          end: endIndex,
          onRangeChange,
          height: brushHeight,
          brushColor,
          brushStroke,
          miniChartOpacity,
        }}
      />
    </div>
  );
};

export default TimeSeries;