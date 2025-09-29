import React from "react";
import Chart from "@/components/rechart/Chart";
import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ButtonBase } from "@/components/ui/ButtonBase";
import { CheckboxBase } from "@/components/ui/CheckBoxBase";
import { SlideBase } from "@/components/ui/SliderBase";
import {
  SelectBase,
  SelectTriggerBase,
  SelectContentBase,
  SelectItemBase,
  SelectValueBase,
  SelectGroupBase,
  SelectLabelBase,
} from "@/components/ui/SelectBase";

const sampleQuarterData = [
  {
    trimestre: "Q1/2024",
    receita: -4000,
    despesas: 2400,

    churn: 180,
  },
  {
    trimestre: "Q2/2024",
    receita: 5200,
    despesas: 3100,

    churn: 150,
  },
  {
    trimestre: "Q3/2024",
    receita: 6800,
    despesas: 3800,

    churn: 120,
  },
  {
    trimestre: "Q4/2024",
    receita: 7500,
    despesas: 4200,

    churn: 100,
  },

  {
    trimestre: "Q1/2025",
    receita: 8200,
    despesas: 4600,

    churn: 95,
  },
  {
    trimestre: "Q2/2025",
    receita: 9100,
    despesas: 5000,

    churn: 90,
  },
  {
    trimestre: "Q3/2025",
    receita: 10000,
    despesas: 5600,

    churn: 80,
  },
  {
    trimestre: "Q4/2025",
    receita: 11200,
    despesas: 6000,

    churn: 75,
  },
];

const meta: Meta<typeof Chart> = {
  title: "charts/Chart",
  component: Chart,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Composed chart que aceita a prop `series` para combinar `bar`, `line` e `area` em um único gráfico. Agora com mais métricas e datasets multi-ano para análises mais ricas.",
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f6f6f6" },
        { name: "dark", value: "#222" },
      ],
    },
    layout: "centered",
  },
  argTypes: {
    height: { control: { type: "number", min: 200, max: 800, step: 50 } },
    series: {
      control: "object",
      description: "Defina séries: { bar: [...], line: [...], area: [...] }",
    },
    labelMap: { control: "object" },
    xAxis: { control: "text" },
    data: { control: "object" },
    colors: { control: "object" },
    showLegend: { control: "boolean" },
    showGrid: { control: "boolean" },
  },
  args: {
    showGrid: true,
    showTooltip: true,
    showLegend: true,
    data: sampleQuarterData,
    xAxis: "trimestre",
  },
};

export default meta;
type Story = StoryObj<typeof Chart>;

// Helper template to ensure ResponsiveContainer has explicit space in Storybook
const Template = (args: React.ComponentProps<typeof Chart>) => (
  <div style={{ width: "900px", height: "420px" }}>
    <Chart {...args} />
  </div>
);

export const Default: Story = {
  name: "Default ( controls)",
  render: Template,
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo padrão com dados trimestrais. Use os controles (painel `Controls`) para modificar `series`, `colors`, `height`, `showGrid` e outras props em tempo real.",
      },
    },
  },
};

export const BarsAndLine: Story = {
  name: "Bars + Line",
  render: (args) => (
    <div style={{ width: "900px", height: "420px" }}>
      <Chart
        {...args}
        height={350}
        series={{
          bar: ["despesas"],
          area: ["receita"],
          line: ["churn"],
        }}
        labelMap={{
          despesas: "Despesas",
          lucro: "Lucro",
          positivacao: "Positivação",
          vendas: "Vendas",
        }}
        colors={["#ef4444", "#22c55e", "#6366f1", "#06b6d4"]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Combina barras para `despesas`, áreas para `lucro` e `positivacao` e uma linha para `vendas`.",
      },
    },
  },
};

export const BarAndArea: Story = {
  name: "Bar + Area",
  render: (args) => (
    <div style={{ width: "900px", height: "420px" }}>
      <Chart
        {...args}
        height={350}
        series={{ bar: ["despesas"], area: ["receita"] }}
        labelMap={{ despesas: "Despesas", lucro: "Lucro" }}
        colors={["#f97316", "#10b981"]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo simples com barras e área — útil para comparações entre categorias e tendência acumulada.",
      },
    },
  },
};

