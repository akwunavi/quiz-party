// ═══ Доменные типы Quiz Party ═══
// Единый контракт: БД (jsonb) ↔ редактор ↔ игра.
// Опечатка в поле = красное подчёркивание здесь, а не баг на вечеринке.

// ── Пакет ──────────────────────────────────────────────
export type PackStatus = 'draft' | 'ready' | 'active' | 'played' | 'archived'
export type ThemeKey = 'classic' | 'new_year'

export interface PackSettings {
  bg_music?: string          // общая фоновая музыка вопросов
  title_music?: string       // музыка титульного экрана
  finale_music?: string      // музыка табло/финала
  timer_seconds?: number     // дефолтный таймер раундов
  max_edits?: number         // дефолт правок ответа
  answers_reveal?: AnswersReveal
}

export interface Pack {
  id: string
  name: string
  status: PackStatus
  theme: ThemeKey
  settings?: PackSettings
  created_at: string
  updated_at: string
}

// ── Раунд ──────────────────────────────────────────────
export type MechanicKey =
  | 'standard'      // Р0/Р1/Р6-вопросы
  | 'test_stop'     // Р3: стоп после первой ошибки
  | 'rebus'         // Р2: 2 картинки, правило 3+3
  | 'jeopardy'      // Р4: темы × плитки
  | 'stakes_unique' // Р5: ставки 0..5, каждая один раз
  | 'stakes_free'   // Р7: ставка 0|2 (+3 / −2, без ставки 1/0)
  | 'thematic_x2'   // Р6: угадай тему → ×2 (ручная кнопка)
  | 'crossword'     // сетка 6–10 слов
  | 'sprint'        // «120 секунд»: все вопросы на одном слайде
  | 'melody'        // «Угадай мелодию»: аукцион секунд

export type AnswersReveal = 'after_question' | 'after_round' | 'never'

export interface RoundBase {
  id: string
  pack_id: string
  position: number
  mechanic: MechanicKey
  title_lines: string[]
  rules: string[]
  rules_audio: string | null
  timer_seconds: number
  settings: MechanicSettings
  off_scoreboard: boolean
  answers_reveal: AnswersReveal
  meta_line_override: string | null
  status: 'draft' | 'ready'
}

// Настройки по механикам (дискриминируются mechanic'ом раунда)
export interface StandardSettings {
  autoAdvance?: boolean
  autoAdvanceDelayMs?: number
  useTts?: boolean
  pointsPerQuestion?: number
}
export interface TestStopSettings extends StandardSettings {
  stopOnWrong: true
}
export interface StakesSettings {
  stakesValues: number[]        // unique: [0,1,2,3,4,5] · free: [0,2]
}
export interface JeopardySettings {
  themes: JeopardyTheme[]
}
export interface JeopardyTheme {
  name: string
  tiles: { value: number; audio: string; correct: string }[]
}
export interface CrosswordSettings {
  grid: CrosswordGrid | null    // null = ещё не сгенерирована
}
export interface SprintSettings {
  pointsPerQuestion?: number    // по умолчанию 2
  allCorrectBonus?: number      // по умолчанию 5
  startDelaySec?: number        // пауза перед стартом таймера (5)
  afterTimerSec?: number        // пауза перед разбором (5)
}
export interface MelodySettings {
  themes: MelodyTheme[]
  spinSec?: number              // анимация выбора (5)
  bidSec?: number               // совещание по ставке (10)
  answerSec?: number            // на ответ первой команде (30)
  passAnswerSec?: number        // на ответ второй после полного трека (10)
}
export interface MelodyTheme {
  name: string
  tracks: { audio: string; correct: string }[]
}
export type MechanicSettings =
  | StandardSettings | TestStopSettings | StakesSettings
  | JeopardySettings | CrosswordSettings | SprintSettings | MelodySettings
  | Record<string, never>

// ── Кроссворд ──────────────────────────────────────────
export interface CrosswordWordPlacement {
  word: string                  // нормализованное (верхний регистр, е)
  clue: string
  number: number                // классическая нумерация
  dir: 'across' | 'down'
  row: number
  col: number
}
export interface CrosswordGrid {
  rows: number
  cols: number
  words: CrosswordWordPlacement[]
}

// ── Вопрос ─────────────────────────────────────────────
export interface QuestionMedia {
  question?: string[]           // до 4 файлов (Storage-пути)
  voice?: string | null         // озвучка mp3
  answer?: string[]             // медиа при показе ответа
  hidden?: boolean              // видео-как-аудио
}

export type AnswerSpec =
  | FreeTextAnswer | ChoiceAnswer | OrderAnswer
  | MatchAnswer | CrosswordAnswer | ManualAnswer

export interface FreeTextAnswer {
  mode: 'free_text'
  correct: string               // варианты через " / "
  display: string | string[]
}
export interface ChoiceOption { key: string; text: string }
export interface ChoiceAnswer {
  mode: 'choice'
  choices: ChoiceOption[]
  correct_choice: string
  display: string
}
export interface OrderAnswer {
  mode: 'order'
  choices: ChoiceOption[]
  correct_order: string         // "ГБАВ"
  display: string[]
}
export interface MatchAnswer {
  mode: 'match'
  left: string[]
  right: string[]
  right_labels?: string[]      // подписи вариантов для экрана вопроса
  correct_pairs: string[]       // ["1А","2В",...]
  display: string | string[]
}
export interface CrosswordAnswer {
  mode: 'crossword_word'
  word: string                  // проверка по буквам, регистр/ё не важны
}
export interface ManualAnswer {
  mode: 'none'
  display: string
}

export interface Question {
  id: string
  round_id: string
  position: number
  question_text: string
  media: QuestionMedia
  answer: AnswerSpec
  answer_note: string | null
  service: { word1?: string; word2?: string; note?: string }
  is_final_question: boolean
  status: 'draft' | 'ready'
  hidden: boolean
}

// ── Игра ───────────────────────────────────────────────
export interface MelodyState {
  key?: string                  // '0-1' — тема-трек
  stage?: 'idle' | 'spinning' | 'listen' | 'bidding' | 'bids' | 'snippet'
    | 'answering' | 'passed' | 'done'
  order?: string[]              // очередь команд по ставкам (id)
  turn?: number                 // индекс текущей команды в order
  deadline?: string             // ISO: когда стадия истекает (общий для всех экранов)
  snippetSec?: number           // сколько секунд играть интервал (ставка победителя)
  played?: string[]             // отыгранные треки
  chooser?: string              // team_id, кто выбирает следующий трек
  pick?: string                 // ключ трека, выбранный командой на телефоне
}

export interface GameState {
  id: 1
  melody?: MelodyState
  game_id: string
  pack_id: string | null
  phase: string
  round_number: number
  question_index: number
  timer_started_at: string | null
  reveal: boolean
  completed_rounds: number[]
  updated_at: string
}

export interface Team {
  id: string
  name: string
  color: string
  game_id: string | null
  last_seen_at: string | null
}

export interface Answer {
  id: string
  team_id: string
  game_id: string
  question_ref: string          // 'q-<uuid>'
  round_number: number
  answer_text: string
  stake: number | null
  is_correct: boolean | null    // null = не проверен; финальное слово админа
  updated_at: string
}
