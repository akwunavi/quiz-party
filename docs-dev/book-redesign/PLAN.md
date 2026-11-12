# План редизайна темы «Книга» (`ny_book`) — этап 1 → 2 → 4

База: код 10.64 и `AUDIT.md` (аудит здесь не повторяется, номера разделов — `AUDIT §N`). Решения ведущего из задания зафиксированы и здесь не обсуждаются. Код не менялся. Браузер в этом заходе не запускался, всё — по чтению.

## 0. Находки перепроверки (новое к AUDIT или уточнение)

- **F1. Автораскрытие 3 с** (`src/pages/HostScreen.tsx:1744-1751`). От `document.hidden` не зависит (FLOW-03), но:
  - (а) это одноразовый `setTimeout`, который отсчитывается от монтирования эффекта;
  - (б) ошибка сети уходит в `quietStale` → `console.warn` без повтора (`src/lib/navGuard.ts:91-94`);
  - (в) запасной таймер пульта на 6 с (`src/pages/AdminPage.tsx:864-873`) так же одноразовый;
  - (г) в скрытой вкладке Chrome через 5 минут включает «интенсивный» троттлинг цепочек `setTimeout`: опрос (`lib/pollLoop.ts`) идёт раз в минуту, и проектор позже узнаёт о фазе.

  Защиту от двойной записи даёт `patchSessionFrom` (`navGuard.ts:64-89`, `targetReached` + CAS по `state_rev`), она корректна.
- **F2.** В `after_question` раскрытие на фазе `question` делают только `AutoReveal` по концу таймера (`HostScreen.tsx:2078-2093`) и кнопка проектора `HostScreen.tsx:563` (в Книге скрыта, и пишет без `from`). На пульте ветки нет: `advance` (`AdminPage.tsx:384-411`) сразу листает дальше.
- **F3.** `AwardMedal` для `ny_book` проваливается в `EMOJI` (`src/components/AwardMedal.tsx:13-19`). Это используется на финале «бар» и на табло.
- **F4.** `.theme-ny_book .answers-main > .q-recall` — курсив 400 (`41-ny-book.css:318`), а `.q-text` — 700 (`41:101`). Шрифты вопроса и повтора расходятся.
- **F5.** `ScreenFx` считает «первым» пустой триггер `''`, который приходит до первого снимка (`HostScreen.tsx:126-131`, `ScreenFx.tsx:81-84`). Базой для «первого снимка» нужно брать первый **не-null** `gameState`.
- **F6.** Пульт на `round_intro` обычного раунда показывает «← НАЗАД», но `goBack` (`AdminPage.tsx:445-481`) этой фазы не знает: кнопка живая и молчит.
- **F7.** `info`: пульт умеет только «ДАЛЬШЕ» (`AdminPage.tsx:603-606`, `425-431`), листать слайды не может, хотя проектор `InfoNav` (`HostScreen.tsx:1146-1167`) умеет. На слайде «перед итогами» в `paper` пульт зовёт `finishGame`, а проектор — `startCounting`: расхождение.
- **F8.** Окно составов закрывается только локально на проекторе (`HostScreen.tsx:205-207, 313-318`). С пульта можно только опубликовать.
- **F9.** Лимита команд нет ни в коде, ни в миграциях, проверки длины имени тоже нет. `TEAM_PALETTE` — 24 цвета, дальше цвета повторяются (`lib/teamColors.ts`).
- **F10.** `RevealTrack` (`MelodyRound.tsx:77-96`) играет через собственный `createAudio()`, а не через `SharedPlayback`. Плюс `AnswerAudio` и финальная музыка выключены под `document.hidden`.
- **F11.** Сцена — `Stage fit="cover"` (`stage.tsx:62-66`), контент — `--u = min(...)` (`41:10`). На не-16:9 у них разные масштабы и разные видимые прямоугольники.
- **F12.** Шапка итоговой таблицы — `Р{n}` без названий раундов (`HostScreen.tsx:2604-2605`).
- **F13.** Декор `Scenery` перемонтируется по `key=${scene}`, то есть на каждой смене фазы. `Particles` размонтируется на `dense` (`BookScene.tsx:85-118, 129-131`).

## 1. Book Core — архитектура

### 1.1 Геометрия: выбранный подход

- **A (выбран).** Две сцены. Стол и атмосфера — `cover` (заполняют экран). Книга, её декор и fx-слой — новый режим `Stage fit="contain"`, где масштаб = `min(w/1920, h/1080)` = `--u`. Книга всегда видна целиком, её поля совпадают с полями контента, расчёт обрезки не нужен.
- **B (отклонён).** Оставить `cover` и пересчитывать безопасную область из `--cx0/--cy0` (как `.h-tvbody`). Это дублирует математику в CSS и всё равно режет уголки и гирлянду.

Правка `stage.tsx`: добавить `fit: 'contain'`, только аддитивно. `ny_home` продолжает передавать `cover`.

### 1.2 Слои (логически) → файлы

| слой | что | файлы |
|---|---|---|
| Book Core | геометрия, токены, общие рецепты, безопасная область | `src/ny/book/geometry.ts` (новый, чистый), `40a-ny-book-core.css` (новый) |
| Screen Layout | раскладки экранов на развороте | `41-ny-book.css` (переписывается поблочно) |
| Game Components | Книжные вставки в общую разметку | `BookLobby.tsx`, `Vinyl.tsx`, правки JSX в `HostScreen.tsx`, `MelodyRound.tsx` (только классы и ветки по теме) |
| Decoration | стол, обложка, страницы, ели, венки, гирлянда, снег | `BookTable.tsx`, `BookPages.tsx`, `BookDecor.tsx`, `assets.ts`, `public/ny-book/*` |
| Motion | детектор событий, перелистывание, глава, раскрытие | `motion.ts` (чистый + хук), `PageTurn.tsx`, `41b-ny-book-motion.css` (новый) |

