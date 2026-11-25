// ═══ Телефон игрока в теме «Книга» (10.75): замеры по устройствам × экранам и кадры ═══
// usage: QP_BOOK_APP=<готовая сборка> QP_BOOK_SCRATCH=<каталог> NODE_PATH=<playwright> node e2e/book/player-book-check.cjs --tag after|before [--theme ny_book|classic|potter|new_year|ny_home] [--shots <каталог>] [--matrix] [--only id,id]
// Что меряет (--matrix, все 7 устройств × все экраны игрока): нет горизонтального прокрутки, ни один элемент не вылезает за экран,
// кнопки ≥ 44 px и достижимы (после прокрутки в зону видимости не перекрыты), шапка ≤ 72 px (+ safe-area), декор есть ТОЛЬКО на экранах
// ожидания/разбора и не заходит на текст, экранная клавиатура (окно ниже на 320 px) не прячет поле и кнопку «Отправить», контраст AA.
// Safe-area имитируется переопределением --pl-safe-t/--pl-safe-b (в Chromium env() вручную не задать): 59 px сверху (Dynamic Island), 34 px снизу.
'use strict'
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path')
const argv = process.argv.slice(2); const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d }
const TAG = opt('--tag', 'after'), THEME = opt('--theme', 'ny_book'), SHOTS = opt('--shots', ''), MATRIX = argv.includes('--matrix'), ONLY = (opt('--only', '') || '').split(',').filter(Boolean)
process.env.QP_BOOK_THEME = THEME
const DEVICES = [['iPhone15-393x852', 393, 852], ['iPhonePro-402x874', 402, 874], ['ProMax-430x932', 430, 932], ['ProMax-440x956', 440, 956], ['Android-360x800', 360, 800], ['Android-412x915', 412, 915], ['Android-384x854', 384, 854]]
const iso = ms => new Date(ms).toISOString(), now = () => Date.now()
const lum = ([r, g, b]) => { const f = v => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4 }; return .2126 * f(r) + .7152 * f(g) + .0722 * f(b) }
const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05) }

