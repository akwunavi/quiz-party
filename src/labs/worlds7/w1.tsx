// ═══ WORLD 01 · «Обсерватория невозможного» ═══
// Мраморная обсерватория на краю космоса. Посреди зала — орерий размером с
// галактику: кольца орбит, по которым ходят команды-планеты. Закон: всё
// движется по орбитам и подчиняется выравниванию светил — верный ответ
// выходит в сизигию, остальные уходят в тень.
import { useMemo } from 'react'
import { rng } from '../../lib/anagram'
import { Qr } from '../magic2/common'
import { GAME, ROUND, QUESTION, PICKS, RIGHT, ANSWERED, TEAMS, JOINING, JP, MELODY, team, tileState, trackState, MEL_C, MEL_R, css, type ViewProps, type TimerProps, type World } from './content'

const CX = 960, CY = 640
function Sky() {
  const st = useMemo(() => { const r = rng(101); return Array.from({ length: 420 }, () => ({ x: r() * 1920, y: r() * 1080, s: r() < .06 ? 2.2 : r() < .3 ? 1.3 : .7, o: .3 + r() * .7, t: r() < .05 })) }, [])
  return (
    <svg className="o-sky" viewBox="0 0 1920 1080" aria-hidden>
      <defs>
        <radialGradient id="o-neb1" cx=".72" cy=".25" r=".55"><stop offset="0" stopColor="#ff9ec2" stopOpacity=".42" /><stop offset=".45" stopColor="#7b3fd0" stopOpacity=".28" /><stop offset="1" stopColor="#120d3a" stopOpacity="0" /></radialGradient>
        <radialGradient id="o-neb2" cx=".18" cy=".7" r=".5"><stop offset="0" stopColor="#5ee1ff" stopOpacity=".28" /><stop offset=".6" stopColor="#2a3fb0" stopOpacity=".18" /><stop offset="1" stopColor="#0b1240" stopOpacity="0" /></radialGradient>
        <linearGradient id="o-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#070b2e" /><stop offset=".6" stopColor="#14104a" /><stop offset="1" stopColor="#2a1450" /></linearGradient>
      </defs>
      <rect width="1920" height="1080" fill="url(#o-bg)" />
      <rect width="1920" height="1080" fill="url(#o-neb1)" /><rect width="1920" height="1080" fill="url(#o-neb2)" />
      {st.map((s, i) => <circle key={i} cx={s.x} cy={s.y} r={s.s} opacity={s.o} className={s.t ? 'tw' : ''} style={css({ '--d': `${(i % 7) * .7}s` })} />)}
    </svg>
  )
}
/** Мраморные арки обсерватории по краям — масштаб «мы в зале размером с небо». */
function Arches() {
  return (
    <svg className="o-arch" viewBox="0 0 1920 1080" aria-hidden>
      <defs><linearGradient id="o-marble" x1="0" x2="1"><stop offset="0" stopColor="#f3eefb" /><stop offset=".5" stopColor="#cfc6e6" /><stop offset="1" stopColor="#8f84b8" /></linearGradient></defs>
      <path d="M 0 1080 L 0 0 L 120 0 L 120 60 Q 120 30 90 30 L 60 30 L 60 1080 Z" fill="url(#o-marble)" opacity=".9" />
      <path d="M 1920 1080 L 1920 0 L 1800 0 L 1800 60 Q 1800 30 1830 30 L 1860 30 L 1860 1080 Z" fill="url(#o-marble)" opacity=".9" />
      <path d="M 0 0 L 1920 0 L 1920 26 Q 960 120 0 26 Z" fill="#e9e3f6" opacity=".85" />
      <path d="M 0 26 Q 960 120 1920 26" fill="none" stroke="#ffd27a" strokeWidth="2" opacity=".7" />
      <path d="M 0 1080 L 0 1010 Q 960 930 1920 1010 L 1920 1080 Z" fill="#e9e3f6" opacity=".9" />
      <path d="M 0 1010 Q 960 930 1920 1010" fill="none" stroke="#ffd27a" strokeWidth="2" opacity=".8" />
    </svg>
  )
}
const RINGS = [{ rx: 430, ry: 120 }, { rx: 640, ry: 182 }, { rx: 850, ry: 245 }]
const at = (ring: number, deg: number) => { const a = (deg * Math.PI) / 180; return { x: CX + Math.cos(a) * RINGS[ring].rx, y: CY + Math.sin(a) * RINGS[ring].ry } }
function Orrery({ dim = false, tilt = '' }: { dim?: boolean; tilt?: string }) {
  return (
    <svg className={`o-orrery ${dim ? 'dim' : ''} ${tilt}`} viewBox="0 0 1920 1080" aria-hidden>
      {RINGS.map((r, i) => <g key={i}><ellipse cx={CX} cy={CY} rx={r.rx} ry={r.ry} className="ring" /><ellipse cx={CX} cy={CY} rx={r.rx} ry={r.ry} className="ring-ticks" /></g>)}
      <circle cx={CX} cy={CY} r="26" className="core" /><circle cx={CX} cy={CY} r="60" className="core-halo" />
    </svg>
  )
}

