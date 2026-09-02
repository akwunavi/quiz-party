import type { InfoSlide } from '../types/quiz'
import type { PackStats } from '../lib/duration'
import { useFitText } from '../hooks/useFitText'

// ═══ ВНЕШНИЙ ВИД СЛАЙДА-БРИФИНГА ═══
//
// Вынесен отдельно НАРОЧНО: этой же разметкой рисуется и проектор, и превью
// в редакторе. Иначе превью показывало бы «примерно похожее», а ведущий
// узнавал бы о том, как слайд выглядит на самом деле, уже при гостях.
// Здесь нет ни загрузки данных, ни навигации — только показ.
//
// До 8.52 тут была ЖЁСТКАЯ раскладка на две зоны: «одна текстовая колонка
// (правила+раунды+статистика свалены подряд) плюс картинка». Четыре разных
// по смыслу блока — картинка, правила, доп. информация (note, раньше вообще
// висела отдельной полосой ПОД экраном, не участвуя в раскладке), инфо о
// раундах/вопросах — считались одним целым. Теперь это четыре независимых
// контейнера, и сетка считает место под каждый присутствующий: 1 блок — во
// весь экран, 2 — пополам, 3 — картинка (если есть) занимает свою колонку
// целиком, два текстовых блока делят вторую; без картинки — три равные
// колонки. 4 (максимум — картинка + правила + note + раунды/статистика) —
// плоская сетка 2×2, картинка НЕ крупнее остальных (так и попросили).
// lay-full: картинка — верхняя строка на всю ширину, остальное — ниже в ряд.

export type RoundLine = { id: string; name: string; count: number }

type BlockKey = 'media' | 'rules' | 'note' | 'meta'

/** «85» → «1 ч 25 мин», «40» → «40 мин» — коротко и понятно с одного взгляда. */
function formatMinutes(total: number): string {
  if (total < 60) return `~${total} мин`
  const h = Math.floor(total / 60)
  const m = total % 60
  return m > 0 ? `~${h} ч ${m} мин` : `~${h} ч`
}

/** Раскладка сетки под РЕАЛЬНО присутствующие блоки. Ключи блоков заранее
 *  упорядочены по смыслу (rules → meta → note), картинка вставляется в
 *  начало (layout left/full) или в конец (right) этого порядка — так же,
 *  как раньше решало, что идёт первым в потоке. Возвращает CSS grid-template
 *  и имя grid-area для каждого блока — простыми строковыми шаблонами,
 *  без плагинов и подбора вручную под каждое сочетание в CSS. */
function buildGrid(present: BlockKey[], hasMedia: boolean, layout: 'left' | 'right' | 'full') {
  const n = present.length
  const letter = new Map(present.map((k, i) => [k, String.fromCharCode(97 + i)]))
  const areaOf = (k: BlockKey) => letter.get(k) ?? '.'
  const rest = present.filter(k => k !== 'media')

  if (n <= 1) {
    return { columns: '1fr', rows: '1fr', areas: [areaOf(present[0])], areaOf }
  }

  if (hasMedia && layout === 'full') {
    // картинка — верхняя строка на всю ширину, остальное делит нижнюю поровну
    const belowCols = rest.map(areaOf).join(' ')
    return {
      columns: `repeat(${rest.length}, 1fr)`, rows: 'auto 1fr',
      areas: [Array(rest.length).fill(areaOf('media')).join(' '), belowCols], areaOf,
    }
  }

  if (n === 2) {
    return { columns: '1fr 1fr', rows: '1fr', areas: [present.map(areaOf).join(' ')], areaOf }
  }

  if (n === 3 && hasMedia) {
    // картинка — своя колонка целиком (две строки), два текстовых блока
    // друг под другом во второй колонке. Порядок колонок — по layout.
    const [t1, t2] = rest.map(areaOf)
    const m = areaOf('media')
    const cols = layout === 'right' ? `${t1} ${m}\n${t2} ${m}` : `${m} ${t1}\n${m} ${t2}`
    return { columns: '1fr 1fr', rows: '1fr 1fr', areas: cols.split('\n'), areaOf }
  }

  if (n === 3) {
    // без картинки — три текстовых блока поровну в ряд
    return { columns: '1fr 1fr 1fr', rows: '1fr', areas: [present.map(areaOf).join(' ')], areaOf }
  }

  // n === 4: картинка + три текстовых — плоская сетка 2×2, картинка НЕ
  // крупнее и НЕ отдельная колонка, все четыре ячейки равны.
  const [p1, p2, p3, p4] = present.map(areaOf)
  return { columns: '1fr 1fr', rows: '1fr 1fr', areas: [`${p1} ${p2}`, `${p3} ${p4}`], areaOf }
}

