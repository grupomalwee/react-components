

import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadialMenu } from '@/components/ui/navigation/RadialMenu';
import { 
  Trash, 
  ShareNetwork, 
  Copy, 
  Download, 
  Fingerprint, 
  PencilIcon
} from '@phosphor-icons/react';

const meta: Meta<typeof RadialMenu> = {
  title: 'Navigation/RadialMenu',
  component: RadialMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RadialMenu>;

const demoItems = [
  { id: 1, label: 'Editar', icon: PencilIcon },
  { id: 2, label: 'Copiar', icon: Copy },
  { id: 3, label: 'Compartilhar', icon: ShareNetwork },
  { id: 4, label: 'Download', icon: Download },
  { id: 5, label: 'Segurança', icon: Fingerprint },
  { id: 6, label: 'Excluir', icon: Trash },
];

export const Default: Story = {
  args: {
    menuItems: demoItems,
    size: 260,
    iconSize: 22,

  },
  render: (args) => (
    <div className="flex items-center justify-center w-[500px] h-[400px] ">
      <RadialMenu {...args}>
        <div className="px-6 py-3 bg-primary text-primary-foreground rounded-lg shadow-md cursor-context-menu font-medium">
          Clique Direito Aqui
        </div>
      </RadialMenu>
    </div>
  ),
};

export const SmallMenu: Story = {
  args: {
    menuItems: demoItems.slice(0, 4), 
    size: 180,
    iconSize: 18,
    bandWidth: 40,
  },
  render: (args) => (
    <RadialMenu {...args}>
      <div className="p-4 border rounded-lg shadow-md">
        Menu Compacto
      </div>
    </RadialMenu>
  ),
};

export const LargeIcons: Story = {
  args: {
    menuItems: demoItems,
    size: 300,
    iconSize: 28,
    outerRingWidth: 15,
  },
  render: (args) => (
    <RadialMenu {...args}>
      <div className="text-muted-foreground underline underline-offset-4 cursor-context-menu">
        Área de Teste (Botão Direito)
      </div>
    </RadialMenu>
  ),
};