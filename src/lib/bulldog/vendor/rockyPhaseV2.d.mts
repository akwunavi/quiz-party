export function visualRunFrame(segment: { t0: number; t1: number }, time: number): number | null
export function sourceForCell(cell: number): number
export function skipPlan(n: number): { cells: number[]; tier: string } | null
export const CONFIG: { minCorrectedCells: number }
