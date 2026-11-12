// ═══ Пластинка «Книги» крутится только пока звук реально идёт (bindPlayback) ═══
import { describe, it, expect } from 'vitest'
import { bindPlayback } from '../playbackActive'

function fakeOp() {
  const subs = new Map<string, Set<() => void>>()
  return {
    on(ev: string, cb: () => void) {
      if (!subs.has(ev)) subs.set(ev, new Set())
      subs.get(ev)!.add(cb)
      return () => { subs.get(ev)!.delete(cb) }
    },
    fire(ev: string) { subs.get(ev)?.forEach(cb => cb()) },
    count() { return [...subs.values()].reduce((n, s) => n + s.size, 0) },
  }
}

describe('bindPlayback', () => {
  it('playing → крутится; waiting/pause/ended → стоп; снова playing → крутится', () => {
    const op = fakeOp(); const log: boolean[] = []
    bindPlayback(op as never, v => log.push(v))
    op.fire('playing'); op.fire('waiting'); op.fire('playing'); op.fire('pause'); op.fire('playing'); op.fire('ended')
    expect(log).toEqual([true, false, true, false, true, false])
  })
  it('без события playing (звук не пошёл, AbortError) — не крутится вовсе', () => {
    const op = fakeOp(); const log: boolean[] = []
    bindPlayback(op as never, v => log.push(v))()
    expect(log).toEqual([false])
  })
  it('отписка снимает все подписки, ставит стоп один раз; поздние события не влияют', () => {
    const op = fakeOp(); const log: boolean[] = []
    const unbind = bindPlayback(op as never, v => log.push(v))
    op.fire('playing'); unbind(); unbind(); op.fire('playing')
    expect(log).toEqual([true, false])
    expect(op.count()).toBe(0)
  })
})
