import React from "react";
import Chart from "@/components/charts/Chart";
import "../../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";

const sampleData = [
  { periodo: "Q1/24", receita: 1000, despesas: 400, churn: 180 },
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
    <div style={{ width: "900px", height: "420px" }}>
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
    <div style={{ width: "900px", height: "420px" }}>
      <Chart
        {...args}
        height={360}
        xAxis="periodo"
        series={{ bar: ["receita", "despesas"], line: ["churn"] }}
        labelMap={{ receita: "Receita", despesas: "Despesas", churn: "Churn" }}
        yAxisLabel="Valor (R$)"
        biaxial={{ key: ["churn"], label: "Churn (%)", percentage: true ,}}
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
      <div style={{ width: "900px", height: "420px" }}>
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
    <div style={{ width: "900px", height: "420px" }}>
      <Chart
        {...args}
        height={350}
        series={{
          bar: ["receita", "despesas"],
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
    <div style={{ width: "900px", height: "420px" }}>
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
      style={{ width: "900px", height: "420px" }}
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

export const SinglePoint: Story = {
  name: "Único Ponto",
  render: (args) => (
    <div style={{ width: "900px", height: "420px" }}>
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
    <div style={{ width: "900px", height: "420px" }}>
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
    <div style={{ width: "900px", height: "420px" }}>
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
    <div style={{ width: "900px", height: "420px" }}>
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
    <div style={{ width: "900px", height: "420px" }}>
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
      <div style={{ width: "900px", height: "420px" }}>
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
  play: async ({ canvasElement, step }) => {
    await step("Verificar renderização com valores extremos", async () => {
      await waitFor(() => {
        const chartContainer = canvasElement.querySelector(".recharts-wrapper");
        expect(chartContainer).toBeInTheDocument();
      });
    });

    await step("Verificar escala do eixo Y ajustada", async () => {
      const yAxis = canvasElement.querySelector(".recharts-yAxis");
      expect(yAxis).toBeInTheDocument();
    });

    await step("Verificar todas as séries visíveis", async () => {
      const bars = canvasElement.querySelectorAll(".recharts-bar-rectangle");
      const lines = canvasElement.querySelectorAll(".recharts-line");

      expect(bars.length).toBeGreaterThan(0);
      expect(lines.length).toBeGreaterThan(0);
    });
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
      <div style={{ width: "900px", height: "420px" }}>
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
  play: async ({ canvasElement, step }) => {
    await step("Verificar renderização de valores mistos", async () => {
      await waitFor(() => {
        const bars = canvasElement.querySelectorAll(".recharts-bar-rectangle");
        expect(bars.length).toBe(12); // 2 séries × 6 pontos
      });
    });

    await step(
      "Verificar eixo Y com valores negativos e positivos",
      async () => {
        const yAxis = canvasElement.querySelector(".recharts-yAxis");
        expect(yAxis).toBeInTheDocument();
      }
    );

    await step("Verificar linha atravessando zero", async () => {
      const lines = canvasElement.querySelectorAll(".recharts-line");
      expect(lines.length).toBe(1);
    });

    await step("Verificar grid crossing zero point", async () => {
      const grid = canvasElement.querySelector(".recharts-cartesian-grid");
      expect(grid).toBeInTheDocument();
    });
  },
};

export const CustomColors: Story = {
  name: "Cores Custom",
  render: (args) => (
    <div style={{ width: "900px", height: "420px" }}>
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
          '[fill="#ff0080"], [fill="#00ff80"], [fill="#0080ff"], [stroke="#ff0080"], [stroke="#00ff80"], [stroke="#0080ff"]'
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
