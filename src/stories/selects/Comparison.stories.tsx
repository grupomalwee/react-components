import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import { Select } from "@/components/ui/selects/Select";
import { Combobox } from "@/components/ui/selects/Combobox";
import { MultiSelect } from "@/components/ui/selects/MultiSelect";
import { MultiCombobox } from "@/components/ui/selects/MultiCombobox";
import { AvatarCombobox } from "@/components/ui/selects/AvatarCombobox";

const meta: Meta = {
  title: "selects/Comparison",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Comparação de todos os componentes de select em diferentes layouts (Grid e Flex) para validação de tamanhos, fontes e espaçamentos.",
      },
    },
  },
};

export default meta;

const simpleItems = [
  { label: "Option A", value: "a" },
  { label: "Option B", value: "b" },
  { label: "Option C", value: "c" },
];

const avatarItems = [
  {
    label: "Ana Silva",
    value: "a",
    avatar: "AS",
    avatarClassName: "bg-blue-100 text-blue-700",
  },
  {
    label: "Carlos Souza",
    value: "b",
    avatar: "CS",
    avatarClassName: "bg-green-100 text-green-700",
  },
  {
    label: "Maria Santos",
    value: "c",
    avatar: "MS",
    avatarClassName: "bg-purple-100 text-purple-700",
  },
];

// ─── AllSelectsComparison ────────────────────────────────────────────────────

