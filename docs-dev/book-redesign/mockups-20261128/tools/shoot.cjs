// Рендер макетов 1920×1080 в PNG (Playwright, headless Chromium) + замеры.
// usage: NODE_PATH=/opt/node22/lib/node_modules PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node shoot.cjs <каталог PNG> [имя,имя]
// Замеры (measure.json рядом с макетами):
//  • baseline — у каждого .row[data-row] базовая линия всех текстовых ячеек (разброс ≤ 1 px);
//  • overflow — текст не шире своей ячейки (Range против clientWidth), в т.ч. «Σ» и числа: правый край с запасом;
//  • safe — все тексты внутри безопасной области x 250…1670, y 134…944 (подпись/очки не вылезают за страницу);
//  • gutter — текст не заходит на сгиб (x 930…990), кроме помеченных как «герой по центру».
'use strict'
const { chromium } = require('playwright')
const fs = require('fs')
const path = require('path')
const HERE = path.resolve(__dirname, '..')
const outDir = path.resolve(process.argv[2])
const only = (process.argv[3] || '').split(',').filter(Boolean)
const files = fs.readdirSync(HERE).filter(f => f.endsWith('.html') && (!only.length || only.includes(f.replace('.html', ''))))

function probe() {
  const SAFE = { x0: 250, x1: 1670, y0: 134, y1: 944 }, GUT = [930, 990]
  const res = { rows: [], overflow: [], safe: [], gutter: [], texts: 0 }
  const textNodes = root => { const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: n => n.nodeValue.trim() ? 1 : 3 }); const a = []; let n; while ((n = w.nextNode())) a.push(n); return a }
  // baseline
  const baselineOf = el => { const s = document.createElement('span'); s.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline'; el.insertBefore(s, el.firstChild); const y = s.getBoundingClientRect().bottom; s.remove(); return y }
  document.querySelectorAll('.row[data-row]').forEach(row => {
    const bl = []
    row.querySelectorAll(':scope > .c, :scope > span > .c').forEach(c => { if (c.textContent.trim()) bl.push({ cls: c.className.replace(/\s+/g, '.'), y: +baselineOf(c).toFixed(2) }) })
    const ys = bl.map(b => b.y)
    res.rows.push({ row: row.dataset.row, baselines: bl, spread: ys.length ? +(Math.max(...ys) - Math.min(...ys)).toFixed(2) : 0, top: +row.getBoundingClientRect().top.toFixed(1) })
  })
  // тексты
  document.querySelectorAll('.stage *').forEach(el => {
    if (el.classList.contains('cf')) return
    const own = [...el.childNodes].filter(n => n.nodeType === 3 && n.nodeValue.trim())
    if (!own.length) return
    const r = document.createRange(); r.selectNodeContents(el)
    const tb = r.getBoundingClientRect(); res.texts++
    const txt = el.textContent.trim().slice(0, 40)
    const cw = el.clientWidth
    if (cw && tb.width > cw + 1.5 && getComputedStyle(el).display !== 'inline') res.overflow.push({ txt, text: +tb.width.toFixed(1), box: cw })
    const dec = el.closest('.kicker')   // декоративные ✦ в ::before/::after не в счёт — их нет в DOM
    if (tb.left < SAFE.x0 - 0.5 || tb.right > SAFE.x1 + 0.5 || tb.top < SAFE.y0 - 0.5 || tb.bottom > SAFE.y1 + 0.5) res.safe.push({ txt, l: +tb.left.toFixed(1), r: +tb.right.toFixed(1), t: +tb.top.toFixed(1), b: +tb.bottom.toFixed(1) })
    if (tb.left < GUT[1] && tb.right > GUT[0] && !dec && !el.closest('[data-hero]')) res.gutter.push({ txt, l: +tb.left.toFixed(1), r: +tb.right.toFixed(1) })
  })
  return res
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true })
  const browser = await chromium.launch()
  const all = {}
  for (const f of files) {
    const name = f.replace('.html', '')
    const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 })
    const page = await ctx.newPage()
    const errs = []
    page.on('pageerror', e => errs.push(String(e.message)))
    page.on('requestfailed', r => errs.push('FAIL ' + r.url().slice(-60)))
    await page.goto('file://' + path.join(HERE, f))
    await page.evaluate(() => document.fonts.ready)
    await page.waitForFunction(() => [...document.images].every(i => i.complete))
    await page.waitForTimeout(300)
    const fonts = await page.evaluate(() => [...document.fonts].filter(x => x.status === 'loaded').map(x => x.family.replace(/"/g, '') + ' ' + x.weight))
    await page.screenshot({ path: path.join(outDir, name + '.png') })
    const m = await page.evaluate(probe)
    m.errors = errs; m.fonts = [...new Set(fonts)].sort()
    all[name] = m
    const worst = Math.max(0, ...m.rows.map(r => r.spread))
    console.log(`${name}: рядов ${m.rows.length}, макс. разброс базовой линии ${worst}px, переполнений ${m.overflow.length}, вне безопасной области ${m.safe.length}, на сгибе ${m.gutter.length}${errs.length ? ' ОШИБКИ ' + errs.join('; ') : ''}`)
    await ctx.close()
  }
  fs.writeFileSync(path.join(HERE, 'measure' + (only.length ? '-partial' : '') + '.json'), JSON.stringify(all, null, 1))
  await browser.close()
}
main().catch(e => { console.error(e); process.exit(1) })
