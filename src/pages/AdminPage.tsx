import { getRoomId } from '../lib/room'
import { Hint, useHint } from '../components/Hint'
import { RoomPicker } from './RoomPicker'
import { VERSION } from '../version'
import { useEffect, useRef, useState } from 'react'
import { useGameState } from '../hooks/useGameState'
import { useTeams } from '../hooks/useTeams'
import { useAnswers } from '../hooks/useAnswers'
import { useQuestionShown } from '../hooks/useQuestionShown'
import { loadPack, metaLine, displayRoundNumber, type LoadedPack } from '../lib/packLoader'
import {
  gotoRound, slideForRound, slideBeforeFinale, showSlide,
  gotoQuestion, revealAnswer, finishGame, resetGame, startCounting,
  gotoAnswers, showScoreboard, startAnswerTime, setPhase, selectPackAndStart, startBreak,
  setFinaleStep, setFinaleMode, registerTeam, deleteTeam, renameTeam, startTimer, resetGameHard,
} from '../lib/gameActions'
import { afterRoundStep } from '../lib/flow'
import { loadRatings, summarize, type RatingRow } from '../lib/ratings'
import { useBlitz, saveBlitz } from '../lib/blitzApi'
import {
  initBlitz, showQuestion, answerCorrect, answerWrong, skip,
  pauseForCheck, resumeAfterCheck, finishNoQuestions, pickNext,
  remainingCount, currentTeam, toResults, MAX_ATTEMPTS, type BlitzState,
} from '../lib/blitzState'
import { blitzResults } from '../lib/blitz'
import { hideQuestion, markPlayed } from '../lib/editorApi'
import { enqueueAnswer } from '../lib/answerQueue'
import {
  isDevMode, disableDevMode, seedTeams, seedRoundAnswers, checkRoundScoring, clearSeed,
  type CheckRow,
} from '../lib/devSeed'
import { teamColor, nextFreeColor } from '../lib/teamColors'
import { computeTotals, computeRoundScores } from '../lib/totals'
import { rankTeams } from '../lib/ranking'
import { exportAnswersCsv } from '../lib/exportAnswers'
import { autocheck } from '../lib/autocheck'
import { startRace } from '../lib/raceActions'
import { supabase } from '../lib/supabase'
import { listPacks } from '../lib/packLoader'
import type { Answer, Pack, Team } from '../types/quiz'

// ═══ Админка (телефон ведущего) — перенос структуры старого AdminPage ═══
// ВЕДУЩИЙ: шапка со ссылками → строка статуса → экран по фазе →
// нижняя панель управления (назад/дальше, смена раунда, рандомайзер, сброс).

export function AdminPage() {
  const { gameState, loading: gsLoading, roomId } = useGameState()
  const [pack, setPack] = useState<LoadedPack | null>(null)
  const teams = useTeams(gameState?.game_id ?? null)
  const answers = useAnswers(gameState?.game_id ?? null, gameState?.round_number)
  const [linkCopied, setLinkCopied] = useState<string | null>(null)

  useEffect(() => {
    if (gameState?.pack_id) void loadPack(gameState.pack_id, true).then(setPack).catch(() => {})
    else setPack(null)
  }, [gameState?.pack_id])

  if (!gsLoading && !roomId) return <RoomPicker route="/admin" />
  if (!gameState) return <div className="cyber adm-center">// ЗАГРУЗКА…</div>

  const round = pack?.rounds[gameState.round_number]
  const phase = gameState.phase

  return (
    <div className="cyber adm-root">
      <div className="adm-header">
        <div className="adm-brand">ВЕДУЩИЙ <span style={{ opacity: .45, fontSize: 11 }}>v{VERSION}</span></div>
        <div style={{ display: 'flex', gap: 8 }}>
          <a className="adm-link" href="./" target="_blank" rel="noreferrer">ПРОЕКТОР ↗</a>
          <button className={`adm-link${linkCopied ? ' ok' : ''}`} onClick={() => {
            const url = `${location.origin}${location.pathname}#/player?room=${getRoomId() ?? ''}`
            // Тихое копирование раньше не давало отклика: нажал — и не видно,
            // сработало ли. При недоступном clipboard (некоторые webview,
            // http без TLS) показываем саму ссылку текстом — скопировать
            // руками всё равно можно, а молчать нельзя.
            navigator.clipboard?.writeText(url).then(() => {
              setLinkCopied('✓ СКОПИРОВАНО')
              setTimeout(() => setLinkCopied(null), 2000)
            }, () => setLinkCopied(url))
          }}>{linkCopied ?? 'ССЫЛКА ИГРОКАМ'}</button>
        </div>
      </div>

      <div className="adm-status">
        {pack ? `${pack.name} · Р${displayRoundNumber(pack, gameState.round_number)}` : 'пакет не выбран'} · {phase}
        {round && (phase === 'question' || phase === 'show_answers')
          && round.mechanic !== 'melody' && round.mechanic !== 'jeopardy' && round.mechanic !== 'sprint'
          ? ` · ${gameState.question_index + 1}/${round.questions.length}` : ''}
      </div>

      {!gameState.pack_id && <PackPicker />}

      {gameState.pack_id && phase === 'lobby' && pack && (
        <div className="adm-pad">
          <TeamRandomizer />
          <RoundPicker pack={pack} current={gameState.round_number} />
        </div>
      )}

      {phase === 'finale' && <FinalePanel pack={pack} gameId={gameState.game_id}
        teams={teams} gameState={gameState} />}

      {/* Пока на проекторе висит «считаем баллы», ведущий как раз и вносит
          их — поэтому здесь не пульт раунда, а таблица баллов и выход к итогам */}
      {phase === 'counting' && pack && <CountingPanel pack={pack}
        gameState={gameState} teams={teams} />}

      {gameState.pack_id && phase !== 'lobby' && phase !== 'finale'
        && phase !== 'counting' && pack && round && (
        <RoundView pack={pack} round={round} gameState={gameState} teams={teams} answers={answers} />
      )}
    </div>
  )
}

// ── Выбор пакета (новое: раньше пакет был один, зашитый в код) ──
function PackPicker() {
  const [packs, setPacks] = useState<Pack[]>([])
  const [sel, setSel] = useState('')
  const selectRef = useRef<HTMLSelectElement>(null)
  const hint = useHint()
  useEffect(() => { void listPacks().then(setPacks).catch(() => {}) }, [])
  return (
    <div className="adm-pad">
      <div className="adm-dim">ВЫБЕРИ ПАКЕТ</div>
      <select ref={selectRef} value={sel} onChange={e => { setSel(e.target.value); hint.clear() }}
        style={{ width: '100%' }}>
        <option value="">—</option>
        {packs.map(p => <option key={p.id} value={p.id}>{p.name} ({p.status})</option>)}
      </select>
      {/* кнопка живая всегда: она объясняет, чего не хватает, а не молчит серым */}
      <button className="adm-btn primary" onClick={() => {
        if (!sel) return hint.show(packs.length === 0
          ? 'Пакетов пока нет. Их создают в редакторе — вкладка «Редактор», кнопка «+ Новый пакет».'
          : 'Сначала выбери пакет в списке выше — из него соберётся игра.', selectRef.current)
        void selectPackAndStart(sel)
      }}>НАЧАТЬ ИГРУ</button>
      <Hint text={hint.text} />
    </div>
  )
}

// ── Рандомайзер команд (перенос as is) ──
// палитра общая для всего проекта, см. lib/teamColors.ts

