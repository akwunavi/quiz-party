// ═══ Тесты localTransport (RoomTransport поверх локального сервера бара) ═══
//
// По аналогии с contract.test.ts (шаг 4): тот же сценарий команда → ответы
// → патч → чтение, но против localTransport с мок-`fetch` — реальный
// http-сервер здесь не поднимаем (это сделано отдельно в
// local-server/server.test.mjs), интересует именно клиентская сторона:
// правильные пути/методы, ретрай на сетевую ошибку, разбор 204.
import { beforeEach, describe, expect, it, vi } from 'vitest'

type Row = Record<string, unknown>

/** Маленький in-memory «сервер» с той же семантикой, что и настоящий
 *  local-server/server.mjs (upsert по ключу, rev, 204 на неизменившийся
 *  since) — достаточно для проверки клиента, не дублируя весь server.mjs. */
function makeFakeServer() {
  let rev = 0
  let session: Row = { id: 1, phase: 'lobby', melody: {}, state_rev: 0 }
  let teams: Row[] = []
  let answers: Row[] = []
  let idCounter = 1

  function bump() { rev++ }
  function stripForDiff(s: Row) { const { updated_at, state_rev, ...rest } = s; return JSON.stringify(rest) }

  async function handle(url: string, init?: RequestInit): Promise<Response> {
    const u = new URL(url, 'http://local')
    const method = init?.method ?? 'GET'
    const body = init?.body ? JSON.parse(String(init.body)) : undefined

    if (u.pathname === '/api/session' && method === 'GET') {
      const since = Number(u.searchParams.get('since'))
      if (since === rev) return new Response(null, { status: 204 })
      return new Response(JSON.stringify(session), { status: 200, headers: { 'X-Rev': String(rev) } })
    }
    if (u.pathname === '/api/session' && method === 'PATCH') {
      const ifStateRevRaw = u.searchParams.get('ifStateRev')
      const ifStateRev = ifStateRevRaw == null ? null : Number(ifStateRevRaw)
      if (ifStateRev != null && ifStateRev !== session.state_rev) {
        return new Response(JSON.stringify({ error: 'conflict', session }), { status: 412 })
      }
      const before = stripForDiff(session)
      for (const [k, v] of Object.entries(body ?? {})) {
        if (k === 'state_rev') continue
        session[k] = v      // полная замена — тот же контракт, что у облака (9.60)
      }
      session.updated_at = new Date().toISOString()
      if (stripForDiff(session) !== before) session.state_rev = (Number(session.state_rev) || 0) + 1
      bump()
      return new Response(JSON.stringify({ ok: true, state_rev: session.state_rev }), { status: 200 })
    }
    if (u.pathname === '/api/teams' && method === 'GET') {
      return new Response(JSON.stringify(teams), { status: 200 })
    }
    if (u.pathname === '/api/teams' && method === 'POST') {
      const existing = teams.find(t => t.name === body.name)
      const team = existing ? Object.assign(existing, body) : { id: `id-${idCounter++}`, ...body }
      if (!existing) teams.push(team)
      bump()
      return new Response(JSON.stringify(team), { status: 200 })
    }
    if (u.pathname === '/api/answers' && method === 'GET') {
      const since = Number(u.searchParams.get('since'))
      if (since === rev) return new Response(null, { status: 204 })
      const round = u.searchParams.get('round')
      const rows = round == null ? answers : answers.filter(a => String(a.round_number) === round)
      return new Response(JSON.stringify(rows), { status: 200, headers: { 'X-Rev': String(rev) } })
    }
    if (u.pathname === '/api/answers' && method === 'POST') {
      for (const row of body as Row[]) {
        const existing = answers.find(a => a.team_id === row.team_id && a.question_ref === row.question_ref)
        if (existing) Object.assign(existing, row)
        else answers.push({ id: `id-${idCounter++}`, ...row })
      }
      bump()
      return new Response(JSON.stringify({ ok: true }), { status: 200 })
    }
    const idMatch = /^\/api\/answers\/([^/]+)$/.exec(u.pathname)
    if (idMatch && method === 'PATCH') {
      const found = answers.find(a => a.id === idMatch[1])
      if (!found) return new Response(JSON.stringify({ error: 'нет' }), { status: 404 })
      Object.assign(found, body)
      bump()
      return new Response(JSON.stringify(found), { status: 200 })
    }
    return new Response(JSON.stringify({ error: 'нет такого пути' }), { status: 404 })
  }

  return {
    handle,
    reset() { rev = 0; session = { id: 1, phase: 'lobby', melody: {}, state_rev: 0 }; teams = []; answers = [] },
  }
}

