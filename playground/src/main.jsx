import React from "react";
import ReactDOM from "react-dom/client";
import "@lib/global.css"; 
import { ThemeProviderBase, ButtonBase } from "@lib";

function App() {
  return (
    <ThemeProviderBase defaultTheme="light-purple" storageKey="vite-ui-theme">
      <div style={{ padding: "2rem" }}>
        <ButtonBase variant="default">Botãozão Brabo</ButtonBase>
      </div>
    </ThemeProviderBase>
  );
}

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
} else {
  console.error('Elemento com id "root" não encontrado!');
}