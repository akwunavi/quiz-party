// ═══ Magic 2.0 Lab — общие экраны 18 состояний ═══
// Структура и содержимое — как в продакшне (HostScreen/QuestionScreen/rounds/*):
// что показывается, в каком порядке, какие подписи. Материал, свет и магию
// даёт концепт (kit). Кнопок ведущего на проекторе нет — только аварийная
// навигация по флагу showProjectorNavigation (по умолчанию выключена).
import { Fragment, type CSSProperties, type ReactNode } from 'react'
import { Qr, CityEngraving, InventionEngraving, OrlojEngraving } from './common'
import {
  TEAMS, JOINING, GROUPS, ROUNDS, RULES, CW_GRID, CW_ROUND, CW_Q, R2, Q_MATCH, pairOf, Q_ONE, Q_DENSE, Q_TEXT, Q_ORDER,
  MATCH_ANSWERS, ORDER_ANSWERS, JP, MELODY, BLITZ, SCRAMBLE, LAST, RANKED, SB_BEFORE, SB_AFTER, total, placeOf, team, type TimerState, type Team,
} from './data'
import type { Kit, StateId } from './kit'

type P = { kit: Kit; sub: string; left: number; timer: TimerState; play: number }
const v = (o: Record<string, string | number>) => o as CSSProperties

// ── мелкие общие узлы ──
export function Words({ text, base = 0, step = 0.07 }: { text: string; base?: number; step?: number }) {
  let i = 0
  return <span className="x-words">{text.split(/(\s+)/).map((w, j) => /^\s+$/.test(w) ? ' ' : (
    <span key={j} className="x-w" style={v({ '--i': i, '--d': `${base + step * i++}s` })}>{w}</span>
  ))}</span>
}
function Meta({ l, r }: { l: string; r: ReactNode }) {
  return <div className="x-meta"><span className="x-meta-l">{l}</span><span className="x-meta-r">{r}</span></div>
}
export function TeamMark({ t, cls = '', style }: { t: Team; cls?: string; style?: CSSProperties }) {
  return (
    <span className={`x-team${t.alive ? '' : ' off'} ${cls}`} style={v({ '--h': t.hue, ...(style as object) })}>
      <i className="x-mark" /><b>{t.name}</b>{!t.alive && <em>переподключается</em>}
    </span>
  )
}
function TSlot({ kit, left, timer, total = 30, size = 'q' as const }: { kit: Kit; left: number; timer: TimerState; total?: number; size?: 'q' | 'big' | 'mini' }) {
  return <div className={`x-tslot ts-${size}`}><kit.Timer left={left} total={total} phase={timer} size={size} /></div>
}
function Key({ k }: { k: string }) { return <span className="x-key">{k}</span> }

// ── 01 ЛОББИ ──
function Lobby({ sub }: { sub: string }) {
  const joined = sub !== 'idle'
  const n = TEAMS.filter(t => t.alive && (t.id !== JOINING || joined)).length
  return (
    <div className="x-lobby">
      <h1 className="x-logo"><span className="x-lq">Q</span><span className="x-logo-rest">uiz Party</span></h1>
      <div className="x-count">подключились: <b>{n}</b></div>
      <figure className="x-qrcard"><Qr size={236} ink="#15101e" /><figcaption>Наведите камеру телефона</figcaption></figure>
      <div className="x-teams">
        {TEAMS.map((t, i) => (
          <TeamMark key={t.id} t={t} style={v({ '--i': i })}
            cls={t.id === JOINING ? (joined ? 'is-join' : 'is-wait') : ''} />
        ))}
      </div>
    </div>
  )
}

