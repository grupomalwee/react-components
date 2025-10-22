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
} from "../components/ui/ModalBase";
import { ButtonBase } from "../components/ui/ButtonBase";
import { InputBase } from "../components/ui/InputBase";
import { MapPinLineIcon, PlusIcon } from "@phosphor-icons/react";
import {
  ChangeButton,
  DeleteButton,
  EditButton,
} from "../components/ui/SmallButtons";
import {
  SelectBase,
  SelectTriggerBase,
  SelectValueBase,
  SelectContentBase,
  SelectGroupBase,
  SelectLabelBase,
  SelectItemBase,
} from "../components/ui/SelectBase";
import { TextAreaBase } from "../components/ui/TextAreaBase";
import LabelBase from "../components/ui/LabelBase";

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
            <ChangeButton className="rounded-full" variant="secondary" />
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
            <DeleteButton className="rounded-full" variant="destructive" />
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
        <div>
          <DeleteButton
            className="rounded-full"
            variant="destructive"
            title="Teste"
            destructiveDescription="rtuytututyu"
          />
        </div>
      </div>
    );
  },
};

// Snippet consumer-facing para Modal
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
