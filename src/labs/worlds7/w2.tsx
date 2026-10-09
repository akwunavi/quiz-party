// ═══ WORLD 02 · «Библиотека затерянных миров» ═══
// Бесконечная солнечная библиотека: башни стеллажей уходят за кадр, лестницы
// ведут в невозможные стороны, в каждой книге — живой мир. Закон: знание
// меняет пространство. Чернила пишут сами, иллюстрации оживают линиями,
// книги вылетают из полок, неверное выцветает в пыль.
import { Fragment, useMemo } from 'react'
import { rng } from '../../lib/anagram'
import { Qr } from '../magic2/common'
import { GAME, ROUND, QUESTION, PICKS, RIGHT, ANSWERED, TEAMS, JOINING, JP, MELODY, team, tileState, trackState, MEL_C, MEL_R, css, type ViewProps, type TimerProps, type World } from './content'

const SPINE = ['#1f5b5c', '#a23a2a', '#2f4a7a', '#6b4a2a', '#c99a3b', '#3b6b3a', '#7a2f4f', '#244a4a']
/** Башни стеллажей по бокам + невозможные лестницы + солнечные столбы. */
function Hall() {
  const shelves = useMemo(() => {
    const r = rng(202), out: { x: number; y: number; w: number; h: number; c: string }[] = []
    for (const [x0, x1] of [[0, 330], [1590, 1920]]) for (let row = 0; row < 9; row++) {
      let x = x0 + 14
      const y = 40 + row * 118
      while (x < x1 - 20) { const w = 14 + r() * 20, h = 70 + r() * 30; out.push({ x, y: y + 96 - h, w, h, c: SPINE[Math.floor(r() * SPINE.length)] }); x += w + 2 }
    }
    return out
  }, [])
  return (
    <svg className="l-hall" viewBox="0 0 1920 1080" aria-hidden>
      <defs>
        <linearGradient id="l-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f6e9c9" /><stop offset=".55" stopColor="#ecd6a6" /><stop offset="1" stopColor="#d8b67c" /></linearGradient>
        <linearGradient id="l-shaft" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff8dc" stopOpacity=".75" /><stop offset="1" stopColor="#fff8dc" stopOpacity="0" /></linearGradient>
        <radialGradient id="l-dome" cx=".5" cy="0" r=".7"><stop offset="0" stopColor="#bfe3e6" /><stop offset="1" stopColor="#bfe3e6" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width="1920" height="1080" fill="url(#l-wall)" />
      <rect width="1920" height="600" fill="url(#l-dome)" opacity=".7" />
      {/* дальние ярусы галерей */}
      {[180, 330, 480].map((y, i) => <g key={y} opacity={0.25 + i * 0.12}><rect x="330" y={y} width="1260" height="10" fill="#7a5530" />
        {Array.from({ length: 22 }, (_, k) => <rect key={k} x={350 + k * 57} y={y - 60 + (k % 3) * 6} width="16" height={60 - (k % 3) * 6} fill={SPINE[(k + i) % SPINE.length]} opacity=".6" />)}</g>)}
      {/* невозможные лестницы */}
      <g className="l-stairs" fill="none" stroke="#7a5530" strokeWidth="5">
        <path d="M 360 620 l 40 0 l 0 -30 l 40 0 l 0 -30 l 40 0 l 0 -30 l 40 0 l 0 -30 l 40 0 l 0 -30 l 40 0" />
        <path d="M 1560 300 l -40 0 l 0 30 l -40 0 l 0 30 l -40 0 l 0 30 l -40 0 l 0 30" transform="rotate(180 1480 360)" />
        <path d="M 1300 760 l 30 30 l 30 0 l 30 30 l 30 0 l 30 30 l 30 0" transform="rotate(-90 1390 805)" />
      </g>
      <polygon points="700,0 980,0 1340,1080 760,1080" fill="url(#l-shaft)" opacity=".5" />
      <polygon points="1100,0 1220,0 1560,1080 1300,1080" fill="url(#l-shaft)" opacity=".3" />
      {/* башни стеллажей */}
      <rect x="0" y="0" width="330" height="1080" fill="#5a3a22" /><rect x="1590" y="0" width="330" height="1080" fill="#5a3a22" />
      {Array.from({ length: 9 }, (_, r) => <g key={r}><rect x="0" y={136 + r * 118} width="330" height="14" fill="#3e2716" /><rect x="1590" y={136 + r * 118} width="330" height="14" fill="#3e2716" /></g>)}
      {shelves.map((s, i) => <rect key={i} x={s.x} y={s.y} width={s.w} height={s.h} fill={s.c} rx="2" />)}
      <rect x="318" y="0" width="16" height="1080" fill="#3e2716" /><rect x="1586" y="0" width="16" height="1080" fill="#3e2716" />
    </svg>
  )
}
/** Пыль в солнечном столбе — единственное фоновое движение. */
function Dust() {
  const d = useMemo(() => { const r = rng(9); return Array.from({ length: 40 }, () => ({ x: 760 + r() * 420, y: r() * 1080, s: 1 + r() * 2.5, t: r() * 8 })) }, [])
  return <div className="l-dust">{d.map((p, i) => <i key={i} style={css({ left: p.x, top: p.y, width: p.s, height: p.s, '--t': `${p.t}s` })} />)}</div>
}

