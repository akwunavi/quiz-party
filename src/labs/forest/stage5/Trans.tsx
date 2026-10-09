// ═══ Этап 5 · Переходы ═══
// Между экранами игры (лобби → правила → раунд → табло → перерыв → финал) — короткая вставка 1.2–1.8 с, устройства леса поверх
// двух экранов: плющ-занавес, ветер с листьями, вспышка светлячков, лепестки, туман, раскрывающийся цветок.
// В боевой игре под вставкой стоят настоящие экраны; здесь они — две карточки-заглушки с подписью.
import { useMemo } from 'react'
import { S1Screen, useEntrance, type S1Props } from '../stage1/common'
import type { Rect } from '../stage1/env'

export const TRANS_STATES = [
  { id: 'vine', name: 'Плющ-занавес: лобби → правила' },
  { id: 'wind', name: 'Ветер с листьями: правила → вступление раунда' },
  { id: 'fly', name: 'Вспышка светлячков: вступление → вопрос' },
  { id: 'petal', name: 'Лепестки: разбор → табло' },
  { id: 'mist', name: 'Туман: табло → перерыв' },
  { id: 'bloom', name: 'Раскрывающийся цветок: последний ответ → финал' },
]
export const TRANS_VARIANTS = [{ id: 'A', name: 'Устройства леса', note: 'Шесть коротких вставок между экранами. Под вставкой в игре стоят настоящие экраны; в лаборатории — две карточки с подписью. Перемотайте таймлайн, чтобы увидеть середину перехода — когда один экран уже скрыт, а второй ещё не показан.' }]

const PAIRS: Record<string, [string, string]> = {
  vine: ['Лобби', 'Правила игры'], wind: ['Правила игры', 'Раунд 3 · Своя игра'], fly: ['Раунд 3 · Своя игра', 'Вопрос 1'],
  petal: ['Разбор ответов', 'Табло'], mist: ['Табло', 'Перерыв'], bloom: ['Последний ответ', 'Итоги игры'],
}
const rng = (i: number) => Math.abs((Math.sin(i * 91.7 + 13.1) * 43758.5453) % 1)