// ── таймер: солнечная арка. Солнце идёт по дуге и гасит звёзды-деления; на 10 с — красный гигант; на нуле заходит за горизонт ──
function Timer({ left, total, phase, big }: TimerProps) {
  const N = 30, p = Math.max(0, Math.min(1, 1 - left / total))
  const pt = (t: number, r = 150) => { const a = Math.PI + t * Math.PI; return { x: 180 + Math.cos(a) * r, y: 175 + Math.sin(a) * r } }
  const s = pt(p)
  return (
    <div className={`o-timer ph-${phase}${big ? ' big' : ''}`}>
      <svg viewBox="0 0 360 200">
        <path d="M 30 175 A 150 150 0 0 1 330 175" className="arc" />
        {Array.from({ length: N + 1 }, (_, i) => { const q = pt(i / N, 150); return <circle key={i} cx={q.x} cy={q.y} r={i % 5 ? 3 : 5} className={`tk${i / N < p ? ' out' : ''}`} /> })}
        <line x1="10" y1="175" x2="350" y2="175" className="hz" />
        <g className="sun" style={css({ transform: `translate(${s.x}px, ${s.y}px)` })}><circle r="22" className="corona" /><circle r="13" className="disc" /></g>
      </svg>
      <b>{left}</b>
      <span className="cap">{phase === 'zero' ? 'солнце зашло' : 'секунд'}</span>
    </div>
  )
}

function Head() {
  return <div className="o-head"><span>Раунд {ROUND.n} · {ROUND.name}</span><span>вопрос <b>{ROUND.q}</b> из {ROUND.of}</span></div>
}

