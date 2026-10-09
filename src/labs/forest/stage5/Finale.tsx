// ═══ Этап 5 · Финал ═══
// Настоящий финал (HostScreen.Finale): после последнего ответа — (по галочке) кинематографическая вставка; дальше один из двух
// сценариев. «Бар» — награждение: медали 3 → 2 → 1, потом таблица; «шоу» — нарезка по раундам (победитель каждого раунда по
// 3 секунды), победитель (10 секунд), таблица с разбивкой по раундам; фейерверки. Таблица раскрывается с последнего места.
// Лес: последний ответ — и свет в лесу теплеет, как перед рассветом; на поляне замирают бутоны всех команд; подведение итогов —
// огоньки собираются к центральному бутону; медали — три цветка разной высоты (бронза, серебро, золото) в порядке 3 → 2 → 1;
// победитель — гигантский цветок во всю поляну, лепестки и огоньки; финал — фонари-цветы поднимаются над лесом.
import { useMemo } from 'react'
import { S1Screen, useEntrance, type S1Props } from '../stage1/common'
import type { Rect } from '../stage1/env'
import { Board } from './Board'
import { Flower } from './Lobby'
import { ALL, FINAL, LAST, WIN_ROUNDS, tcol } from './data'

export const FIN_STATES = [
  { id: 'last', name: 'Последний ответ: свет теплеет' },
  { id: 'antic', name: 'Ожидание: огоньки собираются к бутону' },
  { id: 'medals', name: 'Награждение: медали 3 → 2 → 1' },
  { id: 'retro', name: 'Шоу: победитель каждого раунда' },
  { id: 'winner', name: 'Победитель: гигантский цветок' },
  { id: 'table', name: 'Итоговая таблица с разбивкой по раундам' },
  { id: 'party', name: 'Праздник: фонари-цветы над лесом' },
]
export const FIN_VARIANTS = [{ id: 'A', name: 'Рассвет над поляной', note: 'Финал — рассвет: после последнего ответа свет теплеет, огоньки собираются к центральному бутону, награждение — три цветка (бронза, серебро, золото) по порядку 3 → 2 → 1, победитель — гигантский цветок с лучами, праздник — фонари-цветы поднимаются над лесом. Для «шоу»-сценария — нарезка по раундам с победителем каждого, потом таблица с разбивкой.' }]

const TOP = FINAL.slice(0, 3)
const ptsWord = (n: number) => (n % 10 === 1 && n % 100 !== 11 ? 'балл' : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 'балла' : 'баллов')
const rng = (i: number) => (Math.sin(i * 91.7 + 13.1) * 43758.5453) % 1

