// Телефон игрока: бульдоги листаются по одному (свайп/стрелки), выбор подтверждается кнопкой. Только лёгкие картинки (по ~15 КБ), без анимации —
// на телефоне держать кадры анимации (сотни МБ) нельзя. Протокол ставки прежний (ответ q-race-<раунд>), меняется до старта.
import { useEffect, useRef, useState } from 'react'
import { DOG_IDS, stillUrl } from '../lib/bulldog/config'

export function BulldogPicker({ names, counts, selected, locked, onPick }: {
  names: string[]; counts: number[]; selected: number | null; locked: boolean; onPick: (dogNumber: number) => void
}) {
  const [idx, setIdx] = useState(selected ? selected - 1 : 0)
  const box = useRef<HTMLDivElement>(null)
  // прокрутка → индекс слайда
  const onScroll = () => { const el = box.current; if (el) setIdx(Math.round(el.scrollLeft / el.clientWidth)) }
  const go = (k: number) => { const el = box.current; if (el) el.scrollTo({ left: k * el.clientWidth, behavior: 'smooth' }) }
  useEffect(() => { go(idx) /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [])
  return (
    <div className="bd-picker">
      <div className="bd-track" ref={box} onScroll={onScroll}>
        {DOG_IDS.map((id, i) => (
          <div className={`bd-slide${selected === i + 1 ? ' chosen' : ''}`} key={id}>
            <div className="bd-num">№{i + 1}</div>
            <img className="bd-img" src={stillUrl(id)} alt={names[i]} loading={Math.abs(i - idx) <= 1 ? 'eager' : 'lazy'} draggable={false} />
            <div className="bd-name">{names[i]}</div>
            <div className="bd-count">выбрали: {counts[i] ?? 0}</div>
          </div>
        ))}
      </div>
      <div className="bd-nav">
        <button className="bd-arrow" aria-label="Предыдущий" disabled={idx === 0} onClick={() => go(idx - 1)}>‹</button>
        <div className="bd-dots">{DOG_IDS.map((id, i) => <span key={id} className={i === idx ? 'on' : ''} onClick={() => go(i)} />)}</div>
        <button className="bd-arrow" aria-label="Следующий" disabled={idx === 4} onClick={() => go(idx + 1)}>›</button>
      </div>
      <button className={`pl-send${selected === idx + 1 ? ' ghosted' : ''}`} disabled={locked || selected === idx + 1} onClick={() => onPick(idx + 1)}>
        {locked ? 'ВЫБОР ЗАКРЫТ' : selected === idx + 1 ? `✓ ВЫБРАН: №${idx + 1} ${names[idx]}` : `ВЫБРАТЬ №${idx + 1} ${names[idx]}`}
      </button>
      {selected && !locked && <div className="pl-sent">Ваш выбор: №{selected} {names[selected - 1]} · можно изменить до старта</div>}
    </div>
  )
}
