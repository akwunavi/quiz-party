// Сборка стенда: HARNESS_OUT=<папка> npx vite build --config e2e/player-crossword/vite.config.ts
import { mergeConfig } from 'vite'
import base from '../../vite.config'
export default mergeConfig(base as never, {
  root: new URL('.', import.meta.url).pathname,
  base: './',
  build: { outDir: process.env.HARNESS_OUT ?? 'dist-harness', emptyOutDir: true, rollupOptions: { input: new URL('./harness.html', import.meta.url).pathname } },
})
