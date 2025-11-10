import React from "react";
import Chart from "@/components/charts/Chart";
import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within, waitFor } from "storybook/test";
import { ButtonBase } from "@/components/ui/form/ButtonBase";
import { CheckboxBase } from "@/components/ui/form/CheckBoxBase";
import { SlideBase } from "@/components/ui/form/SliderBase";
import {
  SelectBase,
  SelectTriggerBase,
  SelectContentBase,
  SelectItemBase,
  SelectValueBase,
} from "@/components/ui/SelectBase";
import { ArrowClockwiseIcon, MinusIcon, PlusIcon } from "@phosphor-icons/react";

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

export const MultipleBars: Story = {
  name: "Múltiplas Barras",
  render: (args) => (
    <div style={{ width: "900px", height: "420px" }}>
      <Chart
        {...args}
        height={350}
        series={{
          bar: ["receita", "despesas", "churn"],
        }}
        labelMap={{
          receita: "Receita",
          despesas: "Despesas",
          churn: "Churn",
        }}
        colors={["#3b82f6", "#ef4444", "#f59e0b"]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Gráfico com múltiplas séries de barras agrupadas.",
      },
      source: {
        code: `import React from 'react';
import Chart from '@mlw-packages/react-components';

export default function MultipleBarSeries() {
  const data = [
    { periodo: 'Q1', receita: 4000, despesas: 2400, churn: 180 },
    { periodo: 'Q2', receita: 5200, despesas: 3100, churn: 150 },
  ];
  return (
    <div style={{ width: 900, height: 420 }}>
      <Chart data={data} xAxis="periodo" series={{ bar: ['receita','despesas','churn'] }} labelMap={{ receita: 'Receita', despesas: 'Despesas', churn: 'Churn' }} colors={["#3b82f6","#ef4444","#f59e0b"]} height={350} />
    </div>
  );
}
`,
      },
    },
  },
  // play: async ({ canvasElement, step }) => {
  //   await step("Verificar renderização de múltiplas barras", async () => {
  //     await waitFor(() => {
  //       const bars = canvasElement.querySelectorAll(".recharts-bar-rectangle");
  //       // 3 séries × 6 pontos = 18 barras
  //       expect(bars.length).toBe(18);
  //     });
  //   });

  //   await step("Verificar agrupamento de barras", async () => {
  //     const barGroups = canvasElement.querySelectorAll(".recharts-bar");
  //     expect(barGroups.length).toBe(3);
  //   });

  //   await step("Verificar legenda com 3 itens", async () => {
  //     const legend = canvasElement.querySelector(".recharts-legend-wrapper");
  //     expect(legend).toBeInTheDocument();
  //   });
  // },
};

export const MultipleLines: Story = {
  name: "Múltiplas Linhas",
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
        colors={["#10b981", "#8b5cf6", "#f97316"]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Gráfico com múltiplas séries de linhas sobrepostas.",
      },
      source: {
        code: `import React from 'react';
import Chart from '@mlw-packages/react-components';

export default function MultipleLineSeries() {
  const data = [
    { periodo: 'Q1', receita: 4000, despesas: 2400, churn: 180 },
    { periodo: 'Q2', receita: 5200, despesas: 3100, churn: 150 },
  ];
  return (
    <div style={{ width: 900, height: 420 }}>
      <Chart data={data} xAxis="periodo" series={{ line: ['receita','despesas','churn'] }} labelMap={{ receita: 'Receita', despesas: 'Despesas', churn: 'Churn' }} colors={["#10b981","#8b5cf6","#f97316"]} height={350} />
    </div>
  );
}
`,
      },
    },
  },
  // play: async ({ canvasElement, step }) => {
  //   await step("Verificar renderização de múltiplas linhas", async () => {
  //     await waitFor(() => {
  //       const lines = canvasElement.querySelectorAll(".recharts-line");
  //       expect(lines.length).toBe(3);
  //     });
  //   });

  //   await step("Verificar pontos nas linhas", async () => {
  //     const dots = canvasElement.querySelectorAll(".recharts-line-dots");
  //     expect(dots.length).toBeGreaterThan(0);
  //   });

  //   await step("Verificar cores diferenciadas", async () => {
  //     const coloredElements = canvasElement.querySelectorAll(
  //       '[stroke="#10b981"], [stroke="#8b5cf6"], [stroke="#f97316"]'
  //     );
  //     expect(coloredElements.length).toBeGreaterThan(0);
  //   });
  // },
};

