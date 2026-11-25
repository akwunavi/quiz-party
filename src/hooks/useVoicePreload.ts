// ═══ ПРОЕКТОР: скачать ВСЕ озвучки пака заранее и доложить пульту (10.75) ═══
// Хук стоит в HostScreen ДО ранних `return` (хук после раннего return —
// React #310, ловит только линтер).
//
//  1) Список озвучек пака в порядке «что нужнее раньше» отдаётся общему
//     загрузчику (`voiceLoader`); пересылается на смене раунда/вопроса —
//     порядок ожидающих меняется, скачанное не качается повторно.
//  2) Итог («загружено N из M», остановки звука) пишется в мешок
//     `melody.voice` не чаще раза в 2 с и только при изменении. Пишет
//     только проектор, пульт читает. Запись — через `updateMelodyBag`
//     (защищённая, перечитывает свежее состояние и чужие поля не трогает).
//  3) `melody.voice.retry` растит пульт («повторить») — по изменению
//     числа упавшие ставятся в очередь заново.

import { useEffect, useMemo, useRef } from 'react'
import type { GameState } from '../types/quiz'
import type { LoadedPack } from '../lib/packLoader'
import { collectVoicePaths } from '../lib/voicePaths'
import { voiceLoader } from '../lib/voicePreload'
import { stallStats } from '../lib/audioStall'
import { updateMelody } from '../lib/melodyActions'
import { serverIso, serverNow } from '../lib/serverClock'
import { mayWriteVoice, voiceSig, voiceStateOf, type VoiceBag } from '../lib/voiceStatus'

const MIN_GAP_MS = 2000
const FIRST_DELAY_MS = 1500

function currentBag(): Omit<VoiceBag, 'by' | 'at' | 'retry'> {
  const s = voiceLoader.status()
  const st = stallStats.get()
  const out: Omit<VoiceBag, 'by' | 'at' | 'retry'> = {
    state: voiceStateOf(s.done, s.failed, s.total), done: s.done, failed: s.failed, total: s.total,
  }
  if (st.count > 0) { out.stalls = st.count; out.maxStallSec = Math.round(st.maxMs / 100) / 10 }
  return out
}

export function useVoicePreload(pack: LoadedPack | null, gameState: GameState | null) {
  const packId = gameState?.pack_id ?? null
  const roundNumber = gameState?.round_number ?? 0
  const questionIndex = gameState?.question_index ?? 0

  // ── 1) очередь ──
  const paths = useMemo(
    () => (pack && packId ? collectVoicePaths(pack, roundNumber, questionIndex) : []),
    [pack, packId, roundNumber, questionIndex],
  )
  useEffect(() => { voiceLoader.setList(paths) }, [paths])

  // вкладка снова видна — подтолкнуть очередь (таймеры свёрнутой вкладки душит браузер)
  useEffect(() => {
    const onVis = () => { if (!document.hidden) voiceLoader.kick() }
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  // ── 2) статус → общее состояние ──
  const myId = useRef(Math.random().toString(36).slice(2, 8))
  const gsRef = useRef(gameState)
  gsRef.current = gameState
  const lastWrite = useRef(0)
  const scheduleRef = useRef<(() => void) | null>(null)
  const timer = useRef<number | null>(null)
  const writing = useRef(false)

  useEffect(() => {
    const flush = () => {
      timer.current = null
      const gs = gsRef.current
      if (!gs || writing.current) return
      const mine = currentBag()
      const sig = voiceSig(mine)
      // уже лежит ровно то же, что у нас (и записали мы) — писать нечего;
      // мешок могли стереть («новая игра») — тогда запишем заново
      const stored = gs.melody?.voice
      if (mine.total === 0 ? !stored : (stored?.by === myId.current && voiceSig(stored) === sig)) return
      writing.current = true
      lastWrite.current = Date.now()
      void updateMelody(gs, cur => {
        const prev = cur.voice
        if (!mayWriteVoice(prev, myId.current, serverNow())) return null
        if (mine.total === 0) {                          // озвучек нет — убрать чужую устаревшую строку
          if (!prev) return null
          const rest = { ...cur }
          delete rest.voice
          return rest
        }
        if (prev && prev.by === myId.current && voiceSig(prev) === sig) return null
        return { ...cur, voice: { ...mine, retry: prev?.retry, by: myId.current, at: serverIso() } }
      }).catch(() => { /* сеть — повторим при следующем изменении */ })
        .finally(() => { writing.current = false })
    }
    const schedule = () => {
      if (timer.current != null) return
      const wait = Math.max(FIRST_DELAY_MS, lastWrite.current + MIN_GAP_MS - Date.now())
      timer.current = window.setTimeout(flush, wait)
    }
    scheduleRef.current = schedule
    const off1 = voiceLoader.subscribe(schedule)
    const off2 = stallStats.subscribe(schedule)
    schedule()
    return () => {
      off1(); off2(); scheduleRef.current = null
      if (timer.current != null) { clearTimeout(timer.current); timer.current = null }
    }
  }, [])

  // мешок стёрли/переписали (новая игра, чужая вкладка) — сверимся заново
  const storedKey = `${gameState?.melody?.voice?.by ?? ''}|${voiceSig(gameState?.melody?.voice)}`
  useEffect(() => { scheduleRef.current?.() }, [storedKey])

  // новая игра в той же вкладке — счёт остановок звука начинается заново
  const gameId = gameState?.game_id
  useEffect(() => { stallStats.reset() }, [gameId])

  // ── 3) «повторить» с пульта ──
  const retryNow = gameState?.melody?.voice?.retry
  const seenRetry = useRef<number | undefined>(retryNow)
  useEffect(() => {
    if (retryNow === seenRetry.current) return
    seenRetry.current = retryNow
    if (retryNow != null) voiceLoader.retryFailed()
  }, [retryNow])
}
