// ═══ Тело экрана ответа для вариантов, сопоставления и порядка — общее для проектора (HostScreen.ShowAnswers) и общего AnswerScreen (предпросмотр, ручная раскладка) ═══
// Вынесено из HostScreen.tsx (10.71) БЕЗ изменения разметки и тайминга (ступени показа вариантов, подсветка верного, каскад пар/порядка); новое — только необязательный `tileRects`:
// ручная раскладка экрана ответа ставит каждую плитку в свою рамку (`layout.answer.tiles`), ступени и подсветка остаются теми же.
import { useEffect, useState } from 'react'
import type React from 'react'
import { useFitText } from '../../hooks/useFitText'
import { mediaUrl } from '../../lib/media'
import { choicesLenClass } from '../../lib/questionLayout'
import { pctStyle } from '../ManualLayout'
import type { Rect } from '../../lib/layoutRects'
import type { Question, ThemeKey } from '../../types/quiz'

/** Текст плитки в своей рамке: кегль подгоняется под доступное место (рамка задана вручную — размер заранее неизвестен). */
function FitTileText({ text }: { text: string }) {
  const fit = useFitText<HTMLSpanElement>([text], { range: () => { const h: number = (fit as React.RefObject<HTMLSpanElement | null>).current?.closest<HTMLElement>('.lay-tile')?.clientHeight ?? 60; return { min: 9, max: Math.max(12, h * 0.4) } } })
  return <span ref={fit} className="lay-tile-tx">{text}</span>
}

export const CH_STAGE2_MS = 3300        // когда подсвечивается верный вариант
export const CH_STAGGER_MS = 500        // каскад по невыпавшим вариантам
export const CH_HIGHLIGHT_MS = 900      // сама подсветка

function shuffleStable<T>(arr: T[], seedStr: string): T[] {
  let s = 0
  for (const ch of seedStr) s = (s * 31 + ch.charCodeAt(0)) >>> 0
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) >>> 0
    const j = s % (i + 1)
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}


/** Показ вариантов с интригой (п.5):
 *  0 сек — на экране два ЗАВЕДОМО НЕВЕРНЫХ варианта;
 *  3 сек — доезжают оставшиеся (среди них правильный), но ещё без подсветки;
 *  5.5 сек — подсветка верного и приглушение неверных, плавно.
 *  Место под все варианты зарезервировано сразу (visibility), поэтому
 *  раскладка не дёргается и по позиции ничего не угадывается. */
