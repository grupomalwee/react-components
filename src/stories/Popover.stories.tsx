import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PopoverBase, PopoverTriggerBase, PopoverContentBase } from '../components/ui/PopoverBase';
import { ButtonBase } from '../components/ui/ButtonBase';
import { InputBase } from '../components/ui/InputBase';
import LabelBase from '../components/ui/LabelBase';

const meta: Meta<typeof PopoverBase> = {
  title: 'overlays/Popover',
  component: PopoverBase,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Popover para exibir conteúdo flutuante, formulários e listas.'
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
type Story = StoryObj<typeof PopoverBase>;

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
      <div className="flex flex-col gap-10 max-w-xl mt-5 ml-5">
      {/* Exemplo 1: Popover com campos de dimensão */}
      <div className="flex gap-5 h-11 p-3 rounded-sm">
        <PopoverBase>
          <PopoverTriggerBase asChild>
            <ButtonBase variant="outline" className="p-4">Open popover</ButtonBase>
          </PopoverTriggerBase>
          <PopoverContentBase className="w-96 ml-64">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Dimensions</h4>
                <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
              </div>
              <div className="grid gap-2">
                {[
                  { label: "Width", id: "width", defaultValue: "100%" },
                  { label: "Max. width", id: "maxWidth", defaultValue: "300px" },
                  { label: "Height", id: "height", defaultValue: "25px" },
                  { label: "Max. height", id: "maxHeight", defaultValue: "none" },
                ].map(({ label, id, defaultValue }) => (
                  <div key={id} className="grid grid-cols-3 items-center gap-4">
                    <LabelBase htmlFor={id}>{label}</LabelBase>
                    <InputBase id={id} defaultValue={defaultValue} className="col-span-2 h-8" />
                  </div>
                ))}
              </div>
            </div>
          </PopoverContentBase>
        </PopoverBase>
      </div>

      {/* Exemplo 2: Popover com formulário de login */}
      <div className="flex gap-5 h-11 p-3 rounded-sm">
        <PopoverBase>
          <PopoverTriggerBase asChild>
            <ButtonBase variant="outline" className="p-4">Login rápido</ButtonBase>
          </PopoverTriggerBase>
          <PopoverContentBase className="w-72 ml-40 py-6 px-5 ">
            <form>
              <div>
                <InputBase label="Email" type="email" id="email" placeholder="seu@email.com" required />
              </div>
              <div className="mt-3">
                <InputBase type="password" id="password" placeholder="••••••••" required label="Senha" />
              </div>
              <ButtonBase type="submit" className="w-full mt-6">Entrar</ButtonBase>
            </form>
          </PopoverContentBase>
        </PopoverBase>
      </div>

      {/* Exemplo 3: Popover com lista grande */}
      <div className="flex gap-5 h-11 p-3 rounded-sm">
        <PopoverBase>
          <PopoverTriggerBase asChild>
            <ButtonBase variant="outline" className="p-4">Lista grande</ButtonBase>
          </PopoverTriggerBase>
          <PopoverContentBase className="w-60 max-h-40 overflow-auto ml-36 p-3 space-y-1">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="px-3 py-2 rounded cursor-pointer"
                role="button"
                tabIndex={0}
              >
                Item #{i + 1}
              </div>
            ))}
          </PopoverContentBase>
        </PopoverBase>
      </div>
      </div>
    </div>
  ),
};
