// ═══ WORLD 04 · «Архипелаг невозможного» ═══
// Яркое дневное небо, парящие острова, водопады, которые текут вверх. Закон:
// гравитация — это выбор. Верное поднимается, неверное тонет в облаках; новые
// команды всплывают из облачного моря и причаливают.
import { Fragment, useMemo } from 'react'
import { rng } from '../../lib/anagram'
import { Qr } from '../magic2/common'
import { GAME, ROUND, QUESTION, PICKS, RIGHT, ANSWERED, TEAMS, JOINING, JP, MELODY, team, tileState, trackState, MEL_C, MEL_R, css, type ViewProps, type TimerProps, type World } from './content'

/** Остров: травяная шапка + перевёрнутая скала + (по желанию) водопад вверх. */
export function Isle({ w = 200, hue = 110, fall = false, cls = '' }: { w?: number; hue?: number; fall?: boolean; cls?: string }) {
  const h = w * 0.62
  return (
    <svg className={`a-isle ${cls}`} viewBox="0 0 200 124" style={{ width: w, height: h }} aria-hidden>
      <path d="M 6 30 C 30 26 60 24 100 24 C 140 24 170 26 194 30 C 186 50 160 70 140 84 C 124 96 112 118 100 122 C 88 114 76 96 62 84 C 40 70 14 50 6 30 Z" fill="#b8805c" />
      <path d="M 40 40 C 70 70 90 90 100 122 C 110 90 130 66 160 40 C 130 56 70 56 40 40 Z" fill="#8a5a44" />
      <path d="M 70 46 l 6 22 M 120 50 l -8 26 M 96 56 l 2 30" stroke="#6e4434" strokeWidth="3" />
      <ellipse cx="100" cy="27" rx="96" ry="14" fill={`hsl(${hue} 55% 55%)`} />
      <ellipse cx="100" cy="23" rx="90" ry="10" fill={`hsl(${hue} 60% 66%)`} />
      {fall && <g className="upfall"><rect x="150" y="-200" width="12" height="230" rx="6" /><rect x="152" y="-200" width="4" height="230" className="hi" /></g>}
    </svg>
  )
}
function Sky() {
  const c = useMemo(() => { const r = rng(404); return Array.from({ length: 9 }, () => ({ x: r() * 1920, y: 60 + r() * 600, s: .6 + r() * .9, t: r() * 40 })) }, [])
  return (
    <>
      <div className="a-sky" />
      <div className="a-sun" />
      {c.map((p, i) => <div key={i} className="a-cloud" style={css({ left: p.x, top: p.y, '--s': p.s, '--t': `-${p.t}s` })} />)}
      <div className="a-far a1"><Isle w={220} hue={150} fall /></div><div className="a-far a2"><Isle w={150} hue={80} /></div><div className="a-far a3"><Isle w={180} hue={200} fall /></div>
      <div className="a-sea" />
    </>
  )
}

// ── таймер: перевёрнутые часы. Вода из нижней колбы течёт ВВЕРХ; 10 с — вода коралловая; ноль — часы переворачиваются ──
function Timer({ left, total, phase, big }: TimerProps) {
  const p = Math.max(0, Math.min(1, left / total))
  return (
    <div className={`a-timer ph-${phase}${big ? ' big' : ''}`}>
      <div className="glass">
        <svg viewBox="0 0 120 200" aria-hidden>
          <defs><clipPath id="a-bulbs"><path d="M 14 10 C 14 70 52 86 56 100 C 52 114 14 130 14 190 L 106 190 C 106 130 68 114 64 100 C 68 86 106 70 106 10 Z" /></clipPath></defs>
          <g clipPath="url(#a-bulbs)">
            <rect className="wb" x="0" y={190 - p * 88} width="120" height={p * 88 + 2} />
            <rect className="wt" x="0" y="10" width="120" height={(1 - p) * 88} />
            {p > 0 && p < 1 && <rect className="stream" x="57" y="40" width="6" height="140" />}
          </g>
          <path className="outline" d="M 14 10 C 14 70 52 86 56 100 C 52 114 14 130 14 190 L 106 190 C 106 130 68 114 64 100 C 68 86 106 70 106 10 Z" />
          <rect x="4" y="2" width="112" height="10" rx="5" className="cap" /><rect x="4" y="188" width="112" height="10" rx="5" className="cap" />
        </svg>
      </div>
      <b>{left}</b>
    </div>
  )
}

