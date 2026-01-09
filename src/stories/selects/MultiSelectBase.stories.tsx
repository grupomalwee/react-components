import "../../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  MultiSelectBase,
  MultiSelectTriggerBase,
  MultiSelectValueBase,
  MultiSelectContentBase,
  MultiSelectItemBase,
  MultiSelectGroupBase,
} from "@/components/ui/selects/MultiSelectBase";
import * as React from "react";
// removed unused import SelectValueBase

type MultiSelectStoryArgs = {
  values?: string[];
  defaultValues?: string[];
  placeholder?: string;
  width?: string;
  onValuesChange?: (v: string[]) => void;
  disabled?: boolean;
  empty?: React.ReactNode;
  error?: string;
};

const meta: Meta<typeof MultiSelectBase> = {
  title: "selects/MultiSelectBase",
  component: MultiSelectBase,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "MultiSelect com trigger, badges e busca integrada. Componente base para seleção múltipla.",
      },
      source: {
        code: `import React, { useState } from 'react';
import {
  MultiSelectBase,
  MultiSelectTriggerBase,
  MultiSelectValueBase,
  MultiSelectContentBase,
  MultiSelectItemBase,
  MultiSelectGroupBase,
} from '@mlw-packages/react-components';

export default function Example() {
  const [values, setValues] = useState<string[]>([]);
  return (
    <MultiSelectBase values={values} onValuesChange={setValues}>
      <MultiSelectTriggerBase>
        <MultiSelectValueBase placeholder="Selecione frutas" />
      </MultiSelectTriggerBase>
      <MultiSelectContentBase search={{ placeholder: 'Pesquisar...' }}>
        <MultiSelectGroupBase>
          <MultiSelectItemBase value="apple">Apple</MultiSelectItemBase>
          <MultiSelectItemBase value="banana">Banana</MultiSelectItemBase>
          <MultiSelectItemBase value="blueberry">Blueberry</MultiSelectItemBase>
        </MultiSelectGroupBase>
      </MultiSelectContentBase>
    </MultiSelectBase>
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
  argTypes: {
    values: {
      control: "object",
      description: "Array de valores selecionados (controlado)",
    },
    defaultValues: {
      control: "object",
      description: "Array de valores iniciais (não controlado)",
    },
    disabled: {
      control: "boolean",
      description: "Desabilita o multi select",
    },
    empty: {
      control: "text",
      description: "Mensagem exibida quando não há itens",
    },
    error: {
      control: "text",
      description: "Mensagem de erro a ser exibida",
    },
    onValuesChange: { action: "onValuesChange" },
  },
};

export default meta;
type Story = StoryObj<typeof MultiSelectBase>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import {
  MultiSelectBase,
  MultiSelectTriggerBase,
  MultiSelectValueBase,
  MultiSelectContentBase,
  MultiSelectItemBase,
  MultiSelectGroupBase,
} from '@mlw-packages/react-components';

export default function Default() {
  const [values, setValues] = useState<string[]>([]);

  return (
    <MultiSelectBase values={values} onValuesChange={setValues}>
      <MultiSelectTriggerBase>
        <MultiSelectValueBase placeholder="Selecione" />
      </MultiSelectTriggerBase>
      <MultiSelectContentBase>
        <MultiSelectGroupBase>
          <MultiSelectItemBase value="apple">Apple</MultiSelectItemBase>
          <MultiSelectItemBase value="banana">Banana</MultiSelectItemBase>
          <MultiSelectItemBase value="blueberry">Blueberry</MultiSelectItemBase>
        </MultiSelectGroupBase>
      </MultiSelectContentBase>
    </MultiSelectBase>
  );
}
`,
      },
    },
  },

  render: (args: MultiSelectStoryArgs) => {
    const [values, setValues] = React.useState<string[]>(args.values ?? []);

    React.useEffect(() => {
      if (args.values !== undefined) setValues(args.values);
    }, [args.values]);

    const items = [
      {
        label: "1030000 - John Doe",
        value: "1030000",
      },
      {
        label: "1030001 - Thomas Turband",
        value: "1030001",
      },
      {
        label: "1030002 - Alice Johnson",
        value: "1030002",
      },
      {
        label: "1040000 - Kleber Norte",
        value: "1040000",
      },
    ];

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 200,
          padding: 32,
        }}
      >
        <MultiSelectBase
          values={values}
          onValuesChange={(v) => {
            setValues(v);
            args.onValuesChange?.(v);
          }}
        >
          <MultiSelectTriggerBase className="max-w-80">
            <MultiSelectValueBase placeholder="Selecione os representantes" />
          </MultiSelectTriggerBase>
          <MultiSelectContentBase>
            <MultiSelectGroupBase>
              {items.map((item) => (
                <MultiSelectItemBase key={item.value} value={item.label}>
                  {item.label}
                </MultiSelectItemBase>
              ))}
            </MultiSelectGroupBase>
          </MultiSelectContentBase>
        </MultiSelectBase>
      </div>
    );
  },
};

