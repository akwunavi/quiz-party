// ═══ Фоновая музыка на экране ожидания ═══
// Вынесено из HostScreen.tsx (HANDOFF.md §3bu) — чистый рефакторинг по
// образцу JeopardyRound.tsx: импорт мелочи из HostScreen тянул бы весь
// проектор в чужой чанк (React.lazy per-экран, см. CLAUDE.md раздел 5).
//
// Лобби висит дольше любого другого экрана, и до сих пор оно молчало.
// По умолчанию берём ту же фоновую музыку, что задана для пакета
// (`settings.bg_music`); если для лобби задана своя — `settings.lobby_music`
// перебивает её.
//
// Про автозапуск: браузер не даёт играть звуку, пока по странице не
// кликнули. Поэтому при отказе мы не молчим, а ждём первого клика по
// экрану и стартуем тогда — ведущий всё равно нажимает кнопки.
// Громкость ниже, чем у музыки вопросов: под лобби разговаривают.
import { useEffect } from 'react'
import { createAudio } from '../lib/audioSource'
import { mediaUrl } from '../lib/media'
import type { LoadedPack } from '../lib/packLoader'

export function LobbyMusic({ pack }: { pack: LoadedPack | null }) {
  useEffect(() => {
    const src = pack?.settings?.lobby_music ?? pack?.settings?.bg_music
    if (!src) return
    const a = createAudio()
    a.src = mediaUrl(src)
    a.loop = true
    a.volume = 0.45
    // Флаг отмены: play() асинхронный, pause() до его реального старта не
    // делает ничего (CLAUDE.md) — без этого флага смена трека/размонтирование
    // ПОКА play() ещё «в полёте» позволяли звуку всё равно заиграть поверх
    // уже другого экрана/трека (F4, HANDOFF.md §3bu, тот же класс гонки, что
    // и в «Угадай мелодию»).
    let cancelled = false
    let unlocked = false
    const start = () => {
      if (unlocked || cancelled) return
      unlocked = true
      a.play().then(() => {
        if (cancelled) { try { a.pause(); a.src = '' } catch { /* уже мёртв */ } }
      }).catch(() => {})
      window.removeEventListener('pointerdown', start)
      window.removeEventListener('keydown', start)
    }
    a.play().then(() => {
      unlocked = true
      if (cancelled) { try { a.pause(); a.src = '' } catch { /* уже мёртв */ } }
    }).catch(() => {
      // автозапуск заблокирован — ждём первого касания
      window.addEventListener('pointerdown', start)
      window.addEventListener('keydown', start)
    })
    return () => {
      cancelled = true
      window.removeEventListener('pointerdown', start)
      window.removeEventListener('keydown', start)
      // a.src = '' гарантированно останавливает и уже идущую загрузку файла,
      // а не только звук — иначе фоновая музыка могла продолжить грузиться
      // (и потом заиграть) уже после размонтирования/смены трека.
      try { a.pause(); a.src = '' } catch { /* уже остановлено */ }
    }
  }, [pack?.settings?.lobby_music, pack?.settings?.bg_music])
  return null
}
