import "../../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ComboboxBase, ComboboxItem } from "@/components/ui/selects/ComboboxBase";
import React from "react";

type ComboboxBaseStoryArgs = {
  items?: Array<{ value: string; label: string }>;
  selected?: string | null;
  error?: string;
  handleSelection?: (v: string) => void;
};

const meta: Meta<typeof ComboboxBase> = {
  title: "selects/ComboboxBase",
  component: ComboboxBase,
  tags: ["autodocs"],
  args: {
    items: [
      { value: "Item A", label: "Item A" },
      { value: "Item B", label: "Item B" },
      { value: "Item C", label: "Item C" },
    ],
    selected: "",
    error: "",
  } as unknown as Record<string, unknown>,
  argTypes: {
    items: {
      control: { type: "object" },
      description: "Array de itens {value,label}",
    },
    selected: { control: { type: "text" } },
    error: { control: { type: "text" } },
    handleSelection: { action: "handleSelection" },
  } as unknown as Record<string, unknown>,
  parameters: {
    docs: {
      description: {
        component: "ComboboxBase para seleção rápida e busca de itens.",
      },
      source: {
        code: `import React from 'react';
    import { ComboboxBase, ComboboxItem } from '@mlw-packages/react-components';

    export default function Example() {
      const items: ComboboxItem<string>[] = [
        { value: 'Item A', label: 'Item A' },
        { value: 'Item B', label: 'Item B' },
        { value: 'Item C', label: 'Item C' },
      ];

      return (
        <ComboboxBase
          items={items}
          renderSelected={<span>{items[0].label}</span>}
          handleSelection={(v) => console.log(v)}
          checkIsSelected={(v) => items[0].value === v}
        />
      );
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
};

export const EmptyWithProp: Story = {
  name: "Vazio com `empty`",
  render: () => {
    const items: ComboboxItem<string>[] = [];
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
        <div style={{ width: 320 }}>
          <ComboboxBase
            items={items}
            renderSelected={<span>{items.find((i) => i.value === selected)?.label}</span>}
            handleSelection={(value) => setSelected(value)}
            checkIsSelected={(value) => selected === value}
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
import { ComboboxBase } from '@mlw-packages/react-components';

export default function EmptyWithProp() {
  const items = [];
  const [selected, setSelected] = React.useState(null);
  return (
    <ComboboxBase
      items={items}
      renderSelected={<span>{/* empty */}</span>}
      handleSelection={(v) => {}}
      empty={<div>Sem opções disponíveis</div>}
    />
  );
}
`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ComboboxBase>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
    import { ComboboxBase, ComboboxItem } from '@mlw-packages/react-components';

    export default function Default() {
      const items: ComboboxItem<string>[] = [
        { value: 'Item A', label: 'Item A' },
        { value: 'Item B', label: 'Item B' },
        { value: 'Item C', label: 'Item C' },
      ];
      const [selected, setSelected] = React.useState<string | null>(items[0].value);

      return (
        <div style={{ width: 320 }}>
          <ComboboxBase
            items={items}
            renderSelected={<span>{items.find(i => i.value === selected)?.label}</span>}
            handleSelection={value => setSelected(value)}
            checkIsSelected={value => selected === value}
          />
        </div>
      );
    }
    `,
      },
    },
  },
  render: (args: ComboboxBaseStoryArgs) => {
    const items: ComboboxItem<string>[] = args.items || [
      { value: "Item A", label: "Item A" },
      { value: "Item B", label: "Item B" },
      { value: "Item C", label: "Item C" },
    ];
    const [selected, setSelected] = React.useState<string | null>(
      (args.selected as string) || items[0].value
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
        <div style={{ width: 320 }}>
          <ComboboxBase
            items={items}
            renderSelected={
              <span>{items.find((i) => i.value === selected)?.label}</span>
            }
            handleSelection={(value) => {
              setSelected(value);
              args.handleSelection?.(value);
            }}
            checkIsSelected={(value) => selected === value}
            error={(args.error as string) || undefined}
          />
        </div>
      </div>
    );
  },
};

export const WithError: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
    import { ComboboxBase, ComboboxItem } from '@mlw-packages/react-components';

    export default function Default() {
      const items: ComboboxItem<string>[] = [
        { value: 'Item A', label: 'Item A' },
        { value: 'Item B', label: 'Item B' },
        { value: 'Item C', label: 'Item C' },
      ];
      const [selected, setSelected] = React.useState<string | null>(items[0].value);

      return (
        <div style={{ width: 320 }}>
          <ComboboxBase
            items={items}
            renderSelected={<span>{items.find(i => i.value === selected)?.label}</span>}
            handleSelection={value => setSelected(value)}
            checkIsSelected={value => selected === value}
            error="Você deve selecionar uma opção"
          />
        </div>
      );
    }
    `,
      },
    },
  },
  render: (args: ComboboxBaseStoryArgs) => {
    const items: ComboboxItem<string>[] = args.items || [
      { value: "Item A", label: "Item A" },
      { value: "Item B", label: "Item B" },
      { value: "Item C", label: "Item C" },
    ];
    const [selected, setSelected] = React.useState<string | null>(
      (args.selected as string) || items[0].value
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
        <div style={{ width: 320 }}>
          <ComboboxBase
            items={items}
            renderSelected={
              <span>{items.find((i) => i.value === selected)?.label}</span>
            }
            handleSelection={(value) => {
              setSelected(value);
              args.handleSelection?.(value);
            }}
            checkIsSelected={(value) => selected === value}
            error={(args.error as string) || "Você deve selecionar uma opção"}
          />
        </div>
      </div>
    );
  },
};
