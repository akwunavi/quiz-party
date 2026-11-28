// Проверка кроссворда игрока в headless Chromium по стенду (harness.tsx). Числа, не «на глаз».
// usage: NODE_PATH=/opt/node-tools/node_modules node e2e/player-crossword/check.cjs <папка-сборки-стенда> [папка-кадров]
'use strict'
const { chromium } = require('playwright')
const http = require('http'), fs = require('fs'), path = require('path')
const root = process.argv[2], shots = process.argv[3]
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.png': 'image/png' }
const srv = http.createServer((req, res) => {
  const f = path.join(root, decodeURIComponent(req.url.split('?')[0]).replace(/^\/$/, '/harness.html'))
  fs.readFile(f, (e, d) => { if (e) { res.writeHead(404); res.end() } else { res.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' }); res.end(d) } })
})
const DEV = [
  { name: 'iPhone15-393x852', w: 393, h: 852, kb: 336, dpr: 3 },
  { name: 'iPhone16Pro-402x874', w: 402, h: 874, kb: 336, dpr: 3 },
  { name: 'iPhoneMax-430x932', w: 430, h: 932, kb: 340, dpr: 3 },
  { name: 'iPhone17Max-440x956', w: 440, h: 956, kb: 340, dpr: 3 },
  { name: 'Android-360x800', w: 360, h: 800, kb: 300, dpr: 3 },
  { name: 'Pixel-412x915', w: 412, h: 915, kb: 320, dpr: 2.6 },
  { name: 'Android-384x854', w: 384, h: 854, kb: 310, dpr: 2.8 },
  { name: 'tablet-768x1024', w: 768, h: 1024, kb: 400, dpr: 2 },
]
const state = () => {
  const p = document.querySelector('.pl-crossword'), v = document.querySelector('.pl-cw-view'), g = document.querySelector('.cw-grid')
  const cur = [...document.querySelectorAll('.cw-cell.current')]
  const vr = v ? v.getBoundingClientRect() : null
  const cells = cur.map(c => c.getBoundingClientRect())
  const inView = cells.length > 0 && vr ? cells.every(r => r.left >= vr.left - 1 && r.right <= vr.right + 1 && r.top >= vr.top - 1 && r.bottom <= vr.bottom + 1) : null
  // видимы ли ХОТЯ БЫ клетки слова целиком, когда слово длиннее окна — достаточно, чтобы часть была внутри
  const anyIn = cells.length > 0 && vr ? cells.some(r => r.left >= vr.left - 1 && r.right <= vr.right + 1 && r.top >= vr.top - 1 && r.bottom <= vr.bottom + 1) : null
  const cell = document.querySelector('.cw-cell:not(.empty)')
  const input = document.querySelector('.pl-card input')
  const ir = input.getBoundingClientRect()
  return {
    innerW: innerWidth, innerH: innerHeight, vvH: Math.round(visualViewport.height),
    docScrollW: document.documentElement.scrollWidth, bodyScrollW: document.body.scrollWidth,
    panelTop: p ? Math.round(p.getBoundingClientRect().top) : null, panelH: p ? Math.round(p.offsetHeight) : null,
    cellPx: cell ? Math.round(cell.getBoundingClientRect().width) : null,
    gridW: g ? Math.round(g.getBoundingClientRect().width) : null, viewW: v ? Math.round(v.clientWidth) : null, viewH: v ? Math.round(v.clientHeight) : null,
    viewScrollW: v ? v.scrollWidth : null, viewScrollH: v ? v.scrollHeight : null,
    fitsWidth: v ? v.scrollWidth <= v.clientWidth + 1 : null,
    wordFullyInView: inView, wordAnyCellInView: anyIn,
    inputTop: Math.round(ir.top), inputBottom: Math.round(ir.bottom), inputUnderPanel: p ? ir.top < p.getBoundingClientRect().bottom - 1 : null,
    inputVisible: ir.top >= 0 && ir.bottom <= visualViewport.height,
    pageScrollY: Math.round(scrollY),
  }
}
;(async () => {
  await new Promise(r => srv.listen(0, r))
  const origin = `http://127.0.0.1:${srv.address().port}`
  const b = await chromium.launch()
  const out = []
  const fails = []
  const expect = (cond, msg) => { if (!cond) fails.push(msg) }
  for (const d of DEV) for (const theme of ['classic', 'potter', 'new_year', 'ny_book']) for (const n of [7, 11, 15]) {
    // полный прогон только для classic+ny_book; остальные темы — только базовые замеры на 11
    const full = (theme === 'classic' || theme === 'ny_book') || n === 11
    if (!full) continue
    const ctx = await b.newContext({ viewport: { width: d.w, height: d.h }, deviceScaleFactor: d.dpr, isMobile: true, hasTouch: true, serviceWorkers: 'block' })
    const page = await ctx.newPage()
    const tag = `${d.name}/${theme}/${n}x${n}`
    await page.goto(`${origin}/harness.html?theme=${theme}&n=${n}&cur=${n > 9 ? 3 : 1}`)
    await page.waitForSelector('.cw-grid')
    await page.waitForTimeout(300)
    const rec = { tag }
    rec.start = await page.evaluate(state)
    expect(rec.start.docScrollW <= rec.start.innerW, `${tag}: горизонтальный скролл страницы ${rec.start.docScrollW}>${rec.start.innerW}`)
    if (rec.start.cellPx > 14) expect(rec.start.fitsWidth, `${tag}: сетка не вписана по ширине`)
    expect(rec.start.wordAnyCellInView, `${tag}: слово вне окна сетки`)
    expect(rec.start.panelTop >= 0 && rec.start.panelTop <= 60, `${tag}: панель не на месте ${rec.start.panelTop}`)
    if (shots && theme === 'ny_book' && n === 11 || shots && theme === 'classic' && n === 15) await page.screenshot({ path: path.join(shots, `${d.name}-${theme}-${n}-1-start.png`) })
    // клавиатура: окно ниже на kb, поле ввода в фокусе, браузер подкручивает страницу к полю
    await page.setViewportSize({ width: d.w, height: d.h - d.kb })
    await page.waitForTimeout(250)
    await page.focus('.pl-card input')
    await page.evaluate(() => { document.querySelector('.pl-card input').scrollIntoView({ block: 'center' }) })
    await page.waitForTimeout(250)
    rec.kb = await page.evaluate(state)
    expect(rec.kb.panelTop >= 0, `${tag}: с клавиатурой панель уехала вверх за экран, top=${rec.kb.panelTop}`)
    rec.stuck = await page.evaluate(() => { window.scrollTo(0, 99999); return Math.round(document.querySelector('.pl-crossword').getBoundingClientRect().top) })
    expect(rec.stuck === 0, `${tag}: при прокрутке страницы панель не прилипла, top=${rec.stuck}`)
    await page.evaluate(() => document.querySelector('.pl-card input').scrollIntoView({ block: 'center' }))
    expect(rec.kb.inputUnderPanel === false, `${tag}: поле ввода под панелью`)
    expect(rec.kb.inputVisible, `${tag}: поле ввода не видно (top ${rec.kb.inputTop}, bottom ${rec.kb.inputBottom}, vv ${rec.kb.vvH})`)
    expect(rec.kb.wordAnyCellInView, `${tag}: с клавиатурой слово вне окна сетки`)
    expect(rec.kb.docScrollW <= rec.kb.innerW, `${tag}: с клавиатурой горизонтальный скролл`)
    expect(rec.kb.cellPx === rec.start.cellPx, `${tag}: клетка прыгнула при клавиатуре ${rec.start.cellPx}→${rec.kb.cellPx}`)
    if (shots && theme === 'ny_book' && n === 11 || shots && theme === 'classic' && n === 15) await page.screenshot({ path: path.join(shots, `${d.name}-${theme}-${n}-2-keyboard.png`) })
    // зум кнопкой +, двойной тап, перемещение, слово остаётся в зоне
    await page.setViewportSize({ width: d.w, height: d.h })
    await page.waitForTimeout(200)
    await page.click('.pl-cw-zoom button[aria-label="Увеличить"]')
    await page.click('.pl-cw-zoom button[aria-label="Увеличить"]')
    await page.waitForTimeout(150)
    rec.zoom = await page.evaluate(state)
    expect(rec.zoom.cellPx > rec.start.cellPx * 1.5, `${tag}: зум не увеличил клетку ${rec.start.cellPx}→${rec.zoom.cellPx}`)
    expect(rec.zoom.docScrollW <= rec.zoom.innerW, `${tag}: при зуме горизонтальный скролл страницы`)
    expect(rec.zoom.wordAnyCellInView || rec.zoom.wordFullyInView === false, `${tag}: после зума слово пропало`)
    await page.click('.pl-cw-zoom button[aria-label="Вся сетка"]')
    await page.waitForTimeout(100)
    if (n === 11) {
      const r0 = await page.evaluate(() => { const r = document.querySelector('.pl-cw-view').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 } })
      await page.touchscreen.tap(r0.x, r0.y); await page.waitForTimeout(80); await page.touchscreen.tap(r0.x, r0.y)
      await page.waitForTimeout(200)
      rec.dbl = await page.evaluate(() => ({ zoom: document.querySelector('.pl-crossword').dataset.zoom }))
      expect(rec.dbl.zoom === '2.20', `${tag}: двойной тап не увеличил (${rec.dbl.zoom})`)
      // перемещение: прокрутка внутри увеличенной сетки не сдвигает страницу
      const pan = await page.evaluate(() => { const v = document.querySelector('.pl-cw-view'); const y0 = scrollY; v.scrollLeft = 200; v.scrollTop = 150; return { sl: v.scrollLeft, st: v.scrollTop, pageMoved: scrollY !== y0 } })
      rec.pan = pan
      expect(pan.sl > 0 && pan.st > 0 && !pan.pageMoved, `${tag}: панорама не работает ${JSON.stringify(pan)}`)
      if (shots && theme === 'ny_book' && d.name.startsWith('iPhone15')) await page.screenshot({ path: path.join(shots, `${d.name}-${theme}-${n}-3-zoom.png`) })
      // тап по клетке другого слова выбирает его, слово подкручивается в окно
      const sel = await page.evaluate(() => {
        const v = document.querySelector('.pl-cw-view'); v.scrollLeft = 0; v.scrollTop = 0
        const cells = [...document.querySelectorAll('.cw-cell:not(.empty)')]
        const c = cells[cells.length - 1]; c.click()
        return true
      })
      await page.waitForTimeout(250)
      rec.pick = await page.evaluate(state)
      expect(rec.pick.wordAnyCellInView, `${tag}: после выбора слова оно не в окне`)
      expect(rec.pick.docScrollW <= rec.pick.innerW, `${tag}: после выбора горизонтальный скролл`)
      void sel
    }
    out.push(rec)
    await ctx.close()
  }
  // «до»: прежняя разметка, для сравнения
  if (shots) for (const d of DEV.slice(0, 2)) for (const n of [11, 15]) {
    const ctx = await b.newContext({ viewport: { width: d.w, height: d.h }, deviceScaleFactor: d.dpr, isMobile: true, hasTouch: true, serviceWorkers: 'block' })
    const page = await ctx.newPage()
    await page.goto(`${origin}/harness.html?theme=ny_book&n=${n}&cur=3&old=1`)
    await page.waitForSelector('.cw-grid'); await page.waitForTimeout(300)
    const s0 = await page.evaluate(() => ({ cell: Math.round(document.querySelector('.cw-cell:not(.empty)').getBoundingClientRect().width), docW: document.documentElement.scrollWidth }))
    await page.setViewportSize({ width: d.w, height: d.h - d.kb })
    await page.focus('.pl-card input')
    await page.evaluate(() => document.querySelector('.pl-card input').scrollIntoView({ block: 'center' }))
    await page.waitForTimeout(250)
    const s1 = await page.evaluate(() => ({ gridTop: Math.round(document.querySelector('.cw-grid').getBoundingClientRect().top), gridBottom: Math.round(document.querySelector('.cw-grid').getBoundingClientRect().bottom) }))
    out.push({ tag: `OLD ${d.name}/${n}`, s0, s1 })
    await page.screenshot({ path: path.join(shots, `before-${d.name}-ny_book-${n}-keyboard.png`) })
    await ctx.close()
  }
  console.log('| устройство | тема | сетка | клетка | влезает по ширине | слово видно (старт) | слово видно (клавиатура) | поле ввода видно |')
  for (const r of out.filter(r => r.start && r.tag.includes('classic') || r.tag.includes('ny_book'))) console.log(`| ${r.tag.split('/').join(' | ')} | ${r.start.cellPx}px | ${r.start.fitsWidth ? 'да' : 'нет (прокрутка)'} | ${r.start.wordAnyCellInView ? 'да' : 'НЕТ'} | ${r.kb.wordAnyCellInView ? 'да' : 'НЕТ'} | ${r.kb.inputVisible ? 'да' : 'НЕТ'} |`)
  await b.close(); srv.close()
  fs.writeFileSync(path.join(process.env.CHECK_OUT || '.', 'player-crossword-check.json'), JSON.stringify(out, null, 1))
  console.log(`сценариев: ${out.length}, нарушений: ${fails.length}`)
  fails.forEach(f => console.log('FAIL', f))
  process.exit(fails.length ? 1 : 0)
})()
