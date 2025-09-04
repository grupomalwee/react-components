import BarChart from "@/components/rechart/BarChart";

export const BarChartPage = () => {
  return (
    <div className="mt-5 ml-5 flex flex-col gap-5 p-3 rounded-sm">
      <h2 className="font-bold text-2xl">Bar Chart</h2>
      <p className="text-muted-foreground">
        Gráfico de barras responsivo usando Recharts. Se adapta automaticamente ao theme provider e permite cores customizadas.
      </p>

      <div className="">
        {/* Chart Padrão */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Chart Padrão</h3>
          <div className="h-80 flex flex-col gap-8">
            <BarChart colors={["#10b981"]} />
            <BarChart colors={["#10b981"]} />
            <BarChart colors={["#f59e0b"]} />
            <BarChart colors={["#8b5cf6"]} />
            <BarChart colors={["#ef4444"]} />
            <BarChart colors={["#10b981"]} />
            <BarChart />
            <BarChart />
            <BarChart />
            <BarChart />
            <BarChart />
            <BarChart />
            <BarChart />
            <BarChart />
            <BarChart />
            <BarChart />
            <BarChart />
            <BarChart />
            <BarChart />
            <BarChart />
            <BarChart />
          </div>
        </div>

        



      {/* <div className="my-8 mx-5">
        <h3 className="text-xl font-semibold mb-3">Documentação</h3>
        <div className="border-t-2 border-border mb-4"></div>

        <div className="bg-card border border-border p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Como importar:</h5>
          <pre className="bg-muted p-3 rounded-sm text-sm">
            <code>
              {`import BarChart from "@/components/rechart/BarChart";`}
            </code>
          </pre>
        </div> */}

        {/* <div className="bg-card border border-border p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Exemplo básico:</h5>
          <pre className="bg-muted p-3 rounded-sm text-sm">
            <code>
              {`<BarChart />

// Com dados customizados
<BarChart 
  data={[
    { name: 'Jan', receita: 4000, despesas: 2400, lucro: 1600 },
    { name: 'Fev', receita: 3000, despesas: 1398, lucro: 1602 },
    // ... mais dados
  ]}
/>`}
            </code>
          </pre>
        </div>

        <div className="bg-card border border-border p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Props disponíveis:</h5>
          <pre className="bg-muted p-3 rounded-sm text-sm">
            <code>
              {`interface CustomBarChartProps {
  data?: BarChartData[];           // Dados do gráfico
  className?: string;              // Classes CSS
  height?: number;                 // Altura (padrão: 300)
  width?: number | string;         // Largura (padrão: "100%")
  
  // CORES - Props simples e intuitivas:
  colors?: string[];               // Array de cores para as barras [primary, secondary, tertiary]
  gridColor?: string;              // Cor da grid personalizada (hex, hsl, rgb)
  
  // CONFIGURAÇÕES:
  showGrid?: boolean;              // Mostrar grade (padrão: true)
  showTooltip?: boolean;           // Mostrar tooltip (padrão: true)
  showLegend?: boolean;            // Mostrar legenda (padrão: true)
}`}
            </code>
          </pre>
        </div>

        <div className="bg-card border border-border p-4 rounded-md">
          <h5 className="font-medium mb-2">Exemplos de uso das cores:</h5>
          <pre className="bg-muted p-3 rounded-sm text-sm">
            <code>
              {`// Usando cores hex:
<BarChart 
  colors={["#ef4444", "#10b981", "#f59e0b"]}  // [red, green, yellow]
  gridColor="#8b5cf6"                         // purple grid
/>

// Usando cores HSL:
<BarChart 
  colors={["hsl(220, 91%, 58%)", "hsl(142, 76%, 36%)", "hsl(38, 92%, 50%)"]}  // [blue, green, amber]
  gridColor="hsl(258, 88%, 66%)"                                                // purple grid
/>

// Usando cores RGB:
<BarChart 
  colors={["rgb(239, 68, 68)", "rgb(16, 185, 129)", "rgb(245, 158, 11)"]}      // [red, emerald, amber]
  gridColor="rgb(139, 92, 246)"                                                 // violet grid
/>`}
            </code>
          </pre>
        </div>

        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-md">
          <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">💡 Melhorias:</h5>
          <p className="text-blue-700 dark:text-blue-300 text-sm mb-2">
            <strong>Props simplificadas:</strong> Agora você pode definir cores diretamente com <code>primaryColor="#ef4444"</code> ou <code>barColor1="#ef4444"</code>
          </p>
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            <strong>Cores fixas:</strong> Quando você define cores customizadas, elas não mudam com o tema. 
            Apenas elementos estruturais (grid, tooltip, texto) se adaptam ao tema.
          </p>
        </div>
      </div> */}
      </div>
    </div>

  );
};
