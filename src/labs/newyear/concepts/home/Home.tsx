// ═══ CONCEPT 4 · ТЁПЛЫЙ ДОМ · набор для 14 состояний ═══
// Комната, чулки, телевизор с QR, циферблат и переключение канала — общие с боевым
// проектором (src/ny/home/HomeScene.tsx); здесь только сборка набора и демо-QR.
import { ChannelSwitch, Dial, HomeWorld, Stockings, TvQr } from '../../../../ny/home/HomeScene'
import { FakeQR } from '../../../../ny/engine/bits'
import type { Kit } from '../../game/kit'
import type { Concept } from '../types'
import { meta } from './meta'
import './home.css'

const Qr = ({ lit }: { lit?: boolean }) => (
  <TvQr lit={lit}><FakeQR size={340} fg="#0b1735" bg="#ffffff" /></TvQr>
)

/** «комната» — только лобби; любой другой экран — минимум телевизор крупно */
function World({ density, scene, children }: { density: 'sparse' | 'medium' | 'dense'; scene: string; children: React.ReactNode }) {
  const d = scene === 'lobby' || scene === 'randomizer' ? 'sparse' : density === 'sparse' ? 'medium' : density
  return <HomeWorld density={d} scene={scene}>{children}</HomeWorld>
}

const kit: Kit = {
  id: 'home', World, Teams: Stockings, Qr, Timer: Dial, Transition: ChannelSwitch,
  timing: { out: 0, cover: 0.55, in: 1.25, done: 2.3 },
}

export const home: Concept = { meta, kit }
