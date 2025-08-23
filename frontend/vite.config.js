import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Proxy API to backend during dev:
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:5000"
    }
  }
});
