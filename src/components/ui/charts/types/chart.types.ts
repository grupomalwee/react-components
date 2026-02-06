import { TimeSeriesConfig } from "../types";
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
export interface ChartProps<T extends ChartData = ChartData> {
  data: T[];
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
  /**
   * Formata valores exibidos no gráfico.
   *
   * **Pressione Ctrl+Espaço para ver:**
   * - Chaves dos seus dados
   * - Formatos predefinidos (R$, $, %, kg, km, etc.)
   *
   * @example
   * // Opção 1: Formatos predefinidos (recomendado)
   * valueFormatter={{ receita: "R$", taxa: "%", peso: "kg" }}
   *
   * @example
   * // Opção 2: Função customizada
   * valueFormatter={(props) => `R$ ${props.formattedValue}`}
   */
  valueFormatter?: ValueFormatterConfig | ValueFormatterMap<T>;
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

/**
 * Formatos predefinidos com posicionamento automático.
 * Use Ctrl+Espaço para ver todas as opções!
 *
 * Prefixos (antes do valor): "R$", "$", "€", "£"
 * Sufixos (depois do valor): "%", "kg", "km", "m", "L", "un", "t", "h", "min", "s"
 */
export type PredefinedFormat =
  | "R$" // Real brasileiro - antes: "R$ 1.234"
  | "$" // Dólar - antes: "$ 1,234"
  | "€" // Euro - antes: "€ 1.234"
  | "£" // Libra - antes: "£ 1,234"
  | "%" // Porcentagem - depois: "12,5%"
  | "kg" // Quilograma - depois: "10kg"
  | "km" // Quilômetro - depois: "100km"
  | "m" // Metro - depois: "5m"
  | "L" // Litro - depois: "2L"
  | "un" // Unidade - depois: "50un"
  | "t" // Tonelada - depois: "3t"
  | "h" // Hora - depois: "8h"
  | "min" // Minuto - depois: "30min"
  | "s"; // Segundo - depois: "45s";

/**
 * Tipo helper para extrair chaves de string de um objeto.
 * Usado para sugerir as chaves do data no IntelliSense.
 */
export type ExtractStringKeys<T> = {
  [K in keyof T]: T[K] extends string | number ? K : never;
}[keyof T];

/**
 * Tipo helper para criar um Record com sugestões de chaves.
 * Use Partial para tornar todas as propriedades opcionais.
 */
export type ValueFormatterMap<T extends Record<string, unknown>> = Partial<
  Record<ExtractStringKeys<T>, PredefinedFormat | string>
>;

/**
 * Configuração do valueFormatter.
 *
 * @example
 * // Opção 1: Objeto com formatos predefinidos (recomendado)
 * valueFormatter={{ receita: "R$", taxa: "%", peso: "kg" }}
 *
 * @example
 * // Opção 2: Função customizada
 * valueFormatter={(props) => `R$ ${props.formattedValue}`}
 */
export type ValueFormatterConfig =
  | ValueFormatterType
  | Record<string, PredefinedFormat | string>;

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
