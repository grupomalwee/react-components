import React from "react";

type Variant = "filled" | "outline" | "soft";

type LabelRendererProps = {
  x?: number | string;
  y?: number | string;
  value?: number | string;
  index?: number;
  payload?: unknown;
  width?: number | string;
  height?: number | string;
  viewBox?:
    | { x?: number; y?: number; width?: number; height?: number }
    | Record<string, unknown>
    | undefined;
  cx?: number | string;
  cy?: number | string;
};

const formatCompactNumber = (value: number): string => {
  const isNegative = value < 0;
  const absValue = Math.abs(value);

  let formatted: string;
  if (absValue >= 1000000000) {
    formatted = (absValue / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
  } else if (absValue >= 1000000) {
    formatted = (absValue / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (absValue >= 1000) {
    formatted = (absValue / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  } else {
    formatted = absValue.toString();
  }

  return isNegative ? `-${formatted}` : formatted;
};

const parseNumber = (v: number | string | undefined) => {
  if (typeof v === "number") return v;
  if (typeof v === "string" && v.trim() !== "" && !Number.isNaN(Number(v)))
    return Number(v);
  return undefined;
};

export const renderPillLabel = (color: string, variant: Variant) => {
  return (props: LabelRendererProps) => {
    const { x, y, value } = props;
    const text =
      typeof value === "number"
        ? formatCompactNumber(value)
        : String(value ?? "");
    const paddingX = 8;
    const approxCharWidth = 7;
    const pillWidth = Math.max(
      40,
      String(text).length * approxCharWidth + paddingX * 2
    );
    const pillHeight = 20;

    const xNum = parseNumber(x);
    const px = parseNumber(props.x);
    const pWidth = parseNumber(props.width);
    const vb = props.viewBox as
      | { x?: number; y?: number; width?: number; height?: number }
      | undefined;
    const cxNum = parseNumber(props.cx as number | string | undefined);

    let centerX: number;
    if (typeof px === "number" && typeof pWidth === "number") {
      centerX = px + pWidth / 2;
    } else if (typeof xNum === "number" && typeof pWidth === "number") {
      centerX = xNum + pWidth / 2;
    } else if (typeof cxNum === "number") {
      centerX = cxNum;
    } else if (
      vb &&
      typeof vb.x === "number" &&
      typeof vb.width === "number" &&
      typeof props.index === "number"
    ) {
      // Estimate column center based on index and total width when other coords missing
      const approxCols = Math.max(1, props.index + 1);
      const colWidth = vb.width / approxCols;
      centerX = vb.x + colWidth * (props.index + 0.5);
    } else if (vb && typeof vb.x === "number" && typeof vb.width === "number") {
      centerX = vb.x + vb.width / 2;
    } else {
      centerX = typeof props.index === "number" ? props.index * 40 + 24 : 0;
    }

    // Clamp within viewBox horizontal bounds if available
    if (vb && typeof vb.x === "number" && typeof vb.width === "number") {
      const minX = vb.x + 0 + pillWidth / 22;
      const maxX = vb.x + vb.width - 2 - pillWidth / 2;
      centerX = Math.max(minX, Math.min(maxX, centerX));
    }

    const yNum = parseNumber(y);
    const py = parseNumber(props.y);
    const cyNum = parseNumber(props.cy as number | string | undefined);
    const centerY =
      yNum ??
      (typeof py === "number"
        ? py
        : vb && typeof vb.y === "number" && typeof vb.height === "number"
        ? vb.y + vb.height / 2
        : typeof cyNum === "number"
        ? cyNum
        : 0);

    const rectX = centerX - pillWidth / 2;
    const rectY = centerY - pillHeight - 6;
    const textX = centerX;
    const textY = rectY + pillHeight / 2 + 3;

    const rectFill =
      variant === "filled"
        ? color
        : variant === "soft"
        ? `${color}20`
        : "#ffffff";

    const rectStroke = variant === "outline" ? `${color}CC` : undefined;

    // Melhorar a lógica de cores para valores negativos
    const numValue = parseNumber(value);
    const isNegative = typeof numValue === "number" && numValue < 0;

    let textColor: string;
    if (isNegative) {
      // Valores negativos sempre vermelhos, independente da variante
      textColor = "#dc2626";
    } else {
      // Valores positivos seguem a lógica da variante
      if (variant === "filled") {
        textColor = "#ffffff";
      } else {
        textColor = "#374151";
      }
    }

    return (
      <g>
        <rect
          x={rectX}
          y={rectY}
          rx={pillHeight / 2}
          width={pillWidth}
          height={pillHeight}
          fill={rectFill}
          stroke={rectStroke}
          strokeWidth={rectStroke ? 1 : 0}
        />
        <text
          x={textX}
          y={textY - 3}
          fill={textColor}
          fontSize={13}
          fontWeight={700}
          textAnchor="middle"
          dominantBaseline="central"
          letterSpacing={0.2}
        >
          {text}
        </text>
      </g>
    );
  };
};

export type { LabelRendererProps };

export default renderPillLabel;
