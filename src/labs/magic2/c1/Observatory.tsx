// ═══ CONCEPT 1 · «Обсерватория» ═══
// Свет в тёмном пространстве, но как МИР: мы внутри купола обсерватории.
// Небо — бархат с неподвижными звёздами, по куполу идут латунные рёбра,
// через кадр проходят кольца огромной армиллярной сферы. Информация — это
// свет: вопрос пишется лучом, связи — световые нити, ответ — фокус линзы.
// Переживают переходы: купол, кольца (их положение = фаза игры), дуга
// времени над горизонтом и звёзды команд.
import { useMemo, type CSSProperties } from 'react'
import { Qr, CityEngraving, InventionEngraving, replay, type ScreenProps } from '../common'
import {
  TEAMS, JOINING, META, Q_TEXT, Q_DENSE, Q_MATCH, pairOf, MATCH_ANSWERS, JP, SCRAMBLE, LAST, RANKED, total, placeOf, ROUND_NAMES,
} from '../data'
import { rng } from '../../../lib/anagram'
import type { ConceptMeta } from '../concepts'

export const meta: ConceptMeta = {
  num: 1,
  name: 'Обсерватория',
  idea: 'Мы внутри тёмного купола: всё, что знает игра, становится светом на небе.',
  world: 'Купол обсерватории изнутри. Бархатное небо с неподвижными звёздами, латунные рёбра свода, кольца гигантской армиллярной сферы, тёмный парапет-горизонт внизу.',
  materials: [
    ['Свет', 'то, что игрок должен прочесть сейчас: вопрос, ответ, связи; рождается тёплым и остывает до слоновой кости'],
    ['Латунь (армилла, рёбра, дуга)', 'структура и время: фаза игры, таймер, рамки слайдов'],
    ['Слоновая кость (медальоны, карточка QR)', 'то, что можно «взять в руки»: буквы вариантов, номера, QR'],
    ['Бархат неба', 'среда; никогда не несёт информацию'],
  ],
  persists: 'Купол и горизонт не исчезают никогда. Кольца армиллы поворачиваются в новое положение на каждой фазе (лобби → вопрос → ответ → финал). Звёзды команд из лобби ждут на горизонте и поднимаются в финале. Дуга времени живёт над горизонтом на всех вопросах.',
  behaves: 'Свет пишет вопрос; звезда загорается, когда команда подключается, и кольцо проворачивается на одно деление; лучи находят пары и стягивают подписи к картинкам; плитка «Своей игры» — окуляр, к которому подлетает камера; в финале все кольца сходятся в сферу.',
  timer: 'Звёздный круг стал дугой меридиана над горизонтом: комета идёт слева направо и гасит деления. 10 с — над горизонтом встаёт тлеющий рассвет, деления краснеют. Ноль — комета заходит за край дуги, вспыхивает кольцо, небо на миг темнеет.',
  teams: 'Команда — звезда с цветом спектра (цвет только в ядре звезды, имя всегда слоновой костью). Отвалившаяся — серая звезда с пунктирной связью.',
  type: 'Только EB Garamond (+ фрактурная Q логотипа). Цифры — с маюскульными цифрами и табличной шириной (lnum/tnum); служебное — капителью с разрядкой. Гротеск не нужен ни для чего.',
}

const W = 1920, H = 1080
const roman = ['I', 'II', 'III']

/** Неподвижное небо: детерминированные звёзды (без мерцания — магия должна быть редкой). */
function Sky() {
  const stars = useMemo(() => {
    const r = rng(1913)
    return Array.from({ length: 260 }, () => ({ x: r() * W, y: r() * H * 0.86, s: r() < 0.08 ? 1.9 : r() < 0.4 ? 1.2 : 0.7, o: 0.25 + r() * 0.6 }))
  }, [])
  return (
    <svg className="c1-sky" viewBox={`0 0 ${W} ${H}`} aria-hidden>
      <defs>
        <radialGradient id="c1-band" cx="0.62" cy="0.18" r="0.7"><stop offset="0" stopColor="#3a2c55" stopOpacity=".55" /><stop offset="1" stopColor="#3a2c55" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width={W} height={H} fill="url(#c1-band)" />
      {stars.map((s, i) => <circle key={i} cx={s.x} cy={s.y} r={s.s} fill="#f3ead6" opacity={s.o} />)}
    </svg>
  )
}

