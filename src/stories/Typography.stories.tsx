import "../style/global.css";
import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
  title: "Typography",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Guia visual de tipografia usando Tailwind — exemplos práticos, escala, famílias, pesos, espaçamentos e dicas de acessibilidade.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<unknown>;

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // ignore
  }
}


export const VisualGuide: Story = {
  render: () => (
    <div className="min-h-screen p-6 md:p-12 ">     
      <main className="max-w-6xl mx-auto space-y-10">
        <section className="bg-white/3 border border-white/6 rounded-2xl p-6 md:p-8 shadow-md backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                Título principal — H1
              </h1>
              <p className="text-sm  mt-2">Use H1 para páginas e vistas principais</p>
            </div>
           
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-gradient-to-tr from-white/3 to-white/6 rounded-xl border border-white/6 shadow-sm">
            <h2 className="text-3xl font-bold">H2 — Título secundário</h2>
            <p className="text-sm  mt-1">text-3xl • font-bold — bom para seções</p>
            <hr className="my-4 border-white/6" />
            <h3 className="text-2xl font-semibold">H3 — Seção</h3>
            <p className="text-sm  mt-1">text-2xl • font-semibold — subtítulos de nível intermediário</p>
          </div>

          <div className="p-6 bg-white/4 rounded-xl border border-white/6 shadow-sm">
            <h4 className="text-lg font-semibold">Uso prático</h4>
            <p className="text-sm  mt-2">
              Combine peso e tamanho para hierarquia clara. Evite combinar mais que duas famílias tipográficas por produto.
            </p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded bg-white/2 border border-white/5">
                <div className="text-xs ">Título curto</div>
                <div className="text-xl font-semibold">Exemplo de chamada</div>
              </div>

              <div className="p-3 rounded bg-white/2 border border-white/5">
                <div className="text-xs ">Parágrafo</div>
                <div className="text-base leading-7 ">Parágrafo com leading confortável para leitura.</div>
              </div>
            </div>
          </div>
        </section>

        <section className="p-6 bg-white/3 rounded-2xl border border-white/6">
          <h4 className="text-lg font-semibold">Escala de tamanhos</h4>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              ["text-6xl", "3.75rem"],
              ["text-5xl", "3rem"],
              ["text-4xl", "2.25rem"],
              ["text-3xl", "1.875rem"],
              ["text-2xl", "1.5rem"],
              ["text-xl", "1.25rem"],
              ["text-lg", "1.125rem"],
              ["text-base", "1rem"],
              ["text-sm", "0.875rem"],
              ["text-xs", "0.75rem"],
            ].map(([cls, size]) => (
              <div
                key={String(cls)}
                className="p-4 bg-white/4 rounded-lg border border-white/5 flex flex-col items-start gap-2"
              >
                <div className={`font-medium ${cls as string}`}>{cls}</div>
                <div className="text-xs ">{size}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl bg-white/4 border border-white/6">
            <h5 className="font-semibold">Famílias</h5>
            <div className="mt-3 space-y-2 ">
              <p className="font-sans text-lg">Sans — corpo e UI</p>
              <p className="font-serif text-lg">Serif — editorial</p>
              <p className="font-mono text-lg">Mono — código e rótulos</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/4 border border-white/6">
            <h5 className="font-semibold">Pesos</h5>
            <div className="mt-3 space-y-2 ">
              <p className="font-thin">Thin — font-thin</p>
              <p className="font-light">Light — font-light</p>
              <p className="font-normal">Normal — font-normal</p>
              <p className="font-medium">Medium — font-medium</p>
              <p className="font-semibold">Semibold — font-semibold</p>
              <p className="font-bold">Bold — font-bold</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/4 border border-white/6">
            <h5 className="font-semibold">Tracking & Leading</h5>
            <div className="mt-3 space-y-3 ">
              <p className="tracking-tight">tracking-tight — tight</p>
              <p className="tracking-normal">tracking-normal — normal</p>
              <p className="tracking-wide">tracking-wide — wide</p>
              <p className="leading-tight">leading-tight — linha próxima</p>
              <p className="leading-relaxed">leading-relaxed — mais respirável</p>
            </div>
          </div>
        </section>

        {/* Responsividade samples */}
        <section className="p-6 bg-white/3 rounded-2xl border border-white/6">
          <h4 className="text-lg font-semibold">Demo responsiva</h4>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded bg-white/4 border border-white/5">
              <p className="text-sm md:text-base lg:text-lg">text-sm / md:text-base / lg:text-lg</p>
              <div className="text-xs  mt-2">Redimensione a janela para ver a mudança</div>
            </div>

            <div className="p-4 rounded bg-white/4 border border-white/5">
              <p className="text-base md:text-lg lg:text-xl">text-base / md:text-lg / lg:text-xl</p>
              <div className="text-xs  mt-2">Bom para corpo e subtítulos</div>
            </div>

            <div className="p-4 rounded bg-white/4 border border-white/5">
              <p className="text-lg md:text-xl lg:text-2xl">text-lg / md:text-xl / lg:text-2xl</p>
              <div className="text-xs  mt-2">Use em cards e chamadas</div>
            </div>
          </div>
        </section>

        <section className="p-6 rounded-2xl border border-white/6 bg-white/2">
          <h4 className="text-lg font-semibold">Contraste rápido</h4>
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="p-4 rounded w-64 bg-white text-slate-900 border border-white/6">
              <p className="font-medium">#fff / text-slate-900 — bom contraste</p>
              <p className="text-sm text-slate-600">Use para conteúdo principal</p>
            </div>

            <div className="p-4 rounded w-64 bg-slate-900 text-white border border-white/8">
              <p className="font-medium">#111 / text-white — bom contraste</p>
              <p className="text-sm ">Fundo escuro com texto claro</p>
            </div>

            <div className="p-4 rounded w-64 bg-slate-100 text-slate-600 border border-white/6">
              <p className="font-medium">#f6f6f6 / text-slate-600 — verifique contraste</p>
              <p className="text-sm text-slate-500">Evite usar tons pouco contrastantes</p>
            </div>
          </div>
        </section>

        <section className="p-6 rounded-2xl border border-white/6 bg-white/3 ">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="text-lg font-semibold">Uso rápido (copiar/colar)</h4>
              <p className="text-sm  mt-1">Trechos úteis para copiar direto no projeto.</p>
            </div>

            <div>
              <button
                onClick={() =>
                  copyToClipboard(
                    `<h1 class="text-5xl md:text-6xl font-extrabold">Título</h1>\n<p class="text-base leading-7 text-gray-700">Parágrafo com leading e cor neutra</p>`
                  )
                }
                className="text-xs px-3 py-1 rounded-full bg-emerald-500/90 hover:bg-emerald-500 transition e"
              >
                Copiar
              </button>
            </div>
          </div>

          <pre className="bg-slate-900  p-4 rounded mt-3 overflow-auto text-white">
            {`<h1 class="text-5xl md:text-6xl font-extrabold">Título</h1>
<p class="text-base leading-7 text-gray-700">Parágrafo com leading e cor neutra</p>
<p class="text-sm md:text-base lg:text-lg">Texto responsivo</p>`}
          </pre>
        </section>
      </main>
    </div>
  ),
};

export const CodeExamples: Story = {
  parameters: {
    docs: {
      source: {
        language: "tsx",
        code: `// Headings\n<h1 className="text-5xl md:text-6xl font-extrabold">H1</h1>\n\n// Paragraph\n<p className="text-base leading-7 text-gray-700">Texto corrido...</p>\n\n// Responsivo\n<p className="text-sm md:text-base lg:text-lg">Texto responsivo</p>\n\n// Font families\n<p className="font-sans">Sans</p>\n<p className="font-serif">Serif</p>\n<p className="font-mono">Mono</p>\n`,
      },
    },
  },
  render: () => (
    <div className="min-h- p-6 ">
      <div className="max-w-4xl mx-auto p-6 rounded-xl bg-white/4 border border-white/6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Exemplos prontos</h3>
          <button
            onClick={() =>
              copyToClipboard(`<h1 class="text-5xl md:text-6xl font-extrabold">H1</h1>`)
            }
            className="text-xs px-3 py-1 rounded-full"
          >
            Copiar
          </button>
        </div>

        <pre className="mt-4 bg-slate-900  p-4 rounded overflow-auto text-white">
          <code>{`<h1 class="text-5xl md:text-6xl font-extrabold">H1</h1>\n\n<p class="text-base leading-7 text-gray-700">Texto corrido...</p>`}</code>
        </pre>
      </div>
    </div>
  ),
};
