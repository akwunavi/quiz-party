// ═══ Предзагрузка озвучек (10.75): проверка на настоящем приложении и локальном сервере стенда ═══
// usage: QP_BOOK_SCRATCH=<каталог> NODE_PATH=<каталог с node_modules/playwright> node e2e/book/voice-preload-check.cjs [--no-build]
//
// Пакет стенда `stand-book` дополняется озвучками: 10 коротких WAV (2 с) — правила раундов 0/1,
// озвучки вопросов 0..5 раунда 0 и 0..1 раунда 1. Что проверяется (числа в выводе):
//  T1  статус на пульте идёт 0 → N/M → «всё загружено», при медленной сети (каждый файл +1,5 с);
//      каждый файл запрошен по сети РОВНО один раз; одновременно не больше 2 запросов.
//  T2  после предзагрузки сеть к озвучкам ОТРЕЗАНА (route.abort): правила раунда и озвучки вопросов
//      всё равно играют (`playing` с blob-адресом), запросов к файлам озвучек — 0.
//  T3  ошибка загрузки одного файла → красная строка «не загрузилось 1 из 10» + «повторить»;
//      этот файл играет ПОТОКОМ (прямой адрес, запасной путь), после «повторить» — всё загружено.
//  T4  остановки звука: синтетические waiting/playing на живом <audio> → строка «были остановки…».
'use strict'
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path')
const argv = process.argv.slice(2)
const sleep = ms => new Promise(r => setTimeout(r, ms))
const wav = (sec, freq) => { const rate = 8000, n = rate * sec, b = Buffer.alloc(44 + n * 2)
  b.write('RIFF', 0); b.writeUInt32LE(36 + n * 2, 4); b.write('WAVEfmt ', 8); b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20); b.writeUInt16LE(1, 22)
  b.writeUInt32LE(rate, 24); b.writeUInt32LE(rate * 2, 28); b.writeUInt16LE(2, 32); b.writeUInt16LE(16, 34); b.write('data', 36); b.writeUInt32LE(n * 2, 40)
  for (let i = 0; i < n; i++) b.writeInt16LE(Math.round(6000 * Math.sin(2 * Math.PI * freq * i / rate)), 44 + i * 2); return b }
let bad = 0
const check = (ok, msg) => { console.log(ok ? 'OK  ' : 'FAIL', msg); if (!ok) bad++ }

