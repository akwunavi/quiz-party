// ═══ Вопрос + ОДНА картинка: композиция выбирается по оценке (singleLayout.ts) — только «Книга» ═══
// Пропорции картинки известны только после загрузки, поэтому компонент сам предзагружает файл (Image), и пока ратио нет — невидим
// (нет прыжка раскладки; если файл не грузится 2.5 с — считаем 1.5). Композиции: текст|картинка, картинка|текст, «центральная».
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { WindText } from '../../../components/QuestionText'
import { AdaptiveMedia } from './AdaptiveMedia'
import { roleRange } from './fit'
import { FOLD_GAP, bookUnit } from './safeArea'
import { chooseSingle, hashSeed, type SingleName } from './singleLayout'

const CLS: Record<SingleName, string> = { 'text|image': 'bk-c-ti', 'image|text': 'bk-c-it', 'top-center': 'bk-c-top' }

export function BookSingle({ text, src, seed }: { text: string; src: string; seed: string }) {
  const box = useRef<HTMLDivElement>(null)
  const prev = useRef<SingleName | null>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [ratio, setRatio] = useState<number | null>(null)
  useEffect(() => {
    setRatio(null)
    const im = new Image(); let dead = false
    im.onload = () => { if (!dead && im.naturalWidth && im.naturalHeight) setRatio(im.naturalWidth / im.naturalHeight) }
    im.src = src
    const t = window.setTimeout(() => { if (!dead) setRatio(r => r ?? 1.5) }, 2500)
    return () => { dead = true; clearTimeout(t) }
  }, [src])
  useLayoutEffect(() => {
    const el = box.current; if (!el) return
    const measure = () => setSize(s => (s.w === el.clientWidth && s.h === el.clientHeight ? s : { w: el.clientWidth, h: el.clientHeight }))
    measure()
    const ro = new ResizeObserver(measure); ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const u = bookUnit({ w: window.innerWidth, h: window.innerHeight })
  const len = text.trim().length
  const ch = ratio && size.w > 0 && size.h > 0
    ? chooseSingle({ ratio, textLen: len, width: size.w, height: size.h, midGap: FOLD_GAP * u, gap: 28 * u, unit: u, seed: hashSeed(seed), prev: prev.current })
    : null
  if (ch) prev.current = ch.name
  const role = ch?.name === 'top-center' ? 'above' : 'split'
  const range = () => roleRange(role, bookUnit({ w: window.innerWidth, h: window.innerHeight }), len)
  return (
    <div ref={box} className={`q-split ${ch ? CLS[ch.name] : 'bk-c-ti'}`} data-bk-comp={ch?.name} data-bk-score={ch ? ch.score.toFixed(1) : undefined}
      style={{ opacity: ch ? 1 : 0 }}>
      <div className="bk-single-text" style={ch?.name === 'top-center' ? { flex: `0 0 ${Math.ceil(ch.text.h + 24 * u)}px` } : undefined}>
        <WindText key={`${seed}:${role}`} text={text} range={range} role={role} />
      </div>
      <AdaptiveMedia key={seed} items={[{ src }]} crossFold={ch?.crossesFold ?? false} />
    </div>
  )
}
