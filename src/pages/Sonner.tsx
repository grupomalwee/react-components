"use client";

import { ButtonBase } from "../components/ui/ButtonBase";
import { Toaster, toast } from "@/components/ui/SonnerBase";

export default function RootLayout() {
  return (
    <div className="p-6 space-y-8">
      <p className="font-bold text-lg">Documento de Notificação com Sonner</p>

      <div className="flex flex-wrap gap-4">
        <ButtonBase
          onClick={() => toast.success("Operação concluída com sucesso!")}
        >
          Sucesso
        </ButtonBase>

        <ButtonBase onClick={() => toast.error("Opa! Algo deu errado.")}>
          Erro
        </ButtonBase>

        <ButtonBase onClick={() => toast.warning("Atenção! Confira os dados.")}>
          Aviso
        </ButtonBase>

        <ButtonBase
          onClick={() => toast.info("Informação: nada demais, só avisando.")}
        >
          Info
        </ButtonBase>
        <ButtonBase
          onClick={() => toast.loading("Loading: baixando  C: /System/system32.")}
        >
          Loading
        </ButtonBase>
      </div>

      <Toaster />
    </div>
  );
}
