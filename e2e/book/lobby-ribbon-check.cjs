// ═══ Лобби «Книги»: кожаная лента заголовка, QR-карточка, ёлка (10.74) — замеры геометрии и декод QR ═══
// usage: QP_BOOK_SCRATCH=… NODE_PATH=<playwright> node e2e/book/lobby-ribbon-check.cjs [--no-build] [--shots <каталог>] [--jsqr <каталог с node_modules/jsqr и pngjs>]
// Для каждого числа команд (0/4/8/16/24 + бумага 8) × 5 разрешений: ленту не деформирует (border-image: вертикальный и горизонтальный масштаб концов равны), текст внутри кожаной части
// и не заходит на свёрнутые концы, лента не пересекает ни шапку списка команд, ни QR-карточку, ни первую плитку команды; QR-карточка, ёлка, домик, фонарь, колонка команд не пересекаются;
// колонка команд не сдвинулась относительно 10.73 (left 960 / top 262 книги); сторона QR ≥ 220 css-px (на 1920×1080) и код декодируется jsQR.
'use strict'
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path')
const argv = process.argv.slice(2); const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d }
const SHOTS = opt('--shots', ''), JSQR = opt('--jsqr', '')
const inter = (a, b) => { const w = Math.min(a.r, b.r) - Math.max(a.l, b.l), h = Math.min(a.b, b.b) - Math.max(a.t, b.t); return w > 0.5 && h > 0.5 ? Math.round(w * h) : 0 }
;(async () => {
  const { startStand, ORIGIN, PIN } = await import('./stand.mjs'); const { makeApi } = await import('./scenes.mjs')
  await startStand({ noBuild: argv.includes('--no-build') }); const api = makeApi(ORIGIN, PIN); const b = await chromium.launch(); let bad = 0
  let jsQR = null, PNG = null; if (JSQR) { jsQR = require(path.join(JSQR, 'node_modules/jsqr')); PNG = require(path.join(JSQR, 'node_modules/pngjs')).PNG }
  if (SHOTS) fs.mkdirSync(SHOTS, { recursive: true })
  const cases = [[0, false], [4, false], [8, false], [16, false], [24, false], [8, true]]
  for (const [w, h] of [[1920, 1080], [1366, 768], [1280, 720], [1899, 905], [3840, 2160]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, serviceWorkers: 'block' }); const p = await ctx.newPage()
    for (const [n, paper] of cases) {
      await api.reset(); await api.teams(n)
      await api.session({ pack_id: paper ? 'stand-book-paper' : 'stand-book', phase: 'lobby', round_number: 0, question_index: 0 })
      await p.goto('about:blank'); await p.goto(`${ORIGIN}/quiz-party/#/?room=stand`); await p.waitForSelector('.lobby-screen .neon-title', { timeout: 20000 }); await p.waitForSelector('.bk-ribbon', { timeout: 20000 }); await p.waitForTimeout(3200)
      const m = await p.evaluate(() => {
        const R = e => { if (!e) return null; const r = e.getBoundingClientRect(); return { l: r.left, t: r.top, r: r.right, b: r.bottom, w: r.width, h: r.height } }
        const u = Math.min(innerWidth / 1920, innerHeight / 1080)
        const h1 = document.querySelector('.lobby-screen .neon-title'), sp = h1.querySelector('span'), rg = document.createRange(); rg.selectNodeContents(sp); const tr = rg.getBoundingClientRect()
        const rib = document.querySelector('.bk-ribbon'), rr = rib.getBoundingClientRect(), cs = getComputedStyle(rib)
        const side = parseFloat(cs.borderLeftWidth)       // ширина свёрнутого конца на экране
        const imgScaleX = side / 175, imgScaleY = rib.offsetHeight / 256, midScaleY = imgScaleY   // в px вёрстки (до масштаба сцены): концы 175 px файла → side px; высота файла 256 → высота элемента
        const garland = [...document.querySelectorAll('.bk-garland')].find(g => getComputedStyle(g).opacity > 0.5)
        const trees = [...document.querySelectorAll('.bk-deco')].filter(d => getComputedStyle(d).opacity > 0.5).map(R)
        const newTree = [...document.querySelectorAll('.bk-deco')].find(d => d.style.left === '470px')
        const qr = document.querySelector('.bk-qr'), tile = document.querySelector('.bk-qr-tile'), card = document.querySelector('.bk-qr-card'), svg = document.querySelector('.bk-qr-tile svg')
        const house = document.querySelector('.bk-ls-house > img'), lantern = document.querySelector('.bk-ls-lantern'), head = document.querySelector('.bk-teams-head'), teams = document.querySelector('.bk-teams')
        const firstCard = document.querySelector('.bk-tc-item, .bk-invite-big')
        const invite = document.querySelector('.bk-invite')
        return { u, fontSize: parseFloat(getComputedStyle(sp).fontSize), fontFamily: getComputedStyle(sp).fontFamily.slice(0, 40), fill: getComputedStyle(sp).webkitTextFillColor, bgclip: getComputedStyle(sp).backgroundClip,
          text: R({ getBoundingClientRect: () => tr }), h1: R(h1), rib: R(rib), side, imgScaleX, imgScaleY, midScaleY, borderImage: cs.borderImageSlice + ' | ' + cs.borderImageWidth + ' | ' + cs.borderImageRepeat,
          garland: R(garland), newTree: R(newTree), qr: R(qr), card: R(card), tile: R(tile), svg: R(svg), house: R(house), lantern: R(lantern), head: R(head), teams: R(teams), firstCard: R(firstCard), invite: R(invite),
          treesN: trees.length, bookBox: R(document.querySelector('.bk-content')), fontOk: document.fonts.check('700 20px "Cormorant Garamond"') }
      })
      const u = m.u, ox = m.bookBox.l, oy = m.bookBox.t, errs = []
      const need = (c, msg) => { if (!c) errs.push(msg) }
      // 1. без деформаций: масштаб концов по X и по Y совпадает (допуск 1.5 %), текст внутри кожаной части между свёрнутыми концами
      need(Math.abs(m.imgScaleX - m.imgScaleY) / m.imgScaleY < 0.015, `деформация концов: x ${m.imgScaleX.toFixed(3)} y ${m.imgScaleY.toFixed(3)}`)
      need(m.text.l >= m.rib.l + (m.side + 2) * u && m.text.r <= m.rib.r - (m.side + 2) * u, `текст заходит на концы: ${m.text.l.toFixed(0)}–${m.text.r.toFixed(0)} при полосе ${(m.rib.l + m.side * u).toFixed(0)}–${(m.rib.r - m.side * u).toFixed(0)}`)
      const plateTop = m.rib.t + 5 / 256 * m.rib.h, plateBot = m.rib.t + 182 / 256 * m.rib.h
      need(m.text.t >= plateTop && m.text.b <= plateBot, `текст вне тела ленты по вертикали: ${m.text.t.toFixed(0)}–${m.text.b.toFixed(0)} при ${plateTop.toFixed(0)}–${plateBot.toFixed(0)}`)
      need(Math.abs((m.text.l + m.text.r) / 2 - w / 2) < 3, `текст не по центру: ${((m.text.l + m.text.r) / 2).toFixed(1)} vs ${w / 2}`)
      need(m.fontOk && /Cormorant/.test(m.fontFamily), 'шрифт заголовка не Cormorant')
      need(m.fill.includes('0, 0, 0, 0') && m.bgclip === 'text', 'золотое тиснение (background-clip: text) не применилось')
      // 2. пересечения
      const hit = (a, bb, name) => { if (a && bb) { const s = inter(a, bb); if (s) errs.push(`пересечение ${name}: ${s} px²`) } }
      hit(m.rib, m.head, 'лента × шапка команд'); hit(m.rib, m.firstCard, 'лента × 1-я команда'); hit(m.rib, m.card, 'лента × QR-карточка')
      if (!paper) { hit(m.card, m.newTree, 'QR-карточка × новая ёлка'); hit(m.card, m.house, 'QR-карточка × домик'); hit(m.card, m.lantern, 'QR × фонарь'); hit(m.card, m.teams, 'QR × колонка команд') }
      hit(m.newTree, m.teams, 'новая ёлка × колонка команд'); hit(m.newTree, m.lantern, 'новая ёлка × фонарь')
      // новая ёлка и домик: рамки — по bounding box, у домика слева прозрачное поле с маленькими елями-фоном: допускаем до 30 % площади ёлки
      if (m.newTree && m.house) { const s = inter(m.newTree, m.house); need(s / (m.newTree.w * m.newTree.h) < 0.3, `ёлка закрывает домик: ${(100 * s / (m.newTree.w * m.newTree.h)).toFixed(1)} % площади ёлки`) }
      // 3. колонка команд не сдвинулась: left 960 / top 262 книги (в px экрана — через масштаб u)
      need(Math.abs((m.teams.l - ox) / u - 960) < 1.5 && Math.abs((m.teams.t - oy) / u - 262) < 1.5, `колонка команд сдвинулась: ${((m.teams.l - ox) / u).toFixed(1)}, ${((m.teams.t - oy) / u).toFixed(1)}`)
      // 4. размер QR (CSS-px на экране) и декод
      let dec = ''
      if (!paper) {
        const q = m.svg.w; if (w === 1920) need(q >= 220, `QR меньше 220 px: ${q.toFixed(1)}`)
        if (jsQR) {
          const buf = await p.screenshot({ clip: { x: Math.max(0, m.tile.l - 4), y: Math.max(0, m.tile.t - 4), width: m.tile.w + 8, height: m.tile.h + 8 } }); const png = PNG.sync.read(buf)
          const r = jsQR(new Uint8ClampedArray(png.data), png.width, png.height); dec = r ? 'qr=ok' : 'qr=НЕ ДЕКОДИРУЕТСЯ'; need(!!r, 'QR не декодируется')
        }
      }
      if (SHOTS && (n === 0 || n === 8 || n === 24) && !paper) await p.screenshot({ path: path.join(SHOTS, `lobby-${n}-${w}x${h}.png`) })
      if (SHOTS && paper && w === 1920) await p.screenshot({ path: path.join(SHOTS, `lobby-paper8-${w}x${h}.png`) })
      if (errs.length) bad++
      console.log(errs.length ? 'FAIL' : 'OK  ', `${w}x${h}`, paper ? 'paper' : 'online', 'n=' + n, `font=${m.fontSize.toFixed(1)}`, `rib=${m.rib.w.toFixed(0)}x${m.rib.h.toFixed(0)}`, `qr=${m.svg ? m.svg.w.toFixed(0) : '-'}`, dec, errs.join(' ; '))
    }
    await ctx.close()
  }
  await b.close(); console.log(bad ? `FAILED ${bad}` : 'ALL OK'); process.exit(bad ? 1 : 0)
})().catch(e => { console.error(e); process.exit(1) })
