"use client";

import { ButtonBase } from "../components/ui/ButtonBase";
import { Toaster, toast } from "@/components/ui/SonnerBase";

export default function RootLayout() {
  return (
    <div className="p-6 space-y-8">
      <p className="font-bold text-lg">Documento de Notificação com Sonner</p>

      <div className="flex flex-wrap gap-4">
        <ButtonBase
          testid="button-success"
          onClick={() => toast.success("Operação concluída com sucesso!")}
        >
          Sucesso
        </ButtonBase>
      
        <ButtonBase
          testid="button-error"
          onClick={() => toast.error("Opa! Algo deu errado.")}
        >
          Erro
        </ButtonBase>
      
        <ButtonBase
          testid="button-warning"
          onClick={() => toast.warning("Atenção! Confira os dados.")}
        >
          Aviso
        </ButtonBase>
      
        <ButtonBase
          testid="button-info"
          onClick={() => toast.info("Informação: nada demais, só avisando.")}
        >
          Info
        </ButtonBase>
        <ButtonBase
        testid="button-loading"
          onClick={() =>
            toast.loading("Loading: baixando  C: /System/system32.")
          }
        >
          Loading
        </ButtonBase>
      </div>

      <Toaster />
      <div className="my-8">
        <h3 className="text-xl font-semibold mb-3">Documentação</h3>
        <div className="border-t-2 border-gray-300 mb-4"></div>

        <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Como importar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>{`import { SlideBase } from "@/components/ui/SliderBase";`}</code>
          </pre>
        </div>

        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>{`<SlideBase
  className="w-32 h-4"
  value={[value]} // array de números
  onValueChange={setValue} // recebe array
  max={100}
  min={0}
  step={1}
/>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
