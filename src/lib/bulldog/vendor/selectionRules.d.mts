import type { SelectionPlayer } from '../v3types'
export interface SelectionData { pupsGates: number[]; rockyDelay: { delayByPhase: Array<{ method: string; entryPhase: number; entrySourceFrame: number; waitFrames: number }> } }
export function createSelectionPlayer(id: string, data: SelectionData, startPos?: number): SelectionPlayer
export function dogRule(id: string, data: SelectionData): { loop: number[] }
