import { ButtonBase } from "@/components/ui/ButtonBase";
import { DestructiveDialogTrigger } from "@/components/ui/DestructiveDialog";
import { Trash } from "@phosphor-icons/react";
import React from "react";

export const DestructiveDialogPage: React.FC = () => {
  const handleConfirm = () => {
    console.log("Confirmado: ação destrutiva executada");
  };

  return (
    <div className="p-6 ">
      <div className="flex items-center gap-4">
        <DestructiveDialogTrigger
          title="Excluir recurso"
          description="Essa ação é irreversível. Tem certeza que deseja prosseguir e excluir permanentemente este recurso?"
          onConfirm={handleConfirm}
          onCancel={() => console.log("Cancelado")}
        />
        <DestructiveDialogTrigger
          title="Excluir recurso"
          description="Essa ação é irreversível. Tem certeza que deseja prosseguir e excluir permanentemente este recurso?"
          onConfirm={handleConfirm}
          onCancel={() => console.log("Cancelado")}
          triggerContent={"Exemplo"} 
          />

        <DestructiveDialogTrigger
          title="Excluir recurso"
          description="Essa ação é irreversível. Tem certeza que deseja prosseguir e excluir permanentemente este recurso?"
          onConfirm={handleConfirm}
          onCancel={() => console.log("Cancelado")}
        >
          <ButtonBase>DADADADADADADADAADAD</ButtonBase>
        </DestructiveDialogTrigger>

        <DestructiveDialogTrigger
          title="Excluir recurso"
          description="Essa ação é irreversível. Tem certeza que deseja prosseguir e excluir permanentemente este recurso?"
          onConfirm={handleConfirm}
          onCancel={() => console.log("Cancelado")}
        >
          <ButtonBase>
            <Trash />
            Abrir
          </ButtonBase>
        </DestructiveDialogTrigger>
      </div>

      <div className="my-8">
        <h3 className="text-xl font-semibold mb-3">Documentação</h3>
        <div className="border-t-2 border-gray-300 mb-4"></div>

        <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Como importar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm overflow-x-auto">
            <code>{`import { DestructiveDialogTrigger } from "@/components/ui/DestructiveDialog";`}</code>
          </pre>
        </div>

        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm overflow-x-auto">
            <code>
              {`<DestructiveDialogTrigger
  title={"Excluir recurso"}
  description={"Confirma exclusão?"}
  onConfirm={handleConfirm}
  onCancel={() => console.log('cancel')}
>
  <ButtonBase>Excluir</ButtonBase>
</DestructiveDialogTrigger>`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default DestructiveDialogPage;
