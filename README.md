# Quiz Party — живая викторина для баров

Конструктор пакетов (редактор) + игра: проектор для зала, пульт ведущего с телефона, телефоны команд. Стек: React + TypeScript + Vite, Supabase (только REST-опрос, без вебсокетов), GitHub Pages, тесты на Vitest.

**Рабочая документация — `CLAUDE.md` (правила работы) и `HANDOFF.md` (разбор ловушек и бэклог).** Исторические разборы лежат в `docs-dev/history/`.

## Разработка
```
npm install
npm run dev          # локально; ключи Supabase — в .env (см. .env.example)
npx tsc --noEmit && npx eslint . && npx vitest run && npx vite build   # четыре проверки перед «готово»
```

## База данных
Миграции — файлы в `supabase/migrations/`. Их НИКТО не применяет автоматически: ведущий прогоняет нужный файл вручную в SQL Editor (порядок — по номерам). Состояние живой базы записано в `HANDOFF.md`.

## Деплой
Только через GitHub: вкладка **Actions → deploy → Run workflow**. Workflow прогоняет проверки, собирает приложение с секретами `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`, кладёт сборку в `docs/` и коммитит её в `main`. **Локально `docs/` не собирают и не коммитят** — бандл без секретов положит живой сайт. Сайт: https://akwunavi.github.io/quiz-party/

## Локальный сервер для бара (без интернета)
`local-server/` — см. `local-server/README.md`. При запуске он печатает PIN ведущего: его вводят один раз на странице `/local` на устройстве ведущего.
