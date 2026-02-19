import React, { useState, useEffect, useMemo, useRef } from "react";
import Chart from "@/components/ui/charts/Chart";
import "../../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ButtonBase } from "@/components/ui/form/ButtonBase";

const generateLargeDataset = (
  dataPoints: number,
  start = new Date(2020, 0, 1),
) => {
  const data: Array<Record<string, string | number>> = [];
  const startDate = new Date(start);

  for (let i = 0; i < dataPoints; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    data.push({
      periodo: date.toISOString().split("T")[0],
      vendas: Math.floor(Math.random() * 10000) + 5000,
      custos: Math.floor(Math.random() * 7000) + 3000,
      lucro: Math.floor(Math.random() * 5000) + 2000,
      clientes: Math.floor(Math.random() * 500) + 100,
      churn: Math.floor(Math.random() * 50) + 10,
      conversao: Math.floor(Math.random() * 30) + 5,
    });
  }

  return data;
};

const generateMultiSeriesData = (dataPoints: number, seriesCount: number) => {
  const data: Array<Record<string, string | number>> = [];

  for (let i = 0; i < dataPoints; i++) {
    const item: Record<string, string | number> = {
      periodo: `P${i + 1}`,
    };

    for (let s = 0; s < seriesCount; s++) {
      item[`serie${s + 1}`] = Math.floor(Math.random() * 1000) + 100;
    }

    data.push(item);
  }

  return data;
};

const meta: Meta<typeof Chart> = {
  title: "charts/Performance",
  component: Chart,
  parameters: {
    docs: {
      description: {
        component:
          "Testes de carga e estresse para avaliar o comportamento do componente Chart com volumes reais de dados.",
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f6f6f6" },
        { name: "dark", value: "#222" },
      ],
    },
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Chart>;

export const Load100Points: Story = {
  args: {
    data: generateLargeDataset(100),
    series: {
      bar: ["vendas", "custos"],
      line: ["lucro"],
    },
    xAxis: "periodo",
    title: "100 Pontos",
    height: 400,
    showGrid: true,
    showLegend: true,
    labelMap: {
      vendas: "Vendas",
      custos: "Custos",
      lucro: "Lucro",
    },
    enableHighlights: true,
    enableShowOnly: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Teste com 100 pontos de dados. Performance esperada: Excelente.",
      },
      source: {
        code: `import React from 'react';
import Chart from '@mlw-packages/react-components';

// Mock function to generate data
const generateData = (count) => Array.from({ length: count }, (_, i) => ({
  periodo: \`2024-01-\${i + 1}\`,
  vendas: Math.random() * 1000,
  custos: Math.random() * 800,
  lucro: Math.random() * 200,
}));

export default function Load100Points() {
  const data = generateData(100);
  return (
    <Chart
      data={data}
      series={{ bar: ["vendas", "custos"], line: ["lucro"] }}
      xAxis="periodo"
    />
  );
}
`,
      },
    },
  },
};

export const Load500Points: Story = {
  args: {
    data: generateLargeDataset(500),
    series: {
      bar: ["vendas"],
      line: ["custos", "lucro"],
      area: ["clientes"],
    },
    xAxis: "periodo",
    title: "500 Pontos",
    height: 400,
    showGrid: true,
    showLegend: true,
    labelMap: {
      vendas: "Vendas",
      custos: "Custos",
      lucro: "Lucro",
      clientes: "Clientes",
    },
    enableHighlights: true,
    enableShowOnly: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Teste com 500 pontos de dados. Performance esperada: Boa.",
      },
      source: {
        code: `import React from 'react';
import Chart from '@mlw-packages/react-components';

// Mock function
const generateData = (count) => Array.from({ length: count }, (_, i) => ({
  periodo: \`P\${i}\`,
  vendas: Math.random() * 1000,
}));

export default function Load500Points() {
  const data = generateData(500);
  return (
    <Chart
      data={data}
      series={{ bar: ["vendas"] }}
      xAxis="periodo"
    />
  );
}
`,
      },
    },
  },
};

