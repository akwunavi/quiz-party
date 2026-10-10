// ═══ Лобби «Полуночный праздник»: неподвижная сцена (разметка без анимации) ═══
// Утверждённая композиция B: Лунные ворота, верёвки с огоньками, фонари команд, логотип на гирлянде, стенд с QR.
// Анимации — в fx.ts; здесь только то, что стоит в кадре. Лаборатория и игра рисуют одно и то же.
import type { ReactNode } from 'react'
import { ForestBackdrop } from '../stage1/env'
import { useInShell } from '../shell'
import { tcol } from '../util'
import { Lantern } from './Lantern'
import { GATE, LOGO, ringPts, swagY, cometPath, ropeY, PL, PR, type LayoutB } from './geom'

export type LobbyTeam = { id: string; name: string; hue: number; alive: boolean }

export function LobbyScene({ teams, layout, fresh, qr, qrLit, litN, wait, rootRef, children }: {
  teams: LobbyTeam[]
  layout: LayoutB
  /** команды, которые придут анимацией (до неё скрыты) */
  fresh: ReadonlySet<string>
  /** QR-код (null — нет: бумага); рисуется на ровной светлой плите, без искажений */
  qr: ReactNode | null
  qrLit: boolean
  /** сколько огней на кольце горит в начальном кадре */
  litN: number
  /** ноль команд: короткая подпись «ждём команды…» */
  wait: boolean
  rootRef: React.RefObject<HTMLDivElement>
  children?: ReactNode
}) {
  const inShell = useInShell()
  const { slots, ropes, sc, nameW } = layout
  const bulbs = [-1, 1].flatMap(side => ropes.flatMap((_, k) => Array.from({ length: 9 }, (_, j) => {
    const px = side < 0 ? PL : PR, x = px + side * (40 + j * 76)
    return { x, y: ropeY(ropes, side as -1 | 1, k, x) + 4, o: k * 9 + j + (side < 0 ? 0 : 1) }
  }))).sort((a, b) => a.o - b.o)
  const stones = Array.from({ length: 9 }, (_, i) => { const t = i / 8; return { x: 960 + (i % 2 ? 14 : -14) * (1 - t * 0.4), y: 1040 - t * 190, w: 120 - t * 70, h: 24 - t * 12 } })
  const lit = litN
  return (
    <div className="lb3 lb3-b s1" ref={rootRef}>
      {!inShell && <ForestBackdrop rects={[]} hazeK={0} />}
      <div className="b-grade" />
      <svg className="lb3-bg b-bg" viewBox="0 0 1920 1080" aria-hidden>
        <defs>
          <radialGradient id="bMoonG"><stop offset="0" stopColor="#fff7dc" stopOpacity=".95" /><stop offset=".3" stopColor="#ffe6a8" stopOpacity=".5" /><stop offset="1" stopColor="#ffe6a8" stopOpacity="0" /></radialGradient>
          <radialGradient id="bMoon" cx="40%" cy="38%" r="70%"><stop offset="0" stopColor="#fffdf2" /><stop offset=".6" stopColor="#f3e2ae" /><stop offset="1" stopColor="#c9b27a" /></radialGradient>
          <linearGradient id="bWood" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#1a0f08" /><stop offset=".35" stopColor="#6b4526" /><stop offset=".6" stopColor="#4a2e18" /><stop offset="1" stopColor="#140b06" /></linearGradient>
          <linearGradient id="bText" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fffbe6" /><stop offset=".5" stopColor="#ffe29a" /><stop offset="1" stopColor="#f0b350" /></linearGradient>
          <radialGradient id="bPool"><stop offset="0" stopColor="#ffd98a" stopOpacity=".5" /><stop offset="1" stopColor="#ffd98a" stopOpacity="0" /></radialGradient>
          <radialGradient id="bGoldG"><stop offset="0" stopColor="#ffd68a" stopOpacity=".3" /><stop offset="1" stopColor="#ffd68a" stopOpacity="0" /></radialGradient>
          <filter id="bBlur2"><feGaussianBlur stdDeviation="5" /></filter>
          <filter id="bNoise" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.02 0.3" numOctaves="3" seed="3" /><feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 2.4 -1" /></filter>
        </defs>
        {/* луна и её свет */}
        <circle cx={GATE.x} cy={GATE.y} r="430" fill="url(#bMoonG)" opacity=".5" />
        <g transform={`translate(${GATE.x} ${GATE.y})`}><g className="b-moon">
          <circle r="210" fill="url(#bMoon)" />
          <circle cx="-70" cy="-50" r="34" fill="#cdb67f" opacity=".5" /><circle cx="50" cy="40" r="52" fill="#cdb67f" opacity=".38" /><circle cx="-20" cy="96" r="22" fill="#cdb67f" opacity=".45" /><circle cx="94" cy="-84" r="20" fill="#cdb67f" opacity=".4" />
        </g></g>
        {/* дорожка из тёплых камней */}
        {stones.map((s, i) => <g className="b-stones" key={i}><ellipse cx={s.x} cy={s.y} rx={s.w} ry={s.h} fill="#17352c" stroke="#0a1d17" strokeWidth="2" /><ellipse className="b-stone" cx={s.x} cy={s.y} rx={s.w * 0.9} ry={s.h * 0.8} fill="url(#bPool)" opacity={i < 2 + Math.min(1, teams.length / 12) * 7 ? 0.9 : 0.18} /></g>)}
        {/* Лунные ворота: столбы и плетёное кольцо */}
        <g className="b-ringg">
          {[PL, PR].map((x, i) => <g key={i}><rect x={x - 32} y="250" width="64" height="590" rx="14" fill="url(#bWood)" />
            {[0, 1, 2, 3, 4, 5, 6].map(j => <path key={j} d={`M ${x - 32} ${300 + j * 80} h 64`} stroke="#0a0502" strokeWidth="3" opacity=".6" />)}
            <rect x={x - 32} y="250" width="64" height="590" rx="14" filter="url(#bNoise)" opacity=".5" />
            <rect x={x - 42} y="236" width="84" height="26" rx="10" fill="#8a6428" stroke="#d9b36a" strokeWidth="2.4" /><rect x={x - 42} y="826" width="84" height="26" rx="10" fill="#8a6428" stroke="#d9b36a" strokeWidth="2.4" /></g>)}
          <ellipse cx={GATE.x} cy={GATE.y} rx={GATE.rx} ry={GATE.ry} fill="none" stroke="#0e0804" strokeWidth="38" />
          <ellipse cx={GATE.x} cy={GATE.y} rx={GATE.rx} ry={GATE.ry} fill="none" stroke="url(#bWood)" strokeWidth="30" />
          {[0, 1, 2].map(j => <ellipse key={j} cx={GATE.x} cy={GATE.y} rx={GATE.rx + (j - 1) * 7} ry={GATE.ry + (j - 1) * 7} fill="none" stroke={j === 1 ? '#9b6a3a' : '#2f1c0e'} strokeWidth="3" strokeDasharray={j === 1 ? '70 22' : '40 40'} opacity=".8" />)}
          {ringPts.filter((_, i) => i % 2 === 0).map((p, i) => <g key={`l${i}`} transform={`translate(${p.x} ${p.y}) rotate(${(i * 47) % 360})`}><ellipse cx="14" cy="-6" rx="15" ry="6" fill="#2f7a4a" stroke="#144a2a" strokeWidth="1.2" /><ellipse cx="-12" cy="7" rx="12" ry="5" fill="#3f9a5c" stroke="#144a2a" strokeWidth="1.2" /></g>)}
          {ringPts.map((p, i) => <g key={i} transform={`translate(${p.x} ${p.y})`}><circle className={`b-rb${i < lit ? ' on' : ''}`} r="8" fill="#ffe2a0" opacity={i < lit ? 1 : 0.28} style={{ filter: 'drop-shadow(0 0 7px #ffc766)' }} /></g>)}
        </g>
        {/* верёвки с огоньками */}
        <g className="b-ropes" fill="none" stroke="#c9a566" strokeWidth="2.4" opacity=".85">
          {[-1, 1].flatMap(side => ropes.map((_, k) => {
            const px = side < 0 ? PL : PR, ex = side < 0 ? -30 : 1950
            const pts = Array.from({ length: 21 }, (_, j) => { const x = px + (ex - px) * (j / 20); return `${x.toFixed(0)} ${ropeY(ropes, side as -1 | 1, k, x).toFixed(0)}` })
            return <path key={`${side}${k}`} d={`M ${pts.join(' L ')}`} />
          }))}
        </g>
        {bulbs.map((b, i) => <circle key={i} className="b-bulb" cx={b.x} cy={b.y} r="4.5" fill="#ffe2a0" opacity={i < 10 + teams.length * 4 ? 0.9 : 0.25} style={{ filter: 'drop-shadow(0 0 6px #ffc766)' }} />)}
        {slots.map((s, i) => <ellipse key={`p${teams[i].id}`} cx={s.x} cy={s.ay + 80} rx="140" ry="120" fill="url(#bPool)" opacity=".35" />)}
        <g className="b-gold" opacity="0"><ellipse cx="960" cy={GATE.y} rx="980" ry="500" fill="url(#bGoldG)" /></g>
        {/* искры: путь из лунного круга к верёвке (рисуются только при прибытии) */}
        {slots.map((s, i) => <path key={`k${teams[i].id}`} className="b-spark" data-id={teams[i].id} d={cometPath(s.x, s.ay)} pathLength={1} fill="none" stroke="#fff6cf" strokeWidth="7" strokeLinecap="round" strokeDasharray="0.07 1.2" opacity="0" style={{ filter: 'drop-shadow(0 0 10px #ffd37a)' }} />)}
        {/* логотип на гирлянде */}
        <g className="b-logo">
          <path className="b-swag" d="M 380 66 C 640 140 1280 140 1540 66" fill="none" stroke="#c9a566" strokeWidth="3" />
          {Array.from({ length: 15 }, (_, i) => { const t = i / 14, x = 380 + t * 1160, y = 66 + Math.sin(t * Math.PI) * 54 + 4; return <circle key={i} className="b-swag" cx={x} cy={y + 2} r="5" fill="#ffe2a0" style={{ filter: 'drop-shadow(0 0 6px #ffc766)' }} /> })}
          {LOGO.map(l => <g key={l.i}>
            <line className="b-cordL" x1={l.x} y1={swagY(l.x) + 2} x2={l.x} y2="112" stroke="#c9a566" strokeWidth="2" />
            <text className="b-letter-glow" x={l.x} y="214" textAnchor="middle" fontFamily="Philosopher, sans-serif" fontWeight="700" fontSize="170" fill="#ffd98a" filter="url(#bBlur2)" opacity=".85">{l.c}</text>
            <text className="b-letter" x={l.x} y="214" textAnchor="middle" fontFamily="Philosopher, sans-serif" fontWeight="700" fontSize="170" fill="url(#bText)" stroke="#8a5a22" strokeWidth="3">{l.c}</text>
          </g>)}
        </g>
      </svg>
      {/* стенд с QR: ровная светлая плита, рядом — короткая подпись. Модули QR не анимируются и не накрываются. */}
      {qr && <div className="b-stand" style={{ left: 64, top: 806, ['--lit' as string]: qrLit ? 1 : 0.3 }}>
        <svg viewBox="0 0 270 270" aria-hidden>
          <ellipse className="b-aura" cx="135" cy="125" rx="200" ry="170" fill="url(#bPool)" opacity={qrLit ? 1 : 0} />
          <rect x="14" y="6" width="242" height="256" rx="18" fill="#2a1a0e" stroke="#d9b36a" strokeWidth="4" />
          <rect x="14" y="6" width="242" height="256" rx="18" fill="none" stroke="#ffe2a0" strokeWidth="2" opacity="var(--lit)" style={{ filter: 'drop-shadow(0 0 8px #ffc766)' }} />
          {[34, 80, 135, 190, 236].map((x, i) => <circle key={i} cx={x} cy={i % 2 ? 16 : 20} r="4.5" fill="#ffe2a0" opacity=".75" style={{ filter: 'drop-shadow(0 0 5px #ffc766)' }} />)}
        </svg>
        <div className="b-qrbox">{qr}</div>
        <div className="b-qrcap">Сканируй, чтобы играть</div>
      </div>}
      {/* команды: фонарь на шнуре от верёвки, имя — снаружи */}
      {slots.map((s, i) => { const t = teams[i]
        return <div key={t.id} className={`b-team side${s.side < 0 ? 'L' : 'R'}${fresh.has(t.id) ? ' fresh' : ''}`} data-id={t.id}
          style={{ left: s.x, top: s.ay, ['--tc' as string]: tcol(t.hue), ['--sc' as string]: sc, ['--nm' as string]: `${t.name.length > 26 ? Math.round(layout.fs * 0.84) : layout.fs}px`, ['--nw' as string]: `${nameW}px` }}>
          <div className="b-scale"><Lantern hue={t.hue} id={t.id} /></div><div className="nm"><span>{t.name}</span></div>
        </div> })}
      {wait && <div className="b-wait">ждём команды…</div>}
      {children}
    </div>
  )
}
