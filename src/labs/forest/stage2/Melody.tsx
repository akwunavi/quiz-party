// ═══ Этап 2 · «Угадай мелодию» — три подхода к выбору трека ═══
// Механика (MelodyRound.tsx + lib/melody.ts): доска «темы × треки», на плитке — номер трека;
// рулетка (подсветка прыгает по свободным плиткам и встаёт на выбранную — путь из той же
// melodySpinPath, что в игре) → «слушаем 1 секунду» → ставки секундами (10 с; 2–5 с → 2 балла,
// 6–10 с → 1) → очередь по ставкам → отрывок длиной в ставку первой команды → её ответ (30 с) →
// при промахе ход второй: она слушает трек целиком (10 с, 0,5 балла) → ответ на экране (кто
// забрал баллы или «никто не угадал») → трек гаснет на доске.
// A «Колокольчики» — тема = стебель колокольчиков, трек = цветок-колокол; сыгранный — завял.
// B «Птицы на ветвях» — тема = ветвь, трек = певчая птица; сыгранная улетела, осталось перо.
// C «Спилы-пластинки» — 16 древесных спилов по кругу (годовые кольца как бороздки пластинки);
//   выбранный ложится на пень-патефон и крутится под веточкой-иглой.
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Dandelion } from '../stage1/timers'
import { S1Screen, useEntrance, type S1Props } from '../stage1/common'
import type { Rect } from '../stage1/env'
import { melodySpinPath, melodySpinAt, melodyPoints } from '../../../lib/melody'
import { MEL2, TEAM, ALL_TEAMS, fmtVal, balla } from './data'

export const MEL_STATES = [
  { id: 'idle', name: 'Доска: часть треков отыграна' }, { id: 'spinning', name: 'Рулетка выбирает трек' },
  { id: 'listen', name: 'Слушаем 1 секунду' }, { id: 'bidding', name: 'Ставки: за сколько секунд угадаете' },
  { id: 'bids', name: 'Ставки собраны, очередь' }, { id: 'snippet', name: 'Играет отрывок по ставке' },
  { id: 'answering', name: 'Отвечает первая команда' }, { id: 'wrong', name: 'Неверно — ход второй' },
  { id: 'passed', name: 'Ход передан: трек целиком' }, { id: 'reveal', name: 'Угадали: ответ и баллы' },
  { id: 'miss', name: 'Никто не угадал: ответ' }, { id: 'complete', name: 'Все треки отыграны' },
]
export const MEL_VARIANTS = [
  { id: 'A', name: 'A · Колокольчики', note: 'Четыре стебля колокольчиков — четыре темы, имя темы на листе над стеблем. Колокол — трек, номер на чашечке. Рулетка — светлячок перелетает с цветка на цветок и садится на выбранный. Выбранный колокол вырастает слева и раскачивается, пока звучит музыка; на верном ответе распускается золотом. Отыгранный колокол закрывается и вянет.' },
  { id: 'B', name: 'B · Птицы на ветвях', note: 'Четыре ветви — четыре темы, имя у ствола. На ветвях сидят певчие птицы с номером на грудке. Рулетка — солнечный зайчик прыгает по птицам. Выбранная птица перелетает к зрителю и поёт, пока звучит трек (из клюва летят ноты-семена). Отыгранная птица улетает — на ветке остаётся перо.' },
  { id: 'C', name: 'C · Спилы-пластинки', note: '16 спилов дерева лежат кругом, по четыре на тему; годовые кольца — как бороздки пластинки, имя темы — у своей четверти круга. Рулетка — огонёк бежит по кругу. Выбранный спил ложится на пень-патефон и крутится под веточкой-иглой; круг отодвигается влево. Отыгранный спил перевёрнут корой вверх.' },
]

const TH = MEL2.themes, NT = MEL2.tracks
const keys = TH.flatMap((_, ti) => Array.from({ length: NT }, (_, i) => `${ti}-${i}`))
const [PTI, PI] = MEL2.pick.split('-').map(Number)
const SPIN_FROM = 0.4, SPIN_MS = MEL2.spinSec * 1000

