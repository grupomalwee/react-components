"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ButtonBase } from "@/components/ui/ButtonBase";
import { FormBase, FormControlBase, FormDescriptionBase, FormFieldBase, FormItemBase, FormLabelBase, FormMessageBase, } from "@/components/ui/FormBase";
import { InputBase } from "@/components/ui/InputBase";
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
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "mt-5 ml-5 flex flex-col gap-5 p-3 rounded-sm", children: _jsx(FormBase, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-8", children: [_jsx(FormFieldBase, { control: form.control, name: "username", render: ({ field }) => (_jsxs(FormItemBase, { children: [_jsx(FormLabelBase, { children: "Username" }), _jsx(FormControlBase, { children: _jsx(InputBase, { placeholder: "shadcn", ...field }) }), _jsx(FormDescriptionBase, { children: "This is your public display name." }), _jsx(FormMessageBase, {})] })) }), _jsx(ButtonBase, { type: "submit", children: "Submit" })] }) }) }), _jsxs("div", { className: "my-8 mx-5", children: [_jsx("h3", { className: "text-xl font-semibold mb-3", children: "Documenta\u00E7\u00E3o" }), _jsx("div", { className: "border-t-2 border-gray-300 mb-4" }), _jsxs("div", { className: "bg-gray-800 text-white p-4 rounded-md mb-4", children: [_jsx("h5", { className: "font-medium mb-2", children: "Como importar:" }), _jsx("pre", { className: "bg-gray-900 p-3 rounded-sm", children: _jsx("code", { children: `import { zodResolver } from "@hookform/resolvers/zod";
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
import { InputBase } from "@/components/ui/InputBase";` }) })] }), _jsxs("div", { className: "bg-gray-800 text-white p-4 rounded-md", children: [_jsx("h5", { className: "font-medium mb-2", children: "Como usar:" }), _jsx("pre", { className: "bg-gray-900 p-3 rounded-sm", children: _jsx("code", { children: `const formSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(50, "Username must be at most 50 characters"),
});

export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
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
}` }) })] })] })] }));
}
