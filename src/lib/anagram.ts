// ═══ «СКРЭМБЛ» (механика `anagram`): чистая логика без сети и React ═══
//
// Буквы фразы-ответа перемешаны на плитках; команды собирают фразу обратно.
// Здесь — всё, что должно считаться ОДИНАКОВО на проекторе, пульте,
// телефоне, в подсчёте и в редакторе: шаблон клеток, перемешивание,
// подсказки по времени, доска игрока, проверка ответа и победитель гонки.
// Разбор решений — HANDOFF §3ca.
//
// Не путать с lib/scramble.ts — там декоративный «взлом» заголовка; свой
// ГПСЧ здесь продублирован намеренно (4 строки), чтобы механика не зависела
// от декоративного модуля.
import type { Answer } from '../types/quiz'
import { normalize } from './answerCheck'

// ── ГПСЧ и сид ─────────────────────────────────────────

/** mulberry32 — тот же генератор, что в lib/scramble.ts (копия). */
export function rng(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** FNV-1a → uint32. Сид из строки (id вопроса, фраза). */
export function hashStr(s: string): number {
  let h = 0x811c9dc5
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

function shuffleInPlace<T>(arr: T[], rand: () => number): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    const t = arr[i]; arr[i] = arr[j]; arr[j] = t
  }
  return arr
}

// ── Шаблон фразы ───────────────────────────────────────

export type AnagramCell = { kind: 'letter'; idx: number } | { kind: 'fixed'; ch: string }
export interface AnagramTemplate {
  /** буквы фразы по порядку, верхний регистр; Ё остаётся Ё */
  letters: string[]
  /** слова (граница — пробелы), в каждом — клетки-буквы и знаки на месте */
  words: AnagramCell[][]
}

const LETTER = /^[A-Za-zА-Яа-яЁё]$/

/** Буква = латиница/кириллица (включая Ё). Цифры, дефис, апостроф, знаки
 *  — `fixed`: показываются на своём месте и не перемешиваются. */
export function anagramTemplate(phrase: string): AnagramTemplate {
  const letters: string[] = []
  const words: AnagramCell[][] = []
  for (const w of String(phrase ?? '').split(/\s+/).filter(Boolean)) {
    const cells: AnagramCell[] = []
    for (const ch of w) {
      if (LETTER.test(ch)) {
        cells.push({ kind: 'letter', idx: letters.length })
        letters.push(ch.toUpperCase())
      } else {
        cells.push({ kind: 'fixed', ch })
      }
    }
    words.push(cells)
  }
  return { letters, words }
}

// ── Перемешивание ──────────────────────────────────────

/** Буквы на плитках слева направо. */
export function anagramTiles(letters: string[], order: number[]): string[] {
  return order.map(i => letters[i] ?? '')
}

function isPermutation(order: unknown, n: number): order is number[] {
  if (!Array.isArray(order) || order.length !== n) return false
  const seen = new Set<number>()
  for (const x of order) {
    if (!Number.isInteger(x) || x < 0 || x >= n || seen.has(x)) return false
    seen.add(x)
  }
  return true
}

/** Перемешивание годится для игры: это перестановка нужной длины, строка
 *  плиток отличается от исходной и первая буква фразы не стоит первой.
 *  Сравнение — ПО СИМВОЛАМ, не по индексам: у «ААБ» обмен двух А не
 *  меняет ничего. */
export function anagramOrderValid(order: number[], letters: string[]): boolean {
  const n = letters.length
  if (n < 2 || !isPermutation(order, n)) return false
  const tiles = anagramTiles(letters, order)
  if (tiles.join('') === letters.join('')) return false
  return tiles[0] !== letters[0]
}

/** Фишер–Йетс на mulberry32, до 200 попыток, пока не валидно. Если
 *  валидное недостижимо (одна буква, все одинаковые) — последняя попытка;
 *  решает редактор/валидатор. */
export function anagramShuffle(letters: string[], seed: number): number[] {
  const n = letters.length
  const rand = rng(seed)
  let order = Array.from({ length: n }, (_, i) => i)
  for (let attempt = 0; attempt < 200; attempt++) {
    order = shuffleInPlace(Array.from({ length: n }, (_, i) => i), rand)
    if (anagramOrderValid(order, letters)) return order
  }
  return order
}