export const Load1000Points: Story = {
  args: {
    data: generateLargeDataset(1000),
    series: {
      bar: ["vendas", "custos"],
      line: ["lucro"],
    },
    xAxis: "periodo",
    title: "1000 Pontos",
    height: 400,
    showGrid: true,
    showLegend: true,
    labelMap: {
      vendas: "Vendas",
      custos: "Custos",
      lucro: "Lucro",
    },
    enableHighlights: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Teste com 1000 pontos de dados. Performance esperada: Moderada. Pode haver lentidão na renderização.",
      },
      source: {
        code: `import React from 'react';
import Chart from '@mlw-packages/react-components';

export default function Load1000Points() {
  // ... generating 1000 points
  return (
    <Chart
      data={data}
      series={{ bar: ["vendas"] }}
      xAxis="periodo"
    />
  );
}
`,
      },
    },
  },
};

export const StressMultipleSeries: Story = {
  args: {
    data: generateMultiSeriesData(100, 20),
    series: {
      bar: Array.from({ length: 10 }, (_, i) => `serie${i + 1}`),
      line: Array.from({ length: 10 }, (_, i) => `serie${i + 11}`),
    },
    xAxis: "periodo",
    title: "20 Séries",
    height: 500,
    showGrid: true,
    showLegend: true,
    enableHighlights: true,
    enableShowOnly: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Teste de estresse com 20 séries diferentes. Avalia a capacidade de renderizar múltiplas séries simultaneamente.",
      },
      source: {
        code: `import React from 'react';
import Chart from '@mlw-packages/react-components';

export default function StressMultipleSeries() {
  // ... generating data with 20 series
  const series = {
    bar: Array.from({ length: 10 }, (_, i) => \`serie\${i + 1}\`),
    line: Array.from({ length: 10 }, (_, i) => \`serie\${i + 11}\`),
  };
  
  return (
    <Chart
      data={data}
      series={series}
      xAxis="periodo"
    />
  );
}
`,
      },
    },
  },
};

export const StressWithAllLabels: Story = {
  args: {
    data: generateLargeDataset(200),
    series: {
      bar: ["vendas", "custos"],
      line: ["lucro"],
    },
    xAxis: "periodo",
    title: "Labels em Todos os Pontos",
    height: 400,
    showGrid: true,
    showLegend: true,
    showLabels: true,
    labelMap: {
      vendas: "Vendas",
      custos: "Custos",
      lucro: "Lucro",
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Teste de estresse com labels visíveis em todos os 200 pontos. Avalia a performance de renderização de texto.",
      },
      source: {
        code: `import React from 'react';
import Chart from '@mlw-packages/react-components';

export default function StressWithAllLabels() {
  return (
    <Chart
      data={data}
      series={{ bar: ["vendas"] }}
      xAxis="periodo"
      showLabels={true}
    />
  );
}
`,
      },
    },
  },
};

export const StressExtreme: Story = {
  args: {
    data: generateMultiSeriesData(500, 15),
    series: {
      bar: Array.from({ length: 5 }, (_, i) => `serie${i + 1}`),
      line: Array.from({ length: 5 }, (_, i) => `serie${i + 6}`),
      area: Array.from({ length: 5 }, (_, i) => `serie${i + 11}`),
    },
    xAxis: "periodo",
    title: "500 Pontos x 15 Séries",
    height: 500,
    showGrid: true,
    showLegend: true,
    enableHighlights: true,
    enableShowOnly: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "500 pontos de dados com 15 séries (7500 pontos renderizados). Pode causar lentidão significativa.",
      },
      source: {
        code: `import React from 'react';
import Chart from '@mlw-packages/react-components';

export default function StressExtreme() {
  // ... 500 points x 15 series
  return (
    <Chart
      data={data}
      series={series}
      xAxis="periodo"
    />
  );
}
`,
      },
    },
  },
};

