import { ButtonBase } from "@lib";

export const ButtonPage = () => {
  return (
    <>
      <div className="mt-5 ml-5 flex flex-col gap-5 p-3 rounded-sm">
        <div className="flex gap-5 justify-center">
          <ButtonBase>Butão</ButtonBase>
          <ButtonBase variant="destructive">Butão</ButtonBase>
          <ButtonBase variant="ghost">Butão</ButtonBase>
          <ButtonBase variant="link">Butão</ButtonBase>
          <ButtonBase variant="outline">Butão</ButtonBase>
          <ButtonBase variant="secondary">Butão</ButtonBase>
        </div>

        <div className="my-8 mx-5">
          <h3 className="text-xl font-semibold mb-3">Documentação</h3>
          <div className="border-t-2 border-gray-300 mb-4"></div>

          <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
            <h5 className="font-medium mb-2">Como importar:</h5>
            <pre className="bg-gray-900 p-3 rounded-sm">
              <code>
{`import { ButtonBase } from "@/components/ui/ButtonBase";`}
              </code>
            </pre>
          </div>

          <div className="bg-gray-800 text-white p-4 rounded-md">
            <h5 className="font-medium mb-2">Como usar:</h5>
            <pre className="bg-gray-900 p-3 rounded-sm">
              <code>
{`<ButtonBase>Butão</ButtonBase>
<ButtonBase variant="destructive">Butão</ButtonBase>
<ButtonBase variant="ghost">Butão</ButtonBase>
<ButtonBase variant="link">Butão</ButtonBase>
<ButtonBase variant="outline">Butão</ButtonBase>
<ButtonBase variant="secondary">Butão</ButtonBase>`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </>
  );
};
