import "../../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  SelectBase,
  SelectTriggerBase,
  SelectContentBase,
  SelectItemBase,
  SelectValueBase,
  SelectGroupBase,
  SelectLabelBase,
} from "@/components/ui/SelectBase";
import * as React from "react";

type SelectStoryArgs = {
  open?: boolean;
  disabled?: boolean;
  error?: string;
  value?: string;
  width?: string;
  placeholder?: string;
  onOpenChange?: (v: boolean) => void;
  onValueChange?: (v: string) => void;
};

const meta: Meta<typeof SelectBase> = {
  title: "selects/SelectBase",
  component: SelectBase,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Select para seleção de opções, listas e agrupamentos. Componente base altamente personalizável.",
      },
      source: {
        code: `import React, { useState } from 'react';
import {
  SelectBase,
  SelectTriggerBase,
  SelectContentBase,
  SelectItemBase,
  SelectValueBase,
  SelectGroupBase,
  SelectLabelBase,
} from '@mlw-packages/react-components';

export default function Example() {
  const [value, setValue] = useState<string>("");

  return (
    <SelectBase value={value} onValueChange={setValue}>
      <SelectTriggerBase className="w-[180px]">
        <SelectValueBase placeholder="Select a fruit" />
      </SelectTriggerBase>
      <SelectContentBase>
        <SelectGroupBase>
          <SelectLabelBase>Fruits</SelectLabelBase>
          <SelectItemBase value="apple">Apple</SelectItemBase>
          <SelectItemBase value="banana">Banana</SelectItemBase>
          <SelectItemBase value="blueberry">Blueberry</SelectItemBase>
        </SelectGroupBase>
      </SelectContentBase>
    </SelectBase>
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
    open: {
      control: "boolean",
      description: "Estado de abertura do select (controlado)",
    },
    defaultOpen: {
      control: "boolean",
      description: "Estado inicial de abertura (não controlado)",
    },
    value: {
      control: "text",
      description: "Valor selecionado (controlado)",
    },
    defaultValue: {
      control: "text",
      description: "Valor inicial (não controlado)",
    },
    disabled: {
      control: "boolean",
      description: "Desabilita o select",
    },
    onOpenChange: { action: "onOpenChange" },
    onValueChange: { action: "onValueChange" },
  },
};

export default meta;
type Story = StoryObj<typeof SelectBase>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import {
  SelectBase,
  SelectTriggerBase,
  SelectContentBase,
  SelectItemBase,
  SelectValueBase,
  SelectGroupBase,
  SelectLabelBase,
} from '@mlw-packages/react-components';

export default function Default() {
  const [value, setValue] = useState<string>("");

  return (
    <SelectBase value={value} onValueChange={setValue}>
      <SelectTriggerBase className="w-[180px]">
        <SelectValueBase placeholder="Select a fruit" />
      </SelectTriggerBase>
      <SelectContentBase>
        <SelectGroupBase>
          <SelectLabelBase>Fruits</SelectLabelBase>
          <SelectItemBase value="apple">Apple</SelectItemBase>
          <SelectItemBase value="banana">Banana</SelectItemBase>
          <SelectItemBase value="blueberry">Blueberry</SelectItemBase>
          <SelectItemBase value="grapes">Grapes</SelectItemBase>
          <SelectItemBase value="pineapple">Pineapple</SelectItemBase>
        </SelectGroupBase>
      </SelectContentBase>
    </SelectBase>
  );
}
`,
      },
    },
  },
  render: (args: SelectStoryArgs) => {
    const [open, setOpen] = React.useState<boolean>(!!args.open);
    const [value, setValue] = React.useState<string>(args.value || "");
    React.useEffect(() => setOpen(!!args.open), [args.open]);
    React.useEffect(() => setValue(args.value || ""), [args.value]);

    const widthClass = `w-[${args.width || "180px"}]`;

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
          padding: "32px 0",
        }}
      >
        <SelectBase
          open={open}
          onOpenChange={(v) => {
            setOpen(v);
            args.onOpenChange?.(v);
          }}
          value={value}
          onValueChange={(v) => {
            setValue(v);
            args.onValueChange?.(v);
          }}
        >
          <SelectTriggerBase
            open={open}
            className={widthClass}
            disabled={args.disabled}
            error={args.error}
          >
            <SelectValueBase
              placeholder={args.placeholder || "Select a fruit"}
            />
          </SelectTriggerBase>
          <SelectContentBase>
            <SelectGroupBase>
              <SelectLabelBase>Fruits</SelectLabelBase>
              <SelectItemBase value="apple">Apple</SelectItemBase>
              <SelectItemBase value="banana">Banana</SelectItemBase>
              <SelectItemBase value="blueberry">Blueberry</SelectItemBase>
              <SelectItemBase value="grapes">Grapes</SelectItemBase>
              <SelectItemBase value="pineapple">Pineapple</SelectItemBase>
            </SelectGroupBase>
          </SelectContentBase>
        </SelectBase>
      </div>
    );
  },
};

export const WithError: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import {
  SelectBase,
  SelectTriggerBase,
  SelectContentBase,
  SelectItemBase,
  SelectValueBase,
  SelectGroupBase,
  SelectLabelBase,
} from '@mlw-packages/react-components';

