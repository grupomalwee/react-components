import "../style/global.css";
import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CodeBlock } from "@/components/ui/CodeBlock";
import {
  CardBase,
  CardHeaderBase,
  CardTitleBase,
  CardDescriptionBase,
  CardContentBase,
} from "@/components/ui/data/CardBase";
import {
  TerminalIcon,
  CheckCircleIcon,
  WarningIcon,
  GearIcon,
} from "@phosphor-icons/react";
// removed ButtonBase — using CodeBlock tabs instead of a custom selector

const meta: Meta = {
  title: "Instalação",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Guia: Instalação, Dependências, Configuração e Solução de Problemas (cada story separado).",
      },
    },
  },
};
export default meta;
type Story = StoryObj<unknown>;

// Use the tabs feature of `CodeBlock` to show npm / yarn / pnpm options.

const InstalacaoContent: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col gap-6 p-8">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <TerminalIcon size={26} className="text-primary" />
          <div>
            <h1 className="text-xl font-bold">Instalação</h1>
            <p className="text-sm text-muted-foreground">
              Instale rapidamente com npm, yarn ou pnpm.
            </p>
          </div>
        </div>
      </header>

      <CardBase>
        <CardHeaderBase>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <CheckCircleIcon size={18} className="text-primary" />
              <CardTitleBase>Comandos</CardTitleBase>
            </div>
            <CardDescriptionBase>
              <small className="text-xs text-muted-foreground">
                Verifique versão com{" "}
                <code className="bg-muted px-2 py-1 rounded">
                  npm view &lt;package&gt; version
                </code>
              </small>
            </CardDescriptionBase>
          </div>
        </CardHeaderBase>
        <CardContentBase>
          <div className="mb-4" />

          <CodeBlock
            language="bash"
            filename="install.sh"
            tabs={[
              {
                name: "npm",
                code: "npm install @mlw-packages/react-components",
                language: "bash",
              },
              {
                name: "yarn",
                code: "yarn add @mlw-packages/react-components",
                language: "bash",
              },
              {
                name: "pnpm",
                code: "pnpm add @mlw-packages/react-components",
                language: "bash",
              },
            ]}
          />
        </CardContentBase>
      </CardBase>
      <CardBase>
        <CardHeaderBase>
          <div className="flex items-center gap-3">
            <CardTitleBase>Compatibilidade & peerDependencies</CardTitleBase>
          </div>
          <CardDescriptionBase>
            <p className="text-sm text-muted-foreground">
              Versões mínimas suportadas e dependências peer necessárias.
            </p>
          </CardDescriptionBase>
        </CardHeaderBase>
        <CardContentBase>
          <div className="grid gap-3">
            <div className="text-sm">
              <p className="font-semibold">Requisitos mínimos</p>
              <ul className="list-disc pl-5 text-sm text-muted-foreground">
                <li>
                  React: <code>^18.0.0</code>
                </li>
                <li>
                  React DOM: <code>^18.0.0</code>
                </li>
                <li>
                  Tailwind CSS: recomendado para estilos utilitários (qualquer
                  versão estável recente)
                </li>
                <li>
                  Ícones: <code>@phosphor-icons/react</code>
                </li>
              </ul>
            </div>

            <div className="text-sm">
              <p className="font-semibold">
                Instalar peer dependencies (exemplo)
              </p>
              <CodeBlock
                language="bash"
                filename="peer-deps.sh"
                code={`npm install react@^18 react-dom@^18 @phosphor-icons/react tailwindcss postcss autoprefixer --save`}
              />
              <p className="mt-2 text-xs text-muted-foreground">
                Ajuste as versões conforme seu projeto. Se usar yarn/pnpm,
                troque o comando.
              </p>
            </div>
          </div>
        </CardContentBase>
      </CardBase>
    </div>
  );
};

export const Instalacao: Story = {
  name: "Instalação",
  render: () => <InstalacaoContent />,
};