export function Trans({ state, onReady }: S1Props) {
  const [from, to] = PAIRS[state] ?? PAIRS.vine
  const bits = useMemo(() => Array.from({ length: 40 }, (_, i) => ({ y: 60 + rng(i) * 960, d: rng(i + 5) * 0.5, s: 0.7 + rng(i + 9), r: rng(i + 3) * 360 })), [])
  const { root } = useEntrance(onReady, (tl, q) => {
    // карточки: «было» на 0–0.7 c, «стало» с середины вставки; сам переход стартует с 0.7
    tl.set(q('.tr-b'), { opacity: 0 }, 0)
    const T = 0.9
    if (state === 'vine') {
      tl.fromTo(q('.tr-vine path'), { strokeDashoffset: 1400 }, { strokeDashoffset: 0, duration: 0.7, stagger: 0.06, ease: 'power2.out' }, T)
        .fromTo(q('.tr-veil'), { opacity: 0 }, { opacity: 1, duration: 0.4 }, T + 0.5)
        .set(q('.tr-a'), { opacity: 0 }, T + 0.9).set(q('.tr-b'), { opacity: 1 }, T + 0.9)
        .to(q('.tr-vine path'), { strokeDashoffset: -1400, duration: 0.7, stagger: 0.06, ease: 'power2.in' }, T + 1.0)
        .to(q('.tr-veil'), { opacity: 0, duration: 0.5 }, T + 1.1)
    }
    if (state === 'wind') {
      tl.fromTo(q('.tr-leaf'), { x: -400, opacity: 0, rotation: (i: number) => i * 40 }, { x: 2400, opacity: 1, rotation: (i: number) => i * 40 + 540, duration: 1.5, stagger: 0.03, ease: 'power1.inOut' }, T)
        .to(q('.tr-a'), { opacity: 0, x: 120, duration: 0.5 }, T + 0.5)
        .fromTo(q('.tr-b'), { opacity: 0, x: -120 }, { opacity: 1, x: 0, duration: 0.5 }, T + 0.75)
    }
    if (state === 'fly') {
      q('.tr-orb').forEach((el, i) => tl.fromTo(el, { x: 0, y: 0, opacity: 1, scale: 0.4 }, { x: Math.cos(i) * (300 + (i % 7) * 120), y: Math.sin(i) * (200 + (i % 5) * 90), scale: 1.2, duration: 0.9, ease: 'power2.out' }, T).to(el, { opacity: 0, duration: 0.6 }, T + 0.8))
      tl.fromTo(q('.tr-flash'), { opacity: 0 }, { opacity: 0.95, duration: 0.35, yoyo: true, repeat: 1 }, T + 0.5)
        .set(q('.tr-a'), { opacity: 0 }, T + 0.85).set(q('.tr-b'), { opacity: 1 }, T + 0.85)
    }
    if (state === 'petal') {
      tl.fromTo(q('.tr-pet'), { x: -200, opacity: 0 }, { x: (i: number) => 2100 + (i % 4) * 80, opacity: 1, y: (i: number) => bits[i].y + 140, rotation: (i: number) => bits[i].r + 500, duration: 1.7, stagger: 0.025, ease: 'sine.inOut' }, T)
        .to(q('.tr-a'), { opacity: 0, scale: 0.94, duration: 0.5 }, T + 0.5)
        .fromTo(q('.tr-b'), { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: 0.5 }, T + 0.8)
    }
    if (state === 'mist') {
      tl.fromTo(q('.tr-fog'), { xPercent: -110 }, { xPercent: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out' }, T)
        .set(q('.tr-a'), { opacity: 0 }, T + 0.9).set(q('.tr-b'), { opacity: 1 }, T + 0.9)
        .to(q('.tr-fog'), { xPercent: 110, duration: 0.8, stagger: 0.1, ease: 'power2.in' }, T + 1.0)
    }
    if (state === 'bloom') {
      tl.fromTo(q('.tr-iris'), { scale: 0 }, { scale: 1, duration: 1.0, ease: 'power2.in' }, T)
        .fromTo(q('.tr-iris'), { rotation: 0 }, { rotation: 90, duration: 1.8, ease: 'none' }, T)
        .set(q('.tr-a'), { opacity: 0 }, T + 1.0).set(q('.tr-b'), { opacity: 1 }, T + 1.0)
        .to(q('.tr-iris'), { scale: 3.2, opacity: 0, duration: 0.8, ease: 'power2.out' }, T + 1.0)
    }
    tl.to({}, { duration: 0.5 }, T + 2.3)
  }, null, [state])
  const rects: Rect[] = [{ x: 300, y: 300, w: 1400, h: 400 }]
  return (
    <S1Screen rects={rects} n={null} rootRef={root} cls={`s5 tr tr-${state}`}>
      <div className="tr-card tr-a"><i>было</i><b>{from}</b></div>
      <div className="tr-card tr-b"><i>стало</i><b>{to}</b></div>
      {state === 'vine' && <><div className="tr-veil" /><svg className="tr-vine" viewBox="0 0 1920 1080" aria-hidden>{Array.from({ length: 7 }, (_, i) => <path key={i} d={`M ${130 + i * 280} -20 C ${60 + i * 280} 260 ${230 + i * 280} 420 ${130 + i * 280} 560 S ${60 + i * 280} 860 ${150 + i * 280} 1100`} />)}</svg></>}
      {state === 'wind' && bits.slice(0, 26).map((b, i) => <i key={i} className="tr-leaf" style={{ top: b.y, transform: `scale(${b.s})` }} />)}
      {state === 'fly' && <><div className="tr-flash" />{Array.from({ length: 36 }, (_, i) => <i key={i} className="tr-orb" style={{ left: 960, top: 540 }} />)}</>}
      {state === 'petal' && bits.map((b, i) => <i key={i} className="tr-pet" style={{ top: b.y - 140, ['--h' as string]: (i * 37) % 360 }} />)}
      {state === 'mist' && [0, 1, 2, 3].map(i => <div key={i} className="tr-fog" style={{ top: i * 270 }} />)}
      {state === 'bloom' && <svg className="tr-iris" viewBox="-300 -300 600 600" aria-hidden>{Array.from({ length: 8 }, (_, i) => <g key={i} transform={`rotate(${i * 45})`}><ellipse className="p" cx="0" cy="-150" rx="60" ry="150" /></g>)}<circle r="46" fill="#f0c055" /></svg>}
    </S1Screen>
  )
}
