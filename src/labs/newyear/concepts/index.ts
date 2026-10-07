import type { Concept } from './types'
import { popup } from './popup/Popup'
import { frost } from './frost/Frost'
import { home } from './home/Home'

/** Три мира Фазы 2 — порядок кнопок CONCEPT 2…4 в лаборатории. */
export const CONCEPTS: Concept[] = [popup, frost, home]
