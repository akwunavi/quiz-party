// ═══ sessionBag.updateMelodyBag: CAS-цикл read-modify-write-retry ═══
// (9.61, HANDOFF §3bw)
//
// Фейковое хранилище ниже — НЕ копия lib/sessionBag.ts или транспорта, а
// независимая эмуляция настоящей CAS-семантики (свой счётчик версий, растёт
// только на реальное изменение, как настоящий триггер БД из миграции 0014).
// Сценарии сформулированы СЛОВАМИ по правилам игры, а не списаны с кода
// updateMelodyBag — иначе тест сравнивал бы реализацию саму с собой
// (CLAUDE.md, раздел 5, «сверка должна быть независимой»).
import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { GameState, MelodyState } from '../../types/quiz'
import type { CasResult, SessionPatch } from '../transport/types'

vi.mock('../room', () => ({ getRoomId: () => 'room1' }))

function makeFakeRoom() {
  let session: GameState = {
    id: 1, game_id: 'g1', pack_id: null, phase: 'question', round_number: 1,
    question_index: 0, timer_started_at: null, reveal: false, completed_rounds: [],
    updated_at: 't0', melody: {}, state_rev: 0,
  }

  function applyRealChange(patch: SessionPatch) {
    const before = JSON.stringify({ ...session, state_rev: undefined, updated_at: undefined })
    session = { ...session, ...patch } as GameState
    const after = JSON.stringify({ ...session, state_rev: undefined, updated_at: undefined })
    if (after !== before) session.state_rev = (session.state_rev ?? 0) + 1
  }

  return {
    getSnapshot: () => session,
    setSnapshot: (s: GameState) => { session = s },
    async readSession(): Promise<GameState | null> { return { ...session } },
    async patchSession(_roomId: string | null, patch: SessionPatch): Promise<void> {
      applyRealChange(patch)
    },
    async casSession(_roomId: string | null, expectedRev: number, patch: SessionPatch): Promise<CasResult> {
      if (session.state_rev !== expectedRev) return { ok: false, current: { ...session } }
      applyRealChange(patch)
      return { ok: true, stateRev: session.state_rev as number }
    },
  }
}

const fakeRoom = makeFakeRoom()
vi.mock('../transport', () => ({ get room() { return fakeRoom } }))

