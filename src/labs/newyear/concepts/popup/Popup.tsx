// ═══ CONCEPT 2 · КНИГА-РАСКЛАДУШКА · набор для 14 состояний ═══
// Сцена, вымпелы, карточка QR, розетка и перелистывание — общие с боевым проектором
// (src/ny/book/BookScene.tsx); здесь только сборка набора для лаборатории и демо-QR.
import { BookWorld, PageTurn, Pennants, QrCard, Rosette } from '../../../../ny/book/BookScene'
import { FakeQR } from '../../../../ny/engine/bits'
import type { Kit } from '../../game/kit'
import type { Concept } from '../types'
import { meta } from './meta'
import './popup.css'

const Qr = ({ lit }: { lit?: boolean }) => (
  <QrCard lit={lit}><FakeQR size={320} fg="#1d2b4a" bg="#ffffff" /></QrCard>
)

const kit: Kit = {
  id: 'popup', World: BookWorld, Teams: Pennants, Qr, Timer: Rosette, Transition: PageTurn,
  timing: { out: 0, cover: 0.8, in: 1.45, done: 2.6 },
}

export const popup: Concept = { meta, kit }