// ── Подсказки ──────────────────────────────────────────

/** Порядок, в котором открываются буквы-подсказки: перестановка индексов
 *  1..n-1. Первая буква фразы (0) не подсказывается никогда. */
export function anagramHintOrder(letters: string[], seed: number): number[] {
  const idx = Array.from({ length: Math.max(0, letters.length - 1) }, (_, i) => i + 1)
  return shuffleInPlace(idx, rng(seed ^ 0x9e3779b9))
}

/** Как минимум две буквы остаются закрытыми. */
export function anagramMaxHints(n: number): number {
  return Math.max(0, n - 2)
}

/** Сколько подсказок открыто к моменту `nowMs`. Считается одинаково на
 *  всех экранах от общего старта таймера. Подсказка открывается СТРОГО ДО
 *  конца таймера: при 30 с / 10 с — максимум 2, а не 3 (третья пришлась бы
 *  ровно на момент автопоказа ответа и полетела бы одновременно с ним —
 *  ревью 9.74, HANDOFF §3ca). После конца таймера число замирает. */
export function anagramHintsOpen(p: {
  nowMs: number
  startedAtIso: string | null | undefined
  intervalSec: number
  timerSec: number
  maxHints: number
}): number {
  if (!p.startedAtIso || !(p.intervalSec > 0)) return 0
  const start = Date.parse(p.startedAtIso)
  if (!Number.isFinite(start)) return 0
  const elapsed = Math.max(0, p.nowMs - start)
  const beforeEnd = Math.max(0, Math.ceil(Math.max(0, p.timerSec) / p.intervalSec) - 1)
  return Math.max(0, Math.min(p.maxHints, beforeEnd, Math.floor(elapsed / (p.intervalSec * 1000))))
}

/** Плитка, которая на проекторе «уходит» в клетку-подсказку `letterIdx`. */
export function anagramHintTile(order: number[], letterIdx: number): number {
  return order.indexOf(letterIdx)
}

// ── Доска игрока ───────────────────────────────────────

/** cells[i] — номер плитки в клетке буквы i или null. */
export interface AnagramBoardState { cells: (number | null)[] }

export function emptyBoard(n: number): AnagramBoardState {
  return { cells: Array.from({ length: n }, () => null) }
}

type Hinted = ReadonlySet<number> | readonly number[]
const hasHint = (h: Hinted, i: number) =>
  Array.isArray(h) ? (h as readonly number[]).includes(i) : (h as ReadonlySet<number>).has(i)

/** Тап по плитке: в первую пустую НЕ-подсказочную клетку. Плитку, уже
 *  стоящую на доске, второй раз не ставим. */
export function placeTile(board: AnagramBoardState, p: number, template: AnagramTemplate,
  hinted: Hinted): AnagramBoardState {
  if (board.cells.includes(p)) return board
  const n = template.letters.length
  for (let i = 0; i < n; i++) {
    if (board.cells[i] == null && !hasHint(hinted, i)) {
      const cells = board.cells.slice()
      cells[i] = p
      return { cells }
    }
  }
  return board
}

/** Тап по заполненной клетке: плитка возвращается в пул, остальные клетки
 *  не сдвигаются. Клетку-подсказку не трогаем. */
export function clearCell(board: AnagramBoardState, letterIdx: number, hinted: Hinted): AnagramBoardState {
  if (hasHint(hinted, letterIdx) || board.cells[letterIdx] == null) return board
  const cells = board.cells.slice()
  cells[letterIdx] = null
  return { cells }
}

/** «Стереть»: все клетки, кроме подсказок. */
export function clearBoard(board: AnagramBoardState, hinted: Hinted): AnagramBoardState {
  return { cells: board.cells.map((c, i) => (hasHint(hinted, i) ? c : null)) }
}

