// ═══ Сквозная проверка: ручная раскладка ОТВЕТА и «3 попыток» — редактор (предпросмотр) → база → проектор ═══
// usage: QP_BOOK_THEME=<тема> QP_BOOK_SCRATCH=… node e2e/book/layout-answer-e2e.cjs [--no-build] --out <каталог>
'use strict'
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path')
const argv = process.argv.slice(2); const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d }
const OUT = path.resolve(opt('--out', 'layout-answer'))
async function main() {
  const { startStand, ORIGIN, PIN } = await import('./stand.mjs'); const { makeApi, SCENES } = await import('./scenes.mjs')
  fs.mkdirSync(OUT, { recursive: true }); await startStand({ noBuild: argv.includes('--no-build') }); const api = makeApi(ORIGIN, PIN)
  const b = await chromium.launch(); const res = { theme: process.env.QP_BOOK_THEME || 'ny_book' }
  const ctx = await b.newContext({ viewport: { width: 1600, height: 900 } }); const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(String(e)))
  const user = { id: 'u1', aud: 'authenticated', role: 'authenticated', email: 'e@x.y', app_metadata: {}, user_metadata: {}, created_at: '2026-01-01T00:00:00Z' }
  const b64 = o => Buffer.from(JSON.stringify(o)).toString('base64url'); const jwt = `${b64({ alg: 'HS256', typ: 'JWT' })}.${b64({ sub: 'u1', exp: 4102444800, role: 'authenticated' })}.sig`
  await ctx.addInitScript(([s]) => { localStorage.setItem('sb-127-auth-token', JSON.stringify(s)) }, [{ access_token: jwt, refresh_token: 'r', expires_in: 99999, expires_at: 4102444800, token_type: 'bearer', user }])
  await ctx.route('**/auth/v1/user', r => r.fulfill({ json: user })); await ctx.route('**/rest/v1/editor_roles*', r => r.fulfill({ json: { user_id: 'u1', role: 'owner', display_name: 'T', can_edit_all: true } }))
  const openPreview = async (roundIdx, qIdx) => {
    await p.goto(`${ORIGIN}/quiz-party/#/editor`); await p.waitForTimeout(2200)
    await p.locator('text=Стенд «Книга» · все механики').locator('xpath=ancestor::*[.//button[contains(.,"Открыть")]][1]').getByText('Открыть').first().click(); await p.waitForTimeout(1500)
    await p.locator('button[data-tip="Редактировать"]').nth(roundIdx).click(); await p.waitForTimeout(1500)
    await p.locator('button[data-tip="Предпросмотр"]').nth(qIdx).click(); await p.waitForSelector('.pv-backdrop .host-screen', { timeout: 15000 }); await p.waitForTimeout(2000)
  }
  const drag = async (sel, dx, dy) => { const bb = await p.locator(sel).first().boundingBox(); const sx = bb.x + bb.width / 2, sy = bb.y + bb.height / 2; await p.mouse.move(sx, sy); await p.mouse.down(); await p.mouse.move(sx + dx, sy + dy, { steps: 8 }); await p.mouse.up(); await p.waitForTimeout(300) }
  const qget = async id => (await (await fetch(`${ORIGIN}/sb/rest/v1/pack_questions?id=eq.${id}`)).json())[0]?.service
  // 1) ответ обычного вопроса: раунд 0 (индекс в списке — первый), вопрос 16 (картинка ответа + пояснение)
  await openPreview(8, 16)
  await p.getByRole('button', { name: 'Компоновка' }).click(); await p.waitForSelector('.lay-panel'); await p.getByRole('button', { name: 'Ответ', exact: true }).click(); await p.waitForTimeout(700)
  await p.screenshot({ path: `${OUT}/a0-answer-auto.png` })
  await p.getByRole('button', { name: 'Вручную' }).click(); await p.waitForTimeout(800)
  res.answerBoxes = await p.locator('.lay-box').count(); await p.screenshot({ path: `${OUT}/a1-answer-manual.png` })
  await drag('.lay-box.text', 0, 40); await p.getByRole('button', { name: 'Сохранить' }).click(); await p.waitForTimeout(1500)
  res.answerSaved = !!(await qget('stand-book-all-r8-q16'))?.layout?.answer
  await p.screenshot({ path: `${OUT}/a2-answer-saved.png` })
  // 2) «3 попытки»: раунд 13 (индекс в списке 13), вопрос 0 — вкладка «Вопрос»
  await openPreview(13, 0)
  await p.getByRole('button', { name: 'Компоновка' }).click(); await p.waitForSelector('.lay-panel'); await p.getByRole('button', { name: 'Вручную' }).click(); await p.waitForTimeout(900)
  res.fpBoxes = await p.locator('.lay-box').count(); await p.screenshot({ path: `${OUT}/f0-fp-manual.png` })
  await drag('.lay-box.img', 0, 30); await p.getByRole('button', { name: 'Сохранить' }).click(); await p.waitForTimeout(1500)
  res.fpSaved = !!(await qget('stand-book-all-r13-q0'))?.layout?.question
  await ctx.close()
  // проектор: ответ и «3 попытки» (фаза 3 и разбор)
  for (const [w, h] of [[1920, 1080], [1280, 720]]) {
    for (const [name, id, setupId, sel] of [['answer', null, null, '.lay-answer-area'], ['fp-phase3', null, '47-fp-3', '.lay-area'], ['fp-review', null, '48-fp-review', '.lay-area']]) {
      const c2 = await b.newContext({ viewport: { width: w, height: h }, serviceWorkers: 'block' }); const pg = await c2.newPage()
      if (name === 'answer') { await api.reset(); await api.teams(4); await api.session({ pack_id: 'stand-book-all', phase: 'show_answers', round_number: 8, question_index: 16, timer_started_at: null, reveal: true }) }
      else await SCENES.find(s => s.id === setupId).setup(api)
      await pg.goto(`${ORIGIN}/quiz-party/#/?room=stand`); await pg.waitForSelector('.host-screen', { timeout: 15000 }); await pg.waitForTimeout(4500)
      res[`${name}-${w}`] = await pg.evaluate(s => ({ manual: !!document.querySelector(s), imgs: document.querySelectorAll('.lay-img img').length, text: !!document.querySelector('.lay-text') }), sel)
      await pg.screenshot({ path: `${OUT}/p-${name}-${w}.png` }); await c2.close()
    }
  }
  res.errs = errs; fs.writeFileSync(`${OUT}/result.json`, JSON.stringify(res, null, 1)); console.log(JSON.stringify(res)); await b.close(); process.exit(0)
}
main().catch(e => { console.error(e); process.exit(1) })
