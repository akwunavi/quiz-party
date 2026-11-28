// ═══ «Книга»: модалка «Составы команд» на большом свитке (10.76) — замеры пересечений и снимки ═══
// usage: QP_BOOK_PORT=<свой> QP_BOOK_SCRATCH=<свой> NODE_PATH=/opt/node22/lib/node_modules PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers \
//        node e2e/book/team-modal-check.cjs [--no-build] [--vp 1920x1080,…] [--n 1,4,8,16,24] [--profile norm,mix,long,big] [--shots <каталог PNG>] [--reduced]
// На каждый случай: свиток помещается в окно и занимает долю сцены; шапка и сетка внутри полезной области (мимо банта справа сверху и ветки слева снизу — по долям ассета);
// карточки команд не пересекаются, не вылезают из свитка; список участников внутри своей карточки, слова не рвутся посреди; если сетка не помещается —
// прокрутка внутри свитка (data-over=1) и ничего не торчит за его границы; крестик внутри свитка. Esc и клик по затемнению закрывают.
'use strict'
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path')
const argv = process.argv.slice(2); const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d }
const VPS = opt('--vp', '1920x1080,1366x768,1280x720,1899x905').split(',').map(s => s.split('x').map(Number))
const NS = opt('--n', '1,4,8,16,24').split(',').map(Number), PROFILES = opt('--profile', 'norm,mix,long,big').split(','), SHOTS = opt('--shots', ''), REDUCED = argv.includes('--reduced')
const SHOT_KEYS = new Set((opt('--shot-keys', '1:mix,4:norm,8:norm,8:mix,16:mix,24:norm,24:big,8:long')).split(','))
const LONGP = 'Мария-Луиза Фон-Штольц-Бернштейн', LONGW = 'Достопочтенный Константин Константинопольский'
function groups(n, prof) {
  return Array.from({ length: n }, (_, i) => {
    const cnt = prof === 'norm' ? 4 : prof === 'big' ? 12 : prof === 'long' ? 3 : [2, 1, 12, 4][i % 4]
    return Array.from({ length: cnt }, (_, j) => prof === 'long' && j === 0 ? (i % 2 ? LONGW : LONGP) : prof === 'mix' && j === 0 && i % 5 === 3 ? LONGP : `Игрок ${i + 1}-${j + 1}`)
  })
}
const inter = (a, b) => { const w = Math.min(a.r, b.r) - Math.max(a.l, b.l), h = Math.min(a.b, b.b) - Math.max(a.t, b.t); return w > 0.5 && h > 0.5 ? Math.round(w * h) : 0 }
;(async () => {
  const { startStand, ORIGIN, PIN } = await import('./stand.mjs'); const { makeApi } = await import('./scenes.mjs'); const { PACK_ONLINE } = await import('./make-pack.mjs')
  await startStand({ noBuild: argv.includes('--no-build') }); const api = makeApi(ORIGIN, PIN); const b = await chromium.launch(); let bad = 0, total = 0
  if (SHOTS) fs.mkdirSync(SHOTS, { recursive: true })
  for (const [w, h] of VPS) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, serviceWorkers: 'block', reducedMotion: REDUCED ? 'reduce' : 'no-preference' }); const p = await ctx.newPage()
    for (const n of NS) for (const prof of PROFILES) {
      const g = groups(n, prof); const tag = `n${n}-${prof} ${w}×${h}`; total++
      await api.reset(); await api.teams(Math.min(n, 8)); await api.session({ pack_id: PACK_ONLINE, phase: 'lobby', round_number: 0, question_index: 0, timer_started_at: null, reveal: false, random_groups: g })
      await p.goto('about:blank'); await p.goto(`${ORIGIN}/quiz-party/#/?room=stand`)
      try { await p.waitForSelector('.bk-gm-grid', { timeout: 20000 }) } catch (e) { console.log(`✗ ${tag}: нет .bk-gm-grid`); bad++; continue }
      await p.waitForTimeout(1800); await p.evaluate(() => document.fonts.ready)
      const r = await p.evaluate(() => {
        const R = e => { if (!e) return null; const q = e.getBoundingClientRect(); return { l: q.left, t: q.top, r: q.right, b: q.bottom, w: q.width, h: q.height } }
        const sc = document.querySelector('.bk-scroll'), scr = document.querySelector('.bk-gm-scroll')
        const teams = [...document.querySelectorAll('.bk-gm-team')].map(t => {
          const pl = t.querySelector('.bk-gm-players'), card = t.querySelector('.bk-tc'), nm = t.querySelector('.bk-tc-name')
          const broken = []
          if (pl) for (const sp of pl.querySelectorAll('.bk-gm-p')) { const tn = sp.firstChild; if (!tn) continue; let off = 0
            for (const wd of tn.textContent.split(/(\s+)/)) { if (wd.trim()) { const rg = document.createRange(); rg.setStart(tn, off); rg.setEnd(tn, off + wd.length); if (rg.getClientRects().length > 1) broken.push(wd) } off += wd.length } }
          return { box: R(t), pl: R(pl), card: R(card), plSW: pl ? pl.scrollWidth - pl.clientWidth : 0, broken, nameFs: nm ? parseFloat(getComputedStyle(nm).fontSize) : 0, plFs: pl ? parseFloat(getComputedStyle(pl).fontSize) : 0, over: card ? nm.scrollWidth - nm.clientWidth : 0 }
        })
        const cs = getComputedStyle(sc)
        return { sc: R(sc), scr: R(scr), over: scr?.dataset.over, scrollH: scr?.scrollHeight, clientH: scr?.clientHeight, head: R(document.querySelector('.bk-gm-head')), close: R(document.querySelector('.bk-gm-close')), title: R(document.querySelector('.bk-gm-title')), sumR: R(document.querySelector('.bk-gm-sum')), grid: R(document.querySelector('.bk-gm-grid')), teams,
          vw: innerWidth, vh: innerHeight, anim: cs.animationName, ov: R(document.querySelector('.bk-scroll-overlay')), bg: getComputedStyle(document.querySelector('.bk-scroll-overlay')).backgroundColor, sum: document.querySelector('.bk-gm-sum')?.textContent }
      })
      const errs = []; const info = new Set(); const S = r.sc
      if (S.l < -1 || S.t < -1 || S.r > r.vw + 1 || S.b > r.vh + 1) errs.push(`свиток вне окна (${S.l | 0},${S.t | 0},${S.r | 0},${S.b | 0})`)
      // доли ассета (не зависят от растяжения): бант справа сверху x > .44W, y < .228H (клин: колокольчики до .228H при x .80–.93W); ветка слева снизу x < .34W, y > .755H
      const fx = x => (x - S.l) / S.w, fy = y => (y - S.t) / S.h
      const zones = [['хвоя', { l: S.l + S.w * .44, r: S.l + S.w * .80, t: S.t, b: S.t + S.h * .175 }], ['бант и колокольчики', { l: S.l + S.w * .80, r: S.r, t: S.t, b: S.t + S.h * .232 }], ['ветка', { l: S.l, r: S.l + S.w * .34, t: S.t + S.h * .755, b: S.b }]]
      const parts = [['заголовок', r.title], ['итог', r.sumR], ['крестик', r.close], ['сетка/прокрутка', r.scr]]
      for (const [zn, z] of zones) for (const [pn, pr] of parts) if (pr && inter(z, pr) > 150) errs.push(`${pn} заходит на ${zn} (${inter(z, pr)} px²)`)
      if (r.close && (r.close.r > r.scr.r + 1 || r.close.l < S.l)) errs.push('крестик вне полезной области')
      if (r.title && r.close && inter(r.title, r.close)) errs.push('заголовок под крестиком')
      const visible = t => !(r.over === '1')   // при прокрутке часть карточек ниже видимой области — это нормально
      r.teams.forEach((t, i) => {
        if (t.box.l < S.l || t.box.r > S.r) errs.push(`карточка ${i + 1} вне свитка по ширине`)
        if (r.over !== '1' && (t.box.b > r.scr.b + 1.5 || t.box.t < r.scr.t - 1.5)) errs.push(`карточка ${i + 1} вылезла из области (${t.box.b.toFixed(0)} > ${r.scr.b.toFixed(0)})`)
        if (t.plSW > 1) errs.push(`карточка ${i + 1}: список шире ячейки на ${t.plSW}`)
        const hard = t.broken.filter(x => !x.includes('-') && x.length <= 14); if (hard.length) errs.push(`карточка ${i + 1}: разрыв слова ${hard.join(',')}`)
        if (t.broken.some(x => !x.includes('-') && x.length > 14)) info.add('аварийный перенос очень длинного слова по буквам')
        if (t.over > 2) errs.push(`карточка ${i + 1}: имя команды шире поля на ${t.over}`)
        if (t.pl && t.card && inter(t.pl, t.card)) errs.push(`карточка ${i + 1}: список наезжает на плитку`)
        for (let j = i + 1; j < r.teams.length; j++) if (inter(t.box, r.teams[j].box)) errs.push(`карточки ${i + 1} и ${j + 1} пересекаются`)
      })
      if (r.over === '1' && r.scrollH <= r.clientH + 2) errs.push('data-over=1, но прокрутки нет')
      if (r.over !== '1' && r.scrollH > r.clientH + 2) errs.push('содержимое не помещается, а data-over не стоит')
      if (errs.length) { bad++; console.log(`✗ ${tag}: ${errs.slice(0, 6).join('; ')}${errs.length > 6 ? ` (+${errs.length - 6})` : ''}`) }
      else console.log(`✓ ${tag}: свиток ${(S.w / r.vw * 100).toFixed(0)}%×${(S.h / r.vh * 100).toFixed(0)}% окна, прокрутка ${r.over === '1' ? 'да' : 'нет'}, имя ≥${Math.min(...r.teams.map(t => t.nameFs)).toFixed(1)} px, список ${Math.min(...r.teams.map(t => t.plFs)).toFixed(1)} px, «${r.sum}» anim=${r.anim}${info.size ? ' [' + [...info].join('; ') + ']' : ''}`)
      if (SHOTS && SHOT_KEYS.has(`${n}:${prof}`)) { const f = path.join(SHOTS, `n${n}-${prof}-${w}x${h}${REDUCED ? '-reduced' : ''}.png`); try { await p.screenshot({ path: f, timeout: 60000 }) } catch (e) { await p.waitForTimeout(1500); await p.screenshot({ path: f, timeout: 60000 }) } }
      // Esc закрывает (только в первом случае каждого окна — дальше состояние то же)
      if (n === NS[0] && prof === PROFILES[0]) {
        await p.keyboard.press('Escape'); await p.waitForTimeout(300)
        const gone = await p.evaluate(() => !document.querySelector('.bk-scroll')); console.log(gone ? `✓ Esc закрывает ${w}×${h}` : `✗ Esc не закрыл ${w}×${h}`); if (!gone) bad++
      }
    }
    // клик по затемнению
    await api.reset(); await api.teams(2); await api.session({ pack_id: PACK_ONLINE, phase: 'lobby', round_number: 0, question_index: 0, timer_started_at: null, reveal: false, random_groups: groups(2, 'norm') })
    await p.goto('about:blank'); await p.goto(`${ORIGIN}/quiz-party/#/?room=stand`); await p.waitForSelector('.bk-gm-grid', { timeout: 20000 }); await p.waitForTimeout(1500)
    await p.mouse.click(5, 5); await p.waitForTimeout(300)
    const g1 = await p.evaluate(() => !document.querySelector('.bk-scroll')); console.log(g1 ? `✓ клик по фону закрывает ${w}×${h}` : `✗ клик по фону не закрыл ${w}×${h}`); if (!g1) bad++
    await ctx.close()
  }
  console.log(`\nслучаев: ${total}, с ошибками: ${bad}`); await b.close(); process.exit(bad ? 1 : 0)
})().catch(e => { console.error(e); process.exit(2) })
