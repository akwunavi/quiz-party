// Цветок-бутон (общий для Финала): лепестки раскрываются масштабом группы .bl

/** цветок команды: бутон (o≈0.38) → раскрытый (o=1) */
export function Flower({ hue, o = 1 }: { hue: number; o?: number }) {
  const fill = `hsl(${hue} 55% 74%)`, edge = `hsl(${hue} 40% 28%)`
  return (
    <svg className="lb-fl" viewBox="-90 -82 180 250" aria-hidden>
      <path className="stem" d="M 0 56 C -10 100 10 130 0 164" />
      <path className="lf" d="M 0 112 C -30 100 -50 112 -56 126 C -34 130 -14 126 0 112 Z" /><path className="lf" d="M 0 128 C 30 114 50 124 58 138 C 34 144 14 140 0 128 Z" />
      <g transform="translate(0 0)"><g className="bl" style={{ transform: `scale(${o})` }}>
        {Array.from({ length: 8 }, (_, k) => <g key={k} transform={`rotate(${k * 45})`}><ellipse cx="0" cy="-36" rx="19" ry="38" style={{ fill, stroke: edge }} /></g>)}
        <circle r="17" className="ct" />
      </g></g>
    </svg>
  )
}
