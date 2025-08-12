import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import { BadgeBase } from '../components/ui/BadgeBase';

const meta: Meta<typeof BadgeBase> = {
  title: 'Components/BadgeBase',
  component: BadgeBase,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
    },
    status: {
      control: 'select',
      options: ['success', 'desactivated', 'destructive', 'away', 'custom', undefined],
    },
    statusColor: { control: 'text' },
    children: { control: 'text' },
  },
  args: {
    children: 'Badge',
    variant: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof BadgeBase>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12 }}>
      <BadgeBase {...args} variant="default">Default</BadgeBase>
      <BadgeBase {...args} variant="secondary">Secondary</BadgeBase>
      <BadgeBase {...args} variant="destructive">Destructive</BadgeBase>
      <BadgeBase {...args} variant="outline">Outline</BadgeBase>
    </div>
  ),
};

export const Status: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12 }}>
      <BadgeBase {...args} status="success">Success</BadgeBase>
      <BadgeBase {...args} status="desactivated">Desactivated</BadgeBase>
      <BadgeBase {...args} status="destructive">Destructive</BadgeBase>
      <BadgeBase {...args} status="away">Away</BadgeBase>
      <BadgeBase {...args} status="custom" statusColor="blue-500">Custom</BadgeBase>
    </div>
  ),
};
