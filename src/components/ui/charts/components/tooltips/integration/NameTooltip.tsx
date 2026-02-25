import React, { useRef } from "react";
import {
  TooltipProviderBase,
  TooltipBase,
  TooltipTriggerBase,
  TooltipContentBase,
} from "@/components/ui/feedback/TooltipBase";
import { useIsTruncated } from "./hooks/useIsTruncated";

export const NameTooltip: React.FC<{ name: string; description?: string }> = ({
  name,
  description,
}) => {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const isNameTruncated = useIsTruncated(nameRef);
  const isDescTruncated = useIsTruncated(descRef);
  const showTooltip = isNameTruncated || isDescTruncated;

  return (
    <TooltipProviderBase>
      <TooltipBase>
        <TooltipTriggerBase asChild>
          <div className="cursor-default">
            <h3
              ref={nameRef}
              className="text-xl font-bold text-foreground tracking-tight truncate"
            >
              {name}
            </h3>
            {description && (
              <p
                ref={descRef}
                className="text-xs text-foreground/70 truncate mt-0.5"
              >
                {description}
              </p>
            )}
          </div>
        </TooltipTriggerBase>
        {showTooltip && (
          <TooltipContentBase sideOffset={8} className="z-[10001]">
            <p className="font-semibold">{name}</p>
            {description && (
              <p className="text-xs text-foreground/70 mt-0.5">{description}</p>
            )}
          </TooltipContentBase>
        )}
      </TooltipBase>
    </TooltipProviderBase>
  );
};
