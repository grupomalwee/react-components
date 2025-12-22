import BarChart from "@/components/ui/charts/BarChart";

export const BarChartPage = () => {
  const quartData = [
    {
      trimestre: "Q1",
      receita: 4000,
      despesas: 2400,
      lucro: 1600,
      vendas: 3200,
      marketing: 800,
      operacional: 1200,
    },
    {
      trimestre: "Q2",
      receita: 5200,
      despesas: 3100,
      lucro: 2100,
      vendas: 4100,
      marketing: 1000,
      operacional: 1500,
    },
    {
      trimestre: "Q3",
      receita: 6800,
      despesas: 3800,
      lucro: 3000,
      vendas: 5400,
      marketing: 1300,
      operacional: 1900,
    },
    {
      trimestre: "Q4",
      receita: 7500,
      despesas: 4200,
      lucro: 3300,
      vendas: 6000,
      marketing: 1500,
      operacional: 2100,
    },
  ];

  return (
    <div className="mt-5 ml-5 flex flex-col gap-8 p-6">
      <div className="space-y-12">
        <div>
          <BarChart
            title="Detecção Automática de Dados"
            data={quartData}
            autoDetect={true}
            height={400}
          />
        </div>

        <div>
          <BarChart
            title="Análise Financeira Simplificada"
            data={quartData}
            xAxis="trimestre"
            yAxis={["despesas", "lucro"]}
            showLabels={true}
            height={400}
            labelMap={{
              receita: "Receita",
              despesas: "Despesas",
              lucro: "Lucro",
            }}
          />
        </div>
      </div>
    </div>
  );
};
