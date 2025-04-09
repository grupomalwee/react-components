import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ButtonBase } from "@/components/ui/ButtonBase";
import { CardBase, CardContentBase, CardDescriptionBase, CardFooterBase, CardHeaderBase, CardTitleBase, } from "@/components/ui/CardBase";
import { InputBase } from "@/components/ui/InputBase";
import LabelBase from "@/components/ui/LabelBase";
import { SelectBase, SelectContentBase, SelectItemBase, SelectTriggerBase, SelectValueBase, } from "@/components/ui/SelectBase";
export const CardPage = () => {
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "mt-5 ml-5 flex flex-col gap-5 p-3 rounded-sm", children: _jsxs(CardBase, { className: "w-[350px]", children: [_jsxs(CardHeaderBase, { children: [_jsx(CardTitleBase, { children: "Create project" }), _jsx(CardDescriptionBase, { children: "Deploy your new project in one-click." })] }), _jsx(CardContentBase, { children: _jsx("form", { children: _jsxs("div", { className: "grid w-full items-center gap-4", children: [_jsxs("div", { className: "flex flex-col space-y-1.5", children: [_jsx(LabelBase, { htmlFor: "name", children: "Name" }), _jsx(InputBase, { id: "name", placeholder: "Name of your project" })] }), _jsxs("div", { className: "flex flex-col space-y-1.5", children: [_jsx(LabelBase, { htmlFor: "framework", children: "Framework" }), _jsxs(SelectBase, { children: [_jsx(SelectTriggerBase, { id: "framework", children: _jsx(SelectValueBase, { placeholder: "Select" }) }), _jsxs(SelectContentBase, { position: "popper", children: [_jsx(SelectItemBase, { value: "next", children: "Next.js" }), _jsx(SelectItemBase, { value: "sveltekit", children: "SvelteKit" }), _jsx(SelectItemBase, { value: "astro", children: "Astro" }), _jsx(SelectItemBase, { value: "nuxt", children: "Nuxt.js" })] })] })] })] }) }) }), _jsxs(CardFooterBase, { className: "flex justify-between", children: [_jsx(ButtonBase, { variant: "outline", children: "Cancel" }), _jsx(ButtonBase, { children: "Deploy" })] })] }) }), _jsxs("div", { className: "my-8 mx-5", children: [_jsx("h3", { className: "text-xl font-semibold mb-3", children: "Documenta\u00E7\u00E3o" }), _jsx("div", { className: "border-t-2 border-gray-300 mb-4" }), _jsxs("div", { className: "bg-gray-800 text-white p-4 rounded-md mb-4", children: [_jsx("h5", { className: "font-medium mb-2", children: "Como importar:" }), _jsx("pre", { className: "bg-gray-900 p-3 rounded-sm", children: _jsx("code", { children: `import {
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
} from "@/components/ui/SelectBase";` }) })] }), _jsxs("div", { className: "bg-gray-800 text-white p-4 rounded-md", children: [_jsx("h5", { className: "font-medium mb-2", children: "Como usar:" }), _jsx("pre", { className: "bg-gray-900 p-3 rounded-sm", children: _jsx("code", { children: `<CardBase className="w-[350px]">
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
</CardBase>` }) })] })] })] }));
};
