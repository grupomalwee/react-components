import { ButtonBase } from "@lib"; // Importando o Button do ShadCN
import { Toaster, toast } from "sonner"; // Importando o Toaster e toast do Sonner

export default function RootLayout() {
  // Função que dispara a notificação
  const handleClick = () => {
    toast.success("Você clicou no botão e ativou o Sonner!");
  };

  return (
    <html lang="en">
      <head />
      <body>
        <main>
          <h1>Documento de Notificação com Sonner</h1>

          {/* Usando o Button do ShadCN para disparar a notificação */}
          <ButtonBase onClick={handleClick}>
            Clique para ativar a notificação
          </ButtonBase>
        </main>
        <Toaster /> {/* Exibe as notificações Sonner */}
      </body>
    </html>
  );
}
