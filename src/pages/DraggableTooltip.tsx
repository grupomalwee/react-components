import React, { useState } from "react";
import DraggableTooltip from "@/components/charts/components/tooltips/DraggableTooltip";
import { useDrag } from "@/hooks/use-drag";

const sampleData = {
  name: "Q1 2024",
  receita: 4000,
  despesas: 2400,
  lucro: 1600,
  vendas: 3200,
  marketing: 800,
};

const sampleColors = {
  receita: "#55af7d",
  despesas: "#8e68ff",
  lucro: "#2273e1",
  vendas: "#ff6b6b",
  marketing: "#4ecdc4",
};

const dataKeys = Object.keys(sampleData).filter((key) => key !== "name");

export const DraggableTooltipPage = () => {
  const [tooltips, setTooltips] = useState([
    {
      id: "tooltip-1",
      data: sampleData,
    },
    {
      id: "tooltip-2",
      data: { ...sampleData, name: "Q2 2024", receita: 5200, despesas: 3100 },
    },
    {
      id: "tooltip-3",
      data: { ...sampleData, name: "Q3 2024", receita: 6800, despesas: 3800 },
    },
  ]);

  const { handleMouseDown, getPosition, setPosition, isElementDragging } =
    useDrag({
      onDragStart: (id) => console.log(`Iniciando drag do ${id}`),
      onDragEnd: (id) => console.log(`Finalizando drag do ${id}`),
    });

  // Definir posições iniciais
  React.useEffect(() => {
    setPosition("tooltip-1", { top: 100, left: 100 });
    setPosition("tooltip-2", { top: 250, left: 400 });
    setPosition("tooltip-3", { top: 150, left: 700 });
  }, [setPosition]);

  const handleClose = (id: string) => {
    setTooltips((prev) => prev.filter((tooltip) => tooltip.id !== id));
  };

  const handleCloseAll = () => {
    setTooltips([]);
  };

  const resetTooltips = () => {
    setTooltips([
      {
        id: "tooltip-1",
        data: sampleData,
      },
      {
        id: "tooltip-2",
        data: { ...sampleData, name: "Q2 2024", receita: 5200, despesas: 3100 },
      },
      {
        id: "tooltip-3",
        data: { ...sampleData, name: "Q3 2024", receita: 6800, despesas: 3800 },
      },
    ]);

    // Resetar posições
    setTimeout(() => {
      setPosition("tooltip-1", { top: 100, left: 100 });
      setPosition("tooltip-2", { top: 250, left: 400 });
      setPosition("tooltip-3", { top: 150, left: 700 });
    }, 0);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            DraggableTooltip Demo
          </h1>
          <p className="text-muted-foreground mb-4">
            Demonstração do componente DraggableTooltip com tooltips arrastáveis
            e botão "Fechar Todos".
          </p>

          <div className="flex gap-4 mb-6">
            <button
              onClick={resetTooltips}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Reset Tooltips
            </button>
            <button
              onClick={handleCloseAll}
              className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90"
            >
              Fechar Todos
            </button>
          </div>
        </div>

        {/* Área de demonstração */}
        <div className="relative min-h-[600px] border-2 border-dashed border-muted-foreground/30 rounded-lg bg-muted/10">
          <div className="absolute top-4 left-4 text-sm text-muted-foreground">
            Área de demonstração - {tooltips.length} tooltip(s) ativo(s)
          </div>

          {/* Renderizar tooltips */}
          {tooltips.map((tooltip, index) => (
            <DraggableTooltip
              key={tooltip.id}
              id={tooltip.id}
              data={tooltip.data}
              position={getPosition(tooltip.id)}
              isDragging={isElementDragging(tooltip.id)}
              title="Demonstração BarChart"
              dataKeys={dataKeys}
              finalColors={sampleColors}
              onMouseDown={handleMouseDown}
              onClose={handleClose}
              periodLabel="Período Selecionado"
              dataLabel="Dados do Período"
              showCloseAllButton={index === 0} // Só o primeiro tooltip mostra o botão
              globalTooltipCount={tooltips.length}
              onCloseAll={handleCloseAll}
              closeAllButtonPosition="top-center"
              closeAllButtonVariant="floating"
            />
          ))}

          {tooltips.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p className="text-lg mb-2">Nenhum tooltip ativo</p>
                <p className="text-sm">
                  Clique em "Reset Tooltips" para criar novos tooltips
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Documentação */}
        <div className="mt-8 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-3">Funcionalidades</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Tooltips arrastáveis com posicionamento fixo</li>
              <li>Botão individual de fechar em cada tooltip</li>
              <li>
                Botão "Fechar Todos" flutuante quando há múltiplos tooltips
              </li>
              <li>
                Labels customizáveis (Período/Ponto, Dados do Período/Ponto)
              </li>
              <li>Cores personalizadas para cada série de dados</li>
              <li>Suporte a diferentes variantes do botão "Fechar Todos"</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Props Principais</h2>
            <div className="bg-muted/50 p-4 rounded-lg">
              <code className="text-sm">
                <div>
                  periodLabel: "Período Selecionado" | "Ponto Selecionado"
                </div>
                <div>dataLabel: "Dados do Período" | "Dados do Ponto"</div>
                <div>showCloseAllButton: boolean</div>
                <div>
                  closeAllButtonPosition: "top-left" | "top-right" |
                  "top-center"
                </div>
                <div>closeAllButtonVariant: "floating" | "inline"</div>
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraggableTooltipPage;