export const MultipleAreas: Story = {
  name: "Múltiplas Áreas",
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
        colors={["#06b6d4", "#ec4899", "#84cc16"]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Gráfico com múltiplas séries de áreas empilhadas.",
      },
      source: {
        code: `import React from 'react';
import Chart from '@mlw-packages/react-components';

export default function MultipleAreaSeries() {
  const data = [
    { periodo: 'Q1', receita: 4000, despesas: 2400, churn: 180 },
    { periodo: 'Q2', receita: 5200, despesas: 3100, churn: 150 },
  ];
  return (
    <div style={{ width: 900, height: 420 }}>
      <Chart data={data} xAxis="periodo" series={{ area: ['receita','despesas','churn'] }} labelMap={{ receita: 'Receita', despesas: 'Despesas', churn: 'Churn' }} colors={["#06b6d4","#ec4899","#84cc16"]} height={350} />
    </div>
  );
}
`,
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    await step("Verificar renderização de múltiplas áreas", async () => {
      await waitFor(() => {
        const areas = canvasElement.querySelectorAll(".recharts-area");
        expect(areas.length).toBe(3);
      });
    });

    await step("Verificar preenchimento das áreas", async () => {
      const areaPaths = canvasElement.querySelectorAll(".recharts-area-area");
      expect(areaPaths.length).toBe(3);
    });

    await step("Verificar cores das áreas", async () => {
      const coloredElements = canvasElement.querySelectorAll(
        '[fill="#06b6d4"], [fill="#ec4899"], [fill="#84cc16"]'
      );
      expect(coloredElements.length).toBeGreaterThan(0);
    });
  },
};

