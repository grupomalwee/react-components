import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Combobox } from "@/components/selects/Combobox";
import React from "react";
import { expect} from "storybook/test";

const meta: Meta<typeof Combobox> = {
  title: "selects/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Combobox para seleção de opções, com busca, controle e visualização centralizada.",
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
};

export default meta;
type Story = StoryObj<typeof Combobox>;

export const Default: Story = {
  name: "Padrão",
  render: () => {
    const items = [
      { label: "JavaScript", value: "js" },
      { label: "TypeScript", value: "ts" },
      { label: "Python", value: "py" },
      { label: "Java", value: "java" },
    ];
    const [selected, setSelected] = React.useState<string>(items[0].value);
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "32px 0",
        }}
      >
        <div className="flex flex-col items-center justify-center p-10">
          <Combobox
            items={items}
            selected={selected}
            onChange={(value) => {
              if (value !== null) setSelected(value);
            }}
            label="Linguagem de Programação"
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Combobox básico com seleção inicial.",
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    await step("Verificar componente renderizado", async () => {
      const root = canvasElement.querySelector(
        '[data-testid="combobox-base-root"]'
      );
      expect(root).toBeInTheDocument();
    });

    await step("Verificar opção pré-selecionada", async () => {
      const selected = canvasElement.querySelector(
        '[data-testid="combobox-selected"]'
      );
      expect(selected).toBeInTheDocument();
      expect(selected?.textContent).toContain("JavaScript");
    });

    await step("Verificar trigger presente", async () => {
      const trigger = canvasElement.querySelector(
        '[data-testid="combobox-trigger"]'
      );
      expect(trigger).toBeInTheDocument();
    });
  },
};

export const Empty: Story = {
  name: "Vazio (Sem Seleção)",
  render: () => {
    const items = [
      { label: "JavaScript", value: "js" },
      { label: "TypeScript", value: "ts" },
      { label: "Python", value: "py" },
    ];
    const [selected, setSelected] = React.useState<string | null>(null);
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "32px 0",
        }}
      >
        <div className="flex flex-col items-center justify-center p-10">
          <Combobox
            items={items}
            selected={selected}
            onChange={setSelected}
            placeholder="Escolha uma linguagem..."
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Combobox sem nenhum item selecionado, exibindo placeholder customizado.",
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    await step("Verificar componente renderizado", async () => {
      const root = canvasElement.querySelector(
        '[data-testid="combobox-base-root"]'
      );
      expect(root).toBeInTheDocument();
    });

    await step("Verificar placeholder customizado", async () => {
      const selected = canvasElement.querySelector(
        '[data-testid="combobox-selected"]'
      );
      expect(selected).toBeInTheDocument();
      expect(selected?.textContent).toContain("Escolha uma linguagem");
    });
  },
};

export const LargeList: Story = {
  name: "Lista Grande (100 itens)",
  render: () => {
    const items = Array.from({ length: 100 }, (_, i) => ({
      label: `Item ${i + 1}`,
      value: `item-${i + 1}`,
    }));
    const [selected, setSelected] = React.useState<string>("item-50");
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "32px 0",
        }}
      >
        <div className="flex flex-col items-center justify-center p-10">
          <Combobox
            items={items}
            selected={selected}
            onChange={(value) => {
              if (value !== null) setSelected(value);
            }}
            label="Lista com 100 itens"
            searchPlaceholder="Buscar item..."
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Combobox com uma lista extensa de 100 itens para testar performance e scroll.",
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    await step("Verificar componente renderizado", async () => {
      const root = canvasElement.querySelector(
        '[data-testid="combobox-base-root"]'
      );
      expect(root).toBeInTheDocument();
    });

    await step("Verificar item 50 selecionado", async () => {
      const selected = canvasElement.querySelector(
        '[data-testid="combobox-selected"]'
      );
      expect(selected?.textContent).toContain("Item 50");
    });
  },
};

export const SpecialCharacters: Story = {
  name: "Caracteres Especiais",
  render: () => {
    const items = [
      { label: "C++", value: "cpp" },
      { label: "C#", value: "csharp" },
      { label: "F#", value: "fsharp" },
      { label: "@angular/core", value: "angular" },
      { label: "Emoji 🚀 Test", value: "emoji" },
      { label: "Acentuação: á é í ó ú", value: "accents" },
    ];
    const [selected, setSelected] = React.useState<string>("emoji");
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "32px 0",
        }}
      >
        <div className="flex flex-col items-center justify-center p-10">
          <Combobox
            items={items}
            selected={selected}
            onChange={(value) => {
              if (value !== null) setSelected(value);
            }}
            label="Opções com Caracteres Especiais"
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Combobox com caracteres especiais, emojis, símbolos e acentuação.",
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    await step("Verificar caracteres especiais renderizados", async () => {
      const selected = canvasElement.querySelector(
        '[data-testid="combobox-selected"]'
      );
      expect(selected).toBeInTheDocument();
    });

    await step("Verificar emoji presente", async () => {
      const content = canvasElement.textContent;
      expect(content).toContain("🚀");
    });
  },
};