Как разрезать `src/ny/book/BookScene.tsx`:
- `BookScene.tsx` остаётся тонким: `BookWorld` (композиция) и `BookFx`. Он же реэкспортирует `PageTurn`, `Pennants` (legacy), `QrCard`, `Rosette` — их импортируют `src/components/Timer.tsx:8` и `src/labs/newyear/concepts/popup/Popup.tsx:4`. Иначе ломаются `tsc` и `lab.test.ts`.
- `Rosette` → `src/ny/book/Rosette.tsx`, контракт `NyTimer` прежний.
- `NyScene.tsx`: для `ny_book` в `NyBackdrop` два `Stage`: `cover` (`BookTable` + `Atmosphere`) и `contain` (`BookPages` + `BookDecor` + снег + `NY_SLOT_BG`). `NyFx` для `ny_book` — `contain`. Число детей `ThemeLayer` не меняется (комментарий в `HostScreen.tsx:134-136`).
- `Particles` всегда смонтирован. Интенсивность задаётся пропсом `density` → число частиц и непрозрачность без пересоздания. `Scenery` больше не получает `key` по фазе: состав декора по плотности меняется переходом `opacity/transform`, а подъём `p-up` играется только по событию «глава» (§3).

### 1.3 CSS: порядок и токены

`src/styles/global.css`:
- `@import './parts/40a-ny-book-core.css';` — сразу после строки 65 (`40-ny-book-world.css`);
- `@import './parts/41b-ny-book-motion.css';` — сразу после строки 67 (`41-ny-book.css`).

Остальные импорты не переставлять.

Токены (один блок `.theme-ny_book` в 40a):
- палитра: `--bk-paper`, `--bk-paper-2`, `--bk-ink`, `--bk-muted`, `--bk-red`, `--bk-gold`, `--bk-gold-2`, `--bk-silver`, `--bk-bronze`, `--bk-pine`, `--bk-shade`, `--bk-shadow`;
- шрифты: `--bk-serif` (текст, единственный шрифт вопросов, ответов и повторов), `--bk-display` (только заголовки);
- геометрия: `--bk-safe-t`, `--bk-safe-x`, `--bk-safe-b` (из `geometry.ts`, в `--u`), `--bk-gap`, `--bk-radius`;
- движение: `--bk-turn-ms`, `--bk-reveal-ms`.

Старые `--nb-*` и `--p-*` остаются алиасами (`--nb-card: var(--bk-paper)`), переезд идёт поэкранно.

Рецепты — **списками селекторов**, без новых классов в общем JSX:
- `.theme-ny_book :is(.qnum, .q-frame, .rule-item, …) { /* bk-card */ }` — список из AUDIT §2;
- рецепты `bk-ribbon`, `bk-tab`, `bk-tile`, `bk-frame`, `bk-title`, `bk-photo`, `bk-stamp` (`.answered-chip`), `bk-chip` (`.at-team`, `.team-answer`, `.an-teams` rows).

Новые классы в JSX только **добавляются** (например, `answer-media is-own|is-recall`), не переименовываются.

### 1.4 Что нельзя сломать (обязательные проверки при каждом блоке)

- **Вес селектора важнее файла.** Перед каждым override сверить `getComputedStyle` на стенде. В 41 уже есть веса (0,3,0)–(0,4,0) с `!important` (AUDIT §3.3). Рецепт для `.bz-block` — не ниже (0,2,1) с `!important`.
- **`15-projector-interactive.css:19`.** Позиционированный декор внутри `.host-screen` — только через `::before/::after` самого экрана или с добавлением класса в `:not()`-список. Новые fixed-узлы (`.answered-chip`-подобные) живут вне `.grid-bg`.
- **reduced-motion.** В `41b` каждый «гаситель» копирует селектор анимации дословно (с `:not()` и классами состояния), той же специфичности, плюс `!important`. Проверка — Playwright `emulateMedia({reducedMotion:'reduce'})` + `getComputedStyle(el).animationName === 'none'`.
- **Ширины.** Внутри `.host-screen` — `%` и `--u`, не `vw`. Никаких `clamp(..., Npx)` с потолком в px на новых правилах.
- **`useFitText` декор не мерит**: никаких псевдоэлементов и свечений внутри `.q-text`/`.q-word`, подложка — на родителе (`div:has(> .q-text)::before`, как сейчас `41:345`).
- **Порталы `.jp-overlay/.mel-overlay`** несут класс темы сами: селектор `.theme-ny_book.mel-overlay …`, не потомковый.
- **`.theme-ny_book:not(.ny-nav) .host-actions{display:none}`** (`41:37`) остаётся для всех режимов, включая `paper`. `ThemeLayer` в `paper` для Книги `.ny-nav` не ставит — так и оставить.
- **`:has()` на корне** (`40:100`, `41:341`) держать минимальными: при переписке раскладки вопроса `41:341-351` ломается первым — переписать на класс `.no-media` уровня экрана, если он есть в JSX. Иначе оставить `:has` на ближайшем родителе.
- **`docs/` не трогать.** `src/version.ts` и `VERSION` в `public/sw.js` бампать синхронно. `HANDOFF.md` — в каждом коммите.

## 2. Компоненты и экраны

### 2.1 Переиспользуем без изменений

