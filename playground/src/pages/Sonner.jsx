import { ButtonBase } from "@lib";
import { Toaster } from "@lib";
import { toast } from "sonner";

export const SonnerPage = () => {
  const handleClick = () => {
    toast.success("Você clicou no botão e ativou o Sonner!");
  };

  return (
    <div className="p-6">
      <ButtonBase onClick={handleClick}>
        Clique para ativar a notificação
      </ButtonBase>
      <Toaster />
    </div>
  );
};