// ── таймер: страница-закладка. Каждую секунду строка рукописи испаряется; 10 с — чернила краснеют, край тлеет; ноль — страница переворачивается ──
function Timer({ left, total, phase, big }: TimerProps) {
  const N = 15, keep = Math.ceil((left / total) * N)
  return (
    <div className={`l-timer ph-${phase}${big ? ' big' : ''}`}>
      <div className="pg">
        {Array.from({ length: N }, (_, i) => <i key={i} className={i < N - keep ? 'gone' : ''} style={css({ '--w': `${55 + ((i * 37) % 40)}%` })} />)}
        <b>{left}</b>
      </div>
      <div className="back" />
    </div>
  )
}

function Lobby0() {
  return (
    <div className="l-lobby">
      <div className="l-title"><span className="l-tq">{GAME.title}</span><em>Библиотека открыта · ждём читателей</em></div>
      <div className="l-drawer">
        <div className="l-card">
          <div className="l-card-h">Читательский билет · {GAME.room}</div>
          <div className="l-card-b"><Qr size={260} ink="#2a1a10" />
            <ol>{GAME.steps.map((s, i) => <li key={i}><b>{i + 1}</b>{s}</li>)}</ol></div>
        </div>
      </div>
      <div className="l-shelf l0">
        {Array.from({ length: 12 }, (_, i) => <i key={i} className="ghost" style={css({ '--i': i })} />)}
        <span className="l-shelf-cap">Полка команд · пока пусто</span>
      </div>
      <div className="l-fly a" /><div className="l-fly b" />
    </div>
  )
}
function Lobby12({ sub }: { sub: string }) {
  const joined = sub === 'join'
  const n = TEAMS.filter(t => t.alive && (t.id !== JOINING || joined)).length
  return (
    <div className={`l-lobby l12 s-${sub}`}>
      <div className="l-title small"><span className="l-tq">{GAME.title}</span></div>
      <div className="l-mini"><Qr size={190} ink="#2a1a10" /><span>{GAME.room}</span></div>
      <div className="l-count">На полке <b>{n}</b> команд</div>
      <div className="l-display">
        {TEAMS.map((t, i) => {
          const late = t.id === JOINING
          return <div key={t.id} className={`l-cover${t.alive ? '' : ' off'}${late ? (joined ? ' late' : ' wait') : ''}`} style={css({ '--h': t.hue, '--i': i })}>
            <span>{t.name}</span>{!t.alive && <em>выдана, не вернулась</em>}
          </div>
        })}
      </div>
    </div>
  )
}

