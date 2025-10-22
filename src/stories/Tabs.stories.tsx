import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TabsBase } from "../components/ui/TabsBase";
import {
  TabsListBase,
  TabsTriggerBase,
  TabsContentBase,
} from "../components/ui/TabsBase";

const meta: Meta<typeof TabsBase> = {
  title: "layout/Tabs",
  component: TabsBase,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Tabs para navegação entre seções, categorias ou conteúdos.",
      },
      source: {
        code: `import React from 'react';
import { TabsBase, TabsListBase, TabsTriggerBase, TabsContentBase } from '@mlw-packages/react-components';

export default function Example() {
  return (
    <TabsBase>
      <TabsListBase>
        <TabsTriggerBase value="tab1">Visao Geral</TabsTriggerBase>
        <TabsTriggerBase value="tab2">Adulto</TabsTriggerBase>
        <TabsTriggerBase value="tab3">Infantil</TabsTriggerBase>
      </TabsListBase>
      <TabsContentBase value="tab1">Conteúdo da Visão Geral</TabsContentBase>
      <TabsContentBase value="tab2">Conteúdo Adulto</TabsContentBase>
      <TabsContentBase value="tab3">Conteúdo Infantil</TabsContentBase>
    </TabsBase>
  );
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
type Story = StoryObj<typeof TabsBase>;

export const TabsSimples: Story = {
  parameters: {
    docs: {
      source: {
        code: `import { TabsBase, TabsListBase, TabsTriggerBase, TabsContentBase } from '@mlw-packages/react-components';

<TabsBase>
  <TabsListBase>
    <TabsTriggerBase value="tab1">Visao Geral</TabsTriggerBase>
    <TabsTriggerBase value="tab2">Adulto</TabsTriggerBase>
    <TabsTriggerBase value="tab3">Infantil</TabsTriggerBase>
  </TabsListBase>
  <TabsContentBase value="tab1">Conteúdo da Visão Geral</TabsContentBase>
</TabsBase>`,
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
      <TabsBase>
        <TabsListBase>
          <TabsTriggerBase value="tab1">Visao Geral</TabsTriggerBase>
          <TabsTriggerBase value="tab2">Adulto</TabsTriggerBase>
          <TabsTriggerBase value="tab3">Infantil</TabsTriggerBase>
          <div className="w-96"></div>
        </TabsListBase>
        <TabsContentBase value="tab1">
          <h2>Content for Tab 1</h2>
          <p>This is some content for the first tab.</p>
        </TabsContentBase>
        <TabsContentBase value="tab2">
          <h2>Content for Tab 2</h2>
          <p>This is some content for the second tab.</p>
        </TabsContentBase>
        <TabsContentBase value="tab3">
          <h2>Content for Tab 3</h2>
          <p>This is some content for the third tab.</p>
        </TabsContentBase>
      </TabsBase>
    </div>
  ),
};
