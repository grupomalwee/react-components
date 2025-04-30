import React from "react";
import { Copy } from "phosphor-react";
import {
  DialogBase,
  DialogContentBase,
  DialogDescriptionBase,
  DialogHeaderBase,
  DialogTitleBase,
  DialogTriggerBase,
  DialogFooterBase,
  DialogCloseBase,
  InputBase,
  ButtonBase,
} from "@lib";

export const DialogPage = () => {
  const link = "https://ui.shadcn.com/docs/installation";

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
  };

  return (
    <div className="mt-5 ml-5 flex gap-5 p-3 rounded-sm">
      <DialogBase>
        <DialogTriggerBase asChild>
          <ButtonBase variant="outline">Open</ButtonBase>
        </DialogTriggerBase>

        <DialogContentBase className="sm:max-w-md">
          <DialogHeaderBase>
            <DialogTitleBase>Share link</DialogTitleBase>
            <DialogDescriptionBase>
              Anyone who has this link will be able to view this.
            </DialogDescriptionBase>
          </DialogHeaderBase>

          <div className="flex items-center space-x-2 mt-4">
            <InputBase
              id="link"
              defaultValue={link}
              readOnly
              className="flex-1 border border-gray-300 p-2 rounded-md"
            />
            <ButtonBase
              type="button"
              size="sm"
              className="p-2"
              onClick={handleCopy}
            >
              <Copy size={20} />
            </ButtonBase>
          </div>

          <DialogFooterBase className="mt-4 sm:justify-start">
            <DialogCloseBase asChild>
              <ButtonBase type="button" variant="secondary">
                Close
              </ButtonBase>
            </DialogCloseBase>
          </DialogFooterBase>
        </DialogContentBase>
      </DialogBase>
    </div>
  );
};
