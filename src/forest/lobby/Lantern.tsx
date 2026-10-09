// Фонарь-«бутон» команды: стеклянная груша в латунных рёбрах, внутри светится тон команды.
export function Lantern({ hue, id }: { hue: number; id: string }) {
  const c1 = `hsl(${hue} 90% 88%)`, c2 = `hsl(${hue} 78% 62%)`, c3 = `hsl(${hue} 60% 26%)`
  return <svg className="b-lan" viewBox="-60 0 120 170" aria-hidden>
    <defs>
      <radialGradient id={`bl-${id}`} cx="50%" cy="58%" r="60%"><stop offset="0" stopColor="#fffdf0" /><stop offset=".22" stopColor={c1} /><stop offset=".62" stopColor={c2} /><stop offset="1" stopColor={c3} /></radialGradient>
      <radialGradient id={`bg-${id}`}><stop offset="0" stopColor={`hsl(${hue} 95% 76%)`} stopOpacity=".65" /><stop offset="1" stopColor={`hsl(${hue} 95% 60%)`} stopOpacity="0" /></radialGradient>
    </defs>
    <ellipse className="glow" cx="0" cy="92" rx="92" ry="98" fill={`url(#bg-${id})`} />
    <g className="cordg"><line className="cord" x1="0" y1="0" x2="0" y2="34" stroke="#c9a566" strokeWidth="2.4" /></g>
    <g transform="translate(0 34)"><g className="lbody">
      <ellipse cx="0" cy="4" rx="13" ry="5" fill="#8a6428" stroke="#d9b36a" strokeWidth="1.6" />
      <path d="M 0 8 C 32 12 46 54 31 96 C 23 116 9 128 0 134 C -9 128 -23 116 -31 96 C -46 54 -32 12 0 8 Z" fill={`url(#bl-${id})`} stroke="#d9b36a" strokeWidth="2" />
      <g className="ribs" fill="none" stroke="#d9b36a" strokeWidth="1.8" opacity=".85"><path d="M 0 8 C 14 40 14 100 0 134" /><path d="M 0 8 C -14 40 -14 100 0 134" /><path d="M 0 8 C 28 40 30 96 0 134" /><path d="M 0 8 C -28 40 -30 96 0 134" /></g>
      <ellipse cx="-14" cy="44" rx="6" ry="14" fill="#fff" opacity=".35" transform="rotate(14 -14 44)" />
      <path d="M -10 136 L 0 156 L 10 136 Z" fill="#d9b36a" opacity=".9" /><path d="M -18 130 L -14 150 L -6 134 Z M 18 130 L 14 150 L 6 134 Z" fill="#b88c46" opacity=".8" />
    </g></g>
  </svg>
}
