// ═══ Лаборатория: «Сопоставление» — утверждённое направление «Слияние в живое растение» ═══
// Рисунок и куски таймлайна — общие с игрой (forest/stage3/Match.tsx); здесь тестовые наборы (forest/stage3/data.ts).
import { useEntrance, type S1Props } from '../../forest/stage1/common'
import { MATCH_SETS, type MatchSet } from '../../forest/stage3/data'
import { timer3 } from '../../forest/stage3/common3'
import { MatchScene, matchLayout, matchQuestionTl, matchRevealTl, matchWordsTl } from '../../forest/stage3/Match'
import { labRows, rowsFrom } from '../../forest/stage4/data'

export const MATCH_STATES = [
  { id: 'question', name: 'Вопрос: 4 картинки, подписи отдельно' },
  { id: 'long', name: 'Длинные подписи' },
  { id: 'mixed', name: 'Текст и картинки вместе' },
  { id: 'six', name: 'Шесть пар' },
  { id: 'reveal', name: 'Показ ответа: подписи прирастают' },
  { id: 'revlong', name: 'Показ: длинные подписи' },
  { id: 'revmixed', name: 'Показ: текст и картинки' },
  { id: 'complete', name: 'Итог: все пары собраны' },
]
export const MATCH_VARIANTS = [
  { id: 'A', name: 'Слияние в живое растение', note: 'Утверждено. Картинки — крупным рядом наверху. Подписи-листья — отдельной россыпью на поляне ниже, в другом порядке и на разной высоте (положение ничего не подсказывает). Под каждой картинкой — бутон: сюда прирастёт её подпись. На ответе по одной картинке: из бутона прорастает стебель, лист-подпись взлетает по дуге (пути могут пересекаться) и прирастает на конец стебля, на нём вспыхивает номер картинки. Внизу — сводка пар цифрой и буквой.' },
]

function setOf(state: string): MatchSet {
  return state.endsWith('long') ? MATCH_SETS.long : state.endsWith('mixed') ? MATCH_SETS.mixed : state === 'six' ? MATCH_SETS.six : MATCH_SETS.normal
}

export function Match({ state, nOv, onReady }: S1Props) {
  const S = setOf(state), Ly = matchLayout(S, { long: S === MATCH_SETS.long })
  const rev = state.startsWith('rev') || state === 'complete', done = state === 'complete'
  const tm = timer3(rev ? 'reveal' : 'question', S.timer)
  const { root, n: nLive } = useEntrance(onReady, (tl, q) => {
    matchWordsTl(tl, q)
    if (!rev) matchQuestionTl(tl, q)
    else if (!done) {
      const step = S.items.length > 4 ? 0.95 : 1.25
      matchRevealTl(tl, q, S, Ly, { t0: 0.5, step, pairsAt: 0.5 + S.items.length * step + 0.2, stripAt: 0.5 + S.items.length * step + 0.9 })
    } else tl.fromTo(q('.mt-pairs > *'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.08 }, 0.4).fromTo(q('.s4-sl'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 }, 0.7)
  }, tm, [state])
  const n = nOv ?? (tm ? nLive : null)
  return <MatchScene S={S} Ly={Ly} rev={rev} done={done} n={n} rootRef={root}
    strip={rev && S.items.length <= 4 ? { rows: labRows(rowsFrom(S.correct_pairs, ' ')) } : null} />
}
