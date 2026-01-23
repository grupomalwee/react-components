import "../../style/global.css";
import { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "@/components/ui/selects/Select";
import { useState } from "react";
import {
  DialogBase,
  DialogContentBase,
  DialogDescriptionBase,
  DialogHeaderBase,
  DialogTitleBase,
  DialogTriggerBase,
} from "@/components/ui/feedback/DialogBase";
import { ButtonBase } from "@/components/ui/form/ButtonBase";

const meta: Meta<typeof Select> = {
  title: "selects/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Select simplificado para seleção de opções. Suporta itens simples e agrupados, com estados de erro, desabilitado e paginação.",
      },
      source: {
        code: `import React, { useState } from 'react';
import { Select } from '@mlw-packages/react-components';

export default function Example() {
  const [selected, setSelected] = useState<string | null>(null);
  const items = [
    { label: "Option A", value: "a" },
    { label: "Option B", value: "b" },
    { label: "Option C", value: "c" },
  ];

  return (
    <Select
      items={items}
      selected={selected}
      onChange={setSelected}
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
  argTypes: {
    selected: {
      control: "text",
      description: "Valor atualmente selecionado",
    },
    placeholder: {
      control: "text",
      description: "Texto exibido quando nenhum item está selecionado",
    },
    disabled: {
      control: "boolean",
      description: "Desabilita o select",
    },
    error: {
      control: "text",
      description: "Mensagem de erro a ser exibida",
    },
    label: {
      control: "text",
      description: "Label do select",
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
    hideClear: {
      control: "boolean",
      description: "Esconde o botão de limpar seleção",
    },
    onChange: { action: "onChange" },
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

const simpleItems = [
  { label: "Option A", value: "a" },
  { label: "Option B", value: "b" },
  { label: "Option C", value: "c" },
  { label: "Option D", value: "d" },
  { label: "Option E", value: "e" },
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

const manyItems = Array.from({ length: 50 }, (_, i) => ({
  label: `Item ${i + 1}`,
  value: `item-${i + 1}`,
}));

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { Select } from '@mlw-packages/react-components';

export default function Default() {
  const [selected, setSelected] = useState<string | null>(null);
  const simpleItems = [
    { label: "Option A", value: "a" },
    { label: "Option B", value: "b" },
    { label: "Option C", value: "c" },
    { label: "Option D", value: "d" },
    { label: "Option E", value: "e" },
  ];

  return (
    <div className="w-[300px]">
      <Select
        items={simpleItems}
        selected={selected}
        onChange={setSelected}
        placeholder="Select an option"
      />
    </div>
  );
}
`,
      },
    },
  },
  render: (args) => {
    const [selected, setSelected] = useState<string | null>(null);
    return (
      <div className="w-[300px]">
        <Select
          items={simpleItems}
          selected={selected}
          onChange={(value) => {
            setSelected(value);
            args.onChange?.(value);
          }}
          placeholder={args.placeholder ?? "Select an option"}
          disabled={args.disabled}
          hideClear={args.hideClear ?? false}
          error={args.error}
          label={args.label}
          labelClassname={args.labelClassname}
          className={args.className}
          pagination={args.pagination}
        />
      </div>
    );
  },
};

export const WithPlaceholder: Story = {
  parameters: {
    docs: {
      description: {
        story: "Exemplo com placeholder customizado",
      },
      source: {
        code: `import React, { useState } from 'react';
import { Select } from '@mlw-packages/react-components';

export default function WithPlaceholder() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Select
      items={simpleItems}
      selected={selected}
      onChange={setSelected}
      placeholder="Escolha uma opção..."
    />
  );
}
`,
      },
    },
  },
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);
    return (
      <div className="w-[300px]">
        <Select
          items={simpleItems}
          selected={selected}
          onChange={setSelected}
          placeholder="Escolha uma opção..."
        />
      </div>
    );
  },
};

export const WithLabel: Story = {
  parameters: {
    docs: {
      description: {
        story: "Exemplo com label",
      },
      source: {
        code: `import React, { useState } from 'react';
import { Select } from '@mlw-packages/react-components';

export default function WithLabel() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Select
      items={simpleItems}
      selected={selected}
      onChange={setSelected}
      label="Selecione uma opção"
      placeholder="Escolha..."
    />
  );
}
`,
      },
    },
  },
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);
    return (
      <div className="w-[300px]">
        <Select
          items={simpleItems}
          selected={selected}
          onChange={setSelected}
          label="Selecione uma opção"
          placeholder="Escolha..."
        />
      </div>
    );
  },
};

