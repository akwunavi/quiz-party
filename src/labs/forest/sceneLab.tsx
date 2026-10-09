// Лаборатория: утверждённая сцена вопроса с макетным содержимым (в игре — forest/question/ForestQuestion)
import { useMemo } from 'react'
import { Scene, type SceneApi, type Mode } from '../../forest/Scene'
import { layoutFor, type QInput } from '../../forest/question/layout'
import { IMG, MC, IMG1, PORT, TWO, THREE, FOUR, LONG, LONG2, SIX, CORRECT, ROUND_NAME, QNO, type StateId } from '../../forest/content'

const I = (...k: (keyof typeof IMG)[]) => k.map(x => IMG[x])
const INPUTS: Record<StateId, QInput> = {
  mc: { text: MC.text, options: MC.options, images: [] },
  img1opt: { text: IMG1.text, options: IMG1.options, images: I('palace') },
  img1open: { text: IMG1.text, options: [], images: I('palace') },
  port: { text: PORT.text, options: [], images: I('collins') },
  two: { text: TWO.text, options: TWO.options, images: I('falcon', 'hubble') },
  three: { text: THREE.text, options: [], images: I('coffee', 'hubble', 'dahlia') },
  four: { text: FOUR.text, options: [], images: I('collins', 'falcon', 'hubble', 'palace') },
  long: { text: LONG.text, options: [], images: I('palace') },
  long2: { text: LONG2.text, options: TWO.options, images: I('falcon', 'hubble') },
  six: { text: '', options: [], images: I('falcon', 'collins'), word: SIX },
}
export function SceneLab({ state, mode, answer, onReady }: { state: StateId; mode: Mode; answer: boolean; onReady: (a: SceneApi) => void }) {
  const layout = useMemo(() => layoutFor(INPUTS[state]), [state])
  return <Scene layout={layout} correct={CORRECT[state]} roundName={state === 'six' ? '3 попытки' : ROUND_NAME} qno={QNO} mode={mode} answer={answer} onReady={onReady} />
}