function Lobby0() {
  return (
    <div className="a-lobby">
      <h1 className="a-title">{GAME.title.split('').map((ch, i) => <span key={i} style={css({ '--i': i })}>{ch === ' ' ? ' ' : ch}</span>)}</h1>
      <div className="a-main"><Isle w={640} hue={120} />
        <div className="a-sign"><Qr size={250} ink="#1e2a5a" /><span>{GAME.room}</span></div></div>
      <ol className="a-steps">{GAME.steps.map((s, i) => <li key={i} style={css({ '--i': i })}><Isle w={120} hue={[40, 190, 300][i]} /><span><b>{i + 1}</b>{s}</span></li>)}</ol>
      <div className="a-docks">{Array.from({ length: 12 }, (_, i) => <i key={i} style={css({ '--i': i })} />)}</div>
      <div className="a-wait">Причалов: 12 · свободно все</div>
    </div>
  )
}
function Lobby12({ sub }: { sub: string }) {
  const joined = sub === 'join'
  const n = TEAMS.filter(t => t.alive && (t.id !== JOINING || joined)).length
  return (
    <div className={`a-lobby l12 s-${sub}`}>
      <h1 className="a-title small">{GAME.title}</h1>
      <div className="a-qr-mini"><Qr size={180} ink="#1e2a5a" /><span>{GAME.room}</span></div>
      <div className="a-count"><b>{n}</b> островов причалило</div>
      <div className="a-fleet">
        {TEAMS.map((t, i) => {
          const late = t.id === JOINING
          return <div key={t.id} className={`a-team${t.alive ? '' : ' off'}${late ? (joined ? ' late' : ' wait') : ''}`} style={css({ '--i': i, '--dy': `${(i % 2) * 26}px` })}>
            <span className="flag" style={css({ '--h': t.hue })}>{t.name}{!t.alive && <em>улетел в туман</em>}</span>
            <Isle w={170} hue={t.alive ? t.hue : 0} />
          </div>
        })}
      </div>
    </div>
  )
}

const AX = [380, 760, 1140, 1520]
function Question({ left, phase, reveal }: { left: number; phase: ViewProps['phase']; reveal?: string }) {
  const ans = reveal === 'reveal'
  return (
    <div className={`a-q ph-${phase}${reveal ? ` ans a-${reveal}` : ''}`}>
      <div className="a-cloudcard">
        <div className="a-head"><span>Раунд {ROUND.n} · {ROUND.name}</span><span>вопрос {ROUND.q} из {ROUND.of}</span></div>
        <p className="a-qtext">{QUESTION.text.split(' ').map((w, i) => <Fragment key={i}>{i > 0 && ' '}<span style={css({ '--i': i })}>{w}</span></Fragment>)}</p>
        {reveal && <div className={`a-verdict${ans ? ' on' : ''}`}><b>Верно: Николай Гоголь</b> · {QUESTION.fact}<p>Угадали {RIGHT.length} из {ANSWERED}: {RIGHT.map(t => t.name).join(' · ')}</p></div>}
      </div>
      {!reveal && <div className="a-tslot"><Timer left={left} total={QUESTION.total} phase={phase} /></div>}
      {QUESTION.options.map((o, i) => {
        const ok = o.key === QUESTION.correct
        return <div key={o.key} className={`a-opt${ans ? (ok ? ' ok' : ' no') : ''}`} style={css({ left: AX[i], '--i': i, '--h': [30, 200, 300, 150][i] })}>
          <span className="sign"><b>{o.key}</b>{o.text}{reveal && <em>{Object.values(PICKS).filter(v => v === o.key).length}</em>}</span>
          <Isle w={260} hue={[60, 110, 170, 30][i]} fall={ans && ok} />
        </div>
      })}
    </div>
  )
}

// ── «Своя игра»: пять цепочек островов-тем; остров тем крупнее, чем дороже ──
const JX = (c: number) => 330 + c * 315, JY = (r: number) => 300 + r * 145
function Jeopardy({ sub }: { sub: string }) {
  const oc = JP.open.theme, or = JP.open.tile
  return (
    <div className={`a-jp s-${sub}`} style={css({ '--ox': `${JX(oc)}px`, '--oy': `${JY(or)}px` })}>
      <div className="a-jt">Своя игра</div>
      {JP.themes.map((t, c) => <div key={t.name} className="a-theme" style={css({ left: JX(c), '--h': [20, 200, 280, 330, 150][c] })}><b>{t.name}</b>{t.hint && <i>{t.hint}</i>}</div>)}
      {JP.themes.map((_, c) => JP.values.map((v, r) => {
        const s = tileState(c, r, sub)
        return <div key={`${c}-${r}`} className={`a-tile ${s}`} style={css({ left: JX(c), top: JY(r), '--r': r })}>
          {s === 'played' ? <span className="ring" /> : <><Isle w={130 + r * 18} hue={[20, 200, 280, 330, 150][c]} fall={s === 'sel'} /><b>{v}</b></>}
        </div>
      }))}
      <div className="a-stage">
        <Isle w={1000} hue={20} fall />
        <div className="a-stage-card">
          <span className="k">{JP.themes[oc].name} · {JP.values[or]}</span><b className="cd">18</b><span className="cap">секунд · звучит фрагмент</span>
          <span className="k2">Ответили: {JP.answers.length}</span><ul>{JP.answers.map(a => <li key={a.team}>{team(a.team).name}</li>)}</ul>
        </div>
      </div>
    </div>
  )
}

