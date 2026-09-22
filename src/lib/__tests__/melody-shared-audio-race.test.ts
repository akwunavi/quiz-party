// ═══ КРИТИЧНЫЙ БАГ (после 9.54): звук «Угадай мелодию» сам стартовал во
// время стадии bidding ═══
// Трасса до фикса:
//   1) стадия listen → playShared() зовёт playAudio(el, url) — fire-and-forget
//      (`void playAudio(...)`, БЕЗ единого `.then()`).
//   2) playAudio() внутри себя падает на прямом запросе (см. audioSource.ts,
//      «Request had a target IP address space of `unknown`» — типично при
//      VPN/прокси), уходит в ЗАПАСНОЙ путь: fetch() файла целиком в память
//      (`toBlobUrl`) — может занять несколько секунд.
//   3) звук не пошёл вовремя → guard-таймер эффекта listen (4000мс) сам
//      переводит стадию в bidding и вызывает a.pause() — но пауза НИЧЕГО
//      не останавливает: играть ещё нечему, fetch ещё не завершился.
//   4) fetch наконец завершается — уже ВО ВРЕМЯ bidding — playAudio()
//      внутри себя ставит el.src = blobUrl и САМ зовёт el.play() ВТОРОЙ
//      раз. Эффект listen уже размонтирован, его защитный a.pause() в
//      cleanup сработал РАНЬШЕ и бессилен против play(), который стартует
//      ПОЗЖЕ него. Трек играет сам, без единого клика ведущего.
//
// Фикс — счётчик поколений (тот же паттерн, что у playSynced в
// audioSource.ts): playShared() запоминает своё поколение, а после
// разрешения playAudio() проверяет — если поколение уже не текущее
// (началось новое воспроизведение ИЛИ вызвали stopShared()), запускает
// pause() СРАЗУ, не дожидаясь, пока чужой play() кому-то помешает.
//
// Ниже — тот же паттерн в изоляции (без DOM/React, которые тянет
// MelodyRound.tsx): маленькая тестируемая копия playShared/stopShared с
// моком playAudio, чей промис разрешается С ЗАДЕРЖКОЙ — ровно так, как
// ведёт себя запасной путь через fetch.
import { describe, expect, it, vi } from 'vitest'

type FakeEl = { paused: boolean; pause: () => void }

function makeSharedAudio(playAudio: (el: FakeEl, url: string) => Promise<void>) {
  let el: FakeEl | null = null
  let gen = 0

  function playShared(_url: string): FakeEl {
    if (!el) el = { paused: true, pause() { this.paused = true } }
    const current = el
    gen++
    const my = gen
    current.paused = false
    void playAudio(current, _url).then(() => {
      if (my !== gen) current.pause()   // фикс: догнавшее воспроизведение глушим сразу
    })
    return current
  }

  function stopShared() {
    gen++                                // бампаем ДАЖЕ если новое не стартует следом
    if (el) el.pause()
  }

  return { playShared, stopShared, getEl: () => el }
}

describe('MelodyRound: playShared не даёт догнавшему play() запустить звук в чужой стадии', () => {
  it('запасной путь, разрешившийся ПОСЛЕ stopShared(), не оставляет трек играющим', async () => {
    vi.useFakeTimers()
    // playAudio ведёт себя как запасной путь через fetch: резолвится не сразу
    const playAudio = (el: FakeEl) => new Promise<void>(resolve => {
      setTimeout(() => { el.paused = false; resolve() }, 3000)
    })
    const { playShared, stopShared, getEl } = makeSharedAudio(playAudio)

    // стадия listen: запустили трек
    const el = playShared('track.mp3')
    expect(el.paused).toBe(false)

    // guard 4000мс сработал РАНЬШЕ, чем резолвится fetch (3000 < 4000, но по
    // сюжету бага стадия уводится ДО реального старта звука) — ведущий/guard
    // переводит стадию в bidding и глушит канал
    stopShared()
    expect(getEl()!.paused).toBe(true)

    // проходит время — playAudio наконец резолвится и запускает play() сам
    await vi.advanceTimersByTimeAsync(3000)

    // без фикса el.paused стало бы false здесь (звук играет сам в bidding).
    // с фиксом — .then() увидел устаревшее поколение и погасил его сразу
    expect(getEl()!.paused).toBe(true)
    vi.useRealTimers()
  })

  it('новый playShared() ДО того, как старый догрузился, тоже гасит старый, а не оставляет два трека разом', async () => {
    vi.useFakeTimers()
    let resolveFirst: () => void = () => {}
    const playAudio = vi.fn()
      .mockImplementationOnce((el: FakeEl) => new Promise<void>(resolve => {
        resolveFirst = () => { el.paused = false; resolve() }
      }))
      .mockImplementationOnce((el: FakeEl) => { el.paused = false; return Promise.resolve() })

    const { playShared, getEl } = makeSharedAudio(playAudio)

    playShared('track-A.mp3')             // стадия listen для трека A — ещё грузится
    playShared('track-B.mp3')             // ход сменился раньше, чем A догрузился

    // A наконец резолвится ПОСЛЕ того, как стартовал B — реальный playAudio
    // к этому моменту УЖЕ успел поставить el.src на трек A и вызвать play()
    // (это и есть баг — общий элемент захвачен чужим поздним воспроизведением
    // поверх B), но фикс тут же гасит его в .then(), не давая треку A звучать
    resolveFirst()
    await vi.advanceTimersByTimeAsync(0)

    // без фикса тут осталось бы играть A (paused=false) поверх B — молча,
    // без единого клика ведущего. С фиксом элемент гарантированно заглушен:
    // да, ценой тишины вместо B (тот же компромисс, что уже принят у
    // playSynced в audioSource.ts), но НЕ играет чужой трек без спроса
    expect(getEl()!.paused).toBe(true)
    vi.useRealTimers()
  })

  it('stopShared() без последующего playShared() тоже бампает поколение (переход «нет ответа → ход дальше»)', async () => {
    vi.useFakeTimers()
    const playAudio = (el: FakeEl) => new Promise<void>(resolve => {
      setTimeout(() => { el.paused = false; resolve() }, 1000)
    })
    const { playShared, stopShared, getEl } = makeSharedAudio(playAudio)

    playShared('track.mp3')
    stopShared()   // просто остановили — например, «ответа нет, ход дальше»
    stopShared()   // повторный вызов не должен ломаться (идемпотентность)

    await vi.advanceTimersByTimeAsync(1000)
    expect(getEl()!.paused).toBe(true)
    vi.useRealTimers()
  })
})
