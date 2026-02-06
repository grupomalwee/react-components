import {
  Margins,
  Padding,
  SeriesConfig,
  ValueFormatterType,
} from "../types/chart.types";
export const formatFieldName = (fieldName: string): string => {
  return (fieldName.match(/[^/_-]+/g) || [])
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ")
    .trim();
};

export const detectDataFields = (
  data: Record<string, unknown>[],
  xAxisKey: string,
): string[] => {
  if (!data || data.length === 0) return [];
  const firstItem = data[0];
  return Object.keys(firstItem).filter(
    (key) => key !== xAxisKey && typeof firstItem[key] === "number",
  );
};

export const detectXAxis = (data: Record<string, unknown>[]): string => {
  if (!data || data.length === 0) return "name";
  const firstItem = data[0];
  const stringFields = Object.keys(firstItem).filter(
    (key) =>
      typeof firstItem[key] === "string" ||
      (typeof firstItem[key] === "number" &&
        String(firstItem[key]).length <= 4),
  );
  return stringFields[0] || Object.keys(firstItem)[0] || "name";
};

export const generateAdditionalColors = (
  baseColors: string[],
  count: number,
): string[] => {
  const hexToRgb = (hex: string) => {
    const clean = hex.replace("#", "");
    const bigint = parseInt(
      clean.length === 3
        ? clean
            .split("")
            .map((c) => c + c)
            .join("")
        : clean,
      16,
    );
    return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
  };

  const rgbToHsl = ({ r, g, b }: { r: number; g: number; b: number }) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const hslToHex = (h: number, s: number, l: number) => {
    s /= 100;
    l /= 100;
    const k = (n: number) => (n + h / 30) % 5;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
      const color =
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const anchors = baseColors.map((c) => rgbToHsl(hexToRgb(c)));

  const colors: string[] = [...baseColors];

  let i = 0;
  while (colors.length < count) {
    const anchor = anchors[i % anchors.length];
    const step = Math.floor(i / anchors.length + 1);
    const hueOffset = step * 25 * (i % 2 === 0 ? 1 : -1);
    const satOffset = i % 3 === 0 ? -6 : 6;
    const lightOffset = i % 4 === 0 ? 6 : -4;

    const newH = (anchor.h + hueOffset + 360) % 360;
    const newS = Math.max(30, Math.min(95, anchor.s + satOffset));
    const newL = Math.max(25, Math.min(45, anchor.l + lightOffset));

    colors.push(hslToHex(newH, newS, newL));
    i += 1;
  }

  return colors.slice(0, count);
};

export const niceCeil = (value: number) => {
  if (!isFinite(value) || value <= 0) return 1;
  const pow = Math.pow(10, Math.floor(Math.log10(value)));
  const normalized = value / pow;
  const multipliers = [
    1, 1.25, 1.5, 2, 2.5, 3, 4, 5, 7.5, 10, 15, 20, 25, 50, 100,
  ];
  for (const m of multipliers) {
    if (m >= normalized) return Math.ceil(m * pow);
  }
  return Math.ceil(100 * pow);
};

export const compactTick = (value: number) => {
  if (value >= 1_000_000_000)
    return (value / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  if (value >= 1_000_000)
    return (value / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (value >= 1000) return (value / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(value);
};

export const resolveContainerPaddingLeft = (
  padding?: Padding,
  containerPaddingLeft?: number,
  defaultLeft = 16,
): number => {
  if (typeof padding === "number") return padding;
  if (padding && typeof padding === "object" && padding.left != null)
    return padding.left as number;
  if (typeof containerPaddingLeft === "number") return containerPaddingLeft;
  return defaultLeft;
};

export const resolveChartMargins = (
  margins?: Margins,
  chartMargins?: Margins,
  showLabels?: boolean,
): { top: number; right: number; left: number; bottom: number } => {
  const defaultRight = 30;
  const defaultLeft = 20;
  const topDefault = showLabels ? 48 : 20;
  const bottomDefault = 5;

  return {
    top: margins?.top ?? chartMargins?.top ?? topDefault,
    right: margins?.right ?? chartMargins?.right ?? defaultRight,
    left: margins?.left ?? chartMargins?.left ?? defaultLeft,
    bottom: margins?.bottom ?? chartMargins?.bottom ?? bottomDefault,
  };
};

export const generateColorMap = (
  dataKeys: string[],
  baseColors: string[],
  mapperConfig: Record<string, { color?: string }>,
): Record<string, string> => {
  const colorMap: Record<string, string> = {};
  const allColors = generateAdditionalColors(baseColors, dataKeys.length);

  dataKeys.forEach((key, index) => {
    colorMap[key] =
      mapperConfig[key]?.color ||
      allColors[index] ||
      baseColors[index % baseColors.length];
  });

  return colorMap;
};

export const computeNiceMax = (maxValue: number): number => {
  let padding = 0.08;
  if (maxValue > 1_000_000) padding = 0.05;
  if (maxValue > 10_000_000) padding = 0.03;
  if (maxValue === 0) padding = 0.12;
  const padded = maxValue * (1 + padding);
  return niceCeil(padded);
};

export const getMaxDataValue = (
  data: Record<string, unknown>[],
  keys: string[],
): number => {
  let max = 0;
  for (const row of data) {
    for (const key of keys) {
      const v = row[key];
      if (typeof v === "number" && Number.isFinite(v) && v > max) max = v;
    }
  }
  return max;
};

export const getMinDataValue = (
  data: Record<string, unknown>[],
  keys: string[],
): number => {
  let min = 0;
  for (const row of data) {
    for (const key of keys) {
      const v = row[key];
      if (typeof v === "number" && Number.isFinite(v) && v < min)
        min = v as number;
    }
  }
  return min;
};

export const computeChartWidth = (
  width: number | string | undefined,
  dataLength: number,
  series: SeriesConfig | undefined,
  niceMaxLeft: number,
  niceMaxRight: number,
): number => {
  if (typeof width === "number") return width;

  const points = Math.max(1, dataLength);
  const barCount = series?.bar?.length ?? 0;
  const lineCount = series?.line?.length ?? 0;
  const areaCount = series?.area?.length ?? 0;

  const basePerPoint = 60;
  const perBarExtra = barCount > 0 ? Math.max(0, barCount - 1) * 8 : 0;
  const perOtherExtra = (lineCount + areaCount) * 4;

  const overallNiceMax = Math.max(niceMaxLeft || 0, niceMaxRight || 0);
  let sizeFactor = 1;
  if (overallNiceMax > 100_000) sizeFactor = 1.1;
  if (overallNiceMax > 1_000_000) sizeFactor = 1.2;
  if (overallNiceMax > 10_000_000) sizeFactor = 1.3;

  const perPoint = Math.round(
    (basePerPoint + perBarExtra + perOtherExtra) * sizeFactor,
  );

  const marginExtra = 120;
  const calculated = points * perPoint + marginExtra;

  const minWidth = 300;
  const maxWidth = 1800;

  return Math.max(minWidth, Math.min(maxWidth, calculated));
};

export const adaptDataForTooltip = <T extends Record<string, unknown>>(
  data: T,
  xAxisKey: string,
): { name: string; [key: string]: string | number } => {
  const result: { name: string; [key: string]: string | number } = {
    name: String(data[xAxisKey] || "N/A"),
  };

  for (const key in data) {
    const value = data[key];
    if (typeof value === "string" || typeof value === "number") {
      result[key] = value;
    } else if (value !== null && value !== undefined) {
      result[key] = String(value);
    }
  }

  return result;
};

export const createValueFormatter = (
  customFormatter: ValueFormatterType | Record<string, string> | undefined,
  formatBR: boolean,
  dataKey?: string,
): ValueFormatterType | undefined => {
  const nf = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  // Formatos que aparecem ANTES do valor (prefixos)
  const prefixFormats = ["R$", "$", "€", "£"];

  // Formatos que aparecem DEPOIS do valor (sufixos)
  const suffixFormats = ["%", "kg", "km", "m", "L", "un", "t", "h", "min", "s"];

  /**
   * Determina se o formato deve aparecer antes (prefixo) ou depois (sufixo)
   */
  const getFormattedValue = (baseValue: string, format: string): string => {
    const trimmedFormat = format.trim();

    // Verifica se é um prefixo
    if (prefixFormats.includes(trimmedFormat)) {
      return `${trimmedFormat} ${baseValue}`;
    }

    // Verifica se é um sufixo
    if (suffixFormats.includes(trimmedFormat)) {
      return `${baseValue}${trimmedFormat}`;
    }

    // Caso não seja predefinido, coloca como sufixo com espaço
    return `${baseValue} ${trimmedFormat}`;
  };

  if (customFormatter) {
    // Se for um objeto (Record<string, string>)
    if (
      typeof customFormatter === "object" &&
      !Array.isArray(customFormatter)
    ) {
      const formatterMap = customFormatter as Record<string, string>;

      return (props) => {
        const { value, formattedValue } = props as {
          value: number | string | undefined;
          formattedValue: string;
          [key: string]: unknown;
        };

        let num: number = NaN;
        if (typeof value === "number") num = value;
        else if (typeof value === "string" && value.trim() !== "") {
          const parsed = Number(value);
          num = Number.isNaN(parsed) ? NaN : parsed;
        }

        const baseFormatted =
          formatBR && !Number.isNaN(num)
            ? nf.format(num)
            : String(formattedValue ?? value ?? "");

        // Aplicar o formatter específico para a chave, se existir
        const format =
          dataKey && formatterMap[dataKey] ? formatterMap[dataKey] : "";

        return format
          ? getFormattedValue(baseFormatted, format)
          : baseFormatted;
      };
    }

    // Se for uma função (comportamento antigo)
    if (typeof customFormatter === "function") {
      if (formatBR) {
        const wrapped: ValueFormatterType = (props) => {
          const { value, formattedValue } = props as {
            value: number | string | undefined;
            formattedValue: string;
            [key: string]: unknown;
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

          return customFormatter({
            ...(props as object),
            formattedValue: brFormatted,
            value: undefined,
          }) as string;
        };
        return wrapped;
      }

      return customFormatter;
    }
  }

  if (!formatBR) return undefined;

  const builtIn: ValueFormatterType = (props) => {
    const { value, formattedValue } = props as {
      value: number | string | undefined;
      formattedValue: string;
      [key: string]: unknown;
    };

    let num: number = NaN;
    if (typeof value === "number") num = value;
    else if (typeof value === "string" && value.trim() !== "") {
      const parsed = Number(value);
      num = Number.isNaN(parsed) ? NaN : parsed;
    }

    if (!Number.isNaN(num)) return nf.format(num);

    return String(formattedValue ?? value ?? "");
  };

  return builtIn;
};

export const createYTickFormatter = (
  finalValueFormatter: ValueFormatterType | undefined,
): ((value: number | string) => string) => {
  const nf = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
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
};

export const computeYAxisTickWidth = (
  chartMarginLeft: number | undefined,
  yAxisLabel: string | undefined,
  axisLabelMargin: number,
  yTickFormatter: (value: number | string) => string,
  minValue: number,
  maxValue: number,
): number => {
  if (typeof chartMarginLeft === "number") return chartMarginLeft;

  if (yAxisLabel) return axisLabelMargin;

  const samples = [
    minValue,
    maxValue,
    Math.round((minValue + maxValue) / 2),
    0,
  ];
  const formatted = samples.map((v) => String(yTickFormatter(v)));
  const maxLen = formatted.reduce((m, s) => Math.max(m, s.length), 0);

  const estimated = Math.max(48, Math.min(220, maxLen * 8 + 24));
  return estimated;
};
