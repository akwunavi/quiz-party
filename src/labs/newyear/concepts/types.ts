import type { ComponentType } from 'react'
import type { ScreenId } from '../content'

export interface ConceptMeta {
  id: string
  num: number
  name: string
  tagline: string
  /** арт-дирекшн одной фразой */
  idea: string
  metaphor: string
  composition: string
  light: string
  materials: string
  motion: string
  transitions: string
  trees: string
  hierarchy: { primary: string; secondary: string; atmosphere: string }
  /** какая существующая механика показана в Special */
  special: string
}

export interface Concept {
  meta: ConceptMeta
  Screen: ComponentType<{ screen: ScreenId }>
}
