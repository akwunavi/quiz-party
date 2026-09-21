// ═══ «Своя игра»: доска тем и плиток ═══
// Вынесено из HostScreen.tsx (9.51, объединение предпросмотра с боевым
// экраном) — импорт оттуда тянул бы весь проектор в чужой чанк, а
// предпросмотру в редакторе нужен ровно этот компонент, не копия.
import { createPortal } from 'react-dom'
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { TileCard } from '../../components/TileCard'
import { AfterRoundNav } from '../../components/AfterRoundNav'
import { setPhase } from '../../lib/gameActions'
import { jeopardyTile, jpShowAnswer, jpReplay, jpOpenTile, jpLocate, jpNextReplay } from '../../lib/jeopardyRef'
import { jeopardyOpened, openJeopardyTile, closeJeopardyTile } from '../../lib/jeopardyActions'
import { saveMelody } from '../../lib/melodyActions'
import { mediaUrl } from '../../lib/media'
import { useScrambleReveal } from '../../hooks/useScrambleReveal'
import { useAnswers } from '../../hooks/useAnswers'
import { useTeams } from '../../hooks/useTeams'
import { probeMedia, playSynced, type SyncedHandle } from '../../lib/audioSource'
import { room } from '../../lib/transport'
import type { LoadedPack, LoadedRound } from '../../lib/packLoader'
import type { GameState, JeopardyTheme } from '../../types/quiz'
import type { PreviewCtx } from '../../lib/previewState'

/** Своя игра: доска тем и плиток. Клик по плитке — играет трек, ответ по кнопке.
 *  Открытые плитки гаснут. Тем может быть любое количество (1..6). */
