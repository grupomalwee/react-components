"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ButtonBase } from "@lib";
import {
  FormBase,
  FormControlBase,
  FormDescriptionBase,
  FormFieldBase,
  FormItemBase,
  FormLabelBase,
  FormMessageBase,
} from "@lib";
import { InputBase } from "@lib";

const formSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(50, "Username must be at most 50 characters"),
});

export function ProfileForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <>
      {/* Form Component */}
      <div className="mt-5 ml-5 flex flex-col gap-5 p-3 rounded-sm">
        <FormBase {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormFieldBase
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItemBase>
                  <FormLabelBase>Username</FormLabelBase>
                  <FormControlBase>
                    <InputBase placeholder="shadcn" {...field} />
                  </FormControlBase>
                  <FormDescriptionBase>
                    This is your public display name.
                  </FormDescriptionBase>
                  <FormMessageBase />
                </FormItemBase>
              )}
            />
            <ButtonBase type="submit">Submit</ButtonBase>
          </form>
        </FormBase>
      </div>

      {/* Linha separadora e Título de Documentação */}
      <div className="my-8 mx-5">
        <h3 className="text-xl font-semibold mb-3">Documentação</h3>
        <div className="border-t-2 border-gray-300 mb-4"></div>

        {/* Bloco de Código para Importação */}
        <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Como importar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
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
import { InputBase } from "@/components/ui/InputBase";`}
            </code>
          </pre>
        </div>

        {/* Bloco de Código para Uso */}
        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
              {`const formSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(50, "Username must be at most 50 characters"),
});

export function ProfileForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <FormBase {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormFieldBase
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItemBase>
              <FormLabelBase>Username</FormLabelBase>
              <FormControlBase>
                <InputBase placeholder="shadcn" {...field} />
              </FormControlBase>
              <FormDescriptionBase>
                This is your public display name.
              </FormDescriptionBase>
              <FormMessageBase />
            </FormItemBase>
          )}
        />
        <ButtonBase type="submit">Submit</ButtonBase>
      </form>
    </FormBase>
  );
}`}
            </code>
          </pre>
        </div>
      </div>
    </>
  );
}
