// ═══ Проверка адаптивной системы «Книги» по замерам DOM (этап C, ADAPTIVE.md) ═══
// Читает docs-dev/book-redesign/shots/adaptive/<after|before>/measure.json (его пишет shoot.cjs → measure.cjs → geo) и проверяет
// ФАКТИЧЕСКУЮ геометрию четырёх контрольных сценариев × четырёх разрешений. Код выхода 1 — есть нарушения.
// usage: node e2e/book/adaptive-check.cjs [after|before]
'use strict'
const fs = require('fs'), path = require('path')
const which = process.argv[2] || 'after'
const file = path.join(__dirname, '..', '..', 'docs-dev', 'book-redesign', 'shots', 'adaptive', which, 'measure.json')
const rows = JSON.parse(fs.readFileSync(file, 'utf8')).filter(r => !r.reduced)
const SCENARIOS = ['20-ad-short', '20-ad-long', '20-ad-1img', '20-ad-4img', '20-ad-4img-caps']
const VPS = ['1920x1080', '1899x905', '1366x768', '1280x720']
const fails = [], lines = []
for (const sc of SCENARIOS) for (const vp of VPS) {
  const r = rows.find(x => x.name === `${sc}-${vp}`)
  if (!r) { fails.push(`${sc} ${vp}: нет замера`); continue }
  const g = r.geo, [W, H] = vp.split('x').map(Number), u = g.u, oy = Math.max(0, (H - 1080 * u) / 2)
  const cTop = oy + 180 * u, cBot = oy + (1080 - 136) * u, cH = cBot - cTop
  const bad = m => fails.push(`${sc} ${vp}: ${m}`)
  if (which === 'after') {
    if (!Array.isArray(g.diag)) bad('диагностика не подключена')
    else for (const i of g.diag) bad(`диагностика ${i.code} ${i.id}: ${i.detail}`)
    if (g.diagAttr !== 'ok') bad(`data-bk-diag=${g.diagAttr}`)
  }
  if (g.timer && Math.abs(g.timer.art.w - g.timer.art.h) > 1) bad(`таймер не квадрат ${g.timer.art.w}×${g.timer.art.h}`)
  for (const im of g.imgs) if (im.ratioErr != null && im.ratioErr > 1.5 && !im.contain) bad(`пропорции картинки искажены на ${im.ratioErr} %`)
  const qt = g.qtext
  if (qt && which === 'after') {
    if (qt.fit === 'overflow') bad('текст не помещается на минимальном кегле')
    const cy = qt.rect.y + qt.rect.h / 2, off = Math.abs(cy - (cTop + cH / 2)) / cH
    if ((sc === '20-ad-short' || sc === '20-ad-long') && off > 0.1) bad(`текст смещён от центра области на ${(off * 100).toFixed(0)} %`)
    if (sc === '20-ad-short' && qt.fontPx < 70 * u) bad(`короткий текст мелкий: ${qt.fontPx} px < ${(70 * u).toFixed(0)} px`)
    if (sc === '20-ad-long' && qt.fontPx < 28 * u) bad(`длинный текст мельче минимума: ${qt.fontPx} px`)
    if (sc.startsWith('20-ad-4img')) {
      const ys = g.imgs.map(i => i.rect.y + i.rect.h), xs = g.imgs.map(i => i.rect.x + i.rect.w / 2)
      if (g.imgs.length !== 4) bad(`картинок ${g.imgs.length}, ожидалось 4`)
      const fold = W / 2
      for (const i of g.imgs) if (i.rect.x < fold && i.rect.x + i.rect.w > fold - 2) bad('картинка на сгибе')
      // подписи (буквы) на одном уровне: центры маркеров в каждой строке сетки совпадают
      if (sc === '20-ad-4img-caps' && g.caps) { const row = [g.caps.slice(0, 2), g.caps.slice(2)]; for (const rw of row) if (rw.length === 2 && Math.abs(rw[0] - rw[1]) > 1) bad('подписи в строке на разных уровнях') }
      void ys; void xs
    }
  }
  lines.push(`${which} ${sc.padEnd(12)} ${vp.padEnd(9)} кегль=${qt ? qt.fontPx : '—'}px  пустота снизу=${g.emptyBelowPct}%  таймер=${g.timer ? g.timer.art.w + '×' + g.timer.art.h : '—'}  картинок=${g.imgs.length}  замечаний=${Array.isArray(g.diag) ? g.diag.length : '—'}`)
}
console.log(lines.join('\n'))
if (fails.length) { console.error('\nНАРУШЕНИЯ:\n' + fails.map(f => ' - ' + f).join('\n')); process.exit(1) }
console.log('\nOK: все проверки пройдены (' + SCENARIOS.length * VPS.length + ' кадров)')
