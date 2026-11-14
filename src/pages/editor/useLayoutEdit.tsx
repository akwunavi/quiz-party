// ═══ Состояние редактора компоновки на предпросмотре вопроса (экраны «Вопрос» и «Ответ») ═══
// Вынесено из QuestionPreview.tsx, чтобы предпросмотр оставался тонкой оболочкой над боевыми компонентами (preview-no-copy.test.ts).
// Черновики подставляются в q.service.layout → QuestionScreen / AnswerScreen перерисовывают их теми же компонентами, что и проектор.
import { useRef, useState, type ReactNode } from 'react'
import { Hint, useHint } from '../../components/Hint'
import { LayoutEditor, measureRects } from './LayoutEditor'
import { themeHasFold, themeHasLayoutArea } from '../../lib/layoutArea'
import { answerLayoutUnsupportedReason, layoutStatus, layoutUnsupportedReason, screenLayout, withScreenLayout, type LayoutScreen, type Rects } from '../../lib/layoutRects'
import { saveScreenLayout } from '../../lib/layoutStore'
import { answerScreenImages } from '../../lib/answerImages'
import { mediaUrl } from '../../lib/media'
import type { LoadedPack, LoadedRound } from '../../lib/packLoader'
import type { Question } from '../../types/quiz'

type Mode = 'auto' | 'manual'
const isPic = (m: string) => !/\.(mp3|mp4|webm|wav)$/i.test(m)
const SCREENS: LayoutScreen[] = ['question', 'answer']
type PerScreen<T> = Record<LayoutScreen, T>

