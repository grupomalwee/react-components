import "../style/global.css";
import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ModalBase,
  ModalTriggerBase,
  ModalContentBase,
  ModalHeaderBase,
  ModalFooterBase,
  ModalTitleBase,
  ModalDescriptionBase,
} from "../components/ui/feedback/ModalBase";
import { ButtonBase } from "../components/ui/form/ButtonBase";
import { InputBase } from "../components/ui/form/InputBase";
import { MapPinLineIcon, PlusIcon } from "@phosphor-icons/react";
import {
  ChangeButton,
  DeleteButton,
  EditButton,
} from "../components/ui/form/SmallButtons";
import {
  SelectBase,
  SelectTriggerBase,
  SelectValueBase,
  SelectContentBase,
  SelectGroupBase,
  SelectLabelBase,
  SelectItemBase,
} from "../components/ui/SelectBase";
import { TextAreaBase } from "../components/ui/form/TextAreaBase";
import LabelBase from "../components/ui/form/LabelBase";

const meta: Meta<typeof ModalBase> = {
  title: "feedback/Modal",
  component: ModalBase,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Modal para edição/visualização de formulários e conteúdo — alinhado ao padrão de UI do projeto.",
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f6f6f6" },
        { name: "dark", value: "#222" },
      ],
    },
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ModalBase>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "32px 0",
          gap: "16px",
        }}
      >
        <ModalBase>
          <ModalTriggerBase asChild>
            <ButtonBase>
              <PlusIcon size={16} />
              Insert
            </ButtonBase>
          </ModalTriggerBase>
          <ModalContentBase>
            <ModalHeaderBase>
              <ModalTitleBase>Editar item</ModalTitleBase>
              <ModalDescriptionBase>
                Use este modal para editar informações do item. Abaixo há campos
                de exemplo (nome, localização e outro campo) — adapte conforme
                necessário.
              </ModalDescriptionBase>
            </ModalHeaderBase>

            <div className="py-4 space-y-3">
              <InputBase type="text" placeholder="Nome" label="Nome" />

              <InputBase
                type="text"
                placeholder="Localização"
                label="Local"
                leftIcon={<MapPinLineIcon size={16} />}
              />
              <SelectBase
                open={open}
                onOpenChange={setOpen}
                data-testid="select-base"
              >
                <SelectTriggerBase open={open} data-testid="select-trigger">
                  <SelectValueBase
                    placeholder="Select a fruit"
                    data-testid="select-value"
                  />
                </SelectTriggerBase>
                <SelectContentBase>
                  <SelectGroupBase data-testid="select-group">
                    <SelectLabelBase data-testid="select-label">
                      Fruits
                    </SelectLabelBase>
                    <SelectItemBase value="apple" data-testid="select-item">
                      Apple
                    </SelectItemBase>
                    <SelectItemBase value="banana" data-testid="select-item">
                      Banana
                    </SelectItemBase>
                    <SelectItemBase value="blueberry" data-testid="select-item">
                      Blueberry
                    </SelectItemBase>
                    <SelectItemBase value="grapes" data-testid="select-item">
                      Grapes
                    </SelectItemBase>
                    <SelectItemBase value="pineapple" data-testid="select-item">
                      Pineapple
                    </SelectItemBase>
                  </SelectGroupBase>
                </SelectContentBase>
              </SelectBase>
              <LabelBase>Outro campo</LabelBase>
              <TextAreaBase placeholder="Outro campo" />
            </div>

            <ModalFooterBase>
              <ButtonBase variant="outline">Cancelar</ButtonBase>
              <ButtonBase>Confirmar</ButtonBase>
            </ModalFooterBase>
          </ModalContentBase>
        </ModalBase>
        <ModalBase>
          <ModalTriggerBase asChild>
            <EditButton className="rounded-full" />
          </ModalTriggerBase>
          <ModalContentBase>
            <ModalHeaderBase>
              <ModalTitleBase>Editar item</ModalTitleBase>
              <ModalDescriptionBase>
                Formulário para editar os dados do item selecionado. Altere os
                campos necessários e confirme para salvar as mudanças.
              </ModalDescriptionBase>
            </ModalHeaderBase>

            <div className="py-4 space-y-3">
              <InputBase type="text" placeholder="Nome atual" label="Nome" />

              <InputBase
                type="text"
                placeholder="Localização atual"
                label="Local"
                leftIcon={<MapPinLineIcon size={16} />}
              />
              <SelectBase
                open={open}
                onOpenChange={setOpen}
                data-testid="select-base-edit"
              >
                <SelectTriggerBase open={open} data-testid="select-trigger">
                  <SelectValueBase
                    placeholder="Selecione uma categoria"
                    data-testid="select-value"
                  />
                </SelectTriggerBase>
                <SelectContentBase>
                  <SelectGroupBase data-testid="select-group">
                    <SelectLabelBase data-testid="select-label">
                      Categoria
                    </SelectLabelBase>
                    <SelectItemBase value="cat1" data-testid="select-item">
                      Categoria 1
                    </SelectItemBase>
                    <SelectItemBase value="cat2" data-testid="select-item">
                      Categoria 2
                    </SelectItemBase>
                    <SelectItemBase value="cat3" data-testid="select-item">
                      Categoria 3
                    </SelectItemBase>
                  </SelectGroupBase>
                </SelectContentBase>
              </SelectBase>
              <LabelBase>Observações</LabelBase>
              <TextAreaBase placeholder="Observações sobre o item" />
            </div>

            <ModalFooterBase>
              <ButtonBase variant="outline">Cancelar</ButtonBase>
              <ButtonBase>Salvar</ButtonBase>
            </ModalFooterBase>
          </ModalContentBase>
        </ModalBase>
        <ModalBase>
          <ModalTriggerBase asChild>
            <ChangeButton className="rounded-full" variant="secondary" />
          </ModalTriggerBase>
          <ModalContentBase>
            <ModalHeaderBase>
              <ModalTitleBase>Alterar status</ModalTitleBase>
              <ModalDescriptionBase>
                Use este modal para alterar propriedades ou status do item.
                Exemplos: mudar prioridade, categoria ou visibilidade.
              </ModalDescriptionBase>
            </ModalHeaderBase>

            <div className="py-4 space-y-3">
              <LabelBase>Nova categoria</LabelBase>
              <SelectBase
                open={open}
                onOpenChange={setOpen}
                data-testid="select-base-change"
              >
                <SelectTriggerBase open={open} data-testid="select-trigger">
                  <SelectValueBase placeholder="Selecione" />
                </SelectTriggerBase>
                <SelectContentBase>
                  <SelectGroupBase>
                    <SelectItemBase value="low">Baixa</SelectItemBase>
                    <SelectItemBase value="medium">Média</SelectItemBase>
                    <SelectItemBase value="high">Alta</SelectItemBase>
                  </SelectGroupBase>
                </SelectContentBase>
              </SelectBase>

              <LabelBase>Comentários rápidos</LabelBase>
              <TextAreaBase placeholder="Observação curta" />
            </div>

            <ModalFooterBase>
              <ButtonBase variant="outline">Cancelar</ButtonBase>
              <ButtonBase>Aplicar</ButtonBase>
            </ModalFooterBase>
          </ModalContentBase>
        </ModalBase>
        <ModalBase>
          <ModalTriggerBase asChild>
            <DeleteButton className="rounded-full" variant="destructive" />
          </ModalTriggerBase>
          <ModalContentBase>
            <ModalHeaderBase>
              <ModalTitleBase>Excluir item</ModalTitleBase>
              <ModalDescriptionBase>
                A exclusão é permanente. Confirme abaixo se deseja remover o
                item selecionado.
              </ModalDescriptionBase>
            </ModalHeaderBase>

            <div className="py-4 space-y-3">
              <p>
                Tem certeza que deseja excluir este item? Esta ação não pode ser
                desfeita.
              </p>
            </div>

            <ModalFooterBase>
              <ButtonBase variant="outline">Cancelar</ButtonBase>
              <ButtonBase variant="destructive">Excluir</ButtonBase>
            </ModalFooterBase>
          </ModalContentBase>
        </ModalBase>
      </div>
    );
  },
};

