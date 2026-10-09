// ═══ Magic 2.0 Lab — общие узлы: сцена 1920×1080, тестовые иллюстрации, QR ═══
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import QrCode from '../../components/QrCode'
import { PLAYER_URL } from './data'


/** Логическая сцена 1920×1080, вписанная в контейнер (как проектор). */
export function Stage({ children }: { children: ReactNode }) {
  const box = useRef<HTMLDivElement>(null)
  const [k, setK] = useState(0.5)
  useEffect(() => {
    const el = box.current
    if (!el) return
    const fit = () => setK(el.clientWidth / 1920)
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return (
    <div ref={box} className="m2-stage-box">
      <div className="m2-stage" style={{ transform: `scale(${k})` }}>{children}</div>
    </div>
  )
}

/** QR в мире: прямой, контрастный, с тихой зоной (требование стандарта). */
export function Qr({ size, ink = '#1a1424', className }: { size: number; ink?: string; className?: string }) {
  return (
    <div className={`m2-qr ${className ?? ''}`} style={{ width: size, height: size }}>
      <QrCode value={PLAYER_URL} quiet ink={ink} className="m2-qr-svg" title="Ссылка для игроков" />
    </div>
  )
}

// ── тестовые иллюстрации: гравюры (чтобы медиа выглядело как настоящее, а не плашка) ──
const hatch = (id: string, ink: string, gap = 4, rot = 45) => (
  <pattern id={id} width={gap} height={gap} patternUnits="userSpaceOnUse" patternTransform={`rotate(${rot})`}>
    <line x1="0" y1="0" x2="0" y2={gap} stroke={ink} strokeWidth={gap * 0.32} />
  </pattern>
)

/** Город на канале: 1650 — щипцовые дома и мачты; 1950 — те же дома, фонари, трамвайные провода. */
export function CityEngraving({ era }: { era: 'old' | 'new' }) {
  const ink = '#2b1d14', id = `ce-${era}`
  const houses = [
    [20, 150, 46], [66, 128, 40], [106, 142, 44], [150, 118, 38], [188, 136, 46], [234, 124, 40], [274, 146, 44], [318, 120, 42], [360, 138, 40],
  ]
  return (
    <svg viewBox="0 0 420 300" className="m2-art" preserveAspectRatio="xMidYMid slice">
      <defs>{hatch(`${id}-h`, ink, 4, 45)}{hatch(`${id}-w`, ink, 6, 0)}{hatch(`${id}-s`, ink, 7, -30)}</defs>
      <rect width="420" height="300" fill="#efe3c6" />
      <rect width="420" height="110" fill={`url(#${id}-s)`} opacity=".22" />
      {era === 'old' && <g stroke={ink} strokeWidth="1.6" fill="none">
        <path d="M70 230 V60 M64 80 H78 M60 110 H82" /><path d="M300 236 V70 M292 92 H308 M288 124 H312" />
        <path d="M40 236 Q95 250 150 236 L140 256 H52 Z" fill={`url(#${id}-h)`} />
      </g>}
      {houses.map(([x, y, w], i) => (
        <g key={i}>
          <path d={`M${x} 236 V${y} L${x + w / 2} ${y - 22} L${x + w} ${y} V236 Z`} fill={i % 2 ? `url(#${id}-h)` : '#e6d6b2'} stroke={ink} strokeWidth="1.4" />
          {[0, 1, 2].map(r => <rect key={r} x={x + w * 0.22} y={y + 8 + r * 26} width={w * 0.2} height="14" fill={ink} opacity=".75" />)}
          {[0, 1, 2].map(r => <rect key={`b${r}`} x={x + w * 0.58} y={y + 8 + r * 26} width={w * 0.2} height="14" fill={ink} opacity=".75" />)}
        </g>
      ))}
      <rect y="236" width="420" height="64" fill={`url(#${id}-w)`} opacity=".55" />
      <path d="M0 240 H420" stroke={ink} strokeWidth="2" />
      {era === 'new' && <g stroke={ink} strokeWidth="1.5" fill="none">
        {[54, 170, 286, 392].map(x => <g key={x}><path d={`M${x} 236 V176`} /><circle cx={x} cy="172" r="5" fill="#f6edd6" /></g>)}
        <path d="M0 96 Q210 112 420 92" /><path d="M0 104 Q210 120 420 100" strokeDasharray="2 3" />
        <rect x="140" y="252" width="96" height="16" fill={`url(#${id}-h)`} />
      </g>}
    </svg>
  )
}

/** Изобретение в технике гравюры: лампа, телефон-«свеча», динамит, радиоприёмник. */
export function InventionEngraving({ kind }: { kind: 'lamp' | 'phone' | 'dynamite' | 'radio' }) {
  const ink = '#2b1d14', id = `ie-${kind}`
  return (
    <svg viewBox="0 0 300 300" className="m2-art" preserveAspectRatio="xMidYMid slice">
      <defs>{hatch(`${id}-h`, ink, 4, 45)}{hatch(`${id}-v`, ink, 5, 90)}</defs>
      <rect width="300" height="300" fill="#efe3c6" />
      <ellipse cx="150" cy="262" rx="96" ry="14" fill={`url(#${id}-h)`} opacity=".5" />
      <g stroke={ink} strokeWidth="2.2" fill="none" strokeLinecap="round">
        {kind === 'lamp' && <>
          <path d="M150 40 C92 40 78 112 112 150 C126 166 128 184 128 198 H172 C172 184 174 166 188 150 C222 112 208 40 150 40 Z" fill="#f6edd6" />
          <path d="M136 198 V150 L150 118 L164 150 V198" /><path d="M140 132 Q150 108 160 132" />
          <rect x="126" y="198" width="48" height="40" fill={`url(#${id}-v)`} /><path d="M126 212 H174 M126 226 H174" />
          <path d="M138 238 H162 L156 252 H144 Z" fill={ink} />
        </>}
        {kind === 'phone' && <>
          <path d="M120 250 H180 L172 230 H128 Z" fill={`url(#${id}-h)`} /><path d="M150 230 V96" strokeWidth="6" />
          <path d="M126 96 C126 72 174 72 174 96 Z" fill="#f6edd6" /><circle cx="150" cy="70" r="10" fill={ink} />
          <path d="M162 150 C220 150 232 120 226 92" /><path d="M214 70 C206 52 236 44 244 62 L236 98 L222 96 Z" fill={`url(#${id}-h)`} />
        </>}
        {kind === 'dynamite' && <>
          {[0, 1, 2].map(i => <rect key={i} x={98 + i * 36} y="110" width="32" height="130" rx="6" fill={i === 1 ? `url(#${id}-h)` : '#e6d6b2'} />)}
          <path d="M92 150 H210 M92 200 H210" strokeWidth="5" />
          <path d="M150 110 C150 80 176 72 182 50" /><path d="M176 40 L186 52 L198 44 L188 58 L200 66 L184 64" fill={ink} />
        </>}
        {kind === 'radio' && <>
          <rect x="70" y="110" width="160" height="120" rx="10" fill="#e6d6b2" />
          <rect x="86" y="126" width="80" height="88" rx="6" fill={`url(#${id}-h)`} />
          <circle cx="198" cy="148" r="14" fill="#f6edd6" /><circle cx="198" cy="194" r="14" fill="#f6edd6" />
          <path d="M100 110 L140 60 M200 110 L170 56" /><circle cx="140" cy="58" r="4" fill={ink} />
          <path d="M80 230 V246 M220 230 V246" strokeWidth="5" />
        </>}
      </g>
    </svg>
  )
}

/** Ключ для перезапуска CSS-анимаций по PLAY/REPLAY без перемонтажа мира. */
export const replay = (play: number, ...parts: (string | number)[]) => [...parts, play].join('-')

export const cssv = (o: Record<string, string | number>) => o as CSSProperties

/** Астрономические часы на ратуше: башня, циферблат с кольцом зодиака, фигуры. */
export function OrlojEngraving() {
  const ink = '#2b1d14'
  return (
    <svg viewBox="0 0 360 480" className="m2-art" preserveAspectRatio="xMidYMid slice">
      <defs>{hatch('or-h', ink, 4, 45)}{hatch('or-v', ink, 5, 90)}{hatch('or-s', ink, 7, -30)}</defs>
      <rect width="360" height="480" fill="#efe3c6" />
      <rect width="360" height="480" fill="url(#or-s)" opacity=".14" />
      <g stroke={ink} strokeWidth="1.8" fill="none">
        <path d="M60 480 V150 L180 40 L300 150 V480" fill="#e6d6b2" />
        <path d="M60 150 H300" /><path d="M180 40 V20 M172 28 H188" />
        <rect x="60" y="150" width="240" height="330" fill="url(#or-v)" opacity=".35" />
        <circle cx="180" cy="270" r="92" fill="#efe3c6" /><circle cx="180" cy="270" r="92" fill="url(#or-h)" opacity=".25" />
        <circle cx="180" cy="270" r="70" /><circle cx="180" cy="248" r="54" strokeDasharray="3 4" />
        {Array.from({ length: 24 }, (_, i) => <line key={i} x1={180 + Math.cos(i * Math.PI / 12) * 84} y1={270 + Math.sin(i * Math.PI / 12) * 84} x2={180 + Math.cos(i * Math.PI / 12) * 92} y2={270 + Math.sin(i * Math.PI / 12) * 92} />)}
        <path d="M180 270 L180 196" strokeWidth="3" /><circle cx="180" cy="196" r="7" fill={ink} />
        <path d="M180 270 L236 300" strokeWidth="3" /><circle cx="236" cy="300" r="10" fill="#efe3c6" /><circle cx="240" cy="300" r="8" fill={ink} />
        <rect x="150" y="390" width="60" height="70" fill="#e6d6b2" /><circle cx="180" cy="425" r="24" />
        <path d="M92 190 V240 M268 190 V240" /><circle cx="92" cy="182" r="9" /><circle cx="268" cy="182" r="9" />
      </g>
    </svg>
  )
}
