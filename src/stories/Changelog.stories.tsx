import "../style/global.css";
import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

type ChangeItem = {
  version: string;
  date?: string;
  added?: string[];
  fixed?: string[];
  notes?: string[];
};

const changelogData: ChangeItem[] = [
  {
    version: "1.7.3",
    date: "04/11/2025",
    added: [
      "Suporte a formatadores de valor personalizados nos componentes de gráficos",
    ],
    fixed: ["Corrigido erro de tipagem no LineChart"],
    notes: ["Bumped package version to 1.7.3"],
  },
];

function IconBullet() {
  return (
    <svg
      aria-hidden
      className="w-4 h-4 flex-shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 12l2.2 2.2L16 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Section({ title, children, colorClass = "text-slate-800" }: { title: React.ReactNode; children?: React.ReactNode; colorClass?: string }) {
  return (
    <div className="mt-3">
      <p className={`font-semibold text-sm ${colorClass}`}>{title}</p>
      <div className="mt-2 text-sm text-slate-700 space-y-1">{children}</div>
    </div>
  );
}

function ChangelogCard({ item }: { item: ChangeItem }) {
  return (
    <article
      className="relative overflow-hidden rounded-lg p-5 shadow-md"
      aria-labelledby={`ch-${item.version}`}
    >
      <div className="absolute -inset-0.5 rounded-lg" aria-hidden />

      <div className="relative z-10">
        <header className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div>
              <h3 id={`ch-${item.version}`} className="text-lg font-bold text-slate-900 dark:text-gray-100">
                Release {item.version}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Resumo das alterações</p>
            </div>
          </div>

          {item.date && (
            <time
              dateTime={item.date}
              className="text-xs px-2 py-1 rounded-md bg-gray-50 dark:bg-slate-700 text-slate-600 dark:text-slate-200"
            >
              {item.date}
            </time>
          )}
        </header>

        <div className="mt-4 text-sm text-slate-700 dark:text-slate-300 space-y-3">
          {item.added && item.added.length > 0 && (
            <Section title="Adicionado" colorClass="text-emerald-700 dark:text-emerald-300">
              <ul className="space-y-2">
                {item.added.map((a, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 text-emerald-600 dark:text-emerald-300">
                      <IconBullet />
                    </span>
                    <span className="leading-tight">{a}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {item.fixed && item.fixed.length > 0 && (
            <Section title="Corrigido" colorClass="text-rose-700 dark:text-rose-300">
              <ul className="space-y-2">
                {item.fixed.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 text-rose-600 dark:text-rose-300">
                      <IconBullet />
                    </span>
                    <span className="leading-tight">{f}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {item.notes && item.notes.length > 0 && (
            <Section title="Notas" colorClass="text-slate-700 dark:text-slate-200">
              <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                {item.notes.map((n, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 text-slate-500 dark:text-slate-300">
                      <svg aria-hidden className="w-3 h-3" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="4" cy="4" r="3" stroke="currentColor" strokeWidth="0.5" />
                      </svg>
                    </span>
                    <span className="leading-tight">{n}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>
      </div>
    </article>
  );
}

const meta: Meta = {
  title: "Changelog",
  tags: ["!autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof ChangelogCard>;

export const Default: Story = {
  render: () => (
    <main className="min-h-screen p-8 bg-gradient-to-b">
      <header className="max-w-4xl mx-auto mb-6 text-center">
        <h1 className="text-3xl font-extrabold">Changelog</h1>
        <p className="mt-2 text-sm text-slate-500">Versões, notas de release e histórico de alterações</p>
      </header>

      <section className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
        {changelogData.map((item) => (
          <ChangelogCard key={item.version} item={item} />
        ))}
      </section>
    </main>
  ),
};
