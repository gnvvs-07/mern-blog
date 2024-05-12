import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Add your proxy configuration here
      "/api": {
        target: "http://localhost:3000",
        secure: false,
      },
    },
  },
});