export function StagedChoices({ q, choices, imgs, theme, tileRects, final }: {
  q: Question
  choices: { key: string; text: string }[]
  imgs?: string[]
  theme?: ThemeKey
  /** ручная раскладка экрана ответа (layout.answer.tiles): каждый вариант — в своей рамке; ступени показа и подсветка те же */
  tileRects?: Rect[]
  /** предпросмотр редактора: сразу последняя ступень (верный подсвечен, неверные приглушены), без таймеров */
  final?: boolean
}) {
  const [stage, setStage] = useState(final ? 2 : 0)
  useEffect(() => {
    if (final) { setStage(2); return }
    setStage(0)
    // Вторая пара и подсветка идут почти встык: как только оставшиеся два
    // варианта на экране, ответ и так очевиден — тянуть паузу незачем.
    const t1 = setTimeout(() => setStage(1), 2200)
    const t2 = setTimeout(() => setStage(2), CH_STAGE2_MS)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [q.id, final])

  const correctKey = (q.answer as { correct_choice?: string }).correct_choice ?? ''
  const wrongs = choices.filter(c => c.key !== correctKey)
  // первые двое неверных выбираются стабильно — одинаково на всех проекторах
  const firstWave = new Set(shuffleStable(wrongs.map(c => c.key), q.id).slice(0, 2))

  const cls = (key: string) => {
    const shown = stage >= 1 || firstWave.has(key)
    if (!shown) return ' hidden-yet'
    if (stage < 2) return ''
    return key === correctKey ? ' correct' : ' dimmed'
  }
  const delay = (key: string) => (firstWave.has(key) ? 0 : 0.25 * choices
    .filter(c => !firstWave.has(c.key)).findIndex(c => c.key === key))

  // Magic: галочка рисуется stroke-dashoffset — это SVG-свойство, псевдо-
  // элементу такое не дать, поэтому реальный <svg> ребёнком, только у
  // правильной ТЕКСТОВОЙ плитки (формат 1). У картинок (формат 3) и у
  // одиночного текстового ответа (формат 2) галочки нет по решению плана.
  const magicCheck = theme === 'potter'
  if (tileRects && tileRects.length === choices.length) return (
    <>
      {choices.map((c, i) => (
        <div key={c.key} className="lay-tile" data-lay="tile" data-lay-i={i} style={pctStyle(tileRects[i])}>
          {imgs
            ? <div className={`choice-img${cls(c.key)}`} style={{ animationDelay: `${delay(c.key)}s`, width: '100%', height: '100%' }}>
                <img src={mediaUrl(imgs[i])} alt="" /><span className="key">{c.key}{c.text ? ` — ${c.text}` : ''}</span>
              </div>
            : <div className={`choice-plate lay-plate${cls(c.key)}`} style={{ animationDelay: `${delay(c.key)}s` }}>
                <span className="key">{c.key}</span><span className="lay-tile-t"><FitTileText text={c.text} /></span>
                {magicCheck && cls(c.key) === ' correct' && <MagicCheck />}
              </div>}
        </div>
      ))}
    </>
  )
  if (imgs) return (
    <div className="choice-imgs">
      {choices.map((c, i) => (
        <div key={c.key} className={`choice-img${cls(c.key)}`}
          style={{ animationDelay: `${delay(c.key)}s` }}>
          <img src={mediaUrl(imgs[i])} alt="" />
          <span className="key">{c.key}{c.text ? ` — ${c.text}` : ''}</span>
        </div>
      ))}
    </div>
  )
  return (
    <div className={`choices-grid${choicesLenClass(choices.map(c => c.text))}`}
      style={{ width: '100%', marginTop: 0, paddingTop: 0 }}>
      {choices.map(c => (
        <div key={c.key} className={`choice-plate${cls(c.key)}`}
          style={{ animationDelay: `${delay(c.key)}s` }}>
          <span className="key">{c.key}</span>{c.text}
          {magicCheck && cls(c.key) === ' correct' && <MagicCheck />}
        </div>
      ))}
    </div>
  )
}

/** Латунная галочка верного варианта (только Magic-тема) — рисуется
 *  обводкой (stroke-dashoffset), поэтому нужен настоящий <svg>, псевдо-
 *  элементу такую анимацию не дать. CSS — 35-magic-surfaces.css. */
function MagicCheck() {
  return (
    <svg className="mg-check" viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
      <path d="M4 13l5 5L20 6" fill="none" stroke="currentColor" strokeWidth="3"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Сопоставление на экране ответа: картинка №N с правильной буквой (перенос MatchAnswerGrid). */
export function MatchAnswer({ q, tileRects }: { q: Question; tileRects?: Rect[] }) {
  if (q.answer.mode !== 'match') return null
  const spec = q.answer
  const imgs = (q.media.question ?? []).filter(m => !/\.(mp3|mp4|webm|wav)$/i.test(m))
  const pairs = spec.correct_pairs
  const manual = tileRects && tileRects.length === spec.left.length ? tileRects : null
  return (
    <div className={manual ? 'match-answer lay-contents' : `match-answer n${Math.min(spec.left.length, 6)}`}>
      {spec.left.map((l, i) => {
        const right = pairs.find(p => p.startsWith(l))?.slice(l.length) ?? '—'
        // рядом с буквой показываем САМ вариант: одну букву зал не соотнесёт
        const label = (spec.right_labels ?? [])[(spec.right ?? []).indexOf(right)] || right
        return (
          <div key={l} className={manual ? 'mi lay-tile' : 'mi'} {...(manual ? { 'data-lay': 'tile', 'data-lay-i': i, style: pctStyle(manual[i]) } : {})}>
            {imgs[i] && <img src={mediaUrl(imgs[i])} alt="" />}
            <div className="mi-label">
              <b>{l} → {right}</b>
              {label && label !== right && <span className="mi-text">{label}</span>}
            </div>
          </div>
        )
      })}
    </div>
  )
}


/** Порядок на экране ответа: правильная последовательность строк (в ручной раскладке — каждая строка в своей рамке). */
export function OrderAnswer({ q, tileRects }: { q: Question; tileRects?: Rect[] }) {
  if (q.answer.mode !== 'order') return null
  const spec = q.answer
  const manual = tileRects && tileRects.length === spec.correct_order.length ? tileRects : null
  return (
    <div className={manual ? 'order-answer lay-contents' : 'order-answer'}>
      {spec.correct_order.split('').map((k, i) => {
        const c = spec.choices.find(x => x.key === k)
        return (
          <div key={i} className={manual ? 'oi lay-tile' : 'oi'} {...(manual ? { 'data-lay': 'tile', 'data-lay-i': i, style: pctStyle(manual[i]) } : {})}>
            <b>{k}</b>
            <span className="oi-pos">{i + 1}</span>
            <span className="oi-text">{c?.text ?? ''}</span>
          </div>
        )
      })}
    </div>
  )
}
