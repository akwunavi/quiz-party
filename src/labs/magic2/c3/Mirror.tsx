// ═══ CONCEPT 3 · «Тёмная вода» ═══
// Мир — неподвижный чёрный бассейн в каменном зале, вид низко над водой.
// Всё, что знает игра, лежит НА ДНЕ и всплывает к поверхности, когда
// приходит время; у всего на воде есть отражение. Команды — плавучие
// фонари. Время — латунные водяные часы (клепсидра), вода в них уходит.
// Переживают переходы: гладь и её горизонт, латунный бортик, клепсидра,
// фонари команд (дрейфуют к краю, но не тонут).
import type { CSSProperties, ReactNode } from 'react'
import { Qr, CityEngraving, InventionEngraving, replay, type ScreenProps } from '../common'
import {
  TEAMS, JOINING, META, Q_TEXT, Q_DENSE, Q_MATCH, pairOf, MATCH_ANSWERS, JP, SCRAMBLE, LAST, RANKED, total, placeOf, ROUND_NAMES,
} from '../data'
import type { ConceptMeta } from '../concepts'

export const meta: ConceptMeta = {
  num: 3,
  name: 'Тёмная вода',
  idea: 'Знание лежит на дне зеркального бассейна и всплывает, когда приходит его время.',
  world: 'Каменный зал без стен, в нём неподвижная чёрная вода до горизонта. Мы смотрим низко над гладью. Латунный бортик у ближнего края, туман у дальнего.',
  materials: [
    ['Обсидиановая гладь', 'среда и сцена; на ней всё отражается — отражение говорит «это настоящее, это здесь»'],
    ['Глубина (затопленное)', 'скрытое: неоткрытые плитки, неразобранные буквы, будущий ответ — видно, но мутно'],
    ['Латунь бортика и клепсидры', 'структура и время: раунд, номер вопроса, водяные часы'],
    ['Свет фонарей', 'команды; цвет — только в пламени, имена — костью'],
    ['Серебро поверхности', 'всплывшая истина: ответ, связи, победитель'],
  ],
  persists: 'Гладь, горизонт и латунный бортик не исчезают никогда. Клепсидра стоит у правого края на всех вопросах и в финале выпускает последнюю воду. Фонари команд из лобби отплывают к краям и возвращаются в финале. Вопрос не «сменяется» — старый уходит под воду, новый всплывает.',
  behaves: 'Подключилась команда — к фонарю на воде добавляется ещё один, по глади идут круги. Вопрос всплывает со дна и обретает отражение. Пары сопоставления сносит течением под их картинки. Плитка «Своей игры» поднимается из глубины плитой. Нуль — капля падает из клепсидры, и по всему бассейну проходит одно кольцо.',
  timer: 'Звёздный круг стал клепсидрой: вода опускается по латунной шкале. 10 с — вода темнеет до ember, шкала тлеет, гладь бассейна чуть мутнеет. Ноль — последняя капля, кольцо по воде, вода в часах уходит полностью.',
  teams: 'Команда — плавучий латунный фонарь; цвет команды — только цвет пламени. Отвалившаяся — фонарь погас и чуть накренился.',
  type: 'Только EB Garamond. Строчные курсивом для «отражённого» (напоминание вопроса, подписи), прямые для того, что всплыло. Капитель для бортика. Никакого гротеска.',
}

const flame = (h: number) => `hsl(${h} 85% 66%)`

/** Отражение: копия содержимого под ватерлинией, перевёрнутая и размытая. */
function Reflect({ children, cls = '', style }: { children: ReactNode; cls?: string; style?: CSSProperties }) {
  return (
    <div className={`c3-obj ${cls}`} style={style}>
      <div className="c3-real">{children}</div>
      <div className="c3-mirror" aria-hidden>{children}</div>
    </div>
  )
}

function Pool({ ripple }: { ripple: string }) {
  return (
    <div className="c3-pool" aria-hidden>
      <div className="c3-hall" />
      <div className="c3-fog" />
      <div className="c3-water"><div className="c3-sheen" /></div>
      <div className="c3-ring" key={ripple} />
      <div className="c3-rim" />
    </div>
  )
}

