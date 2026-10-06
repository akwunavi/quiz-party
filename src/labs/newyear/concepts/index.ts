import type { Concept } from './types'
import { gala } from './gala/Gala'
import { popup } from './popup/Popup'
import { frost } from './frost/Frost'
import { home } from './home/Home'
import { taiga } from './taiga/Taiga'

/** Пять миров — порядок кнопок CONCEPT 1…5 в лаборатории. */
export const CONCEPTS: Concept[] = [gala, popup, frost, home, taiga]
