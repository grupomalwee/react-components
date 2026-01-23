import React from "react";
import Chart from "@/components/ui/charts/Chart";
import "../../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";

const sampleData = [
  { periodo: "Q1/24", receita_AA: 1000, despesas: 400, churn: 180 },
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
      source: {
        code: `import React from 'react';
import Chart from '@mlw-packages/react-components';

const sampleData = [
  { periodo: 'Q1/24', receita: 4000, despesas: 2400, churn: 180 },
  { periodo: 'Q2/24', receita: 5200, despesas: 3100, churn: 150 },
];

export default function Example() {
  return (
    <div style={{ width: 900, height: 420 }}>
      <Chart data={sampleData} xAxis="periodo" series={{ bar: ['despesas'] }} labelMap={{ despesas: 'Despesas' }} height={360} />
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
    height: {
      control: { type: "number", min: 200, max: 600, step: 50 },
      description: "Altura do gráfico em pixels",
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
  },
  args: {
    data: sampleData,
    xAxis: "periodo",
  },
};

export default meta;
type Story = StoryObj<typeof Chart>;

const Template = (args: React.ComponentProps<typeof Chart>) => (
  <div style={{ width: "900px", height: "350px" }}>
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
  { periodo: 'Q1/24', receita: 4000, despesas: 2400, churn: 180 },
  { periodo: 'Q2/24', receita: 5200, despesas: 3100, churn: 150 },
  { periodo: 'Q3/24', receita: 6800, despesas: 3800, churn: 120 },
  { periodo: 'Q4/24', receita: 7500, despesas: 4200, churn: 100 },
];

export default function Default() {
  return (
    <div style={{ width: 900, height: 420 }}>
      <Chart data={sampleData} xAxis="periodo" height={360} />
    </div>
  );
}
`,
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
        height={360}
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

export const Combined: Story = {
  name: "Combinado",
  render: (args) => (
    <div style={{ width: "900px", height: "350px" }}>
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
      source: {
        code: `import React from 'react';
import Chart from '@mlw-packages/react-components';

const data = [
  { periodo: 'Q1/24', receita: 4000, despesas: 2400, churn: 180 },
  { periodo: 'Q2/24', receita: 5200, despesas: 3100, churn: 150 },
];

export default function Combined() {
  return (
    <div style={{ width: 900, height: 420 }}>
      <Chart data={data} xAxis="periodo" series={{ bar: ['despesas'], area: ['receita'], line: ['churn'] }} labelMap={{ despesas: 'Despesas', receita: 'Receita', churn: 'Churn' }} colors={["#ef4444","#22c55e","#6366f1"]} height={350} />
    </div>
  );
}
`,
      },
    },
  },
};

export const Biaxial: Story = {
  render: (args) => (
    <div style={{ width: "900px", height: "350px" }}>
      <Chart
        {...args}
        height={360}
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
      source: {
        code: `import React from 'react';
import Chart from '@mlw-packages/react-components';

const data = [
  { periodo: 'Q1/24', receita: 1000, despesas: 400, churn: 180 },
  { periodo: 'Q2/24', receita: 5200, despesas: 3100, churn: 150 },
  { periodo: 'Q3/24', receita: 6800, despesas: 3800, churn: 120 },
  { periodo: 'Q4/24', receita: 7500, despesas: 4200, churn: 100 },
];

export default function BiaxialExample() {
  return (
    <div style={{ width: 900, height: 420 }}>
      <Chart
        data={data}
        xAxis="periodo"
        height={360}
        series={{ bar: ['receita', 'despesas'], line: ['churn'] }}
        labelMap={{ receita: 'Receita', despesas: 'Despesas', churn: 'Churn' }}
        yAxisLabel="Valor (R$)"
        colors={["#3b82f6", "#ef4444", "#f59e0b"]}
        biaxial={{ keys: ['churn'], label: 'Churn (%)', percentage: true }}
      />
    </div>
  );
}
`,
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
      source: {
        code: `import React from 'react';
import Chart from '@mlw-packages/react-components';

const negativeData = [
  { periodo: 'Q1/24', receita: -2000, despesas: 1800 },
  { periodo: 'Q2/24', receita: 3000, despesas: -800 },
];

export default function NegativeValues() {
  return (
    <div style={{ width: 900, height: 420 }}>
      <Chart data={negativeData} xAxis="periodo" series={{ bar: ['despesas'] }} labelMap={{ receitas: 'Receita', despesas: 'Despesas' }} colors={["#06b6d4","#ef4444"]} height={360} />
    </div>
  );
}
`,
      },
    },
  },
};

export const LargeData: Story = {
  name: "Dados Grandes",
  render: (args) => {
    const largeData = Array.from({ length: 24 }, (_, i) => ({
      periodo: `M${i + 1}`,
      receita: Math.round(3000 + Math.random() * 7000),
      despesas: Math.round(2000 + Math.random() * 5000),
      churn: Math.round(80 + Math.random() * 140),
    }));

    return (
      <div style={{ width: "900px", height: "350px" }}>
        <Chart
          {...args}
          data={largeData}
          height={350}
          series={{
            bar: ["despesas"],
            line: ["receita", "churn"],
          }}
          labelMap={{
            receita: "Receita",
            despesas: "Despesas",
            churn: "Churn",
          }}
          colors={["#f59e0b", "#3b82f6", "#8b5cf6"]}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Gráfico com 24 pontos de dados mensais.",
      },
      source: {
        code: `import React from 'react';
import Chart from '@mlw-packages/react-components';

const largeData = Array.from({ length: 24 }, (_, i) => ({ periodo: 'M' + (i+1), receita: Math.round(3000 + Math.random()*7000), despesas: Math.round(2000 + Math.random()*5000), churn: Math.round(80 + Math.random()*140) }));

export default function LargeDataset() {
  return (
    <div style={{ width: 900, height: 420 }}>
      <Chart data={largeData} xAxis="periodo" series={{ bar: ['despesas'], line: ['receita','churn'] }} labelMap={{ receita: 'Receita', despesas: 'Despesas', churn: 'Churn' }} colors={["#f59e0b","#3b82f6","#8b5cf6"]} height={350} />
    </div>
  );
}
`,
      },
    },
  },
};

