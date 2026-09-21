// ═══ Таймер на экране вопроса ═══
// Вынесено из HostScreen.tsx (9.51) в ранее мёртвый файл-дубль этого же
// имени — импорт из HostScreen.tsx тянул бы весь проектор в чужой чанк
// (см. HANDOFF.md), а предпросмотру редактора и экранам раундов нужен
// РОВНО тот же компонент, не копия.
import { useEffect, useRef, useState } from 'react'
import { MagicCircleTimer } from './MagicCircleTimer'

/** Сигнал окончания таймера: ПЯТЬ коротких пиков и длинный финальный тон —
 *  как на кухонном/спортивном таймере. Синтезируем на месте: не нужен файл,
 *  не зависит от сети и не ломается, если медиа пакета не докачались.
 *  Прямоугольная волна выбрана намеренно — она резкая и пробивает шум бара. */
export function playChime() {
  try {
    const Ctx = (window.AudioContext
      ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)
    const ctx = new Ctx()
    const t0 = ctx.currentTime
    const master = ctx.createGain()
    master.gain.value = 0.5
    master.connect(ctx.destination)

    const beep = (freq: number, at: number, len: number, type: OscillatorType, vol: number) => {
      const o = ctx.createOscillator(), g = ctx.createGain()
      o.type = type
      o.frequency.setValueAtTime(freq, t0 + at)
      g.gain.setValueAtTime(0.0001, t0 + at)
      g.gain.linearRampToValueAtTime(vol, t0 + at + 0.008)
      g.gain.setValueAtTime(vol, t0 + at + len - 0.05)
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + at + len)
      o.connect(g); g.connect(master)
      o.start(t0 + at); o.stop(t0 + at + len + 0.02)
    }

    // пять пиков «пи-пи-пи-пи-пи»
    for (let i = 0; i < 5; i++) beep(1046.5, i * 0.22, 0.11, 'square', 0.30)
    // длинный финальный тон: два голоса, чтобы звучал плотнее
    beep(784, 1.20, 1.25, 'square', 0.26)
    beep(392, 1.20, 1.25, 'sine', 0.30)

    setTimeout(() => void ctx.close(), 3000)
  } catch { /* звук не критичен: игра идёт дальше */ }
}

export function Timer({ startedAt, seconds, theme, chime = true, variant }: {
  startedAt: string | null; seconds: number; theme?: string; chime?: boolean
  /** 'ring' — обычное латунное кольцо (как у classic/НГ по духу), а не
   *  Магический круг: нужно на экране `answer_time` (Р2 решения rollout'а,
   *  HANDOFF.md) — там таймер один на весь экран, крупный, и рулонная
   *  «руническая» стилистика туда не просилась. */
  variant?: 'ring'
}) {
  const [left, setLeft] = useState(seconds)
  const rang = useRef(false)
  useEffect(() => {
    if (!startedAt) { setLeft(seconds); rang.current = false; return }
    const tick = () => {
      const elapsed = (Date.now() - new Date(startedAt).getTime()) / 1000
      const l = Math.max(0, Math.ceil(seconds - elapsed))
      setLeft(l)
      // гонг ровно один раз на запуск таймера; в музыкальных раундах выключен,
      // чтобы не наложиться на трек
      if (l === 0 && chime && !rang.current) { rang.current = true; playChime() }
    }
    tick()
    const t = setInterval(tick, 250)
    return () => clearInterval(t)
  }, [startedAt, seconds, chime])
  const low = left <= 10
  if (theme === 'new_year') {
    const R = 44, C = 2 * Math.PI * R
    const frac = Math.max(0, Math.min(1, left / seconds))
    // Рождественский венок: хвойное кольцо + ягоды + бант; «выгорает» по кругу
    const needles = Array.from({ length: 40 }, (_, i) => {
      const ang = (i / 40) * Math.PI * 2
      const len = 7 + (i % 3) * 3
      return { x1: 55 + Math.cos(ang) * (R - 5), y1: 55 + Math.sin(ang) * (R - 5),
        x2: 55 + Math.cos(ang) * (R + len - 5), y2: 55 + Math.sin(ang) * (R + len - 5),
        rot: (ang * 180) / Math.PI }
    })
    const berries = Array.from({ length: 7 }, (_, i) => {
      const ang = (i / 7) * Math.PI * 2 + 0.4
      return { cx: 55 + Math.cos(ang) * R, cy: 55 + Math.sin(ang) * R }
    })
    return (
      <div className={`ny-wreath${low ? ' low' : ''}`}>
        <svg viewBox="0 0 110 110">
          {needles.map((n, i) => (
            <line key={i} x1={n.x1} y1={n.y1} x2={n.x2} y2={n.y2}
              stroke={i % 4 === 0 ? '#1f6b3a' : '#2f8f4e'} strokeWidth="3" strokeLinecap="round" />
          ))}
          <circle className="wr-bg" cx="55" cy="55" r={R} />
          <circle className="wr-fg" cx="55" cy="55" r={R}
            strokeDasharray={C} strokeDashoffset={C * (1 - frac)} />
          {berries.map((b, i) => <circle key={i} className="wr-berry" cx={b.cx} cy={b.cy} r="3.4" />)}
          <path className="wr-bow" d="M46,99 q9,-9 18,0 q-9,5 -18,0" />
        </svg>
        <span className="val">{left}</span>
      </div>
    )
  }
  // Magic: обычное латунное кольцо на answer_time (Р2), Магический круг
  // (руны) — везде ещё (шапка вопроса, .mel-count, .sprint-timer).
  if (theme === 'potter' && variant === 'ring') return (
    <div className={`timer-wrap${low ? ' low' : ''}`}>
      <span className={`timer-num${low ? ' danger' : ''}`}>{left}</span>
    </div>
  )
  if (theme === 'potter') return <MagicCircleTimer left={left} seconds={seconds} low={low} />
  // Киберпанк: искра бежит по кольцу. Замирает, когда таймер не идёт —
  // либо ещё не запущен, либо уже дотикал до нуля. Это единственный
  // элемент, по которому с дальнего конца зала видно, идёт время или нет.
  const running = !!startedAt && left > 0
  // «Не запущен» и «дотикал до нуля» — оба .paused (искра стоит на месте,
  // видно, что время не идёт), но ДО старта её вообще не должно быть на
  // экране: в этот момент нечему «стоять на месте», ведущий ещё не нажал
  // кнопку. .not-started гасит саму искру и кольцо, .paused остаётся как
  // был — сигнал «дотикало» никуда не делся.
  return (
    <div className={`timer-wrap${low ? ' low' : ''}${running ? '' : ' paused'}${
      startedAt ? '' : ' not-started'}`}>
      <span className="tm-orbit" aria-hidden="true"><i className="tm-spark" /></span>
      <span className={`timer-num${low ? ' danger' : ''}`}>{left}</span>
    </div>
  )
}
