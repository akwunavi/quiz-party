// ═══ Этап 5 · Финал ═══
// Настоящий финал (HostScreen.Finale): после последнего ответа — (по галочке) кинематографическая вставка; дальше один из двух
// сценариев. «Бар» — награждение: медали 3 → 2 → 1, потом таблица; «шоу» — нарезка по раундам (победитель каждого раунда по
// 3 секунды), победитель (10 секунд), таблица с разбивкой по раундам; фейерверки. Таблица раскрывается с последнего места.
// Лес: последний ответ — и свет в лесу теплеет, как перед рассветом; на поляне замирают бутоны всех команд; подведение итогов —
// огоньки собираются к центральному бутону; медали — три цветка разной высоты (бронза, серебро, золото) в порядке 3 → 2 → 1;
// победитель — гигантский цветок во всю поляну, лепестки и огоньки; финал — фонари-цветы поднимаются над лесом.
// Сцена рисует только то, что ей дали (FinView): лаборатория — тестовый вечер (labs/forest/stage5Lab.tsx), игра — настоящие
// места и очки из боевого финала (forest/stage5/game5.tsx). Таймлайн — finBuild; в игре шаги (новая медаль, новая карточка)
// доигрываются по одному (`only`).
import { useLayoutEffect, useMemo } from 'react'
import { S1Screen } from '../stage1/common'
import type { Rect } from '../stage1/env'
import { useFontsReady } from '../stage1/gameHooks'
import { Flower } from './Flower'
import { ptsWord, retroLayout, type PodiumSlot } from './views'
import { tcol } from '../util'

export type FinTeam = { name: string; color: string }
export type FinView =
  | { state: 'last'; round: number | string; q: number; of: number; text: string; answer: string }
  | { state: 'antic'; hues: number[]; title?: string; sub?: string; clock?: string }
  | { state: 'medals'; slots: PodiumSlot[] }
  | { state: 'retro'; cards: { n: string; name: string; team: FinTeam | null; pts: number }[]; /** игра: сколько карточек уже вышло (остальные места пустые) */ shown?: number }
  | { state: 'winner'; names: FinTeam[]; sum: number; hues: number[] }
  | { state: 'party'; hues: number[]; top: FinTeam[] }
  | { state: 'break'; clock: string; sub: string }

const rng = (i: number) => (Math.sin(i * 91.7 + 13.1) * 43758.5453) % 1
const HUES0 = [32, 352, 205, 150, 270, 12, 185, 48, 320, 95, 228, 0]
const hueAt = (hues: number[], i: number) => (hues.length ? hues[i % hues.length] : HUES0[i % 12])

