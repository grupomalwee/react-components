import "../../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  NavigationMenuBase,
  NavigationMenuListBase,
  NavigationMenuItemBase,
  NavigationMenuContentBase,
  NavigationMenuTriggerBase,
  NavigationMenuLinkBase,
  NavigationMenuIndicatorBase,
} from "@/components/ui/navigation/NavigationMenuBase";

const meta: Meta<typeof NavigationMenuBase> = {
  title: "navigation/Navigation Menu",
  component: NavigationMenuBase,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "NavigationMenu para navegação principal, com menus, submenus e links.",
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
type Story = StoryObj<typeof NavigationMenuBase>;

export const Default: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <div className="flex items-center justify-center min-h-[300px] p-6">
        <NavigationMenuBase>
          <NavigationMenuListBase>
            <NavigationMenuItemBase>
              <NavigationMenuTriggerBase>Produtos</NavigationMenuTriggerBase>
              <NavigationMenuContentBase>
                <div className="p-4 min-w-[200px]">
                  <NavigationMenuLinkBase href="#camisetas">
                    Camisetas
                  </NavigationMenuLinkBase>
                  <NavigationMenuLinkBase href="#calcas">
                    Calças
                  </NavigationMenuLinkBase>
                  <NavigationMenuLinkBase href="#acessorios">
                    Acessórios
                  </NavigationMenuLinkBase>
                </div>
              </NavigationMenuContentBase>
            </NavigationMenuItemBase>
            <NavigationMenuItemBase>
              <NavigationMenuTriggerBase>Sobre</NavigationMenuTriggerBase>
              <NavigationMenuContentBase>
                <div className="p-4 min-w-[200px]">
                  <NavigationMenuLinkBase href="#empresa">
                    Empresa
                  </NavigationMenuLinkBase>
                  <NavigationMenuLinkBase href="#sustentabilidade">
                    Sustentabilidade
                  </NavigationMenuLinkBase>
                </div>
              </NavigationMenuContentBase>
            </NavigationMenuItemBase>
            <NavigationMenuItemBase>
              <NavigationMenuLinkBase href="#contato">
                Contato
              </NavigationMenuLinkBase>
            </NavigationMenuItemBase>
          </NavigationMenuListBase>
          <NavigationMenuIndicatorBase />
        </NavigationMenuBase>
      </div>
    </div>
  ),
};

meta.parameters = {
  ...meta.parameters,
  docs: {
    ...meta.parameters?.docs,
    source: {
      code: `import React from 'react';
import {
  NavigationMenuBase,
  NavigationMenuListBase,
  NavigationMenuItemBase,
  NavigationMenuContentBase,
  NavigationMenuTriggerBase,
  NavigationMenuLinkBase,
} from '@mlw-packages/react-components';

export default function Example() {
  return (
    <NavigationMenuBase>
      <NavigationMenuListBase>
        <NavigationMenuItemBase>
          <NavigationMenuTriggerBase>Products</NavigationMenuTriggerBase>
          <NavigationMenuContentBase>
            <div style={{ padding: 12 }}>
              <NavigationMenuLinkBase href="#shirts">Shirts</NavigationMenuLinkBase>
              <NavigationMenuLinkBase href="#pants">Pants</NavigationMenuLinkBase>
            </div>
          </NavigationMenuContentBase>
        </NavigationMenuItemBase>
      </NavigationMenuListBase>
    </NavigationMenuBase>
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
import { NavigationMenuBase, NavigationMenuListBase, NavigationMenuItemBase, NavigationMenuTriggerBase, NavigationMenuContentBase, NavigationMenuLinkBase } from '@mlw-packages/react-components';

export const Default = () => (
  <NavigationMenuBase>
    <NavigationMenuListBase>
      <NavigationMenuItemBase>
        <NavigationMenuTriggerBase>Products</NavigationMenuTriggerBase>
        <NavigationMenuContentBase>
          <NavigationMenuLinkBase href="#shirts">Shirts</NavigationMenuLinkBase>
        </NavigationMenuContentBase>
      </NavigationMenuItemBase>
    </NavigationMenuListBase>
  </NavigationMenuBase>
);`,
    },
  },
};
