"use client";

import { MultiCombobox } from "@/components/selects/MultiCombobox";
import { useState } from "react";

export const MultiComboboxPage = () => {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <div className="mt-5 ml-5 flex flex-col gap-5 p-3 rounded-sm">
      <div className="flex gap-5 justify-center w-96">
        <MultiCombobox
          label="Selecione os cargos"
          className="w-40"
          items={[
            { label: "Desenvolvedor junio eduardo ronchi de araujo", value: "dev" },
            { label: "Designer", value: "designer" },
            { label: "Product Owner", value: "po" },
            { label: "Scrum Master", value: "scrum" },
            { label: "Tech Lead", value: "765" },
            { label: "Tech453 Lead", value: "534" },
            { label: "Tec5345Lead", value: "techlead" },
            { label: "Tech 3534Lead", value: "543" },
          ]}
          selected={selected}
          onChange={setSelected}
          placeholder="Escolha os cargos"
          searchPlaceholder="Buscar cargo..."
        />
      </div>

      <div className="my-8 mx-5">
        <h3 className="text-xl font-semibold mb-3">Documentação</h3>
        <div className="border-t-2 border-gray-300 mb-4"></div>

        <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Como importar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
              {`import { MultiCombobox } from "@/components/selects/MultiCombobox";`}
            </code>
          </pre>
        </div>

        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
              {`<MultiCombobox
  label="Selecione os cargos"
  items={[
    { label: "Desenvolvedor", value: "dev" },
    { label: "Designer", value: "designer" },
    { label: "Product Owner", value: "po" },
    { label: "Scrum Master", value: "scrum" },
    { label: "Tech Lead", value: "techlead" },
  ]}
  selected={selected}
  onChange={setSelected}
  placeholder="Escolha os cargos"
  searchPlaceholder="Buscar cargo..."
/>`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
