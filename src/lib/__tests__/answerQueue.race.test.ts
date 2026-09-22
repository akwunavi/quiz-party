// ═══ answerQueue.flush(): read-modify-write гонка (F2, HANDOFF.md §3bu) ═══
// Раньше flush() читал ВСЮ очередь в `q` один раз, отправлял q[0], а после
// успеха писал обратно `q.slice(1)` из УСТАРЕВШЕГО снимка `q`. Если
// параллельно enqueueAnswer() дописал что-то новое в localStorage, пока
// запрос летел по сети (игрок поменял ставку 2→4 прямо во время отправки
// первой ставки), слепой `.slice(1)` затирал эту новую запись обратно.
//
// Проверено вручную (независимая сверка, CLAUDE.md): вернуть
// `q = q.slice(1); write(q)` вместо перечитывания — тест ниже краснеет,
// потому что после флаша команда с новой ставкой (4) в очереди отсутствует
// (перезаписана устаревшим снимком без нового ответа).
import { describe, it, expect, vi, beforeEach } from 'vitest'

const upsertAnswers = vi.fn()
vi.mock('../transport', () => ({ room: { upsertAnswers: (...a: unknown[]) => upsertAnswers(...a) } }))

function localStorageStub() {
  let store: Record<string, string> = {}
  return {
    getItem: (k: string) => store[k] ?? null,
    setItem: (k: string, v: string) => { store[k] = v },
    removeItem: (k: string) => { delete store[k] },
    clear: () => { store = {} },
  }
}

beforeEach(() => {
  vi.resetModules()
  upsertAnswers.mockReset()
  vi.stubGlobal('localStorage', localStorageStub())
})

describe('answerQueue.flush(): не теряет запись, дописанную во время сетевого вызова', () => {
  it('ставка, изменённая ПОКА летит запрос на старую ставку, не пропадает', async () => {
    const { enqueueAnswer, flush } = await import('../answerQueue')

    let resolveFirst: () => void = () => {}
    upsertAnswers
      .mockImplementationOnce(() => new Promise<void>(res => { resolveFirst = res }))
      .mockImplementationOnce(() => Promise.resolve())

    const base = {
      team_id: 't1', game_id: 'g1', question_ref: 'q-race-0', round_number: 0,
    }
    await enqueueAnswer({ ...base, answer_text: '2', stake: null })

    // flush() уже стартовала (enqueueAnswer вызывает `void flush()`) и висит
    // на первом upsertAnswers — команда успевает поменять ставку ДО ответа сети
    await enqueueAnswer({ ...base, answer_text: '4', stake: null })

    resolveFirst()
    // даём обеим цепочкам промисов раскрутиться
    await flush()
    await Promise.resolve(); await Promise.resolve(); await Promise.resolve()

    // Новая ставка (4) должна была уйти ВТОРЫМ вызовом upsertAnswers —
    // без фикса она молча пропадает, и upsertAnswers вызывается только раз
    expect(upsertAnswers).toHaveBeenCalledTimes(2)
    expect(upsertAnswers.mock.calls[0][0][0].answer_text).toBe('2')
    expect(upsertAnswers.mock.calls[1][0][0].answer_text).toBe('4')

    const left = JSON.parse(localStorage.getItem('qp-answer-queue') ?? '[]')
    expect(left).toHaveLength(0)
  })
})
