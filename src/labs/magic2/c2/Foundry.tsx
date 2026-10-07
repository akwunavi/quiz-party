// ═══ CONCEPT 2 · «Словолитня» ═══
// Магия — это набор: информация становится осязаемым металлом. Мы смотрим
// сверху на тёмный камень наборного стола. Вопрос сам набирается латунными
// литерами, ответ печатается на бумаге (бумага — только для истины),
// команды — литые шпоны с эмалью в наборной кассе. Переживают переходы:
// камень, верстатка с выходными данными и колесо литер-таймер, рама (заключка).
import type { CSSProperties } from 'react'
import { Qr, CityEngraving, InventionEngraving, replay, type ScreenProps } from '../common'
import {
  TEAMS, JOINING, META, Q_TEXT, Q_DENSE, Q_MATCH, pairOf, MATCH_ANSWERS, JP, SCRAMBLE, LAST, RANKED, total, placeOf, ROUND_NAMES,
} from '../data'
import type { ConceptMeta } from '../concepts'

export const meta: ConceptMeta = {
  num: 2,
  name: 'Словолитня',
  idea: 'Магия — это набор: вопросы сами отливаются в латунь, ответы печатаются.',
  world: 'Вид сверху на тёмный камень наборного стола под одной лампой. На нём латунная верстатка, рама с клиньями, деревянная касса, галеры с оттисками. Всё, с чем играют, — литой металл.',
  materials: [
    ['Литая латунь', 'игровые объекты: литеры вопроса, варианты, шпоны команд, числа, колесо времени'],
    ['Тёмный камень', 'среда: стол, на котором всё собирается; не несёт информации'],
    ['Лакированное дерево', 'вместилища: наборная касса («Своя игра»), галеры с картинками'],
    ['Бумага и типографская краска', 'истина: правильный ответ, оттиск победителя, итоговая афиша; появляется только когда что-то решено'],
  ],
  persists: 'Камень не меняется весь вечер. Верстатка сверху несёт раунд и номер вопроса; колесо литер справа отсчитывает время. Угольники рамы обнимают любой контент. Шпоны команд из лобби уезжают в кассу и возвращаются в раму в финале.',
  behaves: 'Литеры сами падают в строку; подключилась команда — её шпон падает в кассу и касса вздрагивает; пары сопоставления встают на места и запираются латунными линейками; плитка «Своей игры» выезжает ящиком из кассы; правильный ответ всегда печатается на полосе бумаги; финал — набор всей вечерней афиши и оттиск.',
  timer: 'Звёздный круг стал колесом из 30 литер: каждая секунда переворачивает литеру «ногой» вверх. 10 с — оставшиеся литеры раскаляются. Ноль — в колесо входит клин, в центре оттискивается красный «0».',
  teams: 'Команда — латунный шпон с её именем и эмалевой вставкой цвета команды. Отвалившаяся — окисленный, накренённый шпон. Имя никогда не красится цветом.',
  type: 'Только EB Garamond: латунные литеры — им же с тиснением, бумажные оттиски — им же чёрной краской. Капитель для служебного. Фрактурная Q — латунная литера логотипа.',
}

const W = 1920
const enamel = (h: number) => `hsl(${h} 46% 42%)`

function Stone({ scene, sub }: { scene: string; sub: string }) {
  return (
    <div className={`c2-stone sc-${scene}`} aria-hidden>
      <svg className="c2-grain" viewBox="0 0 1920 1080" preserveAspectRatio="none">
        <filter id="c2-noise"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4" /><feColorMatrix values="0 0 0 0 .5  0 0 0 0 .45  0 0 0 0 .55  0 0 0 .16 0" /></filter>
        <filter id="c2-vein"><feTurbulence type="fractalNoise" baseFrequency=".004 .012" numOctaves="4" seed="11" /><feColorMatrix values="0 0 0 0 .7  0 0 0 0 .62  0 0 0 0 .78  0 0 0 -1.6 .9" /></filter>
        <rect width="1920" height="1080" filter="url(#c2-vein)" opacity=".18" />
        <rect width="1920" height="1080" filter="url(#c2-noise)" />
      </svg>
      <div className="c2-lamp" />
      <div className={`c2-heat${sub ? '' : ''}`} />
    </div>
  )
}

