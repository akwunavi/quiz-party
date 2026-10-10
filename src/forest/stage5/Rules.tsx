// ═══ Этап 5 · Правила ═══
// Настоящий экран (InfoSlide → InfoSlideView): заголовок, пункты правил (каждая строка тела — отдельный пункт),
// необязательно — картинка (слева/справа/во всю ширину), сводка по раундам (номер, название, число вопросов),
// блок статистики (раунды, вопросы, треки, примерное время), сноска внизу. Нет картинки и пунктов — заголовок
// «ПРАВИЛА» слева и блоки раундов/статистики рядом.
// Лес: правила — листья на живой лозе, которая прорастает вдоль левого края сверху вниз; на каждом листе пункт с
// номером. Раунды — бутоны на второй лозе справа, статистика — четыре семени с числами. Плотный текст не сжимается
// в мелочь: кегль листа считается по объёму, а лист растёт вместе с текстом.
// Сцена рисует только то, что ей дали (пропсы): лаборатория подставляет тестовый вечер (labs/forest/stage5Lab.tsx),
// игра — настоящий слайд (forest/stage5/views.ts:rulesViewFrom). Длинные тексты вписываются замером — только если
// не влезают (на лабораторных данных ничего не меняется).
import { useLayoutEffect, useMemo } from 'react'
import { S1Screen, useEntrance, type S1Api } from '../stage1/common'
import type { Rect } from '../stage1/env'
import { FrameLayer, fitRect, type FS } from '../stage4/frames'
import { useFontsReady } from '../stage1/gameHooks'

export type RulesRound = { n: number | string; name: string; count: number }
export type RulesPhoto = { src: string; w: number; h: number; caption?: string }
/** раскладка (утверждённые состояния лаборатории): пункты; плотный текст; пункты + картинка; без пунктов */
export type RulesLayout = 'rules' | 'dense' | 'rimg' | 'rstats'
export type RulesView = {
  title: string
  lines: string[]
  rounds: RulesRound[] | null
  /** «семена» статистики: [значение, подпись] */
  stats: [string | number, string][] | null
  note: string | null
  photo: RulesPhoto | null
  layout: RulesLayout
}

const LEAF = 'M 0 50 C 2 12 28 1 60 2 C 82 3 94 22 100 50 C 94 78 82 97 60 98 C 28 99 2 88 0 50 Z'
export { fmtMinutes } from './views'

