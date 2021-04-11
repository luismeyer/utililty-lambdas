import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";
import { clientOutDir } from "./src/config.json";

const { STAGE } = process.env;

export default defineConfig({
  plugins: [reactRefresh()],
  build: {
    outDir: clientOutDir,
  },
  base: STAGE ?? "/dev/",
});
