import "../style/global.css";
import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DestructiveDialogTrigger } from "../components/ui/DestructiveDialog";
import { ButtonBase } from "../components/ui/ButtonBase";
import { Trash } from "@phosphor-icons/react";

const meta: Meta<typeof DestructiveDialogTrigger> = {
  title: "feedback/DestructiveDialog",
  component: DestructiveDialogTrigger,
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
type Story = StoryObj<typeof DestructiveDialogTrigger>;

export const Default: Story = {
  args: {},
};

export const NoChildren: Story = {
  render: (args) => {
    const handleConfirm = () => console.log("Confirmado: ação destrutiva executada");

    return (
      <div className="p-6">
        <DestructiveDialogTrigger {...args} onConfirm={handleConfirm} onCancel={() => console.log("Cancelado")} />
      </div>
    );
  },
};

export const WithTriggerContent: Story = {
  render: (args) => {
    const handleConfirm = () => console.log("Confirmado: ação destrutiva executada");

    return (
      <div className="p-6">
        <DestructiveDialogTrigger
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
    const handleConfirm = () => console.log("Confirmado: ação destrutiva executada");

    return (
      <div className="p-6">
        <DestructiveDialogTrigger {...args} onConfirm={handleConfirm} onCancel={() => console.log("Cancelado")}> 
          <ButtonBase>yrrrrrrrrrrr</ButtonBase>
        </DestructiveDialogTrigger>
      </div>
    );
  },
};

export const WithChildIcon: Story = {
  render: (args) => {
    const handleConfirm = () => console.log("Confirmado: ação destrutiva executada");

    return (
      <div className="p-6">
        <DestructiveDialogTrigger {...args} onConfirm={handleConfirm} onCancel={() => console.log("Cancelado")}> 
          <ButtonBase>
            <Trash />
            Abrir
          </ButtonBase>
        </DestructiveDialogTrigger>
      </div>
    );
  },
};