function TeamRandomizer() {
  const [namesText, setNamesText] = useState('')
  const [teamCount, setTeamCount] = useState('4')
  const [preview, setPreview] = useState<string[][] | null>(null)
  const [publishing, setPublishing] = useState(false)
  const [open, setOpen] = useState(false)

  const shuffle = () => {
    const names = namesText.split('\n').map(s => s.trim()).filter(Boolean)
    if (names.length === 0) return
    const shuffled = [...names].sort(() => Math.random() - 0.5)
    const n = Math.max(2, Math.min(8, parseInt(teamCount, 10) || 2))
    const groups: string[][] = Array.from({ length: n }, () => [])
    shuffled.forEach((name, i) => groups[i % n].push(name))
    setPreview(groups)
  }

  const publish = async () => {
    if (!preview) return
    setPublishing(true)
    await supabase.from('game_sessions')
      .update({ random_groups: preview } as never).eq('id', getRoomId())
      .then(() => {}, () => {})
    setPublishing(false)
  }

  return (
    <div className="adm-box">
      <button className="adm-link" onClick={() => setOpen(o => !o)}>
        {open ? 'СКРЫТЬ РАНДОМАЙЗЕР КОМАНД' : '🎲 РАНДОМАЙЗЕР КОМАНД'}
      </button>
      {open && (<>
        <div className="adm-dim">ВСТАВЬ ИМЕНА — КАЖДОЕ С НОВОЙ СТРОКИ</div>
        <textarea rows={5} value={namesText} placeholder={'Ваня\nМаша\nПетя\n…'}
          onChange={e => { setNamesText(e.target.value); setPreview(null) }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="adm-dim">КОМАНД:</span>
          <input inputMode="numeric" value={teamCount} placeholder="2-8" style={{ width: 64, textAlign: 'center' }}
            onChange={e => { setTeamCount(e.target.value.replace(/[^0-9]/g, '')); setPreview(null) }} />
          <button className="adm-btn primary" onClick={shuffle}>🎲 ПЕРЕМЕШАТЬ</button>
          {/* очистка нужна ИМЕННО здесь: перед игрой, а не после финала */}
          <button className="adm-btn danger" onClick={() => {
            if (!confirm('ПОЛНАЯ ОЧИСТКА.\n\nБудут удалены все команды и ответы '
              + 'этой и прошлых игр. Восстановить нельзя. Продолжить?')) return
            if (!confirm('Точно удалить? Второе подтверждение.')) return
            void resetGameHard()
              .then(() => alert('Готово: команды и ответы удалены.'))
              .catch(e => alert(e instanceof Error ? e.message : 'не удалось очистить'))
          }}>🗑 ОЧИСТИТЬ КОМАНДЫ И ОТВЕТЫ</button>
        </div>
        {preview && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {preview.map((group, i) => (
              <div key={i} className="adm-group" style={{
                borderColor: teamColor(i),
                borderLeft: `3px solid ${teamColor(i)}`,
              }}>
                <div style={{ color: teamColor(i), fontSize: 13 }}>КОМАНДА {i + 1}</div>
                <div style={{ fontSize: 14, opacity: .85 }}>{group.join(', ') || '—'}</div>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="adm-btn" onClick={shuffle}>↻ ЕЩЁ РАЗ</button>
              <button className="adm-btn ok" disabled={publishing} onClick={() => void publish()}>
                {publishing ? 'ПУБЛИКУЮ…' : '📺 ПОКАЗАТЬ НА ЭКРАНЕ'}
              </button>
            </div>
          </div>
        )}
      </>)}
    </div>
  )
}

function RoundPicker({ pack, current }: { pack: LoadedPack; current: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div className="adm-dim">ВЫБЕРИ РАУНД ДЛЯ СТАРТА</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {pack.rounds.map((r, i) => (
          pack.settings?.play_mode === 'paper'
            && (r.mechanic === 'melody' || r.mechanic === 'jeopardy') ? null :
          <button key={r.id} className={`adm-round${current === i ? ' active' : ''}`}
            onClick={() => void gotoRound(i,
              slideForRound(pack.settings?.info_slides, i) ?? undefined)}>
            Р{displayRoundNumber(pack, i)} {r.title_lines.join(' ')}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Экран раунда ──
function RoundView({ pack, round, gameState, teams, answers }: {
  pack: LoadedPack
  round: LoadedPack['rounds'][number]
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
  teams: Team[]; answers: Answer[]
}) {
  const phase = gameState.phase
  const step = gameState.question_index
  const isJeopardy = round.mechanic === 'jeopardy'
  // интерактивные механики управляются с проектора; стандартный маршрут
  // «вопрос → время ответов → разбор» для них не существует
  const isBlitz = round.mechanic === 'blitz'
  // игра на бумаге (бар): вопрос читает ведущий вслух, поэтому таймер,
  // музыку и звук вопроса он запускает сам — кнопкой ниже
  const paperMode = pack.settings?.play_mode === 'paper'
  const isInteractive = isJeopardy || isBlitz
    || round.mechanic === 'melody' || round.mechanic === 'race'
  // «120 секунд»: все вопросы раунда на одном слайде (см. HostScreen.tsx),
  // а не по одному — обычный «Дальше» листал их по одному 5 раз подряд,
  // хотя на экране они и так все сразу. У раунда свой пульт: назад — на
  // заставку, вперёд — сразу к разбору первого вопроса.
  const isSprint = round.mechanic === 'sprint'
  const recapOn = !!(round.settings as { recap_before_answers?: boolean }).recap_before_answers
  // шаг после раунда берём из общего модуля: раньше здесь была своя копия
  // логики, которая игнорировала перерыв и расходилась с проектором
  const runAfterRound = () => {
    const st = afterRoundStep(pack, gameState.round_number, gameState.phase)
    if (st.kind === 'scoreboard') return void showScoreboard()
    if (st.kind === 'break') return void startBreak()
    if (st.kind === 'finale') {
      const sl = slideBeforeFinale(pack.settings?.info_slides)
      return sl == null ? void finishGame(gameState.pack_id, paperMode) : void showSlide(sl)
    }
    return void gotoRound(gameState.round_number + 1,
      slideForRound(pack.settings?.info_slides, gameState.round_number + 1) ?? undefined)
  }
  const endRound = runAfterRound

  const grade = async (a: Answer, correct: boolean) => {
    await supabase.from('answers').update({ is_correct: correct }).eq('id', a.id)
  }

  const advance = () => {
    if (phase === 'round_intro') { void gotoQuestion(0); return }
    if (phase === 'question') {
      if (step + 1 < round.questions.length) { void gotoQuestion(step + 1); return }
      // Повтор вопросов слайдами — если включён в редакторе. Идёт ПЕРЕД
      // временем на ответы: зал ещё раз видит все вопросы, потом отвечает.
      if (recapOn && round.answers_reveal === 'after_round') { void setPhase('recap'); return }
      if (round.answers_reveal === 'after_round') void startAnswerTime()
      else void gotoAnswers(0)
      return
    }
    if (phase === 'recap') { void startAnswerTime(); return }
    if (phase === 'answer_time') { void gotoAnswers(0); return }
    // с табло и из перерыва идём по общему маршруту: с табло может быть
    // ещё перерыв, а вот из перерыва — только вперёд
    if (phase === 'scoreboard' || phase === 'break') runAfterRound()
    // Слайд-брифинг («Дальше» тут раньше молчала — ни одно из условий выше
    // не про info, клик просто ничего не делал). Слайд перед раундом — это
    // то же место, что gotoRound уже поставил (round_number готов, не
    // хватает только войти в round_intro); слайд перед финалом — отдельный
    // show_at, там «дальше» значит «показать итоги». Слайды, вызванные
    // ведущим вручную (show_at: 'manual'), возвращают туда же, куда и
    // существующая кнопка «Вернуться к раунду» — round_intro.
    if (phase === 'info') {
      const sl = pack.settings?.info_slides?.[step]
      if (sl?.show_at === 'finale') return void finishGame(gameState.pack_id, paperMode)
      return void setPhase('round_intro')
    }
  }
  const goBack = () => {
    if (phase === 'question' && step > 0) void gotoQuestion(step - 1)
    else if (phase === 'question') void setPhase('round_intro')
    else if (phase === 'recap') void gotoQuestion(round.questions.length - 1)
    else if (phase === 'answer_time') {
      if (recapOn) void setPhase('recap')
      else void gotoQuestion(round.questions.length - 1)
    }
    // «Табло»/«Перерыв» раньше не входили в goBack вообще — кнопка «Назад»
    // была на экране, но клик не делал ничего. Возврат тем же путём, каким
    // сюда пришли: с перерыва — на табло (если оно было в маршруте) или на
    // разбор последнего вопроса; с табло — на разбор последнего вопроса.
    else if (phase === 'break') {
      const s = (round.settings as { show_scoreboard_after?: boolean })
      if (s.show_scoreboard_after) void setPhase('scoreboard')
      else void gotoAnswers(round.questions.length - 1, true)
    }
    else if (phase === 'scoreboard') void gotoAnswers(round.questions.length - 1, true)
  }

  return (
    <div className="adm-flex">
      {phase === 'show_answers' && (
        <AnswersView pack={pack} round={round} gameState={gameState}
          answers={answers} teams={teams} onGrade={grade} />
      )}

      {/* «120 секунд» показывает все вопросы разом на проекторе — question_index
          тут не «текущий вопрос», а просто 0 всю дорогу. Шпаргалка по одному
          вопросу (QuestionTextOnly) и счётчик «ответили» вводили бы в
          заблуждение — на проекторе разом отвечают на всё, а не на «вопрос 1». */}
      {/* «Время ответов»: своя раскладка — простой таймер (не стилизованный,
          те же секунды, что и на проекторе) и по сколько вопросов раунда
          сдала каждая команда, а не «ответили N/M» на текущий вопрос —
          во «время ответов» отвечают на ВЕСЬ раунд разом, а не по одному. */}
      {phase === 'answer_time' && (
        <div className="adm-mid">
          <AnswerTimeBoard round={round} gameState={gameState} answers={answers}
            teams={teams} showTally={!paperMode} />
        </div>
      )}
      {phase !== 'show_answers' && phase !== 'answer_time' && !(isSprint && phase === 'question') && (
        <div className="adm-mid">
          <QuestionTextOnly round={round} gameState={gameState} />
          {/* На бумаге команды отвечают на бланк — кто уже ответил, узнать
              неоткуда (в базе этого нет), счётчик врал бы «0 из N» всегда. */}
          {!paperMode && (phase === 'question' || phase === 'recap') && (
            <AnsweredIndicator round={round} gameState={gameState} answers={answers} teams={teams} />
          )}
        </div>
      )}

      <div className="adm-footer">
        {isBlitz && phase === 'question' && (
          <BlitzControls pack={pack} round={round} gameState={gameState} onFinished={endRound} />
        )}

        {round.mechanic === 'race' && phase === 'question' && (
          <RaceControls gameState={gameState} />
        )}

        {isSprint && phase === 'question' && (
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="adm-btn" onClick={() => void setPhase('round_intro')}>← НАЗАД</button>
            <button className="adm-btn primary" onClick={() => void gotoAnswers(0)}>К ОТВЕТАМ →</button>
          </div>
        )}
        {/* Назад / Повтор вопроса / Дальше — теперь один ряд, а не два разных
            (раньше «Повтор» жил в отдельной группе вместе с «Табло» и
            «Показать ответ», которые на самом экране вопроса не нужны —
            обычный маршрут и так доводит до разбора кнопкой «Дальше»). */}
        {!isInteractive && !(isSprint && phase === 'question') && phase !== 'show_answers'
          && phase !== 'info' && (
          <div className="adm-row-btns">
            <button className="adm-btn" onClick={goBack}>← НАЗАД</button>
            {(phase === 'question' || phase === 'answer_time') && (
              <button className="adm-btn" onClick={() => void startTimer(
                phase === 'question' ? {
                  gameId: gameState.game_id, roundNumber: gameState.round_number,
                  questionRef: `q-${round.questions[step].id}`,
                } : undefined)}
                title="Заново запустить таймер на этом же вопросе">↻ ПОВТОР ВОПРОСА</button>
            )}
            {/* На бумаге вопрос читает ведущий вслух — «Дальше» неактивна,
                пока не нажата «▶ ПРОЧИТАЛ» ниже: иначе можно проскочить
                вопрос, ни разу не пустив по нему время. */}
            <button className="adm-btn primary" disabled={paperMode && phase === 'question'
              && !gameState.timer_started_at} onClick={advance}>
              {phase === 'answer_time' ? 'К ОТВЕТАМ →' : 'ДАЛЬШЕ →'}
            </button>
          </div>
        )}
        {/* Слайд-брифинг — отдельный, ВНЕ гейта !isInteractive: слайд может
            стоять перед любым раундом, в том числе перед «Своей игрой» или
            блицем, у которых своя раскладка ниже. «Назад» здесь не кнопка:
            у слайда нет своего определённого «предыдущего места» (слайд
            перед раундом 3 мог прийти и с табло раунда 2, и с перерыва) —
            молчаливая кнопка хуже отсутствующей. */}
        {phase === 'info' && (
          <div className="adm-row-btns">
            <button className="adm-btn primary" onClick={advance}>ДАЛЬШЕ →</button>
          </div>
        )}
        {isInteractive && phase === 'round_intro' && (
          <button className="adm-btn primary" onClick={() => void gotoQuestion(0)}>НАЧАТЬ РАУНД →</button>
        )}
        {/* У блица своя кнопка «дальше» — внутри BlitzControls, только когда
            раунд реально завершён (state.finished). Раньше этот блок рисовался
            для блица тоже, всегда, с чужим текстом «плитками на проекторе»
            (от «Своей игры») — и второй кнопкой «ЗАВЕРШИТЬ РАУНД» поверх той,
            что уже есть в BlitzControls, с другим смыслом (там — досрочный
            обрыв, тут — обычная навигация дальше). */}
        {isInteractive && !isBlitz && phase !== 'round_intro' && (<>
          <div className="adm-dim">
            {round.mechanic === 'race' ? 'ЗАБЕГ УПРАВЛЯЕТСЯ С ПРОЕКТОРА'
              : round.mechanic === 'melody' ? 'РАУНД УПРАВЛЯЕТСЯ С ПРОЕКТОРА (ШАРЫ/МОДАЛКА)'
              : 'РАУНД УПРАВЛЯЕТСЯ ПЛИТКАМИ НА ПРОЕКТОРЕ'}
          </div>
          <button className="adm-btn primary" onClick={endRound}>
            ЗАВЕРШИТЬ РАУНД {`${(round.settings as { show_scoreboard_after?: boolean }).show_scoreboard_after ? '→ ТАБЛО' : '→'}`}
          </button>
        </>)}
        {/* ── ИГРА В БАРЕ: вопрос читает ведущий, старт — по кнопке ──
            На бумаге проектор молчит и время не идёт, пока не нажата эта
            кнопка: сначала человек с микрофоном читает вопрос залу, и только
            потом включаются таймер, музыка и звук вопроса. НО если у вопроса
            есть своё аудио/видео — оно само «читает» вопрос залу, кнопка не
            нужна вовсе: таймер и трек стартуют сами (HostScreen.tsx:
            QuestionAudio), как в обычном режиме. */}
        {paperMode && phase === 'question' && !gameState.timer_started_at
          && !(round.questions[step]?.media.question ?? []).some(m => /\.(mp3|mp4|webm|wav)$/i.test(m)) && (
          <button className="adm-btn primary adm-start-question"
            onClick={() => void startTimer({
              gameId: gameState.game_id, roundNumber: gameState.round_number,
              questionRef: `q-${round.questions[step].id}`,
            })}
            title="Прочитал вопрос залу — пускаем время, музыку и звук вопроса">
            ▶ ПРОЧИТАЛ — ПУСКАЕМ ВРЕМЯ
          </button>
        )}
        {/* Табло / Показать ответ вручную — на самой раскладке вопроса и
            ответа их убрали (см. выше), но на «времени ответов» и повторе
            слайдами оставляем как раньше: до этих экранов редизайн ещё не
            дошёл, отдельным заходом макетов после игры. У интерактивных
            механик (блиц/скачки/своя игра/мелодия/спринт) эта пара тоже
            была лишней — реагировать на «Показать ответ» там нечему. На
            фазе «info» (слайд-брифинг) — тоже нечего показывать/оценивать,
            эти кнопки там просто лишние. */}
        {!isInteractive && !isSprint && phase !== 'show_answers' && phase !== 'question'
          && phase !== 'info' && (
          <div className="adm-row-btns">
            <button className="adm-btn" onClick={() => void showScoreboard()}>ТАБЛО</button>
            {/* «Подсчёт» уводит на заставку, из которой пути назад в раунд
                нет — только вперёд, к финалу. Случайный тап посреди игры
                раньше уносил на финальный слайд без возможности вернуться;
                кнопка нужна ровно один раз, после последнего раунда. */}
            {paperMode && gameState.round_number + 1 >= pack.rounds.length && (
              <button className="adm-btn" onClick={() => void startCounting()}
                title="Заставка «считаем баллы» на проекторе">⏳ ПОДСЧЁТ</button>
            )}
            <button className="adm-btn" onClick={() => void revealAnswer()}>ПОКАЗАТЬ ОТВЕТ</button>
          </div>
        )}

        {/* Порядок по макету: Игра (всё выше) → Команды → Служебное. Раньше
            «Команды» рендерился в AdminPage() над самим экраном вопроса —
            блок оказывался ПЕРЕД игрой, а не после. */}
        <ResultsPanel pack={pack} gameState={gameState} teams={teams} />

        <DevSeedPanel pack={pack} gameState={gameState} />

        <ServiceDrawer pack={pack} round={round} gameState={gameState} />
      </div>
    </div>
  )
}

/** Служебное (8.62): смена раунда, рандомайзер команд, показ слайда,
 *  сброс плиток мелодии, смена пакета, новая игра — раньше разбросаны по
 *  подвалу россыпью ссылок, теперь под одним шевроном. Ничего из этого не
 *  нужно ведущему каждый вопрос, поэтому сворачиваем по умолчанию. */
function ServiceDrawer({ pack, round, gameState }: {
  pack: LoadedPack
  round: LoadedPack['rounds'][number]
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="adm-box">
      <button className="adm-cmd-row" onClick={() => setOpen(o => !o)}>
        <span>{open ? '▾' : '▸'} служебное</span><span className="car">—</span>
      </button>
      {open && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
          <RoundPicker pack={pack} current={gameState.round_number} />
          <TeamRandomizer />
          <InfoSlidesButtons pack={pack} gameState={gameState} />
          {round.mechanic === 'melody' && (
            <button className="adm-link" onClick={async () => {
              if (!confirm('Сбросить раунд «Угадай мелодию»: все плитки снова доступны?')) return
              await supabase.from('game_sessions').update({ melody: {} }).eq('id', getRoomId())
            }}>↻ СБРОСИТЬ ПЛИТКИ МЕЛОДИИ</button>
          )}
          <button className="adm-link" onClick={async () => {
            if (!confirm('Сменить пакет: игра вернётся в лобби с выбором пакета. Ответы и команды останутся.')) return
            await supabase.from('game_sessions').update({
              phase: 'lobby', round_number: 0, question_index: 0,
              timer_started_at: null, reveal: false, melody: {},
            }).eq('id', getRoomId())
          }}>⇄ СМЕНИТЬ ПАКЕТ</button>
          <button className="adm-link danger" onClick={() => {
            if (confirm('НОВАЯ ИГРА: сбросить состояние игры? Ответы останутся в БД.')) void resetGame()
          }}>⟲ НОВАЯ ИГРА (ПОЛНЫЙ СБРОС)</button>
        </div>
      )}
    </div>
  )
}

// ── Проверка ответов (перенос AdminAnswersView) ──
function AnswersView({ pack, round, gameState, answers, teams, onGrade }: {
  pack: LoadedPack
  round: LoadedPack['rounds'][number]
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
  answers: Answer[]; teams: Team[]
  onGrade: (a: Answer, correct: boolean) => Promise<void>
}) {
  const step = gameState.question_index
  const questions = round.questions.filter(q => !q.hidden)
  const total = questions.length
  const q = questions[step]
  const rows = answers.filter(a => a.question_ref === `q-${q?.id}`)
  const last = gameState.round_number + 1 >= pack.rounds.length
  const paperMode = pack.settings?.play_mode === 'paper'
  const showSb = !!(round.settings as { show_scoreboard_after?: boolean }).show_scoreboard_after
  const recapOn = !!(round.settings as { recap_before_answers?: boolean }).recap_before_answers

  return (
    <div className="adm-answers">
      <div className="adm-answers-head">
        <div className="adm-brand">ОТВЕТЫ КОМАНД</div>
        <div className="adm-dim">ВОПРОС {step + 1} / {total}</div>
      </div>
      {q && <div className="adm-correct">Верный: <b>{correctOf(q)}</b></div>}

      {/* На бумаге команды пишут на бланк, а не в телефон — ответов в базе
          на КАЖДЫЙ вопрос физически нет, только итоговый балл за раунд
          (см. «Команды → Внести баллы»). Обычное «ответов нет» тут читалось
          бы как сбой, а не как норма для этого режима. */}
      {rows.length === 0 && (
        <div className="adm-empty">{paperMode
          ? 'команды пишут на бланк — сверки по ответам здесь нет'
          : 'ответов нет'}</div>
      )}
      {rows.map(a => {
        const team = teams.find(t => t.id === a.team_id)
        // Пока ведущий не оценил сам — подсказка автопроверки, тем же
        // приёмом, что уже красит разбор ответов на проекторе для зала
        // (a.is_correct ?? autocheck(...), см. HostScreen.tsx:ShowAnswers).
        // Нажатие любой из кнопок — это уже РЕШЕНИЕ ведущего, а не догадка.
        const shown = a.is_correct ?? (q ? autocheck(q.answer, a.answer_text) : null)
        return (
          <div key={a.id} className="adm-answer" style={{
            borderLeft: `4px solid ${a.is_correct === true ? '#22c55e' : a.is_correct === false ? '#ef4444' : (team?.color ?? '#333')}`,
          }}>
            <div className="adm-answer-top">
              <span style={{ color: team?.color, fontWeight: 700 }}>
                {team?.icon && <span className="pl-team-icon">{team.icon}</span>}{team?.name ?? '—'}</span>
              <span className="adm-answer-text">{a.answer_text || '—'}
                {a.stake != null && <span className="acc"> · ст.{a.stake}</span>}</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className={`adm-grade ok${shown === true ? ' on' : ''}`}
                onClick={() => void onGrade(a, true)}>✓ ВЕРНО</button>
              <button className={`adm-grade no${shown === false ? ' on' : ''}`}
                onClick={() => void onGrade(a, false)}>✗ НЕВЕРНО</button>
            </div>
          </div>
        )
      })}

      <div className="adm-answers-nav">
        {/* На первом вопросе разбора «Назад» раньше просто гас — вернуться
            во «время ответов» или к повтору вопросов было некуда, хотя
            маршрут туда есть (см. RoundView.goBack). */}
        <button className="adm-btn" onClick={() => {
          if (step > 0) { void gotoAnswers(step - 1, true); return }
          if (recapOn) void setPhase('recap')
          else void startAnswerTime()
        }}>← НАЗАД</button>
        <button className="adm-btn primary" onClick={() => {
          if (step < total - 1) { void gotoAnswers(step + 1); return }
          // настройка раунда «показать табло» раньше игнорировалась здесь:
          // после разбора сразу уходили в финал или в табло независимо от неё
          if (showSb) { void showScoreboard(); return }
          // на бумаге между последним раундом и итогами всегда есть пауза:
          // ведущий сводит бланки. Ведём зал на заставку подсчёта, а не в финал
          if (last) {
            // слайд «перед итогами», если он назначен, идёт первым
            const sl = slideBeforeFinale(pack.settings?.info_slides)
            if (sl != null) { void showSlide(sl); return }
            if (paperMode) { void startCounting(); return }
            void finishGame(gameState.pack_id); return
          }
          else void gotoRound(gameState.round_number + 1,
            slideForRound(pack.settings?.info_slides, gameState.round_number + 1) ?? undefined)
        }}>{step < total - 1 ? 'СЛЕД. ВОПРОС →'
          : showSb ? 'К ТАБЛО →' : last ? (paperMode ? 'К ПОДСЧЁТУ →' : 'ФИНАЛ →') : 'СЛЕД. РАУНД →'}</button>
      </div>
    </div>
  )
}

function correctOf(q: LoadedPack['rounds'][number]['questions'][number]): string {
  const a = q.answer as unknown as Record<string, unknown>
  const d = a.display ?? a.correct ?? a.word ?? a.correct_choice ?? a.correct_order ??
    (Array.isArray(a.correct_pairs) ? (a.correct_pairs as string[]).join(' ') : '—')
  return Array.isArray(d) ? d.join(' · ') : String(d)
}

// ── Шпаргалка ведущего по фазам (перенос QuestionTextOnly) ──
function QuestionTextOnly({ round, gameState }: {
  round: LoadedPack['rounds'][number]
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
}) {
  const step = gameState.question_index
  const phase = gameState.phase
  if (phase === 'round_intro') return (
    <div className="adm-centered">
      <div className="adm-h1">{round.title_lines.join(' ')}</div>
      <div className="adm-dim">{metaLine(round)}</div>
      <div style={{ textAlign: 'left', maxWidth: 340, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {round.rules.map((r, i) => <div key={i} style={{ fontSize: 14, opacity: .8 }}>{i + 1}. {r}</div>)}
      </div>
    </div>
  )
  if (phase === 'answer_time') return (
    <div className="adm-centered"><div className="adm-h1 ok">ВРЕМЯ ОТВЕТОВ</div></div>
  )
  if (phase === 'scoreboard') return (
    <div className="adm-centered"><div className="adm-h1">ТАБЛО</div>
      <div className="adm-dim">команды смотрят промежуточные результаты</div></div>
  )
  if (phase === 'break') return (
    <div className="adm-centered"><div className="adm-h1">ПЕРЕРЫВ</div>
      <div className="adm-dim">по кнопке ниже игра пойдёт дальше</div></div>
  )
  if (phase === 'question') {
    const q = round.questions[step]
    // Текст вопроса и ответ — с выравниванием по правому краю (запрошено
    // отдельно): картинку/медиа сюда сознательно не выводим, это шпаргалка
    // для чтения вслух, а не копия экрана зала.
    return (
      <div className="adm-qgame">
        <div className="adm-dim" style={{ textAlign: 'right' }}>ВОПРОС {step + 1} / {round.questions.length}</div>
        <div className="adm-qtext">{q?.question_text || '(без текста — только медиа на проекторе)'}</div>
        {q && <div className="adm-correct">Верный: <b>{correctOf(q)}</b></div>}
        {q?.answer_note && <div className="adm-dim" style={{ textAlign: 'right' }}>{q.answer_note}</div>}
      </div>
    )
  }
  return null
}

// ── «Ответили N из M» (перенос AnsweredIndicator) ──
function AnsweredIndicator({ round, gameState, answers, teams }: {
  round: LoadedPack['rounds'][number]
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
  answers: Answer[]; teams: Team[]
}) {
  const q = round.questions[gameState.question_index]
  const filled = [...teams].sort((x, y) => x.name.localeCompare(y.name)).map(t => ({
    team: t,
    done: answers.some(a => a.team_id === t.id && a.question_ref === `q-${q?.id}` && a.answer_text?.trim()),
  }))
  const doneCount = filled.filter(f => f.done).length
  return (
    <div style={{ textAlign: 'center' }}>
      <div className="adm-counter" style={{
        color: doneCount === teams.length && teams.length > 0 ? '#22c55e' : '#ea580c',
      }}>ОТВЕТИЛИ {doneCount} / {teams.length}</div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 8, flexWrap: 'wrap' }}>
        {filled.map(({ team, done }) => (
          <span key={team.id} className={`adm-chip${done ? ' done' : ''}`}>
            {done ? '✓ ' : ''}{team.name}
          </span>
        ))}
      </div>
    </div>
  )
}

/** «Время ответов» (8.62): голый счётчик секунд — те же startedAt/seconds,
 *  что и у стилизованного таймера на проекторе (lib/gameActions.ts:
 *  startAnswerTime пишет timer_started_at), просто без колец и подсветки —
 *  и по сколько вопросов раунда сдала каждая команда, не по одному вопросу
 *  за раз, как AnsweredIndicator: во «время ответов» отвечают на весь
 *  раунд сразу. */
function AnswerTimeBoard({ round, gameState, answers, teams, showTally }: {
  round: LoadedPack['rounds'][number]
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
  answers: Answer[]; teams: Team[]
  /** На бумаге команды пишут на бланк — в базе нет данных, кто сколько
   *  сдал, список был бы всегда «0 из N». */
  showTally: boolean
}) {
  const seconds = (round.settings as { answerTimeSeconds?: number }).answerTimeSeconds ?? 60
  const [now, setNow] = useState(Date.now())
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 500); return () => clearInterval(t) }, [])
  const startedAt = gameState.timer_started_at ? new Date(gameState.timer_started_at).getTime() : null
  const left = startedAt ? Math.max(0, Math.ceil(seconds - (now - startedAt) / 1000)) : seconds
  const mm = String(Math.floor(left / 60)).padStart(2, '0')
  const ss = String(left % 60).padStart(2, '0')

  const refs = new Set(round.questions.filter(q => !q.hidden).map(q => `q-${q.id}`))
  const total = refs.size
  const tally = [...teams].sort((a, b) => a.name.localeCompare(b.name)).map(t => ({
    team: t,
    done: answers.filter(a => a.team_id === t.id && refs.has(a.question_ref) && a.answer_text?.trim()).length,
  }))

  return (
    <div style={{ textAlign: 'center', width: '100%' }}>
      <div className="adm-counter" style={{ fontSize: 40, color: left <= 10 ? '#ef4444' : undefined }}>
        {mm}:{ss}
      </div>
      <div className="adm-dim">до конца времени на ответы</div>
      {showTally && <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 14 }}>
        {tally.map(({ team, done }) => (
          <div key={team.id} style={{ display: 'flex', justifyContent: 'space-between',
            fontSize: 14, borderBottom: '1px solid #1c2740', paddingBottom: 6 }}>
            <span style={{ color: team.color }}>{team.name}</span>
            <span className="adm-dim">{done} / {total}</span>
          </div>
        ))}
      </div>}
    </div>
  )
}

// ── Бумажный режим: ручные баллы за раунд ──
/** Команды в админке. На бумаге это ЕДИНСТВЕННЫЙ способ их завести:
 *  QR никто не сканирует, значит регистрации с телефонов не будет. */
function TeamsPanel({ gameId, teams }: { gameId: string; teams: Team[] }) {

  const [name, setName] = useState('')
  const [busy, setBusy] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const hint = useHint()

  const add = async () => {
    const n = name.trim()
    if (busy) return
    // Пустое поле — не молчаливый отказ, а объяснение: на бумажной игре
    // команды заводит ведущий руками, и «ничего не произошло» здесь особенно
    // сбивает с толку.
    if (!n) return hint.show('Впиши название команды в поле слева, потом жми «+ ДОБАВИТЬ».', inputRef.current)
    if (teams.some(t => t.name.toLowerCase() === n.toLowerCase()))
      return hint.show(`Команда «${n}» уже есть. Придумай другое название, иначе на табло их не различить.`, inputRef.current)
    hint.clear()
    setBusy(true)
    try {
      await registerTeam(n, nextFreeColor(teams.map(t => t.color)), gameId)
      setName('')
    } finally { setBusy(false) }
  }

  return (
    <div className="adm-box">
      <div className="adm-dim">КОМАНДЫ ({teams.length})</div>
      {teams.length === 0 && <div className="adm-dim">Ни одной команды. Добавь их здесь —
        на бумаге сами они не подключатся.</div>}
      {[...teams].sort((a, b) => a.name.localeCompare(b.name)).map(t => (
        <div key={t.id} className="paper-row">
          <span className="team-dot" style={{ background: t.color }} />
          <input defaultValue={t.name} style={{ flex: 1, minWidth: 0 }}
            onBlur={e => { const v = e.target.value.trim()
              if (v && v !== t.name) void renameTeam(t.id, v) }} />
          <button className="adm-btn danger" style={{ flex: '0 0 auto', padding: '8px 12px' }}
            onClick={() => { if (confirm(`Удалить «${t.name}» вместе с её баллами?`)) void deleteTeam(t.id) }}>✕</button>
        </div>
      ))}
      <div className="paper-row">
        <input ref={inputRef} placeholder="Название команды" value={name} style={{ flex: 1, minWidth: 0 }}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') void add() }} />
        <button className="adm-btn primary" style={{ flex: '0 0 auto' }}
          disabled={busy} onClick={() => void add()}>+ ДОБАВИТЬ</button>
      </div>
      <Hint text={hint.text} />
    </div>
  )
}

function PaperScores({ pack, gameState, teams }: {
  pack: LoadedPack; teams: Team[]
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
}) {
  const answers = useAnswers(gameState.game_id)
  // раунд, который правим: по умолчанию текущий, но можно вернуться к прошлым —
  // на бумаге ошибки в подсчёте всплывают уже после того, как раунд закрыт
  const [ri, setRi] = useState(gameState.round_number)
  useEffect(() => { setRi(gameState.round_number) }, [gameState.round_number])
  const [vals, setVals] = useState<Record<string, string>>({})
  const [saved, setSaved] = useState<Record<string, boolean>>({})
  const hint = useHint(12000)   // ошибку записи держим на экране дольше

  // подтягиваем уже сохранённые баллы, иначе ведущий правит вслепую
  const stored = new Map<string, number>()
  for (const a of answers) {
    if (a.question_ref === `q-paper-${ri}`) stored.set(a.team_id, Number(a.stake ?? 0))
  }
  useEffect(() => { setVals({}); setSaved({}) }, [ri])

  const save = async (teamId: string) => {
    const raw = vals[teamId]
    const pts = Number(raw === undefined || raw === '' ? stored.get(teamId) ?? 0 : raw)
    if (Number.isNaN(pts)) return hint.show('Балл должен быть числом. Дробные пиши через точку.')
    // onConflict ОБЯЗАН совпадать с уникальным индексом в базе, а он —
    // `unique (team_id, question_ref)` (миграция 0001). Здесь стояло
    // «team_id,game_id,question_ref», такого индекса нет, и Postgres отвечал
    // 400: «no unique or exclusion constraint matching the ON CONFLICT
    // specification». Баллы не сохранялись НИ РАЗУ, а галочка всё равно
    // загоралась зелёным — потому что ошибку никто не смотрел. В итогах
    // стояли нули, и понять причину можно было только из консоли браузера.
    const { error } = await supabase.from('answers').upsert({
      team_id: teamId, game_id: gameState.game_id, question_ref: `q-paper-${ri}`,
      round_number: ri, answer_text: String(pts), stake: pts, is_correct: true,
      updated_at: new Date().toISOString(),
    } as never, { onConflict: 'team_id,question_ref' } as never)
    if (error) {
      // молчать нельзя: на бумаге это единственный источник баллов
      return hint.show(`Балл НЕ сохранён: ${error.message}. Проверь связь и нажми ещё раз.`)
    }
    hint.clear()
    setSaved(v => ({ ...v, [teamId]: true }))
    setTimeout(() => setSaved(v => ({ ...v, [teamId]: false })), 1500)
  }

  const scored = pack.rounds.map((r, i) => ({ r, i })).filter(x => !x.r.off_scoreboard)
  const sum = teams.reduce((acc, t) => acc + (Number(vals[t.id] ?? stored.get(t.id) ?? 0) || 0), 0)

  return (
    <div className="adm-box">
      <div className="adm-dim">БАЛЛЫ ЗА РАУНД (БУМАГА)</div>
      {/* выбор раунда: правки задним числом — обязательный сценарий на бумаге */}
      <div className="paper-rounds">
        {scored.map(({ r, i }) => (
          <button key={r.id} className={`adm-round${i === ri ? ' active' : ''}`}
            onClick={() => setRi(i)}>Р{displayRoundNumber(pack, i)}</button>
        ))}
      </div>
      {ri !== gameState.round_number &&
        <div className="adm-warn">правишь ПРОШЛЫЙ раунд Р{displayRoundNumber(pack, ri)}</div>}
      {[...teams].sort((x, y) => x.name.localeCompare(y.name)).map(t => {
        const has = stored.has(t.id)
        return (
          <div key={t.id} className="paper-row">
            <span style={{ color: t.color, flex: 1 }}>{t.name}</span>
            <input inputMode="numeric" className={has ? 'has' : ''}
              style={{ width: 80, textAlign: 'center' }}
              value={vals[t.id] ?? (has ? String(stored.get(t.id)) : '')}
              placeholder="—"
              onChange={e => setVals(v => ({ ...v, [t.id]: e.target.value }))} />
            <button className={`adm-btn ok${saved[t.id] ? ' flash' : ''}`}
              style={{ flex: '0 0 auto', padding: '8px 14px' }}
              onClick={() => void save(t.id)}>{saved[t.id] ? '✔' : '✓'}</button>
          </div>
        )
      })}
      <Hint text={hint.text} />
      <div className="adm-dim">введено за раунд: {sum} · без оценки: {
        teams.filter(t => !stored.has(t.id) && !vals[t.id]).length}</div>
    </div>
  )
}

/** Пульт на время подсчёта (игра в баре). */
function CountingPanel({ pack, gameState, teams }: {
  pack: LoadedPack; teams: Team[]
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
}) {
  return (
    <div className="adm-pad">
      <div className="adm-h1">СЧИТАЕМ БАЛЛЫ</div>
      <div className="adm-dim">На проекторе — заставка с отсчётом. Внеси баллы за
        раунды и, когда всё сойдётся, уводи зал к итогам.</div>
      <PaperScores pack={pack} gameState={gameState} teams={teams} />
      {/* CountingPanel существует только в бумажном режиме (фаза «considering»
          включается кнопкой, которая сама видна лишь при paperMode) — сценарий
          финала сразу «награждение», выбирать «шоу» тут незачем. */}
      <button className="adm-btn primary adm-start-question"
        onClick={() => void finishGame(gameState.pack_id, true)}>ПЕРЕЙТИ К ИТОГАМ →</button>
    </div>
  )
}

/** Оверлей блока «Команды» (8.62): шторка снизу на телефоне, модалка по
 *  центру на широком экране (переключает только медиазапрос, см.
 *  .adm-ov-backdrop). Раскрытие НА МЕСТЕ не подходит: внутри — таблица на
 *  N раундов со скроллом и форма со списком правок, которые в узкой боковой
 *  колонке не поместятся, а на телефоне двигали бы «Служебное» и низ экрана
 *  при каждом открытии — кнопки ведущего в этом проекте держат на
 *  стабильном месте (см. .host-actions). */
function AdmOverlay({ title, onClose, children }: {
  title: string; onClose: () => void; children: React.ReactNode
}) {
  // Без этого фон страницы под шторкой оставался прокручиваемым — на
  // телефоне это давало ровно то самое «залипание» при вводе баллов:
  // тапаешь по клавиатуре/полю ввода, страница ПОЗАДИ шторки чуть
  // прокручивается или скроллится вместе с открытием клавиатуры, и
  // следующий тап по кнопке «✓» физически попадает уже не в неё, а в
  // то, что оказалось под пальцем на фоне. Стандартный приём модалок —
  // блокировать скролл body, пока оверлей открыт, и вернуть как было
  // при закрытии.
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])
  return (
    <div className="adm-ov-backdrop" onClick={onClose}>
      <div className="adm-ov-panel" onClick={e => e.stopPropagation()}>
        <div className="adm-ov-head">
          <span>{title}</span>
          <button type="button" className="adm-ov-close" onClick={onClose} aria-label="Закрыть">✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}

/** Блок «Команды» (8.59, переверстан 8.62) — таблица результатов, ручная
 *  коррекция баллов (или «внести баллы» на бумаге) и оценки игры. Раньше
 *  жили только внутри FinalePanel (видны лишь на фазе «финал»), а ведущему
 *  нужна сверка в ЛЮБОЙ момент игры, не только в конце. Рендерится в
 *  AdminPage() безусловно (пока выбран пакет и есть команды), а не по фазе.
 *  Сама себе тянет ответы за ВСЮ игру (useAnswers(gameId) без round_number)
 *  — top-level `answers` в AdminPage() нарочно обрезан текущим раундом (для
 *  панели проверки ответов ЭТОГО раунда), для подсчёта итогов такой
 *  обрезанный список даст неверную сумму. */
function ResultsPanel({ pack, gameState, teams }: {
  pack: LoadedPack
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
  teams: Team[]
}) {
  const gameId = gameState.game_id
  const answers = useAnswers(gameId)
  const shownAt = useQuestionShown(gameId)
  const totals = computeTotals(pack, teams, answers)
  const perRound = computeRoundScores(pack, teams, answers)
  const scored = pack.rounds.filter(r => !r.off_scoreboard)
  const rows = rankTeams(teams, totals, answers, perRound)
  const paperMode = pack.settings?.play_mode === 'paper'
  const [open, setOpen] = useState<'roster' | 'results' | 'adjust' | 'ratings' | null>(null)
  // Свёрнут по умолчанию — как «Служебное»: строки-превью на постоянном
  // экране вопроса занимали место каждый раз, хотя нужны не на каждом
  // вопросе. Сворачивается/разворачивается мгновенно (обычный JSX-if, не
  // ленивая загрузка) — данные уже под рукой из хуков выше, показывать
  // нечего ждать.
  const [expanded, setExpanded] = useState(false)

  const existingAdjust = answers.filter(a =>
    a.question_ref.startsWith('q-adjust-') && Number(a.stake ?? 0) !== 0).length

  return (
    <>
      <div className="adm-box">
        <button className="adm-cmd-row" onClick={() => setExpanded(e => !e)}>
          <span>{expanded ? '▾' : '▸'} команды</span><span className="car">—</span>
        </button>
        {expanded && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
        {/* На бумаге QR никто не сканирует — список команд заводит ведущий
            здесь же, рядом с баллами, а не отдельным блоком в другом месте
            экрана (были рассинхронизированы — заводишь команду в одном
            разделе, баллы ей ставишь в другом). */}
        {paperMode && (
          <button className="adm-cmd-row" onClick={() => setOpen('roster')}>
            <span>▸ Список команд</span><span className="car">{teams.length}</span>
          </button>
        )}
        <button className="adm-cmd-row" onClick={() => setOpen('results')}>
          <span>▸ Таблица результатов</span><span className="car">сверка</span>
        </button>
        <button className="adm-cmd-row" onClick={() => setOpen('adjust')}>
          <span>▸ {paperMode ? 'Внести баллы за раунд' : 'Ручная коррекция баллов'}</span>
          <span className="car">{paperMode ? '' : (existingAdjust > 0 ? `${existingAdjust} правок` : '')}</span>
        </button>
        {!paperMode && (
          <button className="adm-cmd-row" onClick={() => setOpen('ratings')}>
            <span>▸ Оценки игры</span><span className="car">★</span>
          </button>
        )}
        </div>
        )}
      </div>

      {open === 'roster' && (
        <AdmOverlay title="Список команд" onClose={() => setOpen(null)}>
          <TeamsPanel gameId={gameId} teams={teams} />
        </AdmOverlay>
      )}

      {open === 'results' && (
        <AdmOverlay title="Таблица результатов" onClose={() => setOpen(null)}>
          <div className="adm-score-wrap">
            <table className="adm-score-table">
              <thead>
                <tr>
                  <th>#</th><th>Команда</th>
                  {scored.map((r, i) => <th key={r.id}>Р{i + 1}</th>)}
                  <th>Σ</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(row => {
                  const t = row.team
                  const all = perRound.get(t.id) ?? []
                  return (
                    <tr key={t.id}>
                      <td>{row.place}{row.shared && '='}</td>
                      <td style={{ color: t.color }}>{t.name}</td>
                      {scored.map(r => <td key={r.id}>{all[pack.rounds.indexOf(r)] ?? 0}</td>)}
                      <td className="total">{totals.get(t.id) ?? 0}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <button className="adm-link" onClick={() => {
            const stamp = new Date().toISOString().slice(0, 16).replace('T', '_').replace(':', '-')
            const safe = pack.name.replace(/[^\wА-Яа-яЁё-]+/g, '_').slice(0, 40)
            const csv = exportAnswersCsv(pack, teams, answers, shownAt)
            const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
            const a = document.createElement('a')
            a.href = url; a.download = `${safe}_ответы_${stamp}.csv`; a.click()
            URL.revokeObjectURL(url)
          }}>⤓ ВЫГРУЗИТЬ ОТВЕТЫ (CSV)</button>
        </AdmOverlay>
      )}

      {open === 'adjust' && (
        <AdmOverlay title={paperMode ? 'Внести баллы за раунд' : 'Ручная коррекция баллов'}
          onClose={() => setOpen(null)}>
          {paperMode
            ? <PaperScores pack={pack} gameState={gameState} teams={teams} />
            : <ScoreAdjustPanel pack={pack} gameId={gameId} teams={teams} answers={answers} />}
        </AdmOverlay>
      )}

      {open === 'ratings' && !paperMode && (
        <AdmOverlay title="Оценки игры" onClose={() => setOpen(null)}>
          <RatingsBody pack={pack} gameState={gameState} />
        </AdmOverlay>
      )}
    </>
  )
}

// ── Финал ──
function FinalePanel({ pack, gameId, teams, gameState }: {
  pack: LoadedPack | null; gameId: string; teams: Team[]
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']> | null
}) {
  const answers = useAnswers(gameId)
  const bar = !!gameState?.reveal
  const step = gameState?.question_index ?? 0
  const scoredRounds = pack ? pack.rounds.filter(r => !r.off_scoreboard).length : 0
  // Те же места, что считает и показывает проектор (components/… нет,
  // логика короткая — держим формулу один в один с HostScreen.tsx:Finale,
  // чтобы подпись кнопки и то, что реально откроется на экране, не
  // разъезжались). Плотная нумерация мест (lib/ranking.ts) — раньше
  // жёсткий список [3,2,1] предполагал ровно три РАЗНЫХ места, а при
  // ничьей или маленьком числе команд третьего места могло не быть вовсе:
  // шаг «показать 3 место» открывал пустоту, а подписи следующих кнопок
  // после этого расходились со start тем, что реально видно на экране.
  const totals = pack ? computeTotals(pack, teams, answers) : new Map<string, number>()
  const roundScores = pack ? computeRoundScores(pack, teams, answers) : new Map<string, number[]>()
  const rows = rankTeams(teams, totals, answers, roundScores)
  const places = [...new Set(rows.map(r => r.place))].filter(p => p <= 3).sort((a, b) => b - a)
  return (
    <div className="adm-pad">
      <div className="adm-h1">ФИНАЛ</div>
      <div className="adm-dim">Команд: {teams.length} · ответов: {answers.length}</div>
      {pack && <div className="adm-dim">Пакет: {pack.name}</div>}

      <div className="adm-box">
        <div className="adm-dim">СЦЕНАРИЙ</div>
        <div className="adm-two">
          <button className={`adm-btn${!bar ? ' primary' : ''}`}
            onClick={() => void setFinaleMode('show')}>ШОУ (АВТО)</button>
          <button className={`adm-btn${bar ? ' primary' : ''}`}
            onClick={() => void setFinaleMode('bar')}>НАГРАЖДЕНИЕ (БАР)</button>
        </div>
        <div className="adm-dim">
          {bar
            ? 'Ручной режим: 3 → 2 → 1 место, каждый шаг по твоей команде. Успеваешь вручить и сфотографировать.'
            : `Авто: ${scoredRounds} слайдов по раундам (15 сек) → победитель (10 сек) → общая таблица.`}
        </div>
      </div>

      <div className="adm-box">
        <div className="adm-dim">
          {bar ? `ШАГ ${Math.min(step + 1, places.length + 1)} ИЗ ${places.length + 1}` : 'МОЖНО ПРОМОТАТЬ ВРУЧНУЮ'}
        </div>
        <div className="adm-two">
          <button className="adm-btn" disabled={step <= 0}
            onClick={() => void setFinaleStep(Math.max(0, step - 1))}>← НАЗАД</button>
          <button className="adm-btn primary"
            disabled={bar && step >= places.length}
            onClick={() => void setFinaleStep(step + 1)}>
            {/* Раньше подпись называла место, которое УЖЕ на экране (его
                открыл предыдущий клик) — «показать 3 место» жала кнопку,
                а на экране появлялось 2-е. Без номера эта путаница
                невозможна: следующий клик всегда открывает следующего
                призёра, пока не закончатся, потом — таблицу. */}
            {bar ? (step < places.length - 1 ? 'СЛЕДУЮЩИЙ ПОБЕДИТЕЛЬ →' : 'ПОКАЗАТЬ ТАБЛИЦУ →') : 'ДАЛЬШЕ →'}
          </button>
        </div>
      </div>

      {/* Команды (8.62) — таблица результатов/коррекция/оценки были видны
          на любой фазе игры и до этой правки, финал не исключение. */}
      {pack && gameState && <ResultsPanel pack={pack} gameState={gameState} teams={teams} />}

      {/* Кнопка очистки ОДНА на всю админку — она в лобби, где и нужна
          перед игрой. Здесь был её дубль с тем же действием: две кнопки
          с одинаковым смыслом только путали. */}
      {/* Почему у команды столько баллов — видно здесь, а не «на глаз».
          Главная причина нулей: ответ есть, но ведущий не нажал верно/неверно. */}
      <details className="adm-why">
        <summary>Почему такие баллы?</summary>
        {teams.map(t => {
          const mine = answers.filter(a => a.team_id === t.id)
          const graded = mine.filter(a => a.is_correct !== null).length
          const pending = mine.filter(a => a.is_correct === null
            && !a.question_ref.endsWith('-bid')).length
          return (
            <div key={t.id} className="adm-why-row">
              <span style={{ color: t.color }}>{t.name}</span>
              <span className="adm-dim">
                ответов {mine.length} · оценено {graded}
                {pending > 0 && ` · НЕ ОЦЕНЕНО ${pending}`}
              </span>
            </div>
          )
        })}
        <div className="adm-dim">Неоценённые ответы баллов не приносят.</div>
      </details>

      <button className="adm-link danger" onClick={() => {
        if (confirm('Начать новую игру?\n\nКоманды и ответы сохранятся в базе. '
          + 'Полная очистка — кнопкой в лобби.')) void resetGame()
      }}>⟲ НОВАЯ ИГРА</button>
    </div>
  )
}

/** Ручная корректировка баллов (8.56) — на случай, если автоподсчёт где-то
 *  сбойнул (задвоенный проход, забытая оценка). Пишет запись answers с
 *  ключом `q-adjust-<раунд>` (тот же приём, что у бумажных баллов) —
 *  computeTotals/computeRoundScores читают её и прибавляют поверх обычного
 *  счёта раунда, см. lib/totals.ts. Список ниже — уже применённые
 *  корректировки, их можно снять кнопкой «убрать» (обнуляет ставку). */
function ScoreAdjustPanel({ pack, gameId, teams, answers }: {
  pack: LoadedPack; gameId: string; teams: Team[]; answers: Answer[]
}) {
  const hint = useHint(12000)
  const [teamId, setTeamId] = useState(teams[0]?.id ?? '')
  const [ri, setRi] = useState(0)
  const [delta, setDelta] = useState('')
  const [note, setNote] = useState('')
  const [busy, setBusy] = useState(false)

  const existing = answers.filter(a =>
    a.question_ref.startsWith('q-adjust-') && Number(a.stake ?? 0) !== 0)

  const write = async (tId: string, roundIdx: number, stake: number, text: string) => {
    const { error } = await supabase.from('answers').upsert({
      team_id: tId, game_id: gameId, question_ref: `q-adjust-${roundIdx}`,
      round_number: roundIdx, answer_text: text, stake, is_correct: true,
      updated_at: new Date().toISOString(),
    } as never, { onConflict: 'team_id,question_ref' } as never)
    return error
  }

  const save = async () => {
    const n = Number(delta)
    if (!teamId) return hint.show('Выбери команду.')
    if (delta.trim() === '' || Number.isNaN(n) || n === 0) {
      return hint.show('Введи число очков, отличное от нуля — можно со знаком минус.')
    }
    setBusy(true)
    try {
      const error = await write(teamId, ri, n, note.trim())
      if (error) return hint.show(`Не сохранено: ${error.message}. Проверь связь и нажми ещё раз.`)
      hint.clear()
      setDelta(''); setNote('')
    } finally { setBusy(false) }
  }

  return (
    <div>
      <div className="adm-dim">
        Прибавляет или вычитает очки к счёту команды за раунд — если
        автоподсчёт где-то сбойнул. Сразу отражается в таблице результатов и на
        табло/финале у игроков.
      </div>
      <div className="adm-adjust-form">
        <select value={teamId} onChange={e => setTeamId(e.target.value)}>
          {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
        <select value={ri} onChange={e => setRi(Number(e.target.value))}>
          {pack.rounds.map((r, i) => (
            <option key={r.id} value={i}>Р{i + 1}. {(r.title_lines ?? []).join(' ') || '—'}</option>
          ))}
        </select>
        <input type="number" placeholder="+5 или -3" value={delta}
          onChange={e => setDelta(e.target.value)} />
        <input type="text" placeholder="комментарий (необязательно)" value={note}
          onChange={e => setNote(e.target.value)} />
        <button className="adm-btn" disabled={busy} onClick={() => void save()}>Сохранить</button>
      </div>
      <Hint text={hint.text} />
      {existing.length > 0 && (
        <div className="adm-adjust-list">
          {existing.map(a => {
            const t = teams.find(x => x.id === a.team_id)
            const rNum = Number(a.question_ref.slice('q-adjust-'.length))
            const stake = Number(a.stake ?? 0)
            return (
              <div key={a.id} className="adm-adjust-row">
                <span style={{ color: t?.color }}>{t?.name ?? '?'}</span>
                <span className="adm-dim">Р{rNum + 1}</span>
                <span className={stake > 0 ? 'adm-adjust-plus' : 'adm-adjust-minus'}>
                  {stake > 0 ? `+${stake}` : stake}
                </span>
                {a.answer_text && <span className="adm-dim">{a.answer_text}</span>}
                <button className="adm-link" onClick={() => void write(a.team_id, rNum, 0, '')}>
                  убрать
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

/** Панель репетиции: видна ТОЛЬКО при ?dev=1 в адресе.
 *  На боевой игре её не существует — случайно нажать нечего. */
function DevSeedPanel({ pack, gameState }: {
  pack: LoadedPack
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
}) {
  const [busy, setBusy] = useState('')
  const [msg, setMsg] = useState('')
  const [check, setCheck] = useState<CheckRow[] | null>(null)
  if (!isDevMode()) return null

  const run = async (label: string, fn: () => Promise<string>) => {
    setBusy(label); setMsg(''); setCheck(null)
    try { setMsg(await fn()) } catch (e) { setMsg('Ошибка: ' + (e as Error).message) }
    finally { setBusy('') }
  }

  return (
    <div className="adm-dev">
      <div className="adm-dim">РЕПЕТИЦИЯ · ?dev=1</div>
      <div className="adm-dev-row">
        <button className="adm-btn" disabled={!!busy}
          onClick={() => void run('teams', async () => {
            const n = await seedTeams(gameState.game_id)
            return n ? `Создано команд: ${n}` : 'Демо-команды уже есть'
          })}>+ ДЕМО-КОМАНДЫ</button>
        <button className="adm-btn" disabled={!!busy}
          onClick={() => void run('answers', async () => {
            const r = await seedRoundAnswers(pack, gameState.round_number, gameState.game_id)
            return r.teams
              ? `Ответов: ${r.rows} за ${r.teams} команд`
              : 'Сначала создай демо-команды'
          })}>ЗАПОЛНИТЬ РАУНД</button>
      </div>
      <div className="adm-dev-row">
        <button className="adm-btn" disabled={!!busy}
          onClick={() => { disableDevMode(); location.reload() }}>ВЫКЛЮЧИТЬ РЕЖИМ</button>
      </div>
      <div className="adm-dev-row">
        <button className="adm-btn primary" disabled={!!busy}
          onClick={() => void run('check', async () => {
            const rows = await checkRoundScoring(pack, gameState.round_number, gameState.game_id)
            setCheck(rows)
            const bad = rows.filter(r => r.diff !== 0).length
            return bad ? `РАСХОЖДЕНИЙ: ${bad}` : 'Начисления сходятся'
          })}>СВЕРИТЬ БАЛЛЫ</button>
        <button className="adm-btn" disabled={!!busy}
          onClick={() => void run('clear', async () => {
            const n = await clearSeed(gameState.game_id)
            return n ? `Удалено команд: ${n}` : 'Демо-данных нет'
          })}>УДАЛИТЬ ДЕМО</button>
      </div>
      <div className="adm-dev-row">
        {/* Выключение кнопкой: править адрес руками неудобно, а при переходе
            в комнату он всё равно пересобирается. */}
        <button className="adm-btn" onClick={() => { disableDevMode(); location.reload() }}>
          ВЫКЛЮЧИТЬ РЕЖИМ РЕПЕТИЦИИ
        </button>
      </div>
      {msg && <div className="adm-dev-msg">{msg}</div>}
      {check && check.length > 0 && (
        <table className="adm-dev-table">
          <thead><tr><th>команда</th><th>ждали</th><th>вышло</th><th>Δ</th></tr></thead>
          <tbody>
            {check.map(r => (
              <tr key={r.team} className={r.diff === 0 ? '' : 'bad'}>
                <td>{r.team}</td><td>{r.expected}</td><td>{r.actual}</td><td>{r.diff}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}


/** Показ слайдов-брифингов из админки. Работает в ЛЮБОЙ фазе: слайд не
 *  привязан к раунду, и вернуться можно туда же, откуда ушёл. */
function InfoSlidesButtons({ pack, gameState }: {
  pack: LoadedPack
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
}) {
  const slides = pack.settings?.info_slides ?? []
  const [open, setOpen] = useState(false)
  if (slides.length === 0) return null
  const active = gameState.phase === 'info'
  return (
    <div className="adm-slides">
      <button className="adm-link" onClick={() => setOpen(o => !o)}>
        {active ? '▣ СЛАЙД НА ЭКРАНЕ' : '▢ ПОКАЗАТЬ СЛАЙД'}
      </button>
      {open && (
        <div className="adm-slide-list">
          {slides.map((sl, i) => (
            <button key={sl.id} className="adm-btn"
              onClick={() => { void setFinaleStep(i); void setPhase('info'); setOpen(false) }}>
              {i + 1}. {sl.title || 'без названия'}
            </button>
          ))}
          {active && (
            <button className="adm-btn primary"
              onClick={() => { void setPhase('round_intro'); setOpen(false) }}>
              ← ВЕРНУТЬСЯ К РАУНДУ
            </button>
          )}
        </div>
      )}
    </div>
  )
}


/** Оценки команд: средняя по раундам, худшие вопросы, комментарии.
 *  Раньше грузилось по отдельной кнопке «★ ОЦЕНКИ КОМАНД», сейчас содержимое
 *  оверлея «Команды → Оценки игры» — монтируется только когда оверлей открыт
 *  (см. ResultsPanel), а значит грузить можно сразу, без своей кнопки-триггера:
 *  лишнего опроса базы вне оверлея по-прежнему нет. */
function RatingsBody({ pack, gameState }: {
  pack: LoadedPack
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
}) {
  const [rows, setRows] = useState<RatingRow[] | null>(null)
  const [busy, setBusy] = useState(false)

  const load = async () => {
    setBusy(true)
    try { setRows(await loadRatings(gameState.game_id)) }
    catch { setRows([]) }
    finally { setBusy(false) }
  }
  useEffect(() => { void load() }, [])

  const sum = rows ? summarize(rows) : null
  const qText = new Map<string, string>()
  pack.rounds.forEach(r => r.questions.forEach((q, i) =>
    qText.set(`q-${q.id}`, `${i + 1}. ${q.question_text.slice(0, 60)}`)))

  return (
    <div className="adm-rt">
      <button className="adm-btn" disabled={busy} onClick={() => void load()}>
        {busy ? 'загружаю…' : 'обновить'}
      </button>
      {sum && sum.size === 0 && <div className="adm-dim">оценок пока нет</div>}
      {sum && [...sum.values()].sort((a, b) => a.roundNumber - b.roundNumber).map(s => {
        const round = pack.rounds[s.roundNumber]
        const worst = [...s.byQuestion.entries()]
          .sort((a, b) => a[1].avg - b[1].avg).slice(0, 3)
        return (
          <div key={s.roundNumber} className="adm-rt-round">
            <div className="adm-rt-head">
              <b>Р{s.roundNumber + 1} {(round?.title_lines ?? []).join(' ')}</b>
              <span className={`adm-rt-avg${(s.avg ?? 0) < 6 ? ' low' : ''}`}>
                {s.avg == null ? '—' : s.avg.toFixed(1)}
              </span>
              <span className="adm-dim">{s.votes} голосов</span>
            </div>
            {worst.length > 0 && (
              <div className="adm-rt-worst">
                слабее всего:
                {worst.map(([ref, v]) => (
                  <div key={ref}>
                    <b>{v.avg.toFixed(1)}</b> {qText.get(ref) ?? ref}
                  </div>
                ))}
              </div>
            )}
            {s.comments.map((c, i) => (
              <div key={i} className="adm-rt-comment">«{c}»</div>
            ))}
          </div>
        )
      })}
    </div>
  )
}


/** Пульт ведущего для скачек (8.62) — «Начать скачки» с телефона, по
 *  аналогии с кнопкой «Старт!» на проекторе. Сама запись — в
 *  lib/raceActions.ts, общая с проектором: кто нажал первым, тот и запустил
 *  забег, второй клик (если случится) просто перезапишет то же самое поле
 *  тем же значением по факту. Пока забег идёт — ставить нечего, статус
 *  без кнопок; итог и переход дальше уже даёт общий блок «ЗАВЕРШИТЬ РАУНД»
 *  ниже (isInteractive в RoundView) — второй такой кнопки здесь не нужно. */
function RaceControls({ gameState }: {
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
}) {
  const teams = useTeams(gameState.game_id)
  const answers = useAnswers(gameState.game_id, gameState.round_number)
  const bets = answers.filter(a => a.question_ref === `q-race-${gameState.round_number}`)
  const stage = gameState.melody?.race?.stage

  if (stage === 'running') {
    return <div className="adm-dim">🐾 ЗАБЕГ ИДЁТ НА ПРОЕКТОРЕ</div>
  }
  if (stage === 'done') {
    return <div className="adm-dim">🏁 ЗАБЕГ ЗАВЕРШЁН</div>
  }
  return (
    <div className="adm-blitz">
      <div className="adm-dim" style={{
        color: bets.length === teams.length && teams.length > 0 ? '#22c55e' : undefined,
      }}>СДЕЛАЛИ ВЫБОР: {bets.length} / {teams.length}</div>
      <button className="adm-btn primary" disabled={bets.length === 0}
        onClick={() => void startRace(gameState)}>
        🏁 НАЧАТЬ СКАЧКИ (СТАВКИ ЗАКРЫВАЮТСЯ)
      </button>
    </div>
  )
}

/** Пульт ведущего для блица.
 *
 *  Все действия идут через чистые переходы из blitzState: админка только
 *  вызывает их и сохраняет результат. Логику здесь не дублируем — иначе
 *  проектор и пульт разойдутся, как это уже было с маршрутом после раунда.
 *
 *  Вопрос показывается ведущим вручную, а не автоматически: ему нужно
 *  успеть прочитать вопрос вслух и убедиться, что команда готова. */
function BlitzControls({ pack, round, gameState, onFinished }: {
  pack: LoadedPack
  round: LoadedPack['rounds'][number]
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
  /** Обычная навигация «раунд закончен, идём дальше» — та же функция, что
   *  и у остальных механик (RoundView.endRound). Показывается ТОЛЬКО когда
   *  блиц действительно завершён (state.finished): пока он идёт, кнопка
   *  «дальше» тут не при чём, а тут же рядом есть другая — досрочный обрыв
   *  (см. ниже) — раньше обе стояли одновременно с одинаковым текстом. */
  onFinished: () => void
}) {
  const { state, setState } = useBlitz(gameState.game_id, gameState.round_number)
  const teams = useTeams(gameState.game_id)
  const [busy, setBusy] = useState(false)
  // хук до ранних return — иначе React #310 (см. CLAUDE.md)
  const hint = useHint()

  const settings = round.settings as { teamSeconds?: number; timeoutPenalty?: number }
  const bank = round.questions.map(q => ({ id: q.id, hidden: q.hidden }))
  const cur = state?.current
  const q = cur ? round.questions.find(x => x.id === cur.questionId) : undefined
  const active = state ? currentTeam(state) : undefined
  const activeName = teams.find(t => t.id === active)?.name ?? '—'

  const push = async (next: BlitzState) => {
    setBusy(true)
    setState(next)                       // мгновенно в интерфейсе
    try {
      await saveBlitz(gameState.game_id, gameState.round_number, next)
      // Раунд закрылся — отправляем БАЛЛЫ за места в общий зачёт.
      // Очки живут в blitz_state, а общий подсчёт читает только answers,
      // поэтому итог кладём готовой строкой `q-blitz`.
      if (next.finished && !state?.finished) {
        const rows = blitzResults(toResults(next), settings.timeoutPenalty ?? 10)
        await Promise.all(rows.map(r => enqueueAnswer({
          team_id: r.teamId, game_id: gameState.game_id,
          question_ref: 'q-blitz', round_number: gameState.round_number,
          answer_text: `место ${r.place}`, stake: r.score,
        })))
      }
    } finally { setBusy(false) }
  }

  // ── Раунд ещё не начат: кубик выбирает первую команду ──
  if (!state) {
    return (
      <div className="adm-blitz">
        <div className="adm-dim">БЛИЦ · раунд не начат</div>
        <button className="adm-btn primary" disabled={busy}
          onClick={() => {
            // Блиц — игра по кругу: одной команде ходить не с кем.
            if (teams.length < 2) return hint.show(teams.length === 0
              ? 'Ни одной команды. Заведи их в блоке «КОМАНДЫ» или дай залу подключиться по QR.'
              : 'Для блица нужны минимум две команды: ход передаётся по кругу.')
            const order = [...teams].sort(() => Math.random() - 0.5).map(t => t.id)
            void push(initBlitz(order, settings.teamSeconds ?? 60))
          }}>
          🎲 БРОСИТЬ КУБИК И НАЧАТЬ
        </button>
        {teams.length < 2 && <div className="adm-dim">нужно минимум две команды</div>}
        <Hint text={hint.text} />
      </div>
    )
  }

  if (state.finished) {
    const rows = blitzResults(toResults(state), settings.timeoutPenalty ?? 10)
    return (
      <div className="adm-blitz">
        <div className="adm-dim">БЛИЦ ОКОНЧЕН</div>
        {state.timedOutTeam && (
          <div className="adm-bz-warn">
            время вышло у «{teams.find(t => t.id === state.timedOutTeam)?.name}» ·
            штраф {settings.timeoutPenalty ?? 10} очков
          </div>
        )}
        <table className="adm-dev-table">
          <thead><tr><th>команда</th><th>очки</th><th>место</th><th>баллы</th></tr></thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.teamId}>
                <td>{teams.find(t => t.id === r.teamId)?.name ?? r.teamId}</td>
                <td>{r.points}</td>
                <td>{r.place}{r.shared ? '=' : ''}</td>
                <td>{r.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="adm-btn primary" onClick={onFinished}>ДАЛЬШЕ →</button>
      </div>
    )
  }

  const left = remainingCount(bank, state.used)

  return (
    <div className="adm-blitz">
      <div className="adm-dim">ХОД: {activeName} · в банке {left}</div>

      {!cur && (
        <button className="adm-btn primary" disabled={busy || left === 0}
          onClick={() => {
            const next = pickNext(bank, state.used)
            if (!next) return void push(finishNoQuestions(state))
            // Отметка «отыгран» ставится в момент ПОКАЗА и переживает игру:
            // ведущий увидит её в редакторе и решит, убирать ли вопрос.
            void markPlayed(next.id).catch(() => {})
            void push(showQuestion(state, next.id, Date.now()))
          }}>
          {left === 0 ? 'ВОПРОСЫ КОНЧИЛИСЬ' : 'ПОКАЗАТЬ ВОПРОС →'}
        </button>
      )}

      {cur && (
        <>
          {/* Верный ответ у ведущего перед глазами: он и решает спорные */}
          <div className="adm-bz-q">{q?.question_text}</div>
          <div className="adm-bz-answer">ответ: <b>{displayAnswerText(q)}</b></div>
          {/* Что реально прислала команда — раньше не показывалось вообще,
              хотя текст уже лежит в cur.lastAnswer: ведущий решал «верно/
              неверно» вслепую, глядя только на правильный ответ. */}
          <div className="adm-bz-answer">
            {cur.lastAnswer ? <>ответила: <b>{cur.lastAnswer}</b></> : 'ответ: ждём…'}
          </div>
          <div className="adm-dim">попытка {cur.attempts + 1} из {MAX_ATTEMPTS}</div>
          <div className="adm-dev-row">
            <button className="adm-btn primary" disabled={busy}
              onClick={() => void push(answerCorrect(state, Date.now()))}>ВЕРНО ✓</button>
            <button className="adm-btn" disabled={busy}
              onClick={() => void push(answerWrong(state, Date.now()))}>НЕВЕРНО ✗</button>
          </div>
          <div className="adm-dev-row">
            <button className="adm-btn" disabled={busy}
              onClick={() => void push(skip(state, Date.now()))}>СКИП −1</button>
            <button className="adm-btn" disabled={busy}
              onClick={() => void push(pauseForCheck(state, Date.now()))}>⏸ ПАУЗА</button>
            <button className="adm-btn" disabled={busy}
              onClick={() => void push(resumeAfterCheck(state, Date.now()))}>▶ ДАЛЬШЕ</button>
          </div>
        </>
      )}

      {/* Раньше называлась так же, как соседняя кнопка «ЗАВЕРШИТЬ РАУНД» у
          других механик — а делает другое: не «идём дальше», а «оборвать
          блиц прямо сейчас, до истечения времени/вопросов». Разные подписи,
          чтобы не перепутать посреди раунда. */}
      <button className="adm-btn" disabled={busy}
        onClick={() => { if (confirm('Прервать блиц досрочно? Раунд закроется по текущим очкам.'))
          void push(finishNoQuestions(state)) }}>
        ⏹ ПРЕРВАТЬ БЛИЦ ДОСРОЧНО
      </button>

      <UsedQuestions round={round} used={state.used} />
    </div>
  )
}

/** Отыгранные вопросы с кнопкой «убрать навсегда».
 *
 *  Две пометки намеренно разные. «Сгорел» живёт в состоянии раунда и
 *  действует только эту игру — так вопросы не повторяются за вечер.
 *  «Убран навсегда» — это флаг hidden у самого вопроса, и ставит его
 *  ведущий руками. Система помечает, решает человек. */
function UsedQuestions({ round, used }: {
  round: LoadedPack['rounds'][number]; used: string[]
}) {
  const [open, setOpen] = useState(false)
  const [gone, setGone] = useState<string[]>([])
  if (used.length === 0) return null
  const items = used
    .map(id => round.questions.find(q => q.id === id))
    .filter((q): q is NonNullable<typeof q> => !!q)

  return (
    <div className="adm-bz-used">
      <button className="adm-link" onClick={() => setOpen(o => !o)}>
        ОТЫГРАНО: {used.length}
      </button>
      {open && items.map(q => {
        const removed = gone.includes(q.id) || q.hidden
        return (
          <div key={q.id} className={`adm-bz-used-row${removed ? ' gone' : ''}`}>
            <span>{q.question_text.slice(0, 60)}</span>
            <button className="adm-btn" disabled={removed}
              onClick={() => {
                if (!confirm('Убрать вопрос из банка навсегда?')) return
                setGone(g => [...g, q.id])
                void hideQuestion(q.id, true)
              }}>
              {removed ? 'убран' : 'убрать'}
            </button>
          </div>
        )
      })}
    </div>
  )
}

/** Текст верного ответа для пульта: у блица вопросы простые, но формат
 *  ответа общий для всего проекта. */
function displayAnswerText(q?: { answer: unknown }): string {
  const a = q?.answer as { display?: string | string[]; correct?: string } | undefined
  if (!a) return '—'
  if (Array.isArray(a.display)) return a.display.join(' / ')
  return a.display ?? a.correct ?? '—'
}
