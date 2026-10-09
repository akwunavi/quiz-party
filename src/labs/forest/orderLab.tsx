// ═══ Лаборатория: «Порядок» — утверждённое направление «Лоза-путь» ═══
// Рисунок и куски таймлайна — общие с игрой (forest/stage3/Order.tsx); здесь тестовые наборы (forest/stage3/data.ts).
import { useEntrance, type S1Props } from '../../forest/stage1/common'
import { ORDER_SETS, type OrderSet } from '../../forest/stage3/data'
import { timer3 } from '../../forest/stage3/common3'
import { OrderScene, orderLayout, orderQuestionTl, orderRevealTl, orderWordsTl, type OrderData } from '../../forest/stage3/Order'
import { labRows, rowsFrom } from '../../forest/stage4/data'
import hubble from '../../forest/media/hubble-deep-field.jpg'

export const ORDER_STATES = [
  { id: 'question', name: 'Вопрос: 4 варианта вразнобой' },
  { id: 'long', name: 'Длинные подписи' },
  { id: 'five', name: '5 вариантов, порядок «от позднего»' },
  { id: 'six', name: '6 вариантов' },
  { id: 'media', name: 'Вопрос с картинкой' },
  { id: 'reveal', name: 'Показ ответа: листья встают по порядку' },
  { id: 'revlong', name: 'Показ: длинные подписи' },
  { id: 'revfive', name: 'Показ: 5 вариантов, обратный порядок' },
  { id: 'revsix', name: 'Показ: 6 вариантов' },
  { id: 'complete', name: 'Итог: порядок собран' },
]
export const ORDER_VARIANTS = [
  { id: 'A', name: 'Лоза-путь', note: 'Утверждено. Внизу от края до края растёт лоза: слева семя (место 1), справа цветок (последнее место), на лозе бутоны с номерами. Варианты — листья, висят сверху вразнобой. На ответе листья по одному, от первого места к последнему, опускаются на свои бутоны по дуге; бутон раскрывается цветком, по лозе вслед бежит свет. Номер места горит на листе. Направление — всегда от семени к цветку; что значит «раньше», говорит вопрос.' },
]

function setOf(state: string): OrderSet {
  const k = state.replace(/^rev/, '')
  return k === 'long' ? ORDER_SETS.long : k === 'five' ? ORDER_SETS.five : k === 'six' ? ORDER_SETS.six : k === 'media' ? ORDER_SETS.media : ORDER_SETS.normal
}

export function Order({ state, nOv, onReady }: S1Props) {
  const set = setOf(state)
  const S: OrderData = { ...set, media: set.media ? hubble : null }
  const Ly = orderLayout(S, { long: set === ORDER_SETS.long }), rev = state.startsWith('rev') || state === 'complete', done = state === 'complete'
  const tm = timer3(rev ? 'reveal' : 'question', S.timer)
  const { root, n: nLive } = useEntrance(onReady, (tl, q) => {
    orderWordsTl(tl, q)
    if (!rev) orderQuestionTl(tl, q)
    else if (!done) {
      const step = Ly.n > 5 ? 0.85 : 1.0
      orderRevealTl(tl, q, S, Ly, { t0: 0.4, step, stripAt: 0.4 + Ly.n * step + 0.6 })
    } else tl.fromTo(q('.s4-sl'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 }, 0.5)
  }, tm, [state])
  const n = nOv ?? (tm ? nLive : null)
  return <OrderScene S={S} Ly={Ly} rev={rev} done={done} n={n} rootRef={root}
    strip={rev ? { rows: labRows(rowsFrom(S.correct_order.split(''), '')) } : null} />
}
