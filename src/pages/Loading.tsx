import React, { useState } from "react";
import { LoadingBase } from "../components/ui/LoadingBase";
import { ButtonBase } from "../components/ui/ButtonBase";

const LoadingPage = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [showDotsOverlay, setShowDotsOverlay] = useState(false);
  
  const handleShowOverlay = () => {
    setShowOverlay(true);
    setTimeout(() => setShowOverlay(false), 3000);
  };

  const handleShowDotsOverlay = () => {
    setShowDotsOverlay(true);
    setTimeout(() => setShowDotsOverlay(false), 3000);
  };

  return (
    <section className="max-w-4xl mx-auto p-8 flex flex-col gap-8">
      {showOverlay && (
        <LoadingBase 
          overlay 
          message="Processando dados..." 
          size="lg"
          variant="spinner"
          
        />
      )}

      {showDotsOverlay && (
        <LoadingBase 
          overlay 
          message="Carregando com dots..." 
          size="lg"
          variant="dots"
        />
      )}
      
      {/* Tipos de Spinner */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Tipos de Spinner</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 border rounded-lg bg-card">
            <div className="text-center space-y-4">
              <h3 className="font-medium">Default (Circular)</h3>
              <LoadingBase    variant="spinner" message="Spinner circular" />
            </div>
          </div>
          <div className="p-6 border rounded-lg bg-card">
            <div className="text-center space-y-4">
              <h3 className="font-medium">Dots</h3>
              <LoadingBase variant="dots" message="Spinner em dots" />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Tamanhos - Default</h2>
        <div className="flex items-center gap-8 p-6 border rounded-lg bg-card">
          <div className="text-center space-y-2">
            <LoadingBase size="sm" message="Small"  />
          </div>
          <div className="text-center space-y-2">
            <LoadingBase size="md" message="Medium"  />
          </div>
          <div className="text-center space-y-2">
            <LoadingBase size="lg" message="Large"  />
          </div>
          <div className="text-center space-y-2">
            <LoadingBase size="xl" message="Extra Large"  />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Tamanhos - Dots</h2>
        <div className="flex items-center gap-8 p-6 border rounded-lg bg-card">
          <div className="text-center space-y-2">
            <LoadingBase size="sm" message="Small" variant="dots" />
          </div>
          <div className="text-center space-y-2">
            <LoadingBase size="md" message="Medium" variant="dots" />
          </div>
          <div className="text-center space-y-2">
            <LoadingBase size="lg" message="Large" variant="dots" />
          </div>
          <div className="text-center space-y-2">
            <LoadingBase size="xl" message="Extra Large" variant="dots" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Tamanhos</h2>
        <div className="flex items-center gap-8 p-6 border rounded-lg bg-card">
          <div className="text-center space-y-2">
            <LoadingBase size="sm" message="Small" />
          </div>
          <div className="text-center space-y-2">
            <LoadingBase size="md" message="Medium" />
          </div>
          <div className="text-center space-y-2">
            <LoadingBase size="lg" message="Large" />
          </div>
          <div className="text-center space-y-2">
            <LoadingBase size="xl" message="Extra Large" />
          </div>
        </div>
      </div>

      {/* Com mensagem */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Com Mensagem</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 border rounded-lg bg-card">
            <LoadingBase message="Carregando dados..."   variant="spinner"  />
          </div>
          <div className="p-6 border rounded-lg bg-card">
            <LoadingBase message="Salvando alterações..." variant="dots" />
          </div>
          <div className="p-6 border rounded-lg bg-card">
            <LoadingBase message="Processando..."   variant="spinner" />
          </div>
          <div className="p-6 border rounded-lg bg-card">
            <LoadingBase message="Aguarde um momento..." variant="dots" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Overlay</h2>
        <div className="p-6 border rounded-lg bg-card">
          <div className="flex gap-4 items-center justify-center">
            <ButtonBase onClick={handleShowOverlay}>
              Overlay Circular
            </ButtonBase>
            <ButtonBase onClick={handleShowDotsOverlay} variant="outline">
              Overlay Dots
            </ButtonBase>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoadingPage;
