import { ButtonBase } from "@lib";
import { Toaster } from "sonner";
import { toast } from "sonner";

export const SonnerPage = () => {
  const handleClick = () => {
    toast.success("Você clicou no botão e ativou o Sonner!");
  };

  return (
    <div className="p-6">
      <main>
        <ButtonBase onClick={handleClick} className="my-5">
          Clique para ativar a notificação
        </ButtonBase>
      </main>

      <Toaster
        style={{
          left: "800px",
          bottom: "-180px",
        }}
      />
      <div className="my-8 mx-5">
        <h3 className="text-xl font-semibold mb-3">Documentação</h3>
        <div className="border-t-2 border-gray-300 mb-4"></div>

        <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Como importar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
              {`import { SonnerBase } from "@/components/ui/SonnerBase";`}
            </code>
          </pre>
        </div>

        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
              {` <div className="p-6">
      <main>
        <ButtonBase onClick={handleClick} className="my-5">
          Clique para ativar a notificação
        </ButtonBase>
      </main>

      <Toaster    
      />
 </div>`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
