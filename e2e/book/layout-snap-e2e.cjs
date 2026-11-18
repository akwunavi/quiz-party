// ═══ Сквозная проверка умных направляющих редактора компоновки (10.72): прилипание, равный размер, выравнивание, Alt, выбор несколькими, стрелки ═══
// Вопрос «варианты текстом» (раунд 0, вопрос 7: четыре плитки А/Б/В/Г) пакета «Стенд «Книга» · телефоны». Вход в редактор — подмена Supabase Auth на уровне сети.
// usage: QP_CHROME=/usr/bin/google-chrome QP_BOOK_THEME=<тема> node e2e/book/layout-snap-e2e.cjs [--no-build] --out <каталог>
'use strict'
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path')
const argv = process.argv.slice(2); const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d }
const OUT = path.resolve(opt('--out', 'layout-snap')); const THEME = process.env.QP_BOOK_THEME || 'ny_book'
async function main() {
  const { startStand, ORIGIN } = await import('./stand.mjs')
  fs.mkdirSync(OUT, { recursive: true }); await startStand({ noBuild: argv.includes('--no-build') })
  const b = await chromium.launch(process.env.QP_CHROME ? { executablePath: process.env.QP_CHROME } : {}); const res = { theme: THEME, checks: {} }; const ck = res.checks
  const ctx = await b.newContext({ viewport: { width: Number(process.env.QP_VW) || 1920, height: Number(process.env.QP_VH) || 1080 } }); const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => { if (!/localStorage/.test(String(e))) { errs.push(String(e)); console.error('PAGEERR', String(e).slice(0, 300)) } })
  const user = { id: 'u1', aud: 'authenticated', role: 'authenticated', email: 'e@x.y', app_metadata: {}, user_metadata: {}, created_at: '2026-01-01T00:00:00Z' }
  const b64 = o => Buffer.from(JSON.stringify(o)).toString('base64url'); const jwt = `${b64({ alg: 'HS256', typ: 'JWT' })}.${b64({ sub: 'u1', exp: 4102444800, role: 'authenticated' })}.sig`
  await ctx.addInitScript(([s]) => { try { localStorage.setItem('sb-127-auth-token', JSON.stringify(s)) } catch { /* ok */ } }, [{ access_token: jwt, refresh_token: 'r', expires_in: 99999, expires_at: 4102444800, token_type: 'bearer', user }])
  await ctx.route('**/auth/v1/user', r => r.fulfill({ json: user })); await ctx.route('**/rest/v1/editor_roles*', r => r.fulfill({ json: { user_id: 'u1', role: 'owner', display_name: 'T', can_edit_all: true } }))
  await p.goto(`${ORIGIN}/quiz-party/#/editor`); await p.waitForTimeout(2500)
  await p.locator('text=Стенд «Книга» · телефоны').locator('xpath=ancestor::*[.//button[contains(.,"Открыть")]][1]').getByText('Открыть').first().click(); await p.waitForTimeout(1500)
  await p.locator('button[data-tip="Редактировать"]').nth(0).click(); await p.waitForTimeout(1500)
  await p.locator('button[data-tip="Предпросмотр"]').nth(7).click(); await p.waitForSelector('.pv-backdrop .host-screen', { timeout: 15000 }); await p.waitForTimeout(2500)
  await p.getByRole('button', { name: 'Компоновка' }).click(); await p.waitForSelector('.lay-panel'); await p.getByRole('button', { name: 'Вручную' }).click(); await p.waitForTimeout(800)
  // панель свёрнута по умолчанию (одна строка) — разворачиваем только для кнопок выравнивания; жесты идут при свёрнутой
  const panel = async on => { const t = p.locator('.lay-toggle'); if ((await t.getAttribute('aria-expanded')) !== String(on)) await t.click(); await p.waitForTimeout(150) }
  ck.panelDefaultCollapsed = (await p.locator('.lay-toggle').getAttribute('aria-expanded')) === 'false'
  ck.panelCollapsedHeight = Math.round((await p.locator('.lay-panel').boundingBox()).height)
  await p.screenshot({ path: `${OUT}/8-panel-collapsed.png` })
  const tile = i => p.locator('.lay-box.tile').nth(i)
  const bb = async i => tile(i).boundingBox()
  const area = await p.locator('.lay-ed-area').boundingBox()
  ck.tiles = await p.locator('.lay-box.tile').count()
  // Начало: пользователь «сбивает» плитки — разные размеры и отступы
  const drag = async (el, dx, dy, o = {}) => {
    const b0 = await el.boundingBox(); const sx = o.handle ? b0.x + b0.width - 5 : b0.x + b0.width / 2, sy = o.handle ? b0.y + b0.height - 5 : b0.y + b0.height / 2
    await p.mouse.move(sx, sy); if (o.alt) await p.keyboard.down('Alt'); await p.mouse.down(); await p.mouse.move(sx + dx * 0.6, sy + dy * 0.6, { steps: 4 }); await p.mouse.move(sx + dx, sy + dy, { steps: 4 })
    const live = { lines: await p.locator('.lay-guide').count(), eq: await p.locator('.lay-eq').count(), gaps: await p.locator('.lay-gap').count() }
    if (o.shot) await p.screenshot({ path: `${OUT}/${o.shot}.png` })
    await p.mouse.up(); if (o.alt) await p.keyboard.up('Alt'); await p.waitForTimeout(150); return live
  }
  // сначала разнести: плитка 1 — вниз-вправо, плитка 2 — вниз; размеры изменить у плитки 3
  await drag(tile(1), 120, 140); await drag(tile(2), -40, 260); await drag(tile(3), 200, -90)
  await p.screenshot({ path: `${OUT}/1-scattered.png` })

  // 1) перетаскивание: левый край плитки 1 в 3 px от левого края плитки 0 → прилипает, видна вертикальная направляющая
  { const a = await bb(0), c = await bb(1); const live = await drag(tile(1), a.x - c.x + 3, 0, { shot: '2-snap-edge-during' }); const c2 = await bb(1)
    ck.snapEdge = { guideLinesDuring: live.lines, dx: +(c2.x - a.x).toFixed(2) } }
  // 2) Alt: то же самое с Alt — привязки нет (смещение остаётся ≈ 3 px), направляющих нет
  { const a = await bb(0), c = await bb(2); const live = await drag(tile(2), a.x - c.x + 3, 0, { alt: true, shot: '3-alt-no-snap-during' }); const c2 = await bb(2)
    ck.altNoSnap = { guideLinesDuring: live.lines, dx: +(c2.x - a.x).toFixed(2) } }
  // 3) центры: плитка 2 по центру экрана (центр области) — направляющая центра
  { const c = await bb(2); const target = area.x + area.width / 2 - c.width / 2; const live = await drag(tile(2), target - c.x + 2, 0, { shot: '4-snap-center-during' }); const c2 = await bb(2)
    ck.snapCenter = { guideLinesDuring: live.lines, centerOffsetPx: +(c2.x + c2.width / 2 - (area.x + area.width / 2)).toFixed(2) } }
  // 4) растягивание: ширина/высота плитки 3 → как у плитки 0 (+3 px) — «те же размеры»
  { const a = await bb(0), c = await bb(3); const live = await drag(tile(3).locator('.lay-handle'), a.width - c.width + 3, a.height - c.height + 3, { shot: '5-snap-size-during' }); const c2 = await bb(3)
    ck.snapSize = { eqBadgesDuring: live.eq, dw: +(c2.width - a.width).toFixed(2), dh: +(c2.height - a.height).toFixed(2) } }
  // 5) выбор несколькими: Shift-клик по плиткам 0,1,3 → выделено 3; кнопки «Лево» + «= Ширина» + «⇕ Распределить»
  const free = async i => { const b0 = await bb(i); for (const fy of [0.5, 0.25, 0.75, 0.1, 0.9]) for (const fx of [0.5, 0.3, 0.7, 0.15, 0.85, 0.05, 0.95]) { const x = b0.x + b0.width * fx, y = b0.y + b0.height * fy; const ok = await p.evaluate(([x, y]) => (document.elementFromPoint(x, y)?.closest('.lay-box') || {}).dataset?.key, [x, y]); if (ok === 'tile' + i) return { x, y } } throw new Error('tile ' + i + ' fully covered') }
  { const pt = await free(0); await p.mouse.click(pt.x, pt.y) }   // обычный клик — выбрана одна
  for (const i of [1, 3]) { const pt = await free(i); await p.keyboard.down('Shift'); await p.mouse.click(pt.x, pt.y); await p.keyboard.up('Shift') }
  ck.selectedByShift = await p.locator('.lay-box.sel').count()
  await panel(true); await p.waitForTimeout(400); await p.screenshot({ path: `${OUT}/9-panel-expanded.png` }); ck.panelExpanded = { opacity: await p.locator('.lay-panel').evaluate(e => getComputedStyle(e).opacity), chip: await p.locator('.lay-chip').textContent(), stored: await p.evaluate(() => localStorage.getItem('qp-lay-panel')), height: Math.round((await p.locator('.lay-panel').boundingBox()).height), bottomGap: Math.round((Number(process.env.QP_VH) || 1080) - (await p.locator('.lay-panel').boundingBox()).y - (await p.locator('.lay-panel').boundingBox()).height), saveColor: await p.locator('.lay-btn.ok').evaluate(e => getComputedStyle(e).backgroundColor), cancelColor: await p.locator('.lay-btn.danger').evaluate(e => getComputedStyle(e).backgroundColor) }; await p.locator('button[title="По левому краю"]').click(); await p.locator('button[title^="Одинаковая высота"]').click(); await p.locator('button[title^="Равные промежутки по вертикали"]').click(); await panel(false); await p.waitForTimeout(200)
  { const r = []; for (const i of [0, 1, 3]) r.push(await bb(i)); r.sort((x, y) => x.y - y.y)
    ck.align3 = { lefts: r.map(x => +x.x.toFixed(2)), heights: r.map(x => +x.height.toFixed(2)), gaps: [+(r[1].y - r[0].y - r[0].height).toFixed(2), +(r[2].y - r[1].y - r[1].height).toFixed(2)] }
    await p.screenshot({ path: `${OUT}/6-aligned-three.png` }) }
  // 6) рамка-выделение по пустому месту (всё поле) → выбраны все рамки
  await p.mouse.move(area.x + 3, area.y + area.height * 0.55); await p.mouse.down(); await p.mouse.move(area.x + area.width - 3, area.y + area.height - 3, { steps: 6 })
  ck.marqueeDuring = await p.locator('.lay-marq').count(); await p.screenshot({ path: `${OUT}/7-marquee.png` }); await p.mouse.up()
  ck.marqueeSelected = await p.locator('.lay-box.sel').count()
  // 7) стрелки: выбрать одну плитку, → и Shift+→
  await tile(0).click({ position: { x: 6, y: 6 } }); const k0 = await bb(0)
  await p.keyboard.press('ArrowRight'); const k1 = await bb(0); await p.keyboard.press('Shift+ArrowRight'); const k2 = await bb(0)
  ck.arrows = { small: +(k1.x - k0.x).toFixed(2), big: +(k2.x - k1.x).toFixed(2), areaW: Math.round(area.width) }
  // 8) сохранение: формат v:2, рамки только x,y,w,h, без новых ключей
  await p.getByRole('button', { name: 'Сохранить' }).click(); await p.waitForTimeout(1500)
  const row = await p.evaluate(async id => (await fetch(`/sb/rest/v1/pack_questions?id=eq.${id}&select=service`, { headers: { apikey: 'x' } })).json(), 'stand-book-r0-q7').catch(() => null)
  const lay = row && row[0] && row[0].service && row[0].service.layout && row[0].service.layout.question
  ck.saved = lay ? { v: lay.v, keys: Object.keys(lay).sort(), tileKeys: [...new Set((lay.tiles || []).flatMap(t => Object.keys(t)))].sort(), tiles: (lay.tiles || []).length } : null
  ck.errs = errs
  fs.writeFileSync(`${OUT}/result.json`, JSON.stringify(res, null, 1)); console.log(JSON.stringify(res)); await b.close(); process.exit(0)
}
main().catch(e => { console.error(e); process.exit(1) })