`Stage` (+`contain`), `NySlot`/`NY_SLOT_BG`/`NY_SLOT_FX`, `nyDensity`/`isPlainQuestion`, `Atmosphere`, `Particles`, `useFitText`, `FitImg`, `FitAnswer`, `lenClass`, `mediaScaleVar`, `RulesFrame`, `TileCard`, `FinMedal` (перекраска токенами), `QuestionScreen` (экспорт), `Timer`→`Rosette`, `SharedPlayback`, `rankTeams`, `computeTotals`/`computeRoundScores` (только чтение), `navFrom`/`patchSessionFrom`.

### 2.2 Создаём (публичные контракты)

```ts
// src/ny/book/geometry.ts — чистый, тесты
export const BOOK: { x: number; y: number; w: number; h: number }          // 64/50/1792/990 (сцена)
export const PAGE_L: Rect; export const PAGE_R: Rect; export const SAFE: { t: number; x: number; b: number }
export type LobbyMode = 'invite' | 'cards' | 'list' | 'cols2' | 'cols3' | 'chips'
export function lobbyLayout(n: number): { mode: LobbyMode; cols: number; perCol: number; fontU: number; hidden: number }
//  0 → invite; 1–4 → cards; 5–8 → list; 9–16 → cols2; 17–24 → cols3; 25–48 → chips (4 кол.); >48 → chips + hidden=n-47 (чип «+N»)

// src/ny/book/motion.ts — чистое ядро + хук
export type BookSnap = Pick<GameState, 'game_id' | 'pack_id' | 'phase' | 'round_number' | 'question_index' | 'reveal'>
export type BookEvent =
  | { kind: 'none' } | { kind: 'turn'; key: string } | { kind: 'chapter'; key: string; round: number }
  | { kind: 'reveal'; key: string } | { kind: 'finale'; key: string }
export function bookMotionEvent(prev: BookSnap | null, next: BookSnap, ctx: { sincePrevMs: number; wasHidden: boolean }): BookEvent
export function useBookMotion(gs: GameState | null): { event: BookEvent; seq: number; isLive(key: string): boolean }

// src/ny/book/PageTurn.tsx
export function PageTurn(p: { event: BookEvent; seq: number; reduced: boolean; chapterTitle?: string }): JSX.Element | null

// src/ny/book/BookLobby.tsx
export function TeamsOnPage(p: { teams: NyTeam[] }): JSX.Element          // раскладка из lobbyLayout
export function BookInvite(p: { paper: boolean; hasTeams: boolean }): JSX.Element
export function QrCard(p: { lit?: boolean; children: ReactNode }): JSX.Element   // перенос, тот же контракт

// src/ny/book/Vinyl.tsx
export function Vinyl(p: { spinning: boolean; done?: boolean; label?: string }): JSX.Element

// src/lib/playbackActive.ts (общий, не только Книга)
export function usePlaybackActive(): { active: boolean; bind(h: SharedPlayback): () => void }

// src/lib/autoReveal.ts — см. §4
export function autoRevealKey(gs: Pick<GameState, 'game_id' | 'phase' | 'round_number' | 'question_index' | 'reveal'>): string | null
export function autoRevealDue(seenAt: number, nowMs: number, delayMs: number): boolean
export function useAutoReveal(gs: GameState | null, opts: { delayMs: number; enabled?: boolean }): void

// src/ny/book/assets.ts
export interface BookAsset { id: string; src: string; w: number; h: number; anchor: [number, number]; lamps?: [number, number][] }
export const BOOK_ASSETS: Readonly<Record<string, BookAsset>>
export function prefetchBookAssets(base: string): Promise<void>

// src/ny/book/copy.ts
export const BOOK_FINALE_TITLE: readonly string[]       // выбранный вариант, см. §8 В5
```

Правка `sharedAudio.ts`: `type Ev = 'playing' | 'ended' | 'loadedmetadata' | 'pause' | 'waiting'` — только расширение подписки, логика вытеснения не трогается. `AwardMedal`: ветка `ny_book` → `FinMedal`.

### 2.3 Экраны ↔ фазы ↔ статус ↔ блок этапа 4

| фаза / условие | компонент | сейчас | блок |
|---|---|---|---|
| lobby (нет pack) | `HostInner` 252-301 | ЧАСТ | Б2 |
| lobby | `NyLobby` → `TeamsOnPage` + `QrCard` + `BookInvite` | старый облик | Б2 |
| lobby + составы | `GroupsModal` | НОВ | Б2 |
| intro | `IntroScreen` | киберпанк, **не менять**; переход в Книгу — «глава 1» | Б9 |
| info | `InfoSlideView` | НОВ | Б8 |
| round_intro | `HostScreen` 367-447 (+`CrosswordView`) | НОВ → «новая глава» | Б8/Б9 |
| question (std…crossword) | `QuestionScreen` | НОВ, подложки и 0–4 картинки — переделать | Б3 |
| question + reveal (after_question) | `QuestionScreen` 259-283 | ЧАСТ (`<img>`, 26vh) | Б4 |
| question sprint | `SprintRound` | СТАР | Б8 |
| question blitz / jeopardy / four_pics / anagram | свои | НОВ | Б8 |
| question race | `RaceRound` | вне контура | — |
| question melody | `MelodyRound` доска и окно | НОВ, пластинка — новая | Б5 |
| recap | `RecapSlides` | ЧАСТ | Б4 |
| answer_time | `AnswerTime` | НОВ | Б4 |
| show_answers !reveal (A) | `QuestionScreen quiet` + `.answered-chip` | ЧАСТ (неоновый чип) | Б4 |
| show_answers reveal (B/C) | `ShowAnswers` 1861-1996 | НОВ, раскрытие — переделать | Б4 |
| scoreboard | `ScoreboardScreen` | ЧАСТ (+F3) | Б6 |
| break / counting | `BreakScreen` / `CountingScreen` | СТАР | Б8 |
| finale (кино) | `FinalCinematic` | **не менять**; выход — «глава последняя» | Б9 |
| finale «шоу» / «бар» / таблица | `Finale` 2440-2732 | ЧАСТ (+F3, F12) | Б6 |

