// ═══ ЗАГРУЗКА ЗВУКА С ЗАПАСНЫМ ПУТЁМ ═══
// Симптом: <audio src="…supabase.co/…"> падает с ошибкой безопасности
//   «Request had a target IP address space of `unknown`».
// Так Chrome отвечает, когда не может классифицировать сеть — типично при
// VPN, корпоративном прокси или расширении, меняющем маршрутизацию.
//
// Важное различие: этот запрет действует на ЗАПРОС МЕДИА-ЭЛЕМЕНТА. Обычный
// fetch() из того же кода часто проходит. Поэтому: пробуем как есть, а при
// отказе скачиваем файл через fetch и играем из памяти (blob). Для игры
// это незаметно, а звук появляется там, где раньше была тишина.
//
// Офлайн-предзагрузка (шаг 5, Part A): та же логика запасного пути теперь
// СНАЧАЛА смотрит в IndexedDB (`packCache`) — если трек уже скачан кнопкой
// «Скачать пакет для офлайна», второй запасной путь вообще не идёт в сеть.
// Разбор ответа сервера (файла нет / сеть заблокировала) не дублируем —
// он один, в `media.ts:fetchMediaBlob`.
//
// 9.59 (HANDOFF §3bw): найдена настоящая первопричина гонки звука в
// «Угадай мелодию» — она НЕ про VPN. `AbortError` из `play()` — штатный
// сигнал спецификации HTML «воспроизведение прервали до готовности»
// (смена src, pause() до старта, .load()). Раньше playAudio уходила на
// запасной путь (fetch) при ЛЮБОЙ ошибке прямого play(), включая
// AbortError — то есть на КАЖДУЮ смену трека второй игрок получал лишний
// параллельный fetch, который потом мог догнать и запустить устаревший
// звук. Теперь AbortError — это `SUPERSEDED`, тихо, без похода в сеть.

import { readMedia } from './packCache'
import { fetchMediaBlob } from './media'

/** `startAt` в ok — секунда, с которой РЕАЛЬНО пошёл звук (после подрезки
 *  по настоящей длине файла, см. seekSafely). */
export type PlayResult = { ok: true; startAt?: number } | { ok: false; reason: string }

/** Вытеснено новой операцией — не ошибка, происходит постоянно и штатно. */
export const SUPERSEDED = { ok: false, reason: 'superseded' } as const

// ═══ РЕЕСТР ЖИВЫХ ПЛЕЕРОВ ═══
// Объекты `new Audio()` НЕ находятся в документе, поэтому
// document.querySelectorAll('audio') их не видит. Из-за этого все прошлые
// попытки «заглушить всё» не трогали ни озвучку, ни трек вопроса, ни
// плитки: звук продолжал играть на следующем слайде.
const live = new Set<HTMLAudioElement>()

/** Создать плеер, о котором система будет знать. */
export function createAudio(): HTMLAudioElement {
  const a = new Audio()
  live.add(a)
  return a
}

// ═══ ХУКИ ГЛОБАЛЬНОЙ ОСТАНОВКИ ═══
// sharedAudio.ts держит СВОЙ отдельный текущий элемент/операцию и не виден
// отсюда напрямую (циклический импорт). Чтобы stopAllAudio() умела погасить
// и его, он подписывается сюда одной строкой при загрузке модуля.
const stopAllHooks = new Set<() => void>()

/** Подписаться на глобальную остановку. Возвращает функцию отписки
 *  (на практике не используется — подписка на весь модуль живёт вечно). */
export function onStopAll(fn: () => void): () => void {
  stopAllHooks.add(fn)
  return () => stopAllHooks.delete(fn)
}

/** Остановить ВЕСЬ звук: и созданный кодом, и вставленный в разметку. */
export function stopAllAudio() {
  stopAllHooks.forEach(fn => { try { fn() } catch { /* не должен ронять остальных */ } })
  live.forEach(a => {
    try { a.pause(); a.currentTime = 0; a.src = '' } catch { /* уже мёртв */ }
  })
  live.clear()
  document.querySelectorAll('audio, video').forEach(el => {
    const m = el as HTMLMediaElement
    try { m.pause(); m.currentTime = 0 } catch { /* уже мёртв */ }
  })
}

