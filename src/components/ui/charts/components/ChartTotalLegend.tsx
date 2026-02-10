import React from "react";
import { cn } from "@/lib/utils";
import { LegendItem } from "../types/chart.types";
import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  MinusIcon,
} from "@phosphor-icons/react";

interface ChartTotalLegendProps {
  items: LegendItem[];
}

const ChartTotalLegend: React.FC<ChartTotalLegendProps> = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="flex items-center gap-8 mb-6 overflow-x-auto pb-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-3">
          {item.color && (
            <div
              className="w-1.5 h-4 rounded-full"
              style={{ backgroundColor: item.color }}
            />
          )}

          <div>
            <div className="text-sm font-medium text-muted-foreground whitespace-nowrap">
              {item.label}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-foreground">
                {item.value}
              </span>

              {item.trend && (
                <div
                  className={cn(
                    "flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium",
                    item.trend.neutral
                      ? "bg-muted text-muted-foreground"
                      : item.trend.positive
                        ? "bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "bg-red-500/15 text-red-600 dark:bg-red-500/10 dark:text-red-400",
                  )}
                >
                  {!item.trend.neutral &&
                    (item.trend.positive ? (
                      <ArrowUpRightIcon weight="bold" className="w-3 h-3" />
                    ) : (
                      <ArrowDownRightIcon weight="bold" className="w-3 h-3" />
                    ))}
                  {item.trend.neutral && (
                    <MinusIcon weight="bold" className="w-3 h-3" />
                  )}

                  {(item.trend.label || item.trend.value !== undefined) && (
                    <span>{item.trend.label ?? `${item.trend.value}%`}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChartTotalLegend;
