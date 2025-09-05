import BarChart from "@/components/rechart/BarChart";

export const BarChartPage = () => {
  return (
    <div className="mt-5 ml-5 flex flex-col gap-5 p-3 rounded-sm">


      {/* Gráficos existentes */}
      <div className="grid gap-8">
        <div className="space-y-3">
          <div className="h-96 flex flex-col gap-8">
            <BarChart
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
                  operacional: 1200,
                  teste: 1200,
                },
                {
                  name: "Q2",
                  receita: 5200,
                  despesas: 3100,
                  lucro: 2100,
                  vendas: 4100,
                  marketing: 1000,
                  operacional: 1500,
                  teste: 1200,
                },
                {
                  name: "Q3",
                  receita: 6800,
                  despesas: 3800,
                  lucro: 3000,
                  vendas: 5400,
                  marketing: 1300,
                  operacional: 1900,
                  teste: 1200,
                },
                {
                  name: "Q4",
                  receita: 7500,
                  despesas: 4200,
                  lucro: 3300,
                  vendas: 6000,
                  marketing: 1500,
                  operacional: 2100,
                  teste: 1200,
                },
              ]}
     
            />
            <BarChart
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
                  operacional: 1200,
                  teste: 1200,
                },
                {
                  name: "Q2",
                  receita: 5200,
                  despesas: 3100,
                  lucro: 2100,
                  vendas: 4100,
                  marketing: 1000,
                  operacional: 1500,
                  teste: 1200,
                },
                {
                  name: "Q3",
                  receita: 6800,
                  despesas: 3800,
                  lucro: 3000,
                  vendas: 5400,
                  marketing: 1300,
                  operacional: 1900,
                  teste: 1200,
                },
                {
                  name: "Q4",
                  receita: 7500,
                  despesas: 4200,
                  lucro: 3300,
                  vendas: 6000,
                  marketing: 1500,
                  operacional: 2100,
                  teste: 1200,
                },
              ]}
            />
            <BarChart
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
                  operacional: 1200,
                  teste: 1200,
                },
                {
                  name: "Q2",
                  receita: 5200,
                  despesas: 3100,
                  lucro: 2100,
                  vendas: 4100,
                  marketing: 1000,
                  operacional: 1500,
                  teste: 1200,
                },
                {
                  name: "Q3",
                  receita: 6800,
                  despesas: 3800,
                  lucro: 3000,
                  vendas: 5400,
                  marketing: 1300,
                  operacional: 1900,
                  teste: 1200,
                },
                {
                  name: "Q4",
                  receita: 7500,
                  despesas: 4200,
                  lucro: 3300,
                  vendas: 6000,
                  marketing: 1500,
                  operacional: 2100,
                  teste: 1200,
                },
              ]}
      
            />
            <BarChart
            
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
                  operacional: 1200,
                  teste: 1200,
                },
                {
                  name: "Q2",
                  receita: 5200,
                  despesas: 3100,
                  lucro: 2100,
                  vendas: 4100,
                  marketing: 1000,
                  operacional: 1500,
                  teste: 1200,
                },
                {
                  name: "Q3",
                  receita: 6800,
                  despesas: 3800,
                  lucro: 3000,
                  vendas: 5400,
                  marketing: 1300,
                  operacional: 1900,
                  teste: 1200,
                },
                {
                  name: "Q4",
                  receita: 7500,
                  despesas: 4200,
                  lucro: 3300,
                  vendas: 6000,
                  marketing: 1500,
                  operacional: 2100,
                  teste: 1200,
                },
              ]}
    
            />
          </div>
        </div>
      </div>
    </div>
  );
};
