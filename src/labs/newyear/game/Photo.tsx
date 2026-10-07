// Заглушки медиа с настоящими пропорциями: кадры фильмов 4:3, открытки 3:4
// и 2:3. Это не «серые прямоугольники» — по ним видно, как экран держит
// реальную картинку (контраст, кадрирование, рамка темы).
import type { CSSProperties } from 'react'

export type PhotoKind = 'banya' | 'clock' | 'forest' | 'institute' | 'postcard-kremlin' | 'postcard-moroz' | 'postcard-space'

export function Photo({ kind, ratio, className, style }: { kind: PhotoKind; ratio: number; className?: string; style?: CSSProperties }) {
  const W = 400, H = Math.round(W / ratio)
  const id = `ph-${kind}`
  return (
    <svg className={`gq-photo ${className ?? ''}`} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice"
      style={{ aspectRatio: `${ratio}`, ...style }} role="img" aria-label="Иллюстрация к вопросу (макет)">
      <defs>
        <radialGradient id={`${id}-v`} cx="50%" cy="50%" r="70%">
          <stop offset="60%" stopColor="#000" stopOpacity="0" /><stop offset="100%" stopColor="#000" stopOpacity="0.45" />
        </radialGradient>
        <filter id={`${id}-g`}><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" /><feColorMatrix values="0 0 0 0 0.5 0 0 0 0 0.45 0 0 0 0 0.4 0 0 0 0.12 0" /></filter>
      </defs>
      <Scene kind={kind} W={W} H={H} />
      <rect width={W} height={H} filter={`url(#${id}-g)`} />
      <rect width={W} height={H} fill={`url(#${id}-v)`} />
    </svg>
  )
}

