import "../style/global.css";
import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DateTimePicker } from "../components/picker/DateTimePicker";
import { useState } from "react";

const meta: Meta<typeof DateTimePicker> = {
  title: "forms/Date Time Picker",
  component: DateTimePicker,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Componente para seleção de data e hora com diversas opções de configuração.",
      },
      source: {
        code: `import React, { useState } from 'react';\nimport { DateTimePicker } from '@mlw-packages/react-components';\n\nexport default function Example() {\n  const [date, setDate] = useState<Date | undefined>(new Date(2025, 9, 9, 14, 30, 0));\n  return <DateTimePicker label='Selecione uma data' date={date} onChange={setDate} />;\n}`,
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
    label: { control: "text" },
    displayFormat: {
      control: "text",
      description:
        "Formato customizado usando tokens do date-fns (ex: 'dd/MM/yyyy', 'PPP HH:mm', 'yyyy-MM-dd')",
    },
    hideTime: {
      control: "boolean",
      description: "Esconde toda a seleção de horário (hora, minuto e segundo)",
    },
    hideSeconds: { control: "boolean" },
    hideHour: { control: "boolean" },
    hideMinute: { control: "boolean" },
    disabled: { control: "boolean" },
    className: { control: "text" },
    fromDate: { control: "date" },
    toDate: { control: "date" },
  },
  args: {
    label: "Selecione uma data",
    hideTime: false,
    hideSeconds: false,
    hideHour: false,
    hideMinute: false,
    disabled: false,
    className: "",
  },
};

export default meta;
type Story = StoryObj<typeof DateTimePicker>;

const Template = (
  args: Partial<React.ComponentProps<typeof DateTimePicker>>
) => {
  const [date, setDate] = useState<Date | undefined>(args.date);
  return <DateTimePicker {...args} date={date} onChange={setDate} />;
};

export const Default: Story = {
  render: Template,
  args: {
    date: new Date(2025, 9, 9, 14, 30, 0),
  },
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';\nimport { DateTimePicker } from '@mlw-packages/react-components';\n\nexport default function Example() {\n  const [date, setDate] = useState<Date | undefined>(new Date(2025,9,9,14,30,0));\n  return <DateTimePicker label='Selecione uma data' date={date} onChange={setDate} />;\n}`,
      },
    },
  },
};

export const TimeVariants: Story = {
  name: "Variantes de Tempo",
  render: () => {
    const [date1, setDate1] = useState<Date | undefined>(
      new Date(2025, 9, 9, 14, 30, 0)
    );
    const [date2, setDate2] = useState<Date | undefined>(
      new Date(2025, 9, 9, 14, 30, 0)
    );
    const [date3, setDate3] = useState<Date | undefined>(
      new Date(2025, 9, 9, 14, 30, 0)
    );
    const [date4, setDate4] = useState<Date | undefined>(
      new Date(2025, 9, 9, 14, 30, 0)
    );
    const [date5, setDate5] = useState<Date | undefined>(
      new Date(2025, 9, 9, 14, 30, 0)
    );

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div>
          <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
            Apenas Data (hideTime)
          </h3>
          <DateTimePicker
            label="Apenas data"
            hideTime={true}
            date={date1}
            onChange={setDate1}
          />
        </div>
        <div>
          <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
            Sem Segundos
          </h3>
          <DateTimePicker
            label="Sem segundos"
            hideSeconds={true}
            date={date2}
            onChange={setDate2}
          />
        </div>
        <div>
          <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
            Apenas Data (hideHour + hideMinute)
          </h3>
          <DateTimePicker
            label="Apenas data (alternativa)"
            hideHour={true}
            hideMinute={true}
            date={date3}
            onChange={setDate3}
          />
        </div>
        <div>
          <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
            Sem Minutos
          </h3>
          <DateTimePicker
            label="Sem minutos"
            hideMinute={true}
            date={date4}
            onChange={setDate4}
          />
        </div>
        <div>
          <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
            Apenas Minutos (sem hora)
          </h3>
          <DateTimePicker
            label="Apenas minutos"
            hideHour={true}
            date={date5}
            onChange={setDate5}
          />
        </div>
      </div>
    );
  },

  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';\nimport { DateTimePicker } from '@mlw-packages/react-components';\n\nexport default function TimeVariants() {\n  const [d1, setD1] = useState(new Date());\n  const [d2, setD2] = useState(new Date());\n  const [d3, setD3] = useState(new Date());\n  const [d4, setD4] = useState(new Date());\n  const [d5, setD5] = useState(new Date());\n  return (\n    <>\n      <DateTimePicker label='Apenas data' hideTime date={d1} onChange={setD1} />\n      <DateTimePicker label='Sem segundos' hideSeconds date={d2} onChange={setD2} />\n      <DateTimePicker label='Apenas data (alternativa)' hideHour hideMinute date={d3} onChange={setD3} />\n      <DateTimePicker label='Sem minutos' hideMinute date={d4} onChange={setD4} />\n      <DateTimePicker label='Apenas minutos' hideHour date={d5} onChange={setD5} />\n    </>\n  );\n}`,
      },
    },
  },
};

