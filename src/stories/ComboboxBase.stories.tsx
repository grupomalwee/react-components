import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ComboboxBase,
  ComboboxItem,
} from "../components/selects/ComboboxBase";
import React from "react";

const meta: Meta<typeof ComboboxBase> = {
  title: "selects/ComboboxBase",
  component: ComboboxBase,
  tags: ["autodocs"],
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
  render: () => {
    const items: ComboboxItem<string>[] = [
      { value: "Item A", label: "Item A" },
      { value: "Item B", label: "Item B" },
      { value: "Item C", label: "Item C" },
    ];
    const [selected, setSelected] = React.useState<string | null>(
      items[0].value
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
            handleSelection={(value) => setSelected(value)}
            checkIsSelected={(value) => selected === value}
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
  render: () => {
    const items: ComboboxItem<string>[] = [
      { value: "Item A", label: "Item A" },
      { value: "Item B", label: "Item B" },
      { value: "Item C", label: "Item C" },
    ];
    const [selected, setSelected] = React.useState<string | null>(
      items[0].value
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
            handleSelection={(value) => setSelected(value)}
            checkIsSelected={(value) => selected === value}
            error="Você deve selecionar uma opção"
          />
        </div>
      </div>
    );
  },
};
