import type { ComponentType } from 'react'
import type { ScreenProps } from './common'
import * as c1 from './c1/Observatory'
import * as c2 from './c2/Foundry'
import * as c3 from './c3/Mirror'

export type ConceptMeta = {
  num: number; name: string; idea: string; world: string
  materials: [string, string][]; persists: string; behaves: string; timer: string; teams: string; type: string
}
export const CONCEPTS: { meta: ConceptMeta; Screen: ComponentType<ScreenProps> }[] = [c1, c2, c3].map(m => ({ meta: m.meta, Screen: m.Screen }))