export const ConfigurationOptions: Story = {
  name: "Opções de Configuração",
  render: () => {
    const [date1, setDate1] = useState<Date | undefined>(
      new Date(2025, 9, 9, 14, 30, 0)
    );
    const [date2, setDate2] = useState<Date | undefined>(
      new Date(2025, 9, 9, 14, 30, 0)
    );
    const [date3, setDate3] = useState<Date | undefined>(
      new Date(2025, 9, 9, 14, 30, 0)
    );

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div>
          <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
            Desabilitado
          </h3>
          <DateTimePicker
            label="Campo desabilitado"
            disabled={true}
            date={date1}
            onChange={setDate1}
          />
        </div>
        <div>
          <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
            Com Limites de Data (próximos 30 dias)
          </h3>
          <DateTimePicker
            label="Próximos 30 dias"
            fromDate={new Date()}
            toDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
            date={date2}
            onChange={setDate2}
          />
        </div>
        <div>
          <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
            Sem Label
          </h3>
          <DateTimePicker date={date3} onChange={setDate3} />
        </div>
      </div>
    );
  },

  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';\nimport { DateTimePicker } from '@mlw-packages/react-components';\n\nexport default function ConfigurationOptions() {\n  const [d1, setD1] = useState(new Date());\n  const [d2, setD2] = useState(new Date());\n  const [d3, setD3] = useState(new Date());\n  return (\n    <>\n      <DateTimePicker label='Campo desabilitado' disabled date={d1} onChange={setD1} />\n      <DateTimePicker label='Próximos 30 dias' fromDate={new Date()} toDate={new Date(Date.now() + 30*24*60*60*1000)} date={d2} onChange={setD2} />\n      <DateTimePicker date={d3} onChange={setD3} />\n    </>\n  );\n}`,
      },
    },
  },
};

export const WithTimePickerButton: Story = {
  name: "Botão de Horas",

  render: Template,
  args: {
    label: "Data com Time Picker Button",
    date: new Date(2025, 9, 9, 14, 30, 0),
  },
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';\nimport { DateTimePicker } from '@mlw-packages/react-components';\n\nexport default function WithTimePickerButton() {\n  const [date, setDate] = useState(new Date());\n  return <DateTimePicker label='Data com Time Picker Button' date={date} onChange={setDate} />;\n}`,
      },
    },
  },
};

