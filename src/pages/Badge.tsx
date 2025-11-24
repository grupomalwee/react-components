import { Badge } from "@/components/ui/data/Badge";
import {
  CheckIcon,
  StarIcon,
  BellIcon,
  HeartIcon,
  ShieldIcon,
} from "@phosphor-icons/react";

export function BadgePage() {
  return (
    <section className="max-w-4xl mx-auto p-8 flex flex-col gap-8">
      {/* Variantes básicas */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Variantes</h2>
        <div className="flex flex-wrap gap-4">
          <Badge>Default</Badge>
          <Badge>Secondary</Badge>
          <Badge>Destructive</Badge>
          <Badge>Outline</Badge>
        </div>
      </div>

      {/* Badges com ícones */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Badges com Ícones</h2>
        <div className="flex flex-wrap gap-4">
          <Badge className="flex items-center gap-1">
            <CheckIcon className="w-4 h-4" aria-hidden="true" />
            Verified
          </Badge>
          <Badge className="flex items-center gap-1">
            <StarIcon className="w-4 h-4" aria-hidden="true" />
            Featured
          </Badge>
          <Badge className="flex items-center gap-1">
            <BellIcon className="w-4 h-4" aria-hidden="true" />
            Alert
          </Badge>
          <Badge className="flex items-center gap-1">
            <HeartIcon className="w-4 h-4" aria-hidden="true" />
            Liked
          </Badge>
        </div>
      </div>

      {/* Badges de contador */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Badges de Contador</h2>
        <div className="flex flex-wrap gap-4">
          {[1, 8, 99, 999, "20+", "NEW"].map((count, i) => {
            return (
              <Badge
                key={i}
                className="h-6 min-w-[1.5rem] rounded-full px-2 font-mono tabular-nums flex items-center justify-center"
                aria-label={`Badge com valor ${count}`}
              >
                {count}
              </Badge>
            );
          })}
        </div>
      </div>

      {/* Badge com status */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Status Indicators</h2>

        <div className="flex gap-8">
          <div className="relative">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <ShieldIcon className="w-6 h-6" />
            </div>
            <Badge />
          </div>
          <div className="relative">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <ShieldIcon className="w-6 h-6" />
            </div>
            <Badge />
          </div>
          <div className="relative">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <ShieldIcon className="w-6 h-6" />
            </div>
            <Badge />
          </div>
          <div className="relative">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <ShieldIcon className="w-6 h-6" />
            </div>
            <Badge />
          </div>
          <div className="relative">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <ShieldIcon className="w-6 h-6" />
            </div>
            <Badge className="bg-red-500" />
          </div>
        </div>
      </div>

      {/* Status com cores do Tailwind */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Status com Cores do Tailwind</h2>

        <div className="flex gap-8">
          <div className="relative">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <ShieldIcon className="w-6 h-6" />
            </div>
            <Badge className="bg-pink-500" />
          </div>
          <div className="relative">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <ShieldIcon className="w-6 h-6" />
            </div>
            <Badge className="bg-purple-500" />
          </div>
          <div className="relative">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <ShieldIcon className="w-6 h-6" />
            </div>
            <Badge className="bg-blue-500" />
          </div>
          <div className="relative">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <ShieldIcon className="w-6 h-6" />
            </div>
            <Badge className="bg-red-500" />
          </div>
          <div className="relative">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <ShieldIcon className="w-6 h-6" />
            </div>
            <Badge className="bg-pink-500" />
          </div>
        </div>
      </div>

      {/* Badge como link */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Badge como Link (asChild)</h2>
        <div className="flex flex-wrap gap-4">
          <Badge asChild>
            <a href="#" className="cursor-pointer">
              Clicável Default
            </a>
          </Badge>
          <Badge asChild>
            <a href="#" className="cursor-pointer">
              Clicável Secondary
            </a>
          </Badge>
          <Badge asChild>
            <a href="#" className="cursor-pointer">
              Clicável Outline
            </a>
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Tamanhos Customizados</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Badge className="text-xs px-1 py-0">Pequeno</Badge>
          <Badge>Padrão</Badge>
          <Badge className="text-sm px-3 py-1">Médio</Badge>
          <Badge className="text-base px-4 py-2">Grande</Badge>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">
          Cores Customizadas (via className)
        </h2>
        <div className="flex flex-wrap gap-4">
          <Badge className="bg-purple-500 text-white border-transparent hover:bg-purple-600">
            Roxo
          </Badge>
          <Badge className="bg-pink-500 text-white border-transparent hover:bg-pink-600">
            Rosa
          </Badge>
          <Badge className="bg-indigo-500 text-white border-transparent hover:bg-indigo-600">
            Indigo
          </Badge>
          <Badge className="bg-orange-500 text-white border-transparent hover:bg-orange-600">
            Laranja
          </Badge>
        </div>
      </div>

      {/* Badge com estilo inline customizado */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Estilos Inline</h2>
        <div className="flex flex-wrap gap-4">
          <Badge
            style={{
              backgroundColor: "#10b981",
              color: "white",
              borderRadius: "20px",
            }}
            className="border-transparent"
          >
            Verde Customizado
          </Badge>
          <Badge
            style={{
              background: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
            }}
          >
            Gradiente
          </Badge>
        </div>
      </div>

      {/* Exemplos de uso prático */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Exemplos de Uso Prático</h2>
        <div className="space-y-6">
          {/* Produto com badges */}
          <div className="border rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold">Produto Premium</h3>
              <Badge className="flex items-center gap-1">
                <StarIcon className="w-3 h-3" />
                Premium
              </Badge>
              <Badge>-50%</Badge>
            </div>
            <div className="flex gap-2">
              <Badge>Frete Grátis</Badge>
              <Badge>Estoque Limitado</Badge>
            </div>
          </div>

          <div className="border rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Central de Notificações</h3>
              <Badge className="rounded-full px-2">3</Badge>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span>Nova mensagem</span>
                <Badge className="text-xs">Novo</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span>Atualização disponível</span>
                <Badge className="text-xs">Info</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-8">
        <h2 className="text-2xl font-semibold mb-4">Documentação</h2>
        <div className="border-t-2 border-gray-300 mb-4"></div>

        <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
          <h3 className="font-medium mb-2">Como importar:</h3>
          <pre className="bg-gray-900 p-3 rounded-sm overflow-x-auto">
            <code>{`import { Badge } from "@/components/ui/Badge";
import { Check } from "@phosphor-icons/react";`}</code>
          </pre>
        </div>

        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h3 className="font-medium mb-2">Exemplos de uso:</h3>
          <pre className="bg-gray-900 p-3 rounded-sm overflow-x-auto text-sm">
            <code>{`// Badge básico
<Badge>Badge</Badge>

// Badge com variante
<Badge variant="secondary">Secondary</Badge>

// Badge com ícone
<Badge variant="default">
  <Check className="w-4 h-4" />
  Verificado
</Badge>

// Badge de status
<Badge status="online" />

// Badge como link
<Badge asChild variant="outline">
  <a href="/link">Clicável</a>
</Badge>

// Badge com cor customizada
<Badge status="custom" statusColor="#8b5cf6" />`}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
