// ═══ Этап 5 · Вступления раундов (единая система) ═══
// Настоящий экран (HostScreen, phase 'round_intro'): «Раунд N» крупно в углу, название (строки из редактора), короткая
// подсказка под ним (metaLine) и правила — нумерованным списком. Скелет у всех раундов один и тот же (утверждённое
// `RoundIntro` этапа 1: эмблема поднимается из земли, правила проступают на листьях), а ЛИЦО у каждого своё: эмблема
// механики со своим собственным способом появления и свой оттенок свечения номера раунда.
//  кроссворд — две лозы прорастают крест-накрест, в клетки ложатся буквы; кино и литература — лоза-вопросительный знак
//  и цветок на месте точки; своя игра — четыре лепестка-цены раскрываются по часовой, один взлетает; угадай мелодию —
//  три колокольчика раскачиваются по очереди; скрэмбл — буквы-семена падают в чашечки.
// «120 секунд», «Блиц» и «Три попытки» — как утверждены на этапе 1 (та же разметка и эмблема, что у их сцен).
// Сцена рисует только то, что ей дали: лаборатория — тестовый вечер (labs/forest/stage5Lab.tsx), игра — настоящий
// раунд (номер, title_lines, metaLine, rules). Длинные тексты вписываются замером, только если не влезают.
import { useLayoutEffect, type ReactNode } from 'react'
import { RoundIntro, S1Screen, introTl, useEntrance, type S1Api } from '../stage1/common'
import type { RoundIntroData } from '../stage1/data'
import type { Mood } from '../stage1/env'
import { SPRINT_INTRO_EMBLEM } from '../stage1/SprintScene'
import { BLITZ_INTRO_EMBLEM } from '../stage1/BlitzScene'
import { REVEAL_INTRO_EMBLEM } from '../stage1/Reveal3Scene'
import { useFontsReady, shrinkToFit } from '../stage1/gameHooks'
import { introTitleLines, introTitleSize, type IntroKind } from './views'

export type { IntroKind } from './views'

const ACC: Record<string, string> = { crossword: '#ffd98a', standard: '#7ff2d8', jeopardy: '#c9b6ff', melody: '#8fc8ff', anagram: '#ffc27a' }
/** утверждённые заставки этапа 1: класс сцены и «настроение» — как у SprintScene/BlitzScene/Reveal3Scene в состоянии intro */
const STAGE1: Partial<Record<IntroKind, { cls: string; mood?: Mood; emblem: ReactNode }>> = {
  sprint: { cls: 'spA', emblem: SPRINT_INTRO_EMBLEM },
  blitz: { cls: 'bz bzC', mood: 'calm', emblem: BLITZ_INTRO_EMBLEM },
  reveal: { cls: 'rv rvA', emblem: REVEAL_INTRO_EMBLEM },
}

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

/** Таймлайн появления: общий скелет + своя эмблема (у этапа 1 — только скелет, как в их сценах). */
function introBuild(tl: gsap.core.Timeline, q: (s: string) => Element[], kind: IntroKind) {
  introTl(tl, q)
  const T = 0.9
  if (kind === 'crossword') tl.fromTo(q('.em .vn'), { strokeDashoffset: 300, opacity: 1 }, { strokeDashoffset: 0, duration: 0.9, stagger: 0.25, ease: 'power2.out' }, T)
    .fromTo(q('.em .ce.r'), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.35, stagger: 0.1, ease: 'back.out(2)', transformOrigin: '50% 50%' }, T + 0.3)
    .fromTo(q('.em .ce.c'), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.35, stagger: 0.1, ease: 'back.out(2)', transformOrigin: '50% 50%' }, T + 0.9)
  if (kind === 'standard') tl.fromTo(q('.em .qm'), { strokeDashoffset: 420 }, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut' }, T)
    .fromTo(q('.em .qb'), { scale: 0 }, { scale: 1, svgOrigin: '0 0', duration: 0.8, ease: 'back.out(2)' }, T + 1.0)
  if (kind === 'jeopardy') tl.fromTo(q('.em .jpt'), { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, svgOrigin: '0 0', duration: 0.5, stagger: 0.18, ease: 'back.out(2)' }, T)
    .to(q('.em .jpt[data-i="1"]'), { y: -22, duration: 0.6, ease: 'sine.inOut', yoyo: true, repeat: 1 }, T + 1.2)
  if (kind === 'melody') tl.fromTo(q('.em .bell'), { rotation: -26, opacity: 0 }, { rotation: 0, opacity: 1, svgOrigin: '0 0', duration: 1.2, stagger: 0.25, ease: 'elastic.out(1,0.35)' }, T)
    .fromTo(q('.em .nt'), { opacity: 0, y: 14 }, { opacity: 1, y: -16, duration: 0.7, stagger: 0.2 }, T + 0.8)
  if (kind === 'anagram') tl.fromTo(q('.em .sd'), { y: -150, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.16, ease: 'bounce.out' }, T)
    .fromTo(q('.em .cup'), { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.1 }, T - 0.2)
}