export function Finale(p: S1Props) {
  if (p.state === 'table') return <Board {...p} state="final" />
  return <FinScene {...p} />
}
function FinScene({ state, onReady }: S1Props) {
  const gold = state === 'winner' || state === 'party' || state === 'medals' || state === 'last'
  const win = FINAL[0].t
  const petals = useMemo(() => Array.from({ length: 46 }, (_, i) => ({ x: 120 + Math.abs(rng(i)) * 1680, d: Math.abs(rng(i + 7)) * 3, s: 0.6 + Math.abs(rng(i + 3)) * 0.9, h: ALL[i % 12].hue, y: 90 + Math.abs(rng(i + 11)) * 880 })), [])
  const { root } = useEntrance(onReady, (tl, q) => {
    if (state === 'last') {
      tl.fromTo(q('.fl-lab, .fl-q'), { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 }, 0.2)
        .fromTo(q('.fl-ans .l'), { opacity: 0, scale: 0.25, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 0.55, stagger: 0.13, ease: 'back.out(2)' }, 1.1)
        .fromTo(q('.fl-vine'), { strokeDashoffset: 1200 }, { strokeDashoffset: 0, duration: 1.6, ease: 'power1.inOut' }, 2.0)
        .fromTo(q('.fl-dawn'), { opacity: 0 }, { opacity: 1, duration: 2.4, ease: 'power1.in' }, 2.4)
        .fromTo(q('.fl-go'), { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.6 }, 3.4)
    }
    if (state === 'antic') {
      tl.fromTo(q('.fl-bud'), { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, stagger: 0.07, ease: 'back.out(1.6)' }, 0.2)
        .fromTo(q('.fl-t1, .fl-t2'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.3 }, 0.6)
        .fromTo(q('.fl-orb'), { x: 0, y: 0, opacity: 0 }, { opacity: 1, x: (i: number) => 0 * i, duration: 0.01 }, 0.8)
      q('.fl-orb').forEach((el, i) => {
        const a = (i / 30) * Math.PI * 2, R = 520 + (i % 5) * 60
        tl.fromTo(el, { x: Math.cos(a) * R, y: Math.sin(a) * R * 0.5 }, { x: 0, y: 0, duration: 2.6, ease: 'power2.in' }, 1.0 + (i % 10) * 0.08)
      })
      tl.fromTo(q('.fl-pod'), { scale: 0.7 }, { scale: 1.1, duration: 3.0, ease: 'power2.in' }, 1.0)
        .fromTo(q('.fl-pod'), { rotation: -3 }, { rotation: 3, duration: 0.12, yoyo: true, repeat: 15, ease: 'none' }, 2.6)
        .fromTo(q('.fl-flash'), { opacity: 0 }, { opacity: 0.9, duration: 0.5, yoyo: true, repeat: 1 }, 4.2)
    }
    if (state === 'medals') {
      ;[2, 1, 0].forEach((k, j) => { const at = 0.5 + j * 1.5
        tl.fromTo(q(`.fl-md[data-k="${k}"] .stem`), { scaleY: 0 }, { scaleY: 1, duration: 0.7, ease: 'power2.out', transformOrigin: '50% 100%' }, at)
          .fromTo(q(`.fl-md[data-k="${k}"] .bl`), { scale: 0.2 }, { scale: 1, svgOrigin: '0 0', duration: 0.9, ease: 'back.out(1.8)' }, at + 0.5)
          .fromTo(q(`.fl-md[data-k="${k}"] .disc, .fl-md[data-k="${k}"] .nm, .fl-md[data-k="${k}"] .pt`), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.12 }, at + 1.1) })
    }
    if (state === 'retro') {
      WIN_ROUNDS.forEach((_, i) => tl.fromTo(q(`.fl-rc[data-i="${i}"]`), { opacity: 0, y: 40, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.5)' }, 0.4 + i * 0.7)
        .fromTo(q(`.fl-rc[data-i="${i}"] .win`), { color: '#f4fff9' }, { color: '#ffe2a0', duration: 0.5 }, 0.8 + i * 0.7))
    }
    if (state === 'winner') {
      tl.fromTo(q('.fl-rays'), { opacity: 0, rotation: -30 }, { opacity: 1, rotation: 0, duration: 2.0, ease: 'power2.out' }, 0.1)
        .fromTo(q('.fl-big .stem'), { scaleY: 0 }, { scaleY: 1, duration: 0.8, ease: 'power2.out', transformOrigin: '50% 100%' }, 0.3)
        .fromTo(q('.fl-big .bl'), { scale: 0.15 }, { scale: 1, svgOrigin: '0 0', duration: 1.6, ease: 'back.out(1.5)' }, 0.9)
        .fromTo(q('.fl-w1'), { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.7 }, 2.0)
        .fromTo(q('.fl-w2 .ch'), { opacity: 0, y: 30, rotation: -6 }, { opacity: 1, y: 0, rotation: 0, duration: 0.6, stagger: 0.04, ease: 'back.out(1.8)' }, 2.3)
        .fromTo(q('.fl-w3'), { opacity: 0 }, { opacity: 1, duration: 0.7 }, 3.2)
        .fromTo(q('.fl-pet'), { opacity: 0, y: -80 }, { opacity: 0.95, y: (i: number) => 120 + (i % 7) * 120, rotation: (i: number) => (i % 2 ? 160 : -160), duration: 3.4, stagger: 0.07, ease: 'sine.out' }, 2.2)
    }
    if (state === 'party') {
      tl.fromTo(q('.fl-lant'), { y: 1200, opacity: 0 }, { y: 0, opacity: 1, duration: 3.6, stagger: 0.12, ease: 'power2.out' }, 0.2)
        .fromTo(q('.fl-th .ch'), { opacity: 0, y: 36, rotation: -7 }, { opacity: 1, y: 0, rotation: 0, duration: 0.6, stagger: 0.05, ease: 'back.out(1.8)' }, 1.0)
        .fromTo(q('.fl-pod3 > *'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.2 }, 2.4)
      q('.fl-fw').forEach((el, i) => tl.fromTo(el, { scale: 0, opacity: 1 }, { scale: 1, duration: 1.1, ease: 'power2.out' }, 1.2 + i * 0.5).to(el, { opacity: 0.0, duration: 1.2 }, 1.9 + i * 0.5))
    }
  }, null, [state])
  const rects: Rect[] = [{ x: 300, y: 200, w: 1400, h: 700 }]
  const letters = LAST.answer.toUpperCase().split('')
  return (
    <S1Screen rects={rects} n={null} rootRef={root} cls={`s5 fl fl-${state}`} moodOverride={gold ? 'warning' : undefined}>
      {state === 'last' && <>
        <div className="fl-dawn" />
        <div className="fl-lab" style={{ left: 120, width: 1500, top: 120 }}>Последний ответ · раунд {LAST.round} · вопрос {LAST.q} из {LAST.of}</div>
        <div className="fl-q" style={{ left: 120, width: 1500, top: 180 }}>{LAST.text}</div>
        <div className="fl-ans" style={{ left: 120, width: 1500, top: 380 }}>{letters.map((c, i) => <span key={i} className="l">{c}</span>)}</div>
        <svg className="fl-svg" viewBox="0 0 1920 1080" aria-hidden><path className="fl-vine" d="M 220 740 C 520 790 760 700 1020 750 S 1500 800 1780 740" /></svg>
        <div className="fl-go">Подводим итоги →</div>
      </>}
      {state === 'antic' && <>
        <div className="fl-t1" style={{ left: 300, width: 1500, top: 90 }}>Подводим итоги</div>
        <div className="fl-t2" style={{ left: 300, width: 1500, top: 190 }}>Скоро объявим победителей</div>
        {ALL.map((t, i) => { const a = (i / 12) * Math.PI * 2 - Math.PI / 2; return <div key={t.id} className="fl-bud" style={{ left: 1100 + Math.cos(a) * 640 - 40, top: 590 + Math.sin(a) * 300 - 40 }}><Flower hue={t.hue} o={0.38} /></div> })}
        <div className="fl-pod" style={{ left: 1100 - 90, top: 590 - 100 }}><Flower hue={46} o={0.5} /></div>
        {Array.from({ length: 30 }, (_, i) => <i key={i} className="fl-orb" style={{ left: 1100 - 9, top: 590 - 9 }} />)}
        <div className="fl-flash" />
      </>}
      {state === 'medals' && <>
        <div className="fl-t1" style={{ left: 300, width: 1500, top: 50 }}>Награждение</div>
        {[[1, 560, 330], [0, 1100, 250], [2, 1640, 420]].map(([k, x, y]) => { const r = TOP[k], med = ['gold', 'silver', 'bronze'][k]; return <div key={k} className="fl-md" data-k={k} style={{ left: x - 200, top: 0, width: 400 }}>
          <div className="stem" style={{ left: 197, top: y + 90, height: 720 - y }} />
          <div className="fl-fw1" style={{ left: 100, top: y - 100 }}><Flower hue={r.t.hue} o={1} /></div>
          <div className={`disc ${med}`} style={{ left: 160, top: y - 10 }}>{k + 1}</div>
          <div className="nm" style={{ top: 800, color: r.t.color }}>{r.t.name}</div><div className="pt" style={{ top: 800 + (r.t.name.length > 20 ? 118 : 70) }}>{r.sum} {ptsWord(r.sum)}</div>
        </div> })}
      </>}
      {state === 'retro' && <>
        <div className="fl-t1" style={{ left: 300, width: 1500, top: 60 }}>Победители раундов</div>
        <svg className="fl-svg" viewBox="0 0 1920 1080" aria-hidden><path className="fl-limb" d="M 70 380 C 500 340 1400 420 1850 360" /></svg>
        {WIN_ROUNDS.map((w, i) => <div key={i} className="fl-rc" data-i={i} style={{ left: 60 + i * 300, top: 400 }}>
          <i className="cord" /><b className="rn">{w.round.n}</b><span className="rname">{w.round.name}</span>
          <span className="win" style={{ color: w.team.color }}>{w.team.name}</span><em>{w.pts} {ptsWord(w.pts)}</em>
        </div>)}
      </>}
      {state === 'winner' && <>
        <svg className="fl-rays" viewBox="-960 -540 1920 1080" aria-hidden>{Array.from({ length: 16 }, (_, k) => <path key={k} d="M 0 0 L -60 -1200 L 60 -1200 Z" transform={`rotate(${k * 22.5})`} />)}</svg>
        <div className="fl-w1" style={{ left: 300, width: 1500, top: 60 }}>ПОБЕДИТЕЛЬ</div>
        <div className="fl-big" style={{ left: 1100 - 330, top: 150 }}><div className="stem" /><Flower hue={46} o={1} /></div>
        <div className="fl-w2" style={{ left: 300, width: 1500, top: 700, fontSize: win.name.length > 20 ? 64 : 100 }}>{win.name.split('').map((c, i) => <span key={i} className="ch">{c === ' ' ? ' ' : c}</span>)}</div>
        <div className="fl-w3" style={{ left: 300, width: 1500, top: 880 }}>{FINAL[0].sum} {ptsWord(FINAL[0].sum)}</div>
        {petals.map((q, i) => <i key={i} className="fl-pet" style={{ left: q.x, top: -40, ['--h' as string]: q.h, transform: `scale(${q.s})` }} />)}
      </>}
      {state === 'party' && <>
        {Array.from({ length: 5 }, (_, i) => <div key={i} className="fl-fw" style={{ left: 260 + i * 350, top: 180 + (i % 2) * 150 }}>{Array.from({ length: 14 }, (_, k) => <i key={k} style={{ transform: `rotate(${k * 25.7}deg) translateY(-110px)`, background: tcol(ALL[(i * 3 + k) % 12].hue) }} />)}</div>)}
        {petals.slice(0, 26).map((q, i) => <div key={i} className="fl-lant" style={{ left: q.x, top: q.y, transform: `scale(${q.s * 0.9})` }}><Flower hue={q.h} o={1} /></div>)}
        <div className="fl-th" style={{ left: 300, width: 1500, top: 380 }}>{'Спасибо за игру!'.split('').map((c, i) => <span key={i} className="ch">{c === ' ' ? ' ' : c}</span>)}</div>
        <div className="fl-pod3" style={{ left: 300, width: 1500, top: 560 }}>{TOP.map((r, k) => <span key={k} style={{ color: r.t.color }}><b>{k + 1}</b>{r.t.name}</span>)}</div>
      </>}
    </S1Screen>
  )
}
