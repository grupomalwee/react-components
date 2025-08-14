import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonBase } from '../components/ui/ButtonBase';
import { Toaster, toast } from '../components/ui/SonnerBase';

const meta: Meta<typeof Toaster> = {
  title: 'Components/Toaster',
  component: Toaster,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Toaster>;


export const Sucesso: Story = {
  name: 'Notificação de Sucesso',
  render: () => (
    <div className="p-6">
      <ButtonBase onClick={() => toast.success("Operação concluída com sucesso!")}>Sucesso</ButtonBase>
      <Toaster />
    </div>
  ),
};

export const Erro: Story = {
  name: 'Notificação de Erro',
  render: () => (
    <div className="p-6">
      <ButtonBase onClick={() => toast.error("Opa! Algo deu errado.")}>Erro</ButtonBase>
      <Toaster />
    </div>
  ),
};

export const Aviso: Story = {
  name: 'Notificação de Aviso',
  render: () => (
    <div className="p-6">
      <ButtonBase onClick={() => toast.warning("Atenção! Confira os dados.")}>Aviso</ButtonBase>
      <Toaster />
    </div>
  ),
};

export const Info: Story = {
  name: 'Notificação de Informação',
  render: () => (
    <div className="p-6">
      <ButtonBase onClick={() => toast.info("Informação: nada demais, só avisando.")}>Info</ButtonBase>
      <Toaster />
    </div>
  ),
};

export const Loading: Story = {
  name: 'Notificação de Loading',
  render: () => (
    <div className="p-6">
      <ButtonBase onClick={() => toast.loading("Loading: baixando  C: /System/system32.")}>Loading</ButtonBase>
      <Toaster />
    </div>
  ),
};
