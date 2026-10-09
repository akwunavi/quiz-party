// ═══ Этап 5 · Вступления раундов (единая система) ═══
// Настоящий экран (HostScreen, phase 'round_intro'): «Раунд N» крупно в углу, название (строки из редактора), короткая
// подсказка под ним (metaLine) и правила — нумерованным списком. Скелет у всех раундов один и тот же (утверждённое
// `RoundIntro` этапа 1: эмблема поднимается из земли, правила проступают на листьях), а ЛИЦО у каждого своё: эмблема
// механики со своим собственным способом появления и свой оттенок свечения номера раунда.
//  кроссворд — две лозы прорастают крест-накрест, в клетки ложатся буквы; кино и литература — лоза-вопросительный знак
//  и цветок на месте точки; своя игра — четыре лепестка-цены раскрываются по часовой, один взлетает; угадай мелодию —
//  три колокольчика раскачиваются по очереди; скрэмбл — буквы-семена падают в чашечки.
// «120 секунд», «Блиц» и «Три попытки» остаются как утверждены на этапе 1 — здесь они подключены той же вкладкой.
import { RoundIntro, S1Screen, introTl, useEntrance, type S1Props } from '../stage1/common'
import { Sprint } from '../stage1/Sprint'
import { Blitz } from '../stage1/Blitz'
import { Reveal3 } from '../stage1/Reveal3'
import { INTROS5 } from './data'

export const RINT_STATES = [
  { id: 'crossword', name: '1 · Литературный кроссворд' },
  { id: 'standard', name: '2 · Кино и литература (обычные вопросы)' },
  { id: 'jeopardy', name: '3 · Своя игра' },
  { id: 'melody', name: '4 · Угадай мелодию' },
  { id: 'anagram', name: '6 · Скрэмбл' },
  { id: 'sprint', name: '120 секунд (утверждено, этап 1)' },
  { id: 'blitz', name: 'Блиц (утверждено, этап 1)' },
  { id: 'reveal', name: 'Три попытки (утверждено, этап 1)' },
]
export const RINT_VARIANTS = [{ id: 'A', name: 'Лицо у каждого раунда', note: 'Один скелет (номер раунда, название, подсказка, правила на листьях) и своё лицо у каждой механики: эмблема со своим способом появления и свой оттенок свечения номера. Не длинная заставка: около трёх секунд до читаемого кадра.' }]

const ACC: Record<string, string> = { crossword: '#ffd98a', standard: '#7ff2d8', jeopardy: '#c9b6ff', melody: '#8fc8ff', anagram: '#ffc27a' }
const FRC = (n: number) => (n % 2 ? '#e8c06a' : '#f0d58a')

function Emblem({ id }: { id: string }) {
  if (id === 'crossword') {
    const row = 'РОМАН', col = 'ГЕРОЙ', C = 44, G = 50
    return <svg className="em em-cw" viewBox="0 0 290 270" width="270" aria-hidden>
      <path className="vn vh" d="M 4 184 L 284 184" /><path className="vn vv" d="M 90 14 L 90 262" />
      {[...row].map((ch, i) => <g key={'r' + i} className="ce r" transform={`translate(${14 + i * G} 162)`}><rect width={C} height={C} rx="6" /><text x={C / 2} y={C / 2 + 1}>{ch}</text></g>)}
      {[...col].map((ch, i) => i === 3 ? null : <g key={'c' + i} className="ce c" transform={`translate(${14 + G} ${12 + i * G})`}><rect width={C} height={C} rx="6" /><text x={C / 2} y={C / 2 + 1}>{ch}</text></g>)}
    </svg>
  }
  if (id === 'standard') return <svg className="em em-q" viewBox="0 0 220 260" width="200" aria-hidden>
    <path className="qm" d="M 52 84 C 50 24 170 18 168 84 C 168 128 112 130 110 176" />
    <g transform="translate(110 222)"><g className="qb">{Array.from({ length: 8 }, (_, k) => <g key={k} transform={`rotate(${k * 45})`}><ellipse cx="0" cy="-22" rx="9" ry="20" /></g>)}<circle r="8" /></g></g>
  </svg>
  if (id === 'jeopardy') return <svg className="em em-jp" viewBox="0 0 260 260" width="240" aria-hidden>
    <g transform="translate(130 130)">
      {[['100', -45], ['200', 45], ['300', 135], ['400', 225]].map(([v, a], i) => <g key={i} transform={`rotate(${a})`}><g className="jpt" data-i={i}><path d="M 0 -26 C -34 -50 -38 -98 0 -112 C 38 -98 34 -50 0 -26 Z" /><g transform="translate(0 -72)"><text textAnchor="middle" dominantBaseline="middle" style={{ transform: `rotate(${-(a as number)}deg)` }}>{v}</text></g></g></g>)}
      <circle r="24" className="jpc" />
    </g>
  </svg>
  if (id === 'melody') return <svg className="em em-ml" viewBox="0 0 290 240" width="270" aria-hidden>
    <path className="ms" d="M 14 44 C 90 6 200 6 276 46" />
    {[60, 145, 230].map((x, i) => <g key={i} transform={`translate(${x} ${30 + (i === 1 ? -4 : 6)})`}><g className="bell" data-i={i}>
      <path className="bs" d="M 0 0 L 0 26" /><path className="bc" d="M -34 96 C -30 60 -18 34 0 30 C 18 34 30 60 34 96 C 20 90 -20 90 -34 96 Z" /><circle className="bk" cy="102" r="7" /></g></g>)}
    {[[40, 150], [250, 120], [150, 180]].map(([x, y], i) => <text key={i} className="nt" x={x} y={y} data-i={i}>♪</text>)}
  </svg>
  // anagram
  const L = 'ЛЕТО', ord = [2, 0, 3, 1]
  return <svg className="em em-an" viewBox="0 0 270 230" width="250" aria-hidden>
    {[...L].map((_, i) => <path key={i} className="cup" d={`M ${16 + i * 62} 168 C ${16 + i * 62 + 4} 196 ${16 + i * 62 + 22} 206 ${16 + i * 62 + 28} 206 C ${16 + i * 62 + 36} 206 ${16 + i * 62 + 52} 196 ${16 + i * 62 + 56} 168 C ${16 + i * 62 + 40} 178 ${16 + i * 62 + 16} 178 ${16 + i * 62} 168 Z`} />)}
    {[...L].map((ch, i) => <g key={i} transform={`translate(${44 + i * 62} 120)`}><g className="sd" data-o={ord[i]} data-i={i}><circle r="25" /><text y="2">{ch}</text></g></g>)}
  </svg>
}

