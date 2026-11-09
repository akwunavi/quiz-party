// Типы для вендорных модулей Race V3 / P3 / адаптера собак (vendor/*.mjs — чистый JS без типов).
export interface Segment { kind: string; t0: number; t1: number; p0: number; p1: number; eventIndex: number; base?: number }
export interface RaceDog { index: number; base: number; segments: Segment[]; crossing: number; end: number; eventsActual: { kind: string; actual: number; actionEnd: number }[] }
export interface RaceV3 { requestedSeed: number; effectiveSeed: number; places: number[]; dogs: RaceDog[]; end: number }
export interface DogState { progress: number; finished?: boolean; complete?: boolean; segment?: string }
export interface Visual { clip: string; frame: string | number | null; role: string; window: string; localIdx: number | null; status: string; overflow: boolean
  sheet: string | null; index: number | null; shiftPx: number; frameOverridden?: boolean }
export interface DogVisualFn { at(segments: Segment[], t: number): Visual; contract: unknown; atlas: unknown }
export interface SelectionFrame { clip: 'idle' | 'sel' | 'ret'; index: number; kind: string; pos?: number }
export interface SelectionPlayer { tick(): SelectionFrame; pick(): boolean; busy(): boolean; readonly pos: number; readonly waitFrames: number }
export interface ButterflyPose { id: number; x: number; y: number; alpha: number; wing: number; u: number }
