"use client";

import { ButtonBase } from "@/components/ui/ButtonBase";
import { InputBase } from "@/components/ui/InputBase";
import LabelBase from "@/components/ui/LabelBase";
import {
  SheetBase,
  SheetCloseBase,
  SheetContentBase,
  SheetDescriptionBase,
  SheetFooterBase,
  SheetHeaderBase,
  SheetTitleBase,
  SheetTriggerBase,
} from "@/components/ui/SheetBase";

export const SheetPage = () => {
  return (
    <div className="flex flex-col gap-10 m-6">

      {/* ✅ Sheet Básico */}
      <div className="flex gap-5">
        <SheetBase>
          <SheetTriggerBase asChild>
            <ButtonBase variant="outline">Abrir Sheet Básico</ButtonBase>
          </SheetTriggerBase>
          <SheetContentBase side="right">
            <SheetHeaderBase>
              <SheetTitleBase>Editar Perfil</SheetTitleBase>
              <SheetDescriptionBase>
                Altere as informações do seu perfil aqui. Clique em salvar quando terminar.
              </SheetDescriptionBase>
            </SheetHeaderBase>
            <div className="grid gap-4 py-4">
              {[
                { id: "name", label: "Name", value: "Pedro Duarte" },
                { id: "username", label: "Username", value: "@peduarte" },
                { id: "password", label: "Password", value: "*********" },
                { id: "surname", label: "Surname", value: "Duarte" },
              ].map(({ id, label, value }) => (
                <div key={id} className="grid grid-cols-4 items-center gap-4">
                  <LabelBase htmlFor={id} className="text-right">
                    {label}
                  </LabelBase>
                  <InputBase id={id} defaultValue={value} className="col-span-3" />
                </div>
              ))}
            </div>
            <SheetFooterBase>
              <SheetCloseBase asChild>
                <ButtonBase type="submit">Salvar alterações</ButtonBase>
              </SheetCloseBase>
            </SheetFooterBase>
          </SheetContentBase>
        </SheetBase>
      </div>

      {/* 🚀 Sheet Detalhado (Resumo/Informações) */}
      <div className="flex gap-5">
        <SheetBase>
          <SheetTriggerBase asChild>
            <ButtonBase variant="outline">Abrir Detalhes</ButtonBase>
          </SheetTriggerBase>
          <SheetContentBase side="left">
            <SheetHeaderBase>
              <SheetTitleBase>Resumo da Conta</SheetTitleBase>
              <SheetDescriptionBase>
                Informações rápidas sobre sua conta.
              </SheetDescriptionBase>
            </SheetHeaderBase>
            <div className="flex flex-col gap-3 py-4">
              <div>
                <p className="text-sm text-muted-foreground">Email:</p>
                <p className="font-medium">peduarte@email.com</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Plano:</p>
                <p className="font-medium">Premium</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status:</p>
                <p className="font-medium text-green-600">Ativo</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Último Login:</p>
                <p className="font-medium">15/06/2025 - 14:32</p>
              </div>
            </div>
            <SheetFooterBase>
              <SheetCloseBase asChild>
                <ButtonBase variant="destructive">Encerrar Sessão</ButtonBase>
              </SheetCloseBase>
            </SheetFooterBase>
          </SheetContentBase>
        </SheetBase>
      </div>

      {/* Documentation Section */}
      <div className="my-8 mx-5">
        <h3 className="text-xl font-semibold mb-3">Documentação</h3>
        <div className="border-t-2 border-gray-300 mb-4"></div>

        {/* Code Block for Importing */}
        <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Como importar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
              {`import {
  ButtonBase
} from "@/components/ui/ButtonBase";
import { InputBase } from "@/components/ui/InputBase";
import  LabelBase  from "@/components/ui/LabelBase";
import {
  SheetBase,
  SheetCloseBase,
  SheetContentBase,
  SheetDescriptionBase,
  SheetFooterBase,
  SheetHeaderBase,
  SheetTitleBase,
  SheetTriggerBase,
} from "@/components/ui/SheetBase";`}
            </code>
          </pre>
        </div>

        {/* Code Block for Usage */}
        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
              {`<SheetBase>
  <SheetTriggerBase asChild>
    <ButtonBase variant="outline">Open</ButtonBase>
  </SheetTriggerBase>
  <SheetContentBase>
    <SheetHeaderBase>
      <SheetTitleBase>Edit profile</SheetTitleBase>
      <SheetDescriptionBase>
        Make changes to your profile here. Click save when you're done.
      </SheetDescriptionBase>
    </SheetHeaderBase>
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <LabelBase htmlFor="name" className="text-right">
          Name
        </LabelBase>
        <InputBase
          id="name"
          value="Pedro Duarte"
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <LabelBase htmlFor="username" className="text-right">
          Username
        </LabelBase>
        <InputBase
          id="username"
          value="@peduarte"
          className="col-span-3"
        />
      </div>
    </div>
    <SheetFooterBase>
      <SheetCloseBase asChild>
        <ButtonBase type="submit">Save changes</ButtonBase>
      </SheetCloseBase>
    </SheetFooterBase>
  </SheetContentBase>
</SheetBase>`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