describe('sessionBag: updateMelodyBag', () => {
  beforeEach(() => {
    fakeRoom.setSnapshot({
      id: 1, game_id: 'g1', pack_id: null, phase: 'question', round_number: 1,
      question_index: 0, timer_started_at: null, reveal: false, completed_rounds: [],
      updated_at: 't0', melody: {}, state_rev: 0,
    })
  })

  // S1: проектор уходит из listen в bidding по дедлайну, пульт ОДНОВРЕМЕННО
  // жмёт аварийное «закрыть» — оба прочитали ОДНУ версию до записи. Ни в
  // каком порядке применения закрытие не должно теряться/откатываться.
  //
  // 9.62 (ревью, HANDOFF §3bx, находка 5): раньше здесь была своя копия
  // условия «закрыть», проверявшая НЕ ТО, что реально стоит в боевом коде
  // (MelodyRound.tsx/AdminPage.tsx требовали точного совпадения СТАДИИ на
  // момент клика, а не просто «любая активная стадия того же трека») —
  // тест проходил, хотя реальный код упал бы на этом же сценарии.
  // Импортируем melodyEmergencyClose напрямую из lib/melody.ts, чтобы
  // тест проверял РЕАЛЬНУЮ функцию условия, а не свою копию.
  it('S1: "закрыть" ведущего никогда не откатывается автопереходом — оба порядка', async () => {
    const { updateMelodyBag } = await import('../sessionBag')
    const { melodyEmergencyClose } = await import('../melody')

    for (const order of ['close-then-advance', 'advance-then-close'] as const) {
      fakeRoom.setSnapshot({
        id: 1, game_id: 'g1', pack_id: null, phase: 'question', round_number: 1,
        question_index: 0, timer_started_at: null, reveal: false, completed_rounds: [],
        updated_at: 't0', melody: { key: '0-0', stage: 'listen' }, state_rev: 0,
      })
      const base = await fakeRoom.readSession() // оба экрана читают ОДНУ версию

      const closeFn = melodyEmergencyClose('0-0')
      const advanceFn = (cur: MelodyState) => (
        cur.key === '0-0' && cur.stage === 'listen'
          ? { ...cur, stage: 'bidding' as const }
          : null
      )

      if (order === 'close-then-advance') {
        await updateMelodyBag(base, closeFn)
        await updateMelodyBag(base, advanceFn)
      } else {
        await updateMelodyBag(base, advanceFn)
        await updateMelodyBag(base, closeFn)
      }

      const final = fakeRoom.getSnapshot()
      expect(final.melody?.stage).toBe('done')
      expect(final.melody?.played).toEqual(['0-0'])
    }
  })

  // S1b (ревью финального прогона, HANDOFF §3bx, новая находка после
  // фикса находки 5): аварийное «закрыть» на проекторе висит в confirm(),
  // пока пульт успевает засчитать «✓ Верно» — стадия уходит в reveal,
  // баллы уже записаны. melodyIdle() не считает reveal неактивной стадией,
  // поэтому голое «cur.key===key && !melodyIdle(cur)» СНОСИЛО БЫ reveal
  // обратно на done — зал не увидит экран разбора, хотя очки останутся.
  // melodyEmergencyClose обязана НЕ трогать reveal.
  it('S1b: аварийное "закрыть" не сносит уже показанный reveal', async () => {
    const { updateMelodyBag } = await import('../sessionBag')
    const { melodyEmergencyClose } = await import('../melody')
    fakeRoom.setSnapshot({
      id: 1, game_id: 'g1', pack_id: null, phase: 'question', round_number: 1,
      question_index: 0, timer_started_at: null, reveal: false, completed_rounds: [],
      updated_at: 't0',
      melody: { key: '0-0', stage: 'reveal', wonPts: 2, wonTeam: 'a' },
      state_rev: 0,
    })
    const base = await fakeRoom.readSession()

    const result = await updateMelodyBag(base, melodyEmergencyClose('0-0'))

    expect(result.status).toBe('skipped')
    const final = fakeRoom.getSnapshot()
    expect(final.melody?.stage).toBe('reveal')
    expect(final.melody?.wonPts).toBe(2)
  })

  // S2: пересборка order из опоздавших ставок (эффект на любом экране)
  // ПРОТИВ клика «Играем N сек» — не важно, с проектора или с пульта:
  // стадия никогда не должна откатиться snippet → bids.
  it('S2: пересборка order не откатывает snippet → bids, с любого экрана', async () => {
    const { updateMelodyBag } = await import('../sessionBag')
    fakeRoom.setSnapshot({
      id: 1, game_id: 'g1', pack_id: null, phase: 'question', round_number: 1,
      question_index: 0, timer_started_at: null, reveal: false, completed_rounds: [],
      updated_at: 't0', melody: { key: '0-0', stage: 'bids', order: ['a', 'b'], turn: 0 }, state_rev: 0,
    })
    const base = await fakeRoom.readSession()

    // клик "играем N сек" (с ПУЛЬТА) применяется первым
    await updateMelodyBag(base, cur => (
      cur.key === '0-0' && cur.stage === 'bids' ? { ...cur, stage: 'snippet' as const, snippetSec: 5 } : null
    ))

    // устаревшая пересборка order (эффект, читавший старый снимок) приходит следом
    await updateMelodyBag(base, cur => (
      cur.key === '0-0' && cur.stage === 'bids' ? { ...cur, order: ['b', 'a'], turn: 0 } : null
    ))

    expect(fakeRoom.getSnapshot().melody?.stage).toBe('snippet')
  })

  // S3: ответ ведущего "потерялся" в сети — casSession реально применил
  // запись на сервере, но клиент решил, что сеть подвела, и повторил.
  it('S3: повторный вызов после уже применённой записи не задваивает эффект', async () => {
    const { updateMelodyBag } = await import('../sessionBag')
    fakeRoom.setSnapshot({
      id: 1, game_id: 'g1', pack_id: null, phase: 'question', round_number: 1,
      question_index: 0, timer_started_at: null, reveal: false, completed_rounds: [],
      updated_at: 't0', melody: { key: '0-0', stage: 'answering', wonPts: 0 }, state_rev: 0,
    })
    const base = await fakeRoom.readSession()
    const fn = (cur: MelodyState) => (
      cur.key === '0-0' && cur.stage === 'answering'
        ? { ...cur, stage: 'reveal' as const, wonPts: (cur.wonPts ?? 0) + 2 }
        : null
    )

    const r1 = await updateMelodyBag(base, fn)
    expect(r1.status).toBe('written')
    expect(fakeRoom.getSnapshot().melody?.wonPts).toBe(2)

    // "повтор" — клиент передаёт тот же устаревший base (не перечитал)
    const r2 = await updateMelodyBag(base, fn)
    expect(r2.status).toBe('skipped')
    expect(fakeRoom.getSnapshot().melody?.wonPts).toBe(2) // не задвоилось
  })

  // S4: без state_rev в GameState (миграция не прогнана) — casSession вообще
  // не вызывается, используется обычный patchSession.
  it('S4: casEnabled=false → используется patchSession, casSession не вызывается', async () => {
    const { updateMelodyBag } = await import('../sessionBag')
    const spy = vi.spyOn(fakeRoom, 'casSession')
    const noRevSnapshot = { ...fakeRoom.getSnapshot() }
    delete (noRevSnapshot as { state_rev?: number }).state_rev

    const r = await updateMelodyBag(noRevSnapshot, cur => ({ ...cur, stage: 'bidding' as const }))
    expect(r.status).toBe('written')
    expect(spy).not.toHaveBeenCalled()
    spy.mockRestore()
  })

  // S5: три подряд неудачных попытки (постоянный конфликт версий).
  it('S5: постоянный конфликт версий → {status: "conflict"} после maxAttempts', async () => {
    const { updateMelodyBag } = await import('../sessionBag')
    const base = await fakeRoom.readSession()
    // после КАЖДОЙ попытки чтения кто-то извне двигает версию дальше —
    // условие в fn продолжает совпадать (ключ/стадия те же), но CAS не
    // проходит, потому что реальная версия уже другая на каждом шаге
    let calls = 0
    const spy = vi.spyOn(fakeRoom, 'casSession').mockImplementation(async () => {
      calls++
      return { ok: false, current: { ...fakeRoom.getSnapshot(), state_rev: 999 + calls } }
    })

    const r = await updateMelodyBag(base, cur => ({ ...cur, stage: 'bidding' as const }))
    expect(r.status).toBe('conflict')
    expect(calls).toBe(3)
    spy.mockRestore()
  })

  // S6 (ревью 9.62, HANDOFF §3bx, находка 2): без state_rev (миграция не
  // прогнана) — устаревший `base` НЕ используется напрямую, ПЕРЕД записью
  // перечитывается свежая сессия. Раньше `fn` считалась на голом `base` —
  // снимке из замыкания эффекта, который мог отстать от реальности сколь
  // угодно (пока эффект ждал сети/таймера), и решение принималось по
  // устаревшим данным, как будто CAS вообще нет.
  it('S6 (без CAS): перечитывает СВЕЖУЮ сессию перед записью, не доверяет устаревшему base', async () => {
    const { updateMelodyBag } = await import('../sessionBag')
    // реальное (свежее) состояние в базе: ведущий уже закрыл трек
    fakeRoom.setSnapshot({
      id: 1, game_id: 'g1', pack_id: null, phase: 'question', round_number: 1,
      question_index: 0, timer_started_at: null, reveal: false, completed_rounds: [],
      updated_at: 't1', melody: { key: '0-0', stage: 'done' },
      // без state_rev — миграция не прогнана
    })
    // устаревший base — снимок из давнего замыкания эффекта на клиенте,
    // ещё думающий, что трек в стадии listen
    const staleBase = {
      id: 1, game_id: 'g1', pack_id: null, phase: 'question', round_number: 1,
      question_index: 0, timer_started_at: null, reveal: false, completed_rounds: [],
      updated_at: 't0', melody: { key: '0-0', stage: 'listen' },
    } as GameState

    const r = await updateMelodyBag(staleBase, cur => (
      cur.stage === 'listen' ? { ...cur, stage: 'bidding' as const } : null
    ))

    // на СВЕЖЕМ состоянии (stage: 'done') условие не совпадает — не пишем
    expect(r.status).toBe('skipped')
    // и уж точно не откатываем закрытый трек обратно в bidding
    expect(fakeRoom.getSnapshot().melody?.stage).toBe('done')
  })

  it('melodyClick при skipped/conflict бросает понятную ошибку (Р2)', async () => {
    const { melodyClick } = await import('../melodyActions')
    fakeRoom.setSnapshot({
      id: 1, game_id: 'g1', pack_id: null, phase: 'question', round_number: 1,
      question_index: 0, timer_started_at: null, reveal: false, completed_rounds: [],
      updated_at: 't0', melody: { key: '0-0', stage: 'done' }, state_rev: 0,
    })
    const gs = fakeRoom.getSnapshot()
    await expect(melodyClick(gs, cur => (
      cur.stage === 'bids' ? { ...cur, stage: 'snippet' as const } : null
    ))).rejects.toThrow(/устарела/)
  })
})
