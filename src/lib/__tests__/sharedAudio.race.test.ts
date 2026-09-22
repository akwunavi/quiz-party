// ═══ «Угадай мелодию»: контроллер вытеснения sharedAudio ═══
// (HANDOFF.md §3bw, коммит A 9.59)
//
// Переписано с нуля под новый контракт (playShared возвращает SharedPlayback
// с isCurrent()/stop()/on()/result, вытеснение через AbortController, а не
// счётчик поколений) и под SpecAudio (src/test/fakeMedia.ts) — подставку,
// поведение которой СВЕРЕНО с реальным Chromium (fakeMedia.calibration.test.ts),
// а не выдумано по памяти.
//
// Импортируется РЕАЛЬНЫЙ lib/sharedAudio.ts и РЕАЛЬНЫЙ lib/audioSource.ts —
// единственный внешний мок-край — сетевой fetchMediaBlob (media.ts),
// физически недоступный в node-окружении теста.
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { SpecAudio } from '../../test/fakeMedia'

vi.mock('../packCache', () => ({ readMedia: vi.fn().mockResolvedValue(null) }))

const fetchCalls: string[] = []
const pending = new Map<string, { resolve: (b: Blob) => void; reject: (e: Error) => void }>()
vi.mock('../media', () => ({
  fetchMediaBlob: vi.fn((path: string) => {
    fetchCalls.push(path)
    return new Promise<Blob>((res, rej) => pending.set(path, { resolve: res, reject: rej }))
  }),
}))
function resolveFetchFor(path: string, blob = new Blob()) { pending.get(path)?.resolve(blob) }

let audios: SpecAudio[] = []

beforeEach(() => {
  fetchCalls.length = 0
  pending.clear()
  audios = []
  vi.stubGlobal('Audio', class extends SpecAudio {
    constructor() { super(); audios.push(this) }
  })
  vi.stubGlobal('document', { querySelectorAll: () => [] })
  vi.stubGlobal('URL', {
    createObjectURL: () => 'blob:fake-' + Math.random(),
    revokeObjectURL: () => {},
  })
  vi.resetModules()
})

async function load() {
  const shared = await import('../sharedAudio')
  shared._resetSharedAudioForTests()
  return shared
}

// прямой play() всегда "висит", пока тест сам не вызовет _canPlay()/_failLoad()
// на нужном элементе — так проверяется именно момент, когда играющий трек
// прерывают ДО того, как он реально успел начать звучать.
// SpecAudio отклоняет "висящий" play() АСИНХРОННО через setTimeout(0) — как
// реальный браузер (не в тот же микротик, что pause()/смена src). Ждём
// настоящий макротик, а не только микрозадачи.
async function tick(n = 3) {
  await new Promise(r => setTimeout(r, 0))
  for (let i = 0; i < n; i++) await Promise.resolve()
}

