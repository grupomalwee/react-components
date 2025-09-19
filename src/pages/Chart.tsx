import Chart from "@/components/rechart/Chart";

export const ChartPage = () => {
  const userData = [
    {
      trimestre: "Q1/2024",
      usuariosAtivos: 1200,
      novosCadastros: 800,
      churn: 150,
      engajamento: 65,
      visitas: 3500,
      extra: 123,
    },
    {
      trimestre: "Q2/2024",
      usuariosAtivos: 1500,
      novosCadastros: 1100,
      churn: 180,
      engajamento: 70,
      visitas: 4200,
      extra: 456,
    },
    {
      trimestre: "Q3/2024",
      usuariosAtivos: 1800,
      novosCadastros: 950,
      churn: 200,
      engajamento: 72,
      visitas: 4600,
      extra: 789,
    },
    {
      trimestre: "Q4/2024",
      usuariosAtivos: 2200,
      novosCadastros: 1300,
      churn: 250,
      engajamento: 75,
      visitas: 5000,
      extra: 1011,
    },
    {
      trimestre: "Q5/2025",
      usuariosAtivos: 2600,
      novosCadastros: 1400,
      churn: 270,
      engajamento: 77,
      visitas: 5400,
      extra: 1300,
    },
    {
      trimestre: "Q6/2025",
      usuariosAtivos: 3000,
      novosCadastros: 1600,
      churn: 320,
      engajamento: 80,
      visitas: 6000,
      extra: 1420,
    },
    {
      trimestre: "Q7/2025",
      usuariosAtivos: 3400,
      novosCadastros: 1700,
      churn: 340,
      engajamento: 82,
      visitas: 6600,
      extra: 1675,
    },
  ];

  const manySeriesData = userData.map((row, i) => ({
    ...row,
    s1: 200 + i * 40,
    s2: 180 + i * 35,
    s3: 160 + i * 30,
    s4: 140 + i * 25,
    s5: 120 + i * 20,
    s6: 100 + i * 15,
  }));

  const largeData = Array.from({ length: 50 }).map((_, idx) => ({
    label: `Day ${idx + 1}`,
    metricA: Math.round(100 + Math.sin(idx / 3) * 20 + idx * 2),
    metricB: Math.round(200 + Math.cos(idx / 5) * 30 + idx * 3),
  }));

  return (
    <div className="p-8 space-y-8">
      <div className="grid grid-cols-1  gap-8">
        <div>
          <Chart
            data={userData}
            xAxis="trimestre"
            labelMap={{
              usuariosAtivos: "Usuários Ativos",
              novosCadastros: "Novos Cadastros",
              churn: "Churn",
              engajamento: "Engajamento (%)",
              visitas: "Visitas",
              extra: "Extra",
            }}
            series={{
              bar: ["usuariosAtivos", "novosCadastros", "churn", "extra"],
              line: ["engajamento", "visitas"],
            }}
            showLegend={false}
            title="Usuários - Barra + Linha"
            titlePosition="center"
            enableHighlights
            enablePeriodsDropdown
            enableShowOnly
            enableDraggableTooltips
            showLabels={true}
          />
        </div>

        <div>
          <Chart
            title="Many Series Example"
            data={manySeriesData}
            xAxis="trimestre"
            series={{
              bar: ["s1", "s2", "s3", "s4"],
              line: ["s5", "s6"],
            }}
            labelMap={{
              s1: "Série 1",
              s2: "Série 2",
              s3: "Série 3",
              s4: "Série 4",
              s5: "Série 5",
              s6: "Série 6",
            }}
            showLegend
            titlePosition="center"
          />
        </div>

        <div>
          <Chart
            title="Large Dataset (50 points)"
            data={largeData}
            xAxis="label"
            series={{
              line: ["metricA"],
              area: ["metricB"],
            }}
            labelMap={{
              metricA: "Métrica A",
              metricB: "Métrica B",
            }}
            showLabels={false}
            showLegend
            titlePosition="center"
          />
        </div>

        <div>
          <Chart
            title="Engajamento & Cadastros"
            data={userData}
            xAxis="trimestre"
            series={{
              line: ["engajamento"],
              area: ["novosCadastros"],
            }}
            labelMap={{
              engajamento: "Engajamento (%)",
              novosCadastros: "Novos Cadastros",
            }}
            showLabels={true}
            titlePosition="center"
          />
        </div>

        <div>
          <Chart
            title="Churn vs Cadastros"
            data={userData}
            xAxis="trimestre"
            series={{
              bar: ["churn"],
              area: ["novosCadastros"],
              line: ["visitas"],
            }}
            labelMap={{
              churn: "Churn",
              novosCadastros: "Novos Cadastros",
              visitas: "Visitas",
            }}
            showLabels={true}
            titlePosition="center"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Chart
              title="Same Data — Controls ON"
              data={userData}
              xAxis="trimestre"
              series={{ bar: ["usuariosAtivos"], line: ["visitas"] }}
              labelMap={{
                usuariosAtivos: "Usuários Ativos",
                visitas: "Visitas",
              }}
              enableHighlights
              enablePeriodsDropdown
              enableShowOnly
              enableDraggableTooltips
              titlePosition="center"
            />
          </div>

          <div>
            <Chart
              title="Same Data — Controls OFF"
              data={userData}
              xAxis="trimestre"
              series={{ bar: ["usuariosAtivos"], line: ["visitas"] }}
              labelMap={{
                usuariosAtivos: "Usuários Ativos",
                visitas: "Visitas",
              }}
              showLegend
              titlePosition="center"
            />
          </div>
        </div>

        <div>
          {/* Time series example with ISO date strings */}
          <Chart
            title="Time Series (ISO Dates)"
            data={[
              { date: "2025-01-01", value: 120 },
              { date: "2025-01-08", value: 150 },
              { date: "2025-01-15", value: 180 },
              { date: "2025-01-22", value: 160 },
              { date: "2025-01-29", value: 200 },
            ]}
            xAxis="date"
            series={{ line: ["value"] }}
            labelMap={{ value: "Valor" }}
            showLabels={false}
            showLegend
            titlePosition="center"
          />
        </div>

        <div>
          <Chart
            title="Minimal — Controls Disabled"
            data={userData}
            xAxis="trimestre"
            series={{ bar: ["novosCadastros"] }}
            labelMap={{ novosCadastros: "Novos Cadastros" }}
            showLegend={false}
            enableHighlights={false}
            enablePeriodsDropdown={false}
            enableShowOnly={false}
            enableDraggableTooltips={false}
            titlePosition="center"
          />
        </div>
      </div>
    </div>
  );
};

export default ChartPage;
