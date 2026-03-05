import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { ColorPickerBase } from "@/components/ui/form/ColorPickerBase";

const meta: Meta<typeof ColorPickerBase> = {
  title: "form/ColorPicker",
  component: ColorPickerBase,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Seletor de cor com paleta de swatches, input hex editável e slider de opacidade opcional.",
      },
      source: {
        code: `import React, { useState } from 'react';
import { ColorPickerBase } from '@mlw-packages/react-components';

export default function Example() {
  const [color, setColor] = useState('#3B82F6');
  const [opacity, setOpacity] = useState(1);

  return (
    <ColorPickerBase
      label="Cor principal"
      value={color}
      onChange={setColor}
      opacity={opacity}
      onOpacityChange={setOpacity}
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
  argTypes: {
    value: { control: { type: "color" } },
    opacity: { control: { type: "range", min: 0, max: 1, step: 0.01 } },
    disabled: { control: "boolean" },
    label: { control: "text" },
    error: { control: "text" },
    onChange: { action: "change" },
    onOpacityChange: { action: "opacityChange" },
  },
  args: {
    value: "#3B82F6",
    opacity: 1,
    disabled: false,
    label: "",
    error: "",
  },
};

export default meta;
type Story = StoryObj<typeof ColorPickerBase>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { ColorPickerBase } from '@mlw-packages/react-components';

export default function Default() {
  const [color, setColor] = useState('#3B82F6');
  return (
    <div style={{ width: 280 }}>
      <ColorPickerBase label="Cor" value={color} onChange={setColor} />
    </div>
  );
}
`,
      },
    },
  },
  render: (args) => {
    const Comp = () => {
      const [color, setColor] = useState(args.value ?? "#3B82F6");
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "32px 0",
          }}
        >
          <div style={{ width: 280 }}>
            <ColorPickerBase
              {...args}
              label="Cor"
              value={color}
              onChange={setColor}
              data-testid="color-picker-default"
            />
          </div>
        </div>
      );
    };
    return <Comp />;
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verificar trigger renderizado", async () => {
      const trigger = canvas.getByTestId("color-picker-default-trigger");
      expect(trigger).toBeInTheDocument();
    });

    await step("Abrir popover ao clicar no trigger", async () => {
      const trigger = canvas.getByTestId("color-picker-default-trigger");
      await userEvent.click(trigger);
    });
  },
};

export const WithOpacity: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { ColorPickerBase } from '@mlw-packages/react-components';

export default function WithOpacity() {
  const [color, setColor] = useState('#EC4899');
  const [opacity, setOpacity] = useState(0.8);
  return (
    <ColorPickerBase
      label="Cor + opacidade"
      value={color}
      onChange={setColor}
      opacity={opacity}
      onOpacityChange={setOpacity}
    />
  );
}
`,
      },
    },
  },
  render: (args) => {
    const Comp = () => {
      const [color, setColor] = useState("#EC4899");
      const [opacity, setOpacity] = useState(0.8);
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            alignItems: "center",
            padding: "32px 0",
          }}
        >
          <div style={{ width: 280 }}>
            <ColorPickerBase
              {...args}
              label="Cor + opacidade"
              value={color}
              onChange={setColor}
              opacity={opacity}
              onOpacityChange={setOpacity}
              data-testid="color-picker-opacity"
            />
          </div>
          <div
            data-testid="color-preview"
            style={{
              width: 280,
              height: 48,
              borderRadius: 8,
              background: `rgba(${r}, ${g}, ${b}, ${opacity})`,
              border: "1px solid var(--border)",
            }}
          />
        </div>
      );
    };
    return <Comp />;
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verificar trigger com opacidade renderizado", async () => {
      const trigger = canvas.getByTestId("color-picker-opacity-trigger");
      expect(trigger).toBeInTheDocument();
    });

    await step("Verificar preview de cor presente", async () => {
      expect(canvas.getByTestId("color-preview")).toBeInTheDocument();
    });
  },
};

export const CustomSwatches: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { ColorPickerBase } from '@mlw-packages/react-components';

const PURPLE_SWATCHES = [
  '#F5F3FF', '#EDE9FE', '#DDD6FE', '#C4B5FD',
  '#A78BFA', '#8B5CF6', '#7C3AED', '#6D28D9',
];

export default function CustomSwatches() {
  const [color, setColor] = useState('#7C3AED');
  return (
    <ColorPickerBase
      label="Tom de roxo"
      value={color}
      onChange={setColor}
      swatches={PURPLE_SWATCHES}
    />
  );
}
`,
      },
    },
  },
  render: (args) => {
    const Comp = () => {
      const [color, setColor] = useState("#7C3AED");
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "32px 0",
          }}
        >
          <div style={{ width: 280 }}>
            <ColorPickerBase
              {...args}
              label="Tom de roxo"
              value={color}
              onChange={setColor}
              swatches={[
                "#F5F3FF",
                "#EDE9FE",
                "#DDD6FE",
                "#C4B5FD",
                "#A78BFA",
                "#8B5CF6",
                "#7C3AED",
                "#6D28D9",
                "#5B21B6",
                "#4C1D95",
                "#3B0764",
                "#2E1065",
              ]}
              data-testid="color-picker-swatches"
            />
          </div>
        </div>
      );
    };
    return <Comp />;
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verificar trigger renderizado", async () => {
      expect(
        canvas.getByTestId("color-picker-swatches-trigger"),
      ).toBeInTheDocument();
    });
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { ColorPickerBase } from '@mlw-packages/react-components';

export default function Disabled() {
  return (
    <div style={{ width: 280 }}>
      <ColorPickerBase label="Cor (desabilitado)" value="#6B7280" disabled />
    </div>
  );
}
`,
      },
    },
  },
  args: {
    disabled: true,
    value: "#6B7280",
    label: "Cor (desabilitado)",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verificar trigger desabilitado", async () => {
      const trigger = canvas.getByTestId("color-picker-base-trigger");
      expect(trigger).toBeDisabled();
    });
  },
};

export const WithError: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { ColorPickerBase } from '@mlw-packages/react-components';

export default function WithError() {
  const [color, setColor] = useState('#EF4444');
  return (
    <div style={{ width: 280 }}>
      <ColorPickerBase
        label="Cor de destaque"
        value={color}
        onChange={setColor}
        error="Selecione uma cor diferente de vermelho."
      />
    </div>
  );
}
`,
      },
    },
  },
  render: (args) => {
    const Comp = () => {
      const [color, setColor] = useState("#EF4444");
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "32px 0",
          }}
        >
          <div style={{ width: 280 }}>
            <ColorPickerBase
              {...args}
              label="Cor de destaque"
              value={color}
              onChange={setColor}
              error="Selecione uma cor diferente de vermelho."
              data-testid="color-picker-error"
            />
          </div>
        </div>
      );
    };
    return <Comp />;
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verificar mensagem de erro visível", async () => {
      expect(
        canvas.getByText("Selecione uma cor diferente de vermelho."),
      ).toBeInTheDocument();
    });
  },
};
