import { ButtonBase } from "../components/ui/ButtonBase";
import { Toaster, toast } from "@/components/ui/SonnerBase";

export default function RootLayout() {
  const handleClick = () => {
    toast.success("Você clicou no botão e ativou o Sonner!");
  };

  return (
    <div>
      <div />
      <div className="p-6">
        <div>
          <p className="py-6 font-bold text-lg ">Documento de Notificação com Sonner</p>

          <ButtonBase onClick={handleClick}>
            Clique para ativar a notificação
          </ButtonBase>
        </div>
        <Toaster />
      </div>
    </div>
  );
}
