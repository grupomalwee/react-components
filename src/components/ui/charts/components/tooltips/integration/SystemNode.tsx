import React from "react";
import {
  TooltipProviderBase,
  TooltipBase,
  TooltipTriggerBase,
  TooltipContentBase,
} from "@/components/ui/feedback/TooltipBase";

export const SystemNode: React.FC<{ label: string }> = ({ label }) => {
  const truncated = label.length > 9 ? label.substring(0, 9) + "…" : label;
  const needsTooltip = label.length > 9;

  const circle = (
    <div className="w-[76px] h-[76px] rounded-full bg-primary flex items-center justify-center shrink-0 z-10 cursor-default">
      <span className="text-[10px] font-bold text-primary-foreground text-center px-2 leading-tight select-none">
        {truncated}
      </span>
    </div>
  );

  if (!needsTooltip) return circle;
  return (
    <TooltipProviderBase>
      <TooltipBase>
        <TooltipTriggerBase asChild>{circle}</TooltipTriggerBase>
        <TooltipContentBase sideOffset={8} className="z-[10001]">
          {label}
        </TooltipContentBase>
      </TooltipBase>
    </TooltipProviderBase>
  );
};
