import "../../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  TabsBase,
  TabsListBase,
  TabsTriggerBase,
  TabsContentBase,
} from "@/components/ui/layout/TabsBase";
import React from "react";
import { expect } from "storybook/test";

const meta: Meta<typeof TabsBase> = {
  title: "layout/Tabs",
  component: TabsBase,
  tags: ["autodocs"],
  args: {
    triggerAnimation: "default",
    contentAnimation: "default",
  } as unknown as Record<string, unknown>,
  argTypes: {
    triggerAnimation: {
      name: "Trigger animation",
      control: { type: "select" },
      options: ["default", "none", "scale", "underline"],
    },
    contentAnimation: {
      name: "Content animation",
      control: { type: "select" },
      options: ["default", "fade", "slide", "none"],
    },
  } as unknown as Record<string, unknown>,
  parameters: {
    docs: {
      description: {
        component: "Tabs para navegação entre seções, categorias ou conteúdos.",
      },
      source: {
        code: `import React from 'react';
import { TabsBase, TabsListBase, TabsTriggerBase, TabsContentBase } from '@mlw-packages/react-components';

export default function Example() {
  const [value, setValue] = React.useState('tab1');
  return (
    <TabsBase value={value} onValueChange={(v) => setValue(v)}>
      <TabsListBase>
        <TabsTriggerBase value="tab1">Visao Geral</TabsTriggerBase>
        <TabsTriggerBase value="tab2">Adulto</TabsTriggerBase>
        <TabsTriggerBase value="tab3">Infantil</TabsTriggerBase>
      </TabsListBase>

      <TabsContentBase value="tab1">Content for Tab 1</TabsContentBase>
      <TabsContentBase value="tab2">Content for Tab 2</TabsContentBase>
      <TabsContentBase value="tab3">Content for Tab 3</TabsContentBase>
    </TabsBase>
  );
}
`,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f6f6f6" },
        { name: "dark", value: "#222" },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

type Args = {
  triggerAnimation?: string;
  contentAnimation?: string;
};

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);

export const TabsSimples: Story = {
  name: "Padrão",
  render: (args: Args) => {
    const [value, setValue] = React.useState<string>("tab1");
    return (
      <Wrapper>
        <TabsBase value={value} onValueChange={(v) => setValue(v)}>
          <TabsListBase>
            <TabsTriggerBase value="tab1" animation={args.triggerAnimation}>
              Visao Geral
            </TabsTriggerBase>
            <TabsTriggerBase value="tab2" animation={args.triggerAnimation}>
              Adulto
            </TabsTriggerBase>
            <TabsTriggerBase value="tab3" animation={args.triggerAnimation}>
              Infantil
            </TabsTriggerBase>
            <div className="w-96"></div>
          </TabsListBase>

          <TabsContentBase value="tab1" animation={args.contentAnimation}>
            <h2>Content for Tab 1</h2>
            <p>This is some content for the first tab.</p>
          </TabsContentBase>
          <TabsContentBase value="tab2" animation={args.contentAnimation}>
            <h2>Content for Tab 2</h2>
            <p>This is some content for the second tab.</p>
          </TabsContentBase>
          <TabsContentBase value="tab3" animation={args.contentAnimation}>
            <h2>Content for Tab 3</h2>
            <p>This is some content for the third tab.</p>
          </TabsContentBase>
        </TabsBase>
      </Wrapper>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `const [value, setValue] = React.useState('tab1');
<TabsBase value={value} onValueChange={(v) => setValue(v)}>
  <TabsListBase>
    <TabsTriggerBase value="tab1">Visao Geral</TabsTriggerBase>
    <TabsTriggerBase value="tab2">Adulto</TabsTriggerBase>
    <TabsTriggerBase value="tab3">Infantil</TabsTriggerBase>
  </TabsListBase>
  <TabsContentBase value="tab1">Content for Tab 1</TabsContentBase>
  <TabsContentBase value="tab2">Content for Tab 2</TabsContentBase>
  <TabsContentBase value="tab3">Content for Tab 3</TabsContentBase>
</TabsBase>`,
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    await step("Verificar renderização do tablist", async () => {
      const tablist = canvasElement.querySelector('[role="tablist"]');
      expect(tablist).toBeInTheDocument();
    });

    await step("Verificar conteúdo inicial (Tab 1)", async () => {
      const panel = canvasElement.querySelector('[role="tabpanel"]');
      expect(panel).toBeInTheDocument();
      expect(panel?.textContent).toContain("Content for Tab 1");
    });
  },
};

export const TriggerScale: Story = {
  render: (args: Args) => {
    const [value, setValue] = React.useState<string>("tab1");
    return (
      <Wrapper>
        <TabsBase value={value} onValueChange={(v) => setValue(v)}>
          <TabsListBase>
            <TabsTriggerBase value="tab1" animation={args.triggerAnimation}>
              Visao Geral
            </TabsTriggerBase>
            <TabsTriggerBase value="tab2" animation={args.triggerAnimation}>
              Adulto
            </TabsTriggerBase>
            <TabsTriggerBase value="tab3" animation={args.triggerAnimation}>
              Infantil
            </TabsTriggerBase>
            <div className="w-96"></div>
          </TabsListBase>

          <TabsContentBase value="tab1" animation={args.contentAnimation}>
            Content for Tab 1
          </TabsContentBase>
          <TabsContentBase value="tab2" animation={args.contentAnimation}>
            Content for Tab 2
          </TabsContentBase>
          <TabsContentBase value="tab3" animation={args.contentAnimation}>
            Content for Tab 3
          </TabsContentBase>
        </TabsBase>
      </Wrapper>
    );
  },
  args: {
    triggerAnimation: "scale",
    contentAnimation: "default",
  },
};

export const ContentSlide: Story = {
  render: (args: Args) => {
    const [value, setValue] = React.useState<string>("tab1");
    return (
      <Wrapper>
        <TabsBase value={value} onValueChange={(v) => setValue(v)}>
          <TabsListBase>
            <TabsTriggerBase value="tab1" animation={args.triggerAnimation}>
              Visao Geral
            </TabsTriggerBase>
            <TabsTriggerBase value="tab2" animation={args.triggerAnimation}>
              Adulto
            </TabsTriggerBase>
            <TabsTriggerBase value="tab3" animation={args.triggerAnimation}>
              Infantil
            </TabsTriggerBase>
            <div className="w-96"></div>
          </TabsListBase>

          <TabsContentBase value="tab1" animation={args.contentAnimation}>
            Content for Tab 1
          </TabsContentBase>
          <TabsContentBase value="tab2" animation={args.contentAnimation}>
            Content for Tab 2
          </TabsContentBase>
          <TabsContentBase value="tab3" animation={args.contentAnimation}>
            Content for Tab 3
          </TabsContentBase>
        </TabsBase>
      </Wrapper>
    );
  },
  args: {
    triggerAnimation: "default",
    contentAnimation: "slide",
  },
};

export const SemAnimacao: Story = {
  name: "Sem Animação",
  render: (args: Args) => {
    const [value, setValue] = React.useState<string>("tab1");
    return (
      <Wrapper>
        <TabsBase value={value} onValueChange={(v) => setValue(v)}>
          <TabsListBase>
            <TabsTriggerBase value="tab1" animation={args.triggerAnimation}>
              Visao Geral
            </TabsTriggerBase>
            <TabsTriggerBase value="tab2" animation={args.triggerAnimation}>
              Adulto
            </TabsTriggerBase>
            <TabsTriggerBase value="tab3" animation={args.triggerAnimation}>
              Infantil
            </TabsTriggerBase>
            <div className="w-96"></div>
          </TabsListBase>

          <TabsContentBase value="tab1" animation={args.contentAnimation}>
            Content for Tab 1
          </TabsContentBase>
          <TabsContentBase value="tab2" animation={args.contentAnimation}>
            Content for Tab 2
          </TabsContentBase>
          <TabsContentBase value="tab3" animation={args.contentAnimation}>
            Content for Tab 3
          </TabsContentBase>
        </TabsBase>
      </Wrapper>
    );
  },
  args: {
    triggerAnimation: "none",
    contentAnimation: "none",
  },
};
