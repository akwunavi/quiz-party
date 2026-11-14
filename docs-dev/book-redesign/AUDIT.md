# Аудит темы «Книга» (`ny_book`) перед переработкой в «рождественскую книгу» — ЭТАП 1

Версия кода: 10.64 (`src/version.ts`). Кода не менял. Всё ниже — по чтению репозитория; что не нашёл — так и написано. Строки указаны на момент аудита.

---

## 0. Как тема устроена сейчас (одним абзацем)

`ThemeLayer` (`src/components/ThemeLayer.tsx:34-47`) оборачивает проектор в `div.theme-ny_book[data-ny-density]`, кладёт ПОД игровую вёрстку слой `NyBackdrop` (`src/ny/NyScene.tsx:26-40`: `Stage fit="cover"` → `BookWorld` + `Atmosphere`) и ПОВЕРХ — `NyFx` (`NyScene.tsx:44-55`: `BookFx` со слотом QR). Сцена верстается в 1920×1080 и масштабируется «с запасом» (`src/ny/engine/stage.tsx:51-104`, `.ny-stage-cover`). Игровая вёрстка — обычный `HostScreen` + те же компоненты, что у classic; «Книга» красит её CSS-ом `41-ny-book.css` через `--u = min(100vw/1920, 100vh/1080)` («пиксель мокапа»). Единственная тематическая логика вне CSS: `nyDensity`/`isPlainQuestion` (`src/ny/density.ts`), `NyLobby` (команды/QR порталами в слоты сцены), `Rosette` в `Timer.tsx:76-80`, скрытие `.host-actions` без `?nav=1` (`src/ny/config.ts`).

Сцена «Книга» (`src/ny/book/BookScene.tsx`): стол (`.p-table`), бордовая обложка (`.p-cover`), две страницы и сгиб (`.p-page-l/-r`, `.p-gutter`), гирлянда флажков (`Bunting`, 17 треугольных `.p-flag`), «плоские» бумажные ёлки (`PaperTree` → `DecoratedTree` с `flat`, canvas), домик (`House` из div-ов), сугробы (`Drifts`, SVG), бумажный снег (`Particles`), зерно (`.p-grain`). Всё это — «старый» облик, который ТЗ хочет заменить на пергамент/объём/реалистичные ёлки.

---

## 1. Карта экранов `ny_book`

Обозначения: **НОВ** — уже оформлен под ny_book (есть правила в 41/40); **СТАР** — идёт общей вёрсткой/палитрой без книжных правил; **ЧАСТ** — частично.