## 3. Анимационный контракт

Общее правило: анимация зависит только от `BookEvent` (смена ключа), никогда не от рендера. Снимок опроса каждые 2 с даёт `kind:'none'`. Анимации ничего не пишут в игру и не задерживают таймеры: `Timer`, `QuestionAudio`, `AutoAdvance` от них не зависят.

**Детектор** (`bookMotionEvent`):
- `prev === null` (первый не-null снимок: загрузка, перезагрузка, смена комнаты/`game_id`/`pack_id`) → `none`;
- `ctx.wasHidden` или `sincePrevMs > 6000` (вкладка спала, реконнект после бэкоффа) → `none`: экран встаёт в конечный кадр.

| событие | условие (prev→next) | анимация | ключ | защита | длит. |
|---|---|---|---|---|---|
| смена вопроса | `phase` question→question, тот же раунд, `qi` ≠; или round_intro→question | перелистывание листа (`PageTurn kind=page`) в `ny-layer-fx`, `pointer-events:none` | `turn:${round}:${qi}` | новый `seq` перемонтирует лист (`key={seq}`), предыдущий обрывается; один лист в DOM; снятие по `animationend`, страховка = `animationstart` + computed duration | 0.9 с (`--bk-turn-ms`, диапазон 0.7–1.1) |
| разбор: следующий вопрос | show_answers→show_answers, `qi` ≠ | то же перелистывание | `turn:a:${round}:${qi}` | то же | 0.9 с |
| новая глава | `round_number` ≠ и next.phase ∈ {round_intro, info перед раундом} | разворот с печатью «Глава N» + подъём декора `p-up` | `chapter:${round}` | повтор того же ключа — `none` | 1.4 с |
| финал | phase → finale (после кино) | «Глава последняя» | `finale:${game_id}` | один раз за игру | 1.4 с |
| раскрытие ответа | тот же `round/qi`, `reveal` false→true | развёртывание карточки ответа (rotateX от сгиба 90°→0) + перестройка (`q-recall` уезжает вверх `transform`) + золотой акцент (вспышка `--bk-gold` по рамке) | `reveal:${round}:${qi}` | класс `.bk-live` ставится, только если `isLive(key)`; иначе (перезагрузка уже на reveal) карточка в конечном кадре и `StagedChoices` получает `instant` | 0.8 с + каскад как сейчас |
| прочие смены фазы | всё остальное | мягкий fade 250 мс (без листа) | `phase:${phase}` | — | 0.25 с |
| recap (слайды локальные) | смена `i` в `RecapSlides` | лёгкое перелистывание 0.7 с, ключ `q.id` | `key={q.id}` уже есть | reduced → fade | 0.7 с |
| мелодия: плитка | `m.key` выбран (spinning→listen) | плитка «отрывается» (scale + тень) | `m.key` | от стадии, не от тика 200 мс | 0.4 с |
| мелодия: активный трек | `m.stage` ∈ listen/snippet/passed/reveal | подсветка закладки и плитки | `m.key+stage` | — | — |
| пластинка | `usePlaybackActive().active` | вращение `.bk-vinyl.is-spin` (CSS infinite) | факт `playing` | `pause`/`waiting`/`ended`/`stop()` → стоп; `AbortError` — не ошибка, просто стоп | — |
| трек сыгран | `played` содержит key | плитка «перевёрнута/подшита» (`TileCard done`) | `played` | только класс | 0.4 с |
| постоянные | `data-ny-density` | снег/искры/гирлянды: sparse = максимум (лобби), medium, dense = минимум | плотность | без перемонтажа (§1.2) | — |
| портал окна мелодии | монтирование портала | `p-grow` один раз | — | не вешать на смену стадии | 0.4 с |

**Реализация хука:** `useRef<{snap, at, hiddenSince}>`, `visibilitychange` отмечает `wasHidden`. `event`/`seq` в `useState`, сравнение по ключу внутри `useEffect([gs?.phase, gs?.round_number, gs?.question_index, gs?.reveal, gs?.game_id])`. Хук вызывается один раз в `Host()` (`HostScreen.tsx` рядом с `fxTrigger`, до любых ранних `return`), результат идёт в `ThemeLayer` → `NyFx` (лист) и через контекст `BookMotionCtx` → `ShowAnswers`/`QuestionScreen` (`isLive`).

**reduced-motion:** перелистывание → кроссфейд 150 мс; раскрытие → появление без поворота; пластинка статична; снег — один кадр (как `Atmosphere`). Все гасители — в `41b`, с весом копии селектора.

## 4. Раскрытие A/B/C и надёжное автораскрытие

### 4.1 Этапы на существующих состояниях

- **A** = `show_answers && !reveal`: `QuestionScreen quiet` — тот же DOM, что на вопросе, поэтому шрифты идентичны. `.answered-chip` → рецепт `bk-stamp` (бумажный штамп внизу слева, вне `.grid-bg`, как сейчас; в `paper` чипа нет).
- **B** = переход `reveal` false→true: анимация из §3. Запуск: автотаймер или кнопка.
- **C** = `reveal && checked`: пояснение `answer_note` и вердикты (как сейчас, `revealDoneMs+600` — логику не трогать).