export default function WithError() {
  return (
    <SelectBase>
      <SelectTriggerBase
        className="w-[180px]"
        error="Você deve selecionar uma opção"
      >
        <SelectValueBase placeholder="Select a fruit" />
      </SelectTriggerBase>
      <SelectContentBase>
        <SelectGroupBase>
          <SelectLabelBase>Fruits</SelectLabelBase>
          <SelectItemBase value="apple">Apple</SelectItemBase>
          <SelectItemBase value="banana">Banana</SelectItemBase>
          <SelectItemBase value="blueberry">Blueberry</SelectItemBase>
          <SelectItemBase value="grapes">Grapes</SelectItemBase>
          <SelectItemBase value="pineapple">Pineapple</SelectItemBase>
        </SelectGroupBase>
      </SelectContentBase>
    </SelectBase>
  );
}
`,
      },
    },
  },
  render: (args: SelectStoryArgs) => {
    const [open, setOpen] = React.useState<boolean>(!!args.open);
    React.useEffect(() => setOpen(!!args.open), [args.open]);
    const widthClass = `w-[${args.width || "180px"}]`;

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
          padding: "32px 0",
        }}
      >
        <SelectBase
          open={open}
          onOpenChange={(v) => {
            setOpen(v);
            args.onOpenChange?.(v);
          }}
        >
          <SelectTriggerBase
            open={open}
            className={widthClass}
            error={args.error || "Você deve selecionar uma opção"}
          >
            <SelectValueBase
              placeholder={args.placeholder || "Select a fruit"}
            />
          </SelectTriggerBase>
          <SelectContentBase>
            <SelectGroupBase>
              <SelectLabelBase>Fruits</SelectLabelBase>
              <SelectItemBase value="apple">Apple</SelectItemBase>
              <SelectItemBase value="banana">Banana</SelectItemBase>
              <SelectItemBase value="blueberry">Blueberry</SelectItemBase>
              <SelectItemBase value="grapes">Grapes</SelectItemBase>
              <SelectItemBase value="pineapple">Pineapple</SelectItemBase>
            </SelectGroupBase>
          </SelectContentBase>
        </SelectBase>
      </div>
    );
  },
};

export const WithPagination: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import {
  SelectBase,
  SelectTriggerBase,
  SelectContentBase,
  SelectItemBase,
  SelectValueBase,
  SelectGroupBase,
  SelectLabelBase,
} from '@mlw-packages/react-components';

function PaginatedExample() {
  const items = Array.from({ length: 50 }).map((_, i) => 'Item ' + (i + 1));
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const start = (page - 1) * pageSize;
  const pageItems = items.slice(start, start + pageSize);

  return (
    <SelectBase>
      <SelectTriggerBase className="w-[200px]">
        <SelectValueBase placeholder="Select an item" />
      </SelectTriggerBase>
      <SelectContentBase>
        <SelectGroupBase>
          <SelectLabelBase>Items</SelectLabelBase>
          {pageItems.map((it) => (
            <SelectItemBase key={it} value={it}>
              {it}
            </SelectItemBase>
          ))}
        </SelectGroupBase>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: 8 }}>
          <button onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</button>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span>Page</span>
            <strong>{page}</strong>
            <span>of {Math.ceil(items.length / pageSize)}</span>
          </div>
          <button onClick={() => setPage((p) => Math.min(Math.ceil(items.length / pageSize), p + 1))}>
            Next
          </button>
        </div>
      </SelectContentBase>
    </SelectBase>
  );
}

export default PaginatedExample;
`,
      },
    },
  },
  render: (args: SelectStoryArgs) => {
    const items = Array.from({ length: 50 }).map((_, i) => `Item ${i + 1}`);
    const [open, setOpen] = React.useState<boolean>(!!args.open);
    React.useEffect(() => setOpen(!!args.open), [args.open]);
    const [page, setPage] = React.useState<number>(1);
    const pageSize = 8;
    const start = (page - 1) * pageSize;
    const pageItems = items.slice(start, start + pageSize);

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "240px",
          padding: "32px 0",
        }}
      >
        <SelectBase open={open} onOpenChange={(v) => setOpen(v)}>
          <SelectTriggerBase open={open} className="w-[200px]">
            <SelectValueBase
              placeholder={args.placeholder || "Select an item"}
            />
          </SelectTriggerBase>
          <SelectContentBase>
            <SelectGroupBase>
              <SelectLabelBase>Items</SelectLabelBase>
              {pageItems.map((it) => (
                <SelectItemBase key={it} value={it}>
                  {it}
                </SelectItemBase>
              ))}
            </SelectGroupBase>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: 8,
              }}
            >
              <button onClick={() => setPage((p) => Math.max(1, p - 1))}>
                Prev
              </button>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span>Page</span>
                <strong>{page}</strong>
                <span>of {Math.ceil(items.length / pageSize)}</span>
              </div>
              <button
                onClick={() =>
                  setPage((p) =>
                    Math.min(Math.ceil(items.length / pageSize), p + 1)
                  )
                }
              >
                Next
              </button>
            </div>
          </SelectContentBase>
        </SelectBase>
      </div>
    );
  },
};