| Экран | Фаза / условие | Компонент (файл:строки) | Классы корня | CSS сейчас | Статус |
|---|---|---|---|---|---|
| Выбор пакета (нет pack_id) | `lobby`, `!pack_id` | `HostInner` `HostScreen.tsx:252-301` | `.host-screen.lobby-screen` | 41:43-54 (заголовок-лента) | ЧАСТ — `<select>` голый |
| Лобби | `lobby` | `HostScreen.tsx:252-353` + `NyLobby` (`src/ny/NyLobby.tsx`) → `Pennants`/`QrCard` (`BookScene.tsx:151-193`) | `.lobby-screen` (+`.paper-lobby`) | 40:116-151, 41:43-69 | НОВ, но «старый» облик: вымпелы на бечёвке (1–4/5–8/9+ → 1/2/3 ряда, `.p-teams` left:600 top:300), QR-«домик» слева внизу |
| Составы команд (рандомайзер) | `random_groups` в сессии | `GroupsModal` `HostScreen.tsx:896` | `.groups-overlay > .groups-modal` | 41:57-65 | НОВ |
| Интро-заставка | `intro` | `IntroScreen.tsx` (Three.js, неон, без веток по теме) | своё | `29-intro.css` (без ny) | СТАР — киберпанк-заставка в любой теме; в §3cl решено «отдельной задачей» |
| Слайд-брифинг | `info` | `InfoScreen` `HostScreen.tsx:1102-1140` → `InfoSlideView.tsx` | `.info-screen`, `.ib-*`, `.info-*` | 41:72-85 | НОВ |
| Заставка раунда | `round_intro` | `HostScreen.tsx:367-447` (+`RulesFrame`, `CrosswordView` для кроссворда) | `.round-intro`, `.round-badge`, `.ri-main`, `.cw-layout` | 41:88-96, 205-209 | НОВ |
| Обычный вопрос (standard/test_stop/rebus/stakes_*/thematic_x2/crossword) | `question` | `QuestionScreen.tsx` (`ClassicQuestionScreen`) из `HostScreen.tsx:544-587` | `.host-screen[.has-media][.has-choices][.no-qtext]`, `.q-split`, `.q-media-grid`, `.img-answers`, `.choices-grid` | 41:99-113, 236-247, 285-297, 341-351 | НОВ (4 вида: текст / текст+1–2 картинки / картинки-варианты / варианты) |
| Вопрос: показ ответа «после каждого вопроса» | `question` + `reveal` + `answers_reveal==='after_question'` | `QuestionScreen.tsx:259-283` (`.answer-reveal.hud-frame`) | `.answer-reveal` | 41:116-120 | ЧАСТ — картинка ответа `<img>` без FitImg, `maxHeight:26vh` инлайном |
| «120 секунд» | `question`, `sprint` | `SprintRound.tsx` из `HostScreen.tsx:450-470` | `.sprint-screen`, `.sprint-hero/-card/-timer` | 19c, 12 (`.sprint-*` для new_year) — **ny_book правил нет** | СТАР |
| Блиц | `question`, `blitz` | `BlitzScreen` `HostScreen.tsx:1174-1375` + `BlitzRound.tsx` | `.bz-screen`, `.bz-block/-question/-timer/-dice`; итог — `.sb-screen .score-table` | 41:178-186, 200-202 | НОВ |
| «Скачки» | `question`, `race` | `RaceRound.tsx` (canvas `BulldogStage`) | `.race-screen` | 13 (`--race-decor: winter` для ny_book) | ЧАСТ — по решению ведущего остаётся как есть (§3cl, §3ek) |
| «Угадай мелодию» — доска | `question`, `melody`, стадия idle/spinning | `ClassicMelodyBoard` `MelodyRound.tsx:519-563`, `MelodyGrid` :774-843, `TileCard` | `.mel-screen > .mel-board > .mel-theme`, `.mel-tile.qtile` | 41:171-175, 198, 263; 10/12/16/37 | НОВ (закладки + карточки) |
| «Угадай мелодию» — окно трека | стадии listen…reveal | портал `.mel-overlay.theme-ny_book > .mel-modal` `MelodyRound.tsx:564-735` | `.mel-modal-head/-theme`, `.mel-count`, `.mel-big`, `.mel-bids`, `.mel-bid-row`, `.mel-answer`, `.mel-wrong`, `.answer-reveal` | 41:142-156, 264-265; 18 | НОВ (вкладыш на разворот) |
| «Своя игра» — доска и плитка | `question`, `jeopardy` | `JeopardyRound.tsx` | `.jp-screen > .jp-board`, `.jp-overlay.theme-ny_book > .jp-modal` | 41:142-168, 261-262 | НОВ |
| «3 попытки» | `question`, `four_pics` | `RevealRound.tsx` из `HostScreen.tsx:497-502` | `.rv-screen.has-media`, `.rv-word/-cell`, `.rv-review` | 38 + 41:363-370 | НОВ (UI-05, 10.35) |
| «Скрэмбл» | `question`, `anagram` | `AnagramRound.tsx` (+`AnagramTeamsPanel`) | `.an-screen`, `.an-tiles/-cell/-clue/-result`, `.an-teams` | 39 + 41:189-199, 266-267, 372-376 | НОВ |
| Повтор вопросов | `recap` | `RecapSlides` `HostScreen.tsx:934-1026` | `.recap-screen > .recap-body`, `.recap-dots` | 41:135, 212 + 22:333-350 | ЧАСТ — только ширина сетки и padding |
| Ожидание ответов | `answer_time` | `AnswerTime` `HostScreen.tsx:1643-1719` | `.host-screen[.paper-answer-time]`, `.answer-pulse`, `Timer variant="ring"` → `Rosette is-big`, `.answer-time-teams > .at-team` | 41:306-309, 232-233 | НОВ (розетка 190u + чипы) |
| Разбор, этап «до раскрытия» (FLOW-01) | `show_answers`, `!reveal` | `ShowAnswers` `HostScreen.tsx:1848-1859` → тот же `QuestionScreen quiet` + `.answered-chip` | как у вопроса | 38:69-72 (`.answered-chip` — тёмная неоновая капсула, **ny-правил нет**) | ЧАСТ |
| Разбор, после раскрытия | `show_answers`, `reveal` | `HostScreen.tsx:1861-1996` | `.answers-layout.revealed > .answers-main + .team-answers`, `.q-recall`, `.answer-block.reveal-in`, `.answer-media`, `StagedChoices`, `.order-answer`, `MatchAnswer`, `.rebus-answer` | 41:116-120, 299-335 | НОВ |
| Табло | `scoreboard` | `ScoreboardScreen` `HostScreen.tsx:2151-2324` | `.sb-screen > .sb-title + .sb-table-wrap > table.score-table` | 41:123-126, 135, 254-255 | ЧАСТ — таблица «бумажная карточка», медаль `AwardMedal` общая |
| Перерыв | `break` | `BreakScreen` :2327-2367 | `.break-screen`, `.break-timer` | 41:135 (только padding) | СТАР |
| Подсчёт (бар) | `counting` | `CountingScreen` :2376-2431 | `.break-screen.counting-screen` | 41:135 | СТАР |
| Финал — кино-вставка | `finale`, `show_final_cinematic` | `FinalCinematic.tsx` | своё | 30 (без ny) | СТАР — дрон-киберпанк в любой теме |
| Финал — «шоу» (ретро по раундам, победитель) | `finale`, `!reveal` | :2673-2719 | `.fin-screen > .fin-slide`, `.fin-award.p1`, `.fin-progress`, `.fin-dots`, салют `.fw-*` | 41:203-204, 270-282, 380 | ЧАСТ |
| Финал — «бар» (3→2→1 место) | `finale`, `reveal` | :2631-2671 | `.fin-award.pN`, `.fin-award-medal` (`AwardMedal`) | 41:270-275 | ЧАСТ |
| Финал — итоговая таблица | оба сценария, последний шаг | `fullTable` :2598-2628 | `.fin-breakdown > .fin-table-wrap > table.fin-table`, `.fin-row.top3/.fin-first`, `FinMedal` | 41:378-401 (DESIGN-01) | НОВ (табло по мокапу 10.38) |
| Переходы между экранами | смена фазы/вопроса | `ScreenFx` (ничего не рисует для ny: `FLASH_MS` нет, флешей только classic/potter), `SnowCurtain` — только `new_year` | — | — | **НЕТ** перелистывания в бою: `PageTurn` (`BookScene.tsx:199-211`) экспортирован, но в `src/` вне `labs/` не используется (grep). Смена «сцены» сейчас = remount `Scenery` по ключу `scene` (см. §4) |
| Телефон игрока | все фазы | `PlayerPage.tsx:108` через `ThemeLayer` (без сцены) | `.pl-*` | 41:215-230 | НОВ (9.94), в ТЗ не входит |
| Предпросмотр редактора | — | `QuestionPreview.tsx:61` (`ThemeLayer isProjector phase="question"`) | как проектор | те же | НОВ для `question`; разбор/answer_time не предпросматриваются (HANDOFF §7) |

Лаборатория `src/labs/newyear` рисует **свою** разметку (`game/screens.tsx`, классы `gs-*`, `base.css`), а не `HostScreen`. Общие с боем только сцена/вымпелы/QR/розетка/перелистывание из `src/ny/book/BookScene.tsx` и CSS `40-ny-book-world.css`. То есть мокап в лаборатории ≠ DOM проектора — для этапа 2 это важно (§9).

---

## 2. Что уже есть и переиспользуемо; что дублируется

**Годится в Book Core без переделки (логика):**
- `Stage fit="cover"` + `--cx0/--cx1/--cy0/--cy1` (обрезка на не-16:9, `stage.tsx:88-93`) — на нём можно держать рамку книги в видимой области (как `.h-tvbody` у «Дома», §3do).
- `NySlot`/`NY_SLOT_BG`/`NY_SLOT_FX` — порталы контента в сцену (команды под затемнение, QR над ним).
- `nyDensity`/`isPlainQuestion` + `data-ny-density` — переключатель плотности декора по фазе; тест `src/ny/__tests__/density.test.ts`.
- `Rosette` (таймер) с контрактом `NyTimer` из `Timer.tsx` — можно перерисовать внутри, не трогая `Timer`.
- `Atmosphere` (canvas пылинки/мерцание окон/искры, под вёрсткой, уважает reduced-motion и `document.hidden`) — расширять, не дублировать.
- `Particles` (бумажный снег: `SnowCfg` с `paper:true`) — переключается на обычные хлопья одной опцией.
- `useFitText` (+`items`, `shrinkBefore`), `FitImg` (выключной ряд по пропорции), `FitAnswer`, `lenClass`/`mediaScaleVar`, `RulesFrame`, `FinMedal`, `TileCard` (плитка с front/back и `colorIndex`).
- Единица `--u` и приём «карточка = `box-shadow`-кольцо, а не padding» (41:285-291) — иначе ломается `flex-grow` FitImg.
- Токены `--nb-*` (41:16-17) и `--p-*` (40:5-11) — **дубль одной палитры в двух файлах** (`--p-ink`=`--nb-ink` и т.д.). Кандидат на единый блок токенов.

