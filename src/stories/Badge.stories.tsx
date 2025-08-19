import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import { BadgeBase } from '../components/ui/BadgeBase';

const meta: Meta<typeof BadgeBase> = {
  title: 'data/Badge',
  component: BadgeBase,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BadgeBase>;

export const Default: Story = {
  render: () => <BadgeBase>Badge padrão</BadgeBase>,
};

export const Success: Story = {
  render: () => <BadgeBase className="bg-green-100 text-green-800">Sucesso</BadgeBase>,
};

export const Warning: Story = {
  render: () => <BadgeBase className="bg-yellow-100 text-yellow-800">Aviso</BadgeBase>,
};

export const Error: Story = {
  render: () => <BadgeBase className="bg-red-100 text-red-800">Erro</BadgeBase>,
};

export const Info: Story = {
  render: () => <BadgeBase className="bg-blue-100 text-blue-800">Info</BadgeBase>,
};
