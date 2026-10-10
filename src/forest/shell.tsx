// ═══ Оболочка темы «Волшебный лес» на проекторе ═══
// Один холст леса на весь вечер (а не новый на каждый экран): экраны сообщают оболочке, где у них содержимое (дымка
// под ним, светлячки облетают), настроение (обычно / тревога / время вышло) и «импульс» — волну света по корням.
// Всё внутри кадра 1920×1080, который масштабируется под окно (как в лаборатории), поэтому вёрстка экранов — в «пикселях мокапа».
import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react'
import { ForestBackdrop, type Rect, type Mood } from './stage1/env'
import { ShellCtx, useInShell } from './shellCtx'
import './styles'

export type SceneState = { rects: Rect[]; mood: Mood; pulse: number; hidden: boolean }
const DEFAULT: SceneState = { rects: [], mood: 'calm', pulse: 0, hidden: false }
let scene: SceneState = DEFAULT
const subs = new Set<() => void>()
const emit = () => subs.forEach(f => f())
export const forestScene = {
  get: () => scene,
  subscribe: (f: () => void) => { subs.add(f); return () => { subs.delete(f) } },
  set(patch: Partial<SceneState>) { scene = { ...scene, ...patch }; emit() },
  reset() { scene = { ...DEFAULT, pulse: scene.pulse }; emit() },
  pulse() { scene = { ...scene, pulse: scene.pulse + 1 }; emit() },
}
export { ShellCtx, useInShell }

/** Экран сообщает оболочке, где его содержимое; при размонтировании возвращается к умолчанию. */
export function useForestScene(patch: Partial<SceneState>, key: string) {
  const inShell = useInShell()
  useLayoutEffect(() => {
    if (!inShell) return
    forestScene.set(patch)
    return () => forestScene.reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inShell, key])
}

function ShellBackdrop() {
  const s = useSyncExternalStore(forestScene.subscribe, forestScene.get)
  if (s.hidden) return null
  return <ForestBackdrop rects={s.rects} mood={s.mood} pulse={s.pulse} />
}

/** Кадр 1920×1080, вписанный в окно по центру. */
export function ForestFrame({ children }: { children: ReactNode }) {
  const box = useRef<HTMLDivElement>(null)
  const [k, setK] = useState(() => Math.min(innerWidth / 1920, innerHeight / 1080))
  useEffect(() => {
    const on = () => { const b = box.current; if (b) setK(Math.min(b.clientWidth / 1920, b.clientHeight / 1080)) }
    on(); addEventListener('resize', on)
    return () => removeEventListener('resize', on)
  }, [])
  return (
    <div ref={box} className="fo-box">
      <div className="fo-frame" style={{ transform: `translate(-50%, -50%) scale(${k})` }}>
        <ShellCtx.Provider value={true}>
          <ShellBackdrop />
          {children}
        </ShellCtx.Provider>
      </div>
    </div>
  )
}
