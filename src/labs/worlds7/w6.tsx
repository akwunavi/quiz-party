// ═══ WORLD 06 · «Затонувшая академия» ═══
// Древняя академия на дне невозможного океана: мраморные колоннады, солнечные
// блики сверху, светящиеся медузы. Закон: вода послушна академии — течения
// несут вещи, воздух живёт пузырями, которые держат знание. Верное поднимает
// течение к свету, неверное закрывается раковиной и ложится на песок.
import { Fragment, useMemo } from 'react'
import { rng } from '../../lib/anagram'
import { Qr } from '../magic2/common'
import { GAME, ROUND, QUESTION, PICKS, RIGHT, ANSWERED, TEAMS, JOINING, JP, MELODY, team, tileState, trackState, MEL_C, MEL_R, css, type ViewProps, type TimerProps, type World } from './content'

function Deep() {
  const b = useMemo(() => { const r = rng(606); return Array.from({ length: 26 }, () => ({ x: r() * 1920, s: 4 + r() * 12, t: r() * 12, d: 8 + r() * 10 })) }, [])
  return (
    <>
      <div className="u-water" />
      <div className="u-caustic" />
      <svg className="u-hall" viewBox="0 0 1920 1080" aria-hidden>
        <defs><linearGradient id="u-col" x1="0" x2="1"><stop offset="0" stopColor="#7fa9b5" /><stop offset=".5" stopColor="#d8ece8" /><stop offset="1" stopColor="#6d97a5" /></linearGradient>
          <linearGradient id="u-ray" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#bff6ff" stopOpacity=".5" /><stop offset="1" stopColor="#bff6ff" stopOpacity="0" /></linearGradient></defs>
        {[[300, 120], [760, 90], [1250, 140], [1600, 80]].map(([x, w], i) => <polygon key={i} points={`${x},0 ${x + w},0 ${x + w * 2.4},1080 ${x + w * .6},1080`} fill="url(#u-ray)" opacity=".35" className="ray" style={css({ '--i': i })} />)}
        <g opacity=".55">{[90, 1700].map(x => <g key={x}><rect x={x} y="150" width="130" height="860" fill="url(#u-col)" /><rect x={x - 20} y="130" width="170" height="30" fill="#c7dedb" /><rect x={x - 20} y="1000" width="170" height="30" fill="#c7dedb" />
          <path d={`M ${x + 20} 400 c 30 -40 60 -20 70 -60 M ${x + 100} 700 c -20 -30 10 -60 -10 -90`} stroke="#ff8f7a" strokeWidth="10" fill="none" strokeLinecap="round" /></g>)}</g>
        <path d="M 0 1080 L 0 1000 C 300 960 600 1020 960 990 C 1300 960 1600 1010 1920 980 L 1920 1080 Z" fill="#c9b48a" />
        <path d="M 0 1080 L 0 1030 C 400 1000 800 1050 1200 1020 C 1500 1000 1700 1040 1920 1020 L 1920 1080 Z" fill="#b39c72" />
        {[[260, 1000], [520, 1010], [1420, 995], [1660, 1005]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y})`} className="kelp" style={css({ '--i': i })}><path d="M 0 0 C -20 -80 20 -160 0 -240 C -20 -300 10 -360 0 -400" stroke="#2f8f6a" strokeWidth="12" fill="none" strokeLinecap="round" /></g>)}
      </svg>
      <div className="u-bubbles">{b.map((p, i) => <i key={i} style={css({ left: p.x, width: p.s, height: p.s, '--t': `${p.t}s`, '--d': `${p.d}s` })} />)}</div>
    </>
  )
}

// ── таймер: воздушный пузырь. Тает с каждой секундой; 10 с — дрожит и розовеет; ноль — лопается россыпью ──
function Timer({ left, total, phase, big }: TimerProps) {
  const p = Math.max(0, Math.min(1, left / total))
  return (
    <div className={`u-timer ph-${phase}${big ? ' big' : ''}`}>
      <div className="orb" style={css({ '--p': p })}><b>{left}</b></div>
      <div className="pop">{Array.from({ length: 9 }, (_, i) => <i key={i} style={css({ '--k': i })} />)}</div>
      <span className="track" />
    </div>
  )
}

function Lobby0() {
  return (
    <div className="u-lobby">
      <div className="u-pedi"><h1>{GAME.title}</h1><span>академия под водой · приём открыт</span></div>
      <div className="u-air"><div className="in"><Qr size={260} ink="#04263a" /></div><span>{GAME.room}</span></div>
      <ol className="u-tabs">{GAME.steps.map((s, i) => <li key={i} style={css({ '--i': i })}><b>{['I', 'II', 'III'][i]}</b>{s}</li>)}</ol>
      <div className="u-niches">{Array.from({ length: 12 }, (_, i) => <i key={i} style={css({ '--i': i })} />)}<span>12 мест в аудитории · пусто</span></div>
    </div>
  )
}
function Lobby12({ sub }: { sub: string }) {
  const joined = sub === 'join'
  const n = TEAMS.filter(t => t.alive && (t.id !== JOINING || joined)).length
  return (
    <div className={`u-lobby l12 s-${sub}`}>
      <div className="u-pedi small"><h1>{GAME.title}</h1></div>
      <div className="u-air small"><div className="in"><Qr size={170} ink="#04263a" /></div><span>{GAME.room}</span></div>
      <div className="u-count"><b>{n}</b> медуз в аудитории</div>
      <div className="u-school">
        {TEAMS.map((t, i) => {
          const late = t.id === JOINING
          return <div key={t.id} className={`u-jelly${t.alive ? '' : ' off'}${late ? (joined ? ' late' : ' wait') : ''}`} style={css({ '--h': t.hue, '--i': i, '--dy': `${(i % 3) * 18}px` })}>
            <span className="bell" /><span className="tent" /><b>{t.name}</b>{!t.alive && <em>ушла на глубину</em>}
          </div>
        })}
      </div>
    </div>
  )
}

const UX = [400, 780, 1160, 1540]
function Question({ left, phase, reveal }: { left: number; phase: ViewProps['phase']; reveal?: string }) {
  const ans = reveal === 'reveal'
  return (
    <div className={`u-q ph-${phase}${reveal ? ` ans a-${reveal}` : ''}`}>
      <div className="u-tablet">
        <div className="u-th"><span>Раунд {ROUND.n} · {ROUND.name}</span><span>вопрос {ROUND.q} из {ROUND.of}</span></div>
        <p className="u-qtext">{QUESTION.text.split(' ').map((w, i) => <Fragment key={i}>{i > 0 && ' '}<span style={css({ '--i': i })}>{w}</span></Fragment>)}</p>
        {reveal && <div className={`u-verdict${ans ? ' on' : ''}`}><b>Верно: Николай Гоголь</b> · {QUESTION.fact}<p>Угадали {RIGHT.length} из {ANSWERED}: {RIGHT.map(t => t.name).join(' · ')}</p></div>}
      </div>
      {!reveal && <div className="u-tslot"><Timer left={left} total={QUESTION.total} phase={phase} /></div>}
      {reveal && ans && <svg className="u-current" viewBox="0 0 1920 1080" aria-hidden><path pathLength={1} d={`M ${UX[1]} 840 C ${UX[1] + 200} 700 ${UX[1] - 160} 560 ${UX[1] + 80} 420`} /></svg>}
      {QUESTION.options.map((o, i) => {
        const ok = o.key === QUESTION.correct
        return <div key={o.key} className={`u-opt${ans ? (ok ? ' ok' : ' no') : ''}`} style={css({ left: UX[i], '--i': i })}>
          <div className="shell"><span className="top" /><span className="pearl"><b>{o.key}</b></span><span className="bot" /></div>
          <div className="plate">{o.text}{reveal && <em>{Object.values(PICKS).filter(v => v === o.key).length} ответ.</em>}</div>
        </div>
      })}
    </div>
  )
}

// ── «Своя игра»: пять стеблей ламинарии-тем; плитки — пузыри воздуха, крупнее = дороже ──
const JX = (c: number) => 360 + c * 300, JY = (r: number) => 300 + r * 140
function Jeopardy({ sub }: { sub: string }) {
  const oc = JP.open.theme, or = JP.open.tile
  return (
    <div className={`u-jp s-${sub}`} style={css({ '--ox': `${JX(oc)}px`, '--oy': `${JY(or)}px` })}>
      <div className="u-jt">Своя игра</div>
      {JP.themes.map((t, c) => <div key={t.name} className={`u-stem${c === oc && sub !== 'board' ? ' hot' : ''}`} style={css({ left: JX(c) })}><span className="k" /><div className="nm"><b>{t.name}</b>{t.hint && <i>{t.hint}</i>}</div></div>)}
      {JP.themes.map((_, c) => JP.values.map((v, r) => {
        const s = tileState(c, r, sub)
        return <div key={`${c}-${r}`} className={`u-bub ${s}`} style={css({ left: JX(c), top: JY(r), '--r': r })}>
          {s === 'played' ? <><i className="d" /><i className="d s" /><i className="d t" /></> : <b>{v}</b>}
        </div>
      }))}
      <div className="u-sheet">
        <div className="in"><span className="k">{JP.themes[oc].name} · {JP.values[or]}</span><b className="cd">18</b><span className="cap">секунд · звучит фрагмент</span>
          <span className="k2">Ответили: {JP.answers.length}</span><ul>{JP.answers.map(a => <li key={a.team}>{team(a.team).name}</li>)}</ul></div>
      </div>
    </div>
  )
}

// ── «Угадай мелодию»: рифовые полки с раковинами-трубами; каждая раковина — трек ──
function Melody({ sub, left, phase }: { sub: string; left: number; phase: ViewProps['phase'] }) {
  return (
    <div className={`u-mel s-${sub}`}>
      <div className="u-jt left">Угадай мелодию</div>
      {MELODY.themes.map((t, c) => (
        <div key={t} className="u-reef" style={css({ top: 210 + c * 200 })}>
          <div className="nm">{t}</div>
          {Array.from({ length: MELODY.tracks }, (_, r) => {
            const s = trackState(c, r, sub)
            return <div key={r} className={`u-conch ${s}`} style={css({ '--h': [12, 30, 330, 190][c] })}>
              <svg viewBox="0 0 120 90" aria-hidden><path d="M 10 50 C 10 20 50 6 80 16 C 104 24 116 44 110 60 C 104 76 80 84 56 80 C 40 78 30 70 26 60 L 4 72 Z" /><path className="sp" d="M 70 30 C 86 34 94 48 86 58 C 78 66 64 62 62 52 C 60 44 70 42 74 48" /></svg>
              <b>{r + 1}</b>
            </div>
          })}
        </div>
      ))}
      <div className="u-slate">
        <span className="k">{MELODY.themes[MEL_C]} · трек {MEL_R + 1}</span>
        {sub === 'active' ? <>
          <div className="t"><Timer left={left} total={30} phase={phase} /></div>
          <h3>Ставки команд</h3>
          <ol>{MELODY.bids.map((b, i) => <li key={b.team} className={i === 0 ? 'lead' : ''}><span>{team(b.team).name}</span><b>{b.sec} с</b></li>)}</ol>
        </> : <p>{sub === 'board' ? 'Течение выбирает раковину…' : 'Раковина поёт · 1 секунда…'}</p>}
      </div>
    </div>
  )
}

function TimerSheet({ sub, left }: { sub: string; left: number }) {
  if (sub === 'live') return <div className="u-tsheet live"><Timer left={left} total={30} phase={left <= 0 ? 'zero' : left <= 10 ? 'warning' : 'normal'} big /></div>
  return <div className="u-tsheet">{([[24, 'normal'], [7, 'warning'], [0, 'zero']] as const).map(([l, ph]) => <div key={ph}><Timer left={l} total={30} phase={ph} big /><span>{ph === 'normal' ? 'обычный отсчёт' : ph === 'warning' ? 'последние 10 секунд' : 'ноль'}</span></div>)}</div>
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
  return <div className={`u-root sc-${scene} ph-${phase}`}><Deep />{body}</div>
}

export const w6: World = {
  View, Timer,
  meta: {
    num: 6, name: 'Затонувшая академия',
    idea: 'Древняя академия на дне невозможного океана, где вода послушна знанию: течения несут ответы, а воздух живёт в пузырях.',
    place: 'Бирюзовая глубина с солнечными бликами сверху и лучами света. Мраморные колонны в кораллах, песчаное дно, ламинария. Медленно поднимаются пузырьки.',
    laws: 'Вода послушна академии. Новая команда — медуза, которая спускается из света и зажигается. Верный ответ: жемчужина в раковине вспыхивает, течение подхватывает её и несёт к свету; неверные раковины захлопываются и ложатся на песок. Пузырь «Своей игры» поднимается — из песка встаёт стена воды с вопросом.',
    materials: 'Бирюза и глубокий синий, жемчуг, мрамор, коралл. Текст — жемчужным на тёмной воде, тёмным — на мраморных табличках. Свет — каустика сверху.',
    timer: 'Воздушный пузырь с числом внутри: с каждой секундой становится меньше. 10 с — дрожит и розовеет. Ноль — лопается россыпью мелких пузырьков.',
    jp: 'Пять стеблей ламинарии-тем, на каждом пять пузырей воздуха: дороже — крупнее. Сыгранный — лопнул, остался след из мелких пузырьков. Выбор — пузырь дрожит, стебель светится. Вопрос — из песка поднимается стена воды с волной по верху, внутри — вопрос.',
    melody: 'Четыре рифовые полки-темы с раковинами-трубами, номер — на раковине. Сыгранная — выцветшая. Выбор — раковина поёт кругами по воде. Трек играет — ставки на мраморной табличке.',
    teams: 'Команда — медуза своего цвета с названием под колоколом. Ушедшая на глубину — бесцветная. Новая — спускается сверху и загорается.',
    type: 'Yeseva One (заголовки — античная выразительность) и Spectral (текст).',
  },
}
