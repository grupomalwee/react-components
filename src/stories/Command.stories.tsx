import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  CommandBase,
  CommandEmptyBase,
  CommandGroupBase,
  CommandInputBase,
  CommandItemBase,
  CommandListBase,
  CommandSeparatorBase,
} from '../components/ui/CommandBase';

const meta: Meta<typeof CommandBase> = {
  title: 'diversos/Command',
  component: CommandBase,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Command para execução de ações rápidas, busca e navegação por grupos.'
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
type Story = StoryObj<typeof CommandBase>;

export const Exemplo: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
      <CommandBase>
        <CommandInputBase placeholder="Type a command or search..." />
        <CommandListBase>
          <CommandEmptyBase>No results found.</CommandEmptyBase>
          <CommandGroupBase heading="Sugestões">
            <CommandItemBase>Calendar</CommandItemBase>
            <CommandItemBase>Search Emoji</CommandItemBase>
            <CommandItemBase>Calculator</CommandItemBase>
          </CommandGroupBase>
          <CommandSeparatorBase />
          <CommandGroupBase heading="Configurações">
            <CommandItemBase>Profile</CommandItemBase>
            <CommandItemBase>Billing</CommandItemBase>
            <CommandItemBase>Settings</CommandItemBase>
          </CommandGroupBase>
        </CommandListBase>
      </CommandBase>
    </div>
  ),
};
