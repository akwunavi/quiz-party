// ═══ Размер и место таймера «Книги» на ВСЕХ экранах показа вопроса + плашка шапки против декора (10.76, timer-size-20261128) ═══
// Для каждой сцены × окна: диаметр таймера (.bk-tm, в единицах сцены 1920×1080) против эталона стандартного вопроса (05-q-1img);
// таймер ↔ контент (текст по Range, картинки, плитки) — пересечений нет; таймер внутри страницы книги, не выезжает за обложку;
// плашка шапки (.host-topbar .qnum / .mono-tag) ↔ непрозрачные пиксели декора (гирлянда, ёлки, веточки) по альфе ассета, плашка не за обложкой.
// Ручная раскладка (layout.question.timer) не проверяется на размер: его задаёт ведущий.
// usage: QP_BOOK_SCRATCH=… node e2e/book/timer-size-check.cjs [--no-build] [--vp 1920x1080,…] [--only id,id] [--out файл.json] [--shots каталог] [--assert]
'use strict'
const { chromium } = require('playwright')
const fs = require('fs'), path = require('path')
const { spawnSync } = require('child_process')
const argv = process.argv.slice(2)
const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d }
const VPS = opt('--vp', '1920x1080,1366x768,1280x720,1899x905').split(',').map(s => s.split('x').map(Number))
const ONLY = (opt('--only', '') || '').split(',').filter(Boolean)
const OUT = opt('--out', ''), SHOTS = opt('--shots', ''), ASSERT = argv.includes('--assert')
const REF_SCENE = '05-q-1img'
// сцены показа вопроса с таймером; «Отвечайте» (09n*, --at-timer по числу команд) и мелодия идут со своим размером — для них размер не сверяется с эталоном
const SCENE_IDS = [
  '04-q-0img-long', '05-q-1img', '06-q-2img', '07-q-3img', '08-q-4img', '08b-q-4img-long', '08c-q-4img-choices', '08d-q-text-choices',
  '08e-q-3img-choices', '08f-q-match', '08g-q-rebus', '20-ad-short', '20-ad-long', '20-ad-1img', '20-ad-4img', '20-ad-4img-caps', '20-ad-3img-choices', '20-ad-match',
  '21-cmp-4mix', '21-cmp-1v', '21-fold-long', '35-sprint', '37-jp-board', '38-jp-tile', '40-blitz-dice', '41-blitz-turn', '42-blitz-verdict', '43-race-betting', '44-race-running',
  '45-fp-1', '46-fp-2', '47-fp-3', '49-anagram', '49-anagram-16', '74-anagram-race-t6', '51-order', '52-crossword-q',
  '53-mel-bidding', '55-mel-answering', '58-mel-listen', '14-melody-snippet', '13-melody-board-3x4', '761q-scroll-choices', '769q-scroll-choices', '77-aq-q0', '60-var-fontB', '61-var-qnB',
  '09n04-answer-time-4', '09n08-answer-time-8', '09n24-answer-time-24',
]
const KEY_SHOTS = new Set(['05-q-1img', '08-q-4img', '08d-q-text-choices', '41-blitz-turn', '35-sprint', '52-crossword-q', '49-anagram', '47-fp-3', '55-mel-answering', '14-melody-snippet'])
const NO_REF = /^(09n|53|55|58|59|14|13)/   // «Отвечайте» (--at-timer) и мелодия: свой размер