// ── лобби ──
function Lobby0() {
  const slots = Array.from({ length: 12 }, (_, i) => at(i % 3, -100 + i * 31 + (i % 3) * 7))
  return (
    <div className="o-lobby o-l0">
      <Orrery />
      <svg className="o-slots" viewBox="0 0 1920 1080" aria-hidden>{slots.map((s, i) => <circle key={i} cx={s.x} cy={s.y} r="14" style={css({ '--i': i })} />)}</svg>
      <h1 className="o-title"><span>{GAME.title}</span></h1>
      <p className="o-sub">Небо ждёт первые команды</p>
      <figure className="o-scope"><div className="o-lens"><Qr size={250} ink="#0b1240" /></div><figcaption>комната {GAME.room}</figcaption></figure>
      <ol className="o-steps">{GAME.steps.map((s, i) => <li key={i}><i>{['I', 'II', 'III'][i]}</i>{s}</li>)}</ol>
      <div className="o-count"><b>0</b> команд на орбите</div>
      <div className="o-comet" />
    </div>
  )
}
const SPOTS: [number, number][] = [[0, -150], [0, -30], [0, 30], [0, 150], [1, -110], [1, -60], [1, 60], [1, 110], [2, -150], [2, 30], [2, 85], [2, -30]]
const LOBBY_POS = SPOTS.map(([r, a]) => at(r, a))
function Lobby12({ sub }: { sub: string }) {
  const joined = sub === 'join'
  const n = TEAMS.filter(t => t.alive && (t.id !== JOINING || joined)).length
  return (
    <div className={`o-lobby o-l12 s-${sub}`}>
      <Orrery />
      <h1 className="o-title small"><span>{GAME.title}</span></h1>
      <figure className="o-scope small tl"><div className="o-lens"><Qr size={200} ink="#0b1240" /></div><figcaption>комната {GAME.room}</figcaption></figure>
      <div className="o-count right"><b>{n}</b> команд на орбите</div>
      {TEAMS.map((t, i) => {
        const p = LOBBY_POS[i], late = t.id === JOINING
        if (late && !joined) return null
        return <div key={t.id} className={`o-planet${t.alive ? '' : ' off'}${late ? ' late' : ''}`} style={css({ left: p.x, top: p.y, '--h': t.hue, '--sz': `${18 + (i % 4) * 5}px` })}>
          <i /><span>{t.name}{!t.alive && <em>сигнал потерян</em>}</span>
        </div>
      })}
      {joined && <svg className="o-capture" viewBox="0 0 1920 1080" aria-hidden><path d={`M 1900 -40 C 1700 200 1600 500 ${LOBBY_POS[11].x} ${LOBBY_POS[11].y}`} /></svg>}
    </div>
  )
}

// ── вопрос: варианты — планеты на кольце; ответ — сизигия ──
const OE = { cx: 960, cy: 640, rx: 640, ry: 180 }
const oat = (deg: number) => { const a = (deg * Math.PI) / 180; return { x: OE.cx + Math.cos(a) * OE.rx, y: OE.cy + Math.sin(a) * OE.ry } }
const OPT_POS = [oat(162), oat(18), oat(118), oat(62)].sort((a, b) => a.x - b.x)
function Question({ left, phase, reveal }: { left: number; phase: ViewProps['phase']; reveal?: 'before' | 'reveal' }) {
  const ans = reveal === 'reveal'
  return (
    <div className={`o-q ph-${phase}${reveal ? ` ans a-${reveal}` : ''}`}>
      <Orrery tilt="tilt" />
      <Head />
      {!reveal && <div className="o-tslot"><Timer left={left} total={QUESTION.total} phase={phase} /></div>}
      <p className="o-qtext">{QUESTION.text}</p>
      {QUESTION.options.map((o, i) => {
        const ok = o.key === QUESTION.correct
        return <div key={o.key} className={`o-opt${ans ? (ok ? ' ok' : ' no') : ''}`} style={css({ left: OPT_POS[i].x, top: OPT_POS[i].y, '--i': i })}>
          <i className="pl"><b>{o.key}</b></i><span>{o.text}</span>{reveal && <em>{Object.values(PICKS).filter(v => v === o.key).length}</em>}
        </div>
      })}
      {reveal && <div className={`o-verdict${ans ? ' on' : ''}`}>
        <span className="k">Верно · {QUESTION.fact}</span>
        <div className="names">Угадали {RIGHT.length} из {ANSWERED}: {RIGHT.map(t => <span key={t.id} style={css({ '--h': t.hue })}><i />{t.name}</span>)}</div>
      </div>}
    </div>
  )
}