/** Латунная литера (кегельная шпона с очком буквы). */
function Sort({ ch, size = 1, cls = '', style }: { ch: string; size?: number; cls?: string; style?: CSSProperties }) {
  return <span className={`c2-sort ${cls}`} style={{ '--s': size, ...style } as CSSProperties}><b>{ch}</b></span>
}

/** Верстатка сверху: раунд и номер вопроса «набраны» — переживает переходы. */
function Stick({ left, right, on }: { left: string; right: string; on: boolean }) {
  return (
    <div className={`c2-stick${on ? ' on' : ''}`} aria-hidden={!on}>
      <span className="c2-stick-l">{left}</span><span className="c2-stick-r">{right}</span>
    </div>
  )
}

/** Колесо литер — таймер. 30 литер, каждая секунда переворачивает одну. */
function TypeWheel({ left, total: T, phase, on }: { left: number; total: number; phase: string; on: boolean }) {
  const gone = T - left
  return (
    <div className={`c2-wheel ph-${phase}${on ? ' on' : ''}`} aria-hidden={!on}>
      {Array.from({ length: T }, (_, i) => (
        <span key={i} className={`c2-wsort${i < gone ? ' out' : ''}`} style={{ transform: `rotate(${i * (360 / T)}deg) translateY(-104px)` }} />
      ))}
      <span className="c2-wquoin" />
      <span className="c2-wnum">{left}</span>
    </div>
  )
}

function Chase({ pose }: { pose: string }) {
  return <div className={`c2-chase pose-${pose}`} aria-hidden>{['tl', 'tr', 'bl', 'br'].map(c => <i key={c} className={c} />)}</div>
}

function Host({ keys }: { keys: string[] }) {
  return <div className="c2-host">{keys.map(k => <span key={k}>{k}</span>)}</div>
}

function SetWords({ text, k, base = 0, step = 0.06 }: { text: string; k: string; base?: number; step?: number }) {
  let i = 0
  return <>{text.split(/(\s+)/).map((w, j) => /^\s+$/.test(w) ? w : <span key={`${k}-${j}`} className="c2-w" style={{ animationDelay: `${base + step * i++}s` }}>{w}</span>)}</>
}

/** Шпон команды: литая планка с именем и эмалевой вставкой. */
function Slug({ t, cls = '', style, small }: { t: typeof TEAMS[number]; cls?: string; style?: CSSProperties; small?: boolean }) {
  return (
    <span className={`c2-slug${t.alive ? '' : ' off'}${small ? ' sm' : ''} ${cls}`} style={{ '--en': enamel(t.hue), ...style } as CSSProperties}>
      <i className="c2-enamel" /><b>{t.name}</b>{!t.alive && <em>переподключается</em>}
    </span>
  )
}

// ── 01 ЛОББИ ──
function Lobby({ sub, play }: { sub: string; play: number }) {
  const n = TEAMS.filter(t => t.alive && (t.id !== JOINING || sub === 'join')).length
  return (
    <div className={`c2-lobby sub-${sub}`} key={replay(play, 'lobby')}>
      <div className="c2-logo">
        {'QUIZ PARTY'.split('').map((ch, i) => ch === ' ' ? <span key={i} className="c2-space" /> :
          <Sort key={i} ch={ch} size={i === 0 ? 1.25 : 1} cls={i === 0 ? 'q' : ''} style={{ animationDelay: `${0.1 + i * 0.09}s` }} />)}
      </div>
      <figure className="c2-proof">
        <span className="c2-clip" />
        <Qr size={236} ink="#16100c" />
        <figcaption>Наведите камеру —<br />и ваша команда в наборе</figcaption>
      </figure>
      <div className="c2-case">
        {TEAMS.map(t => {
          const hidden = t.id === JOINING && sub !== 'join'
          return <div key={t.id} className={`c2-cell${hidden ? ' empty' : ''}${t.id === JOINING && sub === 'join' ? ' drop' : ''}`}>{!hidden && <Slug t={t} />}</div>
        })}
        <div className="c2-case-label">в наборе: <b>{n}</b></div>
      </div>
    </div>
  )
}

