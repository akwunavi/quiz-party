import { useEffect, useState } from 'react'
import { currentTeam, liveLeft, remainingCount, type BlitzState, type BlitzQuestion } from '../../lib/blitzState'
import type { Team } from '../../types/quiz'

// ═══ БЛИЦ НА ПРОЕКТОРЕ ═══
//
// Экран делится на блоки по числу команд. При нечётном числе один блок
// встаёт сверху по центру — как в «120 секундах».
//
// Текст вопроса намеренно вынесен В ЦЕНТР, между блоками, а не внутрь
// блока играющей команды: так зал следит за раундом целиком, а не только
// свою минуту. Это обсуждалось и решено именно так.

/** Раскладка блоков: сколько колонок и нужен ли отдельный верхний блок. */
export function blockLayout(n: number): { top: boolean; cols: number } {
  if (n <= 1) return { top: false, cols: 1 }
  if (n === 2) return { top: false, cols: 2 }
  if (n === 3) return { top: true, cols: 2 }
  if (n === 4) return { top: false, cols: 2 }
  if (n === 5) return { top: true, cols: 2 }
  return { top: n % 2 === 1, cols: n <= 6 ? 3 : 4 }
}

// Просто секунды, без минут: раунд короткий, «60» читается с дальнего
// ряда быстрее, чем «1:00», и не путается с часами.
const fmt = (ms: number) => String(Math.max(0, Math.ceil(ms / 1000)))

function TeamBlock({ team, state, active, now }: {
  team: Team; state: BlitzState; active: boolean; now: number
}) {
  const left = liveLeft(state, team.id, now)
  const pts = (state.correct[team.id] ?? 0) - (state.missed[team.id] ?? 0)
  const low = left <= 10_000
  return (
    <div className={`bz-block${active ? ' on' : ''}${low && active ? ' low' : ''}`}
      style={{ ['--tc' as string]: team.color }}>
      {/* Метка хода: по одной подсветке рамкой было непонятно, кто играет */}
      {active && <span className="bz-turn">ХОД</span>}
      <div className="bz-name">{team.name}</div>
      <div className={`bz-timer${low ? ' low' : ''}`}>{fmt(left)}</div>
      <div className="bz-meta">
        <span className="bz-pts">{pts > 0 ? `+${pts}` : pts}</span>
        <span className="bz-qn">вопрос {(state.correct[team.id] ?? 0) + (state.missed[team.id] ?? 0) + (active ? 1 : 0)}</span>
      </div>
    </div>
  )
}