export function RulesScreen({ v, onReady }: { v: RulesView; onReady: (a: S1Api) => void }) {
  const lines = v.lines
  const dense = v.layout === 'dense', img = v.layout === 'rimg' && !!v.photo, stats = v.stats
  const fs = useMemo<FS>(() => ({ grow: [0], reveal: [0], bloom: [0], pulse: 0 }), [])
  const photo = v.photo
  const frame = useMemo(() => (photo ? [fitRect(photo, 1560, 250, 560, 600)] : []), [photo])
  const fz = lines.length > 7 ? 29 : lines.length > 5 ? 34 : 40
  const key = JSON.stringify(v)
  const fonts = useFontsReady()
  const { root } = useEntrance(onReady, (tl, q) => {
    tl.fromTo(q('.ru-title .ch'), { opacity: 0, y: 30, rotation: -6 }, { opacity: 1, y: 0, rotation: 0, duration: 0.55, stagger: 0.05, ease: 'back.out(1.8)' }, 0.1)
      .fromTo(q('.ru-vine'), { strokeDashoffset: 1400 }, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut' }, 0.2)
      .fromTo(q('.ru-pl'), { opacity: 0, x: -24, clipPath: 'inset(0 100% 0 0 round 40px)' }, { opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0 round 40px)', duration: 0.6, stagger: dense ? 0.3 : 0.45, ease: 'power2.out' }, 0.9)
    const end = 0.9 + lines.length * (dense ? 0.3 : 0.45)
    tl.fromTo(q('.ru-rd'), { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.45, stagger: 0.1 }, 0.9)
      .fromTo(q('.ru-st'), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.12, ease: 'back.out(2)' }, 1.6)
      .fromTo(q('.ru-note'), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, end)
    if (img) tl.fromTo(fs.grow, { 0: 0 }, { 0: 1, duration: 1.1, ease: 'power2.inOut' }, 0.4).fromTo(fs.reveal, { 0: 0 }, { 0: 1, duration: 0.95, ease: 'power2.inOut' }, 1.4).fromTo(fs, { pulse: 0 }, { pulse: 1.15, duration: 1.1 }, 0.4)
  }, null, [key, fs])
  const rects: Rect[] = [{ x: 60, y: 30, w: 1160, h: 980 }, { x: 1250, y: 180, w: 620, h: 780 }]
  const showTitleSide = lines.length === 0
  const hasRight = !img ? !!v.rounds : false

  // Вписывание (только если не влезает): заголовок — по ширине, пункты — кеглем до сноски/низа кадра,
  // правая колонка — масштабом до сноски/низа кадра. Порядок эффектов: после сборки таймлайна (трансформы GSAP
  // на offset* не влияют).
  useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    const $ = <T extends HTMLElement>(s: string) => el.querySelector<T>(s)
    const note = $('.ru-note')
    const floor = note ? note.offsetTop - 12 : 1060
    const title = $('.ru-title')
    if (title) {
      title.style.fontSize = showTitleSide ? '170px' : ''
      const col0 = $('.ru-right')
      const right = showTitleSide && col0 && col0.offsetHeight > 0 ? col0.offsetLeft : 1880
      let f = parseFloat(getComputedStyle(title).fontSize) || 120
      while (title.offsetLeft + title.offsetWidth > right && f > 48) { f -= 4; title.style.fontSize = `${f}px` }
    }
    const list = $('.ru-list')
    if (list) {
      list.style.setProperty('--fz', `${fz}px`)
      let f = fz
      while (list.offsetTop + list.offsetHeight > floor && f > 18) { f -= 1; list.style.setProperty('--fz', `${f}px`) }
    }
    const col = $('.ru-right')
    if (col) {
      col.style.transform = ''
      const h = col.offsetHeight, room = floor - col.offsetTop
      if (h > room && h > 0) { col.style.transformOrigin = '0 0'; col.style.transform = `scale(${Math.max(0.4, room / h).toFixed(3)})` }
    }
  }, [key, fz, fonts, showTitleSide, root])

  return (
    <S1Screen rects={rects} n={null} rootRef={root} cls={`s5 ru ru-${v.layout}`}>
      <h1 className="ru-title" style={showTitleSide ? { fontSize: 170, top: 330 } : undefined}>{v.title.split('').map((c, i) => <span key={i} className="ch">{c === ' ' ? '\u00a0' : c}</span>)}</h1>
      {!showTitleSide && <svg className="ru-svg" viewBox="0 0 1920 1080" aria-hidden><path className="ru-vine" d="M 66 190 C 40 330 96 450 60 620 S 96 880 70 1010" /></svg>}
      {!showTitleSide && <ol className="ru-list" style={{ ['--fz' as string]: `${fz}px` }}>
        {lines.map((l, i) => <li key={i} className="ru-pl"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden><path d={LEAF} /></svg><span className="idx">{String(i + 1).padStart(2, '0')}</span><span className="t">{l}</span></li>)}
      </ol>}
      <div className={`ru-right${img ? ' img' : ''}`}>
        {hasRight && v.rounds && <>
          <div className="ru-h">Раунды вечера</div>
          <ul className="ru-rounds">{v.rounds.map((r, i) => <li key={i} className="ru-rd"><b>{r.n}</b><span>{r.name}</span>{r.count > 0 && <em>{r.count} вопр.</em>}</li>)}</ul>
        </>}
        {stats && <div className="ru-stats">
          {stats.map(([val, l], i) => <div key={i} className="ru-st"><b className={String(val).length > 5 ? 'sm' : ''}>{val}</b><span>{l}</span></div>)}
        </div>}
      </div>
      {img && photo && <><FrameLayer rects={frame} srcs={[photo.src]} fs={fs} />{photo.caption && <div className="ru-cap" style={{ left: frame[0].x, width: frame[0].w, top: frame[0].y + frame[0].h + 28 }}>{photo.caption}</div>}</>}
      {v.note && <div className="ru-note">{v.note}</div>}
    </S1Screen>
  )
}
