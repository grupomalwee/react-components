"use client";

import { useState } from "react";
import { ButtonBase } from "@/components/ui/form/ButtonBase";
import { InputBase } from "@/components/ui/form/InputBase";
import { Combobox } from "@/components/selects/Combobox";
import { MultiCombobox } from "@/components/selects/MultiCombobox";
import { DateTimePicker } from "@/components/picker/DateTimePicker";
import React from "react";
import { Select } from "@/components/selects/Select";
import { AvatarCombobox } from "@/components/selects/AvatarCombobox";
import {
  MultiSelectBase,
  MultiSelectContentBase,
  MultiSelectGroupBase,
  MultiSelectItemBase,
  MultiSelectTriggerBase,
  MultiSelectValueBase,
} from "@/components/selects/MultiSelectBase";

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
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [values, setValues] = React.useState<string[]>([]);

  return (
    <div>
      <section className="grid grid-cols-1 md:grid-cols-5 gap-6 w-full bg-red-500">
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
        <Select
          items={[
            { label: "Opção 1", value: "1" },
            { label: "Opção 2", value: "2" },
            { label: "Opção 3", value: "3" },
          ]}
          selected={null}
          onChange={() => {}}
          placeholder="Selecione uma opção"
        />
        <ButtonBase>Comparar</ButtonBase>
        <AvatarCombobox
          items={[
            {
              avatarClassName: "bg-indigo-400/20 text-indigo-500",
              label: "Gabriel Glatz",
              value: "1",
            },
            {
              avatarClassName: "bg-purple-400/20 text-purple-500",
              label: "Eduardo Ronchi",
              value: "2",
            },
            {
              avatarClassName: "bg-rose-400/20 text-rose-500",
              label: "Anne Kelley",
              value: "3",
            },
            {
              avatarClassName: "bg-amber-400/20 text-amber-500",
              label: "Michael Chen",
              value: "4",
            },
            {
              avatarClassName: "bg-emerald-400/20 text-emerald-500",
              label: "Sofia Martinez",
              value: "5",
            },
          ]}
          onChange={function nG() {}}
          placeholder="Select user"
          selected="1"
        />

        <DateTimePicker date={date} onChange={setDate} hideSeconds />

        <MultiSelectBase values={values} onValuesChange={setValues}>
          <MultiSelectTriggerBase>
            <MultiSelectValueBase placeholder={"Selecione"} />
          </MultiSelectTriggerBase>

          <MultiSelectContentBase search={{ placeholder: "Pesquisar..." }}>
            <MultiSelectGroupBase>
              <MultiSelectItemBase value="apple" badgeLabel="Apple">
                Apple
              </MultiSelectItemBase>
              <MultiSelectItemBase value="banana" badgeLabel="Banana">
                Banana
              </MultiSelectItemBase>
              <MultiSelectItemBase value="blueberry" badgeLabel="Blueberry">
                Blueberry
              </MultiSelectItemBase>
              <MultiSelectItemBase value="grapes" badgeLabel="Grapes">
                Grapes
              </MultiSelectItemBase>
              <MultiSelectItemBase value="pineapple" badgeLabel="Pineapple">
                Pineapple
              </MultiSelectItemBase>
            </MultiSelectGroupBase>
          </MultiSelectContentBase>
        </MultiSelectBase>
      </section>
      {/* <section className="grid grid-cols-1 md:grid-cols-5 gap-6 w-full bg-red-500">
        <DateTimePicker
          date={date}
          onChange={setDate}
          hideSeconds
          label="eeeeeeeeeeeeee"
        />
        <Select
          items={[
            { label: "Opção 1", value: "1" },
            { label: "Opção 2", value: "2" },
            { label: "Opção 3", value: "3" },
          ]}
          selected={null}
          onChange={() => {}}
          label="eeeeeeeeeeee"
          placeholder="Selecione uma opção"
        />
      </section> */}
    </div>
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
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <section className="flex flex-wrap gap-6 w-full bg-red-500">
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
      <DateTimePicker date={date} onChange={setDate} hideSeconds />
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
  const [selectedMulti, setSelectedMulti] = useState<string[]>([]);

  return (
    <main className="flex justify-center px-4 py-16 text-neutral-900 dark:text-white bg-white dark:bg-[hsl(231,15%,19%)]">
      <div className="w-full max-w-6xl flex flex-col gap-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          Comparador
        </h1>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold  text-primary">Grid</h2>
          <ComparisonRowGrid
            selected={selected}
            setSelected={setSelected}
            selectedMulti={selectedMulti}
            setSelectedMulti={setSelectedMulti}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-primary">Flex</h2>
          <ComparisonRowFlex
            selected={selected}
            setSelected={setSelected}
            selectedMulti={selectedMulti}
            setSelectedMulti={setSelectedMulti}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        </div>
      </div>
    </main>
  );
}
