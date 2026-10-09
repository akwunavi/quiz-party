// ═══ Лобби темы «Волшебный лес» (проектор) ═══
// Утверждённая композиция «Полуночный праздник». Данные настоящие: команды из лобби (имя, цвет, «в сети»), ссылка для QR,
// составы рандомайзера из game_sessions. Новая команда прибывает анимацией, отключившаяся притухает, составы показываются как
// в лаборатории; после обновления страницы всё сразу стоит на своих местах (без повтора прибытий и без «спойлера» заново).
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { LobbyScene, type LobbyTeam } from './LobbyScene'
import { RzLayer, rzBuild, useRzTicker, type RzMode } from './Rz'
import { arriveFx, dropFx, reviveFx, introFx, lockedFx, litTo, leaveFx, qrLitFx, qrDimFx } from './fx'
import { layoutB, litFor } from './geom'
import { ForestQr } from '../ForestQr'
import { hueOf } from '../util'

export type LobbyTeamIn = { id: string; name: string; color: string; alive: boolean }
const LOBBY_SEL = '.b-team, .b-wait'

export function ForestLobby({ teams: tin, playerUrl, paper, groups, groupsOpen, onGroupsOpen, onGroupsClose, leaving, onLeft }: {
  teams: LobbyTeamIn[]
  playerUrl: string
  paper: boolean
  groups: string[][]
  groupsOpen: boolean
  onGroupsOpen: () => void
  onGroupsClose: () => void
  /** экран лобби уходит (началась игра): сыграть «уход к правилам» */
  leaving?: boolean
  onLeft?: () => void
}) {
  const root = useRef<HTMLDivElement>(null)
  const teams: LobbyTeam[] = useMemo(() => tin.map(t => ({ id: t.id, name: t.name, hue: hueOf(t.color), alive: t.alive })), [tin])
  const layout = useMemo(() => layoutB(teams.length), [teams.length])
  const q = useMemo(() => gsap.utils.selector(root), [])
  // кто уже «стоит» на сцене; остальные прибывают анимацией и до неё скрыты
  const known = useRef<Set<string>>(new Set(teams.map(t => t.id)))
  const [, bump] = useState(0)
  const fresh = new Set(teams.filter(t => !known.current.has(t.id)).map(t => t.id))
  const aliveRef = useRef<Map<string, boolean>>(new Map(teams.map(t => [t.id, t.alive])))
  const busy = useRef<Set<string>>(new Set())
  const litN0 = useRef(litFor(teams.length))
  const groupsKey = groups.map(g => g.join(',')).join('|')
  const shown = groups.length > 0 && groupsOpen
  const [rzMode, setRzMode] = useState<RzMode | undefined>(groups.length ? (groupsOpen ? 'done' : 'back') : undefined)
  const rzTl = useRef<gsap.core.Timeline | null>(null)
  const pills = useRef<HTMLElement[]>([])
  useRzTicker(() => rzTl.current?.time() ?? 0, pills, groups.length ? groups : null, rzMode)

  // вход на экран: ночь проявляется, ворота зажигаются, логотип
  useLayoutEffect(() => {
    const tl = gsap.timeline()
    introFx(tl, q, { settled: !groups.length, wait: teams.length === 0 && !groups.length })
    teams.filter(t => !t.alive).forEach(t => { const d = gsap.timeline(); dropFx(d, q, t.id, 0); d.progress(1) })
    return () => { tl.kill() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // прибытия, отключения, возвращения
  useLayoutEffect(() => {
    const newcomers = teams.filter(t => !known.current.has(t.id) && !busy.current.has(t.id))
    newcomers.forEach((t, k) => {
      busy.current.add(t.id)
      const tl = gsap.timeline({ onComplete: () => { known.current.add(t.id); busy.current.delete(t.id); bump(x => x + 1) } })
      arriveFx(tl, q, t.id, teams.length, k * 0.35)
      if (!t.alive) dropFx(tl, q, t.id, 2.6 + k * 0.35)
    })
    teams.forEach(t => {
      const was = aliveRef.current.get(t.id)
      if (was !== undefined && was !== t.alive && known.current.has(t.id)) {
        const tl = gsap.timeline()
        if (t.alive) reviveFx(tl, q, t.id, 0); else dropFx(tl, q, t.id, 0)
      }
      aliveRef.current.set(t.id, t.alive)
    })
    if (!newcomers.length && teams.length !== known.current.size) litTo(gsap.timeline(), q, teams.length, 0)
    // команды, которых больше нет, забываем — вернувшись, они прибудут снова
    const ids = new Set(teams.map(t => t.id))
    known.current.forEach(id => { if (!ids.has(id)) known.current.delete(id) })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teams.map(t => `${t.id}:${t.alive}`).join('|')])

  // составы: новый набор — показываем «с нуля»; закрыли — вуаль уходит, лобби возвращается; открыли снова — итог без повтора
  const prevShown = useRef(shown), prevKey = useRef(groupsKey), first = useRef(true)
  useLayoutEffect(() => {
    if (!groups.length) { setRzMode(undefined); prevShown.current = false; prevKey.current = groupsKey; first.current = false; return }
    const keyChanged = prevKey.current !== groupsKey, was = prevShown.current
    prevKey.current = groupsKey; prevShown.current = shown
    const play = (mode: RzMode) => {
      rzTl.current?.kill()
      const tl = gsap.timeline()
      rzBuild(tl, q, groups, mode, LOBBY_SEL, at => { tl.fromTo(q('.b-moon'), { filter: 'brightness(1)' }, { filter: 'brightness(1.16)', duration: 0.3, yoyo: true, repeat: 1 }, at) })
      rzTl.current = tl; setRzMode(mode)
      const lit = gsap.timeline(); if (mode === 'back') qrLitFx(lit, q, 0.2); else qrLitFx(lit, q, 0)
    }
    // обновили страницу при уже опубликованных составах — сразу итог, без повтора показа
    if (first.current) { first.current = false; play(shown ? 'done' : 'back'); return }
    if (shown && (keyChanged || !was)) play(keyChanged ? 'run' : 'done')
    else if (!shown && was) play('back')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupsKey, shown])
  useEffect(() => {
    if (groups.length) qrLitFx(gsap.timeline(), q, 0); else qrDimFx(gsap.timeline(), q, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups.length])
  useEffect(() => {
    if (!shown) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onGroupsClose() }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [shown, onGroupsClose])

  // уход к правилам
  useLayoutEffect(() => {
    if (!leaving) return
    const targets = layout.slots.map((s, i) => ({ id: teams[i].id, x: s.x, y: s.ay }))
    const tl = gsap.timeline({ onComplete: () => onLeft?.() })
    leaveFx(tl, q, targets, 0)
    return () => { tl.kill() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leaving])
  void lockedFx

  return (
    <LobbyScene teams={teams} layout={layout} fresh={fresh} qr={paper ? null : <ForestQr value={playerUrl} />} qrLit={groups.length > 0}
      litN={litN0.current} wait={teams.length === 0 && !paper && !groups.length} rootRef={root}>
      {groups.length > 0 && <>
        <div className="rz-veil" onClick={shown ? onGroupsClose : undefined} style={{ pointerEvents: shown ? 'auto' : 'none' }} />
        <RzLayer groups={groups} pills={pills} />
      </>}
      {groups.length > 0 && !shown && <button type="button" className="lb3-grp-btn" onClick={onGroupsOpen}>СОСТАВЫ КОМАНД</button>}
    </LobbyScene>
  )
}
