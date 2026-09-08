# Тайминги игровой логики и слой анимаций

Собрано для задачи «улучшить CSS-анимации проектора/телефона, не трогая
логику» (issue с планом на будущее). Здесь — выжимка: где граница между
«это анимация» и «это игровая логика», куда лезть можно, куда нельзя.
Подробный разбор с номерами строк — в теле того GitHub Issue (сгенерирован
этим же агентом), здесь только ориентиры для следующего захода.

## Реальный тайминг синхронизации (не Ably/WebSocket!)

`useGameState` (`src/hooks/useGameState.ts`) — REST-поллинг `game_sessions`
раз в 2000 мс (`POLL_INTERVAL`). `useAnswers` (`src/hooks/useAnswers.ts`) —
поллинг `answers`, по умолчанию тоже 2000 мс, у блица — 400 мс (там таймер
команды не должен жрать секунды впустую, пока проектор не заметил ответ).
Вебсокетов/Realtime/Ably в проекте НЕТ и не будет — см. CLAUDE.md, стек.
Значит: любая CSS-анимация, завязанная на «сейчас изменилось состояние в
БД», реально начинает идти с разбросом до ~2 секунд между экранами —
это нормально и не баг, трогать не надо.

## Фазовая машина (game_sessions.phase)

lobby → intro (если включено) → round_intro → question → (answer_time →
show_answers | jeopardy-модалки | melody-стадии | blitz-стадии | race-стадии)
→ scoreboard → break → round_intro (следующий раунд) → … → counting
(бумага) → finale.
Отдельно: recap (повтор вопросов раунда), info (слайд-брифинг).
Маршрут «конец раунда → что дальше» считает ОДИН модуль на все экраны —
`src/lib/flow.ts` (`afterRoundStep`). Не дублировать логику развилки в
компонентах — на этом уже горели (см. HANDOFF §3v).

Переходы фаз — только через `src/lib/gameActions.ts` (пишут в
`game_sessions` через Supabase). Кнопки в HostScreen/AdminPage вызывают эти
функции; часть переходов автоматическая по таймеру (`AutoAdvance`,
`AutoReveal` в HostScreen.tsx).

## Механики с собственным автоматом состояния (в game_sessions.melody, jsonb)

- **Блиц** — `src/lib/blitzState.ts` (чистые переходы) + `blitzActions`/
  `blitzApi.ts` (запись). Ведёт раунд САМ проектор (`BlitzScreen` в
  HostScreen.tsx) — кубик, показ вопроса, автопроверка, таймер. Админка
  только вмешивается кнопками.
- **Мелодия** — `src/lib/melody.ts` (чистые переходы стадий) +
  `melodyActions.ts` (запись). 9 стадий: idle/spinning/listen/bidding/
  bids/snippet/answering/passed/reveal/done. Ведёт `MelodyBoard`
  (`src/pages/rounds/MelodyRound.tsx`).
- **Своя игра (jeopardy)** — `src/lib/jeopardyRef.ts` (ключи ответов +
  состояние открытой плитки `melody.jp`) + `jeopardyActions.ts`.
- **Скачки (race)** — `src/lib/raceActions.ts` + детерминированный сид в
  `RaceRound.tsx` (`buildRace`, mulberry32 PRNG) — гонка одинаковая на всех
  экранах, потому что считается из сида, а не анимируется независимо.

Все эти состояния лежат в ОБЩЕМ поле `game_sessions.melody` (единый
jsonb-мешок, несмотря на название поля) — так пульт ведущего в телефоне
и проектор всегда видят одно и то же (см. CLAUDE.md §5, ловушка про
«состояние механики»).

## Тайминги ИГРОВОЙ ЛОГИКИ (не трогать значения без понимания последствий)

Все в `src/pages/HostScreen.tsx`, если не указано иное:

- `RECAP_SLIDE_MS = 5000` — слайд повтора вопроса держится 5с или пока
  играет озвучка (что дольше).