/** Полный адрес медиа-файла → его относительный путь в бакете (обратно к
 *  `mediaUrl`), чтобы свериться с офлайн-кешем. `null` для внешних ссылок
 *  (`public/` репозитория, чужой CDN) — их IndexedDB не хранит по такому
 *  ключу, ничего страшного, просто пропускаем этот шаг. */
function pathFromUrl(url: string): string | null {
  const base = import.meta.env.VITE_SUPABASE_URL as string | undefined
  const prefix = base ? `${base}/storage/v1/object/public/quiz-media/` : null
  if (!prefix || !url.startsWith(prefix)) return null
  return url.slice(prefix.length).split('/').map(decodeURIComponent).join('/')
}

// ═══ КЕШ СКАЧАННЫХ ФАЙЛОВ (blob-URL) ═══
// Ограничен: держать все треки вечера в памяти проектора — сотни мегабайт.
// Вытесняем САМЫЕ СТАРЫЕ (порядок вставки Map), но никогда не вытесняем
// blob, который сейчас реально стоит в src у живого элемента — revoke на
// играющем элементе обрывает звук.
const cache = new Map<string, string>()
// 9.85: 8 → 40 — раунд «Угадай мелодию» качает ВСЕ свои треки при входе на
// доску (preloadAudioAll), 16–30 файлов; при 8 первые вытеснялись бы раньше,
// чем до них дойдёт рулетка. 40 треков по 3–5 МБ — 120–200 МБ памяти
// проектора, для ноутбука терпимо.
const MAX_CACHED_BLOBS = 40

function evictOldIfNeeded() {
  if (cache.size <= MAX_CACHED_BLOBS) return
  const inUse = new Set<string>()
  live.forEach(a => { if (a.src) inUse.add(a.src) })
  for (const [url, blobUrl] of cache) {
    if (cache.size <= MAX_CACHED_BLOBS) break
    if (inUse.has(blobUrl)) continue
    cache.delete(url)
    try { URL.revokeObjectURL(blobUrl) } catch { /* уже отозван */ }
  }
}

function cacheSet(url: string, blobUrl: string) {
  cache.set(url, blobUrl)
  evictOldIfNeeded()
}

// Скачивания, идущие ПРЯМО СЕЙЧАС — второй запрос на тот же url переиспользует
// первый вместо второго параллельного fetch.
const inflight = new Map<string, Promise<string>>()

/** Скачать файл и вернуть локальную ссылку на него.
 *  Сначала — офлайн-кеш (IndexedDB, `packCache`): если трек уже скачан
 *  кнопкой «Скачать пакет для офлайна», сеть вообще не нужна. Дальше —
 *  обычная сеть, разбор ответа сервера общий с `packPreload.ts`
 *  (`media.ts:fetchMediaBlob`), чтобы не дублировать отличение «файла нет»
 *  от «сеть заблокировала». */
async function toBlobUrl(url: string): Promise<string> {
  const hit = cache.get(url)
  if (hit) return hit
  const running = inflight.get(url)
  if (running) return running

  const task = (async () => {
    const path = pathFromUrl(url)
    if (path) {
      try {
        const cached = await readMedia(path)
        if (cached) {
          const blobUrl = URL.createObjectURL(cached)
          cacheSet(url, blobUrl)
          return blobUrl
        }
      } catch { /* IndexedDB недоступен — идём в сеть, как раньше */ }
    }
    const blob = await fetchMediaBlob(path ?? url)
    const blobUrl = URL.createObjectURL(blob)
    cacheSet(url, blobUrl)
    return blobUrl
  })()

  inflight.set(url, task)
  try {
    return await task
  } finally {
    inflight.delete(url)
  }
}