/** Рёбра купола: сходятся к зениту за кадром — даёт объём и «где мы». */
function Dome() {
  const ribs = Array.from({ length: 13 }, (_, i) => -60 + i * 10)
  return (
    <svg className="c1-dome" viewBox={`0 0 ${W} ${H}`} aria-hidden>
      {ribs.map(a => {
        const x = W / 2 + Math.tan((a * Math.PI) / 180) * 1500
        return <path key={a} d={`M ${W / 2} -900 Q ${W / 2 + (x - W / 2) * 0.55} 300 ${x} ${H + 40}`} />
      })}
      {[260, 560, 860].map(y => <path key={y} d={`M -100 ${y + 120} Q ${W / 2} ${y - 160} ${W + 100} ${y + 120}`} className="c1-dome-par" />)}
    </svg>
  )
}

/** Армиллярная сфера: три кольца; их поза = фаза игры (persist). */
function Armilla({ scene, sub, joined }: { scene: string; sub: string; joined: number }) {
  const pose = scene === 'final' && sub !== 'last' ? 'sphere' : scene
  return (
    <div className={`c1-arm pose-${pose}`} style={{ '--notch': joined } as CSSProperties} aria-hidden>
      <svg viewBox="-600 -600 1200 1200">
        <g className="c1-ring r1"><ellipse rx="560" ry="560" /><g className="c1-notches">{Array.from({ length: 48 }, (_, i) => <line key={i} x1="560" y1="0" x2={i % 4 ? 548 : 536} y2="0" transform={`rotate(${i * 7.5})`} />)}</g></g>
        <g className="c1-ring r2"><ellipse rx="560" ry="560" /></g>
        <g className="c1-ring r3"><ellipse rx="560" ry="560" /></g>
        <circle className="c1-core" r="9" />
      </svg>
    </div>
  )
}

/** Таймер: дуга меридиана над горизонтом, комета гасит деления. */
function TimeArc({ left, total: T, phase, on }: { left: number; total: number; phase: string; on: boolean }) {
  const x0 = 420, x1 = 1500, y = 74, sag = 26
  const pt = (t: number) => ({ x: x0 + (x1 - x0) * t, y: y + sag * (1 - (2 * t - 1) ** 2) * -1 + sag })
  const p = Math.min(1, Math.max(0, 1 - left / T))
  const head = pt(p)
  return (
    <div className={`c1-time ph-${phase}${on ? ' on' : ''}`} aria-hidden={!on}>
      <svg viewBox={`0 0 ${W} 160`}>
        <path className="c1-time-arc" d={`M ${x0} ${y + sag} Q ${W / 2} ${y - sag} ${x1} ${y + sag}`} />
        {Array.from({ length: T + 1 }, (_, i) => {
          const q = pt(i / T)
          return <circle key={i} cx={q.x} cy={q.y} r={i % 5 ? 2.4 : 3.6} className={`c1-tick${i / T < p ? ' out' : ''}`} />
        })}
        <g className="c1-comet" style={{ transform: `translate(${head.x}px, ${head.y}px)` }}>
          <circle r="22" className="c1-comet-halo" /><circle r="6.5" className="c1-comet-core" />
        </g>
        <circle cx={x1} cy={y + sag} r="10" className="c1-time-set" />
      </svg>
      <span className="c1-time-num">{left}</span>
    </div>
  )
}

function Words({ text, k, base = 0, step = 0.075 }: { text: string; k: string; base?: number; step?: number }) {
  let i = 0
  return <>{text.split(/(\s+)/).map((w, j) => /^\s+$/.test(w) ? w : <span key={`${k}-${j}`} className="c1-w" style={{ animationDelay: `${base + step * i++}s` }}>{w}</span>)}</>
}

const hueStar = (h: number) => `hsl(${h} 70% 78%)`

