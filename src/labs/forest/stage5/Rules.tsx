// ═══ Этап 5 · Правила ═══
// Настоящий экран (InfoSlide → InfoSlideView): заголовок, пункты правил (каждая строка тела — отдельный пункт),
// необязательно — картинка (слева/справа/во всю ширину), сводка по раундам (номер, название, число вопросов),
// блок статистики (раунды, вопросы, треки, примерное время), сноска внизу. Нет картинки и пунктов — заголовок
// «ПРАВИЛА» слева и блоки раундов/статистики рядом.
// Лес: правила — листья на живой лозе, которая прорастает вдоль левого края сверху вниз; на каждом листе пункт с
// номером. Раунды — бутоны на второй лозе справа, статистика — четыре семени с числами. Плотный текст не сжимается
// в мелочь: кегль листа считается по объёму, а лист растёт вместе с текстом.
import { S1Screen, useEntrance, type S1Props } from '../stage1/common'
import type { Rect } from '../stage1/env'
import { FrameLayer, fitRect, type FS } from '../stage4/Std'
import { IMG } from '../content'
import { NIGHT, STATS, RULES } from './data'
import { useMemo } from 'react'

export const RULES_STATES = [
  { id: 'rules', name: 'Правила: пять пунктов + раунды вечера' },
  { id: 'dense', name: 'Плотный текст: девять пунктов, раунды, статистика, сноска' },
  { id: 'rimg', name: 'Правила с картинкой и сноской' },
  { id: 'rstats', name: 'Без пунктов: раунды и статистика' },
]
export const RULES_VARIANTS = [{ id: 'A', name: 'Лоза правил', note: 'Правила — листья на лозе, которая прорастает вдоль левого края: на каждом листе пункт с номером, кегль считается по объёму текста, лист растёт вместе с ним. Справа — раунды вечера (бутон с номером и числом вопросов) и четыре семени-числа статистики; если есть картинка — она в раме из ветвей. Переход к первому раунду — на вкладке «Переходы».' }]

const LEAF = 'M 0 50 C 2 12 28 1 60 2 C 82 3 94 22 100 50 C 94 78 82 97 60 98 C 28 99 2 88 0 50 Z'
const DENSE_BODY = [
  ...RULES.body,
  'Телефон держит только капитан: переключаться между вкладками во время вопроса можно, ответ при этом не потеряется',
  'Если ответ ввели по ошибке, его можно исправить дважды — окончательным считается последний',
  'В «Своей игре» цена плитки — это баллы: верный ответ прибавляет, неверный отнимает',
  'При равенстве очков выше команда, которая набрала больше в самом позднем раунде, где результаты разошлись',
]
const fmt = (m: number) => (m < 60 ? `~${m} мин` : `~${Math.floor(m / 60)} ч ${m % 60 ? `${m % 60} мин` : ''}`.trim())

export function Rules({ state, onReady }: S1Props) {
  const lines = state === 'rstats' ? [] : state === 'dense' ? DENSE_BODY : RULES.body
  const dense = state === 'dense', img = state === 'rimg', stats = state === 'dense' || state === 'rstats'
  const fs = useMemo<FS>(() => ({ grow: [0], reveal: [0], bloom: [0], pulse: 0 }), [])
  const photo = IMG.coffee
  const frame = useMemo(() => [fitRect(photo, 1560, 250, 560, 600)], [photo])
  const fz = lines.length > 7 ? 29 : lines.length > 5 ? 34 : 40
  const { root } = useEntrance(onReady, (tl, q) => {
    tl.fromTo(q('.ru-title .ch'), { opacity: 0, y: 30, rotation: -6 }, { opacity: 1, y: 0, rotation: 0, duration: 0.55, stagger: 0.05, ease: 'back.out(1.8)' }, 0.1)
      .fromTo(q('.ru-vine'), { strokeDashoffset: 1400 }, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut' }, 0.2)
      .fromTo(q('.ru-pl'), { opacity: 0, x: -24, clipPath: 'inset(0 100% 0 0 round 40px)' }, { opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0 round 40px)', duration: 0.6, stagger: dense ? 0.3 : 0.45, ease: 'power2.out' }, 0.9)
    const end = 0.9 + lines.length * (dense ? 0.3 : 0.45)
    tl.fromTo(q('.ru-rd'), { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.45, stagger: 0.1 }, 0.9)
      .fromTo(q('.ru-st'), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.12, ease: 'back.out(2)' }, 1.6)
      .fromTo(q('.ru-note'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, end)
    if (img) tl.fromTo(fs.grow, { 0: 0 }, { 0: 1, duration: 1.1, ease: 'power2.inOut' }, 0.4).fromTo(fs.reveal, { 0: 0 }, { 0: 1, duration: 0.95, ease: 'power2.inOut' }, 1.4).fromTo(fs, { pulse: 0 }, { pulse: 1.15, duration: 1.1 }, 0.4)
  }, null, [state, fs])
  const rects: Rect[] = [{ x: 60, y: 30, w: 1160, h: 980 }, { x: 1250, y: 180, w: 620, h: 780 }]
  const showTitleSide = lines.length === 0
  return (
    <S1Screen rects={rects} n={null} rootRef={root} cls={`s5 ru ru-${state}`}>
      <h1 className="ru-title" style={showTitleSide ? { fontSize: 170, top: 330 } : undefined}>{RULES.title.split('').map((c, i) => <span key={i} className="ch">{c}</span>)}</h1>
      {!showTitleSide && <svg className="ru-svg" viewBox="0 0 1920 1080" aria-hidden><path className="ru-vine" d="M 66 190 C 40 330 96 450 60 620 S 96 880 70 1010" /></svg>}
      {!showTitleSide && <ol className="ru-list" style={{ ['--fz' as string]: `${fz}px` }}>
        {lines.map((l, i) => <li key={i} className="ru-pl"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden><path d={LEAF} /></svg><span className="idx">{String(i + 1).padStart(2, '0')}</span><span className="t">{l}</span></li>)}
      </ol>}
      <div className={`ru-right${img ? ' img' : ''}`}>
        {!img && <>
          <div className="ru-h">Раунды вечера</div>
          <ul className="ru-rounds">{NIGHT.map(r => <li key={r.n} className="ru-rd"><b>{r.n}</b><span>{r.name}</span>{r.count > 0 && <em>{r.count} вопр.</em>}</li>)}</ul>
        </>}
        {stats && <div className="ru-stats">
          {[[STATS.rounds, 'раундов'], [STATS.questions, 'вопросов'], [STATS.tracks, 'треков'], [fmt(STATS.minutes), 'на игру']].map(([v, l], i) => <div key={i} className="ru-st"><b className={String(v).length > 5 ? 'sm' : ''}>{v}</b><span>{l}</span></div>)}
        </div>}
      </div>
      {img && <><FrameLayer rects={frame} srcs={[photo.src]} fs={fs} /><div className="ru-cap" style={{ left: frame[0].x, width: frame[0].w, top: frame[0].y + frame[0].h + 28 }}>{photo.caption}</div></>}
      {(dense || img) && <div className="ru-note">{RULES.note}</div>}
    </S1Screen>
  )
}