/** Прогреть кеш заранее, не дожидаясь результата. Не делает ничего для
 *  blob-URL (уже локальный) и для того, что уже скачивается/скачано —
 *  модуль сам гарантирует «ровно один раз на трек». Ошибку тихо глотает:
 *  это лишь оптимизация, обязательный путь всё равно идёт через playAudio. */
export function preloadAudio(url: string): void {
  if (url.startsWith('blob:') || cache.has(url) || inflight.has(url)) return
  void toBlobUrl(url).catch(() => {})
}

/** Скачать в память ВСЕ треки (раунд «Угадай мелодию», 9.85) — по два
 *  одновременно, чтобы не забить канал бара, — сообщая прогресс.
 *  Уже скачанные засчитываются сразу. Ошибка одного файла не останавливает
 *  остальные (он доиграет потом сетевым путём). Возвращает функцию отмены. */
export function preloadAudioAll(urls: string[],
  onProgress: (p: { done: number; failed: number; total: number }) => void): () => void {
  const list = [...new Set(urls.filter(u => u && !u.startsWith('blob:')))]
  let done = 0, failed = 0, next = 0, cancelled = false
  const report = () => { if (!cancelled) onProgress({ done, failed, total: list.length }) }
  const worker = async () => {
    while (!cancelled && next < list.length) {
      const url = list[next++]
      try { await toBlobUrl(url); done++ } catch { failed++ }
      report()
    }
  }
  report()
  void Promise.all([worker(), worker()])
  return () => { cancelled = true }
}

/** Гонка между промисом `p` и отменой по `signal`. Не отменяет саму `p`
 *  (это делает вызывающий по месту через try/catch AbortError выше), только
 *  позволяет НЕ ЖДАТЬ её дальше, если пришла отмена раньше. */
function abortable<T>(p: Promise<T>, signal?: AbortSignal): Promise<T> {
  if (!signal) return p
  if (signal.aborted) return Promise.reject(new DOMException('superseded', 'AbortError'))
  return new Promise<T>((resolve, reject) => {
    const onAbort = () => reject(new DOMException('superseded', 'AbortError'))
    signal.addEventListener('abort', onAbort)
    p.then(
      v => { signal.removeEventListener('abort', onAbort); resolve(v) },
      e => { signal.removeEventListener('abort', onAbort); reject(e) },
    )
  })
}

/** Дождаться метаданных (длины файла) — с отменой и потолком ожидания.
 *  Ошибка загрузки не бросает: дальше её честно покажет play(). */
function waitMetadata(el: HTMLAudioElement, signal?: AbortSignal, maxMs = 6000): Promise<void> {
  if (el.readyState >= 1 && Number.isFinite(el.duration)) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const done = () => { cleanup(); resolve() }
    const onAbort = () => { cleanup(); reject(new DOMException('superseded', 'AbortError')) }
    const t = setTimeout(done, maxMs)
    function cleanup() {
      clearTimeout(t)
      el.removeEventListener('loadedmetadata', done)
      el.removeEventListener('error', done)
      signal?.removeEventListener('abort', onAbort)
    }
    el.addEventListener('loadedmetadata', done)
    el.addEventListener('error', done)
    signal?.addEventListener('abort', onAbort)
  })
}

/** Чистая формула: с какой секунды стартовать, чтобы после старта осталось
 *  не меньше `keepTail` секунд звука. Длина неизвестна — как просили. */
export function safeStart(startAt: number, duration: number, keepTail: number): number {
  if (!(startAt > 0)) return 0
  if (!Number.isFinite(duration) || duration <= 0) return startAt
  return Math.min(startAt, Math.max(0, duration - Math.max(keepTail, 1)))
}

/** Перемотка на `startAt` ДО запуска звука, по РЕАЛЬНОЙ длине файла (9.83).
 *  Корень «секунда мелодии иногда не звучит»: точку старта выбирали по
 *  номинальной длине трека из настроек раунда, и если файл короче, браузер
 *  прыгал в конец — `playing` и сразу `ended`, тишина. Подрезка «потом»
 *  (через 400 мс) перематывала уже остановленный элемент — звук так и не
 *  шёл. Проверено в headless Chromium: файл 12 с, старт 15/18 → 0,00 с
 *  звука (HANDOFF §3cf). Теперь сначала метаданные, потом безопасная
 *  точка, потом play(). */
