// ═══ WORLD 07 · «Дворец отражений» ═══
// Перламутровый дворец зеркал в прямой перспективе: арки уходят вглубь,
// глянцевый пол всё отражает. Закон: отражения независимы, и отражение есть
// только у правды. Неверное теряет отражение, верное выходит из зеркала.
import { Fragment } from 'react'
import { Qr } from '../magic2/common'
import { GAME, ROUND, QUESTION, PICKS, RIGHT, ANSWERED, TEAMS, JOINING, JP, MELODY, team, tileState, trackState, MEL_C, MEL_R, css, type ViewProps, type TimerProps, type World } from './content'

function Hall() {
  return (
    <>
      <div className="m-air" />
      <svg className="m-hall" viewBox="0 0 1920 1080" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id="m-fl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e9e2f6" /><stop offset="1" stopColor="#c9bde6" /></linearGradient>
          <linearGradient id="m-arch" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset=".5" stopColor="#dcd6ee" /><stop offset="1" stopColor="#bfb4dc" /></linearGradient>
        </defs>
        <polygon points="0,1080 1920,1080 1160,640 760,640" fill="url(#m-fl)" />
        {Array.from({ length: 9 }, (_, i) => { const t = i / 8, x0 = 760 - t * 760, x1 = 1160 + t * 760, y = 640 + t * 440; return <line key={i} x1={x0} y1={y} x2={x1} y2={y} stroke="#b9acd9" strokeWidth={1 + t * 2} opacity=".5" /> })}
        {Array.from({ length: 11 }, (_, i) => { const xb = (i / 10) * 1920, xt = 760 + (i / 10) * 400; return <line key={`v${i}`} x1={xt} y1="640" x2={xb} y2="1080" stroke="#b9acd9" strokeWidth="1.5" opacity=".45" /> })}
        {[0, 1, 2, 3].map(k => { const s = 1 - k * 0.22, w = 1500 * s, h = 900 * s, x = 960 - w / 2, y = 640 - h * 0.82
          return <path key={k} d={`M ${x} 640 L ${x} ${y + w * 0.18} A ${w / 2} ${w * 0.22} 0 0 1 ${x + w} ${y + w * 0.18} L ${x + w} 640`} fill="none" stroke="url(#m-arch)" strokeWidth={26 * s} opacity={0.9 - k * 0.15} /> })}
        <rect x="0" y="0" width="150" height="1080" fill="url(#m-arch)" opacity=".85" /><rect x="1770" y="0" width="150" height="1080" fill="url(#m-arch)" opacity=".85" />
        <rect x="24" y="80" width="102" height="520" rx="51" className="pane" /><rect x="1794" y="80" width="102" height="520" rx="51" className="pane" />
      </svg>
      <div className="m-shine" />
    </>
  )
}

// ── таймер: зеркальный коридор. Рамки отражаются друг в друге; гаснет по рамке; 10 с — розовые и с трещиной; ноль — пустое зеркало ──
function Timer({ left, total, phase, big }: TimerProps) {
  const N = 10, keep = Math.ceil((left / total) * N)
  return (
    <div className={`m-timer ph-${phase}${big ? ' big' : ''}`}>
      {Array.from({ length: N }, (_, i) => <i key={i} className={i >= keep ? 'gone' : ''} style={css({ '--k': i })} />)}
      <span className="crack" />
      <b>{left}</b><b className="ref">{left}</b>
    </div>
  )
}

function Mirror({ children, cls = '' }: { children?: React.ReactNode; cls?: string }) {
  return <div className={`m-mirror ${cls}`}><div className="glass">{children}</div></div>
}

function Lobby0() {
  return (
    <div className="m-lobby">
      <h1 className="m-title"><span>{GAME.title}</span><span className="ref" aria-hidden>{GAME.title}</span></h1>
      <Mirror cls="m-main"><Qr size={260} ink="#2a2140" /><span className="room">{GAME.room}</span></Mirror>
      <ol className="m-etch">{GAME.steps.map((s, i) => <li key={i} style={css({ '--i': i })}><b>{['I', 'II', 'III'][i]}</b><span>{s}</span></li>)}</ol>
      <div className="m-gallery">{Array.from({ length: 12 }, (_, i) => <i key={i} style={css({ '--i': i })} />)}<span>12 зеркал ждут своих отражений</span></div>
    </div>
  )
}
function Lobby12({ sub }: { sub: string }) {
  const joined = sub === 'join'
  const n = TEAMS.filter(t => t.alive && (t.id !== JOINING || joined)).length
  return (
    <div className={`m-lobby l12 s-${sub}`}>
      <h1 className="m-title small"><span>{GAME.title}</span></h1>
      <div className="m-mini"><Qr size={170} ink="#2a2140" /><span>{GAME.room}</span></div>
      <div className="m-count"><b>{n}</b> зеркал ожили</div>
      <div className="m-wall">
        {TEAMS.map((t, i) => {
          const late = t.id === JOINING
          return <div key={t.id} className={`m-hand${t.alive ? '' : ' off'}${late ? (joined ? ' late' : ' wait') : ''}`} style={css({ '--h': t.hue, '--i': i })}>
            <div className="face"><span>{t.name}</span>{!t.alive && <em>отражение пропало</em>}</div>
            <div className="back" />
          </div>
        })}
      </div>
    </div>
  )
}