export const CustomFormatter: Story = {
  name: "Formatador Custom",
  render: (args) => (
    <div style={{ width: "900px", height: "350px" }}>
      <Chart
        {...args}
        height={350}
        series={{
          bar: ["receita", "despesas", "churn"],
        }}
        labelMap={{
          receita: "Receita",
          despesas: "Despesas",
        }}
        showLabels={true}
        valueFormatter={(props) => `R$ ${props.formattedValue}`}
        colors={["#10b981", "#ef4444"]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo de como usar valueFormatter para adicionar símbolos customizados aos labels dos dados (R$, %, €, etc).",
      },
      source: {
        code: `import React from 'react';
import Chart from '@mlw-packages/react-components';

const data = [
  { periodo: 'Q1/24', receita: 4000, despesas: 2400 },
  { periodo: 'Q2/24', receita: 5200, despesas: 3100 },
];

export default function Customformatter() {
  return (
    <div style={{ width: 900, height: 420 }}>
      <Chart 
        data={data} 
        xAxis="periodo" 
        series={{ bar: ['receita', 'despesas'] }} 
        labelMap={{ receita: 'Receita', despesas: 'Despesas' }}
        showLabels={true}
        valueFormatter={(props) => \`R$ \${props.formattedValue}\`}
        colors={["#10b981", "#ef4444"]}
        height={350} 
      />
    </div>
  );
}
`,
      },
    },
  },
};

