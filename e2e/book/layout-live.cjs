// ═══ Редактор компоновки: «долгая вкладка», перелистывание А, 3840×2160, тач ═══
// 1) вкладка проектора открыта на раунде 1; layout вопроса раунда 0 пишется в базу (как делает редактор); смена раунда → вопрос показан с ручной раскладкой (пакет перечитан);
// 2) переход вопрос→вопрос на вопрос с ручной раскладкой: лист ровно один, чистится, ошибок нет; 3) 3840×2160: вопрос с ручной раскладкой; 4) тач-эмуляция: перетаскивание рамки пальцем в редакторе.
// usage: QP_BOOK_SCRATCH=… node e2e/book/layout-live.cjs [--no-build] --out <каталог>
'use strict'
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path')
const argv = process.argv.slice(2); const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d }
const OUT = path.resolve(opt('--out', 'layout-live'))
async function main() {
  const { startStand, ORIGIN, PIN } = await import('./stand.mjs'); const { makeApi } = await import('./scenes.mjs'); const { PACK_ONLINE } = await import('./make-pack.mjs')
  fs.mkdirSync(OUT, { recursive: true }); await startStand({ noBuild: argv.includes('--no-build') }); const api = makeApi(ORIGIN, PIN)
  const b = await chromium.launch(); const res = {}
  const Q = (round, qi) => ({ pack_id: PACK_ONLINE, phase: 'question', round_number: round, question_index: qi, timer_started_at: new Date().toISOString(), reveal: false })
  const layout = { question: { v: 1, imgs: ['book/p16x9.jpg', 'book/p1x1.jpg'], text: { x: 0.04, y: 0.05, w: 0.42, h: 0.4 }, images: [{ x: 0.56, y: 0.1, w: 0.4, h: 0.5 }, { x: 0.56, y: 0.62, w: 0.3, h: 0.35 }] } }
  const patch = async (id, service) => (await fetch(`${ORIGIN}/sb/rest/v1/pack_questions?id=eq.${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', Prefer: 'return=minimal' }, body: JSON.stringify({ service }) })).status
  // 1) долгая вкладка
  const ctx = await b.newContext({ viewport: { width: 1920, height: 1080 }, serviceWorkers: 'block' }); const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(String(e)))
  await api.reset(); await api.teams(4); await api.session(Q(1, 0)); await p.goto(`${ORIGIN}/quiz-party/#/?room=stand`); await p.waitForSelector('.host-screen .q-text, .host-screen', { timeout: 15000 }); await p.waitForTimeout(3000)
  res.patchStatus = await patch('stand-book-r0-q2', { layout })
  await p.waitForTimeout(2500)
  await api.session(Q(0, 2)); await p.waitForTimeout(5000)        // смена РАУНДА 1 → 0 (пакет перечитывается на смене раунда)
  res.longTab_afterRoundChange = await p.evaluate(() => ({ manual: !!document.querySelector('.lay-area'), imgs: document.querySelectorAll('.lay-img img').length }))
  await p.screenshot({ path: `${OUT}/live-tab-after-round-change.png` })
  // 2) перелистывание А: вопрос 1 → вопрос 2 (с ручной раскладкой)
  await api.session(Q(0, 1)); await p.waitForTimeout(4000)
  await p.evaluate(() => { window.__leaves = 0; new MutationObserver(() => { const n = document.querySelectorAll('.bk-turn2-leaf').length; if (n > window.__leaves) window.__leaves = n }).observe(document, { childList: true, subtree: true }) })
  await api.session(Q(0, 2)); await p.waitForTimeout(450); await p.screenshot({ path: `${OUT}/flip-manual-mid.png` }); await p.waitForTimeout(3500)
  res.flip = await p.evaluate(() => ({ maxLeaves: window.__leaves, leftAfter: document.querySelectorAll('.bk-turn2-leaf, .bk-turn2-under').length, manual: !!document.querySelector('.lay-area'), clip: document.querySelector('.host-screen')?.style.clipPath || '' }))
  await p.screenshot({ path: `${OUT}/flip-manual-end.png` })
  res.errs = errs; await ctx.close()
  // 3) 3840×2160
  const c4 = await b.newContext({ viewport: { width: 3840, height: 2160 }, serviceWorkers: 'block' }); const p4 = await c4.newPage()
  await api.session(Q(0, 2)); await p4.goto(`${ORIGIN}/quiz-party/#/?room=stand`); await p4.waitForSelector('.lay-area', { timeout: 20000 }); await p4.waitForTimeout(3500)
  res.uhd = await p4.evaluate(() => { const a = document.querySelector('.lay-area').getBoundingClientRect(); const t = document.querySelector('.lay-text').getBoundingClientRect(); return { area: [Math.round(a.x), Math.round(a.y), Math.round(a.width), Math.round(a.height)], textFont: getComputedStyle(document.querySelector('.lay-text .q-text')).fontSize, textRelX: +((t.x - a.x) / a.width).toFixed(3) } })
  await p4.screenshot({ path: `${OUT}/uhd-3840x2160.png` }); await c4.close()
  // 4) тач-эмуляция в редакторе
  const ct = await b.newContext({ viewport: { width: 1600, height: 900 }, hasTouch: true, isMobile: false }); const pt = await ct.newPage()
  const user = { id: 'u1', aud: 'authenticated', role: 'authenticated', email: 'e@x.y', app_metadata: {}, user_metadata: {}, created_at: '2026-01-01T00:00:00Z' }
  const b64 = o => Buffer.from(JSON.stringify(o)).toString('base64url'); const jwt = `${b64({ alg: 'HS256', typ: 'JWT' })}.${b64({ sub: 'u1', exp: 4102444800, role: 'authenticated' })}.sig`
  await ct.addInitScript(([s]) => { localStorage.setItem('sb-127-auth-token', JSON.stringify(s)) }, [{ access_token: jwt, refresh_token: 'r', expires_in: 99999, expires_at: 4102444800, token_type: 'bearer', user }])
  await ct.route('**/auth/v1/user', r => r.fulfill({ json: user })); await ct.route('**/rest/v1/editor_roles*', r => r.fulfill({ json: { user_id: 'u1', role: 'owner', display_name: 'T', can_edit_all: true } }))
  await patch('stand-book-r0-q1', {})
  await pt.goto(`${ORIGIN}/quiz-party/#/editor`); await pt.waitForTimeout(2500)
  await pt.locator('text=Стенд «Книга» · телефоны').locator('xpath=ancestor::*[.//button[contains(.,"Открыть")]][1]').getByText('Открыть').first().click(); await pt.waitForTimeout(1500)
  await pt.locator('button[data-tip="Редактировать"]').first().click(); await pt.waitForTimeout(1200)
  await pt.locator('button[data-tip="Предпросмотр"]').nth(1).click(); await pt.waitForSelector('.pv-backdrop .host-screen', { timeout: 15000 }); await pt.waitForTimeout(2000)
  await pt.getByRole('button', { name: 'Компоновка' }).click(); await pt.waitForSelector('.lay-panel'); await pt.getByRole('button', { name: 'Вручную' }).click(); await pt.waitForTimeout(700)
  const ys = async () => (await pt.locator('.lay-box').evaluateAll(els => els.map(e => Math.round(e.getBoundingClientRect().y)))).join(','); const cdp = await ct.newCDPSession(pt); const box = await pt.locator('.lay-box.img').first().boundingBox(); const before = await ys()
  const sx = box.x + box.width / 2, sy = box.y + box.height / 2
  await pt.evaluate(() => { window.__pe = []; for (const t of ['pointerdown', 'pointermove', 'pointerup', 'pointercancel']) document.addEventListener(t, e => window.__pe.push(t + ':' + e.pointerType + ':' + Math.round(e.clientX) + ',' + Math.round(e.clientY) + '>' + (e.target.className || e.target.tagName)), true) })
  const tp = (type, x, y) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints: type === 'touchEnd' ? [] : [{ x, y, id: 1 }] })
  await tp('touchStart', sx, sy); for (let i = 1; i <= 8; i++) await tp('touchMove', sx - i * 4, sy - i * 8); await tp('touchEnd', 0, 0); await pt.waitForTimeout(500)
  const after = await ys()
  res.touchDragDy = { before, after }; res.touchEvents = (await pt.evaluate(() => window.__pe)).slice(0, 12); await pt.screenshot({ path: `${OUT}/touch-drag.png` }); await ct.close()
  fs.writeFileSync(`${OUT}/live.json`, JSON.stringify(res, null, 1)); console.log(JSON.stringify(res)); await b.close(); process.exit(0)
}
main().catch(e => { console.error(e); process.exit(1) })
