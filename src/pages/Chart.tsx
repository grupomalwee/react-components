import React, { useState } from "react";
import Chart from "@/components/rechart/Chart";
import { CheckboxBase } from "@/components/ui/CheckBoxBase";
import LabelBase from "@/components/ui/LabelBase";
import { Select } from "@/components/selects/Select";

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

  function InteractiveGrid() {
    const [mode, setMode] = useState<"auto" | "fixed">("auto");
    const [cols, setCols] = useState<number>(3);
    const [dataset, setDataset] = useState<"user" | "many" | "large">("user");
    const [showLegend, setShowLegend] = useState<boolean>(false);
    const [draggable, setDraggable] = useState<boolean>(true);

    const getData = () => {
      if (dataset === "many") return manySeriesData;
      if (dataset === "large") return largeData;
      return userData;
    };

    const gridCols = mode === "fixed" ? cols : 4;

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <CheckboxBase
              id="mode-auto"
              checked={mode === "auto"}
              onCheckedChange={(v) => v && setMode("auto")}
            />
            <LabelBase htmlFor="mode-auto" className="select-none">
              Automático
            </LabelBase>
          </div>

          <div className="flex items-center gap-2">
            <CheckboxBase
              id="mode-fixed"
              checked={mode === "fixed"}
              onCheckedChange={(v) => v && setMode("fixed")}
            />
            <LabelBase htmlFor="mode-fixed" className="select-none">
              Fixo
            </LabelBase>
          </div>

          {mode === "fixed" && (
            <div className="flex items-center gap-2">
              <LabelBase className="select-none">Colunas:</LabelBase>
              <div className="w-36">
                <Select
                  placeholder="Colunas"
                  items={[
                    { label: "1", value: "1" },
                    { label: "2", value: "2" },
                    { label: "3", value: "3" },
                    { label: "4", value: "4" },
                  ]}
                  onChange={(value) => setCols(Number(value))}
                />
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <LabelBase className="select-none">Dataset:</LabelBase>
            <div className="w-44">
              <Select
                placeholder="Dataset"
                items={[
                  { label: "Usuários (exemplo)", value: "user" },
                  { label: "Many Series", value: "many" },
                  { label: "Large (50 pontos)", value: "large" },
                ]}
                onChange={(value: string) =>
                  setDataset(value as "user" | "many" | "large")
                }
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CheckboxBase
                id="legend-toggle"
                checked={showLegend}
                onCheckedChange={(v) => setShowLegend(Boolean(v))}
              />
              <LabelBase htmlFor="legend-toggle">Mostrar legenda</LabelBase>
            </div>

            <div className="flex items-center gap-2">
              <CheckboxBase
                id="draggable-toggle"
                checked={draggable}
                onCheckedChange={(v) => setDraggable(Boolean(v))}
              />
              <LabelBase htmlFor="draggable-toggle">
                Tooltips fixáveis
              </LabelBase>
            </div>
          </div>
        </div>

        <div
          className="min-w-0"
          style={
            mode === "auto"
              ? {
                  display: "grid",
                  gap: "1rem",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                }
              : {
                  display: "grid",
                  gap: "1rem",
                  gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
                }
          }
        >
          {Array.from({ length: gridCols }).map((_, i) => (
            <div key={i} className="min-w-0">
              <Chart
                data={getData()}
                xAxis={dataset === "large" ? "label" : "trimestre"}
                series={
                  dataset === "many"
                    ? { bar: ["s1", "s2", "s3", "s4"], line: ["s5"] }
                    : dataset === "large"
                    ? { line: ["metricA"], area: ["metricB"] }
                    : { bar: ["usuariosAtivos"], line: ["visitas"] }
                }
                labelMap={
                  dataset === "many"
                    ? { s1: "S1", s2: "S2", s3: "S3", s4: "S4", s5: "S5" }
                    : dataset === "large"
                    ? { metricA: "Métrica A", metricB: "Métrica B" }
                    : { usuariosAtivos: "Usuários Ativos", visitas: "Visitas" }
                }
                showLegend={showLegend}
                enableDraggableTooltips={draggable}
                title={mode === "auto" ? `Auto ${i + 1}` : `Fixo ${i + 1}`}
                titlePosition="center"
                height={220}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* Exemplo único: interativo e responsivo */}
      <section className="space-y-6">
        <InteractiveGrid />
      </section>
      <div className="grid grid-cols-2 gap-4">
      
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
    </div>
  );
};

export default ChartPage;
