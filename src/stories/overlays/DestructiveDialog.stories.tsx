import "../../style/global.css";
import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DestructiveDialog } from "@/components/ui/feedback/DestructiveDialog";
import { ButtonBase } from "@/components/ui/form/ButtonBase";
import { TrashIcon } from "@phosphor-icons/react";

const meta: Meta<typeof DestructiveDialog> = {
  title: "feedback/Destructive Dialog",
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
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { DestructiveDialog } from '@mlw-packages/react-components';

export default function Example() {
  return (
    <DestructiveDialog
      title="Excluir recurso"
      description="Essa ação é irreversível. Tem certeza que deseja prosseguir e excluir permanentemente este recurso?"
      onConfirm={() => console.log("Confirmed")}
      onCancel={() => console.log("Cancelled")}
    />
  );
}`,
      },
    },
  },
};

export const NoChildren: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { DestructiveDialog } from '@mlw-packages/react-components';

export default function Example() {
  const handleConfirm = () => console.log("Confirmado: ação destrutiva executada");

  return (
    <div className="p-6">
      <DestructiveDialog
        title="Excluir recurso"
        description="Essa ação é irreversível. Tem certeza que deseja prosseguir e excluir permanentemente este recurso?"
        onConfirm={handleConfirm}
        onCancel={() => console.log("Cancelado")}
      />
    </div>
  );
}`,
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { DestructiveDialog } from '@mlw-packages/react-components';

export default function Example() {
  const handleConfirm = () => console.log("Confirmado: ação destrutiva executada");

  return (
    <div className="p-6">
      <DestructiveDialog
        title="Excluir recurso"
        description="Essa ação é irreversível. Tem certeza que deseja prosseguir e excluir permanentemente este recurso?"
        onConfirm={handleConfirm}
        onCancel={() => console.log("Cancelado")}
        triggerContent={"Exemplo"}
      />
    </div>
  );
}`,
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { DestructiveDialog, ButtonBase } from '@mlw-packages/react-components';

export default function Example() {
  const handleConfirm = () => console.log("Confirmado: ação destrutiva executada");

  return (
    <div className="p-6">
      <DestructiveDialog
        title="Excluir recurso"
        description="Essa ação é irreversível. Tem certeza que deseja prosseguir e excluir permanentemente este recurso?"
        onConfirm={handleConfirm}
        onCancel={() => console.log("Cancelado")}
      >
        <ButtonBase>yrrrrrrrrrrr</ButtonBase>
      </DestructiveDialog>
    </div>
  );
}`,
      },
    },
  },
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
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { DestructiveDialog, ButtonBase } from '@mlw-packages/react-components';
import { TrashIcon } from '@phosphor-icons/react';

export default function Example() {
  const handleConfirm = () => console.log("Confirmado: ação destrutiva executada");

  return (
    <div className="p-6">
      <DestructiveDialog
        title="Excluir recurso"
        description="Essa ação é irreversível. Tem certeza que deseja prosseguir e excluir permanentemente este recurso?"
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
}`,
      },
    },
  },
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
