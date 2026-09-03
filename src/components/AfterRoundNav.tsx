// ═══ Кнопка «дальше» после интерактивного раунда ═══
// Общая для «Своей игры», скачек и (после 8.62) их admin-панелей — раньше
// каждая механика прыгала в следующий раунд НАПРЯМУЮ, и настроенные для
// раунда табло/перерыв молча пропускались. Маршрут считает один и тот же
// модуль (lib/flow.ts), так что ни один экран не может с ним разойтись.
// Лежит в components/, а не в HostScreen.tsx — импорт оттуда утащил бы весь
// проектор в чужой чанк (см. CLAUDE.md, раздел про разрез бандла).
import { afterRoundStep } from '../lib/flow'
import { showScoreboard, startBreak, finishGame, gotoRound, showSlide, slideBeforeFinale, slideForRound } from '../lib/gameActions'
import type { LoadedPack } from '../lib/packLoader'
import type { GameState } from '../types/quiz'

export function AfterRoundNav({ pack, gameState }: {
  pack: LoadedPack
  gameState: GameState
}) {
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