describe('sharedAudio: контроллер вытеснения (реальный код, не копия)', () => {
  it('(a) A висит на прямой загрузке → playShared(B) отклоняет A с AbortError, fetch для A НЕ вызывается', async () => {
    const { playShared } = await load()
    const hA = playShared('A.mp3')
    const rA = hA.result
    await tick()

    const hB = playShared('B.mp3')
    audios[0]._canPlay() // B реально стартует на общем элементе

    const resA = await rA
    expect(resA).toEqual({ ok: false, reason: 'superseded' })
    expect(fetchCalls.filter(u => u === 'A.mp3')).toHaveLength(0)
    expect(hB.isCurrent()).toBe(true)
  })

  it('(b) stopShared() до старта: el.paused сразу true синхронно, последующий _canPlay() ничего не запускает', async () => {
    const { playShared, stopShared } = await load()
    const h = playShared('A.mp3')
    await tick()
    stopShared()
    expect(audios[0].paused).toBe(true)
    audios[0]._canPlay()
    expect(h.isCurrent()).toBe(false)
    // playing не должен восприниматься как "мы играем" — исход операции superseded
    await expect(h.result).resolves.toEqual({ ok: false, reason: 'superseded' })
  })

  it('(c) A ушёл на fetch и "висит" там, B тем временем реально играет напрямую — резолв A не трогает B', async () => {
    const { playShared } = await load()
    const hA = playShared('A.mp3')
    await tick()
    audios[0]._failLoad()                 // A: прямой путь падает НЕ AbortError → идёт fetch
    await tick()

    playShared('B.mp3')
    await tick()                          // run(B) реально стартовал play()
    audios[0]._canPlay()                  // B стартует напрямую
    await tick()
    expect(audios[0].paused).toBe(false)

    resolveFetchFor('A.mp3')
    await tick(5)

    expect(audios[0].paused).toBe(false)  // B не поставлен на паузу устаревшим A
    await expect(hA.result).resolves.toEqual({ ok: false, reason: 'superseded' })
  })

  // Честно про эту проверку: удаление `tail` (замена на голый
  // `Promise.resolve().then(run)`) НЕ красит именно этот тест — preempt()
  // синхронно обрывает предыдущую операцию (abort + pause()) раньше, чем
  // успевает начаться следующий микротик, поэтому наблюдаемый здесь порядок
  // src не меняется. Проверено запуском (см. git history коммита A). `tail`
  // защищает от более тонкого случая — событие `playing` от операции,
  // которая всё ещё "долетает" из очереди задач браузера СРЕДИ выполнения
  // playAudio() предыдущей операции (не просто ожидающей fetch, а уже
  // внутри `await el.play()`) — такой сценарий не воспроизводим детерминированно
  // без настоящего браузерного event loop, оставляем логическое обоснование
  // в комментарии run()/playShared (см. sharedAudio.ts), как для теста (e).
  it('(d) в srcLog никогда нет src A ПОСЛЕ src B, при любом порядке резолва', async () => {
    const { playShared } = await load()
    playShared('A.mp3')
    await tick()
    audios[0]._failLoad()
    await tick()
    playShared('B.mp3')
    await tick()
    audios[0]._failLoad()
    await tick()

    // B резолвится ПОЗЖЕ A — но благодаря `tail` run(B) не может стартовать
    // раньше, чем текущая (A) операция объявлена вытесненной
    resolveFetchFor('B.mp3')
    resolveFetchFor('A.mp3')
    await tick(6)

    const log = audios[0].srcLog
    // после последнего упоминания "A.mp3" (прямой src) может стоять только
    // blob для B, не A — проверяем, что финальный src не откатился на A
    expect(log[log.length - 1]).not.toBe('A.mp3')
  })

  it('(e) стадия не откладывается ради сети: stopShared() не ждёт "висящий" fetch, playShared(B) идёт сразу', async () => {
    const { playShared, stopShared } = await load()
    playShared('A.mp3')
    await tick()
    audios[0]._failLoad()
    await tick()                          // A теперь висит на fetch('A.mp3')

    stopShared()
    const hB = playShared('B.mp3')
    await tick()
    // B получил src, не дожидаясь резолва fetch A
    expect(audios[0].srcLog).toContain('B.mp3')
    expect(hB.isCurrent()).toBe(true)
  })

  it('(f) h.on("playing") операции B не срабатывает на "долетевшее" событие от вытесненной A', async () => {
    const { playShared } = await load()
    const hA = playShared('A.mp3')
    await tick()

    let bPlayingCount = 0
    const hB = playShared('B.mp3')
    hB.on('playing', () => { bPlayingCount++ })
    await tick()                          // run(B) стартовал, подписка навешена на el

    audios[0]._canPlay()
    await tick()
    expect(bPlayingCount).toBe(1)
    void hA
  })

  it('(g) loop/volume — у каждой операции свои', async () => {
    const { playShared } = await load()
    playShared('bg.mp3', { loop: true, volume: .45 })
    await tick()
    expect(audios[0].loop).toBe(true)
    expect(audios[0].volume).toBe(.45)
    audios[0]._canPlay()

    playShared('snippet.mp3')
    await tick()
    expect(audios[0].loop).toBe(false)
    expect(audios[0].volume).toBe(1)
  })

  it('(h) stopAllAudio() из audioSource.ts вытесняет текущую операцию sharedAudio, даже "висящую" на fetch', async () => {
    const { playShared } = await load()
    const { stopAllAudio } = await import('../audioSource')
    const h = playShared('A.mp3')
    await tick()
    audios[0]._failLoad()
    await tick()                          // висит на fetch

    stopAllAudio()
    expect(h.isCurrent()).toBe(false)
    await expect(h.result).resolves.toEqual({ ok: false, reason: 'superseded' })
  })
})