// ── «Угадай мелодию»: четыре острова-темы, к каждому привязаны воздушные шары-треки ──
function Melody({ sub, left, phase }: { sub: string; left: number; phase: ViewProps['phase'] }) {
  return (
    <div className={`a-mel s-${sub}`}>
      <div className="a-jt left">Угадай мелодию</div>
      {MELODY.themes.map((t, c) => (
        <div key={t} className="a-port" style={css({ left: 380 + c * 300 })}>
          {Array.from({ length: MELODY.tracks }, (_, r) => {
            const s = trackState(c, r, sub)
            return <div key={r} className={`a-bal ${s}`} style={css({ '--r': r, '--h': [8, 45, 200, 290][r], left: 18 + r * 52, '--bob': `${(r * .7 + c * .3).toFixed(2)}s` })}>
              <span className="string" /><span className="ball"><b>{r + 1}</b></span>
            </div>
          })}
          <Isle w={240} hue={[110, 170, 40, 300][c]} />
          <div className="name">{t}</div>
        </div>
      ))}
      <div className="a-board">
        <span className="k">{MELODY.themes[MEL_C]} · трек {MEL_R + 1}</span>
        {sub === 'active' ? <div className="row"><div className="t"><Timer left={left} total={30} phase={phase} /></div>
          <div><h3>Ставки команд</h3><ol>{MELODY.bids.map((b, i) => <li key={b.team} className={i === 0 ? 'lead' : ''}><span>{team(b.team).name}</span><b>{b.sec} с</b></li>)}</ol></div></div>
          : <p>{sub === 'board' ? 'Ветер выбирает шар…' : 'Шар отвязался · слушаем 1 секунду…'}</p>}
      </div>
    </div>
  )
}

function TimerSheet({ sub, left }: { sub: string; left: number }) {
  if (sub === 'live') return <div className="a-tsheet live"><Timer left={left} total={30} phase={left <= 0 ? 'zero' : left <= 10 ? 'warning' : 'normal'} big /></div>
  return <div className="a-tsheet">{([[24, 'normal'], [7, 'warning'], [0, 'zero']] as const).map(([l, ph]) => <div key={ph}><Timer left={l} total={30} phase={ph} big /><span>{ph === 'normal' ? 'обычный отсчёт' : ph === 'warning' ? 'последние 10 секунд' : 'ноль'}</span></div>)}</div>
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
  return <div className={`a-root sc-${scene} ph-${phase}`}><Sky />{body}</div>
}

export const w4: World = {
  View, Timer,
  meta: {
    num: 4, name: 'Архипелаг невозможного',
    idea: 'Яркое дневное небо с парящими островами, где гравитация — дело вкуса: водопады текут вверх, верное поднимается, неверное тонет в облаках.',
    place: 'Персиково-голубое небо, тёплое солнце, облачное море внизу. Острова с травяной шапкой и перевёрнутой скалой, водопады, бьющие в небо. Много воздуха и цвета.',
    laws: 'Гравитация — выбор. Новая команда всплывает островом из облачного моря и причаливает. Верный вариант взлетает, и из него бьёт водопад вверх; неверные тяжелеют и тонут в облаках. Выбранный остров «Своей игры» поднимается и становится сценой вопроса. Шар-трек отвязывается и улетает.',
    materials: 'Небо, облака, трава, терракотовая скала, бирюзовая вода. Текст — тёмно-синим на белых облаках и вывесках. Никакого тёмного фона.',
    timer: 'Перевёрнутые песочные часы: вода из нижней колбы течёт вверх, число — крупно рядом. 10 с — вода становится коралловой. Ноль — нижняя колба пуста, часы переворачиваются.',
    jp: 'Пять цепочек островов-тем: чем дороже вопрос, тем больше остров. Сыгранный — только кольцо облака на месте упавшего острова. Выбор — остров поднимается, и из него бьёт водопад вверх. Вопрос — остров приближается и становится огромной сценой, на ней — облако с вопросом.',
    melody: 'Четыре острова-темы, к каждому привязаны четыре воздушных шара с номерами треков. Сыгранный — лопнувший шар, одна верёвка. Выбор — шар покачивается и отвязывается. Трек играет — шар висит над доской, ставки — на облаке.',
    teams: 'Команда — свой островок с флагом-названием. Улетевший в туман — бесцветный. Новая команда всплывает из облаков, раскачивается и встаёт к причалу.',
    type: 'Comfortaa — округлый, светлый, читается издалека; заголовки — им же, крупно и жирно.',
  },
}
