import "../../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Combobox } from "@/components/ui/selects/Combobox";
import React from "react";
import { expect } from "storybook/test";
import {
  DialogBase,
  DialogContentBase,
  DialogDescriptionBase,
  DialogHeaderBase,
  DialogTitleBase,
  DialogTriggerBase,
} from "@/components/ui/feedback/DialogBase";
import { ButtonBase } from "@/components/ui/form/ButtonBase";
import { ComboboxItem } from "@/components/ui/selects/ComboboxBase";

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
      source: {
        code: `import React from 'react';
import { Combobox } from '@mlw-packages/react-components';

function Example() {
  const items = [
    { label: 'JavaScript', value: 'js' },
    { label: 'TypeScript', value: 'ts' },
  ];
  const [selected, setSelected] = React.useState(items[0].value);
  return <Combobox items={items} selected={selected} onChange={setSelected} label="Linguagem" />;
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
    selected: {
      control: "text",
      description: "Valor atualmente selecionado",
    },
    placeholder: {
      control: "text",
      description: "Texto exibido quando nenhum item está selecionado",
    },
    searchPlaceholder: {
      control: "text",
      description: "Placeholder para o campo de busca",
    },
    label: {
      control: "text",
      description: "Label do combobox",
    },
    labelClassname: {
      control: "text",
      description: "Classes CSS customizadas para o label",
    },
    className: {
      control: "text",
      description: "Classes CSS customizadas",
    },
    disabled: {
      control: "boolean",
      description: "Desabilita o combobox",
    },
    hideClear: {
      control: "boolean",
      description: "Esconde o botão de limpar seleção",
    },
    error: {
      control: "text",
      description: "Mensagem de erro a ser exibida",
    },
    empty: {
      control: "text",
      description: "Mensagem ou componente exibido quando não há resultados",
    },
    onChange: { action: "onChange" },
  },
};

export default meta;
type Story = StoryObj<typeof Combobox>;

export const Default: Story = {
  name: "Padrão",
  render: (args) => {
    const items = [
      { label: "JavaScript", value: "js" },
      { label: "TypeScript", value: "ts" },
      { label: "Python", value: "py" },
      { label: "Java", value: "java" },
    ];
    const [selected, setSelected] = React.useState<string>(
      (args.selected as string) || items[0].value,
    );
    const label = args.label || "Linguagem de Programação";
    const placeholder = args.placeholder || undefined;
    // `Combobox` currently doesn't accept a `disabled` prop in its typing,
    // so we avoid passing it directly. Keep local variable only if needed in future.

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
              args.onChange?.(value);
            }}
            label={label}
            placeholder={placeholder}
            disabled={args.disabled}
            hideClear={args.hideClear ?? false}
            error={args.error}
            searchPlaceholder={args.searchPlaceholder}
            empty={args.empty}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { Combobox } from '@mlw-packages/react-components';

function Padrão() {
  const items = [
    { label: 'JavaScript', value: 'js' },
    { label: 'TypeScript', value: 'ts' },
    { label: 'Python', value: 'py' },
    { label: 'Java', value: 'java' },
  ];
  const [selected, setSelected] = React.useState(items[0].value);

  return <Combobox items={items} selected={selected} onChange={(v) => v !== null && setSelected(v)} label="Linguagem de Programação" />;
}
`,
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    await step("Verificar componente renderizado", async () => {
      const root = canvasElement.querySelector(
        '[data-testid="combobox-base-root"]',
      );
      expect(root).toBeInTheDocument();
    });

    await step("Verificar opção pré-selecionada", async () => {
      const selected = canvasElement.querySelector(
        '[data-testid="combobox-selected"]',
      );
      expect(selected).toBeInTheDocument();
      expect(selected?.textContent).toContain("JavaScript");
    });

    await step("Verificar trigger presente", async () => {
      const trigger = canvasElement.querySelector(
        '[data-testid="combobox-trigger"]',
      );
      expect(trigger).toBeInTheDocument();
    });
  },
};

export const EmptyWithProp: Story = {
  name: "Vazio com `empty`",
  render: () => {
    const items: { label: string; value: string }[] = [];
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
            onChange={(v) => {
              setSelected(v);
            }}
            label="Lista vazia"
            placeholder="Nenhuma seleção..."
            empty="Sem opções disponíveis"
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { Combobox } from '@mlw-packages/react-components';

function EmptyWithProp() {
  const items = [];
  const [selected, setSelected] = React.useState(null);
  return (
    <Combobox
      items={items}
      selected={selected}
      onChange={setSelected}
      label="Lista vazia"
      placeholder="Nenhuma seleção..."
      empty={<div>Sem opções disponíveis</div>}
    />
  );
}
`,
      },
    },
  },
};

export const Empty: Story = {
  name: "Vazio (Sem Seleção)",
  render: (args) => {
    const items = [
      { label: "JavaScript", value: "js" },
      { label: "TypeScript", value: "ts" },
      { label: "Python", value: "py" },
    ];
    const [selected, setSelected] = React.useState<string | null>(
      (args.selected as string) || null,
    );
    const placeholder = args.placeholder || "Escolha uma linguagem...";

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
            onChange={(v) => {
              setSelected(v);
              args.onChange?.(v);
            }}
            placeholder={placeholder}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { Combobox } from '@mlw-packages/react-components';

function Vazio() {
  const items = [
    { label: 'JavaScript', value: 'js' },
    { label: 'TypeScript', value: 'ts' },
  ];
  const [selected, setSelected] = React.useState(null);
  return <Combobox items={items} selected={selected} onChange={setSelected} placeholder="Escolha uma linguagem..." />;
}
`,
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    await step("Verificar componente renderizado", async () => {
      const root = canvasElement.querySelector(
        '[data-testid="combobox-base-root"]',
      );
      expect(root).toBeInTheDocument();
    });

    await step("Verificar placeholder customizado", async () => {
      const selected = canvasElement.querySelector(
        '[data-testid="combobox-selected"]',
      );
      expect(selected).toBeInTheDocument();
      expect(selected?.textContent).toContain("Escolha uma linguagem");
    });
  },
};