export const AdvancedFormatter: Story = {
  name: "Formatador Avançado",
  render: (args) => (
    <div style={{ width: "900px", height: "350px" }}>
      <Chart
        {...args}
        height={350}
        series={{
          bar: ["receita", "despesas"],
          line: ["churn"],
        }}
        labelMap={{
          receita: "Receita",
          despesas: "Despesas",
          churn: "Churn",
        }}
        showLabels={true}
        yAxisLabel="Valor"
        biaxial={{ key: ["churn"], label: "Churn (%)", percentage: true }}
        valueFormatter={(props) => {
          const numValue =
            typeof props.value === "number"
              ? props.value
              : parseFloat(String(props.value || "0"));

          if (numValue < 0) {
            return `${props.formattedValue}`;
          } else if (numValue > 5000) {
            return `R$ ${props.formattedValue}`;
          } else if (numValue < 200) {
            return `${props.formattedValue}%`;
          } else {
            return `R$ ${props.formattedValue}`;
          }
        }}
        colors={["#10b981", "#ef4444", "#f59e0b"]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo avançado com formatação condicional baseada no valor dos dados.",
      },
      source: {
        code: `import React from 'react';
import Chart from '@mlw-packages/react-components';

export default function Advancedformatter() {
  const data = [{ periodo: 'Q1', receita: 8000, despesas: 3000, churn: 120 }];
  
  return (
    <Chart 
      data={data} 
      valueFormatter={(props) => {
        const numValue = typeof props.value === 'number' ? props.value : parseFloat(String(props.value || '0'));
        
        if (numValue < 0) {
          return \`⚠️ \${props.formattedValue}\`;
        } else if (numValue > 5000) {
          return \`🚀 R$ \${props.formattedValue}\`;
        } else if (numValue < 200) {
          return \`\${props.formattedValue}%\`;
        } else {
          return \`R$ \${props.formattedValue}\`;
        }
      }}
    />
  );
}
`,
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
        height={350}
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
      source: {
        code: `import React from 'react';
import Chart from '@mlw-packages/react-components';

export default function EmptyData() {
  return (
    <div style={{ width: 900, height: 420 }}>
      <Chart data={[]} xAxis="periodo" series={{ bar: ['receita'] }} labelMap={{ receita: 'Receita' }} height={350} />
    </div>
  );
}
`,
      },
    },
  },
};
export const Loading: Story = {
  name: "Loading Estado",
  render: (args) => (
    <div
      style={{ width: "900px", height: "350px" }}
      data-testid="empty-chart-wrapper"
    >
      <Chart
        {...args}
        data={[]}
        height={350}
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
      source: {
        code: `import React from 'react';
import Chart from '@mlw-packages/react-components';

export default function EmptyData() {
  return (
    <div style={{ width: 900, height: 420 }}>
      <Chart data={[]} xAxis="periodo" series={{ bar: ['receita'] }} labelMap={{ receita: 'Receita' }} height={350} />
    </div>
  );
}
`,
      },
    },
  },
};

export const SinglePoint: Story = {
  name: "Único Ponto",
  render: (args) => (
    <div style={{ width: "900px", height: "350px" }}>
      <Chart
        {...args}
        data={[{ periodo: "Q1/24", receita: 5000, despesas: 3000, churn: 120 }]}
        height={350}
        series={{
          bar: ["despesas"],
          line: ["receita"],
        }}
        labelMap={{
          receita: "Receita",
          despesas: "Despesas",
        }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Gráfico com apenas um ponto de dados.",
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    await step("Verificar renderização com único ponto", async () => {
      await waitFor(() => {
        const bars = canvasElement.querySelectorAll(".recharts-bar-rectangle");
        expect(bars.length).toBe(1);
      });
    });

    await step("Verificar linha com único ponto", async () => {
      const lines = canvasElement.querySelectorAll(".recharts-line");
      expect(lines.length).toBe(1);
    });
  },
};

export const Minimal: Story = {
  name: "Minimalista",
  render: (args) => (
    <div style={{ width: "900px", height: "350px" }}>
      <Chart
        {...args}
        height={350}
        series={{
          bar: ["receita"],
          line: ["despesas"],
        }}
        labelMap={{
          receita: "Receita",
          despesas: "Despesas",
        }}
        showGrid={false}
        showLegend={false}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Gráfico minimalista sem grid e sem legenda.",
      },
    },
  },
  // play: async ({ canvasElement, step }) => {
  //   await step("Verificar ausência de grid", async () => {
  //     const grid = canvasElement.querySelector(".recharts-cartesian-grid");
  //     expect(grid).not.toBeInTheDocument();
  //   });

  //   await step("Verificar ausência de legenda", async () => {
  //     const legend = canvasElement.querySelector(".recharts-legend-wrapper");
  //     expect(legend).not.toBeInTheDocument();
  //   });

  //   await step("Verificar dados ainda renderizados", async () => {
  //     const bars = canvasElement.querySelectorAll(".recharts-bar-rectangle");
  //     const lines = canvasElement.querySelectorAll(".recharts-line");

  //     expect(bars.length).toBeGreaterThan(0);
  //     expect(lines.length).toBeGreaterThan(0);
  //   });
  // },
};

