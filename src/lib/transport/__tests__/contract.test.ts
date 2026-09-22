// ═══ Контрактные тесты supabaseTransport ═══
//
// Мок Supabase здесь — не заглушка «просто чтобы не падало», а маленькая
// in-memory база с настоящей семантикой upsert(onConflict)/eq/in/not: если
// кто-то в будущем поменяет `onConflict` в supabaseTransport.ts на
// «правильный на вид», но не совпадающий с реальным уникальным индексом
// (см. HANDOFF §5, «onConflict обязан совпадать с уникальным индексом в
// базе» — баллы бумаги однажды так не сохранялись НИ РАЗУ), это здесь
// проявится как задвоенная строка вместо одной обновлённой.
import { beforeEach, describe, expect, it, vi } from 'vitest'

type Row = Record<string, unknown>

function makeFakeSupabase() {
  const db: Record<string, Row[]> = {
    teams: [], answers: [],
    game_sessions: [{ id: 'room1', game_id: 'g1', pack_id: null, phase: 'lobby', melody: {}, state_rev: 0 }],
    blitz_state: [], question_shown: [], packs: [{ id: 'pack1', status: 'ready' }],
  }
  // Таблицы, для которых следующий select должен вернуть {data:null,
  // error:{...}} — имитация временного сетевого сбоя (не «строки нет»,
  // а «Supabase ответил ошибкой»), см. тест на readSession/readBlitz ниже.
  const forceErrorOnce = new Set<string>()
  // Эмуляция молчаливого отказа RLS: update физически не находит строк,
  // хотя запись должна была пройти по данным — тот же наблюдаемый эффект,
  // что у настоящей политики доступа Supabase (она не отвечает ошибкой).
  const forceRlsDenyOnce = new Set<string>()
  let idCounter = 1

  function builder(table: string) {
    const filters: Array<(row: Row) => boolean> = []
    let op: 'select' | 'update' | 'upsert' | 'delete' = 'select'
    let payload: Row[] = []
    let single = false
    let maybeSingle = false
    let onConflict: string | undefined
    let countOpt: 'exact' | undefined
    let selectAfterWrite = false

    const api = {
      select(_cols?: string, opts?: { count?: 'exact' }) {
        if (opts?.count) countOpt = opts.count
        if (op === 'update') selectAfterWrite = true
        return api
      },
      eq(col: string, val: unknown) { filters.push(r => r[col] === val); return api },
      in(col: string, vals: unknown[]) { filters.push(r => vals.includes(r[col])); return api },
      not(col: string, _op: string, val: string) {
        const list = val.replace(/^\(|\)$/g, '').split(',').map(s => s.replace(/"/g, ''))
        filters.push(r => !list.includes(r[col] as string))
        return api
      },
      order() { return api },
      abortSignal() { return api },
      single() { single = true; return api },
      maybeSingle() { maybeSingle = true; return api },
      update(p: Row) { op = 'update'; payload = [p]; return api },
      upsert(p: Row | Row[], opts?: { onConflict?: string }) {
        op = 'upsert'; payload = Array.isArray(p) ? p : [p]; onConflict = opts?.onConflict
        return api
      },
      delete() { op = 'delete'; return api },
      then(resolve: (v: unknown) => void, reject?: (e: unknown) => void) {
        try {
          const rows = db[table] ?? (db[table] = [])
          if (op === 'select' && forceErrorOnce.has(table)) {
            forceErrorOnce.delete(table)
            return resolve({ data: null, error: { message: 'simulated network error' } })
          }
          if (op === 'select') {
            const matched = rows.filter(r => filters.every(f => f(r)))
            if (countOpt) return resolve({ data: null, error: null, count: matched.length })
            if (single) {
              return resolve(matched.length
                ? { data: matched[0], error: null }
                : { data: null, error: { message: 'no rows' } })
            }
            if (maybeSingle) return resolve({ data: matched[0] ?? null, error: null })
            return resolve({ data: matched, error: null })
          }
          if (op === 'update') {
            const matched = forceRlsDenyOnce.has(table)
              ? (forceRlsDenyOnce.delete(table), [] as Row[])
              : rows.filter(r => filters.every(f => f(r)))
            // Эмуляция триггера game_sessions_bump_state_rev (миграция 0014):
            // версия растёт только если строка РЕАЛЬНО изменилась.
            matched.forEach(r => {
              if (table === 'game_sessions') {
                const before = JSON.stringify({ ...r, state_rev: undefined })
                Object.assign(r, payload[0])
                const after = JSON.stringify({ ...r, state_rev: undefined })
                if (after !== before) r.state_rev = (Number(r.state_rev) || 0) + 1
              } else {
                Object.assign(r, payload[0])
              }
            })
            if (selectAfterWrite) return resolve({ data: matched, error: null })
            return resolve({ data: null, error: null })
          }
          if (op === 'upsert') {
            const keys = (onConflict ?? 'id').split(',')
            let last: Row | undefined
            for (const row of payload) {
              const existing = rows.find(r => keys.every(k => r[k] === row[k]))
              if (existing) { Object.assign(existing, row); last = existing } else {
                const created = { id: `id-${idCounter++}`, ...row }
                rows.push(created); last = created
              }
            }
            if (single) return resolve({ data: last, error: null })
            return resolve({ data: null, error: null })
          }
          if (op === 'delete') {
            db[table] = rows.filter(r => !filters.every(f => f(r)))
            return resolve({ data: null, error: null })
          }
          return resolve({ data: null, error: null })
        } catch (e) {
          return reject ? reject(e) : resolve({ data: null, error: e })
        }
      },
    }
    return api
  }

  return { db, client: { from: (table: string) => builder(table) }, forceErrorOnce, forceRlsDenyOnce }
}

const fake = makeFakeSupabase()
vi.mock('../../supabase', () => ({ supabase: fake.client }))

const { supabaseTransport } = await import('../supabaseTransport')

describe('supabaseTransport: контракт', () => {
  beforeEach(() => {
    fake.db.teams = []
    fake.db.answers = []
    fake.db.game_sessions = [{ id: 'room1', game_id: 'g1', pack_id: null, phase: 'lobby', melody: {}, state_rev: 0 }]
    fake.db.blitz_state = []
    fake.db.question_shown = []
    fake.db.packs = [{ id: 'pack1', status: 'ready' }]
  })

  it('сценарий: команда → 3 ответа → патч вердикта → патч сессии → чтение', async () => {
    const team = await supabaseTransport.upsertTeam({
      name: 'Синие', color: '#123', game_id: 'g1', last_seen_at: null,
    })
    expect(team.name).toBe('Синие')

    await supabaseTransport.upsertAnswers([
      { team_id: team.id, game_id: 'g1', question_ref: 'q-1', round_number: 0, answer_text: 'a', updated_at: 't1' },
      { team_id: team.id, game_id: 'g1', question_ref: 'q-2', round_number: 0, answer_text: 'b', updated_at: 't1' },
      { team_id: team.id, game_id: 'g1', question_ref: 'q-3', round_number: 0, answer_text: 'c', updated_at: 't1' },
    ])
    const before = await supabaseTransport.listAnswers('g1', 0)
    expect(before).toHaveLength(3)

    const target = before.find(a => a.question_ref === 'q-2')!
    await supabaseTransport.patchAnswer(target.id, { is_correct: true, stake: 2 })

    await supabaseTransport.patchSession('room1', { phase: 'show_answers', reveal: true })

    const answers = await supabaseTransport.listAnswers('g1', 0)
    const graded = answers.find(a => a.question_ref === 'q-2')
    expect(graded?.is_correct).toBe(true)
    expect(graded?.stake).toBe(2)

    const session = await supabaseTransport.readSession('room1')
    expect(session?.phase).toBe('show_answers')
    expect(session?.reveal).toBe(true)
  })

  it('upsertTeam: onConflict "name" — повторная регистрация обновляет строку, не плодит вторую', async () => {
    const first = await supabaseTransport.upsertTeam({
      name: 'Красные', color: '#f00', game_id: 'g1', last_seen_at: null,
    })
    const second = await supabaseTransport.upsertTeam({
      name: 'Красные', color: '#f00', game_id: 'g1', last_seen_at: '2026-01-01',
    })
    expect(second.id).toBe(first.id)
    expect((await supabaseTransport.listTeams('g1'))).toHaveLength(1)
  })

  it('upsertAnswers: onConflict "team_id,question_ref" — без game_id, как в реальном индексе '
    + '(см. HANDOFF §5)', async () => {
    await supabaseTransport.upsertAnswers([
      { team_id: 't1', game_id: 'g1', question_ref: 'q-1', round_number: 0, answer_text: 'a', updated_at: 't1' },
    ])
    // тот же team_id+question_ref, ДРУГОЙ game_id — по реальному индексу это
    // тот же ряд (он не включает game_id), апдейт должен ЗАМЕНИТЬ строку,
    // а не создать вторую
    await supabaseTransport.upsertAnswers([
      { team_id: 't1', game_id: 'g2', question_ref: 'q-1', round_number: 0, answer_text: 'b', updated_at: 't2' },
    ])
    expect(fake.db.answers).toHaveLength(1)
    expect(fake.db.answers[0].answer_text).toBe('b')
  })

  it('writeBlitz/readBlitz: onConflict "game_id,round_number"', async () => {
    const state = { order: ['t1'], turn: 0, left: {}, correct: {}, missed: {}, used: [], current: null, finished: false }
    await supabaseTransport.writeBlitz('g1', 2, state)
    const read = await supabaseTransport.readBlitz('g1', 2)
    expect(read?.order).toEqual(['t1'])
    expect(fake.db.blitz_state).toHaveLength(1)
  })

  it('markQuestionShown: onConflict "game_id,question_ref", ошибка не бросается наружу', async () => {
    await expect(supabaseTransport.markQuestionShown({
      gameId: 'g1', roundNumber: 0, questionRef: 'q-1', shownAt: 't1',
    })).resolves.toBeUndefined()
    expect(fake.db.question_shown).toHaveLength(1)
  })

  it('deleteAnswers({game_id}) возвращает число ОСТАВШИХСЯ строк (resetGameHard так ловит RLS)', async () => {
    await supabaseTransport.upsertAnswers([
      { team_id: 't1', game_id: 'g1', question_ref: 'q-1', round_number: 0, answer_text: 'a', updated_at: 't1' },
    ])
    const left = await supabaseTransport.deleteAnswers({ game_id: 'g1' })
    expect(left).toBe(0)
    expect(fake.db.answers).toHaveLength(0)
  })

  it('setPackStatus меняет только status у указанного пакета', async () => {
    await supabaseTransport.setPackStatus('pack1', 'active')
    expect(fake.db.packs[0].status).toBe('active')
  })

  it('readSession(null) не ходит в сеть и отдаёт null', async () => {
    expect(await supabaseTransport.readSession(null)).toBeNull()
  })

  // 9.20: временный сбой сети ({data:null, error:{...}}) раньше был
  // неотличим от «комнаты не существует» — readSession молча отдавал null,
  // поллинг (useGameState) обнулял gameState, HostScreen рисовал
  // «Загрузка…» и размонтировал текущую фазу целиком (перезапуск музыки/
  // таймера) без всякого реального обрыва игры. Должен бросать — тогда
  // pollLoop просто пропускает тик и оставляет прежний gameState.
  it('readSession: ошибка сети бросается наружу, а не превращается в null', async () => {
    fake.forceErrorOnce.add('game_sessions')
    await expect(supabaseTransport.readSession('room1')).rejects.toBeTruthy()
  })

  it('readBlitz: ошибка сети бросается наружу, а не превращается в null', async () => {
    fake.forceErrorOnce.add('blitz_state')
    await expect(supabaseTransport.readBlitz('g1', 2)).rejects.toBeTruthy()
  })

  // ═══ casSession (9.60, миграция 0014) ═══
  describe('casSession', () => {
    it('успешная запись — версия растёт на 1', async () => {
      const r = await supabaseTransport.casSession('room1', 0, { phase: 'question' })
      expect(r).toEqual({ ok: true, stateRev: 1 })
      expect(fake.db.game_sessions[0].phase).toBe('question')
    })

    it('несовпадение версии — {ok:false} со свежим current', async () => {
      await supabaseTransport.casSession('room1', 0, { phase: 'question' }) // версия теперь 1
      const r = await supabaseTransport.casSession('room1', 0, { phase: 'show_answers' })
      expect(r.ok).toBe(false)
      if (!r.ok) {
        expect(r.current?.phase).toBe('question')
        expect(r.current?.state_rev).toBe(1)
      }
    })

    it('0 строк при СОВПАДАЮЩЕЙ версии (эмуляция молчаливого отказа RLS) — бросает ошибку', async () => {
      fake.forceRlsDenyOnce.add('game_sessions')
      await expect(supabaseTransport.casSession('room1', 0, { phase: 'x' }))
        .rejects.toThrow(/прав на комнату/)
    })

    it('повторная запись ТЕХ ЖЕ данных melody не поднимает версию', async () => {
      await supabaseTransport.casSession('room1', 0, { melody: { stage: 'bidding' } })
      const afterFirst = fake.db.game_sessions[0].state_rev
      // тот же контент — но CAS требует АКТУАЛЬНУЮ версию, а не "любую"
      const r = await supabaseTransport.casSession('room1', afterFirst as number, { melody: { stage: 'bidding' } })
      // is distinct from не даёт версии вырасти — но CAS-условие state_rev=X
      // всё ещё совпадает (та же старая версия), 1 строка находится и
      // обновляется без изменений => сервер возвращает ту же версию
      expect(r).toEqual({ ok: true, stateRev: afterFirst })
    })
  })
})
