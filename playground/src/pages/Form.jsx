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
  );
}
