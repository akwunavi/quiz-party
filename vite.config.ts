import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// base: имя репозитория для GitHub Pages
export default defineConfig({
  plugins: [react()],
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
    ],
  },
})
