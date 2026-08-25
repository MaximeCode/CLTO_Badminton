import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

function strapiPreconnect(mode: string) {
  const env = loadEnv(mode, process.cwd(), '')
  let origin: string | null = null
  try {
    if (env.VITE_STRAPI_URL) {
      origin = new URL(env.VITE_STRAPI_URL).origin
    }
  } catch {
    origin = null
  }

  return {
    name: 'html-strapi-preconnect',
    transformIndexHtml(html: string) {
      if (!origin) return html
      const tags = [
        `<link rel="preconnect" href="${origin}" crossorigin />`,
        `<link rel="dns-prefetch" href="${origin}" />`,
      ].join('\n  ')
      return html.replace('</head>', `  ${tags}\n</head>`)
    },
  }
}

export default defineConfig(({ mode }) => ({
  plugins: [
    figmaAssetResolver(),
    strapiPreconnect(mode),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
}))