**Дублируется / разрозненно (кандидаты на один компонент «бумажная карточка»):** одинаковый рецепт `background: var(--nb-card); border:0; border-radius:0; box-shadow: 0 Npx 0 var(--nb-shade), 0 … rgba(60,30,10,…)` повторён ≥18 раз в 41-ny-book.css: `.qnum`(99), `.q-frame`(102), `.q-img`(105/287), `.choice-plate`(107), `.rule-item`(92), `.rules-frame`(95), `.ib-rules-band`(76), `.sb-table-wrap/.fin-table-wrap`(123), `.jp-modal/.mel-modal`(145), `.jp-answer/.mel-bid-row`(150), `.jp-tile .qt-*`(164), `.bz-block`(179), `.bz-question`(184), `.an-tile`(189), `.team-answer`(304), `.at-team`(308), `.answer-block`(312), `.order-answer .oi`(319), `.rv-teams > span`(368), `.fin-award-name`(273), `.p-teams-tag`(40:122), `.p-qr-face`(40:143). Плюс «красный заголовок с горчичной тенью» (41:80, 88, 125, 159) и «закладка» (`.jp-theme-name`/`.mel-theme`, 41:161/171). Это и есть будущие общие классы Book Core (§3).

**Старые куски, которые ТЗ заменяет:** `PaperTree` (плоские canvas-ёлки), `Bunting`/`.p-flag` (треугольные флажки), `House` (div-домик), `Drifts`, `.p-cover` (плоский градиент без уголков), `.p-page-*` (без объёма страниц). `Pennants` (вымпелы) и `QrCard` (домик-карточка) — заменяются по макету 1 (§11).

---

## 3. Проект Book Core — минимальная реорганизация

Цель: не переписывать архитектуру (ThemeLayer/NyScene/Stage/слоты остаются), а (а) собрать повторяющиеся рецепты в общие классы и переменные, (б) заменить сцену, (в) добавить декор-ассеты и перелистывание.

### 3.1 Файлы
- `src/styles/parts/40-ny-book-world.css` → остаётся «сцена» (стол, книга, страницы, декор, keyframes), но содержимое переписывается под новый облик. Имя и место в каскаде не менять.
- **Новый `src/styles/parts/40a-ny-book-core.css`** (импорт в `global.css` сразу ПОСЛЕ `40-ny-book-world.css`, ПЕРЕД `41-ny-book.css`): только токены темы и общие компоненты-классы:
  - токены: один блок на `.theme-ny_book` — `--bk-paper`, `--bk-paper-2`, `--bk-ink`, `--bk-red`, `--bk-gold`, `--bk-pine`, `--bk-shade`, `--bk-shadow`, `--bk-serif`, `--bk-display`; старые `--p-*` и `--nb-*` оставить алиасами (`--nb-card: var(--bk-paper)`) — так 41-файл не ломается сразу, переезд по экранам;
  - классы: `.bk-card` (пергаментная карточка с объёмной тенью), `.bk-card--ribbon` (красная плашка/лента), `.bk-tab` (закладка-категория), `.bk-tile` (номерная плитка), `.bk-frame` (рамка пергамент+бордовая окантовка), `.bk-title` (заголовок декоративным шрифтом), `.bk-photo` (подложка «по форме картинки» — см. §6), `.bk-medal`, `.bk-chip` (строка команды с полосой `--tc`);
  - они НЕ навешиваются в JSX (JSX общий с другими темами) — подключаются через `:is()`-список селекторов в 41-файле: `.theme-ny_book :is(.qnum, .rule-item, .choice-plate, …) { /* = .bk-card */ }`. Чтобы не копировать блок, в CSS делаем один селектор-список на рецепт (как уже сделано в 41:144, 182). Это и есть «повторное использование без копирования больших блоков» при неизменной разметке.
- `41-ny-book.css` → остаётся «экраны», из него уходят повторяющиеся рецепты (заменяются на списки селекторов из core); группировку оставить по экранам ТЗ (лобби / вопрос / ожидание / разбор / мелодия / остальные механики / табло-финал / телефон / 4K).
- `src/ny/book/BookScene.tsx` → разрезать на `BookScene.tsx` (`BookWorld`, `BookFx`), `BookDecor.tsx` (ассеты: ёлки, венки, гирлянда, фонарь, домик), `BookLobby.tsx` (`TeamsOnPage`, `QrCard`), `Rosette.tsx`, `PageTurn.tsx`. Экспорты для лаборатории (`concepts/popup/Popup.tsx:4`) сохранить (реэкспорт из `BookScene.tsx`).
- **Новый `src/ny/book/assets.ts`** — каталог декор-ассетов (путь, размер, точка привязки) + `prefetchBookAssets(base)` по образцу `src/lib/bulldog/arena/prefetch.ts` (вызов из `HostScreen`, когда тема `ny_book`, на лобби).
- Ассеты — `public/ny-book/*.webp` (см. §11.2); в `docs/` ничего не класть.
- `src/ny/density.ts` — без изменений (возможно, новое значение плотности не нужно: три уровня + `data-scene` достаточно).

### 3.2 Слои (z) — зафиксировать в core-файле одним комментарием
`ny-layer-bg` (fixed, z 0) → внутри сцены: стол → обложка → страницы → сгиб → декор задний (ёлки дальние, домик) → `p-content` слот (команды лобби, z 20) → снег (z 10, только sparse/medium) → декор передний (ёлки ближние, гирлянда, фонари) → `Atmosphere` (z 20) → `.p-grain` (z 60) ‖ `.host-screen` (обычный поток, `.grid-bg` без фона: 41:26-27) ‖ `ny-layer-fx` (fixed, z 200: QR, перелистывание `p-turn` z 95 внутри) ‖ модалки-порталы `jp-overlay/mel-overlay` (в `document.body`, несут класс темы сами — селектор ОБЯЗАН быть `.theme-ny_book.mel-overlay`, не потомком). Перелистывание должно жить в `ny-layer-fx` (поверх игры), а не в bg.

### 3.3 Ловушки, которые план обязан учитывать (CLAUDE.md §5)
- **Вес селектора важнее файла.** Половина правил 41-файла уже на весе (0,3,0)–(0,4,0) с `!important` (41:53, 64, 125, 179-181, 203, 207, 302). Любой общий `.bk-card`-список обязан иметь вес ≥ (0,2,0) (`.theme-ny_book .x`) и для `.bz-block` — не ниже (0,2,1) с `!important`, иначе проиграет `16-round-melody-tiles`/`22-question`. Проверять `getComputedStyle`, а не «файл ниже».
- `15-projector-interactive.css:19` — всем прямым детям `.grid-bg` ставится `position: relative`; новые позиционированные дети `.host-screen` (например, уголки рамки, декор-ветка внутри экрана) — только через `::before/::after` на самом `.host-screen` или добавлением в список `:not()`.
- `@media (prefers-reduced-motion)`: у сцены уже есть глушилка `.nyl-stage *` (40-ny-engine:16-25, `!important`), но игровая вёрстка (`.host-screen`) под неё не попадает — новые keyframes на игровых элементах (разворот карточки ответа, перелистывание в fx-слое — он внутри `.nyl-stage`, ок) гасить селектором той же специфичности (как 23-answers делает с `!important`).
- `padding-top` под таймер: в «Книге» `.host-screen` имеет `padding: 134u 250u 136u` (41:30-31, 294) — экраны без `.q-text` (`.rv-screen`, `.recap-screen`) уже требуют собственного отступа; при новой рамке (уголки, гирлянда сверху) пересчитать безопасную область и зафиксировать её переменными `--bk-safe-top/-x/-bottom`, а не числами в каждом правиле.
- `Stage fit="cover"`: на 1899×905 (≈2.1:1) сцена обрезается сверху/снизу (`--cy0/--cy1` ≈ 20px), на 1366×768 и 1280×1024 — по бокам/сверху. Рамка книги должна считаться от обрезки (как `.h-tvbody` в 42:§3do), иначе уголки уедут за экран.
- `.theme-ny_book:has(.p-turn.is-out) .p-pop` (40:100) — `:has()` на корне темы пересчитывается на каждый рендер; при частых поллинг-рендерах держать такие правила минимальными.
- `:not(.has-media):not(.has-choices) > div:has(> .q-text)` (41:341) — рамка текста без картинок уже привязана к `:has`; при переделке раскладки вопросов это первое правило, которое сломается.

