// ═══ «Скрэмбл» в «Книге»: нижняя панель итога («БАЛЛ ПОЛУЧАЕТ … ЗА 00:18.945» / «УГАДАЛИ …») — замер ВЫРАВНИВАНИЯ (10.76) ═══
// Правило UI-ревью (CLAUDE.md §4): текстовый ряд обязан сидеть на ОДНОЙ базовой линии. Здесь это проверяется числами, а не глазом.
// Базовая линия блока = нижний край вставленного в начало его текста нулевого inline-block с vertical-align: baseline (вставка снимается).
// usage: QP_AN_RACE=1 (гонка; без него — обычный режим) [QP_BOOK_SCRATCH=…] [QP_BOOK_APP=<готовая сборка>] node e2e/book/scramble-winner-check.cjs
//        [--no-build] [--out dir] [--tag before|after] [--vp 1920x1080,1366x768,1280x720,1899x905] [--shots] [--strict]
// Критерии (--strict → код выхода 1, если нарушены): разброс базовых линий ≤ 1 px; блоки не пересекаются; текст внутри панели; панель не пересекает доску букв,
// список команд, шапку, кнопки; панель в окне. Печатает JSON-строку на сценарий.
'use strict'
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path')
const argv = process.argv.slice(2); const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d }
const OUT = path.resolve(opt('--out', 'scramble-winner')); const TAG = opt('--tag', 'run')
const VPS = opt('--vp', '1920x1080,1366x768,1280x720,1899x905').split(',').map(s => s.split('x').map(Number))
const SHOTS = argv.includes('--shots'), STRICT = argv.includes('--strict'), RACE = !!process.env.QP_AN_RACE

const NAMES = { one: 'Ёлка', three: 'Дед Мороз и Ко', long: 'Сто двадцать пять снеговиков и ещё немножко', mid: 'Хлопушки' }
// время: старт таймера «X мс назад», ответ пишется «сейчас» → показанное время ≈ X (значок «≈» у приблизительного)
const SCEN = RACE
  ? [['one-t3', 'one', 3120], ['three-t62', 'three', 62345], ['long-t18', 'long', 18945], ['mid-t62', 'mid', 62345]]
  : [['one', 'one', 20000], ['three', 'three', 20000], ['long', 'long', 20000], ['many', 'mid', 20000]]

const MEASURE = `(() => {
  const q = s => document.querySelector(s)
  const label = q('.bk-res-label, .an-res-label'), team = q('.bk-res-name, .an-res-team, .an-res-card .bk-tc-name'), time = q('.bk-res-time, .an-res-time')
  const panel = q('.host-screen.an-screen > .an-result'); if (!panel || !label) return { err: 'нет панели итога' }
  const R = e => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, r: r.right, b: r.bottom, w: r.width, h: r.height } }
  const baseline = e => { const z = document.createElement('span'); z.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline'
    e.insertBefore(z, e.firstChild); const y = z.getBoundingClientRect().bottom; z.remove(); return y }
  const textRect = e => { const g = document.createRange(); g.selectNodeContents(e); const r = g.getBoundingClientRect(); return { x: r.x, y: r.y, r: r.right, b: r.bottom, w: r.width, h: r.height } }
  const blocks = { label, team, time }; const out = {}
  for (const [k, e] of Object.entries(blocks)) { if (!e) continue
    const cs = getComputedStyle(e), t = textRect(e)
    const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.15
    out[k] = { text: e.textContent.trim(), base: +baseline(e).toFixed(2), fs: +parseFloat(cs.fontSize).toFixed(1), lh: +lh.toFixed(1), font: cs.fontFamily.split(',')[0], color: cs.color, tnum: cs.fontVariantNumeric, text_r: t,
      lines: Math.max(1, Math.round(t.h / lh)) } }
  const names = [...document.querySelectorAll('.bk-res-name, .an-res-card .bk-tc-name')]
  // подпись и первое имя на ОДНОЙ строке → базовая линия общая; если длинное имя заняло строку целиком и подпись стоит над ним — это перенос по словам, не расхождение
  const sameRow = !out.team || Math.abs(out.label.text_r.y - out.team.text_r.y) < 12 || !!out.time
  const bases = Object.values(out).map(o => o.base); const spread = sameRow ? +(Math.max(...bases) - Math.min(...bases)).toFixed(2) : 0
  // стандартный режим: имена одного ряда делят базовую линию друг с другом, первый ряд — ещё и с подписью (перенос на второй ряд — норма)
  const nb = names.map(n => ({ b: baseline(n), y: textRect(n).y })); const rowsN = []
  for (const n of nb.sort((a, c) => a.y - c.y)) { const g = rowsN.find(r => Math.abs(r.y - n.y) < 12); g ? g.bs.push(n.b) : rowsN.push({ y: n.y, bs: [n.b] }) }
  const lb = baseline(label); const first = rowsN[0] && Math.abs(rowsN[0].bs[0] - lb) < 12 ? rowsN[0] : null
  const spreadAll = +Math.max(0, ...rowsN.map((r, i) => { const a = i === 0 && first ? [lb, ...r.bs] : r.bs; return Math.max(...a) - Math.min(...a) })).toFixed(2)
  const pr = R(panel), tr = Object.values(out).map(o => o.text_r)
  const inside = tr.every(t => t.x >= pr.x - 1 && t.r <= pr.r + 1 && t.y >= pr.y - 1 && t.b <= pr.b + 1)
  const hit = (a, o) => a.x < o.r - 0.5 && a.r > o.x + 0.5 && a.y < o.b - 0.5 && a.b > o.y + 0.5
  let blockOverlap = 0; // рамка текста (Range) выше самих букв на пару px (ascent+descent) — пересечением считаем наложение глубже 30% меньшей высоты
  for (let i = 0; i < tr.length; i++) for (let j = i + 1; j < tr.length; j++) { const a = tr[i], o = tr[j]; const dy = Math.min(a.b, o.b) - Math.max(a.y, o.y), dx = Math.min(a.r, o.r) - Math.max(a.x, o.x); if (dx > 0.5 && dy > 0.3 * Math.min(a.h, o.h)) blockOverlap++ }
  const others = ['.an-board-wrap .an-word', '.an-board-wrap .an-tile', '.an-teams', '.host-topbar', '.host-actions', '.an-clue'].flatMap(s => [...document.querySelectorAll(s)].map(e => [s, R(e)]))
  const cross = [...new Set(others.filter(([, r]) => r.w && hit(textRect(panel), r)).map(([s]) => s))]
  const crossText = [...new Set(others.filter(([, r]) => r.w && tr.some(t => hit(t, r))).map(([s]) => s))]
  const nameRows = new Set(names.map(n => Math.round(textRect(n).y / 4))).size
  return { ...out, rects: Object.fromEntries(Object.entries(out).map(([k, o]) => [k, [o.text_r.x, o.text_r.y, o.text_r.r, o.text_r.b].map(Math.round)])), spread, spreadAll, nNames: names.length, inside, blockOverlap, panelCross: cross, textCross: crossText, panel: pr, inWindow: pr.x >= 0 && pr.r <= innerWidth + 1 && pr.y >= 0 && pr.b <= innerHeight + 1, nameRows }
})()`

