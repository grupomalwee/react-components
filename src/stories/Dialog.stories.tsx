import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  DialogBase,
  DialogContentBase,
  DialogDescriptionBase,
  DialogHeaderBase,
  DialogTitleBase,
  DialogTriggerBase,
  DialogFooterBase,
  DialogCloseBase,
} from "../components/ui/DialogBase";
import { InputBase } from "../components/ui/InputBase";
import LabelBase from "../components/ui/LabelBase";
import { ButtonBase } from "../components/ui/ButtonBase";
import { CheckboxBase } from "../components/ui/CheckBoxBase";
import { CopyIcon, TrashIcon, WarningIcon } from "@phosphor-icons/react";

const meta: Meta<typeof DialogBase> = {
  title: "overlays/Dialog",
  component: DialogBase,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Dialog para modais, alertas, confirmação e formulários. Personalizável e acessível.",
      },
      source: {
        code: `import React from 'react';\nimport { DialogBase, DialogTriggerBase, DialogContentBase, DialogHeaderBase, DialogTitleBase, DialogDescriptionBase, DialogFooterBase, DialogCloseBase } from '@mlw-packages/react-components';\nimport { ButtonBase } from '@mlw-packages/react-components';\n\nexport default function Example() {\n  return (\n    <DialogBase>\n      <DialogTriggerBase asChild>\n        <ButtonBase>Open</ButtonBase>\n      </DialogTriggerBase>\n      <DialogContentBase>\n        <DialogHeaderBase>\n          <DialogTitleBase>Title</DialogTitleBase>\n          <DialogDescriptionBase>Description goes here.</DialogDescriptionBase>\n        </DialogHeaderBase>\n        <DialogFooterBase>\n          <DialogCloseBase asChild>\n            <ButtonBase variant='outline'>Close</ButtonBase>\n          </DialogCloseBase>\n        </DialogFooterBase>\n      </DialogContentBase>\n    </DialogBase>\n  );\n}`,
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
type Story = StoryObj<typeof DialogBase>;

export const ShareDialog: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <DialogBase>
        <DialogTriggerBase asChild>
          <ButtonBase variant="outline">Share</ButtonBase>
        </DialogTriggerBase>
        <DialogContentBase className="sm:max-w-md">
          <DialogHeaderBase>
            <DialogTitleBase>Share link</DialogTitleBase>
            <DialogDescriptionBase>
              Anyone with this link can view this page.
            </DialogDescriptionBase>
          </DialogHeaderBase>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <LabelBase htmlFor="link" className="sr-only">
                Link
              </LabelBase>
              <InputBase
                id="link"
                defaultValue="https://ui.shadcn.com/docs/installation"
                readOnly
              />
            </div>
            <ButtonBase type="button" size="sm" className="p-1.5 mt-1">
              <span className="sr-only">Copy</span>
              <CopyIcon size={16} />
            </ButtonBase>
          </div>
          <DialogFooterBase className="sm:justify-start">
            <DialogCloseBase asChild>
              <ButtonBase type="button" variant="secondary">
                Close
              </ButtonBase>
            </DialogCloseBase>
          </DialogFooterBase>
        </DialogContentBase>
      </DialogBase>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';\nimport { DialogBase, DialogTriggerBase, DialogContentBase, DialogHeaderBase, DialogTitleBase, DialogDescriptionBase, DialogFooterBase, DialogCloseBase } from '@mlw-packages/react-components';\nimport { ButtonBase, InputBase, LabelBase } from '@mlw-packages/react-components';\nimport { CopyIcon } from '@phosphor-icons/react';\n\nexport default function ShareDialog() {\n  return (\n    <DialogBase>\n      <DialogTriggerBase asChild>\n        <ButtonBase variant='outline'>Share</ButtonBase>\n      </DialogTriggerBase>\n      <DialogContentBase>\n        <DialogHeaderBase>\n          <DialogTitleBase>Share link</DialogTitleBase>\n          <DialogDescriptionBase>Anyone with this link can view this page.</DialogDescriptionBase>\n        </DialogHeaderBase>\n        <div>\n          <LabelBase htmlFor='link' className='sr-only'>Link</LabelBase>\n          <InputBase id='link' defaultValue='https://...' readOnly />\n        </div>\n        <DialogFooterBase>\n          <DialogCloseBase asChild>\n            <ButtonBase variant='secondary'>Close</ButtonBase>\n          </DialogCloseBase>\n        </DialogFooterBase>\n      </DialogContentBase>\n    </DialogBase>\n  );\n}`,
      },
    },
  },
};

