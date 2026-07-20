import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./index.css";

/**
 * Eu concentro o bootstrap neste arquivo e mantenho o restante da árvore
 * livre de detalhes de montagem do React.
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
