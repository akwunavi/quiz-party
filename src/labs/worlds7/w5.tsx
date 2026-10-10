// ═══ WORLD 05 · «Город живых механизмов» ═══
// Фарфоровый город на закате: башни из белой эмали, бирюзовые шестерни,
// киноварные заслонки. Никакой латуни и пара. Закон: город собирает себя сам —
// панели раскладываются, шестерни зацепляются, здания переставляются, чтобы
// показать нужное. Верное поднимается на поршне, неверное закрывает ставни.
import { Fragment } from 'react'
import { Qr } from '../magic2/common'
import { GAME, ROUND, QUESTION, PICKS, RIGHT, ANSWERED, TEAMS, JOINING, JP, MELODY, team, tileState, trackState, MEL_C, MEL_R, css, type ViewProps, type TimerProps, type World } from './content'

function Gear({ r = 60, teeth = 12, cls = '', spin = 0 }: { r?: number; teeth?: number; cls?: string; spin?: number }) {
  const pts: string[] = []
  for (let i = 0; i < teeth * 2; i++) {
    const a = (i / (teeth * 2)) * Math.PI * 2, rr = i % 2 ? r : r * 1.16
    const a0 = a - Math.PI / (teeth * 4), a1 = a + Math.PI / (teeth * 4)
    pts.push(`${(Math.cos(a0) * rr).toFixed(1)},${(Math.sin(a0) * rr).toFixed(1)}`, `${(Math.cos(a1) * rr).toFixed(1)},${(Math.sin(a1) * rr).toFixed(1)}`)
  }
  return <svg className={`c-gear ${cls}`} viewBox={`${-r * 1.2} ${-r * 1.2} ${r * 2.4} ${r * 2.4}`} style={css({ width: r * 2.4, height: r * 2.4, '--spin': `${spin}s` })} aria-hidden>
    <polygon points={pts.join(' ')} /><circle r={r * .62} className="web" /><circle r={r * .22} className="hub" />
  </svg>
}
function City() {
  return (
    <>
      <div className="c-sky" />
      <svg className="c-city" viewBox="0 0 1920 1080" aria-hidden>
        <g className="far">{[[60, 520, 120], [200, 440, 90], [300, 600, 140], [1460, 480, 110], [1590, 400, 90], [1700, 560, 160], [1820, 460, 100]].map(([x, y, w], i) =>
          <g key={i}><rect x={x} y={y} width={w} height={1080 - y} rx="10" /><rect x={x + w / 2 - 6} y={y - 60} width="12" height="60" /><circle cx={x + w / 2} cy={y - 66} r="14" /></g>)}</g>
        <g className="near">
          <path d="M 0 1080 L 0 760 L 140 760 L 140 700 L 260 700 L 260 820 L 420 820 L 420 1080 Z" />
          <path d="M 1920 1080 L 1920 740 L 1760 740 L 1760 660 L 1640 660 L 1640 800 L 1500 800 L 1500 1080 Z" />
          {Array.from({ length: 8 }, (_, i) => <rect key={i} x={30 + (i % 4) * 90} y={790 + Math.floor(i / 4) * 80} width="40" height="44" rx="20" className="win" />)}
          {Array.from({ length: 8 }, (_, i) => <rect key={`r${i}`} x={1540 + (i % 4) * 90} y={760 + Math.floor(i / 4) * 80} width="40" height="44" rx="20" className="win" />)}
        </g>
        <path className="rail" d="M 0 1010 L 1920 1010" />
      </svg>
      <div className="c-g g1"><Gear r={90} teeth={14} spin={40} /></div>
      <div className="c-g g2"><Gear r={55} teeth={9} cls="rev" spin={24} /></div>
      <div className="c-g g3"><Gear r={70} teeth={11} cls="red" spin={33} /></div>
      <div className="c-tram" />
    </>
  )
}

// ── таймер: табло с перекидными флажками + пара шестерён; 10 с — флажки киноварные, шестерни быстрее; ноль — опускаются ставни ──
function Timer({ left, total, phase, big }: TimerProps) {
  const d = String(Math.max(0, left)).padStart(2, '0')
  void total
  return (
    <div className={`c-timer ph-${phase}${big ? ' big' : ''}`}>
      <div className="gears"><Gear r={34} teeth={10} spin={phase === 'warning' ? 2 : phase === 'zero' ? 0 : 6} /><Gear r={22} teeth={7} cls="rev red" spin={phase === 'warning' ? 1.4 : phase === 'zero' ? 0 : 4} /></div>
      <div className="flaps">{d.split('').map((ch, i) => <span key={`${i}-${ch}`} className="flap"><b>{ch}</b><i /></span>)}</div>
      <div className="shutter" />
    </div>
  )
}