/** Звёзды команд. lobby: созвездие по эллипсу; final: поднимаются; иначе — ждут у горизонта. */
function TeamStars({ scene, sub, play }: { scene: string; sub: string; play: number }) {
  const mode = scene === 'lobby' ? 'lobby' : scene === 'final' && sub !== 'last' ? 'final' : 'rest'
  const joined = scene !== 'lobby' || sub === 'join'
  const winner = RANKED[0].id
  const pos = (i: number, id: string) => {
    if (mode === 'lobby') {
      // созвездие 4 × 3 справа от лампы с QR: шаг 300 px — длинным именам есть куда переноситься
      const col = i % 4, row = Math.floor(i / 4)
      return { x: 700 + col * 300 + (row % 2) * 70, y: 560 + row * 150 + ((col * 37) % 3) * 14 }
    }
    if (mode === 'final') {
      if (sub === 'results') { const r = RANKED.findIndex(t => t.id === id); return { x: 1680, y: 240 + r * 58 } }
      const place = placeOf(TEAMS[i])
      if (place === 1) return { x: W / 2, y: 470 }
      if (place === 2) return { x: W / 2 - 520, y: 600 }
      if (place === 3) return { x: W / 2 + 520, y: 600 }
      const a = (i / 12) * Math.PI * 2
      return { x: W / 2 + Math.cos(a) * 820, y: 420 + Math.sin(a) * 300 }
    }
    return { x: 140 + i * 149, y: 1046 }
  }
  const pts = TEAMS.map((t, i) => ({ t, ...pos(i, t.id) }))
  return (
    <div className={`c1-stars mode-${mode} sub-${sub}`}>
      <svg viewBox={`0 0 ${W} ${H}`} className="c1-links" aria-hidden>
        {mode === 'lobby' && pts.slice(1).map((p, i) => {
          const a = pts[i], late = p.t.id === JOINING
          if (late && !joined) return null
          return <line key={replay(play, 'l', i, String(late && sub))} x1={a.x} y1={a.y} x2={p.x} y2={p.y}
            className={`c1-link${!p.t.alive || !a.t.alive ? ' weak' : ''}${late ? ' draw' : ''}`} />
        })}
        {mode === 'final' && sub === 'winner' && pts.filter(p => p.t.id !== winner).map(p => (
          <line key={replay(play, 'w', p.t.id)} x1={p.x} y1={p.y} x2={W / 2} y2={470} className="c1-link draw slow" />
        ))}
      </svg>
      {pts.map(({ t, x, y }) => {
        const hidden = t.id === JOINING && !joined
        const place = placeOf(t)
        return (
          <div key={t.id} className={`c1-star${t.alive ? '' : ' off'}${t.id === JOINING && sub === 'join' ? ' joining' : ''}${hidden ? ' hidden' : ''}${t.id === winner ? ' win' : ''} pl-${place}`}
            style={{ transform: `translate(${x}px, ${y}px)`, '--sc': hueStar(t.hue), transitionDelay: `${mode === 'final' ? (12 - place) * 0.08 : 0}s` } as CSSProperties}>
            <span className="c1-star-core" />
            <span className="c1-star-name">{t.name}{!t.alive && <i> · переподключается</i>}</span>
          </div>
        )
      })}
    </div>
  )
}

function Meta({ round, q, of, extra }: { round: number; q: number; of: number; extra?: string }) {
  return (
    <div className="c1-meta">
      <span>Раунд {round} · {ROUND_NAMES[round - 1]}</span>
      <span>Вопрос <b>{q}</b> из {of}{extra ? ` · ${extra}` : ''}</span>
    </div>
  )
}

function HostKeys({ keys }: { keys: string[] }) {
  return <div className="c1-host">{keys.map(k => <span key={k}>{k}</span>)}</div>
}

// ── 01 ЛОББИ ──
function Lobby({ sub, play }: { sub: string; play: number }) {
  const n = TEAMS.filter(t => t.alive && (t.id !== JOINING || sub === 'join')).length
  return (
    <div className="c1-lobby" key={replay(play, 'lobby')}>
      <h1 className="c1-logo"><span className="c1-q">Q</span>uiz Party</h1>
      <div className="c1-count">{n} {n % 10 === 1 && n !== 11 ? 'команда' : 'команд'} на небе</div>
      <div className="c1-lamp" aria-hidden />
      <figure className="c1-qrcard">
        <Qr size={232} ink="#1b1426" />
        <figcaption>Камерой телефона —<br />и вы в игре</figcaption>
      </figure>
    </div>
  )
}

