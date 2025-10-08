import React from "react";

type TooltipPayloadItem = {
  dataKey: string;
  value: number;
  name: string;
  color?: string;
};

interface Props {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
  finalColors?: Record<string, string>;
  periodLabel?: string;
}

const TooltipSimple: React.FC<Props> = ({
  active,
  payload,
  label,
  finalColors = {},
  periodLabel = "Período",
}) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div
      role="dialog"
      aria-label={`Tooltip ${label ?? ""}`}
      className="bg-card border border-border rounded-lg p-3 shadow-2xl max-w-[280px]"
      style={{ minWidth: 220 }}
    >
      <div className="mb-2">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">{periodLabel}</p>
            <p className="font-medium text-foreground truncate">{label}</p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-border rounded-md overflow-hidden">
        {payload.map((entry, index: number) => {
          const value = typeof entry.value === "number" ? entry.value : 0;
          const color = finalColors[entry.dataKey] || entry.color || "#999";
          return (
            <div
              key={index}
              className="flex items-center justify-between text-sm px-2 py-2 bg-card/0 hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className="w-3 h-3 rounded-sm flex-shrink-0 border border-border/20"
                  style={{ backgroundColor: color }}
                  aria-hidden
                />
                <span className="text-muted-foreground truncate">
                  {entry.name}
                </span>
              </div>

              <div className="ml-3">
                <span
                  className={`font-medium tabular-nums ${
                    value < 0 ? "text-destructive" : "text-foreground"
                  }`}
                >
                  {value.toLocaleString("pt-BR")}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TooltipSimple;