Правки JSX `ShowAnswers` (`HostScreen.tsx:1782-1788`, `1898-1990`):
1. Две переменные вместо одной `revealImgs`: `ownImgs = answerImgs`, `recallImgs = questionImgs`.
2. Если `ownImgs.length` — рендер `.q-media-grid.answer-media.is-own` (`FitImg`) рядом с ответом, а картинки вопроса уходят в `.answer-gallery.is-recall` (компактный ряд высотой `--bk-gallery-h`, `FitImg`).
3. Если своих нет — картинки вопроса остаются как сейчас (`is-recall`) и пустой контейнер не рендерится вовсе.

Для других тем классы новые и без правил, внешний вид прежний: сверить скриншотами classic/potter/new_year/ny_home. В `QuestionScreen.tsx:259-283` (`after_question`) `<img maxHeight:26vh>` → тот же `.answer-media.is-own` с `FitImg`.

Шрифт повтора: `41:318` убрать `font-style: italic; font-weight: 400` → `var(--bk-serif)` 700, цвет `--bk-muted` допустим. Это делает «вопрос = повтор». Декоративный шрифт — только в `.neon-title`, `.round-title`, `.fin-…` заголовках.

### 4.2 Автораскрытие 3 с — `src/lib/autoReveal.ts`

- `autoRevealKey(gs)` = `${game_id}|${round_number}|${question_index}` при `phase==='show_answers' && !reveal`, иначе `null`.
- Модульная `Map<key, seenAtMs>` (переживает перемонтирование компонента). Запись — при первом снимке с этим ключом. При перезагрузке вкладки отсчёт начинается заново — это допустимо: в худшем случае ещё 3 с.
- `useAutoReveal(gs, {delayMs})`:
  - проверка `tryReveal()` на (1) `setTimeout(remaining)`, (2) каждом новом снимке `gs` (опрос раз в 2 с — естественный повтор), (3) `visibilitychange`/`focus`/`pageshow`;
  - флаг «в полёте» (`useRef`) — без параллельных записей;
  - `revealAnswer(navFrom(gs))`: `StaleNavError` — тихо и больше не пытаться для этого ключа; иная ошибка — снять флаг, следующий снимок попробует снова;
  - уже раскрытое состояние даёт `targetReached` → запись не идёт, повторной анимации нет (ключ события тот же).
- Подключение:
  - `ShowAnswers`: заменить эффект `1744-1751` на `useAutoReveal(gameState, {delayMs: 3000})` (хук до ранних `return` — он и сейчас до них);
  - `AnswersView` пульта: заменить `864-873` на `useAutoReveal(gameState, {delayMs: 6000})`;
  - та же схема ретрая — обёрткой `revealWithRetry` в `AutoReveal` (`HostScreen.tsx:2078-2093`).
- Логика одна на два экрана, копий нет. Без новых полей и миграций. Полностью «без вкладки» (обе вкладки заморожены) раскрыть может только сервер (`pg_cron`/функция) — это миграция; не делаем, резерв — кнопка пульта.

### 4.3 Кнопка «Показать ответ» в админке

- `show_answers`: есть (`AdminPage.tsx:930-936`), идемпотентна через `navGuard`. Оставить.
- **Добавить** на фазе `question` для `revealMode==='after_question'` (не jeopardy/anagram): «ПОКАЗАТЬ ОТВЕТ» → `revealAnswer(navFrom(gs))`, после показа — «ДАЛЬШЕ →». Формулу `revealMode` вынести из `HostScreen.tsx:546-547` в `lib/roundMeta.ts:revealModeOf(pack, round)` и использовать в обоих местах (сейчас копия дублирована и в `QuestionScreen`).
- Кнопку проектора `HostScreen.tsx:563` перевести на `revealAnswer(navFrom(gameState))`.

### 4.4 Тесты (доказательство)

`src/lib/__tests__/autoReveal.test.ts` (fake timers, фейковый `room` как в `navGuard.test.ts`; `document.hidden` выставлять явно):
1. Ровно одна запись через 3 с.
2. Новый объект `gs` каждые 2 с не сдвигает дедлайн.
3. Перемонтирование на 1.5 с сохраняет дедлайн.
4. Сетевая ошибка → повтор на следующем снимке → одна успешная запись.
5. `StaleNavError` — без повторов.
6. `reveal:true` — ноль записей.
7. Проектор (3 с) + пульт (6 с) на общем фейк-сервере → одна запись.
8. `document.hidden=true` не блокирует.
9. `visibilitychange` запускает проверку.

`src/ny/__tests__/motion.test.ts`: таблица §3 построчно, первый снимок → `none`, `sincePrevMs>6000` → `none`, 2-секундный снимок без изменений → `none`. `src/ny/__tests__/geometry.test.ts`: `lobbyLayout` для 0/1/4/5/8/9/16/17/24/25/48/60.

## 5. Управление из админки (все действия — с телефона)

