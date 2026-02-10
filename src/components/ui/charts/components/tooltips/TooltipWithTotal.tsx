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
  totalLabel?: string;
  valueFormatter?: valueFormatter;
  categoryFormatter?: (value: string | number) => string;
  yAxisMap?: Record<string, "left" | "right">;
  isBiaxial?: boolean;
}

const RechartTooltipWithTotal: React.FC<Props> = ({
  active,
  payload,
  label,
  finalColors = {},
  periodLabel = "Período",
  totalLabel = "Total",
  valueFormatter,
  categoryFormatter,
  yAxisMap,
  isBiaxial = false,
}) => {
  if (!active || !payload || payload.length === 0) return null;

  const displayLabel = categoryFormatter
    ? categoryFormatter(String(label ?? ""))
    : label;

  const numeric = payload.filter(
    (p) => typeof p.value === "number" && Number.isFinite(p.value)
  ) as TooltipPayloadItem[];

  const total = numeric.reduce((sum, p) => sum + (p.value || 0), 0);
  const isTotalNegative = total < 0;
  const defaultTotalFormatted = ((): string => {
    try {
      if (Math.abs(total) < 1000) {
        return new Intl.NumberFormat("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(total);
      }
    } catch {
      void 0;
    }
    return total.toLocaleString("pt-BR");
  })();
  const displayTotal = valueFormatter
    ? valueFormatter({
        value: total,
        formattedValue: defaultTotalFormatted,
        dataKey: "total",
        name: "Total",
      })
    : defaultTotalFormatted;

  const absDenominator = numeric.reduce(
    (sum, p) => sum + Math.abs(typeof p.value === "number" ? p.value : 0),
    0
  );

  const axisDenominators: Record<string, number> = {};
  if (isBiaxial && yAxisMap) {
    const normalize = (v: unknown) => {
      if (v === "left" || v === "right") return v as "left" | "right";
      if (v === 1 || v === "1" || v === true) return "right";
      return "left";
    };
    for (const p of numeric) {
      const axis = normalize(yAxisMap[p.dataKey]);
      axisDenominators[axis] =
        (axisDenominators[axis] || 0) + Math.abs(p.value || 0);
    }
  }

  return (
    <div
      role="dialog"
      aria-label={`Tooltip ${label ?? ""}`}
      className="bg-card border border-border rounded-lg p-3 shadow-2xl max-w-xs z-9999"
      style={{ minWidth: 220 }}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="pr-2">
          <p className="text-xs text-muted-foreground">{periodLabel}</p>
          <p className="font-medium text-foreground truncate">{displayLabel}</p>
        </div>

        <div className="text-right ml-3">
          <p className="text-xs text-muted-foreground">{totalLabel}</p>
          <p
            className={`text-sm font-semibold ${
              isTotalNegative ? "text-rose-500" : "text-foreground"
            }`}
          >
            {displayTotal}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {payload.map((entry, index: number) => {
          const value = typeof entry.value === "number" ? entry.value : 0;
          const pct =
            absDenominator > 0 ? (Math.abs(value) / absDenominator) * 100 : 0;
          const baseColor = finalColors[entry.dataKey] || entry.color || "#999";
          const isNeg = value < 0;
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
            <div key={index} className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 truncate">
                  <span
                    className="w-3 h-3 rounded-sm flex-shrink-0"
                    style={{ backgroundColor: baseColor }}
                    aria-hidden
                  />
                  <span className="text-muted-foreground truncate">
                    {entry.name}
                  </span>
                </div>

                <div className="flex items-baseline gap-3 ml-3">
                  <span
                    className={`${
                      isNeg ? "text-rose-500" : "text-foreground"
                    } font-medium`}
                  >
                    {displayValue}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {isBiaxial && yAxisMap
                      ? (() => {
                          const normalize = (v: unknown) => {
                            if (v === "left" || v === "right")
                              return v as "left" | "right";
                            if (v === 1 || v === "1" || v === true)
                              return "right";
                            return "left";
                          };
                          const axis = normalize(yAxisMap[entry.dataKey]);
                          const denom = axisDenominators[axis] || 0;
                          const p =
                            denom > 0 ? (Math.abs(value) / denom) * 100 : 0;
                          return denom > 0 ? `${p.toFixed(1)}%` : "-";
                        })()
                      : absDenominator > 0
                      ? `${pct.toFixed(1)}%`
                      : "-"}
                  </span>
                </div>
              </div>

              <div className="w-full bg-muted rounded-full h-1 overflow-hidden">
                <div
                  className="h-1 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.max(0, Math.min(100, pct))}%`,
                    background: baseColor,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RechartTooltipWithTotal;
