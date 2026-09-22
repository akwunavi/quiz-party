// ═══ ОБЩИЙ АУДИО-ЭЛЕМЕНТ «УГАДАЙ МЕЛОДИИ» ═══
// Вынесено из MelodyRound.tsx (HANDOFF.md §3bu) — чтобы тест гонки мог
// импортировать РЕАЛЬНЫЙ код напрямую, а не копию.
//
// 9.59 (HANDOFF §3bw): переписано с ручного счётчика поколений на явный
// контроллер вытеснения (AbortController на операцию). Раньше «устаревшая»
// операция просто помечалась флагом и остывала сама — но playAudio() при
// AbortError всё равно уходила на запасной путь (fetch), и та СЕТЕВАЯ
// операция потом могла догнать и всё-таки запустить звук поверх новой
// стадии. Здесь вместо очереди-FIFO — прямое вытеснение: preempt()
// СИНХРОННО обрывает текущую операцию (abort + pause()) до старта новой,
// поэтому тишина наступает немедленно, а не «когда-нибудь после await».
//
// Почему не просто FIFO-очередь (`tail = tail.then(run)`): она бы дождалась,
// пока текущая операция САМА закончится (в т.ч. её сетевой fallback), и
// только потом начала следующую — «Играем 5 сек» ждало бы, пока доиграет/
// протухнет предыдущий трек. Здесь наоборот: preempt() обрывает немедленно,
// а `tail` нужен только чтобы не запускать `run()` новой операции раньше,
// чем предыдущая реально остановлена — иначе `playing` от старой операции,
// уже стоящее в очереди задач браузера, могло бы долететь уже после того,
// как el.src сменили на новый трек.
//
// Единый аудио-элемент: «разблокируется» первым кликом по проектору и дальше
// переиспользуется — autoplay-политика браузера больше не блокирует треки,
// запущенные выбором с телефона (там нет жеста на проекторе).
import { playAudio, createAudio, onStopAll, SUPERSEDED, type PlayResult } from './audioSource'

export type SharedPlayOpts = { startAt?: number; loop?: boolean; volume?: number }

type Ev = 'playing' | 'ended' | 'loadedmetadata'

type Sub = { ev: Ev; cb: () => void; attached: boolean; handler?: () => void }

type Op = {
  ctrl: AbortController
  aborted: boolean
  started: boolean
  subs: Sub[]
}

export interface SharedPlayback {
  readonly el: HTMLAudioElement
  isCurrent(): boolean
  stop(): void
  on(ev: Ev, cb: () => void): () => void
  readonly result: Promise<PlayResult>
}

let el: HTMLAudioElement | null = null
let current: Op | null = null
let tail: Promise<unknown> = Promise.resolve()
let unlocked = false

function ensureEl(): HTMLAudioElement {
  if (!el) el = createAudio()
  return el
}

function detachSub(sub: Sub) {
  if (sub.attached && sub.handler) el?.removeEventListener(sub.ev, sub.handler)
  sub.attached = false
}

/** Синхронно оборвать ТЕКУЩУЮ операцию: abort сигнала, снять её слушатели,
 *  обнулить `current`, поставить элемент на паузу. Тишина наступает СРАЗУ,
 *  в момент вызова — не после какого-либо await. */
function preempt() {
  if (current) {
    current.ctrl.abort()
    current.subs.forEach(detachSub)
    current.aborted = true
    current = null
  }
  try { el?.pause() } catch { /* уже мёртв */ }
}

function attachSub(op: Op, sub: Sub) {
  const handler = () => { if (current === op) sub.cb() }
  sub.handler = handler
  sub.attached = true
  ensureEl().addEventListener(sub.ev, handler)
}

function run(op: Op, src: string, opts: SharedPlayOpts | undefined): Promise<PlayResult> {
  const e = ensureEl()
  e.loop = opts?.loop ?? false
  e.volume = opts?.volume ?? 1
  op.started = true
  // Подписки навешиваются ТОЛЬКО сейчас, не раньше — иначе `playing` от
  // ПРЕДЫДУЩЕЙ операции, уже стоящее в очереди задач браузера, может
  // долететь до новой операции (F1, HANDOFF §3bu/§3bw).
  op.subs.forEach(s => { if (!s.attached) attachSub(op, s) })
  return playAudio(e, src, opts?.startAt ?? 0, op.ctrl.signal)
}

export function playShared(src: string, opts?: SharedPlayOpts): SharedPlayback {
  ensureEl()
  preempt()
  const op: Op = { ctrl: new AbortController(), aborted: false, started: false, subs: [] }
  current = op

  const result: Promise<PlayResult> = tail.then(
    () => (op.aborted ? SUPERSEDED : run(op, src, opts)),
  )
  tail = result.catch(() => {})

  return {
    get el() { return ensureEl() },
    isCurrent: () => current === op,
    stop: () => { if (current === op) preempt() },
    on: (ev, cb) => {
      const sub: Sub = { ev, cb, attached: false }
      op.subs.push(sub)
      if (op.started) attachSub(op, sub)
      return () => {
        detachSub(sub)
        op.subs = op.subs.filter(s => s !== sub)
      }
    },
    result,
  }
}

export function stopShared(): void {
  preempt()
  try { if (el) el.currentTime = 0 } catch { /* уже мёртв */ }
}

export function unlockAudio(): void {
  if (unlocked || current !== null) return
  ensureEl()
  el!.play().catch(() => {})
  el!.pause()
  unlocked = true
}

onStopAll(() => preempt())

/** Только для тестов: сбросить всё модульное состояние между кейсами —
 *  модуль иначе держит состояние между тестовыми файлами. */
export function _resetSharedAudioForTests(): void {
  el = null
  current = null
  tail = Promise.resolve()
  unlocked = false
}
