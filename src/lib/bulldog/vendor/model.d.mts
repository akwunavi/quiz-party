import type { RaceDog, DogState } from '../v3types'
export function buildDog(preset: string, index: number, options?: { courseSeconds?: number }): RaceDog
export function stateAt(dog: RaceDog, time: number): DogState
export const PRESETS: Record<string, unknown>
