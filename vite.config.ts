import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [cloudflare()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(rootDir, "index.html"),
        beer: resolve(rootDir, "beer/index.html"),
        wine: resolve(rootDir, "wine/index.html"),
        spirits: resolve(rootDir, "spirits/index.html"),
        contact: resolve(rootDir, "contact/index.html"),
      },
    },
    target: "esnext",
  },
});
