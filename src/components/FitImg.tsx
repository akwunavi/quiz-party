// ═══ Картинка в ряду, выравненном ПО ВЫСОТЕ ═══
//
// Проблема: когда картинок несколько и пропорции у них разные (одна
// горизонтальная, другая почти квадратная), каждая вписывается в свою
// ячейку по-своему и ряд получается рваным по высоте. Раньше это
// приходилось лечить вручную во внешнем редакторе, подгоняя файлы.
//
// Решение — приём «выключной ряд»: ширина ячейки задаётся ПРОПОРЦИЕЙ
// картинки (flex-grow = ширина/высота). Тогда при одинаковой высоте ряда
// каждая занимает ровно свою ширину, высоты совпадают сами собой, и
// ничего не обрезается. Пропорцию узнаём у самого файла при загрузке,
// поэтому в редакторе ничего указывать не нужно.
//
// До загрузки берём 1.5 — типичная горизонтальная картинка; после onLoad
// значение уточняется, скачка не видно.
//
// Вынесено из HostScreen.tsx (9.45): импорт оттуда тянул бы за собой весь
// проектор в чужой чанк (см. CLAUDE.md, раздел про разрез бандла) — тем же
// приёмом, каким уже вынесены mediaUrl/lenClass/AfterRoundNav.
import { useState, type CSSProperties, type ReactNode } from 'react'

export function FitImg({ src, children }: { src: string; children?: ReactNode }) {
  const [ar, setAr] = useState(1.5)
  return (
    <figure className="q-img" style={{ flexGrow: ar, flexBasis: 0 } as CSSProperties}>
      <img src={src} alt="" onLoad={e => {
        const el = e.currentTarget
        if (el.naturalWidth && el.naturalHeight) setAr(el.naturalWidth / el.naturalHeight)
      }} />
      {children}
    </figure>
  )
}
