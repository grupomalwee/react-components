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
          "Componente para seleção de data e hora com diversas opções de configuração. Permite ocultar partes específicas do tempo e personalizar a experiência do usuário.",
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

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div>
          <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
            Sem Segundos
          </h3>
          <DateTimePicker
            label="Sem segundos"
            hideSeconds={true}
            date={date1}
            onChange={setDate1}
          />
        </div>
        <div>
          <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
            Apenas Data (sem hora/minuto)
          </h3>
          <DateTimePicker
            label="Apenas data"
            hideHour={true}
            hideMinute={true}
            date={date2}
            onChange={setDate2}
          />
        </div>
        <div>
          <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
            Sem Minutos
          </h3>
          <DateTimePicker
            label="Sem minutos"
            hideMinute={true}
            date={date3}
            onChange={setDate3}
          />
        </div>
        <div>
          <h3 style={{ marginBottom: "8px", fontSize: "14px", color: "#666" }}>
            Apenas Minutos (sem hora)
          </h3>
          <DateTimePicker
            label="Apenas minutos"
            hideHour={true}
            date={date4}
            onChange={setDate4}
          />
        </div>
      </div>
    );
  },

  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';\nimport { DateTimePicker } from '@mlw-packages/react-components';\n\nexport default function TimeVariants() {\n  const [d1, setD1] = useState(new Date());\n  const [d2, setD2] = useState(new Date());\n  const [d3, setD3] = useState(new Date());\n  const [d4, setD4] = useState(new Date());\n  return (\n    <>\n      <DateTimePicker label='Sem segundos' hideSeconds date={d1} onChange={setD1} />\n      <DateTimePicker label='Apenas data' hideHour hideMinute date={d2} onChange={setD2} />\n      <DateTimePicker label='Sem minutos' hideMinute date={d3} onChange={setD3} />\n      <DateTimePicker label='Apenas minutos' hideHour date={d4} onChange={setD4} />\n    </>\n  );\n}`,
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
  render: Template,
  args: {
    label: "Data (dd/MM/yyyy)",
    date: new Date(2025, 9, 9, 14, 30, 0),
    display: true,
  },
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';\nimport { DateTimePicker } from '@mlw-packages/react-components';\n\nexport default function DisplayOnly() {\n  const [date, setDate] = useState<Date | undefined>(new Date(2025,9,9,14,30,0));\n  return <DateTimePicker label='Data (dd/MM/yyyy)' date={date} onChange={setDate} display />;\n}`,
      },
    },
  },
};
export const WithError: Story = {
  render: Template,
  args: {
    label: "Data com Erro",
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
