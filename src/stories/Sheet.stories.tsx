import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SheetBase } from '../components/ui/SheetBase';
import { ButtonBase } from '../components/ui/ButtonBase';
import { InputBase } from '../components/ui/InputBase';
import LabelBase from '../components/ui/LabelBase';
import {
  SheetCloseBase,
  SheetContentBase,
  SheetDescriptionBase,
  SheetFooterBase,
  SheetHeaderBase,
  SheetTitleBase,
  SheetTriggerBase,
} from '../components/ui/SheetBase';

const meta: Meta<typeof SheetBase> = {
  title: 'overlays/Sheet',
  component: SheetBase,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Sheet para painéis laterais, formulários e detalhes de conta.'
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
type Story = StoryObj<typeof SheetBase>;


export const Basico: Story = {
  name: 'Sheet Básico',
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
      <SheetBase>
        <SheetTriggerBase asChild>
          <ButtonBase variant="outline">Abrir Sheet Básico</ButtonBase>
        </SheetTriggerBase>
        <SheetContentBase side="right">
          <SheetHeaderBase>
            <SheetTitleBase>Editar Perfil</SheetTitleBase>
            <SheetDescriptionBase>
              Altere as informações do seu perfil aqui. Clique em salvar quando terminar.
            </SheetDescriptionBase>
          </SheetHeaderBase>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <LabelBase htmlFor="nome" className="text-right">
                Nome
              </LabelBase>
              <InputBase id="nome" defaultValue="João da Silva" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <LabelBase htmlFor="email" className="text-right">
                Email
              </LabelBase>
              <InputBase id="email" defaultValue="joao@email.com" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <LabelBase htmlFor="cargo" className="text-right">
                Cargo
              </LabelBase>
              <InputBase id="cargo" defaultValue="Analista" className="col-span-3" />
            </div>
          </div>
          <SheetFooterBase>
            <SheetCloseBase asChild>
              <ButtonBase type="submit">Salvar alterações</ButtonBase>
            </SheetCloseBase>
          </SheetFooterBase>
        </SheetContentBase>
      </SheetBase>
    </div>
  ),
};

export const Detalhado: Story = {
  name: 'Sheet Detalhado',
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
      <SheetBase>
        <SheetTriggerBase asChild>
          <ButtonBase variant="outline">Abrir Detalhes</ButtonBase>
        </SheetTriggerBase>
        <SheetContentBase side="left">
          <SheetHeaderBase>
            <SheetTitleBase>Resumo da Conta</SheetTitleBase>
            <SheetDescriptionBase>
              Informações rápidas sobre sua conta.
            </SheetDescriptionBase>
          </SheetHeaderBase>
          <div className="flex flex-col gap-3 py-4">
            <div>
              <p className="text-sm text-muted-foreground">Email:</p>
              <p className="font-medium">peduarte@email.com</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Plano:</p>
              <p className="font-medium">Premium</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status:</p>
              <p className="font-medium text-green-600">Ativo</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Último Login:</p>
              <p className="font-medium">15/06/2025 - 14:32</p>
            </div>
          </div>
          <SheetFooterBase>
            <SheetCloseBase asChild>
              <ButtonBase variant="destructive">Encerrar Sessão</ButtonBase>
            </SheetCloseBase>
          </SheetFooterBase>
        </SheetContentBase>
      </SheetBase>
    </div>
  ),
};
