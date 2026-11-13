// ═══ Проверка карточки команды на настоящих компонентах (BookTeamCard): ассет реально подключён, нет деформации, текст в зоне пергамента ═══
// usage: QP_BOOK_SCRATCH=… node e2e/book/tc-check.cjs [--out файл.json]
'use strict'
const { chromium } = require('playwright'); const fs = require('fs')
const SC = ['01-lobby-4', '01-lobby-8', '01-lobby-16', '01-lobby-names', '09-answer-time', '11-revealed-plain', '15-finale-8']
const VPS = [[1920, 1080], [1899, 905], [1366, 768], [1280, 720]]
;(async () => {
  const { startStand, ORIGIN, PIN } = await import('./stand.mjs'); const { SCENES, makeApi } = await import('./scenes.mjs')
  const stand = await startStand({ noBuild: true }); const api = makeApi(ORIGIN, PIN); const b = await chromium.launch(); const rows = [], fails = []
  for (const id of SC) for (const [w, h] of VPS) {
    const sc = SCENES.find(s => s.id === id); await sc.setup(api)
    const ctx = await b.newContext({ viewport: { width: w, height: h }, serviceWorkers: 'block' }); const p = await ctx.newPage(); const net = []
    p.on('response', r => { if (/team-card\.webp/.test(r.url())) net.push(r.status()) })
    await p.clock.install(); await p.goto(`${ORIGIN}/quiz-party/#/?room=stand`); await p.waitForSelector(sc.ready, { timeout: 15000 }).catch(() => {})
    await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(sc.settle ?? 2000); if (sc.runFor) { await p.clock.runFor(sc.runFor); await p.waitForTimeout(400) }
    const m = await p.evaluate(() => [...document.querySelectorAll('.bk-tc')].map(c => {
      const cs = getComputedStyle(c), r = c.getBoundingClientRect(), nm = c.querySelector('.bk-tc-name'), nr = nm.getBoundingClientRect(), bw = parseFloat(cs.borderLeftWidth), br = parseFloat(cs.borderRightWidth)
      const k = r.height / 662, fs = parseFloat(getComputedStyle(nm).fontSize), box = nm.parentElement.getBoundingClientRect()
      return { src: cs.borderImageSource.includes('team-card.webp'), h: r.height, w: r.width, left: bw, right: br, errL: Math.abs(bw - 480 * c.offsetHeight / 662), errR: Math.abs(br - 153 * c.offsetHeight / 662), scale: r.width > 0 ? 1 : 0,
        inZone: nr.left >= r.left + 480 * k - 2 && nr.right <= r.right - 153 * k + 2 && nr.top >= r.top + 100 * k - 2 && nr.bottom <= r.bottom - 222 * k + 2,
        fits: nm.offsetHeight <= nm.parentElement.clientHeight + 2, fontPx: fs, lines: Math.round(nr.height / (fs * 1.1)), text: nm.textContent.slice(0, 30), fontMatch: /Garamond|PT Serif|Lora/.test(getComputedStyle(nm).fontFamily) } }))
    await ctx.close(); const bad = []
    if (!m.length) bad.push('карточек нет'); if (!net.length || net.some(s => s !== 200 && s !== 304)) bad.push(`ассет по сети: ${net}`)
    m.forEach((c, i) => { if (!c.src) bad.push(`#${i} нет border-image ассета`); if (c.errL > 1.2 || c.errR > 1.2) bad.push(`#${i} края деформированы (ошибка ${c.errL.toFixed(2)}/${c.errR.toFixed(2)} px)`)
      if (!c.inZone) bad.push(`#${i} «${c.text}» вне зоны пергамента`); if (!c.fits) bad.push(`#${i} «${c.text}» не помещается`); if (c.lines > 2) bad.push(`#${i} «${c.text}» ${c.lines} строк`) })
    const minF = m.length ? Math.min(...m.map(c => c.fontPx)) : 0
    rows.push({ id, vp: `${w}x${h}`, cards: m.length, net: net.length, minFont: Math.round(minF * 10) / 10, bad }); bad.forEach(x => fails.push(`${id} ${w}x${h}: ${x}`))
    console.log(`${bad.length ? '✗' : '✓'} ${id} ${w}x${h} карточек=${m.length} ассет=${net.join(',')} мин.кегль=${minF.toFixed(1)}px${bad.length ? '\n   ' + bad.slice(0, 4).join('\n   ') : ''}`)
  }
  await b.close(); await stand.close(); const o = process.argv.indexOf('--out'); if (o > 0) fs.writeFileSync(process.argv[o + 1], JSON.stringify({ rows, fails }, null, 1))
  console.log(fails.length ? `\nНАРУШЕНИЙ: ${fails.length}` : '\nOK'); process.exit(fails.length ? 1 : 0)
})()
