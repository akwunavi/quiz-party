// ═══ «Книга» (ny_book) — ПРОТОТИП этапа 2: лобби на развороте ═══
// Левая страница — QR (настоящий, динамический: та же ссылка, что у обычного лобби) и приглашение; правая — команды без
// пустых мест (раскладка — lobbyLayout в geometry.ts). Команды лежат в слое сцены ПОД затемнением окна составов, QR — в слое
// поверх игры (выше затемнения), как и раньше.
import type { CSSProperties, ReactNode } from 'react'
import type { NyTeam } from '../types'
import { lobbyLayout, lobbyRowH } from './geometry'
import { bookTeamVariant } from './copy'

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
  const shown = l.hidden ? teams.slice(0, teams.length - l.hidden) : teams
  return (
    <div className={`bk-teams is-${l.mode} bk-t${bookTeamVariant()}`}
      style={{ '--cols': l.cols, '--per': l.perCol, '--fs': l.fontU, '--rh': lobbyRowH(l) } as CSSProperties}>
      <div className="bk-teams-head"><span>КОМАНДЫ ЗА СТОЛОМ</span><b>{teams.length}</b></div>
      <ol className="bk-teams-grid">
        {shown.map((t, i) => {
          const n = t.name.length
          return (
            <li key={t.id} className={`bk-team${t.alive ? '' : ' is-away'}${n > 22 ? ' is-long' : n > 14 ? ' is-mid' : ''}`}
              style={{ '--tc': t.color, '--i': i } as CSSProperties}>
              <span className="bk-team-num">{i + 1}</span>
              <span className="bk-team-name">{t.icon && <i>{t.icon}</i>}{t.name}</span>
            </li>
          )
        })}
        {l.hidden > 0 && <li className="bk-team is-more"><span className="bk-team-name">+{l.hidden} ещё</span></li>}
      </ol>
    </div>
  )
}

/** Приглашение на левой странице (под QR; на бумаге — вместо QR). */
export function BookInvite({ paper }: { paper: boolean }) {
  return (
    <div className={`bk-invite${paper ? ' is-paper' : ''}`}>
      {paper ? (<>
        <p className="bk-invite-title">Добро пожаловать!</p>
        <p className="bk-invite-text">Бланки — на столах. Впишите название команды и передайте ведущему.</p>
      </>) : (<>
        <p className="bk-invite-title">Наведите камеру</p>
        <p className="bk-invite-text">и впишите название команды — играем с телефонов</p>
      </>)}
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