export function InfoSlideView({ slide, rounds, stats, mediaUrl }: {
  slide: InfoSlide
  rounds: RoundLine[]
  /** Сводная статистика пакета — блок «Раундов/Вопросов/…». Опционален:
   *  показывается только если slide.show_stats и есть что считать. */
  stats?: PackStats
  /** Преобразование пути в адрес — снаружи, чтобы файл не тянул Supabase. */
  mediaUrl: (p: string) => string
}) {
  const lines = (slide.body ?? '').split('\n').map(l => l.trim()).filter(Boolean)
  const imgs = slide.images ?? []
  const layout = slide.layout ?? 'left'
  const showRounds = !!slide.show_rounds && rounds.length > 0
  const showStats = !!slide.show_stats && !!stats
  const hasMeta = showRounds || showStats
  const hasNote = !!slide.note?.trim()
  const hasMedia = imgs.length > 0

  // Порядок смысловых блоков (без картинки) фиксированный: правила → доп.
  // информация → раунды/статистика. Картинка встаёт в начало или в конец
  // в зависимости от layout — так читатель видит её первой или последней,
  // как и раньше решал порядок в потоке.
  const textOrder: BlockKey[] = [
    ...(lines.length > 0 ? (['rules'] as const) : []),
    ...(hasNote ? (['note'] as const) : []),
    ...(hasMeta ? (['meta'] as const) : []),
  ]
  const present: BlockKey[] = hasMedia
    ? (layout === 'right' ? [...textOrder, 'media'] : ['media', ...textOrder])
    : textOrder

  // Сколько блоков одновременно и какой формы сетка — заранее не известно
  // (зависит от галочек ведущего), а значит и от того, сколько реально
  // достанется места КОНКРЕТНОМУ блоку, никакая формула по vw/cqw не знает
  // заранее. Тот же приём, что у текста вопроса (useFitText, 8.46) и у
  // таблиц итогов (8.48): кегль каждого блока подгоняется ЗАМЕРОМ под его
  // реальную ячейку, а не угадывается наперёд. Три хука — фиксированное
  // число (правило хуков), реф навешивается только на смонтированный блок.
  const fitRules = useFitText<HTMLUListElement>([lines.length, present.length])
  const fitNote = useFitText<HTMLDivElement>([slide.note, present.length])
  const fitMeta = useFitText<HTMLDivElement>(
    [rounds.length, showRounds, showStats, present.length])

  if (present.length === 0) {
    // пустой слайд (текста нет вообще) — просто заголовок, ничего не считаем
    return (
      <div className={`host-screen grid-bg info-screen lay-${layout}`}>
        <div className="host-topbar"><span className="mono-tag">{slide.title || 'ПРАВИЛА'}</span></div>
      </div>
    )
  }

  const grid = buildGrid(present, hasMedia, layout)

  const blockNode = (key: BlockKey) => {
    switch (key) {
      case 'media':
        return (
          <div key={key} className={`q-media-grid n${Math.min(imgs.length, 4)}${
            imgs.length > 1 ? ' eq-row' : ''} info-media`} style={{ gridArea: grid.areaOf('media') }}>
            {imgs.map((m, i) => (
              <figure key={i} className="q-img"><img src={mediaUrl(m)} alt="" /></figure>
            ))}
          </div>
        )
      case 'rules':
        return (
          <div key={key} className="info-block ib-rules" style={{ gridArea: grid.areaOf('rules') }}>
            <ul className="info-list" ref={fitRules}>
              {lines.map((l, i) => (
                <li key={i} style={{ animationDelay: `${0.12 * i}s` }}>{l}</li>
              ))}
            </ul>
          </div>
        )
      case 'note':
        return (
          <div key={key} className="info-block ib-note" style={{ gridArea: grid.areaOf('note') }}>
            <div className="info-note" ref={fitNote}>{slide.note}</div>
          </div>
        )
      case 'meta':
        return (
          <div key={key} className="info-block ib-meta" style={{ gridArea: grid.areaOf('meta') }}>
            <div className="ib-meta-fit" ref={fitMeta}>
              {showRounds && (
                <div className="info-rounds">
                  {rounds.map((r, i) => (
                    <div key={r.id} className="info-round">
                      <span className="ir-num">{i + 1}</span>
                      <span className="ir-name">{r.name}</span>
                      <span className="ir-count">{r.count} вопр.</span>
                    </div>
                  ))}
                </div>
              )}
              {showStats && (
                <ul className="info-stats">
                  <li>Раундов: {stats!.roundsCount}</li>
                  <li>Вопросов: {stats!.questionsCount}</li>
                  {stats!.hasMiniGame && <li>Мини-игра: 1</li>}
                  {stats!.musicTracks > 0 && <li>Музыкальных треков: {stats!.musicTracks} шт</li>}
                  <li>Примерное время игры: {formatMinutes(stats!.totalMinutes)}</li>
                </ul>
              )}
            </div>
          </div>
        )
    }
  }

  return (
    <div className={`host-screen grid-bg info-screen lay-${layout}${hasMedia ? ' has-media' : ''}`}
      data-blocks={present.length}>
      <div className="host-topbar">
        <span className="mono-tag">{slide.title || 'ПРАВИЛА'}</span>
      </div>
      <div className="info-body" style={{
        gridTemplateColumns: grid.columns, gridTemplateRows: grid.rows,
        gridTemplateAreas: grid.areas.map(r => `"${r}"`).join(' '),
      }}>
        {present.map(blockNode)}
      </div>
    </div>
  )
}
