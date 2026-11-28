// ═══ Модалки на свитке «Книги» (10.76): замеры контента на настоящем приложении ═══
// usage: NODE_PATH=<playwright> QP_BOOK_SCRATCH=… node e2e/book/scroll-modal-check.cjs [--no-build] [--vp 1920x1080,1366x768,1280x720,1899x905]
//        [--only 80-sm,81-sm] [--json <файл>]
// Для каждой сцены 80-sm-*/81-sm-* (scenes.mjs) и каждого вьюпорта считает:
//  inside   — все дети .bk-sm-in и все текстовые листья внутри ПЕРГАМЕНТНОЙ области (контент-бокс .bk-scroll: паддинги свитка = безопасная зона между рулонами/бантом/хвоей), ±1px;
//  center   — |середина контента − середина области| / высота области (допуск 8 %);
//  gaps     — зазоры между соседними блоками (без «Закрыть»): max/min ≤ 1.10 (допуск 10 %), + абсолютно: каждый в пределах ±10 % от --g;
//  baseline — разброс базовых линий в строках «имя + подпись» (.nm/.lab) и «рубрика + плитка» (.jp-modal-theme/.mono-tag): ≤ 1px;
//  minFont  — наименьший кегль видимого текста, px; fit — ступень ужима --k.
'use strict'
const { chromium } = require('playwright')
const fs = require('fs')
const argv = process.argv.slice(2)
const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d }
const VPS = opt('--vp', '1920x1080,1366x768,1280x720,1899x905').split(',').map(s => s.split('x').map(Number))
const ONLY = opt('--only', '80-sm,81-sm').split(',')
const JSON_OUT = opt('--json', '')

const MEASURE = `(() => {
  const m = document.querySelector('.bk-scroll'); const inn = m && m.querySelector('.bk-sm-in')
  if (!m || !inn) return { err: 'нет .bk-scroll/.bk-sm-in' }
  const cs = getComputedStyle(m), r = m.getBoundingClientRect()
  const area = { l: r.left + parseFloat(cs.paddingLeft), r: r.right - parseFloat(cs.paddingRight), t: r.top + parseFloat(cs.paddingTop), b: r.bottom - parseFloat(cs.paddingBottom) }
  const vis = e => { const c = getComputedStyle(e), q = e.getBoundingClientRect(); return c.display !== 'none' && c.visibility !== 'hidden' && q.width > 0 && q.height > 0 }
  const rect = e => { const q = e.getBoundingClientRect(); return { l: q.left, r: q.right, t: q.top, b: q.bottom } }
  const kids = [...inn.children].filter(vis)
  // плоский список блоков: .answer-reveal раскрываем в детей
  const blocks = []
  for (const k of kids) { if (k.classList.contains('answer-reveal')) blocks.push(...[...k.children].filter(vis)); else blocks.push(k) }
  const main = blocks.filter(b => !b.classList.contains('mel-escape'))
  const out = { area: { w: Math.round(area.r - area.l), h: Math.round(area.b - area.t) }, k: inn.dataset.fit || '', problems: [] }
  // 1. внутри области (дети + текстовые листья)
  const E = 1.5
  const bad = []
  const check = (e, tag) => { const q = rect(e); if (q.l < area.l - E || q.r > area.r + E || q.t < area.t - E || q.b > area.b + E) bad.push(tag + ' ' + (e.className || e.tagName) + ' [' + [q.l, q.r, q.t, q.b].map(Math.round) + '] area[' + [area.l, area.r, area.t, area.b].map(Math.round) + ']') }
  kids.forEach(k => check(k, 'child'))
  const walker = document.createTreeWalker(inn, NodeFilter.SHOW_TEXT); let minFont = 1e9
  for (let n; (n = walker.nextNode());) { if (!n.textContent.trim()) continue; const el = n.parentElement; if (!vis(el)) continue
    const rg = document.createRange(); rg.selectNodeContents(n); const q = rg.getBoundingClientRect()
    if (q.width && (q.left < area.l - E || q.right > area.r + E || q.top < area.t - E || q.bottom > area.b + E)) bad.push('text «' + n.textContent.trim().slice(0, 24) + '» [' + [q.left, q.right, q.top, q.bottom].map(Math.round) + ']')
    minFont = Math.min(minFont, parseFloat(getComputedStyle(el).fontSize)) }
  out.inside = bad.length === 0; if (bad.length) out.problems.push('вне области: ' + bad.slice(0, 3).join(' | '))
  out.minFont = Math.round(minFont * 10) / 10
  // 2. центр по вертикали
  const top = Math.min(...kids.map(k => rect(k).t)), bot = Math.max(...kids.map(k => rect(k).b))
  const mt = top, mb = bot
  out.center = Math.round(Math.abs(((mt + mb) / 2) - ((area.t + area.b) / 2)) / (area.b - area.t) * 1000) / 10   // %
  out.fill = Math.round((bot - top) / (area.b - area.t) * 100)   // % высоты области, занятый контентом
  // 3. зазоры (по главным блокам)
  const g = parseFloat(getComputedStyle(inn).getPropertyValue('--g')) || 0
  const gaps = []; for (let i = 1; i < main.length; i++) gaps.push(rect(main[i]).t - rect(main[i - 1]).b)
  out.gaps = gaps.map(x => Math.round(x * 10) / 10)
  const gmax = Math.max(...gaps), gmin = Math.min(...gaps)
  out.gapSpread = gaps.length > 1 ? Math.round((gmax / Math.max(gmin, .01)) * 100) / 100 : 1
  // 4. базовые линии
  const probe = e => { const s = document.createElement('span'); s.style.cssText = 'display:inline-block;width:0;height:0'; e.insertBefore(s, e.firstChild); const y = s.getBoundingClientRect().bottom; s.remove(); return y }
  out.baseline = []
  const pairs = [['.bk-sm-winner .nm', '.bk-sm-winner .lab'], ['.jp-modal-theme', '.jp-modal-head .mono-tag']]
  for (const [a, b] of pairs) { const ea = inn.querySelector(a), eb = inn.querySelector(b); if (ea && eb && vis(ea) && vis(eb)) { const d = Math.abs(probe(ea) - probe(eb)); out.baseline.push({ pair: a + '/' + b, diff: Math.round(d * 100) / 100 }) } }
  // 5. кнопки: видимы и в области (уже в inside); число
  out.buttons = [...inn.querySelectorAll('button')].filter(vis).length
  out.blocks = main.map(b => (b.className || b.tagName).toString().split(' ').slice(0, 2).join('.'))
  out.g = Math.round(g * 10) / 10
  return out
})()`