// ── 02 ТЕКСТОВЫЙ ВОПРОС ──
function TextQ({ play, timer }: { play: number; timer: string }) {
  return (
    <div className={`c2-textq tm-${timer}`}>
      <p className="c2-qtext" key={replay(play, 'tq')}><span><SetWords text={Q_TEXT} k="tq" base={0.4} /></span></p>
      <Host keys={['← Назад', 'Показать ответ', 'Дальше →']} />
    </div>
  )
}

// ── 03 ПЛОТНЫЙ ──
function DenseQ({ play, timer }: { play: number; timer: string }) {
  return (
    <div className={`c2-dense tm-${timer}`}>
      <p className="c2-dtext" key={replay(play, 'dq')}><SetWords text={Q_DENSE.text} k="dq" base={0.2} step={0.04} /></p>
      <div className="c2-galleys">
        {Q_DENSE.media.map((m, i) => (
          <figure key={m.cap} className="c2-galley" style={{ animationDelay: `${0.4 + i * 0.2}s` }}>
            <div className="c2-galley-in"><CityEngraving era={m.kind} /></div>
            <figcaption>{m.cap}</figcaption>
          </figure>
        ))}
      </div>
      <div className="c2-opts">
        {Q_DENSE.choices.map((c, i) => (
          <div key={c.key} className="c2-opt" style={{ animationDelay: `${0.8 + i * 0.1}s` }}><Sort ch={c.key} size={.6} /><span>{c.text}</span></div>
        ))}
      </div>
      <Host keys={['← Назад', 'Показать ответ', 'Дальше →']} />
    </div>
  )
}

// ── 04 СОПОСТАВЛЕНИЕ ──
const MX = [480, 800, 1120, 1440]
function Match({ sub, play }: { sub: string; play: number }) {
  const solved = sub === 'solved'
  const xOf = (j: number) => {
    if (!solved) return MX[j]
    const i = Q_MATCH.left.findIndex(l => pairOf(l) === Q_MATCH.right[j])
    return MX[i]
  }
  return (
    <div className={`c2-match${solved ? ' solved' : ''}`} key={replay(play, 'm')}>
      <p className="c2-recall">{Q_MATCH.text}</p>
      {Q_MATCH.items.map((it, i) => (
        <figure key={it} className="c2-mgal" style={{ left: MX[i] - 140 }}>
          <div className="c2-galley-in"><InventionEngraving kind={it} /></div>
          <Sort ch={String(i + 1)} size={.55} cls="c2-mnum" />
        </figure>
      ))}
      <div className="c2-channel" />
      {MX.map((x, i) => <span key={i} className="c2-rule" style={{ left: x - 5, animationDelay: `${2.2 + i * 0.12}s` }} />)}
      {Q_MATCH.right.map((r, j) => (
        <div key={r} className="c2-mslug" style={{ transform: `translateX(${xOf(j) - 150}px)`, transitionDelay: `${0.5 + j * 0.15}s` }}>
          <Sort ch={r} size={.55} /><span>{Q_MATCH.right_labels[j]}</span>
        </div>
      ))}
      {solved && <div className="c2-strip"><span>Правильно:</span>{Q_MATCH.left.map(l => <b key={l}>{l}—{pairOf(l)}</b>)}</div>}
      <div className="c2-tanswers">
        {MATCH_ANSWERS.map((a, i) => {
          const t = TEAMS.find(x => x.id === a.team)!
          return <span key={a.team} className="c2-tag" style={{ '--en': enamel(t.hue) } as CSSProperties}>
            <i />{t.name}{solved && <b className={a.ok ? 'ok' : 'no'} style={{ animationDelay: `${3.2 + i * 0.12}s` }}>{a.ok ? '✓' : '✗'}</b>}</span>
        })}
      </div>
      <Host keys={['← Назад', solved ? 'Следующий вопрос →' : 'Показать ответ']} />
    </div>
  )
}