---

## 4. Карта анимаций и событий

### 4.1 Что обновляет экран
`useGameState` (`src/hooks/useGameState.ts:26-33`) опрашивает сессию каждые 2 с и **всегда** кладёт новый объект (`setGameState(data)`) → `HostScreen` → `ThemeLayer` → `NyBackdrop`/`HostInner` перерисовываются каждые 2 с даже без изменений. `useTeams`/`useAnswers` — тоже по 2 с. CAS-записи (`sessionBag`) меняют `state_rev` — для экрана это просто очередной снимок. **Вывод:** любая анимация обязана зависеть от смены КЛЮЧА (`key={…}`) или класса-состояния, а не от факта рендера. Так уже сделано: `WindText key={q.id}`, `Timer key={q.id}`, `recap-body key={q.id}`, `p-ros-num key={t.left}`; CSS-анимации на нерепозиционируемых элементах при перерендере не перезапускаются.

### 4.2 Что сейчас что запускает (ny_book)

| Анимация | Где | Триггер | Перезапуск от опроса? |
|---|---|---|---|
| `p-up` (подъём деталей на сгибе) | `Pop` в `Scenery` (`BookScene.tsx:97-125`) | remount по `key={…${scene}…}` → смена `phase` (`scene={phase}` `NyScene.tsx:33`) **и** смена `density` (другая ветка `Scenery`) | нет; но на вопросе `plain`↔`dense` (вопрос без картинок ↔ с картинками) декор переигрывает подъём при смене ВОПРОСА — это сейчас единственная «смена страницы» |
| `p-drop` (гирлянда падает) | `Bunting` | один раз при монтировании `BookWorld` | нет |
| `p-flag`, `p-candle` | флажки, окна домика | бесконечные | нет |
| бумажный снег | `Particles` | постоянно, только sparse/medium | нет |
| `Atmosphere` (луч, пылинки, окна, искры) | canvas | постоянно; `document.hidden` → не рисует; reduced → 1 кадр | нет |
| `p-unfurl` | `.neon-title` лобби (41:48), `.ib-rules-band` (41:77) | монтирование элемента | нет |
| `p-ink` | `.info-list li` (41:78), `.info-round` (82), `.answer-main` при `.reveal-in` (317) | монтирование | нет |
| `p-rise` | `.groups-modal` (41:60) | открытие модалки | нет |
| `p-grow` | `.jp-modal/.mel-modal` (41:146) | стадия ≠ idle/spinning (портал появляется) | нет (портал не размонтируется между стадиями) |
| `p-pull` | `.answer-reveal`/`.answer-block` (41:116-117; у `.answer-block` перебито `ansIn`, 313) | `reveal:true` | нет |
| `ansIn` (23:274) + `p-ink` | `.answer-block.reveal-in` | `reveal:true` | нет |
| `nb-correct`, `p-stamp` | `.choice-plate.correct` (41:326-330) | `StagedChoices` стадии 0→1→2 (`HostScreen.tsx:2006`, 3.3 с + каскад 0.5 с + 0.9 с) | нет; зависит от `q.id` |
| `matchPop`/`.oi` каскад | 23:29-51 | монтирование разбора | нет |
| `ruleIn` | `.choice-plate` (19b) | монтирование вопроса | нет; **ловушка**: держит `opacity`, поэтому `.dimmed` должен снимать `animation` (41:332) |
| `p-flip` | число розетки `key={t.left}` | каждая секунда | нет |
| `p-wobble`/`p-drop-over` | розетка `is-low`/`is-zero` | по классу | нет |
| `p-hang` (вымпелы, `--i`), `p-reveal` (QR) | лобби | монтирование `Pennants`/`QrCard`; новая команда → только её вымпел (по `key={t.id}`), но **смена числа рядов** (4→5 команд) перекладывает всех и переигрывает `p-hang` у всех | нет |
| `PageTurn` (`p-turn`, `p-fold`) | — | **в бою не подключён** | — |
| `ScreenFx` | `HostScreen.tsx:115-119`, ключ `phase-round-question` (без question на finale/recap) | для ny ничего не рисует | — |

### 4.3 Как сделать по ТЗ, не перезапуская от опроса
- Перелистывание при смене **вопроса**: один маленький хук в `ThemeLayer`/новый `BookTurns` (аналог `ForestTransitions`, `HostScreen.tsx:139`), который держит `prev = {phase, round, question}` в `useRef`, сравнивает с новым снимком и выставляет локальный `turnKey` только когда изменился `question_index` в фазе `question` (и `recap`/`show_answers` при `gotoAnswers`) — тот же приём, что `fxTrigger`; остальные обновления (`timer_started_at`, `reveal`, `melody`-мешок, `state_rev`) ключ не меняют. Длительность 0.7–1.1 с → `PageTurn` в `ny-layer-fx` с `pointer-events:none`, таймеры и `Timer` не трогаются (он в `.host-screen`, живёт отдельно). «Новая глава» — ключ по `round_number` при входе в `round_intro`. Быстрое переключение: новый ключ просто перемонтирует лист (`key={turnKey}`), предыдущая анимация обрывается — это допустимо; защита от «листа навсегда» — `animation-fill-mode: forwards` + снятие узла по `animationend` с запасным `setTimeout`, отсчитанным от `animationstart` (CLAUDE.md §5 про `transitionstart`).
- Переподключение/перезагрузка проектора: первый снимок — `prev === null` → без перелистывания (как `isFirst` в `ScreenFx.tsx:81`).
- Фаза `recap`/`finale` листает сама (3–5 с) — перелистывание на каждом слайде даст стробоскоп; для них ключ без `question_index` (как уже у `fxTrigger`) или отдельная «лёгкая» анимация.
- `Scenery` remount по `density`: при переходе на новую сцену стоит разделить «состав декора по плотности» (остаётся) и «анимацию подъёма» (играть только по `scene`, а между плотностями — `transition` opacity/transform без remount; иначе плоские ёлки «встают» при каждом вопросе с картинками ↔ без).
- Раскрытие ответа (B): триггер — `reveal:false→true` (`ShowAnswers`/`QuestionScreen`), уже так; «разворот карточки» = заменить `ansIn` на 3D-flip в `.answer-block.reveal-in` только для `.theme-ny_book` (вес ≥ (0,2,0), reduced-motion — тем же селектором с `!important`, как 23-answers).
- `paper` режим: таймер стоит до «ПРОЧИТАЛ» (`timer_started_at` null); перелистывание от него не зависит; на `answer_time` в бумаге нет колонки команд (`AnswerTime` :1703) и нет `.answered-chip` (:1855) — макет «часы + счётчик» в бумаге = только часы.
- Музыкальный раунд: анимации стадий — от `m.stage`/`m.key` (меняются только CAS-записью), не от `now`-тика (200 мс в `useMelodyBoard`); вращение пластинки — ТОЛЬКО от реального `playing` общего `<audio>` (`sharedAudio`: `SharedPlayback.on()`/`result`), см. §7.

