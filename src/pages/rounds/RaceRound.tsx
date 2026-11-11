// ═══ «СКАЧКИ БУЛЬДОГОВ»: проектор ═══
// Гонка считается моделью Race V3 (lib/bulldog), собаки — из единой библиотеки (public/bulldog). Здесь — только данные раунда:
// ставки, часы от startedAt, начисление очков, навигация. Сцена (выбор → переход → отсчёт → гонка → финиш → пьедестал) — components/BulldogStage.
// Честность прежняя: сид рождается в момент «Старт» (raceActions.startRace) и пишется в game_state вместе с D; из (seed, D) детерминированно
// считается вся гонка, поэтому любой экран и перезагрузка страницы видят одну и ту же гонку.
import { useEffect, useMemo, useRef, useState } from 'react'
import { room } from '../../lib/transport'
import type { AnswerUpsert } from '../../lib/transport'
import { openRaceBets, startRace, finishRace, beginRace, reportPrep } from '../../lib/raceActions'
import { AfterRoundNav } from '../../components/AfterRoundNav'
import { BulldogStage } from '../../components/BulldogStage'
import type { StageInput, StageStats } from '../../lib/bulldog/stage'
import { mediaUrl } from '../../lib/media'
import { useAnswers } from '../../hooks/useAnswers'
import { useTeams } from '../../hooks/useTeams'
import type { LoadedPack, LoadedRound } from '../../lib/packLoader'
import type { GameState, RaceSettings } from '../../types/quiz'
import { createRaceMusic, type RaceMusic, type MusicStatus } from '../../lib/bulldog/raceMusic'
import type { PreviewCtx } from '../../lib/previewState'
import { serverNow } from '../../lib/serverClock'
import { courseSeconds, dogNames, T } from '../../lib/bulldog/config'
import { raceClock, gradeAt } from '../../lib/bulldog/phases'
import { countsByDog, gradingRows, raceOf, raceRef, scoreRows } from '../../lib/bulldog/bets'
import { raceFor } from '../../lib/bulldog/engine'
import type { RaceV3 } from '../../lib/bulldog/v3types'

