import { ButtonBase } from "@/components/ui/form/ButtonBase";
import { DestructiveDialog } from "@/components/ui/feedback/DestructiveDialog";
import { TrashIcon } from "@phosphor-icons/react";
import React from "react";

export const DestructiveDialogPage: React.FC = () => {
  const handleConfirm = () => {
    console.log("Confirmado: ação destrutiva executada");
  };

  return (
    <div className="p-6 ">
      <div className="flex items-center gap-4">
        <DestructiveDialog
          title="Excluir recurso"
          description="Essa ação é irreversível. Tem certeza que deseja prosseguir e excluir permanentemente este recurso?"
          onConfirm={handleConfirm}
          onCancel={() => console.log("Cancelado")}
        />
        <DestructiveDialog
          title="Excluir recurso"
          description="Essa ação é irreversível. Tem certeza que deseja prosseguir e excluir permanentemente este recurso?"
          onConfirm={handleConfirm}
          onCancel={() => console.log("Cancelado")}
          triggerContent={"Exemplo"}
        />

        <DestructiveDialog
          title="Excluir recurso"
          description="Essa ação é irreversível. Tem certeza que deseja prosseguir e excluir permanentemente este recurso?"
          onConfirm={handleConfirm}
          onCancel={() => console.log("Cancelado")}
        >
          <ButtonBase>DADADADADADADADAADAD</ButtonBase>
        </DestructiveDialog>

        <DestructiveDialog
          title="Excluir recurso"
          description="Essa ação é irreversível. Tem certeza que deseja prosseguir e excluir permanentemente este recurso?"
          onConfirm={handleConfirm}
          onCancel={() => console.log("Cancelado")}
        >
          <ButtonBase>
            <TrashIcon />
            Abrir
          </ButtonBase>
        </DestructiveDialog>
      </div>

      <div className="my-8">
        <h3 className="text-xl font-semibold mb-3">Documentação</h3>
        <div className="border-t-2 border-gray-300 mb-4"></div>

        <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Como importar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm overflow-x-auto">
            <code>{`import { DestructiveDialog } from "@/components/ui/DestructiveDialog";`}</code>
          </pre>
        </div>

        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm overflow-x-auto">
            <code>
              {`<DestructiveDialog
  title={"Excluir recurso"}
  description={"Confirma exclusão?"}
  onConfirm={handleConfirm}
  onCancel={() => console.log('cancel')}
>
  <ButtonBase>Excluir</ButtonBase>
</DestructiveDialog>`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default DestructiveDialogPage;
