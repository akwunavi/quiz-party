// ═══ WORLD 03 · «Сердце зачарованного леса» ═══
// Ночная поляна у древнего дерева. Корни, мох, светящиеся грибы и цветы,
// под землёй — сеть грибницы. Закон: лес отвечает живым. Свет бежит по
// корням к тому, что важно; верное распускается, неверное закрывается.
import { Fragment, useMemo } from 'react'
import { rng } from '../../lib/anagram'
import { Qr } from '../magic2/common'
import { GAME, ROUND, QUESTION, PICKS, RIGHT, ANSWERED, TEAMS, JOINING, JP, MELODY, team, tileState, trackState, MEL_C, MEL_R, css, type ViewProps, type TimerProps, type World } from './content'

function Grove() {
  const f = useMemo(() => { const r = rng(303); return Array.from({ length: 34 }, () => ({ x: 300 + r() * 1580, y: 120 + r() * 760, t: r() * 10, d: 6 + r() * 6 })) }, [])
  const trunks = useMemo(() => { const r = rng(31); return Array.from({ length: 9 }, (_, i) => ({ x: 420 + i * 180 + r() * 60, w: 26 + r() * 40, o: .25 + r() * .25 })) }, [])
  return (
    <>
      <svg className="f-bg" viewBox="0 0 1920 1080" aria-hidden>
        <defs>
          <radialGradient id="f-glow" cx=".55" cy=".55" r=".6"><stop offset="0" stopColor="#1d5a52" /><stop offset=".55" stopColor="#0b2a26" /><stop offset="1" stopColor="#03100d" /></radialGradient>
          <linearGradient id="f-bark" x1="0" x2="1"><stop offset="0" stopColor="#120c08" /><stop offset=".5" stopColor="#3a2a1f" /><stop offset="1" stopColor="#1a120c" /></linearGradient>
          <linearGradient id="f-mist" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6ff2d6" stopOpacity="0" /><stop offset="1" stopColor="#6ff2d6" stopOpacity=".18" /></linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#f-glow)" />
        {trunks.map((t, i) => <rect key={i} x={t.x} y="0" width={t.w} height="1080" fill="#0a1d1a" opacity={t.o} />)}
        <rect y="700" width="1920" height="380" fill="url(#f-mist)" />
        {/* корни по низу */}
        <path d="M 0 1080 L 0 960 C 300 930 500 1010 760 980 C 1000 950 1200 1010 1500 980 C 1700 960 1820 990 1920 970 L 1920 1080 Z" fill="#06120e" />
        <g fill="none" stroke="#1e3b2a" strokeWidth="18" strokeLinecap="round">
          <path d="M 300 980 C 500 1000 640 940 900 1010" /><path d="M 320 940 C 520 900 760 960 1100 930 C 1300 915 1500 960 1700 940" strokeWidth="12" />
        </g>
        {/* древнее дерево слева */}
        <path d="M 0 1080 L 0 0 L 360 0 C 330 140 300 260 320 420 C 340 600 300 760 380 900 C 420 980 520 1020 560 1080 Z" fill="url(#f-bark)" />
        <path d="M 120 0 C 140 200 100 400 160 620 C 200 760 160 900 220 1080" fill="none" stroke="#5a4232" strokeWidth="4" opacity=".5" />
        <path d="M 250 60 C 240 250 280 380 250 560" fill="none" stroke="#5a4232" strokeWidth="3" opacity=".4" />
        {/* крона по верху */}
        <path d="M 300 0 L 1920 0 L 1920 90 C 1760 140 1620 70 1480 120 C 1320 170 1180 90 1000 130 C 820 170 660 100 520 140 C 420 170 360 120 300 150 Z" fill="#071a14" />
        <g fill="none" stroke="#1a120c" strokeWidth="22" strokeLinecap="round"><path d="M 330 140 C 600 170 900 110 1300 150 C 1550 170 1750 120 1920 130" /></g>
        {/* мох и светящиеся грибы */}
        {[[420, 960, 1], [470, 975, .7], [1640, 965, 1.1], [1700, 975, .8], [1780, 960, .6], [760, 985, .6]].map(([x, y, s], i) => (
          <g key={i} transform={`translate(${x} ${y}) scale(${s})`} className="shroom"><rect x="-5" y="-40" width="10" height="40" fill="#bfeee3" opacity=".8" /><path d="M -34 -38 Q 0 -80 34 -38 Z" fill="#6ff2d6" /></g>
        ))}
      </svg>
      <div className="f-flies">{f.map((p, i) => <i key={i} style={css({ left: p.x, top: p.y, '--t': `${p.t}s`, '--d': `${p.d}s` })} />)}</div>
    </>
  )
}

