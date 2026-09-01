import { createPortal } from 'react-dom'
import { RoomPicker } from './RoomPicker'
import { InfoSlideView } from '../components/InfoSlideView'
import { BlitzBoard, BlitzDice } from './rounds/BlitzRound'
import { useBlitz } from '../lib/blitzApi'
import {
  toResults, initBlitz, showQuestion, answerCorrect, answerWrong, skip,
  pauseForCheck, resumeAfterCheck, finishNoQuestions, pickNext, currentTeam,
  NEXT_DELAY_MS, MAX_ATTEMPTS, SKIP_MARK, type BlitzState,
} from '../lib/blitzState'
import { saveBlitz } from '../lib/blitzApi'
import { markPlayed } from '../lib/editorApi'
import { blitzResults } from '../lib/blitz'
import { getRoomId } from '../lib/room'
import { jeopardyTile } from '../lib/jeopardyRef'
import { mediaUrl, lenClass } from '../lib/media'
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { useGameState } from '../hooks/useGameState'
import { listPacks, loadPack, metaLine, displayRoundNumber, type LoadedPack } from '../lib/packLoader'
import {
  selectPackAndStart, gotoRound, slideForRound, gotoQuestion, revealAnswer, finishGame, resetGame, setPhase,
  startTimer, gotoAnswers, showScoreboard, startBreak, startAnswerTime, setFinaleStep,
  slideBeforeFinale, showSlide, startCounting,
} from '../lib/gameActions'
import { ThemeLayer } from '../components/ThemeLayer'
import { ScreenFx } from '../components/ScreenFx'
import { SnowCurtain } from '../components/NewYearScene'
import { CrosswordView } from '../components/CrosswordView'
import { computeTotals, computeRoundScores } from '../lib/totals'
import { autocheck } from '../lib/autocheck'
import { supabase } from '../lib/supabase'
import { useTeams, isAlive } from '../hooks/useTeams'
import { useFitText } from '../hooks/useFitText'
import { useScrambleReveal } from '../hooks/useScrambleReveal'
import { useAnswers } from '../hooks/useAnswers'
import type { Pack, Question, CrosswordGrid, JeopardyTheme, InfoSlide } from '../types/quiz'
import { SprintBoard } from './rounds/SprintRound'
import { SnakeTimer } from '../components/SnakeTimer'
import { rankTeams } from '../lib/ranking'
import { teamColor } from '../lib/teamColors'
import { probeMedia, createAudio, stopAllAudio, playSynced,
  type SyncedHandle } from '../lib/audioSource'
import { AudioGate } from '../components/AudioGate'
import { afterRoundStep } from '../lib/flow'
import { MelodyBoard } from './rounds/MelodyRound'
import { RaceBoard } from './rounds/RaceRound'

// ═══ Экран хоста (проектор) ═══
// Правила экрана: без скроллов; все кнопки — справа внизу; имя пакета — мелко
// в правом нижнем углу; крупные заголовки с темовым декором; вопрос появляется
// «ветром» по словам; текст+1-2 картинки — сплит-раскладка; аудио/видео автоплей.

export function HostScreen() {
  const { gameState, loading: gsLoading, roomId } = useGameState()
  const [pack, setPack] = useState<LoadedPack | null>(null)
  useEffect(() => {
    if (gameState?.pack_id) void loadPack(gameState.pack_id).then(setPack).catch(() => {})
    else setPack(null)
  }, [gameState?.pack_id])
  if (!gsLoading && !roomId) return <RoomPicker route="/" />
  const theme = pack?.theme ?? 'classic'
  // Ключ вспышки перехода: финал и рекап листают свои слайды САМИ каждые
  // 3-5с (question_index меняется автоматически) — вспышка на каждом слайде
  // дала бы стробоскоп, поэтому для них ключ БЕЗ question_index.
  const fxTrigger = gameState
    ? (gameState.phase === 'finale' || gameState.phase === 'recap'
        ? `${gameState.phase}-${gameState.round_number}`
        : `${gameState.phase}-${gameState.round_number}-${gameState.question_index}`)
    : ''
  return (
    <ThemeLayer theme={theme} isProjector>
      {theme === 'new_year' &&
        <SnowCurtain trigger={`${gameState?.phase}-${gameState?.round_number}-${gameState?.question_index}`} />}
      <HostInner gameState={gameState} pack={pack} />
      {/* Рендерится ВСЕГДА (условие на тему — внутри компонента), а не
          {theme !== 'new_year' && ...}: постоянное число детей ThemeLayer
          важно, чтобы новая сборка не перемонтировала проектор целиком. */}
      <ScreenFx theme={theme} trigger={fxTrigger} />
      {pack && <div className="pack-badge">{pack.name}</div>}
    </ThemeLayer>
  )
}

function Deco({ theme }: { theme: string }) {
  if (theme === 'new_year') return <div className="title-deco">🎄 ❄ 🎁 ❄ 🎄</div>
  if (theme === 'potter') return <div className="title-deco">⚡ ✦ 🪄 ✦ ⚡</div>
  return null
}

/** Декор титула в киберпанке: полоса-«дешифратор» под заголовком.
 *  У НГ и ГП свой декор (ёлки/молнии), у классики его не было вообще —
 *  экран заставки выглядел пустым. Элемент строчный, в потоке колонки:
 *  наехать на правила он не может, ширина ограничена родителем. */
function CyberDeco({ theme }: { theme: string }) {
  if (theme !== 'classic') return null
  return (
    <div className="cyber-deco" aria-hidden="true">
      <span className="cd-line" />
      <span className="cd-chip">◆</span>
      <span className="cd-line" />
    </div>
  )
}

