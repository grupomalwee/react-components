import "../../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";
import React from "react";
import { MultiCombobox } from "@/components/ui/selects/MultiCombobox";

const meta: Meta<typeof MultiCombobox> = {
  title: "selects/MultiCombobox",
  component: MultiCombobox,
  tags: ["autodocs"],
  args: {
    items: undefined,
    selected: [],
    placeholder: "",
    error: "",
  } as unknown as Record<string, unknown>,
  argTypes: {
    items: {
      control: { type: "object" },
      description: "Array de itens {value,label}",
    },
    selected: {
      control: { type: "object" },
      description: "Array de valores selecionados",
    },
    placeholder: { control: { type: "text" } },
    error: { control: { type: "text" } },
    onChange: { action: "onChange" },
  } as unknown as Record<string, unknown>,
  parameters: {
    docs: {
      description: {
        component:
          "MultiCombobox para seleção múltipla de tags, com busca e visualização centralizada.",
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
type Story = StoryObj<typeof MultiCombobox>;

export const Default: Story = {
  name: "Padrão",
  render: () => {
    const items = [
      { label: "tag1", value: "tag1" },
      { label: "tag2", value: "tag2" },
      { label: "tag3", value: "tag3" },
    ];
    const [selected, setSelected] = React.useState<string[]>([items[0].value]);
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
          <MultiCombobox
            items={items}
            selected={selected}
            onChange={setSelected}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "MultiCombobox básico com 3 itens e 1 pré-selecionado.",
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    await step("Verificar componente renderizado", async () => {
      await waitFor(() => {
        const root = canvasElement.querySelector(
          '[data-testid="multi-combobox-root"]'
        );
        expect(root).toBeInTheDocument();
      });
    });

    await step("Verificar item pré-selecionado visível", async () => {
      await waitFor(() => {
        const selectedTag = canvasElement.querySelector(
          '[data-testid="combobox-selected-tag1"]'
        );
        expect(selectedTag).toBeInTheDocument();
      });
    });

    await step("Verificar texto do item selecionado", async () => {
      const content = canvasElement.textContent;
      expect(content).toContain("tag1");
    });
  },
};

// Snippet consumer-facing no nível do meta
meta.parameters = {
  ...meta.parameters,
  docs: {
    ...meta.parameters?.docs,
    source: {
      code: `import React from 'react';
import { MultiComboboxBase } from '@mlw-packages/react-components';

export default function Example() {
  const items = [
    { label: 'tag1', value: 'tag1' },
    { label: 'tag2', value: 'tag2' },
    { label: 'tag3', value: 'tag3' },
  ];

  const [selected, setSelected] = React.useState([items[0].value]);

  return (
    <div style={{ padding: 24 }}>
      <MultiComboboxBase items={items} selected={selected} onChange={setSelected} />
    </div>
  );
}`,
    },
  },
};

export const Empty: Story = {
  name: "Vazio",
  render: () => {
    const items = [
      { label: "React", value: "react" },
      { label: "Vue", value: "vue" },
      { label: "Angular", value: "angular" },
      { label: "Svelte", value: "svelte" },
    ];
    const [selected, setSelected] = React.useState<string[]>([]);
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
          <MultiCombobox
            items={items}
            selected={selected}
            onChange={setSelected}
            placeholder="Selecione frameworks..."
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "MultiCombobox sem seleção inicial e placeholder customizado.",
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    await step("Verificar placeholder visível", async () => {
      await waitFor(() => {
        const placeholder = canvasElement.querySelector(
          '[data-testid="combobox-selected-empty"]'
        );
        expect(placeholder).toBeInTheDocument();
        expect(placeholder?.textContent).toContain("Selecione frameworks");
      });
    });

    await step("Verificar nenhum item selecionado", async () => {
      const selectedWrapper = canvasElement.querySelector(
        '[data-testid="combobox-selected-wrapper"]'
      );
      expect(selectedWrapper).not.toBeInTheDocument();
    });

    await step("Verificar componente renderizado", async () => {
      const root = canvasElement.querySelector(
        '[data-testid="multi-combobox-root"]'
      );
      expect(root).toBeInTheDocument();
    });
  },
};

Empty.parameters = {
  ...Empty.parameters,
  docs: {
    ...Empty.parameters?.docs,
    source: {
      code: `import React from 'react';
import { MultiComboboxBase } from '@mlw-packages/react-components';

export const Empty = () => {
  const items = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
  ];
  const [selected, setSelected] = React.useState([]);
  return <MultiComboboxBase items={items} selected={selected} onChange={setSelected} placeholder="Selecione frameworks..." />;
};`,
    },
  },
};

export const MultipleSelected: Story = {
  name: "Múltiplos Selecionados",
  render: () => {
    const items = [
      { label: "JavaScript", value: "js" },
      { label: "TypeScript", value: "ts" },
      { label: "Python", value: "py" },
      { label: "Java", value: "java" },
      { label: "C#", value: "csharp" },
      { label: "Go", value: "go" },
    ];
    const [selected, setSelected] = React.useState<string[]>([
      "js",
      "ts",
      "py",
    ]);
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
          <MultiCombobox
            items={items}
            selected={selected}
            onChange={setSelected}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "MultiCombobox com múltiplos itens pré-selecionados.",
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    await step("Verificar 3 itens pré-selecionados", async () => {
      await waitFor(() => {
        const wrapper = canvasElement.querySelector(
          '[data-testid="combobox-selected-wrapper"]'
        );
        expect(wrapper).toBeInTheDocument();
      });
    });

    await step("Verificar labels dos itens selecionados", async () => {
      await waitFor(() => {
        const jsTag = canvasElement.querySelector(
          '[data-testid="combobox-selected-js"]'
        );
        const tsTag = canvasElement.querySelector(
          '[data-testid="combobox-selected-ts"]'
        );
        const pyTag = canvasElement.querySelector(
          '[data-testid="combobox-selected-py"]'
        );

        expect(jsTag).toBeInTheDocument();
        expect(tsTag).toBeInTheDocument();
        expect(pyTag).toBeInTheDocument();
      });
    });

    await step("Verificar texto dos itens", async () => {
      const content = canvasElement.textContent;
      expect(content).toContain("JavaScript");
      expect(content).toContain("TypeScript");
      expect(content).toContain("Python");
    });
  },
};

MultipleSelected.parameters = {
  ...MultipleSelected.parameters,
  docs: {
    ...MultipleSelected.parameters?.docs,
    source: {
      code: `import React from 'react';
import { MultiComboboxBase } from '@mlw-packages/react-components';

export const MultipleSelected = () => {
  const items = [
    { label: 'JavaScript', value: 'js' },
    { label: 'TypeScript', value: 'ts' },
    { label: 'Python', value: 'py' },
  ];
  const [selected, setSelected] = React.useState(['js','ts','py']);
  return <MultiComboboxBase items={items} selected={selected} onChange={setSelected} />;
};`,
    },
  },
};

export const LargeList: Story = {
  name: "Lista Grande",
  render: () => {
    const items = Array.from({ length: 50 }, (_, i) => ({
      label: `Item ${i + 1}`,
      value: `item-${i + 1}`,
    }));
    const initialSelected: string[] = [items[0].value];
    const [selected, setSelected] = React.useState<string[]>(initialSelected);

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
          <MultiCombobox
            items={items}
            selected={selected}
            onChange={setSelected}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "MultiCombobox com 50 itens para testar performance e scroll.",
      },
    },
  },
};

LargeList.parameters = {
  ...LargeList.parameters,
  docs: {
    ...LargeList.parameters?.docs,
    source: {
      code: `import React from 'react';
import { MultiComboboxBase } from '@mlw-packages/react-components';

export const LargeList = () => {
  const items = Array.from({ length: 50 }, (_, i) => ({ label: Item }));
  const [selected, setSelected] = React.useState(['item-1','item-2']);
  return <MultiComboboxBase items={items} selected={selected} onChange={setSelected} />;
};`,
    },
  },
};

export const SpecialCharacters: Story = {
  name: "Caracteres Especiais",
  render: () => {
    const items = [
      { label: "C++", value: "cpp" },
      { label: "C#", value: "csharp" },
      { label: "F#", value: "fsharp" },
      { label: "Node.js", value: "nodejs" },
      { label: "Vue.js", value: "vuejs" },
      { label: "@angular/core", value: "angular" },
      { label: "Emoji 🚀", value: "emoji" },
      { label: "Símbolos ©®™", value: "symbols" },
    ];
    const [selected, setSelected] = React.useState<string[]>(["cpp", "emoji"]);
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
          <MultiCombobox
            items={items}
            selected={selected}
            onChange={setSelected}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "MultiCombobox com caracteres especiais, emojis e símbolos.",
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    await step("Verificar caracteres especiais renderizados", async () => {
      await waitFor(() => {
        const wrapper = canvasElement.querySelector(
          '[data-testid="combobox-selected-wrapper"]'
        );
        expect(wrapper).toBeInTheDocument();
      });
    });

    await step("Verificar tags de caracteres especiais", async () => {
      const cppTag = canvasElement.querySelector(
        '[data-testid="combobox-selected-cpp"]'
      );
      const emojiTag = canvasElement.querySelector(
        '[data-testid="combobox-selected-emoji"]'
      );

      expect(cppTag).toBeInTheDocument();
      expect(emojiTag).toBeInTheDocument();
    });

    await step("Verificar conteúdo especial", async () => {
      const content = canvasElement.textContent;
      expect(content).toContain("C++");
      expect(content).toContain("🚀");
    });
  },
};

SpecialCharacters.parameters = {
  ...SpecialCharacters.parameters,
  docs: {
    ...SpecialCharacters.parameters?.docs,
    source: {
      code: `import React from 'react';
import { MultiComboboxBase } from '@mlw-packages/react-components';

export const SpecialCharacters = () => {
  const items = [
    { label: 'C++', value: 'cpp' },
    { label: 'Emoji 🚀', value: 'emoji' },
  ];
  const [selected, setSelected] = React.useState(['cpp','emoji']);
  return <MultiComboboxBase items={items} selected={selected} onChange={setSelected} />;
};`,
    },
  },
};

export const Disabled: Story = {
  render: () => {
    const items = [
      { label: "Apple", value: "apple" },
      { label: "Banana", value: "banana" },
      { label: "Orange", value: "orange" },
    ];
    const [selected, setSelected] = React.useState<string[]>(["banana"]);
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
          <MultiCombobox
            items={items}
            selected={selected}
            onChange={setSelected}
            label="Frutas (disabled)"
            placeholder="Não é possível alterar"
            showClearAll
            disabled
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo do MultiCombobox com `disabled` — não permite interações.",
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    await step("Verificar root presente", async () => {
      await waitFor(() => {
        const root = canvasElement.querySelector(
          '[data-testid="multi-combobox-root"]'
        );
        expect(root).toBeInTheDocument();
      });
    });

    await step(
      "Verificar item pré-selecionado visível e não removível",
      async () => {
        await waitFor(() => {
          const selectedTag = canvasElement.querySelector(
            '[data-testid="combobox-selected-banana"]'
          );
          expect(selectedTag).toBeInTheDocument();
        });
      }
    );
  },
};
export const Teste: Story = {
  render: () => {
    const items = Array.from({ length: 1000 }, (_, i) => ({
      label: `Item ${i + 1}`,
      value: `item-${i + 1}`,
    }));
    const [selected, setSelected] = React.useState<string[]>(["banana"]);
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
          <MultiCombobox
            items={items}
            selected={selected}
            onChange={setSelected}
            label="Frutas (disabled)"
            placeholder="Não é possível alterar"
            showClearAll
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo do MultiCombobox com `disabled` — não permite interações.",
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    await step("Verificar root presente", async () => {
      await waitFor(() => {
        const root = canvasElement.querySelector(
          '[data-testid="multi-combobox-root"]'
        );
        expect(root).toBeInTheDocument();
      });
    });

    await step(
      "Verificar item pré-selecionado visível e não removível",
      async () => {
        await waitFor(() => {
          const selectedTag = canvasElement.querySelector(
            '[data-testid="combobox-selected-banana"]'
          );
          expect(selectedTag).toBeInTheDocument();
        });
      }
    );
  },
};
