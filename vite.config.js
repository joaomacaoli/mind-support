import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    cors: {
      // the origin you will be accessing via browser
      origin: "http://localhost:3000",
    },
  },
  plugins: [react()],
});
