// ═══ Вопрос в «Волшебном лесу»: утверждённая сцена (Концепт C) на настоящем вопросе игры ═══
// Показывает вопрос, цветы-варианты/фото, таймер-одуванчик и (когда ведущий открыл ответ) свет к верному ответу.
// Игровой логики здесь нет: ответ, таймер и «показан ли ответ» приходят из общего состояния игры.
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Scene, type SceneApi } from '../Scene'
import { layoutFor, type Img, type Opt, type QInput } from './layout'
import { fontMeasure, fontReady } from './measure'
import { useImageSizes } from './useImageSizes'
import { useRealTimer } from '../useTimer'
import { useForestScene } from '../shell'

export type ForestQ = {
  id: string; text: string; options: Opt[]
  /** адреса картинок вопроса (уже через mediaUrl) */
  images: string[]
  /** ключ верного варианта (для вопросов с вариантами) */
  correctKey?: string
  /** текст верного ответа (для открытых вопросов) */
  answerText?: string
  /** первая «картинка» — место под видео вопроса (16:9), плеер рисует `renderVideo` */
  video?: boolean
}

export function ForestQuestion({ q, roundName, qno, startedAt, seconds, reveal, calm, from, renderVideo }: {
  q: ForestQ; roundName: string; qno: string
  startedAt: string | null; seconds: number
  /** ответ показан (gameState.reveal или экран разбора) */
  reveal: boolean
  /** без звука гонга и без отсчёта (предпросмотр) */
  calm?: boolean
  /** с какой главы играть появление (повтор вопросов: слайд короткий — сразу «Открывается вопрос», без затихания леса) */
  from?: string
  /** плеер видимого видео — кладётся ровно на раму первой «картинки» */
  renderVideo?: (r: { x: number; y: number; w: number; h: number }) => ReactNode
}) {
  useForestScene({ hidden: true }, 'fq')
  const sizes = useImageSizes(q.images)
  const [fonts, setFonts] = useState(false)
  useEffect(() => { let dead = false; void fontReady().then(() => { if (!dead) setFonts(true) }); return () => { dead = true } }, [])
  const layout = useMemo(() => {
    if (!sizes || !fonts) return null
    const images: Img[] = q.images.map((src, i) => (q.video && i === 0 ? { src, w: 1280, h: 720 } : { src, w: sizes[i].w, h: sizes[i].h }))
    const inp: QInput = { text: q.text, options: q.options, images, answerText: q.answerText }
    return layoutFor(inp, fontMeasure)
  }, [sizes, fonts, q.images, q.text, q.options, q.answerText])
  const tm = useRealTimer(calm ? null : startedAt, seconds, !calm)
  const api = useRef<SceneApi | null>(null)
  const tmRef = useRef(tm); tmRef.current = tm
  const push = useCallback(() => { const a = api.current; if (a) a.setTimer(tmRef.current.left, seconds) }, [seconds])
  useEffect(() => { push() }, [tm.left, push])
  const revealRef = useRef(reveal); revealRef.current = reveal
  const onReady = useCallback((a: SceneApi) => {
    api.current = a
    // ответ уже показан (обновили страницу / вернулись к вопросу) — сразу к последней главе, без повторного вступления
    if (revealRef.current && a.tl.labels.E !== undefined) a.tl.play('E')
    else if (from && a.tl.labels[from] !== undefined) a.tl.play(from)
    else a.tl.restart()
    push()
  }, [push, from])
  const correct = useMemo(() => ({ key: q.correctKey, text: q.answerText }), [q.correctKey, q.answerText])
  if (!layout) return <div className="fr-root fr-wait" />
  const vr = q.video && renderVideo ? layout.frames[0]?.r : null
  return <>
    <Scene key={`${q.id}-${reveal ? 'a' : 'q'}`} layout={layout} correct={correct} roundName={roundName} qno={qno}
      mode="quick" answer={reveal} onReady={onReady} />
    {vr && <div className="fo-video" style={{ left: vr.x, top: vr.y, width: vr.w, height: vr.h }}>{renderVideo!(vr)}</div>}
  </>
}