export function useLayoutEdit({ pack, round, q, canEdit, whyReadOnly, onSaved }: {
  pack: LoadedPack; round: LoadedRound; q: Question | undefined
  canEdit: boolean; whyReadOnly?: string | null; onSaved?: () => void
}): { qView: Question | undefined; button: ReactNode; overlay: ReactNode; screen: LayoutScreen; open: boolean } {
  const hint = useHint()
  const [open, setOpen] = useState(false)
  const [screen, setScreen] = useState<LayoutScreen>('question')
  const [modes, setModes] = useState<PerScreen<Mode>>({ question: 'auto', answer: 'auto' })
  const [drafts, setDrafts] = useState<PerScreen<Rects | null>>({ question: null, answer: null })
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<string | null>(null)
  const [service, setService] = useState<Record<string, unknown> | null>(null)   // свежий service после сохранения (до перезагрузки пакета)
  const baselines = useRef<PerScreen<Rects | null>>({ question: null, answer: null })

  const fold = themeHasFold(pack.theme)
  const qImgs = (q?.media.question ?? []).filter(isPic)
  const imgsOf = (s: LayoutScreen) => (s === 'answer' && round.mechanic !== 'four_pics' ? (q ? answerScreenImages(q.media).revealImgs : []) : qImgs)
  const curService = service ?? q?.service
  const hasText = !!q?.question_text.trim()
  const dirtyOf = (s: LayoutScreen) => (modes[s] === 'auto' ? baselines.current[s] !== null : JSON.stringify(drafts[s]) !== JSON.stringify(baselines.current[s]))
  const dirty = open && SCREENS.some(dirtyOf)

  let qView = q
  if (q && open) {
    let next: unknown = curService
    for (const s of SCREENS) next = withScreenLayout(next, s, modes[s] === 'manual' ? drafts[s] : null)
    qView = { ...q, service: next as Question['service'] }
  } else if (q && service) qView = { ...q, service: service as Question['service'] }

  const answerWhy = q ? answerLayoutUnsupportedReason(pack.theme, round.mechanic, q) : 'нет вопроса'

  const begin = () => {
    if (!q) return
    const why = layoutUnsupportedReason(pack.theme, round.mechanic, q)
    if (why) { hint.show(why); return }
    if (!canEdit) { hint.show(whyReadOnly ?? 'Нет прав на правку этого пакета.'); return }
    const b: PerScreen<Rects | null> = { question: null, answer: null }; const m: PerScreen<Mode> = { question: 'auto', answer: 'auto' }
    const msgs: string[] = []
    for (const s of SCREENS) {
      b[s] = screenLayout(curService, s, imgsOf(s), fold); m[s] = b[s] ? 'manual' : 'auto'
      if (layoutStatus(curService, s, imgsOf(s), fold) === 'stale') msgs.push(s === 'question' ? 'вопроса' : 'ответа')
    }
    baselines.current = b; setDrafts(b); setModes(m); setScreen('question')
    setStatus(msgs.length ? `Прежняя раскладка ${msgs.join(' и ')} сброшена в авто: картинки или их порядок изменились.` : null)
    setOpen(true)
  }
  const changeScreen = (s: LayoutScreen) => {
    if (s === 'answer' && answerWhy) { hint.show(answerWhy); return }
    setScreen(s)
  }
  const changeMode = (m: Mode) => {
    if (m === modes[screen]) return
    if (m === 'manual' && !drafts[screen]) {
      // замер текущего авто-вида на экране — стартовая точка; вручную двигаем уже от неё
      setDrafts(d => ({ ...d, [screen]: measureRects(pack.theme, round.mechanic, screen, imgsOf(screen).map(mediaUrl), imgsOf(screen), screen === 'question' ? hasText : true, !!q?.answer_note?.trim()) }))
    }
    setModes(x => ({ ...x, [screen]: m }))
  }
  const setDraft = (r: Rects) => setDrafts(d => ({ ...d, [screen]: r }))

  /** Записать экраны точечно (только изменённые / указанные); возвращает true при успехе. */
  const persist = async (targets: LayoutScreen[], msg: string) => {
    if (!q) return false
    setSaving(true)
    try {
      let next: Record<string, unknown> | null = null
      for (const s of targets) {
        const rects = modes[s] === 'manual' ? drafts[s] : null
        next = await saveScreenLayout(q.id, s, rects)
        baselines.current[s] = rects
        setDrafts(d => ({ ...d, [s]: rects })); setModes(x => ({ ...x, [s]: rects ? 'manual' : 'auto' }))
      }
      if (next) setService(next)
      setStatus(msg); onSaved?.()
      return true
    } catch (e) {
      hint.show('Не удалось сохранить: ' + (e instanceof Error ? e.message : 'нет связи с базой') + '. Раскладка осталась на экране — нажми «Сохранить» ещё раз.')
      return false
    } finally { setSaving(false) }
  }
  const save = async () => { if (await persist(SCREENS.filter(dirtyOf), 'Сохранено. Проектор подхватит при следующем раунде или после обновления страницы.')) setOpen(false) }
  const reset = async () => {
    setModes(x => ({ ...x, [screen]: 'auto' })); setDrafts(d => ({ ...d, [screen]: null }))
    // сброс записывает удаление ключа сразу (как и раньше); другой экран не трогаем
    if (!q) return
    setSaving(true)
    try { const next = await saveScreenLayout(q.id, screen, null); baselines.current[screen] = null; setService(next); setStatus('Раскладка сброшена в авто.'); onSaved?.() }
    catch (e) { hint.show('Не удалось сбросить: ' + (e instanceof Error ? e.message : 'нет связи с базой')) }
    finally { setSaving(false) }
  }

  const button = q && themeHasLayoutArea(pack.theme) && !open ? (
    <>
      <button type="button" className="pv-stage lay-open" onClick={begin}>Компоновка</button>
      <Hint text={hint.text} />
    </>
  ) : null
  const overlay = open ? (
    <LayoutEditor theme={pack.theme} screen={screen} onScreen={changeScreen} mode={modes[screen]} onMode={changeMode}
      draft={drafts[screen]} onDraft={setDraft} dirty={dirty} status={status} saving={saving}
      onSave={() => void save()} onCancel={() => setOpen(false)} onReset={() => void reset()} />
  ) : null
  return { qView, button, overlay, screen, open }
}
