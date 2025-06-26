import React from "react";

const sections = [
  {
    title: "AlertDialogBase",
    items: [
      {
        id: "alertdialog-overlay",
        description:
          "Overlay escurecido atrás do diálogo — prop: testid='alertdialog-overlay'",
      },
      {
        id: "alertdialog-content",
        description:
          "Container principal do diálogo — prop: testid='alertdialog-content'",
      },
      {
        id: "alertdialog-title",
        description:
          "Título do diálogo — prop: testid='alertdialog-title'",
      },
      {
        id: "alertdialog-description",
        description:
          "Descrição/explicação do diálogo — prop: testid='alertdialog-description'",
      },
      {
        id: "alertdialog-action",
        description:
          "Botão de ação principal (confirmar) — prop: testid='alertdialog-action'",
      },
      {
        id: "alertdialog-cancel",
        description: "Botão cancelar — prop: testid='alertdialog-cancel'",
      },
    ],
  },
  {
    title: "ButtonBase",
    items: [
      {
        id: "button-{variant}",
        description:
          "Botão base com variantes (ex: primary, secondary). Pode receber prop opcional testid para customizar identificação no teste.",
      },
    ],
  },
  {
    title: "CardBase",
    items: [
      {
        id: "card-base",
        description: "Container raiz do card — testid='card-base'",
      },
      {
        id: "card-header",
        description: "Cabeçalho do card — testid='card-header'",
      },
      {
        id: "card-title",
        description: "Título do card — testid='card-title'",
      },
      {
        id: "card-description",
        description: "Descrição do card — testid='card-description'",
      },
      {
        id: "card-content",
        description: "Conteúdo principal do card — testid='card-content'",
      },
      {
        id: "card-footer",
        description: "Rodapé do card — testid='card-footer'",
      },
    ],
  },
  {
    title: "CheckBoxBase",
    items: [
      {
        id: "checkbox-base",
        description:
          "Checkbox base, normalmente aplicado na input — testid='checkbox-base'",
      },
    ],
  },
  {
    title: "CommandBase",
    items: [
      {
        id: "command-base",
        description:
          "Container principal do comando — testid='command-base'",
      },
      {
        id: "command-input",
        description: "Input de busca do comando — testid='command-input'",
      },
      {
        id: "command-list",
        description: "Lista de itens do comando — testid='command-list'",
      },
      {
        id: "command-empty",
        description:
          "Mensagem quando não há resultados — testid='command-empty'",
      },
      {
        id: "command-group",
        description: "Grupo visual de itens — testid='command-group'",
      },
      {
        id: "command-separator",
        description: "Separador entre grupos — testid='command-separator'",
      },
      {
        id: "command-item",
        description:
          "Item clicável dentro da lista — testid='command-item'",
      },
    ],
  },
  {
    title: "DialogBase",
    items: [
      {
        id: "dialog-content",
        description:
          "Conteúdo do diálogo (via prop testid) para testes customizados, recebe o valor passado direto no componente.",
      },
    ],
  },
  {
    title: "DropDownMenuBase",
    items: [
      {
        id: "dropdown-content",
        description:
          "Conteúdo do dropdown — geralmente passa testid via prop para facilitar identificação no teste.",
      },
    ],
  },
  {
    title: "FormBase",
    items: [
      {
        id: "form-item-base",
        description:
          "Container do item do formulário — testid='form-item-base'",
      },
      {
        id: "form-label-base",
        description: "Label do formulário — testid='form-label-base'",
      },
      {
        id: "form-control-base",
        description:
          "Input/controle do formulário — testid='form-control-base'",
      },
      {
        id: "form-description-base",
        description: "Descrição extra — testid='form-description-base'",
      },
      {
        id: "form-message-base",
        description:
          "Mensagem de erro/validação — testid='form-message-base'",
      },
    ],
  },
  {
    title: "InputBase",
    items: [
      {
        id: "input-base",
        description:
          "Input base, recebe prop opcional testid para customização em testes.",
      },
    ],
  },
  {
    title: "LabelBase",
    items: [
      {
        id: "label-base",
        description: "Label base para inputs — testid='label-base'",
      },
    ],
  },
  {
    title: "PopoverBase",
    items: [
      {
        id: "popover-content",
        description:
          "Conteúdo do popover (via prop testid) para facilitar testes de UI com componentes dinâmicos.",
      },
    ],
  },
  {
    title: "SelectBase",
    items: [
      {
        id: "select-root",
        description: "Container raiz do select — testid='select-root'",
      },
      {
        id: "select-base",
        description: "Wrapper base do select — testid='select-base'",
      },
      {
        id: "select-trigger",
        description: "Botão que abre o select — testid='select-trigger'",
      },
      {
        id: "select-value",
        description: "Valor selecionado — testid='select-value'",
      },
      {
        id: "select-content",
        description: "Conteúdo do dropdown — testid='select-content'",
      },
      {
        id: "select-scrollarea",
        description: "Área com scroll — testid='select-scrollarea'",
      },
      {
        id: "select-group",
        description: "Grupo de itens no select — testid='select-group'",
      },
      {
        id: "select-label",
        description: "Label dentro do select — testid='select-label'",
      },
      {
        id: "select-item",
        description:
          "Item do select, personalizável via prop item(value) => string para gerar testId dinâmico. Ex: `select-item-${value}`",
      },
      {
        id: "select-error",
        description: "Mensagem de erro — testid='select-error'",
      },
    ],
  },
  {
    title: "SonnerBase",
    items: [
      {
        id: "button-success",
        description:
          "Botão de sucesso (ex: toast) — testid='button-success'",
      },
      {
        id: "button-error",
        description: "Botão de erro — testid='button-error'",
      },
      {
        id: "button-warning",
        description: "Botão de aviso — testid='button-warning'",
      },
      {
        id: "button-info",
        description: "Botão de informação — testid='button-info'",
      },
      {
        id: "button-loading",
        description: "Botão em loading — testid='button-loading'",
      },
      {
        id: "toaster-root",
        description: "Container raiz do toaster — testid='toaster-root'",
      },
    ],
  },
  {
    title: "SwitchBase",
    items: [
      {
        id: "switch-base",
        description: "Switch toggle base — testid='switch-base'",
      },
    ],
  },
  {
    title: "ComboboxBase / MultiCombobox",
    items: [
      {
        id: "combobox-base-root",
        description:
          "Container raiz do combobox — testid='combobox-base-root'",
      },
      {
        id: "combobox-trigger",
        description:
          "Botão que abre/fecha dropdown — testid='combobox-trigger'",
      },
      {
        id: "combobox-popover",
        description: "Container do popover — testid='combobox-popover'",
      },
      {
        id: "combobox-command",
        description:
          "Container do comando/lista — testid='combobox-command'",
      },
      {
        id: "combobox-search",
        description: "Input de busca — testid='combobox-search'",
      },
      {
        id: "combobox-list",
        description: "Lista de itens — testid='combobox-list'",
      },
      {
        id: "combobox-empty",
        description:
          "Mensagem quando nenhum dado encontrado — testid='combobox-empty'",
      },
      {
        id: "combobox-group",
        description: "Grupo de itens — testid='combobox-group'",
      },
      {
        id: "combobox-option",
        description:
          "Item selecionável da lista — testid='combobox-option'",
      },
      {
        id: "combobox-option-check",
        description:
          "Ícone check do item selecionado — testid='combobox-option-check'",
      },
      {
        id: "combobox-selected",
        description:
          "Texto do item selecionado no trigger — testid='combobox-selected'",
      },
    ],
  },
];