function ComparisonTemplate() {
  const [selectVal, setSelectVal] = useState<string | null>(null);
  const [comboVal, setComboVal] = useState<string | null>(null);
  const [multiSelectVal, setMultiSelectVal] = useState<string[]>([]);
  const [multiComboVal, setMultiComboVal] = useState<string[]>([]);
  const [avatarVal, setAvatarVal] = useState<string | null>(null);

  const renderComponents = (
    layoutClass: string,
    wrapperClass: string = "w-full",
  ) => (
    <div className={layoutClass}>
      <div className={wrapperClass}>
        <Select
          items={simpleItems}
          selected={selectVal}
          onChange={setSelectVal}
          label="Select Básico"
          placeholder="Selecione..."
        />
      </div>

      <div className={wrapperClass}>
        <Combobox
          items={simpleItems}
          selected={comboVal}
          onChange={(v) => {
            if (v) setComboVal(v);
          }}
          label="Combobox"
          placeholder="Busque..."
        />
      </div>

      <div className={wrapperClass}>
        <AvatarCombobox
          items={avatarItems}
          selected={avatarVal}
          onChange={setAvatarVal}
          label="Avatar Combobox"
          placeholder="Selecione usuário..."
        />
      </div>

      <div className={wrapperClass}>
        <MultiSelect
          items={simpleItems}
          selected={multiSelectVal}
          onChange={setMultiSelectVal}
          label="Multi Select"
          placeholder="Selecione vários..."
        />
      </div>

      <div className={wrapperClass}>
        <MultiCombobox
          items={simpleItems}
          selected={multiComboVal}
          onChange={setMultiComboVal}
          label="Multi Combobox"
          placeholder="Busque vários..."
        />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-12 p-8 w-full max-w-6xl mx-auto">
      <section>
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b">
          Grid Layout (3 colunas)
        </h2>
        {renderComponents(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b">
          Grids Variados (2 colunas, 4 colunas)
        </h2>
        <h3 className="text-lg font-semibold mb-4 text-gray-500">2 Colunas</h3>
        {renderComponents("grid grid-cols-1 md:grid-cols-2 gap-6")}

        <h3 className="text-lg font-semibold mt-8 mb-4 text-gray-500">
          4 Colunas
        </h3>
        {renderComponents(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b">
          Flex Layout (wrap)
        </h2>
        {renderComponents("flex flex-wrap gap-6", "w-64")}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b">
          Flex Layout (coluna)
        </h2>
        {renderComponents("flex flex-col gap-6", "w-full max-w-md")}
      </section>
    </div>
  );
}

export const AllSelectsComparison: StoryObj = {
  render: () => <ComparisonTemplate />,
};

// ─── StatesComparison ────────────────────────────────────────────────────────

function StatesTemplate() {
  const [vals, setVals] = useState({
    selectFilled: "a" as string | null,
    comboFilled: "b" as string | null,
    avatarFilled: "a" as string | null,
    multiSelectFilled: ["a", "b"] as string[],
    multiComboFilled: ["b", "c"] as string[],
  });

  const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4">
      {children}
    </h3>
  );

  return (
    <div className="flex flex-col gap-12 p-8 w-full max-w-6xl mx-auto">
      <section>
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b">
          Estado — Vazio (Placeholder)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Select items={simpleItems} selected={null} onChange={() => {}} label="Select Básico" placeholder="Selecione..." />
          <Combobox items={simpleItems} selected={null} onChange={() => {}} label="Combobox" placeholder="Busque..." />
          <AvatarCombobox items={avatarItems} selected={null} onChange={() => {}} label="Avatar Combobox" placeholder="Selecione usuário..." />
          <MultiSelect items={simpleItems} selected={[]} onChange={() => {}} label="Multi Select" placeholder="Selecione vários..." />
          <MultiCombobox items={simpleItems} selected={[]} onChange={() => {}} label="Multi Combobox" placeholder="Busque vários..." />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b">
          Estado — Preenchido (Filled)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Select items={simpleItems} selected={vals.selectFilled} onChange={(v) => setVals((p) => ({ ...p, selectFilled: v }))} label="Select Básico" placeholder="Selecione..." />
          <Combobox items={simpleItems} selected={vals.comboFilled} onChange={(v) => { if (v) setVals((p) => ({ ...p, comboFilled: v })); }} label="Combobox" placeholder="Busque..." />
          <AvatarCombobox items={avatarItems} selected={vals.avatarFilled} onChange={(v) => setVals((p) => ({ ...p, avatarFilled: v }))} label="Avatar Combobox" placeholder="Selecione usuário..." />
          <MultiSelect items={simpleItems} selected={vals.multiSelectFilled} onChange={(v) => setVals((p) => ({ ...p, multiSelectFilled: v }))} label="Multi Select" placeholder="Selecione vários..." />
          <MultiCombobox items={simpleItems} selected={vals.multiComboFilled} onChange={(v) => setVals((p) => ({ ...p, multiComboFilled: v }))} label="Multi Combobox" placeholder="Busque vários..." />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b">
          Estado — Desabilitado (Disabled)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Select items={simpleItems} selected={null} onChange={() => {}} label="Select Básico" placeholder="Selecione..." disabled />
          <Combobox items={simpleItems} selected={null} onChange={() => {}} label="Combobox" placeholder="Busque..." disabled />
          <AvatarCombobox items={avatarItems} selected={null} onChange={() => {}} label="Avatar Combobox" placeholder="Selecione usuário..." disabled />
          <MultiSelect items={simpleItems} selected={[]} onChange={() => {}} label="Multi Select" placeholder="Selecione vários..." disabled />
          <MultiCombobox items={simpleItems} selected={[]} onChange={() => {}} label="Multi Combobox" placeholder="Busque vários..." disabled />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 pb-2 border-b">
          Estado — Erro (Error)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Select items={simpleItems} selected={null} onChange={() => {}} label="Select Básico" placeholder="Selecione..." error="Campo obrigatório" />
          <Combobox items={simpleItems} selected={null} onChange={() => {}} label="Combobox" placeholder="Busque..." error="Campo obrigatório" />
          <AvatarCombobox items={avatarItems} selected={null} onChange={() => {}} label="Avatar Combobox" placeholder="Selecione usuário..." error="Campo obrigatório" />
          <MultiSelect items={simpleItems} selected={[]} onChange={() => {}} label="Multi Select" placeholder="Selecione vários..." error="Campo obrigatório" />
          <MultiCombobox items={simpleItems} selected={[]} onChange={() => {}} label="Multi Combobox" placeholder="Busque vários..." error="Campo obrigatório" />
        </div>
      </section>
    </div>
  );
}

export const StatesComparison: StoryObj = {
  name: "Estados",
  render: () => <StatesTemplate />,
};

// ─── SingleVsMultiComparison ─────────────────────────────────────────────────

function SingleVsMultiTemplate() {
  const [singleSelect, setSingleSelect] = useState<string | null>(null);
  const [singleCombo, setSingleCombo] = useState<string | null>(null);
  const [singleAvatar, setSingleAvatar] = useState<string | null>(null);
  const [multiSelect, setMultiSelect] = useState<string[]>([]);
  const [multiCombo, setMultiCombo] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-12 p-8 w-full max-w-6xl mx-auto">
      <section>
        <h2 className="text-2xl font-bold mb-2 pb-2 border-b">
          Seleção Única vs Múltipla
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          Comparação direta entre os equivalentes de seleção simples e múltipla.
        </p>

        {/* Select vs MultiSelect */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-1">Select vs Multi Select</h3>
          <p className="text-sm text-gray-400 mb-4">
            Mesmo conjunto de opções — comportamento de seleção diferente.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-5 flex flex-col gap-3 bg-gray-50 dark:bg-gray-900">
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Seleção Única</span>
              <Select items={simpleItems} selected={singleSelect} onChange={setSingleSelect} label="Select Básico" placeholder="Selecione..." />
            </div>
            <div className="border rounded-lg p-5 flex flex-col gap-3 bg-gray-50 dark:bg-gray-900">
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Seleção Múltipla</span>
              <MultiSelect items={simpleItems} selected={multiSelect} onChange={setMultiSelect} label="Multi Select" placeholder="Selecione vários..." />
            </div>
          </div>
        </div>

        {/* Combobox vs MultiCombobox */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-1">Combobox vs Multi Combobox</h3>
          <p className="text-sm text-gray-400 mb-4">
            Com busca por texto — seleção simples versus múltipla.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-5 flex flex-col gap-3 bg-gray-50 dark:bg-gray-900">
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Seleção Única</span>
              <Combobox items={simpleItems} selected={singleCombo} onChange={(v) => { if (v) setSingleCombo(v); }} label="Combobox" placeholder="Busque..." />
            </div>
            <div className="border rounded-lg p-5 flex flex-col gap-3 bg-gray-50 dark:bg-gray-900">
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Seleção Múltipla</span>
              <MultiCombobox items={simpleItems} selected={multiCombo} onChange={setMultiCombo} label="Multi Combobox" placeholder="Busque vários..." />
            </div>
          </div>
        </div>

        {/* AvatarCombobox — único disponível */}
        <div>
          <h3 className="text-lg font-semibold mb-1">Avatar Combobox</h3>
          <p className="text-sm text-gray-400 mb-4">
            Variante com avatar — disponível apenas em seleção única.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-5 flex flex-col gap-3 bg-gray-50 dark:bg-gray-900">
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Com Avatar (Único)</span>
              <AvatarCombobox items={avatarItems} selected={singleAvatar} onChange={setSingleAvatar} label="Avatar Combobox" placeholder="Selecione usuário..." />
            </div>
            <div className="border rounded-lg p-5 flex flex-col gap-3 bg-gray-50 dark:bg-gray-900 opacity-40 pointer-events-none select-none">
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Com Avatar (Múltiplo)</span>
              <div className="text-sm text-gray-400 italic mt-2">Não disponível — use MultiCombobox com avatares customizados.</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export const SingleVsMultiComparison: StoryObj = {
  name: "Seleção Única",
  render: () => <SingleVsMultiTemplate />,
};

// ─── WidthsComparison ────────────────────────────────────────────────────────

function WidthsTemplate() {
  const [val, setVal] = useState<string | null>(null);
  const [multiVal, setMultiVal] = useState<string[]>([]);

  const widths = [
    { label: "w-32 (128px)", cls: "w-32" },
    { label: "w-48 (192px)", cls: "w-48" },
    { label: "w-64 (256px)", cls: "w-64" },
    { label: "w-80 (320px)", cls: "w-80" },
    { label: "w-full", cls: "w-full" },
  ];

  return (
    <div className="flex flex-col gap-12 p-8 w-full max-w-6xl mx-auto">
      <section>
        <h2 className="text-2xl font-bold mb-2 pb-2 border-b">
          Larguras Fixas — Select Básico
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          Verificação de como o componente se comporta em diferentes larguras definidas pelo container pai.
        </p>
        <div className="flex flex-col gap-6">
          {widths.map(({ label, cls }) => (
            <div key={cls} className="flex items-center gap-6">
              <span className="text-xs font-mono text-gray-400 w-32 shrink-0">{label}</span>
              <div className={cls}>
                <Select items={simpleItems} selected={val} onChange={setVal} label="Select Básico" placeholder="Selecione..." />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-2 pb-2 border-b">
          Larguras Fixas — Multi Combobox
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          Verificação de overflow e wrapping de tags em containers estreitos.
        </p>
        <div className="flex flex-col gap-6">
          {widths.map(({ label, cls }) => (
            <div key={cls} className="flex items-center gap-6">
              <span className="text-xs font-mono text-gray-400 w-32 shrink-0">{label}</span>
              <div className={cls}>
                <MultiCombobox items={simpleItems} selected={multiVal} onChange={setMultiVal} label="Multi Combobox" placeholder="Busque vários..." />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export const WidthsComparison: StoryObj = {
  name: "Largura",
  render: () => <WidthsTemplate />,
};

// ─── DensityComparison ───────────────────────────────────────────────────────

function DensityTemplate() {
  const [vals, setVals] = useState({
    s1: null as string | null,
    s2: null as string | null,
    s3: null as string | null,
    s4: null as string | null,
    s5: null as string | null,
    s6: null as string | null,
    m1: [] as string[],
    m2: [] as string[],
    m3: [] as string[],
    m4: [] as string[],
    m5: [] as string[],
    m6: [] as string[],
  });

  const set = (key: keyof typeof vals) => (v: any) => setVals((p) => ({ ...p, [key]: v }));

  return (
    <div className="flex flex-col gap-12 p-8 w-full max-w-6xl mx-auto">
      <section>
        <h2 className="text-2xl font-bold mb-2 pb-2 border-b">
          Alta Densidade — Formulário com muitos campos
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          Simula um formulário real com múltiplos selects lado a lado, validando alinhamento e espaçamento visual.
        </p>

        <div className="border rounded-xl p-6 flex flex-col gap-6 bg-white dark:bg-gray-950 shadow-sm">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300">Dados do Projeto</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select items={simpleItems} selected={vals.s1} onChange={set("s1")} label="Tipo de Projeto" placeholder="Selecione..." />
            <Select items={simpleItems} selected={vals.s2} onChange={set("s2")} label="Prioridade" placeholder="Selecione..." />
            <Select items={simpleItems} selected={vals.s3} onChange={set("s3")} label="Status" placeholder="Selecione..." />
          </div>

          <h3 className="font-semibold text-gray-700 dark:text-gray-300 mt-2">Equipe</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AvatarCombobox items={avatarItems} selected={vals.s4} onChange={set("s4")} label="Responsável" placeholder="Selecione usuário..." />
            <MultiCombobox items={simpleItems} selected={vals.m1} onChange={set("m1")} label="Colaboradores" placeholder="Busque vários..." />
          </div>

          <h3 className="font-semibold text-gray-700 dark:text-gray-300 mt-2">Categorização</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MultiSelect items={simpleItems} selected={vals.m2} onChange={set("m2")} label="Tags" placeholder="Selecione vários..." />
            <Combobox items={simpleItems} selected={vals.s5} onChange={(v) => { if (v) set("s5")(v); }} label="Departamento" placeholder="Busque..." />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-2 pb-2 border-b">
          Espaçamento Mínimo vs Generoso
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          Comparação visual entre gap-2 (mínimo) e gap-10 (generoso) para verificar respiração dos componentes.
        </p>

        <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-3">gap-2 (8px)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border rounded-lg p-4 bg-gray-50 dark:bg-gray-900 mb-8">
          <Select items={simpleItems} selected={vals.s1} onChange={set("s1")} label="Select" placeholder="Selecione..." />
          <Combobox items={simpleItems} selected={vals.s5} onChange={(v) => { if (v) set("s5")(v); }} label="Combobox" placeholder="Busque..." />
          <MultiCombobox items={simpleItems} selected={vals.m3} onChange={set("m3")} label="Multi Combobox" placeholder="Busque vários..." />
        </div>

        <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-3">gap-10 (40px)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
          <Select items={simpleItems} selected={vals.s1} onChange={set("s1")} label="Select" placeholder="Selecione..." />
          <Combobox items={simpleItems} selected={vals.s5} onChange={(v) => { if (v) set("s5")(v); }} label="Combobox" placeholder="Busque..." />
          <MultiCombobox items={simpleItems} selected={vals.m4} onChange={set("m4")} label="Multi Combobox" placeholder="Busque vários..." />
        </div>
      </section>
    </div>
  );
}

export const DensityComparison: StoryObj = {
  name: "Densidade",
  render: () => <DensityTemplate />,
};

// ─── MixedStatesComparison ───────────────────────────────────────────────────

function MixedStatesTemplate() {
  const [vals, setVals] = useState({
    s1: "a" as string | null,
    s2: null as string | null,
    s3: "b" as string | null,
    m1: ["a"] as string[],
    m2: [] as string[],
    m3: ["a", "b", "c"] as string[],
  });
  const set = (key: keyof typeof vals) => (v: any) => setVals((p) => ({ ...p, [key]: v }));

  return (
    <div className="flex flex-col gap-12 p-8 w-full max-w-6xl mx-auto">
      <section>
        <h2 className="text-2xl font-bold mb-2 pb-2 border-b">
          Estados Mistos em Grid
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          Simula um formulário parcialmente preenchido — mistura de campos vazios, preenchidos, com erro e desabilitados.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Select items={simpleItems} selected={vals.s1} onChange={set("s1")} label="Preenchido" placeholder="Selecione..." />
          <Select items={simpleItems} selected={vals.s2} onChange={set("s2")} label="Vazio" placeholder="Selecione..." />
          <Select items={simpleItems} selected={null} onChange={() => {}} label="Com erro" placeholder="Selecione..." error="Seleção obrigatória" />
          <Combobox items={simpleItems} selected={vals.s3} onChange={(v) => { if (v) set("s3")(v); }} label="Preenchido" placeholder="Busque..." />
          <Combobox items={simpleItems} selected={null} onChange={() => {}} label="Desabilitado" placeholder="Busque..." disabled />
          <AvatarCombobox items={avatarItems} selected={null} onChange={() => {}} label="Com erro" placeholder="Selecione usuário..." error="Responsável obrigatório" />
          <MultiSelect items={simpleItems} selected={vals.m1} onChange={set("m1")} label="1 selecionado" placeholder="Selecione vários..." />
          <MultiSelect items={simpleItems} selected={vals.m2} onChange={set("m2")} label="Vazio" placeholder="Selecione vários..." />
          <MultiCombobox items={simpleItems} selected={vals.m3} onChange={set("m3")} label="3 selecionados" placeholder="Busque vários..." />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-2 pb-2 border-b">
          Todos Desabilitados — Filled
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          Verifica a aparência visual de todos os componentes desabilitados mas com valor pré-selecionado (modo somente leitura).
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Select items={simpleItems} selected="a" onChange={() => {}} label="Select Básico" placeholder="Selecione..." disabled />
          <Combobox items={simpleItems} selected="b" onChange={() => {}} label="Combobox" placeholder="Busque..." disabled />
          <AvatarCombobox items={avatarItems} selected="a" onChange={() => {}} label="Avatar Combobox" placeholder="Selecione usuário..." disabled />
          <MultiSelect items={simpleItems} selected={["a", "b"]} onChange={() => {}} label="Multi Select" placeholder="Selecione vários..." disabled />
          <MultiCombobox items={simpleItems} selected={["a", "c"]} onChange={() => {}} label="Multi Combobox" placeholder="Busque vários..." disabled />
        </div>
      </section>
    </div>
  );
}

export const MixedStatesComparison: StoryObj = {
  name: "Estados Mistos",
  render: () => <MixedStatesTemplate />,
};