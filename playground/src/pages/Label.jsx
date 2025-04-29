import { CheckboxBase } from "@lib";
import  LabelBase  from "@lib";

export function LabelPage() {
  return (
    <>
      {/* Checkbox Component */}
      <div className="mt-5 ml-5 flex gap-5 h-11 p-3 rounded-sm">
        <div className="flex items-center space-x-2">
          <CheckboxBase id="terms" />
          <LabelBase htmlFor="terms">Accept terms and conditions</LabelBase>
        </div>
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
              {`import { CheckboxBase } from "@/components/ui/CheckBoxBase";
import LabelBase  from "@/components/ui/LabelBase";`}
            </code>
          </pre>
        </div>

        {/* Bloco de Código para Uso */}
        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
              {`<div className="flex items-center space-x-2">
  <CheckboxBase id="terms" />
  <LabelBase htmlFor="terms">Accept terms and conditions</LabelBase>
</div>`}
            </code>
          </pre>
        </div>
      </div>
    </>
  );
}
