import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AvatarBase, AvatarImageBase, AvatarFallbackBase } from '../components/ui/AvatarBase';

const meta: Meta<typeof AvatarBase> = {
  title: 'data/Avatar',
  component: AvatarBase,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Avatar para exibição de imagem de usuário, com fallback, agrupamento e variações visuais.'
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
type Story = StoryObj<typeof AvatarBase>;

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
      <AvatarBase>
        <AvatarImageBase src="https://github.com/grupomalwee.png" alt="Avatar" />
        <AvatarFallbackBase>CN</AvatarFallbackBase>
      </AvatarBase>
    </div>
  ),
};

export const WithBorder: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
      <AvatarBase className="ring-2 ring-primary">
        <AvatarImageBase src="https://github.com/grupomalwee.png" alt="Avatar" />
        <AvatarFallbackBase>CN</AvatarFallbackBase>
      </AvatarBase>
    </div>
  ),
};

export const Grayscale: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
      <AvatarBase className="grayscale">
        <AvatarImageBase src="https://github.com/grupomalwee.png" alt="Avatar" />
        <AvatarFallbackBase>CN</AvatarFallbackBase>
      </AvatarBase>
    </div>
  ),
};

export const Grouped: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
      <div className="flex -space-x-3">
        {["CN", "LR", "ER"].map((initials, i) => (
          <AvatarBase
            key={i}
            className="ring-2 ring-background border border-white dark:border-gray-900"
          >
            <AvatarImageBase src="https://github.com/grupomalwee.png" alt="Avatar" />
            <AvatarFallbackBase>{initials}</AvatarFallbackBase>
          </AvatarBase>
        ))}
      </div>
    </div>
  ),
};

export const Shadow: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
      <AvatarBase className="shadow-lg">
        <AvatarImageBase src="https://github.com/grupomalwee.png" alt="Avatar" />
        <AvatarFallbackBase>SH</AvatarFallbackBase>
      </AvatarBase>
    </div>
  ),
};

export const Circular: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
      <AvatarBase className="rounded-full">
        <AvatarImageBase src="https://github.com/grupomalwee.png" alt="Avatar" />
        <AvatarFallbackBase>RF</AvatarFallbackBase>
      </AvatarBase>
    </div>
  ),
};

export const Square: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
      <AvatarBase className="rounded-md">
        <AvatarImageBase src="https://github.com/grupomalwee.png" alt="Avatar" />
        <AvatarFallbackBase>RM</AvatarFallbackBase>
      </AvatarBase>
    </div>
  ),
};

export const HoverEffect: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
      <AvatarBase className="transition-transform duration-300 hover:scale-110 hover:shadow-xl cursor-pointer">
        <AvatarImageBase src="https://github.com/grupomalwee.png" alt="Avatar" />
        <AvatarFallbackBase>HE</AvatarFallbackBase>
      </AvatarBase>
    </div>
  ),
};