// ── таймер: одуванчик-светляк. Каждую секунду улетает семечко; 10 с — оставшиеся тлеют янтарём, стебель клонится; ноль — голый стебель ──
function Timer({ left, total, phase, big }: TimerProps) {
  const N = 30, keep = Math.round((left / total) * N)
  return (
    <div className={`f-timer ph-${phase}${big ? ' big' : ''}`}>
      <svg viewBox="-120 -120 240 300">
        <path d="M 0 0 C 6 60 -10 110 4 170" className="stem" />
        {Array.from({ length: N }, (_, i) => {
          const a = (i / N) * Math.PI * 2, gone = i >= keep
          return <g key={i} className={`seed${gone ? ' gone' : ''}`} style={css({ '--a': `${(i / N) * 360}deg`, '--k': i })}>
            <line x1="0" y1="0" x2={Math.cos(a) * 84} y2={Math.sin(a) * 84} /><circle cx={Math.cos(a) * 88} cy={Math.sin(a) * 88} r="7" />
          </g>
        })}
        <circle r="16" className="head" />
      </svg>
      <b>{left}</b>
    </div>
  )
}

function Head() { return <div className="f-head"><span>Раунд {ROUND.n} · {ROUND.name}</span><span>вопрос {ROUND.q} из {ROUND.of}</span></div> }

function Lobby0() {
  return (
    <div className="f-lobby">
      <h1 className="f-title">{GAME.title}</h1>
      <p className="f-sub">лес проснулся и ждёт гостей</p>
      <figure className="f-slice"><div className="rings"><Qr size={270} ink="#0b1a14" /></div><figcaption>поляна {GAME.room}</figcaption></figure>
      <ol className="f-steps">{GAME.steps.map((s, i) => <li key={i} style={css({ '--i': i })}><i className="cap" />{s}</li>)}</ol>
      <div className="f-vines">{Array.from({ length: 12 }, (_, i) => <span key={i} className="bud" style={css({ '--i': i, '--l': `${90 + (i % 3) * 60}px` })} />)}</div>
    </div>
  )
}
function Lobby12({ sub }: { sub: string }) {
  const joined = sub === 'join'
  const n = TEAMS.filter(t => t.alive && (t.id !== JOINING || joined)).length
  return (
    <div className={`f-lobby l12 s-${sub}`}>
      <h1 className="f-title small">{GAME.title}</h1>
      <figure className="f-slice small"><div className="rings"><Qr size={180} ink="#0b1a14" /></div><figcaption>{GAME.room}</figcaption></figure>
      <div className="f-count"><b>{n}</b> огоньков на поляне</div>
      <div className="f-lanterns">
        {TEAMS.map((t, i) => {
          const late = t.id === JOINING
          return <div key={t.id} className={`f-lan${t.alive ? '' : ' off'}${late ? (joined ? ' late' : ' wait') : ''}`} style={css({ '--h': t.hue, '--l': `${20 + (i % 3) * 34}px`, '--i': i })}>
            <span className="vine" /><span className="bloom" /><b>{t.name}</b>{!t.alive && <em>огонёк погас</em>}
          </div>
        })}
      </div>
    </div>
  )
}

