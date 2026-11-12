// ═══ Book Design Review — клиент просмотра (живой стенд И статическая версия из готовых кадров) ═══
// Живой режим: проектор — настоящий HostScreen в iframe, состояние игры пишет стенд. Статический (window.REVIEW_STATIC = {scenes, frames}):
// те же навигация/разрешения/варианты на картинках shots/proto, без сервера и без анимаций.
'use strict'
const ST = window.REVIEW_STATIC || null
const RES = { '1920': [1920, 1080], '1899': [1899, 905], '1366': [1366, 768], '1280': [1280, 720] }
const TEAM_COUNTS = [0, 4, 8, 10, 16, 24]
const $ = s => document.querySelector(s)
const el = (t, p = {}, ...k) => { const e = Object.assign(document.createElement(t), p); k.flat().forEach(c => e.append(c)); return e }
const q = new URLSearchParams(location.search)
const S = { scenes: [], id: q.get('scene'), res: RES[q.get('res')] ? q.get('res') : '1920', teams: q.get('teams'), fin: q.get('fin') || '1', team: q.get('team') || '1', ba: q.get('ba') || 'a', split: q.get('split') === '1' }

// варианты: fin — финал (?bkfin), team — плитки команд (?bkteam)
const baseId = id => id.replace(/-v[23]$/, '').replace(/^17-team-t[123]-/, '17-team-t1-')
// варианты по видам: ключ состояния, значения, подписи, заголовок группы кнопок
const KINDS = {
  fin: { key: 'fin', vs: ['1', '2', '3'], lab: ['V1', 'V2', 'V3'], title: 'Финал' },
  team: { key: 'team', vs: ['1', '2', '3'], lab: ['T1', 'T2', 'T3'], title: 'Плитки команд' },
  ba: { key: 'ba', vs: ['b', 'a'], lab: ['До', 'После'], title: 'Адаптивность' },
}
function kindOf(id) {
  if (ST && /^20-ad-/.test(id)) return 'ba'
  if (/^15-finale-/.test(id)) return 'fin'
  if (/^17-team-/.test(id) || (!ST && /^01-lobby-/.test(id))) return 'team'
  return null
}
function staticVariantId(id, kind, v) {
  if (kind === 'ba') return `${v}:${id}`
  if (kind === 'fin') { const b = id.replace(/-v[23]$/, ''); return v === '1' ? b : `${b}-v${v}` }
  if (kind === 'team' && /^17-team-/.test(id)) return id.replace(/^17-team-t[123]-/, `17-team-t${v}-`)
  return id
}
const isNav = s => !/-v[23]$/.test(s.id) && !/^17-team-t[23]-/.test(s.id)
const cur = () => S.scenes.find(s => s.id === S.id)
const GROUPS = ['Лобби', 'Правила', 'Вопросы', 'Ожидание', 'Раскрытие', 'Мелодия', 'Финал', 'Плитки команд', 'Типографика', 'Адаптивность: до/после', 'Прочее']
const gi = g => { const i = GROUPS.indexOf(g); return i < 0 ? GROUPS.length : i }
const navList = () => S.scenes.filter(isNav).map((s, i) => [s, i]).sort((a, b) => gi(a[0].group) - gi(b[0].group) || a[1] - b[1]).map(x => x[0])

function url() {
  const p = new URLSearchParams()
  p.set('scene', S.id); p.set('res', S.res)
  if (S.teams != null && S.teams !== '') p.set('teams', S.teams)
  if (S.fin !== '1') p.set('fin', S.fin); if (S.team !== '1') p.set('team', S.team); if (S.ba !== 'a') p.set('ba', S.ba); if (S.split) p.set('split', '1')
  return location.pathname + '?' + p
}
const sync = () => history.replaceState(null, '', url())
function flash(t) { const m = $('#msg'); m.textContent = t; m.style.display = 'block'; clearTimeout(flash.t); flash.t = setTimeout(() => { m.style.display = 'none' }, 2500) }

