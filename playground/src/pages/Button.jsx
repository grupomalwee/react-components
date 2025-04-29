import { ButtonBase } from "@lib";

export const ButtonPage = () => {
  return (
    <>
      {/* Div contendo os botões e a Documentação, ambos em flex-col */}
      <div className="mt-5 ml-5 flex flex-col gap-5 p-3 rounded-sm">
        {/* Botões */}
        <div className="flex gap-5 justify-center">
          <ButtonBase>dad</ButtonBase>
          <ButtonBase variant="destructive">dad</ButtonBase>
          <ButtonBase variant="ghost">dad</ButtonBase>
          <ButtonBase variant="link">dad</ButtonBase>
          <ButtonBase variant="outline">dad</ButtonBase>
          <ButtonBase variant="secondary">dad</ButtonBase>
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
                {`import { ButtonBase } from "@/components/ui/ButtonBase";`}
              </code>
            </pre>
          </div>

          {/* Bloco de Código para Uso */}
          <div className="bg-gray-800 text-white p-4 rounded-md">
            <h5 className="font-medium mb-2">Como usar:</h5>
            <pre className="bg-gray-900 p-3 rounded-sm">
              <code>
                {`<ButtonBase>dad</ButtonBase>
<ButtonBase variant="destructive">dad</ButtonBase>
<ButtonBase variant="ghost">dad</ButtonBase>
<ButtonBase variant="link">dad</ButtonBase>
<ButtonBase variant="outline">dad</ButtonBase>
<ButtonBase variant="secondary">dad</ButtonBase>`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </>
  );
};
