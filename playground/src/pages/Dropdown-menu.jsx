"use client";

import {
  DropDownMenuBase,
  DropDownMenuContentBase,
  DropDownMenuItemBase,
  DropDownMenuLabelBase,
  DropDownMenuSeparatorBase,
  DropDownMenuTriggerBase,
} from "@lib";

export const DropDownMenuPage = () => {
  return (
    <>
      {/* DropDown Menu Component */}
      <div className="mt-5 ml-5 flex flex-col gap-5 p-3 rounded-sm">
        <DropDownMenuBase>
          <DropDownMenuTriggerBase>Open</DropDownMenuTriggerBase>
          <DropDownMenuContentBase>
            <DropDownMenuLabelBase>My Account</DropDownMenuLabelBase>
            <DropDownMenuSeparatorBase />
            <DropDownMenuItemBase>Profile</DropDownMenuItemBase>
            <DropDownMenuItemBase>Billing</DropDownMenuItemBase>
            <DropDownMenuItemBase>Team</DropDownMenuItemBase>
            <DropDownMenuItemBase>Subscription</DropDownMenuItemBase>
          </DropDownMenuContentBase>
        </DropDownMenuBase>
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
              {`import {
  DropDownMenuBase,
  DropDownMenuContentBase,
  DropDownMenuItemBase,
  DropDownMenuLabelBase,
  DropDownMenuSeparatorBase,
  DropDownMenuTriggerBase,
} from "@/components/ui/DropDownMenuBase";`}
            </code>
          </pre>
        </div>

        {/* Bloco de Código para Uso */}
        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
              {`<DropDownMenuBase>
  <DropDownMenuTriggerBase>Open</DropDownMenuTriggerBase>
  <DropDownMenuContentBase>
    <DropDownMenuLabelBase>My Account</DropDownMenuLabelBase>
    <DropDownMenuSeparatorBase />
    <DropDownMenuItemBase>Profile</DropDownMenuItemBase>
    <DropDownMenuItemBase>Billing</DropDownMenuItemBase>
    <DropDownMenuItemBase>Team</DropDownMenuItemBase>
    <DropDownMenuItemBase>Subscription</DropDownMenuItemBase>
  </DropDownMenuContentBase>
</DropDownMenuBase>`}
            </code>
          </pre>
        </div>
      </div>
    </>
  );
};
