import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  HoverCardBase,
  HoverCardContentBase,
  HoverCardTriggerBase,
} from '../components/ui/HoverCardBase';
import { ButtonBase } from '../components/ui/ButtonBase';
import { AvatarBase, AvatarImageBase, AvatarFallbackBase } from '../components/ui/AvatarBase';

const meta: Meta<typeof HoverCardBase> = {
  title: 'overlays/HoverCard',
  component: HoverCardBase,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'HoverCard para exibir informações ao passar o mouse, com conteúdo customizável.'
      }
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f6f6f6' },
        { name: 'dark', value: '#222' }
      ]
    },
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof HoverCardBase>;

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
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
  )
};