export const WithDefaultValues: Story = {
  args: {
    defaultValues: ["banana", "pineapple"],
  },
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import {
  MultiSelectBase,
  MultiSelectTriggerBase,
  MultiSelectValueBase,
  MultiSelectContentBase,
  MultiSelectItemBase,
  MultiSelectGroupBase,
} from '@mlw-packages/react-components';

export default function WithDefaultValues() {
  const [values, setValues] = useState<string[]>(['banana', 'pineapple']);

  return (
    <MultiSelectBase
      values={values}
      defaultValues={["banana", "pineapple"]}
      onValuesChange={setValues}
    >
      <MultiSelectTriggerBase>
        <MultiSelectValueBase placeholder="Selecione frutas" />
      </MultiSelectTriggerBase>
      <MultiSelectContentBase search={{ placeholder: 'Pesquisar...' }}>
        <MultiSelectGroupBase>
          <MultiSelectItemBase value="apple">Apple</MultiSelectItemBase>
          <MultiSelectItemBase value="banana">Banana</MultiSelectItemBase>
          <MultiSelectItemBase value="blueberry">Blueberry</MultiSelectItemBase>
          <MultiSelectItemBase value="grapes">Grapes</MultiSelectItemBase>
          <MultiSelectItemBase value="pineapple">Pineapple</MultiSelectItemBase>
        </MultiSelectGroupBase>
      </MultiSelectContentBase>
    </MultiSelectBase>
  );
}
`,
      },
    },
  },

  render: (args: MultiSelectStoryArgs) => {
    const [values, setValues] = React.useState<string[]>(
      args.defaultValues ?? []
    );
    React.useEffect(() => {
      if (args.values !== undefined) setValues(args.values);
    }, [args.values]);

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 200,
          padding: 32,
        }}
      >
        <MultiSelectBase
          values={values}
          defaultValues={args.defaultValues}
          disabled={args.disabled}
          empty={args.empty}
          error={args.error}
          onValuesChange={(v) => {
            setValues(v);
            args.onValuesChange?.(v);
          }}
        >
          <MultiSelectTriggerBase>
            <MultiSelectValueBase
              placeholder={args.placeholder || "Selecione frutas"}
            />
          </MultiSelectTriggerBase>
          <MultiSelectContentBase search={{ placeholder: "Pesquisar..." }}>
            <MultiSelectGroupBase>
              <MultiSelectItemBase value="apple">Apple</MultiSelectItemBase>
              <MultiSelectItemBase value="banana">Banana</MultiSelectItemBase>
              <MultiSelectItemBase value="blueberry">
                Blueberry
              </MultiSelectItemBase>
              <MultiSelectItemBase value="grapes">Grapes</MultiSelectItemBase>
              <MultiSelectItemBase value="pineapple">
                Pineapple
              </MultiSelectItemBase>
            </MultiSelectGroupBase>
          </MultiSelectContentBase>
        </MultiSelectBase>
      </div>
    );
  },
};

export const ErrorState: Story = {
  args: {
    error: "Seleção inválida",
  },
  parameters: {
    docs: {
      storyDescription:
        "Mostra o estado de erro exibindo a mensagem passada em `error`.",
      source: {
        code: `import React from 'react';
import {
  MultiSelectBase,
  MultiSelectTriggerBase,
  MultiSelectValueBase,
  MultiSelectContentBase,
  MultiSelectItemBase,
  MultiSelectGroupBase,
} from '@mlw-packages/react-components';

export default function ErrorState() {
  return (
    <MultiSelectBase error="Seleção inválida">
      <MultiSelectTriggerBase>
        <MultiSelectValueBase placeholder="Selecione (erro)" />
      </MultiSelectTriggerBase>
      <MultiSelectContentBase>
        <MultiSelectGroupBase>
          <MultiSelectItemBase value="apple">Apple</MultiSelectItemBase>
          <MultiSelectItemBase value="banana">Banana</MultiSelectItemBase>
        </MultiSelectGroupBase>
      </MultiSelectContentBase>
    </MultiSelectBase>
  );
}
`,
      },
    },
  },
  render: (args: MultiSelectStoryArgs) => {
    const [values, setValues] = React.useState<string[]>([]);
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 32 }}>
        <MultiSelectBase
          values={values}
          error={args.error}
          onValuesChange={setValues}
        >
          <MultiSelectTriggerBase>
            <MultiSelectValueBase
              placeholder={args.placeholder || "Selecione (erro)"}
            />
          </MultiSelectTriggerBase>
          <MultiSelectContentBase>
            <MultiSelectGroupBase>
              <MultiSelectItemBase value="apple">Apple</MultiSelectItemBase>
              <MultiSelectItemBase value="banana">Banana</MultiSelectItemBase>
            </MultiSelectGroupBase>
          </MultiSelectContentBase>
        </MultiSelectBase>
      </div>
    );
  },
};

export const EmptyState: Story = {
  args: {
    empty: "Nenhum item disponível",
  },
  parameters: {
    docs: {
      storyDescription:
        "Exibe a mensagem `empty` quando não há itens listados.",
      source: {
        code: `import React from 'react';
import {
  MultiSelectBase,
  MultiSelectTriggerBase,
  MultiSelectValueBase,
  MultiSelectContentBase,
  MultiSelectGroupBase,
} from '@mlw-packages/react-components';

export default function EmptyState() {
  return (
    <MultiSelectBase empty={"Nenhum item disponível"}>
      <MultiSelectTriggerBase>
        <MultiSelectValueBase placeholder="Sem itens" />
      </MultiSelectTriggerBase>
      <MultiSelectContentBase>
        <MultiSelectGroupBase>
          {/* Intencionalmente vazio para demonstrar empty */}
        </MultiSelectGroupBase>
      </MultiSelectContentBase>
    </MultiSelectBase>
  );
}
`,
      },
    },
  },
  render: (args: MultiSelectStoryArgs) => {
    const [values, setValues] = React.useState<string[]>([]);
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 32 }}>
        <MultiSelectBase
          values={values}
          empty={args.empty}
          onValuesChange={setValues}
        >
          <MultiSelectTriggerBase>
            <MultiSelectValueBase
              placeholder={args.placeholder || "Sem itens"}
            />
          </MultiSelectTriggerBase>
          <MultiSelectContentBase>
            <MultiSelectGroupBase>
              {/* Intencionalmente vazio para demonstrar `empty` */}
            </MultiSelectGroupBase>
          </MultiSelectContentBase>
        </MultiSelectBase>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  parameters: {
    docs: {
      storyDescription: "Controla o `disabled` para desabilitar interação.",
      source: {
        code: `import React from 'react';
import {
  MultiSelectBase,
  MultiSelectTriggerBase,
  MultiSelectValueBase,
  MultiSelectContentBase,
  MultiSelectItemBase,
  MultiSelectGroupBase,
} from '@mlw-packages/react-components';

export default function Disabled() {
  return (
    <MultiSelectBase disabled>
      <MultiSelectTriggerBase>
        <MultiSelectValueBase placeholder="Desabilitado" />
      </MultiSelectTriggerBase>
      <MultiSelectContentBase>
        <MultiSelectGroupBase>
          <MultiSelectItemBase value="apple">Apple</MultiSelectItemBase>
          <MultiSelectItemBase value="banana">Banana</MultiSelectItemBase>
        </MultiSelectGroupBase>
      </MultiSelectContentBase>
    </MultiSelectBase>
  );
}
`,
      },
    },
  },
  render: (args: MultiSelectStoryArgs) => {
    const [values, setValues] = React.useState<string[]>([]);
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 32 }}>
        <MultiSelectBase
          values={values}
          disabled={args.disabled}
          onValuesChange={setValues}
        >
          <MultiSelectTriggerBase>
            <MultiSelectValueBase
              placeholder={args.placeholder || "Desabilitado"}
            />
          </MultiSelectTriggerBase>
          <MultiSelectContentBase>
            <MultiSelectGroupBase>
              <MultiSelectItemBase value="apple">Apple</MultiSelectItemBase>
              <MultiSelectItemBase value="banana">Banana</MultiSelectItemBase>
            </MultiSelectGroupBase>
          </MultiSelectContentBase>
        </MultiSelectBase>
      </div>
    );
  },
};

export const ManyOptionsWithSearch: Story = {
  parameters: {
    docs: {
      storyDescription:
        "Mostra busca integrada com muitos itens para testar filtragem.",
      source: {
        code: `import React, { useState } from 'react';
import {
  MultiSelectBase,
  MultiSelectTriggerBase,
  MultiSelectValueBase,
  MultiSelectContentBase,
  MultiSelectItemBase,
  MultiSelectGroupBase,
} from '@mlw-packages/react-components';

export default function ManyOptionsWithSearch() {
  const [values, setValues] = useState<string[]>([]);
  const items = [
    'Apple','Apricot','Avocado','Banana','Blackberry','Blueberry','Cherry','Coconut','Fig','Grapes','Kiwi','Lemon','Lime','Mango','Melon','Nectarine','Orange','Papaya','Peach','Pear','Pineapple','Plum','Raspberry','Strawberry','Watermelon'
  ];

  return (
    <MultiSelectBase values={values} onValuesChange={setValues}>
      <MultiSelectTriggerBase>
        <MultiSelectValueBase placeholder="Pesquisar frutas..." />
      </MultiSelectTriggerBase>
      <MultiSelectContentBase search={{ placeholder: 'Pesquisar frutas' }}>
        <MultiSelectGroupBase>
          {items.map((it) => (
            <MultiSelectItemBase key={it} value={it.toLowerCase()} badgeLabel={it}>
              {it}
            </MultiSelectItemBase>
          ))}
        </MultiSelectGroupBase>
      </MultiSelectContentBase>
    </MultiSelectBase>
  );
}
`,
      },
    },
  },
  render: (args: MultiSelectStoryArgs) => {
    const [values, setValues] = React.useState<string[]>([]);
    const items = [
      "Apple",
      "Apricot",
      "Avocado",
      "Banana",
      "Blackberry",
      "Blueberry",
      "Cherry",
      "Coconut",
      "Fig",
      "Grapes",
      "Kiwi",
      "Lemon",
      "Lime",
      "Mango",
      "Melon",
      "Nectarine",
      "Orange",
      "Papaya",
      "Peach",
      "Pear",
      "Pineapple",
      "Plum",
      "Raspberry",
      "Strawberry",
      "Watermelon",
    ];

    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 32 }}>
        <MultiSelectBase values={values} onValuesChange={setValues}>
          <MultiSelectTriggerBase>
            <MultiSelectValueBase
              placeholder={args.placeholder || "Pesquisar frutas..."}
            />
          </MultiSelectTriggerBase>
          <MultiSelectContentBase search={{ placeholder: "Pesquisar frutas" }}>
            <MultiSelectGroupBase>
              {items.map((it) => (
                <MultiSelectItemBase
                  key={it}
                  value={it.toLowerCase()}
                  badgeLabel={it}
                >
                  {it}
                </MultiSelectItemBase>
              ))}
            </MultiSelectGroupBase>
          </MultiSelectContentBase>
        </MultiSelectBase>
      </div>
    );
  },
};
