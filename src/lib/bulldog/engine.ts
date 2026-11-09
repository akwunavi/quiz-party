// Движок раунда «Скачки бульдогов»: Race V3 + библиотека собак. Без React. Всё тяжёлое (картинки) — лениво и с освобождением.
import { resolveRace } from './vendor/scenario.mjs'
import { stateAt } from './vendor/model.mjs'
import { visualAt, categoryOf } from './vendor/p3visual.mjs'
import { createVisual } from './vendor/dogVisual.mjs'
import * as rockyPhase from './vendor/rockyPhaseV2.mjs'
import { createSelectionPlayer, type SelectionData } from './vendor/selectionRules.mjs'
import type { DogVisualFn, RaceV3, Segment } from './v3types'
import { BULLDOG_BASE, DOG_IDS, type DogId } from './config'

// ── гонка: детерминированна по (seed, D); кеш, чтобы 15 кадров в секунду не пересчитывали планировщик
const raceCache = new Map<string, RaceV3>()
export function raceFor(seed: number, D: number): RaceV3 {
  const k = `${seed}:${D}`
  let r = raceCache.get(k)
  if (!r) {
    // Планировщик иногда не находит допустимую расстановку событий для сида (в лаборатории ~0,1% сидов) и сам перебирает до 64 соседних;
    // если не нашёл и их — берём следующий блок сидов. Детерминированно: все экраны придут к одной и той же гонке.
    for (let attempt = 0; ; attempt++) {
      try { r = resolveRace((seed + attempt * 65) % 0x100000000, { courseSeconds: D }); break } catch (e) { if (attempt >= 6) throw e }
    }
    raceCache.clear(); raceCache.set(k, r)
  }
  return r
}
export { stateAt }

// ── данные собак (JSON, лёгкие)
export interface SheetAtlas { kind: 'labelled' | 'clip-indexed'; cellWidth: number; cellHeight: number; columns: number
  sheets?: Record<string, string>; clips?: Record<string, { sheet: string; count: number }>; frames?: Record<string, { sheet: string; index: number }> }
export interface SelAtlas { cell: [number, number]; columns: number; scale: number; crop: number[]; clips: Record<string, { sheet: string; count: number }> }
export interface DogData { id: DogId; visual: DogVisualFn; atlas: SheetAtlas; contract: { clips: Record<string, { sampler: string; labels?: string[]; count?: number }> }; sel: SelAtlas }
const J = async <T>(u: string): Promise<T> => { const r = await fetch(u); if (!r.ok) throw new Error(`${u}: HTTP ${r.status}`); return r.json() as Promise<T> }
const dogCache = new Map<DogId, Promise<DogData>>()
export function loadDogData(id: DogId): Promise<DogData> {
  let p = dogCache.get(id)
  if (!p) {
    const b = `${BULLDOG_BASE}${id}/`
    p = (async () => {
      const [atlas, contract, extras, sel] = await Promise.all([J<SheetAtlas>(b + 'race/atlas.json'), J<DogData['contract']>(b + 'race/contract.json'),
        J<Record<string, unknown>>(b + 'race/extras.json'), J<SelAtlas>(b + 'select/atlas.json')])
      if (id === 'rocky') extras.phase = rockyPhase                                  // актуальная фазировка RUN→STOP (#68, phase_v2), а не старое поведение
      const visual = createVisual(id, { contract, atlas, extras }, { visualAt, categoryOf })
      return { id, visual, atlas, contract, sel }
    })()
    dogCache.set(id, p); p.catch(() => dogCache.delete(id))
  }
  return p
}
let selData: Promise<SelectionData> | null = null
export function loadSelectionData(): Promise<SelectionData> {
  selData ??= Promise.all([J<number[]>(`${BULLDOG_BASE}pups/select/gates.json`), J<SelectionData['rockyDelay']>(`${BULLDOG_BASE}rocky/select/delay_map.json`)])
    .then(([pupsGates, rockyDelay]) => ({ pupsGates, rockyDelay }))
  selData.catch(() => { selData = null })
  return selData
}
export { createSelectionPlayer }

// ── какие листы гонки нужны ЭТОЙ гонке: базовые всегда, листы действий — только если собака реально их исполняет
const ACTION_SHEET: Record<string, { labelled: string; indexed: string }> = {
  BUTTERFLY: { labelled: 'bf', indexed: 'BUTTERFLY' }, ROLL: { labelled: 'roll', indexed: 'ROLL' },
  SNIFF_PEE: { labelled: 'sniff', indexed: 'SNIFF_PEE' }, RETURN: { labelled: 'sniff', indexed: 'RETURN' } }
export function raceSheetUrls(d: DogData, segments: Segment[]): string[] {
  const all = d.atlas.kind === 'labelled' ? d.atlas.sheets! : Object.fromEntries(Object.entries(d.atlas.clips!).map(([k, c]) => [k, c.sheet]))
  const actionKeys = new Set(Object.values(ACTION_SHEET).flatMap(a => [a.labelled, a.indexed]))
  const used = new Set(segments.map(s => s.kind))
  const need = new Set<string>()
  for (const k of Object.keys(all)) if (!actionKeys.has(k)) need.add(k)
  for (const [kind, a] of Object.entries(ACTION_SHEET)) if (used.has(kind)) need.add(d.atlas.kind === 'labelled' ? a.labelled : a.indexed)
  return [...need].filter(k => all[k]).map(k => `${BULLDOG_BASE}${d.id}/${all[k]}`)
}
export { selectSheetUrl, stillUrl } from './config'

// ── пул картинок: ImageBitmap с явным close() (память возвращается сразу, а не «когда соберёт GC»)
export class BitmapPool {
  private m = new Map<string, Promise<ImageBitmap>>()
  private ready = new Map<string, ImageBitmap>()
  get(url: string): Promise<ImageBitmap> {
    let p = this.m.get(url)
    if (!p) {
      p = fetch(url).then(r => { if (!r.ok) throw new Error(`${url}: HTTP ${r.status}`); return r.blob() }).then(b => createImageBitmap(b))
      this.m.set(url, p); p.then(b => { if (this.m.get(url) === p) this.ready.set(url, b); else b.close() }, () => { if (this.m.get(url) === p) this.m.delete(url) })
    }
    return p
  }
  peek(url: string): ImageBitmap | undefined { return this.ready.get(url) }
  /** Освободить всё, что не входит в keep (по умолчанию — всё). */
  release(keep?: (url: string) => boolean) {
    for (const [u, p] of [...this.m]) {
      if (keep?.(u)) continue
      this.m.delete(u); const b = this.ready.get(u); this.ready.delete(u)
      if (b) b.close(); else p.then(x => x.close(), () => {})
    }
  }
  get decodedBytes(): number { let n = 0; for (const b of this.ready.values()) n += b.width * b.height * 4; return n }
  get count(): number { return this.ready.size }
}
export const dogIndex = (id: DogId) => DOG_IDS.indexOf(id)