export function BlitzBoard({ teams, state, bank, questionText, verdict, answerText, dice, reveal }: {
  teams: Team[]
  state: BlitzState
  bank: BlitzQuestion[]
  /** Текст текущего вопроса. Пусто — идёт пауза между ходами. */
  questionText?: string
  /** Итог автопроверки последнего ответа. */
  verdict?: 'ok' | 'no'
  /** Верный ответ — показываем вместе с вердиктом. */
  answerText?: string
  /** Кубик: вставляется в контейнер вопроса, пока раунд не начался. */
  dice?: React.ReactNode
  /** Пауза между ходами: чем закончился только что закрытый ход — верно,
   *  неверно (попытки кончились) или скип. Показываем верный ответ ЛЮБОЙ
   *  из трёх причин — раньше его узнавала только угадавшая команда. */
  reveal?: { questionText: string; answerText: string; verdict: 'ok' | 'no' | 'skip' }
}) {
  // Таймер перерисовываем сами: состояние в базе меняется редко, а секунды
  // на экране обязаны идти ровно.
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 250)
    return () => clearInterval(t)
  }, [])

  const ordered = state.order
    .map(id => teams.find(t => t.id === id))
    .filter((t): t is Team => !!t)
  const active = currentTeam(state)
  const { top, cols } = blockLayout(ordered.length)
  const activeTeam = ordered.find(t => t.id === active)

  // Вопрос стоит МЕЖДУ блоками, а не над ними: он главный на экране, и
  // сверху терялся. Поэтому команды делятся на две группы — над полосой
  // вопроса и под ней. При нечётном числе сверху оказывается один блок.
  const head = top ? ordered.slice(0, 1) : ordered.slice(0, Math.ceil(ordered.length / 2))
  const rest = top ? ordered.slice(1) : ordered.slice(Math.ceil(ordered.length / 2))
  const rowCols = top ? cols : Math.max(1, head.length)

  return (
    <div className="host-screen grid-bg bz-screen">
      <div className="host-topbar">
        <span className="mono-tag">БЛИЦ</span>
        {/* вместо обычного таймера — сколько вопросов осталось в банке */}
        <span className="bz-bank">{remainingCount(bank, state.used)}</span>
      </div>

      <div className={`bz-row${top ? ' bz-row-top' : ''}`}
        style={{ ['--cols' as string]: top ? 1 : rowCols }}>
        {head.map(t => (
          <TeamBlock key={t.id} team={t} state={state} active={t.id === active} now={now} />
        ))}
      </div>

      {/* Контейнер вопроса ВСЕГДА на экране: он держит раскладку.
          Раньше между ходами он исчезал, блоки команд схлопывались к
          центру и экран дёргался при каждом переходе. */}
      <div className={`bz-question${verdict ? ` v-${verdict}` : ''}`}
        style={{ ['--tc' as string]: activeTeam?.color }}>
        {dice ?? (questionText ? <>
          {/* чей ход — крупно и цветом команды, иначе с дальнего ряда не видно */}
          <div className="bz-asking">отвечают: <b>{activeTeam?.name ?? '—'}</b></div>
          <div className="bz-qtext">{questionText}</div>
          {verdict && (
            <div className={`bz-verdict ${verdict}`}>
              {verdict === 'ok' ? 'ВЕРНО' : 'НЕВЕРНО'}
              {answerText && <span className="bz-right"> · {answerText}</span>}
            </div>
          )}
        </> : reveal ? (
          // Пауза между ходами: ход уже передан, следующий вопрос ещё не
          // выехал — тут виден правильный ответ ЛЮБОЙ команде, чем бы ход
          // ни закрылся (верно / три неверных / скип).
          <>
            <div className="bz-asking">
              {reveal.verdict === 'ok' ? 'ответили верно!'
                : reveal.verdict === 'skip' ? 'вопрос пропущен' : 'не угадали'}
            </div>
            <div className="bz-qtext">{reveal.questionText}</div>
            <div className={`bz-verdict ${reveal.verdict === 'ok' ? 'ok' : 'no'}`}>
              Правильный ответ: {reveal.answerText}
            </div>
          </>
        ) : (
          <div className="bz-asking">следующий вопрос…</div>
        ))}
      </div>

      <div className="bz-row" style={{ ['--cols' as string]: Math.max(1, rest.length) }}>
        {rest.map(t => (
          <TeamBlock key={t.id} team={t} state={state} active={t.id === active} now={now} />
        ))}
      </div>
    </div>
  )
}

/** Кубик с названиями команд: крутится и останавливается на первой.
 *  Показывается один раз в начале раунда — дальше ходы идут по кругу. */
export function BlitzDice({ teams, pickedId, rolling }: {
  teams: Team[]; pickedId?: string; rolling: boolean
}) {
  const [face, setFace] = useState(0)
  useEffect(() => {
    if (!rolling) return
    const t = setInterval(() => setFace(f => (f + 1) % Math.max(1, teams.length)), 110)
    return () => clearInterval(t)
  }, [rolling, teams.length])

  const shown = rolling
    ? teams[face]
    : teams.find(t => t.id === pickedId) ?? teams[0]
  return (
    <div className="bz-dice-wrap">
      <div className={`bz-dice${rolling ? ' rolling' : ' done'}`}
        style={{ ['--tc' as string]: shown?.color }}>
        {shown?.name ?? '—'}
      </div>
      <div className="bz-dice-cap">{rolling ? 'кто начинает…' : 'начинает'}</div>
    </div>
  )
}
