/** Единая плитка «Своей игры» и «Угадай мелодию» — общий скелет разметки
 *  (лицо/оборот, hover-разворот), само оформление на 100% остаётся в теме.
 *
 *  НЕ импортировать из HostScreen.tsx/MelodyRound.tsx в обратную сторону —
 *  оба экрана грузятся отдельными `React.lazy`-чанками, а этот файл лежит
 *  в `components/`, чтобы не тащить один экран в чанк другого (1a).
 *
 *  Чисто презентационный компонент, без хуков внутри — снимает риск
 *  React #310 (правило проекта: хук только до раннего return, тут их и
 *  вовсе нет).
 *
 *  Тег параметризован: jeopardy — сама кнопка (`<button>`, тема красит
 *  ВСЕ кнопки, классика режет им углы clip-path'ом — превращать в <div>
 *  нельзя), melody — `<div>` (так было и раньше, `.mel-face` — дочерний
 *  span). Корень сохраняет старые классы `jp-tile`/`mel-tile` — на них
 *  завязано ~40 правил в 7 файлах, переименование того не стоит; новый
 *  класс `qtile` — только общий скелет РЯДОМ.
 */
export type TileCardProps = {
  kind: 'jeopardy' | 'melody'
  label: React.ReactNode
  /** обратная сторона (лежит на «искрящейся подложке»), по умолчанию тот
   *  же номинал, что и на лице — плитку решено НЕ прятать за эмблему */
  backLabel?: React.ReactNode
  /** номер темы для раскраски — формулы цвета не трогаем, только прокидка */
  colorIndex: number
  done?: boolean
  /** «горячая» на барабане мелодии — только там, jeopardy не использует */
  hot?: boolean
  /** клик доступен (jeopardy — всегда пока не done; melody — только в
   *  режиме «Выбрать вручную») → курсор-указатель, класс `pickable` */
  interactive?: boolean
  /** hover-разворот доступен (по решению пользователя — и у jeopardy, и у
   *  melody в manualPick; ВЫКЛЮЧЕН на `spin`, чтобы не спорить визуально
   *  с дымкой/пульсом барабана — см. HANDOFF) */
  flip?: boolean
  onClick?: () => void
  style?: React.CSSProperties
  /** мелодии нужен РЕФ НА КОРЕНЬ (не на грань) — по нему считается позиция
   *  огонька-маркера относительно доски; грань у Magic меньше корня. */
  elRef?: (el: HTMLDivElement | HTMLButtonElement | null) => void
}

export function TileCard({
  kind, label, backLabel, colorIndex, done, hot, interactive, flip, onClick, style, elRef,
}: TileCardProps) {
  const rootClass = kind === 'jeopardy' ? 'jp-tile' : 'mel-tile'
  const canFlip = !!flip && !done
  const cls = [
    'qtile', rootClass,
    done ? 'done' : '',
    hot ? 'spin' : '',
    interactive ? 'pickable' : '',
    canFlip ? 'can-flip' : '',
  ].filter(Boolean).join(' ')

  const face = (
    <span className="qt-flip">
      <span className={`qt-face qt-front${kind === 'melody' ? ' mel-face' : ''}`}>{label}</span>
      {canFlip && (
        <span className="qt-face qt-back" aria-hidden="true">{backLabel ?? label}</span>
      )}
    </span>
  )

  if (kind === 'jeopardy') {
    return (
      <button className={cls} disabled={done} data-c={colorIndex} style={style}
        ref={elRef}
        onClick={onClick}>{face}</button>
    )
  }
  return (
    <div className={cls} data-c={colorIndex} style={style}
      ref={elRef}
      onClick={interactive ? onClick : undefined}>{face}</div>
  )
}