function HostInner({ gameState, pack }: {
  gameState: ReturnType<typeof useGameState>['gameState']
  pack: LoadedPack | null
}) {
  const [packs, setPacks] = useState<Pack[]>([])
  const [selectedId, setSelectedId] = useState('')
  useEffect(() => { void listPacks().then(setPacks).catch(() => setPacks([])) }, [])

  const teams = useTeams(gameState?.game_id ?? null)

  const playerUrl = useMemo(() => {
    const base = `${location.origin}${location.pathname}#/player?room=${getRoomId() ?? ''}`
    return gameState?.pack_id ? `${base}&pack=${gameState.pack_id}` : base
  }, [gameState?.pack_id])

  // Разбивка игроков по командам, опубликованная из админки.
  // ВНИМАНИЕ: и вычисление, и оба хука ниже обязаны стоять ДО любого
  // раннего return. React сверяет число хуков между рендерами: пока
  // gameState был null, ветка с ними не выполнялась, и на первом же
  // успешном рендере количество хуков менялось — падал React #310.
  const groups: string[][] =
    ((gameState as unknown as { random_groups?: string[][] } | null)?.random_groups ?? [])
      .filter(g => Array.isArray(g) && g.length > 0)
  // Ключ по содержимому составов: перегенерировали — модалка открылась снова.
  const groupsKey = groups.map(g => g.join(',')).join('|')
  const [groupsOpen, setGroupsOpen] = useState(true)
  useEffect(() => { setGroupsOpen(true) }, [groupsKey])
  const groupsShown = groups.length > 0 && groupsOpen

  // Предзагрузка следующего вопроса. Хук стоит ЗДЕСЬ, до всех ранних
  // return: вызов внутри условия однажды уже дал падение React #310.
  usePreloadNext(pack?.rounds?.[gameState?.round_number ?? 0], gameState?.question_index ?? 0)

  if (!gameState) return <div className="host-screen grid-bg">Загрузка…</div>

  // ── Лобби / выбор пакета ──
  const paperMode = pack?.settings?.play_mode === 'paper'

  if (gameState.phase === 'lobby' || !gameState.pack_id || !pack) {
    return (
      <div className={`host-screen grid-bg${paperMode ? ' paper-lobby' : ''}`}>
        {/* Киберпанк-обвязка логотипа. У НГ и ГП экран лобби живой сам по
            себе (снег, свечи), у классики он висел статичной картинкой —
            а игроки смотрят на него дольше, чем на любой другой экран.
            Панели стоят СЛЕВА и СПРАВА от логотипа отдельными колонками,
            поэтому налезть на него не могут: ширину делит флекс-строка. */}
        {/* Музыка звучит, только когда пакет ВЫБРАН и мы уже ждём команды.
            Эта ветка включает и экран выбора пакета — там трек заводился
            до начала игры, пока ведущий ещё листает список. */}
        {gameState.phase === 'lobby' && !!gameState.pack_id && pack &&
          <LobbyMusic pack={pack} />}
        {(pack?.theme ?? 'classic') === 'classic' ? (
          <div className="cyber-lobby-head">
            <CyberPanel side="left" />
            <div className="clh-title">
              <Title theme="classic" lines={['QUIZ', 'PARTY']} />
              <CyberDeco theme="classic" />
            </div>
            <CyberPanel side="right" />
          </div>
        ) : (
          <>
            <Title theme={pack?.theme ?? 'classic'} lines={['QUIZ PARTY']} />
            <Deco theme={pack?.theme ?? 'classic'} />
          </>
        )}
        {!gameState.pack_id ? (
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <select value={selectedId} onChange={e => setSelectedId(e.target.value)}
              style={{ fontSize: '1.2rem' }}>
              <option value="">— выбрать пакет —</option>
              {packs.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.status === 'ready' ? 'готов' : p.status === 'played' ? 'сыгран' : p.status})
                </option>
              ))}
            </select>
            <button disabled={!selectedId} style={{ fontSize: '1.2rem' }}
              onClick={() => {
                const p = packs.find(x => x.id === selectedId)
                if (p && p.status === 'draft' &&
                    !confirm('Пакет — черновик (валидатор не пройден). Играть как есть?')) return
                void selectPackAndStart(selectedId)
              }}>
              Начать игру
            </button>
          </div>
        ) : (
          <>
            {/* Лобби как было: список подключившихся команд по центру.
                Составы от рандомайзера появляются НАД ним и только если их
                опубликовали — без них экран выглядит ровно как раньше. */}
            {/* Составы от рандомайзера — модалкой поверх лобби.
                В потоке они выдавливали список подключившихся вниз, а при
                восьми командах экран переставал помещаться. Модалка
                открывается сама, когда составы опубликовали, закрывается
                ведущим и возвращается кнопкой. Размер считает сетка внутри:
                колонок тем больше, чем больше команд. */}
            {groupsShown && (
              <GroupsModal groups={groups} onClose={() => setGroupsOpen(false)} />
            )}
            {groups.length > 0 && !groupsOpen && (
              <button className="ghost dark lobby-groups-btn"
                onClick={() => setGroupsOpen(true)}>СОСТАВЫ КОМАНД</button>
            )}
            <div className="lobby-teams">
              {teams.length > 0 && <div className="mono-tag">ПОДКЛЮЧИЛИСЬ ({teams.length})</div>}
              {teams.length === 0
                ? (paperMode ? null : <span style={{ opacity: .5 }}>ждём команды…</span>)
                : teams.map(t => (
                  <span key={t.id} className="lobby-team team-chip-fx"
                    style={{ ['--tc' as string]: t.color, opacity: isAlive(t) ? 1 : .4 }}>
                    {t.name}
                  </span>
                ))}
            </div>
            {/* QR — всегда маленький в левом нижнем углу, нигде по центру.
                Когда открыты составы, экран затемняется, а QR поднимается
                НАД затемнением и подсвечивается: опоздавшие должны видеть,
                куда подключаться, даже во время показа команд. */}
            {!paperMode && (
              <img alt="QR"
                className={`lobby-qr-corner${groupsShown ? ' lobby-qr-lit' : ''}`}
                src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=1&data=${encodeURIComponent(playerUrl)}`} />
            )}
            {!paperMode && groupsShown && (
              <div className="lobby-qr-hint">СКАНИРУЙ, ЧТОБЫ ИГРАТЬ</div>
            )}
            <div className="host-actions">
              <button className="ghost dark" onClick={() => {
                if (confirm('Сбросить игру и выбрать другой пакет?')) void resetGame()
              }}>⟲ Сменить пакет</button>
              <button onClick={() => void gotoRound(0,
                slideForRound(pack?.settings?.info_slides, 0) ?? undefined)}>К первому раунду →</button>
            </div>
          </>
        )}
      </div>
    )
  }

  const round = pack.rounds[gameState.round_number]
  if (!round) return <div className="host-screen grid-bg">Раунд не найден — проверь пакет</div>
  const q = round.questions[gameState.question_index]

  // ── Титул раунда ──
  if (gameState.phase === 'round_intro') {
    const grid = (round.settings as { grid?: CrosswordGrid }).grid
    return (
      <div className="host-screen grid-bg round-intro">
        {round.rules_audio && <audio autoPlay src={mediaUrl(round.rules_audio)} />}
        {round.mechanic === 'crossword' && grid ? (
          <div className="cw-layout">
            {/* только пустая сетка — без слов и определений */}
            <CrosswordView grid={grid}
              cellSize={Math.max(18, Math.min(44,
                Math.floor(Math.min(innerWidth * .48 / grid.cols, innerHeight * .8 / grid.rows))))} />
            <div className="side">
              <div className="mono-tag">РАУНД {displayRoundNumber(pack, gameState.round_number)}</div>
              <Title theme={pack.theme} lines={round.title_lines} />
              <div className="meta-line" style={{ alignSelf: 'flex-start' }}>{metaLine(round)}</div>
              {round.rules.map((r, i) => (
                <div key={i} className="rule-item" style={{ animationDelay: `${0.5 + i * 0.5}s` }}>
                  <span className="idx">{String(i + 1).padStart(2, '0')}</span>{r}
                </div>
              ))}
            </div>
          </div>
        ) : (<>
          {/* номер раунда — крупно в левом верхнем углу, читается с дальних столов */}
          <div className="round-badge">
            <span className="rb-word">РАУНД</span>
            <span className="rb-num">{displayRoundNumber(pack, gameState.round_number)}</span>
          </div>
          {/* Обёртка нужна ДЛЯ РАЗМЕРА ЗАГОЛОВКА: кегль считается от ширины
              этой колонки (cqw), а не от ширины экрана (vw). Раньше заголовок
              мельчал одинаково и там, где правила съедали полэкрана, и там,
              где их нет вовсе — на пустом экране он выглядел крошечным. */}
          <div className="ri-main">
            <Title theme={pack.theme} lines={round.title_lines} />
            <Deco theme={pack.theme} />
            <CyberDeco theme={pack.theme} />
            <div className="meta-line">{metaLine(round)}</div>
          </div>
          {/* Правила сбоку от заголовка: подпись на рамке не помещалась,
              а по центру рамка отжимала кнопки. Как в кроссворде — колонкой. */}
          {round.rules.length > 0 && (
            <div className="rules-frame" data-count={round.rules.length}>
              <div className="rules-frame-label">ПРАВИЛА</div>
              {round.rules.map((r, i) => (
                <div key={i} className="rule-item" style={{ animationDelay: `${0.5 + i * 0.7}s` }}>
                  <span className="idx">{String(i + 1).padStart(2, '0')}</span>{r}
                </div>
              ))}
            </div>
          )}
        </>)}
        <div className="host-actions">
          <button onClick={() => void gotoQuestion(0)}>
            {round.mechanic === 'jeopardy' ? 'Начать раунд →'
              : round.mechanic === 'race' ? 'К скачкам →'
              : round.mechanic === 'melody' ? 'К трекам →'
              : round.mechanic === 'sprint' ? 'Поехали →'
              : 'Первый вопрос →'}</button>
        </div>
      </div>
    )
  }

  // ── «120 секунд»: все вопросы на слайде ──
  if (gameState.phase === 'question' && round.mechanic === 'sprint') {
    return (
      <div className="host-screen grid-bg">
        <SprintBoard pack={pack} round={round} gameState={gameState}
          timerNode={<Timer startedAt={gameState.timer_started_at}
            seconds={round.timer_seconds} theme={pack.theme} />} />
        <div className="host-actions">
          <button className="ghost dark" onClick={() => void gotoAnswers(0)}>К ответам →</button>
        </div>
      </div>
    )
  }

  // ── Блиц «100 вопросов» ──
  // Без этой ветки проектор рисует блиц как обычный раунд: состояние
  // никто не создаёт, и на телефонах висит «Раунд ещё не начался».
  // Механика может быть написана целиком и всё равно не работать.
  if (gameState.phase === 'question' && round.mechanic === 'blitz') {
    return <BlitzScreen pack={pack} round={round} gameState={gameState} />
  }

  // ── «Скачки бульдогов» ──
  if (gameState.phase === 'question' && round.mechanic === 'race') {
    return <RaceBoard pack={pack} round={round} gameState={gameState} />
  }

  // ── «Угадай мелодию» ──
  if (gameState.phase === 'question' && round.mechanic === 'melody') {
    return <MelodyBoard pack={pack} round={round} gameState={gameState} />
  }

  // ── Своя игра: сетка плиток ──
  if (gameState.phase === 'question' && round.mechanic === 'jeopardy') {
    return <JeopardyBoard pack={pack} round={round} gameState={gameState} />
  }

  // ── Вопрос ──
  if (gameState.phase === 'question' && q) {
    const media = q.media.question ?? []
    const imgs = media.filter(m => !/\.(mp3|mp4|webm|wav)$/i.test(m))
    const avs = media.filter(m => /\.(mp3|mp4|webm|wav)$/i.test(m))
    const split = !!q.question_text.trim() && imgs.length === 1 && !q.media.hidden
    const choices = q.answer.mode === 'choice' ? q.answer.choices
      : q.answer.mode === 'order' ? q.answer.choices : null
    const isNY = pack.theme === 'new_year'
    const timeLow = !!gameState.timer_started_at &&
      (Date.now() - new Date(gameState.timer_started_at).getTime()) / 1000 > round.timer_seconds - 10
    // Обёртка вопроса была пустым div только в киберпанке: в НГ там сосульки,
    // в ГП своё оформление. Даём классике рамку — разметка не меняется,
    // добавляется только класс на уже существующий контейнер.
    const isCyber = pack.theme === 'classic'
    // Есть ли вообще текст вопроса: у ребусов его не бывает, и в обычных
    // вопросах поле могут оставить пустым, когда всё говорит картинка.
    const hasText = !!q.question_text.trim()
    const isPotter = pack.theme === 'potter'
    const frameCls = isPotter && round.mechanic !== 'rebus' ? 'pt-frame'
      : isNY && round.mechanic !== 'rebus' ? `q-frame${timeLow ? ' low' : ''}`
      : isCyber ? 'cyber-frame' : ''
    // подписи-буквы на картинках нужны, когда картинок столько же, сколько вариантов/пар
    const lettered = !q.media.hidden && imgs.length > 1 && (
      (q.answer.mode === 'choice' && q.answer.choices.length === imgs.length) ||
      (q.answer.mode === 'match' && q.answer.left.length === imgs.length))
    const revealMode = (pack.settings?.answers_reveal && round.answers_reveal === 'after_question'
      ? round.answers_reveal : round.answers_reveal) ?? 'after_round'

    return (
      <div className={`host-screen grid-bg${hasText ? '' : ' no-qtext'}${
        imgs.length && !q.media.hidden ? ' has-media' : ''}${
        (choices && !lettered) || (q.answer.mode === 'match'
          && (q.answer.right_labels ?? []).some(Boolean)) ? ' has-choices' : ''}`}>
        <AudioGate />
        {round.mechanic !== 'jeopardy' && <>
          <QuestionAudio startedAt={gameState.timer_started_at} seconds={round.timer_seconds} q={q} round={round} pack={pack} timerRunning={!!gameState.timer_started_at} manual={paperMode} />
          <AutoAdvance round={round} gameState={gameState}
            isLast={gameState.question_index + 1 >= round.questions.length} />
          <AutoReveal enabled={revealMode === 'after_question' && !gameState.reveal}
            startedAt={gameState.timer_started_at} seconds={round.timer_seconds} />
        </>}
        <div className="host-topbar">
          <span className="qnum">Р{displayRoundNumber(pack, gameState.round_number)} · ВОПРОС{' '}
            <b>{gameState.question_index + 1}</b> / {round.questions.length}</span>
          {round.mechanic !== 'jeopardy' &&
            <Timer key={q.id} startedAt={gameState.timer_started_at} seconds={round.timer_seconds}
              theme={pack.theme} />}
        </div>

        {split ? (
          /* Картинка лежит РЯДОМ с рамкой вопроса, а не внутри неё.
             Пока она была вложена в рамку, экран выглядел так: рамка держит
             свою высоту, картинка тянется на 68vh и вылезает за её нижний
             край — прямо под плитки вариантов. Теперь колонки делят место
             честно: слева рамка с текстом, справа картинка во всю
             доступную высоту, и наезжать друг на друга им нечем. */
          <div className="q-split">
            <div className={frameCls}>
              {isNY && <Icicles seed={q.id} low={timeLow} />}
              {isCyber && <span className="cf-scan" aria-hidden="true" />}
              <WindText key={q.id} text={q.question_text} />
            </div>
            <div className="q-media-grid n1" style={mediaScaleVar(q)}>
              {imgs.map((m, i) => (
                <figure key={i} className="q-img"><img src={mediaUrl(m)} alt="" />
                  {q.answer.mode === 'match' && <figcaption>{i + 1}</figcaption>}</figure>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Пустой текст — пустая рамка. У ребусов текста нет никогда, но
                так же бывает и в обычных вопросах, где всё сказано картинкой.
                Раньше на экране висел пустой контейнер и съедал высоту,
                которая нужна изображениям. */}
            {hasText && (
              <div className={frameCls}>
                {isNY && <Icicles seed={q.id} low={timeLow} />}
                {isCyber && <span className="cf-scan" aria-hidden="true" />}
                <WindText key={q.id} text={q.question_text} />
              </div>
            )}
            {!q.media.hidden && imgs.length > 0 && (
              lettered
                /* картинки-варианты и сопоставление: подпись-буква/номер прямо на карточке */
                ? <div className={`img-answers n${Math.min(imgs.length, 5)}${
                      imgs.length > 1 ? ' eq-row' : ''}`}>
                    {imgs.map((m, i) => (
                      <FitAnswer key={i} src={mediaUrl(m)}
                        badge={q.answer.mode === 'match' ? String(i + 1) : (choices?.[i]?.key ?? '')}>
                        {q.answer.mode === 'choice' && choices?.[i]?.text &&
                          <span className="ia-text">{choices[i].text}</span>}
                      </FitAnswer>
                    ))}
                  </div>
                : <div className={`q-media-grid n${Math.min(imgs.length, 4)}${
                      round.mechanic === 'rebus' ? ' rebus' : ''}${
                      // Ребус тоже идёт выключным рядом. Раньше он был из него
                      // исключён ради равной ШИРИНЫ половин, но на экране это
                      // читалось хуже: снимки в паре разной высоты и мельче
                      // отведённого места. Равная высота важнее — её и просили.
                      imgs.length > 1 ? ' eq-row' : ''}`}
                    style={mediaScaleVar(q)}>
                    {imgs.map((m, i) => <FitImg key={i} src={mediaUrl(m)} />)}
                  </div>
            )}
          </>
        )}

        {/* Медиа вопроса ждёт озвучку: пока её читают, видео молчит.
            Запуск привязан к таймеру — они стартуют одновременно. */}
        {avs.map((m, i) => /\.(mp4|webm)$/i.test(m)
          ? <QuestionVideo key={i} src={mediaUrl(m)} hidden={!!q.media.hidden}
              waitFor={!!q.media.voice} go={!!gameState.timer_started_at} />
          : null)}

        {q.answer.mode === 'match' && (q.answer.right_labels ?? []).some(Boolean) && (
          <div className={`choices-grid${
            choicesLenClass((q.answer.right_labels ?? []) as string[])}`}>
            {q.answer.right.map((r, i) => (
              <div key={r} className="choice-plate" style={{ animationDelay: `${0.3 + i * 0.3}s` }}>
                <span className="key">{r}</span>{(q.answer as { right_labels?: string[] }).right_labels?.[i] ?? ''}
              </div>
            ))}
          </div>
        )}
        {choices && !lettered && (
          <div className={`choices-grid${choicesLenClass(choices.map(c => c.text))}`}>
            {choices.map((c, i) => (
              <div key={c.key} className="choice-plate" style={{ animationDelay: `${0.3 + i * 0.35}s` }}>
                <span className="key">{c.key}</span>{c.text}
              </div>
            ))}
          </div>
        )}

        {(revealMode === 'after_question' || round.mechanic === 'jeopardy') && gameState.reveal && (
          <div className="answer-reveal hud-frame">
            <div className="answer-label">ПРАВИЛЬНЫЙ ОТВЕТ</div>
            <div className="answer-main">{displayAnswer(q)}</div>
            {q.answer_note && <div style={{ opacity: .75 }}>{q.answer_note}</div>}
            {/* Раньше сюда как <img> уходило ВСЁ медиа ответа, включая mp3:
                звук не играл, а на экране висела битая картинка. Теперь
                картинки показываем, звук играем. */}
            {(() => {
              const media = q.media.answer ?? []
              const pics = media.filter(m => !/\.(mp3|wav|m4a|ogg)$/i.test(m))
              const sound = media.find(m => /\.(mp3|wav|m4a|ogg)$/i.test(m))
              return (<>
                {sound && <AnswerAudio src={mediaUrl(sound)} />}
                {pics.length > 0 && (
                  <div className="q-media-grid" style={{ maxHeight: '26vh' }}>
                    {pics.map((m, i) => <img key={i} src={mediaUrl(m)} alt="" />)}
                  </div>
                )}
              </>)
            })()}
          </div>
        )}

        <div className="host-actions">
          <BackBtn gameState={gameState} />
          {(revealMode === 'after_question' || round.mechanic === 'jeopardy') && !gameState.reveal &&
            <button onClick={() => void revealAnswer()}>Показать ответ</button>}
          {gameState.question_index + 1 < round.questions.length
            ? <button onClick={() => void gotoQuestion(gameState.question_index + 1)}>Дальше →</button>
            : revealMode === 'after_round'
              ? <button onClick={() => void startAnswerTime()}>Время ответов →</button>
              : <AfterRoundNav pack={pack} gameState={gameState} />}
        </div>
      </div>
    )
  }

  if (gameState.phase === 'info') {
    const slides = pack?.settings?.info_slides ?? []
    const slide = slides[gameState.question_index] ?? slides[0]
    if (slide) return <InfoScreen pack={pack} slide={slide} packId={gameState.pack_id} />
  }

  if (gameState.phase === 'recap') {
    return <RecapSlides pack={pack} round={round} gameState={gameState} />
  }

  if (gameState.phase === 'answer_time') {
    return <AnswerTime pack={pack} round={round} gameState={gameState} />
  }

  if (gameState.phase === 'show_answers' && q) {
    return <ShowAnswers pack={pack} round={round} q={q} gameState={gameState} />
  }

  if (gameState.phase === 'scoreboard') {
    return <ScoreboardScreen pack={pack} gameState={gameState} />
  }

  if (gameState.phase === 'break') {
    return <BreakScreen pack={pack} round={round} gameState={gameState} />
  }

  if (gameState.phase === 'counting') {
    return <CountingScreen pack={pack} gameState={gameState} />
  }

  if (gameState.phase === 'finale') {
    return <Finale pack={pack} gameId={gameState.game_id} gameState={gameState} />
  }

  return <div className="host-screen grid-bg">
    <div className="mono-tag">ФАЗА: {gameState.phase}</div>
    {gameState.phase === 'question' && !q &&
      <p style={{ opacity: .7 }}>В этом раунде нет вопросов — добавь их в редакторе</p>}
    <div className="host-actions">
      <button onClick={() => void setPhase('round_intro')}>← К титулу раунда</button>
    </div>
  </div>
}

/** «Назад»: предыдущий вопрос или титул раунда; между раундами не ходит (п.12). */
function BackBtn({ gameState }: { gameState: NonNullable<ReturnType<typeof useGameState>['gameState']> }) {
  return gameState.question_index > 0
    ? <button className="ghost" onClick={() => void gotoQuestion(gameState.question_index - 1)}>← Назад</button>
    : <button className="ghost" onClick={() => void setPhase('round_intro')}>← К титулу</button>
}

/** Ледяная рамка с сосульками (только НГ-тема). */
function Icicles({ seed, low }: { seed: string; low: boolean }) {
  const items = useMemo(() => {
    let s = 0
    for (const ch of seed) s = (s * 31 + ch.charCodeAt(0)) >>> 0
    const rnd = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296 }
    const n = 60
    return Array.from({ length: n }, (_, i) => ({
      left: (i + 0.5) * (100 / n) + (rnd() - 0.5) * 2.5,
      len: 8 + rnd() * 34,
      delay: rnd() * 0.5,
      sway: 3 + rnd() * 3,
    }))
  }, [seed])
  return (
    <div className="icicles">
      {items.map((it, i) => (
        <span key={i} className="icicle" style={{
          left: `${it.left}%`, height: it.len, ['--len' as string]: `${it.len}px`,
          animationDelay: `${it.delay}s, ${it.delay}s`,
          animationDuration: `${it.sway}s, .7s`,
        }} />
      ))}
    </div>
  )
}

/** Размер пояснения к ответу — по его длине: короткое читается крупно,
 *  длинное ужимается, чтобы влезть в блок под ответом. */
export function noteClass(text: string): string {
  const n = (text ?? '').trim().length
  if (n <= 90) return ''
  if (n <= 200) return ' n-m'
  if (n <= 360) return ' n-l'
  return ' n-xl'
}

/** Класс размера по длине текста: чем короче вопрос, тем крупнее буквы. */

// lenClass переехал в src/lib/media.ts — см. импорт вверху файла.

/** Ступень кегля для плиток вариантов — по САМОМУ ДЛИННОМУ варианту.
 *  Раньше кегль был фиксированным: четыре развёрнутые формулировки не
 *  влезали по высоте и уезжали под кнопки «Назад / Показать ответ».
 *  Считаем по одному, самому длинному, чтобы плитки остались одного размера. */
export function choicesLenClass(texts: (string | undefined)[]): string {
  const n = Math.max(0, ...texts.map(t => (t ?? '').trim().length))
  if (n <= 28) return ''
  if (n <= 55) return ' c-m'
  if (n <= 95) return ' c-l'
  return ' c-xl'
}

/** Появление текста «ветром»: по словам с каскадной задержкой. */
function WindText({ text }: { text: string }) {
  const words = text.split(/(\s+)/)
  let idx = 0
  // Кегль из CSS — это подгон под ширину ЭКРАНА. Дальше текст вписывается в
  // реально доступное место: вопрос на 440 знаков иначе наезжает на шапку,
  // на варианты или на кнопки ведущего — на каждом экране по-своему.
  const fit = useFitText<HTMLParagraphElement>([text])
  return (
    <p ref={fit} className={`q-text${lenClass(text)}`}>
      {words.map((w, i) => {
        if (/^\s+$/.test(w)) return w
        const delay = 0.12 * idx++
        return <span key={i} className="q-word" style={{ animationDelay: `${delay}s` }}>{w}</span>
      })}
    </p>
  )
}

/** Заголовок: в НГ-теме буквы выпадают снегом и обрастают сугробом. */
/** Длина самого длинного слова заголовка. Переносить длинное слово некуда,
 *  поэтому по этой длине CSS выбирает кегль — иначе «ЭЛЕКТРОЭНЦЕФАЛОГРАФИЯ»
 *  уезжает за край колонки и наползает на правила раунда. */
function longestWord(lines: string[]): number {
  const words = lines.join(' ').split(/\s+/).filter(Boolean)
  return Math.min(20, words.reduce((m, w) => Math.max(m, w.length), 0))
}

function Title({ theme, lines }: { theme: string; lines: string[] }) {
  const longest = longestWord(lines)
  // «Взлом терминала»: заголовок дешифруется посимвольно, только в классике.
  // Длина строки не меняется (см. lib/scramble.ts) — кегль, посчитанный по
  // --longest, не прыгает во время дешифровки. Хук стоит ДО раннего return
  // ниже — иначе разное число хуков между темами уронило бы React (#310).
  const joined = lines.join('\n')
  const scrambled = useScrambleReveal(joined, theme === 'classic')
  const shown = theme === 'classic' ? scrambled.split('\n') : lines
  if (theme !== 'new_year') {
    return (
      <h1 className="neon-title title-anim" data-longest={longest}
        style={{ '--longest': longest, '--lines': lines.length } as CSSProperties}>
        {lines.map((l, i) => (
          <span key={i} style={i === lines.length - 1 && lines.length > 1 ? { color: 'var(--accent)' } : {}}>{shown[i] ?? l}<br /></span>
        ))}
      </h1>
    )
  }
  let n = 0
  return (
    <h1 className="neon-title" data-longest={longest}
      style={{ '--longest': longest, '--lines': lines.length } as CSSProperties}>
      {lines.map((line, li) => (
        <span key={li} style={{ display: 'block' }}>
          {[...line].map((ch, i) => ch === ' '
            ? <span key={i}>&nbsp;</span>
            : <span key={i} className="ny-letter" style={{ animationDelay: `${0.06 * n++}s` }}>{ch}</span>)}
        </span>
      ))}
    </h1>
  )
}

/** Останавливает ВСЁ звучащее на странице.
 *  Пауз через ссылки на конкретные плееры недостаточно: элементы создаются
 *  и React-разметкой, и вручную, и в модалках раундов. Проще один раз пройти
 *  по всем и остановить. Вызывается при СМЕНЕ вопроса и по концу таймера. */
export function stopAllMedia() {
  // вся работа — в реестре плееров: он видит и объекты Audio, созданные
  // кодом, и элементы из разметки
  stopAllAudio()

}

/** Сигнал окончания таймера: ПЯТЬ коротких пиков и длинный финальный тон —
 *  как на кухонном/спортивном таймере. Синтезируем на месте: не нужен файл,
 *  не зависит от сети и не ломается, если медиа пакета не докачались.
 *  Прямоугольная волна выбрана намеренно — она резкая и пробивает шум бара. */
function playChime() {
  try {
    const Ctx = (window.AudioContext
      ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)
    const ctx = new Ctx()
    const t0 = ctx.currentTime
    const master = ctx.createGain()
    master.gain.value = 0.5
    master.connect(ctx.destination)

    const beep = (freq: number, at: number, len: number, type: OscillatorType, vol: number) => {
      const o = ctx.createOscillator(), g = ctx.createGain()
      o.type = type
      o.frequency.setValueAtTime(freq, t0 + at)
      g.gain.setValueAtTime(0.0001, t0 + at)
      g.gain.linearRampToValueAtTime(vol, t0 + at + 0.008)
      g.gain.setValueAtTime(vol, t0 + at + len - 0.05)
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + at + len)
      o.connect(g); g.connect(master)
      o.start(t0 + at); o.stop(t0 + at + len + 0.02)
    }

    // пять пиков «пи-пи-пи-пи-пи»
    for (let i = 0; i < 5; i++) beep(1046.5, i * 0.22, 0.11, 'square', 0.30)
    // длинный финальный тон: два голоса, чтобы звучал плотнее
    beep(784, 1.20, 1.25, 'square', 0.26)
    beep(392, 1.20, 1.25, 'sine', 0.30)

    setTimeout(() => void ctx.close(), 3000)
  } catch { /* звук не критичен: игра идёт дальше */ }
}

function Timer({ startedAt, seconds, theme, chime = true }: {
  startedAt: string | null; seconds: number; theme?: string; chime?: boolean
}) {
  const [left, setLeft] = useState(seconds)
  const rang = useRef(false)
  useEffect(() => {
    if (!startedAt) { setLeft(seconds); rang.current = false; return }
    const tick = () => {
      const elapsed = (Date.now() - new Date(startedAt).getTime()) / 1000
      const l = Math.max(0, Math.ceil(seconds - elapsed))
      setLeft(l)
      // гонг ровно один раз на запуск таймера; в музыкальных раундах выключен,
      // чтобы не наложиться на трек
      if (l === 0 && chime && !rang.current) { rang.current = true; playChime() }
    }
    tick()
    const t = setInterval(tick, 250)
    return () => clearInterval(t)
  }, [startedAt, seconds, chime])
  const low = left <= 10
  if (theme === 'new_year') {
    const R = 44, C = 2 * Math.PI * R
    const frac = Math.max(0, Math.min(1, left / seconds))
    // Рождественский венок: хвойное кольцо + ягоды + бант; «выгорает» по кругу
    const needles = Array.from({ length: 40 }, (_, i) => {
      const ang = (i / 40) * Math.PI * 2
      const len = 7 + (i % 3) * 3
      return { x1: 55 + Math.cos(ang) * (R - 5), y1: 55 + Math.sin(ang) * (R - 5),
        x2: 55 + Math.cos(ang) * (R + len - 5), y2: 55 + Math.sin(ang) * (R + len - 5),
        rot: (ang * 180) / Math.PI }
    })
    const berries = Array.from({ length: 7 }, (_, i) => {
      const ang = (i / 7) * Math.PI * 2 + 0.4
      return { cx: 55 + Math.cos(ang) * R, cy: 55 + Math.sin(ang) * R }
    })
    return (
      <div className={`ny-wreath${low ? ' low' : ''}`}>
        <svg viewBox="0 0 110 110">
          {needles.map((n, i) => (
            <line key={i} x1={n.x1} y1={n.y1} x2={n.x2} y2={n.y2}
              stroke={i % 4 === 0 ? '#1f6b3a' : '#2f8f4e'} strokeWidth="3" strokeLinecap="round" />
          ))}
          <circle className="wr-bg" cx="55" cy="55" r={R} />
          <circle className="wr-fg" cx="55" cy="55" r={R}
            strokeDasharray={C} strokeDashoffset={C * (1 - frac)} />
          {berries.map((b, i) => <circle key={i} className="wr-berry" cx={b.cx} cy={b.cy} r="3.4" />)}
          <path className="wr-bow" d="M46,99 q9,-9 18,0 q-9,5 -18,0" />
        </svg>
        <span className="val">{left}</span>
      </div>
    )
  }
  // ГП: круговой таймер-змея, ползущая к своему хвосту
  if (theme === 'potter') return <SnakeTimer left={left} seconds={seconds} low={low} />
  // Киберпанк: искра бежит по кольцу. Замирает, когда таймер не идёт —
  // либо ещё не запущен, либо уже дотикал до нуля. Это единственный
  // элемент, по которому с дальнего конца зала видно, идёт время или нет.
  const running = !!startedAt && left > 0
  return (
    <div className={`timer-wrap${low ? ' low' : ''}${running ? '' : ' paused'}`}>
      <span className="tm-orbit" aria-hidden="true"><i className="tm-spark" /></span>
      <span className={`timer-num${low ? ' danger' : ''}`}>{left}</span>
    </div>
  )
}

/** Стабильное перемешивание: порядок фиксирован для конкретного вопроса. */
/** Ребус: подсвечиваем 3 последние буквы первого слова и 3 первые второго. */
function rebusCaption(word: string | undefined, isFirst: boolean) {
  const w = (word ?? '').trim()
  if (!w) return null
  const cut = isFirst ? Math.max(0, w.length - 3) : 3
  const plain = isFirst ? w.slice(0, cut) : w.slice(cut)
  const hot = isFirst ? w.slice(cut) : w.slice(0, cut)
  return isFirst
    ? <>{plain}<b className="rebus-hot">{hot}</b></>
    : <><b className="rebus-hot">{hot}</b>{plain}</>
}

function shuffleStable<T>(arr: T[], seedStr: string): T[] {
  let s = 0
  for (const ch of seedStr) s = (s * 31 + ch.charCodeAt(0)) >>> 0
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) >>> 0
    const j = s % (i + 1)
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}


/** Масштаб картинок на экране из настройки вопроса (media.scale, проценты).
 *  Отдаём CSS-переменной, а не жёстким размером: дальше её подхватывают
 *  правила высоты, у которых есть свои потолки — так картинка не сможет
 *  наехать на текст или кнопки даже на максимуме. */
function mediaScaleVar(q: Question): CSSProperties | undefined {
  const s = q.media.scale
  if (s == null || s === 100) return undefined
  return { '--ms': Math.min(100, Math.max(50, s)) / 100 } as CSSProperties
}

/** Картинка в ряду, выравненном ПО ВЫСОТЕ.
 *
 *  Проблема: когда картинок несколько и пропорции у них разные (одна
 *  горизонтальная, другая почти квадратная), каждая вписывается в свою
 *  ячейку по-своему и ряд получается рваным по высоте. Раньше это
 *  приходилось лечить вручную во внешнем редакторе, подгоняя файлы.
 *
 *  Решение — приём «выключной ряд»: ширина ячейки задаётся ПРОПОРЦИЕЙ
 *  картинки (flex-grow = ширина/высота). Тогда при одинаковой высоте ряда
 *  каждая занимает ровно свою ширину, высоты совпадают сами собой, и
 *  ничего не обрезается. Пропорцию узнаём у самого файла при загрузке,
 *  поэтому в редакторе ничего указывать не нужно.
 *
 *  До загрузки берём 1.5 — типичная горизонтальная картинка; после onLoad
 *  значение уточняется, скачка не видно. */
function FitImg({ src, children }: { src: string; children?: React.ReactNode }) {
  const [ar, setAr] = useState(1.5)
  return (
    <figure className="q-img" style={{ flexGrow: ar, flexBasis: 0 } as CSSProperties}>
      <img src={src} alt="" onLoad={e => {
        const el = e.currentTarget
        if (el.naturalWidth && el.naturalHeight) setAr(el.naturalWidth / el.naturalHeight)
      }} />
      {children}
    </figure>
  )
}

/* ── Сколько длится показ верного ответа ──────────────────────────────────
   Раньше автопроверка стояла на СВОЁМ таймере в 4200 мс, никак не связанном
   с анимацией. Для вариантов подсветка верного заканчивается позже: 3300 мс
   до стадии 2, плюс до 500 мс каскада, плюс сама подсветка. Автопроверка
   успевала записать is_correct раньше — и на телефонах игроков галочка
   загоралась до того, как зал увидел ответ. То же ждало сопоставление и
   порядок при большом числе элементов.
   Теперь длительность считается ИЗ ТЕХ ЖЕ ЧИСЕЛ, что и анимация. Меняешь
   тайминг показа — правь константу здесь, и проверка сдвинется сама. */
/** Сколько держится один слайд повтора, если озвучки нет или она короче. */
const RECAP_SLIDE_MS = 5000
const CH_STAGE2_MS = 3300        // когда подсвечивается верный вариант
const CH_STAGGER_MS = 500        // каскад по невыпавшим вариантам
const CH_HIGHLIGHT_MS = 900      // сама подсветка
const ITEM_FIRST_MS = 100        // первый элемент match/order
const ITEM_STEP_MS = 600         // шаг между элементами (см. 18-patch-745.css)
const ITEM_ANIM_MS = 500         // длительность появления элемента
/** Через сколько мс после reveal ответ ПОЛНОСТЬЮ на экране. */
function revealDoneMs(q: Question): number {
  const a = q.answer
  if (a.mode === 'choice') return CH_STAGE2_MS + CH_STAGGER_MS + CH_HIGHLIGHT_MS
  if (a.mode === 'match')
    return ITEM_FIRST_MS + ITEM_STEP_MS * Math.max(0, Math.min(a.left.length, 6) - 1) + ITEM_ANIM_MS
  if (a.mode === 'order')
    return ITEM_FIRST_MS + ITEM_STEP_MS * Math.max(0, a.correct_order.length - 1) + ITEM_ANIM_MS
  return 1200
}

/** Скрытое видео на показе ответа.
 *
 *  Во время вопроса видео с media.hidden играет «как аудио»: картинки нет,
 *  зал слышит только звук. На разборе прятать его уже незачем — наоборот,
 *  зал должен увидеть, что там было. Раньше на экране разбора видео не
 *  показывалось вообще: фильтр медиа выкидывал mp4/webm вместе с аудио.
 *
 *  Показываем ровно 10 СЕКУНД, независимо от длины ролика: длинное видео
 *  затянуло бы разбор, короткое доиграет и остановится само. Отсчёт идёт от
 *  момента показа ответа, поэтому видео и ответ появляются одновременно. */
function RevealVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement | null>(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.currentTime = 0
    v.play().catch(() => {})
    const t = setTimeout(() => { try { v.pause() } catch { /* ничего */ } }, 10_000)
    return () => { clearTimeout(t); try { v.pause() } catch { /* ничего */ } }
  }, [src])
  return (
    <div className="reveal-video">
      <video ref={ref} src={src} playsInline muted={false} />
    </div>
  )
}

/** Ступень кегля таблицы итогов по числу команд.
 *  Шесть команд — обычный зал (замер по базе), там таблица крупная; дальше
 *  строки начинают не влезать, и кегль уступает место читаемости целиком. */
function tableSize(teams: number): string {
  // Ступени названы по нижней границе: сколько команд — такой класс.
  // Пороги подобраны замером на 1920×1080 (самый тесный случай) с восемью
  // раундами: на каждой ступени все строки влезают в экран целиком.
  if (teams > 15) return ' rows-16'
  if (teams > 13) return ' rows-14'
  if (teams > 11) return ' rows-12'
  if (teams > 9) return ' rows-10'
  if (teams > 6) return ' rows-7'
  return ''
}

/** Звук, приложенный к ОТВЕТУ, — играет на экране разбора целиком.
 *
 *  Его никто не запускал: медиа ответа фильтровалось на картинки, а mp3 из
 *  списка просто выбрасывался. Ведущий вставлял в разбор трек или отбивку —
 *  и слышал тишину.
 *
 *  Играет ПОЛНОСТЬЮ, без таймера на 10–15 секунд: ушёл ведущий со слайда —
 *  звук глохнет вместе с экраном, остался — трек доигрывает до конца.
 *  play() асинхронный, поэтому глушим уже после реального старта: иначе
 *  pause() до его начала не делает ничего и трек заиграет поверх
 *  следующего экрана (та же гонка, что была с озвучкой вопроса). */
function AnswerAudio({ src }: { src: string }) {
  useEffect(() => {
    if (document.hidden) return
    let cancelled = false
    const a = createAudio()
    a.src = src
    a.loop = false
    a.play().then(() => {
      if (cancelled) { try { a.pause(); a.src = '' } catch { /* уже мёртв */ } }
    }).catch(() => {})
    return () => {
      cancelled = true
      try { a.pause(); a.src = '' } catch { /* уже мёртв */ }
    }
  }, [src])
  return null
}

/** Боковая панель лобби в киберпанке.
 *
 *  Три элемента, все — чистый CSS, без картинок и без данных:
 *  бегущий столбец «телеметрии», вертикальная шкала и штрих-код.
 *  Содержимое декоративное и намеренно не несёт смысла: это фон, на который
 *  игроки смотрят долго, а не информация, которую надо читать.
 *  Панели скрываются на узких экранах, чтобы не жать логотип. */
function CyberPanel({ side }: { side: 'left' | 'right' }) {
  const rows = side === 'left'
    ? ['SYS::READY', 'NET 100%', 'NODE 07', 'SYNC OK', 'BUF 4096', 'CH 02']
    : ['LINK UP', 'PING 12ms', 'QUEUE 0', 'AUTH OK', 'TEMP 41C', 'RUN']
  return (
    <div className={`cyber-panel cp-${side}`} aria-hidden="true">
      <span className="cp-bar" />
      <div className="cp-rows">
        {rows.map((r, i) => (
          <span key={r} className="cp-row" style={{ animationDelay: `${i * 0.4}s` }}>{r}</span>
        ))}
      </div>
      <div className="cp-code">
        {Array.from({ length: 14 }, (_, i) => (
          <i key={i} style={{ width: `${2 + ((i * 7) % 5)}px` }} />
        ))}
      </div>
    </div>
  )
}

/** Модалка составов команд от рандомайзера.
 *  Закрывается крестиком, кликом по фону и Esc — ведущему может понадобиться
 *  показать что-то под ней, не перезапуская экран. */
function GroupsModal({ groups, onClose }: { groups: string[][]; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  const players = groups.reduce((n, g) => n + g.length, 0)
  return (
    <div className="groups-overlay" onClick={onClose}>
      <div className="groups-modal" data-count={groups.length}
        onClick={e => e.stopPropagation()}>
        <div className="gm-head">
          <span className="mono-tag">СОСТАВЫ КОМАНД · {groups.length} · {players} чел.</span>
          <button className="gm-close" onClick={onClose} aria-label="Закрыть">✕</button>
        </div>
        <div className="lg-list">
          {groups.map((g, i) => (
            <div key={i} className="lg-team">
              <div className="lg-name" style={{ color: teamColor(i) }}>Команда {i + 1}</div>
              <div className="lg-players">{g.join(' · ')}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/** Картинка-вариант в ряду, выравненном по высоте.
 *  Та же механика, что у FitImg: ширину карточки задаёт пропорция снимка,
 *  поэтому при общей высоте ряда все варианты выглядят одинаково крупными.
 *  Раньше выравнивание было сделано только для сеток вопроса, а варианты
 *  с картинками остались рваными — недосмотр, а не решение. */
function FitAnswer({ src, badge, children }: {
  src: string; badge: string; children?: React.ReactNode
}) {
  const [ar, setAr] = useState(1.5)
  return (
    <div className="img-answer" style={{ flexGrow: ar, flexBasis: 0 } as CSSProperties}>
      <span className="ia-frame">
        <span className="ia-key">{badge}</span>
        <img src={src} alt="" onLoad={e => {
          const el = e.currentTarget
          if (el.naturalWidth && el.naturalHeight) setAr(el.naturalWidth / el.naturalHeight)
        }} />
      </span>
      {children}
    </div>
  )
}


/** Повтор всех вопросов раунда слайдами, перед временем на ответы.
 *
 *  Включается галочкой в редакторе (settings.recap_before_answers).
 *  По умолчанию выключено: раунды, где вопросы читают вслух по одному,
 *  в повторе не нуждаются.
 *
 *  Слайд держится 5 секунд ИЛИ пока играет озвучка вопроса — что дольше.
 *  Смысл в том, что озвучка бывает и длиннее пяти секунд, и обрывать её
 *  на полуслове нельзя. Если озвучки нет, работает простой отсчёт.
 *  Ведущий может пролистнуть вручную или пропустить повтор целиком. */
function RecapSlides({ pack, round, gameState }: {
  pack: LoadedPack
  round: LoadedPack['rounds'][number]
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
}) {
  const questions = useMemo(() => round.questions.filter(q => !q.hidden), [round.questions])
  const [i, setI] = useState(0)
  const q = questions[i]
  const last = i + 1 >= questions.length
  const toAnswers = () => void startAnswerTime()
  const next = () => { if (last) toAnswers(); else setI(n => n + 1) }

  // Слайд живёт максимум из двух: 5 секунд и длительность озвучки.
  useEffect(() => {
    if (!q) { toAnswers(); return }
    let alive = true
    const go = () => { if (alive) next() }
    const timer = setTimeout(go, RECAP_SLIDE_MS)
    const voice = q.media.voice
    if (!voice) return () => { alive = false; clearTimeout(timer) }
    // озвучка длиннее слайда — ждём её конца, а не таймер
    const a = createAudio()
    a.src = mediaUrl(voice)
    a.play().catch(() => {})
    const onEnd = () => { clearTimeout(timer); go() }
    a.addEventListener('ended', onEnd)
    return () => {
      alive = false; clearTimeout(timer)
      a.removeEventListener('ended', onEnd)
      try { a.pause() } catch { /* уже остановлено */ }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, q?.id])

  if (!q) return null
  const imgs = (q.media.question ?? []).filter(m => !/\.(mp3|wav|mp4|webm)$/i.test(m))
  const hasText = !!q.question_text.trim()
  // Классы те же, что на экране вопроса: без них правила вписывания
  // картинок сюда не достают, и снимок наползал на текст — ровно тот же
  // дефект, который уже чинили на разборе и на вопросе.
  return (
    <div className={`host-screen grid-bg recap-screen${
      imgs.length ? ' has-media' : ''}${hasText ? '' : ' no-qtext'}`}>
      <div className="host-topbar">
        <span className="mono-tag">ПОВТОР ВОПРОСОВ</span>
        <span className="qnum">{i + 1} / {questions.length}</span>
      </div>
      <div className="recap-body" key={q.id}>
        {hasText && (
          <p className={`q-text${lenClass(q.question_text)}`}>{q.question_text}</p>
        )}
        {imgs.length > 0 && (
          <div className={`q-media-grid n${Math.min(imgs.length, 4)}${
            imgs.length > 1 ? ' eq-row' : ''}`} style={mediaScaleVar(q)}>
            {imgs.map((m, k) => <FitImg key={k} src={mediaUrl(m)} />)}
          </div>
        )}
      </div>
      <div className="recap-dots" aria-hidden="true">
        {questions.map((_, k) => (
          <i key={k} className={k === i ? 'on' : k < i ? 'done' : ''} />
        ))}
      </div>
      <div className="host-actions">
        <button className="ghost" onClick={toAnswers}>Пропустить повтор</button>
        <button onClick={next}>{last ? 'К ответам →' : 'Следующий →'}</button>
      </div>
    </div>
  )
}

/** Фоновая музыка на экране ожидания.
 *
 *  Лобби висит дольше любого другого экрана, и до сих пор оно молчало.
 *  По умолчанию берём ту же фоновую музыку, что задана для пакета
 *  (`settings.bg_music`); если для лобби задана своя — `settings.lobby_music`
 *  перебивает её.
 *
 *  Про автозапуск: браузер не даёт играть звуку, пока по странице не
 *  кликнули. Поэтому при отказе мы не молчим, а ждём первого клика по
 *  экрану и стартуем тогда — ведущий всё равно нажимает кнопки.
 *  Громкость ниже, чем у музыки вопросов: под лобби разговаривают. */
function LobbyMusic({ pack }: { pack: LoadedPack | null }) {
  useEffect(() => {
    const src = pack?.settings?.lobby_music ?? pack?.settings?.bg_music
    if (!src) return
    const a = createAudio()
    a.src = mediaUrl(src)
    a.loop = true
    a.volume = 0.45
    let unlocked = false
    const start = () => {
      if (unlocked) return
      unlocked = true
      a.play().catch(() => {})
      window.removeEventListener('pointerdown', start)
      window.removeEventListener('keydown', start)
    }
    a.play().then(() => { unlocked = true }).catch(() => {
      // автозапуск заблокирован — ждём первого касания
      window.addEventListener('pointerdown', start)
      window.addEventListener('keydown', start)
    })
    return () => {
      window.removeEventListener('pointerdown', start)
      window.removeEventListener('keydown', start)
      try { a.pause() } catch { /* уже остановлено */ }
    }
  }, [pack?.settings?.lobby_music, pack?.settings?.bg_music])
  return null
}

/** Предзагрузка медиа СЛЕДУЮЩЕГО вопроса.
 *
 *  Раньше картинка начинала грузиться в момент показа: на слабом вайфае зал
 *  видел чёрный кадр посреди игры. Здесь мы, пока идёт текущий вопрос, тихо
 *  тянем медиа следующего — браузер кладёт их в кеш, и показ становится
 *  мгновенным.
 *
 *  Грузим ровно на один вопрос вперёд: тянуть весь пак разом значит забить
 *  канал ровно тогда, когда он нужен для текущего вопроса. Аудио и видео
 *  берём с `preload="auto"`, но не проигрываем. Ошибки игнорируются —
 *  предзагрузка не должна ронять игру. */
function usePreloadNext(round: LoadedPack['rounds'][number] | undefined, index: number) {
  useEffect(() => {
    if (!round) return
    const questions = round.questions.filter(q => !q.hidden)
    const next = questions[index + 1]
    if (!next) return
    const paths = [
      ...(next.media.question ?? []),
      ...(next.media.answer ?? []),
      ...(next.media.voice ? [next.media.voice] : []),
    ]
    const nodes: HTMLElement[] = []
    for (const p of paths) {
      const url = mediaUrl(p)
      if (/\.(mp3|wav|m4a|aac|ogg|opus|flac|mp4|webm)$/i.test(p)) {
        const el = document.createElement(/\.(mp4|webm)$/i.test(p) ? 'video' : 'audio')
        el.preload = 'auto'; el.src = url
        nodes.push(el)
      } else {
        const img = new Image()
        img.src = url
        nodes.push(img)
      }
    }
    return () => { for (const n of nodes) { try { (n as HTMLMediaElement).src = '' } catch { /* ok */ } } }
  }, [round, index])
}

/** Слайд-брифинг: правила, туториал, что угодно между раундами.
 *
 *  Содержимое целиком задаёт ведущий в редакторе — текст правится от игры к
 *  игре, поэтому зашивать его в код нельзя. Сводку по раундам собираем из
 *  самого пакета: номер, название и число вопросов всегда актуальны и
 *  дублировать их руками не нужно.
 *
 *  К раундам слайд не привязан: показывается кнопкой из админки в любой
 *  момент, поэтому и живёт в настройках ПАКЕТА, а не раунда. */
function InfoScreen({ pack, slide, packId }: {
  pack: LoadedPack; slide: InfoSlide; packId: string | null
}) {
  // Внешний вид живёт в общем компоненте: им же рисуется превью в
  // редакторе, поэтому «на экране» и «в редакторе» совпадают всегда.
  const rounds = pack.rounds.filter(r => !r.off_scoreboard).map(r => ({
    id: r.id,
    name: (r.title_lines ?? []).join(' ') || '—',
    count: r.questions.filter(q => !q.hidden).length,
  }))
  return (
    <>
      <InfoSlideView slide={slide} rounds={rounds} mediaUrl={mediaUrl} />
      <div className="host-actions">
        <InfoNav slides={pack.settings?.info_slides ?? []} index={indexOfSlide(pack, slide)}
          packId={packId} paper={pack.settings?.play_mode === 'paper'} />
      </div>
    </>
  )
}

function indexOfSlide(pack: LoadedPack, slide: InfoSlide): number {
  return (pack.settings?.info_slides ?? []).findIndex(s => s.id === slide.id)
}

/** Кнопки перехода: между слайдами и обратно в игру. */
function InfoNav({ slides, index, packId, paper }: {
  slides: InfoSlide[]; index: number; packId: string | null; paper: boolean
}) {
  // Слайд, назначенный «перед итогами», ведёт ВПЕРЁД — в финал. Кнопка
  // «к раунду» на нём была бы дорогой назад, в уже сыгранный раунд.
  // В баре между ним и итогами есть ещё подсчёт баллов — туда и ведём.
  const toFinale = slides[index]?.show_at === 'finale'
  return (
    <>
      {index > 0 && (
        <button className="ghost" onClick={() => void setFinaleStep(index - 1)}>← Назад</button>
      )}
      {index + 1 < slides.length && (
        <button className="ghost" onClick={() => void setFinaleStep(index + 1)}>Дальше →</button>
      )}
      {toFinale
        ? (paper
            ? <button onClick={() => void startCounting()}>К подсчёту →</button>
            : <button onClick={() => void finishGame(packId)}>К итогам →</button>)
        : <button onClick={() => void setPhase('round_intro')}>К раунду →</button>}
    </>
  )
}

/** Блиц на проекторе: кубик до старта, доска во время раунда, итоги после.
 *  Состояние читается тем же опросом, что и в админке, — один источник
 *  правды, чтобы пульт и экран не разошлись. */
function BlitzScreen({ pack, round, gameState }: {
  pack: LoadedPack
  round: LoadedPack['rounds'][number]
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
}) {
  const { state, setState } = useBlitz(gameState.game_id, gameState.round_number)
  const teams = useTeams(gameState.game_id)
  const answers = useAnswers(gameState.game_id, gameState.round_number)
  const bank = useMemo(
    () => round.questions.map(q => ({ id: q.id, hidden: q.hidden })),
    [round.questions])
  const settings = round.settings as { teamSeconds?: number; timeoutPenalty?: number }

  // Проектор ведёт раунд сам: он бросает кубик, ловит ответы, проверяет их
  // и листает вопросы. Ведущему остаются только кнопки вмешательства.
  // Раньше каждый шаг требовал нажатия в админке — играть было невозможно.
  const busy = useRef(false)
  const push = async (next: BlitzState) => {
    if (busy.current) return
    busy.current = true
    setState(next)
    try {
      await saveBlitz(gameState.game_id, gameState.round_number, next)
      // Итоги раунда пишет ТОТ, КТО ЕГО ВЕДЁТ. Когда управление переехало
      // на проектор, запись осталась в админке — и в общий зачёт улетали
      // нули, хотя таблица на экране показывала баллы.
      if (next.finished && !state?.finished) {
        const rows = blitzResults(toResults(next), settings.timeoutPenalty ?? 10)
        // Пишем ОДНИМ запросом, а не через очередь ответов.
        // Очередь читает список из localStorage и записывает обратно; три
        // параллельных вызова читают один и тот же снимок, и выживает
        // только последний. В базу попадала одна команда из трёх, а на
        // табло остальные показывали нули.
        const { error } = await supabase.from('answers').upsert(
          rows.map(r => ({
            team_id: r.teamId, game_id: gameState.game_id,
            question_ref: 'q-blitz', round_number: gameState.round_number,
            answer_text: `место ${r.place}`, stake: r.score,
            updated_at: new Date().toISOString(),
          })),
          { onConflict: 'team_id,question_ref' })
        if (error) console.error('блиц: итоги не записались', error)
      }
    } finally { busy.current = false }
  }

  // ── 1. Кубик бросается САМ ──
  // Крутится ~3 секунды и останавливается. Ведущему не надо ничего нажимать.
  useEffect(() => {
    if (state || teams.length < 2) return
    const t = setTimeout(() => {
      const order = [...teams].sort(() => Math.random() - 0.5).map(x => x.id)
      void push(initBlitz(order, settings.teamSeconds ?? 60))
    }, 3000)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, teams.length])

  // ── 2. Первый вопрос выезжает сам после показа кубика ──
  useEffect(() => {
    if (!state || state.finished || state.current) return
    const t = setTimeout(() => {
      const next = pickNext(bank, state.used)
      if (!next) return void push(finishNoQuestions(state))
      void markPlayed(next.id).catch(() => {})
      void push(showQuestion(state, next.id, Date.now()))
    }, NEXT_DELAY_MS)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.current, state?.turn, state?.finished])

  // ── 3. АВТОПРОВЕРКА ──
  // Как только команда прислала ответ, время замирает и считается вердикт.
  // По спеке таймер не должен идти во время проверки — раньше он тикал,
  // пока ведущий не нажмёт кнопку.
  const cur = state?.current
  const q = cur ? round.questions.find(x => x.id === cur.questionId) : undefined
  const active = state ? currentTeam(state) : undefined
  useEffect(() => {
    if (!state || !cur || !q || !active) return
    const mine = answers.find(a =>
      a.team_id === active && a.question_ref === `q-${q.id}`)
    if (!mine?.answer_text) return
    if (cur.lastAnswer === mine.answer_text) return      // уже проверяли
    // Скип приходит обычным ответом с меткой: команда сама решает, когда
    // сдаться. Проверять его нечего — сразу минус очко и ход дальше.
    if (mine.answer_text === SKIP_MARK) {
      void push(skip(resumeAfterCheck(state, Date.now()), Date.now()))
      return
    }
    const ok = autocheck(q.answer, mine.answer_text) === true
    void push(pauseForCheck(state, Date.now(), ok ? 'ok' : 'no', mine.answer_text))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers, cur?.questionId, cur?.lastAnswer])

  // ── 4. Вердикт применяется сам через 5 секунд ──
  // Окно нужно ведущему: он видит верный ответ и успевает поправить.
  useEffect(() => {
    if (!state || !cur?.verdict) return
    // Отсчёт идёт от ПЕРВОЙ паузы, а не от последнего ответа. Иначе команда,
    // отправляя правки каждые четыре секунды, держала бы свой таймер
    // остановленным сколько угодно: время на проверку не списывается.
    const wait = Math.max(0, NEXT_DELAY_MS - (Date.now() - (cur.pausedAt ?? Date.now())))
    const t = setTimeout(() => {
      const now = Date.now()
      const resumed = resumeAfterCheck(state, now)
      // Оценку проставляем и самому ответу: иначе он остаётся
      // «неоценённым» и портит сводку по раунду.
      const row = answers.find(a =>
        a.team_id === active && a.question_ref === `q-${cur.questionId}`)
      if (row) {
        void supabase.from('answers')
          .update({ is_correct: cur.verdict === 'ok' }).eq('id', row.id).then(() => {})
      }
      void push(cur.verdict === 'ok' ? answerCorrect(resumed, now) : answerWrong(resumed, now))
    }, wait)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cur?.verdict, cur?.lastAnswer])

  if (!state) {
    return (
      <div className="host-screen grid-bg bz-screen">
        <div className="host-topbar"><span className="mono-tag">БЛИЦ</span></div>
        <BlitzDice teams={teams} rolling />
      </div>
    )
  }

  if (state.finished) {
    const rows = blitzResults(toResults(state), settings.timeoutPenalty ?? 10)
    return (
      <div className="host-screen grid-bg sb-screen">
        <div className="mono-tag">ИТОГИ БЛИЦА</div>
        <table className="score-table">
          <thead><tr><th></th><th>Команда</th><th>Очки</th><th>Баллы</th></tr></thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.teamId}>
                <td>{r.place}{r.shared ? '=' : ''}</td>
                <td>{teams.find(t => t.id === r.teamId)?.name ?? '—'}</td>
                <td>{r.points}</td>
                <td>{r.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="host-actions"><AfterRoundNav pack={pack} gameState={gameState} /></div>
      </div>
    )
  }

  // Кубик показываем, пока не выехал первый вопрос: так видно, кому выпало.
  const started = state.current != null
    || Object.values(state.correct).some(v => v > 0)
    || Object.values(state.missed).some(v => v > 0)

  return (
    <>
      <BlitzBoard teams={teams} state={state} bank={bank}
        questionText={q?.question_text}
        verdict={cur?.verdict}
        // Верный ответ показываем ТОЛЬКО когда ход закрыт: команда ответила
        // верно или исчерпала попытки. При неверной попытке с оставшимися
        // шансами подсказывать нельзя — иначе следующая попытка бессмысленна.
        answerText={cur?.verdict === 'ok'
          || (cur?.verdict === 'no' && cur.attempts + 1 >= MAX_ATTEMPTS)
          ? displayAnswer(q as Question) : undefined}
        dice={!started ? <BlitzDice teams={teams} rolling={false} pickedId={state.order[0]} /> : undefined}
      />
      {/* ── 5. Управление с проектора ──
          Те же действия, что в админке: ведущему не надо держать телефон,
          чтобы вести раунд. */}
      <div className="host-actions">
        {cur?.verdict && (
          <button className="ghost" onClick={() => {
            const now = Date.now()
            const r = resumeAfterCheck(state, now)
            void push(cur.verdict === 'ok' ? answerWrong(r, now) : answerCorrect(r, now))
          }}>Исправить на «{cur.verdict === 'ok' ? 'неверно' : 'верно'}»</button>
        )}
        {/* Скип доступен, пока команда ещё может отвечать. Условие было
            `!cur.verdict`, и кнопка исчезала на первой же ошибке — вернуть
            ход было нечем, кроме завершения раунда. */}
        {cur && cur.verdict !== 'ok' && (
          <button className="ghost" onClick={() => void push(skip(state, Date.now()))}>
            Скип −1
          </button>
        )}
        <button className="ghost dark" onClick={() => {
          if (confirm('Завершить блиц досрочно?')) void push(finishNoQuestions(state))
        }}>Завершить раунд</button>
      </div>
    </>
  )
}

function displayAnswer(q: Question): string {
  const empty = '⚠ ответ не заполнен в редакторе'
  const a = q.answer as unknown as Record<string, unknown>
  const d = a.display
  if (Array.isArray(d)) return d.join(' · ')
  if (typeof d === 'string' && d) return d
  if (typeof a.correct === 'string' && a.correct) return String(a.correct).split('/')[0].trim()
  if (typeof a.word === 'string' && a.word) return a.word.toUpperCase()
  if (typeof a.correct_choice === 'string' && a.correct_choice) return a.correct_choice
  if (typeof a.correct_order === 'string' && a.correct_order) return a.correct_order
  if (Array.isArray(a.correct_pairs) && a.correct_pairs.length)
    return (a.correct_pairs as string[]).join('  ')
  return empty
}

// mediaUrl переехал в src/lib/media.ts — см. импорт вверху файла.

/** Видео вопроса. Если у вопроса есть озвучка — ждём её окончания
 *  (признак: пошёл таймер), иначе играем сразу. Аудио вопроса здесь НЕ
 *  рендерим: им управляет QuestionAudio, иначе трек играл бы дважды. */
function QuestionVideo({ src, hidden, waitFor, go }: {
  src: string; hidden: boolean; waitFor: boolean; go: boolean
}) {
  const ref = useRef<HTMLVideoElement | null>(null)
  useEffect(() => {
    if (waitFor && !go) return
    ref.current?.play().catch(() => {})
  }, [waitFor, go])
  return (
    <video ref={ref} src={src} controls={!hidden}
      autoPlay={!waitFor}
      style={hidden
        ? { width: 1, height: 1, opacity: 0 }
        : { maxHeight: '46vh', borderRadius: 14 }} />
  )
}

/** Озвучка → (по окончании) старт таймера → фоновая музыка (если у вопроса нет своего AV).
 *  Перенос логики старого RoundShell: музыка глушится при смене вопроса/уходе с фазы;
 *  скрытая вкладка (второй проектор) молчит. */
function QuestionAudio({ q, round, timerRunning, pack, startedAt, seconds, manual = false }: {
  startedAt?: string | null
  seconds?: number
  q: LoadedPack['rounds'][number]['questions'][number]
  round: LoadedPack['rounds'][number]
  timerRunning: boolean
  pack?: LoadedPack
  /** игра на бумаге: ничего не звучит и время не идёт, пока ведущий не
   *  нажмёт «ЗАПУСТИТЬ» в админке — он сначала читает вопрос залу вслух */
  manual?: boolean
}) {
  const hasOwnAV = (q.media.question ?? []).some(m => /\.(mp3|mp4|webm|wav)$/i.test(m))
  const voiceRef = useRef<HTMLAudioElement | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  // отмечает, что старт уже запрошен: по нему страховка понимает,
  // ждём мы озвучку или запрос просто потерялся
  const requested = useRef(false)

  // ── ЗВУК ВОПРОСА И СТАРТ ТАЙМЕРА ──
  // Правило: озвучка ВСЕГДА идёт первой и блокирует старт. Всё остальное —
  // аудио вопроса, видео, таймер, фоновая музыка — стартует ОДНОВРЕМЕННО
  // после неё. Команда должна слушать трек, пока тикает таймер, а не после.
  //
  //   только озвучка        → озвучка, затем таймер + фоновая музыка
  //   аудио без озвучки     → сразу аудио + таймер
  //   аудио + озвучка       → озвучка, затем аудио + таймер
  //   видео без озвучки     → сразу видео + таймер
  //   видео + озвучка       → озвучка, затем видео + таймер
  useEffect(() => {
    // document.hidden из условия УБРАН намеренно: если вкладку свернули на
    // секунду (или ОС решила, что окно неактивно), таймер не запускался
    // вообще, и вопрос замирал до перезагрузки страницы.
    // Новый вопрос — старый звук обязан замолчать НЕМЕДЛЕННО. Раньше пауза
    // была только в очистке эффекта и не покрывала плееры, созданные вне
    // этого компонента: при переходе аудио продолжало играть поверх.
    stopAllMedia()
    // ── ИГРА В БАРЕ: старт по кнопке ведущего ──
    // Вопрос читает человек с микрофоном, и пока он читает, время идти не
    // должно, а музыка — играть поверх его голоса. Поэтому здесь тишина,
    // а всё остальное запускает второй эффект, когда ведущий нажмёт кнопку
    // (то есть когда в игре появится timer_started_at).
    if (manual) return
    if (timerRunning) return
    let cancelled = false
    const ownAudio = (q.media.question ?? [])
      .find(m => /\.(mp3|wav|m4a|ogg)$/i.test(m))

    requested.current = false

    /** Запускает вопрос: собственное аудио и таймер вместе. */
    const runQuestion = () => {
      if (cancelled) return
      requested.current = true
      if (ownAudio) {
        const a = createAudio(); a.src = mediaUrl(ownAudio)
        audioRef.current = a
        a.play().catch(() => {})        // не смогли — таймер всё равно идёт
      }
      void startTimer()
    }

    if (!q.media.voice) { runQuestion(); return }

    // Озвучка блокирует старт: пока читают вопрос, время не тикает.
    //
    // ГОНКА, из-за которой звучала чужая озвучка. play() асинхронный: он
    // возвращает обещание и начинает воспроизведение ПОЗЖЕ. Если ведущий
    // успевал перелистнуть вопрос до этого момента, отмена вызывала
    // pause() у ещё не запустившегося элемента — то есть не делала ничего,
    // а через миг play() всё-таки стартовал. В итоге на экране вопрос B,
    // а из колонок читают вопрос A, иногда вообще из прошлого раунда.
    //
    // Лечение: после того как play() действительно начался, проверяем, не
    // отменили ли нас, и глушим. И src обнуляем при отмене, чтобы
    // недокачанный файл не смог заиграть вовсе.
    const v = createAudio(); v.src = mediaUrl(q.media.voice)
    voiceRef.current = v
    v.onended = runQuestion
    v.onerror = runQuestion            // нет файла — не зависаем
    v.play().then(() => {
      if (cancelled) { try { v.pause(); v.src = '' } catch { /* уже мёртв */ } }
    }).catch(runQuestion)              // запрет автозапуска — тоже

    return () => {
      cancelled = true
      const old = voiceRef.current
      if (old) {
        old.onended = null; old.onerror = null
        try { old.pause(); old.src = '' } catch { /* уже мёртв */ }
      }
      voiceRef.current = null
      audioRef.current?.pause()
    }
  }, [q.id, manual])

  // ── Игра на бумаге: ведущий нажал «ЗАПУСТИТЬ» ──
  // Кнопка ставит timer_started_at, и по нему стартует звук вопроса: сначала
  // озвучка, если она задана, следом собственное аудио. Фоновая музыка
  // подхватывается общим эффектом ниже — он и так завязан на таймер.
  useEffect(() => {
    if (!manual || !timerRunning) return
    let cancelled = false
    const ownAudio = (q.media.question ?? []).find(m => /\.(mp3|wav|m4a|ogg)$/i.test(m))
    const playOwn = () => {
      if (cancelled || !ownAudio) return
      const a = createAudio(); a.src = mediaUrl(ownAudio)
      audioRef.current = a
      a.play().catch(() => {})
    }
    if (q.media.voice) {
      const v = createAudio(); v.src = mediaUrl(q.media.voice)
      voiceRef.current = v
      v.onended = playOwn
      v.onerror = playOwn
      // play() асинхронный — та же гонка, что и в обычном режиме:
      // проверяем отмену уже после реального старта
      v.play().then(() => {
        if (cancelled) { try { v.pause(); v.src = '' } catch { /* уже мёртв */ } }
      }).catch(playOwn)
    } else playOwn()

    return () => {
      cancelled = true
      const old = voiceRef.current
      if (old) {
        old.onended = null; old.onerror = null
        try { old.pause(); old.src = '' } catch { /* уже мёртв */ }
      }
      voiceRef.current = null
      audioRef.current?.pause()
    }
  }, [q.id, manual, timerRunning])

  // ── Страховка: таймер обязан пойти ──
  // Запрос на старт мог не дойти (у команд и проектора связь рвётся), а
  // повторить его было некому: эффект выше срабатывает один раз на вопрос.
  // Здесь проверяем результат и повторяем попытку, пока таймер не пошёл.
  useEffect(() => {
    if (timerRunning) return
    // В баре таймер запускает ведущий — страховке тут делать нечего,
    // иначе она сама пустит время через две секунды после показа вопроса.
    if (manual) return
    // Пока озвучка РЕАЛЬНО играет — не вмешиваемся, сколько бы она ни длилась.
    // Фиксированный лимит был ошибкой: озвучки длиннее его обрывались таймером.
    const t = setInterval(() => {
      if (timerRunning) return
      const v = voiceRef.current
      const voicePlaying = !!v && !v.paused && !v.ended
      if (voicePlaying) return          // ждём дальше, время не идёт
      void startTimer()
    }, 2000)
    return () => clearInterval(t)
  }, [q.id, timerRunning, manual])

  // фоновая музыка раунда, пока тикает таймер
  useEffect(() => {
    const bg = (round.settings as { bg_music?: string }).bg_music ?? pack?.settings?.bg_music
    if (!timerRunning || !bg || hasOwnAV) return
    const a = createAudio(); a.src = mediaUrl(bg)
    a.loop = true; a.volume = 0.6
    a.play().catch(() => {})
    // по истечении таймера музыка играет ЕЩЁ 3 СЕК и мягко глохнет
    let fade: number | undefined
    const total = (seconds ?? round.timer_seconds ?? 60) * 1000
    const msLeft = startedAt ? total - (Date.now() - new Date(startedAt).getTime()) : total
    const stop = window.setTimeout(() => {
      fade = window.setInterval(() => {
        a.volume = Math.max(0, a.volume - 0.1)
        if (a.volume <= 0.01) { if (fade) clearInterval(fade); a.pause() }
      }, 80)
    }, Math.max(0, msLeft) + 3000)
    return () => { clearTimeout(stop); if (fade) clearInterval(fade); a.pause() }
  }, [timerRunning, q.id])

  return null
}

/** «Время ответов»: минута на дозаполнение, крупный таймер, контроль связи —
 *  видно, чьи ответы уже долетели (перенос AnswerTimeSlide старого проекта). */
function AnswerTime({ pack, round, gameState }: {
  pack: LoadedPack
  round: LoadedPack['rounds'][number]
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
}) {
  const seconds = (round.settings as { answerTimeSeconds?: number }).answerTimeSeconds ?? 60
  const paper = pack.settings?.play_mode === 'paper'
  const teams = useTeams(gameState.game_id)
  const answers = useAnswers(gameState.game_id, gameState.round_number)
  const totalQ = round.questions.filter(q => !q.hidden).length

  // Фоновая музыка на время раздумий. Раньше бралась ТОЛЬКО из настроек
  // раунда, поэтому при музыке, заданной на уровне пакета, экран молчал —
  // хотя во время вопросов она играла. Теперь запасной вариант тот же.
  useEffect(() => {
    const bg = (round.settings as { bg_music?: string }).bg_music
      ?? pack.settings?.bg_music
    if (!bg) return
    const a = createAudio(); a.src = mediaUrl(bg)
    a.loop = true; a.volume = 0.6
    a.play().catch(() => {})
    return () => a.pause()
  }, [round.id])

  return (
    <div className={`host-screen grid-bg${paper ? ' paper-answer-time' : ''}`}>
      <div className="mono-tag">РАУНД {displayRoundNumber(pack, gameState.round_number)} :: ВРЕМЯ ОТВЕТОВ</div>
      <div className="answer-pulse"><Title theme={pack.theme}
        lines={[paper ? 'СДАВАЙТЕ БЛАНКИ' : 'ОТВЕЧАЙТЕ!']} /></div>
      <div className="meta-line">{paper
        ? 'ПЕРЕДАЙТЕ БЛАНКИ ВЕДУЩЕМУ'
        : 'КАПИТАНЫ ОТПРАВЛЯЮТ ОТВЕТЫ С ТЕЛЕФОНОВ'}</div>
      <Timer startedAt={gameState.timer_started_at} seconds={seconds} theme={pack.theme} />
      {/* Список команд со счётчиком «сколько ответов долетело» нужен только
          при игре с телефонов: он показывает, кого ещё ждать. На бумаге
          ответы едут на бланках, счётчик всегда нулевой и смысла не несёт —
          вместо него зал видит крупный таймер. */}
      {!paper && (
        <div className="answer-time-teams">
          {teams.map(t => {
            const got = answers.filter(a => a.team_id === t.id && a.answer_text?.trim()).length
            const done = got >= totalQ
            return (
              <div key={t.id} className={`at-team${done ? ' done' : ''}`}>
                <span style={{ color: t.color }}>{t.name}</span> · {got}/{totalQ}
              </div>
            )
          })}
        </div>
      )}
      <div className="host-actions">
        <button className="ghost dark" onClick={() => void gotoQuestion(round.questions.length - 1)}>← Назад</button>
        <button onClick={() => void gotoAnswers(0)}>К ответам →</button>
      </div>
    </div>
  )
}

/** Показ ответов раунда: вопрос остаётся, ответ появляется под ним,
 *  справа — ответы команд крупно (перенос старого ShowAnswers). */
function ShowAnswers({ pack, round, q, gameState }: {
  pack: LoadedPack
  round: LoadedPack['rounds'][number]
  q: LoadedPack['rounds'][number]['questions'][number]
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
}) {
  const paper = pack.settings?.play_mode === 'paper'
  const answers = useAnswers(gameState.game_id, gameState.round_number)
  const revealed = gameState.reveal
  const teams = useTeams(gameState.game_id)
  const [allTeams, setAllTeams] = useState<{ id: string; name: string; color: string }[]>([])
  useEffect(() => {
    void supabase.from('teams').select('id,name,color').then(({ data }) => setAllTeams(data ?? []))
  }, [])
  const rows = answers.filter(a => a.question_ref === `q-${q.id}`)
  const total = round.questions.length
  const step = gameState.question_index

  // подстраховка из старого: авто-раскрытие через 3 сек
  useEffect(() => {
    if (revealed || document.hidden) return
    const t = setTimeout(() => { void revealAnswer() }, 3000)
    return () => clearTimeout(t)
  }, [revealed, step])

  // Автопроверка идёт ВМЕСТЕ с показом ответа. Раньше она срабатывала
  // сразу по флагу reveal, а сам ответ выезжает с анимацией — на экране
  // успевали загореться галочки, когда ответа ещё не было.
  const [checked, setChecked] = useState(false)
  useEffect(() => {
    setChecked(false)
    if (!revealed) return
    // Ждём, пока ответ ПОЛНОСТЬЮ окажется на экране, и только потом пишем
    // is_correct — иначе на телефонах игроков результат загорается раньше зала.
    // +600 мс запаса на неровность таймеров браузера.
    const t = setTimeout(() => setChecked(true), revealDoneMs(q) + 600)
    return () => clearTimeout(t)
    // ВАЖНО: в зависимостях НЕ должно быть step. Он меняется по ходу самой
    // анимации показа, и таймер перезапускался на каждой стадии.
  }, [revealed, q.id])

  useEffect(() => {
    if (!checked || document.hidden) return
    rows.forEach(a => {
      if (a.is_correct != null) return
      const ok = autocheck(q.answer, a.answer_text)
      if (ok === null) return
      void supabase.from('answers').update({ is_correct: ok }).eq('id', a.id).then(() => {})
    })
  }, [checked, step, rows.length, rows.map(r => r.answer_text).join('|')])

  const choices = q.answer.mode === 'choice' ? q.answer.choices : null
  const imgChoices = (q.media.question ?? []).filter(m => !/\.(mp3|mp4|webm|wav)$/i.test(m))
  // на бумаге колонки «ответы команд» нет — освободившееся место отдаём контенту
  const answerImgs = (q.media.answer ?? []).filter(m => !/\.(mp3|mp4|webm|wav)$/i.test(m))
  // Нет своей картинки у ответа — берём картинку вопроса: на разборе она
  // нужнее текста вопроса, который уже прозвучал.
  // Картинки вопроса показываем на разборе и тогда, когда во время вопроса
  // они были скрыты (media.hidden): на ответе прятать их уже незачем.
  const questionImgs = (q.media.question ?? []).filter(m => !/\.(mp3|mp4|webm|wav)$/i.test(m))
  const revealImgs = answerImgs.length ? answerImgs : questionImgs
  // Видео, которое во время вопроса играло «как аудио» (media.hidden).
  // На разборе показываем его вместе с ответом — 10 секунд, см. RevealVideo.
  const hiddenVideo = q.media.hidden
    ? (q.media.question ?? []).find(m => /\.(mp4|webm)$/i.test(m))
    : undefined
  // Звук, приложенный к ОТВЕТУ. Раньше из медиа ответа брались только
  // картинки, а mp3 молча выбрасывался — вставленный трек не играл вообще.
  const answerAudio = (q.media.answer ?? []).find(m => /\.(mp3|wav|m4a|ogg)$/i.test(m))

  return (
    <div className={`host-screen grid-bg${paper ? ' paper-answers' : ''}`}
      style={{ justifyContent: 'flex-start' }}>
      <div className="host-topbar">
        <span className="mono-tag">РАУНД {displayRoundNumber(pack, gameState.round_number)} :: ОТВЕТЫ</span>
        <span className="qnum">ВОПРОС <b>{step + 1}</b> / {total}</span>
      </div>
      <div className={`answers-layout${revealed ? ' revealed' : ''}`} style={{ marginTop: 60 }}>
        {/* Раскладка вынесена в CSS: инлайновый `display: flex` бил любые
            правила, и переключить колонку на две при одной картинке было
            невозможно. Числовые пропорции остались здесь. */}
        <div className={`answers-main${revealed ? ' revealed' : ''}`}
          style={{ flex: 1.4, minHeight: 0 }}>

          {/* ── ДО ПОКАЗА ОТВЕТА: экран вопроса как он был ── */}
          {!revealed && <>
            <p className={`q-text${lenClass(q.question_text)}`}>{q.question_text}</p>
            {questionImgs.length > 0 && !q.media.hidden && (
              <div className={`q-media-grid n${Math.min(questionImgs.length, 4)}${
                  questionImgs.length > 1 ? ' eq-row' : ''}`}
                style={mediaScaleVar(q)}>
                {questionImgs.map((m, i) => <FitImg key={i} src={mediaUrl(m)} />)}
              </div>
            )}
          </>}

          {/* ── ПОСЛЕ ПОКАЗА: вопрос остаётся сверху, мельче ──
              Зал разбирает ответ через минуту после того, как вопрос
              прозвучал, и половина стола уже не помнит формулировку. Поэтому
              текст вопроса не исчезает, а ужимается и уходит наверх, а ответ
              встаёт под ним.
              Сопоставление — исключение: у него свой разбор во всю ширину
              (пары «номер — буква»), и лишняя строка сверху его ломает. */}
          {revealed && q.answer.mode !== 'match' && q.question_text.trim() && (
            <p className={`q-recall${lenClass(q.question_text)}`}>{q.question_text}</p>
          )}

          {revealed && (
            <div className="answer-block reveal-in">
              <div className="answer-label">ПРАВИЛЬНЫЙ ОТВЕТ</div>
              {/* скрытое видео вопроса — появляется ВМЕСТЕ с ответом, 10 сек */}
              {hiddenVideo && <RevealVideo src={mediaUrl(hiddenVideo)} />}
              {/* звук ответа — целиком, пока ведущий не перелистнёт слайд */}
              {answerAudio && <AnswerAudio src={mediaUrl(answerAudio)} />}

              {round.mechanic === 'rebus' ? (
                // у ребуса свой разбор: две картинки с подсветкой слогов
                <>
                  <div className="answer-main">{displayAnswer(q)}</div>
                  <div className="rebus-answer">
                    {questionImgs.slice(0, 2).map((m, i) => (
                      <figure key={i} className="q-img">
                        <img src={mediaUrl(m)} alt="" />
                        <figcaption>
                          {rebusCaption(i === 0 ? q.service.word1 : q.service.word2, i === 0)}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </>
              ) : q.answer.mode === 'match' ? (
                <MatchAnswer q={q} />
              ) : choices && imgChoices.length === choices.length ? (
                <StagedChoices q={q} choices={choices} imgs={imgChoices} />
              ) : choices ? (
                <StagedChoices q={q} choices={choices} />
              ) : q.answer.mode === 'order' ? (
                <div className="order-answer">
                  {q.answer.correct_order.split('').map((k, i) => {
                    const c = (q.answer as { choices: { key: string; text: string }[] })
                      .choices.find(x => x.key === k)
                    return (
                      <div key={i} className="oi">
                        <b>{k}</b>
                        <span className="oi-pos">{i + 1}</span>
                        <span className="oi-text">{c?.text ?? ''}</span>
                      </div>
                    )
                  })}
                </div>
              ) : (<>
                <div className="answer-main">{displayAnswer(q)}</div>
                {/* картинка ответа (или вопроса, если своей нет) — под ответом */}
                {revealImgs.length > 0 && (
                  <div className={`q-media-grid answer-media n${Math.min(revealImgs.length, 4)}${
                      revealImgs.length > 1 ? ' eq-row' : ''}`}>
                    {revealImgs.map((m, i) => <FitImg key={i} src={mediaUrl(m)} />)}
                  </div>
                )}
              </>)}

              {/* подсказка выходит ВМЕСТЕ с автопроверкой — когда ответ
                  показан целиком, включая сопоставление и порядок */}
              {checked && q.answer_note &&
                <div className={`answer-note${noteClass(q.answer_note)}`}>{q.answer_note}</div>}
            </div>
          )}
        </div>
        {!paper && <div className="team-answers">
          {/* Пока ответ не показан — видно только СКОЛЬКО команд ответило.
              Иначе зал читает чужие ответы и интрига пропадает. */}
          <div className="mono-tag">
            {revealed ? 'ОТВЕТЫ КОМАНД' : `ОТВЕТИЛИ: ${rows.length}`}
          </div>
          {rows.length === 0 && <div style={{ color: 'var(--dim)' }}>нет ответов</div>}
          {rows.map(a => {
            const team = teams.find(t => t.id === a.team_id) ?? allTeams.find(t => t.id === a.team_id)
            // приоритет: ручная оценка админа → автопроверка на лету
            // Пока показ ответа не закончился — вердикта нет НИ У КОГО.
            // Раньше готовая оценка из базы показывалась мгновенно, в обход
            // ожидания: при повторном прогоне раунда is_correct уже лежал в
            // строке с прошлого раза, и галочки загорались до ответа.
            const shown = checked
              ? (a.is_correct ?? autocheck(q.answer, a.answer_text))
              : null
            return (
              <div key={a.id} className="team-answer" style={{
                borderLeft: `5px solid ${shown === true ? 'var(--ok)' : shown === false ? 'var(--danger)' : 'var(--dim)'}`,
              }}>
                <span className="name" style={{ color: team?.color }}>{team?.name ?? '—'}</span>
                <span className="text">{revealed ? (a.answer_text || '—') : '• • •'}
                  {a.stake != null && a.stake !== 0 &&
                    <span style={{ color: 'var(--accent)', fontSize: '.7em' }}> · {a.stake}</span>}</span>
                {shown != null &&
                  <span className="mark" style={{ color: shown ? 'var(--ok)' : 'var(--danger)' }}>
                    {shown ? '✓' : '✗'}</span>}
              </div>
            )
          })}
        </div>}
      </div>
      <div className="host-actions">
        {step > 0 && <button className="ghost" onClick={() => void gotoAnswers(step - 1, true)}>← Назад</button>}
        {!revealed
          ? <button onClick={() => void revealAnswer()}>Показать ответ →</button>
          : step < total - 1
            ? <button onClick={() => void gotoAnswers(step + 1)}>Следующий вопрос →</button>
            : <AfterRoundNav pack={pack} gameState={gameState} />}
      </div>
    </div>
  )
}

/** Автопоказ ответа: как только таймер вышел — открываем ответ сам. */
/** Показ вариантов с интригой (п.5):
 *  0 сек — на экране два ЗАВЕДОМО НЕВЕРНЫХ варианта;
 *  3 сек — доезжают оставшиеся (среди них правильный), но ещё без подсветки;
 *  5.5 сек — подсветка верного и приглушение неверных, плавно.
 *  Место под все варианты зарезервировано сразу (visibility), поэтому
 *  раскладка не дёргается и по позиции ничего не угадывается. */
function StagedChoices({ q, choices, imgs }: {
  q: LoadedPack['rounds'][number]['questions'][number]
  choices: { key: string; text: string }[]
  imgs?: string[]
}) {
  const [stage, setStage] = useState(0)
  useEffect(() => {
    setStage(0)
    // Вторая пара и подсветка идут почти встык: как только оставшиеся два
    // варианта на экране, ответ и так очевиден — тянуть паузу незачем.
    const t1 = setTimeout(() => setStage(1), 2200)
    const t2 = setTimeout(() => setStage(2), CH_STAGE2_MS)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [q.id])

  const correctKey = (q.answer as { correct_choice?: string }).correct_choice ?? ''
  const wrongs = choices.filter(c => c.key !== correctKey)
  // первые двое неверных выбираются стабильно — одинаково на всех проекторах
  const firstWave = new Set(shuffleStable(wrongs.map(c => c.key), q.id).slice(0, 2))

  const cls = (key: string) => {
    const shown = stage >= 1 || firstWave.has(key)
    if (!shown) return ' hidden-yet'
    if (stage < 2) return ''
    return key === correctKey ? ' correct' : ' dimmed'
  }
  const delay = (key: string) => (firstWave.has(key) ? 0 : 0.25 * choices
    .filter(c => !firstWave.has(c.key)).findIndex(c => c.key === key))

  if (imgs) return (
    <div className="choice-imgs">
      {choices.map((c, i) => (
        <div key={c.key} className={`choice-img${cls(c.key)}`}
          style={{ animationDelay: `${delay(c.key)}s` }}>
          <img src={mediaUrl(imgs[i])} alt="" />
          <span className="key">{c.key}{c.text ? ` — ${c.text}` : ''}</span>
        </div>
      ))}
    </div>
  )
  return (
    <div className={`choices-grid${choicesLenClass(choices.map(c => c.text))}`}
      style={{ width: '100%', marginTop: 0, paddingTop: 0 }}>
      {choices.map(c => (
        <div key={c.key} className={`choice-plate${cls(c.key)}`}
          style={{ animationDelay: `${delay(c.key)}s` }}>
          <span className="key">{c.key}</span>{c.text}
        </div>
      ))}
    </div>
  )
}

function AutoReveal({ enabled, startedAt, seconds }: {
  enabled: boolean; startedAt: string | null; seconds: number
}) {
  useEffect(() => {
    if (!enabled || !startedAt) return
    const ms = new Date(startedAt).getTime() + seconds * 1000 - Date.now()
    const t = setTimeout(() => { void revealAnswer() }, Math.max(0, ms))
    return () => clearTimeout(t)
  }, [enabled, startedAt, seconds])
  return null
}

/** Автопролистывание: через N сек после конца таймера — следующий вопрос. */
function AutoAdvance({ round, gameState, isLast }: {
  round: LoadedPack['rounds'][number]
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
  isLast: boolean
}) {
  const sec = (round.settings as { autoAdvanceSec?: number }).autoAdvanceSec ?? 0
  useEffect(() => {
    // document.hidden убран: стоило окну на миг потерять фокус — и
    // автопролистывание не включалось до конца раунда.
    if (!sec || !gameState.timer_started_at || isLast) return
    const started = new Date(gameState.timer_started_at).getTime()
    const fireAt = started + (round.timer_seconds + sec) * 1000
    // если время уже вышло (вернулись на вопрос), листаем почти сразу,
    // а не молчим — раньше при ms <= 0 эффект просто выходил
    const ms = Math.max(500, fireAt - Date.now())
    const t = setTimeout(() => { void gotoQuestion(gameState.question_index + 1) }, ms)
    return () => clearTimeout(t)
  }, [gameState.timer_started_at, gameState.question_index, sec])
  return null
}

/** Своя игра: доска тем и плиток. Клик по плитке — играет трек, ответ по кнопке.
 *  Открытые плитки гаснут. Тем может быть любое количество (1..6). */
function JeopardyBoard({ pack, round, gameState }: {
  pack: LoadedPack
  round: LoadedPack['rounds'][number]
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
}) {
  const themes = (round.settings as { themes?: JeopardyTheme[] }).themes ?? []
  const [active, setActive] = useState<{ t: number; i: number } | null>(null)
  // Открытые плитки живут в СЕССИИ, а не в памяти вкладки: после
  // перезагрузки страницы они снова становились доступны, и вопрос можно
  // было сыграть дважды.
  // Отдельное поле сессии. Раньше плитки лежали в completed_rounds — там же,
  // где номера сыгранных раундов. Оно перезаписывается целиком при переходе
  // между раундами, поэтому отметки стирались и плитки снова открывались.
  const fromServer = ((gameState as unknown as { jeopardy_opened?: unknown[] })
    .jeopardy_opened ?? []).filter((x): x is string => typeof x === 'string')
  // Локальная копия — страховка: если запись в базу не прошла (например,
  // миграция не применена), плитки всё равно гаснут до конца игры, а не
  // делают вид, что ничего не произошло.
  const [openedLocal, setOpenedLocal] = useState<string[]>([])
  const [saveErr, setSaveErr] = useState<string | null>(null)
  const opened = [...new Set([...fromServer, ...openedLocal])]

  const setOpened = async (next: string[]) => {
    setOpenedLocal(next)
    const { error } = await supabase.from('game_sessions')
      .update({ jeopardy_opened: next } as never).eq('id', getRoomId())
    if (error) {
      setSaveErr('Плитки не сохраняются: ' + error.message
        + '. Выполни миграцию 0006_jeopardy_opened.sql.')
    } else setSaveErr(null)
    // Плитка закрыта — у команд должна пропасть форма ответа. Она видна,
    // пока идёт таймер, поэтому его надо снять, иначе форма висит вечно.
    await supabase.from('game_sessions')
      .update({ timer_started_at: null, reveal: false }).eq('id', getRoomId())
  }

  // Хук — ДО раннего return ниже (иначе число хуков между рендерами
  // «темы пустые / темы заполнены» плавало бы и падало React #310).
  const jpTitleText = round.title_lines.join(' ') || 'СВОЯ ИГРА'
  const jpTitleScrambled = useScrambleReveal(jpTitleText, pack.theme === 'classic')

  if (themes.length === 0) return (
    <div className="host-screen grid-bg">
      <div className="mono-tag">СВОЯ ИГРА</div>
      <p>Темы не заполнены — добавь их в редакторе раунда</p>
      <div className="host-actions">
        <button onClick={() => void setPhase('round_intro')}>← К титулу</button>
      </div>
    </div>
  )

  const rows = Math.max(...themes.map(t => t.tiles.length))
  return (
    <div className="host-screen grid-bg jp-screen">
      <h1 className="neon-title jp-title">
        {pack.theme === 'classic' ? jpTitleScrambled : jpTitleText}</h1>
      <div className="jp-board" style={{
        gridTemplateColumns: `repeat(${themes.length}, minmax(0, 1fr))`,
        gridTemplateRows: `auto repeat(${rows}, minmax(0, 1fr))`,
      }}>
        {saveErr && <div className="jp-save-err">⚠ {saveErr}</div>}
      {themes.map((t, ti) => (
          <div key={`h${ti}`} className="jp-theme-name" style={{ gridColumn: ti + 1, gridRow: 1 }}>
            {t.name || `Тема ${ti + 1}`}
            {t.hint && <span className="jp-theme-hint">{t.hint}</span>}
          </div>
        ))}
        {themes.map((t, ti) => t.tiles.map((tile, i) => {
          const done = opened.includes(`${ti}-${i}`)
          return (
            // data-c — номер темы для раскраски: у плиток мелодии цвет неона
            // берётся так же. У мелодии всего 4 темы за раз, а в «Своей игре»
            // их бывает 5+ — на 4 цветах пятая колонка повторяла первую.
            <button key={`${ti}-${i}`} className={`jp-tile${done ? ' done' : ''}`} disabled={done}
              data-c={ti % 8}
              style={{ gridColumn: ti + 1, gridRow: i + 2 }}
              onClick={() => {
                // синхронизируем номер открытой плитки с игроками:
                // они шлют ответ по question_index, модалка читает по нему же
                const flat = themes.slice(0, ti).reduce((s, x) => s + x.tiles.length, 0) + i
                // gotoQuestion обнуляет timer_started_at, а телефоны именно по
                // нему понимают, что плитка открыта — без старта они вечно
                // показывали «ждём, пока ведущий откроет плитку».
                void gotoQuestion(flat).then(() => startTimer())
                setActive({ t: ti, i })
              }}>{done ? '·' : tile.value}</button>
          )
        }))}
      </div>
      <div className="host-actions">
        {/* Кнопка прыгала в следующий раунд НАПРЯМУЮ и обходила общий
            маршрут: табло и перерыв, настроенные для раунда, молча
            пропускались. Именно поэтому после «Своей игры» и мелодии не
            показывалось табло, хотя галочка в редакторе стояла.
            Теперь маршрут считает тот же модуль, что и в админке. */}
        <AfterRoundNav pack={pack} gameState={gameState} />
      </div>
      {active && (
        <TileModal packTheme={pack.theme} round={round} gameState={gameState}
          theme={themes[active.t]} tile={themes[active.t].tiles[active.i]}
          tileIndex={themes.slice(0, active.t).reduce((s, x) => s + x.tiles.length, 0) + active.i}
          onClose={() => { void setOpened([...opened, `${active.t}-${active.i}`]); setActive(null) }} />
      )}
    </div>
  )
}

/** Модалка плитки (перенос из старого Round4): автозапуск трека с обратным
 *  отсчётом клипа, живые ответы команд по скорости, ✓/✗, переслушать. */
function TileModal({ round, gameState, theme, tile, tileIndex, onClose, packTheme }: {
  packTheme?: string
  round: LoadedPack['rounds'][number]
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
  theme: JeopardyTheme
  tile: { value: number; audio: string; correct: string }
  /** сквозной номер плитки в раунде */
  tileIndex: number
  onClose: () => void
}) {
  const clipSeconds = (round.settings as { clipSeconds?: number }).clipSeconds ?? 30
  // одна ручка на текущий трек: она глушит и звук, и отсчёт
  const handleRef = useRef<SyncedHandle | null>(null)
  const [remaining, setRemaining] = useState(clipSeconds)
  const [playing, setPlaying] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const answers = useAnswers(gameState.game_id, gameState.round_number)
  const teams = useTeams(gameState.game_id)
  const [audioErr, setAudioErr] = useState<string | null>(null)

  const play = () => {
    handleRef.current?.stop()
    if (!tile.audio) { setPlaying(false); setAudioErr('у плитки не задан трек'); return }
    setAudioErr(null)
    setRemaining(clipSeconds)
    // Отсчёт запускается ПО ФАКТУ начала звука, а не по нажатию: файл может
    // грузиться несколько секунд, и раньше таймер уходил вперёд.
    // «Переслушать» глушит прошлый трек — наложения быть не может.
    handleRef.current = playSynced(mediaUrl(tile.audio), clipSeconds, {
      onStart: () => setPlaying(true),
      onTick: left => setRemaining(left),
      onEnd: () => setPlaying(false),
      onError: reason => { setPlaying(false); setAudioErr(reason) },
    })
  }
  useEffect(() => {
    play()
    return () => { handleRef.current?.stop() }
  }, [tileIndex])

  // Ключ ответа содержит номер раунда, но старые игры писали его без раунда —
  // разбор обеих форм лежит в lib/jeopardyRef.ts, чтобы проектор, телефон и
  // подсчёт читали ответы одинаково.
  const rows = answers
    .filter(a => jeopardyTile(a.question_ref, gameState.round_number) === tileIndex)
    .sort((x, y) => +new Date(x.updated_at) - +new Date(y.updated_at))

  const grade = async (id: string, correct: boolean) => {
    await supabase.from('answers').update({ is_correct: correct }).eq('id', id)
  }

  return createPortal(
    <div className={`jp-overlay theme-${packTheme ?? 'classic'}`}>
      <div className="jp-modal hud-frame">
        <div className="jp-modal-head">
          <div>
            <div className="jp-modal-theme">{theme.name}</div>
            <div className="mono-tag">ПЛИТКА · {tile.value}</div>
          </div>
          <div className={`jp-count${playing ? ' on' : ''}`}>{String(remaining).padStart(2, '0')}</div>
        </div>

        {showAnswer && (
          <div className="answer-reveal hud-frame" style={{ padding: '12px 18px' }}>
            <div className="answer-label">ПРАВИЛЬНЫЙ ОТВЕТ</div>
            <div className="answer-main" style={{ fontSize: 'clamp(24px,3vw,40px)' }}>{tile.correct}</div>
          </div>
        )}

        <div className="jp-answers">
          <div className="mono-tag">
            {showAnswer ? 'ОТВЕТЫ (ПО СКОРОСТИ)' : `ОТВЕТИЛИ: ${rows.length}`}
          </div>
          {rows.length === 0 && <div style={{ color: 'var(--dim)' }}>ждём ответы…</div>}
          {rows.map((a, pos) => {
            const team = teams.find(t => t.id === a.team_id)
            return (
              <div key={a.id} className="jp-answer" style={{
                borderLeft: `3px solid ${a.is_correct === true ? 'var(--ok)' : a.is_correct === false ? 'var(--danger)' : 'var(--dim)'}`,
              }}>
                <span className="pos">#{pos + 1}</span>
                <span className="name" style={{ color: team?.color }}>{team?.name ?? '—'}</span>
                {/* до нажатия «Показать ответ» видно только ФАКТ ответа:
                    иначе зал читает чужие ответы и интрига пропадает */}
                <span className="txt">{showAnswer ? (a.answer_text || '—') : '• • •'}</span>
                {/* оценку можно переставить: раньше кнопки блокировались
                    навсегда, и промах мышью стоил команде баллов */}
                {showAnswer && <>
                  <button className={`jp-grade ok${a.is_correct === true ? ' chosen' : ''}`}
                    onClick={() => void grade(a.id, true)}>✓</button>
                  <button className={`jp-grade no${a.is_correct === false ? ' chosen' : ''}`}
                    onClick={() => void grade(a.id, false)}>✗</button>
                </>}
              </div>
            )
          })}
        </div>

        <div className="jp-modal-foot">
          {!showAnswer && <button onClick={() => setShowAnswer(true)}>Показать ответ</button>}
          <button className="ghost" onClick={play}>↻ Переслушать</button>
          {audioErr && <div className="jp-audio-err">🔇 {audioErr}
            <button className="ghost" style={{ marginLeft: 10 }}
              onClick={() => void probeMedia(mediaUrl(tile.audio)).then(t => alert(t))}>
              что с файлом?
            </button>
          </div>}
          {/* неоценённый ответ даёт 0 баллов — предупреждаем ДО закрытия плитки */}
          {rows.some(a => a.is_correct == null) && (
            <div className="jp-ungraded">
              ⚠ не оценено: {rows.filter(a => a.is_correct == null).length}
            </div>
          )}
          <button className="ghost dark" onClick={onClose}>Закрыть плитку</button>
        </div>
      </div>
    </div>,
    document.body,
  )
}

/** Сопоставление на экране ответа: картинка №N с правильной буквой (перенос MatchAnswerGrid). */
function MatchAnswer({ q }: { q: LoadedPack['rounds'][number]['questions'][number] }) {
  if (q.answer.mode !== 'match') return null
  const spec = q.answer
  const imgs = (q.media.question ?? []).filter(m => !/\.(mp3|mp4|webm|wav)$/i.test(m))
  const pairs = spec.correct_pairs
  return (
    <div className={`match-answer n${Math.min(spec.left.length, 6)}`}>
      {spec.left.map((l, i) => {
        const right = pairs.find(p => p.startsWith(l))?.slice(l.length) ?? '—'
        // рядом с буквой показываем САМ вариант: одну букву зал не соотнесёт
        const label = (spec.right_labels ?? [])[(spec.right ?? []).indexOf(right)] || right
        return (
          <div key={l} className="mi">
            {imgs[i] && <img src={mediaUrl(imgs[i])} alt="" />}
            <div className="mi-label">
              <b>{l} → {right}</b>
              {label && label !== right && <span className="mi-text">{label}</span>}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/** Навигация после раунда: табло → перерыв → следующий раунд/финал (по флагам раунда). */
function AfterRoundNav({ pack, gameState }: {
  pack: LoadedPack
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
}) {
  // маршрут считает общий модуль — проектор и админка не могут разойтись
  const step = afterRoundStep(pack, gameState.round_number, gameState.phase)
  const label = step.label.replace(' →', '').toLowerCase()
  const run = () => {
    if (step.kind === 'scoreboard') return void showScoreboard()
    if (step.kind === 'break') return void startBreak()
    if (step.kind === 'finale') {
      // слайд «перед итогами» показываем до финала — ведущему не надо
      // помнить про кнопку, слайд выходит сам там, где задуман
      const sl = slideBeforeFinale(pack.settings?.info_slides)
      return sl == null ? void finishGame(gameState.pack_id) : void showSlide(sl)
    }
    return void gotoRound(gameState.round_number + 1,
      slideForRound(pack.settings?.info_slides, gameState.round_number + 1) ?? undefined)
  }
  return <button onClick={run}>
    {label.charAt(0).toUpperCase() + label.slice(1)} →
  </button>
}

/** Табло с разбивкой по раундам (перенос идеи старого Scoreboard, новогодний визуал). */
function ScoreboardScreen({ pack, gameState }: {
  pack: LoadedPack
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
}) {
  const teams = useTeams(gameState.game_id)
  const answers = useAnswers(gameState.game_id)
  const totals = computeTotals(pack, teams, answers)
  const perRound = computeRoundScores(pack, teams, answers)
  const scored = pack.rounds.filter(r => !r.off_scoreboard)
  const rows = rankTeams(teams, totals, answers, perRound)
  const ranked = rows.map(r => r.team)
  // раскрытие интригой: с последнего места, по одной строке каждые 2.2 сек
  const [revealed, setRevealed] = useState(0)
  useEffect(() => {
    setRevealed(0)
    if (ranked.length === 0) return
    const t = setInterval(() => setRevealed(p => (p >= ranked.length ? p : p + 1)), 2200)
    return () => clearInterval(t)
  }, [ranked.length, gameState.round_number])
  const medals = ['🥇', '🥈', '🥉']
  // Ступени tableSize() считают по ЧИСЛУ КОМАНД и калиброваны по ширине
  // (vw). На невысоких экранах (1366×768, 1600×900) при восьми командах и
  // восьми раундах нижняя строка всё равно уезжала под кнопку «Дальше»:
  // формула не знает про реальную высоту экрана. Досчитывает useFitText —
  // тот же приём, что и для текста вопроса: таблица лежит в подрезанной по
  // высоте обёртке (.sb-table-wrap, flex: 1 1 0 + overflow: hidden) и
  // довписывается в неё замером, а не только формулой.
  const fitTable = useFitText<HTMLTableElement>([ranked.length, scored.length])
  return (
    <div className="host-screen grid-bg sb-screen">
      <div className="mono-tag">ПОЛОЖЕНИЕ КОМАНД</div>
      {/* заголовок намеренно НЕ через Title: он был крупнее самой таблицы */}
      <h2 className="sb-title">ПРОМЕЖУТОЧНЫЕ РЕЗУЛЬТАТЫ</h2>
      {/* Кегль крупный, ступени по числу команд — это первый, грубый подгон
          под ширину. Обёртка ниже держит границы по высоте, а useFitText
          довписывает то, что ступени не учли. */}
      <div className="sb-table-wrap">
      <table ref={fitTable} className={`score-table${tableSize(ranked.length)}`}>
        <thead>
          <tr>
            <th></th><th>Команда</th>
            {scored.map((r, i) => <th key={r.id}>Р{i + 1}</th>)}
            <th>Σ</th>
          </tr>
        </thead>
        <tbody>
          {/* ВСЕ строки рендерятся ВСЕГДА (константная разметка) — иначе
              useFitText мерил бы таблицу из нуля строк на первом кадре и
              подгонял кегль по пустоте (баг 8.47). Раскрытие — только
              видимостью: строка «в игре», если её индекс попал в последние
              `revealed` мест снизу списка (последнее место открывается
              первым, лидер — последним). */}
          {ranked.map((t, idx) => {
            const row = rows.find(r => r.team.id === t.id)
            const place = row?.place ?? 1
            const isIn = idx >= ranked.length - revealed
            return (
            <tr key={t.id} className={`sb-row${isIn ? ' is-in' : ' is-veiled'}${place === 1 ? ' leader' : ''}`}>
              {/* при равных очках место общее: 1, 2, 2, 4 */}
              <td>{medals[place - 1] ?? place}{row?.shared && <span className="sb-eq">=</span>}</td>
              <td style={{ color: t.color, fontFamily: 'var(--font-display)' }}>
                <span className="sb-name">{t.name}</span></td>
              {/* perRound индексируется по ВСЕМ раундам, а колонок столько,
                  сколько зачётных: без пересчёта индекса разогрев (Р0) сдвигал
                  все баллы на колонку влево */}
              {scored.map(r => {
                const all = perRound.get(t.id) ?? []
                return <td key={r.id}>{all[pack.rounds.indexOf(r)] ?? 0}</td>
              })}
              <td className="total">{totals.get(t.id) ?? 0}</td>
            </tr>
          )})}
        </tbody>
      </table>
      </div>
      <div className="host-actions">
        <AfterRoundNav pack={pack} gameState={gameState} />
      </div>
    </div>
  )
}

/** Перерыв: гигантский таймер обратного отсчёта (по мотивам старого BreakScreen). */
function BreakScreen({ pack, round, gameState }: {
  pack: LoadedPack
  round: LoadedPack['rounds'][number]
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
}) {
  const minutes = (round.settings as { break_after_minutes?: number }).break_after_minutes ?? 10
  const [left, setLeft] = useState(minutes * 60)
  useEffect(() => {
    const started = gameState.timer_started_at ? new Date(gameState.timer_started_at).getTime() : Date.now()
    const tick = () => setLeft(Math.max(0, Math.round(minutes * 60 - (Date.now() - started) / 1000)))
    tick()
    const t = setInterval(tick, 500)
    return () => clearInterval(t)
  }, [gameState.timer_started_at, minutes])
  const mm = String(Math.floor(left / 60)).padStart(2, '0')
  const ss = String(left % 60).padStart(2, '0')
  return (
    <div className="host-screen grid-bg break-screen">
      <div className="mono-tag accent">АНТРАКТ</div>
      <Title theme={pack.theme} lines={['ПЕРЕРЫВ']} />
      <Deco theme={pack.theme} />
      <div className="break-timer">{mm}:{ss}</div>
      <div className="host-actions">
        <AfterRoundNav pack={pack} gameState={gameState} />
      </div>
    </div>
  )
}

/** «Считаем баллы» — игра в баре.
 *
 *  Ведущий собрал бланки и сводит результаты; это несколько минут, за которые
 *  зал не должен смотреть в пустой экран. Отсчёт идёт вниз от пяти минут, но
 *  сам ничего не переключает: закончил считать раньше — жмёшь «К итогам»,
 *  затянулось — экран спокойно висит с нулями, а не выкидывает зал в финал
 *  посреди подсчёта. Уйти можно и отсюда, и из админки. */
function CountingScreen({ pack, gameState }: {
  pack: LoadedPack
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
}) {
  const MINUTES = 5
  const [left, setLeft] = useState(MINUTES * 60)
  useEffect(() => {
    const started = gameState.timer_started_at
      ? new Date(gameState.timer_started_at).getTime() : Date.now()
    const tick = () => setLeft(Math.max(0, Math.round(MINUTES * 60 - (Date.now() - started) / 1000)))
    tick()
    const t = setInterval(tick, 500)
    return () => clearInterval(t)
  }, [gameState.timer_started_at])

  // Музыка: своя для финала, иначе общая фоновая — тишина в баре читается
  // как «что-то сломалось».
  useEffect(() => {
    const src = pack.settings?.finale_music ?? pack.settings?.bg_music
    if (!src || document.hidden) return
    const a = createAudio(); a.src = mediaUrl(src)
    a.loop = true; a.volume = .55
    a.play().catch(() => {})
    return () => { try { a.pause(); a.src = '' } catch { /* уже мёртв */ } }
  }, [pack.settings?.finale_music, pack.settings?.bg_music])

  const mm = String(Math.floor(left / 60)).padStart(2, '0')
  const ss = String(left % 60).padStart(2, '0')
  return (
    <div className="host-screen grid-bg break-screen counting-screen">
      <div className="mono-tag accent">ПОДВОДИМ ИТОГИ</div>
      <Title theme={pack.theme} lines={['СЧИТАЕМ', 'БАЛЛЫ']} />
      <Deco theme={pack.theme} />
      <div className="break-timer">{mm}:{ss}</div>
      <div className="counting-sub">Скоро объявим победителей</div>
      <div className="host-actions">
        <button onClick={() => void finishGame(gameState.pack_id)}>К итогам →</button>
      </div>
    </div>
  )
}

function Finale({ pack, gameId, gameState }: {
  pack: LoadedPack; gameId: string
  gameState: NonNullable<ReturnType<typeof useGameState>['gameState']>
}) {
  const teams = useTeams(gameId)
  const answers = useAnswers(gameId)
  const totals = computeTotals(pack, teams, answers)
  const roundScores = computeRoundScores(pack, teams, answers)
  const rows = rankTeams(teams, totals, answers, roundScores)

  // Шаг и сценарий живут в сессии: ведущий может вести финал с телефона,
  // стоя у сцены, — для награждения в баре это обязательно.
  const bar = !!gameState.reveal
  const step = gameState.question_index ?? 0

  // та же обёртка + подгон, что у промежуточного табло: ступени tableSize()
  // калиброваны по ширине и не знают про реальную высоту невысоких экранов
  const fitFinTable = useFitText<HTMLTableElement>([rows.length])

  // раунды, идущие в зачёт, и победитель каждого из них
  const scored = pack.rounds.map((r, i) => ({ r, i })).filter(x => !x.r.off_scoreboard)
  const roundWinners = scored.map(({ r, i }) => {
    let best: (typeof teams)[number] | null = null, bestVal = -Infinity
    for (const t of teams) {
      const v = roundScores.get(t.id)?.[i] ?? 0
      if (v > bestVal) { bestVal = v; best = t }
    }
    return { round: r, idx: i, team: best, score: bestVal }
  })

  // ── СЦЕНАРИЙ «ШОУ»: нарезка раундов по 15 сек → победитель (10 сек) → таблица
  const SLIDE = 3_000, WINNER = 10_000
  const winnerStep = roundWinners.length
  useEffect(() => {
    if (bar || step > winnerStep) return
    const ms = step === winnerStep ? WINNER : SLIDE
    const t = setTimeout(() => void setFinaleStep(step + 1), ms)
    return () => clearTimeout(t)
  }, [bar, step, winnerStep])

  // Полная таблица раскрывается от последнего места к первому, с
  // ускорением — та же интрига, что у промежуточного табло, только резче
  // (зал уже смотрит на финал, ждать нечего). deps НЕ включают rows
  // целиком: массив пересоздаётся на каждый REST-поллинг, эффект
  // перезапускался бы на каждый тик, а не только при реальной смене шага.
  const [revealedFin, setRevealedFin] = useState(0)
  useEffect(() => {
    setRevealedFin(0)
    if (rows.length === 0) return
    let cancelled = false
    let n = 0
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      if (cancelled) return
      n += 1
      setRevealedFin(n)
      if (n >= rows.length) return
      timer = setTimeout(tick, Math.max(320, 900 - 90 * n))
    }
    timer = setTimeout(tick, Math.max(320, 900 - 90 * n))
    return () => { cancelled = true; clearTimeout(timer) }
  }, [rows.length, step, bar])

  const colors = ['#ffd700', '#ff2fa0', '#00e5ff', '#b6ff3c', '#ff8c42']
  const fireworks = (
    <>
      {Array.from({ length: 5 }, (_, bi) => (
        <div key={bi} className="fw-burst" style={{
          left: `${12 + bi * 19}%`, top: `${18 + (bi % 3) * 14}%`,
        }}>
          <span className="fw-flash" style={{
            background: `radial-gradient(circle, ${colors[bi % colors.length]}55, transparent 70%)`,
            ['--dur' as string]: `${2.2 + bi * 0.3}s`, ['--delay' as string]: `${bi * 0.45}s`,
          }} />
          {Array.from({ length: 10 }, (_, si) => (
            <span key={si} className="fw-spark" style={{
              background: colors[(bi + si) % colors.length],
              ['--a' as string]: `${si * 36}deg`,
              ['--dur' as string]: `${2.2 + bi * 0.3}s`, ['--delay' as string]: `${bi * 0.45}s`,
            }} />
          ))}
        </div>
      ))}
    </>
  )

  const fullTable = (
    <div className="fin-breakdown">
      <div className="mono-tag">РАЗБИВКА ПО РАУНДАМ</div>
      <div className="fin-table-wrap">
      <table ref={fitFinTable} className={`fin-table${tableSize(rows.length)}`}>
        {/* ДВЕ пустые колонки: место и название команды. Была одна —
            заголовки раундов съезжали влево на целый столбец. */}
        <thead><tr><th /><th>Команда</th>{pack.rounds.map((r, i) => !r.off_scoreboard &&
          <th key={r.id}>Р{displayRoundNumber(pack, i)}</th>)}<th>Σ</th></tr></thead>
        <tbody>
          {/* Строки — ВСЕ и ВСЕГДА (та же причина, что у табло): подгон
              кегля меряет постоянную разметку, не растущую по одной
              строке. Раскрытие — от последнего места к первому. */}
          {rows.map(({ team: t, place, shared }, idx) => {
            const isIn = idx >= rows.length - revealedFin
            return (
            <tr key={t.id} className={`fin-row${place <= 3 ? ' top3' : ''}${
              place === 1 ? ' fin-first' : ''}${isIn ? ' is-in' : ' is-veiled'}`}>
              <td className="fin-pos">{place}{shared && <span className="sb-eq">=</span>}</td>
              <td style={{ color: t.color }}><span className="sb-name">{t.name}</span></td>
              {pack.rounds.map((r, ri) => !r.off_scoreboard && (
                <td key={r.id}>{roundScores.get(t.id)?.[ri] ?? 0}</td>
              ))}
              <td><b>{totals.get(t.id) ?? 0}</b></td>
            </tr>
          )})}
        </tbody>
      </table>
      </div>
    </div>
  )

  // ── СЦЕНАРИЙ «БАР»: 3 место → 2 → 1 → таблица, каждый шаг по команде ведущего
  if (bar) {
    // Идём по МЕСТАМ (3 → 2 → 1), а не по позициям в списке: при ничьей
    // одно место могут занимать несколько команд, и все они выходят вместе.
    const places = [3, 2, 1]
    if (step >= places.length) return (
      <div className="host-screen grid-bg fin-screen">
        {fireworks}
        <div className="mono-tag">ИТОГИ ИГРЫ</div>
        <Title theme={pack.theme} lines={['РЕЗУЛЬТАТЫ']} />
        {fullTable}
        <div className="host-actions">
          <button onClick={() => { if (confirm('Начать новую игру?')) void resetGame() }}>⟲ Новая игра</button>
        </div>
      </div>
    )
    const place = places[step]
    const winners = rows.filter(r => r.place === place)
    return (
      <div className="host-screen grid-bg fin-screen" onClick={() => void setFinaleStep(step + 1)}>
        {place === 1 && fireworks}
        <div className="mono-tag">НАГРАЖДЕНИЕ</div>
        <div className={`fin-award p${place}`}>
          <div className="fin-award-place">{place} МЕСТО</div>
          <div className="fin-award-medal">{['🥇', '🥈', '🥉'][place - 1]}</div>
          {winners.length > 0
            ? <>
                {winners.map(r => (
                  <div key={r.team.id} className="fin-award-name"
                    style={{ color: r.team.color }}>{r.team.name}</div>
                ))}
                <div className="fin-award-score">{winners[0].total}</div>
              </>
            : <div className="fin-award-name">—</div>}
        </div>
        <div className="fin-hint">дальше — по команде ведущего</div>
      </div>
    )
  }

  // ── СЦЕНАРИЙ «ШОУ» ──
  if (step < winnerStep) {
    const w = roundWinners[step]
    return (
      <div className="host-screen grid-bg fin-screen" onClick={() => void setFinaleStep(step + 1)}>
        <div className="mono-tag">ВСПОМИНАЕМ ИГРУ</div>
        <div className="fin-slide">
          <div className="fin-slide-round">
            Раунд {displayRoundNumber(pack, w.idx)} · {w.round.title_lines.join(' ')}
          </div>
          <div className="fin-slide-label">лучший результат</div>
          <div className="fin-slide-team" style={{ color: w.team?.color }}>
            {w.team?.name ?? '—'}
          </div>
          <div className="fin-slide-score">{Math.max(0, w.score)}</div>
        </div>
        {/* полоска времени: видно, сколько осталось до следующего слайда */}
        <div className="fin-progress" key={step}><i style={{ animationDuration: '3s' }} /></div>
        <div className="fin-dots">
          {roundWinners.map((_, i) => <span key={i} className={i === step ? 'on' : ''} />)}
        </div>
      </div>
    )
  }

  if (step === winnerStep) {
    // победителей может быть несколько — ничья на первом месте
    const champs = rows.filter(r => r.place === 1)
    return (
      <div className="host-screen grid-bg fin-screen" onClick={() => void setFinaleStep(step + 1)}>
        {fireworks}
        <div className="mono-tag">
          {champs.length > 1 ? 'ПОБЕДИТЕЛИ ИГРЫ' : 'ПОБЕДИТЕЛЬ ИГРЫ'}
        </div>
        <div className="fin-award p1">
          <div className="fin-award-medal">🥇</div>
          {champs.length > 0
            ? champs.map(r => (
                <div key={r.team.id} className="fin-award-name"
                  style={{ color: r.team.color }}>{r.team.name}</div>
              ))
            : <div className="fin-award-name">—</div>}
          <div className="fin-award-score">{champs[0]?.total ?? 0}</div>
        </div>
        <div className="fin-progress" key="w"><i style={{ animationDuration: '10s' }} /></div>
      </div>
    )
  }

  return (
    <div className="host-screen grid-bg fin-screen">
      {fireworks}
      <div className="mono-tag">ИТОГИ ИГРЫ</div>
      <Title theme={pack.theme} lines={['РЕЗУЛЬТАТЫ']} />
      {fullTable}
      <div className="host-actions">
        <button onClick={() => { if (confirm('Начать новую игру?')) void resetGame() }}>⟲ Новая игра</button>
      </div>
    </div>
  )
}
