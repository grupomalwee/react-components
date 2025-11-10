import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { CopyButton } from "@/components/ui/form/SmallButtons";

const meta: Meta = {
  title: "Documentação/Tipografia",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Sistema de tipografia completo com escala de tamanhos, pesos, famílias e exemplos de uso. Baseado em Tailwind CSS com suporte a responsividade.",
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

export const Headings: Story = {
  name: "Títulos",
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">Hierarquia de Títulos</h1>
          <p className="text-muted-foreground">
            Sistema de títulos H1 a H6 com tamanhos e pesos adequados
          </p>
        </div>

        {/* H1 */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
              H1
            </span>
            <CopyButton
              onClick={() =>
                copyToClipboard(
                  '<h1 className="text-5xl md:text-6xl font-extrabold">Título Principal</h1>'
                )
              }
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-2">
            Título Principal
          </h1>
          <p className="text-sm text-muted-foreground">
            text-5xl md:text-6xl • font-extrabold • Use para título principal da
            página
          </p>
        </div>

        {/* H2 */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
              H2
            </span>
            <CopyButton
              onClick={() =>
                copyToClipboard(
                  '<h2 className="text-3xl md:text-4xl font-bold">Título de Seção</h2>'
                )
              }
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Título de Seção
          </h2>
          <p className="text-sm text-muted-foreground">
            text-3xl md:text-4xl • font-bold • Para seções principais
          </p>
        </div>

        {/* H3 */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
              H3
            </span>
            <CopyButton
              onClick={() =>
                copyToClipboard(
                  '<h3 className="text-2xl md:text-3xl font-semibold">Subtítulo</h3>'
                )
              }
            />
          </div>
          <h3 className="text-2xl md:text-3xl font-semibold mb-2">Subtítulo</h3>
          <p className="text-sm text-muted-foreground">
            text-2xl md:text-3xl • font-semibold • Para subseções
          </p>
        </div>

        {/* H4, H5, H6 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
              H4
            </span>
            <h4 className="text-xl font-semibold mt-3 mb-2">Título Menor</h4>
            <p className="text-xs text-muted-foreground">
              text-xl • font-semibold
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
              H5
            </span>
            <h5 className="text-lg font-medium mt-3 mb-2">Subtítulo Card</h5>
            <p className="text-xs text-muted-foreground">
              text-lg • font-medium
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
              H6
            </span>
            <h6 className="text-base font-medium mt-3 mb-2">Label Seção</h6>
            <p className="text-xs text-muted-foreground">
              text-base • font-medium
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Hierarquia completa de títulos H1 a H6 com exemplos de uso.",
      },
    },
  },
};

export const Sizes: Story = {
  name: "Tamanhos",
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">Escala de Tamanhos</h1>
          <p className="text-muted-foreground">
            Sistema completo de tamanhos tipográficos
          </p>
        </div>

        {/* Size Scale */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { class: "text-6xl", size: "3.75rem / 60px", label: "6xl" },
            { class: "text-5xl", size: "3rem / 48px", label: "5xl" },
            { class: "text-4xl", size: "2.25rem / 36px", label: "4xl" },
            { class: "text-3xl", size: "1.875rem / 30px", label: "3xl" },
            { class: "text-2xl", size: "1.5rem / 24px", label: "2xl" },
            { class: "text-xl", size: "1.25rem / 20px", label: "xl" },
            { class: "text-lg", size: "1.125rem / 18px", label: "lg" },
            { class: "text-base", size: "1rem / 16px", label: "base" },
            { class: "text-sm", size: "0.875rem / 14px", label: "sm" },
            { class: "text-xs", size: "0.75rem / 12px", label: "xs" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                  {item.label}
                </span>
                <CopyButton
                  onClick={() => copyToClipboard(`className="${item.class}"`)}
                />
              </div>
              <div className={`${item.class} font-semibold mb-2`}>Aa</div>
              <p className="text-xs text-muted-foreground">{item.size}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Escala completa de tamanhos de texto do sistema.",
      },
    },
  },
};

export const Weights: Story = {
  name: "Pesos",
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">Pesos de Fonte</h1>
          <p className="text-muted-foreground">Variações de peso disponíveis</p>
        </div>

        {/* Weights */}
        <div className="space-y-4">
          {[
            { class: "font-thin", weight: "100", label: "Thin" },
            { class: "font-extralight", weight: "200", label: "Extra Light" },
            { class: "font-light", weight: "300", label: "Light" },
            { class: "font-normal", weight: "400", label: "Normal" },
            { class: "font-medium", weight: "500", label: "Medium" },
            { class: "font-semibold", weight: "600", label: "Semibold" },
            { class: "font-bold", weight: "700", label: "Bold" },
            { class: "font-extrabold", weight: "800", label: "Extra Bold" },
            { class: "font-black", weight: "900", label: "Black" },
          ].map((item) => (
            <div
              key={item.weight}
              className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">
                      {item.weight}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {item.label}
                    </span>
                  </div>
                  <p className={`text-3xl ${item.class}`}>
                   Gentle lions admire tall zebras
                  </p>
                </div>
                <CopyButton
                  onClick={() => copyToClipboard(`className="${item.class}"`)}
                  className="ml-4"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Todos os pesos de fonte disponíveis no sistema.",
      },
    },
  },
};

export const Families: Story = {
  name: "Famílias",
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">Famílias Tipográficas</h1>
          <p className="text-muted-foreground">
            Diferentes estilos de fonte para diferentes contextos
          </p>
        </div>

        {/* Sans Serif */}
        <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold mb-1">Sans Serif</h3>
              <p className="text-sm text-muted-foreground">
                font-sans • Para corpo de texto e interface
              </p>
            </div>
            <CopyButton
              onClick={() => copyToClipboard('className="font-sans"')}
            />
          </div>
          <p className="font-sans text-2xl">
           Gentle lions admire tall zebras
          </p>
          <p className="font-sans text-base mt-3 text-muted-foreground">
            ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
          </p>
        </div>

        {/* Serif */}
        <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold mb-1">Serif</h3>
              <p className="text-sm text-muted-foreground">
                font-serif • Para conteúdo editorial e elegante
              </p>
            </div>
            <CopyButton
              onClick={() => copyToClipboard('className="font-serif"')}
            />
          </div>
          <p className="font-serif text-2xl">
           Gentle lions admire tall zebras
          </p>
          <p className="font-serif text-base mt-3 text-muted-foreground">
            ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
          </p>
        </div>

        {/* Mono */}
        <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold mb-1">Monospace</h3>
              <p className="text-sm text-muted-foreground">
                font-mono • Para código e dados técnicos
              </p>
            </div>
            <CopyButton
              onClick={() => copyToClipboard('className="font-mono"')}
            />
          </div>
          <p className="font-mono text-2xl">
           Gentle lions admire tall zebras
          </p>
          <p className="font-mono text-base mt-3 text-muted-foreground">
            ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Famílias tipográficas disponíveis e seus casos de uso.",
      },
    },
  },
};
