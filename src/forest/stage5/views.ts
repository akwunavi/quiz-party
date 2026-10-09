// ═══ Этап 5 в игре: настоящее состояние → «вид» утверждённых экранов (чистые функции, без сети и DOM) ═══
// Ничего не считают заново: места и суммы приходят готовыми из rankTeams/computeTotals/computeRoundScores (те же
// вызовы, что у боевых табло и финала), статистика — из packStats. Здесь только раскладка и выбор, что показать.
import type { InfoSlide } from '../../types/quiz'
import type { PackStats } from '../../lib/duration'
import type { RulesLayout, RulesView } from './Rules'

/** «~2 ч 30 мин» — как formatMinutes у InfoSlideView */
export const fmtMinutes = (m: number) => (m < 60 ? `~${m} мин` : `~${Math.floor(m / 60)} ч ${m % 60 ? `${m % 60} мин` : ''}`.trim())

// ── Правила (phase 'info') ──────────────────────────────────────────────────────────────────────
export type RulesInput = {
  slide: InfoSlide
  /** сводка по раундам — как у InfoScreen (только зачётные, название, число видимых вопросов) */
  rounds: { name: string; count: number }[]
  stats: PackStats | null
  /** адрес картинки (mediaUrl) и её натуральный размер */
  image: { src: string; w: number; h: number } | null
}
/** Слайд правил → вид «Лозы правил». null — сочетание, для которого в лаборатории нет композиции
 *  (картинка вместе с раундами/статистикой, несколько картинок, картинка без пунктов): тогда остаётся прежний экран. */
export function rulesViewFrom(i: RulesInput): RulesView | null {
  const s = i.slide
  const lines = (s.body ?? '').split('\n').map(l => l.trim()).filter(Boolean)
  const imgs = s.images ?? []
  const rounds = s.show_rounds && i.rounds.length ? i.rounds.map((r, k) => ({ n: k + 1, name: r.name, count: r.count })) : null
  const st = s.show_stats && i.stats ? i.stats : null
  const stats: [string | number, string][] | null = st ? [
    [st.roundsCount, 'раундов'], [st.questionsCount, 'вопросов'],
    ...(st.hasMiniGame ? [[1, 'мини-игра'] as [number, string]] : []),
    ...(st.musicTracks > 0 ? [[st.musicTracks, 'треков'] as [number, string]] : []),
    [fmtMinutes(st.totalMinutes), 'на игру'],
  ] : null
  if (imgs.length > 1) return null
  if (imgs.length === 1 && (rounds || stats || lines.length === 0)) return null
  const photo = imgs.length === 1 && i.image ? { src: i.image.src, w: i.image.w, h: i.image.h } : null
  if (imgs.length === 1 && !photo) return null
  const layout: RulesLayout = lines.length === 0 ? 'rstats' : photo ? 'rimg' : lines.length > 5 ? 'dense' : 'rules'
  return { title: (s.title ?? '').trim() || 'ПРАВИЛА', lines, rounds, stats, note: s.note?.trim() || null, photo, layout }
}

// ── Табло (phase 'scoreboard' и итоговая таблица финала) ───────────────────────────────────────
export type BoardRow = {
  id: string; name: string; color: string; place: number; sum: number
  /** очки по показанным колонкам */
  scores: number[]
  /** табло «переезда» лаборатории: сумма до последнего раунда */
  prevSum?: number
  /** на сколько строк поднялась (+) / опустилась (−) команда; 0/нет — без значка */
  delta?: number
  /** индекс строки после прошлого раунда — откуда строка «переезжает» */
  prevIdx?: number
}
export type BoardView = { kind: string; title: string; sub: string; cols: string[]; rows: BoardRow[]; flip: boolean }

export type BoardLayout = {
  big: boolean; rh: number; gap: number; y0: number
  /** левый край ягод (в координатах строки), шаг колонки, размер ягоды */
  brLeft: number; step: number; berry: number
  /** раскладка отличается от утверждённой (много команд или колонок) — размеры задаются явно */
  custom: boolean
  nameFs: number; medFs: number; totFs: number; berryFs: number; colFs: number
}
/** Раскладка табло: до 8 команд — крупные листья, до 12 — как в лаборатории «Много команд»; дальше листья тоньше,
 *  чтобы все строки влезли до низа кадра (1060). Колонки раундов сжимаются, чтобы не наехать на сумму. */
