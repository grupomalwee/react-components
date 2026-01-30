import "../../style/global.css";
import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  DialogBase,
  DialogContentBase,
  DialogDescriptionBase,
  DialogFooterBase,
  DialogHeaderBase,
  DialogTitleBase,
  DialogTriggerBase,
} from "@/components/ui/feedback/DialogBase";
import { ButtonBase } from "@/components/ui/form/ButtonBase";
import { WarningCircleIcon } from "@phosphor-icons/react";

const meta: Meta<typeof DialogBase> = {
  title: "feedback/Dialog Base",
  component: DialogBase,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Primitivos do Dialog (DialogBase) para composição manual. Use estes componentes quando precisar de flexibilidade total além do que o componente `Dialog` padrão oferece.",
      },
    },
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof DialogBase>;

export const Composition: Story = {
  render: () => (
    <DialogBase>
      <DialogTriggerBase asChild>
        <ButtonBase variant="outline">Open Composition</ButtonBase>
      </DialogTriggerBase>
      <DialogContentBase>
        <DialogHeaderBase>
          <DialogTitleBase>Composed Dialog</DialogTitleBase>
          <DialogDescriptionBase>
            This dialog is built by composing the base primitives manually.
          </DialogDescriptionBase>
        </DialogHeaderBase>
        <div className="py-4">
          <p className="text-sm">You have full control over the layout here.</p>
        </div>
        <DialogFooterBase>
          <ButtonBase>Close</ButtonBase>
        </DialogFooterBase>
      </DialogContentBase>
    </DialogBase>
  ),
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import {
  DialogBase,
  DialogContentBase,
  DialogDescriptionBase,
  DialogFooterBase,
  DialogHeaderBase,
  DialogTitleBase,
  DialogTriggerBase,
  ButtonBase,
} from '@mlw-packages/react-components';

export default function Example() {
  return (
    <DialogBase>
      <DialogTriggerBase asChild>
        <ButtonBase variant="outline">Open Composition</ButtonBase>
      </DialogTriggerBase>
      <DialogContentBase>
        <DialogHeaderBase>
          <DialogTitleBase>Composed Dialog</DialogTitleBase>
          <DialogDescriptionBase>
            This dialog is built by composing the base primitives manually.
          </DialogDescriptionBase>
        </DialogHeaderBase>
        <div className="py-4">
          <p className="text-sm">You have full control over the layout here.</p>
        </div>
        <DialogFooterBase>
          <ButtonBase>Close</ButtonBase>
        </DialogFooterBase>
      </DialogContentBase>
    </DialogBase>
  );
}`,
      },
    },
  },
};

export const CustomHeader: Story = {
  render: () => (
    <DialogBase>
      <DialogTriggerBase asChild>
        <ButtonBase variant="outline">Open Custom Header</ButtonBase>
      </DialogTriggerBase>
      <DialogContentBase>
        <DialogHeaderBase className="sm:text-center">
          <div className="flex flex-col items-center gap-2">
            <WarningCircleIcon className="h-8 w-8 text-yellow-500" />
            <DialogTitleBase>Warning</DialogTitleBase>
          </div>
          <DialogDescriptionBase>
            This dialog features a custom centered header with an icon.
          </DialogDescriptionBase>
        </DialogHeaderBase>
        <DialogFooterBase className="sm:justify-center">
          <ButtonBase className="w-full sm:w-auto">Understood</ButtonBase>
        </DialogFooterBase>
      </DialogContentBase>
    </DialogBase>
  ),
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import {
  DialogBase,
  DialogContentBase,
  DialogDescriptionBase,
  DialogFooterBase,
  DialogHeaderBase,
  DialogTitleBase,
  DialogTriggerBase,
  ButtonBase,
} from '@mlw-packages/react-components';
import { WarningCircleIcon } from "@phosphor-icons/react";

export default function CustomHeaderExample() {
  return (
    <DialogBase>
      <DialogTriggerBase asChild>
        <ButtonBase variant="outline">Open Custom Header</ButtonBase>
      </DialogTriggerBase>
      <DialogContentBase>
        <DialogHeaderBase className="sm:text-center">
          <div className="flex flex-col items-center gap-2">
            <WarningCircleIcon className="h-8 w-8 text-yellow-500" />
            <DialogTitleBase>Warning</DialogTitleBase>
          </div>
          <DialogDescriptionBase>
            This dialog features a custom centered header with an icon.
          </DialogDescriptionBase>
        </DialogHeaderBase>
        <DialogFooterBase className="sm:justify-center">
          <ButtonBase className="w-full sm:w-auto">Understood</ButtonBase>
        </DialogFooterBase>
      </DialogContentBase>
    </DialogBase>
  );
}`,
      },
    },
  },
};

export const DestructiveVariant: Story = {
  render: () => (
    <DialogBase>
      <DialogTriggerBase asChild>
        <ButtonBase variant="destructive">Delete Account</ButtonBase>
      </DialogTriggerBase>
      <DialogContentBase>
        <DialogHeaderBase>
          <DialogTitleBase>Are you absolutely sure?</DialogTitleBase>
          <DialogDescriptionBase>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescriptionBase>
        </DialogHeaderBase>
        <DialogFooterBase>
          <div className="flex justify-end gap-2 w-full">
            <ButtonBase variant="outline">Cancel</ButtonBase>
            <ButtonBase variant="destructive">Delete Account</ButtonBase>
          </div>
        </DialogFooterBase>
      </DialogContentBase>
    </DialogBase>
  ),
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import {
  DialogBase,
  DialogContentBase,
  DialogDescriptionBase,
  DialogFooterBase,
  DialogHeaderBase,
  DialogTitleBase,
  DialogTriggerBase,
  ButtonBase,
} from '@mlw-packages/react-components';

export default function DestructiveExample() {
  return (
    <DialogBase>
      <DialogTriggerBase asChild>
        <ButtonBase variant="destructive">Delete Account</ButtonBase>
      </DialogTriggerBase>
      <DialogContentBase>
        <DialogHeaderBase>
          <DialogTitleBase>Are you absolutely sure?</DialogTitleBase>
          <DialogDescriptionBase>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescriptionBase>
        </DialogHeaderBase>
        <DialogFooterBase>
          <div className="flex justify-end gap-2 w-full">
            <ButtonBase variant="outline">Cancel</ButtonBase>
            <ButtonBase variant="destructive">Delete Account</ButtonBase>
          </div>
        </DialogFooterBase>
      </DialogContentBase>
    </DialogBase>
  );
}`,
      },
    },
  },
};