meta.parameters = {
  ...meta.parameters,
  docs: {
    ...meta.parameters?.docs,
    source: {
      code: `import React from 'react';
import {
  ModalBase,
  ModalTriggerBase,
  ModalContentBase,
  ModalHeaderBase,
  ModalTitleBase,
  ModalDescriptionBase,
  ModalFooterBase,
} from '@mlw-packages/react-components';
import { ButtonBase } from '@mlw-packages/react-components';

export default function Example() {
  return (
    <ModalBase>
      <ModalTriggerBase asChild>
        <ButtonBase>Open</ButtonBase>
      </ModalTriggerBase>
      <ModalContentBase>
        <ModalHeaderBase>
          <ModalTitleBase>Title</ModalTitleBase>
          <ModalDescriptionBase>Description text</ModalDescriptionBase>
        </ModalHeaderBase>
        <div style={{ padding: 16 }}>
          Content goes here
        </div>
        <ModalFooterBase>
          <ButtonBase variant="outline">Cancel</ButtonBase>
          <ButtonBase>Confirm</ButtonBase>
        </ModalFooterBase>
      </ModalContentBase>
    </ModalBase>
  );
}`,
    },
  },
};

Default.parameters = {
  ...Default.parameters,
  docs: {
    ...Default.parameters?.docs,
    source: {
      code: `import React from 'react';
import { ModalBase, ModalTriggerBase, ModalContentBase, ModalTitleBase, ModalDescriptionBase, ModalFooterBase } from '@mlw-packages/react-components';
import { ButtonBase } from '@mlw-packages/react-components';

export const Default = () => (
  <ModalBase>
    <ModalTriggerBase asChild>
      <ButtonBase>Open</ButtonBase>
    </ModalTriggerBase>
    <ModalContentBase>
      <ModalTitleBase>Title</ModalTitleBase>
      <ModalDescriptionBase>Content</ModalDescriptionBase>
      <ModalFooterBase>
        <ButtonBase variant="outline">Cancel</ButtonBase>
        <ButtonBase>Confirm</ButtonBase>
      </ModalFooterBase>
    </ModalContentBase>
  </ModalBase>
);`,
    },
  },
};
