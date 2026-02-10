import React from "react";
import { cn } from "@/lib/utils";
import ChartTotalLegend from "./ChartTotalLegend";
import {
  ChartData,
  MapperConfig,
  ValueFormatterType,
} from "../types/chart.types";

type Props = {
  title?: React.ReactNode;
  titlePosition?: string;
  HORIZONTAL_PADDING_CLASS?: string;
  customLegend?: boolean;
  data: ChartData[];
  allKeys: string[];
  processedData: ChartData[];
  finalColors: Record<string, string>;
  mapperConfig: MapperConfig;
  finalValueFormatter?: ValueFormatterType;
  formatBR?: boolean;
};

export default function ChartHeader({
  title,
  titlePosition = "left",
  HORIZONTAL_PADDING_CLASS = "px-24",
  customLegend,
  data,
  allKeys,
  processedData,
  finalColors,
  mapperConfig,
  finalValueFormatter,
  formatBR,
}: Props) {
  return (
    <>
      {title && (
        <div
          className={cn(
            "w-full flex items-center mt-3 mb-2",
            HORIZONTAL_PADDING_CLASS,
            titlePosition === "center" && "justify-center",
            titlePosition === "right" && "justify-end",
            titlePosition === "left" && "justify-start",
          )}
        >
          <div className="text-[1.4rem] font-semibold text-foreground">
            {title}
          </div>
        </div>
      )}

      {customLegend && !!data.length && (
        <div className={cn("px-6 mb-2", HORIZONTAL_PADDING_CLASS)}>
          <ChartTotalLegend
            items={allKeys.map((key) => {
              const values = processedData.map((d) =>
                Number((d[key] as number) || 0),
              );
              const total = values.reduce((a, b) => a + b, 0);
              const first = values[0] || 0;
              const last = values[values.length - 1] || 0;

              const trendValue =
                first !== 0 ? Math.round(((last - first) / first) * 100) : 0;

              const formattedTotal = finalValueFormatter
                ? finalValueFormatter({
                    value: total,
                    formattedValue: String(total),
                  })
                : new Intl.NumberFormat(formatBR ? "pt-BR" : "en-US").format(
                    total,
                  );

              return {
                label: mapperConfig[key]?.label || key,
                value: formattedTotal,
                color: finalColors[key],
                trend: {
                  value: Math.abs(trendValue),
                  positive: trendValue >= 0,
                  neutral: trendValue === 0,
                },
              };
            })}
          />
        </div>
      )}
    </>
  );
}