// ── «Своя игра»: пять меридианов-тем, на каждом — планеты растущей массы ──
const JX = (c: number) => 330 + c * 315, JY = (r: number) => 300 + r * 140
function Jeopardy({ sub }: { sub: string }) {
  const oc = JP.open.theme, or = JP.open.tile
  return (
    <div className={`o-jp s-${sub}`} style={css({ '--ox': `${JX(oc)}px`, '--oy': `${JY(or)}px` })}>
      <div className="o-jp-title">Своя игра</div>
      {JP.themes.map((t, c) => (
        <div key={t.name} className={`o-mer${c === oc && sub !== 'board' ? ' hot' : ''}`} style={css({ left: JX(c) })}>
          <div className="o-mer-name"><b>{t.name}</b>{t.hint && <i>{t.hint}</i>}</div><span className="o-mer-line" />
        </div>
      ))}
      {JP.themes.map((_, c) => JP.values.map((v, r) => {
        const s = tileState(c, r, sub)
        return <div key={`${c}-${r}`} className={`o-tile ${s}`} style={css({ left: JX(c), top: JY(r), '--r': r, '--h': [205, 280, 330, 20, 170][c] })}>
          <i className="globe" /><b>{s === 'played' ? '' : v}</b>{s === 'sel' && <span className="reticle" />}
        </div>
      }))}
      <div className="o-jp-lens">
        <div className="o-jp-in">
          <span className="o-jp-th">{JP.themes[oc].name} · {JP.values[or]}</span>
          <b className="o-jp-cd">18</b><span className="o-jp-cap">секунд · звучит фрагмент</span>
          <span className="o-jp-ans">Ответили: {JP.answers.length}</span>
          <ul>{JP.answers.map(a => <li key={a.team} style={css({ '--h': team(a.team).hue })}><i />{team(a.team).name}</li>)}</ul>
        </div>
      </div>
    </div>
  )
}

// ── «Угадай мелодию»: музыка сфер — темы = кольца вокруг солнца, треки = планеты ──
const MR = [150, 245, 340, 435]
const mpos = (c: number, r: number) => { const a = ((-90 + r * 90 + c * 22) * Math.PI) / 180; return { x: 700 + Math.cos(a) * MR[c] * 1.25, y: 560 + Math.sin(a) * MR[c] * .92 } }
function Melody({ sub, left, phase }: { sub: string; left: number; phase: ViewProps['phase'] }) {
  const p = mpos(MEL_C, MEL_R)
  return (
    <div className={`o-mel s-${sub}`} style={css({ '--px': `${p.x}px`, '--py': `${p.y}px` })}>
      <div className="o-jp-title left">Угадай мелодию</div>
      <svg className="o-mel-rings" viewBox="0 0 1920 1080" aria-hidden>
        {MR.map((r, c) => <ellipse key={c} cx="700" cy="560" rx={r * 1.25} ry={r * .92} className={c === MEL_C && sub !== 'board' ? 'hot' : ''} />)}
        <circle cx="700" cy="560" r="44" className="sun" />
        {sub !== 'board' && <circle cx="700" cy="560" r="60" className="wave" />}
      </svg>
            {MELODY.themes.map((_, c) => Array.from({ length: MELODY.tracks }, (_, r) => {
        const q = mpos(c, r), s = trackState(c, r, sub)
        return <div key={`${c}-${r}`} className={`o-trk ${s}`} style={css({ left: q.x, top: q.y, '--h': [40, 200, 330, 150][c] })}><i /><b>{r + 1}</b></div>
      }))}
      <aside className="o-mel-side">
        <ul className="o-legend">{MELODY.themes.map((t, c) => <li key={t} className={c === MEL_C && sub !== 'board' ? 'hot' : ''} style={css({ '--h': [40, 200, 330, 150][c] })}><i />{t}<em>{['ближняя', 'вторая', 'третья', 'дальняя'][c]} орбита</em></li>)}</ul>
        {sub !== 'board' && <span className="k">{MELODY.themes[MEL_C]} · трек {MEL_R + 1}</span>}
        {sub === 'active' ? <>
          <div className="o-mel-t"><Timer left={left} total={30} phase={phase} /></div>
          <h3>Ставки команд</h3>
          <ol>{MELODY.bids.map((b, i) => <li key={b.team} className={i === 0 ? 'lead' : ''} style={css({ '--h': team(b.team).hue })}><i /><span>{team(b.team).name}</span><b>{b.sec} с</b></li>)}</ol>
          <p className="o-note">Играет «{team(MELODY.bids[0].team).name}» · 2–5 с → 2 балла</p>
        </> : <p className="o-note">{sub === 'board' ? 'Рулетка выбирает трек…' : 'Слушаем 1 секунду…'}</p>}
      </aside>
    </div>
  )
}

