import fs from "node:fs";
import path from "node:path";
import Beasties from "beasties";
import type { Plugin } from "vite";

/**
 * Inline le CSS critique après le build (post-bundle).
 * Remplace vite-plugin-beasties qui échoue avec Vite 6.
 */
export function inlineCriticalCss(): Plugin {
  return {
    name: "inline-critical-css",
    apply: "build",
    async closeBundle() {
      const distDir = path.resolve(process.cwd(), "dist");
      const htmlPath = path.join(distDir, "index.html");

      if (!fs.existsSync(htmlPath)) {
        console.warn("[inline-critical-css] dist/index.html introuvable.");
        return;
      }

      try {
        const html = fs.readFileSync(htmlPath, "utf8");
        const beasties = new Beasties({
          path: distDir,
          publicPath: "/",
          preload: "swap",
          pruneSource: true,
        });
        const result = await beasties.process(html);
        fs.writeFileSync(htmlPath, result);
        console.info("[inline-critical-css] CSS critique inliné.");
      } catch (error) {
        console.warn("[inline-critical-css] Échec — CSS externe conservé:", error);
      }
    },
  };
}