export function JeopardyBoard({ pack, round, gameState, preview }: {
  pack: LoadedPack
  round: LoadedRound
  gameState: GameState
  /** Предпросмотр в редакторе: доска читает состояние из ГОТОВОГО
   *  gameState.melody.jp (не из сети), клики по плиткам ничего не пишут в
   *  живую сессию — иначе редактор портил бы игру, которая идёт прямо
   *  сейчас на другом экране (getRoomId() в браузере один на всё вкладки
   *  этого происхождения, HANDOFF.md). */
  preview?: PreviewCtx
}) {
  const themes = (round.settings as { themes?: JeopardyTheme[] }).themes ?? []
  // Открытая плитка живёт в ОБЩЕМ состоянии игры (melody.jp), а не в памяти
  // вкладки: иначе пульт ведущего в телефоне не знает, что плитка открыта, и
  // управлять ей оттуда нечем (8.86). Локальная копия — только на время, пока
  // опрос (2 сек) не принёс запись обратно: без неё модалка открывалась бы с
  // задержкой в пару секунд после клика по плитке.
  const [tileLocal, setTileLocal] = useState<number | null | undefined>(undefined)
  const sharedTile = jpOpenTile(gameState.melody)
  useEffect(() => {
    if (preview) return
    // сервер догнал локальную догадку (или ведущий переключил плитку с
    // телефона) — локальную копию снимаем, дальше правит общее состояние
    if (tileLocal !== undefined && sharedTile === tileLocal) setTileLocal(undefined)
  }, [preview, sharedTile, tileLocal])
  const openTile = preview ? (gameState.melody?.jp?.tile ?? null)
    : (tileLocal !== undefined ? tileLocal : sharedTile)
  // Предсказанный `jp.replay` для ТОЛЬКО ЧТО открытой (ещё не подтверждённой
  // опросом) плитки — тем же способом, что и настоящий переход (jpOpen), см.
  // jpNextReplay. Пока опрос не догнал клик, `gameState.melody` — это ещё
  // состояние ПРЕЖНЕЙ плитки, и его «replay» меньше того, что придёт с
  // сервера через секунду-две. Раньше `TileModal` получал сначала это старое
  // число, а как только опрос доносил настоящее — расценивал скачок как
  // «нажали переслушать» и перезапускал трек с нуля (9.36).
  const predictedReplay = useRef<number | null>(null)
  // Координаты клика по плитке — для перехода "рост из плитки" (Р3).
  // Известны только когда открытие пришло от клика ЗДЕСЬ, на проекторе;
  // если плитку открыли с телефона ведущего (AdminPage), tile совпадёт,
  // но координат нет — модалка входит старым способом (см. 37-tile-card.css).
  const clickOrigin = useRef<{ tile: number; x: number; y: number } | null>(null)
  const tileElRefs = useRef(new Map<number, HTMLElement>())
  // Открытые плитки живут в СЕССИИ, а не в памяти вкладки: после
  // перезагрузки страницы они снова становились доступны, и вопрос можно
  // было сыграть дважды.
  // Отдельное поле сессии. Раньше плитки лежали в completed_rounds — там же,
  // где номера сыгранных раундов. Оно перезаписывается целиком при переходе
  // между раундами, поэтому отметки стирались и плитки снова открывались.
  const fromServer = preview ? [] : jeopardyOpened(gameState)
  // Локальная копия — страховка: если запись в базу не прошла (например,
  // миграция не применена), плитки всё равно гаснут до конца игры, а не
  // делают вид, что ничего не произошло.
  const [openedLocal, setOpenedLocal] = useState<string[]>([])
  const [saveErr, setSaveErr] = useState<string | null>(null)
  const opened = preview ? [] : [...new Set([...fromServer, ...openedLocal])]

  const closeTile = async (tileKey: string) => {
    if (preview) return
    setOpenedLocal([...opened, tileKey])
    setSaveErr(await closeJeopardyTile(gameState, tileKey, opened))
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
            <TileCard key={`${ti}-${i}`} kind="jeopardy" done={done} colorIndex={ti % 8}
              flip={!done} label={done ? '·' : tile.value} backLabel={tile.value}
              style={{ gridColumn: ti + 1, gridRow: i + 2 }}
              elRef={el => {
                const flat = themes.slice(0, ti).reduce((s, x) => s + x.tiles.length, 0) + i
                if (el) tileElRefs.current.set(flat, el); else tileElRefs.current.delete(flat)
              }}
              onClick={() => {
                // Предпросмотр: клик по плитке ничего не пишет в живую
                // сессию (та же комната, что у проектора — HANDOFF.md).
                if (preview) return
                // синхронизируем номер открытой плитки с игроками:
                // они шлют ответ по question_index, модалка читает по нему же
                const flat = themes.slice(0, ti).reduce((s, x) => s + x.tiles.length, 0) + i
                predictedReplay.current = jpNextReplay(gameState.melody)
                // rect берём ДО открытия модалки — плитка ещё на месте
                const r = tileElRefs.current.get(flat)?.getBoundingClientRect()
                clickOrigin.current = r ? { tile: flat, x: r.left + r.width / 2, y: r.top + r.height / 2 } : null
                setTileLocal(flat)
                void openJeopardyTile(gameState, flat)
              }} />
          )
        }))}
      </div>
      <div className="host-actions">
        {/* Кнопка прыгала в следующий раунд НАПРЯМУЮ и обходила общий
            маршрут: табло и перерыв, настроенные для раунда, молча
            пропускались. Именно поэтому после «Своей игры» и мелодии не
            показывалось табло, хотя галочка в редакторе стояла.
            Теперь маршрут считает тот же модуль, что и в админке.
            В предпросмотре не рендерится: кнопка прыгает в СЛЕДУЮЩИЙ
            раунд живой сессии, а не куда-то внутри предпросмотра. */}
        {!preview && <AfterRoundNav pack={pack} gameState={gameState} />}
      </div>
      {openTile != null && (() => {
        // сквозной номер → (тема, плитка): пульт в телефоне знает только его
        const at = jpLocate(themes, openTile)
        if (!at) return null
        const { ti, i: rest, tile } = at
        // Пока опрос не подтвердил клик (tileLocal ещё не сброшен) — берём
        // ПРЕДСКАЗАННЫЙ replay, а не «gameState.melody» прежней плитки: иначе
        // как только опрос доносит настоящее (уже увеличенное) число, эффект
        // в TileModal видит скачок и запускает трек заново (см. коммент у
        // predictedReplay выше).
        const replayNonce = !preview && tileLocal !== undefined && predictedReplay.current != null
          ? predictedReplay.current
          : (gameState.melody?.jp?.replay ?? 0)
        // Координаты клика — только если ЭТУ плитку открыли отсюда, кликом.
        // Плитка, открытая с телефона ведущего, координат не несёт — рост
        // из точки клика заменяется старым входом модалки (по теме).
        const origin = !preview && clickOrigin.current?.tile === openTile
          ? { x: clickOrigin.current.x, y: clickOrigin.current.y } : null
        return (
          <TileModal packTheme={pack.theme} round={round} gameState={gameState}
            theme={themes[ti]} tile={tile} tileIndex={openTile}
            showAnswer={!!gameState.melody?.jp?.answer}
            replayNonce={replayNonce} origin={origin} preview={preview}
            onShowAnswer={() => { if (!preview) void saveMelody(jpShowAnswer(gameState.melody ?? {})) }}
            onReplay={() => { if (!preview) void saveMelody(jpReplay(gameState.melody ?? {})) }}
            onClose={() => { if (preview) return; setTileLocal(null); void closeTile(`${ti}-${rest}`) }} />
        )
      })()}
    </div>
  )
}