export function boardLayout(n: number, cols: number): BoardLayout {
  const big = n <= 8
  let rh = big ? 84 : 66, gap = big ? 9 : 5
  const y0 = big ? 200 : 168
  if (n > 12) { const per = (1060 - y0) / n; gap = per >= 44 ? 4 : 3; rh = Math.floor(per - gap) }
  const brLeft = big ? 790 : 760, step0 = big ? 76 : 58, berry0 = big ? 60 : 46
  const room = 1150 - brLeft // правый край ягод — до заголовка «Σ» (его левый край — 1160 в координатах строки)
  const step = cols > 0 ? Math.min(step0, Math.floor(room / cols)) : step0
  const berry = Math.max(14, Math.min(berry0, step - Math.max(6, Math.round(step * 0.2)), rh - 8))
  const custom = n > 12 || step < step0 || berry < berry0
  return {
    big, rh, gap, y0, brLeft, step, berry, custom,
    nameFs: rh >= 60 ? 27 : Math.max(14, Math.floor(rh * 0.6)),
    medFs: Math.min(30, Math.round(rh * 0.43)),
    totFs: Math.min(44, Math.round(rh * 0.78)),
    berryFs: Math.min(big ? 32 : 26, Math.round(berry * 0.56)),
    colFs: Math.min(24, Math.max(13, Math.round(berry * 0.55))),
  }
}

/** Сколько колонок раундов показать: сыгранные до текущего включительно, но не меньше последней колонки,
 *  где у кого-то уже есть очки (иначе сумма разошлась бы с видимыми ягодами). */
export function playedCols(colRoundIdx: number[], current: number, scores: number[][]): number {
  let n = colRoundIdx.filter(i => i <= current).length
  scores.forEach(s => s.forEach((v, k) => { if (v !== 0 && k + 1 > n) n = k + 1 }))
  return Math.min(n, colRoundIdx.length)
}

export type RankLike = { team: { id: string; name: string; color: string }; place: number; total: number }
/** Строки табло из готового ранжирования (rankTeams) и очков по раундам (computeRoundScores). */
export function boardRowsFrom(rows: RankLike[], perRound: Map<string, number[]>, colRoundIdx: number[], tone: (hex: string) => string,
  prev?: { order: string[] }): BoardRow[] {
  const prevIdx = prev ? new Map(prev.order.map((id, i) => [id, i])) : null
  return rows.map((r, i) => {
    const all = perRound.get(r.team.id) ?? []
    const pi = prevIdx?.get(r.team.id)
    return {
      id: r.team.id, name: r.team.name, color: tone(r.team.color), place: r.place, sum: r.total,
      scores: colRoundIdx.map(i => all[i] ?? 0),
      // ▲/▼ — на сколько строк сдвинулась команда (номера мест плотные: при ничьих они «сжимаются», и разница
      // номеров показала бы подъём всем подряд)
      ...(prev ? { delta: pi == null ? 0 : pi - i, prevIdx: pi } : {}),
    }
  })
}

// ── Финал ─────────────────────────────────────────────────────────────────────────────────────────
export type PodiumSlot = { k: number; place: number; names: { name: string; color: string; hue: number }[]; sum: number }
/** Награждение: места 1–3, которые реально есть (плотная нумерация, ничьи — несколько команд на месте).
 *  k — позиция цветка лаборатории (0 — центр/золото, 1 — слева/серебро, 2 — справа/бронза). */
export function podiumSlots(rows: { team: { name: string; color: string }; place: number; total: number }[], tone: (hex: string) => string, hue: (hex: string) => number): PodiumSlot[] {
  const places = [...new Set(rows.map(r => r.place))].filter(p => p <= 3).sort((a, b) => a - b)
  return places.map(p => {
    const rs = rows.filter(r => r.place === p)
    return { k: p - 1, place: p, sum: rs[0]?.total ?? 0, names: rs.map(r => ({ name: r.team.name, color: tone(r.team.color), hue: hue(r.team.color) })) }
  })
}