export const DisplayOnly: Story = {
  name: "Formatos de Exibição",
  render: () => {
    const [date1, setDate1] = useState<Date | undefined>(
      new Date(2025, 9, 9, 14, 30, 0)
    );
    const [date2, setDate2] = useState<Date | undefined>(
      new Date(2025, 9, 9, 14, 30, 0)
    );
    const [date3, setDate3] = useState<Date | undefined>(
      new Date(2025, 9, 9, 14, 30, 0)
    );
    const [date4, setDate4] = useState<Date | undefined>(
      new Date(2025, 9, 9, 14, 30, 0)
    );
    const [date5, setDate5] = useState<Date | undefined>(
      new Date(2025, 9, 9, 14, 30, 0)
    );
    const [date6, setDate6] = useState<Date | undefined>(
      new Date(2025, 9, 9, 14, 30, 0)
    );

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div>
          <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
            Formato: dd/MM/yyyy
          </h3>
          <DateTimePicker
            label="Data BR"
            date={date1}
            onChange={setDate1}
            displayFormat="dd/MM/yyyy"
            hideTime
          />
        </div>
        <div>
          <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
            Formato: dd/MM/yyyy HH:mm
          </h3>
          <DateTimePicker
            label="Data e Hora BR"
            date={date2}
            onChange={setDate2}
            displayFormat="dd/MM/yyyy HH:mm"
          />
        </div>
        <div>
          <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
            Formato: yyyy-MM-dd HH:mm:ss (ISO)
          </h3>
          <DateTimePicker
            label="Formato ISO"
            date={date3}
            onChange={setDate3}
            displayFormat="yyyy-MM-dd HH:mm:ss"
          />
        </div>
        <div>
          <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
            Formato: PPP (Localizado)
          </h3>
          <DateTimePicker
            label="Data por extenso"
            date={date4}
            onChange={setDate4}
            displayFormat="PPP"
            hideTime
          />
        </div>
        <div>
          <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
            Formato: PPPP (Completo)
          </h3>
          <DateTimePicker
            label="Data completa"
            date={date5}
            onChange={setDate5}
            displayFormat="PPPP"
            hideTime
          />
        </div>
        <div>
          <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
            Formato: EEE, dd/MM/yyyy
          </h3>
          <DateTimePicker
            label="Com dia da semana"
            date={date6}
            onChange={setDate6}
            displayFormat="EEE, dd/MM/yyyy"
            hideTime
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';\nimport { DateTimePicker } from '@mlw-packages/react-components';\n\nexport default function DisplayFormats() {\n  const [date, setDate] = useState(new Date());\n  return (\n    <>\n      <DateTimePicker label='Data BR' displayFormat='dd/MM/yyyy' hideTime date={date} onChange={setDate} />\n      <DateTimePicker label='Data e Hora BR' displayFormat='dd/MM/yyyy HH:mm' date={date} onChange={setDate} />\n      <DateTimePicker label='Formato ISO' displayFormat='yyyy-MM-dd HH:mm:ss' date={date} onChange={setDate} />\n      <DateTimePicker label='Data por extenso' displayFormat='PPP' hideTime date={date} onChange={setDate} />\n      <DateTimePicker label='Data completa' displayFormat='PPPP' hideTime date={date} onChange={setDate} />\n      <DateTimePicker label='Com dia da semana' displayFormat='EEE, dd/MM/yyyy' hideTime date={date} onChange={setDate} />\n    </>\n  );\n}`,
      },
    },
  },
};
export const WithError: Story = {
  render: Template,
  args: {
    label: "Erro",
    date: new Date(2025, 9, 9, 14, 30, 0),
    error: "Data inválida",
  },
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';\nimport { DateTimePicker } from '@mlw-packages/react-components';\n\nexport default function WithTimePickerButton() {\n  const [date, setDate] = useState(new Date());\n  return <DateTimePicker label='Data com Time Picker Button' date={date} onChange={setDate} />;\n}`,
      },
    },
  },
};

export const OpenOnRangeBounds: Story = {
  name: "Abrir no mês dos limites (fromDate / toDate)",
  render: () => {
    const [d, setD] = useState<Date | undefined>(undefined);

    const from = new Date(2026, 1, 12);
    const to = new Date(2026, 1, 24);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div>
          <DateTimePicker
            label="Período: 24/02 → 06/03"
            date={d}
            onChange={setD}
            fromDate={from}
            toDate={to}
            hideTime
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `// Exemplo: DateTimePicker com limites de 24/02/2026 a 06/03/2026
import React, { useState } from 'react';
import { DateTimePicker } from '@mlw-packages/react-components';

export default function OpenOnRangeBounds() {
  const [d, setD] = useState<Date | undefined>(undefined);
  const from = new Date(2026, 1, 24);
  const to = new Date(2026, 2, 6);

  return (
    <DateTimePicker label='Período: 24/02 → 06/03' date={d} onChange={setD} fromDate={from} toDate={to} />
  );
}
`,
      },
    },
  },
};
