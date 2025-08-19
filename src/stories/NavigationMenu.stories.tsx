import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  NavigationMenuBase,
  NavigationMenuListBase,
  NavigationMenuItemBase,
  NavigationMenuContentBase,
  NavigationMenuTriggerBase,
  NavigationMenuLinkBase,
  NavigationMenuIndicatorBase,
} from "../components/ui/NavigationMenuBase";

const meta: Meta<typeof NavigationMenuBase> = {
  title: "navigation/NavigationMenu",
  component: NavigationMenuBase,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NavigationMenuBase>;

export const Default: Story = {
  render: () => (
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
  ),
};