// ── 02 ТЕКСТОВЫЙ ВОПРОС ──
function TextQ({ play, timer }: { play: number; timer: string }) {
  return (
    <div className={`c1-textq tm-${timer}`}>
      <Meta round={META.round} q={META.q} of={META.of} />
      <p className="c1-qtext" key={replay(play, 'tq')}><span><Words text={Q_TEXT} k="tq" base={0.3} /></span></p>
      <HostKeys keys={['← Назад', 'Показать ответ', 'Дальше →']} />
    </div>
  )
}

// ── 03 ПЛОТНЫЙ ВОПРОС ──
function DenseQ({ play, timer }: { play: number; timer: string }) {
  return (
    <div className={`c1-dense tm-${timer}`}>
      <Meta round={META.round} q={5} of={META.of} />
      <p className="c1-dtext" key={replay(play, 'dq')}><Words text={Q_DENSE.text} k="dq" base={0.2} step={0.05} /></p>
      <div className="c1-slides">
        {Q_DENSE.media.map((m, i) => (
          <figure key={m.cap} className="c1-slide" style={{ animationDelay: `${0.5 + i * 0.25}s` }}>
            <div className="c1-slide-img"><CityEngraving era={m.kind} /></div>
            <figcaption>{m.cap}</figcaption>
          </figure>
        ))}
      </div>
      <ol className="c1-opts">
        {Q_DENSE.choices.map((c, i) => (
          <li key={c.key} style={{ animationDelay: `${0.9 + i * 0.12}s` }}><span className="c1-seal">{c.key}</span>{c.text}</li>
        ))}
      </ol>
      <HostKeys keys={['← Назад', 'Показать ответ', 'Дальше →']} />
    </div>
  )
}

// ── 04 СОПОСТАВЛЕНИЕ ──
const MX = [480, 800, 1120, 1440]
function Match({ sub, play }: { sub: string; play: number }) {
  const solved = sub === 'solved'
  const labelX = (j: number) => {
    const key = Q_MATCH.right[j]
    if (!solved) return MX[j]
    const i = Q_MATCH.left.findIndex(l => pairOf(l) === key)
    return MX[i]
  }
  return (
    <div className={`c1-match${solved ? ' solved' : ''}`} key={replay(play, 'm')}>
      <div className="c1-meta"><span>Раунд 2 · ответы</span><span>Вопрос <b>1</b> из 7</span></div>
      <p className="c1-recall">{Q_MATCH.text}</p>
      {Q_MATCH.items.map((it, i) => (
        <figure key={it} className="c1-mslide" style={{ left: MX[i] - 140 }}>
          <div className="c1-slide-img"><InventionEngraving kind={it} /></div>
          <span className="c1-seal c1-mnum">{i + 1}</span>
        </figure>
      ))}
      <svg className="c1-beams" viewBox={`0 0 ${W} ${H}`} aria-hidden>
        {solved && Q_MATCH.left.map((l, i) => {
          const j = Q_MATCH.right.indexOf(pairOf(l))
          return <path key={l} className="c1-beam" style={{ animationDelay: `${0.15 + i * 0.32}s` }}
            d={`M ${MX[i]} 572 C ${MX[i]} 650, ${MX[j]} 640, ${MX[j]} 716`} />
        })}
        {solved && MX.map((x, i) => <line key={i} x1={x} y1="572" x2={x} y2="716" className="c1-thread" style={{ animationDelay: `${2.3 + i * 0.1}s` }} />)}
      </svg>
      {Q_MATCH.right.map((r, j) => (
        <div key={r} className="c1-mlabel" style={{ transform: `translateX(${labelX(j) - 150}px)`, transitionDelay: `${1.5 + j * 0.12}s` }}>
          <span className="c1-seal">{r}</span>{Q_MATCH.right_labels[j]}
        </div>
      ))}
      {solved && <div className="c1-pairs">{Q_MATCH.left.map(l => <span key={l} style={{ left: MX[Number(l) - 1] - 60 }}>{l} — {pairOf(l)}</span>)}</div>}
      <div className="c1-tanswers">
        <span className="c1-tlabel">Ответы команд</span>
        {MATCH_ANSWERS.map((a, i) => {
          const t = TEAMS.find(x => x.id === a.team)!
          return <span key={a.team} className={`c1-ta${solved ? (a.ok ? ' ok' : ' no') : ''}`} style={{ '--sc': hueStar(t.hue), transitionDelay: `${3 + i * 0.1}s` } as CSSProperties}>
            <i />{t.name}<b>{solved ? (a.ok ? '✓' : '✗') : ''}</b></span>
        })}
      </div>
      <HostKeys keys={['← Назад', solved ? 'Следующий вопрос →' : 'Показать ответ']} />
    </div>
  )
}