function Question({ left, phase, reveal }: { left: number; phase: ViewProps['phase']; reveal?: string }) {
  const ans = reveal === 'reveal'
  return (
    <div className={`l-q ph-${phase}${reveal ? ` ans a-${reveal}` : ''}`}>
      <div className="l-spread">
        <div className="l-pg left">
          <div className="l-run">Раунд {ROUND.n} · {ROUND.name}</div>
          <p className="l-qtext">{QUESTION.text.split(' ').map((w, i) => <Fragment key={i}>{i > 0 && ' '}<span style={css({ '--i': i })}>{w}</span></Fragment>)}</p>
          <svg className="l-illu" viewBox="0 0 300 200" aria-hidden>
            <path pathLength={1} d="M 40 170 L 260 170 M 70 170 L 90 90 L 210 90 L 230 170 M 100 90 Q 150 30 200 90 M 150 40 Q 140 20 150 6 Q 162 24 150 40" />
          </svg>
          {reveal && <div className={`l-verdict${ans ? ' on' : ''}`}>
            <b>Верно: Николай Гоголь</b><span>{QUESTION.fact}</span>
            <p>Угадали {RIGHT.length} из {ANSWERED}: {RIGHT.map(t => t.name).join(', ')}</p>
          </div>}
        </div>
        <div className="l-pg right">
          <div className="l-run r">вопрос {ROUND.q} из {ROUND.of}</div>
          <ol className="l-opts">{QUESTION.options.map((o, i) => {
            const ok = o.key === QUESTION.correct
            return <li key={o.key} className={ans ? (ok ? 'ok' : 'no') : ''} style={css({ '--i': i })}>
              <b>{o.key}</b><span>{o.text.split(' ').map((w, wi, arr) => <u key={wi}>{w.split('').map((ch, k) => <i key={k} style={css({ '--k': k + wi * 8 })}>{ch}</i>)}{wi < arr.length - 1 ? ' ' : ''}</u>)}</span>
              {reveal && <em>{Object.values(PICKS).filter(v => v === o.key).length}</em>}
            </li>
          })}</ol>
        </div>
      </div>
      {!reveal && <div className="l-tslot"><Timer left={left} total={QUESTION.total} phase={phase} /></div>}
    </div>
  )
}

// ── «Своя игра»: пять стопок книг на полках; книга = плитка, цена — на корешке ──
const JX = (c: number) => 470 + c * 245
function Jeopardy({ sub }: { sub: string }) {
  const oc = JP.open.theme, or = JP.open.tile
  return (
    <div className={`l-jp s-${sub}`} style={css({ '--ox': `${JX(oc)}px`, '--oy': `${250 + or * 140}px` })}>
      <div className="l-jtitle">Своя игра</div>
      {JP.themes.map((t, c) => (
        <div key={t.name} className="l-case" style={css({ left: JX(c) - 112 })}>
          <div className="l-plate"><b>{t.name}</b>{t.hint && <i>{t.hint}</i>}</div>
          {JP.values.map((v, r) => {
            const s = tileState(c, r, sub)
            return <div key={r} className={`l-vol ${s}`} style={css({ '--r': r, '--c': SPINE[(c * 2 + r) % SPINE.length] })}>
              {s !== 'played' && <><span className="band" /><b>{v}</b><span className="band" /></>}
              {s === 'played' && <span className="dust">выдана</span>}
            </div>
          })}
        </div>
      ))}
      <div className="l-open">
        <div className="l-op l"><span className="k">{JP.themes[oc].name}</span><b className="v">{JP.values[or]}</b><span className="cd">18</span><span className="cap">секунд · звучит фрагмент</span></div>
        <div className="l-op r"><span className="k">Ответили: {JP.answers.length}</span><ul>{JP.answers.map(a => <li key={a.team}>{team(a.team).name}</li>)}</ul></div>
      </div>
    </div>
  )
}