const fakeServer = makeFakeServer()

beforeEach(() => {
  fakeServer.reset()
  vi.stubGlobal('fetch', vi.fn((url: string, init?: RequestInit) => fakeServer.handle(url, init)))
})

const { localTransport } = await import('../localTransport')

describe('localTransport: контракт', () => {
  it('сценарий: команда → 2 ответа → патч → патч сессии → чтение', async () => {
    const team = await localTransport.upsertTeam({ name: 'Синие', color: '#123', game_id: 'g1', last_seen_at: null })
    expect(team.name).toBe('Синие')

    await localTransport.upsertAnswers([
      { team_id: team.id, game_id: 'g1', question_ref: 'q-1', round_number: 0, answer_text: 'a', updated_at: 't1' },
      { team_id: team.id, game_id: 'g1', question_ref: 'q-2', round_number: 0, answer_text: 'b', updated_at: 't1' },
    ])
    const before = await localTransport.listAnswers('g1', 0)
    expect(before).toHaveLength(2)

    const target = before.find(a => a.question_ref === 'q-2')!
    await localTransport.patchAnswer(target.id, { is_correct: true, stake: 2 })

    await localTransport.patchSession('room1', { phase: 'show_answers', reveal: true })

    const answers = await localTransport.listAnswers('g1', 0)
    const graded = answers.find(a => a.question_ref === 'q-2')
    expect(graded?.is_correct).toBe(true)

    const session = await localTransport.readSession('room1')
    expect(session?.phase).toBe('show_answers')
  })

  it('upsertTeam: повторная регистрация тем же именем не плодит вторую команду', async () => {
    const first = await localTransport.upsertTeam({ name: 'Красные', color: '#f00', game_id: 'g1', last_seen_at: null })
    const second = await localTransport.upsertTeam({ name: 'Красные', color: '#f00', game_id: 'g1', last_seen_at: '2026-01-01' })
    expect(second.id).toBe(first.id)
    expect(await localTransport.listTeams('g1')).toHaveLength(1)
  })

  it('PATCH session: melody заменяется ЦЕЛИКОМ (Р1, 9.60) — второй патч стирает первый', async () => {
    await localTransport.patchSession('room1', { melody: { stage: 'idle', turn: 0 } })
    await localTransport.patchSession('room1', { melody: { jp: { tile: 3 } } })
    const session = await localTransport.readSession('room1')
    expect((session as unknown as { melody: Record<string, unknown> }).melody).toEqual({ jp: { tile: 3 } })
  })
})

describe('localTransport: casSession (9.60)', () => {
  it('успешная запись растит state_rev', async () => {
    const r = await localTransport.casSession('room1', 0, { phase: 'question' })
    expect(r).toEqual({ ok: true, stateRev: 1 })
  })

  it('несовпадение версии — {ok:false} с текущей сессией из тела 412', async () => {
    await localTransport.casSession('room1', 0, { phase: 'question' })
    const r = await localTransport.casSession('room1', 0, { phase: 'show_answers' })
    expect(r.ok).toBe(false)
    if (!r.ok) expect((r.current as unknown as { phase: string })?.phase).toBe('question')
  })
})

describe('localTransport: сеть', () => {
  it('таймаут/сетевая ошибка: один ретрай, второй успех — не бросает', async () => {
    let calls = 0
    vi.stubGlobal('fetch', vi.fn(() => {
      calls++
      if (calls === 1) return Promise.reject(new TypeError('failed to fetch'))
      return fakeServer.handle('/api/teams', { method: 'GET' })
    }))
    const teams = await localTransport.listTeams('g1')
    expect(teams).toEqual([])
    expect(calls).toBe(2)
  })

  it('сетевая ошибка ДВА раза подряд — бросает после одного ретрая, не зависает', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new TypeError('failed to fetch'))))
    await expect(localTransport.listTeams('g1')).rejects.toThrow()
  })
})