export const ComplexMixed: Story = {
  name: "Misto Complexo",
  render: (args) => (
    <div style={{ width: "900px", height: "420px" }}>
      <Chart
        {...args}
        height={380}
        series={{
          bar: ["despesas"],
          area: ["receita"],
          line: ["churn"],
        }}
        labelMap={{
          receita: "Receita (R$)",
          despesas: "Despesas (R$)",
          churn: "Taxa de Churn (%)",
        }}
        colors={["#dc2626", "#16a34a", "#2563eb"]}
        showGrid={true}
        showLegend={true}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Combinação complexa de barras, áreas e linhas com labels personalizados.",
      },
      source: {
        code: `import React from 'react';
import Chart from '@mlw-packages/react-components';

export default function ComplexMixedChart() {
  const data = [
    { periodo: 'Q1', receita: 100000, despesas: 50, churn: 5 },
    { periodo: 'Q2', receita: 200, despesas: 99000, churn: 500 },
  ];
  return (
    <div style={{ width: 900, height: 420 }}>
      <Chart data={data} xAxis="periodo" series={{ bar: ['despesas'], area: ['receita'], line: ['churn'] }} labelMap={{ receita: 'Receita (R$)', despesas: 'Despesas (R$)', churn: 'Taxa de Churn (%)' }} colors={["#dc2626","#16a34a","#2563eb"]} height={380} showGrid showLegend />
    </div>
  );
}
`,
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    await step("Verificar todos os tipos de série presentes", async () => {
      await waitFor(() => {
        const bars = canvasElement.querySelectorAll(".recharts-bar-rectangle");
        const areas = canvasElement.querySelectorAll(".recharts-area");
        const lines = canvasElement.querySelectorAll(".recharts-line");

        expect(bars.length).toBeGreaterThan(0);
        expect(areas.length).toBeGreaterThan(0);
        expect(lines.length).toBeGreaterThan(0);
      });
    });

    await step("Verificar grid e legenda visíveis", async () => {
      const grid = canvasElement.querySelector(".recharts-cartesian-grid");
      const legend = canvasElement.querySelector(".recharts-legend-wrapper");

      expect(grid).toBeInTheDocument();
      expect(legend).toBeInTheDocument();
    });

    await step("Verificar labels personalizados na legenda", async () => {
      const legend = canvasElement.querySelector(".recharts-legend-wrapper");
      expect(legend?.textContent).toContain("Receita");
      expect(legend?.textContent).toContain("Despesas");
      expect(legend?.textContent).toContain("Churn");
    });
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
  play: async ({ canvasElement, step }) => {
    await step("Verificar renderização de dataset grande", async () => {
      await waitFor(() => {
        const bars = canvasElement.querySelectorAll(".recharts-bar-rectangle");
        expect(bars.length).toBe(24);
      });
    });

    await step("Verificar múltiplas linhas no dataset grande", async () => {
      const lines = canvasElement.querySelectorAll(".recharts-line");
      expect(lines.length).toBe(2);
    });

    await step("Verificar eixo X com muitos pontos", async () => {
      const xAxisTicks = canvasElement.querySelectorAll(
        ".recharts-xAxis .recharts-cartesian-axis-tick"
      );
      expect(xAxisTicks.length).toBeGreaterThan(10);
    });
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

export const CategoryAndAxisLabels: Story = {
  name: "Categorias e Eixos",
  render: (args) => {
    const largeData = Array.from({ length: 12 }, (_, i) => ({
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
          series={{ bar: ["receita", "despesas"] }}
          labelMap={{ receita: "Receita" }}
          xAxis="periodo"
          xAxisLabel="Trimestre"
          yAxisLabel="Valor (R$)"
          categoryFormatter={(v) => {
            const map: Record<string, string> = {
              "Q1/24": "1º Trim/24",
              "Q2/24": "2º Trim/24",
              "Q3/24": "3º Trim/24",
              "Q4/24": "4º Trim/24",
            };
            const s = String(v ?? "");
            return (
              map[s] ??
              (s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : s)
            );
          }}
          valueFormatter={(props) => `R$ ${props.formattedValue}`}
          enableDraggableTooltips
          showTooltipTotal
          colors={["#10b981", "#ef4444"]}
          enablePeriodsDropdown
          enableHighlights
          enableShowOnly
          maxTooltips={10}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstra `categoryFormatter` para traduzir/ajustar categorias do eixo X e `xAxisLabel` / `yAxisLabel` para explicar os eixos sem alterar os dados originais.",
      },
      source: {
        code: `import Chart from '@/components/charts/Chart';

const data = [
  { periodo: 'Q1/24', receita: 4000 },
  { periodo: 'Q2/24', receita: 5200 },
  { periodo: 'Q3/24', receita: 6800 },
  { periodo: 'Q4/24', receita: 7500 },
];

export default function Example() {
  return (
    <div style={{ width: 900, height: 420 }}>
      <Chart
        data={data}
        xAxis="periodo"
        series={{ bar: ['receita'] }}
        labelMap={{ receita: 'Receita' }}
        xAxisLabel="Trimestre"
        yAxisLabel="Valor (R$)"
        categoryFormatter={(v) => {
          const map = { 'Q1/24': '1º Trim/24', 'Q2/24': '2º Trim/24' };
          return map[String(v)] ?? String(v);
        }}
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
  play: async ({ canvasElement, step }) => {
    await step("Verificar container renderizado", async () => {
      const wrapper = canvasElement.querySelector(
        '[data-testid="empty-chart-wrapper"]'
      );
      expect(wrapper).toBeInTheDocument();
    });

    await step("Verificar ausência de barras", async () => {
      const bars = canvasElement.querySelectorAll(".recharts-bar-rectangle");
      expect(bars.length).toBe(0);
    });

    await step("Verificar estado vazio do gráfico", async () => {
      // Com dados vazios, o gráfico pode não renderizar elementos recharts
      const chartContainer = canvasElement.querySelector(".recharts-wrapper");
      const bars = canvasElement.querySelectorAll(".recharts-bar-rectangle");
      const lines = canvasElement.querySelectorAll(".recharts-line");
      const areas = canvasElement.querySelectorAll(".recharts-area");

      // Verifica que não há dados renderizados
      expect(bars.length).toBe(0);
      expect(lines.length).toBe(0);
      expect(areas.length).toBe(0);

      // Se o wrapper existir, verifica que está presente
      if (chartContainer) {
        expect(chartContainer).toBeInTheDocument();
      }
    });
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
      source: {
        code: `import React, { useState } from 'react';
import Chart from '@mlw-packages/react-components';

export default function Playground() {
  const [data, setData] = useState([]);
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Chart data={data} xAxis="periodo" series={{ bar: ['despesas'] }} height={360} />
    </div>
  );
}
`,
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
