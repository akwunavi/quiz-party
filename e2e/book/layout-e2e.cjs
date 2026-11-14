// ═══ Сквозная проверка редактора компоновки: предпросмотр (правка, сохранение) → проектор показывает то же ═══
// Вход в редактор — подмена Supabase Auth на уровне сети (стенд без облака). Видео и кадры — в --out.
// usage: QP_BOOK_SCRATCH=… node e2e/book/layout-e2e.cjs [--no-build] --out <каталог> [--q 2]
'use strict'
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path')
const argv = process.argv.slice(2); const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d }
const OUT = path.resolve(opt('--out', 'layout-e2e')); const QI = Number(opt('--q', '2'))
async function main() {
  const { startStand, ORIGIN, PIN } = await import('./stand.mjs'); const { makeApi } = await import('./scenes.mjs'); const { PACK_ONLINE } = await import('./make-pack.mjs')
  fs.mkdirSync(OUT, { recursive: true }); await startStand({ noBuild: argv.includes('--no-build') }); const api = makeApi(ORIGIN, PIN)
  const b = await chromium.launch(); const res = { checks: {} }
  const vdir = path.join(OUT, 'v'); fs.rmSync(vdir, { recursive: true, force: true })
  const ctx = await b.newContext({ viewport: { width: 1600, height: 900 }, recordVideo: { dir: vdir, size: { width: 1600, height: 900 } } }); const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(String(e)))
  const user = { id: 'u1', aud: 'authenticated', role: 'authenticated', email: 'e@x.y', app_metadata: {}, user_metadata: {}, created_at: '2026-01-01T00:00:00Z' }
  const b64 = o => Buffer.from(JSON.stringify(o)).toString('base64url'); const jwt = `${b64({ alg: 'HS256', typ: 'JWT' })}.${b64({ sub: 'u1', exp: 4102444800, role: 'authenticated' })}.sig`
  const session = { access_token: jwt, refresh_token: 'r', expires_in: 99999, expires_at: 4102444800, token_type: 'bearer', user }
  await ctx.addInitScript(([s]) => { for (const k of ['sb-127-auth-token']) localStorage.setItem(k, JSON.stringify(s)) }, [session])
  await ctx.route('**/auth/v1/user', r => r.fulfill({ json: user })); await ctx.route('**/rest/v1/editor_roles*', r => r.fulfill({ json: { user_id: 'u1', role: 'owner', display_name: 'T', can_edit_all: true } }))
  await p.goto(`${ORIGIN}/quiz-party/#/editor`); await p.waitForTimeout(2500)
  await p.locator('text=Стенд «Книга» · телефоны').locator('xpath=ancestor::*[.//button[contains(.,"Открыть")]][1]').getByText('Открыть').first().click(); await p.waitForTimeout(1500)
  await p.locator('button[data-tip="Редактировать"]').first().click(); await p.waitForTimeout(1500)
  await p.locator('button[data-tip="Предпросмотр"]').nth(QI).click(); await p.waitForSelector('.pv-backdrop .host-screen', { timeout: 15000 }); await p.waitForTimeout(2500)
  await p.screenshot({ path: `${OUT}/1-preview-auto.png` })
  await p.getByRole('button', { name: 'Компоновка' }).click(); await p.waitForSelector('.lay-panel'); await p.getByRole('button', { name: 'Вручную' }).click(); await p.waitForTimeout(800)
  res.checks.boxes = await p.locator('.lay-box').count()
  await p.screenshot({ path: `${OUT}/2-manual-start.png` })
  // перетащить рамку текста и изменить размер первой картинки
  const dragBy = async (sel, dx, dy, handle) => { const el = p.locator(sel).first(); const bb = await el.boundingBox(); const sx = handle ? bb.x + bb.width - 6 : bb.x + bb.width / 2, sy = handle ? bb.y + bb.height - 6 : bb.y + bb.height / 2
    await p.mouse.move(sx, sy); await p.mouse.down(); await p.mouse.move(sx + dx, sy + dy, { steps: 8 }); await p.mouse.up(); await p.waitForTimeout(300) }
  const before = await p.locator('.lay-box.text').boundingBox()
  await dragBy('.lay-box.text', 0, 60); const after = await p.locator('.lay-box.text').boundingBox()
  res.checks.textMoved = Math.round(after.y - before.y)
  await dragBy('.lay-box.img', 0, 0, true)
  await dragBy('.lay-box.img .lay-handle', -60, -40, false)
  await p.screenshot({ path: `${OUT}/3-edited.png` })
  res.checks.textInDom = await p.evaluate(() => !!document.querySelector('.pv-backdrop .lay-text .q-text'))
  await p.getByRole('button', { name: 'Сохранить' }).click(); await p.waitForTimeout(1500)
  await p.screenshot({ path: `${OUT}/4-saved-preview.png` })
  // что записано в базе
  const qid = `stand-book-r0-q${QI}`
  const row = await p.evaluate(async id => (await fetch(`/sb/rest/v1/pack_questions?id=eq.${id}&select=service`, { headers: { apikey: 'x' } })).json(), qid).catch(() => null)
  res.checks.service = row
  await ctx.close()
  const vf = fs.readdirSync(vdir).find(f => f.endsWith('.webm')); if (vf) fs.copyFileSync(path.join(vdir, vf), path.join(OUT, 'editor-flow.webm'))
  // проектор: тот же вопрос
  for (const [w, h] of [[1920, 1080], [1280, 720]]) {
    const c2 = await b.newContext({ viewport: { width: w, height: h }, serviceWorkers: 'block' }); const pg = await c2.newPage()
    await api.reset(); await api.teams(4); await api.session({ pack_id: PACK_ONLINE, phase: 'question', round_number: 0, question_index: QI, timer_started_at: new Date().toISOString(), reveal: false })
    await pg.goto(`${ORIGIN}/quiz-party/#/?room=stand`); await pg.waitForSelector('.host-screen', { timeout: 15000 }); await pg.waitForTimeout(3500)
    res.checks[`projector${w}`] = await pg.evaluate(() => ({ manual: !!document.querySelector('.lay-area'), text: !!document.querySelector('.lay-text .q-text'), imgs: document.querySelectorAll('.lay-img img').length }))
    await pg.screenshot({ path: `${OUT}/5-projector-${w}x${h}.png` }); await c2.close()
  }
  res.errs = errs; fs.writeFileSync(`${OUT}/result.json`, JSON.stringify(res, null, 1)); console.log(JSON.stringify(res)); await b.close(); process.exit(0)
}
main().catch(e => { console.error(e); process.exit(1) })
