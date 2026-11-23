// ═══ Значок команды — ОДИН компонент для телефона, админки и проектора (всех тем) ═══
// TeamIcon — только картинка значка; TeamMark — цветной «жетон»: кольцо выбранного
// игроками цвета (как есть, без осветления) + значок на светлой подложке.
import type { CSSProperties } from 'react'
import { teamIconUrl } from '../lib/teamIcon'

export function TeamIcon({ icon, className = '' }: { icon: string | null | undefined; className?: string }) {
  if (!icon) return null
  const url = teamIconUrl(import.meta.env.BASE_URL, icon)
  return url
    ? <img className={`ti${className ? ' ' + className : ''}`} src={url} alt={icon} draggable={false} />
    : <span className={`ti-txt${className ? ' ' + className : ''}`}>{icon}</span>
}

export function TeamMark({ icon, color, className = '' }: { icon?: string | null; color?: string; className?: string }) {
  return (
    <span className={`tm${icon ? ' has-ico' : ''}${className ? ' ' + className : ''}`} style={{ '--tmc': color || '#c0392b' } as CSSProperties} aria-hidden="true">
      {icon && <span className="tm-in"><TeamIcon icon={icon} /></span>}
    </span>
  )
}
