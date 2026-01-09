import "../../style/global.css";
import { Meta, StoryObj } from "@storybook/react-vite";
import { MultiSelect } from "@/components/ui/selects/MultiSelect";
import { useState } from "react";

const meta: Meta<typeof MultiSelect> = {
  title: "selects/MultiSelect",
  component: MultiSelect,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "MultiSelect para seleção múltipla de opções. Suporta itens simples e agrupados, busca, paginação e diferentes comportamentos de overflow.",
      },
      source: {
        code: `import React, { useState } from 'react';
import { MultiSelect } from '@mlw-packages/react-components';

export default function Example() {
  const [selected, setSelected] = useState<string[]>([]);
  const items = [
    { label: "Option A", value: "a" },
    { label: "Option B", value: "b" },
    { label: "Option C", value: "c" },
  ];

  return (
    <MultiSelect
      items={items}
      selected={selected}
      onChange={setSelected}
      placeholder="Select items..."
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
  argTypes: {
    selected: {
      control: "object",
      description: "Array de valores atualmente selecionados",
    },
    defaultSelected: {
      control: "object",
      description: "Array de valores selecionados por padrão",
    },
    placeholder: {
      control: "text",
      description: "Texto exibido quando nenhum item está selecionado",
    },
    disabled: {
      control: "boolean",
      description: "Desabilita o multiselect",
    },
    error: {
      control: "text",
      description: "Mensagem de erro a ser exibida",
    },
    label: {
      control: "text",
      description: "Label do multiselect",
    },
    labelClassname: {
      control: "text",
      description: "Classes CSS customizadas para o label",
    },
    className: {
      control: "text",
      description: "Classes CSS customizadas para o trigger",
    },
    pagination: {
      control: "number",
      description:
        "Número de páginas para dividir os itens (0 desabilita paginação)",
    },
    empty: {
      control: "text",
      description: "Mensagem exibida quando não há itens",
    },
    search: {
      control: "object",
      description:
        "Habilita busca (boolean ou objeto com placeholder e emptyMessage)",
    },
    clickToRemove: {
      control: "boolean",
      description: "Permite remover itens clicando neles no trigger",
    },
    overflowBehavior: {
      control: "select",
      options: ["wrap", "wrap-when-open", "cutoff"],
      description: "Comportamento quando há muitos itens selecionados",
    },
    onChange: { action: "onChange" },
  },
};

export default meta;

type Story = StoryObj<typeof MultiSelect>;

const simpleItems = [
  { label: "Option A", value: "a" },
  { label: "Option B", value: "b" },
  { label: "Option C", value: "c" },
  { label: "Option D", value: "d" },
  { label: "Option E", value: "e" },
];

const groupedItems = {
  Fruits: [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Orange", value: "orange" },
  ],
  Vegetables: [
    { label: "Carrot", value: "carrot" },
    { label: "Broccoli", value: "broccoli" },
    { label: "Spinach", value: "spinach" },
  ],
};

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { MultiSelect } from '@mlw-packages/react-components';

export default function Default() {
  const [selected, setSelected] = useState<string[]>([]);
  const simpleItems = [
    { label: "Option A", value: "a" },
    { label: "Option B", value: "b" },
    { label: "Option C", value: "c" },
    { label: "Option D", value: "d" },
    { label: "Option E", value: "e" },
  ];

  return (
    <MultiSelect
      items={simpleItems}
      selected={selected}
      onChange={setSelected}
      placeholder="Select items..."
    />
  );
}
`,
      },
    },
  },
  render: (args) => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <div className="w-[300px]">
        <MultiSelect {...args} selected={selected} onChange={setSelected} />
      </div>
    );
  },
  args: {
    items: simpleItems,
    placeholder: "Select items...",
  },
};

export const WithDefaultValues: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { MultiSelect } from '@mlw-packages/react-components';

export default function WithDefaultValues() {
  const simpleItems = [
    { label: "Option A", value: "a" },
    { label: "Option B", value: "b" },
    { label: "Option C", value: "c" },
    { label: "Option D", value: "d" },
    { label: "Option E", value: "e" },
  ];

  return (
    <MultiSelect
      items={simpleItems}
      defaultSelected={["a", "c"]}
      onChange={(values) => console.log(values)}
      placeholder="Select items..."
    />
  );
}
`,
      },
    },
  },
  render: (args) => {
    return (
      <div className="w-[300px]">
        <MultiSelect {...args} />
      </div>
    );
  },
  args: {
    items: simpleItems,
    defaultSelected: ["a", "c"],
    onChange: (values: string[]) => console.log(values),
    placeholder: "Select items...",
  },
};

export const Grouped: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { MultiSelect } from '@mlw-packages/react-components';

export default function Grouped() {
  const [selected, setSelected] = useState<string[]>([]);
  const groupedItems = {
    Fruits: [
      { label: "Apple", value: "apple" },
      { label: "Banana", value: "banana" },
      { label: "Orange", value: "orange" },
    ],
    Vegetables: [
      { label: "Carrot", value: "carrot" },
      { label: "Broccoli", value: "broccoli" },
      { label: "Spinach", value: "spinach" },
    ],
  };

  return (
    <MultiSelect
      groupItems={groupedItems}
      selected={selected}
      onChange={setSelected}
      placeholder="Select items..."
    />
  );
}
`,
      },
    },
  },
  render: (args) => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <div className="w-[300px]">
        <MultiSelect {...args} selected={selected} onChange={setSelected} />
      </div>
    );
  },
  args: {
    groupItems: groupedItems,
    placeholder: "Select items...",
  },
};

