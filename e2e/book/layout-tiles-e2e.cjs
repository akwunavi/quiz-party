// ═══ Сквозная проверка: плитки вариантов и таймер в ручной раскладке (10.71) — редактор (предпросмотр) → база → проектор ═══
// Вопросы: «варианты текстом» (раунд 0, вопрос 7) и «сопоставление» (раунд 1, вопрос 0) пакета «Стенд «Книга» · телефоны».
// usage: QP_BOOK_THEME=<тема> QP_BOOK_SCRATCH=… node e2e/book/layout-tiles-e2e.cjs [--no-build] --out <каталог>
'use strict'
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path')
const argv = process.argv.slice(2); const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d }
const OUT = path.resolve(opt('--out', 'layout-tiles'))
async function main() {
  const { startStand, ORIGIN, PIN } = await import('./stand.mjs'); const { makeApi } = await import('./scenes.mjs'); const { PACK_ONLINE } = await import('./make-pack.mjs')
  fs.mkdirSync(OUT, { recursive: true }); await startStand({ noBuild: argv.includes('--no-build') }); const api = makeApi(ORIGIN, PIN); const b = await chromium.launch(); const res = { theme: process.env.QP_BOOK_THEME || 'ny_book', cases: {} }
  const user = { id: 'u1', aud: 'authenticated', role: 'authenticated', email: 'e@x.y', app_metadata: {}, user_metadata: {}, created_at: '2026-01-01T00:00:00Z' }
  const b64 = o => Buffer.from(JSON.stringify(o)).toString('base64url'); const jwt = `${b64({ alg: 'HS256', typ: 'JWT' })}.${b64({ sub: 'u1', exp: 4102444800, role: 'authenticated' })}.sig`
  for (const [name, roundIdx, qi, nTiles] of [['choices', 0, 7, 4], ['match', 1, 0, 4]]) {
    const ctx = await b.newContext({ viewport: { width: 1600, height: 900 } }); const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => { if (!/localStorage/.test(String(e))) errs.push(String(e)) })
    await ctx.addInitScript(([s]) => { try { localStorage.setItem('sb-127-auth-token', JSON.stringify(s)) } catch { /* ok */ } }, [{ access_token: jwt, refresh_token: 'r', expires_in: 99999, expires_at: 4102444800, token_type: 'bearer', user }])
    await ctx.route('**/auth/v1/user', r => r.fulfill({ json: user })); await ctx.route('**/rest/v1/editor_roles*', r => r.fulfill({ json: { user_id: 'u1', role: 'owner', display_name: 'T', can_edit_all: true } }))
    await p.goto(`${ORIGIN}/quiz-party/#/editor`); await p.waitForTimeout(2500)
    await p.locator('text=Стенд «Книга» · телефоны').locator('xpath=ancestor::*[.//button[contains(.,"Открыть")]][1]').getByText('Открыть').first().click(); await p.waitForTimeout(1500)
    await p.locator('button[data-tip="Редактировать"]').nth(roundIdx).click(); await p.waitForTimeout(1500)
    await p.locator('button[data-tip="Предпросмотр"]').nth(qi).click(); await p.waitForSelector('.pv-backdrop .host-screen', { timeout: 15000 }); await p.waitForTimeout(2500)
    await p.getByRole('button', { name: 'Компоновка' }).click(); await p.waitForSelector('.lay-panel'); await p.getByRole('button', { name: 'Вручную' }).click(); await p.waitForTimeout(1000)
    const c = { boxes: await p.locator('.lay-box').count(), tileBoxes: await p.locator('.lay-box.tile').count(), timerBox: await p.locator('.lay-box.timer').count() }
    await p.screenshot({ path: `${OUT}/${name}-1-manual.png` })
    const drag = async (sel, dx, dy) => { const bb = await p.locator(sel).first().boundingBox(); const sx = bb.x + bb.width / 2, sy = bb.y + bb.height / 2; await p.mouse.move(sx, sy); await p.mouse.down(); await p.mouse.move(sx + dx, sy + dy, { steps: 8 }); await p.mouse.up(); await p.waitForTimeout(300) }
    const ar = await p.locator('.lay-ed-area').boundingBox()
    // плитка 1 — в левый верх экрана (поверх плашки/таймера), таймер — в центр экрана
    { const tb = await p.locator('.lay-box.tile').nth(0).boundingBox(); await drag('.lay-box.tile >> nth=0', ar.x + 4 - tb.x, ar.y + 4 - tb.y) }
    { const tm = await p.locator('.lay-box.timer').boundingBox(); await drag('.lay-box.timer', ar.x + ar.width / 2 - (tm.x + tm.width / 2), ar.y + ar.height * 0.45 - (tm.y + tm.height / 2)) }
    c.warnings = await p.locator('.lay-warn').allTextContents()
    c.tileInDom = await p.locator('.pv-backdrop .lay-tile').count(); c.timerInDom = await p.locator('.pv-backdrop .lay-timer').count()
    await p.screenshot({ path: `${OUT}/${name}-2-edited.png` })
    await p.getByRole('button', { name: 'Сохранить' }).click(); await p.waitForTimeout(1500)
    const row = await p.evaluate(async id => (await fetch(`/sb/rest/v1/pack_questions?id=eq.${id}&select=service`, { headers: { apikey: 'x' } })).json(), `stand-book-r${roundIdx}-q${qi}`).catch(() => null)
    const lay = row && row[0] && row[0].service && row[0].service.layout && row[0].service.layout.question
    c.saved = lay ? { v: lay.v, tiles: lay.tiles && lay.tiles.length, timer: !!lay.timer, tile0: lay.tiles && [+lay.tiles[0].x.toFixed(3), +lay.tiles[0].y.toFixed(3)] } : null
    await ctx.close()
    c.projector = {}
    for (const [w, h] of [[1920, 1080], [1280, 720]]) {
      const c2 = await b.newContext({ viewport: { width: w, height: h }, serviceWorkers: 'block' }); const pg = await c2.newPage()
      await api.reset(); await api.teams(4); await api.session({ pack_id: PACK_ONLINE, phase: 'question', round_number: roundIdx, question_index: qi, timer_started_at: new Date().toISOString(), reveal: false })
      await pg.goto(`${ORIGIN}/quiz-party/#/?room=stand`); await pg.waitForSelector('.host-screen', { timeout: 15000 }); await pg.waitForTimeout(3500)
      c.projector[w] = await pg.evaluate(() => { const R = e => e && (r => [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)])(e.getBoundingClientRect()); const tiles = [...document.querySelectorAll('.lay-tile')]
        const t0 = tiles[0], tm = document.querySelector('.lay-timer'); const plate = t0 && t0.querySelector('.choice-plate'), tx = t0 && t0.querySelector('.lay-tile-tx')
        return { manual: !!document.querySelector('.lay-area'), tiles: tiles.length, gridInFlow: !!document.querySelector('.host-screen > .choices-grid'), tile0: R(t0), timerBox: R(tm), timerInner: R(tm && tm.querySelector('.lay-timer-in')), topbarTimer: !!document.querySelector('.host-topbar > :not(.qnum):last-child'),
          textFits: tx ? tx.getBoundingClientRect().right <= t0.getBoundingClientRect().right + 1 && tx.getBoundingClientRect().bottom <= t0.getBoundingClientRect().bottom + 1 : null, tileKeys: tiles.map(t => (t.querySelector('.key') || {}).textContent) } })
      await pg.screenshot({ path: `${OUT}/${name}-3-projector-${w}.png` }); await c2.close()
    }
    c.errs = errs; res.cases[name] = c
  }
  fs.writeFileSync(`${OUT}/result.json`, JSON.stringify(res, null, 1)); console.log(JSON.stringify(res)); await b.close(); process.exit(0)
}
main().catch(e => { console.error(e); process.exit(1) })