async function seekSafely(el: HTMLAudioElement, startAt: number, keepTail: number,
  signal?: AbortSignal): Promise<number> {
  if (!(startAt > 0)) return 0
  await waitMetadata(el, signal)
  const at = safeStart(startAt, el.duration, keepTail)
  el.currentTime = at
  return at
}

/** Воспроизвести звук, при необходимости через запасной путь.
 *  `startAt` — секунда, с которой начать (0 — с начала, без ожидания).
 *  При `startAt > 0` сначала ждём метаданные и подрезаем точку по РЕАЛЬНОЙ
 *  длине файла (`seekSafely`, оставляя `keepTail` секунд звука), и только
 *  потом `play()` — иначе за концом файла браузер сразу останавливается
 *  (9.83, HANDOFF §3cf). Реальная точка возвращается в `PlayResult.startAt`.
 *  Единственный вызывающий с startAt ≠ 0 — «Угадай мелодию».
 *
 *  `signal` — необязательный AbortController.signal: если операция, которой
 *  принадлежит этот вызов, вытеснена новой (см. lib/sharedAudio.ts), сигнал
 *  срабатывает, и playAudio возвращает SUPERSEDED, не уходя ни в fetch, ни
 *  в повторный play(). Решение, что считать «вытесненным», остаётся за
 *  вызывающим — здесь только механика отмены. */
export async function playAudio(
  el: HTMLAudioElement, url: string, startAt = 0, signal?: AbortSignal,
  /** сколько секунд звука должно остаться после точки старта */
  keepTail = 1,
): Promise<PlayResult> {
  live.add(el)                       // чтобы его точно можно было заглушить

  // 0) уже скачан — играем сразу из памяти, без похода на прямой сетевой URL
  if (!url.startsWith('blob:')) {
    const hit = cache.get(url)
    if (hit) {
      try {
        el.src = hit
        const at = await seekSafely(el, startAt, keepTail, signal)
        await el.play()
        return { ok: true, startAt: at }
      } catch (e) {
        const name = e instanceof Error ? e.name : ''
        if (signal?.aborted || name === 'AbortError') return SUPERSEDED
        // запись протухла (blob отозван/битый) — забываем и идём обычным
        // путём. 9.62 (HANDOFF §3bx, находка 8): раньше запись просто
        // удалялась из cache БЕЗ revokeObjectURL — сам blob-URL утекал
        // (никогда не освобождался), и предзагруженный трек пришлось бы
        // качать заново после клика «разблокировать звук».
        try { URL.revokeObjectURL(hit) } catch { /* уже отозван */ }
        cache.delete(url)
      }
    }
  }

  // 1) как есть
  try {
    el.src = url
    const at = await seekSafely(el, startAt, keepTail, signal)
    await el.play()
    return { ok: true, startAt: at }
  } catch (e) {
    const name = e instanceof Error ? e.name : ''
    // AbortError — воспроизведение ШТАТНО прервали (смена src/pause() до
    // старта/чужая операция). Это не отказ загрузки — идти на fetch за тем
    // же файлом бессмысленно и вредно (см. HANDOFF §3bw).
    if (signal?.aborted || name === 'AbortError') return SUPERSEDED
    // запрет автозапуска запасным путём не лечится — нужен клик
    if (name === 'NotAllowedError') {
      return { ok: false, reason: 'браузер не разрешил звук — кликните по экрану' }
    }
  }

  // 2) через скачивание в память
  try {
    const blobUrl = await abortable(toBlobUrl(url), signal)
    if (signal?.aborted) return SUPERSEDED
    el.src = blobUrl
    const at = await seekSafely(el, startAt, keepTail, signal)
    await el.play()
    return { ok: true, startAt: at }
  } catch (e) {
    const name = e instanceof Error ? e.name : ''
    if (signal?.aborted || name === 'AbortError') return SUPERSEDED
    return {
      ok: false,
      reason: e instanceof Error && /ФАЙЛА НЕТ/.test(e.message)
        ? 'файла нет в хранилище — трек нужно загрузить заново в редакторе'
        : e instanceof Error && /Failed to fetch|NetworkError/i.test(e.message)
          ? 'файл не скачивается: запрос блокирует браузер, VPN или расширение'
          : `не удалось воспроизвести: ${e instanceof Error ? e.message : 'ошибка'}`,
    }
  }
}

