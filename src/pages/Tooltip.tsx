"use client";

import {
  TooltipBase,
  TooltipContentBase,
  TooltipProviderBase,
  TooltipTriggerBase,
} from "@/components/ui/TooltBase";
import { ButtonBase } from "@/componets/ui/ButtonBase";
import { Info } from "phosphor-react";

export const TooltipPage = () => {
  return (
    <div className="flex flex-col gap-10 m-12">
      <TooltipProviderBase>
        <div className="flex gap-6 flex-wrap">
          <TooltipBase>
            <TooltipTriggerBase>
              <ButtonBase variant="ghost">Tooltip Básico</ButtonBase>
            </TooltipTriggerBase>
            <TooltipContentBase>Texto simples</TooltipContentBase>
          </TooltipBase>

          <TooltipBase>
            <TooltipTriggerBase asChild className="mt-1">
              <Info className="w-5 h-5 cursor-pointer text-muted-foreground" />
            </TooltipTriggerBase>
            <TooltipContentBase>Informação rápida</TooltipContentBase>
          </TooltipBase>

          <TooltipBase>
            <TooltipTriggerBase>
              <ButtonBase variant="ghost">Com Descrição</ButtonBase>
            </TooltipTriggerBase>
            <TooltipContentBase>
              <div className="flex flex-col">
                <span className="font-semibold">Título</span>
                <span className="text-xs text-white dark:text-black">
                  Texto detalhado explicando o contexto.
                </span>
              </div>
            </TooltipContentBase>
          </TooltipBase>

          <TooltipBase>
            <TooltipTriggerBase>
              <ButtonBase variant="ghost">Posição Top</ButtonBase>
            </TooltipTriggerBase>
            <TooltipContentBase side="top">
              Posicionado acima
            </TooltipContentBase>
          </TooltipBase>

          <TooltipBase>
            <TooltipTriggerBase>
              <ButtonBase variant="ghost">Tooltip Interativo</ButtonBase>
            </TooltipTriggerBase>
            <TooltipContentBase>
              <div className="flex flex-col gap-1">
                <span className="font-semibold">Título</span>
                <span className="text-sm">Texto com mais informações.</span>
                <a href="#" className="text-white dark:text-black underline text-xs">
                  Saiba mais
                </a>
              </div>
            </TooltipContentBase>
          </TooltipBase>
          <TooltipBase>
            <TooltipTriggerBase>
              <ButtonBase variant="ghost">Posição Right</ButtonBase>
            </TooltipTriggerBase>
            <TooltipContentBase side="right">
              Posicionado à direita
            </TooltipContentBase>
          </TooltipBase>
        </div>
      </TooltipProviderBase>

      <div className="my-8 mx-5">
        <h3 className="text-xl font-semibold mb-3">Documentação</h3>
        <div className="border-t-2 border-gray-300 mb-4"></div>

        <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Como importar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
              {`import {
  TooltipBase,
  TooltipContentBase,
  TooltipProviderBase,
  TooltipTriggerBase,
} from "@/components/ui/TooltipBase";`}
            </code>
          </pre>
        </div>

        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
              {`<TooltipProviderBase>
  <TooltipBase>
    <TooltipTriggerBase>Hover</TooltipTriggerBase>
    <TooltipContentBase>
      <p>Add to library</p>
    </TooltipContentBase>
  </TooltipBase>
</TooltipProviderBase>`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