function Clepsydra({ left, total: T, phase, on }: { left: number; total: number; phase: string; on: boolean }) {
  const lvl = Math.max(0, left / T)
  return (
    <div className={`c3-clep ph-${phase}${on ? ' on' : ''}`} aria-hidden={!on}>
      <div className="c3-clep-glass"><div className="c3-clep-water" style={{ height: `${lvl * 100}%` }} /></div>
      <div className="c3-clep-scale">{[30, 20, 10, 0].map(v => <span key={v} style={{ bottom: `${(v / T) * 100}%` }}>{v}</span>)}</div>
      <div className="c3-drop" />
      <b className="c3-clep-num">{left}</b>
    </div>
  )
}

function Rim({ left, right, on }: { left: string; right: string; on: boolean }) {
  return <div className={`c3-rimtext${on ? ' on' : ''}`}><span>{left}</span><span>{right}</span></div>
}

function Host({ keys }: { keys: string[] }) {
  return <div className="c3-host">{keys.map(k => <span key={k}>{k}</span>)}</div>
}

function Surface({ text, k, base = 0, step = 0.06 }: { text: string; k: string; base?: number; step?: number }) {
  let i = 0
  return <>{text.split(/(\s+)/).map((w, j) => /^\s+$/.test(w) ? w : <span key={`${k}-${j}`} className="c3-w" style={{ animationDelay: `${base + step * i++}s` }}>{w}</span>)}</>
}

function Lantern({ t, style, cls = '', label = true }: { t: typeof TEAMS[number]; style?: CSSProperties; cls?: string; label?: boolean }) {
  return (
    <div className={`c3-lant${t.alive ? '' : ' off'} ${cls}`} style={{ '--fl': flame(t.hue), ...style } as CSSProperties}>
      <span className="c3-lant-body"><i /></span>
      <span className="c3-lant-glow" />
      {label && <span className="c3-lant-name">{t.name}{!t.alive && <em>фонарь погас · переподключается</em>}</span>}
    </div>
  )
}

/** Фонари команд: лобби — на воде рядами; вопросы — отплыли к краям; финал — сплываются. */
function Lanterns({ scene, sub }: { scene: string; sub: string }) {
  if (scene === 'lobby') return null
  const fin = scene === 'final' && (sub === 'winner' || sub === 'transition')
  return (
    <div className={`c3-fleet${fin ? ' gather' : ''}`}>
      {TEAMS.map((t, i) => {
        const side = i % 2 ? 1 : -1
        const k = Math.floor(i / 2)
        const tight = scene === 'dense' || scene === 'match'
        const pos = fin
          ? { x: 960 + side * (260 + k * 120), y: 990 + k * 6, s: 0.9 - k * 0.07 }
          : tight
            ? { x: 960 + side * (905 + k * 4), y: 1004 - k * 26, s: 0.4 + k * 0.02 }
            : { x: 960 + side * (790 + k * 26), y: 778 + k * 34, s: 0.55 + k * 0.08 }
        return <Lantern key={t.id} t={t} label={false} style={{ transform: `translate(${pos.x}px, ${pos.y}px) scale(${pos.s})`, transitionDelay: `${i * 0.06}s` }} />
      })}
    </div>
  )
}

// ── 01 ЛОББИ ──
function Lobby({ sub, play }: { sub: string; play: number }) {
  const n = TEAMS.filter(t => t.alive && (t.id !== JOINING || sub === 'join')).length
  // фонари на воде: три ряда в перспективе (дальше — меньше)
  const rows = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11]]
  return (
    <div className={`c3-lobby sub-${sub}`} key={replay(play, 'lobby')}>
      <Reflect cls="c3-logo"><h1><span className="c3-q">Q</span>uiz Party</h1></Reflect>
      <div className="c3-plinth"><Qr size={228} ink="#121019" /><span>Наведите камеру —<br />ваш фонарь спустят на воду</span></div>
      <div className="c3-count">на воде <b>{n}</b> фонарей</div>
      {rows.map((r, ri) => r.map((idx, ci) => {
        const t = TEAMS[idx]
        if (t.id === JOINING && sub !== 'join') return null
        const s = 0.8 + ri * 0.1
        const x = 720 + ci * (290 + ri * 20) - ri * 30 + (ri % 2) * 50
        const y = 600 + ri * 160
        return <Lantern key={t.id} t={t} cls={t.id === JOINING ? 'launch' : ''} style={{ transform: `translate(${x}px, ${y}px) scale(${s})` }} />
      }))}
      {sub === 'join' && <div className="c3-launch-ring" style={{ left: 720 + 3 * 330 - 60 + 50 - 80, top: 920 - 20 }} />}
    </div>
  )
}

