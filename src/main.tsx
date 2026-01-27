import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

console.log(
  "%cEduardo Ronchi de Araujo %cDesenvolvidor de Sistemas Junio",
  "color: #8b5cf6; font-weight: bold; font-size: 20px; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);",
  "color: #6b7280; font-style: italic; font-size: 14px;",
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
