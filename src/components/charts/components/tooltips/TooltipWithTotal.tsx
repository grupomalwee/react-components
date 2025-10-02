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
  totalLabel?: string;
}

const RechartTooltipWithTotal: React.FC<Props> = ({
  active,
  payload,
  label,
  finalColors = {},
  periodLabel = "Período",
  totalLabel = "Total",
}) => {
  if (!active || !payload || payload.length === 0) return null;

  const numeric = payload.filter(
    (p) => typeof p.value === "number" && Number.isFinite(p.value)
  ) as TooltipPayloadItem[];

  const total = numeric.reduce((sum, p) => sum + (p.value || 0), 0);
  const isTotalNegative = total < 0;

  const absDenominator = numeric.reduce(
    (sum, p) => sum + Math.abs(typeof p.value === "number" ? p.value : 0),
    0
  );

  return (
    <div
      role="dialog"
      aria-label={`Tooltip ${label ?? ""}`}
      className="bg-card border border-border rounded-lg p-3 shadow-2xl max-w-xs"
      style={{ minWidth: 220 }}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="pr-2">
          <p className="text-xs text-muted-foreground">{periodLabel}</p>
          <p className="font-medium text-foreground truncate">{label}</p>
        </div>

        <div className="text-right ml-3">
          <p className="text-xs text-muted-foreground">{totalLabel}</p>
          <p
            className={`text-sm font-semibold ${
              isTotalNegative ? "text-rose-500" : "text-foreground"
            }`}
          >
            {total.toLocaleString("pt-BR")}
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
                    {value.toLocaleString("pt-BR")}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {absDenominator > 0 ? `${pct.toFixed(1)}%` : "-"}
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
