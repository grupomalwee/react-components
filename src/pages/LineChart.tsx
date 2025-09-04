import LineChart from "@/components/rechart/LineChart";

const customData1 = [
  { name: 'Jan', vendas: 4000, meta: 3500, crescimento: 500 },
  { name: 'Fev', vendas: 3000, meta: 3200, crescimento: -200 },
  { name: 'Mar', vendas: 5000, meta: 4000, crescimento: 1000 },
  { name: 'Abr', vendas: 2780, meta: 3000, crescimento: -220 },
  { name: 'Mai', vendas: 4890, meta: 4500, crescimento: 390 },
  { name: 'Jun', vendas: 3390, meta: 3800, crescimento: -410 },
];

const customData2 = [
  { name: 'Q1', receita: 12000, despesas: 8000, lucro: 4000 },
  { name: 'Q2', receita: 15000, despesas: 9500, lucro: 5500 },
  { name: 'Q3', receita: 18000, despesas: 11000, lucro: 7000 },
  { name: 'Q4', receita: 22000, despesas: 13500, lucro: 8500 },
];

export const LineChartPage = () => {
  return (
    <div className="mt-5 ml-5 flex flex-col gap-5 p-3 rounded-sm">
      <h2 className="font-bold text-2xl">Line Chart</h2>
      <p className="text-muted-foreground">
        Gráfico de linha responsivo usando Recharts. Ideal para mostrar tendências ao longo do tempo com theme provider integrado.
      </p>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Chart Padrão */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Chart Padrão</h3>
          <div className="h-80">
            <LineChart />
          </div>
        </div>

        {/* Chart com Cores Customizadas */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Cores Customizadas</h3>
          <div className="h-80">
            <LineChart 
              primaryLineColor="#ef4444"
              secondaryLineColor="#10b981" 
              tertiaryLineColor="#f59e0b"
              strokeWidth={3}
            />
          </div>
        </div>

        {/* Chart com Dados Customizados 1 */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Vendas vs Meta</h3>
          <div className="h-80">
            <LineChart 
              data={customData1}
              primaryLineColor="#8b5cf6"
              secondaryLineColor="#06b6d4"
              tertiaryLineColor="#84cc16"
              strokeWidth={3}
            />
          </div>
        </div>

        {/* Chart com Dados Customizados 2 */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Análise Financeira</h3>
          <div className="h-80">
            <LineChart 
              data={customData2}
              primaryLineColor="hsl(220, 91%, 58%)"
              secondaryLineColor="hsl(0, 84%, 60%)"
              tertiaryLineColor="hsl(142, 76%, 36%)"
              strokeWidth={3}
            />
          </div>
        </div>

        {/* Chart Compacto */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Versão Compacta</h3>
          <div className="h-60">
            <LineChart 
              height={200}
              showLegend={false}
              showGrid={false}
              primaryLineColor="#ff6b6b"
              secondaryLineColor="#4ecdc4"
              tertiaryLineColor="#45b7d1"
              strokeWidth={3}
              showDots={false}
            />
          </div>
        </div>

        {/* Chart com Grid Customizada */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Grid Customizada</h3>
          <div className="h-80">
            <LineChart 
              gridColor="#8b5cf6"
              primaryLineColor="#ef4444"
              secondaryLineColor="#10b981"
              tertiaryLineColor="#f59e0b"
              strokeWidth={3}
            />
          </div>
        </div>

        {/* Chart Grande */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Versão Grande</h3>
          <div className="h-96">
            <LineChart 
              height={350}
              data={customData2}
              strokeWidth={4}
            />
          </div>
        </div>

        {/* Chart Sem Pontos */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Sem Pontos</h3>
          <div className="h-80">
            <LineChart 
              showDots={false}
              strokeWidth={3}
              primaryLineColor="rgb(236, 72, 153)"
              secondaryLineColor="rgb(20, 184, 166)"
              tertiaryLineColor="rgb(251, 146, 60)"
            />
          </div>
        </div>
      </div>

      <div className="my-8 mx-5">
        <h3 className="text-xl font-semibold mb-3">Documentação</h3>
        <div className="border-t-2 border-border mb-4"></div>

        <div className="bg-card border border-border p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Como importar:</h5>
          <pre className="bg-muted p-3 rounded-sm text-sm">
            <code>
              {`import LineChart from "@/components/rechart/LineChart";`}
            </code>
          </pre>
        </div>

        <div className="bg-card border border-border p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Exemplo básico:</h5>
          <pre className="bg-muted p-3 rounded-sm text-sm">
            <code>
              {`<LineChart />

// Com dados customizados
<LineChart 
  data={[
    { name: 'Jan', receita: 4000, despesas: 2400, lucro: 1600 },
    { name: 'Fev', receita: 3000, despesas: 1398, lucro: 1602 },
    // ... mais dados
  ]}
  strokeWidth={3}
/>`}
            </code>
          </pre>
        </div>

        <div className="bg-card border border-border p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Props disponíveis:</h5>
          <pre className="bg-muted p-3 rounded-sm text-sm">
            <code>
              {`interface CustomLineChartProps {
  data?: LineChartData[];          // Dados do gráfico
  className?: string;              // Classes CSS
  height?: number;                 // Altura (padrão: 300)
  width?: number | string;         // Largura (padrão: "100%")
  
  // CORES - Props simples e intuitivas:
  primaryLineColor?: string;       // Cor da primeira linha (hex, hsl, rgb)
  secondaryLineColor?: string;     // Cor da segunda linha (hex, hsl, rgb)
  tertiaryLineColor?: string;      // Cor da terceira linha (hex, hsl, rgb)
  gridColor?: string;              // Cor da grid personalizada (hex, hsl, rgb)
  
  // CONFIGURAÇÕES:
  showGrid?: boolean;              // Mostrar grade (padrão: true)
  showTooltip?: boolean;           // Mostrar tooltip (padrão: true)
  showLegend?: boolean;            // Mostrar legenda (padrão: true)
  strokeWidth?: number;            // Espessura das linhas (padrão: 2)
  showDots?: boolean;              // Mostrar pontos nas linhas (padrão: true)
}`}
            </code>
          </pre>
        </div>

        <div className="bg-card border border-border p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Exemplos de uso das cores:</h5>
          <pre className="bg-muted p-3 rounded-sm text-sm">
            <code>
              {`// Usando cores hex:
<LineChart 
  primaryLineColor="#ef4444"       // red line
  secondaryLineColor="#10b981"     // green line
  tertiaryLineColor="#f59e0b"      // yellow line
  gridColor="#8b5cf6"              // purple grid
  strokeWidth={3}
/>

// Usando cores HSL:
<LineChart 
  primaryLineColor="hsl(220, 91%, 58%)"   // blue line
  secondaryLineColor="hsl(142, 76%, 36%)" // green line
  tertiaryLineColor="hsl(38, 92%, 50%)"   // amber line
  gridColor="hsl(258, 88%, 66%)"          // purple grid
  strokeWidth={2}
/>

// Usando cores RGB:
<LineChart 
  primaryLineColor="rgb(239, 68, 68)"     // red line
  secondaryLineColor="rgb(16, 185, 129)"  // emerald line
  tertiaryLineColor="rgb(245, 158, 11)"   // amber line
  gridColor="rgb(139, 92, 246)"           // violet grid
  strokeWidth={4}
/>`}
            </code>
          </pre>
        </div>

        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-md">
          <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">💡 Funcionalidades:</h5>
          <p className="text-blue-700 dark:text-blue-300 text-sm mb-2">
            <strong>Props simplificadas:</strong> Defina cores diretamente e ajuste espessura das linhas.
          </p>
          <p className="text-blue-700 dark:text-blue-300 text-sm mb-2">
            <strong>Theme integrado:</strong> Se adapta automaticamente aos temas light/dark.
          </p>
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            <strong>Responsivo:</strong> Funciona perfeitamente em qualquer tamanho de tela.
          </p>
        </div>
      </div>
    </div>
  );
};