// ── 05 СВОЯ ИГРА ──
function Jeopardy({ sub, play }: { sub: string; play: number }) {
  const ans = sub === 'answer'
  const { theme: ot, tile: oi } = JP.open
  const x = (c: number) => 330 + c * 256
  const y = (r: number) => 300 + r * 140
  return (
    <div className={`c2-jp sub-${sub}`}>
      <div className="c2-case-big">
        {JP.themes.map((t, c) => <div key={t.name} className="c2-label" style={{ left: x(c) }}><b>{t.name}</b>{t.hint && <i>{t.hint}</i>}</div>)}
        {JP.themes.map((_, c) => JP.values.map((v, r) => {
          const done = JP.played.includes(`${c}-${r}`)
          const sel = c === ot && r === oi
          return <div key={`${c}-${r}`} className={`c2-drawer${done ? ' done' : ''}${sel ? ' sel' : ''}`} style={{ left: x(c), top: y(r) }}>
            {!done && <span className="c2-dnum">{v}</span>}{done && <span className="c2-dust" />}
          </div>
        }))}
      </div>
      <div className="c2-out" key={replay(play, 'out', String(sub !== 'board'))}>
        <div className="c2-out-head"><span className="c2-label-in">{JP.themes[ot].name} · {JP.themes[ot].hint}</span><span className="c2-out-count">{ans ? '' : '18 с'}</span><b>{JP.values[oi]}</b></div>
        <div className="c2-out-sound">звучит трек<i /><i /><i /><i /><i /></div>
        <div className="c2-out-rows">
          {JP.answers.map((a, i) => {
            const t = TEAMS.find(z => z.id === a.team)!
            return <div key={a.team} className={`c2-out-row${ans ? (a.ok ? ' ok' : ' no') : ''}`} style={{ animationDelay: `${0.9 + i * 0.15}s` }}>
              <Slug t={t} small /><em>{ans ? a.text : '• • •'}</em><b>{ans ? (a.ok ? '✓' : '✗') : `${a.sec.toFixed(1)} с`}</b></div>
          })}
        </div>
        <div className={`c2-out-answer${ans ? ' on' : ''}`}><span>Правильный ответ</span>{JP.correct}</div>
      </div>
      <Host keys={sub === 'board' ? ['Следующий раунд →'] : ans ? ['↻ Переслушать', 'Закрыть плитку'] : ['Показать ответ', '↻ Переслушать', 'Закрыть плитку']} />
    </div>
  )
}

// ── 06 ФИНАЛ ──
function Final({ sub, play }: { sub: string; play: number }) {
  const w = RANKED[0]
  return (
    <div className={`c2-final sub-${sub}`}>
      {sub === 'last' && <div key={replay(play, 'last')}>
        <p className="c2-recall c2-last-q">{LAST.text}</p>
        <div className="c2-print c2-last-a"><span>Правильный ответ</span><b>{LAST.answer}</b></div>
      </div>}
      {(sub === 'transition' || sub === 'winner' || sub === 'results') && <div className="c2-lockup" key={replay(play, 'lock', sub === 'transition' ? 't' : 'p')}>
        {RANKED.map((t, i) => <Slug key={t.id} t={t} cls="c2-lock-slug" style={{ top: 170 + i * 62, animationDelay: `${0.1 + i * 0.08}s` }} />)}
        <span className="c2-roller" />
      </div>}
      {(sub === 'winner' || sub === 'results') && <div className={`c2-sheet ${sub}`} key={replay(play, 'sheet')}>
        {sub === 'winner' ? <>
          <span className="c2-sheet-kicker">Quiz Party · победитель вечера</span>
          <h2>{w.name}</h2>
          <b className="c2-sheet-score">{total(w)} очков</b>
          <div className="c2-sheet-podium">{RANKED.slice(1, 3).map((t, i) => <div key={t.id}><span>{i + 2}-е место</span>{t.name}<b>{total(t)}</b></div>)}</div>
        </> : <>
          <span className="c2-sheet-kicker">Итоги вечера</span>
          <table>
            <thead><tr><th /><th>Команда</th>{ROUND_NAMES.map((r, i) => <th key={r} title={r}>{i + 1}</th>)}<th>Итог</th></tr></thead>
            <tbody>{RANKED.map(t => <tr key={t.id} className={placeOf(t) <= 3 ? 'top' : ''}><td>{placeOf(t)}</td><td>{t.name}</td>{t.score.map((s, j) => <td key={j}>{s}</td>)}<td>{total(t)}</td></tr>)}</tbody>
          </table>
        </>}
      </div>}
    </div>
  )
}

