import React from "react";
import { Badge } from "@/components/ui/data/Badge";
import type { ChangeItem } from "@/stories/changelog/changelog-data";

type TagType = "added" | "changed" | "fixed";

// Tipagem das Props incluindo o isEmpty
interface ChangelogProps {
  data?: ChangeItem[];
  isEmpty?: boolean; // Prop para Storybook / Controle manual
}

function formatMonthYear(date: Date) {
  const formatted = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(date);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

function groupByMonthYear(items: ChangeItem[]) {
  const map = new Map<string, ChangeItem[]>();
  for (const it of items) {
    const date = it.date ? new Date(it.date) : new Date();
    const key = formatMonthYear(date);
    const arr = map.get(key);
    if (arr) arr.push(it);
    else map.set(key, [it]);
  }
  return map;
}

export const Changelog: React.FC<ChangelogProps> = ({ 
  data = [], 
  isEmpty = false 
}) => {
  const [activeFilters, setActiveFilters] = React.useState<TagType[]>([]);
  const [collapsedMonths, setCollapsedMonths] = React.useState<Set<string>>(
    new Set()
  );
  const currentMonthYear = React.useMemo(() => formatMonthYear(new Date()), []);

  function toggleFilter(type: TagType) {
    setActiveFilters((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }

  function toggleMonth(month: string) {
    setCollapsedMonths((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(month)) {
        newSet.delete(month);
      } else {
        newSet.add(month);
      }
      return newSet;
    });
  }

  function clearFilters() {
    setActiveFilters([]);
  }

  function itemMatchesFilters(it: ChangeItem, filters: TagType[]) {
    if (!filters.length) return true;
    return (
      (filters.includes("added") && it.added) ||
      (filters.includes("changed") && it.changed) ||
      (filters.includes("fixed") && it.fixed)
    );
  }

  const filteredData = React.useMemo(
    () => data.filter((it) => itemMatchesFilters(it, activeFilters)),
    [data, activeFilters]
  );

  const groups = React.useMemo(
    () => groupByMonthYear(filteredData),
    [filteredData]
  );

  // Lógica para decidir se mostra o estado vazio
  const shouldShowEmpty = isEmpty || groups.size === 0;

  React.useEffect(() => {
    const monthsToCollapse = new Set<string>();
    Array.from(groups.keys()).forEach((month) => {
      if (month !== currentMonthYear) monthsToCollapse.add(month);
    });
    setCollapsedMonths(monthsToCollapse);
  }, [groups, currentMonthYear]);

  return (
    <main className="min-h-screen p-8 overflow-y-scroll w-[1300px]">
      <header className="mb-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white">
              Registro de Alterações
            </h1>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
              Versões, notas de lançamento e histórico de alterações
            </p>
          </div>

          <div className="flex items-center gap-1 bg-white dark:bg-slate-900 rounded-lg p-1 shadow-md border border-slate-200 dark:border-slate-800">
            <button
              className={`px-5 py-2.5 text-sm font-semibold rounded-md transition-all ${
                activeFilters.length === 0
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                  : "bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
              type="button"
              onClick={clearFilters}
            >
              TODOS
            </button>

            <button
              className={`px-5 py-2.5 text-sm font-semibold rounded-md transition-all ${
                activeFilters.includes("added")
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
              type="button"
              onClick={() => toggleFilter("added")}
            >
              NOVO
            </button>

            <button
              className={`px-5 py-2.5 text-sm font-semibold rounded-md transition-all ${
                activeFilters.includes("changed")
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
              type="button"
              onClick={() => toggleFilter("changed")}
            >
              MELHORIAS
            </button>

            <button
              className={`px-5 py-2.5 text-sm font-semibold rounded-md transition-all ${
                activeFilters.includes("fixed")
                  ? "bg-rose-600 text-white shadow-sm"
                  : "bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
              type="button"
              onClick={() => toggleFilter("fixed")}
            >
              CORREÇÕES
            </button>
          </div>
        </div>
      </header>

      <section className="max-w-7xl space-y-12">
        {shouldShowEmpty ? (
          /* --- BLOCO DE EMPTY STATE --- */
          <div className="flex flex-col items-center justify-center py-24 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20">
            <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full mb-4 text-slate-400">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Nenhuma alteração encontrada</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-center max-w-xs">
              Não há registros para exibir com os filtros atuais ou para o período selecionado.
            </p>
            {activeFilters.length > 0 && (
              <button 
                onClick={clearFilters}
                className="mt-6 px-4 py-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"
              >
                Limpar filtros aplicados
              </button>
            )}
          </div>
        ) : (
          /* --- LISTAGEM DOS GRUPOS --- */
          Array.from(groups.entries()).map(([month, items]) => {
            const isCollapsed = collapsedMonths.has(month);
            const isCurrentMonth = month === currentMonthYear;

            return (
              <div key={month}>
                <button
                  className="w-full text-left flex items-center justify-between gap-4 mb-6 hover:opacity-80 transition-opacity"
                  onClick={() => toggleMonth(month)}
                  type="button"
                >
                  <div className="flex items-center gap-3">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                      {month}
                    </h2>
                    {isCurrentMonth && <Badge color="green">ATUAL</Badge>}
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {items.length} {items.length === 1 ? "versão" : "versões"}
                    </span>
                  </div>
                  <svg
                    className="w-6 h-6 text-slate-400 transition-transform"
                    style={{
                      transform: isCollapsed ? "rotate(0deg)" : "rotate(180deg)",
                    }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {!isCollapsed && (
                  <div className="space-y-6">
                    {items.map((it: ChangeItem) => {
                      const visibleAdded =
                        activeFilters.length === 0 ||
                        activeFilters.includes("added")
                          ? (it.added ?? [])
                          : [];
                      const visibleChanged =
                        activeFilters.length === 0 ||
                        activeFilters.includes("changed")
                          ? (it.changed ?? [])
                          : [];
                      const visibleFixed =
                        activeFilters.length === 0 ||
                        activeFilters.includes("fixed")
                          ? (it.fixed ?? [])
                          : [];

                      return (
                        <article
                          key={it.version}
                          className="rounded-xl p-6 shadow-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow"
                        >
                          <div className="border-l-4 border-slate-900 dark:border-white pl-4">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                              {it.version}
                            </h3>
                            {it.shortTitle && (
                              <p className="mt-1 text-lg text-slate-600 dark:text-slate-400">
                                {it.shortTitle}
                              </p>
                            )}
                            {it.author && (
                              <p className="mt-1 text-sm text-slate-500 dark:text-slate-500">
                                por {it.author}
                              </p>
                            )}
                          </div>

                          <div className="mt-4 space-y-4">
                            {visibleAdded.length > 0 && (
                              <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-lg p-4 border border-emerald-200 dark:border-emerald-900">
                                <h4 className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 mb-2">
                                  NOVO
                                </h4>
                                <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-300 space-y-1">
                                  {visibleAdded.map((a: string, idx: number) => (
                                    <li key={idx}>{a}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {visibleChanged.length > 0 && (
                              <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-lg p-4 border border-indigo-200 dark:border-indigo-900">
                                <h4 className="text-sm font-semibold text-indigo-700 dark:text-indigo-400 mb-2">
                                  MELHORIAS
                                </h4>
                                <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-300 space-y-1">
                                  {visibleChanged.map((c: string, idx: number) => (
                                    <li key={idx}>{c}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {visibleFixed.length > 0 && (
                              <div className="bg-rose-50 dark:bg-rose-950/30 rounded-lg p-4 border border-rose-200 dark:border-rose-900">
                                <h4 className="text-sm font-semibold text-rose-700 dark:text-rose-400 mb-2">
                                  CORREÇÕES
                                </h4>
                                <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-300 space-y-1">
                                  {visibleFixed.map((f: string, idx: number) => (
                                    <li key={idx}>{f}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {it.notes && it.notes.length > 0 && (
                              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-400 mb-2">
                                  NOTAS
                                </h4>
                                <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-300 space-y-1">
                                  {it.notes.map((n: string, idx: number) => (
                                    <li key={idx}>{n}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </section>
    </main>
  );
};

export default Changelog;