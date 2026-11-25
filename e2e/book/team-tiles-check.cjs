// ═══ «Книга»: плитки команд и цветной значок (10.75, ?bktm=1|2|3) — замеры пересечений и снимки ═══
// usage: QP_BOOK_SCRATCH=… NODE_PATH=<playwright> node e2e/book/team-tiles-check.cjs [--no-build] [--tm 1,2,3] [--vp all|main] [--shots <каталог>] [--only <подстрока id>]
// Для каждой плитки (.bk-tc) на экране: значок (самоцвет/закладка/печать) не заходит на текст имени и на счётчик; имя внутри своей области, без разрыва слов
// посередине (Range каждого слова = одна строка), кегль имени ≥ 9 px; плитки не пересекаются друг с другом; плитки «Отвечайте!» не заходят на таймер и заголовок и лежат выше сугробов.
'use strict'
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path')
const argv = process.argv.slice(2); const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d }
const SHOTS = opt('--shots', ''), TMS = opt('--tm', '1').split(',').map(Number), ONLY = opt('--only', ''), VPSEL = opt('--vp', 'all')
const VPS = VPSEL === 'main' ? [[1920, 1080]] : /^\d+x\d+(,\d+x\d+)*$/.test(VPSEL) ? VPSEL.split(',').map(s => s.split('x').map(Number)) : [[1920, 1080], [1366, 768], [1280, 720], [1899, 905], [3840, 2160]]
const SHOT_IDS = ['at01', 'at04', 'at08', 'at16', 'at24', '01-lobby-8', '01-lobby-24', '11-revealed-plain', '32-scoreboard', '39-jp-answer', '54-mel-bids', '49-anagram-8', '74-anagram-race-t6', '41-blitz-turn', '16-award-1', '01-lobby-names']
const inter = (a, b) => { const w = Math.min(a.r, b.r) - Math.max(a.l, b.l), h = Math.min(a.b, b.b) - Math.max(a.t, b.t); return w > 0.5 && h > 0.5 ? Math.round(w * h) : 0 }
;(async () => {
  const { startStand, ORIGIN, PIN } = await import('./stand.mjs'); const { makeApi, SCENES } = await import('./scenes.mjs')
  await startStand({ noBuild: argv.includes('--no-build') }); const api = makeApi(ORIGIN, PIN); const b = await chromium.launch(); let bad = 0, total = 0
  if (SHOTS) fs.mkdirSync(SHOTS, { recursive: true })
  const byId = id => SCENES.find(s => s.id === id)
  const answerTime = n => ({ id: `at${String(n).padStart(2, '0')}`, ready: '.answer-pulse', settle: 2500, async setup(a) {
    await a.reset(); const ts = n ? await a.teams(n) : []
    await a.answers(ts.flatMap((t, i) => Array.from({ length: i % 4 === 0 ? 10 : i % 4 === 1 ? 4 : 0 }, (_, qi) => ({ team_id: t.id, question_ref: `q-0-${qi}`, round_number: 0, answer_text: 'ответ' }))))
    await a.session({ pack_id: 'stand-book', phase: 'answer_time', round_number: 0, question_index: 9, timer_started_at: new Date(Date.now() - 12000).toISOString(), reveal: false }) } })
  const lobby = n => byId(`01-lobby-${n}`)
  const scenes = [...[0, 1, 4, 8, 16, 24].map(answerTime), ...[0, 4, 8, 16, 24].map(lobby), byId('11-revealed-plain'), byId('32-scoreboard'), byId('40-blitz-dice'), byId('41-blitz-turn'), byId('16-award-1'), byId('01-lobby-names'), byId('39-jp-answer'), byId('54-mel-bids'), byId('53-mel-bidding'), byId('49-anagram-8'), byId('49-anagram-16'), byId('74-anagram-race-t6')]
    .filter(Boolean).filter(s => !ONLY || s.id.includes(ONLY))
  for (const tm of TMS) for (const [w, h] of VPS) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, serviceWorkers: 'block' }); const p = await ctx.newPage()
    for (const sc of scenes) {
      await sc.setup(api); await p.goto('about:blank'); await p.goto(`${ORIGIN}/quiz-party/#/?room=stand&bktm=${tm}`)
      try { await p.waitForSelector(sc.ready, { timeout: 20000 }) } catch (e) { console.log(`✗ tm${tm} ${sc.id} ${w}×${h}: нет ${sc.ready}`); bad++; total++; continue }
      await p.waitForTimeout(sc.id === '32-scoreboard' ? 27000 : Math.max(sc.settle || 1500, 2500)); await p.evaluate(() => document.fonts.ready)
      const r = await p.evaluate(() => {
        const R = e => { if (!e) return null; const q = e.getBoundingClientRect(); return { l: q.left, t: q.top, r: q.right, b: q.bottom, w: q.width, h: q.height } }
        const cards = [...document.querySelectorAll('.bk-tc')].filter(c => c.getBoundingClientRect().width > 0)
        const out = cards.map(c => {
          const name = c.querySelector('.bk-tc-name'), box = c.querySelector('.bk-tc-text'), mark = c.querySelector('.bk-tc-gem, .bk-tc-ribbon, .bk-tc-seal'), ico = c.querySelector('.bk-tc-ico')
          const score = c.querySelector('.bk-tc-score'); const tn = name && [...name.childNodes].find(n => n.nodeType === 3)
          const rg = document.createRange(); let tr = null, broken = [], lines = 0
          if (tn) {
            rg.selectNodeContents(tn); tr = rg.getBoundingClientRect()
            lines = new Set([...rg.getClientRects()].map(x => Math.round(x.top))).size
            let off = 0
            for (const wd of tn.textContent.split(/(\s+)/)) {
              if (wd.trim()) { const r2 = document.createRange(); r2.setStart(tn, off); r2.setEnd(tn, off + wd.length); if (r2.getClientRects().length > 1) broken.push(wd) }
              off += wd.length
            }
          }
          return { card: R(c), box: R(box), name: R(name), text: tr && { l: tr.left, t: tr.top, r: tr.right, b: tr.bottom }, mark: R(mark), ico: R(ico), score: R(score), broken, lines, fs: name ? parseFloat(getComputedStyle(name).fontSize) : 0, fit: name?.dataset.bkFit, txt: name?.textContent, em: c.classList.contains('bk-tc-em') }
        })
        return { cards: out, title: R(document.querySelector('.answer-pulse')), timer: R(document.querySelector('.bk-timer-slot, .p-ros')), vw: innerWidth, vh: innerHeight, book: R(document.querySelector('.bk-content')) }
      })
      const errs = []; const cs = r.cards; const tol = 1.5 + w / 1920   // useFitText допускает +1 px вёрстки: на 3840 это 2 экранных px
      cs.forEach((c, i) => {
        const tag = `«${c.txt}»`
        if (c.mark && c.text && inter(c.mark, c.text)) errs.push(`${tag}: значок перекрывает текст (${inter(c.mark, c.text)} px²)`)
        if (c.ico && c.text && inter(c.ico, c.text)) errs.push(`${tag}: малый значок перекрывает текст`)
        if (c.mark && c.score && inter(c.mark, c.score)) errs.push(`${tag}: значок перекрывает счётчик`)
        if (c.score && c.text && inter(c.score, c.text)) errs.push(`${tag}: счётчик перекрывает текст`)
        if (c.text && c.box && c.name && (c.text.r > c.box.r + tol || c.text.l < c.box.l - tol || c.name.b > c.box.b + tol || c.name.t < c.box.t - tol)) errs.push(`${tag}: текст вылез из своей области (${c.text.l.toFixed(0)}..${c.text.r.toFixed(0)} / ${c.box.l.toFixed(0)}..${c.box.r.toFixed(0)}, h ${c.name.h.toFixed(0)}/${c.box.h.toFixed(0)})`)
        if (!c.em && c.broken.length) errs.push(`${tag}: разрыв слова ${c.broken.join(',')} (кегль ${c.fs.toFixed(1)}, fit=${c.fit})`)
        if (!c.em && c.lines > 2) errs.push(`${tag}: ${c.lines} строк`)
        if (!c.em && c.fs < 9) errs.push(`${tag}: кегль ${c.fs.toFixed(1)} px < 9`)
        for (let j = i + 1; j < cs.length; j++) { const q = inter(c.card, cs[j].card); if (q && !c.em) errs.push(`плитки «${c.txt}» и «${cs[j].txt}» пересекаются (${q} px²)`) }
        const m = c.mark; if (m && sc.id !== '32-scoreboard' && (m.l < 0 || m.r > r.vw || m.t < 0 || m.b > r.vh)) errs.push(`${tag}: значок вне экрана`)
      })
      if (sc.id.startsWith('at')) {
        const n = Number(sc.id.slice(2)); if (cs.length !== n) errs.push(`плиток ${cs.length} ≠ ${n}`)
        const allMarks = cs.flatMap(c => [c.mark, c.ico].filter(Boolean))
        const rects = [...cs.map(c => c.card), ...allMarks]; const top = Math.min(...rects.map(x => x.t), 1e9), bot = Math.max(...rects.map(x => x.b), -1)
        if (n && r.timer && top < r.timer.b - 1) errs.push(`плитки заходят на таймер (верх плиток ${top.toFixed(0)} < низ таймера ${r.timer.b.toFixed(0)})`)
        if (n && bot > 0.86 * r.vh) errs.push(`плитки на сугробах: низ ${bot.toFixed(0)} > ${(0.86 * r.vh).toFixed(0)}`)
        if (r.title && r.timer && r.title.b > r.timer.t + 1) errs.push('заголовок налезает на таймер')
        if (n && r.book) {
          const L = Math.min(...rects.map(x => x.l)), Rr = Math.max(...rects.map(x => x.r))
          if (L < r.book.l + 0.03 * r.book.w || Rr > r.book.r - 0.03 * r.book.w) errs.push(`плитки у края книги: ${L.toFixed(0)}..${Rr.toFixed(0)} / ${r.book.l.toFixed(0)}..${r.book.r.toFixed(0)}`)
        }
      }
      total++; if (errs.length) bad++
      const real = cs.filter(c => !c.em); const avg = cs.length ? (cs.reduce((s, c) => s + c.card.h, 0) / cs.length) : 0, minFs = real.length ? Math.min(...real.map(c => c.fs)) : 0
      console.log(`${errs.length ? '✗' : '✓'} tm${tm} ${sc.id} ${w}×${h}: плиток ${cs.length}, высота ≈${avg.toFixed(0)}px, мин. кегль ${minFs.toFixed(1)}${errs.length ? '\n    ' + [...new Set(errs)].slice(0, 6).join('\n    ') : ''}`)
      if (SHOTS && w === 1920 && SHOT_IDS.includes(sc.id)) await p.screenshot({ path: path.join(SHOTS, `${sc.id}-tm${tm}.png`) })
    }
    await ctx.close()
  }
  await b.close(); console.log(`\nитого: ${total - bad} из ${total} зелёных`); process.exit(bad ? 1 : 0)
})().catch(e => { console.error(e); process.exit(1) })
