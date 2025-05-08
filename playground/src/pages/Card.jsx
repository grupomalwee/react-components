import { ButtonBase } from "@lib";
import {
  CardBase,
  CardContentBase,
  CardDescriptionBase,
  CardFooterBase,
  CardHeaderBase,
  CardTitleBase,
} from "@lib";

import { InputBase } from "@lib";
import  {LabelBase } from "@lib";

import {
  SelectBase,
  SelectContentBase,
  SelectItemBase,
  SelectTriggerBase,
  SelectValueBase,
} from "@lib";

export const CardPage = () => {
  return (
    <div>
      <div className="mt-5 ml-5 flex flex-col gap-5 p-3 rounded-sm">
        <CardBase className="w-[350px]">
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
      </div>

      <div className="my-8 mx-5">
        <h3 className="text-xl font-semibold mb-3">Documentação</h3>
        <div className="border-t-2 border-gray-300 mb-4"></div>

        <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Como importar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
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
import  LabelBase  from "@/components/ui/LabelBase";
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

        {/* Bloco de Código para Uso */}
        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
              {`<CardBase className="w-[350px]">
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
              <SelectItemBase value="sveltekit">SvelteKit</SelectItemBase>
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
</CardBase>`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