function Lobby0() {
  return (
    <div className="c-lobby">
      <div className="c-marquee"><span>{GAME.title}</span></div>
      <div className="c-tower">
        <div className="c-face"><Qr size={270} ink="#121a3a" /></div>
        <div className="c-tplate">{GAME.room}</div>
      </div>
      <ol className="c-drums">{GAME.steps.map((s, i) => <li key={i} style={css({ '--i': i })}><b>{i + 1}</b><span>{s}</span></li>)}</ol>
      <div className="c-block">{Array.from({ length: 12 }, (_, i) => <i key={i} />)}<span>12 квартир свободны</span></div>
    </div>
  )
}
function Lobby12({ sub }: { sub: string }) {
  const joined = sub === 'join'
  const n = TEAMS.filter(t => t.alive && (t.id !== JOINING || joined)).length
  return (
    <div className={`c-lobby l12 s-${sub}`}>
      <div className="c-marquee small"><span>{GAME.title}</span></div>
      <div className="c-mini"><Qr size={180} ink="#121a3a" /><span>{GAME.room}</span></div>
      <div className="c-count"><b>{n}</b> квартир горят</div>
      <div className="c-house">
        {TEAMS.map((t, i) => {
          const late = t.id === JOINING
          return <div key={t.id} className={`c-apt${t.alive ? '' : ' off'}${late ? (joined ? ' late' : ' wait') : ''}`} style={css({ '--h': t.hue, '--i': i })}>
            <i className="lamp" /><span>{t.name}</span>{!t.alive && <em>свет погас</em>}
          </div>
        })}
        {joined && <div className="c-crane" />}
      </div>
    </div>
  )
}

const CX = [400, 780, 1160, 1540]
function Question({ left, phase, reveal }: { left: number; phase: ViewProps['phase']; reveal?: string }) {
  const ans = reveal === 'reveal'
  return (
    <div className={`c-q ph-${phase}${reveal ? ` ans a-${reveal}` : ''}`}>
      <div className="c-board">
        <div className="c-bh"><span>Раунд {ROUND.n} · {ROUND.name}</span><span>вопрос {ROUND.q} из {ROUND.of}</span></div>
        <p className="c-qtext">{QUESTION.text.split(' ').map((w, i) => <Fragment key={i}>{i > 0 && ' '}<span style={css({ '--i': i })}>{w}</span></Fragment>)}</p>
        {reveal && <div className={`c-verdict${ans ? ' on' : ''}`}><b>Верно: Николай Гоголь</b> · {QUESTION.fact}<p>Угадали {RIGHT.length} из {ANSWERED}: {RIGHT.map(t => t.name).join(' · ')}</p></div>}
      </div>
      {!reveal && <div className="c-tslot"><Timer left={left} total={QUESTION.total} phase={phase} /></div>}
      {QUESTION.options.map((o, i) => {
        const ok = o.key === QUESTION.correct
        return <div key={o.key} className={`c-opt${ans ? (ok ? ' ok' : ' no') : ''}`} style={css({ left: CX[i], '--i': i })}>
          <div className="turret"><span className="dial">{o.key}</span><span className="shut" /></div>
          <div className="piston" />
          <div className="plate">{o.text}{reveal && <em>{Object.values(PICKS).filter(v => v === o.key).length}</em>}</div>
        </div>
      })}
    </div>
  )
}

// ── «Своя игра»: пять башен-тем; плитки — эмалевые шестерни, дороже — крупнее ──
const JX = (c: number) => 340 + c * 310, JY = (r: number) => 290 + r * 140
function Jeopardy({ sub }: { sub: string }) {
  const oc = JP.open.theme, or = JP.open.tile
  return (
    <div className={`c-jp s-${sub}`} style={css({ '--ox': `${JX(oc)}px`, '--oy': `${JY(or)}px` })}>
      <div className="c-jt">Своя игра</div>
      {JP.themes.map((t, c) => <div key={t.name} className={`c-col${c === oc && sub !== 'board' ? ' hot' : ''}`} style={css({ left: JX(c) })}><div className="cap"><b>{t.name}</b>{t.hint && <i>{t.hint}</i>}</div><span className="shaft" /></div>)}
      {JP.themes.map((_, c) => JP.values.map((v, r) => {
        const s = tileState(c, r, sub)
        return <div key={`${c}-${r}`} className={`c-tile ${s} k${c % 3}`} style={css({ left: JX(c), top: JY(r) })}>
          {s === 'played' ? <span className="axle" /> : <><Gear r={30 + r * 4} teeth={10 + r} spin={s === 'sel' ? 2 : 0} /><b>{v}</b></>}
        </div>
      }))}
      <div className="c-iris"><div className="blades">{Array.from({ length: 8 }, (_, k) => <i key={k} style={css({ '--k': k })} />)}</div>
        <div className="in"><span className="k">{JP.themes[oc].name} · {JP.values[or]}</span><b className="cd">18</b><span className="cap2">секунд · звучит фрагмент</span>
          <span className="k2">Ответили: {JP.answers.length}</span><ul>{JP.answers.map(a => <li key={a.team}>{team(a.team).name}</li>)}</ul></div></div>
    </div>
  )
}

