import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SidebarBase } from '../components/ui/SidebarBase';

const meta: Meta<typeof SidebarBase> = {
  title: 'Components/Sidebar',
  component: SidebarBase,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SidebarBase>;

export const Default: Story = {
  render: () => <SidebarBase>Sidebar de exemplo</SidebarBase>,
};