const MX = [380, 760, 1160, 1540]
function Question({ left, phase, reveal }: { left: number; phase: ViewProps['phase']; reveal?: string }) {
  const ans = reveal === 'reveal'
  return (
    <div className={`m-q ph-${phase}${reveal ? ` ans a-${reveal}` : ''}`}>
      <div className="m-card">
        <div className="m-ch"><span>Раунд {ROUND.n} · {ROUND.name}</span><span>вопрос {ROUND.q} из {ROUND.of}</span></div>
        <p className="m-qtext">{QUESTION.text.split(' ').map((w, i) => <Fragment key={i}>{i > 0 && ' '}<span style={css({ '--i': i })}>{w}</span></Fragment>)}</p>
        {reveal && <div className={`m-verdict${ans ? ' on' : ''}`}><b>Верно: Николай Гоголь</b> · {QUESTION.fact}<p>Угадали {RIGHT.length} из {ANSWERED}: {RIGHT.map(t => t.name).join(' · ')}</p></div>}
      </div>
      {!reveal && <div className="m-tslot"><Timer left={left} total={QUESTION.total} phase={phase} /></div>}
      {QUESTION.options.map((o, i) => {
        const ok = o.key === QUESTION.correct
        return <div key={o.key} className={`m-opt${ans ? (ok ? ' ok' : ' no') : ''}`} style={css({ left: MX[i], '--i': i })}>
          <div className="real"><b>{o.key}</b><span>{o.text}</span>{reveal && <em>{Object.values(PICKS).filter(v => v === o.key).length}</em>}</div>
          <div className="mirror-ref" aria-hidden><b>{o.key}</b><span>{o.text}</span></div>
        </div>
      })}
    </div>
  )
}

// ── «Своя игра»: пять колонн висящих зеркал разной формы; цена — гравировкой ──
const JX = (c: number) => 360 + c * 300, JY = (r: number) => 310 + r * 136
const SHAPES = ['oval', 'arch', 'round', 'diamond', 'oval']
function Jeopardy({ sub }: { sub: string }) {
  const oc = JP.open.theme, or = JP.open.tile
  return (
    <div className={`m-jp s-${sub}`} style={css({ '--ox': `${JX(oc)}px`, '--oy': `${JY(or)}px` })}>
      <div className="m-jt">Своя игра</div>
      {JP.themes.map((t, c) => <div key={t.name} className={`m-col${c === oc && sub !== 'board' ? ' hot' : ''}`} style={css({ left: JX(c) })}><b>{t.name}</b>{t.hint && <i>{t.hint}</i>}<span className="chain" /></div>)}
      {JP.themes.map((_, c) => JP.values.map((v, r) => {
        const s = tileState(c, r, sub)
        return <div key={`${c}-${r}`} className={`m-tile ${s} ${SHAPES[c]}`} style={css({ left: JX(c), top: JY(r), '--r': r })}><span className="g"><b>{s === 'played' ? '' : v}</b></span></div>
      }))}
      <div className="m-portal"><div className="in">
        <span className="k">{JP.themes[oc].name} · {JP.values[or]}</span><b className="cd">18</b><span className="cap">секунд · звучит фрагмент</span>
        <span className="k2">Ответили: {JP.answers.length}</span><ul>{JP.answers.map(a => <li key={a.team}>{team(a.team).name}</li>)}</ul>
      </div></div>
    </div>
  )
}

