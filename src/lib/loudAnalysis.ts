// ═══ АНАЛИЗ ГРОМКОСТИ ТРЕКОВ «УГАДАЙ МЕЛОДИИ» (10.74) ═══
// Проектор уже скачал все треки раунда в память (audioSource.preloadAudioAll).
// По каждому скачанному файлу — один раз, по одному за раз, в фоне:
// decodeAudioData (8 кГц, декодер браузера — вне основного потока) →
// огибающая RMS (lib/loudWindows.ts) → кеш в памяти по url.
// В момент «слушаем 1 секунду» `loudStartFor` синхронно спрашивает кеш:
// есть результат → случайная точка только среди звучащих участков;
// нет (анализ не успел / не поддерживается / ошибка / беззвучный трек) →
// `null`, и игра ведёт себя как раньше (случайная точка m.startSec).
// Ничего здесь не бросает наружу и не блокирует звук.

import { getCachedBlobUrl, onBlobCached } from './audioSource'
import { ENV_WIN_SEC, pickLoudStart, rmsEnvelope } from './loudWindows'

/** Результат анализа одного трека. */
export type TrackEnv = { env: number[]; durationSec: number }

/** Декодер: байты файла → моно/стерео-отсчёты. Подменяется в тестах. */
export type Decoder = (bytes: ArrayBuffer) => Promise<{ sampleRate: number; channels: Float32Array[] }>

const DECODE_RATE = 8000          // речь и мелодия живут ниже 4 кГц; 8 кГц — в 5,5 раза меньше памяти
const MAX_BYTES = 30 * 1024 * 1024 // файл больше — не трогаем (память слабого ТВ)

export const defaultDecoder: Decoder = async bytes => {
  const w = globalThis as unknown as {
    OfflineAudioContext?: new (ch: number, len: number, rate: number) => OfflineAudioContext
    webkitOfflineAudioContext?: new (ch: number, len: number, rate: number) => OfflineAudioContext
  }
  const Ctx = w.OfflineAudioContext ?? w.webkitOfflineAudioContext
  if (!Ctx) throw new Error('no WebAudio')
  const ctx = new Ctx(1, 1, DECODE_RATE)
  const buf = await ctx.decodeAudioData(bytes)
  const channels: Float32Array[] = []
  for (let c = 0; c < buf.numberOfChannels; c++) channels.push(buf.getChannelData(c))
  return { sampleRate: buf.sampleRate, channels }
}

const results = new Map<string, TrackEnv | null>()   // null — пробовали, не вышло
const queued = new Set<string>()
let chain: Promise<void> = Promise.resolve()

/** Проанализировать байты → огибающая (чистая обвязка, для тестов). */
export async function analyzeBytes(bytes: ArrayBuffer, decode: Decoder = defaultDecoder): Promise<TrackEnv | null> {
  if (bytes.byteLength === 0 || bytes.byteLength > MAX_BYTES) return null
  const { sampleRate, channels } = await decode(bytes)
  const env = rmsEnvelope(channels, sampleRate, ENV_WIN_SEC)
  return env.length > 0 ? { env, durationSec: env.length * ENV_WIN_SEC } : null
}

async function analyzeOne(url: string, blobUrl: string, decode: Decoder) {
  try {
    const bytes = await (await fetch(blobUrl)).arrayBuffer()
    results.set(url, await analyzeBytes(bytes, decode))
  } catch {
    results.set(url, null)        // blob отозван/декодер не смог — старое поведение
  }
}

function enqueue(url: string, blobUrl: string, decode: Decoder) {
  if (results.has(url) || queued.has(url)) return
  queued.add(url)
  // по одному, с передышкой между треками — UI проектора не должен дёргаться
  chain = chain
    .then(() => new Promise<void>(r => setTimeout(r, 30)))
    .then(() => analyzeOne(url, blobUrl, decode))
    .finally(() => { queued.delete(url) })
}

/** Анализировать треки по мере того, как они оказываются в памяти.
 *  Свою загрузку НЕ запускает. Возвращает отписку. Без WebAudio — no-op. */
export function watchTracks(urls: string[], decode: Decoder = defaultDecoder): () => void {
  if (decode === defaultDecoder && typeof (globalThis as { OfflineAudioContext?: unknown }).OfflineAudioContext === 'undefined'
    && typeof (globalThis as { webkitOfflineAudioContext?: unknown }).webkitOfflineAudioContext === 'undefined') return () => {}
  const want = new Set(urls.filter(u => u && !u.startsWith('blob:')))
  for (const u of want) {
    const hit = getCachedBlobUrl(u)
    if (hit) enqueue(u, hit, decode)
  }
  return onBlobCached((u, blobUrl) => { if (want.has(u)) enqueue(u, blobUrl, decode) })
}

/** Случайная точка старта среди звучащих участков, синхронно, из кеша.
 *  `null` — анализа нет/не вышло/нет подходящего места: играть по-старому. */
export function loudStartFor(url: string, spanSec: number, rng: () => number = Math.random): number | null {
  const r = results.get(url)
  if (!r) return null
  return pickLoudStart(r.env, { spanSec }, rng)
}

/** Только для тестов. */
export function _resetLoudAnalysis() { results.clear(); queued.clear(); chain = Promise.resolve() }
/** Только для тестов и стенда. */
export function _setEnv(url: string, e: TrackEnv | null) { results.set(url, e) }
export function _whenIdle(): Promise<void> { return chain }
