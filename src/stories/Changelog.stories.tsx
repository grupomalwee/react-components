import "../style/global.css";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge, ColorType } from "@/components/ui/data/Badge";

type ChangeItem = {
  version: string;
  author?: string;
  date?: string;
  added?: string[];
  fixed?: string[];
  changed?: string[];
  notes?: string[];
};

type TagType = "added" | "changed" | "fixed" | "notes";

const changelogData: ChangeItem[] = [
  {
    version: "1.7.7",
    author: "Gabriel Glatz",
    date: "2025-11-00",
    added: [
      "Adicionado Novo Dashboard no stories de Templates.",
      "Adicionada funcionalidade HoverCard nas stories de Status.",
      "Criação de Agents para melhor documentação do Projeto.",
      "Setup de Controls (Storybook) para componentes de Select(Combobox, MultiCombobox e Select Simple).",
      "Props de Animations para o Tabs.",
    ],
    changed: [
      "Refatoração do uso do Badge nas stories e ajustes nas stories do DateTimePicker para comportamento padrão de data.",
      "CI: migração para pnpm v9, uso de --frozen-lockfile e padronização do setup de pnpm em workflows.",
      "Alterado o nome de BadgeBase para Badge em todas as suas ocorencias.",
      "Novos exemplos de Modal StoryBook.",
    ],
    fixed: [
      "Chart: ajustado erro de tipagem que causava warnings em builds estritos no Componente Filho Highlight.",
      "Picker: alterado tipagem não coerente no DateTimePicker.",
      "Carousel: fixado os botões de navegação para melhor posicionamento e estilo.",
    ],
  },
  {
    version: "1.7.6",
    author: "Gabriel Glatz",
    date: "2025-11-18",
    added: [
      "Badge: propriedades configuráveis para permitir ajustes de aparência e comportamento s.",
      "StatusIndicator: adicionamos novas opções de configuração para personalizar estados e cores dos indicadores.",
      "CodeBlock: implementamos suporte a múltiplas linguagens no realce de sintaxe, com detecção mais robusta.",
      "Charts: incluímos novos exemplos práticos para facilitar a integração em dashboards.",
    ],
    changed: [
      "Badge: refatoramos os estilos para garantir consistência visual entre temas e tamanhos.",
      "DateTimePicker: Removemos as props `hideHour` e `hideMinute`. E atualizamos a prop `displayFormat`.",
      "Tooltip: simplificamos a lógica e aplicamos otimizações para reduzir re-renders e melhorar performance.",
      "Configurações: limpamos itens relacionados a Docker e workflows de CI para simplificar o repositório.",
      "NPM: Trocamos de packages manager npm para pnpm para melhorar a performance e gerenciamento de dependências.",
    ],
    fixed: [
      "Chart: ajustamos a posição do rótulo do eixo Y quando usado o modo `leftTop`.",
      "Pickers: aplicados pequenos ajustes de layout para evitar sobreposição de elementos.",
      "ProgressBase/Calendar: correções visuais que normalizam a apresentação entre temas.",
    ],
    notes: [
      "Documentação: atualizamos o README e o changelog com instruções e exemplos mais claros.",
      "Exemplos: revisamos e ampliamos os exemplos para cobrir mais casos de uso.",
    ],
  },
  {
    version: "1.7.5",
    author: "Gabriel Glatz",
    date: "2025-11-13",
    added: [
      "RangePicker: adicionamos suporte à formatação em pt-BR para exibir intervalos no formato local.",
      "DateTimePicker: agora abre no mês de borda, melhorando a navegação entre meses adjacentes.",
      "ButtonBase: aprimoramos o suporte a `children` e o estado de loading para comportamentos previsíveis.",
      "CodeBlock: introduzimos abas e melhorias no realce de sintaxe para múltiplos blocos.",
      "Combobox: reorganizamos a estrutura para melhorar acessibilidade e integração com formulários.",
    ],
    fixed: [
      "Pickers: ajustes finos de estilo que corrigem alinhamentos e espaçamentos.",
      "ProgressBase: correções no layout para evitar que barras fiquem desalinhadas.",
      "Combobox: removida a prop obsoleta `disabled` e atualizada a API para o novo comportamento.",
      "Chart: corrigimos o posicionamento do rótulo do eixo Y em algumas configurações.",
    ],
  },
  {
    version: "1.7.4",
    author: "Gabriel Glatz",
    date: "2025-11-10",
    added: [
      "Charts: adicionamos exemplos adicionais para demonstrar casos de uso comuns.",
      "Charts: refatoramos o estilo das labels para melhorar legibilidade em diferentes tamanhos.",
      "Chart: incluímos novas props de formatação voltadas para pt-BR.",
      "Pickers: adicionadas props para personalizar a formatação de datas.",
    ],
  },
  {
    version: "1.7.3",
    author: "Gabriel Glatz",
    date: "2025-11-04",
    added: [
      "Charts: disponibilizamos formatadores de valores customizáveis para adaptar labels e tooltips aos requisitos do projeto.",
    ],
    fixed: [
      "LineChart: corrigimos um erro de tipagem que causava warnings em builds estritos.",
    ],
    notes: ["Publicação: pacote publicado na versão 1.7.3."],
  },
  {
    version: "1.7.2",
    author: "Gabriel Glatz",
    date: "2025-10-31",
    added: [
      "Build: incluímos um script de verificação (`scripts/check-dist-build.js`) para validar o build de distribuição antes do publish.",
    ],
    fixed: [
      "Exports: corrigimos pontos na exportação de módulos para garantir compatibilidade entre bundlers.",
    ],
  },
  {
    version: "1.7.1",
    author: "Gabriel Glatz",
    date: "2025-10-29",
    fixed: [
      "Exports: ajustamos `index.ts` para corrigir exportações incorretas e evitar imports quebrados.",
      "CI: melhoramos o workflow de versionamento e publicação para reduzir falhas automáticas.",
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
    const MOTION = { duration: 0.08 };

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

    function parseDateLocal(dateStr?: string) {
      if (!dateStr) return new Date();
      const parts = dateStr.split("-").map((p) => parseInt(p, 10));
      if (parts.length < 3 || parts.some(Number.isNaN))
        return new Date(dateStr);
      const [y, m, d] = parts;
      return new Date(y, m - 1, d);
    }

    function groupByMonthYear(items: ChangeItem[]) {
      const groups: Record<string, ChangeItem[]> = {};
      items.forEach((it) => {
        const date = it.date ? parseDateLocal(it.date) : new Date();
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
                Versões, notas de lançamento e histórico de alterações
              </motion.p>
            </div>

            <motion.div className="flex items-center ">
              <motion.button
                className={`px-4 py-1.5 text-sm rounded-l-lg transition-shadow shadow-sm flex items-center border  ${
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
                className={`px-4 py-1.5 text-sm  transition-shadow shadow-sm flex items-center border  ${
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
                className={`px-4 py-1.5 text-sm  transition-shadow shadow-sm flex items-center border ${
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
                className={`px-4 py-1.5 text-sm rounded-r-lg transition-shadow shadow-sm flex items-center  border  ${
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

        <section className="max-w-7xl space-y-12">
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
                  className="text-3xl font-bold mb-2"
                  variants={itemVariants}
                >
                  {month}
                </motion.h2>

                <motion.div className="space-y-4" variants={itemVariants}>
                  <div className="h-0.5 w-full bg-muted-foreground" />
                  {items.map((it) => {
                    const date = it.date ? parseDateLocal(it.date) : new Date();
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

                    const primary = visibleItems[0] || "Lançamento";
                    const details = visibleItems.slice(1);

                    const tags: { label: string; color: string }[] = [];
                    if (visibleAdded.length)
                      tags.push({ label: "NEW", color: "green" });
                    if (visibleChanged.length)
                      tags.push({ label: "IMPROVEMENT", color: "purple" });
                    if (visibleFixed.length)
                      tags.push({ label: "FIX", color: "red" });

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
                              return (
                                <div className="flex items-center gap-3 border-l-4 pl-3">
                                  <h3 className="text-lg font-semibold flex items-center gap-3">
                                    <span className="text-2xl">
                                      {it.version}
                                    </span>
                                    <span>-</span>
                                    <span className="text-xl ">{primary}</span>
                                  </h3>
                                </div>
                              );
                            })()}

                            {details.length > 0 && (
                              <motion.ul
                                className="mt-5 list-disc list-inside text-sm text-slate-600 dark:text-slate-400"
                                initial="hidden"
                                animate="visible"
                              >
                                {details.map((sub, idx) => (
                                  <motion.li
                                    key={idx}
                                    variants={itemVariants}
                                    className="py-0.5"
                                  >
                                    {sub}
                                  </motion.li>
                                ))}
                              </motion.ul>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2 mt-1">
                          <div className="inline-flex items-center gap-2">
                            {tags.map((t, idx) => (
                              <Badge key={idx} color={t.color as ColorType}>
                                <span>{t.label}</span>
                              </Badge>
                            ))}
                          </div>
                          {it.author && (
                            <div className="text-xs text-slate-500">
                              by {it.author}
                            </div>
                          )}
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
