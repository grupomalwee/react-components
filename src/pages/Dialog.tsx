"use client";

import { CopyIcon, TrashIcon, WarningIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { toast, Toaster } from "@/components/ui/SonnerBase";

import {
  DialogBase,
  DialogContentBase,
  DialogDescriptionBase,
  DialogHeaderBase,
  DialogTitleBase,
  DialogTriggerBase,
  DialogFooterBase,
  DialogCloseBase,
} from "@/components/ui/DialogBase";
import { InputBase } from "@/components/ui/InputBase";
import LabelBase from "@/components/ui/LabelBase";
import { ButtonBase } from "@/components/ui/ButtonBase";
import { CheckboxBase } from "@/components/ui/CheckBoxBase";


export const DialogPage = () => {
  const [link] = useState("https://ui.shadcn.com/docs/installation");

  const handleCopy = () => {
    toast.success("Link copiado!");
  };

  return (
    <div className="flex">
      <div className="p-8 rounded-sm">
        <div className="p-2">
          <DialogBase>
            <Toaster />
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
                  <InputBase id="link" defaultValue={link} readOnly />
                </div>
                <ButtonBase
                  type="button"
                  size="sm"
                  className="p-1.5 mt-1"
                  onClick={handleCopy}
                >
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

        <div className="p-2">
          <DialogBase>
            <DialogTriggerBase asChild>
              <ButtonBase variant="destructive">Delete</ButtonBase>
            </DialogTriggerBase>
            <DialogContentBase className="sm:max-w-sm">
              <DialogHeaderBase>
                <DialogTitleBase>Confirm deletion</DialogTitleBase>
                <DialogDescriptionBase>
                  This action cannot be undone. Are you sure you want to delete
                  this item?
                </DialogDescriptionBase>
              </DialogHeaderBase>
              <DialogFooterBase>
                <DialogCloseBase asChild>
                  <ButtonBase variant="outline">Cancel</ButtonBase>
                </DialogCloseBase>
                <ButtonBase
                  variant="destructive"
                  onClick={() => toast.error("Item deleted")}
                >
                  <TrashIcon className="mr-2" /> Delete
                </ButtonBase>
              </DialogFooterBase>
            </DialogContentBase>
          </DialogBase>
        </div>
        <div className="p-2">
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
                <ButtonBase
                  onClick={() => toast.success("Subscribed successfully!")}
                >
                  Subscribe
                </ButtonBase>
              </DialogFooterBase>
            </DialogContentBase>
          </DialogBase>
        </div>
        <div className="p-2">
          <DialogBase>
            <DialogTriggerBase asChild>
              <ButtonBase variant="destructive">Alert</ButtonBase>
            </DialogTriggerBase>
            <DialogContentBase className="sm:max-w-sm">
              <DialogHeaderBase>
                <DialogTitleBase className="flex items-center gap-2">
                  <WarningIcon className="text-yellow-500" /> Warning!
                </DialogTitleBase>
                <DialogDescriptionBase>
                  This is a critical alert. Pay attention to this message.
                </DialogDescriptionBase>
              </DialogHeaderBase>
              <DialogFooterBase>
                <DialogCloseBase asChild>
                  <ButtonBase variant="secondary">Dismiss</ButtonBase>
                </DialogCloseBase>
              </DialogFooterBase>
            </DialogContentBase>
          </DialogBase>
        </div>
      </div>
      <div className="my-8 mx-5">
        <h3 className="text-xl font-semibold mb-3">Documentação</h3>
        <div className="border-t-2 border-gray-300 mb-4"></div>

        <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Como importar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm overflow-x-auto">
            <code className="text-sm">
              {`import { Copy, Trash, Warning } from "@phosphor-icons/react";
import { toast } from "sonner";

import {
  DialogBase,
  DialogContentBase,
  DialogDescriptionBase,
  DialogHeaderBase,
  DialogTitleBase,
  DialogTriggerBase,
  DialogFooterBase,
  DialogCloseBase,
} from "@/components/ui/DialogBase";
import { InputBase } from "@/components/ui/InputBase";
import LabelBase from "@/components/ui/LabelBase";
import { ButtonBase } from "@/components/ui/ButtonBase";
import { CheckboxBase } from "@/components/ui/CheckBoxBase";`}
            </code>
          </pre>
        </div>

        {/* Como usar */}
        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm overflow-x-auto">
            <code className="text-sm">
              {`<DialogBase>
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
      <ButtonBase type="button" size="sm" className="px-3">
        <span className="sr-only">Copy</span>
        <Copy />
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
</DialogBase>`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
