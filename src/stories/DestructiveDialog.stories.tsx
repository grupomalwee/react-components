import "../style/global.css";
import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DestructiveDialog } from "../components/ui/DestructiveDialog";
import { ButtonBase } from "../components/ui/ButtonBase";
import { DeleteButton } from "../components/ui/SmallButtons";
import { TrashIcon } from "@phosphor-icons/react";

const meta: Meta<typeof DestructiveDialog> = {
  title: "feedback/DestructiveDialog",
  component: DestructiveDialog,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Dialog de ação destrutiva — usa tokens de tema para ficar evidente.",
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
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    triggerContent: { control: "text" },
  },
  args: {
    title: "Excluir recurso",
    description:
      "Essa ação é irreversível. Tem certeza que deseja prosseguir e excluir permanentemente este recurso?",
    triggerContent: undefined,
  },
};

export default meta;
type Story = StoryObj<typeof DestructiveDialog>;

export const Default: Story = {
  args: {},
};

export const NoChildren: Story = {
  render: (args) => {
    const handleConfirm = () =>
      console.log("Confirmado: ação destrutiva executada");

    return (
      <div className="p-6">
        <DestructiveDialog
          {...args}
          onConfirm={handleConfirm}
          onCancel={() => console.log("Cancelado")}
        />
      </div>
    );
  },
};

export const WithTriggerContent: Story = {
  render: (args) => {
    const handleConfirm = () =>
      console.log("Confirmado: ação destrutiva executada");

    return (
      <div className="p-6">
        <DestructiveDialog
          {...args}
          onConfirm={handleConfirm}
          onCancel={() => console.log("Cancelado")}
          triggerContent={"Exemplo"}
        />
      </div>
    );
  },
};

export const WithChildText: Story = {
  render: (args) => {
    const handleConfirm = () =>
      console.log("Confirmado: ação destrutiva executada");

    return (
      <div className="p-6">
        <DestructiveDialog
          {...args}
          onConfirm={handleConfirm}
          onCancel={() => console.log("Cancelado")}
        >
          <ButtonBase>yrrrrrrrrrrr</ButtonBase>
        </DestructiveDialog>
      </div>
    );
  },
};

export const WithChildIcon: Story = {
  render: (args) => {
    const handleConfirm = () =>
      console.log("Confirmado: ação destrutiva executada");

    return (
      <div className="p-6">
        {/* estrutura */}
        <DestructiveDialog
          {...args}
          onConfirm={handleConfirm}
          onCancel={() => console.log("Cancelado")}
        >
          <ButtonBase>
            <TrashIcon />
            Abrir
          </ButtonBase>
        </DestructiveDialog>
      </div>
    );
  },
};

export const DeleteButtonTrigger: Story = {
  render: () => {
    const handleConfirm = () => console.log("Confirmado via DeleteButton");

    return (
      <div className="p-6">
        <div className="flex items-center gap-4">
          <DestructiveDialog
            title="Excluir item"
            description="Confirma exclusão do item?"
            onConfirm={handleConfirm}
            onCancel={() => console.log("Cancelado")}
          >
            <ButtonBase>Exemplo</ButtonBase>
          </DestructiveDialog>
          <DeleteButton
            destructiveTitle={"Excluir item"}
            destructiveDescription={"Tem certeza que deseja excluir este item?"}
            destructiveOnConfirm={handleConfirm}
            size="icon"
          />
        </div>
      </div>
    );
  },
};
