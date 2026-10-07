// ═══ Лобби новогодних тем: команды и QR в мире каждой темы ═══
// Книга — гирлянда вымпелов и настольная карточка с QR; Тёплый дом — чулки на каминной
// полке и QR на экране телевизора. Данные (кто подключён, ссылка) те же, что в обычном
// лобби; рисуется в слотах сцены (NySlot), игровая вёрстка лобби остаётся только с
// названием, окном составов и (по флагу) резервными кнопками.
import QrCode from '../components/QrCode'
import { Pennants, QrCard } from './book/BookScene'
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
  return (
    <>
      {teams.length > 0 && (
        <NySlot where={NY_SLOT_BG}>{book ? <Pennants teams={teams} /> : <Stockings teams={teams} />}</NySlot>
      )}
      {showQr && (
        <NySlot where={NY_SLOT_FX}>
          {book
            ? <QrCard lit={lit}><QrCode value={playerUrl} quiet ink="#1d2b4a" title="QR для подключения" className="ny-qr-svg" /></QrCard>
            : <TvQr lit={lit}><QrCode value={playerUrl} quiet ink="#0b1735" title="QR для подключения" className="ny-qr-svg" /></TvQr>}
        </NySlot>
      )}
    </>
  )
}
