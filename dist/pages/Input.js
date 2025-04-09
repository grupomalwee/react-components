"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
import { ButtonBase } from "@/components/ui/ButtonBase";
import { InputBase } from "@/components/ui/InputBase";
import LabelBase from "@/components/ui/LabelBase";
// const FormSchema = z.object({
//   username: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
// });
export const InputPage = () => {
    // const form = useForm<z.infer<typeof FormSchema>>({
    //   resolver: zodResolver(FormSchema),
    //   defaultValues: {
    //     username: "",
    //   },
    // });
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "mt-5 ml-5 flex flex-col gap-5 p-3 rounded-sm", children: [_jsxs("div", { className: "grid w-full max-w-sm items-center gap-1.5", children: [_jsx(LabelBase, { htmlFor: "email", children: "Email" }), _jsx(InputBase, { type: "email", id: "email", placeholder: "Email" })] }), _jsxs("div", { className: "grid w-full max-w-sm items-center gap-1.5", children: [_jsx(LabelBase, { htmlFor: "picture", children: "Picture" }), _jsx(InputBase, { id: "picture", type: "file" })] }), _jsxs("div", { className: "flex w-full max-w-sm items-center space-x-2", children: [_jsx(InputBase, { type: "email", placeholder: "Email" }), _jsx(ButtonBase, { type: "submit", children: "Subscribe" })] }), _jsx(InputBase, { disabled: true, type: "email", placeholder: "Email" })] }), _jsxs("div", { className: "my-8 mx-5", children: [_jsx("h3", { className: "text-xl font-semibold mb-3", children: "Documenta\u00E7\u00E3o" }), _jsx("div", { className: "border-t-2 border-gray-300 mb-4" }), _jsxs("div", { className: "bg-gray-800 text-white p-4 rounded-md mb-4", children: [_jsx("h5", { className: "font-medium mb-2", children: "Como importar:" }), _jsx("pre", { className: "bg-gray-900 p-3 rounded-sm", children: _jsx("code", { children: `import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ButtonBase } from "@/components/ui/ButtonBase"
import { InputBase } from "@/components/ui/InputBase"
import  LabelBase  from "@/components/ui/LabelBase"` }) })] }), _jsxs("div", { className: "bg-gray-800 text-white p-4 rounded-md", children: [_jsx("h5", { className: "font-medium mb-2", children: "Como usar:" }), _jsx("pre", { className: "bg-gray-900 p-3 rounded-sm", children: _jsx("code", { children: `const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export const InputPage = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  })

  return (
    <div className="mt-5 ml-5 flex gap-5 p-3 rounded-sm">
      <div className="mt-5 ml-5 flex gap-5 h-20 p-3 rounded-sm">
        <InputBase type="email" placeholder="Email" />
        <InputBase disabled type="email" placeholder="Email" />
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <LabelBase htmlFor="picture">Picture</LabelBase>
          <InputBase id="picture" type="file" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <LabelBase htmlFor="email">Email</LabelBase>
          <InputBase type="email" id="email" placeholder="Email" />
        </div>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <InputBase type="email" placeholder="Email" />
          <ButtonBase type="submit">Subscribe</ButtonBase>
        </div>
      </div>
    </div>
  )
}` }) })] })] })] }));
};
