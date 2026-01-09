import "../../style/global.css";
import { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { AvatarCombobox } from "@/components/ui/selects/AvatarCombobox";

const meta: Meta<typeof AvatarCombobox> = {
  title: "selects/AvatarCombobox",
  component: AvatarCombobox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Select customizado com avatares para seleção de usuários. Suporta itens agrupados, avatares personalizados e estados de erro.",
      },
      source: {
        code: `import React, { useState } from 'react';
import { AvatarCombobox } from '@mlw-packages/react-components';

export default function Example() {
  const [selected, setSelected] = useState<string | null>(null);

  const users = [
    {
      label: "Gabriel Glatz",
      value: "1",
    },
    {
      label: "Eduardo Ronchi",
      value: "2",
    },
  ];

  return (
    <AvatarCombobox
      items={users}
      selected={selected}
      onChange={setSelected}
      placeholder="Select a user"
      label="User Selection"
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
      description: "Valor do usuário selecionado",
    },
    placeholder: {
      control: "text",
      description: "Texto exibido quando nenhum usuário está selecionado",
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
      description: "Classes CSS customizadas",
    },
    colors: {
      control: "object",
      description: "Array de classes de cores para avatares (cicla entre elas)",
    },
    onChange: { action: "onChange" },
  },
};

export default meta;

type Story = StoryObj<typeof AvatarCombobox>;

const userItems = [
  {
    label: "Gabriel Glatz",
    value: "1",
  },
  {
    label: "Eduardo Ronchi",
    value: "2",
  },
  {
    label: "Anne Kelley",
    value: "3",
  },
  {
    label: "Michael Chen",
    value: "4",
  },
  {
    label: "Sofia Martinez",
    value: "5",
  },
];

const groupedUsers = {
  "Impersonate user": [
    {
      label: "Xavier Guerra",
      value: "1",
    },
    {
      label: "Maria Silva",
      value: "2",
    },
    {
      label: "Anne Kelley",
      value: "3",
    },
  ],
  Administrators: [
    {
      label: "John Doe",
      value: "4",
    },
    {
      label: "Sarah Smith",
      value: "5",
    },
  ],
  "Regular Users": [
    {
      label: "Tom Brown",
      value: "6",
    },
    {
      label: "Lisa Wong",
      value: "7",
    },
  ],
};

export const Interactive: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { AvatarCombobox } from '@mlw-packages/react-components';

export default function Interactive() {
  const [selected, setSelected] = useState<string | null>("1");

  const userItems = [
    {
      label: "Gabriel Glatz",
      value: "1",
    },
    {
      label: "Eduardo Ronchi",
      value: "2",
    },
    {
      label: "Anne Kelley",
      value: "3",
    },
  ];

  return (
    <div className="w-[300px] space-y-4">
      <AvatarCombobox
        items={userItems}
        selected={selected}
        onChange={setSelected}
        placeholder="Select a user"
        label="User Selection"
      />
    </div>
  );
}
`,
      },
    },
  },
  render: () => {
    const [selected, setSelected] = useState<string | null>("1");

    return (
      <div className="w-[300px] space-y-4">
        <AvatarCombobox
          items={userItems}
          selected={selected}
          onChange={setSelected}
          placeholder="Select a user"
          label="User Selection"
        />
      </div>
    );
  },
};

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { AvatarCombobox } from '@mlw-packages/react-components';

export default function Default() {
  const userItems = [
    {
      label: "Gabriel Glatz",
      value: "1",
    },
    {
      label: "Eduardo Ronchi",
      value: "2",
    },
  ];

  return (
    <AvatarCombobox
      items={userItems}
      onChange={(v) => console.log("changed", v)}
      placeholder="Select user"
      selected="1"
    />
  );
}
`,
      },
    },
  },
  args: {
    items: userItems,
    onChange: (v: string) => console.log("changed", v),
    placeholder: "Select user",
    selected: "1",
  },
};

export const WithLabel: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { AvatarCombobox } from '@mlw-packages/react-components';

export default function WithLabel() {
  const userItems = [
    {
      label: "Gabriel Glatz",
      value: "1",
    },
    {
      label: "Eduardo Ronchi",
      value: "2",
    },
  ];

  return (
    <AvatarCombobox
      items={userItems}
      onChange={(v) => console.log("changed", v)}
      placeholder="Select user"
      label="Assign to User"
    />
  );
}
`,
      },
    },
  },
  args: {
    items: userItems,
    onChange: (v: string) => console.log("changed", v),
    placeholder: "Select user",
    label: "Assign to User",
  },
};