export const StressRealTimeUpdates: Story = {
  render: () => {
    const initial = useMemo(() => generateLargeDataset(10, new Date()), []);
    const [data, setData] = useState(initial);
    const [isUpdating, setIsUpdating] = useState(false);
    const lastDateRef = useRef(new Date(initial[initial.length - 1].periodo));

    useEffect(() => {
      if (!isUpdating) return;

      const interval = setInterval(() => {
        const next = new Date(lastDateRef.current);
        next.setDate(next.getDate() + 1);

        const newPoint = {
          periodo: next.toISOString().split("T")[0],
          vendas: Math.round(Math.random() * 1000) + 5000,
          custos: Math.round(Math.random() * 7000) + 3000,
          lucro: Math.round(Math.random() * 5000) + 2000,
        };

        setData((prev) => {
          const nextArr = [...prev.slice(prev.length > 99 ? 1 : 0), newPoint];
          return nextArr;
        });

        lastDateRef.current = next;
      }, 2000);

      return () => clearInterval(interval);
    }, [isUpdating]);

    return (
      <div style={{ padding: "2rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <ButtonBase
            onClick={() => setIsUpdating((s) => !s)}
            variant={isUpdating ? "destructive" : "default"}
            size="sm"
          >
            {isUpdating ? "Pausar atualizações" : "Iniciar atualizações (1s)"}
          </ButtonBase>
        </div>
        <Chart
          data={data}
          series={{ bar: ["vendas", "custos"], line: ["lucro"] }}
          xAxis="periodo"
          title="Atualizações em tempo real"
          height={400}
          showGrid={true}
          showLegend={true}
          labelMap={{ vendas: "Vendas", custos: "Custos", lucro: "Lucro" }}
          enableHighlights={true}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Teste de estresse com atualizações em tempo real. Avalia a performance de re-renderização do componente.",
      },
      source: {
        code: `import React, { useState, useEffect } from 'react';
import Chart from '@mlw-packages/react-components';

export default function StressRealTimeUpdates() {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const interval = setInterval(() => {
        // update data ...
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Chart
      data={data}
      series={{ bar: ["vendas"] }}
      xAxis="periodo"
    />
  );
}
`,
      },
    },
  },
};

export const StressTimeSeriesWithBrush: Story = {
  args: {
    data: generateLargeDataset(1000),
    series: {
      bar: ["vendas"],
      line: ["custos", "lucro"],
    },
    xAxis: "periodo",
    title: "1000 Pontos com Brush",
    height: 400,
    showGrid: true,
    showLegend: true,
    timeSeries: {
      start: 0,
      end: 100,
      height: 60,
    },
    timeSeriesLegend: "Navegação Temporal",
    labelMap: {
      vendas: "Vendas",
      custos: "Custos",
      lucro: "Lucro",
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Teste com 1000 pontos usando TimeSeries e Brush para navegação. Avalia performance da navegação temporal.",
      },
      source: {
        code: `import React from 'react';
import Chart from '@mlw-packages/react-components';

export default function StressTimeSeriesWithBrush() {
  return (
    <Chart
      data={data}
      series={{ bar: ["vendas"] }}
      xAxis="periodo"
      timeSeries={{ start: 0, end: 100, height: 60 }}
    />
  );
}
`,
      },
    },
  },
};

export const StressDraggableTooltips: Story = {
  args: {
    data: generateLargeDataset(300),
    series: {
      bar: ["vendas", "custos"],
      line: ["lucro"],
    },
    xAxis: "periodo",
    title: "Tooltips Arrastáveis (300 pontos)",
    height: 500,
    showGrid: true,
    showLegend: true,
    enableDraggableTooltips: true,
    enablePeriodsDropdown: true,
    enableHighlights: true,
    enableShowOnly: true,
    maxTooltips: 5,
    labelMap: {
      vendas: "Vendas",
      custos: "Custos",
      lucro: "Lucro",
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Teste com tooltips arrastáveis em dataset com 300 pontos. Avalia performance de interação.",
      },
      source: {
        code: `import React from 'react';
import Chart from '@mlw-packages/react-components';

export default function StressDraggableTooltips() {
  return (
    <Chart
      data={data}
      series={{ bar: ["vendas"] }}
      xAxis="periodo"
      enableDraggableTooltips={true}
    />
  );
}
`,
      },
    },
  },
};
