"use client";

import { ButtonBase } from "@lib";
import { InputBase } from "@lib";
import  LabelBase  from "@lib";
import {
  SheetBase,
  SheetCloseBase,
  SheetContentBase,
  SheetDescriptionBase,
  SheetFooterBase,
  SheetHeaderBase,
  SheetTitleBase,
  SheetTriggerBase,
} from "@lib";

export const SheetPage = () => {
  return (
    <div>
      {/* Sheet Component Example */}
      <div className="mt-5 ml-5 flex flex-col gap-5 p-3 rounded-sm">
        <SheetBase>
          <SheetTriggerBase asChild>
            <ButtonBase variant="outline">Open</ButtonBase>
          </SheetTriggerBase>
          <SheetContentBase>
            <SheetHeaderBase>
              <SheetTitleBase>Edit profile</SheetTitleBase>
              <SheetDescriptionBase>
                Make changes to your profile here. Click save when you're done.
              </SheetDescriptionBase>
            </SheetHeaderBase>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <LabelBase htmlFor="name" className="text-right">
                  Name
                </LabelBase>
                <InputBase
                  id="name"
                  value="Pedro Duarte"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <LabelBase htmlFor="username" className="text-right">
                  Username
                </LabelBase>
                <InputBase
                  id="username"
                  value="@peduarte"
                  className="col-span-3"
                />
              </div>
            </div>
            <SheetFooterBase>
              <SheetCloseBase asChild>
                <ButtonBase type="submit">Save changes</ButtonBase>
              </SheetCloseBase>
            </SheetFooterBase>
          </SheetContentBase>
        </SheetBase>
      </div>

      {/* Documentation Section */}
      <div className="my-8 mx-5">
        <h3 className="text-xl font-semibold mb-3">Documentação</h3>
        <div className="border-t-2 border-gray-300 mb-4"></div>

        {/* Code Block for Importing */}
        <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Como importar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
              {`import {
  ButtonBase
} from "@/components/ui/ButtonBase";
import { InputBase } from "@/components/ui/InputBase";
import  LabelBase  from "@/components/ui/LabelBase";
import {
  SheetBase,
  SheetCloseBase,
  SheetContentBase,
  SheetDescriptionBase,
  SheetFooterBase,
  SheetHeaderBase,
  SheetTitleBase,
  SheetTriggerBase,
} from "@/components/ui/SheetBase";`}
            </code>
          </pre>
        </div>

        {/* Code Block for Usage */}
        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
              {`<SheetBase>
  <SheetTriggerBase asChild>
    <ButtonBase variant="outline">Open</ButtonBase>
  </SheetTriggerBase>
  <SheetContentBase>
    <SheetHeaderBase>
      <SheetTitleBase>Edit profile</SheetTitleBase>
      <SheetDescriptionBase>
        Make changes to your profile here. Click save when you're done.
      </SheetDescriptionBase>
    </SheetHeaderBase>
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <LabelBase htmlFor="name" className="text-right">
          Name
        </LabelBase>
        <InputBase
          id="name"
          value="Pedro Duarte"
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <LabelBase htmlFor="username" className="text-right">
          Username
        </LabelBase>
        <InputBase
          id="username"
          value="@peduarte"
          className="col-span-3"
        />
      </div>
    </div>
    <SheetFooterBase>
      <SheetCloseBase asChild>
        <ButtonBase type="submit">Save changes</ButtonBase>
      </SheetCloseBase>
    </SheetFooterBase>
  </SheetContentBase>
</SheetBase>`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
