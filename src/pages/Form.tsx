"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ButtonBase } from "@/components/ui/ButtonBase";
import {
  FormBase,
  FormControlBase,
  FormDescriptionBase,
  FormFieldBase,
  FormItemBase,
  FormLabelBase,
  FormMessageBase,
} from "@/components/ui/FormBase";
import { InputBase } from "@/components/ui/InputBase";
import { CheckboxBase } from "@/components/ui/CheckBoxBase";
import { SelectBase, SelectContentBase, SelectItemBase, SelectTriggerBase, SelectValueBase } from "@/components/ui/SelectBase";

const formSchema = z.object({
  username: z.string().min(2, "Mínimo 2 caracteres").max(50, "Máximo 50 caracteres"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha muito curta"),
  role: z.enum(["admin", "editor", "viewer"], { 
    required_error: "Selecione um papel",
  }),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "Você deve aceitar os termos.",
  }),
});

export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: undefined,
      acceptTerms: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <>
      {/* Form Component */}
      <div className="mt-5 ml-5 flex flex-col gap-5 p-3 rounded-sm">
        <FormBase {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Username */}
            <FormFieldBase
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItemBase>
                  <FormLabelBase>Username</FormLabelBase>
                  <FormControlBase>
                    <InputBase placeholder="Seu nome de usuário" {...field} />
                  </FormControlBase>
                  <FormDescriptionBase>Nome público do seu perfil.</FormDescriptionBase>
                  <FormMessageBase />
                </FormItemBase>
              )}
            />

            {/* Email */}
            <FormFieldBase
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItemBase>
                  <FormLabelBase>Email</FormLabelBase>
                  <FormControlBase>
                    <InputBase placeholder="email@dominio.com" type="email" {...field} />
                  </FormControlBase>
                  <FormDescriptionBase>Email profissional ou pessoal.</FormDescriptionBase>
                  <FormMessageBase />
                </FormItemBase>
              )}
            />

            {/* Password */}
            <FormFieldBase
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItemBase>
                  <FormLabelBase>Senha</FormLabelBase>
                  <FormControlBase>
                    <InputBase placeholder="********" type="password" {...field} />
                  </FormControlBase>
                  <FormDescriptionBase>Escolha uma senha segura.</FormDescriptionBase>
                  <FormMessageBase />
                </FormItemBase>
              )}
            />

            {/* Role */}
            <FormFieldBase
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItemBase>
                  <FormLabelBase>Papel</FormLabelBase>
                  <SelectBase onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControlBase>
                      <SelectTriggerBase>
                        <SelectValueBase placeholder="Selecione um papel" />
                      </SelectTriggerBase>
                    </FormControlBase>
                    <SelectContentBase>
                      <SelectItemBase value="admin">Admin</SelectItemBase>
                      <SelectItemBase value="editor">Editor</SelectItemBase>
                      <SelectItemBase value="viewer">Viewer</SelectItemBase>
                    </SelectContentBase>
                  </SelectBase>
                  <FormDescriptionBase>Defina seu papel no sistema.</FormDescriptionBase>
                  <FormMessageBase />
                </FormItemBase>
              )}
            />

            {/* Terms */}
            <FormFieldBase
              control={form.control}
              name="acceptTerms"
              render={({ field }) => (
                <FormItemBase>
                  <div className="flex items-center gap-2">
                    <FormControlBase>
                      <CheckboxBase
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControlBase>
                    <FormLabelBase>Aceito os termos e condições</FormLabelBase>
                  </div>
                  <FormMessageBase />
                </FormItemBase>
              )}
            />

            <ButtonBase type="submit">Enviar</ButtonBase>
          </form>
        </FormBase>
      </div>

      {/* Documentação */}
      <div className="my-8 mx-5">
        <h3 className="text-xl font-semibold mb-3">Documentação</h3>
        <div className="border-t-2 border-gray-300 mb-4"></div>

        {/* Importação */}
        <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Como importar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm overflow-x-auto">
            <code className="text-sm">
              {`import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ButtonBase } from "@/components/ui/ButtonBase";
import {
  FormBase,
  FormControlBase,
  FormDescriptionBase,
  FormFieldBase,
  FormItemBase,
  FormLabelBase,
  FormMessageBase,
} from "@/components/ui/FormBase";
import { InputBase } from "@/components/ui/InputBase";
import { CheckboxBase } from "@/components/ui/CheckBoxBase";
import {
  SelectBase,
  SelectContentBase,
  SelectItemBase,
  SelectTriggerBase,
  SelectValueBase,
} from "@/components/ui/SelectBase";`}
            </code>
          </pre>
        </div>

        {/* Como usar */}
        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm overflow-x-auto">
            <code className="text-sm">
              {`<FormBase {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    ...
    {/* Campos aqui */}
    <ButtonBase type="submit">Enviar</ButtonBase>
  </form>
</FormBase>`}
            </code>
          </pre>
        </div>
      </div>
    </>
  );
}
