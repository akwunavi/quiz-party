import type { GameState } from '../types/quiz'
import { voiceChip } from '../lib/voiceStatus'
import { updateMelodyBag } from '../lib/sessionBag'
import { runAction } from '../lib/actionStatus'

/** Строка пульта «Озвучка: загружено N из M» (10.75). Статус пишет проектор
 *  в `melody.voice`; озвучек у пака нет (или проектор ещё не открыт) — строки нет.
 *  «Повторить» растит `voice.retry` — проектор по нему ставит упавшие в очередь. */
export function VoiceStatusLine({ gameState }: { gameState: GameState }) {
  const chip = voiceChip(gameState.melody?.voice)
  if (!chip) return null
  const retry = () => void runAction('повторить загрузку озвучек', async () => {
    await updateMelodyBag(gameState, cur => cur.voice
      ? { ...cur, voice: { ...cur.voice, retry: (cur.voice.retry ?? 0) + 1 } } : null)
  }).catch(() => {})
  return (
    <div className={`adm-audio-chip ${chip.cls}`} role="status" data-testid="voice-status">
      <span>{chip.text}</span>
      {chip.retry && <button className="adm-btn" style={{ marginLeft: 8 }} onClick={retry}>повторить</button>}
      {chip.stallText && <div className="adm-voice-stall">{chip.stallText}</div>}
    </div>
  )
}
