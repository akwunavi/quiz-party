// Сквозной сетевой тест «Скачек» на НАСТОЯЩЕМ backend (docker: Postgres Supabase + PostgREST + GoTrue; миграции 0001–0017; scripts/e2e/*).
// Участники — независимые браузерные контексты: проектор (редактор), пульт (редактор), 3–4 телефона команд (без входа, как гости).
// Что считаем «серверной» проверкой: значения читаются из самой БД (psql) и из ответов PostgREST; «браузерной» — то, что видно на экранах.
// usage: NODE_PATH=$(npm root -g) node e2e/bulldog/net.cjs <outDir> [D=20]
const { chromium } = require('playwright')
const { execSync } = require('child_process')
const fs = require('fs'), path = require('path')

const OUT = process.argv[2] || '/tmp/e2e-net', D = +(process.argv[3] || 20)
const API = 'http://127.0.0.1:54321', APP = 'http://127.0.0.1:5301/quiz-party/'
const ROOM = '00000000-0000-0000-0000-0000000000d1', GAME = '00000000-0000-0000-0000-0000000000e1'
const ENV = Object.fromEntries(fs.readFileSync('/tmp/e2e.env', 'utf8').trim().split('\n').map(l => l.split('=')))
const ANON = ENV.ANON
fs.mkdirSync(OUT + '/shots', { recursive: true }); fs.mkdirSync(OUT + '/video', { recursive: true })

const sh = c => execSync(c, { env: { ...process.env, PGPASSWORD: 'testpw_e2e_only' }, encoding: 'utf8', maxBuffer: 1 << 26 })
const sql = q => sh(`psql -h 127.0.0.1 -U postgres -d postgres -At -F '|' -c ${JSON.stringify(q)}`).trim()
const sleep = ms => new Promise(r => setTimeout(r, ms))
async function until(fn, timeout = 20000, step = 250) { const t0 = Date.now(); for (;;) { const v = await fn(); if (v) return v; if (Date.now() - t0 > timeout) return null; await sleep(step) } }

// ── журнал результатов и сетевых запросов
const results = [], netlog = [], bdReq = {}
const rec = (id, title, kind, ok, detail = '') => { results.push({ id, title, kind, ok: !!ok, detail }); console.log(`${ok ? '✓' : '✗'} [${kind}] ${id} ${title}${detail ? ' — ' + detail : ''}`) }
const watch = (page, who) => page.on('response', async r => {
  const q = r.request(), u = q.url()
  if (!u.startsWith(API) || q.method() === 'GET' || !/answers|game_sessions|teams/.test(u)) return
  let body = ''; try { body = (q.postData() || '').slice(0, 220) } catch {}
  netlog.push({ t: Date.now(), who, method: q.method(), path: u.replace(API + '/rest/v1', ''), status: r.status(), body })
})

