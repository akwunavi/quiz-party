// ═══ SpecAudio: подставка HTMLAudioElement, ведущая себя ПО СПЕЦИФИКАЦИИ ═══
// jsdom не реализует настоящую семантику <audio> (play()/pause()/src меняют
// состояние синхронно и без реальных ошибок). Тесты гонки звука (A8) не
// могут ловить регресс на такой подставке — ошибка `AbortError`, на которой
// держится весь фикс (audioSource.ts, HANDOFF §3bw), там просто не
// возникает. SpecAudio эмулирует ровно то поведение, что подтверждено
// калибровкой реального Chromium (scripts/media-calibration.mjs →
// src/test/media/chromium-semantics.json, сверяется в
// fakeMedia.calibration.test.ts): `play()` не резолвится, пока звук
// реально не пошёл (`_canPlay()`), а `pause()`/смена `src` до этого
// момента ОТКЛОНЯЮТ висящий промис `AbortError`, причём АСИНХРОННО — так же
// ведёт себя настоящий браузер, синхронный reject маскировал бы гонки,
// которые проявляются только через реальный тик событийного цикла.
export class SpecAudio extends EventTarget {
  paused = true
  currentTime = 0
  duration = NaN
  volume = 1
  loop = false
  srcLog: string[] = []

  private _src = ''
  private pendingPlay: { resolve: () => void; reject: (e: Error) => void } | null = null

  get src(): string { return this._src }
  set src(v: string) {
    this._src = v
    this.srcLog.push(v)
    this._rejectPending(new DOMException('превью прервано сменой src', 'AbortError'))
  }

  play(): Promise<void> {
    // предыдущий висящий play() — реальный браузер тоже отклонил бы его
    // тут, но по спецификации у одного элемента одновременно активен
    // только последний вызов; для наших тестов достаточно завести новый.
    return new Promise<void>((resolve, reject) => {
      this.pendingPlay = { resolve, reject }
    })
  }

  pause(): void {
    this.paused = true
    this._rejectPending(new DOMException('превью прервано pause()', 'AbortError'))
  }

  load(): void {
    this._rejectPending(new DOMException('превью прервано load()', 'AbortError'))
  }

  /** Тестовый хук: звук реально начал играть — резолвит висящий play(). */
  _canPlay(): void {
    if (!this.pendingPlay) return
    this.paused = false
    this.dispatchEvent(new Event('playing'))
    const { resolve } = this.pendingPlay
    this.pendingPlay = null
    resolve()
  }

  /** Тестовый хук: загрузка реально не удалась (404 и т.п.). */
  _failLoad(): void {
    this._rejectPending(new DOMException('файл не найден', 'NotSupportedError'))
  }

  private _rejectPending(err: Error) {
    const pending = this.pendingPlay
    if (!pending) return
    this.pendingPlay = null
    // асинхронно — как в реальном браузере: reject не происходит в тот же
    // синхронный момент, что вызов pause()/смена src.
    setTimeout(() => pending.reject(err), 0)
  }
}
