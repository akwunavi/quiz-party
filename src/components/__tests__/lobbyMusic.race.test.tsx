// ═══ LobbyMusic: play() асинхронный, cancelled-флаг (F4, HANDOFF.md §3bu) ═══
// Полноценный regression-тест (размонтировать/сменить трек ДО того, как
// play() резолвится, убедиться, что звук не стартует) требует того же
// render-стенда, что и melody.race.test.tsx (см. комментарий там) — не
// построен в этой сессии. Сам компонент теперь содержит `cancelled` и
// `a.src = ''` в cleanup — см. src/components/LobbyMusic.tsx.
import { describe, it } from 'vitest'

describe('LobbyMusic: гонки, требующие render-стенда (не построен в этой сессии)', () => {
  it.todo('F4: смена трека/размонтирование ДО резолва play() не оставляет старый трек играющим и не продолжает его грузить')
})
