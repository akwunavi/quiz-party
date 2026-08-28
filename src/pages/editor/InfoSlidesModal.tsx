import { useState } from 'react'
import { InfoSlideView } from '../../components/InfoSlideView'
import { MediaSlot } from './QuestionForm'
import { mediaUrl } from '../HostScreen'
import { setPackSettings } from '../../lib/editorApi'
import type { InfoSlide, Pack } from '../../types/quiz'
import type { LoadedPack } from '../../lib/packLoader'

// ═══ РЕДАКТОР СЛАЙДОВ-БРИФИНГОВ ═══
//
// Раньше поля жались в узкую колонку настроек пакета: понять, как слайд
// будет выглядеть на проекторе, было невозможно, приходилось выкатывать и
// смотреть. Теперь это отдельная модалка во весь экран, а справа — ЖИВОЕ
// превью на том же компоненте, которым рисуется настоящий экран.
// Совпадение гарантировано разметкой, а не аккуратностью.

export function InfoSlidesModal({ pack, loaded, onClose, reload }: {
  pack: Pack
  /** Загруженный пакет нужен только ради списка раундов в превью. */
  loaded: LoadedPack | null
  onClose: () => void
  reload: () => void
}) {
  const slides = pack.settings?.info_slides ?? []
  const [sel, setSel] = useState(0)
  const [saving, setSaving] = useState(false)
  const slide: InfoSlide | undefined = slides[sel]

  const save = async (next: InfoSlide[]) => {
    setSaving(true)
    try {
      await setPackSettings(pack.id, { ...(pack.settings ?? {}), info_slides: next })
      reload()
    } finally { setSaving(false) }
  }
  const patch = (part: Partial<InfoSlide>) =>
    void save(slides.map((s, k) => (k === sel ? { ...s, ...part } : s)))
  const move = (d: number) => {
    const j = sel + d
    if (j < 0 || j >= slides.length) return
    const next = [...slides]
    ;[next[sel], next[j]] = [next[j], next[sel]]
    setSel(j); void save(next)
  }

  const rounds = (loaded?.rounds ?? [])
    .filter(r => !r.off_scoreboard)
    .map(r => ({
      id: r.id,
      name: (r.title_lines ?? []).join(' ') || '—',
      count: r.questions.filter(q => !q.hidden).length,
    }))

  return (
    <div className="slides-overlay" onClick={onClose}>
      <div className="slides-modal" onClick={e => e.stopPropagation()}>
        <div className="sm-head">
          <b>Слайды-брифинги</b>
          <span className="sm-dim">{saving ? 'сохраняю…' : 'сохраняется само'}</span>
          <button className="ghost" onClick={onClose}>Закрыть</button>
        </div>

        <div className="sm-body">
          {/* ── список слайдов ── */}
          <div className="sm-list">
            {slides.map((s, i) => (
              <button key={s.id} className={`sm-item${i === sel ? ' on' : ''}`}
                onClick={() => setSel(i)}>
                <span className="sm-num">{i + 1}</span>
                {s.title || 'без названия'}
              </button>
            ))}
            <button className="ghost" onClick={() => {
              void save([...slides, {
                id: crypto.randomUUID(), title: '', body: '', images: [], layout: 'left',
              }])
              setSel(slides.length)
            }}>+ слайд</button>
          </div>

          {/* ── поля ── */}
          <div className="sm-form">
            {!slide && <div className="sm-dim">Добавь первый слайд слева</div>}
            {slide && <>
              <label>Заголовок</label>
              <input value={slide.title} placeholder="КАК ИГРАЕМ"
                onChange={e => patch({ title: e.target.value })} />

              <label>Пункты — каждая строка отдельным пунктом</label>
              <textarea rows={7} value={slide.body}
                placeholder={'Отвечаем с телефона\nОдин ответ от команды\nОшибка не обнуляет раунд'}
                onChange={e => patch({ body: e.target.value })} />

              <label>Расположение</label>
              <div className="sm-row">
                {([['left', 'текст слева'], ['right', 'текст справа'],
                   ['full', 'во всю ширину']] as const).map(([v, t]) => (
                  <button key={v} className={`sm-chip${(slide.layout ?? 'left') === v ? ' on' : ''}`}
                    onClick={() => patch({ layout: v })}>{t}</button>
                ))}
              </div>

              <label className="sm-check">
                <input type="checkbox" checked={!!slide.show_rounds}
                  onChange={e => patch({ show_rounds: e.target.checked })} />
                список раундов с числом вопросов
              </label>

              <MediaSlot label="Картинки (до 4)" packId={pack.id} max={4} accept="image/*"
                paths={slide.images ?? []} onChange={images => patch({ images })} />

              <label>Дополнительный текст внизу</label>
              <input value={slide.note ?? ''} placeholder="сноска, условие акции, что угодно"
                onChange={e => patch({ note: e.target.value })} />

              <div className="sm-row sm-tools">
                <button className="ghost" onClick={() => move(-1)} disabled={sel === 0}>↑ выше</button>
                <button className="ghost" onClick={() => move(1)}
                  disabled={sel >= slides.length - 1}>↓ ниже</button>
                <button className="ghost sm-del" onClick={() => {
                  if (!confirm(`Удалить слайд «${slide.title || 'без названия'}»?`)) return
                  void save(slides.filter((_, k) => k !== sel))
                  setSel(Math.max(0, sel - 1))
                }}>Удалить слайд</button>
              </div>
            </>}
          </div>

          {/* ── живое превью: тот же компонент, что на проекторе ── */}
          <div className="sm-preview">
            <div className="sm-dim">так это увидит зал</div>
            <div className="sm-screen">
              {slide
                ? <InfoSlideView slide={slide} rounds={rounds} mediaUrl={mediaUrl} />
                : <div className="sm-dim" style={{ padding: 20 }}>слайд не выбран</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
