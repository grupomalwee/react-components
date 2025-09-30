export const formatFieldName = (fieldName: string): string => {
  return fieldName
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase())
    .trim();
};

export const detectDataFields = (
  data: Record<string, unknown>[],
  xAxisKey: string
): string[] => {
  if (!data || data.length === 0) return [];
  const firstItem = data[0];
  return Object.keys(firstItem).filter(
    (key) => key !== xAxisKey && typeof firstItem[key] === "number"
  );
};

export const detectXAxis = (data: Record<string, unknown>[]): string => {
  if (!data || data.length === 0) return "name";
  const firstItem = data[0];
  const stringFields = Object.keys(firstItem).filter(
    (key) =>
      typeof firstItem[key] === "string" ||
      (typeof firstItem[key] === "number" && String(firstItem[key]).length <= 4)
  );
  return stringFields[0] || Object.keys(firstItem)[0] || "name";
};

export const generateAdditionalColors = (
  baseColors: string[],
  count: number
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
      16
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

export type Padding =
  | number
  | Partial<{ left: number; right: number; top: number; bottom: number }>;

export type Margins = Partial<{
  top: number;
  right: number;
  left: number;
  bottom: number;
}>;

export const resolveContainerPaddingLeft = (
  padding?: Padding,
  containerPaddingLeft?: number,
  defaultLeft = 16
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
  showLabels?: boolean
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