// ── «Угадай мелодию»: свитки партитур в четырёх нишах, на ленте — номер ──
function Melody({ sub, left, phase }: { sub: string; left: number; phase: ViewProps['phase'] }) {
  return (
    <div className={`l-mel s-${sub}`}>
      <div className="l-jtitle">Угадай мелодию</div>
      {MELODY.themes.map((t, c) => (
        <div key={t} className="l-niche" style={css({ left: 400 + c * 290 })}>
          <div className="l-plate"><b>{t}</b></div>
          {Array.from({ length: MELODY.tracks }, (_, r) => {
            const s = trackState(c, r, sub)
            return <div key={r} className={`l-scroll ${s}`} style={css({ '--r': r })}><i className="cap" /><span className="seal">{r + 1}</span><i className="cap" /></div>
          })}
        </div>
      ))}
      <div className="l-score">
        <svg viewBox="0 0 1200 160" aria-hidden className="staff">{[0, 1, 2, 3, 4].map(k => <line key={k} x1="0" x2="1200" y1={40 + k * 20} y2={40 + k * 20} />)}
          {Array.from({ length: 16 }, (_, k) => <g key={k} className="note" style={css({ '--k': k })}><ellipse cx={60 + k * 70} cy={60 + ((k * 7) % 5) * 10} rx="12" ry="9" /><line x1={72 + k * 70} y1={60 + ((k * 7) % 5) * 10} x2={72 + k * 70} y2={10 + ((k * 7) % 5) * 10} /></g>)}</svg>
        <div className="l-score-row">
          <div className="l-score-k">{MELODY.themes[MEL_C]} · трек {MEL_R + 1}</div>
          {sub === 'active' && <div className="l-score-t"><Timer left={left} total={30} phase={phase} /></div>}
        </div>
        {sub === 'active' ? <ol className="l-bids">{MELODY.bids.map((b, i) => <li key={b.team} className={i === 0 ? 'lead' : ''}><span>{team(b.team).name}</span><b>{b.sec} с</b></li>)}</ol>
          : <p className="l-note">{sub === 'board' ? 'Рулетка выбирает свиток…' : 'Печать сломана · слушаем 1 секунду…'}</p>}
      </div>
    </div>
  )
}

function TimerSheet({ sub, left }: { sub: string; left: number }) {
  if (sub === 'live') return <div className="l-tsheet live"><Timer left={left} total={30} phase={left <= 0 ? 'zero' : left <= 10 ? 'warning' : 'normal'} big /></div>
  return <div className="l-tsheet">{([[24, 'normal'], [7, 'warning'], [0, 'zero']] as const).map(([l, ph]) => <div key={ph}><Timer left={l} total={30} phase={ph} big /><span>{ph === 'normal' ? 'обычный отсчёт' : ph === 'warning' ? 'последние 10 секунд' : 'ноль'}</span></div>)}</div>
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
  return <div className={`l-root sc-${scene}`}><Hall /><Dust />{body}</div>
}

export const w2: World = {
  View, Timer,
  meta: {
    num: 2, name: 'Библиотека затерянных миров',
    idea: 'Бесконечная солнечная библиотека, где книги — двери в живые миры, а знание буквально перестраивает зал.',
    place: 'Светлый песочный зал под голубым куполом: башни ореховых стеллажей уходят за кадр, в глубине — ярусы галерей, лестницы ведут вбок и вверх ногами, через зал падают солнечные столбы с пылью.',
    laws: 'Знание меняет пространство. Чернила пишут сами, иллюстрации оживают линией. Неверный ответ выцветает и рассыпается буквами-пылью, верный подчёркивается золотой поталью. Книги сами вылетают с полок и раскрываются. Новая команда — книга, которая слетает с верхних ярусов на витрину.',
    materials: 'Песчаный камень и пергамент, орех полок, корешки — бирюза, кармин, кобальт, охра. Золотая поталь только на верном. Свет — дневной, тёплый, с пылью.',
    timer: 'Страница-закладка с рукописью: каждые 2 секунды строка испаряется, число — крупно чернилами. 10 с — чернила краснеют, край страницы тлеет. Ноль — страница переворачивается чистой стороной.',
    jp: 'Пять шкафов-тем, в каждом стопка из пяти книг: цена — золотом на корешке, дороже — толще. Сыгранная — пустое место с контуром пыли и пометкой «выдана». Выбор — книга выезжает из полки. Вопрос — книга раскрывается разворотом посреди зала, шкафы видны вокруг.',
    melody: 'Свитки партитур в четырёх нишах-темах, номер — на сургучной печати. Сыгранный — со сломанной печатью. Выбор — печать трескается, свиток приподнимается. Трек играет — партитура разворачивается над залом, ноты бегут по нотному стану, ниже — ставки команд.',
    teams: 'Команда — книга лицом на витрине, название на обложке, цвет — кожа переплёта. Потерявшая связь — «выдана, не вернулась». Новая команда слетает с верхних ярусов и встаёт на полку.',
    type: 'Kurale (заголовки — книжная антиква) и Literata (текст) — шрифты для чтения с листа.',
  },
}