const exampleUsage = `
<ComboboxBase
  items={items}
  renderSelected={renderSelected}
  handleSelection={handleSelection}
  checkIsSelected={checkIsSelected}
  searchPlaceholder="Busque uma opção..."
  testIds={{
    root: "combobox-base-root",
    trigger: "combobox-trigger",
    popover: "combobox-popover",
    command: "combobox-command",
    search: "combobox-search",
    list: "combobox-list",
    empty: "combobox-empty",
    group: "combobox-group",
    option: "combobox-option",
    check: "combobox-option-check",
  }}
/>

<MultiComboboxBase
  items={items}
  renderSelected={renderSelected}
  handleSelection={handleSelection}
  checkIsSelected={checkIsSelected}
  searchPlaceholder="Busque uma opção..."
  testIds={{
    root: "multi-base-root",
    trigger: "multi-trigger",
    popover: "multi-popover",
    command: "multi-command",
    search: "multi-search",
    list: "multi-list",
    empty: "multi-empty",
    group: "multi-group",
    option: "multi-option",
    check: "multi-option-check",
  }}
/>
`;

export default function DocsTests() {
  return (
    <section className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-[1100px] mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 mb-4">
          Lista de <span className="font-extrabold">testid</span> por
          componente
        </h1>

        <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl text-base">
          Todos os identificadores são passados como <code>props</code> nos
          componentes, permitindo personalização total em testes automatizados
          com Playwright.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map(({ title, items }) => (
            <article
              key={title}
              className="bg-slate-100 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm p-5 min-h-[220px] flex flex-col transition-shadow hover:shadow-md"
            >
              <h2 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-3 border-b border-slate-300 dark:border-slate-600 pb-1">
                {title}
              </h2>
              <ul className="flex flex-col gap-2 overflow-y-auto max-h-[300px]">
                {items.map(({ id, description }) => (
                  <li
                    key={id}
                    className="text-sm font-mono text-slate-800 dark:text-slate-200 bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md px-3 py-2 select-text shadow-sm"
                  >
                    <strong>{id}</strong>
                    <p className="text-xs mt-1 text-slate-700 dark:text-slate-300 leading-snug">
                      {description}
                    </p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="mb-8 rounded-md bg-slate-100 dark:bg-slate-900/40 p-4 font-mono text-sm whitespace-pre-wrap select-all my-6">
          <strong className="mb-2 block text-indigo-600">
            Exemplo básico de uso dos testid como props no caso do uso do <h1 className="text-xl">ComboboxBase e MultiComboboxBase</h1>
          </strong>
          {exampleUsage}
        </div>
      </div>
    </section>
  );
}
