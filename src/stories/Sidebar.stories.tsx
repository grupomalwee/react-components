import {
  SidebarBase,
  SidebarContentBase,
  SidebarGroupBase,
  SidebarGroupContentBase,
  SidebarGroupLabelBase,
  SidebarMenuBase,
  SidebarMenuButtonBase,
  SidebarMenuItemBase,
  SidebarProviderBase,
  SidebarTriggerBase,
} from "@/components/ui/SidebarBase";
import { Link, MemoryRouter } from "react-router-dom";

export default {
  title: "navigation/Sidebar",
  component: SidebarBase,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: 'Sidebar para navegação entre seções, menus e agrupamentos. Veja exemplos de uso das props abaixo.'
      }
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f6f6f6' },
        { name: 'dark', value: '#222' }
      ]
    },
  },
};

import {
  HouseIcon,
  WarningCircleIcon,
  UserCircleIcon,
  MedalIcon,
  TreeStructureIcon,
  CursorIcon,
  CalendarBlankIcon,
  SquaresFourIcon,
} from "@phosphor-icons/react";

export const Default = () => {
  const items = [
    { title: "Home", url: "/", icon: HouseIcon },
    { title: "Alert Dialog", url: "/", icon: WarningCircleIcon },
    { title: "Avatar", url: "/", icon: UserCircleIcon },
    { title: "Bagde", url: "/", icon: MedalIcon },
    { title: "Breadcrumb", url: "/", icon: TreeStructureIcon },
    { title: "Button", url: "/", icon: CursorIcon },
    { title: "Calendar", url: "/", icon: CalendarBlankIcon },
    { title: "Card", url: "/", icon: SquaresFourIcon },
  ];

  return (
    <MemoryRouter>
      <div style={{ display: "flex" }}>
        <SidebarProviderBase>
          <SidebarBase>
            <SidebarContentBase>
              <SidebarGroupBase>
                <SidebarGroupLabelBase>Components</SidebarGroupLabelBase>
                <SidebarGroupContentBase>
                  <SidebarMenuBase>
                    {items.map((item) => (
                      <SidebarMenuItemBase key={item.title}>
                        <SidebarMenuButtonBase asChild>
                          <Link
                            to={item.url}
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <item.icon size={18} style={{ marginRight: 8 }} />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButtonBase>
                      </SidebarMenuItemBase>
                    ))}
                  </SidebarMenuBase>
                </SidebarGroupContentBase>
              </SidebarGroupBase>
            </SidebarContentBase>
          </SidebarBase>
          <SidebarTriggerBase />
        </SidebarProviderBase>
      </div>
    </MemoryRouter>
  );
};