export const TallChart: Story = {
  name: "Altura Grande",
  render: (args) => (
    <div style={{ width: "900px", height: "620px" }}>
      <Chart
        {...args}
        height={550}
        series={{
          area: ["receita", "despesas"],
        }}
        labelMap={{
          receita: "Receita",
          despesas: "Despesas",
        }}
        colors={["#22c55e", "#ef4444"]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Gráfico com altura customizada de 550px.",
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    await step("Verificar altura customizada aplicada", async () => {
      await waitFor(() => {
        const surface = canvasElement.querySelector(".recharts-surface");
        expect(surface).toBeInTheDocument();
      });
    });

    await step("Verificar áreas renderizadas com altura maior", async () => {
      const areas = canvasElement.querySelectorAll(".recharts-area");
      expect(areas.length).toBe(2);
    });
  },
};

export const AllBars: Story = {
  name: "Só Barras",
  render: (args) => (
    <div style={{ width: "900px", height: "350px" }}>
      <Chart
        {...args}
        height={350}
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
        expect(bars.length).toBe(18); // 3 séries × 6 pontos
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
        height={350}
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
        height={350}
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

export const Extremes: Story = {
  name: "Extremos",
  render: (args) => {
    const extremeData = [
      { periodo: "Q1", receita: 100000, despesas: 50, churn: 5 },
      { periodo: "Q2", receita: 200, despesas: 99000, churn: 500 },
      { periodo: "Q3", receita: 150000, despesas: 120000, churn: 1 },
      { periodo: "Q4", receita: 500, despesas: 300, churn: 999 },
    ];

    return (
      <div style={{ width: "900px", height: "350px" }}>
        <Chart
          {...args}
          data={extremeData}
          height={350}
          series={{
            bar: ["receita"],
            line: ["despesas", "churn"],
          }}
          labelMap={{
            receita: "Receita",
            despesas: "Despesas",
            churn: "Churn",
          }}
          colors={["#10b981", "#ef4444", "#f59e0b"]}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Gráfico com valores extremamente diferentes para testar escala.",
      },
    },
  },
};

export const MixedValues: Story = {
  name: "Valores Mistos",
  render: (args) => {
    const mixedData = [
      { periodo: "Q1", receita: -5000, despesas: 3000, churn: -50 },
      { periodo: "Q2", receita: 7000, despesas: -2000, churn: 100 },
      { periodo: "Q3", receita: -3000, despesas: 4000, churn: -80 },
      { periodo: "Q4", receita: 9000, despesas: -1000, churn: 150 },
      { periodo: "Q5", receita: -2000, despesas: 5000, churn: -30 },
      { periodo: "Q6", receita: 11000, despesas: -3000, churn: 200 },
    ];

    return (
      <div style={{ width: "900px", height: "350px" }}>
        <Chart
          {...args}
          data={mixedData}
          height={360}
          series={{
            bar: ["receita", "despesas"],
            line: ["churn"],
          }}
          labelMap={{
            receita: "Receita",
            despesas: "Despesas",
            churn: "Variação",
          }}
          colors={["#3b82f6", "#ef4444", "#8b5cf6"]}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Gráfico complexo com valores positivos e negativos alternados em todas as séries.",
      },
    },
  },
};

export const CustomColors: Story = {
  name: "Cores Custom",
  render: (args) => (
    <div style={{ width: "900px", height: "350px" }}>
      <Chart
        {...args}
        height={350}
        series={{
          bar: ["receita"],
          line: ["despesas"],
          area: ["churn"],
        }}
        labelMap={{
          receita: "Receita",
          despesas: "Despesas",
          churn: "Churn",
        }}
        colors={["#ff0080", "#00ff80", "#0080ff"]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Gráfico com paleta de cores vibrante e customizada.",
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    await step("Verificar cores customizadas aplicadas", async () => {
      await waitFor(() => {
        const coloredElements = canvasElement.querySelectorAll(
          '[fill="#ff0080"], [fill="#00ff80"], [fill="#0080ff"], [stroke="#ff0080"], [stroke="#00ff80"], [stroke="#0080ff"]',
        );
        expect(coloredElements.length).toBeGreaterThan(0);
      });
    });

    await step("Verificar todas as séries com cores diferentes", async () => {
      const bars = canvasElement.querySelectorAll(".recharts-bar-rectangle");
      const lines = canvasElement.querySelectorAll(".recharts-line");
      const areas = canvasElement.querySelectorAll(".recharts-area");

      expect(bars.length).toBeGreaterThan(0);
      expect(lines.length).toBeGreaterThan(0);
      expect(areas.length).toBeGreaterThan(0);
    });
  },
};

// Generate sample time series data for TimeSeries stories
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
      churn: Math.round(50 + Math.random() * 100),
    });
  }

  return data;
};

const timeSeriesData = generateTimeSeriesData(24);

