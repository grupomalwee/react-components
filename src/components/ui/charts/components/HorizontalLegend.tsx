import React from "react";
import { cn } from "@/lib/utils";
import { FunnelSimpleIcon } from "@phosphor-icons/react";

interface HorizontalLegendProps {
  allKeys: string[];
  mapperConfig: Record<string, { label?: string }>;
  finalColors: Record<string, string>;
  labelMap?: Record<string, string>;
  legendUppercase?: boolean;
  orderBy?: string;
  maxPeriodLabel?: string;
  minPeriodLabel?: string;
  className?: string;
}

const formatFieldName = (key: string): string => {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
};

const HorizontalLegend: React.FC<HorizontalLegendProps> = ({
  allKeys,
  mapperConfig,
  finalColors,
  labelMap,
  legendUppercase = false,
  orderBy,
  maxPeriodLabel,
  minPeriodLabel,
  className,
}) => {
  const formatLegendLabel = (key: string): string => {
    const label =
      mapperConfig[key]?.label ?? labelMap?.[key] ?? formatFieldName(key);
    return legendUppercase ? label.toUpperCase() : label;
  };
  return (
    <div className={cn(className)}>
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-wrap">
        {allKeys.map((key) => {
          const displayLabel = formatLegendLabel(key);
          return (
            <div key={key} className="flex items-center gap-1.5 sm:gap-2">
              <div
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm flex-shrink-0"
                style={{ backgroundColor: finalColors[key] }}
              />
              <span className="text-xs sm:text-sm tracking-[0] break-words">
                {displayLabel}
              </span>
            </div>
          );
        })}

        {orderBy && maxPeriodLabel && minPeriodLabel && (
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 w-full sm:w-auto justify-center mt-2 sm:mt-0 sm:ml-3 sm:pl-3 md:ml-4 md:pl-4 sm:border-l border-border">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <FunnelSimpleIcon
                className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0"
                weight="bold"
              />
              <span className="text-xs sm:text-sm tracking-[0] font-medium truncate max-w-[120px] sm:max-w-none">
                {maxPeriodLabel}
              </span>
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5">
              <FunnelSimpleIcon
                className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 rotate-180 flex-shrink-0"
                weight="bold"
              />
              <span className="text-xs sm:text-sm tracking-[0] font-medium truncate max-w-[120px] sm:max-w-none">
                {minPeriodLabel}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HorizontalLegend;
