import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonBase, ButtonGroupBase } from '../components/ui/ButtonBase';

const meta: Meta<typeof ButtonBase> = {
  title: 'forms/Button',
  component: ButtonBase,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Botão base para ações primárias, secundárias e de destaque. Personalizável por variante, tamanho e estado.'
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
    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
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
    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
      <ButtonGroupBase>
        <ButtonBase {...args}>Aceitar</ButtonBase>
        <ButtonBase {...args} variant="outline">Talvez</ButtonBase>
        <ButtonBase {...args} variant="destructive">Recusar</ButtonBase>
      </ButtonGroupBase>
    </div>
  ),
};
