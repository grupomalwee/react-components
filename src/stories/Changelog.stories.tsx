import "../style/global.css";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Meta, StoryObj } from "@storybook/react-vite";

type ChangeItem = {
  version: string;
  date?: string;
  added?: string[];
  fixed?: string[];
  changed?: string[];
  notes?: string[];
};

type TagType = "added" | "changed" | "fixed" | "notes";

function getTagStyles(type: TagType) {
  switch (type) {
    case "added":
      return { tag: "bg-emerald-600 text-white", border: "border-emerald-600" };
    case "changed":
      return { tag: "bg-indigo-600 text-white", border: "border-indigo-600" };
    case "fixed":
      return { tag: "bg-rose-600 text-white", border: "border-rose-600" };
    case "notes":
      return { tag: "bg-slate-600 text-white", border: "border-slate-400" };
    default:
      return { tag: "bg-slate-200 text-slate-800", border: "border-slate-200" };
  }
}

const changelogData: ChangeItem[] = [
  {
    version: "1.7.6",
    date: "2025-11-18",
    added: [
      "BadgeBase: propriedades personalizáveis para maior flexibilidade",
      "StatusIndicator: opções de configuração ampliadas",
      "CodeBlock: suporte a realce de sintaxe multi-linguagem",
      "Charts: novos exemplos demonstrativos",
    ],
    changed: [
      "BadgeBase: refatoração de estilos para maior consistência",
      "DateTimePicker: remoção de hideHour/hideMinute (API simplificada)",
      "Tooltip: lógica simplificada e otimizações de uso",
      "Configs: limpeza de Docker e workflows de CI",
    ],
    fixed: [
      "DashboardPage: alinhamento de ícones corrigido",
      "Chart: posição do rótulo do eixo Y (leftTop) corrigida",
      "Pickers: ajustes de layout e correções visuais",
      "ProgressBase/Calendar: pequenos consertos de apresentação",
    ],
    notes: [
      "Docs: atualizações no README e no changelog",
      "Exemplos: conteúdo revisado e expandido",
    ],
  },
  {
    version: "1.7.5",
    date: "2025-11-13",
    added: [
      "RangePicker: suporte a formatação pt-BR",
      "DateTimePicker: abre no mês de borda (melhora navegação)",
      "ButtonBase: melhor suporte a children e estado de loading",
      "CodeBlock: abas e realce aprimorados",
      "Combobox: melhorias na estrutura e acessibilidade",
    ],
    fixed: [
      "Pickers: ajustes finos de estilo",
      "ProgressBase: correções de layout",
      "Combobox API: remoção da prop deprecated 'disabled'",
      "Chart: correção do rótulo do eixo Y (leftTop)",
    ],
  },
  {
    version: "1.7.4",
    date: "2025-11-10",
    added: [
      "Charts: exemplos adicionais para referência",
      "Charts: refatoração do estilo de labels",
      "Chart: novas props de formatação (pt-BR)",
      "Pickers: props para formatação de data",
    ],
  },
  {
    version: "1.7.3",
    date: "2025-11-04",
    added: ["Charts: formatadores de valores customizáveis"],
    fixed: ["LineChart: correção de erro de tipos"],
    notes: ["Publicação do pacote na versão 1.7.3"],
  },
  {
    version: "1.7.2",
    date: "2025-10-31",
    added: ["Build: novo script de verificação `scripts/check-dist-build.js`"],
    fixed: ["Exports: correções em index/export para compatibilidade"],
  },
  {
    version: "1.7.1",
    date: "2025-10-29",
    fixed: [
      "Exports: ajustes em `index.ts` para corrigir exportações",
      "CI: ajustes no workflow de versionamento e publish",
    ],
  },
];