// ── «Угадай мелодию»: стеклянная гармоника — четыре полки бокалов, вода в них разной высоты ──
function Melody({ sub, left, phase }: { sub: string; left: number; phase: ViewProps['phase'] }) {
  return (
    <div className={`m-mel s-${sub}`}>
      <div className="m-jt left">Угадай мелодию</div>
      {MELODY.themes.map((t, c) => (
        <div key={t} className="m-shelf" style={css({ top: 200 + c * 205 })}>
          <span className="nm">{t}</span>
          {Array.from({ length: MELODY.tracks }, (_, r) => {
            const s = trackState(c, r, sub)
            return <div key={r} className={`m-glass ${s}`} style={css({ '--fill': `${30 + r * 15}%`, '--h': [280, 330, 200, 40][c] })}>
              <svg viewBox="0 0 80 120" aria-hidden><path className="bowl" d="M 10 6 L 70 6 C 70 50 58 66 40 70 C 22 66 10 50 10 6 Z" /><rect className="stem" x="38" y="70" width="4" height="34" /><ellipse className="foot" cx="40" cy="108" rx="22" ry="5" /></svg>
              <span className="water" /><b>{r + 1}</b>
            </div>
          })}
        </div>
      ))}
      <Mirror cls="m-side">
        <span className="k">{MELODY.themes[MEL_C]} · трек {MEL_R + 1}</span>
        {sub === 'active' ? <>
          <div className="t"><Timer left={left} total={30} phase={phase} /></div>
          <h3>Ставки команд</h3>
          <ol>{MELODY.bids.map((b, i) => <li key={b.team} className={i === 0 ? 'lead' : ''}><span>{team(b.team).name}</span><b>{b.sec} с</b></li>)}</ol>
        </> : <p>{sub === 'board' ? 'Зеркала выбирают бокал…' : 'Бокал звенит · 1 секунда…'}</p>}
      </Mirror>
    </div>
  )
}

function TimerSheet({ sub, left }: { sub: string; left: number }) {
  if (sub === 'live') return <div className="m-tsheet live"><Timer left={left} total={30} phase={left <= 0 ? 'zero' : left <= 10 ? 'warning' : 'normal'} big /></div>
  return <div className="m-tsheet">{([[24, 'normal'], [7, 'warning'], [0, 'zero']] as const).map(([l, ph]) => <div key={ph}><Timer left={l} total={30} phase={ph} big /><span>{ph === 'normal' ? 'обычный отсчёт' : ph === 'warning' ? 'последние 10 секунд' : 'ноль'}</span></div>)}</div>
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
  return <div className={`m-root sc-${scene} ph-${phase}`}><Hall />{body}</div>
}

export const w7: World = {
  View, Timer,
  meta: {
    num: 7, name: 'Дворец отражений',
    idea: 'Перламутровый дворец зеркал, где отражения живут своей жизнью — и отражение есть только у правды.',
    place: 'Светлый сиреневато-перламутровый зал в прямой перспективе: арки уходят вглубь, по бокам — зеркальные пилоны, глянцевый пол в клетку отражает всё, что стоит на нём. По стеклу пробегают радужные блики.',
    laws: 'Отражения независимы. Варианты стоят на глянцевом полу, и у каждого есть отражение. В момент ответа отражения неверных гаснут — у лжи нет отражения, — а отражение верного вспыхивает и меняется местами с оригиналом. Новая команда — зеркало, которое поворачивается лицом и показывает её имя. Выбранное зеркало «Своей игры» становится порталом, в который мы входим.',
    materials: 'Перламутр, серебро, сирень, розовый кварц, радужная плёнка на стекле. Тёмный — только чернила текста. Свет — рассеянный, дневной, с бликами.',
    timer: 'Зеркальный коридор: десять рамок отражаются друг в друге, каждые 3 секунды одна гаснет; число — в центре и его отражение снизу. 10 с — рамки розовеют, по стеклу идёт трещина. Ноль — пустое зеркало.',
    jp: 'Пять колонн висящих зеркал, у каждой темы — своя форма (овал, арка, круг, ромб); цена — гравировкой, дороже — крупнее. Сыгранное — развёрнуто тёмной изнанкой. Выбор — зеркало переливается радугой. Вопрос — зеркало вырастает в арочный портал посреди зала.',
    melody: 'Стеклянная гармоника: четыре полки-темы с бокалами, вода в бокалах разной высоты, номер — гравировкой. Сыгранный — пустой и треснувший. Выбор — бокал дрожит, по воде идут круги. Трек играет — ставки в высоком зеркале справа.',
    teams: 'Команда — ручное зеркало на стене, имя в стекле, оправа — её цвет. Пропавшая — зеркало без отражения. Новая — зеркало поворачивается лицом, и имя проступает.',
    type: 'Prata (заголовки — контрастная антиква) и Montserrat Alternates (текст — лёгкий, геометричный).',
  },
}