function Scene({ kind, W, H }: { kind: PhotoKind; W: number; H: number }) {
  switch (kind) {
    case 'banya': return (<>
      <rect width={W} height={H} fill="#7a5a3c" />
      {Array.from({ length: 9 }, (_, i) => <rect key={i} x={0} y={i * 34} width={W} height={30} fill={i % 2 ? '#86653f' : '#6f4f33'} />)}
      <rect x={30} y={H * 0.62} width={W - 60} height={26} fill="#a8804f" /><rect x={30} y={H * 0.62 + 26} width={W - 60} height={8} fill="#3e2a18" />
      <ellipse cx={120} cy={H * 0.55} rx={26} ry={30} fill="#e9c9a8" /><rect x={92} y={H * 0.6} width={56} height={60} rx={14} fill="#f2eee6" />
      <ellipse cx={270} cy={H * 0.53} rx={24} ry={28} fill="#e3bf9b" /><rect x={244} y={H * 0.58} width={52} height={64} rx={14} fill="#f2eee6" />
      {Array.from({ length: 7 }, (_, i) => <ellipse key={i} cx={40 + i * 60} cy={H * 0.25 + (i % 2) * 20} rx={70} ry={30} fill="#fff" opacity={0.22} />)}
    </>)
    case 'clock': return (<>
      <rect width={W} height={H} fill="#1d1b2c" />
      <rect x={0} y={H * 0.72} width={W} height={H * 0.28} fill="#3a2a2e" />
      <circle cx={W / 2} cy={H * 0.42} r={H * 0.3} fill="#e8dcc0" stroke="#b08a3e" strokeWidth={10} />
      {Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * Math.PI * 2; return <rect key={i} x={W / 2 - 3} y={H * 0.42 - H * 0.27} width={6} height={14} fill="#2a2420" transform={`rotate(${(a * 180) / Math.PI} ${W / 2} ${H * 0.42})`} /> })}
      <rect x={W / 2 - 4} y={H * 0.42 - H * 0.24} width={8} height={H * 0.24} fill="#2a2420" transform={`rotate(-30 ${W / 2} ${H * 0.42})`} />
      <rect x={W / 2 - 5} y={H * 0.42 - H * 0.17} width={10} height={H * 0.17} fill="#2a2420" />
      {Array.from({ length: 6 }, (_, i) => <circle key={i} cx={30 + i * 70} cy={H * 0.86} r={14} fill="#ffcf6a" opacity={0.8} />)}
    </>)
    case 'forest': return (<>
      <rect width={W} height={H} fill="#c9d8e8" />
      <rect x={0} y={H * 0.7} width={W} height={H * 0.3} fill="#eef3f8" />
      {Array.from({ length: 8 }, (_, i) => {
        const x = i * 56 + (i % 2) * 18, h = 120 + (i % 3) * 40
        return <polygon key={i} points={`${x},${H * 0.72} ${x + 26},${H * 0.72 - h} ${x + 52},${H * 0.72}`} fill={i % 2 ? '#3f5f4e' : '#2f4b3d'} opacity={0.9} />
      })}
      <ellipse cx={210} cy={H * 0.64} rx={18} ry={22} fill="#f0d0b4" /><path d={`M190 ${H * 0.68} q20 -14 40 0 l12 70 h-64 z`} fill="#c8323a" />
      <rect x={140} y={H * 0.82} width={130} height={14} rx={6} fill="#7a4a24" />
    </>)
    case 'institute': return (<>
      <rect width={W} height={H} fill="#5f7590" />
      <rect x={40} y={H * 0.28} width={W - 80} height={H * 0.5} fill="#d9d2c4" />
      {Array.from({ length: 18 }, (_, i) => <rect key={i} x={60 + (i % 6) * 50} y={H * 0.34 + Math.floor(i / 6) * 40} width={28} height={24} fill={i % 4 ? '#ffd27a' : '#6a7480'} />)}
      <rect x={110} y={H * 0.2} width={180} height={24} fill="#c8323a" /><text x={200} y={H * 0.2 + 18} textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff" fontFamily="sans-serif">НУИНУ</text>
      <rect x={0} y={H * 0.78} width={W} height={H * 0.22} fill="#eef3f8" />
      {Array.from({ length: 40 }, (_, i) => <circle key={i} cx={(i * 97) % W} cy={(i * 53) % H} r={2} fill="#fff" opacity={0.8} />)}
    </>)
    case 'postcard-kremlin': return (<>
      <rect width={W} height={H} fill="#0f2a55" />
      <rect x={14} y={14} width={W - 28} height={H - 28} fill="none" stroke="#e8c070" strokeWidth={4} />
      <rect x={W / 2 - 40} y={H * 0.36} width={80} height={H * 0.5} fill="#8c2a2a" />
      <polygon points={`${W / 2 - 46},${H * 0.36} ${W / 2},${H * 0.16} ${W / 2 + 46},${H * 0.36}`} fill="#4a7a4a" />
      <circle cx={W / 2} cy={H * 0.46} r={26} fill="#f2e6c8" stroke="#e8c070" strokeWidth={4} />
      <polygon points={`${W / 2},${H * 0.09} ${W / 2 + 7},${H * 0.12} ${W / 2 + 16},${H * 0.12} ${W / 2 + 9},${H * 0.145} ${W / 2 + 12},${H * 0.175} ${W / 2},${H * 0.155} ${W / 2 - 12},${H * 0.175} ${W / 2 - 9},${H * 0.145} ${W / 2 - 16},${H * 0.12} ${W / 2 - 7},${H * 0.12}`} fill="#ff4a3a" />
      <rect x={30} y={H * 0.6} width={90} height={H * 0.3} fill="#7a2424" /><rect x={W - 120} y={H * 0.62} width={90} height={H * 0.28} fill="#7a2424" />
      {[[80, 0.2, '#ffcf6a'], [320, 0.26, '#ff8a7a'], [110, 0.32, '#8fd0ff']].map(([x, y, c], i) => (
        <g key={i}>{Array.from({ length: 12 }, (_, k) => { const a = (k / 12) * Math.PI * 2; return <line key={k} x1={x as number} y1={H * (y as number)} x2={(x as number) + Math.cos(a) * 30} y2={H * (y as number) + Math.sin(a) * 30} stroke={c as string} strokeWidth={3} /> })}</g>
      ))}
      <text x={W / 2} y={H - 34} textAnchor="middle" fontSize="28" fill="#e8c070" fontFamily="Georgia, serif" fontStyle="italic">С Новым годом!</text>
    </>)
    case 'postcard-moroz': return (<>
      <rect width={W} height={H} fill="#e9e1cf" />
      <rect x={14} y={14} width={W - 28} height={H - 28} fill="none" stroke="#c8323a" strokeWidth={4} />
      <rect x={0} y={H * 0.72} width={W} height={H * 0.28} fill="#f7f4ee" />
      <ellipse cx={200} cy={H * 0.3} rx={52} ry={56} fill="#f0cfae" />
      <path d={`M140 ${H * 0.3} q60 160 120 0 q-10 110 -60 120 q-50 -10 -60 -120z`} fill="#fff" />
      <path d={`M120 ${H * 0.36} q80 -110 160 0 l40 ${H * 0.4} h-240z`} fill="#c8323a" />
      <path d={`M140 ${H * 0.2} q60 -70 120 0 z`} fill="#c8323a" /><rect x={130} y={H * 0.2} width={140} height={18} rx={9} fill="#fff" />
      <ellipse cx={310} cy={H * 0.66} rx={60} ry={50} fill="#8a5a2c" />
      <text x={W / 2} y={H - 34} textAnchor="middle" fontSize="30" fill="#c8323a" fontFamily="Georgia, serif" fontStyle="italic">1955</text>
    </>)
    case 'postcard-space': return (<>
      <rect width={W} height={H} fill="#13204a" />
      <rect x={14} y={14} width={W - 28} height={H - 28} fill="none" stroke="#e8c070" strokeWidth={4} />
      {Array.from({ length: 30 }, (_, i) => <circle key={i} cx={(i * 131) % W} cy={(i * 71) % (H * 0.6)} r={2} fill="#fff" />)}
      <circle cx={300} cy={H * 0.2} r={40} fill="#e8c070" opacity={0.85} />
      <rect x={160} y={H * 0.28} width={86} height={150} rx={30} fill="#f2f2f2" />
      <circle cx={203} cy={H * 0.26} r={42} fill="#e8eef8" stroke="#bfc8d8" strokeWidth={6} /><circle cx={203} cy={H * 0.26} r={26} fill="#5a7ab0" />
      <text x={203} y={H * 0.45} textAnchor="middle" fontSize="20" fontWeight="700" fill="#c8323a" fontFamily="sans-serif">СССР</text>
      <path d={`M60 ${H * 0.8} l60 -120 l60 120 z`} fill="#2f6b4a" />
      <text x={W / 2} y={H - 34} textAnchor="middle" fontSize="30" fill="#e8c070" fontFamily="Georgia, serif" fontStyle="italic">1962</text>
    </>)
  }
}
