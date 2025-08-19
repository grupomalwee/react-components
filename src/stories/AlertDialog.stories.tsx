import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  AlertDialogBase,
  AlertDialogActionBase,
  AlertDialogCancelBase,
  AlertDialogContentBase,
  AlertDialogDescriptionBase,
  AlertDialogFooterBase,
  AlertDialogHeaderBase,
  AlertDialogTitleBase,
  AlertDialogTriggerBase,
} from '../components/ui/AlertDialogBase';

const meta: Meta<typeof AlertDialogBase> = {
  title: 'feedback/AlertDialog',
  component: AlertDialogBase,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AlertDialogBase>;

export const ExcluirConta: Story = {
  render: () => (
    <AlertDialogBase>
      <AlertDialogTriggerBase>Excluir Conta</AlertDialogTriggerBase>
      <AlertDialogContentBase>
        <AlertDialogHeaderBase>
          <div className="flex items-center gap-2 text-destructive">
            {/* XCircle substitute */}
            <svg width="20" height="20" fill="none"><circle cx="10" cy="10" r="9" stroke="#ef4444" strokeWidth="2"/><line x1="7" y1="7" x2="13" y2="13" stroke="#ef4444" strokeWidth="2"/><line x1="13" y1="7" x2="7" y2="13" stroke="#ef4444" strokeWidth="2"/></svg>
            <AlertDialogTitleBase>Tem certeza absoluta?</AlertDialogTitleBase>
          </div>
          <AlertDialogDescriptionBase>
            Essa ação não pode ser desfeita. Isso vai excluir permanentemente sua conta e remover seus dados dos nossos servidores.
          </AlertDialogDescriptionBase>
        </AlertDialogHeaderBase>
        <AlertDialogFooterBase>
          <AlertDialogCancelBase>Cancelar</AlertDialogCancelBase>
          <AlertDialogActionBase className="bg-destructive hover:bg-destructive/90">
            Excluir
          </AlertDialogActionBase>
        </AlertDialogFooterBase>
      </AlertDialogContentBase>
    </AlertDialogBase>
  ),
};

export const Aviso: Story = {
  render: () => (
    <AlertDialogBase>
      <AlertDialogTriggerBase>Aviso</AlertDialogTriggerBase>
      <AlertDialogContentBase>
        <AlertDialogHeaderBase>
          <div className="flex items-center gap-2 text-yellow-500">
            {/* Warning substitute */}
            <svg width="20" height="20" fill="none"><polygon points="10,2 18,18 2,18" stroke="#f59e0b" strokeWidth="2" fill="none"/><circle cx="10" cy="14" r="1" fill="#f59e0b"/><rect x="9" y="7" width="2" height="5" fill="#f59e0b"/></svg>
            <AlertDialogTitleBase>Olha, preste atenção!</AlertDialogTitleBase>
          </div>
          <AlertDialogDescriptionBase>
            Você está prestes a fazer uma alteração que pode impactar outros usuários.
          </AlertDialogDescriptionBase>
        </AlertDialogHeaderBase>
        <AlertDialogFooterBase>
          <AlertDialogCancelBase>Cancelar</AlertDialogCancelBase>
          <AlertDialogActionBase className="bg-yellow-500 hover:bg-yellow-600 text-black">
            Prosseguir
          </AlertDialogActionBase>
        </AlertDialogFooterBase>
      </AlertDialogContentBase>
    </AlertDialogBase>
  ),
};

export const Sucesso: Story = {
  render: () => (
    <AlertDialogBase>
      <AlertDialogTriggerBase>Ação Concluída</AlertDialogTriggerBase>
      <AlertDialogContentBase>
        <AlertDialogHeaderBase>
          <div className="flex items-center gap-2 text-emerald-600">
            {/* CheckCircle substitute */}
            <svg width="20" height="20" fill="none"><circle cx="10" cy="10" r="9" stroke="#10b981" strokeWidth="2"/><polyline points="6,11 9,14 14,7" fill="none" stroke="#10b981" strokeWidth="2"/></svg>
            <AlertDialogTitleBase>Operação bem-sucedida!</AlertDialogTitleBase>
          </div>
          <AlertDialogDescriptionBase>
            Sua ação foi concluída com sucesso. Pode fechar essa janela.
          </AlertDialogDescriptionBase>
        </AlertDialogHeaderBase>
        <AlertDialogFooterBase>
          <AlertDialogActionBase className="bg-emerald-600 hover:bg-emerald-700">
            Fechar
          </AlertDialogActionBase>
        </AlertDialogFooterBase>
      </AlertDialogContentBase>
    </AlertDialogBase>
  ),
};

export const Informacao: Story = {
  render: () => (
    <AlertDialogBase>
      <AlertDialogTriggerBase>Informação</AlertDialogTriggerBase>
      <AlertDialogContentBase>
        <AlertDialogHeaderBase>
          <div className="flex items-center gap-2 text-blue-600">
            {/* Info substitute */}
            <svg width="20" height="20" fill="none"><circle cx="10" cy="10" r="9" stroke="#3b82f6" strokeWidth="2"/><rect x="9" y="7" width="2" height="2" fill="#3b82f6"/><rect x="9" y="10" width="2" height="5" fill="#3b82f6"/></svg>
            <AlertDialogTitleBase>Importante saber!</AlertDialogTitleBase>
          </div>
          <AlertDialogDescriptionBase>
            O sistema passará por manutenção amanhã das 00h às 04h. Alguns serviços poderão ficar indisponíveis.
          </AlertDialogDescriptionBase>
        </AlertDialogHeaderBase>
        <AlertDialogFooterBase>
          <AlertDialogActionBase className="bg-blue-600 hover:bg-blue-700">
            Entendi
          </AlertDialogActionBase>
        </AlertDialogFooterBase>
      </AlertDialogContentBase>
    </AlertDialogBase>
  ),
};
