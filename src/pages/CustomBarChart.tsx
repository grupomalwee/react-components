import React from 'react';
import { CustomBarChart } from '../components/rechart';

const CustomBarChartPage: React.FC = () => {
  const sampleData = [
    {
      name: 'Jan',
      receita: 4000,
      despesas: 2400,
      lucro: 1600,
    },
    {
      name: 'Fev',
      receita: 3000,
      despesas: 1398,
      lucro: 1602,
    },
    {
      name: 'Mar',
      receita: 5000,
      despesas: 2800,
      lucro: 2200,
    },
    {
      name: 'Abr',
      receita: 2780,
      despesas: 1908,
      lucro: 872,
    },
    {
      name: 'Mai',
      receita: 4890,
      despesas: 2800,
      lucro: 2090,
    },
    {
      name: 'Jun',
      receita: 3390,
      despesas: 1800,
      lucro: 1590,
    },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Custom Bar Chart (Sem Recharts)
          </h1>
          <p className="text-muted-foreground">
            Gráfico de barras personalizado criado com React e CSS puro, sem dependências externas.
          </p>
        </div>

        <div className="grid gap-8">
          {/* Gráfico padrão */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              Gráfico Padrão
            </h2>
            <CustomBarChart 
              data={sampleData}
              height={400}
              className="border"
            />
          </div>

          {/* Gráfico com cores customizadas */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              Com Cores Customizadas
            </h2>
            <CustomBarChart 
              data={sampleData}
              height={350}
              colors={["#f59e0b", "#ef4444", "#10b981"]}
              className="border"
            />
          </div>

          {/* Gráfico sem grade */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              Sem Grade e Sem Legenda
            </h2>
            <CustomBarChart 
              data={sampleData}
              height={300}
              showGrid={false}
              showLegend={false}
              className="border"
            />
          </div>

          {/* Gráfico compacto */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              Versão Compacta
            </h2>
            <CustomBarChart 
              data={sampleData.slice(0, 4)}
              height={250}
              width="60%"
              className="border mx-auto"
            />
          </div>
        </div>

        <div className="bg-muted/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">
            Funcionalidades Implementadas:
          </h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>✅ <strong>Gráfico de barras responsivo</strong> - Ajusta automaticamente ao container</li>
            <li>✅ <strong>Múltiplas séries de dados</strong> - Receita, Despesas e Lucro lado a lado</li>
            <li>✅ <strong>Tooltips clicáveis</strong> - Clique nas barras para fixar tooltips</li>
            <li>✅ <strong>Drag & Drop</strong> - Arraste tooltips para qualquer lugar da tela</li>
            <li>✅ <strong>Eixos formatados</strong> - Valores em português brasileiro</li>
            <li>✅ <strong>Grade customizável</strong> - Linhas de referência opcionais</li>
            <li>✅ <strong>Legenda interativa</strong> - Cores correspondentes às barras</li>
            <li>✅ <strong>Cores customizáveis</strong> - Props para personalizar esquema de cores</li>
            <li>✅ <strong>Hover effects</strong> - Feedback visual ao passar o mouse</li>
            <li>✅ <strong>Múltiplos tooltips</strong> - Mantenha vários tooltips abertos simultaneamente</li>
            <li>✅ <strong>Sem dependências externas</strong> - Apenas React e CSS</li>
          </ul>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">
            Como usar:
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><strong>1. Clique nas barras</strong> para abrir tooltips fixos com os dados</p>
            <p><strong>2. Arraste os tooltips</strong> para organizá-los pela tela</p>
            <p><strong>3. Use o botão "Fechar Todos"</strong> quando houver mais de 2 tooltips</p>
            <p><strong>4. Customize as cores</strong> passando props de cor personalizadas</p>
            <p><strong>5. Ajuste tamanho</strong> com as props width e height</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomBarChartPage;