/** Диагностика одного файла: что именно отвечает сервер. */
export async function probeMedia(url: string) {
  const out: string[] = [url]
  try {
    const res = await fetch(url, { method: 'GET', mode: 'cors', credentials: 'omit' })
    out.push(`fetch: ${res.status} ${res.statusText}`)
    out.push(`тип: ${res.headers.get('content-type') ?? '—'}`)
    out.push(`размер: ${res.headers.get('content-length') ?? '—'}`)
  } catch (e) {
    out.push(`fetch НЕ ПРОШЁЛ: ${e instanceof Error ? e.message : 'ошибка'}`)
  }
  return out.join('\n')
}

// ═══ ЗАПУСК ТРЕКА СИНХРОННО С ОТСЧЁТОМ ═══
// Две беды, которые это решает:
//   1) Отсчёт запускали сразу, а звук начинался через 3–5 секунд (загрузка
//      файла) — таймер и музыка расходились.
//   2) «Переслушать» создавал новый плеер, а старый мог ожить: его play()
//      был ещё «в полёте» и срабатывал уже после паузы — два трека разом.
//
// Решение: отсчёт стартует по событию `playing`, а каждый запуск получает
// номер поколения. Всё, что осталось от прошлых поколений, глушится и
// игнорируется. (Используется «Своей игрой» — не общий мелодийный элемент,
// поэтому AbortController здесь не нужен, свой лёгкий механизм подходит.)

let generation = 0
let genCtrl: AbortController | null = null

export type SyncedHandle = { stop: () => void }

export function playSynced(url: string, seconds: number, cb: {
  onStart?: () => void
  onTick?: (left: number) => void
  onEnd?: () => void
  onError?: (reason: string) => void
}): SyncedHandle {
  const my = ++generation
  genCtrl?.abort()                    // прошлое поколение больше не актуально
  const ctrl = new AbortController()
  genCtrl = ctrl
  stopAllAudio()                      // прошлые треки замолкают ДО старта нового

  const el = createAudio()
  let timer: ReturnType<typeof setInterval> | undefined
  const stale = () => my !== generation

  const stop = () => {
    if (timer) clearInterval(timer)
    try { el.pause() } catch { /* уже мёртв */ }
  }

  // отсчёт начинается ровно тогда, когда звук ПОШЁЛ
  el.addEventListener('playing', () => {
    if (stale()) { stop(); return }
    cb.onStart?.()
    let left = seconds
    cb.onTick?.(left)
    // setInterval без window: код должен работать и вне браузера (тесты)
    timer = setInterval(() => {
      if (stale()) { stop(); return }
      left -= 1
      cb.onTick?.(Math.max(0, left))
      if (left <= 0) { stop(); cb.onEnd?.() }
    }, 1000)
  }, { once: true })

  void playAudio(el, url, 0, ctrl.signal).then(r => {
    if (stale()) { stop(); return }      // пока грузились, нажали «переслушать»
    if (!r.ok) {
      // superseded — вытеснили штатно (см. HANDOFF §3bw), это не ошибка
      // звука для пользователя интерфейса «Своей игры» — молчим.
      if (r.reason === 'superseded') { stop(); return }
      stop(); cb.onError?.(r.reason)
    }
  })

  return { stop: () => { if (my === generation) { generation++; ctrl.abort() }; stop() } }
}