export const BarLineArea: Story = {
  name: "Bar + Line + Area",
  render: (args) => (
    <div style={{ width: "900px", height: "420px" }}>
      <Chart
        {...args}
        height={350}
        series={{ bar: ["despesas"], area: ["receita"], line: ["churn"] }}
        labelMap={{ despesas: "Despesas", lucro: "Lucro", vendas: "Vendas" }}
        colors={["#f43f5e", "#3b82f6", "#22c55e"]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Combinação típica: barras para volume, linha para indicador e área para métrica adicional.",
      },
    },
  },
};

const negativeValuesData = sampleQuarterData.map((row, idx) => ({
  ...row,
  receita: idx === 2 ? -1200 : row.receita,
  despesas: idx === 5 ? -800 : row.despesas,
}));

const zeroValuesData = sampleQuarterData.map((row, idx) => ({
  ...row,
  receita: idx % 2 === 0 ? 0 : row.receita,
  despesas: idx % 3 === 0 ? 0 : row.despesas,
}));

// Many points: gera dados mensais ao invés de trimestrais
const manyPointsData = Array.from({ length: 36 }).map((_, i) => ({
  periodo: `M${i + 1}`,
  receita: Math.round(3000 + Math.sin(i / 3) * 1200 + i * 15),
  despesas: Math.round(1800 + Math.cos(i / 4) * 900 + i * 8),
  churn: Math.round(100 - ((i * 0.5) % 80)),
}));

const singlePointData = [
  { trimestre: "Q1/2026", receita: 5000, despesas: 2000, churn: 120 },
];


const mixedTypesData = [
  { label: "A", value: 1200 },
  { label: "B", value: 0 },
  { label: "C", value: -300 },
  { label: "D", value: 800 },
  { label: "E", value: 2400 },
];


export const NegativeValues: Story = {
  render: (args) => (
    <div style={{ width: "900px", height: "420px" }}>
      <Chart
        {...args}
        data={negativeValuesData}
        height={360}
        series={{ bar: ["despesas"], line: ["receita"] }}
        labelMap={{ receita: "Receita", despesas: "Despesas" }}
        colors={["#06b6d4", "#ef4444"]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Dados contendo valores negativos — útil para perdas e ajustes.",
      },
    },
  },
};

export const ManyPoints: Story = {
  render: (args) => (
    <div style={{ width: "1200px", height: "480px" }}>
      <Chart
        {...args}
        data={manyPointsData}
        height={420}
        xAxis="periodo"
        series={{ line: ["receita"], area: ["despesas"], bar: ["churn"] }}
        labelMap={{ receita: "Receita", despesas: "Despesas", churn: "Churn" }}
        colors={["#6366f1", "#10b981", "#f59e0b"]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Grande série de pontos (36) para testar desempenho e renderização de muitos ticks no eixo X.",
      },
    },
  },
};

export const SinglePoint: Story = {
  render: (args) => (
    <div style={{ width: "600px", height: "360px" }}>
      <Chart
        {...args}
        data={singlePointData}
        height={300}
        series={{ bar: ["despesas"], line: ["receita"] }}
        labelMap={{ receita: "Receita", despesas: "Despesas" }}
        colors={["#06b6d4", "#ef4444"]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Apenas um ponto — verifica se o componente lida com datasets minimalistas.",
      },
    },
  },
};

export const MixedTypes: Story = {
  render: (args) => (
    <div style={{ width: "700px", height: "380px" }}>
      <Chart
        {...args}
        data={mixedTypesData}
        height={340}
        xAxis="label"
        series={{ bar: ["value"] }}
        labelMap={{ value: "Valor" }}
        colors={["#8b5cf6"]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Dados mistos com zeros e negativos para testar tooltips e formatação.",
      },
    },
  },
};

