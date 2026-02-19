import React from "react";
import Chart from "@/components/ui/charts/Chart";
import "../../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";
import { Leaderboard } from "@/components/ui/LeaderBoard";
import { CardBase } from "@/components/ui/data/CardBase";

const sampleData = [
  { periodo: "Jan/24", receita: 4200, despesas: 2800, churn: 180 },
  { periodo: "Fev/24", receita: 5100, despesas: 3200, churn: 165 },
  { periodo: "Mar/24", receita: 6800, despesas: 3900, churn: 142 },
  { periodo: "Abr/24", receita: 7500, despesas: 4300, churn: 128 },
];

const negativeData = [
  { periodo: "Q1/24", receita: -2000, despesas: 1800, churn: 200 },
  { periodo: "Q2/24", receita: 3500, despesas: -1200, churn: 170 },
  { periodo: "Q3/24", receita: 5800, despesas: 3400, churn: 140 },
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
      source: {
        code: `import React from 'react';
import Chart from '@mlw-packages/react-components';

const sampleData = [
  { periodo: 'Jan/24', receita: 4200, despesas: 2800, churn: 180 },
  { periodo: 'Fev/24', receita: 5100, despesas: 3200, churn: 165 },
];

export default function Example() {
  return (
    <div style={{ width: 900, height: 420 }}>
      <Chart data={sampleData} xAxis="periodo" series={{ bar: ['despesas'] }} labelMap={{ despesas: 'Despesas' }} className="h-[360px]" />
    </div>
  );
}
`,
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
    data: { control: "object", description: "Dados do gráfico" },
    series: {
      control: "object",
      description: "Configuração das séries (bar, line, area)",
    },
    className: { control: "text", description: "Classes CSS adicionais" },
    chartMargin: {
      control: "object",
      description: "Margens do gráfico (top, right, bottom, left)",
    },

    width: {
      control: "text",
      description: "Largura do gráfico (número ou string)",
    },
    colors: {
      control: "object",
      description: "Array de cores para as séries",
    },
    gridColor: { control: "color", description: "Cor da grade" },
    showGrid: { control: "boolean", description: "Mostrar grade" },
    showTooltip: { control: "boolean", description: "Mostrar tooltip" },
    showLegend: { control: "boolean", description: "Mostrar legenda" },
    title: { control: "text", description: "Título do gráfico" },
    titlePosition: {
      control: "select",
      options: ["left", "center", "right"],
      description: "Posição do título",
    },
    showLabels: {
      control: "boolean",
      description: "Mostrar labels nos dados",
    },
    labelsVisibility: {
      control: "object",
      description: "Controlar quais tipos de label mostrar (bar, line, area)",
    },
    labelMap: {
      control: "object",
      description: "Mapeamento de labels customizados",
    },
    valueFormatter: {
      control: "object",
      description: "Função customizada para formatar valores",
    },
    categoryFormatter: {
      control: "object",
      description: "Função para formatar categorias",
    },
    periodLabel: {
      control: "text",
      description: "Label para o período no tooltip",
    },
    xAxisLabel: { control: "text", description: "Label do eixo X" },
    yAxisLabel: { control: "text", description: "Label do eixo Y" },
    xAxis: {
      control: "object",
      description: "Configuração do eixo X (string ou XAxisConfig)",
    },
    biaxial: {
      control: "object",
      description: "Configuração de eixo Y duplo",
    },
    enableHighlights: {
      control: "boolean",
      description: "Habilitar destaque de séries",
    },
    enableShowOnly: {
      control: "boolean",
      description: "Habilitar mostrar apenas série selecionada",
    },
    enablePeriodsDropdown: {
      control: "boolean",
      description: "Habilitar dropdown de períodos",
    },
    enableDraggableTooltips: {
      control: "boolean",
      description: "Habilitar tooltips arrastáveis",
    },
    showTooltipTotal: {
      control: "boolean",
      description: "Mostrar total no tooltip",
    },
    maxTooltips: {
      control: { type: "number", min: 1, max: 10 },
      description: "Número máximo de tooltips arrastáveis",
    },
    formatBR: {
      control: "boolean",
      description: "Formatar valores no padrão brasileiro (pt-BR)",
    },
    legendUppercase: {
      control: "boolean",
      description: "Legendas em maiúsculas",
    },
    horizontal: {
      control: "boolean",
      description: "Inverter orientação do gráfico para barras horizontais",
    },
  },
  args: {
    data: sampleData,
    xAxis: "periodo",
  },
};