// ── 07 СКРЭМБЛ ──
function Scramble({ sub, play }: { sub: string; play: number }) {
  const { tiles, template, order } = SCRAMBLE
  const slots: { x: number; idx: number }[] = []
  let x = 0
  template.words.forEach((wd, wi) => { wd.forEach(c => { if (c.kind === 'letter') slots.push({ x, idx: c.idx }); x += 84 }); if (wi < template.words.length - 1) x += 46 })
  const ox = 960 - x / 2 + 42
  const open = new Set(sub === 'hints' ? SCRAMBLE.hints : sub === 'solved' ? order : [])
  return (
    <div className={`c2-scr sub-${sub}`}>
      <p className="c2-dtext">{SCRAMBLE.clue}</p>
      <div className="c2-sstick" style={{ left: ox - 70, width: x + 56 }} />
      {tiles.map((ch, p) => {
        const li = order[p]
        const placed = open.has(li)
        const s = slots.find(q => q.idx === li)!
        const jx = 420 + ((p * 197) % 1080), jy = 420 + ((p * 89) % 260), rot = ((p * 47) % 50) - 25
        const tf = placed ? `translate(${ox + s.x - 38}px, 800px) rotate(0deg)` : `translate(${jx}px, ${jy}px) rotate(${rot}deg)`
        return <span key={replay(play, 't', p)} className={`c2-flysort${placed ? ' placed' : ''}`}
          style={{ transform: tf, transitionDelay: `${placed && sub === 'solved' ? s.x / 1600 : 0}s` }}><Sort ch={ch} size={.62} /></span>
      })}
      <Host keys={sub === 'solved' ? ['Следующий вопрос →'] : ['Показать ответ']} />
    </div>
  )
}

export function Screen({ scene, sub, left, timer, play }: ScreenProps) {
  const timed = scene === 'text' || scene === 'dense'
  const stick: Record<string, [string, string]> = {
    text: [`Раунд ${META.round} · ${META.roundName}`, `вопрос ${META.q} из ${META.of}`],
    dense: [`Раунд ${META.round} · ${META.roundName}`, `вопрос 5 из ${META.of}`],
    match: ['Раунд 2 · ответы', 'вопрос 1 из 7'],
    jp: ['Раунд 3 · Своя игра', sub === 'board' ? 'выбирайте тему' : `${JP.themes[JP.open.theme].name} · ${JP.values[JP.open.tile]}`],
    scramble: ['Раунд 6 · Скрэмбл', 'вопрос 1 из 3'],
    final: sub === 'last' ? [`Раунд ${LAST.round} · ответы`, `вопрос ${LAST.q} из ${LAST.of}`] : ['Quiz Party', 'финал'],
  }
  const chasePose = scene === 'lobby' ? 'lobby' : scene === 'final' && sub !== 'last' ? 'final' : scene
  return (
    <div className={`c2 scene-${scene} sub-${sub} tm-${timed ? timer : 'none'}`}>
      <Stone scene={scene} sub={sub} />
      <Chase pose={chasePose} />
      <Stick on={scene !== 'lobby'} left={(stick[scene] ?? ['', ''])[0]} right={(stick[scene] ?? ['', ''])[1]} />
      <TypeWheel left={left} total={META.timer} phase={timer} on={timed} />
      <div className="c2-content">
        {scene === 'lobby' && <Lobby sub={sub} play={play} />}
        {scene === 'text' && <TextQ play={play} timer={timer} />}
        {scene === 'dense' && <DenseQ play={play} timer={timer} />}
        {scene === 'match' && <Match sub={sub} play={play} />}
        {scene === 'jp' && <Jeopardy sub={sub} play={play} />}
        {scene === 'final' && <Final sub={sub} play={play} />}
        {scene === 'scramble' && <Scramble sub={sub} play={play} />}
      </div>
      <div className="c2-vignette" aria-hidden />
    </div>
  )
}
// размеры сцены для справки: W = ширина, высота 1080
void W