export const WithLabel: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { MultiSelect } from '@mlw-packages/react-components';

export default function WithLabel() {
  const [selected, setSelected] = useState<string[]>([]);
  const simpleItems = [
    { label: "Option A", value: "a" },
    { label: "Option B", value: "b" },
    { label: "Option C", value: "c" },
  ];

  return (
    <MultiSelect
      items={simpleItems}
      selected={selected}
      onChange={setSelected}
      label="Choose options"
      placeholder="Select items..."
    />
  );
}
`,
      },
    },
  },
  render: (args) => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <div className="w-[300px]">
        <MultiSelect {...args} selected={selected} onChange={setSelected} />
      </div>
    );
  },
  args: {
    items: simpleItems,
    label: "Choose options",
    placeholder: "Select items...",
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { MultiSelect } from '@mlw-packages/react-components';

export default function Disabled() {
  const [selected, setSelected] = useState<string[]>(["a", "b"]);
  const simpleItems = [
    { label: "Option A", value: "a" },
    { label: "Option B", value: "b" },
    { label: "Option C", value: "c" },
  ];

  return (
    <MultiSelect
      items={simpleItems}
      selected={selected}
      onChange={setSelected}
      disabled={true}
    />
  );
}
`,
      },
    },
  },
  render: (args) => {
    const [selected, setSelected] = useState<string[]>(["a", "b"]);
    return (
      <div className="w-[300px]">
        <MultiSelect {...args} selected={selected} onChange={setSelected} />
      </div>
    );
  },
  args: {
    items: simpleItems,
    disabled: true,
  },
};

export const WithError: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { MultiSelect } from '@mlw-packages/react-components';

export default function WithError() {
  const [selected, setSelected] = useState<string[]>([]);
  const simpleItems = [
    { label: "Option A", value: "a" },
    { label: "Option B", value: "b" },
    { label: "Option C", value: "c" },
  ];

  return (
    <MultiSelect
      items={simpleItems}
      selected={selected}
      onChange={setSelected}
      error="Please select at least one option"
    />
  );
}
`,
      },
    },
  },
  render: (args) => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <div className="w-[300px]">
        <MultiSelect {...args} selected={selected} onChange={setSelected} />
      </div>
    );
  },
  args: {
    items: simpleItems,
    error: "Please select at least one option",
  },
};

export const WithSearch: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { MultiSelect } from '@mlw-packages/react-components';

export default function WithSearch() {
  const [selected, setSelected] = useState<string[]>([]);
  const items = Array.from({ length: 20 }).map((_, i) => ({
    label: \`Option \${i + 1}\`,
    value: \`v\${i + 1}\`,
  }));

  return (
    <MultiSelect
      items={items}
      selected={selected}
      onChange={setSelected}
      search={{
        placeholder: "Search options...",
        emptyMessage: "No results found.",
      }}
      placeholder="Select items..."
    />
  );
}
`,
      },
    },
  },
  render: (args) => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <div className="w-[300px]">
        <MultiSelect {...args} selected={selected} onChange={setSelected} />
      </div>
    );
  },
  args: {
    items: Array.from({ length: 20 }).map((_, i) => ({
      label: `Option ${i + 1}`,
      value: `v${i + 1}`,
    })),
    search: {
      placeholder: "Search options...",
      emptyMessage: "No results found.",
    },
    placeholder: "Select items...",
  },
};

export const WithoutSearch: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { MultiSelect } from '@mlw-packages/react-components';

export default function WithoutSearch() {
  const [selected, setSelected] = useState<string[]>([]);
  const simpleItems = [
    { label: "Option A", value: "a" },
    { label: "Option B", value: "b" },
    { label: "Option C", value: "c" },
  ];

  return (
    <MultiSelect
      items={simpleItems}
      selected={selected}
      onChange={setSelected}
      search={false}
      placeholder="Select items..."
    />
  );
}
`,
      },
    },
  },
  render: (args) => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <div className="w-[300px]">
        <MultiSelect {...args} selected={selected} onChange={setSelected} />
      </div>
    );
  },
  args: {
    items: simpleItems,
    search: false,
    placeholder: "Select items...",
  },
};

export const Paginated: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { MultiSelect } from '@mlw-packages/react-components';

export default function Paginated() {
  const [selected, setSelected] = useState<string[]>([]);
  const items = Array.from({ length: 30 }).map((_, i) => ({
    label: \`Option \${i + 1}\`,
    value: \`v\${i + 1}\`,
  }));

  return (
    <MultiSelect
      items={items}
      selected={selected}
      onChange={setSelected}
      placeholder="Select items..."
      pagination={5}
    />
  );
}
`,
      },
    },
  },
  render: (args) => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <div className="w-[300px]">
        <MultiSelect {...args} selected={selected} onChange={setSelected} />
      </div>
    );
  },
  args: {
    items: Array.from({ length: 30 }).map((_, i) => ({
      label: `Option ${i + 1}`,
      value: `v${i + 1}`,
    })),
    placeholder: "Select items...",
    pagination: 5,
  },
};

