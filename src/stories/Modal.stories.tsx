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

const meta: Meta<unknown> = {
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
type ModalArgs = {
  insertLabel?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  namePlaceholder?: string;
  locationPlaceholder?: string;
  otherPlaceholder?: string;
  cancelLabel?: React.ReactNode;
  confirmLabel?: React.ReactNode;
};
type Story = StoryObj<Record<string, unknown>>;

export const Default: Story = {
  render: (args?: Story["args"]) => {
    const [selectOpen, setSelectOpen] = React.useState(false);
    const a = (args ?? meta.args) as ModalArgs;

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
              {a.insertLabel}
            </ButtonBase>
          </ModalTriggerBase>
          <ModalContentBase>
            <ModalHeaderBase>
              <ModalTitleBase>{a.title}</ModalTitleBase>
              <ModalDescriptionBase>{a.description}</ModalDescriptionBase>
            </ModalHeaderBase>

            <div className="py-4 space-y-3">
              <InputBase
                type="text"
                placeholder={a.namePlaceholder}
                label="Nome"
              />

              <InputBase
                type="text"
                placeholder={a.locationPlaceholder}
                label="Local"
                leftIcon={<MapPinLineIcon size={16} />}
              />
              <SelectBase
                open={selectOpen}
                onOpenChange={setSelectOpen}
                data-testid="select-base"
              >
                <SelectTriggerBase
                  open={selectOpen}
                  data-testid="select-trigger"
                >
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
              <TextAreaBase placeholder={a.otherPlaceholder} />
            </div>

            <ModalFooterBase>
              <ButtonBase variant="outline">{a.cancelLabel}</ButtonBase>
              <ButtonBase>{a.confirmLabel}</ButtonBase>
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

meta.args = {
  insertLabel: "Insert",
  title: "Editar item",
  description: "Use este modal para editar informações do item.",
  namePlaceholder: "Nome",
  locationPlaceholder: "Localização",
  otherPlaceholder: "Outro campo",
  cancelLabel: "Cancelar",
  confirmLabel: "Confirmar",
};

meta.decorators = [
  (Story) => (
    <div style={{ padding: 24, display: "flex", justifyContent: "center" }}>
      <Story />
    </div>
  ),
];

meta.argTypes = {
  insertLabel: { control: "text" },
  title: { control: "text" },
  description: { control: "text" },
  namePlaceholder: { control: "text" },
  locationPlaceholder: { control: "text" },
};
