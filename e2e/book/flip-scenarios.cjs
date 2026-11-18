// ═══ Перелистывание А: ВСЕ переходы игры на реальном проекторе (10.70) ═══
// Для каждого перехода A→B: сколько листов запустилось (ожидание), целостность клона (лицевая сторона листа несёт СТАРЫЙ текст, оборот — НОВЫЙ),
// отсутствие пустых кадров (по кадрам-скриншотам), листы не остаются после перехода, не больше одного листа одновременно. Кадры — в --out.
// usage: QP_BOOK_SCRATCH=… node e2e/book/flip-scenarios.cjs [--no-build] [--vp 1280x720] [--only id,id] --out <каталог>
'use strict'
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path')
const argv = process.argv.slice(2); const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d }
const OUT = path.resolve(opt('--out', 'flip-scen')); const VP = opt('--vp', '1280x720').split('x').map(Number); const ONLY = (opt('--only', '') || '').split(',').filter(Boolean)
async function main() {
  const { startStand, ORIGIN, PIN } = await import('./stand.mjs'); const { makeApi } = await import('./scenes.mjs'); const { PACK_ONLINE, PACK_ALL } = await import('./make-pack.mjs')
  fs.mkdirSync(OUT, { recursive: true }); await startStand({ noBuild: argv.includes('--no-build') }); const api = makeApi(ORIGIN, PIN); const b = await chromium.launch()
  const st = (pack, phase, round, qi, extra = {}) => ({ pack_id: pack, phase, round_number: round, question_index: qi, timer_started_at: phase === 'question' ? new Date().toISOString() : null, reveal: false, ...extra })
  const O = (p, r, q, e) => st(PACK_ONLINE, p, r, q, e), A = (p, r, q, e) => st(PACK_ALL, p, r, q, e)
  // [id, A, B, ожидаем лист (true/false), подпись]
  const S = [
    ['q-q', O('question', 0, 1), O('question', 0, 2), true, 'вопрос → вопрос'],
    ['q-q-choices', O('question', 0, 6), O('question', 0, 7), true, 'вопрос → вопрос с вариантами'],
    ['q-q-images', O('question', 0, 3), O('question', 0, 4), true, 'вопрос с картинками → вопрос с картинками'],
    ['q-q-order', O('question', 1, 0), O('question', 1, 1), true, 'сопоставление → порядок'],
    ['q-q-manual', O('question', 8, 9), O('question', 8, 10), true, 'композиция → композиция'],
    ['intro-q', O('round_intro', 0, 0), O('question', 0, 0), true, 'заставка раунда → 1-й вопрос'],
    ['intro-q-cw', O('round_intro', 3, 0), O('question', 3, 0), true, 'заставка кроссворда → вопрос'],
    ['q-answertime', O('question', 0, 9), O('answer_time', 0, 0), false, 'вопрос → «Отвечайте» (листа нет)'],
    ['answertime-ans', O('answer_time', 0, 0), O('show_answers', 0, 0), false, '«Отвечайте» → ответ (листа нет)'],
    ['ans-ans', O('show_answers', 0, 1, { reveal: true }), O('show_answers', 0, 2, { reveal: true }), true, 'ответ → следующий ответ'],
    ['ans-reveal', O('show_answers', 0, 2), O('show_answers', 0, 2, { reveal: true }), false, 'раскрытие ответа (листа нет)'],
    ['ans-next-round', O('show_answers', 0, 9, { reveal: true }), O('scoreboard', 0, 0), false, 'ответ → табло (листа нет)'],
    ['round-change', O('round_intro', 0, 0), O('round_intro', 1, 0), false, 'смена раунда (заставка → заставка)'],
    ['q-timer-ticks', O('question', 0, 5), O('question', 0, 5, { timer_started_at: new Date(Date.now() + 1000).toISOString() }), false, 'тик таймера (листа нет)'],
  ].filter(s => !ONLY.length || ONLY.includes(s[0]))
  const res = {}
  for (const [id, a, bb, want, title] of S) {
    const ctx = await b.newContext({ viewport: { width: VP[0], height: VP[1] }, serviceWorkers: 'block' }); const p = await ctx.newPage(); const errs = []
    p.on('pageerror', e => { if (!/PIN/.test(String(e.message))) errs.push(String(e.message)) })
    await p.addInitScript(() => { window.__t = { leaves: 0, max: 0, front: null, back: null, oldTxt: null }
      new MutationObserver(() => { const T = window.__t; const n = document.querySelectorAll('.bk-turn2-leaf').length; if (n > T.max) T.max = n
        const l = document.querySelector('.bk-turn2-leaf'); if (l && !l.__s) { l.__s = 1; T.leaves++ }
        const host = document.querySelector('.theme-ny_book > .host-screen'); const st = document.querySelector('.bk-turn2')
        if (l && st) { { const tt = (st.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 4000); (T.turnTexts ||= []); if (!T.turnTexts.includes(tt)) T.turnTexts.push(tt) }; T.hiddenSeen = (T.hiddenSeen || 0) + (host && getComputedStyle(host).visibility === 'hidden' ? 1 : 0); T.visibleSeen = (T.visibleSeen || 0) + (host && getComputedStyle(host).visibility !== 'hidden' ? 1 : 0) }
        if (!l && T.had && !T.ended) { T.ended = true; T.endVis = host && getComputedStyle(host).visibility; T.endAnim = host ? host.getAnimations({ subtree: true }).filter(a => a.playState === 'running' && a.effect && a.effect.getComputedTiming().iterations !== Infinity).length : -1 }
        if (l) T.had = true
        if (l) { const f = l.querySelector('.bk-turn2-face:not(.back)'), bk = l.querySelector('.bk-turn2-face.back'); T.front = (f && f.textContent || '').trim().slice(0, 200); T.back = (bk && bk.textContent || '').trim().slice(0, 200) } }).observe(document, { childList: true, subtree: true }) })
    await api.reset(); await api.teams(6); await api.session(a)
    await p.goto(`${ORIGIN}/quiz-party/#/?room=stand`); await p.waitForSelector('.host-screen', { timeout: 20000 }); await p.waitForTimeout(3600)
    const oldTxt = await p.evaluate(() => (document.querySelector('.host-screen')?.textContent || '').trim().slice(0, 200))
    const t0 = Date.now(); await api.session(bb)
    // «пустой кадр» (старый текст пропадает на первых кадрах из-за стартующих CSS-анимаций клона): собственная прозрачность ВСЕХ текстовых листьев клонов (старая страница под листом и лицо листа) на протяжении всего перехода обязана быть 1
    const flashP = p.evaluate(() => new Promise(res => { const T0 = performance.now(); let minOp = 1, seen = 0
      const tick = () => { const els = [...document.querySelectorAll('.bk-turn2-clone *')].filter(e => !e.children.length && (e.textContent || '').trim()); seen += els.length; for (const e of els) minOp = Math.min(minOp, +getComputedStyle(e).opacity)
        if (performance.now() - T0 < 3200) requestAnimationFrame(tick); else res({ minOp, seen }) }; tick() }))
    // геометрия клона: останавливаем анимацию в нулевой фазе — лицевая сторона листа лежит ровно на правой странице, fixed-элементы клона (шапка, кнопки) обязаны совпасть с настоящими
    let geom = null
    if (want) {
      await p.waitForSelector('.bk-turn2-leaf', { state: 'attached', timeout: 8000 }).catch(() => {})
      geom = await p.evaluate(() => { document.getAnimations().forEach(a => { a.pause(); a.currentTime = 0 })
        const R = e => e && (r => [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)])(e.getBoundingClientRect())
        const real = document.querySelector('.theme-ny_book > .host-screen'); const front = document.querySelector('.bk-turn2-face:not(.back) .host-screen')
        const out = {}; for (const sel of ['.host-topbar', '.timer-slot, .bk-timer, .host-topbar > :last-child']) { const a = R(real && real.querySelector(sel)), c = R(front && front.querySelector(sel)); if (a && c) out[sel] = { real: a, clone: c, same: Math.abs(a[0] - c[0]) <= 2 && Math.abs(a[1] - c[1]) <= 2 && Math.abs(a[2] - c[2]) <= 2 } }
        document.getAnimations().forEach(a => a.play()); return out })
    }
    const frames = []; let k = 0
    while (Date.now() - t0 < 2600) { const t = Date.now() - t0; const f = path.join(OUT, `${id}-${VP[0]}-${String(k).padStart(2, '0')}.png`); await p.screenshot({ path: f }); frames.push({ t, f: path.basename(f) }); k++ }
    const flash = await flashP
    const T = await p.evaluate(() => ({ ...window.__t })); const newTxt = await p.evaluate(() => (document.querySelector('.host-screen')?.textContent || '').trim().slice(0, 200))
    const left = await p.evaluate(() => document.querySelectorAll('.bk-turn2-leaf, .bk-turn2-under').length)
    const clip = await p.evaluate(() => document.querySelector('.host-screen')?.style.clipPath || '')
    const newWords = [...new Set((newTxt.match(/[А-Яа-яЁёA-Za-z0-9]{4,}/g) || []))].filter(w => !oldTxt.includes(w))
    const leak = want ? newWords.filter(w => [...(T.turnTexts || [])].some(t => t.includes(w))) : []
    const r = { title, want, leaves: T.leaves, newWords: newWords.length, leak, hiddenSeen: T.hiddenSeen, visibleSeen: T.visibleSeen, endVis: T.endVis, endAnim: T.endAnim, max: T.max, frontHasOld: T.leaves ? (!!T.front && oldTxt.slice(0, 20) !== '' && T.front.includes(oldTxt.slice(0, 15))) : null, backHasNew: T.leaves ? (!!T.back && newTxt.slice(0, 15) !== '' && T.back.includes(newTxt.slice(0, 15))) : null, leftBehind: left, clipLeft: clip, errs, geom, flash, frames: frames.length }
    r.ok = (want ? r.leaves === 1 : r.leaves === 0) && r.max <= 1 && r.leftBehind === 0 && r.clipLeft === '' && (!want || (r.frontHasOld && !r.backHasNew && r.leak.length === 0 && r.visibleSeen === 0 && r.hiddenSeen > 0 && r.endVis === 'visible' && r.endAnim === 0 && geom && Object.values(geom).every(g => g.same))) && (!want || flash.minOp >= 0.75) && errs.length === 0
    res[id] = r; console.log(r.ok ? 'OK  ' : 'FAIL', id, JSON.stringify({ ...r, title: undefined })); fs.writeFileSync(path.join(OUT, `${id}-${VP[0]}.json`), JSON.stringify({ r, frames, oldTxt, newTxt, front: T.front, back: T.back })); await ctx.close()
  }
  fs.writeFileSync(path.join(OUT, `result-${VP[0]}.json`), JSON.stringify(res, null, 1)); await b.close(); const bad = Object.values(res).filter(r => !r.ok).length; console.log(bad ? `FAILED ${bad}` : 'ALL OK'); process.exit(bad ? 1 : 0)
}
main().catch(e => { console.error(e); process.exit(1) })