const FX = [520, 870, 1220, 1570]
function Question({ left, phase, reveal }: { left: number; phase: ViewProps['phase']; reveal?: string }) {
  const ans = reveal === 'reveal'
  const ci = QUESTION.options.findIndex(o => o.key === QUESTION.correct)
  return (
    <div className={`f-q ph-${phase}${reveal ? ` ans a-${reveal}` : ''}`}>
      <Head />
      {!reveal && <div className="f-tslot"><Timer left={left} total={QUESTION.total} phase={phase} /></div>}
      <p className="f-qtext">{QUESTION.text.split(' ').map((w, i) => <Fragment key={i}>{i > 0 && ' '}<span style={css({ '--i': i })}>{w}</span></Fragment>)}</p>
      {reveal && <svg className="f-myc" viewBox="0 0 1920 1080" aria-hidden>
        <path pathLength={1} className={ans ? 'on' : ''} d={`M 360 900 C 520 1000 ${FX[ci] - 300} 930 ${FX[ci]} 880`} />
        <path pathLength={1} className={ans ? 'on b' : ''} d={`M 330 760 C 600 860 ${FX[ci] - 200} 1020 ${FX[ci]} 880`} />
      </svg>}
      {QUESTION.options.map((o, i) => {
        const ok = o.key === QUESTION.correct
        return <div key={o.key} className={`f-opt${ans ? (ok ? ' ok' : ' no') : ''}`} style={css({ left: FX[i], '--i': i })}>
          <svg className="flower" viewBox="-60 -60 120 120" aria-hidden>{Array.from({ length: 7 }, (_, k) => <path key={k} style={css({ '--a': `${k * 51.4}deg` })} d="M 0 0 C 18 -14 16 -44 0 -56 C -16 -44 -18 -14 0 0 Z" />)}<circle r="14" /></svg>
          <b>{o.key}</b><span>{o.text}</span>{reveal && <em>{Object.values(PICKS).filter(v => v === o.key).length} ответ.</em>}
        </div>
      })}
      {reveal && <div className={`f-verdict${ans ? ' on' : ''}`}><b>Верно — {QUESTION.options[ci].text}</b><span>{QUESTION.fact}</span>
        <p>Угадали {RIGHT.length} из {ANSWERED}: {RIGHT.map(t => t.name).join(' · ')}</p></div>}
    </div>
  )
}

// ── «Своя игра»: пять лиан-тем свисают с ветви, на каждой — светящиеся плоды, крупнее = дороже ──
const JX = (c: number) => 560 + c * 280, JY = (r: number) => 300 + r * 130
function Jeopardy({ sub }: { sub: string }) {
  const oc = JP.open.theme, or = JP.open.tile
  return (
    <div className={`f-jp s-${sub}`} style={css({ '--ox': `${JX(oc)}px`, '--oy': `${JY(or)}px` })}>
      <div className="f-jt">Своя игра</div>
      {JP.themes.map((t, c) => <div key={t.name} className={`f-liana${c === oc && sub !== 'board' ? ' hot' : ''}`} style={css({ left: JX(c) })}><span className="cord" /><div className="name"><b>{t.name}</b>{t.hint && <i>{t.hint}</i>}</div></div>)}
      {JP.themes.map((_, c) => JP.values.map((v, r) => {
        const s = tileState(c, r, sub)
        return <div key={`${c}-${r}`} className={`f-fruit ${s}`} style={css({ left: JX(c), top: JY(r), '--r': r, '--h': [170, 280, 45, 330, 120][c] })}><i /><b>{s === 'played' ? '' : v}</b></div>
      }))}
      <div className="f-pod"><div className="in">
        <span className="k">{JP.themes[oc].name} · {JP.values[or]}</span><b className="cd">18</b><span className="cap">секунд · звучит фрагмент</span>
        <span className="k2">Ответили: {JP.answers.length}</span><ul>{JP.answers.map(a => <li key={a.team}>{team(a.team).name}</li>)}</ul>
      </div></div>
    </div>
  )
}

// ── «Угадай мелодию»: четыре стебля колокольчиков; каждый колокольчик — трек ──
function Melody({ sub, left, phase }: { sub: string; left: number; phase: ViewProps['phase'] }) {
  return (
    <div className={`f-mel s-${sub}`}>
      <div className="f-jt">Угадай мелодию</div>
      {MELODY.themes.map((t, c) => (
        <div key={t} className="f-stalk" style={css({ left: 470 + c * 250 })}>
          <span className="stem" />
          {Array.from({ length: MELODY.tracks }, (_, r) => {
            const s = trackState(c, r, sub)
            return <div key={r} className={`f-bell ${s} ${r % 2 ? 'r' : 'l'}`} style={css({ top: 60 + r * 160, '--h': [175, 270, 320, 45][c] })}>
              <svg viewBox="0 0 100 100" aria-hidden><path d="M 50 8 C 26 8 22 40 18 70 C 14 84 8 88 6 92 L 94 92 C 92 88 86 84 82 70 C 78 40 74 8 50 8 Z" /><circle cx="50" cy="94" r="7" /></svg>
              <b>{r + 1}</b>
            </div>
          })}
          <div className="name">{t}</div>
        </div>
      ))}
      <div className="f-leaf">
        <span className="k">{MELODY.themes[MEL_C]} · трек {MEL_R + 1}</span>
        {sub === 'active' ? <>
          <div className="t"><Timer left={left} total={30} phase={phase} /></div>
          <h3>Ставки команд</h3>
          <ol>{MELODY.bids.map((b, i) => <li key={b.team} className={i === 0 ? 'lead' : ''}><span>{team(b.team).name}</span><b>{b.sec} с</b></li>)}</ol>
        </> : <p>{sub === 'board' ? 'Ветер выбирает колокольчик…' : 'Звенит одну секунду…'}</p>}
      </div>
    </div>
  )
}

