import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonBase } from '../components/ui/ButtonBase';
import { Toaster, toast } from '../components/ui/SonnerBase';

const meta: Meta<typeof Toaster> = {
  title: 'feedback/Sonner',
  component: Toaster,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Sonner para notificações, feedback de sucesso, erro, aviso, info e loading. Para o uso, importe o  "Toaster" no App.tsx/jsx.'
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
type Story = StoryObj<typeof Toaster>;


export const Sucesso: Story = {
  name: 'Notificação de Sucesso',
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
      <div className="p-6">
        <ButtonBase onClick={() => toast.success("Operação concluída com sucesso!")}>Sucesso</ButtonBase>
        <Toaster />
      </div>
    </div>
  ),
};

export const Erro: Story = {
  name: 'Notificação de Erro',
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
      <div className="p-6">
        <ButtonBase onClick={() => toast.error("Opa! Algo deu errado.")}>Erro</ButtonBase>
        <Toaster />
      </div>
    </div>
  ),
};

export const Aviso: Story = {
  name: 'Notificação de Aviso',
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
      <div className="p-6">
        <ButtonBase onClick={() => toast.warning("Atenção! Confira os dados.")}>Aviso</ButtonBase>
        <Toaster />
      </div>
    </div>
  ),
};

export const Info: Story = {
  name: 'Notificação de Informação',
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
      <div className="p-6">
        <ButtonBase onClick={() => toast.info("Informação: nada demais, só avisando.")}>Info</ButtonBase>
        <Toaster />
      </div>
    </div>
  ),
};

export const Loading: Story = {
  name: 'Notificação de Loading',
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
      <div className="p-6">
        <ButtonBase onClick={() => toast.loading("Loading: baixando  C: /System/system32.")}>Loading</ButtonBase>
        <Toaster />
      </div>
    </div>
  ),
};
