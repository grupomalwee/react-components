
export type Primitive = string | number | boolean | null | undefined;

export interface ChartData {
  [key: string]: Primitive;
  name?: string;
}

export interface XAxisConfig {
  dataKey: string;
  label?: string;
  valueFormatter?: (value: string | number) => string;
  autoLabel?: boolean;
}

export type ValueFormatter = (value: string | number) => string | number;
export type FinalValueFormatter = (
  value: number | string | null | undefined
) => string;

export type SeriesProp = {
  bar?: string[];
  line?: string[];
  area?: string[];
};

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
  showLegend?: boolean;
  xAxisLabel?: string;
}