/** Вставить открытые подсказки в доску игрока. Для каждой hint-буквы i:
 *  если в клетке уже плитка с нужным символом — оставить; иначе чужая
 *  плитка уходит в пул, а в клетку ставится свободная плитка с этим
 *  символом (предпочтительно «родная» anagramHintTile), а если свободной
 *  нет — забирается из другой клетки (та освобождается). Идемпотентна. */
export function applyHints(board: AnagramBoardState, letters: string[], order: number[],
  hintedIdxs: readonly number[]): AnagramBoardState {
  const n = letters.length
  const cells = Array.from({ length: n }, (_, i) => board.cells[i] ?? null)
  const hintSet = new Set(hintedIdxs)
  const ch = (p: number) => letters[order[p]]
  let changed = cells.length !== board.cells.length
  for (const i of hintedIdxs) {
    if (i < 0 || i >= n) continue
    const want = letters[i]
    const cur = cells[i]
    if (cur != null && ch(cur) === want) continue
    if (cur != null) cells[i] = null
    const onBoard = new Set(cells.filter((c): c is number => c != null))
    let pick = -1
    const home = anagramHintTile(order, i)
    if (home >= 0 && !onBoard.has(home)) pick = home
    if (pick < 0) {
      for (let p = 0; p < order.length; p++) {
        if (!onBoard.has(p) && ch(p) === want) { pick = p; break }
      }
    }
    if (pick < 0) {
      // Свободной нет — забрать из клетки, где эта плитка не нужна:
      // обычная клетка или подсказка, ждущая ДРУГОЙ символ.
      for (let j = 0; j < n; j++) {
        const t = cells[j]
        if (j === i || t == null || ch(t) !== want) continue
        if (hintSet.has(j) && letters[j] === want) continue
        pick = t; cells[j] = null; break
      }
    }
    if (pick >= 0) cells[i] = pick
    changed = true
  }
  return changed ? { cells } : board
}

/** Текст ответа с доски: слова через пробел, знаки на своих местах,
 *  пустая клетка — пусто. */
export function boardText(board: AnagramBoardState, template: AnagramTemplate,
  letters: string[], order: number[]): string {
  return template.words.map(w => w.map(c => {
    if (c.kind === 'fixed') return c.ch
    const p = board.cells[c.idx]
    return p == null ? '' : (letters[order[p]] ?? '')
  }).join('')).join(' ')
}

export function boardComplete(board: AnagramBoardState, template: AnagramTemplate): boolean {
  return template.letters.every((_, i) => board.cells[i] != null)
}

// ── Проверка ответа ────────────────────────────────────

/** Точная проверка после normalize (ё=е, регистр, знаки и дефисы не
 *  важны, цифры важны). Опечатки НЕ прощаются — это анаграмма. */
export function isAnagramCorrect(input: string, phrase: string): boolean | null {
  const a = normalize(input)
  if (!a) return null
  return a === normalize(phrase)
}

/** Сколько БУКВ в тексте (для учёта правок: ответ «готов», когда собраны
 *  все буквы; цифры и знаки фразы не в счёт — они стоят на месте сами). */
export function anagramLetterCount(text: string): number {
  let n = 0
  for (const ch of String(text ?? '')) if (LETTER.test(ch)) n++
  return n
}

// ── Гонка ──────────────────────────────────────────────

type RaceRow = Pick<Answer, 'team_id' | 'answer_text' | 'is_correct' | 'updated_at' | 'accepted_at'>

/** Серверный момент последней смены текста; без миграции 0015 — часы
 *  телефона (updated_at). */
export function anagramAcceptedAt(a: Pick<Answer, 'accepted_at' | 'updated_at'>): string {
  return a.accepted_at ?? a.updated_at
}

/** ISO → микросекунды (Postgres отдаёт 6 знаков дробной части, Date.parse
 *  видит только 3 — без этого две отправки в одну миллисекунду сравнивались
 *  бы как равные). NaN, если не разбирается. */
export function isoMicros(iso: string | null | undefined): number {
  if (!iso) return NaN
  const ms = Date.parse(iso)
  if (!Number.isFinite(ms)) return NaN
  const m = /\.(\d+)/.exec(iso)
  const extra = m && m[1].length > 3 ? Number((m[1].slice(3) + '000').slice(0, 3)) : 0
  return ms * 1000 + extra
}

