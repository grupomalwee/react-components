import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import { AvatarBase, AvatarImageBase, AvatarFallbackBase } from '../components/ui/AvatarBase';

const meta: Meta<typeof AvatarBase> = {
  title: 'data/Avatar',
  component: AvatarBase,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AvatarBase>;

export const Default: Story = {
  render: () => (
    <AvatarBase>
      <AvatarImageBase src="https://github.com/grupomalwee.png" alt="Avatar" />
      <AvatarFallbackBase>CN</AvatarFallbackBase>
    </AvatarBase>
  ),
};

export const WithBorder: Story = {
  render: () => (
    <AvatarBase className="ring-2 ring-primary">
      <AvatarImageBase src="https://github.com/grupomalwee.png" alt="Avatar" />
      <AvatarFallbackBase>CN</AvatarFallbackBase>
    </AvatarBase>
  ),
};

export const Grayscale: Story = {
  render: () => (
    <AvatarBase className="grayscale">
      <AvatarImageBase src="https://github.com/grupomalwee.png" alt="Avatar" />
      <AvatarFallbackBase>CN</AvatarFallbackBase>
    </AvatarBase>
  ),
};

export const Grouped: Story = {
  render: () => (
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
  ),
};

export const Shadow: Story = {
  render: () => (
    <AvatarBase className="shadow-lg">
      <AvatarImageBase src="https://github.com/grupomalwee.png" alt="Avatar" />
      <AvatarFallbackBase>SH</AvatarFallbackBase>
    </AvatarBase>
  ),
};

export const Circular: Story = {
  render: () => (
    <AvatarBase className="rounded-full">
      <AvatarImageBase src="https://github.com/grupomalwee.png" alt="Avatar" />
      <AvatarFallbackBase>RF</AvatarFallbackBase>
    </AvatarBase>
  ),
};

export const Square: Story = {
  render: () => (
    <AvatarBase className="rounded-md">
      <AvatarImageBase src="https://github.com/grupomalwee.png" alt="Avatar" />
      <AvatarFallbackBase>RM</AvatarFallbackBase>
    </AvatarBase>
  ),
};

export const HoverEffect: Story = {
  render: () => (
    <AvatarBase className="transition-transform duration-300 hover:scale-110 hover:shadow-xl cursor-pointer">
      <AvatarImageBase src="https://github.com/grupomalwee.png" alt="Avatar" />
      <AvatarFallbackBase>HE</AvatarFallbackBase>
    </AvatarBase>
  ),
};