export const TimeSeriesEnabled: Story = {
  name: "TimeSeries Habilitado",
  render: (args) => (
    <div style={{ width: "900px" }}>
      <Chart
        {...args}
        data={timeSeriesData}
        xAxis="periodo"
        series={{ bar: ["receita", "despesas"] }}
        labelMap={{ receita: "Receita", despesas: "Despesas" }}
        height={350}
        timeSeries={{
          enabled: true,
          defaultStartIndex: 0,
          defaultEndIndex: 11,
          brushHeight: 80,
        }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Chart com timeSeries habilitado. Use o brush para selecionar o intervalo de dados a ser exibido.",
      },
      source: {
        code: `import React from 'react';
import Chart from '@mlw-packages/react-components';

const data = generateTimeSeriesData(24);

export default function TimeSeriesExample() {
  return (
    <Chart
      data={data}
      xAxis="periodo"
      series={{ bar: ['receita', 'despesas'] }}
      labelMap={{ receita: 'Receita', despesas: 'Despesas' }}
      height={350}
      timeSeries={{
        enabled: true,
        defaultStartIndex: 0,
        defaultEndIndex: 11,
        brushHeight: 80,
      }}
    />
  );
}`,
      },
    },
  },
};

export const TimeSeriesCustomRange: Story = {
  name: "TimeSeries com Intervalo Customizado",
  render: (args) => (
    <div style={{ width: "900px" }}>
      <Chart
        {...args}
        data={timeSeriesData}
        xAxis="periodo"
        series={{ line: ["receita", "despesas", "lucro"] }}
        labelMap={{ receita: "Receita", despesas: "Despesas", lucro: "Lucro" }}
        colors={["#22c55e", "#ef4444", "#3b82f6"]}
        height={350}
        timeSeries={{
          enabled: true,
          defaultStartIndex: 6,
          defaultEndIndex: 18,
          brushHeight: 100,
          brushColor: "#8b5cf6",
          brushStroke: "#8b5cf6",
          miniChartOpacity: 0.5,
        }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "TimeSeries com intervalo inicial customizado (meses 7-19) e estilo de brush personalizado.",
      },
      source: {
        code: `import React from 'react';
import Chart from '@mlw-packages/react-components';

export default function TimeSeriesCustomRange() {
  return (
    <Chart
      data={data}
      xAxis="periodo"
      series={{ line: ['receita', 'despesas', 'lucro'] }}
      labelMap={{ receita: 'Receita', despesas: 'Despesas', lucro: 'Lucro' }}
      colors={["#22c55e", "#ef4444", "#3b82f6"]}
      height={350}
      timeSeries={{
        enabled: true,
        defaultStartIndex: 6,
        defaultEndIndex: 18,
        brushHeight: 100,
        brushColor: "#8b5cf6",
        brushStroke: "#8b5cf6",
        miniChartOpacity: 0.5,
      }}
    />
  );
}`,
      },
    },
  },
};

export const TimeSeriesInteractive: Story = {
  name: "TimeSeries Interativo com Callback",
  render: (args) => {
    const [rangeInfo, setRangeInfo] = React.useState({ start: 0, end: 11 });

    return (
      <div style={{ width: "900px" }}>
        <div className="mb-4 p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium">
            Intervalo selecionado: {rangeInfo.start} - {rangeInfo.end}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Arraste as alças ou a área central para ajustar o intervalo
          </p>
        </div>
        <Chart
          {...args}
          data={timeSeriesData}
          xAxis="periodo"
          series={{ bar: ["receita", "despesas"] }}
          labelMap={{ receita: "Receita", despesas: "Despesas" }}
          height={350}
          timeSeries={{
            enabled: true,
            defaultStartIndex: 0,
            defaultEndIndex: 11,
            brushHeight: 80,
            onRangeChange: (start, end) => setRangeInfo({ start, end }),
          }}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo com callback onRangeChange para capturar mudanças no intervalo do brush.",
      },
      source: {
        code: `import React from 'react';
import Chart from '@mlw-packages/react-components';

export default function TimeSeriesInteractive() {
  const [rangeInfo, setRangeInfo] = React.useState({ start: 0, end: 11 });

  return (
    <div>
      <div className="mb-4 p-4 bg-muted rounded-lg">
        <p>Intervalo selecionado: {rangeInfo.start} - {rangeInfo.end}</p>
      </div>
      <Chart
        data={data}
        xAxis="periodo"
        series={{ bar: ['receita', 'despesas'] }}
        labelMap={{ receita: 'Receita', despesas: 'Despesas' }}
        height={350}
        timeSeries={{
          enabled: true,
          defaultStartIndex: 0,
          defaultEndIndex: 11,
          brushHeight: 80,
          onRangeChange: (start, end) => setRangeInfo({ start, end }),
        }}
      />
    </div>
  );
}`,
      },
    },
  },
};
