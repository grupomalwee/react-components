"use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
import { ButtonBase } from "@/components/ui/ButtonBase";
import { InputBase } from "@/components/ui/InputBase";
import { MapPinLineIcon } from "@phosphor-icons/react";

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

  return (
    <>
      <div className="mt-5 ml-5 flex flex-col gap-5 p-3 rounded-sm">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <InputBase id="email" label="E-mail" placeholder="seu@email.com"/>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <InputBase id="picture" type="file" label="Picture"/>
        </div>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <InputBase type="email" placeholder="Email"/>
          <ButtonBase type="submit">Subscribe</ButtonBase>
        </div>
        <div>
          <InputBase disabled type="email" placeholder="Email" />
        </div>
        <div>
          <InputBase
            type="text"
            placeholder="Localização"
            label="Local"
            leftIcon={<MapPinLineIcon size={16} />}
          />
        </div>
        <div>
          <InputBase
            type="text"
            placeholder="Localização"
            label="Local"
            rightIcon={<MapPinLineIcon size={16} />}
          />
        </div>
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
              {`import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ButtonBase } from "@/components/ui/ButtonBase"
import { InputBase } from "@/components/ui/InputBase"
import  LabelBase  from "@/components/ui/LabelBase"`}
            </code>
          </pre>
        </div>

        {/* Bloco de Código para Uso */}
        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
              {`const FormSchema = z.object({
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
}`}
            </code>
          </pre>
        </div>
      </div>
    </>
  );
};
