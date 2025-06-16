import { ButtonBase } from "@/components/ui/ButtonBase";
import {
  CardBase,
  CardContentBase,
  CardDescriptionBase,
  CardFooterBase,
  CardHeaderBase,
  CardTitleBase,
} from "@/components/ui/CardBase";

import { InputBase } from "@/components/ui/InputBase";
import LabelBase from "@/components/ui/LabelBase";

import {
  SelectBase,
  SelectContentBase,
  SelectItemBase,
  SelectTriggerBase,
  SelectValueBase,
} from "@/components/ui/SelectBase";

export const CardPage = () => {
  return (
    <div className="flex gap-20">
      <div className="mt-5 ml-5 flex flex-col gap-10 p-3 rounded-sm">
        <CardBase className="w-full max-w-sm">
          <CardHeaderBase>
            <CardTitleBase>Create project</CardTitleBase>
            <CardDescriptionBase>
              Deploy your new project in one-click.
            </CardDescriptionBase>
          </CardHeaderBase>
          <CardContentBase>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <LabelBase htmlFor="name">Name</LabelBase>
                  <InputBase id="name" placeholder="Name of your project" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <LabelBase htmlFor="framework">Framework</LabelBase>
                  <SelectBase>
                    <SelectTriggerBase id="framework">
                      <SelectValueBase placeholder="Select" />
                    </SelectTriggerBase>
                    <SelectContentBase position="popper">
                      <SelectItemBase value="next">Next.js</SelectItemBase>
                      <SelectItemBase value="sveltekit">
                        SvelteKit
                      </SelectItemBase>
                      <SelectItemBase value="astro">Astro</SelectItemBase>
                      <SelectItemBase value="nuxt">Nuxt.js</SelectItemBase>
                    </SelectContentBase>
                  </SelectBase>
                </div>
              </div>
            </form>
          </CardContentBase>
          <CardFooterBase className="flex justify-between">
            <ButtonBase variant="outline">Cancel</ButtonBase>
            <ButtonBase>Deploy</ButtonBase>
          </CardFooterBase>
        </CardBase>

        <CardBase className="w-full max-w-sm border border-gray-300 shadow-sm">
          <CardHeaderBase>
            <CardTitleBase>Outlined card</CardTitleBase>
            <CardDescriptionBase>Simples e elegante</CardDescriptionBase>
          </CardHeaderBase>
          <CardContentBase>
            <p className="text-sm text-muted-foreground">
              Útil para listas, opções ou layouts com pouco destaque.
            </p>
          </CardContentBase>
        </CardBase>

        <CardBase className="w-full max-w-sm overflow-hidden">
          <img
            src="public/pwa-512x512.png"
            alt="tech"
            className="w-full h-40 object-cover"
          />
          <CardHeaderBase>
            <CardTitleBase>Com imagem</CardTitleBase>
            <CardDescriptionBase>Composição visual</CardDescriptionBase>
          </CardHeaderBase>
          <CardContentBase>
            <p className="text-sm text-muted-foreground">
              Use como preview, produto ou artigo.
            </p>
          </CardContentBase>
        </CardBase>

        <CardBase className="w-full max-w-sm relative border">
          <span className="absolute top-2 right-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
            Online
          </span>
          <CardHeaderBase>
            <CardTitleBase>Status do Usuário</CardTitleBase>
          </CardHeaderBase>
          <CardContentBase>
            <p className="text-sm">Usuário conectado ao sistema.</p>
          </CardContentBase>
        </CardBase>
      </div>

      <div className="my-8 mx-5">
        <h3 className="text-xl font-semibold mb-3">Documentação</h3>
        <div className="border-t-2 border-gray-300 mb-4"></div>

        <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Como importar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm overflow-x-auto">
            <code>
              {`import {
  ButtonBase,
  CardBase,
  CardContentBase,
  CardDescriptionBase,
  CardFooterBase,
  CardHeaderBase,
  CardTitleBase
} from "@/components/ui/CardBase";

import { InputBase } from "@/components/ui/InputBase";
import LabelBase from "@/components/ui/LabelBase";
import {
  SelectBase,
  SelectContentBase,
  SelectItemBase,
  SelectTriggerBase,
  SelectValueBase
} from "@/components/ui/SelectBase";`}
            </code>
          </pre>
        </div>

        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm overflow-x-auto">
            <code>{`<CardBase className="w-full max-w-sm border shadow">
  <CardHeaderBase>
    <CardTitleBase>Exemplo</CardTitleBase>
    <CardDescriptionBase>Descrição opcional</CardDescriptionBase>
  </CardHeaderBase>
  <CardContentBase>
    <p>Conteúdo do card</p>
  </CardContentBase>
</CardBase>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