---

## 5. Раскрытие ответа: как сейчас и как положить этапы A/B/C

**Два пути, оба без новых состояний:**

1. `answers_reveal: 'after_round'` (основной): `question` → … → `answer_time` → `gotoAnswers(0,false)` → фаза `show_answers`, `question_index=i`, `reveal=false` → `ShowAnswers` (`HostScreen.tsx:1723`). Пока `!reveal` — FLOW-01 (:1848-1859): тот же `QuestionScreen quiet` без таймера/звука + `.answered-chip` «Ответили N из M» (команды с непустым `answer_text`). Через 3 с (`:1745-1751`, `AutoReveal` не участвует) или кнопкой «Показать ответ →» → `revealAnswer(navFrom)` → `reveal=true` → разбор (:1861-1996). Внутри разбора: `q-recall` (вопрос мельче), `.answer-block.reveal-in` с ответом, `revealImgs` = `media.answer` картинки **или** картинки вопроса, если своих нет (:1782-1788), `hiddenVideo`, `answerAudio`; `checked` через `revealDoneMs(q)+600` (:1757-1767) → только тогда `answer_note` и вердикты ✓/✗ в `.team-answers`. Для `choice` — `StagedChoices` (0 с два неверных → 3.3 с остальные → +0.5·n подсветка).
2. `answers_reveal: 'after_question'`: на самом вопросе `AutoReveal` по концу таймера или кнопка → `reveal=true` на фазе `question` → `QuestionScreen.tsx:259-283` рисует `.answer-reveal` под вопросом (ответ, note без класса, картинки ответа `<img>` без FitImg, `maxHeight:26vh`). Возврат к показанному вопросу — `gotoQuestionShown` (`reveal:true`, `timer_started_at:null`).

**Состояние живёт в `game_sessions`:** `phase`, `question_index`, `reveal`, `timer_started_at`. Локально (в компоненте): `checked`, стадия `StagedChoices`, `revealedFin`.

**Этапы ТЗ без новых состояний:**
- **A** (повтор вопроса, без счёта таймера) = `show_answers && !reveal` — уже существует (FLOW-01). Требование «без изменений» выполняется: тот же `QuestionScreen`. Оформить только `.answered-chip` под Книгу (сейчас тёмная неоновая капсула, 38:69-72) — например, бумажный штамп в углу страницы; в `paper` чипа нет.
- **B** (раскрытие по команде ведущего) = момент `reveal:false→true` — кнопка «Показать ответ →» (проектор/пульт) + страховка 3 с (`:1748`). **Открытый вопрос к ведущему:** автораскрытие через 3 с оставляет этапу A три секунды (отмечено в §3df) — для «по команде ведущего» таймер страховки надо либо убрать, либо увеличить (это изменение поведения, не вёрстки — решить до старта).
- **C** (раскрытое состояние) = `reveal:true` + `checked:true`. Пояснение показывается только после `checked` — ТЗ совпадает.
- **Доп. картинка ответа как самостоятельный элемент:** в `after_round` — `revealImgs` в `.q-media-grid.answer-media` (23:16-17, `max-height:34vh`), но при пустом `media.answer` туда подставляются картинки ВОПРОСА (:1788) — для «самостоятельного элемента ответа» ТЗ надо отличать два случая классом (например `.answer-media.is-own` vs `.is-recall`) — правка JSX в `ShowAnswers` на одну строку, без логики. В `after_question` картинка идёт `<img>` без FitImg/класса — привести к `FitImg` (та же правка, что просил ревью 10.22, п. «в»).
- Форматы разбора, которые обязаны остаться: free_text, choice (текст и картинки-варианты `.choice-img`), match (`MatchAnswer`, без `q-recall`), order, rebus (`.rebus-answer` c подсветкой слогов), crossword_word (идёт общим экраном), ставки (`a.stake` рядом с ответом команды :1984).

---

## 6. Компоновка вопросов с 0–4 картинками (как сейчас, риски)

`ClassicQuestionScreen` (`QuestionScreen.tsx:138-283`):
- 0 картинок: `.host-screen:not(.has-media)` → `div.q-frame > p.q-text` (`WindText` + `useFitText`); в Книге — безопасная область 1520×410u с плашкой (41:341-351), кегль 100/84/68/58u по `lenClass`.
- 1–2 картинки с текстом (не варианты): `.q-split` (текст слева, картинки справа; `n1` или `n2.eq-row.split-pair`), `max-height: 68vh` (22:30, 174), кегль 50/44/38/33u (41:240-243).
- 3–4 картинки (или 1–2 без текста): `.q-media-grid.nN.eq-row` — `FitImg` (flex-grow = пропорция, высота ряда общая), 5–6 → `.wrap2`.
- Картинки-варианты (число картинок = числу вариантов/пар): `.img-answers` + `FitAnswer` (буква/номер на карточке, свой `.ia-frame`), не `.q-img`.
- Варианты текстом: `.choices-grid` + `.choice-plate` (ступени `c-m/l/xl` по длине), `.has-choices` → `padding-bottom` и `max-height:46vh`.
- Видео: `QuestionVideo` (видимое — `maxHeight:46vh` инлайн; `hidden` — как аудио).
- Масштаб из редактора: `--ms` (`mediaScaleVar`).

Книга поверх этого: `.q-img` — «полароид» через `box-shadow`-кольцо (41:287-291), чередующийся наклон ±1.2° (41:106), `gap 40u`.

