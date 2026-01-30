import "../../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Dialog from "@/components/ui/feedback/Dialog";
import { ButtonBase } from "@/components/ui/form/ButtonBase";


const meta: Meta<typeof Dialog> = {
  title: "feedback/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Dialog genérico que usa a composição do DialogBase. Suporta titulo, descrição, trigger, footer e children.",
      },
    },
    layout: "centered",
  },
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    children: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  args: {
    title: "Dialog Title",
    description: "This is a description of the dialog action.",
    trigger: <ButtonBase>Open Dialog</ButtonBase>,
    children: <div className="py-4">Dialog Content</div>,
    footer: (
      <div className="flex justify-end gap-2">
        <ButtonBase variant="outline">Cancel</ButtonBase>
        <ButtonBase>Confirm</ButtonBase>
      </div>
    ),
  },
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { Dialog, ButtonBase } from '@mlw-packages/react-components';

export default function Example() {
  return (
    <Dialog
      title="Dialog Title"
      description="This is a description of the dialog action."
      trigger={<ButtonBase>Open Dialog</ButtonBase>}
      footer={
        <div className="flex justify-end gap-2">
          <ButtonBase variant="outline">Cancel</ButtonBase>
          <ButtonBase>Confirm</ButtonBase>
        </div>
      }
    >
      <div className="py-4">Dialog Content</div>
    </Dialog>
  );
}`,
      },
    },
  },
};


export const Small: Story = {
  args: {
    title: "Small Dialog",
    description: "This is a small dialog.",
    size: "sm",
    trigger: <ButtonBase variant="outline">Open Small</ButtonBase>,
    children: <div className="py-4">It looks cute!</div>,
    footer: (
      <div className="flex justify-end gap-2">
        <ButtonBase>Close</ButtonBase>
      </div>
    ),
  },
};

export const Large: Story = {
  args: {
    title: "Large Dialog",
    description: "This is a large dialog.",
    size: "lg",
    trigger: <ButtonBase variant="outline">Open Large</ButtonBase>,
    children: <div className="py-4">Lots of space for activities!</div>,
    footer: (
      <div className="flex justify-end gap-2">
        <ButtonBase>Close</ButtonBase>
      </div>
    ),
  },
};

export const Success: Story = {
  args: {
    title: "Success",
    description: "Your action was completed successfully.",
    variant: "success",
    trigger: (
      <ButtonBase className="bg-green-600 hover:bg-green-700">
        Open Success
      </ButtonBase>
    ),
    children: <div className="py-4">Your changes have been saved.</div>,
    footer: (
      <div className="flex justify-end gap-2">
        <ButtonBase className="bg-green-600 hover:bg-green-700">
          Done
        </ButtonBase>
      </div>
    ),
  },
};

export const Warning: Story = {
  args: {
    title: "Warning",
    description: "This is a warning message. Please be careful.",
    variant: "warning",
    trigger: (
      <ButtonBase className="bg-amber-500 hover:bg-amber-600">
        Open Warning
      </ButtonBase>
    ),
    children: (
      <div className="py-4">You are about to preform a risky action.</div>
    ),
    footer: (
      <div className="flex justify-end gap-2">
        <ButtonBase variant="secondary">Cancel</ButtonBase>
        <ButtonBase className="bg-amber-500 hover:bg-amber-600">
          Proceed
        </ButtonBase>
      </div>
    ),
  },
};

export const Destructive: Story = {
  args: {
    title: "Delete Account",
    description:
      "Are you sure you want to delete your account? This action cannot be undone.",
    variant: "destructive",
    trigger: <ButtonBase variant="destructive">Delete Account</ButtonBase>,
    children: (
      <div className="py-4">All your data will be permanently removed.</div>
    ),
    footer: (
      <div className="flex justify-end gap-2">
        <ButtonBase variant="outline">Cancel</ButtonBase>
        <ButtonBase variant="destructive">Delete Account</ButtonBase>
      </div>
    ),
  },
};

export const Info: Story = {
  args: {
    title: "Information",
    description: "Here is some useful information.",
    variant: "info",
    trigger: (
      <ButtonBase className="bg-blue-600 hover:bg-blue-700">
        Open Info
      </ButtonBase>
    ),
    children: (
      <div className="py-4">Did you know you can customize this dialog?</div>
    ),
    footer: (
      <div className="flex justify-end gap-2">
        <ButtonBase className="bg-blue-600 hover:bg-blue-700">
          Got it
        </ButtonBase>
      </div>
    ),
  },
};

export const Brutal: Story = {
  args: {
    title: "NEO-BRUTALISM",
    description: "High contrast, hard shadows, bold borders.",
    variant: "brutal",
    trigger: (
      <ButtonBase className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all bg-yellow-400 text-black hover:bg-yellow-500 rounded-none">
        OPEN BRUTAL
      </ButtonBase>
    ),
    children: (
      <div className="py-4 font-mono font-bold">
        ATTENTION REQUIRED. NO SOFT EDGES HERE.
      </div>
    ),
    footer: (
      <div className="flex justify-end gap-2">
        <ButtonBase className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none bg-white text-black hover:bg-gray-100">
          CANCEL
        </ButtonBase>
        <ButtonBase className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none bg-black text-white hover:bg-gray-800">
          CONFIRM
        </ButtonBase>
      </div>
    ),
  },
};
