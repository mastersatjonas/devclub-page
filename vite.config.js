import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * Eu mantenho a configuração mínima enquanto o projeto é uma SPA estática.
 * Novos aliases ou plugins só devem entrar quando resolverem uma necessidade real.
 */
export default defineConfig({
  plugins: [react()],
});
