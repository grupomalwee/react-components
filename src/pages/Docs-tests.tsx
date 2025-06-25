import React from "react";

const sections = [
  {
    title: "AlertDialogBase",
    items: [
      "alertdialog-overlay",
      "alertdialog-content",
      "alertdialog-title",
      "alertdialog-description",
      "alertdialog-action",
      "alertdialog-cancel",
    ],
  },
  {
    title: "ButtonBase",
    items: [
      "button-default",
      "button-outline",
      "button-secondary",
      "button-{variant}",
    ],
  },
  {
    title: "CardBase",
    items: [
      "card-base",
      "card-header",
      "card-title",
      "card-description",
      "card-content",
      "card-footer",
    ],
  },
  {
    title: "CheckBoxBase",
    items: ["checkbox-base"],
  },
  {
    title: "CommandBase",
    items: [
      "command-base",
      "command-input",
      "command-list",
      "command-empty",
      "command-group",
      "command-separator",
      "command-item",
    ],
  },
  {
    title: "DialogBase",
    items: ["dialog-content"],
  },
  {
    title: "DropDownMenuBase",
    items: ["dropdown-content"],
  },
  {
    title: "FormBase",
    items: [
      "form-item-base",
      "form-label-base",
      "form-control-base",
      "form-description-base",
      "form-message-base",
    ],
  },
  {
    title: "InputBase",
    items: ["input-base (ou customizável via prop)"],
  },
  {
    title: "LabelBase",
    items: ["label-base"],
  },
  {
    title: "PopoverBase",
    items: ["popover-content"],
  },
  {
    title: "SelectBase",
    items: [
      "select-root",
      "select-base",
      "select-trigger",
      "select-value",
      "select-content",
      "select-scrollarea",
      "select-group",
      "select-label",
      "select-item",
      "select-error (se houver erro)",
    ],
  },
  {
    title: "SwitchBase",
    items: ["switch-base"],
  },
  {
    title: "ComboboxBase / MultiCombobox",
    items: [
      "combobox-base-root",
      "combobox-trigger",
      "combobox-popover",
      "combobox-command",
      "combobox-search",
      "combobox-list",
      "combobox-empty",
      "combobox-group",
      "combobox-option",
      "combobox-option-check (ícone de selecionado)",
      "combobox-selected (container dos itens selecionados)",
    ],
  },
];

export default function DocsTests() {
  return (
    <section className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-trasparent ">
      <div className="max-w-[1100px] mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100 mb-4">
          Lista de <span className="font-extrabold">data-testid</span> por componente
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-10 max-w-2xl text-base">
          Esses identificadores são usados para facilitar a seleção e verificação
          de elementos nos testes automatizados com Playwright.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <article
              key={section.title}
              className="bg-slate-100 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm p-5 min-h-[220px] flex flex-col transition-shadow hover:shadow-md"
            >
              <h2 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-3 border-b border-slate-300 dark:border-slate-600 pb-1">
                {section.title}
              </h2>
              <ul className="flex flex-wrap gap-2">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm font-mono text-slate-800 dark:text-slate-200 bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md px-3 py-1 select-all shadow-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
