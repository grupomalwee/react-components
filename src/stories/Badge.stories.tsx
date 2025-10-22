import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { BadgeBase } from "../components/ui/BadgeBase";

interface BadgeStoryProps {
  text: string;
  variant?: "default" | "success" | "warning" | "error" | "info";
}

const BadgeStory = ({ text, variant = "default" }: BadgeStoryProps) => {
  const variantClasses = {
    default: "",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <BadgeBase className={variantClasses[variant]} data-testid="badge">
        {text}
      </BadgeBase>
    </div>
  );
};

const meta: Meta<typeof BadgeStory> = {
  title: "data/Badge",
  component: BadgeStory,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Badge para exibir status, categorias ou informações rápidas. Várias cores e estilos.",
      },
      source: {
        code: `import React from 'react';
import { BadgeBase } from '@mlw-packages/react-components';

export default function Example() {
  return <BadgeBase>Default</BadgeBase>;
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
    text: {
      control: "text",
      description: "Texto exibido no badge",
    },
    variant: {
      control: "select",
      options: ["default", "success", "warning", "error", "info"],
      description: "Variante visual do badge",
    },
  },
};

export default meta;
type Story = StoryObj<typeof BadgeStory>;

export const Default: Story = {
  args: {
    text: "Badge padrão",
    variant: "default",
  },
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { BadgeBase } from '@mlw-packages/react-components';

export default function Default() {
  return <BadgeBase>Badge padrão</BadgeBase>;
}
`,
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const badge = canvas.getByTestId("badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("Badge padrão");
  },
};

export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "12px",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
        flexWrap: "wrap",
      }}
    >
      <BadgeBase data-testid="badge-default">Default</BadgeBase>
      <BadgeBase
        className="bg-green-100 text-green-800"
        data-testid="badge-success"
      >
        Sucesso
      </BadgeBase>
      <BadgeBase
        className="bg-yellow-100 text-yellow-800"
        data-testid="badge-warning"
      >
        Aviso
      </BadgeBase>
      <BadgeBase className="bg-red-100 text-red-800" data-testid="badge-error">
        Erro
      </BadgeBase>
      <BadgeBase className="bg-blue-100 text-blue-800" data-testid="badge-info">
        Info
      </BadgeBase>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { BadgeBase } from '@mlw-packages/react-components';

export default function Variants() {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <BadgeBase>Default</BadgeBase>
      <BadgeBase className="bg-green-100 text-green-800">Sucesso</BadgeBase>
    </div>
  );
}
`,
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verificar todas as variantes estão presentes", async () => {
      expect(canvas.getByTestId("badge-default")).toBeInTheDocument();
      expect(canvas.getByTestId("badge-success")).toBeInTheDocument();
      expect(canvas.getByTestId("badge-warning")).toBeInTheDocument();
      expect(canvas.getByTestId("badge-error")).toBeInTheDocument();
      expect(canvas.getByTestId("badge-info")).toBeInTheDocument();
    });

    await step("Verificar textos corretos", async () => {
      expect(canvas.getByTestId("badge-default")).toHaveTextContent("Default");
      expect(canvas.getByTestId("badge-success")).toHaveTextContent("Sucesso");
      expect(canvas.getByTestId("badge-warning")).toHaveTextContent("Aviso");
      expect(canvas.getByTestId("badge-error")).toHaveTextContent("Erro");
      expect(canvas.getByTestId("badge-info")).toHaveTextContent("Info");
    });

    await step("Verificar classes das variantes coloridas", async () => {
      expect(canvas.getByTestId("badge-success")).toHaveClass(
        "bg-green-100",
        "text-green-800"
      );
      expect(canvas.getByTestId("badge-warning")).toHaveClass(
        "bg-yellow-100",
        "text-yellow-800"
      );
      expect(canvas.getByTestId("badge-error")).toHaveClass(
        "bg-red-100",
        "text-red-800"
      );
      expect(canvas.getByTestId("badge-info")).toHaveClass(
        "bg-blue-100",
        "text-blue-800"
      );
    });
  },
};