// ── 02 ТЕКСТ ──
function TextQ({ play, timer }: { play: number; timer: string }) {
  return (
    <div className={`c3-textq tm-${timer}`} key={replay(play, 'tq')}>
      <Reflect cls="c3-qtext"><p><Surface text={Q_TEXT} k="tq" base={0.5} /></p></Reflect>
      <Host keys={['← Назад', 'Показать ответ', 'Дальше →']} />
    </div>
  )
}

// ── 03 ПЛОТНЫЙ ──
function DenseQ({ play, timer }: { play: number; timer: string }) {
  return (
    <div className={`c3-dense tm-${timer}`} key={replay(play, 'dq')}>
      <p className="c3-dtext"><Surface text={Q_DENSE.text} k="dq" base={0.2} step={0.04} /></p>
      <div className="c3-frames">
        {Q_DENSE.media.map((m, i) => (
          <Reflect key={m.cap} cls="c3-frame" style={{ animationDelay: `${0.3 + i * 0.2}s` }}>
            <div className="c3-frame-in"><CityEngraving era={m.kind} /><span>{m.cap}</span></div>
          </Reflect>
        ))}
      </div>
      <div className="c3-opts">
        {Q_DENSE.choices.map((c, i) => <div key={c.key} className="c3-opt" style={{ animationDelay: `${0.9 + i * 0.1}s` }}><b>{c.key}</b>{c.text}</div>)}
      </div>
      <Host keys={['← Назад', 'Показать ответ', 'Дальше →']} />
    </div>
  )
}

// ── 04 СОПОСТАВЛЕНИЕ ──
const MX = [480, 800, 1120, 1440]
function Match({ sub, play }: { sub: string; play: number }) {
  const solved = sub === 'solved'
  const xOf = (j: number) => solved ? MX[Q_MATCH.left.findIndex(l => pairOf(l) === Q_MATCH.right[j])] : MX[j]
  return (
    <div className={`c3-match${solved ? ' solved' : ''}`} key={replay(play, 'm')}>
      <p className="c3-recall">{Q_MATCH.text}</p>
      {Q_MATCH.items.map((it, i) => (
        <Reflect key={it} cls="c3-mframe" style={{ left: MX[i] - 140 }}>
          <div className="c3-frame-in"><InventionEngraving kind={it} /></div>
          <b className="c3-mnum">{i + 1}</b>
        </Reflect>
      ))}
      <svg className="c3-currents" viewBox="0 0 1920 1080" aria-hidden>
        {solved && Q_MATCH.right.map((r, j) => {
          const to = xOf(j)
          return <path key={r} d={`M ${MX[j]} 800 C ${MX[j]} 760, ${to} 790, ${to} 748`} style={{ animationDelay: `${0.1 + j * 0.15}s` }} />
        })}
      </svg>
      {Q_MATCH.right.map((r, j) => (
        <div key={r} className="c3-leaf" style={{ transform: `translateX(${xOf(j) - 150}px)`, transitionDelay: `${0.5 + j * 0.15}s` }}>
          <b>{r}</b>{Q_MATCH.right_labels[j]}
        </div>
      ))}
      {solved && <div className="c3-pairs">{Q_MATCH.left.map((l, i) => <span key={l} style={{ left: MX[i] - 60, animationDelay: `${2.4 + i * 0.1}s` }}>{l} · {pairOf(l)}</span>)}</div>}
      <div className="c3-tanswers">
        {MATCH_ANSWERS.map((a, i) => {
          const t = TEAMS.find(x => x.id === a.team)!
          return <span key={a.team} style={{ '--fl': flame(t.hue) } as CSSProperties}><i />{t.name}{solved && <b className={a.ok ? 'ok' : 'no'} style={{ animationDelay: `${3 + i * .1}s` }}>{a.ok ? '✓' : '✗'}</b>}</span>
        })}
      </div>
      <Host keys={['← Назад', solved ? 'Следующий вопрос →' : 'Показать ответ']} />
    </div>
  )
}

