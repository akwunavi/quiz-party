// ═══ «Книга»: на заставке раунда у правил (.rules-frame и потомки) нет остатков киберпанка ═══
// Замер: ~3.6 с после появления заставки (с перезагрузкой и «заходом с другого экрана») собираем getAnimations() по .round-intro и потомкам
// (+ computed animation-name у ::before/::after), плюс filter с drop-shadow/hue, mix-blend-mode, clip-path, text-shadow с горизонтальным сдвигом (хроматика).
// Падает, если есть анимация glitch|scan|neon|flicker|cyber|chrom|rgb|shift или цветовой сдвиг.
// usage: QP_BOOK_SCRATCH=… NODE_PATH=<global node_modules> node e2e/book/rules-glitch-check.cjs [--no-build] [--out <каталог>] [--shots <каталог кадров>] [--tag before|after]
'use strict'
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path')
const argv = process.argv.slice(2); const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d }
const OUT = path.resolve(opt('--out', 'rules-glitch-out')); const SHOTS = opt('--shots', '')
const BAD = /glitch|scan|neon|flicker|cyber|chrom|rgb|shift/i
;(async () => {
  const { startStand, ORIGIN, PIN } = await import('./stand.mjs'); const { makeApi } = await import('./scenes.mjs'); const { PACK_ALL } = await import('./make-pack.mjs')
  fs.mkdirSync(OUT, { recursive: true }); await startStand({ noBuild: argv.includes('--no-build') }); const api = makeApi(ORIGIN, PIN); const b = await chromium.launch(); const res = []; let bad = 0
  const p = await (await b.newContext({ viewport: { width: 1920, height: 1080 }, serviceWorkers: 'block' })).newPage()
  const probe = () => p.evaluate(() => {
    const cn = e => (typeof e.className === 'string' ? e.className : '').split(' ')[0] || e.tagName
    const roots = [...document.querySelectorAll('.round-intro, .round-intro *, .grid-bg')]
    const anims = [], css = []
    for (const e of roots) {
      for (const a of e.getAnimations()) anims.push({ el: cn(e), pseudo: '', name: a.animationName || a.constructor.name })
      for (const ps of [null, '::before', '::after']) {
        const c = getComputedStyle(e, ps)
        if (ps && c.animationName !== 'none') anims.push({ el: cn(e), pseudo: ps, name: c.animationName })
        const f = c.filter, m = c.mixBlendMode, ts = c.textShadow, cp = c.clipPath
        if (e.tagName === 'BUTTON' || e.closest('.host-actions')) continue
        if ((f !== 'none' && /hue|(drop-shadow\([^)]*\)) *-?[1-9]/.test(f) && /\) -?[1-9]\d*(\.\d+)?px 0px/.test(f)) || m !== 'normal' || cp !== 'none' || /\) -?[1-9]\d*(\.\d+)?px 0px/.test(ts)) css.push({ el: cn(e), pseudo: ps || '', f, m, cp, ts: ts.slice(0, 90) })
      }
    }
    const t = document.querySelector('[class*="theme-"]')
    const ops = [...document.querySelectorAll('.rules-frame .rule-item')].filter(e => !e.closest('[class*=turn]')).map(e => +getComputedStyle(e).opacity)
    return { anims, css, ops, theme: t && [...t.classList].filter(c => c.startsWith('theme-')).join(' '), has: !!document.querySelector('.rules-frame') }
  })
  async function sample(label) {
    const frames = []; const t0 = Date.now()
    while (Date.now() - t0 < 3600) { frames.push(await probe()); await p.waitForTimeout(90) }
    const names = new Map(); const css = new Set()
    for (const f of frames) { for (const a of f.anims) names.set(`${a.el}${a.pseudo}:${a.name}`, 1); for (const c of f.css) css.add(JSON.stringify(c)) }
    const badAnims = [...names.keys()].filter(k => BAD.test(k.split(':').slice(1).join(':'))); const badCss = [...css]
    // мигание: пункт правил, уже ставший видимым (>0.9), не должен снова упасть (<0.5) — ровно так «мелькал» ruleIn без fill-mode backwards
    let flicker = 0; for (let i = 0; i < Math.max(...frames.map(f => f.ops.length)); i++) { let seen = false; for (const f of frames) { const o = f.ops[i]; if (o == null) continue; if (o > 0.9) seen = true; else if (seen && o < 0.5) flicker++ } }
    if (flicker) badAnims.push('rule-item flicker x' + flicker)
    const ok = frames.some(f => f.has) && !badAnims.length && !badCss.length; if (!ok) bad++
    res.push({ label, theme: frames[0].theme, all: [...names.keys()], badAnims, badCss, ok })
    console.log(ok ? 'OK  ' : 'FAIL', label, frames[0].theme, 'anims:', [...names.keys()].join(' | '), badAnims.length ? ' BAD: ' + badAnims.join(',') : '', badCss.length ? '\n   CSS: ' + badCss.join('\n   ') : '')
  }
  const rounds = [[3, 'stand-book', 'standard'], [15, PACK_ALL, 'r15'], [16, PACK_ALL, 'r16'], [17, PACK_ALL, 'r17'], [18, PACK_ALL, 'r18'], [19, PACK_ALL, 'r19']]
  for (const [r, pack, nm] of rounds) {
    await api.reset(); await api.teams(6); await api.session({ pack_id: pack, phase: 'round_intro', round_number: r, question_index: 0, timer_started_at: null, reveal: false })
    await p.goto('about:blank'); await p.goto(`${ORIGIN}/quiz-party/#/?room=stand`); await p.waitForSelector('.round-intro', { timeout: 20000 })
    if (SHOTS && r === 3) { fs.mkdirSync(SHOTS, { recursive: true }); for (const t of [200, 600, 1000, 1500]) { await p.waitForTimeout(t === 200 ? 200 : 400); await p.screenshot({ path: path.join(SHOTS, `${opt('--tag', 'after')}-r3-${t}.png`) }) } }
    await sample(`intro ${nm} (reload)`)
    // заход с другого экрана — без перезагрузки страницы
    await api.session({ pack_id: pack, phase: 'question', round_number: r, question_index: 0, timer_started_at: null, reveal: false }); await p.waitForTimeout(1800)
    await api.session({ pack_id: pack, phase: 'round_intro', round_number: r, question_index: 0, timer_started_at: null, reveal: false }); await p.waitForSelector('.round-intro', { timeout: 20000 })
    await sample(`intro ${nm} (flip-in)`)
  }
  fs.writeFileSync(path.join(OUT, 'rules-glitch.json'), JSON.stringify(res, null, 1)); await b.close(); console.log(bad ? `FAILED ${bad}` : 'ALL OK'); process.exit(bad ? 1 : 0)
})().catch(e => { console.error(e); process.exit(1) })