function pos(v: string, ti: number, i: number) {
  if (v === 'A') return { x: 960 + (ti - 1.5) * 420 + (i % 2 ? 62 : -62), y: 360 + i * 150 }
  if (v === 'B') return { x: 760 + i * 290, y: 268 + ti * 196 }
  const a = ((-90 + ti * 90 + (i + 0.5) * 22.5 - 45) * Math.PI) / 180
  return { x: 960 + Math.cos(a) * 340, y: 584 + Math.sin(a) * 340 }
}
const VX = 420, VY = 600
const STAGE = new Set(['listen', 'bidding', 'bids', 'snippet', 'answering', 'wrong', 'passed', 'reveal', 'miss'])
const PLAYING = new Set(['listen', 'snippet', 'passed', 'reveal', 'miss'])
function timerFor(state: string) {
  if (state === 'bidding') return { start: MEL2.bidSec, from: 0.8, run: 6 }
  if (state === 'answering') return { start: MEL2.answerSec, from: 1.0, run: 8 }
  if (state === 'passed') return { start: MEL2.passAnswerSec, from: 1.0, run: 6 }
  return null
}

export function Melody({ variant, state, nOv, onReady }: S1Props) {
  const tm = timerFor(state)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const sel = pos(variant, PTI, PI)
  const { root, n: nLive } = useEntrance(onReady, (tl, q) => {
    tlRef.current = tl
    const items = q('.ml2-t')
    if (state === 'idle' || state === 'complete') {
      if (variant === 'A') tl.fromTo(q('.ml2a-stem'), { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.1, stagger: 0.12, ease: 'power2.out' }, 0)
      if (variant === 'B') tl.fromTo(q('.ml2b-bough'), { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.0, stagger: 0.1, ease: 'power2.out' }, 0)
      if (variant === 'C') tl.fromTo(q('.ml2c-ring'), { rotation: -40, opacity: 0 }, { rotation: 0, opacity: 1, duration: 1.4, ease: 'power3.out', transformOrigin: '960px 584px' }, 0)
      tl.fromTo(items, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, stagger: 0.035, ease: 'back.out(1.8)' }, 0.6)
        .fromTo(q('.ml2-label'), { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, 0.4)
    }
    if (state === 'spinning') tl.to({}, { duration: SPIN_MS / 1000 }, SPIN_FROM)
      .fromTo(q('.ml2-t.pick'), { scale: 1 }, { scale: 1.2, duration: 0.3, yoyo: true, repeat: 1, ease: 'sine.inOut' }, SPIN_FROM + SPIN_MS / 1000 - 0.2)
    if (STAGE.has(state)) {
      // выбранный трек «выходит к зрителю», доска отступает
      if (variant === 'C') tl.fromTo(q('.ml2-board'), { x: 0, scale: 1, opacity: 1 }, { x: VX - 960, y: VY - 584, scale: 0.62, opacity: 0.55, duration: 0.8, ease: 'power3.inOut', transformOrigin: '960px 584px' }, 0)
      else tl.fromTo(q('.ml2-board'), { opacity: 1, filter: 'blur(0px)' }, { opacity: 0.28, filter: 'blur(2px)', duration: 0.6 }, 0)
      tl.fromTo(q('.ml2-vessel'), { x: sel.x - VX, y: sel.y - VY, scale: 0.3, opacity: 0.8 }, { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.8, ease: 'power3.inOut' }, 0.1)
        .fromTo(q('.ml2-panel > *'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.07, ease: 'power3.out' }, 0.5)
    }
    if (state === 'bidding') q('.ml2-bid .st').forEach((el, k) => { tl.fromTo(el, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }, 1.6 + k * 1.1) })
    if (state === 'bids') tl.fromTo(q('.ml2-bid'), { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, stagger: 0.12 }, 0.8)
      .fromTo(q('.ml2-bid.win .tag'), { scale: 0 }, { scale: 1, duration: 0.5, ease: 'back.out(2.4)' }, 1.6)
    if (state === 'wrong') tl.fromTo(q('.ml2-wrong'), { x: -12, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: 'elastic.out(1, 0.35)' }, 1.0)
    if (state === 'reveal' || state === 'miss') {
      // ответ: сосуд преображается (колокол распускается золотом / птица раскрывает крылья /
      // пластинка вспыхивает кольцами), имя трека разворачивается на листе
      tl.fromTo(q('.ml2-ans'), { clipPath: 'inset(0 100% 0 0 round 30px)' }, { clipPath: 'inset(0 0% 0 0 round 30px)', duration: 0.9, ease: 'power2.inOut' }, 0.8)
        .fromTo(q('.ml2-vessel .gold'), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.6)' }, 0.9)
        .fromTo(q('.ml2-won'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5 }, 1.7)
      if (state === 'reveal') tl.fromTo(q('.ml2-seed'), { x: 0, y: 0, opacity: 0, scale: 0.5 }, { x: 600, y: 30, opacity: 1, scale: 1, duration: 1.2, ease: 'power2.inOut' }, 1.9)
        .to(q('.ml2-seed'), { opacity: 0, scale: 2, duration: 0.3 }, 3.1)
        .fromTo(q('.ml2-won b'), { scale: 1 }, { scale: 1.15, duration: 0.25, yoyo: true, repeat: 1 }, 3.0)
    }
  }, tm, [variant, state])

  // рулетка: какая плитка подсвечена — читаем из положения таймлайна (перемотка/пауза работают)
  const free = keys.filter(k => !MEL2.played.includes(k))
  const spin = useRef(melodySpinPath(free.length, free.indexOf(MEL2.pick), SPIN_MS, 7051))
  const [hot, setHot] = useState<string | null>(null)
  useEffect(() => {
    if (state !== 'spinning') { setHot(null); return }
    const tick = () => { const t = tlRef.current?.time() ?? 0; const ms = (t - SPIN_FROM) * 1000; setHot(ms < 0 ? null : ms >= SPIN_MS ? MEL2.pick : free[melodySpinAt(spin.current, ms)]) }
    gsap.ticker.add(tick); return () => gsap.ticker.remove(tick)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  const n = nOv ?? (tm ? nLive : null)
  const played = state === 'complete' ? keys : STAGE.has(state) && (state === 'reveal' || state === 'miss') ? [...MEL2.played, MEL2.pick] : MEL2.played
  const stOf = (k: string) => (k === MEL2.pick && STAGE.has(state) ? 'taken' : played.includes(k) ? 'done' : hot === k ? 'hot' : k === MEL2.pick && state === 'spinning' ? 'av pick' : 'av')
  const inStage = STAGE.has(state)
  const rects: Rect[] = inStage ? [{ x: 150, y: 250, w: 560, h: 700 }, { x: 860, y: 80, w: 1000, h: 900 }] : variant === 'C' ? [{ x: 560, y: 180, w: 800, h: 820 }] : [{ x: 120, y: 140, w: 1680, h: 880 }]

  return (
    <S1Screen rects={rects} n={null} rootRef={root} cls={`ml2 ml2${variant} st-${state}${inStage ? ' stage' : ''}`} moodOverride={n != null && n <= 10 ? (n <= 0 ? 'zero' : 'warning') : 'calm'}>
      <div className="ml2-title">{MEL2.title}{state === 'complete' ? <span> · все треки отыграны</span> : <span> · осталось треков: {keys.length - played.length}</span>}</div>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden><defs>
        <radialGradient id="ml2Bell" cx=".35" cy=".3" r=".8"><stop offset="0" stopColor="#d9ccff" /><stop offset=".55" stopColor="#8f78d8" /><stop offset="1" stopColor="#3f2a86" /></radialGradient>
        <radialGradient id="ml2BellG" cx=".35" cy=".3" r=".8"><stop offset="0" stopColor="#fff3c8" /><stop offset=".55" stopColor="#f0c055" /><stop offset="1" stopColor="#8a5a14" /></radialGradient>
        <linearGradient id="ml2Back" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6a5a46" /><stop offset="1" stopColor="#3e3226" /></linearGradient>
        <radialGradient id="ml2Breast" cx=".4" cy=".35" r=".7"><stop offset="0" stopColor="#f2a070" /><stop offset="1" stopColor="#b2552a" /></radialGradient>
      </defs></svg>
      <div className="ml2-board">
        {variant === 'A' && <BoardA stOf={stOf} />}
        {variant === 'B' && <BoardB stOf={stOf} />}
        {variant === 'C' && <BoardC stOf={stOf} />}
      </div>
      {state === 'spinning' && hot && (() => { const [a, b] = hot.split('-').map(Number), p = pos(variant, a, b); return <i className={`ml2-spot${hot === MEL2.pick && (tlRef.current?.time() ?? 0) >= SPIN_FROM + SPIN_MS / 1000 ? ' land' : ''}`} style={{ left: p.x, top: p.y }} aria-hidden /> })()}
      {inStage && <Vessel variant={variant} playing={PLAYING.has(state)} gold={state === 'reveal'} />}
      {inStage && <Panel state={state} n={n} />}
      {state === 'reveal' && <i className="ml2-seed" style={{ left: VX, top: VY - 120 }} aria-hidden />}
    </S1Screen>
  )
}

// ── доски ─────────────────────────────────────────────────────────────────
function Bell({ n, st, big }: { n: number; st: string; big?: boolean }) {
  const done = st === 'done' || st === 'taken'
  return (
    <svg className={`ml2a-bell${done ? ' off' : ''}${big ? ' big' : ''}`} viewBox="-70 -90 140 160" aria-hidden>
      <path className="ped" d="M 0 -90 C 6 -80 -4 -70 0 -58" />
      {done ? <path className="wilt" d="M 0 -58 C 16 -50 20 -20 8 4 C 0 14 -8 10 -10 0 C -16 -20 -14 -48 0 -58 Z" /> : <>
        <path className="sep" d="M 0 -58 L -14 -66 M 0 -58 L 14 -66" />
        <path className="cup" d="M -40 -30 C -42 -62 42 -62 40 -30 L 54 34 C 40 24 30 40 18 30 C 8 42 -8 42 -18 30 C -30 40 -40 24 -54 34 Z" />
        <path className="in" d="M -40 28 C -20 40 20 40 40 28" />
        <circle className="clap" cx="0" cy="40" r="7" />
        <text y="-4" textAnchor="middle" dominantBaseline="middle">{n}</text>
      </>}
    </svg>
  )
}
function BoardA({ stOf }: { stOf: (k: string) => string }) {
  return <>{TH.map((t, ti) => {
    const cx = 960 + (ti - 1.5) * 420
    return (
      <div key={ti}>
        <svg className="ml2a-stem" style={{ left: cx - 100 }} viewBox="0 0 200 900" preserveAspectRatio="none" aria-hidden>
          <path d="M 100 900 C 90 700 112 500 100 320 C 92 200 104 140 100 100" />
          {Array.from({ length: NT }, (_, i) => { const y = 260 + i * 150 - 180, sd = i % 2 ? 1 : -1; return <path key={i} className="br" d={`M 100 ${y + 40} C ${100 + sd * 30} ${y + 10} ${100 + sd * 52} ${y - 10} ${100 + sd * 62} ${y - 6}`} /> })}
          <path className="lf" d="M 100 860 C 40 820 10 840 0 880 C 40 870 70 880 100 870 Z M 100 840 C 160 800 190 820 200 860 C 160 852 130 860 100 852 Z" />
        </svg>
        <div className="ml2-label ml2a-label" style={{ left: cx }}>{t}</div>
        {Array.from({ length: NT }, (_, i) => { const p = pos('A', ti, i), st = stOf(`${ti}-${i}`); return <div key={i} className={`ml2-t ml2a-t ${st}`} style={{ left: p.x, top: p.y }}><Bell n={i + 1} st={st} /></div> })}
      </div>
    )
  })}</>
}
function Bird({ n, st, big, sing }: { n: number; st: string; big?: boolean; sing?: boolean }) {
  const gone = st === 'done' || st === 'taken'
  if (gone) return <svg className="ml2b-bird gone" viewBox="-70 -70 140 120" aria-hidden><path className="feather" d="M -6 30 C -20 10 -10 -20 14 -30 C 6 -10 8 10 -6 30 Z M -6 30 L 10 -24" /></svg>
  return (
    <svg className={`ml2b-bird${big ? ' big' : ''}${sing ? ' sing' : ''}`} viewBox="-70 -70 140 120" aria-hidden>
      <path className="tail" d="M -34 10 L -66 -6 L -60 14 L -66 30 Z" />
      <ellipse className="body" cx="0" cy="8" rx="40" ry="32" />
      <circle className="head" cx="30" cy="-24" r="20" />
      <path className="beak" d={sing ? 'M 46 -30 L 66 -36 L 50 -24 L 66 -14 L 46 -20 Z' : 'M 46 -28 L 64 -22 L 46 -18 Z'} />
      <circle className="eye" cx="36" cy="-28" r="3.6" /><circle className="eyehi" cx="37.2" cy="-29.2" r="1.1" />
      <path className="wing" d="M -24 -2 C -6 -18 22 -10 26 8 C 8 20 -16 18 -24 -2 Z" />
      <path className="quill" d="M -16 2 C -6 -4 8 -2 16 6 M -18 8 C -8 4 6 6 12 12" />
      <circle className="breast" cx="10" cy="20" r="19" />
      <text x="10" y="21" textAnchor="middle" dominantBaseline="middle">{n}</text>
      <path className="feet" d="M -6 38 L -8 52 M 10 38 L 10 52" />
    </svg>
  )
}
function BoardB({ stOf }: { stOf: (k: string) => string }) {
  return <>
    <svg className="ml2b-trunk" viewBox="0 0 180 1080" aria-hidden><path d="M 30 0 C 70 300 20 640 60 1080 L 180 1080 C 140 700 170 300 140 0 Z" /></svg>
    {TH.map((t, ti) => {
      const y = 268 + ti * 196
      return (
        <div key={ti}>
          <svg className="ml2b-bough" style={{ top: y + 28 }} viewBox="0 0 1780 50" preserveAspectRatio="none" aria-hidden><path d={`M 0 25 C 500 ${16 + ti * 4} 1000 38 1780 ${20 + (ti % 2) * 10}`} /></svg>
          <div className="ml2-label ml2b-label" style={{ top: y - 18 }}>{t}</div>
          {Array.from({ length: NT }, (_, i) => { const p = pos('B', ti, i), st = stOf(`${ti}-${i}`); return <div key={i} className={`ml2-t ml2b-t ${st}`} style={{ left: p.x, top: p.y }}><Bird n={i + 1} st={st} /></div> })}
        </div>
      )
    })}
  </>
}
function Slice({ n, st, big, spin }: { n: number; st: string; big?: boolean; spin?: boolean }) {
  const done = st === 'done' || st === 'taken'
  return (
    <svg className={`ml2c-slice${done ? ' off' : ''}${big ? ' big' : ''}${spin ? ' spin' : ''}`} viewBox="-60 -60 120 120" aria-hidden>
      <circle className="bark" r="58" />
      {done ? <path className="barkline" d="M -40 -20 C -20 -30 0 -10 30 -24 M -44 10 C -14 0 10 20 44 6 M -30 34 C -6 26 14 40 30 30" /> : <>
        <circle className="wood" r="50" />
        {[42, 34, 27, 20, 14].map(r => <circle key={r} className="ring" r={r} />)}
        <circle className="label" r="22" />
        <text y="2" textAnchor="middle" dominantBaseline="middle">{n}</text>
      </>}
    </svg>
  )
}
function BoardC({ stOf }: { stOf: (k: string) => string }) {
  return (
    <div className="ml2c-ring">
      <svg className="ml2c-stump" viewBox="-160 -160 320 320" style={{ left: 960 - 160, top: 584 - 160 }} aria-hidden>
        <circle r="150" className="top" />{[130, 108, 86, 64, 42].map(r => <circle key={r} r={r} className="rg" />)}
      </svg>
      {TH.map((t, ti) => {
        const a = ((-90 + ti * 90) * Math.PI) / 180
        return <div key={ti} className="ml2-label ml2c-label" style={{ left: 960 + Math.cos(a) * 520, top: 584 + Math.sin(a) * 470 }}>{t}</div>
      })}
      {keys.map(k => { const [ti, i] = k.split('-').map(Number), p = pos('C', ti, i), st = stOf(k); return <div key={k} className={`ml2-t ml2c-t ${st}`} style={{ left: p.x, top: p.y }}><Slice n={i + 1} st={st} /></div> })}
    </div>
  )
}

function Vessel({ variant, playing, gold }: { variant: string; playing: boolean; gold: boolean }) {
  return (
    <div className={`ml2-vessel ml2-v${variant}${playing ? ' playing' : ''}${gold ? ' won' : ''}`} style={{ left: VX, top: VY }}>
      <span className="ml2-notes" aria-hidden>{[0, 1, 2, 3, 4].map(k => <i key={k} style={{ animationDelay: `${k * 0.45}s`, left: `${k * 14 - 30}px` }}>♪</i>)}</span>
      <i className="gold" aria-hidden />
      {variant === 'A' && <div className="ml2-v-in"><Bell n={PI + 1} st="av" big /></div>}
      {variant === 'B' && <div className="ml2-v-in"><Bird n={PI + 1} st="av" big sing={playing} /></div>}
      {variant === 'C' && <div className="ml2-v-in"><svg className="ml2c-stumpbig" viewBox="-200 -200 400 400"><circle r="190" /></svg><Slice n={PI + 1} st="av" big spin={playing} />
        <svg className="ml2c-arm" viewBox="0 0 260 260"><path d="M 240 20 C 200 60 160 120 120 150" /><circle cx="240" cy="20" r="14" /></svg></div>}
    </div>
  )
}

function Panel({ state, n }: { state: string; n: number | null }) {
  const first = TEAM(MEL2.bids[0].team), second = TEAM(MEL2.bids[1].team), bid = MEL2.bids[0].sec
  const sorted = [...ALL_TEAMS].sort((a, b) => a.name.localeCompare(b.name))
  const won = melodyPoints(bid, true)
  return (
    <div className="ml2-panel">
      <div className="ml2-head">
        <div><b>{TH[PTI]}</b><span>трек {PI + 1}</span></div>
        {n != null && <div className="ml2-tm"><Dandelion n={n} total={state === 'answering' ? MEL2.answerSec : 10} size={190} seeds={state === 'answering' ? 30 : 10} /></div>}
      </div>
      {state === 'listen' && <div className="ml2-big">Слушаем 1 секунду…</div>}
      {state === 'bidding' && <>
        <div className="ml2-big">За сколько секунд угадаете?</div>
        <div className="ml2-hint">2–5 сек → 2 балла · 6–10 сек → 1 балл · передача хода → 0,5 балла</div>
        <div className="ml2-bids">{sorted.map(t => { const has = MEL2.bidding.includes(t.id); return <div key={t.id} className="ml2-bid"><span className="nm" style={{ color: t.color }}>{t.name}</span>{has ? <b className="st ok">ставка принята ✓</b> : <b className="wait">…</b>}</div> })}</div>
      </>}
      {state === 'bids' && <>
        <div className="ml2-sub">Ставки команд</div>
        <div className="ml2-bids">{MEL2.bids.map((b, k) => { const t = TEAM(b.team); return <div key={b.team} className={`ml2-bid${k === 0 ? ' win' : ''}`}><span className="nm" style={{ color: t.color }}>{t.name}</span><b>{b.sec} сек</b>{k === 0 && <span className="tag">играет</span>}</div> })}</div>
      </>}
      {state === 'snippet' && <div className="ml2-big" style={{ color: first.color }}>{first.name} · играет {bid} сек</div>}
      {(state === 'answering' || state === 'wrong') && <>
        <div className="ml2-big" style={{ color: first.color }}>{first.name}</div>
        <div className="ml2-hint">ставка {bid} сек → за верный ответ {won} {balla(won)}</div>
        <div className="ml2-answer">Ответ: <b>{state === 'wrong' ? MEL2.wrongAnswer : MEL2.firstAnswer}</b></div>
        {state === 'wrong' && <div className="ml2-wrong">✗ Неверно · ответ не раскрываем — ход переходит второй команде</div>}
      </>}
      {state === 'passed' && <>
        <div className="ml2-big" style={{ color: second.color }}><small>ход передан · </small>{second.name}</div>
        <div className="ml2-hint">трек звучит целиком · за верный ответ — 0,5 балла</div>
        <div className="ml2-answer"><span className="wait">ждём ответ…</span></div>
      </>}
      {(state === 'reveal' || state === 'miss') && <>
        <div className="ml2-ans"><span>{state === 'reveal' ? <>Верно ✓ · +{fmtVal(won)}</> : 'Правильный ответ'}</span><b>{MEL2.correct}</b></div>
        <div className="ml2-won">{state === 'reveal' ? <><b style={{ color: first.color }}>{first.name}</b> забирает {fmtVal(won)} {balla(won)}</> : 'Никто не угадал'}</div>
      </>}
    </div>
  )
}
