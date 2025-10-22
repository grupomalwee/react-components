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
        component:
          "Sidebar para navegação entre seções, menus e agrupamentos. Veja exemplos de uso das props abaixo.",
      },
      source: {
        code: `import React from 'react';\nimport { MemoryRouter } from 'react-router-dom';\nimport { SidebarBase, SidebarProviderBase, SidebarContentBase, SidebarGroupBase, SidebarGroupLabelBase, SidebarGroupContentBase, SidebarMenuBase, SidebarMenuItemBase, SidebarMenuButtonBase, SidebarTriggerBase } from '@mlw-packages/react-components';\n\nexport default function Example() {\n  const items = [\n    { title: 'Home', url: '/' },\n    { title: 'Avatar', url: '/' }\n  ];\n\n  return (\n    <MemoryRouter>\n      <SidebarProviderBase>\n        <SidebarBase>\n          <SidebarContentBase>\n            <SidebarGroupBase>\n              <SidebarGroupLabelBase>Components</SidebarGroupLabelBase>\n              <SidebarGroupContentBase>\n                <SidebarMenuBase>\n                  {items.map((i) => (\n                    <SidebarMenuItemBase key={i.title}>\n                      <SidebarMenuButtonBase asChild>\n                        <a href={i.url}>{i.title}</a>\n                      </SidebarMenuButtonBase>\n                    </SidebarMenuItemBase>\n                  ))}\n                </SidebarMenuBase>\n              </SidebarGroupContentBase>\n            </SidebarGroupBase>\n          </SidebarContentBase>\n        </SidebarBase>\n        <SidebarTriggerBase />\n      </SidebarProviderBase>\n    </MemoryRouter>\n  );\n}\n`,
      },
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
