import "../../style/global.css";
import { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "@/components/ui/selects/Select";

const meta: Meta<typeof Select> = {
  title: "selects/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Select simplificado para seleção de opções. Suporta itens simples e agrupados, com estados de erro e desabilitado.",
      },
      source: {
        code: `import React from 'react';
import { Select } from '@mlw-packages/react-components';

export default function Example() {
  const items = [
    { label: "Option A", value: "a" },
    { label: "Option B", value: "b" },
    { label: "Option C", value: "c" },
  ];

  return (
    <Select
      items={items}
      onChange={(v) => console.log("changed", v)}
      placeholder="Select an option"
    />
  );
}
`,
      },
    },
    layout: "centered",
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f6f6f6" },
        { name: "dark", value: "#222" },
      ],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

const simpleItems = [
  { label: "Option A", value: "a" },
  { label: "Option B", value: "b" },
  { label: "Option C", value: "c" },
];

const groupedItems = {
  "Group One": [
    { label: "G1 - One", value: "g1-1" },
    { label: "G1 - Two", value: "g1-2" },
  ],
  "Group Two": [
    { label: "G2 - One", value: "g2-1" },
    { label: "G2 - Two", value: "g2-2" },
  ],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { Select } from '@mlw-packages/react-components';

export default function Default() {
  const simpleItems = [
    { label: "Option A", value: "a" },
    { label: "Option B", value: "b" },
    { label: "Option C", value: "c" },
  ];

  return (
    <Select
      items={simpleItems}
      onChange={(v) => console.log("changed", v)}
      placeholder="Select an option"
    />
  );
}
`,
      },
    },
  },
  args: {
    items: simpleItems,
    onChange: (v: string) => console.log("changed", v),
    placeholder: "Select an option",
    testIds: {
      root: "select-root",
      base: "select-base",
      trigger: "select-trigger",
      value: "select-value",
      scrollarea: "select-scrollarea",
      content: "select-content",
      group: "select-group",
      label: "select-label",
      item: (v: string) => `select-item-${v}`,
    },
  },
};

export const WithPlaceholder: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { Select } from '@mlw-packages/react-components';

export default function WithPlaceholder() {
  const simpleItems = [
    { label: "Option A", value: "a" },
    { label: "Option B", value: "b" },
    { label: "Option C", value: "c" },
  ];

  return (
    <Select
      items={simpleItems}
      onChange={(v) => console.log("changed", v)}
      placeholder="Escolha..."
    />
  );
}
`,
      },
    },
  },
  args: {
    items: simpleItems,
    onChange: (v: string) => console.log("changed", v),
    placeholder: "Escolha...",
  },
};

export const Grouped: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { Select } from '@mlw-packages/react-components';

export default function Grouped() {
  const groupedItems = {
    "Group One": [
      { label: "G1 - One", value: "g1-1" },
      { label: "G1 - Two", value: "g1-2" },
    ],
    "Group Two": [
      { label: "G2 - One", value: "g2-1" },
      { label: "G2 - Two", value: "g2-2" },
    ],
  };

  return (
    <Select
      groupItems={groupedItems}
      onChange={(v) => console.log("changed", v)}
      placeholder="Select grouped"
    />
  );
}
`,
      },
    },
  },
  args: {
    groupItems: groupedItems,
    onChange: (v: string) => console.log("changed", v),
    placeholder: "Select grouped",
    testIds: {
      trigger: "select-trigger",
      value: "select-value",
      item: (v: string) => `select-item-${v}`,
    },
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { Select } from '@mlw-packages/react-components';

export default function Disabled() {
  const simpleItems = [
    { label: "Option A", value: "a" },
    { label: "Option B", value: "b" },
    { label: "Option C", value: "c" },
  ];

  return (
    <Select
      items={simpleItems}
      onChange={(v) => console.log("changed", v)}
      disabled={true}
    />
  );
}
`,
      },
    },
  },
  args: {
    items: simpleItems,
    onChange: (v: string) => console.log("changed", v),
    disabled: true,
  },
};

export const WithError: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { Select } from '@mlw-packages/react-components';

export default function WithError() {
  const simpleItems = [
    { label: "Option A", value: "a" },
    { label: "Option B", value: "b" },
    { label: "Option C", value: "c" },
  ];

  return (
    <Select
      items={simpleItems}
      onChange={(v) => console.log("changed", v)}
      error="This field is required"
    />
  );
}
`,
      },
    },
  },
  args: {
    items: simpleItems,
    onChange: (v: string) => console.log("changed", v),
    error: "This field is required",
  },
};
