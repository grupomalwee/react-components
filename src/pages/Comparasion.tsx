"use client";

import { useState } from "react";
import { ButtonBase } from "@/components/ui/ButtonBase";
import { InputBase } from "@/components/ui/InputBase";
import { Combobox } from "@/components/selects/Combobox";
import { MultiCombobox } from "@/components/selects/MultiCombobox";

const cargos = [
  { label: "Desenvolvedor", value: "dev" },
  { label: "Designer", value: "designer" },
  { label: "Product Owner", value: "po" },
  { label: "Scrum Master", value: "scrum" },
  { label: "Tech Lead", value: "techlead" },
];

function ComparisonRowGrid({
  selected,
  setSelected,
  selectedMulti,
  setSelectedMulti,
  inputValue,
  setInputValue,
}: Props) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full bg-red-500">
      <Combobox
        items={cargos}
        selected={selected}
        onChange={setSelected}
        placeholder="Escolha uma opção"
        searchPlaceholder="Buscar cargo..."
      />
      <MultiCombobox
        items={cargos}
        selected={selectedMulti}
        onChange={setSelectedMulti}
        placeholder="Escolha os cargos"
        searchPlaceholder="Buscar cargo..."
      />
      <InputBase
        placeholder="Digite algo..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <ButtonBase>Comparar</ButtonBase>
      
    </section>
  );
}

function ComparisonRowFlex({
  selected,
  setSelected,
  selectedMulti,
  setSelectedMulti,
  inputValue,
  setInputValue,
}: Props) {
  return (
    <section className="flex gap-6 w-full bg-red-500">
      <Combobox
        items={cargos}
        selected={selected}
        onChange={setSelected}
        placeholder="Escolha uma opção"
        searchPlaceholder="Buscar cargo..."
      />

      <MultiCombobox
        items={cargos}
        selected={selectedMulti}
        onChange={setSelectedMulti}
        placeholder="Escolha os cargos"
        searchPlaceholder="Buscar cargo..."
      />
      <InputBase
        type="number"
        placeholder="Digite algo..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <ButtonBase>Comparar</ButtonBase>
      <ButtonBase variant="outline">Comparar</ButtonBase>
      <ButtonBase variant="ghost">Comparar</ButtonBase>
      <ButtonBase variant="destructive">Comparar</ButtonBase>
      <ButtonBase variant="link">Comparar</ButtonBase>
      <ButtonBase variant="secondary">Comparar</ButtonBase>
    </section>
  );
}

type Props = {
  selected: string | null;
  setSelected: (v: string | null) => void;
  selectedMulti: string[];
  setSelectedMulti: (v: string[]) => void;
  inputValue: string;
  setInputValue: (v: string) => void;
};

export default function Comparison() {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [selected1, setSelected1] = useState<string[]>([]);

  return (
    <main className=" flex  justify-center px-4 py-16 text-neutral-900 dark:text-white bg-white dark:bg-[hsl(231,15%,19%)]">
      <div className="w-full max-w-6xl flex flex-col gap-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          Comparador
        </h1>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold  text-primary">Grid</h2>
          <ComparisonRowGrid
            selected={selected}
            setSelected={setSelected}
            selectedMulti={selected1}
            setSelectedMulti={setSelected1}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-primary">Flex</h2>
          <ComparisonRowFlex
            selected={selected}
            setSelected={setSelected}
            selectedMulti={selected1}
            setSelectedMulti={setSelected1}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        </div>
      </div>
    </main>
  );
}