export const WithPlaceholder: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { AvatarCombobox } from '@mlw-packages/react-components';

export default function WithPlaceholder() {
  const userItems = [
    {
      label: "Gabriel Glatz",
      value: "1",
    },
    {
      label: "Eduardo Ronchi",
      value: "2",
    },
  ];

  return (
    <AvatarCombobox
      items={userItems}
      onChange={(v) => console.log("changed", v)}
      placeholder="Choose a user..."
    />
  );
}
`,
      },
    },
  },
  args: {
    items: userItems,
    onChange: (v: string) => console.log("changed", v),
    placeholder: "Choose a user...",
  },
};

export const Grouped: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { AvatarCombobox } from '@mlw-packages/react-components';

export default function Grouped() {
  const [selected, setSelected] = useState<string | null>(null);

  const groupedUsers = {
    "Impersonate user": [
      {
        label: "Xavier Guerra",
        value: "1",
      },
      {
        label: "Maria Silva",
        value: "2",
      },
    ],
    Administrators: [
      {
        label: "John Doe",
        value: "4",
      },
    ],
  };

  return (
    <div className="w-[300px] space-y-4">
      <AvatarCombobox
        groupItems={groupedUsers}
        selected={selected}
        onChange={setSelected}
        placeholder="Select user"
        label="User by Role"
      />
      <div className="text-sm text-muted-foreground">
        Selected: <strong>{selected || "None"}</strong>
      </div>
    </div>
  );
}
`,
      },
    },
  },
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);

    return (
      <div className="w-[300px] space-y-4">
        <AvatarCombobox
          groupItems={groupedUsers}
          selected={selected}
          onChange={setSelected}
          placeholder="Select user"
          label="User by Role"
        />
        <div className="text-sm text-muted-foreground">
          Selected: <strong>{selected || "None"}</strong>
        </div>
      </div>
    );
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { AvatarCombobox } from '@mlw-packages/react-components';

export default function Disabled() {
  const userItems = [
    {
      label: "Gabriel Glatz",
      value: "1",
    },
    {
      label: "Eduardo Ronchi",
      value: "2",
    },
  ];

  return (
    <AvatarCombobox
      items={userItems}
      onChange={(v) => console.log("changed", v)}
      placeholder="Select user"
      disabled={true}
      selected="2"
    />
  );
}
`,
      },
    },
  },
  args: {
    items: userItems,
    onChange: (v: string) => console.log("changed", v),
    placeholder: "Select user",
    disabled: true,
    selected: "2",
  },
};

export const DisabledWithoutSelection: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { AvatarCombobox } from '@mlw-packages/react-components';

export default function DisabledWithoutSelection() {
  const userItems = [
    {
      label: "Gabriel Glatz",
      value: "1",
    },
    {
      label: "Eduardo Ronchi",
      value: "2",
    },
  ];

  return (
    <AvatarCombobox
      items={userItems}
      onChange={(v) => console.log("changed", v)}
      placeholder="This field is disabled"
      disabled={true}
    />
  );
}
`,
      },
    },
  },
  args: {
    items: userItems,
    onChange: (v: string) => console.log("changed", v),
    placeholder: "This field is disabled",
    disabled: true,
  },
};

export const WithError: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { AvatarCombobox } from '@mlw-packages/react-components';

