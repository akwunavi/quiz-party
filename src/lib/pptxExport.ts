// ═══ Резервная презентация (.pptx) ═══
//
// НЕ часть плана офлайн-устойчивости (issue #4/#5, HANDOFF §3al–3as) — та
// ветка про «ведущий на месте, но упал интернет» (локальный сервер бара).
// Это — про «ведущего вообще нет»: человек без доступа к паролям/серверам
// открывает готовый .pptx на рабочем столе и ведёт квиз как обычную
// презентацию с листочком для баллов. Полностью автономный файл, никакой
// сети/пароля/сервера не требует вообще. Подробности — HANDOFF.md, раздел
// про резервную презентацию.
//
// Два слоя намеренно разделены:
//  А (buildSlidePlan) — чистая функция, без сети и без pptxgenjs. Только она
//    тестируется содержательно юнит-тестами.
//  Б (renderBackupPptx) — сеть (скачивание медиа через fetchMediaBlob из
//    media.ts, та же функция, что использует офлайн-докачка пакета — не
//    дублируем разбор ответа Supabase) + сама библиотека pptxgenjs,
//    импортируется ДИНАМИЧЕСКИ, чтобы не раздувать чанк редактора.

import { fetchMediaBlob } from './media'
import type { LoadedPack, LoadedRound } from './packLoader'
import type { AnswerSpec, MechanicKey, Question, ThemeKey } from '../types/quiz'

// ── Слой А: план слайдов ────────────────────────────────

export type MediaKind = 'image' | 'audio' | 'video'

export interface SlideMediaRef {
  path: string
  kind: MediaKind
}

export type SlideKind = 'title' | 'skip' | 'round_title' | 'question' | 'answer'

export interface SlidePlan {
  kind: SlideKind
  /** Заголовок слайда (название пакета/раунда). */
  heading?: string
  /** Список строк — правила раунда, варианты ответа и т.п. */
  lines?: string[]
  /** Свободный абзац — текст вопроса, ответ free_text/none/crossword_word. */
  body?: string
  /** Медиа на слайде: картинки/аудио/видео вопроса или ответа. */
  media?: SlideMediaRef[]
  /** Заметки докладчика (правила раунда — там же, где и на слайде, но
   *  докладчик видит их и не глядя в зал). */
  notes?: string
}

export interface PresentationPlan {
  packName: string
  theme: ThemeKey
  slides: SlidePlan[]
  /** Все уникальные media-пути, упомянутые в плане — вопрос+ответ+озвучка,
   *  БЕЗ путей из пропущенных механик и скрытых (hidden) вопросов. Список
   *  для слоя Б — что качать. */
  mediaPaths: string[]
}

/** Механики, чья логика тесно завязана на приложение (плитки «Своей игры»,
 *  ставки на скачках, синхронный таймер по командам блица, аукцион
 *  мелодии) — без него это будет не та же игра, поэтому в презентацию не
 *  разворачиваются, только слайд-заглушка. Согласовано с ведущим. */
const SKIPPED_MECHANICS: readonly MechanicKey[] = ['jeopardy', 'melody', 'race', 'blitz']

function mediaKind(path: string): MediaKind {
  if (/\.(mp3|wav)$/i.test(path)) return 'audio'
  if (/\.(mp4|webm)$/i.test(path)) return 'video'
  return 'image'
}

function answerContent(a: AnswerSpec): { body?: string; lines?: string[] } {
  switch (a.mode) {
    case 'free_text':
      return { body: Array.isArray(a.display) ? a.display.join(' / ') : a.display }
    case 'choice':
      return {
        lines: a.choices.map(c =>
          `${c.key === a.correct_choice ? '✔ ' : ''}${c.key}) ${c.text}`),
      }
    case 'order': {
      const byKey = new Map(a.choices.map(c => [c.key, c.text]))
      return { lines: a.correct_order.split('').map(k => `${k} → ${byKey.get(k) ?? '?'}`) }
    }
    case 'match': {
      const lines = a.correct_pairs.map(p => {
        // Пара записана слитно как `${left}${right}` (см. QuestionForm.tsx,
        // pairOf) — левую часть находим по совпадению префикса.
        const l = a.left.find(x => p.startsWith(x))
        const r = l ? p.slice(l.length) : p
        const idx = a.right.indexOf(r)
        const rText = idx >= 0 ? (a.right_labels?.[idx] || r) : r
        return `${l ?? '?'} → ${rText}`
      })
      return { lines }
    }
    case 'crossword_word':
      return { body: a.word }
    case 'none':
      return { body: a.display }
  }
}

/** Чистая функция построения плана слайдов: без сети, без pptxgenjs,
 *  без побочных эффектов — единственный кусок этой фичи, который тестируется
 *  содержательно. Порядок раундов — как в `pack.rounds` (уже отсортирован
 *  по `position`, см. LoadedPack). */
