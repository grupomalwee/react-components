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
} from "@lib";
import { InputBase } from "@lib";
import { LabelBase } from "@lib";
import { ButtonBase } from "@lib";

export const DialogPage = () => {
  return (
    <>
      <div className="mt-5 ml-5 flex gap-5 p-3 rounded-sm">
        <DialogBase>
          <DialogTriggerBase asChild>
            <ButtonBase variant="outline">Share</ButtonBase>
          </DialogTriggerBase>
          <DialogContentBase className="sm:max-w-md">
            <DialogHeaderBase>
              <DialogTitleBase>Share link</DialogTitleBase>
              <DialogDescriptionBase>
                Anyone who has this link will be able to view this.
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
              <ButtonBase type="submit" size="sm" className="px-3">
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
        </DialogBase>
      </div>
    </>
  );
};