| фаза | действие | на пульте | пробел / решение |
|---|---|---|---|
| нет пакета | выбрать пакет | `PackPicker` | — |
| lobby | старт игры | «▶ НАЧАТЬ ИГРУ» (155-166) | — |
| lobby | составы: показать | рандомайзер «📺 ПОКАЗАТЬ НА ЭКРАНЕ» | **закрыть/вернуть — только на проекторе (F8)** → «УБРАТЬ С ЭКРАНА» = `patchSession({random_groups: []})` (поле уже есть); вернуть — повторная публикация |
| intro | пропустить | «ДАЛЬШЕ» → `gotoRound(0)` | — (звук: см. ниже) |
| info | дальше / к финалу | «ДАЛЬШЕ» | **нет ←/→ между слайдами (F7)** → добавить «← / СЛЕД. СЛАЙД →» как в `InfoNav`; ветку «перед итогами» в `paper` → `startCounting` (выровнять с проектором) |
| round_intro обычный | начать | «ДАЛЬШЕ» | **«← НАЗАД» молчит (F6)** → подсказка `useHint` «Назад с титула — через Служебное → раунд» (или скрыть — §8 В3) |
| round_intro интерактивный | начать | «НАЧАТЬ РАУНД» | — |
| question (paper) | пустить время | «▶ ПРОЧИТАЛ» | — |
| question | дальше / назад / повтор | ряд кнопок | — |
| question after_question | показать ответ | **нет (F2)** | §4.3 |
| question sprint / blitz / jeopardy / melody / four_pics / anagram / race | пульты механик | есть | melody: «✓ ВЕРНО» серая при `!ans` (2258) → живая с подсказкой |
| recap | пропустить | «ДАЛЬШЕ» → answer_time | по слайдам — авто 5 с, без ручного; считаю достаточным |
| answer_time | к ответам / табло / подсчёт | есть | — |
| show_answers | показать ответ, оценки, след., табло/финал/подсчёт | есть (930-975) | — |
| scoreboard / break | дальше / назад | есть | — |
| counting | к итогам | `CountingPanel` | — |
| finale | сценарий, шаги, новая игра | `FinalePanel` | кино на проекторе — авто; перезагрузка проектора на финале проиграет кино ещё раз (`cinematicDone` — локальное), это в риски |
| любая | звук проектора | статус только у мелодии | **разрешение автозвука браузер даёт только по клику на самом проекторе** (`AudioGate`) — убрать это кодом нельзя. Решение: строка в чек-листе ведущего (один клик после открытия или флаг киоска `--autoplay-policy=no-user-gesture-required`); статус звука показывать на пульте не только в мелодии (общий `melody.audio` пишет лишь `MelodyRound`) — бэклог |

## 6. Этап 2 — прототипы на настоящих компонентах

### 6.1 Стенд: локальный сервер бара

Почему так: настоящий `HostScreen` + пульт + телефон, без docker, Supabase и выноса компонентов. Это лучше `e2e/bulldog/harness.tsx`: `preview` не умеет лобби, `AnswerTime`, `ShowAnswers`, `Finale`.

Файлы (новые, вне `src/`, в `vite build` не входят):

- `e2e/book/stand.mjs` — сборка `npx vite build --outDir <scratch>/book-app` без `VITE_*` (локальному режиму облако не нужно), затем `createServer({dataDir: <scratch>/book-data, appDir, pin: '000000'})` из `local-server/server.mjs`, порт 7399, `POST /api/arm`.
- `e2e/book/make-pack.mjs` — демо-пакет `ny_book` по типам `types/quiz.ts`, 8 раундов. Состав:
  - вопросы: длинный `len-xl` без картинок, 1/2/3/4 картинки разных пропорций (3:4, 16:9, 1:1, прозрачный PNG);
  - 4 картинки-варианта + текст; варианты текстом;
  - длинный вопрос + `media.answer`; `answer_note` на 400 знаков; match/order/rebus;
  - кроссворд с `grid`;
  - мелодия: 3 темы × 4 трека и 4×6; короткие mp3-тоны генерируются `ffmpeg` из `/opt/pw-browsers/ffmpeg-1011`;
  - названия раундов до 30 знаков.
- `e2e/book/media/gen.py` — Pillow: картинки с надписью пропорции, PNG с альфой.
- `e2e/book/scenes.mjs` — 15 сценариев. Каждый: `POST /api/pack/<id>` (один раз) + `POST /api/teams` (N команд, имена 5–28 знаков) + `POST /api/answers` + `PATCH /api/session` с заголовком `x-qp-pin`.
- `e2e/book/shoot.cjs` (Playwright, `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`):
  - открыть `http://127.0.0.1:7399/quiz-party/#/?room=…`, в `localStorage` положить PIN (`lib/transport/localPin.ts`);
  - `page.clock.install()` — заморозить автопереходы: 3 с автораскрытия, «шоу» финала, recap;
  - ждать `document.fonts.ready` и `animationend` (или `clock.runFor`);
  - скриншот.
- `e2e/book/measure.cjs` — JSON rect ключевых узлов: `.host-topbar`, `.qnum`, `.q-text`, `.q-img`, `.choices-grid`, `.img-answers`, `.answer-block`, `.answer-media`, `.team-answers`, `.answered-chip`, `.p-ros`, `.mel-board`, `.mel-modal`, `.bk-vinyl`, `.fin-table`, `.p-qr`, `.bk-teams`, `.host-actions`. Проверки:
  - попарные пересечения;
  - выход за `SAFE` и за viewport;
  - `scrollHeight > clientHeight` у рамок;
  - computed `font-family` у `.q-text` и `.q-recall` совпадает;
  - `animationName` при reduced.

Выход: `docs-dev/book-redesign/shots/<NN-сцена>-<w>x<h>[-reduced].webp` (WebP ≤ 300 КБ, полные PNG — в scratch) + `shots/measure.json`. В `docs/` ничего.

