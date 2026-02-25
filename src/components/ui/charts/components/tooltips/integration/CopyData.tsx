import React, { useState, useCallback } from "react";
import {
  TooltipProviderBase,
  TooltipBase,
  TooltipTriggerBase,
  TooltipContentBase,
} from "@/components/ui/feedback/TooltipBase";

export const CopyData: React.FC<{ value: string }> = ({ value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [value]);

  return (
    <TooltipProviderBase>
      <TooltipBase>
        <TooltipTriggerBase asChild>
          <button
            onClick={handleCopy}
            className="shrink-0 p-0.5 rounded transition-colors text-muted-foreground/40 hover:text-foreground hover:bg-muted"
            style={{ cursor: "pointer" }}
          >
            {copied ? (
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8l3.5 3.5L13 4.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <rect
                  x="5"
                  y="5"
                  width="8"
                  height="9"
                  rx="1.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M3 11V3.5A1.5 1.5 0 0 1 4.5 2H11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </TooltipTriggerBase>
        <TooltipContentBase sideOffset={6} className="z-[10001]">
          {copied ? "Copiado!" : "Copiar"}
        </TooltipContentBase>
      </TooltipBase>
    </TooltipProviderBase>
  );
};