function cmpTs(a: string | null | undefined, b: string | null | undefined): number {
  const x = isoMicros(a), y = isoMicros(b)
  const fx = Number.isFinite(x), fy = Number.isFinite(y)
  if (fx && fy) return x - y
  if (fx) return -1
  if (fy) return 1
  return 0
}

/** Победитель гонки по вопросу: среди строк с верным ответом (ручная оценка
 *  ведущего перебивает автопроверку) — самая ранняя по anagramAcceptedAt,
 *  при равенстве — по updated_at, затем по team_id. Детерминирована. */
export function anagramWinner(rows: readonly RaceRow[], phrase: string): string | null {
  const ok = rows.filter(r => (r.is_correct ?? isAnagramCorrect(r.answer_text, phrase)) === true)
  if (!ok.length) return null
  const sorted = ok.slice().sort((a, b) =>
    cmpTs(anagramAcceptedAt(a), anagramAcceptedAt(b))
    || cmpTs(a.updated_at, b.updated_at)
    || (a.team_id < b.team_id ? -1 : a.team_id > b.team_id ? 1 : 0))
  return sorted[0].team_id
}

/** `мм:сс.ммм` (00:07.482); отрицательное/NaN — «—». */
export function formatRaceTime(ms: number): string {
  if (!Number.isFinite(ms) || ms < 0) return '—'
  const total = Math.floor(ms)
  const mm = Math.floor(total / 60000)
  const ss = Math.floor((total % 60000) / 1000)
  const mmm = total % 1000
  return `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}.${String(mmm).padStart(3, '0')}`
}

/** Сколько прошло от старта вопроса до принятия ответа сервером. */
export function anagramElapsedMs(a: Pick<Answer, 'accepted_at' | 'updated_at'>,
  startIso: string | null | undefined): number {
  if (!startIso) return NaN
  return (isoMicros(anagramAcceptedAt(a)) - isoMicros(startIso)) / 1000
}

/** Старт вопроса для времени гонки: серверный `question_shown.shown_at`
 *  (0015), без него — `timer_started_at` часов ведущего (`approx: true`,
 *  в UI помечается «≈»). Одна формула для проектора и пульта. */
export function anagramStartIso(shown: ReadonlyMap<string, string>, qid: string,
  timerStartedAt: string | null | undefined): { iso: string | null; approx: boolean } {
  const s = shown.get('q-' + qid)
  if (s) return { iso: s, approx: false }
  return { iso: timerStartedAt ?? null, approx: !!timerStartedAt }
}

/** Всё для вопроса одним вызовом — чтобы экраны не собирали это по-разному. */
export function anagramQuestion(phrase: string, order: number[]) {
  const template = anagramTemplate(phrase)
  const letters = template.letters
  const ord = isPermutation(order, letters.length) ? order : letters.map((_, i) => i)
  return { template, letters, order: ord, tiles: anagramTiles(letters, ord) }
}

// ── Перелёты плиток на проекторе (план, без DOM) ───────

/** Что делать с перелётами при смене целей: `want` — плитка → клетка, куда
 *  она ДОЛЖНА сесть; `flying` — плитка → клетка текущего полёта. Полёт к
 *  той же клетке НЕ перезапускается (повторный замер посреди полёта уводил
 *  плитку мимо — ревью 9.74); полёт, цель которого исчезла или сменилась
 *  (↻ повтор, смена стадии предпросмотра), отменяется. */
export function anagramFlightPlan(want: ReadonlyMap<number, number>, landed: ReadonlySet<number>,
  flying: ReadonlyMap<number, number>): { cancel: number[]; start: number[] } {
  const cancel: number[] = []
  for (const [p, cell] of flying) if (want.get(p) !== cell) cancel.push(p)
  const start: number[] = []
  for (const [p, cell] of want) {
    if (landed.has(p)) continue
    if (flying.get(p) === cell) continue
    start.push(p)
  }
  return { cancel, start }
}

// ── Навигация ведущего (одно решение для проектора и пульта) ──