export const Grouped: Story = {
  parameters: {
    docs: {
      description: {
        story: "Exemplo com itens agrupados",
      },
      source: {
        code: `import React, { useState } from 'react';
import { Select } from '@mlw-packages/react-components';

export default function Grouped() {
  const [selected, setSelected] = useState<string | null>(null);
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
      selected={selected}
      onChange={setSelected}
      placeholder="Select grouped"
    />
  );
}
`,
      },
    },
  },
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);
    return (
      <div className="w-[300px]">
        <Select
          groupItems={groupedItems}
          selected={selected}
          onChange={setSelected}
          placeholder="Select grouped"
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: "Exemplo com select desabilitado",
      },
      source: {
        code: `import React, { useState } from 'react';
import { Select } from '@mlw-packages/react-components';

export default function Disabled() {
  const [selected, setSelected] = useState<string | null>("a");

  return (
    <Select
      items={simpleItems}
      selected={selected}
      onChange={setSelected}
      placeholder="Select an option"
      disabled
    />
  );
}
`,
      },
    },
  },
  render: () => {
    const [selected, setSelected] = useState<string | null>("a");
    return (
      <div className="w-[300px]">
        <Select
          items={simpleItems}
          selected={selected}
          onChange={setSelected}
          placeholder="Select an option"
          disabled
        />
      </div>
    );
  },
};

export const WithError: Story = {
  parameters: {
    docs: {
      description: {
        story: "Exemplo com mensagem de erro",
      },
      source: {
        code: `import React, { useState } from 'react';
import { Select } from '@mlw-packages/react-components';

export default function WithError() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Select
      items={simpleItems}
      selected={selected}
      onChange={setSelected}
      placeholder="Select an option"
      label="Required Field"
      error="This field is required"
    />
  );
}
`,
      },
    },
  },
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);
    return (
      <div className="w-[300px]">
        <Select
          items={simpleItems}
          selected={selected}
          onChange={setSelected}
          placeholder="Select an option"
          label="Required Field"
          error="This field is required"
        />
      </div>
    );
  },
};

export const WithPagination: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo com paginação habilitada (muitos itens divididos em páginas)",
      },
      source: {
        code: `import React, { useState } from 'react';
import { Select } from '@mlw-packages/react-components';

export default function WithPagination() {
  const [selected, setSelected] = useState<string | null>(null);
  const manyItems = Array.from({ length: 50 }, (_, i) => ({
    label: \`Item \${i + 1}\`,
    value: \`item-\${i + 1}\`,
  }));

  return (
    <Select
      items={manyItems}
      selected={selected}
      onChange={setSelected}
      placeholder="Select from many items"
      label="Paginated Select"
      pagination={5}
    />
  );
}
`,
      },
    },
  },
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);
    return (
      <div className="w-[300px]">
        <Select
          items={manyItems}
          selected={selected}
          onChange={setSelected}
          placeholder="Select from many items"
          label="Paginated Select"
          pagination={5}
        />
      </div>
    );
  },
};

export const CustomClassName: Story = {
  parameters: {
    docs: {
      description: {
        story: "Exemplo com classes CSS customizadas",
      },
      source: {
        code: `import React, { useState } from 'react';
import { Select } from '@mlw-packages/react-components';

export default function CustomClassName() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Select
      items={simpleItems}
      selected={selected}
      onChange={setSelected}
      placeholder="Select an option"
      label="Styled Select"
      className="border-2 border-blue-500 rounded-lg"
      labelClassname="text-blue-600 font-bold"
    />
  );
}
`,
      },
    },
  },
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);
    return (
      <div className="w-[300px]">
        <Select
          items={simpleItems}
          selected={selected}
          onChange={setSelected}
          placeholder="Select an option"
          label="Styled Select"
          className="border-2 border-blue-500 rounded-lg"
          labelClassname="text-blue-600 font-bold"
        />
      </div>
    );
  },
};

export const PreSelected: Story = {
  parameters: {
    docs: {
      description: {
        story: "Exemplo com valor pré-selecionado",
      },
      source: {
        code: `import React, { useState } from 'react';
import { Select } from '@mlw-packages/react-components';

export default function PreSelected() {
  const [selected, setSelected] = useState<string | null>("b");

  return (
    <Select
      items={simpleItems}
      selected={selected}
      onChange={setSelected}
      placeholder="Select an option"
      label="Pre-selected Value"
    />
  );
}
`,
      },
    },
  },
  render: () => {
    const [selected, setSelected] = useState<string | null>("b");
    return (
      <div className="w-[300px]">
        <Select
          items={simpleItems}
          selected={selected}
          onChange={setSelected}
          placeholder="Select an option"
          label="Pre-selected Value"
        />
      </div>
    );
  },
};
export const FixedMiddleMouseScroll: Story = {
  name: "Dentro do Dialog",
  parameters: {
    docs: {
      description: {
        story: "Exemplo com valor pré-selecionado",
      },
      source: {
        code: `import React, { useState } from 'react';
import { Select } from '@mlw-packages/react-components';

export default function PreSelected() {
  const [selected, setSelected] = useState<string | null>("b");

  return (
    <Select
      items={simpleItems}
      selected={selected}
      onChange={setSelected}
      placeholder="Select an option"
      label="Pre-selected Value"
    />
  );
}
`,
      },
    },
  },
  render: () => {
    const [selected, setSelected] = useState<string | null>(
      simpleItems[0].value,
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
              <Select
                items={simpleItems}
                selected={selected}
                onChange={setSelected}
                placeholder="Select an option"
                label="Pre-selected Value"
              />
            </div>
          </DialogContentBase>
        </DialogBase>
      </div>
    );
  },
};
