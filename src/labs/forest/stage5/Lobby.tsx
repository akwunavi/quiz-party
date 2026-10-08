// ═══ Этап 5 · Лобби и рандомайзер ═══
// Настоящее лобби (HostScreen): логотип, чипы подключившихся команд (у отвалившейся — полупрозрачный), «ждём команды…»
// при нуле, QR всегда маленьким в ЛЕВОМ НИЖНЕМ углу (никогда по центру); в режиме «бумага» QR нет. Рандомайзер
// (AdminPage.TeamRandomizer) делит вписанные имена на 2–8 команд и публикует составы — на проекторе они открываются
// окном «Составы команд · N · M чел.» поверх лобби, QR при этом поднимается над затемнением и светится.
// Лес: лобби — это поляна под старым деревом. Команда — цветок: пока никого нет, на поляне спят бутоны; подключившаяся
// команда раскрывает свой бутон, на листе под ним проступает название. QR — на указателе в углу поляны.
// Рандомайзер: имена — семена, кружатся над поляной и ложатся каждый в свою команду; команда расцветает, когда её
// состав собран. Анимация — только показ уже готового результата (состав задан в момент публикации).
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { S1Screen, useEntrance, type S1Props } from '../stage1/common'
import type { Rect } from '../stage1/env'
import { Qr } from '../../magic2/common'
import { ALL, GROUPS, tcol, byId, type T5 } from './data'

export const LOBBY_STATES = [
  { id: 'empty', name: 'Ждём команды: на поляне спят бутоны (0)' },
  { id: 'join', name: 'Подключается команда: бутон раскрывается' },
  { id: 'many', name: 'Много команд, длинные имена, одна отключилась' },
  { id: 'paper', name: 'Игра в баре (бумага): без QR' },
  { id: 'rzgo', name: 'Рандомайзер: составы — 4 команды, 18 человек' },
  { id: 'rzmany', name: 'Рандомайзер: 8 команд, 24 человека' },
  { id: 'rzback', name: 'Составы закрыты: кнопка «Составы», QR подсвечен' },
]
export const LOBBY_VARIANTS = [{ id: 'A', name: 'Поляна под старым деревом', note: 'Лобби — поляна: команда = цветок. Спящие бутоны (0 команд) раскрываются по мере подключения, на листе под цветком — название (длинные переносятся на три строки), отвалившаяся команда бледнеет. QR на указателе в левом нижнем углу, никогда по центру. Рандомайзер: имена-семена кружатся и ложатся по командам, команда расцветает, когда состав собран.' }]

const LEAF = 'M 0 50 C 2 12 28 1 60 2 C 82 3 94 22 100 50 C 94 78 82 97 60 98 C 28 99 2 88 0 50 Z'
type P = { x: number; y: number }
const CAPS = {
  8: (i: number): P => ({ x: 1160 + ((i % 4) - 1.5) * 320 + (i < 4 ? 0 : -150), y: i < 4 ? 440 : 735 }),
  12: (i: number): P => ({ x: 1110 + ((i % 6) - 2.5) * 270, y: i < 6 ? 440 : 735 }),
}

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
const LB_EMPTY: T5 = { id: '-', name: '', color: '#7fa596', hue: 150, alive: true, score: [] }