export default function WithError() {
  const userItems = [
    {
      label: "Gabriel Glatz",
      value: "1",
    },
    {
      label: "Eduardo Ronchi",
      value: "2",
    },
  ];

  return (
    <AvatarCombobox
      items={userItems}
      onChange={(v) => console.log("changed", v)}
      placeholder="Select user"
      error="This field is required"
      label="Required Field"
    />
  );
}
`,
      },
    },
  },
  args: {
    items: userItems,
    onChange: (v: string) => console.log("changed", v),
    placeholder: "Select user",
    error: "This field is required",
    label: "Required Field",
  },
};

export const WithCustomAvatar: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { AvatarCombobox } from '@mlw-packages/react-components';

export default function WithCustomAvatar() {
  return (
    <AvatarCombobox
      items={[
        {
          label: "Premium User",
          value: "1",
          avatar: "⭐",
          avatarClassName: "bg-yellow-400/20 text-yellow-600",
        },
        {
          label: "VIP User",
          value: "2",
          avatar: "👑",
          avatarClassName: "bg-purple-400/20 text-purple-600",
        },
        {
          label: "New User",
          value: "3",
          avatar: "🆕",
          avatarClassName: "bg-blue-400/20 text-blue-600",
        },
      ]}
      onChange={(v) => console.log("changed", v)}
      placeholder="Select user type"
      label="User Type"
    />
  );
}
`,
      },
    },
  },
  args: {
    items: [
      {
        label: "Premium User",
        value: "1",
        avatar: "⭐",
        avatarClassName: "bg-yellow-400/20 text-yellow-600",
      },
      {
        label: "VIP User",
        value: "2",
        avatar: "👑",
        avatarClassName: "bg-purple-400/20 text-purple-600",
      },
      {
        label: "New User",
        value: "3",
        avatar: "🆕",
        avatarClassName: "bg-blue-400/20 text-blue-600",
      },
    ],
    onChange: (v: string) => console.log("changed", v),
    placeholder: "Select user type",
    label: "User Type",
  },
};

export const WithCustomColors: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { AvatarCombobox } from '@mlw-packages/react-components';

export default function WithCustomColors() {
  return (
    <AvatarCombobox
      items={[
        { label: "Option A", value: "a" },
        { label: "Option B", value: "b" },
        { label: "Option C", value: "c" },
      ]}
      colors={[
        "bg-red-100 text-red-700",
        "bg-yellow-100 text-yellow-700",
        "bg-orange-100 text-orange-700"
      ]}
      onChange={(v) => console.log("changed", v)}
      placeholder="Select option"
      label="Custom Colors Palette"
    />
  );
}
`,
      },
    },
  },
  args: {
    items: [
      { label: "Option A", value: "a" },
      { label: "Option B", value: "b" },
      { label: "Option C", value: "c" },
    ],
    colors: [
      "bg-red-100 text-red-700",
      "bg-yellow-100 text-yellow-700",
      "bg-orange-100 text-orange-700",
    ],
    onChange: (v: string) => console.log("changed", v),
    placeholder: "Select option",
    label: "Custom Colors Palette",
  },
};

export const AutoGeneratedColors: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { AvatarCombobox } from '@mlw-packages/react-components';

export default function AutoGeneratedColors() {
  return (
    <AvatarCombobox
      items={[
        { label: "Option A", value: "a" },
        { label: "Option B", value: "b" },
        { label: "Option C", value: "c" },
      ]}
      onChange={(v) => console.log("changed", v)}
      placeholder="Select option"
      label="Auto Generated Colors"
    />
  );
}
`,
      },
    },
  },
  args: {
    items: [
      { label: "Option A", value: "a" },
      { label: "Option B", value: "b" },
      { label: "Option C", value: "c" },
    ],
    onChange: (v: string) => console.log("changed", v),
    placeholder: "Select option",
    label: "Auto Generated Colors",
  },
};

export const Cities: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { AvatarCombobox } from '@mlw-packages/react-components';

