import type { valueFormatter as PillValueFormatter } from "./pillLabelRenderer";

export const TITLE_CLASSNAME = "text-xl font-semibold text-foreground mb-3";

export function buildPercentFormatter(decimals = 0) {
  return (v: number | string) => {
    const n = Number(String(v));
    if (Number.isNaN(n)) return String(v ?? "");
    const value = Math.abs(n) <= 1 ? n * 100 : n;
    return `${value.toFixed(decimals)}%`;
  };
}

export function createFinalValueFormatter(
  valueFormatter?: PillValueFormatter,
  formatBR?: boolean
): PillValueFormatter | undefined {
  const nf = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (valueFormatter) {
    if (formatBR) {
      const wrapped: PillValueFormatter = (props) => {
        const { value, formattedValue } = props as {
          value: number | string | undefined;
          formattedValue: string;
        };

        let num: number = NaN;
        if (typeof value === "number") num = value;
        else if (typeof value === "string" && value.trim() !== "") {
          const parsed = Number(value);
          num = Number.isNaN(parsed) ? NaN : parsed;
        }

        const brFormatted = !Number.isNaN(num)
          ? nf.format(num)
          : String(formattedValue ?? value ?? "");

        return valueFormatter({
          ...(props as object),
          formattedValue: brFormatted,
          value: undefined,
        });
      };
      return wrapped;
    }

    return valueFormatter;
  }

  if (!formatBR) return undefined;

  const builtIn: PillValueFormatter = (props) => {
    const { value, formattedValue } = props as {
      value: number | string | undefined;
      formattedValue: string;
    };

    let num: number = NaN;
    if (typeof value === "number") num = value;
    else if (typeof value === "string" && value.trim() !== "") {
      const parsed = Number(value);
      num = Number.isNaN(parsed) ? NaN : parsed;
    }

    if (!Number.isNaN(num)) return String(nf.format(num));

    return String(formattedValue ?? value ?? "");
  };

  return builtIn;
}

export function createYTickFormatter(finalValueFormatter?: PillValueFormatter) {
  const nf = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const stripCurrency = (s: string) => String(s).replace(/^\s*R\$\s?/, "");

  if (finalValueFormatter) {
    return (v: number | string) => {
      const num = Number(String(v));
      const formatted = Number.isNaN(num) ? String(v ?? "") : nf.format(num);
      const out = finalValueFormatter({
        value: v as number | string,
        formattedValue: formatted,
      });
      return stripCurrency(String(out));
    };
  }

  return (value: number | string) => {
    const num = Number(String(value));
    return Number.isNaN(num) ? String(value ?? "") : nf.format(num);
  };
}