export function Lobby({ state, nOv, onReady }: S1Props) {
  const rz = state === 'rzgo' || state === 'rzmany'
  const cap = state === 'many' || rz || state === 'rzback' ? 12 : 8
  const present: T5[] = state === 'empty' || state === 'paper' ? [] : state === 'join' ? [byId('t1'), byId('t3'), byId('t5'), byId('t6'), byId('t2')] : ALL.filter(t => t.id !== 't12')
  const joining = state === 'join' ? byId('t12') : null
  const slots = Array.from({ length: cap }, (_, i) => CAPS[cap](i))
  const items: T5[] = [...present, ...(joining ? [joining] : [])]
  const lit = state === 'rzback' || rz
  const groupsN = state === 'rzmany' ? 8 : 4
  const groups = state === 'rzmany' ? GROUPS8 : GROUPS
  const apiRef = useRef<Parameters<S1Props['onReady']>[0] | null>(null)
  const pills = useRef<HTMLElement[]>([])
  const people = groups.flatMap((g, gi) => g.map(name => ({ name, gi })))
  const N = people.length
  const order = people.map((_, i) => (i * 5) % N) // перемешанный порядок посадки
  const listPos = (gi: number, k: number): P => {
    if (groupsN === 4) return { x: 1100 + (gi - 1.5) * 430, y: 520 + k * 54 }
    const col = gi % 4, row = gi < 4 ? 0 : 1
    return { x: 1100 + (col - 1.5) * 430, y: (row ? 760 : 400) + k * 44 }
  }
  const finals = people.map(p => { const k = groups[p.gi].indexOf(p.name); const pos = listPos(p.gi, k); return pos })
  const swirlPos = (i: number, s: number): P => { const a = (order[i] / N) * Math.PI * 2 + s * Math.PI * 6; return { x: 1100 + Math.cos(a) * 560, y: 520 + Math.sin(a) * 250 } }
  const LAND0 = 3.4, STEP = 0.11, DUR = 0.8
  const place = () => {
      const t = apiRef.current?.tl.time() ?? 0
      const s = { swirl: Math.max(0, Math.min(1, (t - 0.9) / (LAND0 + N * STEP + DUR - 0.9))), land: Math.max(0, Math.min(1, (t - LAND0) / (N * STEP + DUR))) }
      pills.current.forEach((el, i) => {
        if (!el) return
        const u = Math.max(0, Math.min(1, (s.land * (N * STEP + DUR) - order[i] * STEP) / DUR)), e = u * u * (3 - 2 * u)
        const sp = swirlPos(i, s.swirl), f = finals[i]
        el.style.transform = `translate(${(sp.x + (f.x - sp.x) * e) - f.x}px, ${(sp.y + (f.y - sp.y) * e) - f.y}px) scale(${0.8 + 0.2 * e})`
        el.style.opacity = String(Math.min(1, s.swirl * 12))
      })
    }
  useEffect(() => { if (!rz) return; gsap.ticker.add(place); return () => gsap.ticker.remove(place) })
  const { root } = useEntrance((a) => { apiRef.current = a; onReady(a) }, (tl, q) => {
    // вход: логотип, цветы вырастают из земли, раскрываются, на листьях проступают имена, указатель опускается
    tl.fromTo(q('.lb-logo .ch'), { opacity: 0, y: 30, rotation: -6 }, { opacity: 1, y: 0, rotation: 0, duration: 0.6, stagger: 0.05, ease: 'back.out(1.8)' }, 0.1)
      .fromTo(q('.lb-sprout'), { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: 0.7, stagger: 0.07, ease: 'back.out(1.5)', transformOrigin: '50% 100%' }, 0.3)
      .fromTo(q('.lb-sprout.open .bl'), { scale: 0.38 }, { scale: 1, svgOrigin: '0 0', duration: 0.8, stagger: 0.07, ease: 'back.out(1.8)' }, 0.9)
      .fromTo(q('.lb-sprout.open .lb-tag'), { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.5, stagger: 0.07, ease: 'power2.out', transformOrigin: '50% 0%' }, 1.3)
      .fromTo(q('.lb-sign'), { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'back.out(1.4)' }, 0.7)
      .fromTo(q('.lb-count, .lb-wait'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, 1.0)
    if (state === 'join') {
      const j = q('.lb-sprout.joining')[0] as HTMLElement | undefined
      tl.addLabel('J', 2.6)
      tl.fromTo(q('.lb-spark'), { opacity: 0, x: 0, y: 0, scale: 0.6 }, { opacity: 1, duration: 0.2, stagger: 0.12 }, 'J')
        .to(q('.lb-spark'), { x: (i: number) => (j ? j.offsetLeft + 75 - 150 : 700) - 200 + i * 0, y: (i: number) => -(300 + i * 30), duration: 1.3, stagger: 0.12, ease: 'sine.inOut' }, 'J+=0.1')
        .to(q('.lb-spark'), { opacity: 0, duration: 0.4 }, 'J+=1.2')
        .fromTo(q('.lb-sprout.joining'), { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.5)', transformOrigin: '50% 100%' }, 'J+=0.9')
        .fromTo(q('.lb-sprout.joining .bl'), { scale: 0.38 }, { scale: 1, svgOrigin: '0 0', duration: 0.9, ease: 'back.out(2)' }, 'J+=1.4')
        .fromTo(q('.lb-sprout.joining .lb-tag'), { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.5, transformOrigin: '50% 0%' }, 'J+=1.9')
        .fromTo(q('.lb-count b'), { scale: 1.8, color: '#ffe2a0' }, { scale: 1, color: '#f4fffa', duration: 0.5 }, 'J+=1.9')
    }
    if (rz) {
      const R = 0.5
      tl.fromTo(q('.rz-veil'), { opacity: 0 }, { opacity: 1, duration: 0.7 }, R)
        .fromTo(q('.rz-head, .rz-grp'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, R + 0.3)
      groups.forEach((g, gi) => {
        const last = Math.max(...g.map(nm => order[people.findIndex(p => p.gi === gi && p.name === nm)])) * STEP + DUR
        tl.fromTo(q(`.rz-grp[data-g="${gi}"] .bl`), { scale: 0.38 }, { scale: 1, svgOrigin: '0 0', duration: 0.7, ease: 'back.out(2)' }, LAND0 + last)
      })
    }
    tl.to({}, { duration: LAND0 + N * STEP + DUR + 0.6 }, 0.1)
  }, null, [state])
  void nOv
  const rects: Rect[] = [{ x: 380, y: 20, w: 1440, h: 200 }, { x: 330, y: 360, w: 1520, h: 560 }]
  return (
    <S1Screen rects={rects} n={null} rootRef={root} cls={`s5 lb lb-${state}`}>
      <h1 className="lb-logo" aria-label="Quiz Party">{'QUIZ PARTY'.split('').map((c, i) => <span key={i} className="ch">{c === ' ' ? ' ' : c}</span>)}</h1>
      <svg className="lb-ground" viewBox="0 0 1920 1080" aria-hidden>
        <ellipse className="clr" cx="1100" cy="700" rx="920" ry="330" />
        <ellipse className="clr2" cx="1100" cy="700" rx="700" ry="240" />
        {Array.from({ length: 22 }, (_, k) => { const a = (k / 22) * Math.PI * 2, x = 1100 + Math.cos(a) * 880, y = 700 + Math.sin(a) * 300; return <g key={k} transform={`translate(${x.toFixed(0)} ${y.toFixed(0)})`}><path className="ms-st" d="M -3 0 L -2 -14 L 2 -14 L 3 0 Z" /><path className="ms-cap" d={`M -12 -12 C -10 -${26 + (k % 3) * 4} 10 -${26 + (k % 3) * 4} 12 -12 Z`} /></g> })}
      </svg>
      {slots.map((p, i) => {
        const t = items[i], open = !!t && t.id !== '-', jn = !!joining && t === joining
        const tm = t ?? LB_EMPTY
        return <div key={i} className={`lb-sprout${open ? ' open' : ' sleep'}${jn ? ' joining' : ''}${open && !tm.alive ? ' dim' : ''}`} style={{ left: p.x - 75, top: p.y - 82 }}>
          <Flower hue={tm.hue} o={open && !jn ? 1 : 0.38} />
          {open && <div className="lb-tag"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden><path d={LEAF} /></svg><span style={{ color: tm.color }}>{tm.name}</span></div>}
        </div>
      })}
      {joining && [0, 1, 2].map(i => <i key={i} className="lb-spark" style={{ left: 190 + i * 10, top: 900 }} />)}
      {state === 'empty' && <div className="lb-wait">ждём команды…</div>}
      {state !== 'empty' && state !== 'paper' && <div className="lb-count">на поляне команд: <b>{items.length}</b></div>}
      {state !== 'paper' && <div className={`lb-sign${lit ? ' lit' : ''}`}><div className="board"><Qr size={196} /><span>Сканируй, чтобы играть</span></div><i className="post" /></div>}
      {(state === 'rzback') && <button type="button" className="lb-grp-btn">СОСТАВЫ КОМАНД</button>}
      {rz && <>
        <div className="rz-veil" />
        <div className="rz-head">Составы команд · {groupsN} · {N} чел.</div>
        {groups.map((g, gi) => { const c = listPos(gi, 0); const hue = ALL[gi].hue; return <div key={gi} className="rz-grp" data-g={gi} style={{ left: c.x - 200, top: groupsN === 4 ? 290 : (gi < 4 ? 205 : 565), width: 400 }}>
          <Flower hue={hue} o={1} /><div className="rz-gn" style={{ color: tcol(hue) }}>Команда {gi + 1}</div>
        </div> })}
        {people.map((p, i) => { const f = finals[i]; return <span key={i} ref={el => { if (el) pills.current[i] = el }} className="rz-n" style={{ left: f.x - 120, top: f.y - 20, width: 240, opacity: 0, borderColor: tcol(ALL[p.gi].hue) }}>{p.name}</span> })}
      </>}
    </S1Screen>
  )
}
/** 8 составов по 3 человека — для плотной проверки рандомайзера */
const NAMES24 = ['Ваня', 'Маша', 'Петя', 'Оля', 'Саша', 'Дима', 'Катя', 'Лёша', 'Настя', 'Женя', 'Кирилл', 'Вера', 'Тимур', 'Аня', 'Гоша', 'Лиза', 'Миша', 'Соня', 'Артём', 'Полина', 'Рома', 'Юля', 'Глеб', 'Ника']
const GROUPS8: string[][] = Array.from({ length: 8 }, (_, g) => NAMES24.filter((_, i) => (i * 7 + 3) % 8 === g))
