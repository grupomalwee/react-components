import React, { useRef } from "react";
import { IntegrationProperties, useIsTruncated } from "@/index.d";
import {
  TooltipProviderBase,
  TooltipBase,
  TooltipTriggerBase,
  TooltipContentBase,
} from "@/components/ui/feedback/TooltipBase";
import { CopyData } from "./CopyData";

const propertyLabels: Record<string, string> = {
  Nome: "Nome",
  tipo: "Tipo",
  Tipo: "Tipo",
  Protocolos: "Protocolos",
  Ambiente: "Ambiente",
  Setor: "Setor",
  Contato: "Contato",
  Sustentacao: "Sustentação",
  Destino: "Destino",
  Origem: "Origem",
};

export const IntegrationCard: React.FC<{
  title: string;
  details?: IntegrationProperties | null;
}> = ({ title, details }) => {
  const titleRef = useRef<HTMLSpanElement>(null);
  const isTitleTruncated = useIsTruncated(titleRef);

  // We filter out internal stuff and only use what's mapped in propertyLabels or fallback
  const blackList = ["id", "elementId", "identity"];
  const entries = details
    ? Object.entries(details).filter(
        ([key, value]) =>
          value !== undefined &&
          value !== null &&
          value !== "" &&
          !blackList.includes(key),
      )
    : [];

  return (
    <div className="rounded-sm border border-border/40 bg-muted/20 overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-border/30">
        <TooltipProviderBase>
          <TooltipBase>
            <TooltipTriggerBase asChild>
              <span
                ref={titleRef}
                className="text-sm font-bold text-foreground truncate flex-1 cursor-default"
              >
                {title}
              </span>
            </TooltipTriggerBase>
            {isTitleTruncated && (
              <TooltipContentBase sideOffset={6} className="z-[10001]">
                {title}
              </TooltipContentBase>
            )}
          </TooltipBase>
        </TooltipProviderBase>
        {entries.length > 0 && (
          <CopyData
            value={entries
              .map(([k, v]) => `${propertyLabels[k] || k}: ${String(v)}`)
              .join("\n")}
          />
        )}
      </div>

      {entries.length > 0 && (
        <div className="divide-y divide-border/20">
          {entries.map(([key, value]) => {
            const label = propertyLabels[key] || key;
            return (
              <div key={key} className="flex items-center gap-2 px-3 py-1.5">
                <span className="text-xs font-semibold text-muted-foreground shrink-0 w-[40%] sm:w-[38%]">
                  {label}:
                </span>
                <span className="text-xs text-foreground break-all flex-1">
                  {String(value)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
