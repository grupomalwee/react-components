import type { Meta, StoryObj } from "@storybook/react-vite";
import { motion, useReducedMotion } from "framer-motion";
import React, { useState } from "react";
import { Lightbulb, Warning, CopySimple } from "@phosphor-icons/react";

const meta: Meta = {
  title: "Dicas úteis",
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `\n# Dicas rápidas para usar os componentes\n\nPainel com dicas práticas para quem está começando a usar os componentes React deste projeto e Storybook. Conteúdo em português, focado em produtividade e boas práticas. Use este painel como referência rápida ou template para outras stories informativas.`,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f6f6f6" },
        { name: "dark", value: "#0b0b0d" },
      ],
    },
  },
};

export default meta;

type Story = StoryObj<unknown>;

function IconWrapper({
  children,
  tone = "amber",
}: {
  children: React.ReactNode;
  tone?: string;
}) {
  const bg = {
    amber: "bg-amber-50 text-amber-600",
    red: "bg-red-50 text-red-600",
    slate: "bg-slate-50 text-slate-700",
  }[tone];

  return (
    <span
      className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${bg} ring-1 ring-inset ring-neutral-100 dark:ring-neutral-800`}
      aria-hidden
    >
      {children}
    </span>
  );
}

function TipCard({
  index,
  title,
  body,
  example,
}: {
  index: number;
  title: string;
  body: string;
  example?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!example) return;
    try {
      await navigator.clipboard.writeText(example);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      console.warn("Clipboard failed", e);
    }
  }

  return (
    <article
      aria-labelledby={`tip-${index}`}
      className="relative p-4 rounded-2xl bg-white/70 dark:bg-neutral-900/60 backdrop-blur-sm border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-lg transition-transform hover:-translate-y-1 motion-reduce:transform-none"
    >
      <div className="flex items-start gap-4">
        <IconWrapper>
          <Lightbulb weight="duotone" className="w-5 h-5" />
        </IconWrapper>

        <div className="flex-1 min-w-0">
          <h3
            id={`tip-${index}`}
            className="font-semibold text-sm leading-snug text-slate-900 dark:text-white"
          >
            {index}. {title}
          </h3>

          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-2 break-words">
            {body}
          </p>

          {example && (
            <div className="mt-3 flex items-center gap-3">
              <pre className="rounded-md px-2 py-1 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 overflow-auto max-w-full">
                <code>{example}</code>
              </pre>

              <button
                onClick={handleCopy}
                aria-label={copied ? "Copiado" : "Copiar exemplo"}
                title={copied ? "Copiado" : "Copiar exemplo"}
                className="inline-flex items-center gap-2 px-2 py-1 rounded-md text-sm border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-sm hover:shadow transition"
              >
                <CopySimple weight="bold" className="w-4 h-4" />
                <span className="text-xs">{copied ? "Copiado" : "Copiar"}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export const Tips: Story = {
  render: () => {
    const shouldReduceMotion = useReducedMotion();

    const cards = [
      {
        title: "Navegue e busque Stories",
        body: "Use a barra lateral do Storybook para procurar componentes e Stories. A busca (ícone de lupa) ajuda a encontrar pelo nome do componente ou da story.",
      },
      {
        title: "Controls: experimente props ao vivo",
        body: "Abra a aba Controls para alterar props em tempo real. Teste tamanhos, variantes e estados sem tocar em código.",
      },
      {
        title: "Docs e Source: copie exemplos prontos",
        body: "Na aba Docs você encontra a tabela de props e exemplos. Use Source (ou Show code) para copiar o snippet com import e JSX pronto.",
      },
      {
        title: "Ajuste o visual do Storybook",
        body: "Use o seletor de temas e backgrounds para testar cores claras/escuro e diferentes viewports.",
      },
      {
        title: "Procure exemplos práticos",
        body: "Muitos Stories incluem exemplos compostos (ex.: Header com Navigation). Abra essas Stories para ver combinações.",
      },
      {
        title: "Dúvidas sobre imports ou versões",
        body: "Se o Storybook mostrar o import, ele indica o pacote. Para a versão, verifique o package.json do seu projeto ou o npm.",
      },
      {
        title: "Referências rápidas",
        body: "Controls: testar props. Docs/Source: copiar import e JSX. Aba Stories: encontrar exemplos compostos.",
      },
      {
        title: "Comportamentos automáticos",
        body: "Se um componente piscar ou abrir/fechar sozinho, confira Actions, Accessibility ou desative temporariamente addons que simulam interações.",
      },
    ];

    const commonProblems = [
      {
        title: "Componente não aparece / tela em branco",
        body: `Verifique console do navegador para erros (missing export ou error de runtime). Confirme import do componente e props obrigatórias na story. Se depender de dados remotos, garanta mocks ou dados de exemplo.`,
      },
      {
        title: "Componente pisca ou muda estado sozinho",
        body: `Addons como Controls/Interactions podem disparar updates; revise timers (clearInterval/clearTimeout) e efeitos (useEffect) com dependências corretas. Use Actions para identificar eventos.`,
      },
      {
        title: "Estilos incorretos em diferentes temas",
        body: `Verifique variáveis de tema, classes condicionais e se o Storybook aplica o decorator de tema. Atenção a especificidade e ao purge do Tailwind (classe dinâmica pode sumir).`,
      },
      {
        title: "Dependências / peer deps",
        body: `Conflitos de peer deps podem quebrar build. Tente instalar com --legacy-peer-deps / npm i @mlw-packages/react-components --legacy-peer-deps caso erro de conflito/ dependência desatualizada o mesmo para o Phosphos Icons .`,
      },
      {
        title: "Ícones (Phosphor) não renderam",
        body: `Instale: npm i @phosphor-icons/react e verifique se o bundler transpila corretamente packages ESM/TSX. Em Vite normalmente funciona, em setups customizados pode ser necessário transpile.`,
      },
      {
        title: "Docs/Source não exibem código",
        body: `Confirme addon-docs configurado e a flag sourceLoader. Em alguns casos, é preciso habilitar docs: { source: { type: 'code' } } no preview.ts config.`,
      },
    ];

    return (
      <main className="min-h-screen flex items-start justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
          className="max-w-7xl w-full"
        >
          <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-1">
                Dicas úteis
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xl">
                Painel com dicas rápidas para usar componentes no Storybook
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://www.npmjs.com/package/@mlw-packages/react-components"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-md text-sm shadow-sm hover:shadow"
                title="Abrir página no npm"
              >
                NPM
                
              </a>
            </div>
          </header>

          <section className="grid grid-cols-2 gap-4">
            {cards.map((c, i) => (
              <TipCard key={i} index={i + 1} title={c.title} body={c.body} />
            ))}
          </section>

          <section className="mt-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-3">
              <IconWrapper tone="red">
                <Warning className="w-4 h-4" weight="bold" />
              </IconWrapper>
              Problemas comuns & soluções rápidas
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {commonProblems.map((p, i) => (
                <details
                  key={i}
                  className="relative p-3 rounded-xl bg-white/70 dark:bg-neutral-900/60 border border-neutral-100 dark:border-neutral-800 shadow-sm"
                >
                  <summary className="font-medium cursor-pointer list-none outline-none">
                    {p.title}
                  </summary>
                  <div className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                    {p.body}
                  </div>
                </details>
              ))}
            </div>
          </section>
        </motion.div>
      </main>
    );
  },
};
