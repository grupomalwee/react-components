"use client";

import React from "react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { ButtonBase } from "@/components/ui/ButtonBase";
import {
  InputOTPBase,
  InputOTPGroupBase,
  InputOTPSeparatorBase,
  InputOTPSlotBase,
} from "@/components/ui/Input-OTP-Base";
import {
  FormBase,
  FormControlBase,
  FormDescriptionBase,
  FormFieldBase,
  FormItemBase,
  FormLabelBase,
  FormMessageBase,
} from "@/components/ui/FormBase";

const FormSchema = z.object({
  pin: z
    .string()
    .min(6, { message: "Your one-time password must be 6 characters." }),
});

export default function InputOTPPage() {
  const [controlledValue, setControlledValue] = React.useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { pin: "" },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <main className="p-8 max-w-6xl mx-auto space-y-16">
      
      {/* Grid layout: 2 col on md+, 1 col on sm */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Basic InputOTP */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Basic InputOTP Demo</h2>
          <InputOTPBase maxLength={6} className="justify-center flex gap-1.5">
            <InputOTPGroupBase className="flex gap-1">
              <InputOTPSlotBase index={0} />
              <InputOTPSlotBase index={1} />
              <InputOTPSlotBase index={2} />
            </InputOTPGroupBase>
            <InputOTPSeparatorBase />
            <InputOTPGroupBase className="flex gap-1">
              <InputOTPSlotBase index={3} />
              <InputOTPSlotBase index={4} />
              <InputOTPSlotBase index={5} />
            </InputOTPGroupBase>
          </InputOTPBase>
        </div>

        {/* InputOTP Pattern */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">
            InputOTP Pattern (Alfanumérico)
          </h2>
          <InputOTPBase
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            className="flex justify-center gap-1"
          >
            <InputOTPGroupBase className="flex gap-1">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlotBase key={i} index={i} />
              ))}
            </InputOTPGroupBase>
          </InputOTPBase>
        </div>
      </section>

      {/* Separators example + Controlled input side by side */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-2xl font-semibold mb-6">InputOTP with Separators</h2>
          <InputOTPBase maxLength={6} className="flex justify-center gap-1">
            <InputOTPGroupBase className="flex gap-1">
              <InputOTPSlotBase index={0} />
              <InputOTPSlotBase index={1} />
            </InputOTPGroupBase>
            <InputOTPSeparatorBase />
            <InputOTPGroupBase className="flex gap-1">
              <InputOTPSlotBase index={2} />
              <InputOTPSlotBase index={3} />
            </InputOTPGroupBase>
            <InputOTPSeparatorBase />
            <InputOTPGroupBase className="flex gap-1">
              <InputOTPSlotBase index={4} />
              <InputOTPSlotBase index={5} />
            </InputOTPGroupBase>
          </InputOTPBase>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Controlled InputOTP</h2>
          <div className="space-y-3 max-w-xs mx-auto">
            <InputOTPBase
              maxLength={6}
              value={controlledValue}
              onChange={setControlledValue}
              className="flex justify-center gap-1"
            >
              <InputOTPGroupBase className="flex gap-1">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <InputOTPSlotBase key={i} index={i} />
                ))}
              </InputOTPGroupBase>
            </InputOTPBase>
            <p className="text-center text-sm text-gray-400">
              {controlledValue === ""
                ? "Enter your one-time password."
                : `You entered: ${controlledValue}`}
            </p>
          </div>
        </div>
      </section>

      {/* React Hook Form section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">InputOTP with React Hook Form</h2>
        <FormBase {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-md  space-y-6"
          >
            <FormFieldBase
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItemBase>
                  <FormLabelBase>One-Time Password</FormLabelBase>
                  <FormControlBase>
                    <InputOTPBase maxLength={6} {...field} className="flex justify-center gap-1">
                      <InputOTPGroupBase className="flex gap-1">
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                          <InputOTPSlotBase key={i} index={i} />
                        ))}
                      </InputOTPGroupBase>
                    </InputOTPBase>
                  </FormControlBase>
                  <FormDescriptionBase>
                    Please enter the one-time password sent to your phone.
                  </FormDescriptionBase>
                  <FormMessageBase />
                </FormItemBase>
              )}
            />
            <ButtonBase type="submit" className="w-full">
              Submit
            </ButtonBase>
          </form>
        </FormBase>
      </section>

      {/* Documentação embutida */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Documentação</h2>
        <div className="space-y-8 max-w-4xl mx-auto">
          <div>
            <h3 className="text-xl font-semibold mb-3">Como importar</h3>
            <pre className="bg-zinc-900 text-zinc-100 text-sm rounded-md p-4 overflow-auto">
              <code>{`"use client"

import React from "react"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

import {
  InputOTPBase,
  InputOTPGroupBase,
  InputOTPSeparatorBase,
  InputOTPSlotBase,
} from "@/components/ui/Input-OTP-Base"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { z } from "zod"`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Como usar</h3>
            <pre className="bg-zinc-900 text-zinc-100 text-sm rounded-md p-4 overflow-auto">
              <code>{`<InputOTPBase maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
  <InputOTPGroupBase>
    {[0,1,2,3,4,5].map(i => (
      <InputOTPSlotBase key={i} index={i} />
    ))}
  </InputOTPGroupBase>
</InputOTPBase>

// Controle de estado (exemplo controlado)
const [value, setValue] = React.useState("")
<InputOTPBase maxLength={6} value={value} onChange={setValue}>
  <InputOTPGroupBase>
    {[0,1,2,3,4,5].map(i => (
      <InputOTPSlotBase key={i} index={i} />
    ))}
  </InputOTPGroupBase>
</InputOTPBase>

// Com React Hook Form e validação Zod
<FormBase {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormFieldBase
      control={form.control}
      name="pin"
      render={({ field }) => (
        <FormItemBase>
          <FormLabelBase>One-Time Password</FormLabelBase>
          <FormControlBase>
            <InputOTPBase maxLength={6} {...field}>
              <InputOTPGroupBase>
                {[0,1,2,3,4,5].map(i => (
                  <InputOTPSlotBase key={i} index={i} />
                ))}
              </InputOTPGroupBase>
            </InputOTPBase>
          </FormControlBase>
          <FormDescriptionBase>
            Please enter the one-time password sent to your phone.
          </FormDescriptionBase>
          <FormMessageBase />
        </FormItemBase>
      )}
    />
    <ButtonBase type="submit">Submit</ButtonBase>
  </form>
</FormBase>`}</code>
            </pre>
          </div>
        </div>
      </section>
    </main>
  );
}
