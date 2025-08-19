
import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ContextMenuBase,
  ContextMenuTriggerBase,
  ContextMenuContentBase,
  ContextMenuItemBase,
  ContextMenuCheckboxItemBase,
  ContextMenuRadioGroupBase,
  ContextMenuRadioItemBase,
  ContextMenuLabelBase,
  ContextMenuSeparatorBase,
  ContextMenuShortcutBase,
  ContextMenuSubBase,
  ContextMenuSubContentBase,
  ContextMenuSubTriggerBase,
} from '../components/ui/ContextMenuBase';

const meta: Meta<typeof ContextMenuBase> = {
  title: 'navigation/ContextMenu',
  component: ContextMenuBase,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'ContextMenu para ações contextuais, com suporte a grupos, atalhos, submenus e seleção.'
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
type Story = StoryObj<typeof ContextMenuBase>;

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
      <div className="p-8">
        <ContextMenuBase>
          <ContextMenuTriggerBase className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
            Clique com o botão direito aqui
          </ContextMenuTriggerBase>
          <ContextMenuContentBase className="w-52">
            <ContextMenuItemBase inset>
              Voltar
              <ContextMenuShortcutBase>⌘[</ContextMenuShortcutBase>
            </ContextMenuItemBase>
            <ContextMenuItemBase inset disabled>
              Avançar
              <ContextMenuShortcutBase>⌘]</ContextMenuShortcutBase>
            </ContextMenuItemBase>
            <ContextMenuItemBase inset>
              Recarregar
              <ContextMenuShortcutBase>⌘R</ContextMenuShortcutBase>
            </ContextMenuItemBase>
            <ContextMenuSubBase>
              <ContextMenuSubTriggerBase inset>
                Mais ferramentas
              </ContextMenuSubTriggerBase>
              <ContextMenuSubContentBase className="w-44">
                <ContextMenuItemBase>Salvar página...</ContextMenuItemBase>
                <ContextMenuItemBase>Criar atalho...</ContextMenuItemBase>
                <ContextMenuItemBase>Nomear janela...</ContextMenuItemBase>
                <ContextMenuSeparatorBase />
                <ContextMenuItemBase>Ferramentas de desenvolvedor</ContextMenuItemBase>
                <ContextMenuSeparatorBase />
                <ContextMenuItemBase variant="destructive">
                  Deletar
                </ContextMenuItemBase>
              </ContextMenuSubContentBase>
            </ContextMenuSubBase>
            <ContextMenuSeparatorBase />
            <ContextMenuCheckboxItemBase checked>
              Mostrar favoritos
            </ContextMenuCheckboxItemBase>
            <ContextMenuCheckboxItemBase>
              Mostrar URLs completas
            </ContextMenuCheckboxItemBase>
            <ContextMenuSeparatorBase />
            <ContextMenuRadioGroupBase value="pedro">
              <ContextMenuLabelBase inset>Pessoas</ContextMenuLabelBase>
              <ContextMenuRadioItemBase value="pedro">
                Pedro Duarte
              </ContextMenuRadioItemBase>
              <ContextMenuRadioItemBase value="colm">
                Colm Tuite
              </ContextMenuRadioItemBase>
            </ContextMenuRadioGroupBase>
          </ContextMenuContentBase>
        </ContextMenuBase>
      </div>
    </div>
  ),
};
