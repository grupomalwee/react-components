import LineChart from "@/components/ui/charts/LineChart";

export const LineChartPage = () => {
  return (
    <div className="mt-5 ml-5 flex flex-col gap-5 p-3 rounded-sm">
      <div className="space-y-6">
        <div className="space-y-3">
          <LineChart
            title="Receita, Despesas e Lucro Anual"
            showLabels={true}
            data={[
              {
                name: "Q1",
                receita: 4000,
                despesas: 2400,
                lucro: 1600,
                vendas: 3200,
                marketing: 800,
              },
              {
                name: "Q2",
                receita: 5200,
                despesas: 3100,
                lucro: 2100,
                vendas: 4100,
                marketing: 1000,
              },
              {
                name: "Q3",
                receita: 6800,
                despesas: 3800,
                lucro: 3000,
                vendas: 5400,
                marketing: 1300,
              },
              {
                name: "Q4",
                receita: 7500,
                despesas: 4200,
                lucro: 3300,
                vendas: 6000,
                marketing: 1500,
              },
            ]}
            height={350}
            width={900}
            strokeWidth={3}
            showDots={true}
          />
          <LineChart
            title="Receita, Despesas e Lucro Anual"
            width={900}
            height={150}
            data={[
              {
                name: "Q1",
                receita: 10000,
                despesas: 7500,
                lucro: 5000,
                vendas: 2500,
                marketing: 1000,
              },
              {
                name: "Q2",
                receita: 5200,
                despesas: 3100,
                lucro: 2100,
                vendas: 4100,
                marketing: 1000,
              },
              {
                name: "Q3",
                receita: 6800,
                despesas: 3800,
                lucro: 2500,
                vendas: 5400,
                marketing: 1300,
              },
              {
                name: "Q4",
                receita: 1500,
                despesas: 1500,
                lucro: 1500,
                vendas: 1500,
                marketing: 1500,
              },
            ]}
            strokeWidth={3}
            showDots={true}
          />
        </div>
      </div>
    </div>
  );
};