export const OverflowWrap: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { MultiSelect } from '@mlw-packages/react-components';

export default function OverflowWrap() {
  const [selected, setSelected] = useState<string[]>(["a", "b", "c", "d", "e"]);
  const items = [
    { label: "Long Option A", value: "a" },
    { label: "Long Option B", value: "b" },
    { label: "Long Option C", value: "c" },
    { label: "Long Option D", value: "d" },
    { label: "Long Option E", value: "e" },
  ];

  return (
    <MultiSelect
      items={items}
      selected={selected}
      onChange={setSelected}
      overflowBehavior="wrap"
      placeholder="Select items..."
    />
  );
}
`,
      },
    },
  },
  render: (args) => {
    const [selected, setSelected] = useState<string[]>([
      "a",
      "b",
      "c",
      "d",
      "e",
    ]);
    return (
      <div className="w-[300px]">
        <MultiSelect {...args} selected={selected} onChange={setSelected} />
      </div>
    );
  },
  args: {
    items: [
      { label: "Long Option A", value: "a" },
      { label: "Long Option B", value: "b" },
      { label: "Long Option C", value: "c" },
      { label: "Long Option D", value: "d" },
      { label: "Long Option E", value: "e" },
    ],
    overflowBehavior: "wrap",
    placeholder: "Select items...",
  },
};

export const OverflowCutoff: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { MultiSelect } from '@mlw-packages/react-components';

export default function OverflowCutoff() {
  const [selected, setSelected] = useState<string[]>(["a", "b", "c", "d", "e"]);
  const items = [
    { label: "Long Option A", value: "a" },
    { label: "Long Option B", value: "b" },
    { label: "Long Option C", value: "c" },
    { label: "Long Option D", value: "d" },
    { label: "Long Option E", value: "e" },
  ];

  return (
    <MultiSelect
      items={items}
      selected={selected}
      onChange={setSelected}
      overflowBehavior="cutoff"
      placeholder="Select items..."
    />
  );
}
`,
      },
    },
  },
  render: (args) => {
    const [selected, setSelected] = useState<string[]>([
      "a",
      "b",
      "c",
      "d",
      "e",
    ]);
    return (
      <div className="w-[300px]">
        <MultiSelect {...args} selected={selected} onChange={setSelected} />
      </div>
    );
  },
  args: {
    items: [
      { label: "Long Option A", value: "a" },
      { label: "Long Option B", value: "b" },
      { label: "Long Option C", value: "c" },
      { label: "Long Option D", value: "d" },
      { label: "Long Option E", value: "e" },
    ],
    overflowBehavior: "cutoff",
    placeholder: "Select items...",
  },
};

export const WithBadgeLabels: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { MultiSelect } from '@mlw-packages/react-components';

export default function WithBadgeLabels() {
  const [selected, setSelected] = useState<string[]>([]);
  const items = [
    { label: "Very Long Option Name A", value: "a", badgeLabel: "A" },
    { label: "Very Long Option Name B", value: "b", badgeLabel: "B" },
    { label: "Very Long Option Name C", value: "c", badgeLabel: "C" },
  ];

  return (
    <MultiSelect
      items={items}
      selected={selected}
      onChange={setSelected}
      placeholder="Select items..."
    />
  );
}
`,
      },
    },
  },
  render: (args) => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <div className="w-[300px]">
        <MultiSelect {...args} selected={selected} onChange={setSelected} />
      </div>
    );
  },
  args: {
    items: [
      { label: "Very Long Option Name A", value: "a", badgeLabel: "A" },
      { label: "Very Long Option Name B", value: "b", badgeLabel: "B" },
      { label: "Very Long Option Name C", value: "c", badgeLabel: "C" },
    ],
    placeholder: "Select items...",
  },
};

export const NoClickToRemove: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { MultiSelect } from '@mlw-packages/react-components';

export default function NoClickToRemove() {
  const [selected, setSelected] = useState<string[]>(["a", "b"]);
  const items = [
    { label: "Option A", value: "a" },
    { label: "Option B", value: "b" },
    { label: "Option C", value: "c" },
  ];

  return (
    <MultiSelect
      items={items}
      selected={selected}
      onChange={setSelected}
      clickToRemove={false}
      placeholder="Select items..."
    />
  );
}
`,
      },
    },
  },
  render: (args) => {
    const [selected, setSelected] = useState<string[]>(["a", "b"]);
    return (
      <div className="w-[300px]">
        <MultiSelect {...args} selected={selected} onChange={setSelected} />
      </div>
    );
  },
  args: {
    items: simpleItems,
    clickToRemove: false,
    placeholder: "Select items...",
  },
};
