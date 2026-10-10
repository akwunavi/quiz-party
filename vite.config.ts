import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// Стили темы «Волшебный лес» (src/forest/**.css) написаны под лабораторию без префиксов. Чтобы они НИКОГДА не задели другие
// темы (в сборке все стили общие), каждому их селектору автоматически добавляется префикс `.theme-enchanted_forest`.
// Лаборатория тоже ставит этот класс на кадр сцены. Файлы вне src/forest не трогаем.
const FOREST_SCOPE = '.theme-enchanted_forest'
const forestScope = () => ({
  postcssPlugin: 'forest-scope',
  Once(root: { source?: { input?: { file?: string } }; walkRules: (cb: (r: { selectors: string[]; parent?: { type?: string; name?: string } }) => void) => void }) {
    const file = root.source?.input?.file ?? ''
    if (!/[\\/]src[\\/]forest[\\/]/.test(file)) return
    root.walkRules(rule => {
      if (rule.parent?.type === 'atrule' && /keyframes$/i.test(rule.parent.name ?? '')) return
      rule.selectors = rule.selectors.map(s => (/^(:root|html|body)\b/.test(s) || s.startsWith(FOREST_SCOPE) ? s : `${FOREST_SCOPE} ${s}`))
    })
  },
})
forestScope.postcss = true

// base: имя репозитория для GitHub Pages
export default defineConfig({
  plugins: [react()],
  css: { postcss: { plugins: [forestScope()] } },
  base: '/quiz-party/',

  build: {
    rollupOptions: {
      output: {
        // Библиотеки — отдельным файлом. Они между версиями не меняются,
        // поэтому браузер, уже заходивший на сайт, после деплоя перекачивает
        // только наш код, а не React с клиентом Supabase заново.
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', '@supabase/supabase-js'],
        },
      },
    },
  },

  test: {
    // Маска шире стандартной намеренно. По умолчанию vitest берёт только
    // `*.test.ts`, и файл, названный `totals-melody_test.ts` (подчёркивание
    // вместо точки), молча не запускался: девять тестов мелодии не выполнялись,
    // а прогон был зелёный. Теперь такой файл подхватится тоже — опечатка в
    // имени больше не прячет тесты.
    include: [
      'src/**/*.{test,spec}.{ts,tsx}',
      'src/**/*_{test,spec}.{ts,tsx}',
      'src/**/*-{test,spec}.{ts,tsx}',
      // Локальный сервер (шаг 6, Part B офлайн-устойчивости) — обычный
      // Node-скрипт вне src/, не часть Vite-сборки фронтенда, но его тесты
      // прогоняет тот же vitest.
      'local-server/**/*.{test,spec}.{mjs,ts}',
    ],
  },
})