// ── 05 СВОЯ ИГРА: плиты на дне; открытая поднимается из воды ──
function Jeopardy({ sub, play }: { sub: string; play: number }) {
  const ans = sub === 'answer'
  const { theme: ot, tile: oi } = JP.open
  return (
    <div className={`c3-jp sub-${sub}`}>
      <div className="c3-floor">
        {JP.themes.map((t, c) => <div key={t.name} className="c3-theme" style={{ gridColumn: c + 1 }}>{t.name}{t.hint && <i>{t.hint}</i>}</div>)}
        {JP.themes.map((_, c) => JP.values.map((v, r) => {
          const done = JP.played.includes(`${c}-${r}`)
          const sel = c === ot && r === oi
          return <div key={`${c}-${r}`} className={`c3-slab${done ? ' done' : ''}${sel ? ' sel' : ''}`} style={{ gridColumn: c + 1, gridRow: r + 2 }}>{done ? '' : v}</div>
        }))}
      </div>
      <Reflect cls="c3-stele" key={replay(play, 'st', String(sub !== 'board'))}>
        <div className="c3-stele-in">
          <div className="c3-stele-head"><span>{JP.themes[ot].name}<i>{JP.themes[ot].hint}</i></span><b>{JP.values[oi]}</b></div>
          <div className="c3-stele-count">{ans ? 'ответы по скорости' : 'звучит трек · 18 с'}</div>
          <ol>{JP.answers.map((a, i) => {
            const t = TEAMS.find(x => x.id === a.team)!
            return <li key={a.team} className={ans ? (a.ok ? 'ok' : 'no') : ''} style={{ '--fl': flame(t.hue), animationDelay: `${0.9 + i * .12}s` } as CSSProperties}>
              <i />{t.name}<em>{ans ? a.text : '• • •'}</em><b>{ans ? (a.ok ? '✓' : '✗') : `${a.sec.toFixed(1)} с`}</b></li>
          })}</ol>
          <div className={`c3-stele-answer${ans ? ' on' : ''}`}><span>правильный ответ</span>{JP.correct}</div>
        </div>
      </Reflect>
      <Host keys={sub === 'board' ? ['Следующий раунд →'] : ans ? ['↻ Переслушать', 'Закрыть плитку'] : ['Показать ответ', '↻ Переслушать', 'Закрыть плитку']} />
    </div>
  )
}

