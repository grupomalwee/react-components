import "../../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  DropDownMenuBase,
  DropDownMenuTriggerBase,
  DropDownMenuContentBase,
  DropDownMenuItemBase,
  DropDownMenuLabelBase,
  DropDownMenuSeparatorBase,
} from "@/components/ui/navigation/DropDownMenuBase";
import { CheckIcon, ListIcon } from "@phosphor-icons/react";

const meta: Meta<typeof DropDownMenuBase> = {
  title: "navigation/DropDown Menu",
  component: DropDownMenuBase,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "DropDownMenu para ações rápidas, navegação e seleção de opções.",
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
type Story = StoryObj<typeof DropDownMenuBase>;

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
      <div className="flex flex-col gap-6 p-8">
        <DropDownMenuBase>
          <DropDownMenuTriggerBase className="flex items-center gap-2">
            Abrir menu
            <ListIcon />
          </DropDownMenuTriggerBase>
          <DropDownMenuContentBase align="end">
            <DropDownMenuLabelBase>My Account</DropDownMenuLabelBase>
            <DropDownMenuSeparatorBase />
            <DropDownMenuItemBase>Profile</DropDownMenuItemBase>
            <DropDownMenuItemBase>Billing</DropDownMenuItemBase>
            <DropDownMenuItemBase rightIcon={<CheckIcon />}>
              Team
            </DropDownMenuItemBase>
            <DropDownMenuItemBase leftIcon={<CheckIcon />}>
              Subscription
            </DropDownMenuItemBase>
          </DropDownMenuContentBase>
        </DropDownMenuBase>
      </div>
    </div>
  ),
};

meta.parameters = {
  ...meta.parameters,
  docs: {
    ...meta.parameters?.docs,
    source: {
      code: `import {
  DropDownMenuBase,
  DropDownMenuTriggerBase,
  DropDownMenuContentBase,
  DropDownMenuItemBase,
  DropDownMenuLabelBase,
  DropDownMenuSeparatorBase,
} from '@mlw-packages/react-components';

function Example() {
  return (
    <DropDownMenuBase>
      <DropDownMenuTriggerBase>Open menu</DropDownMenuBase>
      <DropDownMenuContentBase align='end'>
        <DropDownMenuLabelBase>My Account</DropDownMenuLabelBase>
        <DropDownMenuSeparatorBase />
        <DropDownMenuItemBase>Profile</DropDownMenuItemBase>
        <DropDownMenuItemBase>Billing</DropDownMenuItemBase>
        <DropDownMenuItemBase rightIcon={<span>✓</span>}>Team</DropDownMenuItemBase>
      </DropDownMenuContentBase>
    </DropDownMenuBase>
  );
}

export default Example;`,
    },
  },
};

Default.parameters = {
  ...Default.parameters,
  docs: {
    ...Default.parameters?.docs,
    source: {
      code: `import { DropDownMenuBase, DropDownMenuTriggerBase, DropDownMenuContentBase, DropDownMenuItemBase } from '@mlw-packages/react-components';

function Example() {
  return (
    <DropDownMenuBase>
      <DropDownMenuTriggerBase>Open menu</DropDownMenuTriggerBase>
      <DropDownMenuContentBase align='end'>
        <DropDownMenuItemBase>Profile</DropDownMenuItemBase>
        <DropDownMenuItemBase>Billing</DropDownMenuItemBase>
      </DropDownMenuContentBase>
    </DropDownMenuBase>
  );
}

export default Example;`,
    },
  },
};
