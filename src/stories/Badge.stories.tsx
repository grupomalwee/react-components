import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import { BadgeBase } from '../components/ui/BadgeBase';

const meta: Meta<typeof BadgeBase> = {
  title: 'data/Badge',
  component: BadgeBase,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Badge para exibir status, categorias ou informações rápidas. Várias cores e estilos.'
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
type Story = StoryObj<typeof BadgeBase>;

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
      <BadgeBase>Badge padrão</BadgeBase>
    </div>
  ),
};

export const Success: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
      <BadgeBase className="bg-green-100 text-green-800">Sucesso</BadgeBase>
    </div>
  ),
};

export const Warning: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
      <BadgeBase className="bg-yellow-100 text-yellow-800">Aviso</BadgeBase>
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
      <BadgeBase className="bg-red-100 text-red-800">Erro</BadgeBase>
    </div>
  ),
};

export const Info: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
      <BadgeBase className="bg-blue-100 text-blue-800">Info</BadgeBase>
    </div>
  ),
};