;(async () => {
  const { startStand, ORIGIN, PIN } = await import('./stand.mjs'); const { makeApi, GAME } = await import('./scenes.mjs'); const { PACK_ONLINE, PACK_ALL } = await import('./make-pack.mjs')
  await startStand({ noBuild: true }); const api = makeApi(ORIGIN, PIN)
  const PK = round => (round >= 9 ? PACK_ALL : PACK_ONLINE), qid = (round, qi) => `${PK(round)}-r${round}-q${qi}`
  const Q = (round, qi, extra = {}) => ({ pack_id: PK(round), phase: 'question', round_number: round, question_index: qi, timer_started_at: iso(now() - 8000), reveal: false, ...extra })
  const PH = (phase, round = 0, extra = {}) => ({ pack_id: PK(round), phase, round_number: round, question_index: 0, timer_started_at: null, reveal: false, ...extra })
  // «мой» игрок — первая команда (с значком); остальные — фон. kind: 'calm' — ожидание/разбор (декор нужен), 'input' — ввод ответа (декор запрещён)
  let LAST = null
  const mine = async n => { const ts = await api.teams(n ?? 5); const me = await api.call('/api/teams', 'POST', { name: 'Самая длинная команда вечера', color: '#d6336c', icon: '🎄', game_id: GAME, last_seen_at: '2099-01-01T00:00:00.000Z', created_at: iso(now()) }); LAST = me; return { me, ts } }
  const SC = [
    { id: 'register', kind: 'register', noTeam: true, kb: true, setup: async () => { await api.reset(); await api.session(PH('lobby')) } },
    { id: 'lobby', kind: 'calm', setup: async () => { await api.reset(); await mine(); await api.session(PH('lobby')) } },
    { id: 'round-intro', kind: 'calm', setup: async () => { await api.reset(); await mine(); await api.session(PH('round_intro')) } },
    { id: 'scoreboard', kind: 'calm', setup: async () => { await api.reset(); await mine(); await api.session(PH('scoreboard', 3)) } },
    { id: 'break', kind: 'calm', setup: async () => { await api.reset(); await mine(); await api.session(PH('break', 3)) } },
    { id: 'finale', kind: 'calm', setup: async () => { await api.reset(); await mine(); await api.session(PH('finale', 7)) } },
    { id: 'look-screen', kind: 'calm', setup: async () => { await api.reset(); await mine(); await api.session(Q(14, 0, { phase: 'answer_time' })) } },
    { id: 'review', kind: 'calm', setup: async () => { await api.reset(); await mine(); await api.session(PH('show_answers', 0, { question_index: 1, reveal: true })) } },
    { id: 'jeopardy-wait', kind: 'calm', setup: async () => { await api.reset(); await mine(); await api.session(Q(10, 0, { timer_started_at: null, melody: { jp: { tile: null } } })) } },
    { id: 'reveal-wait', kind: 'calm', setup: async () => { await api.reset(); await mine(); await api.session(Q(13, 0, { timer_started_at: null })) } },
    { id: 'reveal-closed', kind: 'calm', setup: async () => { await api.reset(); await mine(); await api.session(Q(13, 0, { timer_started_at: null, melody: { rv: { qid: qid(13, 0), phase: 'review', startedAt: iso(now()), phaseSec: 0 } } })) } },
    { id: 'text-answer', kind: 'input', kb: true, setup: async () => { await api.reset(); await mine(); await api.session(Q(0, 0)) } },
    { id: 'choices', kind: 'input', setup: async () => { await api.reset(); await mine(); await api.session(Q(0, 6)) }, scrollTo: '.pl-choices' },
    { id: 'match-order-stakes', kind: 'input', setup: async () => { await api.reset(); await mine(); await api.session(Q(1, 0)) } },
    { id: 'crossword', kind: 'input', setup: async () => { await api.reset(); await mine(); await api.session(Q(3, 0)) } },
    { id: 'melody-bid', kind: 'input', setup: async () => { await api.reset(); const { me, ts } = await mine(); await api.session({ pack_id: PACK_ONLINE, phase: 'question', round_number: 4, question_index: 0, timer_started_at: null, reveal: false, melody: { key: '1-2', stage: 'bidding', order: [me.id, ...ts.slice(0, 3).map(t => t.id)], turn: 0, snippetSec: 5, startSec: 2, played: ['0-0'], deadline: iso(now() + 8000) } }) } },
    { id: 'blitz', kind: 'input', kb: true, setup: async () => { await api.reset(); const { me, ts } = await mine(4); const all = [me, ...ts]; const left = Object.fromEntries(all.map((t, i) => [t.id, 60000 - i * 9000]))
      await api.call('/api/blitz?round=11', 'PUT', { order: all.map(t => t.id), turn: 0, left, correct: Object.fromEntries(all.map((t, i) => [t.id, 3 - (i % 3)])), missed: Object.fromEntries(all.map((t, i) => [t.id, i % 2])), used: [qid(11, 0)], current: { questionId: qid(11, 1), attempts: 1, shownAt: now() - 6000 }, finished: false }); await api.session(Q(11, 0, { timer_started_at: null })) } },
    { id: 'jeopardy-open', kind: 'input', kb: true, setup: async () => { await api.reset(); await mine(); await api.session(Q(10, 0, { melody: { jp: { tile: 5 } } })) } },
    { id: 'anagram', kind: 'input', setup: async () => { await api.reset(); await mine(); await api.session(Q(14, 0, { timer_started_at: iso(now() - 12000) })) } },
    { id: 'reveal-input', kind: 'input', kb: true, setup: async () => { await api.reset(); await mine(); await api.session(Q(13, 0, { timer_started_at: null, melody: { rv: { qid: qid(13, 0), phase: 1, startedAt: iso(now() - 3000), phaseSec: 30 } } })) } },
    { id: 'race-bet', kind: 'input', setup: async () => { await api.reset(); await mine(); await api.session(Q(12, 0, { timer_started_at: null, melody: { race: { stage: 'betting', round: 12, game: GAME } } })) } },
  ].filter(s => !ONLY.length || ONLY.includes(s.id))

  const b = await chromium.launch(); let bad = 0; const rows = []
  if (SHOTS) fs.mkdirSync(SHOTS, { recursive: true })
  const devs = MATRIX ? DEVICES : [DEVICES[0]]
  for (const [dn, w, h] of devs) {
    for (const sim of (MATRIX ? [false, true] : [false])) {
      const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: SHOTS && !MATRIX ? 2 : 1, isMobile: true, hasTouch: true, serviceWorkers: 'block', locale: 'ru-RU' })
      const p = await ctx.newPage()
      for (const sc of SC) {
        await sc.setup()
        const team = sc.noTeam ? null : LAST
        await p.addInitScript(t => { try { t ? localStorage.setItem('qp-team', JSON.stringify(t)) : localStorage.removeItem('qp-team') } catch { /* */ } }, team)
        await p.goto('about:blank'); await p.goto(`${ORIGIN}/quiz-party/#/player?room=stand`)
        await p.waitForSelector('.pl-root, .pl-register, .pl-center, .pl-blitz, .pl-wait', { timeout: 20000 }).catch(() => {})
        await p.waitForTimeout(1500)
        if (sim) await p.evaluate(() => { const r = document.querySelector('[class*="theme-"]'); r.style.setProperty('--pl-safe-t', '59px'); r.style.setProperty('--pl-safe-b', '34px') })
        const m = await p.evaluate(({ kind }) => {
          const R = e => { const r = e.getBoundingClientRect(); return { l: r.left, t: r.top, r: r.right, b: r.bottom, w: r.width, h: r.height } }
          const root = document.querySelector('.pl-root, .pl-register, .pl-center, .pl-blitz, .pl-wait'); if (!root) return { err: 'нет экрана игрока: ' + document.body.innerText.slice(0, 60) }
          const out = { scr: root.className, hscroll: document.documentElement.scrollWidth - innerWidth, bodyW: document.body.scrollWidth - innerWidth, themeCls: document.querySelector('[class*="theme-"]')?.className.split(' ')[0] }
          out.over = [...root.querySelectorAll('*')].filter(e => { if (e.closest('.pl-crossword, .bd-track, [style*="overflow"]')) return false; const r = e.getBoundingClientRect(); return r.width > 0 && (r.right > innerWidth + 1 || r.left < -1) }).slice(0, 4).map(e => e.className + ' ' + Math.round(e.getBoundingClientRect().right))
          const hdr = document.querySelector('.pl-header'); if (hdr) { const hr = R(hdr); const cs = getComputedStyle(hdr), st = parseFloat(getComputedStyle(document.querySelector('[class*="theme-"]')).getPropertyValue('--pl-safe-t')) || 0
            const plate = hdr.querySelector('.pl-hname'), rd = hdr.querySelector('.pl-round'); out.hdr = { h: Math.round(hr.h), contentH: Math.round(hr.h - parseFloat(cs.paddingTop) + (parseFloat(cs.paddingTop) > 8 ? 8 + (parseFloat(cs.paddingTop) - 8) * 0 : 0)), pt: parseFloat(cs.paddingTop), font: cs.fontFamily.slice(0, 20), plate: plate && R(plate), round: rd && R(rd), roundText: rd?.textContent, st,
              nameClip: plate && (() => { const t = plate.querySelector('.pl-hname-t'); return t ? t.scrollWidth > t.clientWidth : false })() }
            out.hdr.plateOverRound = plate && rd ? Math.max(0, plate.getBoundingClientRect().right - rd.getBoundingClientRect().left) : 0 }
          // декор (псевдоэлементы)
          const pc = (e, ps) => e ? getComputedStyle(e, ps).content : 'none'
          out.decor = { centerBefore: pc(root.classList.contains('pl-center') ? root : null, '::before'), afterRoot: pc(root, '::after'), garlandHdr: pc(hdr, '::after') }
          out.hasDecor = [out.decor.centerBefore, out.decor.afterRoot, out.decor.garlandHdr].some(c => c && c !== 'none' && c !== 'normal')
          // содержимое vs декор: нижняя полоса 92 px корня и верхняя 44 px
          const rr = R(root), kids = [...root.querySelectorAll('.pl-list > *, .pl-notice, .pl-wait, .pl-wait-sub, .pl-team-badge')]
          const scrolled = document.documentElement.scrollHeight
          out.rootBottom = Math.round(rr.b + scrollY); out.pageH = scrolled
          const hillTop = rr.b + scrollY - (innerWidth >= 520 ? 110 : 92)
          out.lastBottom = kids.length ? Math.round(Math.max(...kids.map(k => k.getBoundingClientRect().bottom + scrollY))) : 0; out.hillTop = Math.round(hillTop)
          out.garlandBand = hdr ? Math.round(hdr.getBoundingClientRect().bottom + 42) : Math.round(parseFloat(getComputedStyle(document.querySelector('[class*="theme-"]')).getPropertyValue('--pl-safe-t')) + 42)
          out.firstTop = kids.length ? Math.round(Math.min(...kids.filter(k => !k.classList.contains('pl-notice') || !hdr).map(k => k.getBoundingClientRect().top))) : 0
          // кнопки
          out.btns = [...root.querySelectorAll('button, input:not([type=hidden]), textarea')].filter(e => e.getBoundingClientRect().width > 0).map(e => { const r = e.getBoundingClientRect(); return { tag: e.tagName, cls: String(e.className).slice(0, 24), w: Math.round(r.width), h: Math.round(r.height), l: Math.round(r.left), r: Math.round(r.right), fs: parseFloat(getComputedStyle(e).fontSize) } })
          // контраст: текстовые элементы
          out.txt = [...new Set(['.pl-notice', '.pl-wait', '.pl-wait-sub', '.pl-qtext', '.pl-sent', '.ed-hint', '.pl-round', '.pl-send', '.pl-hname-t', '.pl-team-badge', '.pl-qlabel', '.pl-review-row .txt', '.pl-review-row .num', '.pl-bz-head', '.pl-bz-dim', '.pl-bz-q', '.pl-bz-state', '.pl-bz-skip', 'h1'].filter(s => root.querySelector(s)))].map(s => {
            const e = root.querySelector(s); const col = getComputedStyle(e).color.match(/[\d.]+/g).map(Number)
            let bg = s === '.pl-round' ? [143, 29, 44] : null, n = e; if (bg) n = null; while (n && n !== document.documentElement) { const c = getComputedStyle(n).backgroundColor.match(/[\d.]+/g)?.map(Number); if (c && (c[3] ?? 1) > .9) { bg = c; break } n = n.parentElement }
            let op = 1; for (let q = e; q && q.nodeType === 1; q = q.parentElement) op *= parseFloat(getComputedStyle(q).opacity)
            return { s, dis: e.disabled === true, op, col: col.slice(0, 3), bg: bg ? bg.slice(0, 3) : null, fs: parseFloat(getComputedStyle(e).fontSize), fw: getComputedStyle(e).fontWeight, ff: getComputedStyle(e).fontFamily.slice(0, 18) } })
          out.input = !!root.querySelector('input:not([type=hidden]), textarea')
          out.bodyBg = getComputedStyle(document.querySelector('[class*="theme-"]')).backgroundColor
          return out
        }, { kind: sc.kind })
        const errs = []
        if (m.err) errs.push(m.err); else {
          const need = (c, msg) => { if (!c) errs.push(msg) }
          const isNy = THEME === 'ny_book'
          need(m.hscroll <= 0 && m.bodyW <= 0, `горизонтальный скролл: ${m.hscroll}/${m.bodyW}`)
          need(!m.over.length, 'вылезает за экран: ' + m.over.join('; '))
          for (const bt of m.btns) { if (bt.tag === 'BUTTON' && !/^(pl-fb-dot|colors|color-dot|pl-emoji|pl-pick)/.test(bt.cls)) need(bt.h >= 44 || /pl-erase|pl-fb|chev|cw|cell|tile|pl-an|rt-/.test(bt.cls) || bt.w >= 44 && bt.h >= 36, `мелкая кнопка ${bt.cls} ${bt.w}x${bt.h}`); need(bt.l >= -1 && bt.r <= w + 1, `кнопка/поле за краем: ${bt.cls} ${bt.l}..${bt.r}`)
            if (bt.tag === 'INPUT' || bt.tag === 'TEXTAREA') need(bt.fs >= 16, `шрифт поля ${bt.fs}px < 16 (iOS приблизит страницу)`) }
          if (isNy) {
            need(m.themeCls === 'theme-ny_book', 'нет класса темы: ' + m.themeCls)
            if (sc.kind === 'calm' || sc.kind === 'input' || sc.kind === 'register') need(m.hasDecor === (sc.kind === 'calm'), `декор: ${m.hasDecor} (ожидалось ${sc.kind === 'calm'}); ${JSON.stringify(m.decor)}`)
            if (m.hdr) { need(m.hdr.plate && m.hdr.plate.h <= 48.5 && m.hdr.h - m.hdr.st <= 72, `шапка ${m.hdr.h} (safe ${m.hdr.st})`); need(m.hdr.plateOverRound <= 0.5, `плашка заходит на закладку на ${m.hdr.plateOverRound}`); need(/Cormorant|EB Garamond/.test(m.hdr.font) || /EB Garamond/.test(m.hdr.font), 'шрифт шапки ' + m.hdr.font) }
            if (sc.kind === 'calm') { need(m.lastBottom <= m.hillTop + 1 || !m.lastBottom, `текст заходит на сугроб: ${m.lastBottom} > ${m.hillTop}`) }
            for (const t of m.txt) { if (t.dis) continue; const worst = t.bg ? t.bg : [219, 200, 162]; const colB = t.col.map((v, i) => v * t.op + worst[i] * (1 - t.op)); const rt = ratio(colB, worst); const large = t.fs >= 24 || (t.fs >= 18.66 && +t.fw >= 700); need(rt >= (large ? 3 : 4.5), `контраст ${t.s}: ${rt.toFixed(2)} (${t.fs}px)`) }
          }
        }
        if (m.hdr) m.hdr.contentH = undefined
        rows.push({ dev: dn, sim, sc: sc.id, errs, m })
        if (errs.length) { bad++; console.log(`✗ ${dn}${sim ? ' safe' : ''} ${sc.id}: ${errs.join(' | ')}`) }
        // клавиатура: окно ниже на 320 px
        if (MATRIX && sc.kb && !sim && THEME === 'ny_book') {
          const inp = await p.$('.pl-root input:not([type=hidden]), .pl-root textarea, .pl-blitz input, .pl-register input')
          if (inp) { await p.setViewportSize({ width: w, height: h - 320 }); await inp.focus(); await inp.scrollIntoViewIfNeeded(); await p.waitForTimeout(150)
            const k = await p.evaluate(() => { const btn = [...document.querySelectorAll('.pl-send, .pl-bz-send, .pl-register > button:not(.pl-pick)')].find(e => e.getBoundingClientRect().width); btn?.scrollIntoView({ block: 'nearest' }); const bb2 = btn?.getBoundingClientRect(); const a = document.activeElement.getBoundingClientRect(); return { inT: a.top, inB: a.bottom, vh: innerHeight, btnT: bb2?.top, btnB: bb2?.bottom } })
            const okk = k.inT >= -1 && k.inB <= k.vh + 1 && (!k.btnB || (k.btnT >= -1 && k.btnB <= k.vh + 1))   // и поле, и кнопка одновременно в окне над клавиатурой (допуск 1 px — округление прокрутки)
            if (!okk) { bad++; console.log(`✗ ${dn} ${sc.id} клавиатура: ${JSON.stringify(k)}`) } rows.push({ dev: dn, sc: sc.id + '+kb', errs: okk ? [] : ['клавиатура'], m: k })
            await p.setViewportSize({ width: w, height: h }) }
        }
        if (SHOTS && !MATRIX) { await p.screenshot({ path: path.join(SHOTS, `${TAG}-${THEME === 'ny_book' ? '' : THEME + '-'}${sc.id}.jpg`), type: 'jpeg', quality: 72, fullPage: false }) }
      }
      await ctx.close()
    }
  }
  await b.close()
  fs.writeFileSync(path.join(SHOTS || process.env.QP_BOOK_SCRATCH || '.', `player-${TAG}-${THEME}${MATRIX ? '-matrix' : ''}.json`), JSON.stringify(rows, null, 1))
  console.log(`\n${rows.length} замеров, провалов: ${bad}`)
  process.exit(bad ? 1 : 0)
})().catch(e => { console.error(e); process.exit(2) })