// ── 05 СВОЯ ИГРА ──
function Jeopardy({ sub, play }: { sub: string; play: number }) {
  const open = sub !== 'board'
  const ans = sub === 'answer'
  const { theme: ot, tile: oi } = JP.open
  const cx = (c: number) => 960 + (c - 2) * 300
  const cy = (r: number) => 330 + r * 150
  return (
    <div className={`c1-jp sub-${sub}`}>
      <div className="c1-jp-board">
        {JP.themes.map((t, c) => (
          <div key={t.name} className="c1-jp-theme" style={{ left: cx(c) - 140 }}>{t.name}{t.hint && <i>{t.hint}</i>}</div>
        ))}
        {JP.themes.map((_, c) => JP.values.map((v, r) => {
          const done = JP.played.includes(`${c}-${r}`)
          const sel = c === ot && r === oi
          return (
            <div key={`${c}-${r}`} className={`c1-port${done ? ' done' : ''}${sel ? ' sel' : ''}`} style={{ left: cx(c) - 62, top: cy(r) - 62 }}>
              <span>{done ? '' : v}</span>
            </div>
          )
        }))}
      </div>
      <div className="c1-lens" key={replay(play, 'lens', String(open))} aria-hidden={!open}>
        <div className="c1-lens-glass">
          <div className="c1-lens-head"><span>{JP.themes[ot].name}</span><b>{JP.values[oi]}</b></div>
          <div className="c1-lens-hint">{JP.themes[ot].hint} · звучит трек</div>
          <div className={`c1-lens-answer${ans ? ' on' : ''}`}><span className="c1-tlabel">Правильный ответ</span>{JP.correct}</div>
          <ol className="c1-lens-list">
            {JP.answers.map((a, i) => {
              const t = TEAMS.find(x => x.id === a.team)!
              return <li key={a.team} className={ans ? (a.ok ? 'ok' : 'no') : ''} style={{ '--sc': hueStar(t.hue), transitionDelay: `${0.8 + i * 0.15}s` } as CSSProperties}>
                <i />{t.name}<em>{ans ? a.text : '• • •'}</em><b>{ans ? (a.ok ? '✓' : '✗') : `${a.sec.toFixed(1)} с`}</b></li>
            })}
          </ol>
          <svg className="c1-lens-ring" viewBox="-100 -100 200 200" aria-hidden>
            <circle r="96" className="c1-lens-track" />
            <circle r="96" className="c1-lens-left" style={{ strokeDashoffset: ans ? 603 : 603 * (1 - 18 / 30) }} />
          </svg>
          <div className="c1-lens-num">{ans ? '' : 18}</div>
        </div>
      </div>
      <HostKeys keys={sub === 'board' ? ['Следующий раунд →'] : ans ? ['↻ Переслушать', 'Закрыть плитку'] : ['Показать ответ', '↻ Переслушать', 'Закрыть плитку']} />
    </div>
  )
}