export function Intro5({ state, variant, nOv, onReady, teams }: S1Props) {
  if (state === 'sprint') return <Sprint variant={variant} state="intro" nOv={nOv} onReady={onReady} teams={teams} />
  if (state === 'blitz') return <Blitz variant={variant} state="intro" nOv={nOv} onReady={onReady} teams={teams} />
  if (state === 'reveal') return <Reveal3 variant={variant} state="intro" nOv={nOv} onReady={onReady} teams={teams} />
  return <IntroNew state={state} onReady={onReady} />
}
function IntroNew({ state, onReady }: { state: string; onReady: S1Props['onReady'] }) {
  const intro = INTROS5[state]
  const L = Math.max(...intro.titleLines.map(l => l.length)), tfs = Math.min(112, Math.floor(1500 / L))
  const { root } = useEntrance(onReady, (tl, q) => {
    introTl(tl, q)
    const T = 0.9
    if (state === 'crossword') tl.fromTo(q('.em .vn'), { strokeDashoffset: 300, opacity: 1 }, { strokeDashoffset: 0, duration: 0.9, stagger: 0.25, ease: 'power2.out' }, T)
      .fromTo(q('.em .ce.r'), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.35, stagger: 0.1, ease: 'back.out(2)', transformOrigin: '50% 50%' }, T + 0.3)
      .fromTo(q('.em .ce.c'), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.35, stagger: 0.1, ease: 'back.out(2)', transformOrigin: '50% 50%' }, T + 0.9)
    if (state === 'standard') tl.fromTo(q('.em .qm'), { strokeDashoffset: 420 }, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut' }, T)
      .fromTo(q('.em .qb'), { scale: 0 }, { scale: 1, svgOrigin: '0 0', duration: 0.8, ease: 'back.out(2)' }, T + 1.0)
    if (state === 'jeopardy') tl.fromTo(q('.em .jpt'), { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, svgOrigin: '0 0', duration: 0.5, stagger: 0.18, ease: 'back.out(2)' }, T)
      .to(q('.em .jpt[data-i="1"]'), { y: -22, duration: 0.6, ease: 'sine.inOut', yoyo: true, repeat: 1 }, T + 1.2)
    if (state === 'melody') tl.fromTo(q('.em .bell'), { rotation: -26, opacity: 0 }, { rotation: 0, opacity: 1, svgOrigin: '0 0', duration: 1.2, stagger: 0.25, ease: 'elastic.out(1,0.35)' }, T)
      .fromTo(q('.em .nt'), { opacity: 0, y: 14 }, { opacity: 1, y: -16, duration: 0.7, stagger: 0.2 }, T + 0.8)
    if (state === 'anagram') tl.fromTo(q('.em .sd'), { y: -150, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.16, ease: 'bounce.out' }, T)
      .fromTo(q('.em .cup'), { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.1 }, T - 0.2)
  }, null, [state])
  return (
    <S1Screen rects={[{ x: 460, y: 300, w: 1000, h: 520 }]} n={null} rootRef={root} cls={`rv ri ri-${state}`}>
      <div style={{ ['--acc' as string]: ACC[state], ['--tfs' as string]: `${tfs}px` }}><RoundIntro intro={intro} emblem={<Emblem id={state} />} /></div>
    </S1Screen>
  )
}
void FRC
