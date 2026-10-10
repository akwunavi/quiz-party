// ═══ Лаборатория: лобби «Полуночный праздник» (утверждено) ═══
// Те же сцена, анимации и рандомайзер, что в игре (src/forest/lobby), но на тестовых данных вечера и в одном перематываемом
// таймлайне. Здесь нет ни одной строки самой сцены — только подбор «что показать в состоянии».
import { useRef } from 'react'
import { useEntrance, type S1Props, type S1Api } from '../../forest/stage1/common'
import { LobbyScene, type LobbyTeam } from '../../forest/lobby/LobbyScene'
import { RzLayer, rzBuild, useRzTicker } from '../../forest/lobby/Rz'
import { arriveFx, dropFx, introFx, lockedFx, leaveFx, qrLitFx } from '../../forest/lobby/fx'
import { HandoffTitle, handoffTl } from '../../forest/lobby/Handoff'
import { layoutB, litFor } from '../../forest/lobby/geom'
import { ForestQr } from '../../forest/ForestQr'
import { PLAYER_URL } from '../magic2/data'
import { LB_STATES, preset, rzGroups } from './lobbyMock'

export { LB_STATES }
export const LB_VARIANTS = [
  { id: 'A', name: 'Полуночный праздник (утверждено)', note: 'Лунные ворота: кольцо на двух резных столбах с луной; от столбов веером идут верёвки с огоньками, логотип подвешен на гирлянде. Новая команда: ворота вспыхивают, из лунного круга по воздуху летит искра, у верёвки раскручивается шнур и раскрывается фонарь-бутон. Чем больше команд, тем больше огней на кольце, верёвках и дорожке. Рандомайзер: имена-фонарики летят каруселью вокруг ворот. Переход к правилам: фонари уходят в ворота, луна поднимается и растворяется, остаётся чистый лес и заголовок.' },
]
const LOBBY_SEL = '.b-team, .b-wait'

export function LobbyLab({ state, onReady }: S1Props) {
  const P = preset(state)
  const teams: LobbyTeam[] = P.teams.map(t => ({ id: t.id, name: t.name, hue: t.hue, alive: t.alive }))
  const layout = layoutB(teams.length)
  const fresh = new Set(teams.slice(P.from).map(t => t.id))
  const groups = P.rz ? rzGroups(P.rz) : []
  const apiRef = useRef<S1Api | null>(null), pills = useRef<HTMLElement[]>([])
  useRzTicker(() => apiRef.current?.tl.time() ?? 0, pills, groups.length ? groups : null, P.rzMode)
  const { root } = useEntrance(a => { apiRef.current = a; onReady(a) }, (tl, q) => {
    const T0 = 2.6
    introFx(tl, q, { settled: !groups.length, wait: teams.length === 0 && !groups.length })
    const arr = teams.filter((_, i) => i >= P.from)
    arr.forEach((t, k) => arriveFx(tl, q, t.id, P.from + k + 1, T0 + k * P.gap))
    if (P.dead) dropFx(tl, q, P.dead, 2.2)
    if (P.qrLit) qrLitFx(tl, q, 1.2)
    if (P.locked) lockedFx(tl, q, 1.2)
    if (P.rules) {
      leaveFx(tl, q, layout.slots.map((s, i) => ({ id: teams[i].id, x: s.x, y: s.ay })), 0)
      handoffTl(tl, q, 4.6)
    }
    if (groups.length && P.rzMode) {
      qrLitFx(tl, q, 0)
      rzBuild(tl, q, groups, P.rzMode, LOBBY_SEL, at => { tl.fromTo(q('.b-moon'), { filter: 'brightness(1)' }, { filter: 'brightness(1.16)', duration: 0.3, yoyo: true, repeat: 1 }, at) })
    }
    tl.to({}, { duration: 1.0 }, P.rules ? 6.6 : Math.max(T0 + arr.length * P.gap + 2.4, 3.0))
  }, null, [state])
  return (
    <LobbyScene teams={teams} layout={layout} fresh={fresh} qr={<ForestQr value={PLAYER_URL} />} qrLit={!!P.qrLit} litN={litFor(P.from)} wait={teams.length === 0} rootRef={root}>
      {P.rules && <HandoffTitle />}
      {groups.length > 0 && <><div className="rz-veil" /><RzLayer groups={groups} pills={pills} /></>}
      {P.rzMode === 'back' && <button type="button" className="lb3-grp-btn">СОСТАВЫ КОМАНД</button>}
    </LobbyScene>
  )
}
