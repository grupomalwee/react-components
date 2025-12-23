import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, userEvent, expect } from "storybook/test";
import { ButtonBase } from "@/components/ui/form/ButtonBase";
import { Select } from "@/components/ui/selects/Select";
import {
  DialogBase,
  DialogTriggerBase,
  DialogContentBase,
  DialogHeaderBase,
  DialogTitleBase,
  DialogDescriptionBase,
  DialogFooterBase,
  DialogCloseBase,
} from "@/components/ui/feedback/DialogBase";

const meta: Meta<typeof ButtonBase> = {
  title: "Example",
  component: ButtonBase,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Resumo dos padrões de stories: args/controls, parâmetros de docs, play tests, states (variants/sizes/disabled), layout e backgrounds.",
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
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
    },
    size: { control: "select", options: ["default", "sm", "lg", "icon"] },
    disabled: { control: "boolean" },
    isLoading: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    children: "Button",
    variant: "default",
    size: "default",
    disabled: false,
    isLoading: false,
  },
};

export default meta;
type Story = StoryObj<typeof ButtonBase>;

export const ButtonsSummary: Story = {
  render: (args) => (
    <div
      style={{ display: "flex", gap: 12, padding: 24, alignItems: "center" }}
    >
      <ButtonBase {...args} data-testid="btn-default">
        Default
      </ButtonBase>
      <ButtonBase {...args} variant="destructive" data-testid="btn-destructive">
        Destructive
      </ButtonBase>
      <ButtonBase {...args} variant="outline" data-testid="btn-outline">
        Outline
      </ButtonBase>
      <ButtonBase {...args} size="sm" data-testid="btn-small">
        Small
      </ButtonBase>
      <ButtonBase {...args} size="lg" data-testid="btn-large">
        Large
      </ButtonBase>
      <ButtonBase
        {...args}
        size="icon"
        aria-label="icon only"
        data-testid="btn-icon"
      >
        <span>★</span>
      </ButtonBase>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByTestId("btn-default")).toBeInTheDocument();
    expect(canvas.getByTestId("btn-destructive")).toBeInTheDocument();
    expect(canvas.getByTestId("btn-outline")).toBeInTheDocument();
    expect(canvas.getByTestId("btn-small")).toHaveTextContent("Small");
    expect(canvas.getByTestId("btn-large")).toHaveTextContent("Large");
    expect(canvas.getByTestId("btn-icon")).toHaveAttribute(
      "aria-label",
      "icon only"
    );
  },
};

export const SelectSummary: Story = {
  render: () => {
    const items = [
      { label: "Option A", value: "a" },
      { label: "Option B", value: "b" },
      { label: "Option C", value: "c" },
    ];

    const SelectExample: React.FC = () => {
      const [selected, setSelected] = React.useState<string | null>(null);
      return (
        <div style={{ padding: 24 }}>
          <Select
            items={items}
            placeholder="Select an option"
            selected={selected}
            onChange={(v: string) => setSelected(v)}
            testIds={{
              trigger: "select-trigger",
              item: (v: string) => `select-item-${v}`,
            }}
          />
        </div>
      );
    };

    return <SelectExample />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByTestId("select-trigger");
    await userEvent.click(trigger);
    const item = await within(document.body).findByText("Option B");
    expect(item).toBeInTheDocument();
    await userEvent.click(item);
  },
};

export const DialogSummary: Story = {
  render: () => (
    <div style={{ padding: 24 }}>
      <DialogBase>
        <DialogTriggerBase asChild>
          <ButtonBase>Open dialog</ButtonBase>
        </DialogTriggerBase>
        <DialogContentBase className="sm:max-w-md">
          <DialogHeaderBase>
            <DialogTitleBase>Example dialog</DialogTitleBase>
            <DialogDescriptionBase>
              This is a short description.
            </DialogDescriptionBase>
          </DialogHeaderBase>
          <DialogFooterBase>
            <DialogCloseBase asChild>
              <ButtonBase variant="outline">Close</ButtonBase>
            </DialogCloseBase>
            <ButtonBase>Confirm</ButtonBase>
          </DialogFooterBase>
        </DialogContentBase>
      </DialogBase>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const openBtn = canvas.getByRole("button", { name: /open dialog/i });
    await userEvent.click(openBtn);
    expect(
      await within(document.body).findByText("Example dialog")
    ).toBeInTheDocument();
  },
};

export const AccessibilityAndDocs: Story = {
  render: () => (
    <div style={{ padding: 24 }}>
      <p style={{ marginBottom: 12 }}>
        Padrões: args/controls, docs/source.code, backgrounds, layout e play
        tests.
      </p>
      <ButtonBase aria-label="example-action">Action</ButtonBase>
    </div>
  ),
};