const meta: Meta = {
  title: "Changelog",
  tags: ["!autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const MOTION = { duration: 0.28 };

    const containerVariants = {
      hidden: {},
      visible: {
        transition: { staggerChildren: 0.08, when: "beforeChildren" },
      },
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 6 },
      visible: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -6 },
    };

    const fadeScale = {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    };

    function groupByMonthYear(items: ChangeItem[]) {
      const groups: Record<string, ChangeItem[]> = {};
      items.forEach((it) => {
        const date = it.date ? new Date(it.date) : new Date();
        const key = new Intl.DateTimeFormat("en-US", {
          month: "long",
          year: "numeric",
        }).format(date);
        if (!groups[key]) groups[key] = [];
        groups[key].push(it);
      });
      return groups;
    }

    const [activeFilters, setActiveFilters] = React.useState<TagType[]>([]);

    function toggleFilter(type: TagType) {
      setActiveFilters((prev) =>
        prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
      );
    }

    function clearFilters() {
      setActiveFilters([]);
    }

    function itemMatchesFilters(it: ChangeItem, filters: TagType[]) {
      if (!filters || filters.length === 0) return true;
      if (filters.includes("added") && it.added) return true;
      if (filters.includes("changed") && it.changed) return true;
      if (filters.includes("fixed") && it.fixed) return true;
      if (filters.includes("notes") && it.notes) return true;
      return false;
    }

    const filteredData = changelogData.filter((it) =>
      itemMatchesFilters(it, activeFilters)
    );

    const groups = groupByMonthYear(filteredData);

    return (
      <motion.main
        className="min-h-screen p-8 bg-gradient-to-b overflow-y-scroll w-[1300px]"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        transition={{ duration: MOTION.duration }}
      >
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <motion.h1
                className="text-4xl font-extrabold"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.02 }}
              >
                Changelog
              </motion.h1>
              <motion.p
                className="mt-2 text-sm text-slate-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.06 }}
              >
                Versões, notas de release e histórico de alterações
              </motion.p>
            </div>

            <motion.div className="flex items-center gap-3">
              <motion.button
                className={`px-4 py-1.5 text-sm rounded-full transition-shadow shadow-sm flex items-center gap-2 border  ${
                  activeFilters.length === 0
                    ? "bg-slate-900 text-white border-transparent shadow-md"
                    : "bg-white/60 dark:bg-slate-800/60"
                }`}
                type="button"
                onClick={clearFilters}
                {...fadeScale}
              >
                ALL
              </motion.button>

              <motion.button
                className={`px-4 py-1.5 text-sm rounded-full transition-shadow shadow-sm flex items-center gap-2 border  ${
                  activeFilters.includes("added")
                    ? "bg-emerald-600 text-white border-transparent shadow-md"
                    : "bg-white/60 dark:bg-slate-800/60"
                }`}
                type="button"
                onClick={() => toggleFilter("added")}
                {...fadeScale}
              >
                NEW
              </motion.button>

              <motion.button
                className={`px-4 py-1.5 text-sm rounded-full transition-shadow shadow-sm flex items-center gap-2 border ${
                  activeFilters.includes("changed")
                    ? "bg-indigo-600 text-white border-transparent shadow-md"
                    : "bg-white/60 dark:bg-slate-800/60"
                }`}
                type="button"
                onClick={() => toggleFilter("changed")}
                {...fadeScale}
              >
                IMPROVEMENTS
              </motion.button>

              <motion.button
                className={`px-4 py-1.5 text-sm rounded-full transition-shadow shadow-sm flex items-center gap-2 border  ${
                  activeFilters.includes("fixed")
                    ? "bg-rose-600 text-white border-transparent shadow-md"
                    : "bg-white/60 dark:bg-slate-800/60"
                }`}
                type="button"
                onClick={() => toggleFilter("fixed")}
                {...fadeScale}
              >
                FIXES
              </motion.button>
            </motion.div>
          </div>
        </header>

        <section className="max-w-7xl space-y-8">
          <AnimatePresence>
            {Object.entries(groups).length === 0 && (
              <motion.div
                className="text-center text-sm text-slate-500 py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Nenhuma alteração encontrada para os filtros selecionados.
              </motion.div>
            )}

            {Object.entries(groups).map(([month, items]) => (
              <motion.div key={month} variants={itemVariants} layout>
                <motion.h2
                  className="text-4xl font-bold mb-2"
                  variants={itemVariants}
                >
                  {month}
                </motion.h2>

                <motion.div className="space-y-4" variants={itemVariants}>
                  <div className="h-0.5 w-full bg-muted-foreground" />
                  {items.map((it) => {
                    const date = it.date ? new Date(it.date) : new Date();
                    const day = new Intl.DateTimeFormat("en-US", {
                      day: "2-digit",
                    }).format(date);
                    const month = new Intl.DateTimeFormat("en-US", {
                      month: "short",
                    })
                      .format(date)
                      .toUpperCase();
                    const visibleAdded =
                      activeFilters.length === 0 ||
                      activeFilters.includes("added")
                        ? it.added ?? []
                        : [];
                    const visibleChanged =
                      activeFilters.length === 0 ||
                      activeFilters.includes("changed")
                        ? it.changed ?? []
                        : [];
                    const visibleFixed =
                      activeFilters.length === 0 ||
                      activeFilters.includes("fixed")
                        ? it.fixed ?? []
                        : [];

                    const visibleItems = [
                      ...visibleAdded,
                      ...visibleChanged,
                      ...visibleFixed,
                    ];

                    const primary = visibleItems[0] || "Release";
                    const details = visibleItems.slice(1);

                    const tags: { label: string; className: string }[] = [];
                    if (visibleAdded.length)
                      tags.push({
                        label: "NEW",
                        className: getTagStyles("added").tag,
                      });
                    if (visibleChanged.length)
                      tags.push({
                        label: "IMPROVEMENT",
                        className: getTagStyles("changed").tag,
                      });
                    if (visibleFixed.length)
                      tags.push({
                        label: "FIX",
                        className: getTagStyles("fixed").tag,
                      });

                    return (
                      <motion.article
                        key={it.version}
                        className="rounded-lg p-4 flex items-start justify-between gap-4 shadow-sm bg-white/60 dark:bg-slate-900/60 transition-transform"
                        variants={itemVariants}
                        layout
                      >
                        <div className="flex items-start gap-6">
                          <div className="w-14 text-center flex-shrink-0">
                            <div className="text-xs text-slate-400 uppercase tracking-wide">
                              {month}
                            </div>
                            <div className="text-3xl font-extrabold leading-none">
                              {day}
                            </div>
                          </div>

                          <div>
                            {(() => {
                              const primaryType: TagType | undefined = it.added
                                ? "added"
                                : it.changed
                                ? "changed"
                                : it.fixed
                                ? "fixed"
                                : it.notes
                                ? "notes"
                                : undefined;
                              const borderClass = primaryType
                                ? getTagStyles(primaryType).border
                                : "border-slate-200";

                              return (
                                <div
                                  className={`flex items-center gap-3 border-l-4 ${borderClass} pl-3`}
                                >
                                  <h3 className="text-lg font-semibold flex items-center gap-3">
                                    <span className="text-2xl">
                                      {it.version}
                                    </span>
                                    <span>-</span>
                                    <span className="text-2xl font-medium text-slate-800 dark:text-white">
                                      {primary}
                                    </span>
                                  </h3>
                                </div>
                              );
                            })()}

                            {details.length > 0 && (
                              <motion.ul
                                className="mt-3 list-disc list-inside text-sm text-slate-600 dark:text-slate-400"
                                initial="hidden"
                                animate="visible"
                              >
                                {details.map((sub, idx) => (
                                  <motion.li key={idx} variants={itemVariants}>
                                    {sub}
                                  </motion.li>
                                ))}
                              </motion.ul>
                            )}
                          </div>
                        </div>

                        <div className="inline-flex items-center gap-2">
                          {tags.map((t, idx) => (
                            <motion.span
                              key={idx}
                              title={t.label}
                              role="status"
                              aria-label={t.label}
                              className={`text-xs px-2 py-0.5 font-semibold rounded-full flex items-center gap-2 ${t.className} ring-1 ring-slate-100/30 shadow-sm `}
                            >
                              <span>{t.label}</span>
                            </motion.span>
                          ))}
                        </div>
                      </motion.article>
                    );
                  })}
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>
      </motion.main>
    );
  },
};
