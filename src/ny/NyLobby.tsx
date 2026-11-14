// ═══ Лобби новогодних тем: команды и QR в мире каждой темы ═══
// Книга — гирлянда вымпелов и настольная карточка с QR; Тёплый дом — чулки на каминной
// полке и QR на экране телевизора. Данные (кто подключён, ссылка) те же, что в обычном
// лобби; рисуется в слотах сцены (NySlot), игровая вёрстка лобби остаётся только с
// названием, окном составов и (по флагу) резервными кнопками.
import QrCode from '../components/QrCode'
import { BookInvite, BookQr, TeamsOnPage } from './book/BookLobby'
import { Stockings, TvQr } from './home/HomeScene'
import { NySlot, NY_SLOT_BG, NY_SLOT_FX } from './NySlot'
import type { NyThemeKey } from './density'
import type { NyTeam } from './types'

export function NyLobby({ theme, teams, playerUrl, showQr, lit }: {
  theme: NyThemeKey
  teams: NyTeam[]
  playerUrl: string
  /** на бумаге (paper) QR не показываем — как в обычном лобби */
  showQr: boolean
  /** открыто окно составов: QR поднимается над затемнением */
  lit: boolean
}) {
  const book = theme === 'ny_book'
  // «Книга» — прототип этапа 2 (PROTOTYPES.md): команды на правой странице без пустых мест, слева QR на пергаментной
  // карточке и приглашение; 0 команд — приглашение, а не пустые слоты.
  if (book) return (
    <>
      <NySlot where={NY_SLOT_BG}><TeamsOnPage teams={teams} paper={!showQr} /><BookInvite paper={!showQr} /></NySlot>
      {showQr && (
        <NySlot where={NY_SLOT_FX}>
          <BookQr lit={lit}><QrCode value={playerUrl} quiet ink="#2a1a12" title="QR для подключения" className="ny-qr-svg" /></BookQr>
        </NySlot>
      )}
    </>
  )
  return (
    <>
      {teams.length > 0 && (
        <NySlot where={NY_SLOT_BG}><Stockings teams={teams} /></NySlot>
      )}
      {showQr && (
        <NySlot where={NY_SLOT_FX}>
          <TvQr lit={lit}><QrCode value={playerUrl} quiet ink="#0b1735" title="QR для подключения" className="ny-qr-svg" /></TvQr>
        </NySlot>
      )}
    </>
  )
}
