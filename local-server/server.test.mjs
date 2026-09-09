// ═══ Тесты локального сервера бара (Part B офлайн-устойчивости) ═══
//
// Прогоняет реальный http.createServer на эфемерном порту (`listen(0)`) —
// не мок, настоящий сетевой цикл Node. Данные — во временной папке
// scratch-каталога, вычищаемой после каждого теста.
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { createServer } from './server.mjs'

let server
let baseUrl
let dataDir
let appDir

beforeEach(async () => {
  dataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'qp-local-data-'))
  appDir = fs.mkdtempSync(path.join(os.tmpdir(), 'qp-local-app-'))
  fs.writeFileSync(path.join(appDir, 'index.html'), '<html><head><title>t</title></head><body>app</body></html>')
  const created = createServer({ dataDir, appDir })
  server = created.server
  await new Promise(resolve => server.listen(0, resolve))
  const { port } = server.address()
  baseUrl = `http://127.0.0.1:${port}`
})

afterEach(async () => {
  await new Promise(resolve => server.close(resolve))
  fs.rmSync(dataDir, { recursive: true, force: true })
  fs.rmSync(appDir, { recursive: true, force: true })
})

async function api(pathAndQuery, init) {
  const res = await fetch(`${baseUrl}/api/${pathAndQuery}`, init)
  const text = await res.text()
  const body = text ? JSON.parse(text) : undefined
  return { status: res.status, body, headers: res.headers }
}

describe('локальный сервер: холодный старт', () => {
  it('armed: false при первом запуске, health отдаёт версию и rev', async () => {
    const { status, body } = await api('health')
    expect(status).toBe(200)
    expect(body.ok).toBe(true)
    expect(body.armed).toBe(false)
    expect(typeof body.rev).toBe('number')
    expect(typeof body.gameId).toBe('string')
  })

  it('пока armed: false, PATCH/POST/PUT/DELETE отвечают 409', async () => {
    const patch = await api('session', { method: 'PATCH', body: JSON.stringify({ phase: 'lobby' }) })
    expect(patch.status).toBe(409)
    expect(patch.body.error).toMatch(/локальный режим выключен/i)

    const post = await api('teams', { method: 'POST', body: JSON.stringify({ name: 'Синие', color: '#123' }) })
    expect(post.status).toBe(409)
  })

  it('GET разрешён всегда, даже пока armed: false', async () => {
    const teams = await api('teams')
    expect(teams.status).toBe(200)
    expect(teams.body).toEqual([])
  })

  it('/api/arm включает запись, /api/disarm выключает обратно', async () => {
    const arm = await api('arm', { method: 'POST' })
    expect(arm.status).toBe(200)
    expect((await api('health')).body.armed).toBe(true)

    const patchOk = await api('session', { method: 'PATCH', body: JSON.stringify({ phase: 'lobby' }) })
    expect(patchOk.status).toBe(200)

    await api('disarm', { method: 'POST' })
    expect((await api('health')).body.armed).toBe(false)
    const patchBlocked = await api('session', { method: 'PATCH', body: JSON.stringify({ phase: 'x' }) })
    expect(patchBlocked.status).toBe(409)
  })
})