/** Таймлайн финала. `only` (игра): медали — только слот k, ретро — только карточка i (остальные уже стоят). */
export function finBuild(tl: gsap.core.Timeline, q: (s: string) => Element[], v: FinView, only?: number) {
  const state = v.state
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
    const order = only === undefined ? [2, 1, 0] : [only]
    order.forEach((k, j) => { const at = 0.5 + j * 1.5
      tl.fromTo(q(`.fl-md[data-k="${k}"] .stem`), { scaleY: 0 }, { scaleY: 1, duration: 0.7, ease: 'power2.out', transformOrigin: '50% 100%' }, at)
        .fromTo(q(`.fl-md[data-k="${k}"] .bl`), { scale: 0.2 }, { scale: 1, svgOrigin: '0 0', duration: 0.9, ease: 'back.out(1.8)' }, at + 0.5)
        .fromTo(q(`.fl-md[data-k="${k}"] .disc, .fl-md[data-k="${k}"] .nm, .fl-md[data-k="${k}"] .pt`), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.12 }, at + 1.1) })
  }
  if (state === 'retro') {
    v.cards.forEach((_, i) => { if (only !== undefined && i !== only) return
      const at = only === undefined ? i : 0
      tl.fromTo(q(`.fl-rc[data-i="${i}"]`), { opacity: 0, y: 40, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.5)' }, 0.4 + at * 0.7)
        .fromTo(q(`.fl-rc[data-i="${i}"] .win`), { color: '#f4fff9' }, { color: '#ffe2a0', duration: 0.5 }, 0.8 + at * 0.7) })
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
  if (state === 'break') {
    tl.fromTo(q('.fl-t1, .fl-t2'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.3 }, 0.2)
      .fromTo(q('.fl-clock'), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.6)' }, 0.6)
  }
}

const letters = (s: string) => s.split('').map((c, i) => <span key={i} className="ch">{c === ' ' ? ' ' : c}</span>)

export function FinScreen({ v, rootRef }: { v: FinView; rootRef: React.RefObject<HTMLDivElement> }) {
  const state = v.state
  const gold = state === 'winner' || state === 'party' || state === 'medals' || state === 'last'
  const hues = 'hues' in v ? v.hues : []
  const hk = hues.join(',')
  const petals = useMemo(() => Array.from({ length: 46 }, (_, i) => ({ x: 120 + Math.abs(rng(i)) * 1680, d: Math.abs(rng(i + 7)) * 3, s: 0.6 + Math.abs(rng(i + 3)) * 0.9, h: hueAt(hues, i), y: 90 + Math.abs(rng(i + 11)) * 880 })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hk])
  const fonts = useFontsReady()
  const key = JSON.stringify(v)
  // Вписывание настоящих имён (лабораторные влезают — ничего не меняется): медали — имена над очками,
  // победитель — во всю ширину, ретро — название раунда и команды внутри карточки.
  useLayoutEffect(() => {
    const el = rootRef.current
    if (!el) return
    el.querySelectorAll<HTMLElement>('.fl-md').forEach(md => {
      const nm = md.querySelector<HTMLElement>('.nm'), pt = md.querySelector<HTMLElement>('.pt')
      if (!nm || !pt) return
      nm.style.fontSize = ''
      let f = parseFloat(getComputedStyle(nm).fontSize) || 38
      while (nm.offsetTop + nm.offsetHeight + 50 > 1070 && f > 16) { f -= 2; nm.style.fontSize = `${f}px` }
      const need = nm.offsetTop + nm.offsetHeight + 8
      if (pt.offsetTop < need) pt.style.top = `${need}px`
    })
    const w2 = el.querySelector<HTMLElement>('.fl-w2')
    if (w2) {
      const base = w2.style.fontSize
      let f = parseFloat(base) || 100
      // ширина строки — сумма offsetWidth букв (трансформы входа на них не влияют)
      const lines: HTMLElement[] = w2.querySelector(':scope > div') ? [...w2.querySelectorAll<HTMLElement>(':scope > div')] : [w2]
      const wide = () => Math.max(0, ...lines.map(l => [...l.querySelectorAll<HTMLElement>(':scope > .ch')].reduce((s, c) => s + c.offsetWidth, 0)))
      while ((wide() > w2.clientWidth || w2.offsetHeight > 170) && f > 30) { f -= 4; w2.style.fontSize = `${f}px` }
    }
  }, [key, fonts, rootRef])
  const rects: Rect[] = [{ x: 300, y: 200, w: 1400, h: 700 }]
  return (
    <S1Screen rects={rects} n={null} rootRef={rootRef} cls={`s5 fl fl-${state}`} moodOverride={gold ? 'warning' : undefined}>
      {v.state === 'last' && <>
        <div className="fl-dawn" />
        <div className="fl-lab" style={{ left: 120, width: 1500, top: 120 }}>Последний ответ · раунд {v.round} · вопрос {v.q} из {v.of}</div>
        <div className="fl-q" style={{ left: 120, width: 1500, top: 180 }}>{v.text}</div>
        <div className="fl-ans" style={{ left: 120, width: 1500, top: 380 }}>{v.answer.toUpperCase().split('').map((c, i) => <span key={i} className="l">{c}</span>)}</div>
        <svg className="fl-svg" viewBox="0 0 1920 1080" aria-hidden><path className="fl-vine" d="M 220 740 C 520 790 760 700 1020 750 S 1500 800 1780 740" /></svg>
        <div className="fl-go">Подводим итоги →</div>
      </>}
      {v.state === 'antic' && <>
        <div className="fl-t1" style={{ left: 300, width: 1500, top: 90 }}>{v.title ?? 'Подводим итоги'}</div>
        <div className="fl-t2" style={{ left: 300, width: 1500, top: 190 }}>{v.sub ?? 'Скоро объявим победителей'}</div>
        {v.hues.map((h, i) => { const a = (i / v.hues.length) * Math.PI * 2 - Math.PI / 2; return <div key={i} className="fl-bud" style={{ left: 1100 + Math.cos(a) * 640 - 40, top: 590 + Math.sin(a) * 300 - 40 }}><Flower hue={h} o={0.38} /></div> })}
        <div className="fl-pod" style={{ left: 1100 - 90, top: 590 - 100 }}><Flower hue={46} o={0.5} /></div>
        {Array.from({ length: 30 }, (_, i) => <i key={i} className="fl-orb" style={{ left: 1100 - 9, top: 590 - 9 }} />)}
        <div className="fl-flash" />
        {v.clock && <div className="fl-clock fl-clock-sm">{v.clock}</div>}
      </>}
      {v.state === 'medals' && <>
        <div className="fl-t1" style={{ left: 300, width: 1500, top: 50 }}>Награждение</div>
        {v.slots.map(s => { const [x, y] = ([[1100, 250], [560, 330], [1640, 420]] as const)[s.k] ?? [1100, 250], med = ['gold', 'silver', 'bronze'][s.k]
          const long = s.names.length > 1 || s.names.some(n => n.name.length > 20)
          return <div key={s.k} className="fl-md" data-k={s.k} style={{ left: x - 200, top: 0, width: 400 }}>
            <div className="stem" style={{ left: 197, top: y + 90, height: 720 - y }} />
            <div className="fl-fw1" style={{ left: 100, top: y - 100 }}><Flower hue={s.names[0]?.hue ?? 46} o={1} /></div>
            <div className={`disc ${med}`} style={{ left: 160, top: y - 10 }}>{s.place}</div>
            <div className="nm" style={{ top: 800, color: s.names.length === 1 ? s.names[0].color : undefined }}>{s.names.length === 1 ? s.names[0].name : s.names.map((n, i) => <div key={i} style={{ color: n.color }}>{n.name}</div>)}</div><div className="pt" style={{ top: 800 + (long ? 118 : 70) }}>{s.sum} {ptsWord(s.sum)}</div>
          </div> })}
      </>}
      {v.state === 'retro' && (() => { const pos = retroLayout(v.cards.length), custom = v.cards.length !== 6, rowsY = [...new Set(pos.map(p => p.y))]
        return <>
          <div className="fl-t1" style={{ left: 300, width: 1500, top: rowsY.length > 1 ? 40 : 60 }}>Победители раундов</div>
          <svg className="fl-svg" viewBox="0 0 1920 1080" aria-hidden>{rowsY.map(y => <path key={y} className="fl-limb" d="M 70 380 C 500 340 1400 420 1850 360" transform={y !== 400 ? `translate(0 ${y - 400})` : undefined} />)}</svg>
          {v.cards.map((w, i) => i >= (v.shown ?? v.cards.length) ? null : <div key={i} className="fl-rc" data-i={i} style={{ left: pos[i].x, top: pos[i].y, ...(custom && pos[i].w !== 280 ? { width: pos[i].w } : {}), ...(rowsY.length > 2 ? { minHeight: 230 } : {}) }}>
            <i className="cord" /><b className="rn">{w.n}</b><span className="rname">{w.name}</span>
            <span className="win" style={{ color: w.team?.color }}>{w.team?.name ?? '—'}</span><em>{w.pts} {ptsWord(w.pts)}</em>
          </div>)}
        </>
      })()}
      {v.state === 'winner' && <>
        <svg className="fl-rays" viewBox="-960 -540 1920 1080" aria-hidden>{Array.from({ length: 16 }, (_, k) => <path key={k} d="M 0 0 L -60 -1200 L 60 -1200 Z" transform={`rotate(${k * 22.5})`} />)}</svg>
        <div className="fl-w1" style={{ left: 300, width: 1500, top: 60 }}>{v.names.length > 1 ? 'ПОБЕДИТЕЛИ' : 'ПОБЕДИТЕЛЬ'}</div>
        <div className="fl-big" style={{ left: 1100 - 330, top: 150 }}><div className="stem" /><Flower hue={46} o={1} /></div>
        <div className="fl-w2" style={{ left: 300, width: 1500, top: 700, fontSize: v.names.length > 1 || v.names.some(n => n.name.length > 20) ? 64 : 100 }}>{v.names.length === 1 ? letters(v.names[0].name) : v.names.map((n, i) => <div key={i}>{letters(n.name)}</div>)}</div>
        <div className="fl-w3" style={{ left: 300, width: 1500, top: 880 }}>{v.sum} {ptsWord(v.sum)}</div>
        {petals.map((q, i) => <i key={i} className="fl-pet" style={{ left: q.x, top: -40, ['--h' as string]: q.h, transform: `scale(${q.s})` }} />)}
      </>}
      {v.state === 'party' && <>
        {Array.from({ length: 5 }, (_, i) => <div key={i} className="fl-fw" style={{ left: 260 + i * 350, top: 180 + (i % 2) * 150 }}>{Array.from({ length: 14 }, (_, k) => <i key={k} style={{ transform: `rotate(${k * 25.7}deg) translateY(-110px)`, background: tcol(hueAt(hues, i * 3 + k)) }} />)}</div>)}
        {petals.slice(0, 26).map((q, i) => <div key={i} className="fl-lant" style={{ left: q.x, top: q.y, transform: `scale(${q.s * 0.9})` }}><Flower hue={q.h} o={1} /></div>)}
        <div className="fl-th" style={{ left: 300, width: 1500, top: 380 }}>{letters('Спасибо за игру!')}</div>
        <div className="fl-pod3" style={{ left: 300, width: 1500, top: 560 }}>{v.top.map((r, k) => <span key={k} style={{ color: r.color }}><b>{k + 1}</b>{r.name}</span>)}</div>
      </>}
      {v.state === 'break' && <>
        <div className="fl-t1" style={{ left: 210, width: 1500, top: 150 }}>Перерыв</div>
        <div className="fl-t2" style={{ left: 210, width: 1500, top: 270 }}>{v.sub}</div>
        <div className="fl-clock">{v.clock}</div>
      </>}
    </S1Screen>
  )
}