// ── 06 ФИНАЛ ──
function Final({ sub, play }: { sub: string; play: number }) {
  const w = RANKED[0]
  return (
    <div className={`c3-final sub-${sub}`}>
      {sub === 'last' && <div key={replay(play, 'last')}>
        <p className="c3-recall">{LAST.text}</p>
        <Reflect cls="c3-answer"><span className="c3-alabel">правильный ответ</span><b>{LAST.answer}</b></Reflect>
      </div>}
      {sub === 'transition' && <div className="c3-still" key={replay(play, 'tr')}>Вода успокаивается</div>}
      {sub === 'winner' && <div key={replay(play, 'w')}>
        <Reflect cls="c3-winner"><span className="c3-alabel">из глубины поднимается победитель</span><h2>{w.name}</h2><b>{total(w)} очков</b></Reflect>
        <div className="c3-champ"><Lantern t={w} label={false} style={{ transform: 'scale(2.2)' }} /></div>
        {RANKED.slice(1, 3).map((t, i) => <div key={t.id} className={`c3-podium p${i + 2}`}><span>{i + 2}-е место</span>{t.name}<b>{total(t)}</b></div>)}
      </div>}
      {sub === 'results' && <div className="c3-results" key={replay(play, 'r')}>
        <h2>Что осталось на воде</h2>
        <table>
          <thead><tr><th /><th>Команда</th>{ROUND_NAMES.map((r, i) => <th key={r} title={r}>{i + 1}</th>)}<th>Σ</th></tr></thead>
          <tbody>{RANKED.map((t, i) => (
            <tr key={t.id} className={placeOf(t) <= 3 ? 'top' : ''} style={{ animationDelay: `${0.2 + i * 0.1}s` }}>
              <td>{placeOf(t)}</td><td><i style={{ '--fl': flame(t.hue) } as CSSProperties} />{t.name}</td>{t.score.map((s, j) => <td key={j}>{s}</td>)}<td>{total(t)}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>}
    </div>
  )
}

// ── 07 СКРЭМБЛ: буквы лежат на дне россыпью и всплывают на свои места ──
function Scramble({ sub, play }: { sub: string; play: number }) {
  const { tiles, template, order } = SCRAMBLE
  const slots: { x: number; idx: number }[] = []
  let x = 0
  template.words.forEach((wd, wi) => { wd.forEach(c => { if (c.kind === 'letter') slots.push({ x, idx: c.idx }); x += 84 }); if (wi < template.words.length - 1) x += 48 })
  const ox = 960 - x / 2 + 42
  const open = new Set(sub === 'hints' ? SCRAMBLE.hints : sub === 'solved' ? order : [])
  return (
    <div className={`c3-scr sub-${sub}`}>
      <p className="c3-dtext">{SCRAMBLE.clue}</p>
      {tiles.map((ch, p) => {
        const li = order[p]
        const up = open.has(li)
        const s = slots.find(q => q.idx === li)!
        const dx = 300 + ((p * 211) % 1320), dy = 820 + ((p * 53) % 160)
        return <span key={replay(play, 't', p)} className={`c3-glyph${up ? ' up' : ''}`}
          style={{ transform: up ? `translate(${ox + s.x - 36}px, 470px)` : `translate(${dx}px, ${dy}px) scale(.8)`, transitionDelay: `${up && sub === 'solved' ? s.x / 1500 : 0}s` }}>
          <b>{ch}</b><b className="c3-glyph-m" aria-hidden>{ch}</b></span>
      })}
      <Host keys={sub === 'solved' ? ['Следующий вопрос →'] : ['Показать ответ']} />
    </div>
  )
}

export function Screen({ scene, sub, left, timer, play }: ScreenProps) {
  const timed = scene === 'text' || scene === 'dense'
  const rim: Record<string, [string, string]> = {
    text: [`Раунд ${META.round} · ${META.roundName}`, `вопрос ${META.q} из ${META.of}`],
    dense: [`Раунд ${META.round} · ${META.roundName}`, `вопрос 5 из ${META.of}`],
    match: ['Раунд 2 · ответы', 'вопрос 1 из 7'],
    jp: ['Раунд 3 · Своя игра', sub === 'board' ? 'выбирайте тему' : `${JP.themes[JP.open.theme].name} · ${JP.values[JP.open.tile]}`],
    scramble: ['Раунд 6 · Скрэмбл', 'вопрос 1 из 3'],
    final: sub === 'last' ? [`Раунд ${LAST.round} · ответы`, `вопрос ${LAST.q} из ${LAST.of}`] : ['Quiz Party', 'финал вечера'],
  }
  // одно кольцо по воде — только на событиях (подключение, ноль, открытие, ответ, победитель)
  const ripple = `${scene}-${sub}-${timer === 'zero' ? 'z' : ''}-${play}`
  return (
    <div className={`c3 scene-${scene} sub-${sub} tm-${timed ? timer : 'none'}`}>
      <Pool ripple={ripple} />
      <Rim on={scene !== 'lobby'} left={(rim[scene] ?? ['', ''])[0]} right={(rim[scene] ?? ['', ''])[1]} />
      <Clepsydra left={timed ? left : scene === 'final' && sub !== 'last' ? 0 : META.timer} total={META.timer} phase={timed ? timer : scene === 'final' && sub !== 'last' ? 'zero' : 'normal'} on={timed || (scene === 'final' && sub === 'transition')} />
      <Lanterns scene={scene} sub={sub} />
      <div className="c3-content">
        {scene === 'lobby' && <Lobby sub={sub} play={play} />}
        {scene === 'text' && <TextQ play={play} timer={timer} />}
        {scene === 'dense' && <DenseQ play={play} timer={timer} />}
        {scene === 'match' && <Match sub={sub} play={play} />}
        {scene === 'jp' && <Jeopardy sub={sub} play={play} />}
        {scene === 'final' && <Final sub={sub} play={play} />}
        {scene === 'scramble' && <Scramble sub={sub} play={play} />}
      </div>
    </div>
  )
}
