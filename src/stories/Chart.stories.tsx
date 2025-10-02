import React from "react";
import Chart from "@/components/charts/Chart";
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
} from "@/components/ui/SelectBase";
import { ArrowClockwiseIcon, MinusIcon, PlusIcon } from "@phosphor-icons/react";

const sampleData = [
  { periodo: "Q1/24", receita: 4000, despesas: 2400, churn: 180 },
  { periodo: "Q2/24", receita: 5200, despesas: 3100, churn: 150 },
  { periodo: "Q3/24", receita: 6800, despesas: 3800, churn: 120 },
  { periodo: "Q4/24", receita: 7500, despesas: 4200, churn: 100 },
  { periodo: "Q1/25", receita: 8200, despesas: 4600, churn: 95 },
  { periodo: "Q2/25", receita: 9100, despesas: 5000, churn: 90 },
];

const negativeData = [
  { periodo: "Q1/24", receita: -2000, despesas: 1800, churn: 200 },
  { periodo: "Q2/24", receita: 3000, despesas: -800, churn: 180 },
  { periodo: "Q3/24", receita: 5500, despesas: 3200, churn: 150 },
  { periodo: "Q4/24", receita: 6800, despesas: 4100, churn: 120 },
];

const meta: Meta<typeof Chart> = {
  title: "charts/Chart",
  component: Chart,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Chart combinado que aceita barras, linhas e áreas em um único gráfico.",
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
    height: { control: { type: "number", min: 200, max: 600, step: 50 } },
    series: { control: "object" },
    labelMap: { control: "object" },
    xAxis: { control: "text" },
    data: { control: "object" },
    colors: { control: "object" },
    showLegend: { control: "boolean" },
    showGrid: { control: "boolean" },
  },
  args: {
    data: sampleData,
  },
};

export default meta;
type Story = StoryObj<typeof Chart>;

const Template = (args: React.ComponentProps<typeof Chart>) => (
  <div style={{ width: "900px", height: "420px" }}>
    <Chart {...args} />
  </div>
);

export const Default: Story = {
  name: "Padrão",
  render: Template,
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo básico com dados trimestrais. Use os controles para modificar as propriedades.",
      },
    },
  },
};

export const Combined: Story = {
  name: "Combinado",
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
          receita: "Receita",
          churn: "Churn",
        }}
        colors={["#ef4444", "#22c55e", "#6366f1"]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Combina barras, áreas e linhas em um único gráfico.",
      },
    },
  },
};

export const NegativeValues: Story = {
  name: "Valores Negativos",
  render: (args) => (
    <div style={{ width: "900px", height: "420px" }}>
      <Chart
        {...args}
        data={negativeData}
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
        story: "Exemplo com valores negativos para mostrar perdas e ajustes.",
      },
    },
  },
};

