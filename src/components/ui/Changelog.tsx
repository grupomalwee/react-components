import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge, BadgeColorType } from "@/components/ui/data/Badge";
import type { ChangeItem } from "@/stories/data/changelog-data";

type TagType = "added" | "changed" | "fixed" | "notes";

function parseDateSafe(dateStr?: string): Date {
  if (!dateStr) return new Date();
  const parts = dateStr.split("-").map((p) => parseInt(p, 10));
  if (parts.length === 3 && parts.every((n) => !Number.isNaN(n))) {
    const [y, m, d] = parts;
    return new Date(y, m - 1, d);
  }
  const parsed = new Date(dateStr);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

function formatMonthYear(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatDay(date: Date) {
  return new Intl.DateTimeFormat("en-US", { day: "2-digit" }).format(date);
}

function formatMonthAbbr(date: Date) {
  return new Intl.DateTimeFormat("en-US", { month: "short" })
    .format(date)
    .toUpperCase();
}

function firstEntryText(it: ChangeItem): string | undefined {
  return (
    (it.added && it.added[0]) ||
    (it.changed && it.changed[0]) ||
    (it.fixed && it.fixed[0]) ||
    (it.notes && it.notes[0])
  );
}

function getShortTitle(it: ChangeItem): string {
  const firstText = firstEntryText(it) || "";
  if (!firstText) return "Atualização";
  let cleaned = firstText.replace(/^\s*[A-Za-z0-9\-_.()]+:\s*/u, "");
  cleaned = cleaned.replace(/[`"']/g, "").trim();
  const localizedVerbs = [
    "adicionado",
    "adicionada",
    "adicionadas",
    "adicionados",
    "corrigido",
    "corrigida",
    "melhorado",
    "melhorada",
    "removido",
    "removida",
  ];
  const lower = cleaned.toLowerCase();
  for (const v of localizedVerbs) {
    if (lower.startsWith(v + " ")) {
      cleaned = cleaned.slice(v.length).trim();
      break;
    }
  }
  const sentence = (cleaned.match(/^[^.!?]+/) || [cleaned])[0].trim();
  const trimmed = sentence.replace(/[:;,]+$/g, "").trim();
  const maxWords = 5;
  const words = trimmed.split(/\s+/).filter(Boolean);
  if (words.length === 0) return "Atualização";
  const short = words.slice(0, maxWords).join(" ");
  const final = words.length > maxWords ? short + "…" : short;
  return final.charAt(0).toUpperCase() + final.slice(1);
}

function groupByMonthYear(items: ChangeItem[]) {
  const map = new Map<string, ChangeItem[]>();
  for (const it of items) {
    const date = it.date ? parseDateSafe(it.date) : new Date();
    const key = formatMonthYear(date);
    const arr = map.get(key);
    if (arr) arr.push(it);
    else map.set(key, [it]);
  }
  return map;
}

export const Changelog: React.FC<{ data?: ChangeItem[] }> = ({ data = [] }) => {
  const MOTION = React.useMemo(() => ({ duration: 0.08 }), []);

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

  const filteredData = React.useMemo(() => {
    if (!data || data.length === 0) return [] as ChangeItem[];
    return data.filter((it) => itemMatchesFilters(it, activeFilters));
  }, [data, activeFilters]);

  const groups = React.useMemo(
    () => groupByMonthYear(filteredData),
    [filteredData]
  );

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
          {groups.size === 0 && (
            <motion.div
              className="text-center text-sm text-slate-500 py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Nenhuma alteração encontrada para os filtros selecionados.
            </motion.div>
          )}

          {Array.from(groups.entries()).map(([month, items]) => (
            <motion.div key={month} variants={itemVariants} layout>
              <motion.h2
                className="text-3xl font-bold mb-2"
                variants={itemVariants}
              >
                {month}
              </motion.h2>

              <motion.div className="space-y-4" variants={itemVariants}>
                <div className="h-0.5 w-full bg-muted-foreground" />
                {items.map((it: ChangeItem) => {
                  const date = it.date ? parseDateSafe(it.date) : new Date();
                  const day = formatDay(date);
                  const monthAbbr = formatMonthAbbr(date);
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
                      <div className="flex items-start gap-6 w-full">
                        <div className="w-14 text-center flex-shrink-0">
                          <div className="text-xs text-slate-400 uppercase tracking-wide">
                            {monthAbbr}
                          </div>
                          <div className="text-3xl font-extrabold leading-none">
                            {day}
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 border-l-4 pl-3">
                            <h3 className="text-lg font-semibold flex items-center gap-3">
                              <span className="text-2xl">{it.version}</span>
                              <span>-</span>
                              <span className="text-xl ">
                                {it.shortTitle
                                  ? it.shortTitle
                                  : getShortTitle(it)}
                              </span>
                            </h3>
                          </div>

                          <div className="mt-4 space-y-4">
                            {visibleAdded.length > 0 && (
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge color={"green" as BadgeColorType}>
                                    NEW
                                  </Badge>
                                </div>
                                <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400">
                                  {visibleAdded.map(
                                    (a: string, idx: number) => (
                                      <li
                                        key={"added-" + idx}
                                        className="py-0.5"
                                      >
                                        {a}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}

                            {visibleChanged.length > 0 && (
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge color={"purple" as BadgeColorType}>
                                    IMPROVEMENT
                                  </Badge>
                                </div>
                                <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400">
                                  {visibleChanged.map(
                                    (c: string, idx: number) => (
                                      <li
                                        key={"changed-" + idx}
                                        className="py-0.5"
                                      >
                                        {c}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}

                            {visibleFixed.length > 0 && (
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge color={"red" as BadgeColorType}>
                                    FIX
                                  </Badge>
                                </div>
                                <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400">
                                  {visibleFixed.map(
                                    (f: string, idx: number) => (
                                      <li
                                        key={"fixed-" + idx}
                                        className="py-0.5"
                                      >
                                        {f}
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}

                            {it.notes && it.notes.length > 0 && (
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge color={"slate" as BadgeColorType}>
                                    NOTE
                                  </Badge>
                                </div>
                                <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400">
                                  {it.notes.map((n: string, idx: number) => (
                                    <li key={"note-" + idx} className="py-0.5">
                                      {n}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2 mt-1">
                        <div className="inline-flex items-center gap-2">
                          {tags.map((t, idx: number) => (
                            <Badge key={idx} color={t.color as BadgeColorType}>
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
};

export default Changelog;
