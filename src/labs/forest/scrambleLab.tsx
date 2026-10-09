// ═══ Лаборатория: «Скрэмбл» — утверждённое направление «Семена над поляной» ═══
// Рисунок и куски таймлайна — общие с игрой (forest/stage3/Scramble.tsx); здесь только тестовые фразы вечера
// (forest/stage3/data.ts) и подбор «что показать в состоянии» в одном перематываемом таймлайне.
import { useEntrance, type S1Props } from '../../forest/stage1/common'
import { SCR_SETS, TEAM3 } from '../../forest/stage3/data'
import { timer3 } from '../../forest/stage3/common3'
import { ScrambleScene, scrEnterTl, scrHintTl, scrLayout, scrRevealTl } from '../../forest/stage3/Scramble'

export const SCR_STATES = [
  { id: 'question', name: 'Вопрос: буквы перемешаны (16 букв)' },
  { id: 'short', name: 'Короткий ответ (6 букв)' },
  { id: 'long', name: 'Длинный ответ (22 буквы, 3 слова)' },
  { id: 'hints', name: 'Подсказки: две буквы уже на месте' },
  { id: 'warn', name: 'Тревога: 7 секунд' },
  { id: 'zero', name: 'Время вышло' },
  { id: 'reveal', name: 'Показ ответа: буквы встают на место' },
  { id: 'complete', name: 'Итог: слово собрано, кто угадал' },
]
export const SCR_VARIANTS = [
  { id: 'A', name: 'Семена над поляной', note: 'Утверждено. Буквы — семена одуванчика, парящие над поляной; внизу — грядка с чашечками по одной на букву, слова разделены. Пунктирный контур в пустой чашечке показывает, куда опустится семя. Подсказка опускает янтарное семя в его чашечку. Показ: семена по очереди — в порядке слова, слева направо — планируют на свои места, чашечки распускаются цветами, по грядке бежит золотой побег.' },
]

export function Scramble({ state, nOv, onReady }: S1Props) {
  const S = state === 'short' ? SCR_SETS.short : state === 'long' ? SCR_SETS.long : SCR_SETS.normal
  const Ly = scrLayout(S.template, S.order)
  const N = S.letters.length, ORD = S.order, L = S.letters
  const fin = state === 'reveal' || state === 'complete'
  const preLanded = new Set(state === 'hints' ? [S.hints[0]] : state === 'reveal' ? S.hints : state === 'complete' ? L.map((_, i) => i) : [])
  const hinted = new Set(state === 'hints' || fin ? S.hints : [])
  const flying = state === 'hints' ? [S.hints[1]] : state === 'reveal' ? L.map((_, i) => i).filter(i => !preLanded.has(i)) : []
  const tm = timer3(state === 'short' || state === 'long' ? 'question' : state, S.timer)
  const fixedN = state === 'warn' ? 7 : state === 'zero' ? 0 : null
  const { root, n: nLive } = useEntrance(onReady, (tl, q) => {
    scrEnterTl(tl, q, state === 'question' || state === 'short' || state === 'long' || state === 'warn' || state === 'zero')
    if (state === 'hints') scrHintTl(tl, q, Ly, ORD, S.hints[1], 0.4, 1.4)
    if (state === 'reveal') scrRevealTl(tl, q, Ly, ORD, flying, N)
    if (state === 'complete') tl.fromTo(q('.s3-result > *'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 }, 0.4)
  }, tm, [state])
  const n = nOv ?? fixedN ?? (tm ? nLive : null)
  return (
    <ScrambleScene title={S.title} qn={S.qn} qcount={S.qcount} clue={S.clue} Ly={Ly} letters={L} order={ORD}
      landed={preLanded} hinted={hinted} fin={fin} n={n} total={S.timer} cls={`st-${state}`} timeUp={n === 0 && state !== 'reveal'}
      result={fin ? <><span>угадали</span>{S.guessed.map(k => <em key={k} style={{ color: TEAM3[k].color, borderColor: TEAM3[k].color }}>{TEAM3[k].name}</em>)}</> : null}
      rootRef={root} />
  )
}