Вьюпорты: 1920×1080, 1899×905 (обязательно), 1366×768, 3840×2160, 1280×1024. Режимы: `online` и `paper` (флаг в `pack.settings.play_mode`). Регресс других тем: те же сцены с `theme` = classic/potter/new_year/ny_home до и после, попиксельное сравнение (`pixelmatch` или Pillow `ImageChops`).

### 6.2 15 обязательных прототипов

1. лобби (0, 4, 8, 16 команд; плюс 24 и 48 для проверки плотности; плюс `paper`);
2. правила (`round_intro`);
3. заставка кроссворда;
4–8. вопрос с 0/1/2/3/4 картинками (плюс длинный вопрос + 4 картинки; 4 картинки + варианты);
9. ожидание ответов (`answer_time`, online и paper);
10. повтор вопроса (этап A + `recap`);
11. раскрытый ответ без доп. картинки (несколько ответов команд + длинное пояснение);
12. раскрытый ответ с `media.answer` (длинный вопрос);
13. мелодия: выбор (доска, `spinning`);
14. мелодия: воспроизведение (`snippet`, пластинка `is-spin` — включать через реальный трек);
15. финальное табло (3/8/12/16 команд, ничья на 1 и на 3 месте, 8 раундов, дробные баллы).

### 6.3 Настоящие данные

Сложнейший тестовый пакет берётся **только чтением** через Supabase MCP (`select` из `packs`/`pack_rounds`/`pack_questions`). Сохраняется как снимок `e2e/book/fixtures/real-pack.json` (не коммитить, если там ответы живого пакета — положить в scratch) и загружается тем же `POST /api/pack`. Медиа — скачать в `<scratch>/book-data/media` по `mediaUrl`. Реальные пакеты не менять. Нет доступа — только демо-пакет.

### 6.4 Этап 4: порядок и объём

| блок | содержание | объём |
|---|---|---|
| Б0 | `autoReveal.ts`, кнопки пульта (§4.3, §5), `AwardMedal` ny_book, шрифт `q-recall`, `revealModeOf` | мало |
| Б1 | Book Core: `contain`-сцена, геометрия, токены, рецепты 40a, без смены контента; замер 5 вьюпортов | крупно |
| Б2 | лобби: `TeamsOnPage`/`BookInvite`/`QrCard`, маска зерна под новые координаты QR | средне |
| Б3 | вопросы 0–4 + варианты, подложки `bk-photo` | средне |
| Б4 | A/B/C, `answer_time`, `recap`, `after_question` | средне |
| Б5 | мелодия: закладки, плитки, окно, `Vinyl` + `usePlaybackActive` | средне |
| Б6 | табло и финал: заголовок, медали, таблица с названиями раундов, FLIP-пересортировка | средне |
| Б7 | ассеты: нарезка, `public/ny-book`, `assets.ts`, прогрев, SW | средне (+время на проверку альфы) |
| Б8 | остальные механики и экраны: спринт, блиц, скрэмбл, 3 попытки, своя игра, info, break/counting | средне |
| Б9 | Motion: детектор, `PageTurn`, глава, раскрытие, reduced | средне |
| Б10 | `reviewer` по всему диффу | — |

Подложки в Б3: подложка рисуется на `img`, не на `figure`: `box-shadow`-кольцо + `padding` 0 у ячейки. Для `n1` в `.q-split` и `FitAnswer` проверить, что `overflow:hidden` ячейки не режет тень. Наклон ±1.2° — только у `.q-media-grid:not(.answer-media)`. Прозрачный PNG — без белого фона и без кольца (класс `is-alpha` по признаку файла `.png`/`.webp` + `naturalWidth` проверить нельзя без загрузки → решение по умолчанию в §8 В7).

Тесты, которые затронутся:
- `density.test.ts` — если меняется плотность;
- `lab.test.ts` — реэкспорты;
- `navGuard.test.ts` — не меняется, но гонять;
- `sharedAudio.race.test.ts` и `melody.race.test.tsx` — после расширения `Ev`;
- новые: `autoReveal.test.ts`, `motion.test.ts`, `geometry.test.ts`, `playbackActive.test.ts`, `bookAssets.test.ts` (целостность `MANIFEST`, как `swBulldog`).

Счётчик 930 + 7 todo / 95 файлов вырастет. Число сверять по `npx vitest run` и править в `CLAUDE.md`/`HANDOFF.md`.

### 6.5 Ассеты: альфа без потери снега

`scripts/ny-book/cut-sheet.py` (Pillow + numpy; `pymatting` через pip, если доступен, иначе своя closed-form-лайт на numpy):
1. Модель фона — медиана по краю листа.
2. Нарезка листа — связные компоненты «не-фон» с допуском, bbox + поле 16 px.
3. Trimap на каждом ассете:
   - фон = связное с краем, близкое к фону **и** с низкой локальной дисперсией;
   - объект = далёкое от фона + всё, что не связано с краем (снег внутри кроны остаётся);
   - неизвестно = полоса 6–12 px у контура.
4. Матирование только в полосе (`estimate_alpha_cf`) + очистка цвета края (`estimate_foreground_ml`). Внутренность — α=255.
5. Снег на внешнем контуре: тень контакта (холодно-серая, 2–4 px, запечённая в ассет) — читается на пергаменте и на тёмном столе.
6. Экспорт: WebP с альфой (lossless для гирлянд и «дождика», q90 для елей), 2× размера сцены. `public/ny-book/MANIFEST.json` (id, w, h, anchor, lamps, sha).
7. Контрольный лист: каждый ассет на пергаменте, тёмно-синем, пурпурном и в шахматке. Плюс автопроверка `scripts/arena/check_layer.py`-подобная: в кольце 3 px вокруг силуэта нет пикселей α>0.5 близких к белому фону (ореол), нет α<255 в центре объекта.

