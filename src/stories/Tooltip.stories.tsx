import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  TooltipBase,
  TooltipTriggerBase,
  TooltipContentBase,
  TooltipProviderBase,
} from "../components/ui/feedback/TooltipBase";

const meta: Meta<typeof TooltipBase> = {
  title: "overlays/Tooltip",
  component: TooltipBase,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Tooltip para dicas rápidas, explicações e feedback de interface.",
      },
      source: {
        code: `import { TooltipProviderBase, TooltipBase, TooltipTriggerBase, TooltipContentBase } from '@mlw-packages/react-components';

export default function Example() {
  return (
    <TooltipProviderBase>
      <TooltipBase>
        <TooltipTriggerBase asChild>
          <button>Passe o mouse</button>
        </TooltipTriggerBase>
        <TooltipContentBase sideOffset={8}>Dica!</TooltipContentBase>
      </TooltipBase>
    </TooltipProviderBase>
  );
}`,
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
type Story = StoryObj<typeof TooltipBase>;

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
      <TooltipProviderBase>
        <TooltipBase>
          <TooltipTriggerBase asChild>
            <button className="px-4 py-2 bg-primary text-white rounded">
              Passe o mouse
            </button>
          </TooltipTriggerBase>
          <TooltipContentBase sideOffset={8}>Dica!</TooltipContentBase>
        </TooltipBase>
      </TooltipProviderBase>
    </div>
  ),
};
