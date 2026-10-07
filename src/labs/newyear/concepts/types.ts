import type { Kit } from '../game/kit'

export interface ConceptMeta {
  id: string
  num: number
  name: string
  tagline: string
  /** арт-дирекшн одной фразой */
  idea: string
  metaphor: string
  /** как мир решает: контейнеры, медиа, варианты, таймер, переходы, разбор, плотность */
  containers: string
  media: string
  options: string
  timer: string
  transitions: string
  reveal: string
  density: string
  trees: string
  hierarchy: { primary: string; secondary: string; atmosphere: string }
  /** что делает мир в каждом из 14 состояний (по id состояния) */
  states: Record<string, string>
}

export interface Concept {
  meta: ConceptMeta
  kit: Kit
}
