import {
  AlertDialogBase,
  AlertDialogActionBase,
  AlertDialogCancelBase,
  AlertDialogContentBase,
  AlertDialogDescriptionBase,
  AlertDialogFooterBase,
  AlertDialogHeaderBase,
  AlertDialogTitleBase,
  AlertDialogTriggerBase,
} from "@/components/ui/AlertDialogBase";
import { CheckCircle, Info, Warning, XCircle } from "@phosphor-icons/react";

export const AlertDialogPage = () => (
  <div className="p-6 space-y-8">
    <div className="flex flex-wrap gap-6 justify-between">
      <AlertDialogBase>
        <AlertDialogTriggerBase>Excluir Conta</AlertDialogTriggerBase>
        <AlertDialogContentBase >
          <AlertDialogHeaderBase >
            <div className="flex items-center gap-2 text-destructive">
              <XCircle className="w-5 h-5" />
              <AlertDialogTitleBase>Tem certeza absoluta?</AlertDialogTitleBase>
            </div>
            <AlertDialogDescriptionBase>
              Essa ação não pode ser desfeita. Isso vai excluir permanentemente sua conta e remover seus dados dos nossos servidores.
            </AlertDialogDescriptionBase>
          </AlertDialogHeaderBase>
          <AlertDialogFooterBase>
            <AlertDialogCancelBase>Cancelar</AlertDialogCancelBase>
            <AlertDialogActionBase className="bg-destructive hover:bg-destructive/90">
              Excluir
            </AlertDialogActionBase>
          </AlertDialogFooterBase>
        </AlertDialogContentBase>
      </AlertDialogBase>

      <AlertDialogBase>
        <AlertDialogTriggerBase>Aviso</AlertDialogTriggerBase>
        <AlertDialogContentBase>
          <AlertDialogHeaderBase>
            <div className="flex items-center gap-2 text-yellow-500">
              <Warning className="w-5 h-5" />
              <AlertDialogTitleBase>Olha, preste atenção!</AlertDialogTitleBase>
            </div>
            <AlertDialogDescriptionBase>
              Você está prestes a fazer uma alteração que pode impactar outros usuários.
            </AlertDialogDescriptionBase>
          </AlertDialogHeaderBase>
          <AlertDialogFooterBase>
            <AlertDialogCancelBase>Cancelar</AlertDialogCancelBase>
            <AlertDialogActionBase className="bg-yellow-500 hover:bg-yellow-600 text-black">
              Prosseguir
            </AlertDialogActionBase>
          </AlertDialogFooterBase>
        </AlertDialogContentBase>
      </AlertDialogBase>

      <AlertDialogBase>
        <AlertDialogTriggerBase>Ação Concluída</AlertDialogTriggerBase>
        <AlertDialogContentBase>
          <AlertDialogHeaderBase>
            <div className="flex items-center gap-2 text-emerald-600">
              <CheckCircle className="w-5 h-5" />
              <AlertDialogTitleBase>Operação bem-sucedida!</AlertDialogTitleBase>
            </div>
            <AlertDialogDescriptionBase>
              Sua ação foi concluída com sucesso. Pode fechar essa janela.
            </AlertDialogDescriptionBase>
          </AlertDialogHeaderBase>
          <AlertDialogFooterBase>
            <AlertDialogActionBase className="bg-emerald-600 hover:bg-emerald-700">
              Fechar
            </AlertDialogActionBase>
          </AlertDialogFooterBase>
        </AlertDialogContentBase>
      </AlertDialogBase>

      <AlertDialogBase>
        <AlertDialogTriggerBase>Informação</AlertDialogTriggerBase>
        <AlertDialogContentBase>
          <AlertDialogHeaderBase>
            <div className="flex items-center gap-2 text-blue-600">
              <Info className="w-5 h-5" />
              <AlertDialogTitleBase>Importante saber!</AlertDialogTitleBase>
            </div>
            <AlertDialogDescriptionBase>
              O sistema passará por manutenção amanhã das 00h às 04h. Alguns serviços poderão ficar indisponíveis.
            </AlertDialogDescriptionBase>
          </AlertDialogHeaderBase>
          <AlertDialogFooterBase>
            <AlertDialogActionBase className="bg-blue-600 hover:bg-blue-700">
              Entendi
            </AlertDialogActionBase>
          </AlertDialogFooterBase>
        </AlertDialogContentBase>
      </AlertDialogBase>
    </div>

    <div className="my-8 mx-5">
      <h3 className="text-xl font-semibold mb-3">Documentação</h3>
      <div className="border-t-2 border-gray-300 mb-4"></div>

      <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
        <h5 className="font-medium mb-2">Como importar:</h5>
        <pre className="bg-gray-900 p-3 rounded-sm overflow-x-auto">
          <code>
{`import {
  AlertDialogBase,
  AlertDialogActionBase,
  AlertDialogCancelBase,
  AlertDialogContentBase,
  AlertDialogDescriptionBase,
  AlertDialogFooterBase,
  AlertDialogHeaderBase,
  AlertDialogTitleBase,
  AlertDialogTriggerBase,
} from "@/components/ui/AlertDialogBase";`}
          </code>
        </pre>
      </div>

      {/* Bloco de Código para Uso */}
      <div className="bg-gray-800 text-white p-4 rounded-md">
        <h5 className="font-medium mb-2">Como usar:</h5>
        <pre className="bg-gray-900 p-3 rounded-sm overflow-x-auto">
          <code>
{`<AlertDialogBase>
  <AlertDialogTriggerBase>Excluir Conta</AlertDialogTriggerBase>
  <AlertDialogContentBase>
    <AlertDialogHeaderBase>
      <div className="flex items-center gap-2 text-destructive">
        <XCircle className="w-5 h-5" />
        <AlertDialogTitleBase>Tem certeza absoluta?</AlertDialogTitleBase>
      </div>
      <AlertDialogDescriptionBase>
        Essa ação não pode ser desfeita. Isso vai excluir permanentemente sua conta.
      </AlertDialogDescriptionBase>
    </AlertDialogHeaderBase>
    <AlertDialogFooterBase>
      <AlertDialogCancelBase>Cancelar</AlertDialogCancelBase>
      <AlertDialogActionBase className="bg-destructive hover:bg-destructive/90">
        Excluir
      </AlertDialogActionBase>
    </AlertDialogFooterBase>
  </AlertDialogContentBase>
</AlertDialogBase>`}
          </code>
        </pre>
      </div>
    </div>
  </div>
);