**Риски для «подложки по форме картинки, без белых прямоугольников, без растяжения»:**
- Подложка = сама ячейка `.q-img`: её ширина уже равна ширине картинки (выключной ряд), поэтому «по форме» выполняется автоматически для `.eq-row`; **но** для `n1` в `.q-split` и для `FitAnswer` ширина ячейки — колонка, а картинка `object-fit: contain` → подложка шире картинки (белое поле). Решение без JSX: подложку рисовать на `img` (`box-shadow` на `img`, не на `figure`) — проверить, что `overflow:hidden` ячейки (22:190-192) не режет тень → тогда `padding` ячейки ≈ толщине рамки.
- Наклон `transform: rotate(±1.2deg)` на `.q-img` + `overflow:hidden` родителя режет углы на больших экранах (3840) — замерить.
- `:nth-child(odd/even)` наклон срабатывает и в `.answer-media`/`.rebus-answer` (одна и та же `.q-img`) — там это может быть нежелательно.
- `FitImg` и `FitAnswer` — две копии логики `ar` (HANDOFF §7) — подложка должна быть одна на обе.
- `useFitText` меряет `offsetHeight`/`Range`; псевдоэлемент-подложка `::before` на `div:has(> .q-text)` безопасна (вне замера), а вот декор ВНУТРИ `.q-text` сломает подгон (§3cf).
- На 3840 все `clamp` с px-потолком (22:30 `68vh` ок, но 23:17 `34vh`, 22:237-240 кегли) перебиты в 41:236-267 через `--u` только для перечисленных классов; `.q-split .q-img img { max-height }` и `.answer-media img` — в `vh`, нормально. `.choices-grid` `max-height:46vh` — тоже. Проверять замером (§8).
- `.has-choices` с 4 картинками-вариантами + текст: самый плотный экран (`.has-media.has-choices .q-text` 40u) — именно его смотреть на 1899×905 первым.

---

## 7. «Угадай мелодию»: стадии → экраны, что оформлять, риски аудио

Стадии (`src/lib/melody.ts:11-22`, тип `MelodyState.stage` `types/quiz.ts:294`), все переходы — чистые функции + CAS (`melodyClick`/`updateMelodyBag`); пульт (`AdminPage.MelodyControls`) делает те же шаги.

| Стадия | Экран `ClassicMelodyBoard` | Кто двигает | Для оформления |
|---|---|---|---|
| idle/нет, done | `.mel-screen > .mel-board` (темы столбцами, плитки-номера; сыгранные `done`) + `.host-actions` (Стартуем!/Рулетка/Выбрать вручную/Завершить раунд) | ведущий | макет «книжки-категории с номерными плитками» — число столбцов = `themes.length`, строк = max tracks (инлайн `gridTemplate…` `MelodyRound.tsx:803-806`) — **не зашивать 3×5** |
| spinning | та же доска, `hot` плитка прыгает (`useMelodySpin`, путь детерминирован ключом+дедлайном) | авто (дедлайн `spinMs`) | подсветка `TileCard hot`; на ny_book нет своего маркера (огонёк только potter) |
| listen | портал `.mel-overlay > .mel-modal`: «СЛУШАЕМ 1 СЕКУНДУ…», без таймера | авто (3 с) | «проигрыватель с пластинкой»: вращение только пока реально играет 1 с |
| bidding | «ЗА СКОЛЬКО СЕКУНД УГАДАЕТЕ?» + `.mel-count` (дедлайн) + `.mel-bids` (только «ставка принята ✓») | авто по дедлайну; фоновая музыка `bgMusic` | ставки идут **до** игры команды — ТЗ совпадает |
| bids | «СТАВКИ КОМАНД» по возрастанию, первая `ИГРАЕТ`; кнопки «Играем N сек»/пропустить | ведущий | |
| snippet | «<команда> · играет N сек»; звук `playShared(track, {startAt, keepTail})` | авто по концу отрывка / кнопка | пластинка крутится по факту `playing` |
| answering / passed | имя команды, `.mel-count` (answerSec/passAnswerSec), `.mel-answer` (текст ответа команды), ✓/✗; в `passed` второй команде играет трек целиком | ведущий (grade) | |
| reveal | `.answer-reveal` «ВЕРНО ✓ · +N»/«ПРАВИЛЬНЫЙ ОТВЕТ», 15 с трека (`RevealTrack`), «Дальше» | ведущий | |
| любая ≠ reveal/done | `.mel-escape` (аварийно закрыть) | ведущий | |

Названия тем/число треков — из `round.settings.themes` (`MelodySettings`), тексты — `track.correct`. Общего приёма ответов с телефонов нет (только команда с ходом) — ничего не добавлять. Статус звука — только на пульте (`melody.audio`, решение 10.34): индикаторов на проекторе не рисовать.

**Что можно оформить без логики:** доска (`.mel-board/.mel-theme/.mel-tile`), окно (`.mel-modal*`, `.mel-big`, `.mel-count`, `.mel-bids/.mel-bid-row`, `.mel-answer/.mel-wrong`, `.answer-reveal`), новый декоративный элемент «пластинка» — чисто CSS/JSX внутри `ClassicMelodyBoard` под `pack.theme === 'ny_book'` (как `theme === 'potter'` маркер :793-795), с классом `is-playing`.

**Риски аудио:**
- Единственный источник «реально играет» — `SharedPlayback` из `playShared()` (`lib/sharedAudio.ts`): `h.on()`/`h.result`; `audio.paused`/`playing` события общего элемента читать только через него, не плодить второй `<audio>`. В cleanup — `h.stop()` своей операции, не `stopShared()` (кроме осознанного «ответа нет → дальше», :294).
- `AbortError` = «прервали», не ошибка (§3bw) — индикатор пластинки не должен «краснеть» на нём.
- Возврат вкладки: `vt.*` перезапускает только пропущенные эффекты (10.40) — состояние пластинки брать из факта воспроизведения, не из стадии, иначе при `document.hidden` будет «крутится, но не играет».
- Дедлайны перебазируются (`melodyRebaseDeadline`) — таймер в окне рисовать из `left/total` хука, не считать заново.
- Декор окна (`p-grow` при монтировании портала) не должен навешиваться на смену стадии внутри одного трека (портал не размонтируется) — иначе «вырастет» 6 раз за трек.
- Preview в редакторе (`preview`) показывает те же классы: новый декор не должен требовать `gameState.melody.audio`.

---

## 8. Риски, зависимости, что нельзя ломать, тесты, объём, порядок

**Нельзя ломать (контракты):**
- `ThemeLayer` (число детей постоянно, комментарий `HostScreen.tsx:134-136`), `NyBackdrop/NyFx`, `NySlot` id-слоты, `Timer`→`Rosette` контракт `NyTimer`, `nyDensity`/`isPlainQuestion` (тест `density.test.ts`), экспорты `BookScene.tsx` для лаборатории (`BookWorld, PageTurn, Pennants, QrCard, Rosette`), классы разметки (JSX общий с classic/potter/new_year/ny_home — **новые классы в JSX только добавлять, не переименовывать**), `.host-actions` (fixed, скрыты без `?nav=1`; в `paper` ведущий жмёт их с проектора — `ThemeLayer paper` сейчас включает кнопки только для Леса: в Книге на бумаге кнопок тоже нет — см. §10), `.answered-chip` fixed вне `.grid-bg`, порталы `jp-overlay/mel-overlay`, `--u`, `-webkit-mask` вырез под QR (40:118-122, координаты QR 160/484 зашиты — при переносе QR по макету 1 пересчитать).
- Логика: `lib/melody.ts`, `melodyActions`, `sharedAudio`, `reveal.ts`, `revealActions`, `totals.ts`, `flow.ts`, `gameActions`, `navGuard` — не трогаются вовсе.
- `docs/` — не трогать; `public/sw.js` `VERSION` бампать синхронно с `version.ts`.