export function buildSlidePlan(pack: LoadedPack): PresentationPlan {
  const slides: SlidePlan[] = []
  const mediaSet = new Set<string>()
  const addMedia = (path?: string | null) => { if (path) mediaSet.add(path) }

  slides.push({
    kind: 'title',
    heading: pack.name,
    lines: ['РЕЗЕРВНАЯ ПРЕЗЕНТАЦИЯ — без сети и без приложения'],
    body: `Сгенерировано: ${new Date().toLocaleDateString('ru-RU')}`,
  })

  for (const round of pack.rounds) {
    if (SKIPPED_MECHANICS.includes(round.mechanic)) {
      slides.push({
        kind: 'skip',
        heading: round.title_lines.join(' '),
        body: 'этот раунд сегодня пропускаем — нужна механика из приложения',
      })
      continue
    }
    pushRound(round, slides, addMedia)
  }

  return { packName: pack.name, theme: pack.theme, slides, mediaPaths: [...mediaSet] }
}

function pushRound(round: LoadedRound, slides: SlidePlan[], addMedia: (p?: string | null) => void): void {
  const heading = round.title_lines.join(' ')
  slides.push({
    kind: 'round_title',
    heading,
    lines: round.rules,
    notes: round.rules.join('\n'),
  })

  for (const q of round.questions) {
    if (q.hidden) continue
    pushQuestion(q, heading, slides, addMedia)
  }
}

function pushQuestion(q: Question, heading: string, slides: SlidePlan[], addMedia: (p?: string | null) => void): void {
  const qMedia: SlideMediaRef[] = []
  for (const p of q.media.question ?? []) { qMedia.push({ path: p, kind: mediaKind(p) }); addMedia(p) }
  if (q.media.voice) { qMedia.push({ path: q.media.voice, kind: 'audio' }); addMedia(q.media.voice) }

  slides.push({
    kind: 'question',
    heading,
    body: q.question_text,
    media: qMedia,
  })

  const aMedia: SlideMediaRef[] = []
  for (const p of q.media.answer ?? []) { aMedia.push({ path: p, kind: mediaKind(p) }); addMedia(p) }

  slides.push({
    kind: 'answer',
    heading,
    ...answerContent(q.answer),
    media: aMedia,
  })
}

// ── Слой Б: рендер файла (сеть + pptxgenjs) ─────────────

const MAX_EMBED_BYTES = 15 * 1024 * 1024
const CONCURRENCY = 4

/** Три палитры — hex-цвета CSS-переменных проекта (`--bg`/`--panel`/`--fg`/
 *  `--accent`/`--accent2`), НЕ CSS-темы вёрстки .theme-classic/... — тут
 *  просто три набора цветов для самого PPTX, рендер в браузере тут ни при
 *  чём, проверка headless Chromium для этого шага не нужна. */
const THEME_COLORS: Record<ThemeKey, { bg: string; panel: string; text: string; accent: string; accent2: string }> = {
  classic: { bg: '0a0f1e', panel: '101728', text: 'f2f5fa', accent: 'ea580c', accent2: '22d3ee' },
  potter: { bg: '0b0d1a', panel: '1b1630', text: 'f3e9cf', accent: 'd3a625', accent2: 'a45de2' },
  new_year: { bg: '071630', panel: '10305e', text: 'eaf3ff', accent: '7cc7ff', accent2: 'ffd700' },
}

const MIME_BY_EXT: Record<string, string> = {
  jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', gif: 'image/gif',
  mp3: 'audio/mpeg', wav: 'audio/wav', mp4: 'video/mp4', webm: 'video/webm',
}

function mimeFor(path: string): string {
  const ext = path.split('.').pop()?.toLowerCase() ?? ''
  return MIME_BY_EXT[ext] ?? 'application/octet-stream'
}

async function blobToDataUrl(blob: Blob, mime: string): Promise<string> {
  const buf = await blob.arrayBuffer()
  const bytes = new Uint8Array(buf)
  let binary = ''
  const CHUNK = 0x8000
  for (let i = 0; i < bytes.length; i += CHUNK) {
    binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK))
  }
  return `data:${mime};base64,${btoa(binary)}`
}

interface MediaFetchResult {
  dataUrl?: string
  tooLarge?: boolean
  error?: string
}

/** Скачивает все media-пути с ограниченной параллельностью (4 — как
 *  `packPreload.ts`). Ни одна ошибка одного файла не роняет остальные —
 *  каждый путь получает свой результат (успех/слишком большой/ошибка). */
async function downloadAllMedia(
  paths: string[],
  onProgress?: (done: number, total: number) => void,
): Promise<Map<string, MediaFetchResult>> {
  const results = new Map<string, MediaFetchResult>()
  let done = 0
  let cursor = 0

  async function worker() {
    while (cursor < paths.length) {
      const path = paths[cursor++]
      try {
        const blob = await fetchMediaBlob(path)
        if (blob.size > MAX_EMBED_BYTES) {
          results.set(path, { tooLarge: true })
        } else {
          results.set(path, { dataUrl: await blobToDataUrl(blob, mimeFor(path)) })
        }
      } catch (e) {
        results.set(path, { error: e instanceof Error ? e.message : 'не удалось скачать' })
      }
      done++
      onProgress?.(done, paths.length)
    }
  }

  const workers = Array.from({ length: Math.min(CONCURRENCY, paths.length) || 0 }, () => worker())
  await Promise.all(workers)
  return results
}

