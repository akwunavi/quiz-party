// ═══ Замеры кадра стенда «Книги»: rect ключевых узлов + автоматические проверки ═══
//
// measure(page, ctx) выполняется в странице после снимка и возвращает JSON:
//  - nodes:   rect каждого найденного узла (до 6 на селектор), видим ли он;
//  - overlaps: попарные пересечения «блоков» (не вложенных друг в друга по DOM), площадь > 16 px²;
//  - outside: узлы, вылезающие за viewport (и за поля страниц книги — справочно, SAFE пока нет);
//  - overflow: рамки, у которых scrollHeight > clientHeight (контент обрезан/прокрутка);
//  - fonts:   computed font-family/weight/style/size у .q-text, .q-recall, .answer-main + загружен ли шрифт;
//  - book:    геометрия обложки/страниц сцены против viewport (сколько срезано с каждой стороны), --u;
//  - anim:    animationName у узлов с анимацией (для прогона с reduced-motion).
// Ничего не меняет на странице.
'use strict'

const KEYS = [
  '.host-topbar', '.qnum', '.q-text', '.q-frame', '.q-split', '.q-media-grid', '.q-img', '.choices-grid', '.choice-plate',
  '.img-answers', '.answer-block', '.answer-main', '.answer-media', '.answer-reveal', '.team-answers', '.team-answer', '.answered-chip',
  '.q-recall', '.p-ros', '.mel-board', '.mel-modal', '.bk-vinyl', '.fin-table', '.fin-table-wrap', '.p-qr', '.bk-teams',
  '.p-teams', '.host-actions', '.round-badge', '.ri-main', '.rules-frame', '.rule-item', '.neon-title', '.meta-line', '.cw-layout',
  '.answer-time-teams', '.at-team', '.answer-pulse', '.recap-screen', '.recap-body', '.groups-modal', '.pack-badge', '.link-badge',
  '.mono-tag', '.lobby-screen', '.mel-theme', '.mel-tile', '.answers-main', '.p-flag-team',
  '.bk-team', '.bk-invite', '.answer-gallery', '.fin-rname', '.fin-medal', '.fin-award', '.bk-turn',
]
// Блоки, которые НЕ должны пересекаться между собой (если не вложены друг в друга)
const BLOCKS = [
  '.host-topbar', '.q-frame', '.q-text', '.q-media-grid', '.img-answers', '.choices-grid', '.answer-block', '.answer-media',
  '.answer-reveal', '.team-answers', '.answered-chip', '.q-recall', '.round-badge', '.ri-main', '.rules-frame', '.fin-table-wrap',
  '.p-qr', '.p-teams', '.pack-badge', '.link-badge', '.answer-time-teams', '.answer-pulse', '.mel-board', '.groups-modal',
  '.neon-title', '.meta-line', '.recap-body', '.bk-teams', '.bk-qr', '.bk-invite', '.answer-gallery',
]
const FRAMES = ['.q-frame', '.q-text', '.answer-block', '.answers-main', '.team-answers', '.fin-table-wrap', '.rules-frame', '.host-screen',
  '.answer-time-teams', '.mel-board', '.mel-modal', '.recap-body', '.groups-modal', '.p-teams', '.ri-main', '.answer-reveal', '.cw-layout']
const ANIM = ['.q-text', '.answer-block', '.choice-plate', '.rule-item', '.neon-title', '.p-ros', '.p-ros-num', '.mel-tile', '.fin-row', '.p-flag-team', '.p-qr', '.answered-chip', '.mel-modal',
  '.bk-team', '.bk-lamp', '.bk-spark', '.bk-vinyl-disc', '.answer-block.bk-live', '.bk-turn-leaf']
// кегли (px) ключевого текста — для сравнения «до/после» (PROTOTYPES.md)
const TEXT = ['.q-text', '.q-recall', '.answer-main', '.answer-note', '.choice-plate', '.ia-text', '.team-answer .text', '.team-answer .name',
  '.at-team', '.qnum', '.rule-item', '.mel-theme', '.mel-tile .qt-front', '.fin-table td', '.fin-table th', '.p-flag-name', '.bk-team', '.lg-name', '.mel-big']