async function api(path, body) {
  const r = await fetch('/review-api/' + path, body ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : undefined)
  const j = await r.json(); if (!r.ok) throw new Error(j.error || r.status); return j
}

function side() {
  const nav = $('#side'); nav.textContent = ''
  nav.append(el('h1', { textContent: ST ? 'Book Design Review · кадры' : 'Book Design Review' }))
  let g = null
  for (const s of navList()) {
    if (s.group !== g) { g = s.group; nav.append(el('h2', { textContent: g })) }
    nav.append(el('a', { textContent: s.title, className: s.id === S.id ? 'on' : '', onclick: () => go(s.id) }))
  }
}

function bar() {
  const b = $('#bar'); b.textContent = ''; const s = cur(); if (!s) return
  const grp = (label, ...k) => el('div', { className: 'grp' }, el('span', { textContent: label }), ...k)
  b.append(grp('Экран', ...Object.entries(RES).map(([k, [w, h]]) => el('button', { textContent: `${w}×${h}`, className: S.res === k ? 'on' : '', onclick: () => { S.res = k; render() } }))))
  if (!ST) {
    b.append(grp('Команд', ...TEAM_COUNTS.map(n => el('button', { textContent: n, disabled: !s.teams, className: S.teams === String(n) ? 'on' : '', onclick: () => { S.teams = String(n); load(true) } }))))
  }
  const kind = kindOf(s.id)
  if (kind) {
    const K = KINDS[kind]
    const avail = v => ST ? !!ST.frames[staticVariantId(s.id, kind, v)] : true
    b.append(grp(K.title, ...K.vs.map((v, i) => el('button', { textContent: K.lab[i], disabled: !avail(v), className: !S.split && S[K.key] === v ? 'on' : '', onclick: () => { S[K.key] = v; S.split = false; render() } })),
      el('button', { textContent: kind === 'ba' ? 'Рядом: до | после' : 'Рядом ×3', className: S.split ? 'on' : '', onclick: () => { S.split = !S.split; render() } })))
  }
  if (!ST && s.steps.length) b.append(grp('Шаги', ...s.steps.map(st => el('button', { textContent: st.label, onclick: () => step(st.id) }))))
  b.append(grp('', ...(!ST ? [el('button', { textContent: '↻ Повторить / начать заново', onclick: () => load(true) })] : []),
    el('button', { textContent: '⛶ Во весь экран (F)', onclick: fullscreen }), el('button', { textContent: '🔗 Ссылка', onclick: copyLink })))
  b.append(el('div', { id: 'help', textContent: '←/→ — сцены · F — полный экран · 1/2/3 — варианты · S — рядом' }))
}

function frameKey(s, kind, v) { return ST ? staticVariantId(s.id, kind, v) : s.id }
function stageRender() {
  const st = $('#stage'); [...st.children].forEach(c => { if (c.id !== 'msg') c.remove() })
  const s = cur(); if (!s) return
  $('#title').textContent = s.title + (s.query ? '' : '')
  const [W, H] = RES[S.res]; const kind = kindOf(s.id)
  const vs = S.split && kind ? KINDS[kind].vs : [kind ? S[KINDS[kind].key] : null]
  const n = vs.length, gap = 12, pad = 16
  const k = Math.min((st.clientWidth - pad - gap * (n - 1)) / (W * n), (st.clientHeight - pad - 26) / H)
  for (const v of vs) {
    const box = el('div', { className: 'box' }); box.style.width = W * k + 'px'; box.style.height = H * k + 'px'
    if (ST) {
      const src = ST.frames[frameKey(s, kind, v)]?.[S.res]
      if (src) { const im = el('img', { src }); im.style.width = W * k + 'px'; im.style.height = H * k + 'px'; box.append(im) }
      else box.append(el('div', { textContent: 'Для этого варианта кадра нет', style: 'color:#a58f6a;padding:20px' }))
    } else {
      const f = el('iframe', { allow: 'autoplay' }); f.style.width = W + 'px'; f.style.height = H + 'px'; f.style.transform = `scale(${k})`
      let u
      if (s.path) u = s.path
      else {
        const extra = kind === 'fin' ? `&bkfin=${v}` : kind === 'team' ? `&bkteam=${v}` : ''
        u = `/quiz-party/#/?room=stand${extra}${s.query ? '&' + s.query.replace(/bk(fin|team)=\d/, '') : ''}`
      }
      f.src = u; f.addEventListener('load', () => { try { f.contentWindow.addEventListener('keydown', onKey) } catch { /* другой источник */ } })
      box.append(f)
    }
    const fr = el('div', { className: 'frame' }, kind && n > 1 ? el('div', { className: 'cap', textContent: KINDS[kind].lab[KINDS[kind].vs.indexOf(v)] }) : '', box)
    st.insertBefore(fr, $('#msg'))
  }
}

