// ═══ Сценарии стенда «Книги»: состояние игры через НАСТОЯЩЕЕ API локального сервера ═══
//
// Каждый сценарий: `/stand/reset` (команды/ответы/сессия с нуля) → POST /api/teams
// (N команд, имена 5–28 знаков) → POST /api/answers → PATCH /api/session с X-QP-PIN.
// Пакеты уже залиты стендом (POST /api/pack/<id>, stand.mjs).
//
// Проектор на стенде открывается БЕЗ PIN (только чтение): его авто-переходы
// (раскрытие через 3 с, сторож мелодии, автопроверка, шаги финала) получают
// 403 и тихо не применяются (quietStale/catch) — снимок показывает ровно то
// состояние, которое записал сценарий. Время JS дополнительно останавливает
// page.clock в shoot.cjs.
//
// Поля сценария: id (NN-имя), title, setup(api) → void, ready — CSS-селектор
// «экран готов», settle — сколько мс дать JS/CSS-анимациям доиграть до снимка.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { PACK_ONLINE, PACK_PAPER } from './make-pack.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
// цвета команд — та же палитра, что выдаёт приложение (src/lib/teamColors.ts), читаем как текст
const PALETTE = (fs.readFileSync(path.join(ROOT, 'src/lib/teamColors.ts'), 'utf8').match(/TEAM_PALETTE = \[([\s\S]*?)\]/)?.[1] ?? '')
  .match(/#[0-9a-fA-F]{6}/g) ?? ['#ffd700']

export const GAME = 'stand-game'
export const TEAM_NAMES = [
  'Ёлочки', 'Мандарины и шампанское', 'Снежный барс', 'Оливье навсегда', 'Дед Мороз и компания',
  'Северные олени', 'Хлопушки', 'Самая длинная команда вечера', 'Курантики', 'Ледяные сердца',
  'Новогодний патруль', 'Гирлянда', 'Сосульки', 'Весёлые снеговики из 3-го', 'Бенгальский огонь', 'Морозко',
  'Тридцать первое декабря', 'Санки', 'Пряничный домик', 'Звезда на макушке', 'Метелица', 'Шубка',
  'Подарки под ёлкой', 'Иней и я',
]   // от 5 знаков («Санки», «Шубка») до 28 («Самая длинная команда вечера»)

const iso = ms => new Date(ms).toISOString()

/** Обёртка над API стенда (PIN ведущего во всех запросах). */
export function makeApi(origin, pin) {
  const call = async (p, method = 'GET', body) => {
    const r = await fetch(origin + p, { method, headers: { 'Content-Type': 'application/json', 'X-QP-PIN': pin }, body: body === undefined ? undefined : JSON.stringify(body) })
    if (!r.ok) throw new Error(`${method} ${p}: ${r.status} ${await r.text()}`)
    const t = await r.text(); return t ? JSON.parse(t) : null
  }
  const api = {
    call,
    reset: () => call(`/stand/reset?game=${GAME}`, 'POST'),
    session: patch => call('/api/session', 'PATCH', patch),
    // names — свои имена (сцены «имена команд»); override (review-стенд) подменяет число команд там, где оно применимо
    async teams(n, names) {
      if (api.teamsOverride != null && !names) n = api.teamsOverride
      const out = []
      for (let i = 0; i < n; i++) {
        out.push(await call('/api/teams', 'POST', {
          name: names ? names[i] : TEAM_NAMES[i % TEAM_NAMES.length] + (i >= TEAM_NAMES.length ? ` ${Math.floor(i / TEAM_NAMES.length) + 1}` : ''),
          color: PALETTE[i % PALETTE.length], icon: null, game_id: GAME,
          // «живая» команда (isAlive: last_seen за 10 с) — ставим далёкое будущее, снимок не зависит от часов
          last_seen_at: '2099-01-01T00:00:00.000Z', created_at: iso(Date.UTC(2026, 10, 12, 18, 0, i)),
        }))
      }
      return out
    },
    answers: rows => rows.length ? call('/api/answers', 'POST', rows.map(r => ({ game_id: GAME, stake: null, is_correct: null, ...r }))) : null,
  }
  return api
}

const qref = (round, qi) => `q-${PACK_ONLINE}-r${round}-q${qi}`
const qrefP = (pack, round, qi) => `q-${pack}-r${round}-q${qi}`
const now = () => Date.now()

// ── генераторы ──
function questionScene(id, title, qi, { paper = false, round = 0 } = {}) {
  return {
    id, title, ready: '.host-screen .qnum', settle: 2500,
    async setup(api) {
      await api.reset(); await api.teams(paper ? 0 : 8)
      await api.session({ pack_id: paper ? PACK_PAPER : PACK_ONLINE, phase: 'question', round_number: round, question_index: qi,
        timer_started_at: paper ? null : iso(now() - 8000), reveal: false })
    },
  }
}
function lobbyScene(id, title, n, { paper = false, groups = false } = {}) {
  return {
    id, title, ready: '.lobby-screen', settle: 3500,
    async setup(api) {
      await api.reset(); const ts = await api.teams(n)
      const patch = { pack_id: paper ? PACK_PAPER : PACK_ONLINE, phase: 'lobby', round_number: 0, question_index: 0 }
      if (groups) patch.random_groups = ts.slice(0, 8).map((t, i) => [`${t.name}: капитан`, `игрок ${i + 1}-2`, `игрок ${i + 1}-3`])
      await api.session(patch)
    },
  }
}
const SHORT = ['Гирлянды', 'электрические гирлянды', 'Лампочки Эдисона', 'не знаем', 'Фонарики из бумаги', 'свечи, но электрические, на батарейках, как в торговом центре', 'ГИРЛЯНДЫ!!!', 'Светодиоды']

/** Финальная таблица: N команд, 8 раундов, дробные баллы, ничья на 1-м и на 3-м месте. */
function finaleRows(teams) {
  const totals = teams.map((_, i) => i < 2 ? 42.5 : i === 2 ? 40 : i < 5 ? 37.5 : 37.5 - 1.5 * (i - 4))
  const rows = []
  teams.forEach((t, i) => {
    let left = totals[i]
    for (let r = 0; r < 8; r++) {
      // разные раскладки по раундам у команд с равной суммой; шаг 0.5
      const v = r === 7 ? left : Math.min(left, Math.round(((totals[i] / 8) + (((i * 7 + r * 3) % 5) - 2) * 0.75) * 2) / 2)
      rows.push({ team_id: t.id, question_ref: `q-paper-${r}`, round_number: r, answer_text: '', stake: Math.max(0, v) })
      left -= Math.max(0, v)
    }
  })
  return rows
}

/** Трудные имена для плиток команд: одно слово, до 28 знаков, цифры, эмодзи, короткое. */
export const NAMES_HARD = ['Ёлка', 'Самая длинная команда вечера', 'Сто двадцать пять снеговиков ⛄', 'Команда №7', 'Ёлочки 🎄🎄',
  'Дед Мороз и Снегурочка и Ко', 'Му', 'Тридцать первое декабря'].map(n => n.slice(0, 31))

export const SCENES = [
  // 1. лобби
  lobbyScene('01-lobby-0', 'лобби, 0 команд', 0),
  lobbyScene('01-lobby-4', 'лобби, 4 команды', 4),
  lobbyScene('01-lobby-8', 'лобби, 8 команд', 8),
  lobbyScene('01-lobby-10', 'лобби, 10 команд', 10),
  lobbyScene('01-lobby-16', 'лобби, 16 команд', 16),
  lobbyScene('01-lobby-24', 'лобби, 24 команды', 24),
  lobbyScene('01-lobby-8-groups', 'лобби, 8 команд + окно составов', 8, { groups: true }),
  lobbyScene('01-lobby-paper-8', 'лобби, бумага, 8 команд', 8, { paper: true }),
  { id: '01-lobby-names', title: 'лобби, трудные имена (одно слово, 28 знаков, цифры, эмодзи)', ready: '.lobby-screen', settle: 3500,
    async setup(api) { await api.reset(); await api.teams(NAMES_HARD.length, NAMES_HARD); await api.session({ pack_id: PACK_ONLINE, phase: 'lobby', round_number: 0, question_index: 0 }) } },
  // 2. правила
  {
    id: '02-rules', title: 'заставка раунда с правилами (round_intro, R1)', ready: '.round-intro', settle: 4000,
    async setup(api) { await api.reset(); await api.teams(8); await api.session({ pack_id: PACK_ONLINE, phase: 'round_intro', round_number: 0, question_index: 0 }) },
  },
  // 3. кроссворд
  {
    id: '03-crossword-intro', title: 'заставка кроссворда (сетка)', ready: '.round-intro', settle: 4000,
    async setup(api) { await api.reset(); await api.teams(8); await api.session({ pack_id: PACK_ONLINE, phase: 'round_intro', round_number: 3, question_index: 0 }) },
  },
  // 4–8. вопросы
  questionScene('04-q-0img-long', 'вопрос без картинок, длинный (len-xl)', 0),
  questionScene('05-q-1img', 'вопрос + 1 картинка 3:4', 1),
  questionScene('06-q-2img', 'вопрос + 2 картинки 16:9 и 1:1', 2),
  questionScene('07-q-3img', 'вопрос + 3 картинки (3:4, 16:9, PNG α)', 3),
  questionScene('08-q-4img', 'вопрос + 4 картинки (1:1, 9:16, 21:9, PNG α)', 4),
  questionScene('08b-q-4img-long', 'длинный вопрос + 4 картинки', 5),
  questionScene('08c-q-4img-choices', '4 картинки-варианта с текстом (буквы на карточках)', 6),
  questionScene('08d-q-text-choices', 'вопрос + 4 варианта текстом', 7),
  questionScene('08e-q-3img-choices', '3 картинки + 4 варианта текстом', 9),
  questionScene('08f-q-match', 'сопоставление (match, right_labels)', 0, { round: 1 }),
  questionScene('08g-q-rebus', 'ребус (2 картинки, без текста)', 0, { round: 2 }),
  questionScene('08p-q-4img-paper', 'бумага: вопрос + 4 картинки, таймер не запущен', 4, { paper: true }),
  // 9. ожидание ответов
  {
    id: '09-answer-time', title: 'ожидание ответов (online, 8 команд)', ready: '.answer-pulse', settle: 2500,
    async setup(api) {
      await api.reset(); const ts = await api.teams(8)
      await api.answers(ts.flatMap((t, i) => Array.from({ length: [10, 9, 7, 10, 3, 0, 10, 6][i] }, (_, qi) => ({ team_id: t.id, question_ref: qref(0, qi), round_number: 0, answer_text: 'ответ' }))))
      await api.session({ pack_id: PACK_ONLINE, phase: 'answer_time', round_number: 0, question_index: 9, timer_started_at: iso(now() - 12000), reveal: false })
    },
  },
  {
    id: '09p-answer-time-paper', title: 'ожидание ответов (бумага)', ready: '.answer-pulse', settle: 2500,
    async setup(api) { await api.reset(); await api.session({ pack_id: PACK_PAPER, phase: 'answer_time', round_number: 0, question_index: 9, timer_started_at: iso(now() - 12000), reveal: false }) },
  },
  // 10. повтор вопроса (A) и recap
  {
    id: '10-recall-A', title: 'разбор до раскрытия (A): вопрос + «Ответили N из M»', ready: '.host-screen .qnum', settle: 1800,
    async setup(api) {
      await api.reset(); const ts = await api.teams(8)
      await api.answers(ts.slice(0, 5).map(t => ({ team_id: t.id, question_ref: qref(0, 4), round_number: 0, answer_text: 'звезда' })))
      await api.session({ pack_id: PACK_ONLINE, phase: 'show_answers', round_number: 0, question_index: 4, timer_started_at: null, reveal: false })
    },
  },
  {
    id: '10b-recap', title: 'повтор вопросов раунда (recap, 1-й слайд)', ready: '.recap-screen', settle: 2000,
    async setup(api) { await api.reset(); await api.teams(8); await api.session({ pack_id: PACK_ONLINE, phase: 'recap', round_number: 0, question_index: 0, timer_started_at: null, reveal: false }) },
  },
  // 11. раскрытый ответ без своей картинки
  {
    id: '11-revealed-plain', title: 'раскрытый ответ без картинок: 8 ответов команд + пояснение 400 знаков', ready: '.answers-layout.revealed', settle: 1500, runFor: 9000,
    async setup(api) {
      await api.reset(); const ts = await api.teams(8)
      await api.answers(ts.map((t, i) => ({ team_id: t.id, question_ref: qref(0, 0), round_number: 0, answer_text: SHORT[i], is_correct: [true, true, false, false, false, true, true, false][i] })))
      await api.session({ pack_id: PACK_ONLINE, phase: 'show_answers', round_number: 0, question_index: 0, timer_started_at: null, reveal: true })
    },
  },
  {
    id: '11b-revealed-choices', title: 'раскрытый ответ: варианты текстом (StagedChoices)', ready: '.answers-layout.revealed', settle: 1500, runFor: 9000,
    async setup(api) {
      await api.reset(); const ts = await api.teams(8)
      await api.answers(ts.map((t, i) => ({ team_id: t.id, question_ref: qref(0, 7), round_number: 0, answer_text: 'АБВГБББА'[i], is_correct: 'АБВГБББА'[i] === 'Б' })))
      await api.session({ pack_id: PACK_ONLINE, phase: 'show_answers', round_number: 0, question_index: 7, timer_started_at: null, reveal: true })
    },
  },
  {
    id: '11p-revealed-paper', title: 'бумага: раскрытый ответ без картинок (без колонки команд)', ready: '.answers-layout.revealed', settle: 1500, runFor: 9000,
    async setup(api) { await api.reset(); await api.session({ pack_id: PACK_PAPER, phase: 'show_answers', round_number: 0, question_index: 0, timer_started_at: null, reveal: true }) },
  },
  // 12. раскрытый ответ с media.answer
  {
    id: '12-revealed-answer-media', title: 'раскрытый ответ с картинкой ответа (длинный вопрос)', ready: '.answers-layout.revealed', settle: 1500, runFor: 9000,
    async setup(api) {
      await api.reset(); const ts = await api.teams(6)
      await api.answers(ts.map((t, i) => ({ team_id: t.id, question_ref: qref(0, 8), round_number: 0, answer_text: ['Норвегия', 'Швеция', 'норвегия', 'Исландия, точно не помним', 'Норвегия', 'Финляндия'][i], is_correct: [true, false, true, false, true, false][i] })))
      await api.session({ pack_id: PACK_ONLINE, phase: 'show_answers', round_number: 0, question_index: 8, timer_started_at: null, reveal: true })
    },
  },
  {
    id: '12b-revealed-4img', title: 'раскрытый ответ: картинки вопроса (4) вместо своей', ready: '.answers-layout.revealed', settle: 1500, runFor: 9000,
    async setup(api) {
      await api.reset(); const ts = await api.teams(8)
      await api.answers(ts.map((t, i) => ({ team_id: t.id, question_ref: qref(0, 4), round_number: 0, answer_text: i % 3 ? 'звезда' : 'ёлка', is_correct: !!(i % 3) })))
      await api.session({ pack_id: PACK_ONLINE, phase: 'show_answers', round_number: 0, question_index: 4, timer_started_at: null, reveal: true })
    },
  },
  // 13. мелодия: доска
  {
    id: '13-melody-board-3x4', title: 'мелодия: доска 3 темы × 4 трека (idle, 2 сыграно)', ready: '.mel-board', settle: 2500,
    async setup(api) { await api.reset(); await api.teams(6); await api.session({ pack_id: PACK_ONLINE, phase: 'question', round_number: 4, question_index: 0, timer_started_at: null, reveal: false, melody: { stage: 'idle', played: ['0-0', '2-1'] } }) },
  },
  {
    id: '13b-melody-spin-4x6', title: 'мелодия: доска 4 темы × 6 треков, идёт рулетка (spinning)', ready: '.mel-board', settle: 1600,
    async setup(api) {
      await api.reset(); await api.teams(6)
      await api.session({ pack_id: PACK_ONLINE, phase: 'question', round_number: 5, question_index: 0, timer_started_at: null, reveal: false,
        melody: { key: '2-3', stage: 'spinning', deadline: iso(now() + 6000), spinMs: 5000, played: ['0-0', '1-2', '3-5'] } })
    },
  },
  // 14. мелодия: отрывок играет
  {
    id: '14-melody-snippet', title: 'мелодия: играет отрывок (snippet), реальный mp3', ready: '.mel-modal', settle: 1500, audio: true,
    async setup(api) {
      await api.reset(); const ts = await api.teams(6)
      const key = '1-2'
      await api.answers(ts.slice(0, 4).map((t, i) => ({ team_id: t.id, question_ref: `q-mel-${key}-bid`, round_number: 4, answer_text: String([5, 7, 9, 10][i]) })))
      await api.session({ pack_id: PACK_ONLINE, phase: 'question', round_number: 4, question_index: 0, timer_started_at: null, reveal: false,
        melody: { key, stage: 'snippet', order: ts.slice(0, 4).map(t => t.id), turn: 0, snippetSec: 5, startSec: 2, deadline: iso(now() + 5000), played: ['0-0'] } })
    },
  },
  // 15. финальная таблица
  ...[3, 8, 12, 16].map(n => ({
    id: `15-finale-${n}`, title: `финальная таблица: ${n} команд, 8 раундов, дробные, ничья на 1 и 3`, ready: '.fin-table', settle: 1500, runFor: 20000,
    async setup(api) {
      await api.reset(); const ts = await api.teams(n)
      await api.answers(finaleRows(ts))
      await api.session({ pack_id: PACK_ONLINE, phase: 'finale', round_number: 7, question_index: 99, timer_started_at: null, reveal: false })
    },
  })),
  // прототип этапа 2: ещё два варианта оформления финала (флаг адреса ?bkfin=2|3 — только для согласования)
  ...[8, 16].flatMap(n => [2, 3].map(v => ({
    id: `15-finale-${n}-v${v}`, title: `финал, вариант ${v}: ${n} команд`, ready: '.fin-table', settle: 1500, runFor: 20000, query: `bkfin=${v}`,
    async setup(api) {
      await api.reset(); const ts = await api.teams(n)
      await api.answers(finaleRows(ts))
      await api.session({ pack_id: PACK_ONLINE, phase: 'finale', round_number: 7, question_index: 99, timer_started_at: null, reveal: false })
    },
  }))),
  // награждение «бар»: шаг «1 место» (ничья на 1-м — обе команды, одна медаль)
  {
    id: '16-award-1', title: 'награждение «бар»: 1 место, ничья (медаль без emoji)', ready: '.fin-award', settle: 1500,
    async setup(api) {
      await api.reset(); const ts = await api.teams(8)
      await api.answers(finaleRows(ts))
      await api.session({ pack_id: PACK_ONLINE, phase: 'finale', round_number: 7, question_index: 2, timer_started_at: null, reveal: true })
    },
  },
  // прототип этапа 2: три варианта плиток команд в лобби (?bkteam=1|2|3) при 4/8/10/16 командах и с трудными именами
  ...[1, 2, 3].flatMap(v => [[4, 4], [8, 8], [10, 10], [16, 16], ['names', 0]].map(([k, n]) => ({
    id: `17-team-t${v}-${k}`, title: `плитки команд, вариант T${v}: ${k === 'names' ? 'трудные имена' : k + ' команд'}`, ready: '.lobby-screen', settle: 3000, query: `bkteam=${v}`,
    async setup(api) {
      await api.reset()
      if (k === 'names') await api.teams(NAMES_HARD.length, NAMES_HARD); else await api.teams(n)
      await api.session({ pack_id: PACK_ONLINE, phase: 'lobby', round_number: 0, question_index: 0 })
    },
  }))),
  // лист шрифтов: статическая страница стенда (review/fonts.html) на тех же локальных шрифтах и токенах --bk-*
  { id: '18-fonts', title: 'лист шрифтов: иерархия типографики «Книги»', ready: '.fs-ready', settle: 800, path: '/review/fonts.html', async setup() {} },
  // ЭТАП A–C адаптивной системы (ADAPTIVE.md): четыре контрольных сценария + три обязательных регрессионных (скриншоты ведущего)
  { id: '20-ad-short', title: 'адаптив: короткий текст (без картинок)', ready: '.host-screen .qnum', settle: 2500, mandatory: false,
    async setup(api) { await api.reset(); await api.teams(8); await api.session({ pack_id: PACK_ONLINE, phase: 'question', round_number: 6, question_index: 1, timer_started_at: iso(now() - 8000), reveal: false }) } },
  { id: '20-ad-long', title: 'адаптив: длинный текст (без картинок)', ready: '.host-screen .qnum', settle: 2500,
    async setup(api) { await api.reset(); await api.teams(8); await api.session({ pack_id: PACK_ONLINE, phase: 'question', round_number: 0, question_index: 0, timer_started_at: iso(now() - 8000), reveal: false }) } },
  { id: '20-ad-1img', title: 'адаптив: одно вертикальное изображение', ready: '.host-screen .qnum', settle: 2500,
    async setup(api) { await api.reset(); await api.teams(8); await api.session({ pack_id: PACK_ONLINE, phase: 'question', round_number: 0, question_index: 1, timer_started_at: iso(now() - 8000), reveal: false }) } },
  { id: '20-ad-4img', title: 'адаптив: 4 изображения (1:1, 9:16, 21:9, PNG α) [скриншот ведущего №1]', ready: '.host-screen .qnum', settle: 2500, mandatory: true,
    async setup(api) { await api.reset(); await api.teams(8); await api.session({ pack_id: PACK_ONLINE, phase: 'question', round_number: 0, question_index: 4, timer_started_at: iso(now() - 8000), reveal: false }) } },
  { id: '20-ad-4img-caps', title: 'адаптив: 4 картинки-варианта с подписями (A–Г) на одном уровне', ready: '.host-screen .qnum', settle: 2500,
    async setup(api) { await api.reset(); await api.teams(8); await api.session({ pack_id: PACK_ONLINE, phase: 'question', round_number: 0, question_index: 6, timer_started_at: iso(now() - 8000), reveal: false }) } },
  { id: '20-ad-3img-choices', title: 'адаптив: 3 картинки + варианты — таймер не деформируется [скриншот ведущего №2]', ready: '.host-screen .qnum', settle: 2500, mandatory: true,
    async setup(api) { await api.reset(); await api.teams(8); await api.session({ pack_id: PACK_ONLINE, phase: 'question', round_number: 0, question_index: 9, timer_started_at: iso(now() - 8000), reveal: false }) } },
  { id: '20-ad-match', title: 'адаптив: сопоставление (этап D, только фиксация) [скриншот ведущего №3]', ready: '.host-screen .qnum', settle: 2500, mandatory: true,
    async setup(api) { await api.reset(); await api.teams(8); await api.session({ pack_id: PACK_ONLINE, phase: 'question', round_number: 1, question_index: 0, timer_started_at: iso(now() - 8000), reveal: false }) } },
  // ДОРАБОТКА адаптивности (ТЗ ведущего): сценарии композиций — раунд 9 пакета (индекс 8), вопросы по номеру
  ...[
    ['21-cmp-1h', 'одно горизонтальное, короткий вопрос', 0], ['21-cmp-1sq', 'одно квадратное, короткий вопрос', 1],
    ['21-cmp-1v', 'одно вертикальное 9:16, короткий вопрос', 12], ['21-cmp-1h-long', 'одно горизонтальное, длинный вопрос', 13],
    ['21-cmp-4mix', '4 разных пропорции (9:16, 1:1, 16:9, 4:3)', 2], ['21-cmp-4h', '4 горизонтальных', 3],
    ['21-cmp-4v', '4 вертикальных', 4], ['21-cmp-4sq', '4 квадратных', 5],
    ['21-cmp-4caps', '4 картинки с длинными подписями', 6], ['21-cmp-4-short', '4 картинки, короткий вопрос', 7],
    ['21-cmp-4-long', '4 картинки, длинный вопрос', 8], ['21-cmp-3h', '3 горизонтальных', 14], ['21-cmp-3v', '3 вертикальных', 15],
    ['21-fold-short', 'текст через сгиб: короткий', 9], ['21-fold-mid', 'текст через сгиб: средний', 10], ['21-fold-long', 'текст через сгиб: длинный', 11],
  ].map(([id, title, qi]) => ({ id, title: 'композиция: ' + title, ready: '.host-screen .qnum', settle: 2500,
    async setup(api) { await api.reset(); await api.teams(8); await api.session({ pack_id: PACK_ONLINE, phase: 'question', round_number: 8, question_index: qi, timer_started_at: iso(now() - 8000), reveal: false }) } })),
]

export { qref, qrefP }