describe('локальный сервер: игровые данные (armed)', () => {
  beforeEach(async () => { await api('arm', { method: 'POST' }) })

  it('upsert команды по name не плодит дублей', async () => {
    const first = await api('teams', { method: 'POST', body: JSON.stringify({ name: 'Красные', color: '#f00' }) })
    expect(first.status).toBe(200)
    const second = await api('teams', {
      method: 'POST', body: JSON.stringify({ name: 'Красные', color: '#f00', last_seen_at: '2026-01-01' }),
    })
    expect(second.body.id).toBe(first.body.id)
    const list = await api('teams')
    expect(list.body).toHaveLength(1)
  })

  it('upsert ответа по team_id+question_ref не плодит дублей, ДРУГОЙ game_id заменяет строку', async () => {
    await api('answers', {
      method: 'POST',
      body: JSON.stringify([{ team_id: 't1', game_id: 'g1', question_ref: 'q-1', round_number: 0, answer_text: 'a', updated_at: 'x' }]),
    })
    await api('answers', {
      method: 'POST',
      body: JSON.stringify([{ team_id: 't1', game_id: 'g2', question_ref: 'q-1', round_number: 0, answer_text: 'b', updated_at: 'y' }]),
    })
    const list = await api('answers')
    expect(list.body).toHaveLength(1)
    expect(list.body[0].answer_text).toBe('b')
    expect(list.body[0].game_id).toBe('g2')
  })

  it('PATCH /api/session с melody мержит по ключам, не затирает соседние', async () => {
    await api('session', { method: 'PATCH', body: JSON.stringify({ melody: { stage: 'idle', turn: 0 } }) })
    await api('session', { method: 'PATCH', body: JSON.stringify({ melody: { jp: { tile: 3, answer: false } } }) })
    const session = await api('session?since=-1')
    expect(session.body.melody.stage).toBe('idle')
    expect(session.body.melody.turn).toBe(0)
    expect(session.body.melody.jp).toEqual({ tile: 3, answer: false })
  })

  it('?since=<rev> отдаёт 204, когда rev не изменился', async () => {
    const first = await api('session?since=-1')
    const rev = Number(first.headers.get('x-rev'))
    const res = await fetch(`${baseUrl}/api/session?since=${rev}`)
    expect(res.status).toBe(204)
  })

  it('GET /api/answers?since=<rev> отдаёт 204, когда rev не изменился, и полный список при изменении', async () => {
    const before = await api('answers?since=-1')
    const rev = Number(before.headers.get('x-rev'))
    const same = await fetch(`${baseUrl}/api/answers?since=${rev}`)
    expect(same.status).toBe(204)

    await api('answers', {
      method: 'POST',
      body: JSON.stringify([{ team_id: 't2', game_id: 'g1', question_ref: 'q-2', round_number: 0, answer_text: 'c', updated_at: 'z' }]),
    })
    const after = await fetch(`${baseUrl}/api/answers?since=${rev}`)
    expect(after.status).toBe(200)
  })

  it('PUT/GET /api/blitz по round хранит и отдаёт состояние', async () => {
    const state = { order: ['t1', 't2'], turn: 1, left: {}, correct: {}, missed: {}, used: [], current: null, finished: false }
    const put = await api('blitz?round=2', { method: 'PUT', body: JSON.stringify(state) })
    expect(put.status).toBe(200)
    const got = await api('blitz?round=2')
    expect(got.body.order).toEqual(['t1', 't2'])
    const empty = await api('blitz?round=5')
    expect(empty.body).toBeNull()
  })

  it('POST/GET /api/pack/:id хранит снимок пакета', async () => {
    const pack = { id: 'pack1', name: 'Тест', rounds: [] }
    await api('pack/pack1', { method: 'POST', body: JSON.stringify(pack) })
    const got = await api('pack/pack1')
    expect(got.body).toEqual(pack)
    const missing = await api('pack/missing')
    expect(missing.status).toBe(404)
  })

  it('GET /api/export отдаёт весь локальный прогон', async () => {
    await api('teams', { method: 'POST', body: JSON.stringify({ name: 'Жёлтые', color: '#ff0' }) })
    const dump = await api('export')
    expect(dump.status).toBe(200)
    expect(dump.body.teams).toHaveLength(1)
    expect(dump.body).toHaveProperty('session')
    expect(dump.body).toHaveProperty('answers')
    expect(dump.body).toHaveProperty('blitz')
  })
})

describe('локальный сервер: /api/media Range', () => {
  it('Range: bytes=2-5 отдаёт 206 и правильный Content-Range/тело', async () => {
    const mediaDir = path.join(dataDir, 'media')
    fs.mkdirSync(mediaDir, { recursive: true })
    const content = Buffer.from('0123456789')
    fs.writeFileSync(path.join(mediaDir, 'track.mp3'), content)

    const res = await fetch(`${baseUrl}/api/media/track.mp3`, { headers: { Range: 'bytes=2-5' } })
    expect(res.status).toBe(206)
    expect(res.headers.get('content-range')).toBe('bytes 2-5/10')
    expect(res.headers.get('content-length')).toBe('4')
    const body = Buffer.from(await res.arrayBuffer())
    expect(body.toString('utf8')).toBe('2345')
  })

  it('без Range отдаёт весь файл с кодом 200', async () => {
    const mediaDir = path.join(dataDir, 'media')
    fs.mkdirSync(mediaDir, { recursive: true })
    fs.writeFileSync(path.join(mediaDir, 'pic.png'), Buffer.from('abc'))
    const res = await fetch(`${baseUrl}/api/media/pic.png`)
    expect(res.status).toBe(200)
    expect(await res.text()).toBe('abc')
  })

  it('несуществующий файл — 404', async () => {
    const res = await fetch(`${baseUrl}/api/media/nope.mp3`)
    expect(res.status).toBe(404)
  })
})

describe('локальный сервер: статика приложения', () => {
  it('/ редиректит на APP_BASE, index.html получает метку qp-local', async () => {
    const redirect = await fetch(`${baseUrl}/`, { redirect: 'manual' })
    expect(redirect.status).toBe(302)
    expect(redirect.headers.get('location')).toBe('/quiz-party/')

    const html = await fetch(`${baseUrl}/quiz-party/`)
    expect(html.status).toBe(200)
    const text = await html.text()
    expect(text).toContain('<meta name="qp-local" content="1">')
  })
})
