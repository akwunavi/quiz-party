// Рамы из ветвей под картинками (утверждённая техника Концепта C) — отдельно от Std.tsx, чтобы боевые экраны
// (слайд правил в игре) могли взять их, не втягивая тестовые данные этапа 4.
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { makeFrames, type FRect } from '../stage1/mediaFrames'

export type FS = { grow: number[]; reveal: number[]; bloom: number[]; pulse: number }

/** Рамы из ветвей (утверждённая техника Концепта C) на холсте под содержимым */
export function FrameLayer({ rects, srcs, fs, panel }: { rects: FRect[]; srcs: string[]; fs: FS; panel?: number }) {
  const cv = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const ctx = cv.current!.getContext('2d')!, draw0 = makeFrames({ rects, srcs, panel }, 40)
    const draw = () => { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, 1920, 1080); draw0(ctx, fs) }
    gsap.ticker.add(draw); return () => gsap.ticker.remove(draw)
  }, [rects, srcs, fs, panel])
  return <canvas ref={cv} className="s4-cv" width={1920} height={1080} aria-hidden />
}
export function fitRect(im: { w: number; h: number }, cx: number, y: number, maxW: number, maxH: number): FRect {
  const k = Math.min(maxW / im.w, maxH / im.h), w = Math.round(im.w * k), h = Math.round(im.h * k)
  return { x: Math.round(cx - w / 2), y, w, h }
}
