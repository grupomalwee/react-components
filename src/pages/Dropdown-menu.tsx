import {
  DropDownMenuBase,
  DropDownMenuContentBase,
  DropDownMenuItemBase,
  DropDownMenuLabelBase,
  DropDownMenuSeparatorBase,
  DropDownMenuTriggerBase,
} from "@/components/ui/DropDownMenuBase";
import { CheckIcon, ListIcon } from "@phosphor-icons/react";

export const DropDownMenuPage = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* DropDown Menu Component */}
      <div className="ml-5 mt-5">
        <DropDownMenuBase>
          <DropDownMenuTriggerBase className="flex items-center gap-2">
            Abrir menu
            <ListIcon />
          </DropDownMenuTriggerBase>
          <DropDownMenuContentBase align="end">
            <DropDownMenuLabelBase>My Account</DropDownMenuLabelBase>
            <DropDownMenuSeparatorBase />
            <DropDownMenuItemBase
              onClick={(e) => {
                e.preventDefault();
                console.log('event')
              }}
            >
              Profile
            </DropDownMenuItemBase>
            <DropDownMenuItemBase>Billing</DropDownMenuItemBase>
            <DropDownMenuItemBase rightIcon={<CheckIcon />}>
              Team
            </DropDownMenuItemBase>
            <DropDownMenuItemBase leftIcon={<CheckIcon />}>
              Subscription
            </DropDownMenuItemBase>
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
    </div>
  );
};
