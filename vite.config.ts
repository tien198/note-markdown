import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'
// @ts-expect-error - Nitro nightly types might not resolve perfectly yet
import { nitro } from 'nitro/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig(({ command, isPreview }) => ({
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackStart(),
    // Nitro's Vite dev worker can time out while its environment is warming up.
    // Keep Nitro for production builds/previews and use Start's dev server locally.
    command === 'build' || isPreview ? nitro() : null,
    viteReact(),
  ],
  server: {
    open: false,
  },
}))

export default config