// ── 06 ФИНАЛ ──
function Final({ sub, play }: { sub: string; play: number }) {
  const w = RANKED[0]
  return (
    <div className={`c1-final sub-${sub}`}>
      {sub === 'last' && <div className="c1-last" key={replay(play, 'last')}>
        <div className="c1-meta"><span>Раунд {LAST.round} · ответы</span><span>Вопрос <b>{LAST.q}</b> из {LAST.of}</span></div>
        <p className="c1-recall">{LAST.text}</p>
        <div className="c1-answer"><span className="c1-tlabel">Правильный ответ</span><span className="c1-answer-main">{LAST.answer}</span></div>
      </div>}
      {sub === 'transition' && <div className="c1-final-cap" key={replay(play, 'tr')}>Игра окончена. Небо собирается.</div>}
      {sub === 'winner' && <div className="c1-winner" key={replay(play, 'win')}>
        <span className="c1-tlabel">Победитель вечера</span>
        <h2><Words text={w.name} k="wn" base={0.6} step={0.18} /></h2>
        <b>{total(w)} очков</b>
        {RANKED.slice(1, 3).map((t, i) => (
          <div key={t.id} className={`c1-podium p${i + 2}`}><span>{roman[i + 1]}</span>{t.name}<b>{total(t)}</b></div>
        ))}
      </div>}
      {sub === 'results' && <div className="c1-results" key={replay(play, 'res')}>
        <h2>Звёздная карта вечера</h2>
        <table>
          <thead><tr><th /><th>Команда</th>{ROUND_NAMES.map((r, i) => <th key={r} title={r}>{i + 1}</th>)}<th>Σ</th></tr></thead>
          <tbody>{RANKED.map((t, i) => (
            <tr key={t.id} className={placeOf(t) <= 3 ? 'top' : ''} style={{ animationDelay: `${0.2 + (11 - i) * 0.09}s` }}>
              <td>{placeOf(t)}</td><td><i style={{ '--sc': hueStar(t.hue) } as CSSProperties} />{t.name}</td>
              {t.score.map((s, j) => <td key={j}>{s}</td>)}<td>{total(t)}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>}
    </div>
  )
}

// ── 07 СКРЭМБЛ ──
function Scramble({ sub, play }: { sub: string; play: number }) {
  const { tiles, template, order } = SCRAMBLE
  const n = tiles.length
  // клетки ответа в строку (слова через промежуток)
  const slots: { x: number; idx: number }[] = []
  let x = 0
  template.words.forEach((w, wi) => { w.forEach(c => { if (c.kind === 'letter') { slots.push({ x, idx: c.idx }) } x += 86 }); if (wi < template.words.length - 1) x += 50 })
  const ox = 960 - x / 2 + 43
  const slotX = (letterIdx: number) => ox + slots.find(s => s.idx === letterIdx)!.x
  const open = new Set(sub === 'hints' ? SCRAMBLE.hints : sub === 'solved' ? order.map((_, p) => order[p]) : [])
  return (
    <div className={`c1-scr sub-${sub}`}>
      <div className="c1-meta"><span>Раунд 6 · Скрэмбл</span><span>Вопрос <b>1</b> из 3</span></div>
      <p className="c1-dtext">{SCRAMBLE.clue}</p>
      <div className="c1-scr-slots">{slots.map(s => <span key={s.idx} style={{ left: ox + s.x - 36 }} />)}</div>
      {tiles.map((ch, p) => {
        const li = order[p]
        const a = (p / n) * Math.PI * 2
        const free = { x: 960 + Math.cos(a) * 470, y: 520 + Math.sin(a) * 150 }
        const placed = open.has(li)
        const to = placed ? { x: slotX(li), y: 820 } : free
        return <span key={replay(play, 'tile', p)} className={`c1-tile${placed ? ' placed' : ''}`}
          style={{ transform: `translate(${to.x - 36}px, ${to.y - 44}px)`, transitionDelay: `${placed && sub === 'solved' ? (li * 0.07) : 0}s` }}>{ch}</span>
      })}
      <HostKeys keys={sub === 'solved' ? ['Следующий вопрос →'] : ['Показать ответ']} />
    </div>
  )
}

export function Screen({ scene, sub, left, timer, play }: ScreenProps) {
  const joined = TEAMS.filter(t => t.alive && (scene !== 'lobby' || t.id !== JOINING || sub === 'join')).length
  const timed = scene === 'text' || scene === 'dense'
  return (
    <div className={`c1 scene-${scene} sub-${sub} tm-${timed ? timer : 'none'}`}>
      <Sky />
      <div className="c1-dawn" aria-hidden />
      <Dome />
      <Armilla scene={scene} sub={sub} joined={joined} />
      <TimeArc left={left} total={META.timer} phase={timer} on={timed} />
      <div className="c1-content">
        {scene === 'lobby' && <Lobby sub={sub} play={play} />}
        {scene === 'text' && <TextQ play={play} timer={timer} />}
        {scene === 'dense' && <DenseQ play={play} timer={timer} />}
        {scene === 'match' && <Match sub={sub} play={play} />}
        {scene === 'jp' && <Jeopardy sub={sub} play={play} />}
        {scene === 'final' && <Final sub={sub} play={play} />}
        {scene === 'scramble' && <Scramble sub={sub} play={play} />}
      </div>
      <TeamStars scene={scene} sub={sub} play={play} />
      <div className="c1-horizon" aria-hidden />
    </div>
  )
}
