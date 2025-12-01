import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SlideBase } from "../components/ui/form/SliderBase";
import { useState } from "react";
import { SunIcon, LadderIcon } from "@phosphor-icons/react";

const meta: Meta<typeof SliderBase> = {
  title: "forms/Slider",
  component: SlideBase,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Slider para seleção de valores, com orientação horizontal, vertical e ícones.",
      },
      source: {
        code: `import React, { useState } from 'react';\nimport { SlideBase } from '@mlw-packages/react-components';\nimport { SunIcon, LadderIcon } from '@phosphor-icons/react';\n\nexport default function Example() {\n  const [value, setValue] = useState([50]);\n  return (\n    <div style={{ padding: 20 }}>\n      <SlideBase value={value} onValueChange={setValue} max={100} />\n    </div>\n  );\n}\n`,
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
type Story = StoryObj<typeof SlideBase>;

export const Default: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <div style={{ width: 320 }}>
        <SlideBase defaultValue={[50]} max={100} step={1} />
      </div>
    </div>
  ),
};

Default.parameters = {
  docs: {
    source: {
      code: `import { SlideBase } from '@mlw-packages/react-components';\n\nexport default function Example() {\n  return <SlideBase defaultValue={[50]} max={100} />;\n}`,
    },
  },
};

export const SliderHorizontal: Story = {
  render: () => {
    const [value, setValue] = useState<number[]>([20]);
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "32px 0",
        }}
      >
        <div className="flex flex-col gap-2 w-64">
          <SlideBase
            label="Volume"
            value={value}
            onValueChange={setValue}
            max={100}
            min={0}
            step={1}
          />
          <span>Value: {value[0]}</span>
        </div>
      </div>
    );
  },
};

SliderHorizontal.parameters = {
  docs: {
    source: {
      code: `// controlled horizontal slider\nimport { SlideBase } from '@mlw-packages/react-components';`,
    },
  },
};

export const SliderHorizontalIcon: Story = {
  render: () => {
    const [value, setValue] = useState<number[]>([50]);
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "32px 0",
        }}
      >
        <div className="flex items-center gap-3 w-64">
          <SunIcon size={24} />
          <SlideBase
            className="flex-1 h-6 rounded-ful"
            value={value}
            onValueChange={setValue}
            max={100}
            min={0}
            step={1}
          />
          <span>{value[0]}%</span>
        </div>
      </div>
    );
  },
};

SliderHorizontalIcon.parameters = {
  docs: {
    source: {
      code: `// horizontal slider with leading icon\nimport { SlideBase } from '@mlw-packages/react-components';`,
    },
  },
};

export const SliderVertical: Story = {
  render: () => {
    const [value, setValue] = useState<number[]>([75]);
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "32px 0",
        }}
      >
        <div className="flex flex-col gap-2 h-40">
          <SlideBase
            label="Vertical Slider"
            orientation="vertical"
            className="h-32 w-6 rounded-md"
            value={value}
            onValueChange={setValue}
            max={100}
            min={0}
            step={1}
          />
          <span>{value[0]}</span>
        </div>
      </div>
    );
  },
};

SliderVertical.parameters = {
  docs: {
    source: {
      code: `// vertical slider\nimport { SlideBase } from '@mlw-packages/react-components';`,
    },
  },
};

export const SliderSteps: Story = {
  render: () => {
    const [value, setValue] = useState<number[]>([20]);
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "32px 0",
        }}
      >
        <div className="flex flex-col gap-2 w-64">
          <SlideBase
            label="Slider com Steps"
            className="w-full h-4 rounded-md"
            value={value}
            onValueChange={setValue}
            max={100}
            min={0}
            step={25}
            rightIcon={<LadderIcon />}
          />
        </div>
      </div>
    );
  },
};

SliderSteps.parameters = {
  docs: {
    source: {
      code: `// slider with step marks\nimport { SlideBase } from '@mlw-packages/react-components';`,
    },
  },
};