Гирлянды: растровая основа (хвоя, бусы, дождик) + лампочки DOM-узлами по `lamps` из `MANIFEST` — мерцание CSS, без перерисовки растра. Если «дождик» не проходит проверку — дождик процедурный (SVG-штрихи), растр только для хвои.

Вход от ведущего — **только для ассетов, проваливших пункт 7**: исходник с альфой (PNG/PSD, если есть) либо перегенерация этого ассета на однотонном хромакее, которого нет в объекте (ели — пурпурный #FF00FF; венки и гирлянды — синий #0040FF), вырезание тогда — `scripts/arena/key_sky.py`. Куда положить листы — §8 В6.

## 7. Риски и зависимости

- **Две сцены (`cover` + `contain`).** Два `Stage`, два `ResizeObserver`, canvas `Atmosphere` один. На слабом ТВ замерить кадр (растр дешевле canvas-елей, но `filter: drop-shadow` на больших слоях дорог — тени запекать).
- **SW-кеш.** Десятки WebP в `qp-<VERSION>` перекачиваются на каждом деплое. Если набор > 5 МБ — свой кеш по sha `MANIFEST` (как `qp-bd-*`).
- **`mix-blend-mode: multiply` зерна** меняет цвет растров: зерно класть под декор переднего плана или ограничить страницами.
- **Предпросмотр редактора** (`QuestionPreview` → `ThemeLayer isProjector`) получает ту же сцену: проверить, что `contain`-сцена в маленьком окне не ломает рамку предпросмотра.
- **Порталы мелодии и «Своей игры»** живут вне `contain`-координат: их `--u` от окна совпадает с книгой (тот же `min`), это ок, но проверить на 1280×1024.
- **`page.clock`** замораживает и опрос: снимать после явного `clock.runFor(2100)` на каждый снимок состояния.
- **Перезагрузка проектора на финале** заново проигрывает кино (`cinematicDone` локально). Решение ведущего — кино не трогать; записать в `HANDOFF`, не чинить.
- **`RevealTrack` и `AnswerAudio`** — отдельные `<audio>` (F10). На ТВ-браузерах с поэлементной разблокировкой могут молчать. Пластинку на `reveal` вращать по событиям этого элемента (`play()` → `playing`), не переводя на `SharedPlayback` (поведение звука не меняем). Проверить на реальном ТВ — открытый пункт.
- **Перелистывание при быстрых кликах** обрывает лист: при < 300 мс между событиями — без листа, сразу конечный кадр.
- **Регресс других тем** через общий JSX (`answer-media is-own`, `answer-gallery`): скриншоты до/после обязательны.
- **`lab.test.ts` и `Popup.tsx`** зависят от экспортов `BookScene`. Визуальный дрейф лаборатории допустим, сборка — нет.

## 8. Вопросы (у каждого — решение по умолчанию, работа не блокируется)

- **В1. Заголовок финала.** Варианты: «Глава последняя. Наши победители» / «Конец этой сказки — наши победители» / «И жили они долго и счастливо: победители». По умолчанию первый, константа в `src/ny/book/copy.ts`; на стенде снять все три.
- **В2. Больше 16 команд.** По умолчанию `lobbyLayout`: 17–24 — три колонки, 25–48 — чипы в 4 колонки, > 48 — 47 чипов + «+N ещё». Регистрацию не ограничиваем (это контракт). Цвета после 24 повторяются — добавить номер на карточку.
- **В3. «← НАЗАД» на титуле раунда (пульт).** По умолчанию — живая кнопка с подсказкой (а не скрытие).
- **В4. Победитель раунда в «шоу» при ничьей.** `roundWinners` (`HostScreen.tsx:2493-2500`) берёт первую команду. Ранжирование не трогаем, но показ «лучший результат» по умолчанию — **все** команды с максимумом (только отображение; места финала не меняются).
- **В5. «Динамическая сортировка» таблицы финала.** По умолчанию: строки в порядке `rankTeams` на каждом снимке, при изменении баллов (коррекция ведущим) — FLIP-переезд строк 400 мс, ключ `t.id`.
- **В6. Где лежат присланные листы ёлок и венков** — в репозитории их нет. По умолчанию ведущий кладёт их в `docs-dev/book-redesign/assets-src/` (не `public/`, не `docs/`). До этого ели — временно `public/arena/spruce_set.webp` (3200×400, альфа есть) только на дальнем плане.
- **В7. Прозрачные PNG в вопросах.** Узнать альфу без декодирования нельзя. По умолчанию `FitImg` после `onLoad` рисует картинку в 8×8 canvas и ставит `data-alpha` (без сети, один раз). Подложка `bk-photo` для таких — без белого поля. Это аддитивный атрибут в общем компоненте.
- **В8. Данные живого пакета** (сверить через Supabase MCP, только `select`, до стенда):
  - есть ли раунды `answers_reveal='after_question'`;
  - сколько тем и треков в мелодиях и длина названий;
  - есть ли вопросы с 4 картинками-вариантами и с `media.answer`;
  - максимум команд в прошлых играх (`teams` по `game_id`);
  - какой пакет считать «тестовым».

  По умолчанию стенд идёт на демо-пакете §6.1, а прогон на живом снимке добавляется, когда будет доступ.

Деплой и merge — не в этом плане. Диагностика GitHub Actions — отдельная задача, с редизайном не связывается.