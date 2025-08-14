import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonBase, ButtonGroupBase } from '../components/ui/ButtonBase';
import React from 'react';

const meta: Meta<typeof ButtonBase> = {
  title: 'Components/ButtonBase',
  component: ButtonBase,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: {
    children: 'ButtonBase',
    variant: 'default',
    size: 'default',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof ButtonBase>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12 }}>
      <ButtonBase {...args} variant="default">Default</ButtonBase>
      <ButtonBase {...args} variant="destructive">Destructive</ButtonBase>
      <ButtonBase {...args} variant="outline">Outline</ButtonBase>
      <ButtonBase {...args} variant="secondary">Secondary</ButtonBase>
      <ButtonBase {...args} variant="ghost">Ghost</ButtonBase>
      <ButtonBase {...args} variant="link">Link</ButtonBase>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12 }}>
      <ButtonBase {...args} size="sm">Small</ButtonBase>
      <ButtonBase {...args} size="default">Default</ButtonBase>
      <ButtonBase {...args} size="lg">Large</ButtonBase>
      <ButtonBase {...args} size="icon" aria-label="icon only"><span className="material-icons">star</span></ButtonBase>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};

export const Group: Story = {
  render: (args) => (
    <ButtonGroupBase>
      <ButtonBase {...args}>Aceitar</ButtonBase>
      <ButtonBase {...args} variant="outline">Talvez</ButtonBase>
      <ButtonBase {...args} variant="destructive">Recusar</ButtonBase>
    </ButtonGroupBase>
  ),
};