const DependenciasContent: React.FC = () => (
  <div className="min-h-[60vh] flex flex-col gap-6 p-8">
    <header className="flex items-center gap-3">
      <CheckCircleIcon size={26} className="text-primary" />
      <div>
        <h1 className="text-xl font-bold">Dependências</h1>
        <p className="text-sm text-muted-foreground">
          Passo a passo para instalar Tailwind e ícones Phosphor.
        </p>
      </div>
    </header>

    <CardBase>
      <CardHeaderBase>
        <div className="flex items-center gap-3">
          <CardTitleBase className="text-blue-500">
            Tailwind CSS (instalação)
          </CardTitleBase>
        </div>
        <CardDescriptionBase>
          <p className="text-sm text-muted-foreground">
            Se ainda não usa Tailwind, instale e inicialize:
          </p>
        </CardDescriptionBase>
      </CardHeaderBase>
      <CardContentBase>
        <div className="grid gap-3">
          <div className="mt-3 text-sm text-muted-foreground">
            Terminal CMD{" "}
          </div>
          <CodeBlock
            language="bash"
            filename="tailwind"
            code={`npm install -D tailwindcss postcss autoprefixer\nnpx tailwindcss init -p`}
          />

          <div className="mt-3 text-sm text-muted-foreground">
            index.css / global.css{" "}
          </div>
          <CodeBlock
            language="css"
            filename="global.css"
            code={`@tailwind base;\n@tailwind components;\n@tailwind utilities;`}
          />

          <div className="mt-3 text-sm text-muted-foreground">Vite.config </div>
          <CodeBlock
            language="js"
            filename="tailwind.config.js"
            code={`module.exports = {\n  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],\n  theme: { extend: {} },\n  plugins: [],\n};`}
          />
        </div>
      </CardContentBase>
    </CardBase>

    <CardBase>
      <CardHeaderBase>
        <CardTitleBase>Notas de versão & Upgrade</CardTitleBase>
      </CardHeaderBase>
      <CardContentBase>
        <div className="grid gap-3">
          <div className="text-sm text-muted-foreground">
            <p className="font-semibold">Ver versão publicada</p>
            <CodeBlock
              language="bash"
              filename="check-version.sh"
              code={`npm view @mlw-packages/react-components version`}
            />
          </div>

          <div className="text-sm text-muted-foreground">
            <p className="font-semibold">Atualizar para a última versão</p>
            <CodeBlock
              language="bash"
              filename="update.sh"
              code={`npm install @mlw-packages/react-components@latest`}
            />
            <p className="mt-2">
              Se houver breaking changes, confira o changelog/releases e siga o
              guia de migração.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Dica: teste em uma branch separada e leia as notas de release
              antes de atualizar produção.
            </p>
          </div>
        </div>
      </CardContentBase>
    </CardBase>

    <CardBase>
      <CardHeaderBase>
        <div className="flex items-center gap-3">
          <CardTitleBase className="text-emerald-500">
            Ícones (Phosphor)
          </CardTitleBase>
        </div>
        <CardDescriptionBase>
          <p className="text-sm text-muted-foreground">
            Instale o pacote de ícones (peer dependency recomendado):
          </p>
        </CardDescriptionBase>
      </CardHeaderBase>
      <CardContentBase>
        <CodeBlock
          language="bash"
          filename="install-icons.sh"
          code={`npm install @phosphor-icons/react`}
        />
        <div className="mt-3 text-sm text-muted-foreground">
          Importe onde necessário:
        </div>
        <CodeBlock
          language="tsx"
          filename="MyComp.tsx"
          code={`import { CheckCircle, Warning } from '@phosphor-icons/react';\n\nfunction MyComp(){\n  return <CheckCircle size={24} />\n}`}
        />
      </CardContentBase>
    </CardBase>
  </div>
);

export const Dependencias: Story = {
  name: "Dependências",
  render: () => <DependenciasContent />,
};