export default meta;
type Story = StoryObj<typeof Chart>;

const Template = (args: React.ComponentProps<typeof Chart>) => (
  <div style={{ width: "900px" }}>
    <Chart {...args} />
  </div>
);

export const Default: Story = {
  name: "Padrão",
  render: Template,
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import Chart from '@mlw-packages/react-components';

const sampleData = [
  { periodo: 'Jan/24', receita: 4200, despesas: 2800, churn: 180 },
  { periodo: 'Fev/24', receita: 5100, despesas: 3200, churn: 165 },
  { periodo: 'Mar/24', receita: 6800, despesas: 3900, churn: 142 },
  { periodo: 'Abr/24', receita: 7500, despesas: 4300, churn: 128 },
];

export default function Default() {
  return (
    <div style={{ width: 900, height: 420 }}>
      <Chart data={sampleData} xAxis="periodo" className="h-[360px]" />
    </div>
  );
}
`,
      },
    },
  },
};

export const Combined: Story = {
  name: "Combinado",
  render: (args) => (
    <div style={{ width: "900px", height: "350px" }}>
      <Chart
        {...args}
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

export const Biaxial: Story = {
  name: "Eixo Duplo",
  render: (args) => (
    <div style={{ width: "900px", height: "350px" }}>
      <Chart
        {...args}
        xAxis="periodo"
        series={{ bar: ["receita", "despesas"], area: ["churn"] }}
        labelMap={{ receita: "Receita", despesas: "Despesas", churn: "Churn" }}
        yAxisLabel="Valor (R$)"
        biaxial={{ key: ["churn"], label: "Churn (%)", percentage: true }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo demonstrando o uso de `biaxial` para mapear `churn` ao eixo direito (com sufixo `%`).",
      },
    },
  },
};

export const NegativeValues: Story = {
  name: "Com Negativos",
  render: (args) => (
    <div style={{ width: "900px", height: "350px" }}>
      <Chart
        {...args}
        data={negativeData}
        className="h-[360px]"
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

export const FormatBR: Story = {
  name: "Formato pt-BR",
  render: (args) => (
    <div style={{ width: "900px", height: "350px" }}>
      <Chart
        {...args}
        className="h-[360px]"
        series={{ bar: ["receita", "despesas"] }}
        labelMap={{ receita: "Receita", despesas: "Despesas" }}
        xAxis="periodo"
        formatBR
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo que ativa a prop `formatBR` para formatar valores no padrão pt-BR (ex.: 12.345,67)",
      },
    },
  },
};

export const CustomFormatterPerKey: Story = {
  name: "Formatador",
  render: (args) => {
    const metricsData = [
      { mes: "Jan", receita: 15000, despesas: 8900, taxa: 85, peso: 1200 },
      { mes: "Fev", receita: 22000, despesas: 12000, taxa: 92, peso: 1800 },
      { mes: "Mar", receita: 18000, despesas: 9500, taxa: 88, peso: 1500 },
      { mes: "Abr", receita: 28000, despesas: 15000, taxa: 95, peso: 2100 },
    ];

    return (
      <div style={{ width: "900px", height: "350px" }}>
        <Chart
          {...args}
          data={metricsData}
          series={{
            bar: ["receita", "despesas"],
            line: ["peso"],
          }}
          labelMap={{
            receita: "Receita",
            despesas: "Despesas",
            peso: "Peso Total",
          }}
          showLabels={true}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo com IntelliSense aprimorado! Ao editar valueFormatter, pressione Ctrl+Espaço para ver as chaves dos dados e os formatos predefinidos (R$, %, kg, etc). Os formatos são aplicados automaticamente: moedas antes (R$ 1.234) e medidas depois (10kg).",
      },
    },
  },
};

export const AllBars: Story = {
  name: "Só Barras",
  render: (args) => (
    <div style={{ width: "900px", height: "350px" }}>
      <Chart
        {...args}
        series={{
          bar: ["receita", "despesas", "churn"],
        }}
        labelMap={{
          receita: "Receita Total",
          despesas: "Despesas Totais",
          churn: "Churn Total",
        }}
        colors={["#0ea5e9", "#f43f5e", "#a855f7"]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Todas as séries renderizadas como barras agrupadas.",
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    await step("Verificar todas as barras renderizadas", async () => {
      await waitFor(() => {
        const bars = canvasElement.querySelectorAll(".recharts-bar-rectangle");
        expect(bars.length).toBe(12);
      });
    });

    await step("Verificar ausência de linhas e áreas", async () => {
      const lines = canvasElement.querySelectorAll(".recharts-line");
      const areas = canvasElement.querySelectorAll(".recharts-area");

      expect(lines.length).toBe(0);
      expect(areas.length).toBe(0);
    });
  },
};

export const AllLines: Story = {
  name: "Só Linhas",
  render: (args) => (
    <div style={{ width: "900px", height: "350px" }}>
      <Chart
        {...args}
        series={{
          line: ["receita", "despesas", "churn"],
        }}
        labelMap={{
          receita: "Receita",
          despesas: "Despesas",
          churn: "Churn",
        }}
        colors={["#14b8a6", "#f97316", "#8b5cf6"]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Todas as séries renderizadas como linhas.",
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    await step("Verificar todas as linhas renderizadas", async () => {
      await waitFor(() => {
        const lines = canvasElement.querySelectorAll(".recharts-line");
        expect(lines.length).toBe(3);
      });
    });

    await step("Verificar ausência de barras e áreas", async () => {
      const bars = canvasElement.querySelectorAll(".recharts-bar-rectangle");
      const areas = canvasElement.querySelectorAll(".recharts-area");

      expect(bars.length).toBe(0);
      expect(areas.length).toBe(0);
    });
  },
};

export const AllAreas: Story = {
  name: "Só Áreas",
  render: (args) => (
    <div style={{ width: "900px", height: "350px" }}>
      <Chart
        {...args}
        series={{
          area: ["receita", "despesas", "churn"],
        }}
        labelMap={{
          receita: "Receita",
          despesas: "Despesas",
          churn: "Churn",
        }}
        colors={["#06b6d4", "#f59e0b", "#ec4899"]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Todas as séries renderizadas como áreas empilhadas.",
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    await step("Verificar todas as áreas renderizadas", async () => {
      await waitFor(() => {
        const areas = canvasElement.querySelectorAll(".recharts-area");
        expect(areas.length).toBe(3);
      });
    });

    await step("Verificar ausência de barras e linhas", async () => {
      const bars = canvasElement.querySelectorAll(".recharts-bar-rectangle");
      const lines = canvasElement.querySelectorAll(".recharts-line");

      expect(bars.length).toBe(0);
      expect(lines.length).toBe(0);
    });
  },
};

// Generate sample time series data
const generateTimeSeriesData = (months: number) => {
  const data = [];
  const startDate = new Date(2023, 0, 1);

  for (let i = 0; i < months; i++) {
    const date = new Date(startDate);
    date.setMonth(startDate.getMonth() + i);

    const monthStr = date.toLocaleDateString("pt-BR", {
      month: "short",
      year: "2-digit",
    });

    data.push({
      periodo: monthStr,
      receita: Math.round(5000 + Math.random() * 5000 + i * 200),
      despesas: Math.round(3000 + Math.random() * 3000 + i * 100),
      lucro: Math.round(1000 + Math.random() * 2000 + i * 50),
    });
  }

  return data;
};

const timeSeriesData = generateTimeSeriesData(18);

export const TimeSeries: Story = {
  render: (args) => (
    <div style={{ width: "900px" }}>
      <Chart
        {...args}
        data={timeSeriesData}
        xAxis="periodo"
        series={{ bar: ["receita", "despesas", "lucro"] }}
        labelMap={{ receita: "Receita", despesas: "Despesas", lucro: "Lucro" }}
        timeSeries={{
          start: 0,
          end: 11,
          height: 40,
        }}
        timeSeriesLegend="Selecionar intervalo"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Chart com timeSeries habilitado. Use o brush para selecionar o intervalo de dados a ser exibido.",
      },
    },
  },
};

export const Empty: Story = {
  name: "Vazio",
  render: (args) => (
    <div
      style={{ width: "900px", height: "350px" }}
      data-testid="empty-chart-wrapper"
    >
      <Chart
        {...args}
        data={[]}
        series={{
          bar: ["receita"],
        }}
        labelMap={{
          receita: "Receita",
        }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Gráfico sem dados para testar estado vazio.",
      },
    },
  },
};

export const Loading: Story = {
  render: (args) => (
    <div
      style={{ width: "900px", height: "350px" }}
      data-testid="loading-chart-wrapper"
    >
      <Chart
        {...args}
        data={[]}
        series={{
          bar: ["receita"],
        }}
        labelMap={{
          receita: "Receita",
        }}
        isLoading={true}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Gráfico em estado de carregamento.",
      },
    },
  },
};
// export const lBarChart: Story = {
//   name: "Gráfico de Barras Horizontal",
//   render: (args) => (
//     <div
//       style={{ width: "900px" }}
//       data-testid="horizontal-bar-chart-wrapper"
//     >
//       <Chart
//         {...args}
//         data={sampleData}
//         series={{
//           bar: ["receita", "despesas", "lucro"],
//         }}
//         labelMap={{
//           receita: "Receita",
//           despesas: "Despesas",
//           lucro: "Lucro",
//         }}
//         vertical={true}
//       />
//     </div>
//   ),
//   parameters: {
//     docs: {
//       description: {
//         story:
//           "Gráfico de barras horizontal. Ideal para evitar sobrecarga de labels no eixo X quando há muitas categorias. Os eixos são invertidos: categorias ficam no eixo Y e valores no eixo X.",
//       },
//     },
//   },
// };

export const AllThings: Story = {
  args: {
    data: [
      {
        periodo: "Jan/24",
        receita: 4200,
        despesas: 2800,
        churn: 180,
      },
      {
        periodo: "Fev/24",
        receita: 5100,
        despesas: 3200,
        churn: 165,
      },
      {
        periodo: "Mar/24",
        receita: 6800,
        despesas: 3900,
        churn: 142,
      },
      {
        periodo: "Abr/24",
        receita: 7500,
        despesas: 4300,
        churn: 128,
      },
    ],

    xAxis: "periodo",
    title: "Nome bem grande para verem que ficam bom de verdade",
    enableHighlights: true,
    enableShowOnly: true,
    enablePeriodsDropdown: true,
    enableDraggableTooltips: true,
    showTooltipTotal: true,
  },

  render: (args) => (
    <div
      style={{
        width: "900px",
      }}
    >
      <Chart
        {...args}
        data={timeSeriesData}
        xAxis="periodo"
        series={{
          bar: ["receita", "despesas"],
          line: ["lucro"],
        }}
        labelMap={{
          receita: "Receita",
          despesas: "Despesas",
          lucro: "Lucro",
        }}
        timeSeries
        timeSeriesLegend="Selecionar intervalo"
        biaxial={{ key: ["lucro"], label: "Lucro", percentage: true }}
        yAxisLabel="Lucro"
        className="border"
      />
    </div>
  ),

  parameters: {
    docs: {
      description: {
        story:
          "Chart com timeSeries habilitado. Use o brush para selecionar o intervalo de dados a ser exibido.",
      },
    },
  },
};

// export const Horizontal: Story = {
//   args: {
//     data: [
//       {
//         periodo: "Jan/24",
//         receita: 4200,
//         despesas: 2800,
//         churn: 180,
//       },
//       {
//         periodo: "Fev/24",
//         receita: 5100,
//         despesas: 3200,
//         churn: 165,
//       },
//       {
//         periodo: "Mar/24",
//         receita: 6800,
//         despesas: 3900,
//         churn: 142,
//       },
//       {
//         periodo: "Abr/24",
//         receita: 7500,
//         despesas: 4300,
//         churn: 128,
//       },
//     ],

//     xAxis: "periodo",
//     className: "border",
//     title: "Barras Horizontais Exemplo",
//     enableHighlights: false,
//   },

//   name: "Barras Horizontais",

//   render: (args) => (
//     <div
//       style={{
//         width: "900px",
//         height: "450px",
//       }}
//     >
//       <Chart
//         {...args}
//         data={gerarDadosCidades()}
//         xAxis="cidade"
//         showLabels
//         height={400}
//         orderBy="valorReal"
//         horizontal
//         series={{
//           bar: ["valorAnoAnterior", "valorReal"],
//         }}
//         labelMap={{
//           valorAnoAnterior: "Valor Ano Anterior",
//           valorReal: "Valor Real",
//         }}
//         colors={["#666665", "#0d1136"]}
//       />
//     </div>
//   ),

//   parameters: {
//     docs: {
//       description: {
//         story:
//           "Gráfico com barras horizontais usando a prop `horizontal={true}`, mostrando comparação de valores entre ano anterior e real para aproximadamente 300 cidades brasileiras de diversos tamanhos.",
//       },

//       source: {
//         code: `import React from 'react';
// import Chart from '@mlw-packages/react-components';
// import { gerarDadosCidades } from './cidades-brasil';

// const horizontalBarsData = gerarDadosCidades();

// export default function HorizontalBars() {
//   return (
//     <div style={{ width: 900, height: 450 }}>
//       <Chart
//         data={horizontalBarsData}
//         xAxis="cidade"
//         horizontal
//         series={{ bar: ['valorAnoAnterior', 'valorReal'] }}
//         labelMap={{ valorAnoAnterior: 'Valor Ano Anterior', valorReal: 'Valor Real' }}
//         colors={['#0d1136', '#666666']}
//         yAxisLabel="Cidades"
//         xAxisLabel="Valores (R$)"
//         height={400}
//       />
//     </div>
//   );
// }
// `,
//       },
//     },
//   },

//   play: async ({ canvasElement, step }) => {
//     await step("Verificar barras horizontais renderizadas", async () => {
//       await waitFor(() => {
//         const bars = canvasElement.querySelectorAll(".recharts-bar-rectangle");
//         expect(bars.length).toBeGreaterThan(0);
//       });
//     });
//   },
// };

export const GridTest: Story = {
  render: (args) => {
    // Generate 12 items for a 3x4 grid
    const gridItems = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      title: `Chart ${i + 1}`,
      // Mix of different configurations
      isTimeSeries: i === 10 || i === 11,
      variant: i % 3 === 0 ? "bar" : i % 3 === 1 ? "line" : "area",
    }));

    return (
      <div className="w-[1200px] grid grid-cols-3 gap-4 p-4 bg-muted/20">
        {gridItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg p-2 flex flex-col min-h-0 overflow-hidden shadow-sm h-[300px]"
          >
            <h3 className="text-sm font-semibold mb-2">{item.title}</h3>
            <div className="flex-1 min-h-0 relative">
              <Chart
                {...args}
                data={item.isTimeSeries ? timeSeriesData : args.data}
                className="h-full"
                title={undefined} // Hide title inside chart to save space
                series={{
                  [item.variant]: ["receita", "despesas"],
                }}
                labelMap={{ receita: "Receita", despesas: "Despesas" }}
                timeSeries={item.isTimeSeries}
                timeSeriesLegend="Intervalo"
              />
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Teste de grid 3x4 para verificar comportamento de altura (h-full) e responsividade em múltiplos gráficos.",
      },
    },
  },
};