function TimerSheet({ sub, left }: { sub: string; left: number }) {
  if (sub === 'live') return <div className="o-tsheet live"><Timer left={left} total={30} phase={left <= 0 ? 'zero' : left <= 10 ? 'warning' : 'normal'} big /></div>
  return <div className="o-tsheet">{([[24, 'normal'], [7, 'warning'], [0, 'zero']] as const).map(([l, ph]) => <div key={ph}><Timer left={l} total={30} phase={ph} big /><span>{ph === 'normal' ? 'обычный отсчёт' : ph === 'warning' ? 'последние 10 секунд' : 'ноль'}</span></div>)}</div>
}

function View({ scene, sub, left, phase }: ViewProps) {
  let body: JSX.Element
  switch (scene) {
    case 'lobby0': body = <Lobby0 />; break
    case 'lobby12': body = <Lobby12 sub={sub} />; break
    case 'qn': case 'qw': body = <Question left={left} phase={phase} />; break
    case 'answer': body = <Question left={0} phase="zero" reveal={sub as 'before' | 'reveal'} />; break
    case 'jp': body = <Jeopardy sub={sub} />; break
    case 'melody': body = <Melody sub={sub} left={left} phase={phase} />; break
    default: body = <TimerSheet sub={sub} left={left} />
  }
  return <div className={`o-root sc-${scene} ph-${phase}`}><Sky /><Arches />{body}</div>
}

export const w1: World = {
  View, Timer,
  meta: {
    num: 1, name: 'Обсерватория невозможного',
    idea: 'Мраморный зал на краю космоса, где орерий размером с галактику, а команды — планеты на его орбитах.',
    place: 'Белый мрамор арок по краям кадра, за ними — ультрамариновое небо с розовой и бирюзовой туманностями. В центре — гигантский орерий: три наклонных кольца орбит вокруг ядра.',
    laws: 'Всё подчиняется орбитам и выравниванию светил. Новая команда — звезда, которую притягивает и захватывает орбита. Верный ответ выходит в сизигию: его планета зажигается, остальные уходят в тень затмения. Выбранная плитка «Своей игры» падает к зрителю и становится линзой телескопа.',
    materials: 'Ультрамарин и фиолет космоса, розово-бирюзовые туманности, белый мрамор, золото только на линиях орбит и меток. Свет — звёздный, холодный, с тёплыми акцентами планет.',
    timer: 'Солнечная арка: солнце идёт по полукругу над горизонтом и гасит звёзды-деления, число — крупно под аркой. 10 с — солнце раздувается в красного гиганта. Ноль — солнце заходит за горизонт.',
    jp: 'Пять меридианов-тем, на каждом пять планет растущей массы: 100 — луна, 500 — газовый гигант. Сыгранные — тёмные выгоревшие планеты без цифры. Выбор — меридиан вспыхивает, на планете защёлкивается прицел. Вопрос — планета летит к зрителю и раскрывается круглой линзой, доска остаётся вокруг.',
    melody: 'Музыка сфер: четыре темы — четыре орбиты вокруг солнца, треки — планеты на них. Выбор — от солнца к планете бежит резонансная волна. Трек играет — справа звёздная карта со ставками и таймер-арка.',
    teams: 'Команда — планета своего цвета на одной из трёх орбит, подпись — светлым под ней. Потерявшая связь — серая. Новая команда влетает звездой по дуге и садится на орбиту.',
    type: 'Cormorant SC (заголовки, капитель), Forum (текст) — классика астрономических атласов.',
  },
}
