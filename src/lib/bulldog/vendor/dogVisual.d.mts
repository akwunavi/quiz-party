import type { DogVisualFn } from '../v3types'
export function createVisual(dogId: string, data: { contract: unknown; atlas: unknown; extras?: Record<string, unknown> },
  p3: { visualAt: unknown; categoryOf: unknown }): DogVisualFn & { rockyPhase?: unknown }
