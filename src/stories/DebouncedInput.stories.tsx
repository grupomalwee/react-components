import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import DebouncedInput from "../components/ui/form/DebouncedInput";
import { useState } from "react";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

const meta: Meta<typeof DebouncedInput> = {
  title: "forms/Debounced Input",
  component: DebouncedInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Input com debounce para reduzir chamadas de API e melhorar performance. Ideal para campos de busca e validação em tempo real.",
      },
      source: {
        code: `import React, { useState } from 'react';\nimport DebouncedInput from '@mlw-packages/react-components';\nimport { MagnifyingGlassIcon } from '@phosphor-icons/react';\n\nexport default function Example() {\n  const [value, setValue] = useState('');\n  return (\n    <DebouncedInput value={value} onChange={setValue} debounce={500} placeholder='Digite algo...' rightIcon={<MagnifyingGlassIcon />} />\n  );\n}`,
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
    value: {
      control: "text",
      description: "Valor controlado do input",
    },
    debounce: {
      control: { type: "number", min: 0, max: 2000, step: 100 },
      description: "Delay em milissegundos para o debounce",
    },
    placeholder: {
      control: "text",
      description: "Texto placeholder do input",
    },
    disabled: {
      control: "boolean",
      description: "Desabilitar o input",
    },
    rightIcon: {
      control: false,
      description: "Ícone à direita do input",
    },
  },
  args: {
    value: "",
    debounce: 500,
    placeholder: "Digite algo...",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof DebouncedInput>;

const DebouncedInputWrapper = (
  args: React.ComponentProps<typeof DebouncedInput>
) => {
  const [value, setValue] = useState(args.value || "");

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <div style={{ width: "300px", maxWidth: "100%" }}>
      <DebouncedInput
        {...args}
        value={value}
        onChange={handleChange}
        rightIcon={<MagnifyingGlassIcon />}
      />
      <div
        style={{
          marginTop: "12px",
          padding: "8px",
          backgroundColor: "#f3f4f6",
          borderRadius: "6px",
          fontSize: "14px",
          color: "#6b7280",
        }}
      >
        <div>Valor atual: "{value}"</div>
      </div>
    </div>
  );
};

export const Default: Story = {
  render: (args) => <DebouncedInputWrapper {...args} />,
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';\nimport DebouncedInput from '@mlw-packages/react-components';\nimport { MagnifyingGlassIcon } from '@phosphor-icons/react';\n\nexport default function Example() {\n  const [value, setValue] = useState('');\n  return (\n    <DebouncedInput value={value} onChange={setValue} debounce={500} placeholder='Digite algo...' rightIcon={<MagnifyingGlassIcon />} />\n  );\n}`,
      },
    },
  },
};
export const WithError: Story = {
  render: (args) => (
    <DebouncedInputWrapper {...args} error="Falha na pesquisa" />
  ),
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';\nimport DebouncedInput from '@mlw-packages/react-components';\nimport { MagnifyingGlassIcon } from '@phosphor-icons/react';\n\nexport default function Example() {\n  const [value, setValue] = useState('');\n  return (\n    <DebouncedInput value={value} onChange={setValue} debounce={500} placeholder='Digite algo...' rightIcon={<MagnifyingGlassIcon />} error='Campo obrigatório' />\n  );\n}`,
      },
    },
  },
};