export const Playground: Story = {
  name: "Playground (interactive)",
  render: (args) => {
  type Row = { trimestre?: string; periodo?: string; receita?: number; despesas?: number; churn?: number };
  const [data, setData] = React.useState<Row[]>(sampleQuarterData.slice(0, 4));
    const [showGrid, setShowGrid] = React.useState(true);
    const [showLegend, setShowLegend] = React.useState(true);
    const [height, setHeight] = React.useState(360);
    const [series, setSeries] = React.useState<{
      bar?: string[];
      line?: string[];
      area?: string[];
    }>({ bar: ["despesas"], line: ["receita"] });

    // extra header controls
    const [datasetPreset, setDatasetPreset] = React.useState<'quarter'|'many'|'single'|'zeros'>('quarter');
    const [seriesPreset, setSeriesPreset] = React.useState<'default'|'bars'|'line'|'area'>('default');
    const [showTooltipLocal, ] = React.useState(true);
    const [showLabelsLocal, ] = React.useState(false);
    const [xAxisField, setXAxisField] = React.useState<string>('trimestre');
    const [colorPreset, setColorPreset] = React.useState<'default'|'warm'|'cool'>('default');
    const [colorsState, setColorsState] = React.useState<string[]>(["#6366f1", "#10b981", "#f59e0b"]);

    // apply dataset presets
    React.useEffect(() => {
      switch (datasetPreset) {
        case 'quarter':
          setData(sampleQuarterData.slice(0, 4));
          setXAxisField('trimestre');
          break;
        case 'many':
          // convert periodo -> trimestre for a consistent key used in chart by default
          setData(manyPointsData.map((r) => ({ ...r, trimestre: r.periodo })));
          setXAxisField('periodo');
          break;
        case 'single':
          setData(singlePointData);
          setXAxisField('trimestre');
          break;
        case 'zeros':
          setData(zeroValuesData);
          setXAxisField('trimestre');
          break;
      }
    }, [datasetPreset]);

    // apply series presets
    React.useEffect(() => {
      switch (seriesPreset) {
        case 'default':
          setSeries({ bar: ['despesas'], line: ['receita'] });
          break;
        case 'bars':
          setSeries({ bar: ['despesas', 'receita'] });
          break;
        case 'line':
          setSeries({ line: ['receita', 'churn'] });
          break;
        case 'area':
          setSeries({ area: ['receita'] });
          break;
      }
    }, [seriesPreset]);

    // color presets
    React.useEffect(() => {
      if (colorPreset === 'default') setColorsState(['#6366f1', '#10b981', '#f59e0b']);
      if (colorPreset === 'warm') setColorsState(['#f97316', '#ef4444', '#f43f5e']);
      if (colorPreset === 'cool') setColorsState(['#06b6d4', '#6366f1', '#8e68ff']);
    }, [colorPreset]);

    const addPoint = () => {
      const nextIndex = data.length + 1;
      const newPoint = {
        trimestre: `Q${nextIndex}/2026`,
        receita: Math.round(2000 + Math.random() * 8000),
        despesas: Math.round(1000 + Math.random() * 6000),
        churn: Math.round(50 + Math.random() * 150),
      };
      setData((d) => [...d, newPoint]);
    };

    const removeLast = () => setData((d) => d.slice(0, -1));

    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: 16,
            display: "flex",
            gap: 12,
            alignItems: "center",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ display: "flex", gap: 8, alignItems: 'center' }}>
            <ButtonBase variant="default" onClick={addPoint}>Adicionar ponto</ButtonBase>
            <ButtonBase variant="outline" onClick={removeLast}>Remover último</ButtonBase>

            <SelectBase value={datasetPreset} onValueChange={(v) => setDatasetPreset(v as 'quarter'|'many'|'single'|'zeros')}>
              <SelectTriggerBase className="w-[160px]">
                <SelectValueBase />
              </SelectTriggerBase>
              <SelectContentBase>
                <SelectGroupBase>
                  <SelectLabelBase>Dataset</SelectLabelBase>
                  <SelectItemBase value="quarter">Quarter (4)</SelectItemBase>
                  <SelectItemBase value="many">Many (36)</SelectItemBase>
                  <SelectItemBase value="single">Single</SelectItemBase>
                  <SelectItemBase value="zeros">Zeros</SelectItemBase>
                </SelectGroupBase>
              </SelectContentBase>
            </SelectBase>

            <SelectBase value={seriesPreset} onValueChange={(v) => setSeriesPreset(v as 'default'|'bars'|'line'|'area')}>
              <SelectTriggerBase className="w-[140px]">
                <SelectValueBase />
              </SelectTriggerBase>
              <SelectContentBase>
                <SelectGroupBase>
                  <SelectLabelBase>Series</SelectLabelBase>
                  <SelectItemBase value="default">Default</SelectItemBase>
                  <SelectItemBase value="bars">Bars</SelectItemBase>
                  <SelectItemBase value="line">Line</SelectItemBase>
                  <SelectItemBase value="area">Area</SelectItemBase>
                </SelectGroupBase>
              </SelectContentBase>
            </SelectBase>

            <SelectBase value={xAxisField} onValueChange={(v) => setXAxisField(v)}>
              <SelectTriggerBase className="w-[160px]">
                <SelectValueBase />
              </SelectTriggerBase>
              <SelectContentBase>
                <SelectGroupBase>
                  <SelectLabelBase>X Axis</SelectLabelBase>
                  {/* derive options from first row keys */}
                  {Object.keys(data[0] || {}).map((k) => (
                    <SelectItemBase key={k} value={k}>{k}</SelectItemBase>
                  ))}
                </SelectGroupBase>
              </SelectContentBase>
            </SelectBase>

            <SelectBase value={colorPreset} onValueChange={(v) => setColorPreset(v as 'default'|'warm'|'cool')}>
              <SelectTriggerBase className="w-[120px]">
                <SelectValueBase />
              </SelectTriggerBase>
              <SelectContentBase>
                <SelectGroupBase>
                  <SelectLabelBase>Colors</SelectLabelBase>
                  <SelectItemBase value="default">Default</SelectItemBase>
                  <SelectItemBase value="warm">Warm</SelectItemBase>
                  <SelectItemBase value="cool">Cool</SelectItemBase>
                </SelectGroupBase>
              </SelectContentBase>
            </SelectBase>
          </div>
          <div
            style={{
              marginLeft: 12,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontSize: 12, color: "var(--muted, #6b7280)" }}>
                Height: {height}px
              </label>
              <div style={{ width: 260 }}>
                <SlideBase
                  value={[height]}
                  onValueChange={(v) => setHeight(Number(v[0]))}
                  min={240}
                  max={720}
                />
              </div>
            </div>
            <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <CheckboxBase
                checked={showGrid}
                onCheckedChange={(v) => setShowGrid(Boolean(v))}
              />
              <span>Mostrar Grid</span>
            </label>
            <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <CheckboxBase
                checked={showLegend}
                onCheckedChange={(v) => setShowLegend(Boolean(v))}
              />
              <span>Mostrar Legenda</span>
            </label>
            <h1 style={{ marginTop: 0 }}> | Séries</h1>
            <div style={{ display: "flex", flexDirection: "row", gap: 8, alignContent: "center" }}>
              {["receita", "despesas", "churn"].map((k) => (
                <label
                  key={k}
                  style={{ display: "flex", gap: 8, alignItems: "center" }}
                >
                  <CheckboxBase
                    checked={
                      (series.bar || []).includes(k) ||
                      (series.line || []).includes(k) ||
                      (series.area || []).includes(k)
                    }
                    onCheckedChange={() => {
                      if ((series.bar || []).includes(k)) {
                        setSeries((s) => ({
                          ...s,
                          bar: (s.bar || []).filter((x) => x !== k),
                          line: [...(s.line || []), k],
                        }));
                      } else if ((series.line || []).includes(k)) {
                        setSeries((s) => ({
                          ...s,
                          line: (s.line || []).filter((x) => x !== k),
                          area: [...(s.area || []), k],
                        }));
                      } else if ((series.area || []).includes(k)) {
                        setSeries((s) => ({
                          ...s,
                          area: (s.area || []).filter((x) => x !== k),
                        }));
                      } else {
                        setSeries((s) => ({
                          ...s,
                          bar: [...(s.bar || []), k],
                        }));
                      }
                    }}
                  />
                  <span style={{ textTransform: "capitalize" }}>{k}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div>

          <main style={{ flex: 1 }}>
            <div style={{ width: "100%", height }}>
              <Chart
                {...args}
                data={data}
                height={height}
                showGrid={showGrid}
                showLegend={showLegend}
                series={series}
                xAxis={xAxisField || args.xAxis || "trimestre"}
                showTooltip={showTooltipLocal}
                showLabels={showLabelsLocal}
                colors={colorsState}
              />
            </div>
          </main>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Playground interativo para experimentar dados e séries em tempo real.",
      },
    },
  },
};

// Ajuste de layout: usar fullscreen para evitar centralização global do story
Playground.parameters = {
  layout: "fullscreen",
};