/** Модалка плитки (перенос из старого Round4): автозапуск трека с обратным
 *  отсчётом клипа, живые ответы команд по скорости, ✓/✗, переслушать. */
function TileModal({ round, gameState, theme, tile, tileIndex, onClose, packTheme,
  showAnswer, onShowAnswer, replayNonce, onReplay, origin, preview }: {
  packTheme?: string
  round: LoadedRound
  gameState: GameState
  theme: JeopardyTheme
  tile: { value: number; audio: string; correct: string }
  /** сквозной номер плитки в раунде */
  tileIndex: number
  /** «Показать ответ» нажато. Общее состояние (melody.jp.answer): нажать
   *  можно и с проектора, и с телефона ведущего — экран один и тот же. */
  showAnswer: boolean
  onShowAnswer: () => void
  /** Счётчик «переслушать»: изменение числа = запустить трек заново. Сам
   *  факт проигрывания состоянием не является, это событие. */
  replayNonce: number
  onReplay: () => void
  onClose: () => void
  /** Координаты клика по плитке (viewport px), если открытие пришло от
   *  клика на проекторе — используется для входа «рост из плитки» (Р3).
   *  null — плитку открыли с телефона ведущего, координат нет, входит по
   *  старому (тематическая анимация без роста). */
  origin: { x: number; y: number } | null
  /** Предпросмотр: трек НЕ запускается вовсе (play() асинхронный — заглушить
   *  после старта не получится, HANDOFF.md), ответы/команды — фиктивные. */
  preview?: PreviewCtx
}) {
  const clipSeconds = (round.settings as { clipSeconds?: number }).clipSeconds ?? 30
  // одна ручка на текущий трек: она глушит и звук, и отсчёт
  const handleRef = useRef<SyncedHandle | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  // Локальные px клика ОТНОСИТЕЛЬНО модалки (не viewport) — transform-origin
  // принимает офсеты именно в системе координат самого элемента. Меряем
  // ПОСЛЕ монтирования (useLayoutEffect — до отрисовки кадра, без мигания).
  const [growVars, setGrowVars] = useState<CSSProperties | undefined>(undefined)
  useLayoutEffect(() => {
    if (!origin || !modalRef.current) { setGrowVars(undefined); return }
    const r = modalRef.current.getBoundingClientRect()
    setGrowVars({
      '--qt-ox': `${origin.x - r.left}px`,
      '--qt-oy': `${origin.y - r.top}px`,
    } as CSSProperties)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tileIndex])
  const [remaining, setRemaining] = useState(clipSeconds)
  const [playing, setPlaying] = useState(false)
  const liveAnswers = useAnswers(preview ? null : gameState.game_id, gameState.round_number)
  const liveTeams = useTeams(preview ? null : gameState.game_id)
  const answers = preview ? preview.answers : liveAnswers
  const teams = preview ? preview.teams : liveTeams
  const [audioErr, setAudioErr] = useState<string | null>(null)
  // Оптимистичный вердикт ✓/✗: без него кнопка «включалась» визуально
  // только на следующем опросе useAnswers (раз в 2 сек) — с реальной игры
  // была жалоба «часто приходилось ждать». grade() ничего не обновляет
  // локально, а тянуть интервал опроса ниже (как у блица, 400мс) означало
  // бы просто чаще дёргать базу и всё равно ждать; кладём вердикт в
  // локальную карту СРАЗУ по клику, до ответа сервера, и мержим её поверх
  // данных с сервера при рендере — сервер всё равно догонит на следующем
  // опросе и молча подтвердит то же самое значение.
  const [localGrades, setLocalGrades] = useState<Record<string, boolean>>({})
  useEffect(() => { setLocalGrades({}) }, [tileIndex])

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
  // Трек запускается при открытии плитки и на каждое «переслушать» — в том
  // числе нажатое с телефона ведущего: там меняется replayNonce, здесь это
  // тот же перезапуск, что и от кнопки на самом проекторе.
  // Предпросмотр: НЕ запускаем звук вовсе (play() асинхронный, «запустить
  // и заглушить» не работает — см. HANDOFF.md).
  useEffect(() => {
    if (preview) return
    play()
    return () => { handleRef.current?.stop() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preview, tileIndex, replayNonce])

  // Ключ ответа содержит номер раунда, но старые игры писали его без раунда —
  // разбор обеих форм лежит в lib/jeopardyRef.ts, чтобы проектор, телефон и
  // подсчёт читали ответы одинаково.
  const rows = answers
    .filter(a => jeopardyTile(a.question_ref, gameState.round_number) === tileIndex)
    // created_at пишется один раз при вставке и не двигается при правке
    // ведущим (updated_at двигается при КАЖДОЙ оценке ✓/✗ — из-за этого
    // порядок команд прыгал при каждом клике, issue #9). Фолбэк на
    // updated_at — для старых игр до миграции 0009, где created_at может
    // отсутствовать в ответе (см. lib/exportAnswers.ts — тот же приём).
    .sort((x, y) => +new Date(x.created_at ?? x.updated_at) - +new Date(y.created_at ?? y.updated_at))

  const grade = async (id: string, correct: boolean) => {
    if (preview) return
    setLocalGrades(g => ({ ...g, [id]: correct }))
    await room.patchAnswer(id, { is_correct: correct })
  }

  return createPortal(
    <div className={`jp-overlay theme-${packTheme ?? 'classic'}`}>
      <div ref={modalRef} className={`jp-modal hud-frame${growVars ? ' qt-grow' : ''}`} style={growVars}>
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
            // Локальный вердикт побеждает, пока сервер не подтвердил своим
            // опросом — им же он и заменяется, когда придут те же данные.
            const verdict = localGrades[a.id] ?? a.is_correct
            return (
              <div key={a.id} className="jp-answer" style={{
                borderLeft: `3px solid ${verdict === true ? 'var(--ok)' : verdict === false ? 'var(--danger)' : 'var(--dim)'}`,
              }}>
                <span className="pos">#{pos + 1}</span>
                <span className="name" style={{ color: team?.color }}>{team?.name ?? '—'}</span>
                {/* до нажатия «Показать ответ» видно только ФАКТ ответа:
                    иначе зал читает чужие ответы и интрига пропадает */}
                <span className="txt">{showAnswer ? (a.answer_text || '—') : '• • •'}</span>
                {/* оценку можно переставить: раньше кнопки блокировались
                    навсегда, и промах мышью стоил команде баллов */}
                {showAnswer && <>
                  <button className={`jp-grade ok${verdict === true ? ' chosen' : ''}`}
                    onClick={() => void grade(a.id, true)}>✓</button>
                  <button className={`jp-grade no${verdict === false ? ' chosen' : ''}`}
                    onClick={() => void grade(a.id, false)}>✗</button>
                </>}
              </div>
            )
          })}
        </div>

        <div className="jp-modal-foot">
          {!showAnswer && <button onClick={onShowAnswer}>Показать ответ</button>}
          <button className="ghost" onClick={onReplay}>↻ Переслушать</button>
          {audioErr && <div className="jp-audio-err">🔇 {audioErr}
            <button className="ghost" style={{ marginLeft: 10 }}
              onClick={() => void probeMedia(mediaUrl(tile.audio)).then(t => alert(t))}>
              что с файлом?
            </button>
          </div>}
          {/* неоценённый ответ даёт 0 баллов — предупреждаем ДО закрытия плитки */}
          {rows.some(a => (localGrades[a.id] ?? a.is_correct) == null) && (
            <div className="jp-ungraded">
              ⚠ не оценено: {rows.filter(a => (localGrades[a.id] ?? a.is_correct) == null).length}
            </div>
          )}
          <button className="ghost dark" onClick={onClose}>Закрыть плитку</button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
