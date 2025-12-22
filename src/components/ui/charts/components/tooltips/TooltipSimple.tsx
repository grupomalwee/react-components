import React from "react";
import { valueFormatter } from "../../utils";

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
  valueFormatter?: valueFormatter;
  categoryFormatter?: (value: string | number) => string;
  yAxisMap?: Record<string, "left" | "right">;
  isBiaxial?: boolean;
}

const TooltipSimple: React.FC<Props> = ({
  active,
  payload,
  label,
  finalColors = {},
  periodLabel = "Período",
  valueFormatter,
  categoryFormatter,
  yAxisMap,
  isBiaxial = false,
}) => {
  if (!active || !payload || payload.length === 0) return null;

  const displayLabel = categoryFormatter
    ? categoryFormatter(String(label ?? ""))
    : label;

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
            <p className="font-medium text-foreground truncate">
              {displayLabel}
            </p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-border rounded-md overflow-hidden">
        {payload.map((entry, index: number) => {
          const value = typeof entry.value === "number" ? entry.value : 0;
          const color = finalColors[entry.dataKey] || entry.color || "#999";
          let pct = 0;
          if (isBiaxial && yAxisMap) {
            const normalize = (v: unknown) => {
              if (v === "left" || v === "right") return v as "left" | "right";
              if (v === 1 || v === "1" || v === true) return "right";
              return "left";
            };
            const axis = normalize(yAxisMap[entry.dataKey]);
            // compute sum for the axis
            const axisSum = payload
              .filter((p) => normalize(yAxisMap[p.dataKey]) === axis)
              .reduce(
                (s, p) =>
                  s + Math.abs(typeof p.value === "number" ? p.value : 0),
                0
              );
            pct = axisSum > 0 ? (Math.abs(value) / axisSum) * 100 : 0;
          }
          const defaultFormatted = ((): string => {
            try {
              if (Math.abs(value) < 1000) {
                return new Intl.NumberFormat("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(value);
              }
            } catch {
              void 0;
            }
            return value.toLocaleString("pt-BR");
          })();
          const displayValue = valueFormatter
            ? valueFormatter({
                value: entry.value,
                formattedValue: defaultFormatted,
                dataKey: entry.dataKey,
                name: entry.name,
              })
            : defaultFormatted;

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
                <div className="flex items-baseline gap-2">
                  <span
                    className={`font-medium tabular-nums ${
                      value < 0 ? "text-destructive" : "text-foreground"
                    }`}
                  >
                    {displayValue}
                  </span>
                  {isBiaxial ? (
                    <span className="text-xs text-muted-foreground">
                      {pct > 0 ? `${pct.toFixed(1)}%` : "-"}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TooltipSimple;
