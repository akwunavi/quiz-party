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
//
// ⚠ ИСТОЧНИК ИСТИНЫ — РЕАЛЬНЫЙ ИГРОВОЙ FLOW (HostScreen.tsx/flow.ts), А НЕ
// «вопрос-ответ-вопрос-ответ». Порядок слайдов раунда определяется полем
// `round.answers_reveal` — тем же полем, что решает, когда HostScreen
// показывает кнопку «Показать ответ» (см. HostScreen.tsx ~451-600):
//   after_question — ответ показывается сразу за своим вопросом (и в
//     презентации так же: Q1,A1,Q2,A2,...);
//   after_round — все вопросы раунда идут подряд, потом (если включено)
//     повтор вопросов слайдами (`recap_before_answers`), потом «время на
//     ответы», и только потом отдельным блоком все ответы подряд;
//   never — ответ не показывается на экране НИКОГДА (ведущий объявляет
//     вслух не по презентации) — слайдов-ответов для такого раунда нет
//     вовсе, верный ответ уходит только в заметки докладчика.
// После раунда — «табло»/«перерыв», если у раунда включены
// `show_scoreboard_after`/`break_after_minutes` (та же логика, что в
// `lib/flow.ts:afterRoundStep`, но без реальных цифр — на момент экспорта
// игра ещё не сыграна, это просто пауза-подсказка ведущему).

import { fetchMediaBlob } from './media'
import { metaLine, displayRoundNumber } from './roundMeta'
import type { LoadedPack, LoadedRound } from './roundMeta'
import type { AnswerSpec, ChoiceOption, MechanicKey, Question, ThemeKey } from '../types/quiz'

// ── Слой А: план слайдов ────────────────────────────────

export type MediaKind = 'image' | 'audio' | 'video'

export interface SlideMediaRef {
  path: string
  kind: MediaKind
}

/** Плитка выбора (choice/order на вопросе — без пометки; order/match-цели —
 *  тоже без пометки; choice/order на ответе — с пометкой верного). */
export interface SlideChoice {
  key: string
  text: string
  correct?: boolean
}

export type SlideKind =
  | 'title' | 'round_intro' | 'question' | 'recap' | 'answer'
  | 'answer_time' | 'scoreboard' | 'break'

export interface SlidePlan {
  kind: SlideKind
  /** Заголовок слайда (название пакета/раунда). */
  heading?: string
  /** Подпись под заголовком (мета-строка раунда или «ВОПРОС n/N»). */
  meta?: string
  /** Список строк — правила раунда, ответ order/match и т.п. */
  lines?: string[]
  /** Свободный абзац — текст вопроса, ответ free_text/none/crossword_word. */
  body?: string
  /** Плитки choice/order (вопрос — без пометки, ответ — верная помечена)
   *  или список целей match на экране вопроса (без пометки). */
  choices?: SlideChoice[]
  /** Медиа на слайде: картинки/аудио/видео вопроса или ответа. */
  media?: SlideMediaRef[]
  /** Если задано — рисуем тематический значок таймера с этим числом. */
  timerSeconds?: number
  /** Заметки докладчика — правила раунда (там же, где на слайде, но видны
   *  только ведущему), а для answers_reveal:'never' ЕЩЁ И верный ответ,
   *  который на экран никогда не выводится. */
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
 *  мелодии) — без него это будет не та же игра. По решению ведущего такие
 *  раунды в презентации не появляются ВООБЩЕ — ни заголовка, ни заглушки,
 *  как будто их и нет (не путать с более ранней версией, где здесь был
 *  слайд-заглушка «этот раунд сегодня пропускаем»). */
const SKIPPED_MECHANICS: readonly MechanicKey[] = ['jeopardy', 'melody', 'race', 'blitz']

function mediaKind(path: string): MediaKind {
  if (/\.(mp3|wav)$/i.test(path)) return 'audio'
  if (/\.(mp4|webm)$/i.test(path)) return 'video'
  return 'image'
}

function questionMedia(q: Question, addMedia: (p?: string | null) => void): SlideMediaRef[] {
  const out: SlideMediaRef[] = []
  for (const p of q.media.question ?? []) { out.push({ path: p, kind: mediaKind(p) }); addMedia(p) }
  if (q.media.voice) { out.push({ path: q.media.voice, kind: 'audio' }); addMedia(q.media.voice) }
  return out
}

