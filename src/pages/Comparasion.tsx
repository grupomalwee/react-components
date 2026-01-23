"use client";

import { useState } from "react";
import { ButtonBase } from "@/components/ui/form/ButtonBase";
import { InputBase } from "@/components/ui/form/InputBase";
import { Combobox } from "@/components/ui/selects/Combobox";
import { MultiCombobox } from "@/components/ui/selects/MultiCombobox";
import { DateTimePicker } from "@/components/ui/picker/DateTimePicker";
import { Select } from "@/components/ui/selects/Select";
import { AvatarCombobox } from "@/components/ui/selects/AvatarCombobox";
import {
  DialogBase,
  DialogCloseBase,
  DialogContentBase,
  DialogDescriptionBase,
  DialogFooterBase,
  DialogHeaderBase,
  DialogTitleBase,
  DialogTriggerBase,
} from "@/components/ui/feedback/DialogBase";
import { MultiSelect } from "@/components/ui/selects/MultiSelect";
import { RangePicker } from "@/components/ui/picker/RangePicker";

const cargos = [
  { label: "Desenvolvedor", value: "dev" },
  { label: "Designer", value: "designer" },
  { label: "Product Owner", value: "po" },
  { label: "Scrum Master", value: "scrum" },
  { label: "Tech Lead", value: "techlead" },
  { label: "Analista de Dados", value: "data-analyst" },
  { label: "DevOps", value: "devops" },
  { label: "QA Engineer", value: "qa" },
];

const usuarios = [
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
  {
    avatarClassName: "bg-blue-400/20 text-blue-500",
    label: "Lucas Silva",
    value: "6",
  },
];

function ComparisonRowGrid({
  selected,
  setSelected,
  selectedMulti,
  setSelectedMulti,
  inputValue,
  setInputValue,
  selectValue,
  setSelectValue,
  avatarValue,
  setAvatarValue,
  date,
  setDate,
  multiSelectValues,
  setMultiSelectValues,
}: Props) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 rounded-lg border border-blue-200 dark:border-slate-700">
        <div className="flex flex-col">
          <Combobox
            items={cargos}
            selected={selected}
            onChange={setSelected}
            placeholder="Escolha um cargo"
            searchPlaceholder="Buscar cargo..."
            label="Cargo (Combobox)"
          />
        </div>

        <div className="flex flex-col">
          <MultiCombobox
            items={cargos}
            selected={selectedMulti}
            onChange={setSelectedMulti}
            placeholder="Escolha os cargos"
            searchPlaceholder="Buscar cargo..."
            label="Cargos (MultiCombobox)"
          />
        </div>

        <div className="flex flex-col">
          <Select
            items={cargos}
            selected={selectValue}
            onChange={setSelectValue}
            placeholder="Selecione um cargo"
            label="Cargo (Select)"
            hideClear
          />
        </div>

        <div className="flex flex-col">
          <AvatarCombobox
            items={usuarios}
            onChange={setAvatarValue}
            placeholder="Selecione um usuário"
            selected={avatarValue}
            label="Usuário (Avatar)"
          />
        </div>

        <div className="flex flex-col">
          <InputBase
            placeholder="Digite seu nome..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            label="Nome"
          />
        </div>

        <div className="flex flex-col">
          <DateTimePicker
            date={date}
            onChange={setDate}
            hideSeconds
            label="Data e Hora"
          />
          <RangePicker
            value={date ? { from: date, to: date } : undefined}
            onChange={(range) => setDate(range?.from ?? null)}
            label="Data e Hora"
          />
        </div>

        <div className="flex flex-col">
          <MultiSelect
            selected={multiSelectValues}
            onChange={setMultiSelectValues}
            groupItems={{ Cargos: cargos }}
            label="teste"
          />
        </div>

        <div className="flex flex-col justify-end">
          <ButtonBase className="w-full">Aplicar Filtros</ButtonBase>
        </div>
      </div>
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
  selectValue,
  setSelectValue,
  avatarValue,
  setAvatarValue,
  date,
  setDate,
  multiSelectValues,
  setMultiSelectValues,
}: Props) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 w-full p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-900 rounded-lg border border-purple-200 dark:border-slate-700">
        <div className="flex-1 min-w-[250px]">
          <Combobox
            items={cargos}
            selected={selected}
            onChange={setSelected}
            placeholder="Escolha um cargo"
            searchPlaceholder="Buscar cargo..."
            label="Cargo (Combobox)"
          />
        </div>

        <div className="flex-1 min-w-[250px]">
          <MultiCombobox
            items={cargos}
            selected={selectedMulti}
            onChange={setSelectedMulti}
            placeholder="Escolha os cargos"
            searchPlaceholder="Buscar cargo..."
            label="Cargos (MultiCombobox)"
          />
        </div>
        <div className="">
          <DialogBase>
            <DialogTriggerBase asChild>
              <ButtonBase variant="default">Schedule</ButtonBase>
            </DialogTriggerBase>
            <DialogContentBase className="sm:max-w-md">
              <DialogHeaderBase>
                <DialogTitleBase>Schedule event</DialogTitleBase>
                <DialogDescriptionBase>
                  Choose date and time for your event.
                </DialogDescriptionBase>
              </DialogHeaderBase>
              <div className="py-4">
                <DateTimePicker date={date} onChange={setDate} />
              </div>
              <DialogFooterBase>
                <DialogCloseBase asChild>
                  <ButtonBase variant="outline">Cancel</ButtonBase>
                </DialogCloseBase>
                <ButtonBase
                  onClick={() => console.log("Confirmed date:", date)}
                >
                  Confirm
                </ButtonBase>
              </DialogFooterBase>
            </DialogContentBase>
          </DialogBase>
        </div>

        <div className="flex-1 min-w-[250px]">
          <Select
            items={cargos}
            selected={selectValue}
            onChange={setSelectValue}
            placeholder="Selecione um cargo"
            label="Cargo (Select)"
            hideClear={false}
          />
        </div>

        <div className="flex-1 min-w-[250px]">
          <AvatarCombobox
            items={usuarios}
            onChange={setAvatarValue}
            placeholder="Selecione um usuário"
            selected={avatarValue}
            label="Usuário (Avatar)"
          />
        </div>

        <div className="flex-1 min-w-[250px]">
          <InputBase
            placeholder="Digite seu nome..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            label="Nome"
          />
        </div>

        <div className="flex-1 min-w-[250px]">
          <DateTimePicker
            date={date}
            onChange={setDate}
            hideSeconds
            label="Data e Hora"
          />
        </div>
        <div className="flex-1 min-w-[250px]">
          <MultiSelect
            selected={multiSelectValues}
            onChange={setMultiSelectValues}
            groupItems={{ Cargos: cargos }}
            label="teste"
          />
        </div>
      </div>

      <div className="flex-1 min-w-[250px] flex items-end">
        <ButtonBase className="w-full">Aplicar Filtros</ButtonBase>
      </div>
    </div>
  );
}

