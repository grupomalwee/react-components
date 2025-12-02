import "../../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  HoverCardBase,
  HoverCardContentBase,
  HoverCardTriggerBase,
} from "../components/ui/form/HoverCardBase";
import { ButtonBase } from "../components/ui/form/ButtonBase";
import {
  AvatarBase,
  AvatarImageBase,
  AvatarFallbackBase,
} from "../components/ui/data/AvatarBase";

const meta: Meta<typeof HoverCardBase> = {
  title: "forms/Hover Card",
  component: HoverCardBase,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "HoverCard para exibir informações ao passar o mouse, com conteúdo customizável.",
      },
      source: {
        code: `import { HoverCardBase, HoverCardTriggerBase, HoverCardContentBase } from '@mlw-packages/react-components';
import { ButtonBase } from '@mlw-packages/react-components';
import { AvatarBase, AvatarImageBase, AvatarFallbackBase } from '@mlw-packages/react-components';

function Example() {
  return (
    <HoverCardBase>
      <HoverCardTriggerBase asChild>
        <ButtonBase variant='link'>@mlw-packages</ButtonBase>
      </HoverCardTriggerBase>
      <HoverCardContentBase className='w-80'>
        {/* Conteúdo personalizado aqui */}
      </HoverCardContentBase>
    </HoverCardBase>
  );
}

export default Example;`,
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
type Story = StoryObj<typeof HoverCardBase>;

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
      <div className="p-8">
        <HoverCardBase>
          <HoverCardTriggerBase asChild>
            <ButtonBase variant="link">@mlw-packages</ButtonBase>
          </HoverCardTriggerBase>
          <HoverCardContentBase className="w-80">
            <div className="flex justify-between gap-4">
              <AvatarBase>
                <AvatarImageBase src="https://github.com/grupomalwee.png" />
                <AvatarFallbackBase>VC</AvatarFallbackBase>
              </AvatarBase>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">@mlw-packages</h4>
                <p className="text-sm">
                  The React Components Library by @grupomalwee.
                </p>
                <div className="text-xs text-muted-foreground">2025</div>
              </div>
            </div>
          </HoverCardContentBase>
        </HoverCardBase>
      </div>
    </div>
  ),
};

Default.parameters = {
  ...Default.parameters,
  docs: {
    ...Default.parameters?.docs,
    source: {
      code: `import { HoverCardBase, HoverCardTriggerBase, HoverCardContentBase } from '@mlw-packages/react-components';
import { ButtonBase } from '@mlw-packages/react-components';
import { AvatarBase, AvatarImageBase, AvatarFallbackBase } from '@mlw-packages/react-components';

function Example() {
  return (
    <HoverCardBase>
      <HoverCardTriggerBase asChild>
        <ButtonBase variant='link'>@mlw-packages</ButtonBase>
      </HoverCardTriggerBase>
      <HoverCardContentBase className='w-80'>
        <div className='flex justify-between gap-4'>
          <AvatarBase>
            <AvatarImageBase src='https://github.com/grupomalwee.png' />
            <AvatarFallbackBase>VC</AvatarFallbackBase>
          </AvatarBase>
          <div className='space-y-1'>
            <h4 className='text-sm font-semibold'>@mlw-packages</h4>
            <p className='text-sm'>The React Components Library by @grupomalwee.</p>
            <div className='text-xs text-muted-foreground'>2025</div>
          </div>
        </div>
      </HoverCardContentBase>
    </HoverCardBase>
  );
}

export default Example;`,
    },
  },
};