async function main() {
  const { startStand, ORIGIN, PIN } = await import('./stand.mjs'); const { makeApi } = await import('./scenes.mjs')
  fs.mkdirSync(OUT, { recursive: true }); await startStand({ noBuild: argv.includes('--no-build') }); const api = makeApi(ORIGIN, PIN)
  const b = await chromium.launch(); const rows = []; let bad = 0
  const PK = 'stand-book-all', QID = `${PK}-r14-q0`
  for (const [w, h] of VPS) for (const [id, nm, ms] of SCEN) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, serviceWorkers: 'block' }); const p = await ctx.newPage()
    await api.reset()
    const nTeams = id === 'many' ? 8 : 6
    const names = [NAMES[nm], 'Гирлянды', 'Снежинки', 'Лапландия', 'Дед и ко', 'Шкатулка', 'Ёлочки', 'Мишки'].slice(0, nTeams)
    const ts = await api.teams(nTeams, names)
    const winners = RACE ? 1 : (id === 'many' ? 4 : 2)
    await api.answers(ts.slice(0, winners + 1).map((tm, i) => ({ team_id: tm.id, question_ref: 'q-' + QID, round_number: 14, answer_text: i < winners ? 'Снегурочка' : 'снегурка', is_correct: i < winners })))
    await api.session({ pack_id: PK, phase: 'question', round_number: 14, question_index: 0, timer_started_at: new Date(Date.now() - ms).toISOString(), reveal: true })
    await p.goto(`${ORIGIN}/quiz-party/#/?room=stand`); p.on('pageerror', e => console.error('pageerror', String(e).slice(0, 200)))
    try { await p.waitForSelector('.host-screen.an-screen > .an-result', { timeout: 20000 }) } catch (e) { await p.screenshot({ path: `${OUT}/FAIL-${id}-${w}x${h}.png` }); throw e }
    await p.waitForTimeout(2500)
    const r = await p.evaluate(MEASURE)
    const tag = `${TAG}-${RACE ? 'race' : 'std'}-${id}-${w}x${h}`
    if (SHOTS) await p.screenshot({ path: `${OUT}/${tag}.png` })
    const okRow = !r.err && r.spread <= 1 && r.spreadAll <= 1 && r.blockOverlap === 0 && r.inside && r.textCross.length === 0 && r.inWindow && !r.panelCross.length
    if (!okRow) bad++
    rows.push({ vp: `${w}x${h}`, id, ok: okRow, spread: r.spread, spreadAll: r.spreadAll, fs: [r.label?.fs, r.team?.fs, r.time?.fs], lines: [r.label?.lines, r.team?.lines, r.time?.lines], inside: r.inside, overlap: r.blockOverlap, panelCross: r.panelCross, textCross: r.textCross, inWindow: r.inWindow, texts: [r.label?.text, r.team?.text, r.time?.text], err: r.err, rects: r.rects })
    await ctx.close()
  }
  for (const r of rows) console.log(JSON.stringify(r)); console.log(`ИТОГ ${TAG}: ${rows.length - bad}/${rows.length} в норме`)
  await b.close(); process.exit(STRICT && bad ? 1 : 0)
}
main().catch(e => { console.error(e); process.exit(1) })
