// ═══ Вспышка перехода между экранами проектора + её переключатель ═══
//
// Декоративный слой поверх экрана: короткая вспышка при смене фазы/вопроса,
// у каждой темы своя (шум-разрыв в классике, искры+вспышка в ГП). У НГ своя
// смена экранов (SnowCurtain) — здесь для неё пусто.
//
// Ключ перехода строит ВЫЗЫВАЮЩАЯ сторона (HostScreen): для финала и рекапа
// без question_index — они листают слайды сами каждые 3-5с, и вспышка на
// каждом слайде дала бы стробоскоп в зале.
//
// Переключатель — маленькая кнопка «✨» в правом верхнем углу (виден только
// в classic/potter). ЛОКАЛЬНЫЙ: состояние живёт в localStorage ЭТОГО
// браузера, не в базе. Заводить под него колонку в game_sessions/
// packs.settings значит писать миграцию ради «посмотреть эффект на одном
// прогоне» — того не стоит. Значит переключатель НЕ синхронизирован с
// админкой на телефоне ведущего и не переживёт localStorage.clear() или
// другой браузер/вкладку.
import { useEffect, useRef, useState } from 'react'
import type { ThemeKey } from '../types/quiz'

const STORAGE_KEY = 'qp-fx-enabled'
/** Не чаще одной вспышки в 4 секунды — иначе финал «шоу» (слайд каждые 3с
 *  восемь раз подряд) мигал бы почти непрерывно. */
const MIN_GAP_MS = 4000
/** Длительность CSS-анимации каждой темы + запас на снятие из DOM.
 *  Классика: cxNoise .42s (28-theme-cyber.css) — поднято с .26s, потому что
 *  на исходной длительности пик держался меньше кадра при 60Гц и не был
 *  виден физически (проверено покадровым рендером). */
const FLASH_MS: Record<string, number> = { classic: 470, potter: 700 }

function readEnabled(): boolean {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return v === null ? true : v === '1'
  } catch { return true }
}

function writeEnabled(v: boolean) {
  try { localStorage.setItem(STORAGE_KEY, v ? '1' : '0') } catch { /* приватная вкладка — переживём */ }
}

/** `?nofx=1` в адресе — аварийный ручной выключатель на случай, если сама
 *  кнопка почему-то недоступна. Основной способ — кнопка ниже. */
function hasNofxParam(): boolean {
  return typeof location !== 'undefined' && location.href.includes('nofx=1')
}

export function ScreenFx({ theme, trigger }: { theme: ThemeKey; trigger: string }) {
  const [enabled, setEnabled] = useState(readEnabled)
  const prevTrigger = useRef<string | null>(null)
  const lastFlashAt = useRef(0)
  const [flash, setFlash] = useState<number | null>(null)

  useEffect(() => {
    const isFirst = prevTrigger.current === null
    prevTrigger.current = trigger
    if (isFirst) return
    if (!enabled) return
    if (theme === 'new_year') return
    if (typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (hasNofxParam()) return
    const now = Date.now()
    if (now - lastFlashAt.current < MIN_GAP_MS) return
    lastFlashAt.current = now
    setFlash(now)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger])

  useEffect(() => {
    if (flash === null) return
    const ms = (FLASH_MS[theme] ?? 300) + 50
    const t = setTimeout(() => setFlash(null), ms)
    return () => clearTimeout(t)
  }, [flash, theme])

  const showToggle = theme === 'classic' || theme === 'potter'

  return (
    <>
      {showToggle && (
        <button type="button" className="fx-toggle" aria-pressed={enabled}
          title={enabled ? 'Эффекты перехода включены — выключить' : 'Эффекты перехода выключены — включить'}
          onClick={() => setEnabled(v => { const next = !v; writeEnabled(next); return next })}>
          ✨
        </button>
      )}
      {flash !== null && theme === 'classic' && <CyberFlash key={flash} />}
      {flash !== null && theme === 'potter' && <PotterFlash key={flash} />}
    </>
  )
}

function CyberFlash() {
  return <div className="fx-flash fx-cyber" aria-hidden="true" />
}

function PotterFlash() {
  const motes = Array.from({ length: 22 }, (_, i) => i)
  return (
    <div className="fx-flash fx-potter" aria-hidden="true">
      {motes.map(i => (
        <span key={i} className="fx-mote" style={{
          ['--a' as string]: `${Math.round((i / motes.length) * 360)}deg`,
          ['--d' as string]: `${40 + (i % 5) * 16}px`,
          animationDelay: `${(i % 4) * 0.015}s`,
        }} />
      ))}
    </div>
  )
}
