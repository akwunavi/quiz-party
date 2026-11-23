// Дрожание собак и «пола» (теней под лапами) на ПЬЕДЕСТАЛЕ: покадровый замер реальной сцены (HANDOFF §3ev, 10.74).
// Подменяет drawImage/arc в странице и пишет, куда сцена рисует кадр собаки (ячейка 227×283 × 1.5) и тени за каждый rAF.
// Критерий: у спрайта в клипе IDLE/SELECTED/RETURN начало ячейки обязано стоять на месте (dxMaxJump = dyMaxJump = 0) и тень тела не менять радиус (shadowBodyRSD = 0).
// usage: node e2e/bulldog/podium-jitter.cjs [seed=777] [theme=classic]   (нужен `npx vite --port 5199` с валидным VITE_SUPABASE_URL, глобальный playwright)
const { chromium } = require('playwright')
const seed = +(process.argv[2] || 777), theme = process.argv[3] || 'classic'
const sd = v => { const m = v.reduce((s, x) => s + x, 0) / (v.length || 1); return Math.sqrt(v.reduce((s, x) => s + (x - m) ** 2, 0) / (v.length || 1)) }
const mj = v => Math.max(0, ...v.slice(1).map((x, i) => Math.abs(x - v[i])))
;(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } })
  await p.addInitScript(() => {
    window.__log = { img: [], arc: [] }; window.__frame = 0
    const raf = window.requestAnimationFrame.bind(window); window.requestAnimationFrame = cb => raf(t => { window.__frame++; cb(t) })
    const di = CanvasRenderingContext2D.prototype.drawImage
    CanvasRenderingContext2D.prototype.drawImage = function (...a) {
      if (a.length === 9 && a[0] instanceof ImageBitmap && Math.abs(a[7] - 340.5) < 1 && Math.abs(a[8] - 424.5) < 1 && window.__rec) { const t = this.getTransform(); window.__log.img.push({ f: window.__frame, dx: a[5] * t.a + t.e, dy: a[6] * t.d + t.f }) }
      return di.apply(this, a)
    }
    const arc = CanvasRenderingContext2D.prototype.arc
    CanvasRenderingContext2D.prototype.arc = function (...a) { if (window.__rec && a[0] === 0 && a[1] === 0 && a[4] === 7) { const t = this.getTransform(); window.__log.arc.push({ f: window.__frame, x: t.e, y: t.f, r: a[2] * t.a }) } return arc.apply(this, a) }
  })
  await p.goto('http://127.0.0.1:5199/quiz-party/e2e/bulldog/harness.html'); await p.waitForSelector('canvas.bulldog-canvas')
  const end = await p.evaluate(async s => (await import('/quiz-party/src/lib/bulldog/engine.ts')).raceFor(s, 42).end, seed)
  await p.waitForTimeout(9000)
  await p.evaluate(([t, s, off]) => window.harness.set({ theme: t, seed: s, courseSec: 42, stage: 'running', startOffsetSec: off }), [theme, seed, 4 + 5 + end + 3.5 + 2.6 + 0.5])   // T: transition+countdown+finishHold+podiumTransition
  await p.waitForTimeout(3000); await p.evaluate(() => { window.__rec = true }); await p.waitForTimeout(14000); await p.evaluate(() => { window.__rec = false })
  const log = await p.evaluate(() => window.__log); await b.close()
  const slots = [612, 899, 1186], near = x => slots.reduce((q, s) => Math.abs(s - x) < Math.abs(q - x) ? s : q, slots[0]); let bad = 0
  for (const s of slots) {
    const byF = new Map(); for (const r of log.img.filter(r => near(r.dx + 170) === s)) byF.set(r.f, r); const fr = [...byF.values()].sort((a, c) => a.f - c.f)
    const arF = new Map(); for (const r of log.arc.filter(r => near(r.x) === s)) { const a = arF.get(r.f) || []; a.push(r); arF.set(r.f, a) }
    const bodyR = [...arF.keys()].sort((a, c) => a - c).map(f => arF.get(f).reduce((q, x) => x.r > q.r ? x : q).r)
    const row = { slot: s, frames: fr.length, dxMaxJump: mj(fr.map(r => r.dx)), dyMaxJump: mj(fr.map(r => r.dy)), dySD: +sd(fr.map(r => r.dy)).toFixed(2), shadowBodyRSD: +sd(bodyR).toFixed(2) }
    console.log(JSON.stringify(row)); if (row.frames < 30 || row.dxMaxJump > 0 || row.dyMaxJump > 0 || row.shadowBodyRSD > 0) bad++
  }
  console.log(bad ? 'ДРОЖАНИЕ' : 'OK: якорь неподвижен'); process.exit(bad ? 1 : 0)
})()