/** Карточки «победители раундов»: в ряд до 6, больше — в два-три ряда, ширина под число в ряду. */
export function retroLayout(n: number): { x: number; y: number; w: number }[] {
  if (n <= 0) return []
  const rows = Math.ceil(n / 6), per = Math.ceil(n / rows)
  const w = Math.min(280, Math.floor((1800 - (per - 1) * 20) / per))
  const pitch = w + 20, rowH = rows === 1 ? 0 : rows === 2 ? 380 : 270
  const top0 = rows === 1 ? 400 : rows === 2 ? 240 : 200
  return Array.from({ length: n }, (_, i) => {
    const r = Math.floor(i / per), c = i % per, inRow = Math.min(per, n - r * per)
    const x0 = n === 6 ? 60 : Math.round((1920 - (inRow * pitch - 20)) / 2)
    return { x: x0 + c * pitch, y: top0 + r * rowH, w }
  })
}

// ── Переходы ──────────────────────────────────────────────────────────────────────────────────────
export type TransKind = 'vine' | 'wind' | 'fly' | 'petal' | 'mist' | 'bloom'
/** Какая вставка играет на смене фазы (те же шесть пар, что в лаборатории); null — без вставки. */
export function transKind(prev: string | null | undefined, next: string | null | undefined): TransKind | null {
  if (!prev || !next || prev === next) return null
  if (next === 'finale') return 'bloom'
  if (prev === 'lobby' && (next === 'info' || next === 'intro' || next === 'round_intro')) return 'vine'
  if (prev === 'info' && next === 'round_intro') return 'wind'
  if (prev === 'round_intro' && next === 'question') return 'fly'
  if (next === 'scoreboard') return 'petal'
  if (prev === 'scoreboard' && next === 'break') return 'mist'
  return null
}

/** «04:59» */
export const mmss = (sec: number) => `${String(Math.floor(Math.max(0, sec) / 60)).padStart(2, '0')}:${String(Math.max(0, sec) % 60).padStart(2, '0')}`
/** склонение «балл / балла / баллов» (как в лаборатории) */
export const ptsWord = (n: number) => (n % 10 === 1 && n % 100 !== 11 ? 'балл' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 'балла' : 'баллов')

/** «Время ответов»: сетка листьев команд в области 1160×800 — колонки по числу команд, высота строки и кегль под неё. */
export function answerGrid(n: number): { cols: number; rowH: number; fz: number } {
  if (n <= 0) return { cols: 1, rowH: 84, fz: 32 }
  const cols = n <= 7 ? 1 : n <= 16 ? 2 : 3
  const rows = Math.ceil(n / cols)
  const rowH = Math.min(84, Math.floor((800 - (rows - 1) * 10) / rows))
  return { cols, rowH, fz: Math.min(32, Math.max(15, Math.round(rowH * 0.42))) }
}

// ── Заставка раунда ──
/** лицо заставки: пять своих эмблем этапа 5 + три утверждённых этапа 1 */
export type IntroKind = 'crossword' | 'standard' | 'jeopardy' | 'melody' | 'anagram' | 'sprint' | 'blitz' | 'reveal'
/** механика раунда → лицо заставки (механики без своей эмблемы — как обычные вопросы) */
export function introKindOf(mechanic: string): IntroKind {
  switch (mechanic) {
    case 'crossword': return 'crossword'
    case 'jeopardy': return 'jeopardy'
    case 'melody': return 'melody'
    case 'anagram': return 'anagram'
    case 'sprint': return 'sprint'
    case 'blitz': return 'blitz'
    case 'four_pics': return 'reveal'
    default: return 'standard'
  }
}

/** Кегль заголовка: самая длинная строка на ширину колонки (как в лаборатории). */
export const introTitleSize = (lines: string[]) => Math.min(112, Math.floor(1500 / Math.max(1, ...lines.map(l => l.length))))

/** Название переносится по словам, если самая длинная строка длиннее 24 знаков (иначе одна строка мельчит до нечитаемого). */
export const introTitleWraps = (lines: string[]) => Math.max(0, ...lines.map(l => l.length)) > 24
/** Строки названия для заставки: короткие — как в редакторе; длинные — разбиты по словам примерно по 20 знаков
 *  (буквы заставки — отдельные блоки, браузер сам перенёс бы их посреди слова). */
export function introTitleLines(lines: string[], max = 20): string[] {
  if (!introTitleWraps(lines)) return lines
  const out: string[] = []
  for (const l of lines) {
    let cur = ''
    for (const w of l.split(/\s+/).filter(Boolean)) {
      if (cur && (cur + ' ' + w).length > max) { out.push(cur); cur = w } else cur = cur ? cur + ' ' + w : w
    }
    if (cur) out.push(cur)
  }
  return out
}