function fileLabel(path: string): string {
  return path.split('/').pop() ?? path
}

// минимальный интерфейс, которого нам хватает от pptxgenjs — реальные типы
// см. node_modules/pptxgenjs/types/index.d.ts, здесь только то, что используем
interface PptxSlideLike {
  background?: { color: string }
  addText: (text: string | { text: string; options?: Record<string, unknown> }[], options?: Record<string, unknown>) => unknown
  addImage: (options: Record<string, unknown>) => unknown
  addMedia: (options: Record<string, unknown>) => unknown
  addNotes: (notes: string) => unknown
}
interface PptxGenJSLike {
  layout: string
  addSlide: () => PptxSlideLike
  write: (props: { outputType: 'blob' }) => Promise<Blob>
}

function addMediaToSlide(
  slide: PptxSlideLike,
  media: SlideMediaRef[] | undefined,
  results: Map<string, MediaFetchResult>,
  x: number, y: number, w: number, h: number,
  colors: { accent: string; text: string },
): void {
  if (!media?.length) return
  // до 4 картинок в ряд — тот же лимит, что у question.media.question в игре
  const cellW = w / Math.max(media.length, 1)
  media.forEach((m, i) => {
    const res = results.get(m.path)
    const cx = x + i * cellW
    if (res?.dataUrl) {
      if (m.kind === 'image') {
        slide.addImage({ data: res.dataUrl, x: cx, y, w: cellW - 0.15, h })
      } else {
        // аудио/видео — плеер на слайде, запуск строго по клику (без
        // автовоспроизведения: программный тайминг ненадёжен, addMedia c
        // атрибутом «автоплей» библиотека не поддерживает, поведение
        // «нажми — играет» — штатное для PowerPoint-плеера)
        slide.addMedia({ type: m.kind, data: res.dataUrl, x: cx, y, w: cellW - 0.15, h })
      }
    } else {
      const note = res?.tooLarge
        ? `файл слишком большой для автовстраивания: ${fileLabel(m.path)}`
        : `медиа не удалось скачать: ${m.path}${res?.error ? ` (${res.error})` : ''}`
      slide.addText(note, {
        x: cx, y, w: cellW - 0.15, h, fontSize: 12, color: colors.accent,
        italic: true, align: 'center', valign: 'middle',
      })
    }
  })
}

/** Рендерит полный .pptx в браузере: строит план (слой А), докачивает всё
 *  упомянутое медиа, собирает файл через pptxgenjs (импортируется
 *  динамически — не раздувает чанк редактора, попадает только в чанк,
 *  который грузится по клику на кнопку экспорта). */
export async function renderBackupPptx(
  pack: LoadedPack,
  onProgress?: (done: number, total: number) => void,
): Promise<Blob> {
  const plan = buildSlidePlan(pack)
  const mediaResults = await downloadAllMedia(plan.mediaPaths, onProgress)

  const PptxGenJS = (await import('pptxgenjs')).default
  const pptx = new PptxGenJS() as unknown as PptxGenJSLike
  // играем на больших панелях (см. CLAUDE.md) — широкоэкранный формат,
  // под который готовятся современные проекторы
  pptx.layout = 'LAYOUT_16x9'

  const c = THEME_COLORS[plan.theme] ?? THEME_COLORS.classic
  const FOOTER = 'Резервная презентация · Quiz Party'
  // LAYOUT_16x9 в pptxgenjs — 10" × 5.625", НЕ 13.33×7.5 (это LAYOUT_WIDE).
  const W = 9.4 // рабочая ширина с полями 0.3" с каждой стороны

  for (const s of plan.slides) {
    const slide = pptx.addSlide()
    slide.background = { color: c.bg }

    if (s.heading) {
      slide.addText(s.heading, {
        x: 0.3, y: 0.2, w: W, h: 0.6,
        fontSize: s.kind === 'title' ? 26 : 20, bold: true, color: c.accent, align: 'left',
      })
    }

    let bodyY = s.heading ? 0.95 : 0.35
    if (s.body) {
      slide.addText(s.body, {
        x: 0.3, y: bodyY, w: W, h: 1.1,
        fontSize: 15, color: c.text, align: 'left', valign: 'top',
      })
      bodyY += 1.15
    }
    if (s.lines?.length) {
      slide.addText(s.lines.map(l => ({ text: l, options: { bullet: true, breakLine: true } })), {
        x: 0.3, y: bodyY, w: W, h: Math.max(3.0 - bodyY, 0.6),
        fontSize: 13, color: c.text, align: 'left', valign: 'top',
      })
    }

    addMediaToSlide(slide, s.media, mediaResults, 0.3, 3.15, W, 1.9, c)

    if (s.notes) slide.addNotes(s.notes)

    slide.addText(FOOTER, {
      x: 0.3, y: 5.25, w: W, h: 0.3,
      fontSize: 9, color: c.accent2, align: 'left', italic: true,
    })
  }

  return pptx.write({ outputType: 'blob' })
}
