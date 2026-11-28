// ═══ «Книга»: как палитра цветов команд (lib/teamColors.ts) смотрится на пергаменте — кадры для оценки, ничего не внедряет (10.75) ═══
// usage: QP_BOOK_SCRATCH=… QP_BOOK_PORT=… NODE_PATH=<playwright> node e2e/book/team-palette-shot.cjs [--no-build] --shots <каталог>
// Лобби на 16 командах (первые 16 цветов палитры) в четырёх видах: как есть / (а) тёплое подкрашивание на проекторе / (б) урезанная «книжная» палитра / (в) без цвета, только значок.
// Варианты (а)–(в) подменяют --tmc из страницы (JS), в код и данные ничего не пишется.
'use strict'
const { chromium } = require('playwright'); const path = require('path'), fs = require('fs')
const argv = process.argv.slice(2); const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d }
const SHOTS = opt('--shots', '.')
const BOOK = ['#b3263a', '#c2652a', '#c9a14a', '#5a8f3c', '#2f7f78', '#2c5f9e', '#6b4a9a', '#b0487a', '#7a4a2a', '#5a6b7d', '#8a9a2e', '#d08a2a', '#9c3f2f', '#3f7a54', '#4a5f8f', '#a8745a']
;(async () => {
  const { startStand, ORIGIN, PIN } = await import('./stand.mjs'); const { makeApi } = await import('./scenes.mjs')
  await startStand({ noBuild: argv.includes('--no-build') }); const api = makeApi(ORIGIN, PIN); const b = await chromium.launch()
  fs.mkdirSync(SHOTS, { recursive: true })
  await api.reset(); await api.teams(16); await api.session({ pack_id: 'stand-book', phase: 'lobby', round_number: 0, question_index: 0 })
  for (const v of [1, 2, 3]) {
    const ctx = await b.newContext({ viewport: { width: 1920, height: 1080 }, serviceWorkers: 'block' }); const p = await ctx.newPage()
    await p.goto(`${ORIGIN}/quiz-party/#/?room=stand&bktm=${v}`); await p.waitForSelector('.bk-tc'); await p.waitForTimeout(3500)
    const clip = { x: 1000, y: 300, width: 700, height: 640 }
    const mode = async (name, fn) => { await p.evaluate(fn, BOOK); await p.waitForTimeout(300); await p.screenshot({ path: path.join(SHOTS, `palette-v${v}-${name}.png`), clip }) }
    await p.screenshot({ path: path.join(SHOTS, `palette-v${v}-0-asis.png`), clip })
    // (а) подкрашивание к тёплому: 25 % к #8a5a2a (янтарно-коричневый), идентичность цвета сохраняется «по оттенку», но слабее
    await mode('a-warm', () => { for (const e of document.querySelectorAll('.bk-tc [style*="--tmc"]')) { const c = e.style.getPropertyValue('--tmc').trim(); const h = c.slice(1).match(/../g).map(x => parseInt(x, 16)); const t = [0x8a, 0x5a, 0x2a]; e.style.setProperty('--tmc', '#' + h.map((x, i) => Math.round(x * .75 + t[i] * .25).toString(16).padStart(2, '0')).join('')) } })
    // (б) урезанная палитра: первые 16 цветов заменены на «книжные» (красный, ржавый, золото, ель, бирюза, синий, слива…)
    await mode('b-bookpalette', books => { let i = 0; for (const e of document.querySelectorAll('.bk-tc [style*="--tmc"]')) e.style.setProperty('--tmc', books[i++ % books.length]) })
    // (в) без цвета: цвет убран, остаётся только значок (все диски — золото оправы)
    await mode('c-iconly', () => { for (const e of document.querySelectorAll('.bk-tc [style*="--tmc"]')) e.style.setProperty('--tmc', '#c9a14a') })
    await ctx.close()
  }
  await b.close(); process.exit(0)
})().catch(e => { console.error(e); process.exit(1) })
