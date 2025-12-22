"use client";

import { Combobox } from "@/components/ui/selects/Combobox";
import { useState } from "react";

export const ComboboxPage = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="mt-5 ml-5 flex flex-col gap-5 p-3 rounded-sm">
      <div className="flex gap-5 justify-center">
        <Combobox
          className="w-40"
          label="Selecione seu cargo"
          items={[
            {
              label: "Desenvolvedor eduardo ronchi de araujo",
              value: "dev",
            },
            { label: "Designer", value: "designer" },
            { label: "Product Owner", value: "po" },
            { label: "Scrum Master", value: "scrum" },
            { label: "Tech Lead", value: "techlead" },
          ]}
          selected={selected}
          onChange={setSelected}
          placeholder="Escolha uma opção"
          searchPlaceholder="Buscar cargo..."
          testIds={{
            root: "combobox-root",
            selected: "combobox-selected",
            group: "combobox-group",
            popover: "combobox-popover",
          }}
        />
      </div>

      <div className="my-8 mx-5">
        <h3 className="text-xl font-semibold mb-3">Documentação</h3>
        <div className="border-t-2 border-gray-300 mb-4"></div>

        <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Como importar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
              {`import { Combobox } from "@/components/selects/Combobox";`}
            </code>
          </pre>
        </div>

        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
              {`<Combobox
  label="Selecione seu cargo"
  items={[
    { label: "Desenvolvedor", value: "dev" },
    { label: "Designer", value: "designer" },
    { label: "Product Owner", value: "po" },
    { label: "Scrum Master", value: "scrum" },
    { label: "Tech Lead", value: "techlead" },
  ]}
  selected={selected}
  onChange={setSelected}
  placeholder="Escolha uma opção"
  searchPlaceholder="Buscar cargo..."
/>`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
