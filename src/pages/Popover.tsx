"use client";

import { ButtonBase } from "@/components/ui/form/ButtonBase";
import { InputBase } from "@/components/ui/form/InputBase";
import LabelBase from "@/components/ui/form/LabelBase";
import {
  PopoverBase,
  PopoverContentBase,
  PopoverTriggerBase,
} from "@/components/ui/overlays/PopoverBase";

export function PopoverPage() {
  return (
    <>
      <div className="mt-5 ml-5 flex flex-col gap-10 max-w-xl">
        <div className="flex gap-5 h-11 p-3 rounded-sm">
          <PopoverBase>
            <PopoverTriggerBase asChild>
              <ButtonBase variant="outline" className="p-4">
                Open popover
              </ButtonBase>
            </PopoverTriggerBase>
            <PopoverContentBase className="w-96 ml-64">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Dimensions</h4>
                  <p className="text-sm text-muted-foreground">
                    Set the dimensions for the layer.
                  </p>
                </div>
                <div className="grid gap-2">
                  {[
                    { label: "Width", id: "width", defaultValue: "100%" },
                    {
                      label: "Max. width",
                      id: "maxWidth",
                      defaultValue: "300px",
                    },
                    { label: "Height", id: "height", defaultValue: "25px" },
                    {
                      label: "Max. height",
                      id: "maxHeight",
                      defaultValue: "none",
                    },
                  ].map(({ label, id, defaultValue }) => (
                    <div
                      key={id}
                      className="grid grid-cols-3 items-center gap-4"
                    >
                      <LabelBase htmlFor={id}>{label}</LabelBase>
                      <InputBase
                        id={id}
                        defaultValue={defaultValue}
                        className="col-span-2 h-8"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContentBase>
          </PopoverBase>
        </div>

        <div className="flex gap-5 h-11 p-3 rounded-sm">
          <PopoverBase>
            <PopoverTriggerBase asChild>
              <ButtonBase variant="outline" className="p-4">
                Login rápido
              </ButtonBase>
            </PopoverTriggerBase>
            <PopoverContentBase className="w-72 ml-40 py-6 px-5 ">
              <form>
                <div>
                  <InputBase
                    label="Email"
                    type="email"
                    id="email"
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                <div className="mt-3">
                  <InputBase
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    required
                    label="Senha"
                  />
                </div>

                <ButtonBase type="submit" className="w-full mt-6">
                  Entrar
                </ButtonBase>
              </form>
            </PopoverContentBase>
          </PopoverBase>
        </div>

        <div className="flex gap-5 h-11 p-3 rounded-sm">
          <PopoverBase>
            <PopoverTriggerBase asChild>
              <ButtonBase variant="outline" className="p-4">
                Lista grande
              </ButtonBase>
            </PopoverTriggerBase>
            <PopoverContentBase className="w-60 max-h-40 overflow-auto ml-36 p-3 space-y-1">
              {[...Array(20).keys()].map((i) => (
                <div
                  key={i}
                  className="px-3 py-2 rounded cursor-pointer"
                  onClick={() => alert(`Item ${i + 1} clicado`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      alert(`Item ${i + 1} clicado`);
                    }
                  }}
                >
                  Item #{i + 1}
                </div>
              ))}
            </PopoverContentBase>
          </PopoverBase>
        </div>
      </div>

      {/* Documentação */}
      <div className="my-8 mx-5 max-w-xl">
        <h3 className="text-xl font-semibold mb-3">Documentação</h3>
        <div className="border-t-2 border-gray-300 mb-4" />

        {/* Import */}
        <div className="bg-gray-800 text-white p-4 rounded-md mb-4 overflow-x-auto">
          <h5 className="font-medium mb-2">Como importar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm whitespace-pre-wrap">
            <code>{`import { ButtonBase } from "@/components/ui/ButtonBase";
import { InputBase } from "@/components/ui/InputBase";
import LabelBase from "@/components/ui/LabelBase";
import {
  PopoverBase,
  PopoverContentBase,
  PopoverTriggerBase,
} from "@/components/ui/PopoverBase";`}</code>
          </pre>
        </div>

        {/* Uso */}
        <div className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
          <h5 className="font-medium mb-2">Como usar (exemplo básico):</h5>
          <pre className="bg-gray-900 p-3 rounded-sm whitespace-pre-wrap">
            <code>{`<PopoverBase>
  <PopoverTriggerBase asChild>
    <ButtonBase variant="outline">Open popover</ButtonBase>
  </PopoverTriggerBase>
  <PopoverContentBase className="w-80">
    {/* conteúdo aqui */}
  </PopoverContentBase>
</PopoverBase>`}</code>
          </pre>
        </div>

        <div className="bg-gray-800 text-white p-4 rounded-md mt-4 overflow-x-auto">
          <h5 className="font-medium mb-2">Como usar (formulário rápido):</h5>
          <pre className="bg-gray-900 p-3 rounded-sm whitespace-pre-wrap">
            <code>{`<PopoverBase>
  <PopoverTriggerBase asChild>
    <ButtonBase variant="secondary">Login rápido</ButtonBase>
  </PopoverTriggerBase>
  <PopoverContentBase className="w-72 p-5 space-y-4">
    <form onSubmit={handleSubmit}>
      <LabelBase htmlFor="email">Email</LabelBase>
      <InputBase id="email" placeholder="seu@email.com" type="email" required />
      <LabelBase htmlFor="password">Senha</LabelBase>
      <InputBase id="password" placeholder="••••••" type="password" required />
      <ButtonBase type="submit" className="w-full">Entrar</ButtonBase>
    </form>
  </PopoverContentBase>
</PopoverBase>`}</code>
          </pre>
        </div>

        <div className="bg-gray-800 text-white p-4 rounded-md mt-4 overflow-x-auto">
          <h5 className="font-medium mb-2">Como usar (menu):</h5>
          <pre className="bg-gray-900 p-3 rounded-sm whitespace-pre-wrap">
            <code>{`<PopoverBase>
  <PopoverTriggerBase asChild>
    <ButtonBase variant="ghost">Menu</ButtonBase>
  </PopoverTriggerBase>
  <PopoverContentBase className="w-48 p-2 space-y-1">
    <button onClick={handleClick} className="w-full text-left px-3 py-2 hover:bg-gray-200">Perfil</button>
    <button onClick={handleClick} className="w-full text-left px-3 py-2 hover:bg-gray-200">Configurações</button>
    <button onClick={handleClick} className="w-full text-left px-3 py-2 hover:bg-gray-200">Sair</button>
  </PopoverContentBase>
</PopoverBase>`}</code>
          </pre>
        </div>

        <div className="bg-gray-800 text-white p-4 rounded-md mt-4 overflow-x-auto">
          <h5 className="font-medium mb-2">Como usar (lista scrollável):</h5>
          <pre className="bg-gray-900 p-3 rounded-sm whitespace-pre-wrap">
            <code>{`<PopoverBase>
  <PopoverTriggerBase asChild>
    <ButtonBase variant="outline">Lista grande</ButtonBase>
  </PopoverTriggerBase>
  <PopoverContentBase className="w-60 max-h-40 overflow-auto p-3 space-y-2">
    {/* Itens clicáveis */}
  </PopoverContentBase>
</PopoverBase>`}</code>
          </pre>
        </div>
      </div>
    </>
  );
}