const PREP_TEXT: Record<'loading' | 'audio_blocked' | 'error' | 'ready', (m?: string) => { title: string; sub?: string }> = {
  loading: m => ({ title: 'ГОТОВИМ ГОНКУ…', sub: m }), ready: () => ({ title: 'ВСЁ ГОТОВО', sub: 'запускаем' }),
  audio_blocked: () => ({ title: 'ЗВУК ЗАБЛОКИРОВАН', sub: 'Включите звук или начните без музыки' }), error: m => ({ title: 'НЕ УДАЛОСЬ ПОДГОТОВИТЬ', sub: m }),
}
export function RaceBoard({ pack, round, gameState, preview, onStats, arena }: {
  pack: LoadedPack; round: LoadedRound; gameState: GameState
  /** Предпросмотр в редакторе: музыка/начисление баллов/автооткрытие ставок выключены; часы остаются (сцена живая). */
  preview?: PreviewCtx
  /** Диагностика сцены (фаза, память, время кадра) — только для стенда e2e/bulldog */
  onStats?: (s: StageStats) => void
  /** Зимняя арена на гонке. Нет — на проекторе включена по умолчанию (слои из /arena/), в предпросмотре редактора выключена. */
  arena?: StageInput['arena']
}) {
  const s = round.settings as RaceSettings
  const names = dogNames(s)
  const race = raceOf(gameState.melody, gameState.round_number, gameState.game_id)
  const D = race.D ?? courseSeconds(s)
  const liveTeams = useTeams(preview ? null : gameState.game_id)
  const liveAnswers = useAnswers(preview ? null : gameState.game_id, gameState.round_number)
  const teams = preview ? preview.teams : liveTeams
  const answers = preview ? preview.answers : liveAnswers
  const bets = answers.filter(a => a.question_ref === raceRef(gameState.round_number))
  const counts = useMemo(() => countsByDog(bets), [bets])
  const graded = useRef(false)
  const [retryTick, setRetryTick] = useState(0)
  // Флаг «хотя бы один опрос useAnswers реально вернулся». useAnswers стартует
  // с пустым массивом ДО первого сетевого ответа (hooks/useAnswers.ts) — если
  // страница проектора перезагружается, когда гонка уже логически завершилась
  // (allFinished=true), а stage в БД всё ещё 'running' (сеть оборвала запись
  // done — тот самый случай, который чинит retry-цикл ниже), эффект начисления
  // мог сработать на ПЕРВОМ рендере с bets=[] и записать stage:'done' без
  // единого upsert очков — команды навсегда получали 0 (HANDOFF §3bv). Ссылка
  // на исходный (ещё не заполненный) массив фиксируется один раз при монтаже;
  // как только useAnswers подставит НОВЫЙ массив (первый успешный опрос, даже
  // если ответов реально 0), считаем данные загруженными.
  const initialAnswersRef = useRef(answers)
  const answersLoadedRef = useRef(false)
  // «ответы загружены» и «вкладка видна» — СОСТОЯНИЕ (а не только ref/чтение document.hidden): эффект начисления зависит от них, поэтому после перезагрузки
  // проектора после финиша или возврата скрытой вкладки он перезапускается сам (раньше менялся только ref — эффект больше не запускался, очки терялись, HANDOFF §3em).
  const [answersLoaded, setAnswersLoaded] = useState(false)
  const [visible, setVisible] = useState(() => !document.hidden)
  useEffect(() => {
    if (answers !== initialAnswersRef.current) { answersLoadedRef.current = true; setAnswersLoaded(true) }
  }, [answers])
  useEffect(() => { const f = () => setVisible(!document.hidden); document.addEventListener('visibilitychange', f); return () => document.removeEventListener('visibilitychange', f) }, [])

  // гонка из (seed, D): детерминированна, поэтому не хранится в БД
  const raceObj: RaceV3 | null = useMemo(() => {
    if (race.seed == null) return null
    try { return raceFor(race.seed, D) } catch { return null }
  }, [race.seed, D])
  const raceErr = race.seed != null && raceObj == null
  const running = race.stage === 'running' && !!raceObj
  const preparing = race.stage === 'preparing' && !!raceObj
  const done = race.stage === 'done'
  const startedMs = race.startedAt ? Date.parse(race.startedAt) : (done ? serverNow() - 1e7 : null)

  // тикер ТОЛЬКО для данных раунда (начисление, кнопка выхода); кадры сцены рисует свой rAF
  const [now, setNow] = useState(serverNow())
  useEffect(() => { const t = setInterval(() => setNow(serverNow()), 500); return () => clearInterval(t) }, [])
  const elapsed = startedMs != null ? (now - startedMs) / 1000 : 0
  const clock = raceObj && startedMs != null ? raceClock(elapsed, raceObj.end) : null
  const allFinished = !!raceObj && startedMs != null && elapsed >= gradeAt(raceObj.end)

  // ── подготовка проектора и музыка (этап `preparing`, без таймеров «через N секунд»): гонка стартует, только когда готовы ресурсы И музыка, либо ведущий решил сам
  const musicSrc = (round.settings as { race_music?: string }).race_music ?? pack.settings?.bg_music
  const projector = !preview && !document.hidden
  const [stageStats, setStageStats] = useState<StageStats | null>(null)
  const [prepTick, setPrepTick] = useState(0)
  const [musicStatus, setMusicStatus] = useState<MusicStatus>('none'); const [musicWhy, setMusicWhy] = useState('')
  const musicRef = useRef<RaceMusic | null>(null)
  const wantMusic = projector && !!musicSrc && !race.noMusic && (preparing || running) && race.seed != null
  useEffect(() => {
    if (!wantMusic || !musicSrc) { musicRef.current = null; setMusicStatus('none'); return }
    const m = createRaceMusic(true, { now: serverNow, fetchBuffer: async () => { const r = await fetch(mediaUrl(musicSrc)); if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.arrayBuffer() } })
    musicRef.current = m; const sync = () => { setMusicStatus(m.status()); setMusicWhy(m.reason()) }; sync(); const off = m.onChange(sync)
    const gesture = () => { void m.resume() }; document.addEventListener('pointerdown', gesture, { once: true })       // жест на проекторе сам снимает блокировку звука
    return () => { off(); document.removeEventListener('pointerdown', gesture); m.destroy(); if (musicRef.current === m) musicRef.current = null }
  }, [wantMusic, musicSrc, race.seed, prepTick])
  const musicOk = !wantMusic || musicStatus === 'ready'
  const prepStatus: 'loading' | 'audio_blocked' | 'error' | 'ready' = wantMusic && musicStatus === 'error' ? 'error' : wantMusic && musicStatus === 'blocked' ? 'audio_blocked' : (stageStats?.raceReady && musicOk) ? 'ready' : 'loading'
  const prepMsg = prepStatus === 'error' ? musicWhy : prepStatus === 'audio_blocked' ? 'звук заблокирован браузером' : prepStatus === 'loading' ? (stageStats?.raceReady ? 'загружается музыка' : 'загружаются собаки и трасса') : undefined
  useEffect(() => {                                                                        // статус для пульта (не критично)
    if (!preparing || !projector || race.seed == null) return
    void reportPrep(gameState, race.seed, prepStatus, prepMsg).catch(() => {})
  }, [preparing, projector, race.seed, prepStatus, prepMsg])
  const begun = useRef<number | null>(null)
  useEffect(() => {                                                                        // всё готово → ОДИН серверный startedAt (CAS); повтор/второй экран ничего не перепишут
    if (!preparing || !projector || prepStatus !== 'ready' || race.seed == null || begun.current === race.seed) return
    begun.current = race.seed
    void beginRace(gameState, race.seed).catch(() => { begun.current = null; setTimeout(() => setPrepTick(x => x + 1), 1500) })
  }, [preparing, projector, prepStatus, race.seed, prepTick])                              // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {                                                                        // музыка стартует в момент raceT=0; опоздавшая (перезагрузка, поздняя загрузка) — не играет
    const m = musicRef.current; if (!running || !m || musicStatus !== 'ready' || startedMs == null || race.noMusic) return
    m.playAt(startedMs + (T.transition + T.countdown) * 1000)
    return () => m.stop()
  }, [running, musicStatus, startedMs, race.noMusic])                                    

  // финиш: начисляем баллы (5/4/3/2/1 по месту выбранной собаки) — один раз, ПАЧКОЙ одним upsert (CLAUDE.md), с повторами при сбое сети
  // и теми же защитами, что описаны выше (answersLoadedRef, cancelled). Начисление — по моменту финиша гонки, не по показу пьедестала.
  useEffect(() => {
    if (preview || !running || !allFinished || graded.current || !visible
      || !answersLoadedRef.current || !raceObj) return
    graded.current = true
    // Опоздавшая запись из СТАРОГО цикла ретраев не должна затирать состояние
    // раунда, в который ведущий уже переключился с пульта, пока мы ждали
    // между попытками (jsonb `melody` заменяется целиком при записи — HANDOFF
    // §3bv/CLAUDE.md). cancelled выставляется в cleanup эффекта.
    let cancelled = false
    const seed = race.seed as number
    const places = raceObj.places
    const ref = raceRef(gameState.round_number)
    void (async () => {
      for (let attempt = 0; attempt < 3; attempt++) {
        if (cancelled) return
        try {
          // Ставки читаем ЗАНОВО из базы перед начислением, а не берём снимок экрана: выбор закрыт на сервере с момента «Старт»
          // (миграция 0017), так что это окончательные данные. Пишем только строки, где очки реально отличаются, — повторный
          // вызов (перезагрузка проектора, второй экран, ретрай после сбоя) ничего не меняет и не начисляет второй раз.
          const fresh = (await room.listAnswers(gameState.game_id, gameState.round_number)).filter(a => a.question_ref === ref)
          const rows: AnswerUpsert[] = gradingRows(fresh, places).map(b => ({
            team_id: b.team_id, game_id: b.game_id, question_ref: b.question_ref, round_number: b.round_number,
            answer_text: b.answer_text, stake: b.stake, is_correct: true, updated_at: new Date().toISOString() }))
          if (cancelled) return
          if (rows.length > 0) await room.upsertAnswers(rows)
          if (cancelled) return
          await finishRace(gameState, seed)
          return
        } catch {
          if (attempt === 2) {
            // 3 попытки подряд не помогли (сеть легла надолго) — сбрасываем
            // флаг и планируем ещё один заход через 2 сек, обновив зависимость
            // эффекта: без этого `graded.current = false` никого не разбудит,
            // deps (`running`/`allFinished`) сами по себе больше не изменятся.
            graded.current = false
            if (!cancelled) setTimeout(() => setRetryTick(x => x + 1), 2000)
            return
          }
          await new Promise(r => setTimeout(r, 500 * (attempt + 1)))
        }
      }
    })()
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preview, running, allFinished, retryTick, answersLoaded, visible])

  // ставки открываются сразу с появлением экрана — лишний клик убран
  useEffect(() => {
    if (preview || race.stage || document.hidden) return
    void openBets()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preview, race.stage])

  // Сама запись — в lib/raceActions.ts, общая с кнопкой «Начать скачки» в админке (8.62).
  const start = () => startRace(gameState, courseSeconds(s))
  const openBets = () => openRaceBets(gameState)
  const betting = !race.stage || race.stage === 'betting'
  const scores = useMemo(() => raceObj && (done || allFinished) ? scoreRows(teams, bets, raceObj.places) : [], [raceObj, done, allFinished, teams, bets])

  return (
    <div className="host-screen grid-bg race-screen">
      <div className="host-topbar"><span className="qnum">{round.title_lines.join(' ') || 'СКАЧКИ БУЛЬДОГОВ'}</span></div>
      <BulldogStage onStats={st => { setStageStats(st); onStats?.(st) }} input={{
        race: race.seed != null && raceObj && (preparing || (startedMs != null && (running || done))) ? { seed: race.seed, D, startedMs: preparing ? null : startedMs } : null,
        counts, names, scores, arena: arena ?? (preview ? undefined : { slotBase: `${import.meta.env.BASE_URL}arena/` }),
        prep: preparing ? PREP_TEXT[prepStatus](prepMsg) : null,
      }} />
      {!preview && preparing && race.seed != null && (prepStatus === 'audio_blocked' || prepStatus === 'error') && (
        <div className="host-actions">
          {prepStatus === 'audio_blocked' && <button onClick={() => void musicRef.current?.resume()}>🔊 Включить звук</button>}
          {prepStatus === 'error' && <button onClick={() => setPrepTick(x => x + 1)}>↻ Повторить подготовку</button>}
          <button onClick={() => void beginRace(gameState, race.seed as number, { noMusic: true })}>▶ Играть без музыки</button>
        </div>)}
      {raceErr && <div className="mono-tag" style={{ color: 'var(--danger)' }}>Не удалось построить забег для этого сида — нажмите «Назад» и запустите заново</div>}
      {betting && (
        <div className="race-betbar">
          {/* никто не видит, КТО на кого поставил — только счётчики по собакам и готовность команд */}
          <div className="mono-tag" style={{ color: bets.length === teams.length && teams.length > 0 ? 'var(--answer)' : undefined }}>
            ВЫБОР СДЕЛАЛИ: {bets.length} / {teams.length}
          </div>
          {/* Реальный запуск забега — не рендерится в предпросмотре. */}
          {!preview && <div className="host-actions">
            <button disabled={bets.length === 0} onClick={() => void start()}>
              🏁 Старт! (выбор закрывается)</button>
          </div>}
        </div>
      )}
      {/* кнопка выхода — только когда уже виден пьедестал (раньше «Дальше» мог случайно прервать финиш) */}
      {!preview && done && (clock?.phase === 'podium' || !clock) && <div className="host-actions"><AfterRoundNav pack={pack} gameState={gameState} /></div>}
    </div>
  )
}
