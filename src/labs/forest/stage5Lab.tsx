// ═══ Этап 5 — лабораторные адаптеры: тестовый вечер (stage5Data.ts) → общие сцены src/forest/stage5/* ═══
// Сами сцены (Rules, Intro5, Board, Finale, Trans) пропс-управляемые и общие с игрой; здесь — только состояния
// лаборатории, тестовые данные и перематываемые таймлайны.
import { useMemo } from 'react'
import { useEntrance, S1Screen, type S1Props } from '../../forest/stage1/common'
import type { Rect } from '../../forest/stage1/env'
import { Sprint } from '../../forest/stage1/Sprint'
import { Blitz } from '../../forest/stage1/Blitz'
import { Reveal3 } from '../../forest/stage1/Reveal3'
import { IMG } from '../../forest/content'
import { RulesScreen, fmtMinutes, type RulesView, type RulesLayout } from '../../forest/stage5/Rules'
import { RoundIntroScreen, type IntroKind } from '../../forest/stage5/Intro5'
import { BoardScreen, boardBuild } from '../../forest/stage5/Board'
import { FinScreen, finBuild, type FinView } from '../../forest/stage5/Finale'
import { TransDevices, transBits } from '../../forest/stage5/Trans'
import { boardLayout, type BoardView } from '../../forest/stage5/views'
import { ALL, FINAL, INTROS5, LAST, NIGHT, RULES, STATS, WIN_ROUNDS, rank, tot } from './stage5Data'

// ── Правила ──
export const RULES_STATES = [
  { id: 'rules', name: 'Правила: пять пунктов + раунды вечера' },
  { id: 'dense', name: 'Плотный текст: девять пунктов, раунды, статистика, сноска' },
  { id: 'rimg', name: 'Правила с картинкой и сноской' },
  { id: 'rstats', name: 'Без пунктов: раунды и статистика' },
]
export const RULES_VARIANTS = [{ id: 'A', name: 'Лоза правил', note: 'Правила — листья на лозе, которая прорастает вдоль левого края: на каждом листе пункт с номером, кегль считается по объёму текста, лист растёт вместе с ним. Справа — раунды вечера (бутон с номером и числом вопросов) и четыре семени-числа статистики; если есть картинка — она в раме из ветвей. Переход к первому раунду — на вкладке «Переходы».' }]
const DENSE_BODY = [
  ...RULES.body,
  'Телефон держит только капитан: переключаться между вкладками во время вопроса можно, ответ при этом не потеряется',
  'Если ответ ввели по ошибке, его можно исправить дважды — окончательным считается последний',
  'В «Своей игре» цена плитки — это баллы: верный ответ прибавляет, неверный отнимает',
  'При равенстве очков выше команда, которая набрала больше в самом позднем раунде, где результаты разошлись',
]
function rulesLabView(state: string): RulesView {
  const stats = state === 'dense' || state === 'rstats'
  return {
    title: RULES.title,
    lines: state === 'rstats' ? [] : state === 'dense' ? DENSE_BODY : RULES.body,
    rounds: NIGHT.map(r => ({ n: r.n, name: r.name, count: r.count })),
    stats: stats ? [[STATS.rounds, 'раундов'], [STATS.questions, 'вопросов'], [STATS.tracks, 'треков'], [fmtMinutes(STATS.minutes), 'на игру']] : null,
    note: state === 'dense' || state === 'rimg' ? RULES.note : null,
    photo: state === 'rimg' ? IMG.coffee : null,
    layout: state as RulesLayout,
  }
}
export function Rules({ state, onReady }: S1Props) {
  const v = useMemo(() => rulesLabView(state), [state])
  return <RulesScreen v={v} onReady={onReady} />
}

// ── Вступления раундов ──
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
export function Intro5({ state, variant, nOv, onReady, teams }: S1Props) {
  if (state === 'sprint') return <Sprint variant={variant} state="intro" nOv={nOv} onReady={onReady} teams={teams} />
  if (state === 'blitz') return <Blitz variant={variant} state="intro" nOv={nOv} onReady={onReady} teams={teams} />
  if (state === 'reveal') return <Reveal3 variant={variant} state="intro" nOv={nOv} onReady={onReady} teams={teams} />
  return <RoundIntroScreen kind={state as IntroKind} intro={INTROS5[state]} onReady={onReady} />
}

