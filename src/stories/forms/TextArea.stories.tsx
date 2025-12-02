import "../../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextAreaBase } from "../components/ui/form/TextAreaBase";

const meta: Meta<typeof TextAreaBase> = {
  title: "forms/Text Area",
  component: TextAreaBase,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
TextArea para entrada de texto, comentários e formulários.
        `,
      },
      source: {
        code: `import React from 'react';
import { TextAreaBase } from '@mlw-packages/react-components';

export default function Example() {
  return <TextAreaBase placeholder="Digite algo..." maxLength={200} clearable />;
}`,
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
    clearable: {
      control: "boolean",
      description:
        "Habilita o botão de limpar conteúdo com confirmação via tooltip",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onClear: {
      description: "Callback chamado após confirmar a limpeza do texto",
      table: {
        type: { summary: "() => void" },
      },
    },
    placeholder: {
      control: "text",
      description: "Texto de placeholder",
    },
    disabled: {
      control: "boolean",
      description: "Desabilita o textarea",
    },
    maxLength: {
      control: "number",
      description:
        "Número máximo de caracteres. Mostra contador quando focado.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextAreaBase>;

export const Default: Story = {
  args: {
    placeholder: "Digite algo...",
  },
  parameters: {
    docs: {
      source: {
        code: `import { TextAreaBase } from '@mlw-packages/react-components';

<TextAreaBase placeholder="Digite algo..." />`,
      },
    },
  },
  render: (args) => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
        minWidth: "400px",
      }}
    >
      <TextAreaBase {...args} />
    </div>
  ),
};
