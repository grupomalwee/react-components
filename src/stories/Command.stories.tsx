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
  title: 'Components/Command',
  component: CommandBase,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CommandBase>;

export const Exemplo: Story = {
  render: () => (
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
  ),
};
