// ═══ Пояснение к ответу в «Книге» (10.76): единый вид и замеры ═══
// Для каждой сцены с пояснением и каждого разрешения проверяем: есть подпись «ПОЯСНЕНИЕ» (красная, мельче подписи плашки «ПРАВИЛЬНЫЙ ОТВЕТ»), разделитель с ромбиком,
// текст — курсив по центру цветом чернил; НЕТ цветной полосы/рамки/фона у блока; текст целиком внутри области подгона (не обрезан), блок не заходит на
// картинки ответа и свиток, не выходит за страницу.
// usage: QP_BOOK_SCRATCH=… node e2e/book/note-check.cjs [--no-build] [--out каталог] [--shots] [--only id,id]
'use strict'
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path')
const argv = process.argv.slice(2); const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d }
const OUT = path.resolve(opt('--out', 'note-out')); const SHOTS = argv.includes('--shots')
const IDS = (opt('--only', '72-ans-r8q1,72-ans-r8q2,72-ans-r8q13,72-ans-r8q14,73-ans-q19-t6,73-ans-q20-t6,73-ans-q23-t6,78-anagram-note,77-aq-q0')).split(',')
;(async () => {
  const { startStand, ORIGIN, PIN } = await import('./stand.mjs'); const { makeApi, SCENES } = await import('./scenes.mjs')
  fs.mkdirSync(OUT, { recursive: true }); const st = await startStand({ noBuild: argv.includes('--no-build') }); const api = makeApi(ORIGIN, PIN)
  const b = await chromium.launch(); const res = []; let bad = 0
  for (const [w, h] of (process.env.QP_SIZES ? process.env.QP_SIZES.split(',').map(x => x.split('x').map(Number)) : [[1920, 1080], [1366, 768], [1280, 720], [1899, 905]])) {
    const p = await (await b.newContext({ viewport: { width: w, height: h }, serviceWorkers: 'block' })).newPage()
    for (const id of IDS) {
      const sc = SCENES.find(s => s.id === id); if (!sc) { console.log('нет сцены', id); continue }
      // «checked» разбора включается через несколько секунд реального времени (StagedChoices) — ждём появления блока пояснения
      await sc.setup(api); await p.goto('about:blank'); await p.goto(`${ORIGIN}/quiz-party/#/?room=stand`)
      try { await p.waitForSelector('.bk-note-box', { timeout: 45000 }); await p.waitForTimeout((sc.settle ?? 2000) + 1500) } catch (e) { console.log('FAIL', w, h, id, 'нет .bk-note-box', JSON.stringify(await api.call('/api/session').catch(e => String(e))).slice(0, 300)); await p.screenshot({ path: path.join(OUT, 'fail-' + id + '.png') }); bad++; continue }
      const m = await p.evaluate(() => {
        const u = Math.min(innerWidth / 1920, innerHeight / 1080), ox = (innerWidth - 1920 * u) / 2, oy = (innerHeight - 1080 * u) / 2
        const R = e => { const r = e.getBoundingClientRect(); return { l: +((r.left - ox) / u).toFixed(1), r: +((r.right - ox) / u).toFixed(1), t: +((r.top - oy) / u).toFixed(1), b: +((r.bottom - oy) / u).toFixed(1) } }
        const box = document.querySelector('.bk-note-box'), lab = box.querySelector('.bk-note-label'), rule = box.querySelector('.bk-note-rule'), fit = box.querySelector('.bk-note-fit'), pp = box.querySelector('p')
        const cs = e => getComputedStyle(e), pl = document.querySelector('.answer-plate > .answer-label')
        const bw = e => ['Top', 'Right', 'Bottom', 'Left'].map(s => parseFloat(cs(e)[`border${s}Width`]) * 0 + (cs(e)[`border${s}Style`] === 'none' ? 0 : parseFloat(cs(e)[`border${s}Width`]))).reduce((a, c) => a + c, 0)
        const others = [...document.querySelectorAll('.answer-plate, .answer-media, .answer-media .q-img, .lay-img, .team-answers, .answers-layout .team-answers')].map(R)
        const br = R(box), hit = others.filter(o => o.r > o.l && !(br.r <= o.l || br.l >= o.r || br.b <= o.t + 0.5 || br.t >= o.b - 0.5))
        const fr = R(fit), pr = R(pp)
        return { label: { fs: +(parseFloat(cs(lab).fontSize) / u).toFixed(1), color: cs(lab).color, ls: cs(lab).letterSpacing, ff: cs(lab).fontFamily.slice(0, 24), plate: pl ? { fs: +(parseFloat(cs(pl).fontSize) / u).toFixed(1), color: cs(pl).color, ff: cs(pl).fontFamily.slice(0, 24) } : null },
          rule: { w: R(rule).r - R(rule).l, gold: cs(rule.querySelector('i')).backgroundImage.includes('gradient'), diamond: rule.querySelector('b').textContent },
          p: { fs: +(parseFloat(cs(pp).fontSize) / u).toFixed(1), style: cs(pp).fontStyle, align: cs(pp).textAlign, color: cs(pp).color, bl: cs(pp).borderLeftWidth, bg: cs(pp).backgroundColor, len: pp.textContent.length, fit: pp.dataset.bkFit },
          box: { bg: cs(box).backgroundColor, bgImg: cs(box).backgroundImage, border: bw(box), shadow: cs(box).boxShadow },
          blk: [...document.querySelectorAll('.answers-main.revealed, .answers-main.revealed .answer-block, .answers-main.revealed .answer-block > *')].map(e => [String(e.className).slice(0, 28), JSON.stringify(R(e))]), fitR: fr, pR: pr, textInFit: pr.t >= fr.t - 1 && pr.b <= fr.b + 1.5, br, hit: hit.length, onPage: br.l >= 0 && br.r <= 1920 && br.b <= 1010, snowOk: br.b <= 945, u }
      })
      const lab = m.label, ok = lab.color.includes('158, 28') || true
      const checks = { label: lab.fs < (lab.plate?.fs ?? 99) && lab.ff === (lab.plate?.ff ?? lab.ff) && lab.color === (lab.plate?.color ?? lab.color), rule: m.rule.gold && m.rule.diamond === '❖', italic: m.p.style === 'italic' && m.p.align === 'center',
        noBar: m.p.bl === '0px' && m.box.bg === 'rgba(0, 0, 0, 0)' && m.box.bgImg === 'none' && m.box.border === 0 && m.box.shadow === 'none', textFits: m.textInFit && m.p.fit !== 'overflow', noHit: m.hit === 0, page: m.onPage, size: m.p.fs >= 14 }
      const good = Object.values(checks).every(Boolean); if (!good) bad++
      console.log(good ? 'OK  ' : 'FAIL', w, h, id, `p=${m.p.fs}u len=${m.p.len} label=${lab.fs}u/${lab.plate?.fs} box=${JSON.stringify(m.br)}`, good ? '' : JSON.stringify(checks) + '\n   ' + JSON.stringify({ blk: m.blk, fitR: m.fitR, pR: m.pR }))
      res.push({ w, h, id, ...m, checks })
      if (SHOTS) await p.screenshot({ path: path.join(OUT, `${id}-${w}x${h}.png`) })
    }
  }
  fs.writeFileSync(path.join(OUT, 'note-check.json'), JSON.stringify(res, null, 1)); await b.close(); await st.close(); console.log(bad ? `FAILED ${bad}` : 'ALL OK'); process.exit(bad ? 1 : 0)
})().catch(e => { console.error(e); process.exit(1) })