export const LayoutTest: Story = {
  render: (args) => (
    <div className="w-full bg-muted/20 p-4 gap-2 space-y-2">
      <div className="h-12 bg-white rounded border flex items-center px-4 text-sm text-muted-foreground w-full">
        WeeksSummaryFilters Placeholder
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
        <div className="flex flex-col h-full gap-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 shrink-0">
            <CardBase className="flex flex-col w-full p-3 gap-4">
              <div>
                <h3 className="text-md font-bold text-center">200</h3>
                <div className="text-lg text-center font-medium truncate">
                  2222
                </div>
              </div>

              <div className="flex h-full justify-between flex-col gap-4">
                <div>
                  <p className="text-sm">Ano Anterior</p>
                  <div className="flex flex-col gap-1">
                    <p className="font-medium">22222</p>
                    <p
                      className={`text-xs font-semibold flex gap-1 items-center
              `}
                    >
                      222222
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm">Planejado</p>
                  <div className="flex flex-col gap-1">
                    <p className="font-medium">222</p>
                    <p
                      className={`text-xs font-semibold flex gap-1 items-center`}
                    >
                      222222
                    </p>
                  </div>
                </div>
              </div>
            </CardBase>
            <CardBase className="flex flex-col w-full p-3 gap-4">
              <div>
                <h3 className="text-md font-bold text-center">200</h3>
                <div className="text-lg text-center font-medium truncate">
                  2222
                </div>
              </div>

              <div className="flex h-full justify-between flex-col gap-4">
                <div>
                  <p className="text-sm">Ano Anterior</p>
                  <div className="flex flex-col gap-1">
                    <p className="font-medium">22222</p>
                    <p
                      className={`text-xs font-semibold flex gap-1 items-center
              `}
                    >
                      222222
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm">Planejado</p>
                  <div className="flex flex-col gap-1">
                    <p className="font-medium">222</p>
                    <p
                      className={`text-xs font-semibold flex gap-1 items-center`}
                    >
                      222222
                    </p>
                  </div>
                </div>
              </div>
            </CardBase>
            <CardBase className="flex flex-col w-full p-3 gap-4">
              <div>
                <h3 className="text-md font-bold text-center">200</h3>
                <div className="text-lg text-center font-medium truncate">
                  2222
                </div>
              </div>

              <div className="flex h-full justify-between flex-col gap-4">
                <div>
                  <p className="text-sm">Ano Anterior</p>
                  <div className="flex flex-col gap-1">
                    <p className="font-medium">22222</p>
                    <p
                      className={`text-xs font-semibold flex gap-1 items-center
              `}
                    >
                      222222
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm">Planejado</p>
                  <div className="flex flex-col gap-1">
                    <p className="font-medium">222</p>
                    <p
                      className={`text-xs font-semibold flex gap-1 items-center`}
                    >
                      222222
                    </p>
                  </div>
                </div>
              </div>
            </CardBase>
          </div>
            <Chart {...args} title="Regional Chart" className="border h-full" />
        
        </div>

        <div className="grid grid-cols-1 gap-2 h-full">
            <Leaderboard />
            <Chart {...args} title="Total Chart" className="border" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 h-[400px]">
          <Chart {...args} title="Brand Chart" className="h-full border" />
          <Chart
            {...args}
            title="Weeks Sub Channel"
            className="h-full border"
          />
          <div className="flex h-full sm:col-span-2 xl:col-span-1">
            <Chart
              {...args}
              title="Leftover Chart"
              className="h-full flex-1 border"
            />
          </div>
        </div>

        <Chart {...args} title="Weeks Chart" className="h-[350px] border" />
        <Chart
          {...args}
          title="Weekly Revenue Summary"
          className="h-[350px] border"
        />
        <Chart
          {...args}
          title="Active Customers Summary"
          className="h-[350px] border"
        />
        <Chart
          {...args}
          title="New Customers Summary"
          className="h-[350px] border"
        />
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Teste de layout complexo simulando uma dashboard real. Verifica se os gráficos com `h-full` se comportam corretamente dentro de flex-col e grids aninhados.",
      },
    },
  },
};
