import React from "react";
import { SkeletonBase } from "@/components/ui/feedback/SkeletonBase";
import { IntegrationData } from "../utils/integrationTooltipUtils";
import { NameTooltip } from "./NameTooltip";
import { SystemsDiagram } from "./SystemsDiagram";
import { IntegrationCard } from "./IntegrationCard";

const TooltipBodyComponent: React.FC<{
  data: IntegrationData;
  isLoading: boolean;
  connections: IntegrationData["connections"];
  isInput: boolean;
  externalSystem: string;
}> = ({ data, isLoading, connections, isInput, externalSystem }) => (
  <div className="px-3 py-3 space-y-3 overflow-y-auto flex-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/40 transition-colors">
    {isLoading ? (
      <div className="space-y-1.5">
        <SkeletonBase className="h-6 w-3/4" />
        <SkeletonBase className="h-3.5 w-1/2" />
      </div>
    ) : (
      <NameTooltip name={data.name} description={data.description} />
    )}

    <div className="border-t border-border/20" />

    {isLoading ? (
      <div className="space-y-3">
        <div className="flex items-center justify-between py-1">
          <SkeletonBase className="w-[76px] h-[76px] rounded-full" />
          <SkeletonBase className="w-[76px] h-[76px] rounded-full" />
        </div>
        <div className="border-t border-border/20" />
        {[1, 2].map((i) => (
          <div
            key={i}
            className="rounded-lg border border-border/20 overflow-hidden"
          >
            <SkeletonBase className="h-8 w-full" />
            {[1, 2, 3].map((j) => (
              <SkeletonBase key={j} className="h-7 w-full mt-px" />
            ))}
          </div>
        ))}
      </div>
    ) : connections.length === 0 ? (
      <p className="text-xs text-muted-foreground text-center py-4">
        Nenhuma conexão encontrada
      </p>
    ) : (
      <>
        <SystemsDiagram
          isInput={isInput}
          currentSystem={data.name}
          externalSystem={externalSystem}
        />

        <div className="border-t border-border/20" />

        <div className="flex items-center gap-">
          <span className="text-[10px] font-bold text-muted-foreground uppercase">
            {isInput ? "Informações de Entrada" : "Informações de Saída"}
          </span>
        </div>

        <div className="space-y-2">
          {connections.map((conn) => (
            <IntegrationCard
              key={conn.id}
              title={conn.name}
              details={conn.integration}
            />
          ))}
        </div>
      </>
    )}
  </div>
);

export const TooltipBody = React.memo(TooltipBodyComponent);
