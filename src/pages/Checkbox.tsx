import { CheckboxBase } from "@/components/ui/form/CheckBoxBase";
import LabelBase from "@/components/ui/form/LabelBase";

export const CheckBoxPage = () => {
  return (
    <div className="mt-5 ml-5 flex flex-col gap-8 p-3 rounded-sm">
      <div className="flex items-center space-x-2">
        <CheckboxBase id="terms" />
        <LabelBase htmlFor="terms">Aceito os termos e condições</LabelBase>
      </div>

      <div className="flex flex-col gap-3">
        <h4 className="text-base font-medium">Notificações</h4>
        <div className="flex items-center space-x-2">
          <CheckboxBase id="email" defaultChecked />
          <LabelBase htmlFor="email">Email</LabelBase>
        </div>
        <div className="flex items-center space-x-2">
          <CheckboxBase id="sms" />
          <LabelBase htmlFor="sms">SMS</LabelBase>
        </div>
        <div className="flex items-center space-x-2">
          <CheckboxBase id="push" />
          <LabelBase htmlFor="push">Push Notification</LabelBase>
        </div>
      </div>

      <div className="flex items-center space-x-2 opacity-50">
        <CheckboxBase id="disabled" disabled />
        <LabelBase htmlFor="disabled">Desabilitado</LabelBase>
      </div>

      <div className="my-8 mx-5">
        <h3 className="text-xl font-semibold mb-3">Documentação</h3>
        <div className="border-t-2 border-gray-300 mb-4" />

        <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Como importar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
              {`import { CheckboxBase } from "@/components/ui/CheckBoxBase";
import LabelBase from "@/components/ui/LabelBase";`}
            </code>
          </pre>
        </div>

        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
              {`<div className="flex items-center space-x-2">
  <CheckboxBase id="terms" />
  <LabelBase htmlFor="terms">
    Aceito os termos e condições
  </LabelBase>
</div>`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
