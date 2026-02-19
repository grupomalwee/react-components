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

  width?: number | string;
  height?: number;
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
  timeSeries?: boolean | TimeSeriesConfig;
  timeSeriesLegend?: string;
  customLegend?: boolean;
  labelsVisibility?: { bar: boolean; line: boolean; area: boolean };
  horizontal?: boolean;
  orderBy?: string;
}

export interface SeriesConfig {
  bar?: string[];
  line?: string[];
  area?: string[];
}

export type SeriesOrder = {
  type: "bar" | "line" | "area";
  key: string;
};

export type PropsLabelList = {
  height?: number | string;
  width?: number | string;
  x?: number | string;
  y?: number | string;
  value?: number | string;
  payload?: Record<string, unknown>;
};

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
export type Primitive = string | number | boolean | null | undefined;

export interface XAxisConfig {
  dataKey: string;
  label?: string;
  valueFormatter?: (value: string | number) => string;
  autoLabel?: boolean;
}

export type ValueFormatter = (value: string | number) => string | number;
export type FinalValueFormatter = (
  value: number | string | null | undefined,
) => string;

export type SeriesEntry = { type: "bar" | "line" | "area"; key: string };
export type SeriesCounts = { bar: number; line: number; area: number };

export type YAxisSide = "left" | "right";
export type YAxisMap = Record<string, YAxisSide>;

export interface MapperConfigEntry {
  label?: string;
  valueFormatter?: ValueFormatter;
  color?: string;
  type?: "number" | "string" | "auto";
  visible?: boolean;
}
export type MapperConfig = Record<string, MapperConfigEntry>;

export interface YAxisOptions {
  label?: string;
  stroke?: string;
  width?: number;
  percent?: boolean;
  percentDecimals?: number;
}
export type YAxes = Partial<{ left: YAxisOptions; right: YAxisOptions }>;

export interface TooltipItem {
  id: string;
  data: ChartData;
  position: { top: number; left: number };
}

export type TooltipAdaptedRow = Record<string, string | number> & {
  name: string;
};

export interface TimeSeriesConfig {
  start?: number;
  end?: number;
  onRangeChange?: (startIndex: number, endIndex: number) => void;
  height?: number;
  brushColor?: string;
  brushStroke?: string;
  miniChartOpacity?: number;
  chartHeight?: number;
}

export interface ChartHooksArgs {
  width?: number | string;
  measuredWidth?: number | null;
  points?: number;
  seriesCounts?: SeriesCounts;
  niceMax?: number;
  yAxes?: YAxes;
  yAxisLabel?: string;
  chartMargin?: Partial<{
    top: number;
    right: number;
    left: number;
    bottom: number;
  }>;
  showLabels?: boolean;
  timeSeries?: boolean | TimeSeriesConfig;
  timeSeriesLegend?: string;
  customLegend?: boolean;
}

export interface LegendItem {
  label: string;
  value: string | number;
  color?: string;
  trend?: {
    value?: number;
    label?: string;
    positive?: boolean;
    neutral?: boolean;
  };
}