// ── «Угадай мелодию»: четыре карусели-автомата; треки — пластинки на карусели ──
function Melody({ sub, left, phase }: { sub: string; left: number; phase: ViewProps['phase'] }) {
  return (
    <div className={`c-mel s-${sub}`}>
      <div className="c-jt left">Угадай мелодию</div>
      {MELODY.themes.map((t, c) => (
        <div key={t} className={`c-car${c === MEL_C && sub !== 'board' ? ' hot' : ''}`} style={css({ left: 240 + c * 300, '--turn': c === MEL_C && sub !== 'board' ? `${-90 * MEL_R}deg` : '0deg' })}>
          <div className="plat">
            {Array.from({ length: MELODY.tracks }, (_, r) => {
              const s = trackState(c, r, sub)
              return <div key={r} className={`c-disc ${s}`} style={css({ '--a': `${r * 90}deg` })}><span><b>{r + 1}</b></span></div>
            })}
            <i className="pivot" />
          </div>
          <span className="arm" />
          <div className="name">{t}</div>
        </div>
      ))}
      <div className="c-flapboard">
        <div className="row k">{MELODY.themes[MEL_C].toUpperCase()} · ТРЕК {MEL_R + 1}</div>
        {sub === 'active' ? <>
          <div className="row t"><Timer left={left} total={30} phase={phase} /><span>СТАВКИ КОМАНД</span></div>
          {MELODY.bids.map((b, i) => <div key={b.team} className={`row bid${i === 0 ? ' lead' : ''}`} style={css({ '--i': i })}><span>{team(b.team).name}</span><b>{b.sec} С</b></div>)}
        </> : <div className="row note">{sub === 'board' ? 'КАРУСЕЛИ ВЫБИРАЮТ ТРЕК…' : 'ИГЛА ОПУЩЕНА · 1 СЕКУНДА…'}</div>}
      </div>
    </div>
  )
}

function TimerSheet({ sub, left }: { sub: string; left: number }) {
  if (sub === 'live') return <div className="c-tsheet live"><Timer left={left} total={30} phase={left <= 0 ? 'zero' : left <= 10 ? 'warning' : 'normal'} big /></div>
  return <div className="c-tsheet">{([[24, 'normal'], [7, 'warning'], [0, 'zero']] as const).map(([l, ph]) => <div key={ph}><Timer left={l} total={30} phase={ph} big /><span>{ph === 'normal' ? 'обычный отсчёт' : ph === 'warning' ? 'последние 10 секунд' : 'ноль'}</span></div>)}</div>
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
  return <div className={`c-root sc-${scene} ph-${phase}`}><City />{body}</div>
}

export const w5: World = {
  View, Timer,
  meta: {
    num: 5, name: 'Город живых механизмов',
    idea: 'Фарфоровый город на закате, который сам себя собирает: панели раскладываются, шестерни зацепляются, дома переставляются, чтобы показать игру.',
    place: 'Кобальтовое небо переходит в коралловый закат. Силуэты башен из белой эмали с круглыми окнами, бирюзовые и киноварные шестерни, по рельсу внизу проезжает трамвай. Ни латуни, ни пара, ни шестерёнок «под старину».',
    laws: 'Город собирает себя сам. Новая команда — квартира-модуль: кран вставляет её в дом, и в окне загорается свет. Верный вариант поднимается на поршне, неверные закрывают ставни. Выбранная шестерня «Своей игры» вращается и раскрывает механическую диафрагму с вопросом. Карусель-автомат поворачивается и подаёт пластинку под иглу.',
    materials: 'Белый фарфор и эмаль, бирюза, киноварь, горчица, глубокий кобальт. Геометрия плакатов 1930-х. Текст — тёмным на фарфоре или белым на кобальте.',
    timer: 'Перекидное табло с флажками и парой шестерён: каждую секунду флажок перещёлкивается. 10 с — флажки киноварные, шестерни крутятся быстрее. Ноль — сверху опускается ставня.',
    jp: 'Пять башен-тем с бирюзовыми и киноварными шестернями: цена выбита на шестерне, дороже — крупнее. Сыгранная — пустая ось без шестерни. Выбор — шестерня вращается, вал башни загорается. Вопрос — посреди города раскрывается круглая диафрагма из лепестков, внутри — вопрос.',
    melody: 'Четыре карусели-автомата, на каждой — четыре пластинки с номерами. Сыгранная — без этикетки, тусклая. Выбор — карусель поворачивается и подаёт пластинку под тонарм. Трек играет — справа перекидное табло со ставками.',
    teams: 'Команда — горящая квартира в доме с эмалевой табличкой-названием, лампа — её цвет. Отключившаяся — тёмное окно. Новая — модуль, который кран вдвигает в дом.',
    type: 'Unbounded — геометрический гротеск, как вывески и табло.',
  },
}