type Props = {
  selected: string | null;
  setSelected: (v: string | null) => void;
  selectedMulti: string[];
  setSelectedMulti: (v: string[]) => void;
  inputValue: string;
  setInputValue: (v: string) => void;
  selectValue: string | null;
  setSelectValue: (v: string) => void;
  avatarValue: string | null;
  setAvatarValue: (v: string | null) => void;
  date: Date | null;
  setDate: (v: Date | null) => void;
  multiSelectValues: string[];
  setMultiSelectValues: (v: string[]) => void;
};

export default function Comparison() {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedMulti, setSelectedMulti] = useState<string[]>([]);
  const [selectValue, setSelectValue] = useState<string | null>(null);
  const [avatarValue, setAvatarValue] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(new Date());
  const [multiSelectValues, setMultiSelectValues] = useState<string[]>([]);

  return (
    <main className="min-h-screen px-4 py-16 ">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Comparador de Layouts
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Compare como os componentes se comportam em layouts{" "}
            <strong>Grid</strong> vs <strong>Flex</strong>
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-1 w-1 bg-blue-500 rounded-full" />
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Layout Grid
            </h2>
          </div>
          <ComparisonRowGrid
            selected={selected}
            setSelected={setSelected}
            selectedMulti={selectedMulti}
            setSelectedMulti={setSelectedMulti}
            inputValue={inputValue}
            setInputValue={setInputValue}
            selectValue={selectValue}
            setSelectValue={setSelectValue}
            avatarValue={avatarValue}
            setAvatarValue={setAvatarValue}
            date={date}
            setDate={setDate}
            multiSelectValues={multiSelectValues}
            setMultiSelectValues={setMultiSelectValues}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-1 w-1 bg-purple-500 rounded-full" />
            <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              Layout Flex
            </h2>
          </div>
          <ComparisonRowFlex
            selected={selected}
            setSelected={setSelected}
            selectedMulti={selectedMulti}
            setSelectedMulti={setSelectedMulti}
            inputValue={inputValue}
            setInputValue={setInputValue}
            selectValue={selectValue}
            setSelectValue={setSelectValue}
            avatarValue={avatarValue}
            setAvatarValue={setAvatarValue}
            date={date}
            setDate={setDate}
            multiSelectValues={multiSelectValues}
            setMultiSelectValues={setMultiSelectValues}
          />
        </div>
      </div>
    </main>
  );
}
