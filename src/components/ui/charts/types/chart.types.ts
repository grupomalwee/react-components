import { valueFormatter } from "../utils";
export interface ChartData {
  [key: string]: string | number | boolean | null | undefined;
}
export interface XAxisConfig {
  dataKey: string;
  label?: string;
  valueFormatter?: (value: string | number) => string;
  autoLabel?: boolean;
}
export interface DataMapper {
  [dataKey: string]: {
    label?: string;
    valueFormatter?: (value: string | number) => string | number;
    color?: string;
    type?: "number" | "string" | "auto";
    visible?: boolean;
  };
}
export interface BiaxialConfig {
  key: string[];
  label?: string;
  percentage?: boolean;
  decimals?: number;
  stroke?: string | Record<string, string>;
}
export type SeriesProp = {
  bar?: string[];
  line?: string[];
  area?: string[];
};
export interface ChartProps {
  data: ChartData[];
  series?: SeriesProp;
  className?: string;
  chartMargin?: Partial<{
    top: number;
    right: number;
    left: number;
    bottom: number;
  }>;
  height?: number;
  width?: number | string;
  colors?: string[];
  gridColor?: string;
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  title?: string;
  titlePosition?: "left" | "center" | "right";
  showLabels?: boolean;
  labelMap?: Record<string, string>;
  valueFormatter?: valueFormatter;
  categoryFormatter?: (value: string | number) => string;
  periodLabel?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  xAxis?: XAxisConfig | string;
  biaxial?: BiaxialConfig | string | string[];
  enableHighlights?: boolean;
  enableShowOnly?: boolean;
  enablePeriodsDropdown?: boolean;
  enableDraggableTooltips?: boolean;
  showTooltipTotal?: boolean;
  maxTooltips?: number;
  formatBR?: boolean;
  legendUppercase?: boolean;
  isLoading?: boolean;
}

export interface SeriesConfig {
  bar?: string[];
  line?: string[];
  area?: string[];
}

export type SeriesOrder = {
  type: "bar" | "line" | "area";
  key: string
}

export type PropsLabelList = {
  height?: number | string;
  width?: number | string;
  x?: number | string;
  y?: number | string;
  value?: number | string;
  payload?: Record<string, unknown>;
}

export type ValueFormatterType = (props: {
  value: number | string | undefined;
  formattedValue: string;
  [key: string]: unknown;
}) => string;

export type Padding =
  | number
  | Partial<{ left: number; right: number; top: number; bottom: number }>;

export type Margins = Partial<{
  top: number;
  right: number;
  left: number;
  bottom: number;
}>;

export type LabelListContent = (props: unknown) => React.ReactNode;