;(async () => {
  const { startStand, ORIGIN, PIN, SCRATCH } = await import('./stand.mjs'); const { makeApi, GAME } = await import('./scenes.mjs')
  const { buildPack, PACK_ONLINE } = await import('./make-pack.mjs')
  const stand = await startStand({ noBuild: argv.includes('--no-build') }); const api = makeApi(ORIGIN, PIN)

  // ── озвучки в пакете ──
  const dir = path.join(SCRATCH, 'book-data', 'media', 'book'); const names = []
  const pack = buildPack({ audioExt: stand.manifest.audioExt, theme: 'ny_book' })
  const add = (n, f) => { fs.writeFileSync(path.join(dir, n), wav(2, f)); names.push(n); return 'book/' + n }
  pack.rounds[0].rules_audio = add('voice-r0.wav', 300)
  for (let i = 0; i < 6; i++) pack.rounds[0].questions[i].media = { ...(pack.rounds[0].questions[i].media ?? {}), voice: add(`voice-q0-${i}.wav`, 400 + 20 * i) }
  pack.rounds[1].rules_audio = add('voice-r1.wav', 350)
  for (let i = 0; i < 2; i++) pack.rounds[1].questions[i].media = { ...(pack.rounds[1].questions[i].media ?? {}), voice: add(`voice-q1-${i}.wav`, 600 + 20 * i) }
  const M = names.length
  await api.call(`/api/pack/${PACK_ONLINE}`, 'POST', pack)
  console.log(`озвучек в пакете: ${M}`)

  const b = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] }).catch(() => chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--autoplay-policy=no-user-gesture-required'] }))
  const pin = `localStorage.setItem('qp-local-pin','${PIN}')`
  // журнал звука в странице проектора: что реально заиграло (адрес источника) и чем кончилось
  const spy = `${pin};window.__snd=[];document.addEventListener('playing',e=>{const t=e.target;window.__snd.push({src:t.src.slice(0,5)==='blob:'?'blob':t.src.replace(location.origin,''),t:Date.now()})},true)
    const op=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){window.__snd.push({call:this.src.slice(0,5)==='blob:'?'blob':this.src.replace(location.origin,'')});return op.apply(this,arguments)}`

  async function open(label, { delay = 0, failFile = null } = {}) {
    await api.reset(); await api.teams(2)
    await api.session({ pack_id: PACK_ONLINE, phase: 'lobby', round_number: 0, question_index: 0 })
    const ctx = await b.newContext({ viewport: { width: 1920, height: 1080 }, serviceWorkers: 'block' }); await ctx.addInitScript(spy)
    const reqs = []; let live = 0, maxLive = 0, mode = { fail: failFile, cut: false }
    await ctx.route(/\/api\/media\/book\/voice-/, async route => {
      const u = route.request().url(); reqs.push({ u: u.split('/').pop(), at: Date.now() })
      if (mode.cut || (mode.fail && u.includes(mode.fail) && mode.fail)) return route.abort()
      live++; maxLive = Math.max(maxLive, live); if (delay) await sleep(delay); live--; return route.continue()
    })
    const page = await ctx.newPage(); page.on('pageerror', e => console.log('  [pageerror]', e.message.slice(0, 200))); page.on('console', m => { if (/\[звук\]|voice/i.test(m.text())) console.log('  [console]', m.text().slice(0, 120)) }); await page.goto(`${ORIGIN}/quiz-party/#/?room=stand`)
    const actx = await b.newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: 'block' }); await actx.addInitScript(pin)
    const admin = await actx.newPage(); await admin.goto(`${ORIGIN}/quiz-party/#/admin?room=stand`)
    const chip = async () => (await admin.locator('[data-testid=voice-status]').first().innerText({ timeout: 300 }).catch(() => '')).replace(/\s+/g, ' ')
    return { label, ctx, actx, page, admin, reqs, mode, chip, maxLive: () => maxLive }
  }

  // ═══ T1: статус 0 → N/M → готово, один запрос на файл, параллельность ≤ 2 ═══
  { const s = await open('T1', { delay: 1500 }); const seen = []; const t0 = Date.now()
    while (Date.now() - t0 < 30000) { const c = await s.chip(); if (c && seen[seen.length - 1] !== c) seen.push(c); if (/всё загружено/.test(c)) break; await sleep(250) }
    console.log('  строка пульта:', seen.join('  →  '))
    check(seen.length >= 3 && /загружено \d+ из 10/.test(seen[0]) && /всё загружено \(10 из 10\)/.test(seen[seen.length - 1]), `T1 статус меняется N/M → готово (${seen.length} шагов)`)
    const nums = seen.map(t => +(t.match(/загружено (\d+) из/) ?? [])[1]).filter(n => !isNaN(n)); check(nums.every((n, i) => !i || n >= nums[i - 1]), `T1 счётчик не убывает: ${nums.join(',')}`)
    check(s.reqs.length === M && new Set(s.reqs.map(r => r.u)).size === M, `T1 запросов к озвучкам ${s.reqs.length} из ${M} файлов (по одному)`)
    check(s.maxLive() <= 2, `T1 одновременно запросов не больше 2: было ${s.maxLive()}`)
    // ═══ T2: сеть к озвучкам отрезана — играет из памяти ═══
    s.mode.cut = true; const before = s.reqs.length
    await api.session({ phase: 'round_intro', round_number: 0, question_index: 0 }); await sleep(2600)
    let snd = await s.page.evaluate(() => window.__snd)
    check(snd.some(x => x.src === 'blob'), `T2 правила раунда играют из памяти: ${JSON.stringify(snd.filter(x => !x.call).map(x => x.src))}`)
    await api.session({ phase: 'question', round_number: 0, question_index: 0, timer_started_at: null, reveal: false })
    for (let i = 0; i < 40 && !(await api.call('/api/session')).timer_started_at; i++) await sleep(250)   // проектор опрашивает раз в ~2 с, озвучка 2 с
    snd = await s.page.evaluate(() => window.__snd)
    const started = !!(await api.call('/api/session')).timer_started_at
    const calls = snd.filter(x => x.call !== undefined).map(x => x.call)
    check(calls.length >= 1 && calls.every(c => c === 'blob' || c === ''), `T2 озвучка вопроса: play() только с blob-адресом: ${JSON.stringify(calls)}`)
    check(started, 'T2 озвучка доиграла до конца и запустила таймер вопроса (без сети)')
    await api.session({ phase: 'question', round_number: 0, question_index: 1, timer_started_at: null, reveal: false }); await sleep(3000)
    check(s.reqs.length === before, `T2 новых запросов к файлам озвучек при игре: ${s.reqs.length - before}`)
    // ═══ T4: остановки звука (синтетические события на живом <audio> правил) ═══
    await api.session({ phase: 'round_intro', round_number: 1, question_index: 0 })
    for (let i = 0; i < 40 && !(await s.page.evaluate(() => !!document.querySelector('audio'))); i++) await sleep(250)
    await s.page.evaluate(async () => { const a = document.querySelector('audio'); if (!a) throw new Error('нет <audio>'); a.dispatchEvent(new Event('playing')); a.dispatchEvent(new Event('waiting')); await new Promise(r => setTimeout(r, 1700)); a.dispatchEvent(new Event('playing')) }).catch(e => console.log('  T4:', e.message))
    let c4 = ''; for (let i = 0; i < 40; i++) { c4 = await s.chip(); if (/макс\. (1,[5-9]|2,)/.test(c4)) break; await sleep(300) }; console.log('  строка пульта:', c4)
    check(/были остановки звука: 1 \(макс\. 1,[5-9] с\)/.test(c4) || /были остановки звука: 1 \(макс\. 2,\d с\)/.test(c4), 'T4 в строке пульта есть «были остановки звука: 1 (макс. ~1,7 с)»')
    await s.ctx.close(); await s.actx.close() }

  // ═══ T3: ошибка загрузки одного файла → красная строка, запасной путь, «повторить» ═══
  { const s = await open('T3', { failFile: 'voice-q0-2.wav' }); const t0 = Date.now(); let c = ''
    while (Date.now() - t0 < 30000) { c = await s.chip(); if (/не загрузилось 1 из 10/.test(c)) break; await sleep(300) }
    console.log('  строка пульта:', c)
    check(/⚠ Озвучка: не загрузилось 1 из 10/.test(c) && /повторить/.test(await s.admin.locator('[data-testid=voice-status]').innerHTML()), 'T3 красная строка «не загрузилось 1 из 10» и кнопка «повторить»')
    const bb = await s.admin.locator('[data-testid=voice-status]').boundingBox(); const bt = await s.admin.locator('[data-testid=voice-status] button').boundingBox()
    check(bb.x >= 0 && bb.x + bb.width <= 390 && bt.x + bt.width <= bb.x + bb.width + 1 && bt.x >= bb.x, `T3 строка на пульте 390 px помещается: ${Math.round(bb.x)}..${Math.round(bb.x + bb.width)}, кнопка ${Math.round(bt.x)}..${Math.round(bt.x + bt.width)}`)
    check(s.reqs.filter(r => r.u === 'voice-q0-2.wav').length === 4, `T3 упавший файл запрошен 4 раза (1 + 3 повтора): ${s.reqs.filter(r => r.u === 'voice-q0-2.wav').length}`)
    // запасной путь: на экране вопроса 2 озвучка идёт потоком — разрешаем файл по сети
    s.mode.fail = null; s.reqs.length = 0
    await api.session({ phase: 'question', round_number: 0, question_index: 2, timer_started_at: null, reveal: false }); await sleep(3500)
    const snd = await s.page.evaluate(() => window.__snd.filter(x => x.call !== undefined).map(x => x.call))
    check(snd.some(x => /voice-q0-2\.wav/.test(x)), `T3 запасной путь: упавший файл играет потоком: ${JSON.stringify(snd.slice(-2))}`)
    check(s.reqs.some(r => r.u === 'voice-q0-2.wav'), 'T3 запрос именно к упавшему файлу ушёл по сети при проигрывании')
    // «повторить»
    await s.admin.locator('[data-testid=voice-status] button').click(); const t1 = Date.now(); c = ''
    while (Date.now() - t1 < 15000) { c = await s.chip(); if (/всё загружено/.test(c)) break; await sleep(300) }
    console.log('  строка пульта после «повторить»:', c)
    check(/всё загружено \(10 из 10\)/.test(c), 'T3 после «повторить» — «всё загружено (10 из 10)»')
    await s.ctx.close(); await s.actx.close() }

  await b.close(); await stand.close(); console.log(bad ? `FAILED ${bad}` : 'ALL OK'); process.exit(bad ? 1 : 0)
})().catch(e => { console.error(e); process.exit(1) })