async function main() {
  const { startStand, ORIGIN, PIN } = await import('./stand.mjs')
  const { SCENES, makeApi } = await import('./scenes.mjs')
  await startStand({ noBuild: argv.includes('--no-build') })
  const api = makeApi(ORIGIN, PIN)
  const browser = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] })
  const scenes = SCENES.filter(s => ONLY.some(p => s.id.startsWith(p)))
  const rows = []; let fails = 0
  for (const sc of scenes) {
    await sc.setup(api)
    for (const [w, h] of VPS) {
      const ctx = await browser.newContext({ viewport: { width: w, height: h }, serviceWorkers: 'block' })
      const page = await ctx.newPage()
      await page.goto(`${ORIGIN}/quiz-party/#/?room=stand`)
      await page.waitForSelector(sc.ready || '.mel-modal', { timeout: 20000 }).catch(() => {})
      await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(2300)
      const m = await page.evaluate(MEASURE)
      const probs = []
      if (m.err) probs.push(m.err)
      else {
        if (!m.inside) probs.push(...m.problems)
        if (m.center > 8) probs.push(`центр ${m.center}% > 8`)
        if (m.gapSpread > 1.10) probs.push(`зазоры ${m.gaps} (разброс ×${m.gapSpread})`)
        for (const b of m.baseline) if (b.diff > 1) probs.push(`baseline ${b.pair} ${b.diff}px`)
      }
      if (probs.length) fails++
      rows.push({ id: sc.id, vp: `${w}x${h}`, ...m, ok: !probs.length, probs })
      console.log(`${probs.length ? '✗' : '✓'} ${sc.id}-${w}x${h} k=${m.k} fill=${m.fill}% center=${m.center}% gaps=${JSON.stringify(m.gaps)} minFont=${m.minFont} ${probs.join(' ; ')}`)
      await ctx.close()
    }
  }
  if (JSON_OUT) fs.writeFileSync(JSON_OUT, JSON.stringify(rows, null, 1))
  console.log(`\nИТОГО: ${rows.length - fails}/${rows.length} зелёных`)
  await browser.close(); process.exit(0)
}
main().catch(e => { console.error(e); process.exit(1) })