**Тесты, которые заденет:** `src/ny/__tests__/density.test.ts` (если менять плотности), `src/labs/newyear/__tests__/lab.test.ts` (импортирует концепт `popup` → `BookScene`), `src/components/__tests__/*` с `Timer`/`QuestionScreen` (если менять JSX) — проверить `grep -rl "QuestionScreen\|Timer" src/**/__tests__`; счётчик сейчас 930 + 7 todo (HANDOFF §3en). Новые чистые функции (ключ перелистывания, каталог ассетов, раскладка команд на странице по N) — покрыть тестами, как `density.test.ts`.

**Прочие риски:** производительность слабого ТВ (canvas-ёлки сейчас ~50–110 мс рисуются один раз; растровые webp дешевле, но `filter: drop-shadow` на больших слоях дорог — §3dy); память SW-кеша при десятках webp (cache-first в `qp-<VERSION>`, `sw.js:160`); `mix-blend-mode: multiply` зерна (40:28) поверх растровых ассетов меняет их цвет; `:has()` селекторы на корне; 4K — всё новое только в `--u`.

**Объём (оценка по группам, без ассетов):** Book Core + сцена (обложка, страницы, уголки, декор из ассетов, перелистывание) — крупно; лобби по макету 1 (команды на странице без пустых мест, QR-карточка, домик) — средне; вопросы 0–4 картинки + варианты (подложки по форме, безопасная область с картинками, 4K) — средне; ожидание ответов + этапы A/B/C (chip, разворот карточки, картинка ответа) — мало-средне; мелодия (книжки-категории, проигрыватель) — средне; финал по макету 4 — средне; остальные механики (блиц, скрэмбл, 3 попытки, своя игра, спринт, кроссворд-заставка, инфо, табло, перерыв/подсчёт) — по чуть-чуть каждая, вместе средне; гонка/интро/кино — вне контура (решение ведущего).

**Порядок внедрения:** (1) Book Core: токены + общие классы + сцена-рамка без замены контента (экраны не должны измениться визуально кроме рамки) → замер 3 ширин; (2) ассеты: нарезка, `public/ny-book`, каталог, прогрев; (3) лобби (макет 1); (4) вопросы 0–4 + варианты; (5) ожидание + разбор A/B/C; (6) мелодия; (7) финал (макет 4) + табло; (8) остальные механики; (9) перелистывание/новая глава/разворот карточки (анимации — последними, когда раскладки стабильны); (10) reviewer перед деплоем.

---

## 9. План ЭТАПА 2 — браузерные прототипы на реальной разметке

Лаборатория `src/labs/newyear` рисует СВОЙ DOM (`gs-*`) — для прототипов экранов проектора она не подходит (мокап ≠ бой, именно так ловились расхождения в §3cl). Правильный образец в репозитории — `e2e/bulldog/harness.tsx`: настоящий компонент раунда + `global.css` + фиктивные `pack/round/gameState/teams/answers` через `preview`, управление `window.harness.set(...)`, vite dev без сети.

**Предложение:** `e2e/book/harness.html` + `harness.tsx` (не в `vite build`: корень `index.html` единственный вход, как у bulldog), который монтирует `ThemeLayer theme="ny_book" isProjector phase=…` и внутри — настоящие компоненты: `QuestionScreen` (экспортирован), `MelodyBoard`/`JeopardyBoard`/`RevealBoard`/`AnagramBoard` (все умеют `preview: PreviewCtx` — `lib/previewState.ts:23`, `previewTeams/previewAnswers/previewGameState`), `InfoSlideView`, `Timer`, `NyLobby`. Чего `preview` не умеет: лобби, `AnswerTime`, `ShowAnswers`, `ScoreboardScreen`, `Finale` — это приватные функции `HostScreen.tsx`. Два пути: (а) **вынести их в `src/components/screens/*`** по образцу `QuestionScreen` (без логики — слоты для эффектов/кнопок; это полезно и для предпросмотра из бэклога §7), или (б) стенд с фейковым PostgREST (`scripts/e2e/net-stack.sh` + Playwright, как у `net.cjs`) и настоящим `HostScreen` — тяжелее, но ничего не выносит. Рекомендую (а) для `AnswerTime`, `ShowAnswers`, `Finale.fullTable`, `ScoreboardScreen` + (б) одним прогоном «сквозь игру» на финише этапа.

**8 состояний стенда (данные — настоящие формы `types/quiz.ts`, как `labs/newyear/game/data.ts`):**
1. Лобби: 3 команды / 8 команд / 14 команд (QR настоящий через `QrCode`), + открытые составы.
2. Вопрос: текст без картинок, длинный (`len-xl`).
3. Вопрос: текст + 1 картинка (3:4) и текст + 2 картинки + 4 варианта.
4. Вопрос: 4 картинки-варианта с буквами (без текста) и 3 картинки с текстом.
5. Ожидание ответов (`answer_time`, online и paper).
6. Разбор: A (quiet + chip), B/C (free_text с `media.answer`, choice, match, order).
7. Мелодия: доска idle (темы из данных: 2×4 и 4×6), spinning, bidding, snippet (пластинка), reveal.
8. Финал: итоговая таблица 6/8/12 команд, 8 раундов, дробные баллы; + табло, блиц-итог, «3 попытки» review, скрэмбл результат.

**Снятие:** Playwright из `/opt/pw-browsers` (`PLAYWRIGHT_BROWSERS_PATH` настроен, §7 HANDOFF), `npx vite --port 5199`, viewport 1920×1080 и 1899×905 (+1366×768, 3840×2160 для 4K-правила), `deviceScaleFactor 1`, `page.emulateMedia({reducedMotion})` для второго прогона; ждать `document.fonts.ready` и `animationend`/фикс. паузу 3 с; скриншоты в `docs-dev/book-redesign/shots/<state>-<w>x<h>-<theme>.png` (НЕ в `docs/`). Рядом — JSON замеров: `getBoundingClientRect` ключевых узлов (`.host-topbar`, `.q-text`, `.q-img`, `.choices-grid`, `.host-actions`, `.answered-chip`, `.p-ros`, `.fin-table`) + проверка пересечений и выхода за `--cx/--cy`-область, как `qa.mjs` в §3ck (его в репозитории нет — написать заново в `e2e/book/measure.cjs`). Темы: ny_book обязательно, классика/potter/new_year/ny_home — регрессия «ничего не изменилось» (сравнение скриншотов до/после на тех же состояниях).

---

## 10. Вопросы к ведущему (блокирующие)

