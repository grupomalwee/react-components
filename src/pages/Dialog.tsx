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
} from "@/components/ui/DialogBase";
import { InputBase } from "@/components/ui/InputBase";
import  LabelBase  from "@/components/ui/LabelBase";
import { ButtonBase } from "@/components/ui/ButtonBase";

export const DialogPage = () => {
  return (
    <>
      {/* Dialog Component */}
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
                
              </DialogCloseBase>
            </DialogFooterBase>
          </DialogContentBase>
        </DialogBase>
      </div>

      {/* Linha separadora e Título de Documentação */}
      <div className="my-8 mx-5">
        <h3 className="text-xl font-semibold mb-3">Documentação</h3>
        <div className="border-t-2 border-gray-300 mb-4"></div>

        {/* Bloco de Código para Importação */}
        <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Como importar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
              {`import { Copy } from "lucide-react";

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
import  LabelBase  from "@/components/ui/LabelBase";
import { ButtonBase } from "@/components/ui/ButtonBase";`}
            </code>
          </pre>
        </div>

        {/* Bloco de Código para Uso */}
        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
              {`<DialogBase>
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
        <LabelBase htmlFor="link" className="sr-only">Link</LabelBase>
        <InputBase id="link" defaultValue="https://ui.shadcn.com/docs/installation" readOnly />
      </div>
      <ButtonBase type="submit" size="sm" className="px-3">
        <span className="sr-only">Copy</span>
        <Copy />
      </ButtonBase>
    </div>
    <DialogFooterBase className="sm:justify-start">
      <DialogCloseBase asChild>
        <ButtonBase type="button" variant="secondary">Close</ButtonBase>
      </DialogCloseBase>
    </DialogFooterBase>
  </DialogContentBase>
</DialogBase>`}
            </code>
          </pre>
        </div>
      </div>
    </>
  );
};
