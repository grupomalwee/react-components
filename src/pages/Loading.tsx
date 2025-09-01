import React, { useState } from "react";
import { LoadingBase } from "../components/ui/LoadingBase";
import { ButtonBase } from "../components/ui/ButtonBase";

const LoadingPage = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  
  const handleShowOverlay = () => {
    setShowOverlay(true);
    setTimeout(() => setShowOverlay(false), 3000);
  };

  return (
    <section className="max-w-4xl mx-auto p-8 flex flex-col gap-8">
      {showOverlay && (
        <LoadingBase 
          overlay 
          message="Processando dados..." 
          size="lg"
        />
      )}
      
      {/* Título principal */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Loading</h1>
        <p className="text-muted-foreground">Componente para indicar estados de carregamento com spinner animado.</p>
      </div>

      {/* Tamanhos básicos */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Tamanhos</h2>
        <div className="flex items-center gap-8 p-6 border rounded-lg bg-card">
          <div className="text-center space-y-2">
            <LoadingBase size="sm" />
            <p className="text-xs text-muted-foreground">Small</p>
          </div>
          <div className="text-center space-y-2">
            <LoadingBase size="md" />
            <p className="text-xs text-muted-foreground">Medium</p>
          </div>
          <div className="text-center space-y-2">
            <LoadingBase size="lg" />
            <p className="text-xs text-muted-foreground">Large</p>
          </div>
          <div className="text-center space-y-2">
            <LoadingBase size="xl" />
            <p className="text-xs text-muted-foreground">Extra Large</p>
          </div>
        </div>
      </div>

      {/* Variantes de cor */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Variantes</h2>
        <div className="flex flex-wrap gap-6 p-6 border rounded-lg bg-card">
          <div className="text-center space-y-2">
            <LoadingBase variant="default" />
            <p className="text-xs text-muted-foreground">Default</p>
          </div>
          <div className="text-center space-y-2">
            <LoadingBase variant="secondary" />
            <p className="text-xs text-muted-foreground">Secondary</p>
          </div>
          <div className="text-center space-y-2">
            <LoadingBase variant="success" />
            <p className="text-xs text-muted-foreground">Success</p>
          </div>
          <div className="text-center space-y-2">
            <LoadingBase variant="warning" />
            <p className="text-xs text-muted-foreground">Warning</p>
          </div>
          <div className="text-center space-y-2">
            <LoadingBase variant="destructive" />
            <p className="text-xs text-muted-foreground">Destructive</p>
          </div>
        </div>
      </div>

      {/* Com mensagem */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Com Mensagem</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 border rounded-lg bg-card">
            <LoadingBase message="Carregando dados..." />
          </div>
          <div className="p-6 border rounded-lg bg-card">
            <LoadingBase message="Salvando alterações..." variant="success" />
          </div>
          <div className="p-6 border rounded-lg bg-card">
            <LoadingBase message="Atenção: Conexão lenta" variant="warning" />
          </div>
          <div className="p-6 border rounded-lg bg-card">
            <LoadingBase message="Erro na conexão" variant="destructive" />
          </div>
        </div>
      </div>

      {/* Em botões */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Em Botões</h2>
        <div className="flex flex-wrap gap-4 p-6 border rounded-lg bg-card">
          <ButtonBase disabled className="gap-2">
            <LoadingBase size="sm" />
            Salvando...
          </ButtonBase>
          
          <ButtonBase variant="secondary" disabled className="gap-2">
            <LoadingBase size="sm" variant="secondary" />
            Processando
          </ButtonBase>
          
          <ButtonBase variant="destructive" disabled className="gap-2">
            <LoadingBase size="sm" variant="destructive" />
            Deletando
          </ButtonBase>
        </div>
      </div>

      {/* Overlay */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Overlay</h2>
        <div className="p-6 border rounded-lg bg-card">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Use o overlay para bloquear a interface durante operações importantes.
            </p>
            <ButtonBase onClick={handleShowOverlay}>
              Mostrar Loading Overlay
            </ButtonBase>
          </div>
        </div>
      </div>

      {/* Exemplos de uso */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Exemplos de Uso</h2>
        
        {/* Card de loading */}
        <div className="p-8 border rounded-lg bg-card text-center">
          <LoadingBase 
            size="lg" 
            message="Carregando informações do usuário..." 
          />
        </div>

        {/* Estados inline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg bg-card">
            <div className="flex items-center gap-3">
              <LoadingBase size="sm" />
              <span className="text-sm">Conectando ao servidor...</span>
            </div>
          </div>
          <div className="p-4 border rounded-lg bg-card">
            <div className="flex items-center gap-3">
              <LoadingBase size="sm" variant="success" />
              <span className="text-sm text-green-600">Upload concluído!</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoadingPage;
