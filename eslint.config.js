// ═══ Линтер: одна задача — ловить хук после раннего return ═══
//
// React падает с ошибкой #310, когда хук (useState, useEffect и прочие)
// стоит НИЖЕ строки `if (...) return`. Ни `tsc`, ни тесты этого не видят:
// типы сходятся, тесты зелёные, а экран белеет уже в зале. Правило
// `rules-of-hooks` находит это на сборке — до деплоя.
//
// Конфиг намеренно узкий. Линтер, который ругается на сто мелочей,
// перестают читать, и он пропускает то единственное, ради чего заведён.
// Хочешь добавить правило — добавляй по одному и сразу чини найденное,
// иначе `npm run lint` станет красным навсегда и потеряет смысл.

import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'

export default tseslint.config(
  // docs/ — это собранный прод, dist — сборка. Линтить их нечего.
  { ignores: ['docs/**', 'dist/**', 'node_modules/**'] },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: { 'react-hooks': reactHooks },
    rules: {
      // ─── ради этого всё и заводилось ───
      'react-hooks/rules-of-hooks': 'error',

      // Зависимости эффектов: предупреждение, не ошибка. Здесь есть места,
      // где список сокращён сознательно (иначе эффект крутится каждый кадр).
      'react-hooks/exhaustive-deps': 'warn',

      // ─── шум, выключенный осознанно ───
      // `any` в проекте есть в разборе ответов из БД, где форма данных
      // зависит от механики. Переписывать это ради линтера сейчас незачем.
      '@typescript-eslint/no-explicit-any': 'off',
      // Переменные с подчёркиванием — намеренно неиспользуемые.
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_', varsIgnorePattern: '^_',
      }],
    },
  },
)