export const FormDialog: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <DialogBase>
        <DialogTriggerBase asChild>
          <ButtonBase variant="default">Subscribe</ButtonBase>
        </DialogTriggerBase>
        <DialogContentBase className="sm:max-w-md">
          <DialogHeaderBase>
            <DialogTitleBase>Subscribe to newsletter</DialogTitleBase>
            <DialogDescriptionBase>
              Stay updated with our latest news.
            </DialogDescriptionBase>
          </DialogHeaderBase>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <LabelBase htmlFor="name" className="text-right">
                Name
              </LabelBase>
              <InputBase
                id="name"
                placeholder="Your name"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <LabelBase htmlFor="email" className="text-right">
                Email
              </LabelBase>
              <InputBase
                id="email"
                placeholder="you@example.com"
                className="col-span-3"
              />
            </div>
            <div className="flex items-center gap-2">
              <CheckboxBase id="terms" />
              <LabelBase htmlFor="terms" className="text-sm">
                I accept terms and conditions
              </LabelBase>
            </div>
          </div>
          <DialogFooterBase>
            <DialogCloseBase asChild>
              <ButtonBase variant="outline">Cancel</ButtonBase>
            </DialogCloseBase>
            <ButtonBase>Subscribe</ButtonBase>
          </DialogFooterBase>
        </DialogContentBase>
      </DialogBase>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';\nimport { DialogBase, DialogTriggerBase, DialogContentBase, DialogHeaderBase, DialogTitleBase, DialogDescriptionBase, DialogFooterBase, DialogCloseBase } from '@mlw-packages/react-components';\nimport { ButtonBase, InputBase, LabelBase, CheckboxBase } from '@mlw-packages/react-components';\n\nexport default function FormDialog() {\n  return (\n    <DialogBase>\n      <DialogTriggerBase asChild>\n        <ButtonBase>Subscribe</ButtonBase>\n      </DialogTriggerBase>\n      <DialogContentBase>\n        <DialogHeaderBase>\n          <DialogTitleBase>Subscribe to newsletter</DialogTitleBase>\n          <DialogDescriptionBase>Stay updated with our latest news.</DialogDescriptionBase>\n        </DialogHeaderBase>\n        <div>\n          <LabelBase htmlFor='name'>Name</LabelBase>\n          <InputBase id='name' placeholder='Your name' />\n          <LabelBase htmlFor='email'>Email</LabelBase>\n          <InputBase id='email' placeholder='you@example.com' />\n          <div>\n            <CheckboxBase id='terms' />\n            <LabelBase htmlFor='terms'>I accept terms and conditions</LabelBase>\n          </div>\n        </div>\n        <DialogFooterBase>\n          <DialogCloseBase asChild>\n            <ButtonBase variant='outline'>Cancel</ButtonBase>\n          </DialogCloseBase>\n          <ButtonBase>Subscribe</ButtonBase>\n        </DialogFooterBase>\n      </DialogContentBase>\n    </DialogBase>\n  );\n}`,
      },
    },
  },
};

export const ConfirmDialog: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <DialogBase>
        <DialogTriggerBase asChild>
          <ButtonBase variant="destructive">Delete</ButtonBase>
        </DialogTriggerBase>
        <DialogContentBase className="sm:max-w-sm">
          <DialogHeaderBase>
            <DialogTitleBase className="flex items-center gap-2">
              <WarningIcon className="text-yellow-500" /> Confirm deletion
            </DialogTitleBase>
            <DialogDescriptionBase>
              This action cannot be undone. Are you sure you want to delete this
              item?
            </DialogDescriptionBase>
          </DialogHeaderBase>
          <DialogFooterBase>
            <DialogCloseBase asChild>
              <ButtonBase variant="outline">Cancel</ButtonBase>
            </DialogCloseBase>
            <ButtonBase variant="destructive">
              <TrashIcon className="mr-2" /> Delete
            </ButtonBase>
          </DialogFooterBase>
        </DialogContentBase>
      </DialogBase>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';\nimport { DialogBase, DialogTriggerBase, DialogContentBase, DialogHeaderBase, DialogTitleBase, DialogDescriptionBase, DialogFooterBase, DialogCloseBase } from '@mlw-packages/react-components';\nimport { ButtonBase } from '@mlw-packages/react-components';\nimport { WarningIcon, TrashIcon } from '@phosphor-icons/react';\n\nexport default function ConfirmDialog() {\n  return (\n    <DialogBase>\n      <DialogTriggerBase asChild>\n        <ButtonBase variant='destructive'>Delete</ButtonBase>\n      </DialogTriggerBase>\n      <DialogContentBase>\n        <DialogHeaderBase>\n          <DialogTitleBase><WarningIcon /> Confirm deletion</DialogTitleBase>\n          <DialogDescriptionBase>This action cannot be undone.</DialogDescriptionBase>\n        </DialogHeaderBase>\n        <DialogFooterBase>\n          <DialogCloseBase asChild>\n            <ButtonBase variant='outline'>Cancel</ButtonBase>\n          </DialogCloseBase>\n          <ButtonBase variant='destructive'><TrashIcon /> Delete</ButtonBase>\n        </DialogFooterBase>\n      </DialogContentBase>\n    </DialogBase>\n  );\n}`,
      },
    },
  },
};