export const LargeList: Story = {
  name: "Lista Grande (100 itens)",
  render: () => {
    const items = Array.from({ length: 1000 }, (_, i) => ({
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
      source: {
        code: `import React from 'react';
import { Combobox } from '@mlw-packages/react-components';

function LargeList() {
  const items = Array.from({ length: 100 }, (_, i) => ({ label: Item, value: item- }));
  const [selected, setSelected] = React.useState('item-50');
  return <Combobox items={items} selected={selected} onChange={(v) => v !== null && setSelected(v)} label="Lista com 100 itens" searchPlaceholder="Buscar item..." />;
}
`,
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    await step("Verificar componente renderizado", async () => {
      const root = canvasElement.querySelector(
        '[data-testid="combobox-base-root"]',
      );
      expect(root).toBeInTheDocument();
    });

    await step("Verificar item 50 selecionado", async () => {
      const selected = canvasElement.querySelector(
        '[data-testid="combobox-selected"]',
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
      source: {
        code: `import React from 'react';
import { Combobox } from '@mlw-packages/react-components';

function SpecialCharacters() {
  const items = [
    { label: 'C++', value: 'cpp' },
    { label: 'C#', value: 'csharp' },
    { label: 'Emoji 🚀 Test', value: 'emoji' },
  ];
  const [selected, setSelected] = React.useState('emoji');
  return <Combobox items={items} selected={selected} onChange={(v) => v !== null && setSelected(v)} label="Opções com Caracteres Especiais" />;
}
`,
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    await step("Verificar caracteres especiais renderizados", async () => {
      const selected = canvasElement.querySelector(
        '[data-testid="combobox-selected"]',
      );
      expect(selected).toBeInTheDocument();
    });

    await step("Verificar emoji presente", async () => {
      const content = canvasElement.textContent;
      expect(content).toContain("🚀");
    });
  },
};
export const WithError: Story = {
  name: "Padrão com Erro",
  render: () => {
    const items = [
      { label: "C++", value: "cpp" },
      { label: "C#", value: "csharp" },
      { label: "F#", value: "fsharp" },
      { label: "@angular/core", value: "angular" },
      { label: "Emoji Test", value: "emoji" },
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
            label="Exemplo com Erro"
            error="Você deve selecionar uma opção"
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { Combobox } from '@mlw-packages/react-components';

function WithError() {
  const items = [
    { label: 'C++', value: 'cpp' },
    { label: 'C#', value: 'csharp' },
    { label: 'Emoji Test', value: 'emoji' },
  ];
  const [selected, setSelected] = React.useState('emoji');
  return <Combobox items={items} selected={selected} onChange={(v) => v !== null && setSelected(v)} label="Opções com Caracteres Especiais" error="Você deve selecionar uma opção" />;
}
`,
      },
    },
  },
};

export const Disabled: Story = {
  name: "Desabilitado",
  render: () => {
    const items = [
      { label: "JavaScript", value: "js" },
      { label: "TypeScript", value: "ts" },
      { label: "Python", value: "py" },
    ];
    const [selected, setSelected] = React.useState<string>("ts");
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
            label="Linguagem (Desabilitado)"
            disabled
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { Combobox } from '@mlw-packages/react-components';

function Disabled() {
  const items = [
    { label: 'JavaScript', value: 'js' },
    { label: 'TypeScript', value: 'ts' },
  ];
  const [selected, setSelected] = React.useState('ts');
  return <Combobox items={items} selected={selected} onChange={setSelected} label="Linguagem (Desabilitado)" disabled />;
}
`,
      },
    },
  },
};
export const Dialog: Story = {
  render: () => {
    const items: ComboboxItem<string>[] = Array.from({ length: 80 }, (_, i) => {
      const n = i + 1;
      return { value: `item-${n}`, label: `Item ${n}` };
    });

    const [selected, setSelected] = React.useState<string | null>(
      items[0].value,
    );
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "32px 0",
        }}
      >
        <DialogBase>
          <DialogTriggerBase asChild>
            <ButtonBase variant="outline">Abrir dialog</ButtonBase>
          </DialogTriggerBase>
          <DialogContentBase className="sm:max-w-md">
            <DialogHeaderBase>
              <DialogTitleBase>Combobox dentro do Dialog</DialogTitleBase>
              <DialogDescriptionBase>
                Abra o combobox e use a rolagem (mouse wheel ou mouse3).
              </DialogDescriptionBase>
            </DialogHeaderBase>

            <div className="mt-4" style={{ width: 360 }}>
              <Combobox
                items={items}
                selected={selected}
                onChange={(value) => {
                  setSelected(value);
                }}
                label="Selecione um item"
                searchPlaceholder="Buscar..."
              />
            </div>
          </DialogContentBase>
        </DialogBase>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { Combobox } from '@mlw-packages/react-components';

function Disabled() {
  const items = [
    { label: 'JavaScript', value: 'js' },
    { label: 'TypeScript', value: 'ts' },
  ];
  const [selected, setSelected] = React.useState('ts');
  return <Combobox items={items} selected={selected} onChange={setSelected} label="Linguagem (Desabilitado)" disabled />;
}
`,
      },
    },
  },
};