/** Сколько секунд после старта таймера «Дальше» ещё не показывает ответ:
 *  защита от двойного тапа (первый тап открыл вопрос, второй тут же
 *  показал бы ответ). */
export const ANAGRAM_REVEAL_GUARD_MS = 3000

export type AnagramStep =
  | { kind: 'reveal' }
  | { kind: 'next'; index: number }
  | { kind: 'afterRound' }
  | { kind: 'wait'; text: string }

/** «Дальше →» на вопросе «Скрэмбла»: сначала показ ответа, потом следующий
 *  вопрос, на последнем — маршрут после раунда. Общая для HostScreen и
 *  AdminPage — раньше проектор уходил дальше без показа (ревью 9.74). */
export function anagramAdvance(p: {
  reveal: boolean; timerStartedAt: string | null; index: number; count: number; nowMs: number
}): AnagramStep {
  if (!p.reveal) {
    const start = p.timerStartedAt ? Date.parse(p.timerStartedAt) : NaN
    if (!Number.isFinite(start)) return { kind: 'wait', text: 'Время по вопросу ещё не пошло — ответ показывать рано' }
    if (p.nowMs - start < ANAGRAM_REVEAL_GUARD_MS)
      return { kind: 'wait', text: 'Вопрос только что открыт — нажми ещё раз через пару секунд, чтобы показать ответ' }
    return { kind: 'reveal' }
  }
  return p.index + 1 < p.count ? { kind: 'next', index: p.index + 1 } : { kind: 'afterRound' }
}

/** «← Назад» с вопроса «Скрэмбла»: к ПОКАЗАННОМУ предыдущему вопросу (не
 *  перезапуская его вживую — gotoQuestionShown), с первого — на заставку. */
export function anagramBack(index: number): { kind: 'shown'; index: number } | { kind: 'intro' } {
  return index > 0 ? { kind: 'shown', index: index - 1 } : { kind: 'intro' }
}

// ── Черновик доски на телефоне ─────────────────────────

export interface AnagramLocal { key: string; cells: (number | null)[]; edits: number; sent: string | null }

export function anagramLocalKey(gameId: string, qid: string): string {
  // префикс qp-answers- подчищает forgetPlayerData при смене игры
  return `qp-answers-anagram-${gameId}-${qid}`
}

/** Прочитать черновик под ключом; битый/чужой длины — пустой. */
export function readAnagramLocal(get: (k: string) => string | null, key: string, n: number): AnagramLocal {
  try {
    const v = JSON.parse(get(key) ?? '') as Partial<AnagramLocal>
    if (Array.isArray(v.cells) && v.cells.length === n)
      return { key, cells: v.cells, edits: Number(v.edits) || 0, sent: v.sent ?? null }
  } catch { /* пусто */ }
  return { key, cells: Array.from({ length: n }, () => null), edits: 0, sent: null }
}

/** Записать черновик, ТОЛЬКО если он загружен под этим же ключом. Иначе
 *  на переходе вопрос N→N+1 доска (и потраченные правки) вопроса N
 *  записывалась под ключ N+1 — ревью 9.74, блокер. */
export function persistAnagramLocal(set: (k: string, v: string) => void, key: string, st: AnagramLocal): boolean {
  if (st.key !== key) return false
  set(key, JSON.stringify(st))
  return true
}

/** Вердикт на телефоне после показа ответа — из строки в базе, как в
 *  totals (`is_correct ?? точная проверка`), а не из локального «отправлено»:
 *  ведущий мог поставить ✗, ответ мог не доехать. */
export function anagramPlayerVerdict(p: {
  sent: string | null; loaded: boolean
  row: Pick<Answer, 'answer_text' | 'is_correct'> | undefined; phrase: string
}): 'ok' | 'wrong' | 'lost' | 'checking' | null {
  if (p.row && p.row.answer_text) {
    return (p.row.is_correct ?? isAnagramCorrect(p.row.answer_text, p.phrase)) === true ? 'ok' : 'wrong'
  }
  if (!p.sent) return null
  return p.loaded ? 'lost' : 'checking'
}
