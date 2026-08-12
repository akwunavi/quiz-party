# Quiz Party — конструктор квизов

Новый проект (наследник ivan_party). ТЗ — в корне: `TZ_quiz_editor.md`.

## Первый запуск

1. **GitHub:** создай пустой репозиторий `quiz-party`, распакуй сюда этот архив, запушь.
2. **Supabase:** создай НОВЫЙ проект → SQL Editor → вставь целиком
   `supabase/migrations/0001_init.sql` → Run.
3. **Свой аккаунт owner:**
   - Dashboard → Authentication → Add user → свой email+пароль;
   - SQL Editor:
     `insert into editor_roles (user_id, role, display_name)
      values ('<uuid из Authentication>', 'owner', 'Иван');`
4. **Ключи:** скопируй `.env.example` → `.env`, вставь URL и anon key
   (Dashboard → Settings → API).
5. `npm install && npm run dev` — локальная разработка.

## Деплой (GitHub Pages, как в старом проекте)

```
npm run deploy:prep && git add -A && git commit -m "deploy" && git push
```
GitHub → Settings → Pages → Deploy from branch → main /docs.
URL: https://akwunavi.github.io/quiz-party/

## Что уже готово (этап 1)

- Схема БД: пакеты → раунды → вопросы, статусы, роли owner/editor,
  RLS (editor не удаляет и не трогает active-пакет), edit_log, Storage-бакет.
- Типы домена (`src/types/quiz.ts`) — контракт БД ↔ редактор ↔ игра.
- Подсчёт баллов всех механик (`src/lib/scoring.ts`) + автопроверка
  (`src/lib/answerCheck.ts`, включая ребус 3+3) — 33 автотеста.
- Генератор кроссворда (`src/lib/crossword.ts`): 6–10 слов, классическая
  нумерация, unplaced-диагностика, перегенерация по seed.
- CI (`.github/workflows/ci.yml`): типы + тесты + сборка на каждый пуш.

## Дальше по плану

Этап 2 — игровое ядро + загрузчик пакетов; 3–4 — редактор; 5 — экраны
кроссворда; 5а — темы («Классика», «Новый год»); 6 — экспорт PDF,
индикаторы связи, heartbeat, рейтинг.