- `CH_STAGE2_MS = 3300`, `CH_STAGGER_MS = 500`, `CH_HIGHLIGHT_MS = 900` —
  тайминг раскрытия вариантов ответа (`StagedChoices`, см. ниже). Из этих
  же чисел считается `revealDoneMs()` — момент, когда автопроверка пишет
  `is_correct` в БД. **Если меняешь длительность CSS-анимации появления
  вариантов — обязан поменять и эту константу**, иначе галочки на
  телефонах загорятся раньше/позже, чем зал реально увидел ответ
  (см. CLAUDE.md, ловушка про `computeTotals`/автопроверку).
- `ITEM_FIRST_MS/STEP_MS/ANIM_MS` — то же для match/order ответов.
- Блиц: `GRACE_MS=2000` (фора после показа вопроса), `NEXT_DELAY_MS=5000`
  (пауза между ходами), `FINAL_WRONG_DELAY_MS=1200` (короче на 3-й
  неверной попытке), кубик крутится 3000мс (`setTimeout` в `BlitzScreen`).
  Всё в `blitzState.ts` + сам `BlitzScreen`.
- `AutoReveal`/`AutoAdvance` — читают `round.timer_seconds`,
  `autoAdvanceSec` из настроек раунда (из редактора), не хардкод.
- `ShowAnswers`: авто-раскрытие ответа через 3000мс подстраховкой,
  `revealDoneMs(q) + 600` — момент записи `is_correct`.
- Мелодия/race/jeopardy — свои дедлайны в `melody.deadline` (ISO-время,
  не setTimeout) — экраны считают остаток сами, это НЕ анимация, это
  источник истины для таймера.

## Куда можно лезть свободно (чистый визуал)

- `src/styles/parts/*.css` — почти все `@keyframes`/`transition`, если они
  не совпадают по смыслу с одной из констант выше (ищи цифры типа `3.3s`,
  `.9s`, `5s` рядом с классами вариантов ответа/scoreboard — они могут
  зеркалить JS-константы, проверяй перед правкой).
- Декоративные компоненты без данных: `CyberPanel`, `Icicles`,
  `Bulldog`/`SittingBulldog` (чистый SVG+CSS), заставки тем
  (`14-theme-potter.css`, `03-theme-new-year.css`, `28-theme-cyber.css`).
- `WindText` (появление текста вопроса по словам) — сам компонент нельзя
  трогать (использует `useFitText`), но CSS-анимацию `windIn`/`q-word` в
  `01-base.css` можно переоформить, лишь бы `useFitText` продолжал видеть
  финальные размеры (не делать анимацию, которая держит `display:none`
  дольше показа — `useFitText` меряет по текущему DOM).

## Куда лезть НЕЛЬЗЯ или очень осторожно

- Любой `setTimeout`/`setInterval` в HostScreen.tsx/MelodyRound.tsx/
  BlitzRound.tsx/RaceRound.tsx, который меняет `stage`/`phase`/пишет в БД —
  это логика, не декорация, даже если рядом есть анимация.
- `useFitText.ts` — не CSS-анимация, а императивный подгон кегля через
  `el.style.fontSize`. CSS-переход на `font-size` конфликтует с двоичным
  поиском внутри (мигание/неверный замер `scrollHeight` в момент
  transition). Не добавлять `transition: font-size`.
- `StagedChoices` (HostScreen.tsx) — интрига раскрытия вариантов ответа:
  тайминг завязан на `revealDoneMs`/автопроверку, см. выше.
- `AudioGate`, `playSynced`, `createAudio`/`stopAllAudio` (`audioSource.ts`)
  — синхронизация звука с таймером; анимации можно вешать НА события этих
  компонентов (например, класс при начале воспроизведения), но не менять
  сами тайминги старта звука (там уже были гонки с `play()` асинхронным,
  см. CLAUDE.md §5).
