import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckboxBase } from '../components/ui/CheckBoxBase';
import LabelBase from '../components/ui/LabelBase';

const meta: Meta<typeof CheckboxBase> = {
  title: 'forms/CheckBox',
  component: CheckboxBase,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Checkbox para seleção única ou múltipla, com grupo, desabilitado e label.'
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
type Story = StoryObj<typeof CheckboxBase>;

export const Simples: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
      <div className="flex items-center space-x-2">
        <CheckboxBase id="terms" />
        <LabelBase htmlFor="terms">Aceito os termos e condições</LabelBase>
      </div>
    </div>
  ),
};

export const Grupo: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
      <div className="flex flex-col gap-3">
        <h4 className="text-base font-medium">Notificações</h4>
        <div className="flex items-center space-x-2">
          <CheckboxBase id="email" defaultChecked />
          <LabelBase htmlFor="email">Email</LabelBase>
        </div>
        <div className="flex items-center space-x-2">
          <CheckboxBase id="sms" />
          <LabelBase htmlFor="sms">SMS</LabelBase>
        </div>
        <div className="flex items-center space-x-2">
          <CheckboxBase id="push" />
          <LabelBase htmlFor="push">Push Notification</LabelBase>
        </div>
      </div>
    </div>
  ),
};

export const Desabilitado: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
      <div className="flex items-center space-x-2 opacity-50">
        <CheckboxBase id="disabled" disabled />
        <LabelBase htmlFor="disabled">Desabilitado</LabelBase>
      </div>
    </div>
  ),
};
