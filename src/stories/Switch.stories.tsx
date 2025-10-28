import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SwitchBase } from "../components/ui/form/SwitchBase";
import { useState } from "react";
import {
  SunIcon,
  MoonIcon,
  BellIcon,
  BellSlashIcon,
} from "@phosphor-icons/react";

const meta: Meta<typeof SwitchBase> = {
  title: "forms/Switch",
  component: SwitchBase,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Switch para alternância de estados, modo escuro, notificações e energia.",
      },
      source: {
        code: `import React, { useState } from 'react';
import { SwitchBase } from '@mlw-packages/react-components';

export default function Example() {
  const [checked, setChecked] = useState(true);
  return <SwitchBase checked={checked} onCheckedChange={setChecked} />;
}`,
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
type Story = StoryObj<typeof SwitchBase>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { SwitchBase } from '@mlw-packages/react-components';

<SwitchBase defaultChecked />`,
      },
    },
  },
  render: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <SwitchBase defaultChecked />
    </div>
  ),
};

export const Basico: Story = {
  name: "Switch Básico",
  parameters: {
    docs: {
      description: {
        story: "Exemplo simples de switch sem controle de estado.",
      },
      source: {
        code: `import { SwitchBase } from '@mlw-packages/react-components';

<div className="flex items-center gap-4">
  <span className="text-sm">Switch Básico</span>
  <SwitchBase />
</div>`,
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-4">
      <span className="text-sm">Switch Básico</span>
      <SwitchBase />
    </div>
  ),
};

export const Notificacoes: Story = {
  name: "Ativar Notificações",
  parameters: {
    docs: {
      description: {
        story: "Switch controlado para ativar/desativar notificações.",
      },
      source: {
        code: `import React, { useState } from 'react';
import { SwitchBase } from '@mlw-packages/react-components';

function Example() {
  const [notifications, setNotifications] = useState(true);
  return <SwitchBase checked={notifications} onCheckedChange={setNotifications} />;
}`,
      },
    },
  },
  render: () => {
    const [notifications, setNotifications] = useState(true);
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm">Ativar notificações</span>
        <SwitchBase
          checked={notifications}
          onCheckedChange={setNotifications}
        />
      </div>
    );
  },
};

export const DarkMode: Story = {
  name: "Modo Escuro",
  parameters: {
    docs: {
      description: {
        story: "Switch com ícones para alternar entre claro e escuro.",
      },
    },
  },
  render: () => {
    const [darkMode, setDarkMode] = useState(false);
    return (
      <div className="flex items-center gap-4">
        <SunIcon size={20} />
        <SwitchBase checked={darkMode} onCheckedChange={setDarkMode} />
        <MoonIcon size={20} />
      </div>
    );
  },
};

export const Energia: Story = {
  name: "Modo Energia",
  parameters: {
    docs: {
      description: {
        story: "Switch controlado para ligar/desligar modo energia.",
      },
    },
  },
  render: () => {
    const [power, setPower] = useState(false);
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm">Modo Energia</span>
        <SwitchBase checked={power} onCheckedChange={setPower} />
        <span className="text-sm">{power ? "Ligado" : "Desligado"}</span>
      </div>
    );
  },
};

export const NotificacoesIcone: Story = {
  name: "Notificações com Ícone",
  parameters: {
    docs: {
      description: {
        story:
          "Switch estilizado com ícones de sino para ativar/desativar notificações.",
      },
    },
  },
  render: () => {
    const [notifications, setNotifications] = useState(true);
    return (
      <div className="flex items-center gap-4">
        <BellIcon size={20} />
        <SwitchBase
          className="bg-gray-700 data-[state=checked]:bg-green-500"
          checked={notifications}
          onCheckedChange={setNotifications}
        />
        <BellSlashIcon size={20} />
      </div>
    );
  },
};