export default function CitiesExample() {
  const [selected, setSelected] = useState<string | null>(null);

  const cityItems = [
    { label: 'Florianópolis, SC', value: 'florianopolis-sc', avatar: 'SC', avatarClassName: 'bg-blue-100 text-blue-700' },
    { label: 'Joinville, SC', value: 'joinville-sc', avatar: 'SC', avatarClassName: 'bg-green-100 text-green-700' },
    { label: 'Blumenau, SC', value: 'blumenau-sc', avatar: 'SC', avatarClassName: 'bg-purple-100 text-purple-700' },
    { label: 'São Paulo, SP', value: 'sao-paulo-sp', avatar: 'SP', avatarClassName: 'bg-gray-100 text-gray-800' },
    { label: 'Rio de Janeiro, RJ', value: 'rio-de-janeiro-rj', avatar: 'RJ', avatarClassName: 'bg-red-100 text-red-700' },
    { label: 'Belo Horizonte, MG', value: 'belo-horizonte-mg', avatar: 'MG', avatarClassName: 'bg-amber-100 text-amber-700' },
    { label: 'Porto Alegre, RS', value: 'porto-alegre-rs', avatar: 'RS', avatarClassName: 'bg-indigo-100 text-indigo-700' },
    { label: 'Curitiba, PR', value: 'curitiba-pr', avatar: 'PR', avatarClassName: 'bg-green-100 text-green-800' },
    { label: 'Salvador, BA', value: 'salvador-ba', avatar: 'BA', avatarClassName: 'bg-orange-100 text-orange-700' },
    { label: 'Brasília, DF', value: 'brasilia-df', avatar: 'DF', avatarClassName: 'bg-yellow-100 text-yellow-800' },
    { label: 'Manaus, AM', value: 'manaus-am', avatar: 'AM', avatarClassName: 'bg-teal-100 text-teal-700' },
    { label: 'Fortaleza, CE', value: 'fortaleza-ce', avatar: 'CE', avatarClassName: 'bg-pink-100 text-pink-700' },
    { label: 'Recife, PE', value: 'recife-pe', avatar: 'PE', avatarClassName: 'bg-violet-100 text-violet-700' },
  ];

  return (
    <div className="w-[300px]">
      <AvatarCombobox
        items={cityItems}
        selected={selected}
        onChange={setSelected}
        placeholder="Selecione uma cidade"
        label="Cidades (UF)"
      />
    </div>
  );
}
`,
      },
    },
  },
  args: {
    items: [
      {
        label: "Florianópolis, SC",
        value: "florianopolis-sc",
        avatar: "SC",
        avatarClassName: "bg-blue-100 text-blue-700",
      },
      {
        label: "Joinville, SC",
        value: "joinville-sc",
        avatar: "SC",
        avatarClassName: "bg-green-100 text-green-700",
      },
      {
        label: "Blumenau, SC",
        value: "blumenau-sc",
        avatar: "SC",
        avatarClassName: "bg-purple-100 text-purple-700",
      },
      {
        label: "São Paulo, SP",
        value: "sao-paulo-sp",
        avatar: "SP",
        avatarClassName: "bg-gray-100 text-gray-800",
      },
      {
        label: "Rio de Janeiro, RJ",
        value: "rio-de-janeiro-rj",
        avatar: "RJ",
        avatarClassName: "bg-red-100 text-red-700",
      },
      {
        label: "Belo Horizonte, MG",
        value: "belo-horizonte-mg",
        avatar: "MG",
        avatarClassName: "bg-amber-100 text-amber-700",
      },
      {
        label: "Porto Alegre, RS",
        value: "porto-alegre-rs",
        avatar: "RS",
        avatarClassName: "bg-indigo-100 text-indigo-700",
      },
      {
        label: "Curitiba, PR",
        value: "curitiba-pr",
        avatar: "PR",
        avatarClassName: "bg-green-100 text-green-800",
      },
      {
        label: "Salvador, BA",
        value: "salvador-ba",
        avatar: "BA",
        avatarClassName: "bg-orange-100 text-orange-700",
      },
      {
        label: "Brasília, DF",
        value: "brasilia-df",
        avatar: "DF",
        avatarClassName: "bg-yellow-100 text-yellow-800",
      },
      {
        label: "Manaus, AM",
        value: "manaus-am",
        avatar: "AM",
        avatarClassName: "bg-teal-100 text-teal-700",
      },
      {
        label: "Fortaleza, CE",
        value: "fortaleza-ce",
        avatar: "CE",
        avatarClassName: "bg-pink-100 text-pink-700",
      },
      {
        label: "Recife, PE",
        value: "recife-pe",
        avatar: "PE",
        avatarClassName: "bg-violet-100 text-violet-700",
      },
    ],
    onChange: (v: string) => console.log("changed", v),
    placeholder: "Selecione uma cidade",
    label: "Cidades (UF)",
  },
};
