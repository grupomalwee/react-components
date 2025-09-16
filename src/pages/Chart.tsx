import Chart from "@/components/rechart/Chart";

export const ChartPage = () => {
  const quartData = [
    {
      trimestre: "Q1",
      receita: 4000,
      despesas: 2400,
      lucro: 1600,
      vendas: 3200,
      positivacao: 3200,
    },
    {
      trimestre: "Q2",
      receita: 5200,
      despesas: 3100,
      lucro: 2100,
      vendas: 400,
      positivacao: 4500,
    },
    {
      trimestre: "Q3",
      receita: 800,
      despesas: 3800,
      lucro: 3000,
      vendas: 500,
      positivacao: 5200,
    },
    {
      trimestre: "Q4",
      receita: 7500,
      despesas: 4200,
      lucro: 3000,
      vendas: 6000,
      positivacao: 600,
    },
  ];

  return (
    <div className="mt-5 ml-5 flex flex-col gap-8 p-6">
      <div className="space-y-12">
        <div>
          <Chart
            title="Composed Chart - Barra + Linha"
            data={quartData}
            xAxis="trimestre"
            labelMap={{
              receita: "Receita",
              vendas: "Vendas",
              positivacao: "Positivação (%)",
            }}
            height={420}
            showLabels={true}
            series={{
              bar: ["receita", "despesas", "lucro"],
              line: ["positivacao", "vendas"],
            }}
            titlePosition="center"
          />
        </div>
        <div>
          <Chart
            title="Composed Chart - Barra + Linha"
            data={quartData}
            xAxis="trimestre"
            series={{
              bar: ["receita", "vendas", "despesas"],
              line: ["positivacao"],
              area: ["lucro"],
            }}
            labelMap={{
              receita: "Receita",
              vendas: "Vendas",
              positivacao: "Positivação (%)",
            }}
            height={420}
            showLabels={false}
            titlePosition="center"
          />
        </div>

        <div>
          <Chart
            title="Área + Barra exemplo"
            data={quartData}
            xAxis="trimestre"
            series={{ bar: ["despesas"], area: ["lucro"], line: ["vendas"] }}
            labelMap={{
              despesas: "Despesas",
              lucro: "Lucro",
              vendas: "Vendas",
            }}
            height={420}
            showLabels={true}
            titlePosition="center"
          />
        </div>
      </div>
    </div>
  );
};

export default ChartPage;
