// ═══ «Угадай мелодию»: общий аудио-элемент не даёт догнавшему play() ═══
// запустить звук в чужой стадии (HANDOFF.md §3bt, §3bu)
//
// Раньше этот тест жил в melody-shared-audio-race.test.ts и проверял СВОЮ
// ЖЕ КОПИЮ playShared/stopShared, а не настоящий код MelodyRound.tsx —
// классическая ловушка «сверка сравнивает код сам с собой» (CLAUDE.md,
// раздел 5). Убери завтра sharedGen из lib/sharedAudio.ts — тот тест
// остался бы зелёным. Здесь импортируется РЕАЛЬНЫЙ lib/sharedAudio.ts и
// РЕАЛЬНЫЙ lib/audioSource.ts (playAudio), с одним внешним мок-краем —
// сетевым fetch запасного пути (media.ts:fetchMediaBlob) — единственным,
// что физически недоступно в node-окружении теста.
//
// Как проверено, что тест ловит регресс (обязательная независимая сверка,
// CLAUDE.md): временно заменить `if (isStale())` на `if (false)` внутри
// audioSource.ts:playAudio (там, ГДЕ теперь реально живёт проверка, см.
// её комментарий) — npx vitest run sharedAudio.race делает первый и
// третий кейсы красными (звук остаётся paused=false там, где ожидается
// true). Кейс 2 (после 9.58, HANDOFF §3bv) ловит другой регресс — верни в
// sharedAudio.ts безусловный `if (isStale())` вместо `if (r.ok && isStale())`
// в `.then()` внутри `playShared()` — кейс 2 краснеет: реально играющий
// трек B оказывается на паузе. Это было выполнено вручную при написании
// теста и откачено обратно.
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../packCache', () => ({ readMedia: vi.fn().mockResolvedValue(null) }))

// Каждый трек — своя, независимо резолвящаяся промиса fetch (ключ — src),
// иначе кейс 2 не может резолвить B раньше A: один общий resolveFetch
// перезаписывался бы последним вызовом и резолвил не тот трек.
const pending = new Map<string, { resolve: (b: Blob) => void; reject: (e: Error) => void }>()
let rejectFetch: (e: Error) => void = () => {}
vi.mock('../media', () => ({
  fetchMediaBlob: vi.fn((path: string) => new Promise<Blob>((res, rej) => {
    pending.set(path, { resolve: res, reject: rej })
    rejectFetch = rej
  })),
}))
function resolveFetchFor(path: string, blob: Blob) {
  pending.get(path)?.resolve(blob)
}

// Плеер, ведущий себя как реальный <audio>: прямой play() ПАДАЕТ (как при
// VPN/прокси — см. audioSource.ts), запасной путь идёт через fetch.
class FakeAudio {
  paused = true
  currentTime = 0
  src = ''
  volume = 1
  loop = false
  play() {
    if (this.src.startsWith('blob:')) { this.paused = false; return Promise.resolve() }
    return Promise.reject(new Error('Request had a target IP address space of `unknown`'))
  }
  pause() { this.paused = true }
}

beforeEach(() => {
  vi.stubGlobal('Audio', FakeAudio)
  vi.stubGlobal('document', { querySelectorAll: () => [] })
  vi.stubGlobal('URL', { createObjectURL: () => 'blob:fake-' + Math.random() })
  vi.resetModules()
})

async function load() {
  const shared = await import('../sharedAudio')
  shared._resetSharedAudioForTests()
  return shared
}

describe('sharedAudio: playShared/stopShared (реальный код, не копия)', () => {
  it('запасной путь, разрешившийся ПОСЛЕ stopShared(), не оставляет трек играющим', async () => {
    const { playShared, stopShared } = await load()
    const el = playShared('track.mp3') as unknown as FakeAudio

    // прямой play() уже упал синхронно в микрозадаче — ждём её
    await Promise.resolve(); await Promise.resolve()

    // guard-таймер эффекта listen переводит стадию раньше, чем fetch готов
    stopShared()
    expect(el.paused).toBe(true)

    // fetch наконец резолвится — playAudio ВИДИТ isStale() и НЕ проигрывает
    resolveFetchFor('track.mp3', new Blob())
    await Promise.resolve(); await Promise.resolve(); await Promise.resolve()

    expect(el.paused).toBe(true)
  })

  it('устаревший fetch трека A резолвится ПОСЛЕ того, как реально заиграл трек B — B не глушится', async () => {
    // Ровно сценарий бага 1 (HANDOFF §3bv): playAudio() САМА видит isStale()
    // на запасном пути и возвращает {ok:false, reason:'stale'}, ничего не
    // трогая. Внешний `.then()` в playShared() раньше глушил элемент
    // БЕЗУСЛОВНО по isStale(), не глядя на результат — и мог обрубить чужой,
    // реально играющий сейчас звук (трек B).
    const { playShared } = await load()
    const elA = playShared('track-A.mp3') as unknown as FakeAudio
    await Promise.resolve(); await Promise.resolve()   // прямой play() трека A упал

    // ход сменился раньше, чем A догрузился — B использует ТОТ ЖЕ элемент
    const elB = playShared('track-B.mp3') as unknown as FakeAudio
    expect(elA).toBe(elB)   // общий элемент, не два звука разом физически
    await Promise.resolve(); await Promise.resolve()   // прямой play() трека B тоже упал

    // B резолвится и реально начинает играть ПЕРВЫМ
    resolveFetchFor('track-B.mp3', new Blob())
    await Promise.resolve(); await Promise.resolve(); await Promise.resolve()
    expect(elB.paused).toBe(false)
    expect(elB.src.startsWith('blob:')).toBe(true)

    // A (устаревший) резолвится ПОСЛЕ B — playAudio должна увидеть isStale()
    // на запасном пути и вернуть stale, НЕ трогая элемент
    resolveFetchFor('track-A.mp3', new Blob())
    await Promise.resolve(); await Promise.resolve(); await Promise.resolve()

    // B продолжает играть — устаревший A его не поставил на паузу
    expect(elB.paused).toBe(false)
  })

  it('stopShared() без последующего playShared() тоже бампает поколение — повторный вызов не ломается', async () => {
    const { playShared, stopShared } = await load()
    const el = playShared('track.mp3') as unknown as FakeAudio
    await Promise.resolve(); await Promise.resolve()

    stopShared()
    stopShared()   // идемпотентность
    expect(el.paused).toBe(true)

    resolveFetchFor('track.mp3', new Blob())
    await Promise.resolve(); await Promise.resolve(); await Promise.resolve()
    expect(el.paused).toBe(true)
  })

  it('fetch падает (файл реально недоступен) — playAudio не бросает наружу, элемент остаётся тихим', async () => {
    const { playShared } = await load()
    const el = playShared('track.mp3') as unknown as FakeAudio
    await Promise.resolve(); await Promise.resolve()

    rejectFetch(new Error('Failed to fetch'))
    await Promise.resolve(); await Promise.resolve(); await Promise.resolve()
    expect(el.paused).toBe(true)
  })
})