const PAGE_FN = () => {
  const book = document.querySelector('.bk-book'); if (!book) return { noBook: true }
  const br = book.getBoundingClientRect(), u = br.width / 1792, ox = br.left - 64 * u, oy = br.top - 50 * u
  const S = r => ({ x: +((r.left - ox) / u).toFixed(1), y: +((r.top - oy) / u).toFixed(1), w: +(r.width / u).toFixed(1), h: +(r.height / u).toFixed(1) })
  const vis = el => { const r = el.getBoundingClientRect(); return r.width > 1 && r.height > 1 && (!el.checkVisibility || el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) }
  const inter = (a, b) => { const w = Math.min(a.right, b.right) - Math.max(a.left, b.left), h = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top); return w > 0 && h > 0 ? w * h : 0 }
  const timers = [...document.querySelectorAll('.bk-tm')].filter(vis).map(el => { const r = el.getBoundingClientRect(); return { cls: el.parentElement.className.replace(/\s+/g, ' ').slice(0, 50), r, s: S(r), d: +(r.width / u).toFixed(1) } })
  const host = document.querySelector('.host-screen')
  const content = []
  if (host) {
    const skip = el => el.closest('.bk-timer-slot, .bk-mel-timer, .host-actions, .audio-gate, .version-tag, .host-topbar, [aria-hidden="true"]')
    const w = document.createTreeWalker(host, NodeFilter.SHOW_TEXT)
    for (let n = w.nextNode(); n; n = w.nextNode()) {
      if (!n.textContent.trim() || !n.parentElement || skip(n.parentElement) || !vis(n.parentElement)) continue
      const rg = document.createRange(); rg.selectNodeContents(n)
      for (const r of rg.getClientRects()) if (r.width > 1 && r.height > 1) content.push({ k: 'text:' + n.textContent.trim().slice(0, 18), r })
    }
    host.querySelectorAll('img, video, canvas, .choice-plate').forEach(el => { if (!skip(el) && vis(el) && !el.closest('.bk-garland, .bk-deco')) content.push({ k: el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.split(' ')[0] : ''), r: el.getBoundingClientRect() }) })
  }
  for (const t of timers) {
    // кольцо таймера прозрачно по краям — берём рамку без 4% полей
    const rr = { left: t.r.left + t.r.width * .04, right: t.r.right - t.r.width * .04, top: t.r.top + t.r.height * .04, bottom: t.r.bottom - t.r.height * .04 }
    t.hit = content.filter(c => inter(rr, c.r) > 4).map(c => `${c.k} ${(inter(rr, c.r) / u / u).toFixed(0)}u²`).slice(0, 4)
    t.inBook = t.r.left >= br.left + 8 * u && t.r.right <= br.right - 8 * u && t.r.top >= br.top + 4 * u && t.r.bottom <= br.bottom
    delete t.r
  }
  // плашка шапки против декора по альфе
  const tag = document.querySelector('.host-topbar .qnum, .host-topbar .mono-tag')
  let tagRes = null
  if (tag && vis(tag)) {
    const r = tag.getBoundingClientRect(), cs = getComputedStyle(tag), o = cs.borderImageOutset.split(' ').map(parseFloat)
    const [ot, orr, ob, ol] = o.length === 4 ? o : o.length === 1 ? [o[0], o[0], o[0], o[0]] : o.length === 3 ? [o[0], o[1], o[2], o[1]] : [o[0], o[1] || 0, o[0], o[1] || 0]
    const R = { left: r.left - (ol || 0), right: r.right + (orr || 0), top: r.top - (ot || 0), bottom: r.bottom + (ob || 0) }
    const hits = []
    document.querySelectorAll('.bk-garland img, .bk-deco img').forEach(img => {
      if (!img.complete || !img.naturalWidth || !vis(img) || !vis(img.parentElement)) return
      const ir = img.getBoundingClientRect(); if (!inter(R, ir)) return
      const c = document.createElement('canvas'); c.width = img.naturalWidth; c.height = img.naturalHeight
      const g = c.getContext('2d'); g.drawImage(img, 0, 0)
      const sx = img.naturalWidth / ir.width, sy = img.naturalHeight / ir.height
      const x0 = Math.max(0, Math.floor((R.left - ir.left) * sx)), x1 = Math.min(c.width, Math.ceil((R.right - ir.left) * sx))
      const y0 = Math.max(0, Math.floor((R.top - ir.top) * sy)), y1 = Math.min(c.height, Math.ceil((R.bottom - ir.top) * sy))
      if (x1 <= x0 || y1 <= y0) return
      const d = g.getImageData(x0, y0, x1 - x0, y1 - y0).data; let n = 0
      for (let i = 3; i < d.length; i += 4) if (d[i] > 60) n++
      if (n) hits.push({ img: img.src.replace(/.*\//, ''), px: n, uu: +(n / (sx * sy) / u / u).toFixed(0) })
    })
    tagRes = { s: S(r), text: tag.textContent.trim().slice(0, 30), hits, left: +((r.left - br.left) / u).toFixed(1), insideBook: r.left >= br.left + 24 * u,
      fontPx: parseFloat(cs.fontSize), scrollW: tag.scrollWidth, clientW: tag.clientWidth }
  }
  const garlands = [...document.querySelectorAll('.bk-garland')].filter(vis).map(g => S(g.getBoundingClientRect()))
  return { u: +u.toFixed(4), book: S(br), timers, tag: tagRes, garlands }
}

async function main() {
  const { startStand, ORIGIN, PIN, SCRATCH } = await import('./stand.mjs')
  const { SCENES, makeApi } = await import('./scenes.mjs')
  const stand = await startStand({ noBuild: argv.includes('--no-build') })
  const api = makeApi(ORIGIN, PIN)
  const url = `${ORIGIN}/quiz-party/#/?room=stand`
  const browser = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] })
  const ids = ONLY.length ? ONLY : SCENE_IDS
  const rows = [], fails = []
  const pngDir = path.join(SCRATCH, 'timer-size-png'); fs.rmSync(pngDir, { recursive: true, force: true }); fs.mkdirSync(pngDir, { recursive: true })
  for (const id of ids) {
    const scene = SCENES.find(s => s.id === id); if (!scene) { console.log('нет сцены', id); continue }
    for (const [w, h] of VPS) {
      const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, serviceWorkers: 'block' })
      const page = await ctx.newPage()
      await scene.setup(api)
      await page.clock.install()
      await page.goto(scene.query ? url + '&' + scene.query : url)
      let m = null, why = ''
      try {
        await page.waitForSelector(scene.ready, { timeout: 15000 })
        await page.evaluate(() => document.fonts.ready)
        await page.waitForFunction(() => [...document.images].every(i => i.complete), null, { timeout: 8000 }).catch(() => {})
        await page.waitForTimeout(scene.settle ?? 2000)
        const t = await page.evaluate(() => Date.now())
        if (!scene.noPause) await page.clock.pauseAt(t + 20).catch(() => {})
        await page.evaluate(() => document.getAnimations().forEach(a => { const it = a.effect?.getComputedTiming?.().iterations; if (Number.isFinite(it) && a.playState !== 'finished') { try { a.finish() } catch { /* бесконечная */ } } }))
        await page.waitForTimeout(250)
        m = await page.evaluate(PAGE_FN)
        if (SHOTS && KEY_SHOTS.has(id) && w === 1920) await page.screenshot({ path: path.join(pngDir, `${id}-${w}x${h}.png`) })
      } catch (e) { why = String(e.message).split('\n')[0] }
      await ctx.close()
      rows.push({ id, vp: `${w}x${h}`, why, ...m })
    }
  }
  await browser.close(); await stand.close()
  // эталон — диаметр (в u) таймера стандартного вопроса на том же окне
  for (const r of rows) {
    const ref = rows.find(x => x.id === REF_SCENE && x.vp === r.vp)?.timers?.[0]?.d
    r.ref = ref
    const bad = []
    if (r.why) bad.push('сцена не открылась: ' + r.why)
    for (const t of r.timers || []) {
      if (!NO_REF.test(r.id) && ref && Math.abs(t.d / ref - 1) > 0.02) bad.push(`таймер ${t.d}u ≠ эталон ${ref}u`)
      if (t.hit.length) bad.push('таймер ↔ контент: ' + t.hit.join('; '))
      if (!t.inBook) bad.push('таймер вне страницы книги')
    }
    if (r.tag) {
      if (r.tag.hits.length) bad.push('плашка ↔ декор: ' + r.tag.hits.map(x => `${x.img} ${x.uu}u²`).join('; '))
      if (!r.tag.insideBook) bad.push('плашка у корешка/за обложкой')
      if (r.tag.scrollW > r.tag.clientW + 1) bad.push('текст плашки обрезан')
    }
    r.bad = bad
    if (bad.length) fails.push(`${r.id} ${r.vp}: ${bad.join(' | ')}`)
  }
  for (const r of rows) console.log(`${r.bad?.length ? '✗' : '✓'} ${r.id} ${r.vp} таймеры=${(r.timers || []).map(t => `${t.d}u@(${t.s.x},${t.s.y})`).join(',') || '—'} плашка=${r.tag ? `x${r.tag.s.x}..${(r.tag.s.x + r.tag.s.w).toFixed(0)} y${r.tag.s.y} hits=${r.tag.hits.length}` : '—'}${r.bad?.length ? ' :: ' + r.bad.join(' | ') : ''}`)
  console.log(`\n${rows.length - fails.length}/${rows.length} зелёных`)
  if (OUT) fs.writeFileSync(OUT, JSON.stringify(rows, null, 1))
  if (SHOTS) {
    fs.mkdirSync(SHOTS, { recursive: true })
    const py = `
import os, sys
from PIL import Image
src, dst = sys.argv[1], sys.argv[2]
for f in sorted(os.listdir(src)):
    if not f.endswith('.png'): continue
    im = Image.open(os.path.join(src, f)).convert('RGB'); out = os.path.join(dst, f[:-4] + '.webp')
    for q in (78, 66, 54, 42):
        im.save(out, 'WEBP', quality=q, method=6)
        if os.path.getsize(out) <= 200*1024: break
`
    spawnSync('python3', ['-I', '-c', py, pngDir, SHOTS], { encoding: 'utf8' })
  }
  if (ASSERT && fails.length) process.exit(1)
}
main().catch(e => { console.error(e); process.exit(1) })