async function load(force) {
  const s = cur(); if (!s) return
  if (!ST && !s.path) {
    try { flash('Готовлю сцену…'); await api('scene', { id: s.id, teams: s.teams && S.teams != null && S.teams !== '' ? S.teams : null }); flash('Сцена готова') }
    catch (e) { flash('Ошибка: ' + e.message); return }
  }
  stageRender()
}
async function step(id) { try { await api('step', { id: S.id, step: id }); flash('Шаг выполнен — проектор подхватит за ~2 с') } catch (e) { flash('Ошибка: ' + e.message) } }
function render() { side(); bar(); sync(); stageRender() }
function go(id) { S.id = id; S.teams = q.get('teams') && id === q.get('scene') ? q.get('teams') : null; render(); load() }
function fullscreen() { const d = document.documentElement; if (document.fullscreenElement) document.exitFullscreen(); else d.requestFullscreen?.() }
function copyLink() { const u = location.origin + url(); navigator.clipboard?.writeText(u).then(() => flash('Ссылка скопирована'), () => prompt('Ссылка', u)) }
document.addEventListener('fullscreenchange', () => { document.body.classList.toggle('fs-mode', !!document.fullscreenElement); setTimeout(stageRender, 60) })
function onKey(e) {
  if (e.target && /input|textarea/i.test(e.target.tagName)) return
  const l = navList(), i = l.findIndex(s => s.id === S.id)
  if (e.key === 'ArrowRight' && i < l.length - 1) go(l[i + 1].id)
  else if (e.key === 'ArrowLeft' && i > 0) go(l[i - 1].id)
  else if (e.key === 'f' || e.key === 'F' || e.key === 'а' || e.key === 'А') fullscreen()
  else if (/^[123]$/.test(e.key)) { const kind = kindOf(S.id); if (kind && kind !== 'ba') { S[KINDS[kind].key] = e.key; S.split = false; render() } else if (kind === 'ba') { S.ba = e.key === '1' ? 'b' : 'a'; S.split = false; render() } }
  else if (e.key === 's' || e.key === 'S' || e.key === 'ы' || e.key === 'Ы') { if (kindOf(S.id)) { S.split = !S.split; render() } }
}
document.addEventListener('keydown', onKey)
window.addEventListener('resize', () => stageRender())

;(async () => {
  S.scenes = ST ? ST.scenes : await api('scenes')
  if (!S.scenes.some(s => s.id === S.id)) S.id = navList()[0].id
  // ссылка на вариант (?scene=15-finale-8-v2) → показываем базовую сцену с нужным вариантом
  const m = /-v([23])$/.exec(S.id); if (m) { S.fin = m[1]; S.id = S.id.replace(/-v[23]$/, '') }
  const t = /^17-team-t([23])-/.exec(S.id); if (t) { S.team = t[1]; S.id = baseId(S.id) }
  render(); load()
})()
