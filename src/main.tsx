import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Inicio } from "./views/Inicio";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Elemento raíz no encontrado");
}

createRoot(rootElement).render(
  <StrictMode>
    <Inicio />
  </StrictMode>,
);