// ── Табло ──
export const BOARD_STATES = [
  { id: 'regular', name: 'Обычное табло: 8 команд после раунда 2' },
  { id: 'many', name: 'Много команд: 12, длинные названия, после раунда 4' },
  { id: 'rank', name: 'Смена мест: после раунда 2 строки переезжают' },
  { id: 'tie', name: 'Ничья по сумме: итог шести раундов' },
  { id: 'final', name: 'Итоги игры: полная таблица с разбивкой по раундам' },
]
export const BOARD_VARIANTS = [{ id: 'A', name: 'Листья на ветви', note: 'Строка — лист-плашка: место (медальон), название, очки каждого сыгранного раунда (ягоды, лучшая в раунде светится), сумма. Раскрытие — с последнего места к первому. После раунда строки переезжают на новые места, у сдвинувшихся — стрелка ▲ / ▼ с числом мест. Ничья: одно место у обеих команд, их соединяет узелок лозы, выше стоит та, у кого сильнее поздний раунд.' }]
function boardLabView(state: string): BoardView {
  const cfg = state === 'regular' ? { teams: ALL.filter(t => ['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8'].includes(t.id)), upto: 2, flip: false }
    : state === 'many' ? { teams: ALL, upto: 4, flip: false }
      : state === 'rank' ? { teams: ALL, upto: 2, flip: true }
        : { teams: ALL, upto: 6, flip: false }
  const fin = state === 'final'
  const rows = rank(cfg.teams, cfg.upto)
  const before = cfg.flip ? rank(cfg.teams, cfg.upto - 1) : rows
  const bIdx = new Map(before.map((r, i) => [r.t.id, i])), bPlace = new Map(before.map(r => [r.t.id, r.place]))
  return {
    kind: state, flip: cfg.flip,
    title: fin ? 'Итоги игры' : 'Табло', sub: fin ? 'разбивка по раундам' : `после раунда ${cfg.upto} из 6`,
    cols: Array.from({ length: cfg.upto }, (_, r) => String(r + 1)),
    rows: rows.map(r => ({
      id: r.t.id, name: r.t.name, color: r.t.color, place: r.place, sum: r.sum, scores: r.t.score.slice(0, cfg.upto),
      prevSum: cfg.flip ? tot(r.t, cfg.upto - 1) : r.sum,
      delta: cfg.flip ? (bPlace.get(r.t.id) ?? r.place) - r.place : 0,
      prevIdx: bIdx.get(r.t.id),
    })),
  }
}
export function Board({ state, onReady }: S1Props) {
  const v = useMemo(() => boardLabView(state), [state])
  const { root } = useEntrance(onReady, (tl, q) => boardBuild(tl, q, v, boardLayout(v.rows.length, v.cols.length)), null, [state])
  return <BoardScreen v={v} rootRef={root} />
}

// ── Финал ──
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
const HUES = ALL.map(t => t.hue)
function finLabView(state: string): FinView {
  if (state === 'last') return { state, round: LAST.round, q: LAST.q, of: LAST.of, text: LAST.text, answer: LAST.answer }
  if (state === 'antic') return { state, hues: HUES }
  if (state === 'medals') return { state, slots: [1, 0, 2].map(k => ({ k, place: k + 1, sum: TOP[k].sum, names: [{ name: TOP[k].t.name, color: TOP[k].t.color, hue: TOP[k].t.hue }] })) }
  if (state === 'retro') return { state, cards: WIN_ROUNDS.map(w => ({ n: String(w.round.n), name: w.round.name, team: { name: w.team.name, color: w.team.color }, pts: w.pts })) }
  if (state === 'winner') return { state, names: [{ name: FINAL[0].t.name, color: FINAL[0].t.color }], sum: FINAL[0].sum, hues: HUES }
  return { state: 'party', hues: HUES, top: TOP.map(r => ({ name: r.t.name, color: r.t.color })) }
}
export function Finale(p: S1Props) {
  if (p.state === 'table') return <Board {...p} state="final" />
  return <FinLab {...p} />
}
function FinLab({ state, onReady }: S1Props) {
  const v = useMemo(() => finLabView(state), [state])
  const { root } = useEntrance(onReady, (tl, q) => finBuild(tl, q, v), null, [state])
  return <FinScreen v={v} rootRef={root} />
}

// ── Переходы ──
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
export function Trans({ state, onReady }: S1Props) {
  const [from, to] = PAIRS[state] ?? PAIRS.vine
  const bits = useMemo(transBits, [])
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
      <TransDevices state={state} bits={bits} />
    </S1Screen>
  )
}