export function RoundIntroScreen({ kind, intro, onReady }: { kind: IntroKind; intro: RoundIntroData; onReady: (a: S1Api) => void }) {
  const s1 = STAGE1[kind]
  // длинная строка из редактора (лабораторные — до 24 букв) разбивается по словам, а не мельчит в одну строку
  const titleLines = introTitleLines(intro.titleLines)
  const tfs = introTitleSize(titleLines)
  const key = `${kind}|${JSON.stringify(intro)}`
  const fonts = useFontsReady()
  const { root } = useEntrance(onReady, (tl, q) => introBuild(tl, q, kind), null, [key])
  // Вписывание настоящих текстов (лабораторные влезают — там ничего не меняется): правила — до низа кадра,
  // заголовок — по ширине колонки и так, чтобы эмблема + название + подсказка не уходили под край.
  useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    const main = el.querySelector<HTMLElement>('.s1-intro-main'), title = el.querySelector<HTMLElement>('.s1-intro-title')
    const rules = el.querySelector<HTMLElement>('.s1-intro-rules')
    if (rules) shrinkToFit([...rules.querySelectorAll<HTMLElement>('.t')], () => rules.offsetTop + rules.offsetHeight <= 1050, 22)
    // по ширине — до колонки правил (или края кадра); лабораторные заголовки чуть шире колонки, но в эту границу влезают
    const right = rules ? rules.offsetLeft : 1880
    // ширина строки — сумма offsetWidth букв (на них висят трансформы входа, scrollWidth их учитывает, а offsetWidth — нет)
    const lineW = () => Math.max(0, ...[...(title?.querySelectorAll<HTMLElement>('.ln') ?? [])].map(ln => [...ln.children].reduce((s, c) => s + (c as HTMLElement).offsetWidth, 0)))
    if (main && title) shrinkToFit([title], () => {
      // заставки этапа 1 переносят название по словам — шире колонки оно не станет
      const cx = main.offsetLeft + main.clientWidth / 2, w = s1 ? Math.min(lineW(), main.clientWidth) : lineW()
      return cx + w / 2 <= right && cx - w / 2 >= 20 && main.offsetTop + main.offsetHeight <= 1050
    }, 40)
  }, [key, fonts, root, s1])
  const body = <RoundIntro intro={titleLines === intro.titleLines ? intro : { ...intro, titleLines }} emblem={s1 ? s1.emblem : <Emblem id={kind} />} />
  return s1
    ? <S1Screen rects={[{ x: 460, y: 300, w: 1000, h: 520 }]} n={null} rootRef={root} cls={s1.cls} moodOverride={s1.mood}>{body}</S1Screen>
    : <S1Screen rects={[{ x: 460, y: 300, w: 1000, h: 520 }]} n={null} rootRef={root} cls={`rv ri ri-${kind}`}>
      <div style={{ ['--acc' as string]: ACC[kind], ['--tfs' as string]: `${tfs}px` }}>{body}</div>
    </S1Screen>
}
