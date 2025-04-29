// src/pages/AlertDialogPage.jsx
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
} from "@lib";

export const AlertDialogPage = () => {
  return (
    <>
      {/* Div contendo o AlertDialog e a Documentação, ambos em flex-col */}
      <div className="mt-5 ml-5 flex flex-col gap-5 p-3 rounded-sm">
        {/* Alerta Dialog */}
        <div className="flex justify-center">
          <AlertDialogBase>
            <AlertDialogTriggerBase>Open</AlertDialogTriggerBase>
            <AlertDialogContentBase>
              <AlertDialogHeaderBase>
                <AlertDialogTitleBase>
                  Are you absolutely sure?
                </AlertDialogTitleBase>
                <AlertDialogDescriptionBase>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescriptionBase>
              </AlertDialogHeaderBase>
              <AlertDialogFooterBase>
                <AlertDialogCancelBase>Cancel</AlertDialogCancelBase>
                <AlertDialogActionBase>Continue</AlertDialogActionBase>
              </AlertDialogFooterBase>
            </AlertDialogContentBase>
          </AlertDialogBase>
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
  AlertDialogBase,
  AlertDialogActionBase,
  AlertDialogCancelBase,
  AlertDialogContentBase,
  AlertDialogDescriptionBase,
  AlertDialogFooterBase,
  AlertDialogHeaderBase,
  AlertDialogTitleBase,
  AlertDialogTriggerBase,
} from "@lib";`}
              </code>
            </pre>
          </div>

          {/* Bloco de Código para Uso */}
          <div className="bg-gray-800 text-white p-4 rounded-md">
            <h5 className="font-medium mb-2">Como usar:</h5>
            <pre className="bg-gray-900 p-3 rounded-sm">
              <code>
                {`<AlertDialogBase>
  <AlertDialogTriggerBase>Open</AlertDialogTriggerBase>
  <AlertDialogContentBase>
    <AlertDialogHeaderBase>
      <AlertDialogTitleBase>
        Are you absolutely sure?
      </AlertDialogTitleBase>
      <AlertDialogDescriptionBase>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescriptionBase>
    </AlertDialogHeaderBase>
    <AlertDialogFooterBase>
      <AlertDialogCancelBase>Cancel</AlertDialogCancelBase>
      <AlertDialogActionBase>Continue</AlertDialogActionBase>
    </AlertDialogFooterBase>
  </AlertDialogContentBase>
</AlertDialogBase>`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </>
  );
};
