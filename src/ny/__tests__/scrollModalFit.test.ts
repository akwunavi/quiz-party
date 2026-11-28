import { describe, it, expect } from 'vitest'
import { FIT_STEPS, pickFitStep } from '../book/ScrollModal'

describe('ScrollModal: ужим содержимого свитка', () => {
  it('помещается сразу — масштаб 1', () => { expect(pickFitStep(() => 400, 500)).toBe(1) })
  it('берёт первую ступень, при которой влезает', () => {
    const k = pickFitStep(k => 600 * k, 500)   // 600·k ≤ 501 → k ≤ .835 → .82
    expect(k).toBe(.82)
  })
  it('не влезает совсем — последняя (минимальная) ступень, не ноль', () => {
    expect(pickFitStep(() => 9999, 500)).toBe(FIT_STEPS[FIT_STEPS.length - 1])
  })
  it('ступени убывают и не уходят ниже читаемого', () => {
    for (let i = 1; i < FIT_STEPS.length; i++) expect(FIT_STEPS[i]).toBeLessThan(FIT_STEPS[i - 1])
    expect(FIT_STEPS[FIT_STEPS.length - 1]).toBeGreaterThanOrEqual(.6)
  })
})