// ── 02 РАНДОМАЙЗЕР: составы приходят из админки готовыми, проектор их показывает ──
function Groups() {
  const people = GROUPS.reduce((a, g) => a + g.length, 0)
  let k = 0
  return (
    <div className="x-groups">
      <div className="x-groups-head">Составы команд · {GROUPS.length} · {people} чел.</div>
      <div className="x-groups-list">
        {GROUPS.map((g, i) => (
          <div key={i} className="x-group" style={v({ '--i': i, '--h': [32, 205, 352, 150][i] })}>
            <div className="x-gname"><i className="x-mark" />Команда {i + 1}</div>
            <div className="x-gpeople">{g.map(p => <span key={p} className="x-player" style={v({ '--k': k++ })}>{p}</span>)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── 03 ПРАВИЛА (InfoSlide show_at: lobby) ──
function Rules() {
  return (
    <div className="x-rules">
      <div className="x-rules-title">{RULES.title}</div>
      <ol className="x-rule-list">{RULES.body.map((r, i) => <li key={i} className="x-rule" style={v({ '--i': i })}><span>{i + 1}</span>{r}</li>)}</ol>
      <div className="x-rounds">
        {ROUNDS.map((r, i) => <div key={r.n} className="x-round" style={v({ '--i': i })}><b>{r.n}</b><span>{r.name}</span><em>{r.count} вопр.</em></div>)}
      </div>
      <div className="x-stats">Раундов: {RULES.stats.rounds} · Вопросов: {RULES.stats.questions} · Музыкальных треков: {RULES.stats.tracks} · Примерное время игры: ~2 ч 30 мин</div>
      <div className="x-note">{RULES.note}</div>
    </div>
  )
}

// ── сетка кроссворда: клетки абсолютно, чтобы концепт мог их собирать/прочерчивать ──
export function CwGrid({ cell, current }: { cell: number; current?: number }) {
  const cells = new Map<string, { r: number; c: number; num?: number; cur: boolean; o: number }>()
  let o = 0
  for (const w of CW_GRID.words) {
    for (let i = 0; i < w.word.length; i++) {
      const r = w.dir === 'down' ? w.row + i : w.row, c = w.dir === 'across' ? w.col + i : w.col
      const key = `${r},${c}`, prev = cells.get(key)
      cells.set(key, { r, c, num: i === 0 ? w.number : prev?.num, cur: (prev?.cur ?? false) || w.number === current, o: prev?.o ?? o++ })
    }
  }
  return (
    <div className="x-cw" style={{ width: CW_GRID.cols * cell, height: CW_GRID.rows * cell }}>
      {[...cells.values()].map(c => (
        <span key={`${c.r},${c.c}`} className={`x-cell${c.cur ? ' cur' : ''}`}
          style={v({ left: c.c * cell, top: c.r * cell, width: cell, height: cell, '--o': c.o, '--r': c.r, '--c': c.c })}>
          {c.num && <i>{c.num}</i>}
        </span>
      ))}
    </div>
  )
}
function RoundIntro({ n, title, meta, rules, grid }: { n: number; title: string[]; meta: string; rules: string[]; grid?: boolean }) {
  return (
    <div className={`x-intro${grid ? ' with-grid' : ''}`}>
      {grid && <div className="x-intro-grid"><CwGrid cell={44} /></div>}
      <div className="x-intro-side">
        <div className="x-intro-n">Раунд {n}</div>
        <h2 className="x-intro-title">{title.map((l, i) => <span key={i} style={v({ '--i': i })}>{l}</span>)}</h2>
        <div className="x-intro-meta">{meta}</div>
        <ol className="x-intro-rules">{rules.map((r, i) => <li key={i} style={v({ '--i': i })}><span>{String(i + 1).padStart(2, '0')}</span>{r}</li>)}</ol>
      </div>
    </div>
  )
}

// ── вопросы ──
function CwQuestion(p: P) {
  return (
    <div className="x-q x-q-cw">
      <Meta l="Раунд 1 · Литературный кроссворд" r={<>вопрос <b>{CW_Q.number}</b> из 8</>} />
      <TSlot kit={p.kit} left={p.left} timer={p.timer} total={45} />
      <div className="x-cw-mini"><CwGrid cell={30} current={CW_Q.number} /></div>
      <p className="x-qtext x-qtext-cw"><span className="x-cwn">{CW_Q.number} · {CW_Q.dir === 'across' ? 'по горизонтали' : 'по вертикали'} · {CW_Q.len} букв</span><Words text={CW_Q.clue} base={0.3} /></p>
    </div>
  )
}
const MX = [420, 780, 1140, 1500]
function MatchQ(p: P) {
  return (
    <div className="x-q x-q-match">
      <Meta l={`Раунд 2 · ${R2.name}`} r={<>вопрос <b>{Q_MATCH.index}</b> из {R2.count}</>} />
      <TSlot kit={p.kit} left={p.left} timer={p.timer} />
      <p className="x-qtext x-qtext-top"><Words text={Q_MATCH.text} base={0.2} /></p>
      {Q_MATCH.items.map((it, i) => (
        <figure key={it} className="x-img x-mimg" style={v({ left: MX[i] - 150, '--i': i })}>
          <div className="x-img-in"><InventionEngraving kind={it} /></div><span className="x-num">{i + 1}</span>
        </figure>
      ))}
      <div className="x-opts x-opts-row">{Q_MATCH.right.map((r, j) => <div key={r} className="x-opt" style={v({ '--i': j })}><Key k={r} />{Q_MATCH.right_labels[j]}</div>)}</div>
    </div>
  )
}
function OneQ(p: P) {
  return (
    <div className="x-q x-q-one">
      <Meta l={`Раунд 2 · ${R2.name}`} r={<>вопрос <b>{Q_ONE.index}</b> из {R2.count}</>} />
      <TSlot kit={p.kit} left={p.left} timer={p.timer} />
      <p className="x-qtext x-qtext-side"><Words text={Q_ONE.text} base={0.2} step={0.05} /></p>
      <figure className="x-img x-oneimg" style={v({ '--i': 0 })}><div className="x-img-in"><OrlojEngraving /></div></figure>
    </div>
  )
}
export function DenseQ(p: P) {
  return (
    <div className={`x-q x-q-dense tm-${p.timer}`}>
      <Meta l={`Раунд 2 · ${R2.name}`} r={<>вопрос <b>{Q_DENSE.index}</b> из {R2.count}</>} />
      <TSlot kit={p.kit} left={p.left} timer={p.timer} />
      <p className="x-qtext x-qtext-dense"><Words text={Q_DENSE.text} base={0.15} step={0.04} /></p>
      <div className="x-pair">{Q_DENSE.media.map((m, i) => (
        <figure key={m.cap} className="x-img x-dimg" style={v({ '--i': i })}><div className="x-img-in"><CityEngraving era={m.era} /></div><figcaption>{m.cap}</figcaption></figure>
      ))}</div>
      <div className="x-opts x-opts-grid">{Q_DENSE.choices.map((c, i) => <div key={c.key} className="x-opt" style={v({ '--i': i })}><Key k={c.key} />{c.text}</div>)}</div>
    </div>
  )
}
export function TextQ(p: P) {
  return (
    <div className={`x-q x-q-text tm-${p.timer}`}>
      <Meta l={`Раунд 2 · ${R2.name}`} r={<>вопрос <b>{Q_TEXT.index}</b> из {R2.count}</>} />
      <TSlot kit={p.kit} left={p.left} timer={p.timer} />
      <p className="x-qtext x-qtext-big"><Words text={Q_TEXT.text} base={0.3} /></p>
    </div>
  )
}

// ── 09 СВОЯ ИГРА ──
const JX = (c: number) => 360 + c * 300, JY = (r: number) => 330 + r * 132
function Jeopardy({ sub }: { sub: string }) {
  const { theme: ot, tile: oi } = JP.open
  const open = sub === 'open' || sub === 'answer'
  const ans = sub === 'answer'
  return (
    <div className={`x-jp jp-${sub}`} style={v({ '--ox': JX(ot), '--oy': JY(oi) })}>
      <div className="x-jp-title">Своя игра</div>
      <div className="x-jp-board">
        {JP.themes.map((t, c) => <div key={t.name} className="x-jp-theme" style={v({ left: JX(c) - 140, '--i': c })}><b>{t.name}</b>{t.hint && <i>{t.hint}</i>}</div>)}
        {JP.themes.map((_, c) => JP.values.map((val, r) => {
          const done = JP.played.includes(`${c}-${r}`)
          const sel = c === ot && r === oi
          return <div key={`${c}-${r}`} className={`x-tile${done ? ' done' : ''}${sel ? ' sel' : ''}`} style={v({ left: JX(c) - 130, top: JY(r) - 56, '--c': c, '--r': r })}><span>{done ? '·' : val}</span></div>
        }))}
      </div>
      <div className={`x-jp-open${open ? ' on' : ''}`}>
        <div className="x-jp-open-head"><span className="x-jp-otheme">{JP.themes[ot].name}<i>{JP.themes[ot].hint}</i></span><span className="x-jp-otile">плитка · {JP.values[oi]}</span></div>
        <div className="x-jp-count">{ans ? '' : <><b>18</b> с · звучит фрагмент</>}</div>
        <div className="x-jp-ans-label">{ans ? 'Ответы команд (по скорости)' : `Ответили: ${JP.answers.length}`}</div>
        <ol className="x-jp-answers">{JP.answers.map((a, i) => (
          <li key={a.team} className={ans ? (a.ok ? 'ok' : 'no') : ''} style={v({ '--i': i })}>
            <TeamMark t={team(a.team)} /><em>{ans ? a.text : '• • •'}</em><span className="x-verdict">{ans ? (a.ok ? '✓' : '✗') : ''}</span></li>
        ))}</ol>
        <div className={`x-jp-correct${ans ? ' on' : ''}`}><span>Правильный ответ</span><b>{JP.correct}</b></div>
      </div>
    </div>
  )
}

// ── 10 УГАДАЙ МЕЛОДИЮ ──
const MCX = (c: number) => 420 + c * 360, MRY = (r: number) => 360 + r * 170
function Melody({ sub, kit, left }: { sub: string; kit: Kit; left: number }) {
  const [pc, pr] = MELODY.pick.split('-').map(Number)
  const win = sub === 'bids' || sub === 'reveal'
  return (
    <div className={`x-mel mel-${sub}`} style={v({ '--px': MCX(pc), '--py': MRY(pr) })}>
      <div className="x-mel-board">
        {MELODY.themes.map((t, c) => <div key={t} className="x-mel-theme" style={v({ left: MCX(c) - 160, '--i': c })}>{t}</div>)}
        {MELODY.themes.map((_, c) => Array.from({ length: MELODY.tracks }, (_, r) => {
          const done = MELODY.played.includes(`${c}-${r}`)
          const pick = c === pc && r === pr
          return <div key={`${c}-${r}`} className={`x-rec${done ? ' done' : ''}${pick ? ' pick' : ''}`} style={v({ left: MCX(c) - 70, top: MRY(r) - 70, '--c': c, '--r': r })}>
            <span className="x-rec-grooves" /><b>{r + 1}</b></div>
        }))}
      </div>
      <div className={`x-mel-win${win ? ' on' : ''}`}>
        <div className="x-mel-head"><span>{MELODY.themes[pc]} · трек {pr + 1}</span>{sub === 'bids' && <TSlot kit={kit} left={left} timer={left <= 10 ? 'warning' : 'normal'} total={30} size="mini" />}</div>
        {sub === 'bids' && <>
          <div className="x-mel-q">Ставки команд</div>
          <ol className="x-bids">{MELODY.bids.map((b, i) => (
            <li key={b.team} className={i === 0 ? 'win' : ''} style={v({ '--i': i })}><TeamMark t={team(b.team)} /><b>{b.sec} сек</b>{i === 0 && <span className="x-plays">играет · {b.sec} сек</span>}</li>
          ))}</ol>
          <div className="x-mel-hint">2–5 сек → 2 балла · 6–10 сек → 1 балл · передача хода → 0,5 балла</div>
        </>}
        {sub === 'reveal' && <>
          <div className="x-mel-q">Правильный ответ</div>
          <div className="x-mel-correct">{MELODY.correct}</div>
          <div className="x-mel-result"><TeamMark t={team(MELODY.bids[0].team)} /><span>угадала за {MELODY.bids[0].sec} сек · <b>+2</b></span></div>
        </>}
      </div>
    </div>
  )
}

// ── 11 БЛИЦ ──
function Blitz({ sub, kit }: { sub: string; kit: Kit }) {
  const active = BLITZ.q.team
  const top = BLITZ.order.slice(0, 4), bot = BLITZ.order.slice(4)
  const block = (id: string, i: number) => {
    const t = team(id), on = id === active
    return <div key={id} className={`x-bz${on ? ' on' : ''}`} style={v({ '--h': t.hue, '--i': i })}>
      <TeamMark t={t} />
      <div className="x-bz-clock">{on ? <kit.Timer left={BLITZ.left[id]} total={60} phase="normal" size="mini" /> : <b>{BLITZ.left[id]}</b>}</div>
      <div className="x-bz-pts">{BLITZ.correct[id]} верно</div>
    </div>
  }
  return (
    <div className={`x-blitz bz-${sub}`}>
      <div className="x-bz-bank">Блиц · в банке <b>{BLITZ.bankLeft}</b></div>
      <div className="x-bz-row top">{top.map(block)}</div>
      <div className="x-bz-q">
        <div className="x-bz-asking">Отвечает: <b>{team(active).name}</b></div>
        <div className="x-bz-text">{BLITZ.q.text}</div>
        <div className={`x-bz-verdict${sub === 'verdict' ? ' on' : ''}`}><span>✓ верно</span><b>{BLITZ.q.a}</b></div>
      </div>
      <div className="x-bz-row bot">{bot.map((id, i) => block(id, i + 4))}</div>
    </div>
  )
}

// ── 12 СКРЭМБЛ ──
export function scrambleSlots() {
  const slots: { x: number; idx: number; word: number }[] = []
  let x = 0
  SCRAMBLE.template.words.forEach((w, wi) => { w.forEach(c => { if (c.kind === 'letter') slots.push({ x, idx: c.idx, word: wi }); x += 92 }); if (wi < SCRAMBLE.template.words.length - 1) x += 56 })
  return { slots, ox: 960 - x / 2 + 46 }
}
function Scramble({ sub, kit, left, timer }: P & { sub: string }) {
  const { tiles, order } = SCRAMBLE
  const { slots, ox } = scrambleSlots()
  const open = new Set(sub === 'hints' ? SCRAMBLE.hints : sub === 'solved' ? order : [])
  const n = tiles.length
  return (
    <div className={`x-scr scr-${sub}`}>
      <Meta l="Раунд 6 · Скрэмбл" r={<>вопрос <b>1</b> из 3</>} />
      <TSlot kit={kit} left={sub === 'solved' ? 0 : left} timer={sub === 'solved' ? 'zero' : timer} total={60} />
      <p className="x-qtext x-scr-clue">{SCRAMBLE.clue}</p>
      <div className="x-scr-slots">{slots.map(s => <span key={s.idx} className={`x-slot${open.has(s.idx) ? ' got' : ''}`} style={v({ left: ox + s.x - 40 })} />)}</div>
      {tiles.map((ch, p) => {
        const li = order[p]
        const s = slots.find(q => q.idx === li)!
        const sx = 960 - (n * 92) / 2 + p * 92 + 6, sy = 470
        const placed = open.has(li)
        return <span key={p} className={`x-letter${placed ? ' placed' : ''}`}
          style={v({ '--sx': `${sx}px`, '--sy': `${sy}px`, '--tx': `${ox + s.x - 40}px`, '--ty': '700px', '--p': p, '--li': li, '--hi': SCRAMBLE.hints.indexOf(li) })}><b>{ch}</b></span>
      })}
      <div className={`x-scr-win${sub === 'solved' ? ' on' : ''}`}>Угадали: {SCRAMBLE.winners.map(id => team(id).name).join(' · ')}</div>
    </div>
  )
}

// ── связи пар (сопоставление): форма — от концепта ──
function linkPath(shape: Kit['link'], x1: number, y1: number, x2: number, y2: number, i: number) {
  const my = (y1 + y2) / 2
  if (shape === 'vine') { const w = 26 * (i % 2 ? 1 : -1); return `M ${x1} ${y1} C ${x1 + w} ${my - 30}, ${x2 - w} ${my + 30}, ${x2} ${y2}` }
  if (shape === 'lead') return `M ${x1} ${y1} L ${x1} ${my} L ${x2} ${my} L ${x2} ${y2}`
  if (shape === 'thread') return `M ${x1} ${y1} Q ${(x1 + x2) / 2} ${my + 40} ${x2} ${y2}`
  return `M ${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`
}

// ── 13 СОПОСТАВЛЕНИЕ — ОТВЕТ ──
function MatchA({ sub, kit }: P) {
  const shown = sub !== 'before'
  const xOf = (j: number) => shown ? MX[Q_MATCH.left.findIndex(l => pairOf(l) === Q_MATCH.right[j])] : MX[j]
  return (
    <div className={`x-ans x-matchA ma-${sub}`}>
      <Meta l="Раунд 2 · ответы" r={<>вопрос <b>{Q_MATCH.index}</b> из {R2.count}</>} />
      <p className="x-recall">{Q_MATCH.text}</p>
      {Q_MATCH.items.map((it, i) => (
        <figure key={it} className="x-img x-mimg" style={v({ left: MX[i] - 150, '--i': i })}>
          <div className="x-img-in"><InventionEngraving kind={it} /></div><span className="x-num">{i + 1}</span>
        </figure>
      ))}
      <svg className="x-links" viewBox="0 0 1920 1080" aria-hidden>
        {shown && Q_MATCH.right.map((r, j) => <path key={r} className="x-link" style={v({ '--i': j })} d={linkPath(kit.link, MX[j], 760, xOf(j), 590, j)} />)}
      </svg>
      {Q_MATCH.right.map((r, j) => (
        <div key={r} className="x-opt x-mlabel" style={v({ '--i': j, '--x0': `${MX[j] - 160}px`, '--x1': `${xOf(j) - 160}px`, '--dx': `${xOf(j) - MX[j]}px` })}>
          <Key k={r} />{Q_MATCH.right_labels[j]}
        </div>
      ))}
      <div className="x-answer-line">{shown ? <>Правильно: {Q_MATCH.left.map(l => <b key={l}>{l} — {pairOf(l)}</b>)}</> : 'Правильный ответ'}</div>
      <TeamAnswers list={MATCH_ANSWERS} shown={sub === 'solved'} revealed={shown} />
    </div>
  )
}
function TeamAnswers({ list, shown, revealed }: { list: { team: string; text: string; ok: boolean }[]; shown: boolean; revealed: boolean }) {
  return (
    <div className="x-tans">
      <span className="x-tans-label">{revealed ? 'Ответы команд' : `Ответили: ${list.length}`}</span>
      {list.map((a, i) => (
        <span key={a.team} className={`x-ta${shown ? (a.ok ? ' ok' : ' no') : ''}`} style={v({ '--i': i })}>
          <TeamMark t={team(a.team)} /><em>{revealed ? a.text : '• • •'}</em><span className="x-verdict">{shown ? (a.ok ? '✓' : '✗') : ''}</span>
        </span>
      ))}
    </div>
  )
}

// ── 14 ПОРЯДОК — ОТВЕТ ──
const OY = (k: number) => 300 + k * 120
function OrderA({ sub }: P) {
  const shown = sub !== 'before'
  return (
    <div className={`x-ans x-orderA oa-${sub}`}>
      <Meta l="Раунд 2 · ответы" r={<>вопрос <b>{Q_ORDER.index}</b> из {R2.count}</>} />
      <p className="x-recall">{Q_ORDER.text}</p>
      <div className="x-ord-label">{shown ? 'Правильный порядок' : 'Варианты'}</div>
      {Q_ORDER.choices.map((c, i) => {
        const to = Q_ORDER.correct_order.indexOf(c.key)
        return <div key={c.key} className="x-ord" style={v({ top: OY(i), '--from': i, '--to': to, '--dy': `${OY(to) - OY(i)}px`, '--dir': to > i ? 1 : -1, '--i': i })}>
          <span className="x-ord-pos">{to + 1}</span><Key k={c.key} /><span className="x-ord-text">{c.text}</span>
        </div>
      })}
      <TeamAnswers list={ORDER_ANSWERS} shown={sub === 'solved'} revealed={shown} />
    </div>
  )
}

// ── 16 ТАБЛО ──
function Board({ sub }: { sub: string }) {
  const after = sub !== 'before'
  const rowY = (k: number) => 230 + k * 62
  return (
    <div className={`x-sb sb-${sub}`}>
      <div className="x-sb-title">Промежуточные результаты · после раунда 2</div>
      <div className="x-sb-head"><span /><span>Команда</span><span>Р1</span><span>Р2</span><span>Σ</span></div>
      {SB_BEFORE.map((t, i) => {
        const k = SB_AFTER.findIndex(x => x.id === t.id)
        const up = k < i
        return <div key={t.id} className={`x-sb-row${up ? ' up' : k > i ? ' down' : ''}${k === 0 ? ' lead' : ''}`}
          style={v({ top: rowY(i), '--dy': `${after ? rowY(k) - rowY(i) : 0}px`, '--i': i, '--k': k, '--h': t.hue })}>
          <span className="x-sb-place">{after ? placeOf(t, 2) : placeOf(t, 1)}</span>
          <TeamMark t={t} /><span className="x-sb-n">{t.score[0]}</span>
          <span className={`x-sb-n x-sb-new${after ? ' on' : ''}`}>{after ? t.score[1] : '—'}</span>
          <span className="x-sb-sum">{after ? total(t, 2) : total(t, 1)}</span>
        </div>
      })}
    </div>
  )
}

// ── 18 ФИНАЛ ──
function Final({ sub }: { sub: string }) {
  const w = RANKED[0]
  return (
    <div className={`x-final fin-${sub}`}>
      <div className="x-fin-last">
        <Meta l={`Раунд ${LAST.round} · ответы`} r={<>вопрос <b>{LAST.q}</b> из {LAST.of}</>} />
        <p className="x-recall">{LAST.text}</p>
        <div className="x-answer"><span>Правильный ответ</span><b>{LAST.answer}</b></div>
      </div>
      <div className="x-fin-winner">
        <span className="x-fin-kicker">Победитель вечера</span>
        <h2>{w.name.split(' ').map((s, i) => <Fragment key={i}>{i > 0 && ' '}<span className="x-fw" style={v({ '--i': i })}>{s}</span></Fragment>)}</h2>
        <b className="x-fin-score">{total(w)} очков</b>
        <div className="x-podium">{RANKED.slice(1, 3).map((t, i) => <div key={t.id} className={`x-pod p${i + 2}`}><span>{i + 2}-е место</span><TeamMark t={t} /><b>{total(t)}</b></div>)}</div>
      </div>
      <div className="x-fin-results">
        <div className="x-fin-rtitle">Итоги вечера</div>
        <div className="x-res-head"><span /><span>Команда</span>{ROUNDS.map(r => <span key={r.n}>{r.n}</span>)}<span>Σ</span></div>
        {RANKED.map((t, i) => (
          <div key={t.id} className={`x-res-row${placeOf(t) <= 3 ? ' top' : ''}`} style={v({ '--i': i })}>
            <span className="x-res-place">{placeOf(t)}</span><TeamMark t={t} />{t.score.map((s, j) => <span key={j}>{s}</span>)}<b>{total(t)}</b>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── переходы: слой «откуда» и слой «куда» живут одновременно, концепт решает, как одно становится другим ──
function Tx({ from, to, level, n = 1 }: { from: ReactNode; to: ReactNode; level: 'major' | 'minor' | 'event'; n?: number }) {
  return <>
    {Array.from({ length: n }, (_, s) => <div key={s} className={`x-lay x-from tx-${level}${n > 1 ? ' x-shard' : ''}`} style={v({ '--s': s })} aria-hidden={s > 0}>{from}</div>)}
    <div className={`x-lay x-to tx-${level}`}>{to}</div>
  </>
}

export function Screen({ kit, st, sub, left, timer, play, nav }: P & { st: StateId; nav: boolean }) {
  const p: P = { kit, sub, left, timer, play }
  let body: ReactNode = null
  switch (st) {
    case 'lobby': body = <Lobby sub={sub} />; break
    case 'randomizer': body = <><div className="x-lay x-base"><Lobby sub="join" /></div><div className={`x-lay x-overlay rnd-${sub}`}><Groups /></div></>; break
    case 'rules': body = <Tx n={kit.shards} level="event" from={<Lobby sub="join" />} to={<Rules />} />; break
    case 'cw': body = sub === 'question' ? <CwQuestion {...p} /> :
      <Tx n={kit.shards} level="major" from={<Rules />} to={<RoundIntro n={1} title={CW_ROUND.title} meta={CW_ROUND.meta} rules={CW_ROUND.rules} grid />} />; break
    case 'match': body = <MatchQ {...p} />; break
    case 'one': body = <OneQ {...p} />; break
    case 'dense': body = <DenseQ {...p} />; break
    case 'text': body = <TextQ {...p} />; break
    case 'jp': body = <Jeopardy sub={sub} />; break
    case 'melody': body = <Melody sub={sub} kit={kit} left={left} />; break
    case 'blitz': body = <Blitz sub={sub} kit={kit} />; break
    case 'scramble': body = <Scramble {...p} />; break
    case 'matchA': body = <MatchA {...p} />; break
    case 'orderA': body = <OrderA {...p} />; break
    case 'timer': body = sub.startsWith('dense') ? <DenseQ {...p} /> : <TextQ {...p} />; break
    case 'board': body = <Board sub={sub} />; break
    case 'roundT': body = <Tx n={kit.shards} level="minor" from={<Board sub="after" />} to={<RoundIntro n={4} title={['УГАДАЙ', 'МЕЛОДИЮ']} meta="16 треков · ставки секундами · до 2 баллов" rules={['Рулетка выбирает трек — сначала звучит одна секунда', 'Команды ставят, за сколько секунд угадают', 'Играет тот, кто поставил меньше всех']} />} />; break
    case 'final': body = <Final sub={sub} />; break
  }
  // фаза таймера для мира: только где таймер реально идёт
  const timed = ['cw', 'match', 'one', 'dense', 'text', 'timer', 'scramble'].includes(st) && (st !== 'cw' || sub === 'question')
  const tphase: TimerState = st === 'scramble' && sub === 'solved' ? 'zero' : timed ? timer : 'normal'
  return (
    <div className={`mx ${kit.cls} st-${st} sub-${sub} tm-${tphase}${timed ? ' timed' : ''}`} >
      <kit.World st={st} sub={sub} timer={tphase} left={left} play={play} />
      <div className="x-content" key={`c-${play}`}>{body}</div>
      {nav && <div className="x-nav" aria-label="Аварийная навигация"><button type="button">‹ назад</button><button type="button">дальше ›</button></div>}
    </div>
  )
}
export { Fragment }
