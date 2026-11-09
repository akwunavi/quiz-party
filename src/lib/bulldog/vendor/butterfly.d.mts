import type { ButterflyPose } from '../v3types'
export function butterflyPose(u: number, nose: { x: number; y: number }, seed?: number, tSec?: number, dogIndex?: number): Omit<ButterflyPose, 'id' | 'u'>
export class ButterflyManager {
  active: Map<number, unknown>; log: Array<{ ev: string; id: number; dog: number; t: number }>
  update(dogIndex: number, v: unknown, bodyFrames: number, tSec: number, nose: () => { x: number; y: number }): ButterflyPose | null
  reset(): void
}