async function measure(page, ctx = {}) {
  return page.evaluate(({ KEYS, BLOCKS, FRAMES, ANIM, TEXT, ctx }) => {
    const W = innerWidth, H = innerHeight
    const r2 = r => ({ x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) })
    const vis = el => {
      const r = el.getBoundingClientRect(); if (r.width < 1 || r.height < 1) return false
      if (el.checkVisibility && !el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) return false
      return true
    }
    const nodes = {}
    for (const sel of KEYS) {
      const els = [...document.querySelectorAll(sel)]
      if (!els.length) continue
      nodes[sel] = { count: els.length, items: els.slice(0, 6).map(el => ({ ...r2(el.getBoundingClientRect()), visible: vis(el) })) }
    }
    // пересечения блоков
    const blocks = []
    for (const sel of BLOCKS) document.querySelectorAll(sel).forEach((el, i) => { if (vis(el)) blocks.push({ sel, i, el, r: el.getBoundingClientRect() }) })
    const overlaps = []
    for (let a = 0; a < blocks.length; a++) for (let b = a + 1; b < blocks.length; b++) {
      const A = blocks[a], B = blocks[b]
      if (A.sel === B.sel) continue
      if (A.el.contains(B.el) || B.el.contains(A.el)) continue
      const w = Math.min(A.r.right, B.r.right) - Math.max(A.r.left, B.r.left)
      const h = Math.min(A.r.bottom, B.r.bottom) - Math.max(A.r.top, B.r.top)
      if (w > 0 && h > 0 && w * h > 16) overlaps.push({ a: `${A.sel}[${A.i}]`, b: `${B.sel}[${B.i}]`, w: Math.round(w), h: Math.round(h) })
    }
    // книга: обложка и страницы сцены (bg-слой)
    const bgRect = sel => { const el = document.querySelector(`.ny-layer-bg ${sel}`); return el ? el.getBoundingClientRect() : null }
    const cover = bgRect('.p-cover') ?? bgRect('.bk-cover'), pl = bgRect('.p-page-l') ?? bgRect('.bk-page-l'), pr = bgRect('.p-page-r') ?? bgRect('.bk-page-r')
    const clip = r => r && ({ left: Math.max(0, Math.round(-r.left)), top: Math.max(0, Math.round(-r.top)), right: Math.max(0, Math.round(r.right - W)), bottom: Math.max(0, Math.round(r.bottom - H)) })
    const pages = pl && pr ? { left: Math.min(pl.left, pr.left), top: Math.min(pl.top, pr.top), right: Math.max(pl.right, pr.right), bottom: Math.max(pl.bottom, pr.bottom) } : null
    const visPages = pages ? { left: Math.max(0, pages.left), top: Math.max(0, pages.top), right: Math.min(W, pages.right), bottom: Math.min(H, pages.bottom) } : null
    const stage = document.querySelector('.ny-layer-bg .ny-stage-cover:last-child .nyl-stage') ?? document.querySelector('.ny-layer-bg .nyl-stage')
    const themeEl = document.querySelector('.theme-ny_book')
    const book = {
      viewport: { w: W, h: H },
      u: themeEl ? getComputedStyle(themeEl).getPropertyValue('--u').trim() : null,
      stageTransform: stage ? stage.style.transform : null,
      stageCrop: stage ? ['--cx0', '--cx1', '--cy0', '--cy1'].map(k => `${k}=${stage.style.getPropertyValue(k)}`).join(' ') : null,
      cover: cover && r2(cover), coverClipped: clip(cover),
      pageL: pl && r2(pl), pageR: pr && r2(pr), pagesClipped: pages && clip({ left: pages.left, top: pages.top, right: pages.right, bottom: pages.bottom }),
      visiblePages: visPages && { x: Math.round(visPages.left), y: Math.round(visPages.top), w: Math.round(visPages.right - visPages.left), h: Math.round(visPages.bottom - visPages.top) },
    }
    // выход за viewport и за видимые поля страниц
    const outside = []
    for (const b of blocks) {
      const r = b.r
      const out = { left: Math.round(-r.left), top: Math.round(-r.top), right: Math.round(r.right - W), bottom: Math.round(r.bottom - H) }
      const bad = Object.fromEntries(Object.entries(out).filter(([, v]) => v > 1))
      if (Object.keys(bad).length) outside.push({ node: `${b.sel}[${b.i}]`, of: 'viewport', by: bad })
      if (visPages && !b.el.closest('.ny-layer-fx')) {
        const o2 = { left: Math.round(visPages.left - r.left), top: Math.round(visPages.top - r.top), right: Math.round(r.right - visPages.right), bottom: Math.round(r.bottom - visPages.bottom) }
        const bad2 = Object.fromEntries(Object.entries(o2).filter(([, v]) => v > 1))
        if (Object.keys(bad2).length) outside.push({ node: `${b.sel}[${b.i}]`, of: 'pages', by: bad2 })
      }
    }
    // переполнение рамок
    const overflow = []
    for (const sel of FRAMES) document.querySelectorAll(sel).forEach((el, i) => {
      if (!vis(el)) return
      const cs = getComputedStyle(el)
      if (el.scrollHeight > el.clientHeight + 1 || el.scrollWidth > el.clientWidth + 1) {
        overflow.push({ node: `${sel}[${i}]`, scrollH: el.scrollHeight, clientH: el.clientHeight, scrollW: el.scrollWidth, clientW: el.clientWidth, overflow: `${cs.overflowX}/${cs.overflowY}` })
      }
    })
    // шрифты
    const fonts = {}
    for (const sel of ['.q-text', '.q-recall', '.answer-main', '.neon-title', '.choice-plate', '.team-answer', '.fin-table td']) {
      const el = document.querySelector(sel); if (!el) continue
      const cs = getComputedStyle(el)
      const first = cs.fontFamily.split(',')[0].trim()
      fonts[sel] = { family: cs.fontFamily, weight: cs.fontWeight, style: cs.fontStyle, size: cs.fontSize,
        loaded: document.fonts.check(`${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${first}`, el.textContent || 'А') }
    }
    const qt = fonts['.q-text'], qr = fonts['.q-recall']
    const fontMatch = qt && qr ? { family: qt.family === qr.family, weight: qt.weight === qr.weight, style: qt.style === qr.style } : null
    // кегли текста (px, min/max) и полезная площадь: контент-бокс экрана ∩ видимые страницы
    const text = {}
    for (const sel of TEXT) {
      const els = [...document.querySelectorAll(sel)].filter(vis)
      if (!els.length) continue
      const sz = els.map(e => parseFloat(getComputedStyle(e).fontSize))
      text[sel] = { n: els.length, min: Math.round(Math.min(...sz) * 10) / 10, max: Math.round(Math.max(...sz) * 10) / 10 }
    }
    const hs = document.querySelector('.host-screen')
    let area = null
    if (hs) {
      const r = hs.getBoundingClientRect(), cs = getComputedStyle(hs)
      const cb = { l: r.left + parseFloat(cs.paddingLeft), t: r.top + parseFloat(cs.paddingTop), r: r.right - parseFloat(cs.paddingRight), b: r.bottom - parseFloat(cs.paddingBottom) }
      const vp = visPages ? { l: visPages.left, t: visPages.top, r: visPages.right, b: visPages.bottom } : { l: 0, t: 0, r: W, b: H }
      const iw = Math.max(0, Math.min(cb.r, vp.r) - Math.max(cb.l, vp.l)), ih = Math.max(0, Math.min(cb.b, vp.b) - Math.max(cb.t, vp.t))
      area = { content: { w: Math.round(cb.r - cb.l), h: Math.round(cb.b - cb.t) }, onPages: Math.round(iw * ih), share: Math.round((iw * ih) / (W * H) * 1000) / 10,
        offPages: Math.round((cb.r - cb.l) * (cb.b - cb.t) - iw * ih) }
    }
    // ── геометрия адаптивных экранов (одинаково для «до» и «после»): текст вопроса, картинки (пропорции), таймер, пустота снизу ──
    const rc = e => { const r = e.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width * 10) / 10, h: Math.round(r.height * 10) / 10 } }
    const uu = Math.min(W / 1920, H / 1080)
    const qtEl = document.querySelector('.host-screen .q-text')
    const imgEls = [...document.querySelectorAll('.host-screen :is(.q-img img, .bk-photo > img, .img-answer img)')].filter(vis)
    const imgs = imgEls.map(im => { const r = im.getBoundingClientRect(), nw = im.naturalWidth, nh = im.naturalHeight
      // «рамка картинки»: у «до» это объект внутри contain-ячейки, у «после» — сам img; искажение = |рендер/натив − 1| для рамки без contain
      const contain = getComputedStyle(im).objectFit === 'contain'
      return { rect: rc(im), natural: [nw, nh], ratioErr: nw && nh ? Math.round(Math.abs((r.width / r.height) / (nw / nh) - 1) * 1000) / 10 : null, contain, alpha: !!im.closest('[data-alpha]') } })
    const ros = document.querySelector('.p-ros'), slot = document.querySelector('[data-bk-slot="timer"]')
    const contentBottom = Math.max(0, ...[qtEl, ...imgEls].filter(Boolean).map(e => e.getBoundingClientRect().bottom))
    const safeBottom = oyOf() + (1080 - 136) * uu, safeTop = oyOf() + 180 * uu
    function oyOf() { return Math.max(0, (H - 1080 * uu) / 2) }
    const geo = { u: Math.round(uu * 1000) / 1000, qtext: qtEl ? { fontPx: Math.round(parseFloat(getComputedStyle(qtEl).fontSize) * 10) / 10, rect: rc(qtEl), fit: qtEl.dataset.bkFit ?? null } : null,
      imgs, timer: ros ? { art: rc(ros), slot: slot ? rc(slot) : null } : null,
      qnum: document.querySelector('.host-topbar .qnum') ? rc(document.querySelector('.host-topbar .qnum')) : null,
      emptyBelowPct: Math.round(Math.max(0, safeBottom - contentBottom) / (safeBottom - safeTop) * 1000) / 10,
      caps: [...document.querySelectorAll('.bk-cap-key, .img-answer .ia-key')].map(e => Math.round((e.getBoundingClientRect().top + e.getBoundingClientRect().height / 2) * 10) / 10),
      layout: (() => { const m = document.querySelector('.bk-media'), c = document.querySelector('[data-bk-comp]'); return { media: m?.dataset.bkLayout ?? null, mediaScore: m?.dataset.bkScore ?? null, comp: c?.dataset.bkComp ?? null, compScore: c?.dataset.bkScore ?? null } })(),
      caption: [...document.querySelectorAll('.bk-cap-text')].map(e => ({ fontPx: Math.round(parseFloat(getComputedStyle(e).fontSize) * 10) / 10, overflow: e.closest('.bk-cap').scrollHeight > e.closest('.bk-cap').clientHeight + 1 })),
      diag: typeof window.__bkDiagnose === 'function' ? window.__bkDiagnose() : null, diagAttr: document.querySelector('.host-screen')?.dataset.bkDiag ?? null }
    // анимации
    const anim = {}
    for (const sel of ANIM) { const el = document.querySelector(sel); if (el) { const cs = getComputedStyle(el); anim[sel] = cs.animationName === 'none' ? 'none' : `${cs.animationName} ${cs.animationDuration}` } }
    return { scene: ctx.scene, viewport: `${W}x${H}`, reduced: !!ctx.reduced, phaseClasses: document.querySelector('.host-screen')?.className ?? null,
      density: themeEl?.getAttribute('data-ny-density') ?? null, nodes, overlaps, outside, overflow, fonts, fontMatch, book, anim, text, area, geo,
      vinylSpin: document.querySelector('.bk-vinyl') ? document.querySelector('.bk-vinyl').classList.contains('is-spin') : null }
  }, { KEYS, BLOCKS, FRAMES, ANIM, TEXT, ctx })
}

module.exports = { measure, KEYS, BLOCKS }