const ConfigContent: React.FC = () => (
  <div className="min-h-[60vh] flex flex-col gap-6 p-8">
    <header className="flex items-center gap-3">
      <GearIcon size={26} className="text-primary" />
      <div>
        <h1 className="text-xl font-bold">Configuração</h1>
        <p className="text-sm text-muted-foreground">
          Como integrar o pacote no seu app.
        </p>
      </div>
    </header>

    <CardBase>
      <CardHeaderBase>
        <CardTitleBase>Importar CSS global</CardTitleBase>
      </CardHeaderBase>
      <CardContentBase>
        <p className="text-sm text-muted-foreground mb-3">
          No arquivo principal (main.tsx / App.tsx / _app.tsx):
        </p>
        <CodeBlock
          language="tsx"
          filename="main.tsx"
          code={`import '@mlw-packages/react-components/dist/index.css';`}
        />
      </CardContentBase>
    </CardBase>

    <CardBase>
      <CardHeaderBase>
        <CardTitleBase>ThemeProvider (opcional)</CardTitleBase>
      </CardHeaderBase>
      <CardContentBase>
        <CodeBlock
          language="tsx"
          filename="App.tsx"
          code={`import { ThemeProviderBase } from '@mlw-packages/react-components';\n\nfunction App(){\n  return (\n    <ThemeProviderBase defaultTheme="light" storageKey="app-theme">\n      {/* app */}\n    </ThemeProviderBase>\n  )\n}`}
        />
      </CardContentBase>
    </CardBase>

    <CardBase>
      <CardHeaderBase>
        <CardTitleBase>Path alias (opcional)</CardTitleBase>
        <CardDescriptionBase>
          <p className="text-sm text-muted-foreground">Ex.: tsconfig + vite:</p>
        </CardDescriptionBase>
      </CardHeaderBase>
      <CardContentBase>
        <CodeBlock
          language="json"
          filename="tsconfig.json"
          code={`"compilerOptions": {\n    "paths": {\n      "@mlw-packages/react-components": ["./node_modules/@mlw-packages/react-components"]\n    }\n  }\n}`}
        />
        <CodeBlock
          language="ts"
          filename="vite.config.ts"
          code={`import { defineConfig } from 'vite';\nimport path from 'path';\n\nexport default defineConfig({\n  resolve: { alias: { '@mlw-packages/react-components': path.resolve(__dirname, './node_modules/@mlw-packages/react-components') } }\n});`}
        />
      </CardContentBase>
    </CardBase>
  </div>
);

export const Configuracao: Story = {
  name: "Configuração",
  render: () => <ConfigContent />,
};

const ProblemsContent: React.FC = () => {
  const issues = [
    {
      problem: "CSS não está sendo aplicado",
      fix: "Confirme import: import '@mlw-packages/react-components/dist/index.css' o Tailwind.",
    },
    {
      problem: "Erro de TypeScript nos imports",
      fix: "Ajuste paths no tsconfig.json e reinicie o TS Server (Cmd/Ctrl+Shift+P → 'TypeScript: Restart TS Server').",
    },
    {
      problem: "Ícones do Phosphor não aparecem",
      fix: "Instale @phosphor-icons/react.",
    },
    {
      problem: "Tema não atualiza",
      fix: "Verifique se a app está envolvida por <ThemeProviderBase> e se storageKey não conflita.",
    },
  ];

  return (
    <div className="min-h-[60vh] flex flex-col gap-6 p-8">
      <header className="flex items-center gap-3">
        <WarningIcon size={26} className="text-yellow-600" />
        <div>
          <h1 className="text-xl font-bold">Solução de Problemas</h1>
          <p className="text-sm text-muted-foreground">
            Problemas comuns e correções rápidas.
          </p>
        </div>
      </header>

      <CardBase>
        <CardHeaderBase>
          <CardTitleBase>Problemas comuns</CardTitleBase>
          <CardDescriptionBase>
            Correções rápidas para problemas frequentes
          </CardDescriptionBase>
        </CardHeaderBase>
        <CardContentBase>
          <div className="grid gap-3">
            {issues.map((it, idx) => (
              <CardBase key={idx} className="p-3">
                <div>
                  <p className="font-semibold mb-1">{it.problem}</p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Solução:</strong> {it.fix}
                  </p>
                </div>
              </CardBase>
            ))}
          </div>
        </CardContentBase>
      </CardBase>
    </div>
  );
};

export const SolucaoDeProblemas: Story = {
  name: "Solução de Problemas",
  render: () => <ProblemsContent />,
};
