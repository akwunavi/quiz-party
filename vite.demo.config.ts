// Сборка автономной демо «Скачек бульдогов» (scripts/bulldog/build-demo.mjs): ОДИН обычный (не модульный) скрипт, чтобы открываться
// двойным щелчком по index.html (file:// запрещает <script type=module> и fetch). Остальное приложение этим конфигом не собирается.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  base: './',
  publicDir: false,
  resolve: { alias: { '@supabase/supabase-js': new URL('./demo/bulldog/supabaseStub.ts', import.meta.url).pathname } },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify('http://127.0.0.1:1'),   // демо не ходит в сеть; значения нужны только чтобы модуль клиента не упал при импорте
    'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify('demo'),
  },
  build: {
    outDir: 'dist-demo/app', emptyOutDir: true, cssCodeSplit: false, target: 'es2020', assetsInlineLimit: 0,
    lib: { entry: 'demo/bulldog/main.tsx', formats: ['iife'], name: 'BulldogDemo', fileName: () => 'demo.js' },
    rollupOptions: { output: { inlineDynamicImports: true, assetFileNames: a => a.name?.endsWith('.css') ? 'demo.css' : 'assets/[name][extname]' } },
  },
})
