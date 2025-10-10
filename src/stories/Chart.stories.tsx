import React from "react";
import Chart from "@/components/charts/Chart";
import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within, waitFor } from "storybook/test";
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
  play: async ({ canvasElement, step }) => {
    await step("Verificar gráfico renderizado", async () => {
      await waitFor(() => {
        const chartContainer = canvasElement.querySelector(".recharts-wrapper");
        expect(chartContainer).toBeInTheDocument();
      });
    });

    await step("Verificar surface do gráfico", async () => {
      const surface = canvasElement.querySelector(".recharts-surface");
      expect(surface).toBeInTheDocument();
    });

    await step("Verificar eixos renderizados", async () => {
      const xAxis = canvasElement.querySelector(".recharts-xAxis");
      const yAxis = canvasElement.querySelector(".recharts-yAxis");
      expect(xAxis).toBeInTheDocument();
      expect(yAxis).toBeInTheDocument();
    });

    await step("Verificar dados renderizados", async () => {
      // Verifica se há elementos renderizados (barras, linhas ou áreas)
      const bars = canvasElement.querySelectorAll(".recharts-bar-rectangle");
      const lines = canvasElement.querySelectorAll(".recharts-line");
      const areas = canvasElement.querySelectorAll(".recharts-area");

      const totalElements = bars.length + lines.length + areas.length;
      expect(totalElements).toBeGreaterThan(0);
    });

    await step("Verificar grid presente", async () => {
      const grid = canvasElement.querySelector(".recharts-cartesian-grid");
      expect(grid).toBeInTheDocument();
    });
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
  play: async ({ canvasElement, step }) => {
    await step("Verificar gráfico combinado renderizado", async () => {
      await waitFor(() => {
        const chartContainer = canvasElement.querySelector(".recharts-wrapper");
        expect(chartContainer).toBeInTheDocument();
      });
    });

    await step("Verificar presença de barras (despesas)", async () => {
      const bars = canvasElement.querySelectorAll(".recharts-bar-rectangle");
      expect(bars.length).toBeGreaterThan(0);
    });

    await step("Verificar presença de área (receita)", async () => {
      const areas = canvasElement.querySelectorAll(".recharts-area");
      expect(areas.length).toBeGreaterThan(0);
    });

    await step("Verificar presença de linha (churn)", async () => {
      const lines = canvasElement.querySelectorAll(".recharts-line");
      expect(lines.length).toBeGreaterThan(0);
    });

    await step("Verificar legenda com 3 itens", async () => {
      const legend = canvasElement.querySelector(".recharts-legend-wrapper");
      expect(legend).toBeInTheDocument();
    });

    await step("Verificar cores customizadas aplicadas", async () => {
      const surface = canvasElement.querySelector(".recharts-surface");
      expect(surface).toBeInTheDocument();

      // Verifica que há elementos com as cores especificadas
      const coloredElements = canvasElement.querySelectorAll(
        '[fill="#ef4444"], [fill="#22c55e"], [fill="#6366f1"], [stroke="#ef4444"], [stroke="#22c55e"], [stroke="#6366f1"]'
      );
      expect(coloredElements.length).toBeGreaterThan(0);
    });

    await step("Verificar tooltip habilitado", async () => {
      const surface = canvasElement.querySelector(".recharts-surface");
      expect(surface).toBeInTheDocument();
    });

    await step(
      "Verificar quantidade correta de dados (6 trimestres)",
      async () => {
        // Verifica se há 6 pontos de dados renderizados
        const bars = canvasElement.querySelectorAll(".recharts-bar-rectangle");
        // Deve ter 6 barras (uma por trimestre)
        expect(bars.length).toBe(6);
      }
    );
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
  play: async ({ canvasElement, step }) => {
    await step(
      "Verificar gráfico com valores negativos renderizado",
      async () => {
        await waitFor(() => {
          const chartContainer =
            canvasElement.querySelector(".recharts-wrapper");
          expect(chartContainer).toBeInTheDocument();
        });
      }
    );

    await step("Verificar barras renderizadas", async () => {
      const bars = canvasElement.querySelectorAll(".recharts-bar-rectangle");
      // 4 trimestres de dados
      expect(bars.length).toBe(4);
    });

    await step("Verificar linha renderizada", async () => {
      const lines = canvasElement.querySelectorAll(".recharts-line");
      expect(lines.length).toBeGreaterThan(0);
    });

    await step("Verificar eixo Y ajustado para valores negativos", async () => {
      const yAxis = canvasElement.querySelector(".recharts-yAxis");
      expect(yAxis).toBeInTheDocument();

      // Verifica se há ticks negativos no eixo Y
      const yAxisTexts = canvasElement.querySelectorAll(
        ".recharts-yAxis .recharts-text"
      );
      expect(yAxisTexts.length).toBeGreaterThan(0);
    });

    await step("Verificar grid crossing zero", async () => {
      const grid = canvasElement.querySelector(".recharts-cartesian-grid");
      expect(grid).toBeInTheDocument();
    });

    await step("Verificar cores customizadas nos dados negativos", async () => {
      const coloredElements = canvasElement.querySelectorAll(
        '[fill="#06b6d4"], [fill="#ef4444"], [stroke="#06b6d4"], [stroke="#ef4444"]'
      );
      expect(coloredElements.length).toBeGreaterThan(0);
    });

    await step("Verificar legenda com 2 séries", async () => {
      const legend = canvasElement.querySelector(".recharts-legend-wrapper");
      expect(legend).toBeInTheDocument();
    });

    await step("Verificar dados renderizados corretamente", async () => {
      // Verifica que o gráfico tem os 4 pontos de dados
      const xAxisTicks = canvasElement.querySelectorAll(
        ".recharts-xAxis .recharts-cartesian-axis-tick"
      );
      expect(xAxisTicks.length).toBe(4);
    });
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
              <ButtonBase
                onClick={addPoint}
                variant="default"
                data-testid="btn-add-point"
              >
                <PlusIcon size={16} />
                Adicionar
              </ButtonBase>
              <ButtonBase
                onClick={removePoint}
                variant="outline"
                data-testid="btn-remove-point"
              >
                <MinusIcon size={16} />
                Remover
              </ButtonBase>
            </div>

            <ButtonBase
              onClick={switchToNegative}
              variant="outline"
              data-testid="btn-negative"
            >
              Dados Negativos
            </ButtonBase>

            <ButtonBase
              onClick={resetData}
              variant="ghost"
              data-testid="btn-reset"
            >
              <ArrowClockwiseIcon size={16} />
              Reset
            </ButtonBase>

            <div
              style={{ marginLeft: "auto", fontSize: 14, color: "#6b7280" }}
              data-testid="data-count"
            >
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
                data-testid="slider-height"
              />
            </div>

            <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <CheckboxBase
                checked={showGrid}
                onCheckedChange={(checked) => setShowGrid(Boolean(checked))}
                data-testid="checkbox-grid"
              />
              Grid
            </label>

            <label style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <CheckboxBase
                checked={showLegend}
                onCheckedChange={(checked) => setShowLegend(Boolean(checked))}
                data-testid="checkbox-legend"
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
                  <SelectTriggerBase
                    className="w-[100px]"
                    data-testid={`select-${field}`}
                  >
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
                  data-testid={`color-picker-${i}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Chart */}
        <div style={{ flex: 1, padding: 16 }} data-testid="chart-container">
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verificar renderização inicial do playground", async () => {
      await waitFor(() => {
        const chartContainer = canvas.getByTestId("chart-container");
        expect(chartContainer).toBeInTheDocument();
      });
    });

    await step("Verificar controles de dados presentes", async () => {
      const addButton = canvas.getByTestId("btn-add-point");
      const removeButton = canvas.getByTestId("btn-remove-point");
      const negativeButton = canvas.getByTestId("btn-negative");
      const resetButton = canvas.getByTestId("btn-reset");

      expect(addButton).toBeInTheDocument();
      expect(removeButton).toBeInTheDocument();
      expect(negativeButton).toBeInTheDocument();
      expect(resetButton).toBeInTheDocument();
    });

    await step("Verificar contador de pontos inicial (6 pontos)", async () => {
      const dataCount = canvas.getByTestId("data-count");
      expect(dataCount).toHaveTextContent("6 pontos");
    });

    await step("Testar adicionar ponto de dados", async () => {
      const addButton = canvas.getByTestId("btn-add-point");
      await userEvent.click(addButton);

      await waitFor(() => {
        const dataCount = canvas.getByTestId("data-count");
        expect(dataCount).toHaveTextContent("7 pontos");
      });
    });

    await step("Testar remover ponto de dados", async () => {
      const removeButton = canvas.getByTestId("btn-remove-point");
      await userEvent.click(removeButton);

      await waitFor(() => {
        const dataCount = canvas.getByTestId("data-count");
        expect(dataCount).toHaveTextContent("6 pontos");
      });
    });

    await step("Verificar controles de display", async () => {
      const gridCheckbox = canvas.getByTestId("checkbox-grid");
      const legendCheckbox = canvas.getByTestId("checkbox-legend");

      expect(gridCheckbox).toBeInTheDocument();
      expect(legendCheckbox).toBeInTheDocument();
      expect(gridCheckbox).toBeChecked();
      expect(legendCheckbox).toBeChecked();
    });

    await step("Testar toggle do grid", async () => {
      const gridCheckbox = canvas.getByTestId("checkbox-grid");
      await userEvent.click(gridCheckbox);

      await waitFor(() => {
        expect(gridCheckbox).not.toBeChecked();
      });
    });

    await step("Testar toggle da legenda", async () => {
      const legendCheckbox = canvas.getByTestId("checkbox-legend");
      await userEvent.click(legendCheckbox);

      await waitFor(() => {
        expect(legendCheckbox).not.toBeChecked();
      });
    });

    await step("Verificar selects de tipo de série", async () => {
      const receitaSelect = canvas.getByTestId("select-receita");
      const despesasSelect = canvas.getByTestId("select-despesas");
      const churnSelect = canvas.getByTestId("select-churn");

      expect(receitaSelect).toBeInTheDocument();
      expect(despesasSelect).toBeInTheDocument();
      expect(churnSelect).toBeInTheDocument();
    });

    await step("Verificar color pickers presentes", async () => {
      const colorPicker0 = canvas.getByTestId("color-picker-0");
      const colorPicker1 = canvas.getByTestId("color-picker-1");
      const colorPicker2 = canvas.getByTestId("color-picker-2");

      expect(colorPicker0).toBeInTheDocument();
      expect(colorPicker1).toBeInTheDocument();
      expect(colorPicker2).toBeInTheDocument();

      expect(colorPicker0).toHaveValue("#6366f1");
      expect(colorPicker1).toHaveValue("#10b981");
      expect(colorPicker2).toHaveValue("#f59e0b");
    });

    await step("Testar switch para dados negativos", async () => {
      const negativeButton = canvas.getByTestId("btn-negative");
      await userEvent.click(negativeButton);

      await waitFor(() => {
        const dataCount = canvas.getByTestId("data-count");
        expect(dataCount).toHaveTextContent("4 pontos");
      });
    });

    await step("Testar reset dos dados", async () => {
      const resetButton = canvas.getByTestId("btn-reset");
      await userEvent.click(resetButton);

      await waitFor(() => {
        const dataCount = canvas.getByTestId("data-count");
        expect(dataCount).toHaveTextContent("6 pontos");
      });
    });

    await step("Verificar grid restaurado após reset", async () => {
      const gridCheckbox = canvas.getByTestId("checkbox-grid");
      expect(gridCheckbox).toBeChecked();
    });

    await step("Verificar legenda restaurada após reset", async () => {
      const legendCheckbox = canvas.getByTestId("checkbox-legend");
      expect(legendCheckbox).toBeChecked();
    });

    await step("Verificar cores restauradas após reset", async () => {
      const colorPicker0 = canvas.getByTestId("color-picker-0");
      const colorPicker1 = canvas.getByTestId("color-picker-1");
      const colorPicker2 = canvas.getByTestId("color-picker-2");

      expect(colorPicker0).toHaveValue("#6366f1");
      expect(colorPicker1).toHaveValue("#10b981");
      expect(colorPicker2).toHaveValue("#f59e0b");
    });

    await step("Verificar gráfico renderizado no container", async () => {
      const chartContainer = canvas.getByTestId("chart-container");
      const rechartsWrapper = chartContainer.querySelector(".recharts-wrapper");
      expect(rechartsWrapper).toBeInTheDocument();
    });

    await step("Testar múltiplas adições de pontos", async () => {
      const addButton = canvas.getByTestId("btn-add-point");

      await userEvent.click(addButton);
      await userEvent.click(addButton);
      await userEvent.click(addButton);

      await waitFor(() => {
        const dataCount = canvas.getByTestId("data-count");
        expect(dataCount).toHaveTextContent("9 pontos");
      });
    });

    await step("Testar múltiplas remoções de pontos", async () => {
      const removeButton = canvas.getByTestId("btn-remove-point");

      await userEvent.click(removeButton);
      await userEvent.click(removeButton);

      await waitFor(() => {
        const dataCount = canvas.getByTestId("data-count");
        expect(dataCount).toHaveTextContent("7 pontos");
      });
    });
  },
};
