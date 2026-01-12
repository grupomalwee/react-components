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

export type valueFormatter = (value: string | number) => string | number;

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
}
