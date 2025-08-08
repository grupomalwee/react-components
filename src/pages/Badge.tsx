import { BadgeBase } from "@/components/ui/BadgeBase";
import { Check, Star, Bell, Heart, Shield } from "phosphor-react";

export function BadgePage() {
  return (
    <section className="max-w-4xl mx-auto p-8 flex flex-col gap-8">

      {/* Variantes básicas */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Variantes</h2>
        <div className="flex flex-wrap gap-4">
          <BadgeBase>Default</BadgeBase>
          <BadgeBase variant="secondary">Secondary</BadgeBase>
          <BadgeBase variant="destructive">Destructive</BadgeBase>
          <BadgeBase variant="outline">Outline</BadgeBase>
        </div>
      </div>

      {/* Badges com ícones */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Badges com Ícones</h2>
        <div className="flex flex-wrap gap-4">
          <BadgeBase variant="default" className="flex items-center gap-1">
            <Check className="w-4 h-4" aria-hidden="true" />
            Verified
          </BadgeBase>
          <BadgeBase variant="secondary" className="flex items-center gap-1">
            <Star className="w-4 h-4" aria-hidden="true" />
            Featured
          </BadgeBase>
          <BadgeBase variant="destructive" className="flex items-center gap-1">
            <Bell className="w-4 h-4" aria-hidden="true" />
            Alert
          </BadgeBase>
          <BadgeBase variant="outline" className="flex items-center gap-1">
            <Heart className="w-4 h-4" aria-hidden="true" />
            Liked
          </BadgeBase>
        </div>
      </div>

      {/* Badges de contador */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Badges de Contador</h2>
        <div className="flex flex-wrap gap-4">
          {[1, 8, 99, 999, "20+", "NEW"].map((count, i) => {
            const variants = ["default", "secondary", "destructive", "outline", "default", "secondary"] as const;
            return (
              <BadgeBase
                key={i}
                variant={variants[i % variants.length]}
                className="h-6 min-w-[1.5rem] rounded-full px-2 font-mono tabular-nums flex items-center justify-center"
                aria-label={`Badge com valor ${count}`}
              >
                {count}
              </BadgeBase>
            );
          })}
        </div>
      </div>

      {/* Badge com status */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Status Indicators</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Badges de status são posicionados como indicadores circulares
        </p>
        <div className="flex gap-8">
          <div className="relative">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <BadgeBase status="success" />
          </div>
          <div className="relative">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <BadgeBase status="desactivated" />
          </div>
          <div className="relative">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <BadgeBase status="destructive" />
          </div>
          <div className="relative">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <BadgeBase status="away" />
          </div>
          <div className="relative">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <BadgeBase status="custom" statusColor="purple-500" />
          </div>
        </div>
      </div>

      {/* Status com cores do Tailwind */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Status com Cores do Tailwind</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Agora você pode usar cores do Tailwind diretamente: "red-500", "blue", "purple-600", etc.
        </p>
        <div className="flex gap-8">
          <div className="relative">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <BadgeBase status="custom" statusColor="red-500" />
          </div>
          <div className="relative">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <BadgeBase status="custom" statusColor="blue-100" />
          </div>
          <div className="relative">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <BadgeBase status="custom" statusColor="emerald-600" />
          </div>
          <div className="relative">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <BadgeBase status="custom" statusColor="orange-400" />
          </div>
          <div className="relative">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <BadgeBase status="custom" statusColor="pink-500" />
          </div>
        </div>
      </div>

      {/* Badge como link */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Badge como Link (asChild)</h2>
        <div className="flex flex-wrap gap-4">
          <BadgeBase asChild variant="default">
            <a href="#" className="cursor-pointer">
              Clicável Default
            </a>
          </BadgeBase>
          <BadgeBase asChild variant="secondary">
            <a href="#" className="cursor-pointer">
              Clicável Secondary
            </a>
          </BadgeBase>
          <BadgeBase asChild variant="outline">
            <a href="#" className="cursor-pointer">
              Clicável Outline
            </a>
          </BadgeBase>
        </div>
      </div>

      {/* Badges com tamanhos customizados */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Tamanhos Customizados</h2>
        <div className="flex flex-wrap items-center gap-4">
          <BadgeBase className="text-xs px-1 py-0">Pequeno</BadgeBase>
          <BadgeBase>Padrão</BadgeBase>
          <BadgeBase className="text-sm px-3 py-1">Médio</BadgeBase>
          <BadgeBase className="text-base px-4 py-2">Grande</BadgeBase>
        </div>
      </div>

      {/* Badges com cores customizadas */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Cores Customizadas (via className)</h2>
        <div className="flex flex-wrap gap-4">
          <BadgeBase className="bg-purple-500 text-white border-transparent hover:bg-purple-600">
            Roxo
          </BadgeBase>
          <BadgeBase className="bg-pink-500 text-white border-transparent hover:bg-pink-600">
            Rosa
          </BadgeBase>
          <BadgeBase className="bg-indigo-500 text-white border-transparent hover:bg-indigo-600">
            Indigo
          </BadgeBase>
          <BadgeBase className="bg-orange-500 text-white border-transparent hover:bg-orange-600">
            Laranja
          </BadgeBase>
        </div>
      </div>

      {/* Badge com estilo inline customizado */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Estilos Inline</h2>
        <div className="flex flex-wrap gap-4">
          <BadgeBase 
            style={{ backgroundColor: '#10b981', color: 'white', borderRadius: '20px' }}
            className="border-transparent"
          >
            Verde Customizado
          </BadgeBase>
          <BadgeBase 
            style={{ 
              background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)', 
              color: 'white',
              border: 'none'
            }}
          >
            Gradiente
          </BadgeBase>
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
              <BadgeBase variant="default" className="flex items-center gap-1">
                <Star className="w-3 h-3" />
                Premium
              </BadgeBase>
              <BadgeBase variant="destructive">-50%</BadgeBase>
            </div>
            <div className="flex gap-2">
              <BadgeBase variant="outline">Frete Grátis</BadgeBase>
              <BadgeBase variant="secondary">Estoque Limitado</BadgeBase>
            </div>
          </div>

          <div className="border rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Central de Notificações</h3>
              <BadgeBase variant="destructive" className="rounded-full px-2">
                3
              </BadgeBase>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span>Nova mensagem</span>
                <BadgeBase variant="default" className="text-xs">Novo</BadgeBase>
              </div>
              <div className="flex items-center gap-2">
                <span>Atualização disponível</span>
                <BadgeBase variant="outline" className="text-xs">Info</BadgeBase>
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
            <code>{`import { BadgeBase } from "@/components/ui/BadgeBase";
import { Check } from "phosphor-react";`}</code>
          </pre>
        </div>

      

        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h3 className="font-medium mb-2">Exemplos de uso:</h3>
          <pre className="bg-gray-900 p-3 rounded-sm overflow-x-auto text-sm">
            <code>{`// Badge básico
<BadgeBase>Badge</BadgeBase>

// Badge com variante
<BadgeBase variant="secondary">Secondary</BadgeBase>

// Badge com ícone
<BadgeBase variant="default">
  <Check className="w-4 h-4" />
  Verificado
</BadgeBase>

// Badge de status
<BadgeBase status="online" />

// Badge como link
<BadgeBase asChild variant="outline">
  <a href="/link">Clicável</a>
</BadgeBase>

// Badge com cor customizada
<BadgeBase status="custom" statusColor="#8b5cf6" / statusColor="pink-500" />`}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
