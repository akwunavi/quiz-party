// ═══ «Книга» (ny_book) — ПРОТОТИП этапа 2: лобби на развороте ═══
// Левая страница — QR (настоящий, динамический: та же ссылка, что у обычного лобби) и приглашение; правая — команды без
// пустых мест (раскладка — lobbyLayout в geometry.ts). Команды лежат в слое сцены ПОД затемнением окна составов, QR — в слое
// поверх игры (выше затемнения), как и раньше.
import type { CSSProperties, ReactNode } from 'react'
import type { NyTeam } from '../types'
import { lobbyLayout } from './geometry'
import { BookTeamCard } from './BookTeamCard'

/** Команды на правой странице: 1–4 карточки, 5–8 список, 9+ колонки, «+N» только при нехватке места. */
export function TeamsOnPage({ teams, paper }: { teams: NyTeam[]; paper: boolean }) {
  const l = lobbyLayout(teams.length)
  if (l.mode === 'invite') {
    return (
      <div className="bk-teams is-invite">
        <div className="bk-teams-head"><span>КОМАНДЫ ЗА СТОЛОМ</span></div>
        <p className="bk-invite-big">Ждём первую команду</p>
        <p className="bk-invite-sub">{paper
          ? 'Ведущий впишет названия — они появятся на этой странице'
          : 'Отсканируйте код слева — название вашей команды появится здесь'}</p>
      </div>
    )
  }
  // ОДОБРЕННАЯ карточка (BookTeamCard): размер зависит от числа команд — высота = область / строк; колонок 1 (≤4), 2 (≤16), 3 (17+)
  const n = teams.length, cols = n <= 4 ? 1 : n <= 16 ? 2 : 3, rows = Math.ceil(n / cols), area = 600, gap = 8
  // 10.75: плитки крупнее — 5–8 команд теперь в две колонки (было одна колонка по 68); в две колонки потолок 120 (иначе текстовая область уже 190u)
  const ch = Math.max(52, Math.min(cols === 1 ? 150 : 120, Math.floor((area - gap * (rows - 1)) / rows)))
  const shown = n > cols * 8 ? teams.slice(0, cols * 8 - 1) : teams, hidden = n - shown.length
  return (
    <div className={`bk-teams is-${l.mode} bk-tcards`} style={{ '--cols': cols, '--per': rows, '--ch': ch } as CSSProperties}>
      <div className="bk-teams-head"><span>КОМАНДЫ ЗА СТОЛОМ</span><b>{teams.length}</b></div>
      <ol className="bk-teams-grid bk-tc-grid" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gridAutoFlow: 'row', gridTemplateRows: 'none', gap: `${gap}px 14px`, alignContent: 'start' }}>
        {shown.map(t => (
          <li key={t.id} className="bk-tc-item"><BookTeamCard scene name={t.name} ch={ch} color={t.color} icon={t.icon} away={!t.alive} /></li>
        ))}
        {hidden > 0 && <li className="bk-tc-item bk-tc-more">+{hidden} ещё</li>}
      </ol>
    </div>
  )
}

/** Кожаная лента заголовка лобби (10.74, lobby-ribbon.webp). Лежит в слое сцены ПОД гирляндой с бантом (z 26), чтобы гирлянда была сверху и ничем не закрывалась;
 *  надпись «QUIZ PARTY» — заголовок экрана (h1 в HostScreen) золотым тиснением поверх, по центру кожаной части. 9-slice: тянется только середина (CSS .bk-ribbon). */
export function BookRibbon() {
  return <div className="bk-ribbon" aria-hidden="true" />
}

/** Приглашение на левой странице (под QR; на бумаге — вместо QR). */
export function BookInvite({ paper }: { paper: boolean }) {
  // 14.11: подпись у QR («Наведите камеру… играем с телефонов») убрана по решению ведущего — только в «Книге»; на бумаге (нет QR) приглашение остаётся
  if (!paper) return null
  return (
    <div className={`bk-invite${paper ? ' is-paper' : ''}`}>
      <p className="bk-invite-title">Добро пожаловать!</p>
      <p className="bk-invite-text">Бланки — на столах. Впишите название команды и передайте ведущему.</p>
    </div>
  )
}

/** QR на пергаментной карточке: наклонена только подложка, сам код прямой (камера). */
export function BookQr({ lit, children }: { lit?: boolean; children: ReactNode }) {
  return (
    <div className={`bk-qr${lit ? ' is-lit' : ''}`}>
      <div className="bk-qr-card" />
      <div className="bk-qr-tile">{children}</div>
    </div>
  )
}