1. **Страховка 3 с на `show_answers`** (`HostScreen.tsx:1748`): этап B «по команде ведущего» — автораскрытие убрать, увеличить или оставить? Это поведение, не вёрстка.
2. **Кнопки на проекторе в режиме `paper`**: сейчас в Книге `.host-actions` скрыты всегда (41:37), кроме `?nav=1`; на бумаге ведущий ведёт с проектора (CLAUDE.md §4). Оставить скрытыми (ведёт с пульта) или показать как в Лесу (`fo-nav`)? Влияет на безопасную область снизу.
3. **Ассеты (макеты 2, 3): исходники на белом фоне.** Снег и белые элементы по цвету от фона не отделить — нужен либо PNG с альфой от ведущего/генератора, либо повтор на пурпурном/зелёном фоне (как в `scripts/arena/key_sky.py`), либо ручная вырезка. Какой вариант?
4. **Лобби (макет 1): куда идут команды при 9–16+** — «пустая правая/левая страница» одна или обе; и что показывать, когда команд 0 (сейчас — ничего, только «ждём»).
5. **Финал (макет 4): медали только 1/2 или 1/2/3** (в коде `FinMedal` 1–3, `AwardMedal` 1–3); при ничьей (`shared`, «1=») — две плашки?
6. **Интро и кино-вставка финала** остаются киберпанковскими в Книге (как решено в §3cl) — подтвердить, иначе это два отдельных больших экрана.
7. Данные живого пакета (сколько тем/треков в мелодии, есть ли вопросы с 4 картинками-вариантами, с `media.answer`, число раундов 8?) — не проверял, доступа к базе из этого прогона не было; нужно сверить через Supabase перед стендом.

---

## 11. Дополнение: 4 новых макета ведущего

### 11.1 Лобби «ранее согласованный вариант» (макет 1)
Сверка с кодом: заголовок = `Title lines=['QUIZ PARTY']` → `.neon-title` (41:44-54, сейчас «лента» через `::before/::after`-хвосты) — лента с бантом/веткой делается тем же узлом (бант/ветка — ассеты в `::before/::after` или в `BookFx`-слое по координатам сцены). Команды «на пустой странице, без пустых мест» → заменить `Pennants` на `TeamsOnPage` (раскладка по N: 1–4 крупно в одну колонку, 5–8 две, 9–16 три/четыре; кегль от N; имена до ~22 знаков — `is-mid/is-long` уже есть), слот `NY_SLOT_BG` остаётся. QR на наклонной пергаментной карточке слева + фонарь → `QrCard` (слот FX, выше затемнения `.groups-overlay`); сам QR не наклонять (камера, §7 HANDOFF про twinkle) — наклон только у карточки-подложки, код прямой внутри; маска зерна (40:118-122) — пересчитать координаты. Заснеженный холм/домик с дымом/ёлки/забор/ягоды — растровые ассеты в `Scenery sparse` вместо `PaperTree/House/Drifts`; дым — маленькая CSS/canvas-анимация (в `Atmosphere` уже есть мерцание окон по координатам 899/1028 — переместить под новый домик). `paper`-лобби: без QR (`showQr={!paperMode}`) — карточку не рисовать, место не пустовать (фонарь/венок). Окно составов (`.groups-modal` справа, 41:57) не перекрывает QR слева — сохранить.

### 11.2 Листы ассетов (макеты 2, 3): нарезка, хранение, вес, загрузка
- Нарезка: скрипт `scripts/ny-book/cut-sheet.py` по образцу `scripts/arena/prep_p2.py`/`key_sky.py` (Pillow): входной лист → bbox по альфе (если альфа есть) или по связности с краем (если фон сплошной) → отдельные файлы с 8-px полем; записать `public/ny-book/MANIFEST.json` (имя, w×h, якорь-основание, sha) по образцу `public/bulldog/MANIFEST.json` + тест целостности (как `swBulldog`). Белый фон (макеты на белом) — блокер, см. §10 п.3.
- Хранение: `public/ny-book/<группа>/<имя>.webp` (ёлки `tree-1..4`, венки `wreath-bow/-lantern/-star`, гирлянда `garland-long`, уголки `corner-1..3`, ветки `branch-cone/-berries`, домик/холм/забор/фонарь из макета 1 если будут отдельными). `docs/` не трогать; ассеты едут в прод деплоем.
- Размеры/вес: ёлки — высота до 900 px сцены (на 4K сцена масштабируется ×2 → хранить 2× = до 1800 px, WebP q85 с альфой без потерь, ориентир ≤ 250–400 КБ каждая); гирлянда ≤ 2000 px ширины; уголки/ветки ≤ 600 px. Весь набор держать ≤ 4–5 МБ (телефонам не нужен — грузит только проектор; `ThemeLayer` на телефоне сцену не монтирует).
- Загрузка: `<img decoding="async">` внутри сцены + `prefetchBookAssets()` при входе в тему (лобби — первый экран, там ждать можно; `loading="lazy"` НЕ ставить — всё видно сразу). SW: кэш cache-first `qp-<VERSION>` (`sw.js:160`) — новая версия перекачает набор; если набор вырастет, выделить свой кеш с версией по MANIFEST (как `qp-bd-*`).
- Зерно `.p-grain` (multiply) и `drop-shadow` на ассетах — замерить кадр (§3dy: `filter` на больших слоях дорог); тень лучше запечь в сам ассет.

### 11.3 Итоги «НАШИ ПОБЕДИТЕЛИ» (макет 4) — сверка с финалом
Код: `fullTable` (`HostScreen.tsx:2598-2628`): колонки = место, команда, `Р{displayRoundNumber}` по каждому раунду без `off_scoreboard` (число раундов **из пакета**, не 8), `Σ`; строки — `rankTeams` (общие места `shared` → «=»), `--tc` цвет команды, `FinMedal` 1–3 (`components/FinMedal.tsx`, показывается только в 41/43), `.fin-row.top3/.fin-first` подкраска (41:390-391), итог `<b>` красным (41:393). Баллы — JS-числа: 4.5 печатается как «4.5» (точка), не «4,5» — если макет требует запятую, это форматирование в одном месте (`:2619, :2621`) — не трогая `totals.ts`. Кегль задаёт `.fin-screen .fin-table` + `useFitText(minScale 0.3)` (`:2481-2483`): 12 команд → ~16 px (§3dp) — рамка «пергамент + бордовая окантовка» и ёлки/фонари по бокам отбирают ширину; на 1899×905 замерить 8 и 12 команд. Строки раскрываются снизу вверх 10–20 с (`revealedFin`) — снимки после паузы. Заголовок «НАШИ ПОБЕДИТЕЛИ» = `Title lines=['РЕЗУЛЬТАТЫ']` (`:2646, 2725`) — текст меняется в JSX одной строкой (ветка по теме или общая — решить), шрифт тёмно-синий декоративный → `.fin-screen .neon-title` (41:381, сейчас `--nb-serif` 800). «1-е место на красной плашке» → `.fin-row.fin-first td` (41:391); «итог в золотом венке» → `td:last-child b` + ассет венка `::before`; «медали золото/серебро с лентой» → перерисовать `FinMedal` (SVG) — третье место есть в коде, в макете нет (§10 п.5). Салют `.fw-*` в Книге уже скрыт (41:380). Сценарии «бар» (3→2→1) и «шоу» (ретро по раундам) ведут к той же таблице — макет покрывает только последний шаг; `fin-award`/`fin-slide` остаются в стиле Core.
