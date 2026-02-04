import React from "react";
import { UniversalTooltipProvider } from "../hooks/use-universal-tooltip";
import { UniversalTooltipRenderer } from "../components/ui/TooltipRenderer";
import { useTooltip } from "../hooks/use-universal-tooltip";

// Componente exemplo que pode criar tooltips
const ExampleComponent: React.FC = () => {
  const { createTooltip } = useTooltip();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const element = event.currentTarget;
    const content = (
      <div>
        <h3 className="font-semibold mb-2">Tooltip Universal</h3>
        <p className="text-sm text-muted-foreground">
          Este é um exemplo de tooltip universal que pode ser usado em qualquer
          lugar!
        </p>
        <div className="mt-3 flex gap-2">
          <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded">
            Tag 1
          </span>
          <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded">
            Tag 2
          </span>
        </div>
      </div>
    );

    createTooltip(element, content, {
      position: "auto",
      offset: { x: 0, y: -10 },
      metadata: { type: "example", source: "button" },
    });
  };

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-bold">Sistema Universal de Tooltips</h2>
      <p className="text-muted-foreground">
        Clique nos botões abaixo para criar tooltips que podem ser arrastados e
        alinhados!
      </p>

      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={handleClick}
          className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Criar Tooltip Azul
        </button>

        <button
          onClick={handleClick}
          className="p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Criar Tooltip Verde
        </button>

        <button
          onClick={handleClick}
          className="p-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          Criar Tooltip Roxo
        </button>
      </div>

      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h3 className="font-semibold mb-2">Funcionalidades:</h3>
        <ul className="text-sm space-y-1">
          <li>✅ Criar tooltips de qualquer elemento</li>
          <li>✅ Arrastar e posicionar livremente</li>
          <li>✅ Alinhamento automático com guias visuais</li>
          <li>✅ Snap para alinhamento preciso</li>
          <li>✅ Fechar individual ou todos de uma vez</li>
          <li>✅ Totalmente customizável</li>
          <li>✅ Funciona com qualquer conteúdo React</li>
        </ul>
      </div>
    </div>
  );
};

// Componente principal com provider
export const UniversalTooltipExample: React.FC = () => {
  return (
    <UniversalTooltipProvider>
      <ExampleComponent />
      <UniversalTooltipRenderer />
    </UniversalTooltipProvider>
  );
};

export default UniversalTooltipExample;
