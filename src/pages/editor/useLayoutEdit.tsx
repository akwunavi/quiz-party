// ═══ Состояние редактора компоновки на предпросмотре вопроса ═══
// Вынесено из QuestionPreview.tsx, чтобы предпросмотр оставался тонкой оболочкой над боевыми компонентами (preview-no-copy.test.ts).
// Черновик подставляется в q.service.layout → QuestionScreen перерисовывает его теми же компонентами, что и проектор.
import { useRef, useState, type ReactNode } from 'react'
import { Hint, useHint } from '../../components/Hint'
import { LayoutEditor, measureRects } from './LayoutEditor'
import { layoutStatus, layoutUnsupportedReason, screenLayout, withScreenLayout, type Rects } from '../../lib/layoutRects'
import { saveScreenLayout } from '../../lib/layoutStore'
import { mediaUrl } from '../../lib/media'
import type { LoadedPack, LoadedRound } from '../../lib/packLoader'
import type { Question } from '../../types/quiz'

type Mode = 'auto' | 'manual'
const isPic = (m: string) => !/\.(mp3|mp4|webm|wav)$/i.test(m)

export function useLayoutEdit({ pack, round, q, canEdit, whyReadOnly, onSaved }: {
  pack: LoadedPack; round: LoadedRound; q: Question | undefined
  canEdit: boolean; whyReadOnly?: string | null; onSaved?: () => void
}): { qView: Question | undefined; button: ReactNode; overlay: ReactNode } {
  const hint = useHint()
  const [open, setOpen] = useState(false)
  const [screen, setScreen] = useState<'question' | 'answer'>('question')
  const [mode, setMode] = useState<Mode>('auto')
  const [draft, setDraft] = useState<Rects | null>(null)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<string | null>(null)
  const [service, setService] = useState<Record<string, unknown> | null>(null)   // свежий service после сохранения (до перезагрузки пакета)
  const baseline = useRef<Rects | null>(null)

  const imgs = (q?.media.question ?? []).filter(isPic)
  const curService = service ?? q?.service
  const hasText = !!q?.question_text.trim()
  const dirty = open && (mode === 'auto' ? baseline.current !== null : JSON.stringify(draft) !== JSON.stringify(baseline.current))

  let qView = q
  if (q && open) {
    const next = withScreenLayout(curService, 'question', mode === 'manual' ? draft : null)
    qView = { ...q, service: next as Question['service'] }
  } else if (q && service) qView = { ...q, service: service as Question['service'] }

  const begin = () => {
    if (!q) return
    if (pack.theme !== 'ny_book') { hint.show(layoutUnsupportedReason(pack.theme, round.mechanic, q) ?? ''); return }
    const why = layoutUnsupportedReason(pack.theme, round.mechanic, q)
    if (why) { hint.show(why); return }
    if (!canEdit) { hint.show(whyReadOnly ?? 'Нет прав на правку этого пакета.'); return }
    const cur = screenLayout(curService, 'question', imgs)
    baseline.current = cur; setDraft(cur); setMode(cur ? 'manual' : 'auto'); setScreen('question')
    setStatus(layoutStatus(curService, 'question', imgs) === 'stale' ? 'Прежняя раскладка сброшена в авто: картинки или их порядок изменились.' : null)
    setOpen(true)
  }
  const changeMode = (m: Mode) => {
    if (m === mode) return
    if (m === 'manual' && !draft) {
      // замер текущего авто-вида на экране — стартовая точка; вручную двигаем уже от неё
      setDraft(measureRects(imgs.map(mediaUrl), imgs, hasText))
    }
    setMode(m)
  }
  const persist = async (rects: Rects | null, msg: string) => {
    if (!q) return
    setSaving(true)
    try {
      const next = await saveScreenLayout(q.id, 'question', rects)
      setService(next); baseline.current = rects; setDraft(rects); setMode(rects ? 'manual' : 'auto'); setStatus(msg)
      onSaved?.()
      return true
    } catch (e) {
      hint.show('Не удалось сохранить: ' + (e instanceof Error ? e.message : 'нет связи с базой') + '. Раскладка осталась на экране — нажми «Сохранить» ещё раз.')
      return false
    } finally { setSaving(false) }
  }
  const save = async () => { if (await persist(mode === 'manual' ? draft : null, 'Сохранено. На проекторе — то же самое.')) setOpen(false) }
  const reset = async () => { await persist(null, 'Раскладка сброшена в авто.') }

  const button = q && pack.theme === 'ny_book' && !open ? (
    <>
      <button type="button" className="pv-stage lay-open" onClick={begin}>Компоновка</button>
      <Hint text={hint.text} />
    </>
  ) : null
  const overlay = open ? (
    <LayoutEditor screen={screen} onScreen={setScreen} mode={mode} onMode={changeMode}
      draft={draft} onDraft={setDraft} dirty={dirty} status={status} saving={saving}
      onSave={() => void save()} onCancel={() => setOpen(false)} onReset={() => void reset()} />
  ) : null
  return { qView, button, overlay }
}