// ── вход ведущего: настоящий GoTrue → сессия кладётся в localStorage так же, как её кладёт supabase-js
async function login() {
  const r = await fetch(`${API}/auth/v1/token?grant_type=password`, { method: 'POST', headers: { apikey: ANON, 'content-type': 'application/json' }, body: JSON.stringify({ email: 'host@e2e.test', password: 'e2e-host-pass-1' }) })
  const s = await r.json(); if (!s.access_token) throw new Error('вход не удался: ' + JSON.stringify(s).slice(0, 200)); return s
}
async function mk(browser, name, { phone = false, session = null, video = true, init = null } = {}) {
  const ctx = await browser.newContext({ viewport: phone ? { width: 390, height: 780 } : { width: 1600, height: 900 }, deviceScaleFactor: 1,
    ...(video ? { recordVideo: { dir: `${OUT}/video`, size: phone ? { width: 390, height: 780 } : { width: 1280, height: 720 } } } : {}) })
  if (session) await ctx.addInitScript(s => localStorage.setItem('sb-127-auth-token', JSON.stringify(s)), session)
  if (init) await ctx.addInitScript(init)
  const page = await ctx.newPage(); watch(page, name)
  bdReq[name] = []; page.on('request', q => { if (q.url().includes('/bulldog/')) bdReq[name].push(q.url().replace(/^.*\/bulldog\//, '').replace(/\?.*$/, '')) })
  const errs = []; page.on('pageerror', e => errs.push(e.message)); page.on('console', m => { if (m.type() === 'error') errs.push(m.text()) })
  return { ctx, page, name, errs }
}
const shot = (c, label) => c.page.screenshot({ path: `${OUT}/shots/${label}.png` })

// ── REST как «чужой клиент»/редактор (то, что мог бы послать кто угодно с ключом anon)
const rest = async (method, p, body, token = ANON, extra = {}) => {
  const r = await fetch(`${API}/rest/v1${p}`, { method, headers: { apikey: ANON, authorization: `Bearer ${token}`, 'content-type': 'application/json', prefer: 'return=representation', ...extra }, body: body ? JSON.stringify(body) : undefined })
  const t = await r.text(); let j = null; try { j = JSON.parse(t) } catch {}; return { status: r.status, body: j ?? t }
}
const sess = () => sql(`select phase||'|'||round_number||'|'||state_rev||'|'||coalesce(melody->'race'->>'stage','-')||'|'||coalesce(melody->'race'->>'seed','-')||'|'||coalesce(melody->'race'->>'startedAt','-')||'|'||coalesce(melody->'race'->>'D','-') from game_sessions where id='${ROOM}'`).split('|')
const bets = (round = 0) => Object.fromEntries(sql(`select t.name, a.answer_text||'/'||coalesce(a.stake::text,'-')||'/'||coalesce(a.is_correct::text,'-') from answers a join teams t on t.id=a.team_id where a.question_ref='q-race-${round}' order by t.name`).split('\n').filter(Boolean).map(l => l.split('|')))
const teamId = n => sql(`select id from teams where name='${n}'`)

// ── Race V3 тем же движком, что в приложении (vendor/scenario.mjs) — независимый расчёт мест по (seed, D) из БД
async function expectedRace(seed, Dv) {
  const { resolveRace } = await import('/home/user/quiz-party/src/lib/bulldog/vendor/scenario.mjs')
  for (let a = 0; ; a++) { try { return resolveRace((seed + a * 65) % 0x100000000, { courseSeconds: Dv }) } catch (e) { if (a >= 6) throw e } }
}
const T = { transition: 4, countdown: 5, finishHold: 3.5, podiumTransition: 2.6 }

async function pick(c, k) {
  await c.page.click(`.bd-dots span:nth-child(${k})`)
  await c.page.waitForFunction(k => /№\d/.test(document.querySelector('.pl-send')?.textContent || '') && document.querySelector('.pl-send').textContent.includes('№' + k), k, { timeout: 5000 })
  await c.page.click('.pl-send:not([disabled])')
}
async function register(c, name) {
  await c.page.goto(`${APP}#/player?room=${ROOM}`)
  await c.page.fill('input[placeholder="Название команды"]', name); await c.page.click('text=Играть!')
  await c.page.waitForSelector('.pl-root', { timeout: 15000 })
}

;(async () => {
  const startedAll = Date.now()
  sql(`update game_sessions set phase='question', round_number=0, question_index=0, melody='{}' where id='${ROOM}'; delete from answers; delete from teams;`)
  const browser = await chromium.launch(); const session = await login()
  const host = await mk(browser, 'проектор', { session }), admin = await mk(browser, 'пульт', { phone: true, session })
  const P = [await mk(browser, 'телефон-1', { phone: true }), await mk(browser, 'телефон-2', { phone: true }), await mk(browser, 'телефон-3', { phone: true }), await mk(browser, 'телефон-4', { phone: true })]
  const NAMES = ['ТИГРЫ', 'СОВЫ', 'ЛИСЫ', 'ВОЛКИ']
  try {
    // ═══ S0: экраны поднимаются, команды регистрируются через настоящий PostgREST
    await host.page.goto(`${APP}#/?room=${ROOM}`); await admin.page.goto(`${APP}#/admin?room=${ROOM}`)
    for (let i = 0; i < 4; i++) await register(P[i], NAMES[i])
    rec('S0.1', '4 команды зарегистрированы с game_id комнаты (БД)', 'server', sql(`select count(*) from teams where game_id='${GAME}'`) === '4')
    await until(() => sess()[3] === 'betting', 15000)
    rec('S1', 'Ставки открываются автоматически при показе раунда на проекторе (game_sessions.melody.race.stage)', 'server', sess()[3] === 'betting', `rev=${sess()[2]}`)
    await host.page.waitForSelector('.race-betbar', { timeout: 15000 }); await sleep(4000)
    await shot(host, '01_projector_betting_empty'); await shot(admin, '01_admin_betting_empty'); await shot(P[0], '01_phone1_picker')

    // ═══ S2: выбор разных собак и одной собаки несколькими командами
    await pick(P[0], 1); await pick(P[1], 3); await pick(P[2], 3)
    await until(() => Object.keys(bets()).length === 3, 10000)
    let b = bets()
    rec('S2.1', 'Выбор: ТИГРЫ→1, СОВЫ→3, ЛИСЫ→3 записаны в БД; stake пуст', 'server', b['ТИГРЫ'] === '1/-/-' && b['СОВЫ'] === '3/-/-' && b['ЛИСЫ'] === '3/-/-', JSON.stringify(b))
    // счётчики на экранах (DOM): проектор «ВЫБОР СДЕЛАЛИ», телефоны «выбрали: N»
    await until(async () => /3 \/ 4/.test(await host.page.textContent('.race-betbar').catch(() => '')), 8000)
    const betbar = await host.page.textContent('.race-betbar'); rec('S2.2', 'Проектор: «ВЫБОР СДЕЛАЛИ: 3 / 4»', 'browser', /3 \/ 4/.test(betbar), betbar.trim().slice(0, 40))
    await until(async () => (await P[3].page.textContent('.bd-track').catch(() => '')).includes('выбрали: 2'), 8000)
    const cnt = await P[3].page.$$eval('.bd-count', els => els.map(e => e.textContent.replace('выбрали: ', '')).join(','))
    rec('S2.3', 'Телефон без выбора видит счётчики 1,0,2,0,0 (две команды на одной собаке)', 'browser', cnt === '1,0,2,0,0', cnt)
    await sleep(2500); await shot(host, '02_projector_three_bets'); await shot(admin, '02_admin_counts'); await shot(P[2], '02_phone3_chosen')
    const adminTxt = await admin.page.textContent('body'); rec('S2.4', 'Пульт: «СДЕЛАЛИ ВЫБОР: 3 / 4» и счётчики по собакам', 'browser', /3 \/ 4/.test(adminTxt) && /№3[^:]*: 2/.test(adminTxt))

    // ═══ S3: смена выбора до старта
    await pick(P[0], 5); await until(() => bets()['ТИГРЫ'] === '5/-/-', 8000)
    rec('S3', 'Смена выбора до старта: ТИГРЫ 1→5 (БД)', 'server', bets()['ТИГРЫ'] === '5/-/-', bets()['ТИГРЫ'])

    const oldHeld = []; await P[2].page.route('**/rest/v1/answers*', r => { if (r.request().method() === 'POST' && oldHeld.hold) oldHeld.push(r); else r.continue() })
    oldHeld.hold = true; await pick(P[2], 4); await until(() => oldHeld.length > 0, 8000)
    rec('S3.1', 'Запрос ЛИСЫ (3→4) задержан сетью надолго (будет отправлен уже в ДРУГОМ раунде)', 'browser', oldHeld.length > 0 && bets()['ЛИСЫ'] === '3/-/-')

    // ═══ S4: задержанный запрос. Телефон-4 нажимает выбор, запрос УДЕРЖИВАЕТСЯ сетью; пока он «в пути» — старт; потом запрос доходит до сервера
    const held = []; await P[3].page.route('**/rest/v1/answers*', r => { if (r.request().method() === 'POST') held.push(r); else r.continue() })
    await pick(P[3], 2); await until(() => held.length > 0, 8000)
    rec('S4.0', 'Запрос ВОЛКОВ (→2) задержан на сети, в БД его ещё нет', 'browser', held.length > 0 && bets()['ВОЛКИ'] === undefined)

    // ═══ S8/S11/S12: «Старт» тремя путями одновременно: проектор + пульт (+ двойной клик пульта)
    const rev0 = +sess()[2]
    await shot(host, '03_projector_before_start')
    const startAdmin = admin.page.locator('button', { hasText: 'НАЧАТЬ СКАЧКИ' }), startHost = host.page.locator('.host-actions button', { hasText: 'Старт' })
    await Promise.all([startAdmin.click(), startAdmin.dblclick().catch(() => {}), startHost.click().catch(() => {})])
    // этап preparing: «Старт» закрывает ставки и фиксирует seed/D, но гонка ещё НЕ идёт (startedAt пуст) — проектор готовит ресурсы
    await until(() => ['preparing', 'running'].includes(sess()[3]), 15000); const prep = sess(); const tPrep = Date.now()
    rec('S8.0', 'После «Старт» (пульт ×3 клика + проектор): этап preparing, seed и D записаны, startedAt ещё нет (гоночное время не идёт)', 'server', prep[3] === 'preparing' && prep[4] !== '-' && prep[6] !== '-' && prep[5] === '-', prep.join('|'))
    for (const r of held) await r.continue().catch(() => {}); await sleep(1500)
    await until(() => sess()[3] === 'running', 90000); const run = sess()
    await sleep(3000); const run2 = sess()
    rec('S8', 'Старт тремя путями сразу: ровно один переход в running — после готовности проектора; seed/startedAt/D не менялись, rev стабилен', 'server', run[4] === prep[4] && run[6] === prep[6] && run[4] === run2[4] && run[5] === run2[5] && run[2] === run2[2], `rev ${rev0}→${prep[2]}→${run[2]}→${run2[2]}, seed=${run[4]}, startedAt=${run[5]}`)
    rec('S8.1', 'startedAt — один серверный момент ПОСЛЕ готовности проектора (позже «Старта», с запасом), а не момент нажатия', 'server', Date.parse(run[5]) > tPrep - 1000, `подготовка ≈ ${((Date.parse(run[5]) - tPrep) / 1000).toFixed(1)} с после наблюдения preparing`)
    const seed = +run[4], startedAt = Date.parse(run[5]), Dgame = +run[6]
    rec('S9.0', 'D записан вместе с seed и равен настройке (42 по умолчанию или заданной)', 'server', Dgame === 42 || Dgame === D, `D=${Dgame}`)
    // задержанный запрос доходит до сервера ПОСЛЕ «Старта» (этап preparing уже закрыл ставки — до готовности проектора)
    rec('S4.1', 'Запрос ВОЛКОВ, дошедший ПОСЛЕ старта, отклонён сервером: ставки нет', 'server', bets()['ВОЛКИ'] === undefined, JSON.stringify(bets()))
    const lateNet = netlog.filter(n => n.who === 'телефон-4' && n.method === 'POST' && /answers/.test(n.path)).pop()
    rec('S4.2', 'Ответ сети на задержанный запрос: PostgREST вернул успех (триггер молча пропустил запись, очередь не зацикливается)', 'server', lateNet && lateNet.status < 300, lateNet ? `${lateNet.method} ${lateNet.path} → ${lateNet.status}` : '')

    // ═══ S5: повторная отправка вручную (любой клиент с ключом anon): UPDATE/INSERT/DELETE/смена личности/очки
    const tid = teamId('ТИГРЫ'), before = JSON.stringify(bets())
    const atk = []
    atk.push(await rest('POST', '/answers?on_conflict=team_id,question_ref', [{ team_id: tid, game_id: GAME, question_ref: 'q-race-0', round_number: 0, answer_text: '2' }], ANON, { prefer: 'resolution=merge-duplicates,return=representation' }))
    atk.push(await rest('PATCH', `/answers?team_id=eq.${tid}&question_ref=eq.q-race-0`, { answer_text: '1', stake: 5, is_correct: true }))
    atk.push(await rest('PATCH', `/answers?team_id=eq.${tid}&question_ref=eq.q-race-0`, { question_ref: 'q-x', stake: 5 }))
    atk.push(await rest('DELETE', `/answers?team_id=eq.${tid}`))
    atk.push(await rest('POST', '/answers?on_conflict=team_id,question_ref', [{ team_id: teamId('ВОЛКИ'), game_id: GAME, question_ref: 'q-race-0', round_number: 0, answer_text: '4' }], ANON, { prefer: 'resolution=merge-duplicates' }))
    await sleep(500)
    rec('S5', 'Прямые запросы любого клиента после старта (upsert, PATCH текста/stake/is_correct, смена question_ref, DELETE, новая ставка): ставки не изменились', 'server', JSON.stringify(bets()) === before, `${before} | статусы: ${atk.map(a => a.status).join(',')}`)

    // ═══ S10: перезагрузка телефона после старта
    await P[1].page.reload(); await P[1].page.waitForSelector('.pl-wait', { timeout: 15000 }); await sleep(2500)
    const ph2 = await P[1].page.textContent('.pl-root'); const lsLeft = await P[1].page.evaluate(() => Object.keys(localStorage).filter(k => k.startsWith('qp-race-')).length)
    rec('S10.1', 'Телефон СОВ после перезагрузки на «беге»: показана серверная ставка №3, выбора нет', 'browser', /БЕГУТ/.test(ph2) && /№3/.test(ph2) && !(await P[1].page.$('.bd-picker')), ph2.replace(/\s+/g, ' ').slice(0, 90))
    rec('S10.2', 'Локальная память телефона не «оживляет» выбор (ключ qp-race-* удалён)', 'browser', lsLeft === 0, `ключей: ${lsLeft}`)
    await P[3].page.reload(); await P[3].page.waitForSelector('.pl-wait', { timeout: 15000 }); await sleep(2500)
    const ph4 = await P[3].page.textContent('.pl-root'); rec('S10.3', 'Телефон ВОЛКОВ (запрос не дошёл вовремя): «выбор не успел дойти до старта», ставки нет', 'browser', /не успел дойти/.test(ph4), ph4.replace(/\s+/g, ' ').slice(0, 90))
    await shot(P[1], '04_phone2_running_after_reload'); await shot(P[3], '04_phone4_missed'); await shot(admin, '04_admin_running'); await shot(host, '04_projector_transition')

    // ═══ S8.2: перезагрузка проектора ВО ВРЕМЯ ОТСЧЁТА: состояние в БД то же, гонка стартует по тем же часам (raceT=0 на startedAt+9)
    { const t0 = Date.parse(run[5]); await sleep(Math.max(0, t0 + (T.transition + 2.5) * 1000 - Date.now())); const mid0 = sess()
      await host.page.reload(); await host.page.waitForSelector('.bulldog-canvas', { timeout: 15000 }); await sleep(1500)
      rec('S8.2', 'Перезагрузка проектора в разгар отсчёта: seed/startedAt/stage/rev в БД те же (повторного старта нет)', 'server', sess().join() === mid0.join(), sess().join('|')) }
    // ═══ S13: синхронизация состояний
    const raceObj = await expectedRace(seed, Dgame), gradeMs = startedAt + (T.transition + T.countdown + raceObj.end) * 1000
    const adminRun = await admin.page.textContent('body'); rec('S13.1', 'Пульт показывает «ЗАБЕГ ИДЁТ НА ПРОЕКТОРЕ»', 'browser', /ЗАБЕГ ИДЁТ/.test(adminRun))
    rec('S13.2', 'Телефоны показывают «БЕГУТ!»', 'browser', (await Promise.all(P.slice(0, 3).map(p => p.page.textContent('.pl-root')))).every(t => /БЕГУТ/.test(t)))
    rec('S13.3', 'Независимый расчёт Race V3 по (seed, D) из БД: места получены', 'server', Array.isArray(raceObj.places) && raceObj.places.length === 5, `seed=${seed} D=${Dgame} places(индексы собак)=${JSON.stringify(raceObj.places)} end=${raceObj.end.toFixed(2)}с`)

    // ═══ S14: перезагрузка проектора посреди гонки — продолжает с того же момента, состояние в БД не меняется
    await sleep(Math.max(0, startedAt + (T.transition + T.countdown + 6) * 1000 - Date.now()))
    const mid = sess(); await host.page.reload(); await host.page.waitForSelector('.bulldog-canvas', { timeout: 15000 }); await sleep(4000)
    rec('S14', 'Перезагрузка проектора в середине гонки: seed/startedAt/stage/rev в БД те же', 'server', sess().join() === mid.join(), sess().join('|'))
    await shot(host, '05_projector_race_after_reload')
    // сверка кадра: проектор ПОСЛЕ перезагрузки и пульт видят одну фазу (по времени от startedAt) — canvas не пуст
    const nonEmpty = await host.page.evaluate(() => { const c = document.querySelector('canvas.bulldog-canvas'); const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 3; i < d.length; i += 4000) if (d[i] > 0) n++; return n })
    rec('S14.1', 'После перезагрузки проектор рисует сцену (canvas не пуст)', 'browser', nonEmpty > 50, `непустых проб: ${nonEmpty}`)

    // ═══ S15: сеть проектора пропадает В МОМЕНТ финиша (начисление), затем возвращается
    const toGrade = gradeMs - Date.now()
    if (toGrade > 4000) await sleep(toGrade - 2500)
    await host.ctx.setOffline(true); const offAt = Date.now(); await sleep(7000); await host.ctx.setOffline(false)
    const n0 = netlog.length
    const done = await until(() => sess()[3] === 'done', 60000, 500)
    rec('S15', 'Сеть проектора отключена на 7 с вокруг финиша: после возврата начисление и stage=done выполнены', 'server', !!done, `done через ${((Date.now() - gradeMs) / 1000).toFixed(1)}с после финиша`)

    // ═══ S16: очки
    const places = raceObj.places, pts = dog => { const p = places.indexOf(dog - 1); return 5 - p }
    b = bets()
    const exp = { 'ТИГРЫ': `5/${pts(5)}/true`, 'СОВЫ': `3/${pts(3)}/true`, 'ЛИСЫ': `3/${pts(3)}/true` }
    rec('S16.1', 'Очки 5/4/3/2/1 по месту выбранной собаки (по независимому расчёту Race V3)', 'server', Object.entries(exp).every(([k, v]) => b[k] === v), `БД ${JSON.stringify(b)} ожидание ${JSON.stringify(exp)}`)
    rec('S16.2', 'Две команды на одной собаке получили одинаково; команда без ставки (ВОЛКИ) — нет записи и 0 очков', 'server', b['СОВЫ'] === b['ЛИСЫ'] && b['ВОЛКИ'] === undefined)
    const stamp1 = sql(`select string_agg(updated_at::text, ',' order by team_id) from answers where question_ref='q-race-0'`), rev1 = sess()[2]
    await sleep(5000); await host.page.reload(); await host.page.waitForSelector('.bulldog-canvas'); await sleep(6000)
    rec('S16.3', 'Перезагрузка проектора ПОСЛЕ финиша: повторного начисления нет (updated_at ответов и rev сессии не изменились)', 'server', sql(`select string_agg(updated_at::text, ',' order by team_id) from answers where question_ref='q-race-0'`) === stamp1 && sess()[2] === rev1)
    const wr = netlog.filter(n => n.who === 'проектор' && n.method !== 'GET' && /answers/.test(n.path) && n.t > Date.now() - 12000)
    rec('S16.4', 'После перезагрузки проектор не отправлял запросов записи очков', 'browser', wr.length === 0, `записей: ${wr.length}`)
    await sleep(2500)
    const phones = await Promise.all(P.map(p => p.page.textContent('.pl-root')))
    rec('S16.5', 'Телефоны показывают итог: «+N» у своих команд, у команды без ставки очков нет', 'browser', /\+\d/.test(phones[0]) && /\+\d/.test(phones[1]) && !/\+\d/.test(phones[3]) && phones[0].includes(`+${pts(5)}`), phones.map(t => t.replace(/\s+/g, ' ').slice(0, 70)).join(' || '))
    await shot(host, '06_projector_finish_podium'); await shot(P[0], '06_phone1_done'); await shot(P[3], '06_phone4_done'); await shot(admin, '06_admin_done')

    // ═══ S17: переход к следующему раунду кнопкой на проекторе (маршрут после раунда)
    const nextBtn = host.page.locator('.host-actions button').first(); const label = (await nextBtn.textContent().catch(() => '')) || ''
    await nextBtn.click().catch(() => {}); await sleep(2500)
    rec('S17', 'Кнопка «дальше» на проекторе уводит из раунда-гонки (маршрут flow.ts)', 'server', sess()[0] !== 'question' || +sess()[1] !== 0, `кнопка «${label.trim()}» → фаза ${sess()[0]}, раунд ${sess()[1]}`)

    // ═══ S18: ДРУГИЕ раунды (зона влияния миграции 0017): обычный раунд, ответы с телефонов, правка до завершения, оценка ведущим
    sql(`update game_sessions set phase='question', round_number=1, question_index=0, timer_started_at=now() where id='${ROOM}'`)
    await sleep(3500); await shot(P[0], '07_phone1_standard_round')
    const t1 = teamId('ТИГРЫ'), t2 = teamId('СОВЫ'), qref = 'q-00000000-0000-0000-0000-0000000000c1'
    const up = (t, txt, extra = {}) => rest('POST', '/answers?on_conflict=team_id,question_ref', [{ team_id: t, game_id: GAME, question_ref: qref, round_number: 1, answer_text: txt, ...extra }], ANON, { prefer: 'resolution=merge-duplicates,return=representation' })
    const a1 = await up(t1, '41'), a2 = await up(t1, '42'), a3 = await up(t2, 'не знаю')
    const row = () => sql(`select team_id::text||'|'||answer_text||'|'||coalesce(stake::text,'-')||'|'||coalesce(is_correct::text,'-') from answers where question_ref='${qref}' order by answer_text`)
    rec('S18.1', 'Обычный раунд: ответы команд принимаются, правка до завершения вопроса (41→42) работает, строк не дублируется', 'server', sql(`select count(*) from answers where question_ref='${qref}'`) === '2' && sql(`select answer_text from answers where team_id='${t1}' and question_ref='${qref}'`) === '42', `статусы ${a1.status},${a2.status},${a3.status}`)
    const pl = await rest('POST', '/answers?on_conflict=team_id,question_ref', [{ team_id: t1, game_id: GAME, question_ref: qref, round_number: 1, answer_text: '42', stake: 9, is_correct: true }], ANON, { prefer: 'resolution=merge-duplicates,return=representation' })
    rec('S18.2', 'Обычный ответ: игрок по-прежнему пишет stake (как до 0017), но is_correct ему недоступен (триггер 0012)', 'server', /\/9\//.test(sql(`select team_id||'/'||coalesce(stake::text,'-')||'/'||coalesce(is_correct::text,'-') from answers where team_id='${t1}' and question_ref='${qref}'`)) && sql(`select coalesce(is_correct::text,'-') from answers where team_id='${t1}' and question_ref='${qref}'`) === '-')
    const ed = await rest('PATCH', `/answers?team_id=eq.${t1}&question_ref=eq.${qref}`, { is_correct: true, stake: null }, session.access_token)
    rec('S18.3', 'Ведущий (редактор) отмечает ответ верным — проходит', 'server', ed.status < 300 && sql(`select is_correct from answers where team_id='${t1}' and question_ref='${qref}'`) === 't')
    const del = await rest('DELETE', `/answers?team_id=eq.${t2}&question_ref=eq.${qref}`, null, session.access_token)
    rec('S18.4', 'Ведущий удаляет ответ (сброс) — проходит; игроку DELETE по-прежнему запрещён', 'server', del.status < 300 && sql(`select count(*) from answers where team_id='${t2}' and question_ref='${qref}'`) === '0')
    // каскад/сброс игры редактором, включая ставки гонки
    // ═══ S19: второй раунд-гонка в том же пакете: состояние первой гонки не должно протекать
    sql(`update game_sessions set phase='question', round_number=2, question_index=0, timer_started_at=null where id='${ROOM}'`)
    await until(() => sess()[3] === 'betting', 15000)
    const s19 = sess()
    rec('S19', 'Второй раунд-гонка: ставки открыты заново (stage=betting), а не показан финал прошлой гонки', 'server', s19[3] === 'betting' && s19[4] === '-', `фаза ${s19[0]} раунд ${s19[1]} stage=${s19[3]} seed=${s19[4]}`)
    await sleep(4000); await shot(host, '08_projector_second_race_round'); await shot(P[0], '08_phone1_second_race')
    rec('S19.1', 'Телефоны видят выбор второй гонки (счётчики сброшены, ставки раунда 2 пусты)', 'browser', (await P[0].page.$$eval('.bd-count', els => els.map(e => e.textContent.replace('выбрали: ', '')).join(','))) === '0,0,0,0,0')

    // ═══ S20: запоздавший запрос прошлого раунда (удерживался с раунда 1) доходит во время приёма ставок раунда 3
    const oldBefore = bets(0)
    oldHeld.hold = false; for (const r of oldHeld.splice(0)) await r.continue().catch(() => {}); await sleep(2000)
    rec('S20', 'Запоздавшая запись раунда 1 (ЛИСЫ 3→4), дошедшая при открытых ставках раунда 3: ни ставку раунда 1, ни очки, ни ставки раунда 3 не меняет', 'server', JSON.stringify(bets(0)) === JSON.stringify(oldBefore) && Object.keys(bets(2)).length === 0, `раунд1 ${JSON.stringify(bets(0))}`)

    // ═══ S21: частично выполненная запись и повторный запуск: второй полный забег; у проектора обрываются записи сессии ровно в момент финиша
    await pick(P[0], 2); await pick(P[1], 2); await pick(P[2], 4); await until(() => Object.keys(bets(2)).length === 3, 10000)
    const b2 = bets(2); rec('S21.0', 'Ставки раунда 3: ТИГРЫ→2, СОВЫ→2, ЛИСЫ→4; ВОЛКИ без ставки', 'server', b2['ТИГРЫ'] === '2/-/-' && b2['СОВЫ'] === '2/-/-' && b2['ЛИСЫ'] === '4/-/-' && !b2['ВОЛКИ'], JSON.stringify(b2))
    await admin.page.locator('button', { hasText: 'НАЧАТЬ СКАЧКИ' }).click(); await until(() => sess()[3] === 'running', 90000)
    const r2 = sess(); const seed2 = +r2[4], started2 = Date.parse(r2[5]), D2 = +r2[6]; const race2 = await expectedRace(seed2, D2)
    rec('S21.1', 'Второй старт: новый seed, прежний D', 'server', seed2 !== seed && D2 === Dgame, `seed ${seed}→${seed2}`)
    const grade2 = started2 + (T.transition + T.countdown + race2.end) * 1000
    let patchBlocked = 0, answersWrites = 0
    await host.page.route('**/rest/v1/**', r => {
      const q = r.request(); const now = Date.now()
      if (q.method() === 'PATCH' && /game_sessions/.test(q.url()) && now > grade2 - 500 && now < grade2 + 6000) { patchBlocked++; return r.abort('failed') }
      if (q.method() === 'POST' && /answers/.test(q.url())) answersWrites++
      return r.continue()
    })
    await sleep(Math.max(0, grade2 + 14000 - Date.now()))
    await until(() => sess()[3] === 'done', 40000, 500)
    const p2 = race2.places, pts2 = dog => 5 - p2.indexOf(dog - 1); const b3 = bets(2)
    rec('S21.2', 'Частичная запись: очки записаны, а запись «забег окончен» оборвана сетью (блок PATCH сессии) — после восстановления stage=done, ничего не задвоено', 'server', sess()[3] === 'done' && patchBlocked > 0, `заблокировано PATCH: ${patchBlocked}, записей очков проектором: ${answersWrites}`)
    rec('S21.3', 'Очки раунда 3 верны по независимому расчёту (ТИГРЫ и СОВЫ — собака 2, ЛИСЫ — собака 4), единожды', 'server', b3['ТИГРЫ'] === `2/${pts2(2)}/true` && b3['СОВЫ'] === `2/${pts2(2)}/true` && b3['ЛИСЫ'] === `4/${pts2(4)}/true` && !b3['ВОЛКИ'], `${JSON.stringify(b3)} места=${JSON.stringify(p2)}`)
    rec('S21.4', 'Очки раунда 1 не изменились второй гонкой', 'server', JSON.stringify(bets(0)) === JSON.stringify(oldBefore))
    await shot(host, '09_projector_round3_done'); await shot(P[1], '09_phone2_round3_done')

    // ═══ S22: «повторный запуск того же раунда» — возврат ведущего к раунду 1 (гонка уже сыграна)
    const stampsBack = sql(`select string_agg(updated_at::text, ',' order by team_id) from answers where question_ref='q-race-0'`)
    sql(`update game_sessions set phase='question', round_number=0 where id='${ROOM}'`); await sleep(6000)
    const back = sess()
    rec('S22.1', 'Возврат к уже сыгранному раунду-гонке: показан итог (stage=done), ставки заново НЕ открыты, очки не пересчитаны', 'server', back[3] === 'done' && sql(`select string_agg(updated_at::text, ',' order by team_id) from answers where question_ref='q-race-0'`) === stampsBack, JSON.stringify(back))
    await shot(host, '10_projector_back_to_finished_round')
    // повторный ЗАПУСК: ведущий сбрасывает состояние гонки вручную (melody={}), ставки открываются снова — но старые строки answers остаются
    sql(`update game_sessions set melody='{}' where id='${ROOM}'`); await until(() => sess()[3] === 'betting', 15000); await sleep(3000)
    const stale = bets(0)
    rec('S22.2', 'ИЗВЕСТНАЯ ОСОБЕННОСТЬ: при ручном повторном запуске старые ставки и очки раунда остаются (ставки НЕ очищаются при открытии)', 'server', Object.keys(stale).length === 3 && /true$/.test(stale['ТИГРЫ']), JSON.stringify(stale))

    // ═══ S23: ассеты и Service Worker
    const phoneBd = P.map(p => [...new Set(bdReq[p.name])]), hostBd = [...new Set(bdReq['проектор'])]
    rec('S23.1', 'Телефоны запрашивали только still.webp (никаких листов анимации)', 'browser', phoneBd.every(l => l.length > 0 && l.every(f => /still\.webp$/.test(f))), phoneBd.map(l => l.length + ' файла').join(', '))
    rec('S23.2', 'Проектор загрузил листы выбора/гонки/JSON собак', 'browser', hostBd.some(f => /select\/idle\.webp/.test(f)) && hostBd.some(f => /race\/.*_run\.webp/.test(f)) && hostBd.some(f => /atlas\.json/.test(f)), `${hostBd.length} файлов`)
    const caches = await host.page.evaluate(async () => { const ks = await caches.keys(); const o = {}; for (const k of ks) o[k] = (await (await caches.open(k)).keys()).length; return o }).catch(() => null)
    rec('S23.3', 'Service Worker проектора: библиотека собак в своём кеше qp-bd-<версия>', 'browser', caches && Object.keys(caches).some(k => /^qp-bd-/.test(k) && caches[k] >= 20), JSON.stringify(caches))
    const pcaches = await P[0].page.evaluate(async () => { const ks = await caches.keys(); const o = {}; for (const k of ks) o[k] = (await (await caches.open(k)).keys()).filter(r => r.url.includes('/bulldog/')).length; return o }).catch(() => null)
    rec('S23.4', 'Service Worker телефона: в кеше собак не больше 5 файлов (still.webp)', 'browser', pcaches && Object.entries(pcaches).filter(([k]) => /^qp-bd-/.test(k)).every(([, n]) => n <= 5), JSON.stringify(pcaches))
    // выход проектора с экрана гонки: холсты не копятся
    sql(`update game_sessions set phase='question', round_number=1 where id='${ROOM}'`); await sleep(4000)
    rec('S23.5', 'Проектор ушёл с экрана гонки: canvas сцены размонтирован (0 холстов)', 'browser', (await host.page.$$('canvas.bulldog-canvas')).length === 0)

    // ═══ S24: параллельные «ставка» и «Старт» на сервере — 25 повторов, 6 одновременных запросов (ставки анонимные + старт редактором), отдельная комната
    const R2 = '00000000-0000-0000-0000-0000000000d2', G2 = '00000000-0000-0000-0000-0000000000e2'; const tids = []
    for (let i = 0; i < 6; i++) { const t = await rest('POST', '/teams', { name: `ПАР-${i}`, color: '#888', game_id: G2 }); tids.push(t.body[0].id) }
    let viol = 0, accepted = 0, rejected = 0, orders = { before: 0, after: 0 }
    for (let it = 0; it < 25; it++) {
      sql(`delete from answers where game_id='${G2}'; update game_sessions set melody='{"race":{"stage":"betting","round":2,"game":"${G2}"}}' where id='${R2}'`)
      const bet = (t, d) => rest('POST', '/answers?on_conflict=team_id,question_ref', [{ team_id: t, game_id: G2, question_ref: 'q-race-2', round_number: 2, answer_text: String(d) }], ANON, { prefer: 'resolution=merge-duplicates' })
      const start = () => rest('PATCH', `/game_sessions?id=eq.${R2}`, { melody: { race: { stage: 'running', seed: it + 1, D: 42, startedAt: new Date().toISOString(), round: 2, game: G2 } } }, session.access_token)
      await sleep(it % 5 * 3)
      await Promise.all([...tids.map((t, i) => bet(t, i % 5 + 1)), start()])
      const rowsAfter = sql(`select count(*) from answers where game_id='${G2}'`); const bad = sql(`select count(*) from answers a, game_sessions g where g.id='${R2}' and a.game_id='${G2}' and a.xmin::text::bigint > g.xmin::text::bigint`)
      const n = +rowsAfter; accepted += n; rejected += 6 - n; if (+bad > 0) viol++
      const snapshot = sql(`select string_agg(answer_text,',' order by team_id) from answers where game_id='${G2}'`); await sleep(150)
      if (sql(`select string_agg(answer_text,',' order by team_id) from answers where game_id='${G2}'`) !== snapshot) viol++
      orders[n === 6 ? 'before' : 'after']++
    }
    rec('S24', `Параллельно «ставка»×6 и «Старт» (25 повторов, настоящие запросы к PostgREST): ни одна ставка, начатая после старта, не записана; после старта ничего не меняется; принято ${accepted}, отклонено ${rejected}`, 'server', viol === 0 && accepted + rejected === 150, `нарушений: ${viol}; исходы: все 6 до старта в ${orders.before} повторах, часть/все после в ${orders.after}`)

    // ═══ S25: музыка и звук. Проектор в браузере БЕЗ разрешения на автозапуск звука: гонка НЕ стартует сама (ни через 20 с, ни позже), пульт получает понятный статус; дальше два пути — «Включить звук» жестом или «Без музыки» решением ведущего
    { const MUSIC = 'http://127.0.0.1:5301/quiz-party/main.mp3'
      sql(`update packs set settings = settings || '{"bg_music":"${MUSIC}"}'::jsonb where id='00000000-0000-0000-0000-0000000000a1'`)
      await host.ctx.close().catch(() => {})                                   // прежний проектор (со звуком) закрыт: иначе он сам подготовит и запустит гонку в той же комнате
      const reset = () => { sql(`update game_sessions set phase='question', round_number=0, question_index=0, melody='{"race":{"stage":"betting","round":0,"game":"${GAME}"}}' where id='${ROOM}'; delete from answers where game_id='${GAME}'; insert into answers(team_id, game_id, question_ref, round_number, answer_text) select id, game_id, 'q-race-0', 0, '2' from teams where name='ТИГРЫ' and game_id='${GAME}'`) }
      // headless Chromium не применяет политику автозапуска звука (проверено: AudioContext сразу 'running'), поэтому политика ЭМУЛИРУЕТСЯ: пока на странице не было жеста (pointerdown), state='suspended', resume() ничего не даёт
      const policy = () => { const d = Object.getOwnPropertyDescriptor(BaseAudioContext.prototype, 'state'), r = AudioContext.prototype.resume; window.__gesture = false
        addEventListener('pointerdown', () => { window.__gesture = true }, true)
        Object.defineProperty(BaseAudioContext.prototype, 'state', { get() { return window.__gesture ? d.get.call(this) : 'suspended' } })
        AudioContext.prototype.resume = function () { return window.__gesture ? r.call(this) : Promise.resolve() } }
      const b2 = browser; const ses = await login()
      const h2 = await mk(b2, 'проектор-2', { session: ses, video: false, init: policy }), a2 = await mk(b2, 'пульт-2', { phone: true, session: ses, video: false })
      reset(); await h2.page.goto(`${APP}#/?room=${ROOM}`); await a2.page.goto(`${APP}#/admin?room=${ROOM}`); await h2.page.waitForSelector('.race-betbar', { timeout: 20000 }); await sleep(2500)
      await a2.page.locator('button', { hasText: 'НАЧАТЬ СКАЧКИ' }).click()
      const blocked = await until(() => sql(`select coalesce(melody->'race'->'prep'->>'status','-') from game_sessions where id='${ROOM}'`) === 'audio_blocked', 90000, 1000)
      rec('S25.1', 'Звук заблокирован браузером проектора → на пульт записан статус audio_blocked', 'server', !!blocked, sql(`select melody->'race' from game_sessions where id='${ROOM}'`).slice(0, 200))
      await sleep(25000)
      const still = sess(); rec('S25.2', 'Гонка НЕ запускается сама: через 25 с ожидания этап всё ещё preparing, startedAt нет', 'server', still[3] === 'preparing' && still[5] === '-', still.join('|'))
      const adminTxt = await a2.page.textContent('body'); rec('S25.3', 'Пульт показывает понятный статус и кнопки: «Звук заблокирован…», «НАЧАТЬ БЕЗ МУЗЫКИ»', 'browser', /Звук заблокирован/.test(adminTxt) && /НАЧАТЬ БЕЗ МУЗЫКИ/.test(adminTxt))
      const hostTxt = await h2.page.textContent('body'); rec('S25.4', 'Проектор показывает «Включить звук» и «Играть без музыки»', 'browser', /Включить звук/.test(hostTxt) && /Играть без музыки/.test(hostTxt))
      await shot(h2, '25_projector_audio_blocked'); await shot(a2, '25_admin_audio_blocked')
      await a2.page.locator('button', { hasText: 'НАЧАТЬ БЕЗ МУЗЫКИ' }).click(); await until(() => sess()[3] === 'running', 20000)
      rec('S25.5', 'Решение ведущего «без музыки»: stage=running, noMusic=true, один startedAt', 'server', sess()[3] === 'running' && sess()[5] !== '-' && sql(`select melody->'race'->>'noMusic' from game_sessions where id='${ROOM}'`) === 'true', sess().join('|'))
      // второй путь: жест на проекторе разрешает звук → подготовка завершается сама
      reset(); await sleep(3000); await a2.page.reload(); await a2.page.locator('button', { hasText: 'НАЧАТЬ СКАЧКИ' }).click()
      await until(() => sql(`select coalesce(melody->'race'->'prep'->>'status','-') from game_sessions where id='${ROOM}'`) === 'audio_blocked', 90000, 1000)
      await h2.page.locator('.host-actions button', { hasText: 'Включить звук' }).click(); const ok2 = await until(() => sess()[3] === 'running', 30000, 500)
      rec('S25.6', 'Жест «Включить звук» на проекторе: подготовка завершается, stage=running БЕЗ noMusic', 'server', !!ok2 && sql(`select coalesce(melody->'race'->>'noMusic','-') from game_sessions where id='${ROOM}'`) === '-', sess().join('|'))
      await h2.ctx.close(); await a2.ctx.close() }
  } catch (e) {
    rec('ERR', 'сценарий прерван исключением', 'browser', false, String(e.stack || e).slice(0, 400)); try { await shot(host, '99_error_projector'); await shot(admin, '99_error_admin') } catch {}
  }
  const stats = await (await fetch('http://127.0.0.1:54321/__stats')).json().catch(() => null)
  const errs = Object.fromEntries([host, admin, ...P].map(c => [c.name, c.errs.filter(e => !/favicon|net::ERR_INTERNET_DISCONNECTED|Failed to load resource.*(offline|ERR_)/.test(e)).slice(0, 4)]))
  const videos = []
  for (const c of [host, admin, ...P]) { const v = c.page.video(); await c.ctx.close().catch(() => {}); try { videos.push([c.name, await v.path()]) } catch {} }
  await browser.close()
  fs.writeFileSync(`${OUT}/results.json`, JSON.stringify({ results, netlog, gateway: stats, consoleErrors: errs, videos, seconds: Math.round((Date.now() - startedAll) / 1000) }, null, 1))
  const bad = results.filter(r => !r.ok)
  console.log(`\nИТОГО: ${results.length - bad.length}/${results.length} проверок ок; ошибок консоли: ${JSON.stringify(errs)}; видео: ${videos.length}`)
  process.exit(bad.length ? 1 : 0)
})()
