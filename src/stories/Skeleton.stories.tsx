import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SkeletonBase } from "../components/ui/SkeletonBase";

const meta: Meta<typeof SkeletonBase> = {
  title: "diversos/Skeleton",
  component: SkeletonBase,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Skeleton para carregamento visual, placeholders e listas.",
      },
      source: {
        code: `import React from 'react';\nimport { SkeletonBase } from '@mlw-packages/react-components';\n\nexport default function Example() {\n  return (\n    <div style={{ padding: 20 }}>\n      <SkeletonBase style={{ width: 120, height: 24 }} />\n    </div>\n  );\n}\n`,
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
type Story = StoryObj<typeof SkeletonBase>;

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
      <SkeletonBase style={{ width: 120, height: 24 }} />
    </div>
  ),
};

Default.parameters = {
  docs: {
    source: {
      code: `import { SkeletonBase } from '@mlw-packages/react-components';\n\nexport default function Example() {\n  return <SkeletonBase style={{ width: 120, height: 24 }} />;\n}`,
    },
  },
};

export const VariosSkeletons: Story = {
  name: "Vários exemplos",
  render: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <div className="p-6 flex flex-col gap-10">
        <div className="flex gap-5">
          <SkeletonBase className="w-[350px] h-24 rounded-2xl" />
          <SkeletonBase className="w-[350px] h-24 rounded-2xl" />
        </div>
        <div className="flex items-center gap-4">
          <SkeletonBase className="w-14 h-14 rounded-full" />
          <div className="flex flex-col gap-2">
            <SkeletonBase className="w-[200px] h-4 rounded-md" />
            <SkeletonBase className="w-[150px] h-4 rounded-md" />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-4">
              <SkeletonBase className="w-10 h-10 rounded-md" />
              <SkeletonBase className="w-full h-4 rounded-md" />
              <SkeletonBase className="w-[80px] h-4 rounded-md" />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <SkeletonBase className="w-[100px] h-4 rounded" />
          <SkeletonBase className="w-full h-10 rounded-md" />
        </div>
        <div className="flex gap-4">
          <SkeletonBase className="w-[100px] h-10 rounded-md" />
          <SkeletonBase className="w-[150px] h-10 rounded-md" />
        </div>
        <SkeletonBase className="w-full h-[200px] rounded-xl" />
      </div>
    </div>
  ),
};

VariosSkeletons.parameters = {
  docs: {
    source: {
      code: `import { SkeletonBase } from '@mlw-packages/react-components';<div className="p-6 flex flex-col gap-10">
        <div className="flex gap-5">
          <SkeletonBase className="w-[350px] h-24 rounded-2xl" />
          <SkeletonBase className="w-[350px] h-24 rounded-2xl" />
        </div>
        <div className="flex items-center gap-4">
          <SkeletonBase className="w-14 h-14 rounded-full" />
          <div className="flex flex-col gap-2">
            <SkeletonBase className="w-[200px] h-4 rounded-md" />
            <SkeletonBase className="w-[150px] h-4 rounded-md" />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-4">
              <SkeletonBase className="w-10 h-10 rounded-md" />
              <SkeletonBase className="w-full h-4 rounded-md" />
              <SkeletonBase className="w-[80px] h-4 rounded-md" />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <SkeletonBase className="w-[100px] h-4 rounded" />
          <SkeletonBase className="w-full h-10 rounded-md" />
        </div>
        <div className="flex gap-4">
          <SkeletonBase className="w-[100px] h-10 rounded-md" />
          <SkeletonBase className="w-[150px] h-10 rounded-md" />
        </div>
        <SkeletonBase className="w-full h-[200px] rounded-xl" />
      </div>
    </div>`,
    },
  },
};
