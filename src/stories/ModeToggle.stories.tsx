import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ModeToggleBase } from "../components/mode-toggle";
import { ThemeProviderBase } from "../components/theme-provider";

const meta: Meta<typeof ModeToggleBase> = {
  title: "Theme/Mode Toggle",
  component: ModeToggleBase,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Componente para alternância de temas com suporte a múltiplas variações de cores. Permite ao usuário escolher entre tema claro, escuro, sistema e variações customizadas (purple, blue, green).",
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
    themes: {
      control: "object",
      description: "Array de temas disponíveis para seleção",
      table: {
        type: { summary: "string[]" },
        defaultValue: { summary: '["light", "dark", "system"]' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ModeToggleBase>;

export const Default: Story = {
  name: "Básico",
  render: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <ThemeProviderBase>
        <ModeToggleBase themes={["light", "dark", "system"]} />
      </ThemeProviderBase>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Toggle básico com opções padrão: claro, escuro e sistema.",
      },
      source: {
        code: `import React from 'react';
import { ThemeProviderBase, ModeToggleBase } from '@mlw-packages/react-components';

export default function Example() {
  return (
    <ThemeProviderBase>
      <ModeToggleBase themes={["light", "dark", "system"]} />
    </ThemeProviderBase>
  );
}`,
      },
    },
  },
};

export const AllThemes: Story = {
  name: "Todos os Temas",
  render: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <ThemeProviderBase>
        <ModeToggleBase
          themes={[
            "light",
            "dark",
            "system",
            "light-purple",
            "dark-purple",
            "light-blue",
            "dark-blue",
            "light-green",
            "dark-green",
          ]}
        />
      </ThemeProviderBase>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Toggle com todas as variações de temas disponíveis, incluindo versões customizadas com cores purple, blue e green.",
      },
      source: {
        code: `import React from 'react';
import { ThemeProviderBase, ModeToggleBase } from '@mlw-packages/react-components';

export default function Example() {
  return (
    <ThemeProviderBase>
      <ModeToggleBase
        themes={[
          "light",
          "dark",
          "system",
          "light-purple",
          "dark-purple",
          "light-blue",
          "dark-blue",
          "light-green",
          "dark-green",
        ]}
      />
    </ThemeProviderBase>
  );
}`,
      },
    },
  },
};

export const ColorVariants: Story = {
  name: "Variantes de Cores",
  render: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <ThemeProviderBase>
        <ModeToggleBase
          themes={["light-purple", "dark-purple", "light-blue", "dark-green"]}
        />
      </ThemeProviderBase>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Toggle com diferentes variantes de cores personalizadas (purple, blue, green).",
      },
      source: {
        code: `import React from 'react';
import { ThemeProviderBase, ModeToggleBase } from '@mlw-packages/react-components';

export default function Example() {
  return (
    <ThemeProviderBase>
      <ModeToggleBase
        themes={["light-purple", "dark-purple", "light-blue", "dark-green"]}
      />
    </ThemeProviderBase>
  );
}`,
      },
    },
  },
};
