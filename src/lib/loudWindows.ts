// ═══ «ГДЕ В ТРЕКЕ ЧТО-ТО ИГРАЕТ»: чистая математика без DOM и WebAudio ═══
// «Угадай мелодию» стартует отрывок со случайной точки трека. Раньше точка
// падала и в паузу/тишину/едва слышный фон — «1 секунда» проходила в тишине.
// Здесь: огибающая громкости → порог ОТНОСИТЕЛЬНО самого трека → случайный
// старт только среди «громких» участков. Декодирование аудио — в
// loudAnalysis.ts (там WebAudio), сюда приходят готовые отсчёты.
// Нет подходящего места → `null`, и вызывающий оставляет старое поведение.

/** Окно огибающей: 100 мс — короче «слога», длиннее случайного щелчка. */
export const ENV_WIN_SEC = 0.1

/** Ниже этого пика (≈ −66 дБ от полной шкалы) трек считаем беззвучным
 *  и ничего не выбираем — относительный порог на шуме дал бы мусор. */
const ABS_FLOOR = 5e-4

/** Огибающая: RMS по непересекающимся окнам `winSec` на моно-смеси.
 *  `channels` — каналы одной длины или разной (берём кратчайшую). */
export function rmsEnvelope(channels: Float32Array[], sampleRate: number,
  winSec = ENV_WIN_SEC): number[] {
  if (channels.length === 0 || !(sampleRate > 0)) return []
  const len = Math.min(...channels.map(c => c.length))
  const win = Math.max(1, Math.round(sampleRate * winSec))
  const nCh = channels.length
  const out: number[] = []
  for (let s = 0; s + win <= len; s += win) {
    let acc = 0
    for (let i = s; i < s + win; i++) {
      let v = 0
      for (let c = 0; c < nCh; c++) v += channels[c][i]
      v /= nCh
      acc += v * v
    }
    out.push(Math.sqrt(acc / win))
  }
  return out
}

function percentile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0
  return sorted[Math.min(sorted.length - 1, Math.floor(p * sorted.length))]
}

/** Порог «звучит»: 40 % от P90 громкости трека, но не меньше 15 % от P99
 *  (чтобы шумовой пол в треке с редкими вспышками не стал «музыкой»).
 *  `null` — трек беззвучный. Порог ОТНОСИТЕЛЬНЫЙ: тихая запись не отсекается. */
export function loudThreshold(env: number[]): number | null {
  if (env.length === 0) return null
  const sorted = [...env].sort((a, b) => a - b)
  const p90 = percentile(sorted, 0.9)
  const p99 = percentile(sorted, 0.99)
  if (p99 < ABS_FLOOR) return null
  return Math.max(0.4 * p90, 0.15 * p99)
}

export type LoudPickOpts = {
  /** сколько секунд после старта должно «звучать» (самый длинный отрывок) */
  spanSec: number
  /** первые секунды (то самое «слушаем 1 секунду») — звучат ВСЕ, без пауз */
  headSec?: number
  /** не начинать раньше (fade-in/тишина в начале файла) */
  edgeSec?: number
  /** запас до конца файла (fade-out) */
  endMarginSec?: number
  winSec?: number
}

/** Допуск: одно тихое окно (≤100 мс) внутри отрывка — «вдох»; два подряд
 *  (≥200 мс) — уже пауза. Тихих окон в отрывке — не больше 20 %. */
const MAX_QUIET_FRAC = 0.2

function spanOk(quiet: boolean[], from: number, count: number, headWin: number): boolean {
  let q = 0, run = 0
  for (let j = from; j < from + count; j++) {
    if (quiet[j]) {
      if (j < from + headWin) return false      // голова — без единой паузы
      q++; run++
      if (run > 1) return false
    } else run = 0
  }
  return q <= Math.floor(count * MAX_QUIET_FRAC)
}

/** Все допустимые секунды старта (шаг — окно огибающей). Пробуем две
 *  строгости: сначала «звучат ВСЕ spanSec секунд», если таких нет —
 *  «звучат голова + ещё 2 с» (минимум, чтобы «1 секунда» и короткие
 *  ставки не попали в тишину). Пусто — `[]`. */
export function loudStarts(env: number[], opts: LoudPickOpts): { starts: number[]; tier: 1 | 2 | 0 } {
  const win = opts.winSec ?? ENV_WIN_SEC
  const thr = loudThreshold(env)
  if (thr == null) return { starts: [], tier: 0 }
  const quiet = env.map(v => v < thr)
  const headWin = Math.max(1, Math.round((opts.headSec ?? 1) / win))
  const first = Math.ceil((opts.edgeSec ?? 1) / win)
  const total = env.length
  const tiers: [1 | 2, number][] = [
    [1, Math.max(headWin, Math.round(opts.spanSec / win))],
    [2, Math.max(headWin, headWin + Math.round(2 / win))],
  ]
  for (const [tier, count] of tiers) {
    const last = total - count - Math.round((opts.endMarginSec ?? 0.3) / win)
    const starts: number[] = []
    for (let i = first; i <= last; i++) {
      if (spanOk(quiet, i, count, headWin)) starts.push(+(i * win).toFixed(3))
    }
    if (starts.length > 0) return { starts, tier }
  }
  return { starts: [], tier: 0 }
}

/** Случайный старт среди громких участков. `rng` — инъекция для тестов. */
export function pickLoudStart(env: number[], opts: LoudPickOpts,
  rng: () => number = Math.random): number | null {
  const { starts } = loudStarts(env, opts)
  if (starts.length === 0) return null
  return starts[Math.min(starts.length - 1, Math.floor(rng() * starts.length))]
}