function TimerSheet({ sub, left }: { sub: string; left: number }) {
  if (sub === 'live') return <div className="f-tsheet live"><Timer left={left} total={30} phase={left <= 0 ? 'zero' : left <= 10 ? 'warning' : 'normal'} big /></div>
  return <div className="f-tsheet">{([[24, 'normal'], [7, 'warning'], [0, 'zero']] as const).map(([l, ph]) => <div key={ph}><Timer left={l} total={30} phase={ph} big /><span>{ph === 'normal' ? 'обычный отсчёт' : ph === 'warning' ? 'последние 10 секунд' : 'ноль'}</span></div>)}</div>
}

function View({ scene, sub, left, phase }: ViewProps) {
  let body: JSX.Element
  switch (scene) {
    case 'lobby0': body = <Lobby0 />; break
    case 'lobby12': body = <Lobby12 sub={sub} />; break
    case 'qn': case 'qw': body = <Question left={left} phase={phase} />; break
    case 'answer': body = <Question left={0} phase="zero" reveal={sub} />; break
    case 'jp': body = <Jeopardy sub={sub} />; break
    case 'melody': body = <Melody sub={sub} left={left} phase={phase} />; break
    default: body = <TimerSheet sub={sub} left={left} />
  }
  return <div className={`f-root sc-${scene} ph-${phase}`}><Grove />{body}</div>
}

export const w3: World = {
  View, Timer,
  meta: {
    num: 3, name: 'Сердце зачарованного леса',
    idea: 'Ночная поляна у древнего дерева, где лес живой и отвечает на игру светом, ростом и цветением.',
    place: 'Глубокая сине-зелёная ночь. Слева — ствол древнего дерева во всю высоту кадра, по верху — крона и ветвь, по низу — корни и мох. Светящиеся грибы, туман у земли, светлячки.',
    laws: 'Лес отвечает живым. Новая команда — семечко: падает, прорастает лианой, раскрывается цветком-огоньком. Верный ответ: свет бежит по грибнице от дерева к цветку, и цветок распускается; неверные закрываются. Выбранный плод «Своей игры» падает и раскрывается коробочкой с вопросом.',
    materials: 'Кора, мох, туман. Свет — только живой: бирюзовое свечение грибов, фиолет цветов, янтарь светлячков. Текст — светлым на тёмном.',
    timer: 'Одуванчик-светляк: каждую секунду улетает светящееся семечко, число — крупно рядом. 10 с — оставшиеся семена тлеют янтарём. Ноль — голый стебель.',
    jp: 'Пять лиан-тем свисают с ветви, на каждой пять светящихся плодов: дороже — крупнее и ниже. Сыгранный — сухая тёмная шелуха. Выбор — лиана вспыхивает, плод созревает и раскачивается. Вопрос — плод падает и раскрывается круглой коробочкой посреди поляны.',
    melody: 'Четыре стебля колокольчиков, каждый колокольчик — трек с номером. Сыгранный — поникший и тёмный. Выбор — колокольчик раскачивается и звенит кругами света. Трек играет — ставки на большом светящемся листе.',
    teams: 'Команда — цветок-огонёк своего цвета на лиане, название — под ним. Погасшая — тёмный бутон. Новая команда прорастает: лиана спускается, бутон раскрывается.',
    type: 'Philosopher (текст) и Marck Script (рукописные заголовки).',
  },
}