export const Playground: Story = {
  render: () => {
    const [data, setData] = React.useState(sampleData);
    const [height, setHeight] = React.useState(360);
    const [showGrid, setShowGrid] = React.useState(true);
    const [showLegend, setShowLegend] = React.useState(true);
    const [series, setSeries] = React.useState<{
      bar?: string[];
      line?: string[];
      area?: string[];
    }>({
      bar: ["despesas"],
      line: ["receita"],
    });
    const [colors, setColors] = React.useState([
      "#6366f1",
      "#10b981",
      "#f59e0b",
    ]);

    const addPoint = () => {
      const lastPeriod = data[data.length - 1]?.periodo || "Q1/25";
      const nextPeriod = `Q${(parseInt(lastPeriod.charAt(1)) % 4) + 1}/${
        parseInt(lastPeriod.slice(3)) + (lastPeriod.charAt(1) === "4" ? 1 : 0)
      }`;

      const newPoint = {
        periodo: nextPeriod,
        receita: Math.round(3000 + Math.random() * 6000),
        despesas: Math.round(2000 + Math.random() * 4000),
        churn: Math.round(80 + Math.random() * 120),
      };
      setData((prev) => [...prev, newPoint]);
    };

    const removePoint = () => {
      setData((prev) => prev.slice(0, -1));
    };

    const resetData = () => {
      setData(sampleData);
      setHeight(360);
      setShowGrid(true);
      setShowLegend(true);
      setSeries({ bar: ["despesas"], line: ["receita"] });
      setColors(["#6366f1", "#10b981", "#f59e0b"]);
    };

    const switchToNegative = () => {
      setData(negativeData);
    };

    const toggleSeriesType = (field: string, type: "bar" | "line" | "area") => {
      setSeries((prev) => {
        const newSeries: {
          bar?: string[];
          line?: string[];
          area?: string[];
        } = { ...prev };

        // Remove field from all types
        Object.keys(newSeries).forEach((key) => {
          const seriesKey = key as keyof typeof newSeries;
          newSeries[seriesKey] =
            newSeries[seriesKey]?.filter((f) => f !== field) || [];
        });

        // Add to selected type
        if (!newSeries[type]) newSeries[type] = [];
        newSeries[type] = [...(newSeries[type] || []), field];

        // Clean empty arrays
        Object.keys(newSeries).forEach((key) => {
          const seriesKey = key as keyof typeof newSeries;
          if (newSeries[seriesKey]?.length === 0) {
            delete newSeries[seriesKey];
          }
        });

        return newSeries;
      });
    };

    const getSeriesType = (field: string): "bar" | "line" | "area" | "none" => {
      if (series.bar?.includes(field)) return "bar";
      if (series.line?.includes(field)) return "line";
      if (series.area?.includes(field)) return "area";
      return "none";
    };

    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Controls */}
        <div
          style={{
            padding: 16,
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {/* Top row - Data controls */}
          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", gap: 8 }}>
              <ButtonBase onClick={addPoint} variant="default">
                <PlusIcon size={16} />
                Adicionar
              </ButtonBase>
              <ButtonBase onClick={removePoint} variant="outline">
                <MinusIcon size={16} />
                Remover
              </ButtonBase>
            </div>

            <ButtonBase onClick={switchToNegative} variant="outline">
              Dados Negativos
            </ButtonBase>

            <ButtonBase onClick={resetData} variant="ghost">
              <ArrowClockwiseIcon size={16} />
              Reset
            </ButtonBase>

            <div style={{ marginLeft: "auto", fontSize: 14, color: "#6b7280" }}>
              {data.length} pontos
            </div>
          </div>

          {/* Second row - Display controls */}
          <div
            style={{
              display: "flex",
              gap: 16,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                minWidth: 200,
              }}
            >
              <label
                style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}
              >
                Altura: {height}px
              </label>
              <SlideBase
                value={[height]}
                onValueChange={(v) => setHeight(v[0])}
                min={200}
                max={600}
              />
            </div>

            <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <CheckboxBase
                checked={showGrid}
                onCheckedChange={(checked) => setShowGrid(Boolean(checked))}
              />
              Grid
            </label>

            <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <CheckboxBase
                checked={showLegend}
                onCheckedChange={(checked) => setShowLegend(Boolean(checked))}
              />
              Legenda
            </label>
          </div>

          {/* Third row - Series controls */}
          <div
            style={{
              display: "flex",
              gap: 16,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {["receita", "despesas", "churn"].map((field) => (
              <div
                key={field}
                style={{ display: "flex", flexDirection: "column", gap: 4 }}
              >
                <label
                  style={{
                    fontSize: 12,
                    color: "#6b7280",
                    textTransform: "capitalize",
                  }}
                >
                  {field}
                </label>
                <SelectBase
                  value={getSeriesType(field)}
                  onValueChange={(value) => {
                    if (value !== "none") {
                      toggleSeriesType(field, value as "bar" | "line" | "area");
                    }
                  }}
                >
                  <SelectTriggerBase className="w-[100px]">
                    <SelectValueBase />
                  </SelectTriggerBase>
                  <SelectContentBase>
                    <SelectItemBase value="none">Nenhum</SelectItemBase>
                    <SelectItemBase value="bar">Barra</SelectItemBase>
                    <SelectItemBase value="line">Linha</SelectItemBase>
                    <SelectItemBase value="area">Área</SelectItemBase>
                  </SelectContentBase>
                </SelectBase>
              </div>
            ))}

            <div
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                marginLeft: 16,
              }}
            >
              {colors.map((color, i) => (
                <input
                  key={i}
                  type="color"
                  value={color}
                  onChange={(e) => {
                    const newColors = [...colors];
                    newColors[i] = e.target.value;
                    setColors(newColors);
                  }}
                  style={{
                    width: 32,
                    height: 32,
                    border: "2px solid #e5e7eb",
                    borderRadius: 6,
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Chart */}
        <div style={{ flex: 1, padding: 16 }}>
          <Chart
            data={data}
            height={height}
            showGrid={showGrid}
            showLegend={showLegend}
            series={series}
            xAxis="periodo"
            colors={colors}
            labelMap={{
              receita: "Receita",
              despesas: "Despesas",
              churn: "Churn",
            }}
          />
        </div>
      </div>
    );
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Playground interativo para experimentar com dados e configurações do chart.",
      },
    },
  },
};
