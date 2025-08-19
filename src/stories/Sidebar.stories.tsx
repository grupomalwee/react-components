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
};

import {
  House,
  WarningCircle,
  UserCircle,
  Medal,
  TreeStructure,
  Cursor,
  CalendarBlank,
  SquaresFour,
} from "phosphor-react";

export const Default = () => {
  const items = [
    { title: "Home", url: "/", icon: House },
    { title: "Alert Dialog", url: "/", icon: WarningCircle },
    { title: "Avatar", url: "/", icon: UserCircle },
    { title: "Bagde", url: "/", icon: Medal },
    { title: "Breadcrumb", url: "/", icon: TreeStructure },
    { title: "Button", url: "/", icon: Cursor },
    { title: "Calendar", url: "/", icon: CalendarBlank },
    { title: "Card", url: "/", icon: SquaresFour },
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
