import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TooltipBase, TooltipTriggerBase, TooltipContentBase, TooltipProviderBase } from '../components/ui/TooltipBase';

const meta: Meta<typeof TooltipBase> = {
  title: 'Components/TooltipBase',
  component: TooltipBase,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TooltipBase>;


export const Default: Story = {
  render: () => (
    <TooltipProviderBase>
      <TooltipBase>
        <TooltipTriggerBase asChild>
          <button className="px-4 py-2 bg-primary text-white rounded">Passe o mouse</button>
        </TooltipTriggerBase>
        <TooltipContentBase sideOffset={8}>Dica!</TooltipContentBase>
      </TooltipBase>
    </TooltipProviderBase>
  )
};