function answerMedia(q: Question, addMedia: (p?: string | null) => void): SlideMediaRef[] {
  const out: SlideMediaRef[] = []
  for (const p of q.media.answer ?? []) { out.push({ path: p, kind: mediaKind(p) }); addMedia(p) }
  return out
}

/** Плитки choice/order на ЭКРАНЕ ВОПРОСА — те же варианты, что видит зал ДО
 *  раскрытия (HostScreen.tsx: `choices = mode==='choice'||mode==='order'
 *  ? a.choices : null`, рисуются `.choices-grid`), без пометки верного. */
function questionChoices(a: AnswerSpec): SlideChoice[] | undefined {
  if (a.mode === 'choice' || a.mode === 'order') {
    return a.choices.map(c => ({ key: c.key, text: c.text }))
  }
  if (a.mode === 'match' && a.right_labels?.some(Boolean)) {
    return a.right.map((r, i) => ({ key: r, text: a.right_labels?.[i] ?? '' }))
  }
  return undefined
}

/** Содержимое ОТВЕТА. choice/order возвращаются как choices (с пометкой
 *  верного) — рисуются теми же плитками, что и на вопросе, только с
 *  подсветкой; остальные режимы — текстом/строками, как раньше. */
function answerContent(a: AnswerSpec): { body?: string; lines?: string[]; choices?: SlideChoice[] } {
  switch (a.mode) {
    case 'free_text':
      return { body: Array.isArray(a.display) ? a.display.join(' / ') : a.display }
    case 'choice':
      return { choices: a.choices.map(c => ({ key: c.key, text: c.text, correct: c.key === a.correct_choice })) }
    case 'order': {
      const byKey = new Map<string, ChoiceOption>(a.choices.map(c => [c.key, c]))
      return {
        choices: a.correct_order.split('').map((k, i) =>
          ({ key: String(i + 1), text: byKey.get(k)?.text ?? '?', correct: true })),
      }
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

/** Верный ответ ОДНОЙ строкой — только для заметок докладчика при
 *  `answers_reveal:'never'` (на экран этот текст никогда не идёт). */
function answerPlainText(a: AnswerSpec): string {
  switch (a.mode) {
    case 'free_text': return Array.isArray(a.display) ? a.display.join(' / ') : a.display
    case 'choice': return a.choices.find(c => c.key === a.correct_choice)?.text ?? a.display
    case 'order': {
      const byKey = new Map(a.choices.map(c => [c.key, c.text]))
      return a.correct_order.split('').map(k => byKey.get(k) ?? '?').join(' → ')
    }
    case 'match': return answerContent(a).lines?.join('; ') ?? ''
    case 'crossword_word': return a.word
    case 'none': return a.display
  }
}

function questionSlide(q: Question, heading: string, meta: string, timerSeconds: number,
  addMedia: (p?: string | null) => void): SlidePlan {
  return {
    kind: 'question', heading, meta,
    body: q.question_text || undefined,
    choices: questionChoices(q.answer),
    media: questionMedia(q, addMedia),
    timerSeconds,
  }
}

function answerSlide(q: Question, heading: string, meta: string,
  addMedia: (p?: string | null) => void): SlidePlan {
  return {
    kind: 'answer', heading, meta,
    ...answerContent(q.answer),
    media: answerMedia(q, addMedia),
  }
}

function recapSlide(q: Question, i: number, total: number,
  addMedia: (p?: string | null) => void): SlidePlan {
  return {
    kind: 'recap', heading: 'ПОВТОР ВОПРОСОВ', meta: `${i + 1} / ${total}`,
    body: q.question_text || undefined,
    media: (q.media.question ?? [])
      .filter(p => !/\.(mp3|wav|mp4|webm)$/i.test(p))
      .map(p => { addMedia(p); return { path: p, kind: mediaKind(p) } }),
  }
}

/** Один раунд → слайды, в порядке, который реально увидел бы зал —
 *  определяется `round.answers_reveal`, см. разбор в шапке файла. */
function buildRoundSlides(pack: LoadedPack, roundIdx: number, round: LoadedRound,
  addMedia: (p?: string | null) => void): SlidePlan[] {
  const heading = round.title_lines.join(' ')
  const roundLabel = `РАУНД ${displayRoundNumber(pack, roundIdx)}`
  const qs = round.questions.filter(q => !q.hidden)
  const slides: SlidePlan[] = [{
    kind: 'round_intro', heading,
    meta: `${roundLabel} · ${metaLine(round)}`,
    lines: round.rules,
    timerSeconds: round.timer_seconds || undefined,
    notes: round.rules.join('\n') || undefined,
  }]
  if (qs.length === 0) return slides

  const qMeta = (i: number) => `${roundLabel} :: ВОПРОС ${i + 1} / ${qs.length}`

  if (round.answers_reveal === 'after_question') {
    for (let i = 0; i < qs.length; i++) {
      slides.push(questionSlide(qs[i], heading, qMeta(i), round.timer_seconds, addMedia))
      slides.push(answerSlide(qs[i], heading, qMeta(i), addMedia))
    }
    return slides
  }

  for (let i = 0; i < qs.length; i++) {
    slides.push(questionSlide(qs[i], heading, qMeta(i), round.timer_seconds, addMedia))
  }

  if (round.answers_reveal === 'never') return slides

  // after_round: опциональный повтор вопросов, «время на ответы», потом
  // отдельным блоком все ответы — см. RoundScreen.tsx (галочка «повторить
  // вопросы слайдами») и HostScreen.tsx (AnswerTime/ShowAnswers).
  const settings = round.settings as {
    recap_before_answers?: boolean; answerTimeSeconds?: number
  }
  if (settings.recap_before_answers) {
    qs.forEach((q, i) => slides.push(recapSlide(q, i, qs.length, addMedia)))
  }
  slides.push({
    kind: 'answer_time', heading: 'ВРЕМЯ НА ОТВЕТЫ',
    body: 'ОТВЕЧАЙТЕ!',
    timerSeconds: settings.answerTimeSeconds ?? 60,
  })
  for (let i = 0; i < qs.length; i++) {
    slides.push(answerSlide(qs[i], heading, qMeta(i), addMedia))
  }
  return slides
}

/** Верный ответ каждого вопроса `never`-раунда — только в заметки
 *  докладчика последнего слайда раунда (вопросы), на экран не идёт. */
function attachNeverNotes(round: LoadedRound, slides: SlidePlan[]): void {
  if (round.answers_reveal !== 'never') return
  const qs = round.questions.filter(q => !q.hidden)
  const notes = qs.map((q, i) => `${i + 1}. ${answerPlainText(q.answer)}`).join('\n')
  if (!notes) return
  const last = slides[slides.length - 1]
  last.notes = last.notes ? `${last.notes}\n\n${notes}` : notes
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

  let hadAnyRound = false
  for (let idx = 0; idx < pack.rounds.length; idx++) {
    const round = pack.rounds[idx]
    if (SKIPPED_MECHANICS.includes(round.mechanic)) continue
    hadAnyRound = true

    const roundSlides = buildRoundSlides(pack, idx, round, addMedia)
    attachNeverNotes(round, roundSlides)
    slides.push(...roundSlides)

    // после раунда — табло/перерыв, ровно та же логика источников, что у
    // afterRoundStep (lib/flow.ts), но без реальных цифр (игра ещё не
    // сыграна на момент экспорта — это пауза-подсказка ведущему, не попытка
    // изобразить живые данные).
    const s = round.settings as { show_scoreboard_after?: boolean; break_after_minutes?: number }
    if (s.show_scoreboard_after) {
      slides.push({ kind: 'scoreboard', heading: 'ТАБЛО', body: 'Впишите текущие баллы команд' })
    }
    if (s.break_after_minutes) {
      slides.push({ kind: 'break', heading: 'ПЕРЕРЫВ', body: `${s.break_after_minutes} мин` })
    }
  }

  if (hadAnyRound) {
    slides.push({ kind: 'title', heading: 'ФИНАЛ', body: 'Подведите итоги — как в игре' })
  }

  return { packName: pack.name, theme: pack.theme, slides, mediaPaths: [...mediaSet] }
}

// ── Слой Б: рендер файла (сеть + pptxgenjs) ─────────────

const MAX_EMBED_BYTES = 15 * 1024 * 1024
const CONCURRENCY = 4

/** Три палитры — hex-цвета реальных токенов темы (`--bg`/`--mg-brass` и
 *  т.п. — сверено с `src/styles/parts/33-magic-tokens.css`/`14-theme-
 *  potter.css` и аналогами classic/new_year), НЕ CSS-темы вёрстки
 *  .theme-classic/... — тут просто набор цветов для самого PPTX, рендер в
 *  браузере тут ни при чём. */
const THEME_COLORS: Record<ThemeKey, {
  bg: string; panel: string; panelLine: string; text: string; muted: string
  accent: string; accent2: string; danger: string
}> = {
  classic: {
    bg: '0a0f1e', panel: '101728', panelLine: 'ea580c', text: 'f2f5fa', muted: '93a3b8',
    accent: 'ea580c', accent2: '22d3ee', danger: 'ff4d4d',
  },
  // Magic (8.99, ключ темы в коде остаётся 'potter'): «Хрустальный шар» →
  // карточка (9.40) — латунь на глубоком фиолетовом бархате.
  potter: {
    bg: '0a0813', panel: '1e1934', panelLine: 'c9a668', text: 'efe9fb', muted: 'b9ab84',
    accent: 'c9a668', accent2: 'ff8f6a', danger: 'ff8f6a',
  },
  new_year: {
    bg: '071630', panel: '10305e', panelLine: '7cc7ff', text: 'eaf3ff', muted: 'a9c8ef',
    accent: '7cc7ff', accent2: 'ffd700', danger: 'ff6b6b',
  },
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
  addShape: (shapeType: string, options: Record<string, unknown>) => unknown
  addNotes: (notes: string) => unknown
}
interface PptxGenJSLike {
  layout: string
  addSlide: () => PptxSlideLike
  write: (props: { outputType: 'blob' }) => Promise<Blob>
}

type Colors = typeof THEME_COLORS[ThemeKey]

// LAYOUT_16x9 в pptxgenjs — 10" × 5.625", НЕ 13.33×7.5 (это LAYOUT_WIDE).
const PAGE_W = 10, PAGE_H = 5.625
const MARGIN = 0.35
const W = PAGE_W - MARGIN * 2 // рабочая ширина

/** Тематическая рамка-панель под контентом — статичный эквивалент
 *  `.hud-frame`/`.mg-frame`/`.rules-frame`: тонкий цветной контур, тёмная
 *  подложка чуть светлее фона, скруглённые углы. PPTX не умеет clip-path
 *  засечек классики/латунного стекла ГП — берём ближайший качественный
 *  эквивалент, общий для тем (п.9 ТЗ). */
function addPanel(slide: PptxSlideLike, x: number, y: number, w: number, h: number, c: Colors): void {
  slide.addShape('roundRect', {
    x, y, w, h, rectRadius: 0.06,
    fill: { color: c.panel, transparency: 8 },
    line: { color: c.panelLine, width: 1.25 },
  })
}

/** Тематический значок таймера — статичное кольцо с числом секунд внутри,
 *  ближайший эквивалент кольцевых/змеиных/рунических таймеров проектора
 *  (п.7 ТЗ: не текст «Время: 30 секунд», а визуальный индикатор в духе
 *  темы). Полное кольцо = «выдано столько-то времени», не прогресс — PPTX
 *  не тикает, имитировать реальный отсчёт незачем и не нужно. */
function addTimerBadge(slide: PptxSlideLike, cx: number, cy: number, r: number,
  seconds: number, c: Colors): void {
  const d = r * 2
  slide.addShape('ellipse', {
    x: cx - r, y: cy - r, w: d, h: d,
    fill: { color: c.bg, transparency: 15 },
    line: { color: c.accent, width: 2.25 },
  })
  slide.addShape('ellipse', {
    x: cx - r * 0.62, y: cy - r * 0.62, w: r * 1.24, h: r * 1.24,
    fill: { type: 'none' }, line: { color: c.accent, width: 0.75, dashType: 'dash' },
  })
  slide.addText(String(seconds), {
    x: cx - r, y: cy - r * 0.42, w: d, h: r * 0.6,
    fontSize: Math.max(11, Math.min(22, r * 22)), bold: true, color: c.accent,
    align: 'center', valign: 'middle', fontFace: 'Georgia',
  })
  slide.addText('сек', {
    x: cx - r, y: cy + r * 0.14, w: d, h: r * 0.4,
    fontSize: Math.max(7, r * 8), color: c.muted, align: 'center', valign: 'top',
  })
}

/** Ряд плиток choice/order/match-целей — статичный эквивалент
 *  `.choices-grid`/`.choice-plate`: на вопросе все плитки нейтральные, на
 *  ответе верная (или все, для order) подсвечена акцентной заливкой. */
function addChoicesGrid(slide: PptxSlideLike, choices: SlideChoice[],
  x: number, y: number, w: number, h: number, c: Colors): void {
  const cols = choices.length > 6 ? 3 : choices.length > 3 ? 2 : 1
  const rows = Math.ceil(choices.length / cols)
  const gap = 0.1
  const cellW = (w - gap * (cols - 1)) / cols
  const cellH = (h - gap * (rows - 1)) / rows
  choices.forEach((ch, i) => {
    const col = i % cols, row = Math.floor(i / cols)
    const cx = x + col * (cellW + gap), cy = y + row * (cellH + gap)
    slide.addShape('roundRect', {
      x: cx, y: cy, w: cellW, h: cellH, rectRadius: 0.08,
      fill: { color: ch.correct ? c.accent : c.panel, transparency: ch.correct ? 0 : 10 },
      line: { color: c.panelLine, width: ch.correct ? 1.5 : 0.75 },
    })
    slide.addText(`${ch.key})  ${ch.text}`, {
      x: cx + 0.08, y: cy, w: cellW - 0.16, h: cellH,
      fontSize: 13, bold: !!ch.correct, color: ch.correct ? c.bg : c.text,
      align: 'left', valign: 'middle',
    })
  })
}

function addMediaRow(
  slide: PptxSlideLike,
  media: SlideMediaRef[] | undefined,
  results: Map<string, MediaFetchResult>,
  x: number, y: number, w: number, h: number,
  c: Colors,
): void {
  const visible = media?.filter(m => m.kind !== 'audio') ?? []
  if (!visible.length) return
  // до 4 картинок в ряд — тот же лимит, что у question.media.question в игре
  const cellW = (w - 0.12 * (visible.length - 1)) / Math.max(visible.length, 1)
  visible.forEach((m, i) => {
    const res = results.get(m.path)
    const cx = x + i * (cellW + 0.12)
    if (res?.dataUrl) {
      if (m.kind === 'image') {
        slide.addImage({ data: res.dataUrl, x: cx, y, w: cellW, h, sizing: { type: 'contain', w: cellW, h } })
      } else {
        slide.addMedia({ type: m.kind, data: res.dataUrl, x: cx, y, w: cellW, h })
      }
    } else {
      const note = res?.tooLarge
        ? `файл слишком большой для автовстраивания: ${fileLabel(m.path)}`
        : `медиа не удалось скачать: ${m.path}${res?.error ? ` (${res.error})` : ''}`
      slide.addShape('roundRect', {
        x: cx, y, w: cellW, h, rectRadius: 0.06,
        fill: { color: c.panel, transparency: 8 }, line: { color: c.danger, width: 1 },
      })
      slide.addText(note, {
        x: cx + 0.08, y, w: cellW - 0.16, h, fontSize: 11, color: c.danger,
        italic: true, align: 'center', valign: 'middle',
      })
    }
  })
  const audio = media?.find(m => m.kind === 'audio')
  if (audio) {
    const res = results.get(audio.path)
    if (res?.dataUrl) {
      // аудио — плеер на слайде, запуск строго по клику (без автовоспроиз-
      // ведения: программный тайминг ненадёжен, addMedia c атрибутом
      // «автоплей» библиотека не поддерживает, поведение «нажми — играет» —
      // штатное для PowerPoint-плеера)
      slide.addMedia({ type: 'audio', data: res.dataUrl, x, y: y + h + 0.06, w: 0.5, h: 0.4 })
    }
  }
}

function slideHeader(slide: PptxSlideLike, s: SlidePlan, c: Colors): number {
  let y = MARGIN
  if (s.heading) {
    slide.addText(s.heading, {
      x: MARGIN, y, w: W, h: 0.55,
      fontSize: s.kind === 'title' ? 30 : 21, bold: true, color: c.accent, align: 'left',
      fontFace: 'Georgia',
    })
    y += 0.5
  }
  if (s.meta) {
    slide.addText(s.meta, {
      x: MARGIN, y, w: W, h: 0.32,
      fontSize: 12, color: c.muted, align: 'left', charSpacing: 1,
    })
    y += 0.4
  }
  return y
}

function footer(slide: PptxSlideLike, c: Colors): void {
  slide.addText('Резервная презентация · Quiz Party', {
    x: MARGIN, y: PAGE_H - 0.32, w: W, h: 0.26,
    fontSize: 8, color: c.accent2, align: 'left', italic: true,
  })
}

/** Крупный титульный слайд — обложка пакета и финал. */
function renderTitleSlide(slide: PptxSlideLike, s: SlidePlan, c: Colors): void {
  addPanel(slide, MARGIN, 1.0, W, 3.2, c)
  slide.addText(s.heading ?? '', {
    x: MARGIN + 0.3, y: 1.5, w: W - 0.6, h: 1.0,
    fontSize: 34, bold: true, color: c.accent, align: 'center', valign: 'middle', fontFace: 'Georgia',
  })
  if (s.body) {
    slide.addText(s.body, {
      x: MARGIN + 0.3, y: 2.6, w: W - 0.6, h: 0.5,
      fontSize: 15, color: c.text, align: 'center',
    })
  }
  if (s.lines?.length) {
    slide.addText(s.lines.join('\n'), {
      x: MARGIN + 0.3, y: 3.15, w: W - 0.6, h: 0.8,
      fontSize: 12, color: c.muted, align: 'center', italic: true,
    })
  }
}

/** Заставка раунда: заголовок + мета + правила в рамке + таймер-значок. */
function renderRoundIntroSlide(slide: PptxSlideLike, s: SlidePlan, c: Colors): void {
  const y = slideHeader(slide, s, c)
  if (s.timerSeconds) addTimerBadge(slide, PAGE_W - MARGIN - 0.5, MARGIN + 0.5, 0.5, s.timerSeconds, c)
  if (s.lines?.length) {
    addPanel(slide, MARGIN, y + 0.1, W, PAGE_H - y - 0.5, c)
    slide.addText(s.lines.map((l, i) => ({ text: `${i + 1}. ${l}`, options: { breakLine: true } })), {
      x: MARGIN + 0.25, y: y + 0.3, w: W - 0.5, h: PAGE_H - y - 0.9,
      fontSize: 16, color: c.text, align: 'left', valign: 'top', lineSpacingMultiple: 1.3,
    })
  }
}

/** Слайд вопроса: текст в рамке, плитки choice/order/match-целей без
 *  пометки, картинки рядом, таймер-значок в углу. */
function renderQuestionSlide(slide: PptxSlideLike, s: SlidePlan, c: Colors,
  media: Map<string, MediaFetchResult>): void {
  const y = slideHeader(slide, s, c)
  if (s.timerSeconds) addTimerBadge(slide, PAGE_W - MARGIN - 0.42, MARGIN + 0.42, 0.42, s.timerSeconds, c)

  let cy = y + 0.1
  if (s.body) {
    const h = 1.15
    addPanel(slide, MARGIN, cy, W, h, c)
    slide.addText(s.body, {
      x: MARGIN + 0.25, y: cy + 0.1, w: W - 0.5, h: h - 0.2,
      fontSize: 18, color: c.text, align: 'center', valign: 'middle',
    })
    cy += h + 0.15
  }

  const mediaH = s.choices?.length ? 1.3 : 1.9
  if (s.media?.length) {
    addMediaRow(slide, s.media, media, MARGIN, cy, W, mediaH, c)
    cy += mediaH + 0.15
  }

  if (s.choices?.length) {
    addChoicesGrid(slide, s.choices, MARGIN, cy, W, Math.max(PAGE_H - cy - 0.45, 0.5), c)
  }
}

/** Слайд ответа: подпись «ПРАВИЛЬНЫЙ ОТВЕТ» + акцентная подложка. */
function renderAnswerSlide(slide: PptxSlideLike, s: SlidePlan, c: Colors,
  media: Map<string, MediaFetchResult>): void {
  const y = slideHeader(slide, s, c)
  slide.addText('ПРАВИЛЬНЫЙ ОТВЕТ', {
    x: MARGIN, y, w: W, h: 0.3, fontSize: 11, bold: true, color: c.accent2, charSpacing: 2,
  })
  let cy = y + 0.35

  if (s.choices?.length) {
    const h = 1.5
    addChoicesGrid(slide, s.choices, MARGIN, cy, W, h, c)
    cy += h + 0.15
  } else if (s.body) {
    const h = 1.1
    addPanel(slide, MARGIN, cy, W, h, c)
    slide.addText(s.body, {
      x: MARGIN + 0.25, y: cy, w: W - 0.5, h,
      fontSize: 22, bold: true, color: c.accent, align: 'center', valign: 'middle',
    })
    cy += h + 0.15
  } else if (s.lines?.length) {
    const h = Math.min(1.6, 0.4 + s.lines.length * 0.32)
    addPanel(slide, MARGIN, cy, W, h, c)
    slide.addText(s.lines.map(l => ({ text: l, options: { bullet: true, breakLine: true } })), {
      x: MARGIN + 0.25, y: cy + 0.1, w: W - 0.5, h: h - 0.2,
      fontSize: 15, color: c.text, align: 'left', valign: 'top',
    })
    cy += h + 0.15
  }

  if (s.media?.length) {
    addMediaRow(slide, s.media, media, MARGIN, cy, W, Math.max(PAGE_H - cy - 0.45, 0.5), c)
  }
}

/** Повтор вопросов слайдами (recap_before_answers) — легче обычного
 *  вопроса: только текст+картинки, без плиток (ровно как в игре). */
function renderRecapSlide(slide: PptxSlideLike, s: SlidePlan, c: Colors,
  media: Map<string, MediaFetchResult>): void {
  const y = slideHeader(slide, s, c)
  let cy = y + 0.1
  if (s.body) {
    slide.addText(s.body, {
      x: MARGIN, y: cy, w: W, h: 1.0, fontSize: 20, color: c.text, align: 'center', valign: 'middle',
    })
    cy += 1.1
  }
  if (s.media?.length) addMediaRow(slide, s.media, media, MARGIN, cy, W, PAGE_H - cy - 0.45, c)
}

/** Служебные слайды-паузы (время на ответы/табло/перерыв) — крупный
 *  центрированный призыв, как соответствующий экран HostScreen (без
 *  списков команд/реальных баллов — их не существует на момент экспорта). */
function renderCueSlide(slide: PptxSlideLike, s: SlidePlan, c: Colors): void {
  if (s.heading) {
    slide.addText(s.heading, {
      x: MARGIN, y: 0.6, w: W, h: 0.5, fontSize: 14, bold: true, color: c.muted,
      align: 'center', charSpacing: 3,
    })
  }
  addPanel(slide, MARGIN, 1.3, W, 2.6, c)
  slide.addText(s.body ?? '', {
    x: MARGIN + 0.3, y: 1.3, w: W - 0.6, h: s.timerSeconds ? 1.35 : 2.6,
    fontSize: 30, bold: true, color: c.accent, align: 'center', valign: 'middle', fontFace: 'Georgia',
  })
  if (s.timerSeconds) {
    addTimerBadge(slide, PAGE_W / 2, 3.15, 0.55, s.timerSeconds, c)
  }
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

  for (const s of plan.slides) {
    const slide = pptx.addSlide()
    slide.background = { color: c.bg }

    switch (s.kind) {
      case 'title': renderTitleSlide(slide, s, c); break
      case 'round_intro': renderRoundIntroSlide(slide, s, c); break
      case 'question': renderQuestionSlide(slide, s, c, mediaResults); break
      case 'answer': renderAnswerSlide(slide, s, c, mediaResults); break
      case 'recap': renderRecapSlide(slide, s, c, mediaResults); break
      case 'answer_time': case 'scoreboard': case 'break': renderCueSlide(slide, s, c); break
    }

    if (s.notes) slide.addNotes(s.notes)
    footer(slide, c)
  }

  return pptx.write({ outputType: 'blob' })
}
