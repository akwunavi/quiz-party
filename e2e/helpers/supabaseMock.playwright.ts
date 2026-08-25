import type { Page, Route } from '@playwright/test'

const GAME_ID = 'qa-game-001'
const PACK_ID = 'qa-pack-001'
const ROUND_ID = 'qa-round-001'
const TEAM_ID = 'qa-team-001'

const mediaPaths = [
  'qa/landscape.svg',
  'qa/portrait.svg',
  'qa/square.svg',
  'qa/wide.svg',
]

const pack = {
  id: PACK_ID,
  name: 'QA synthetic pack',
  status: 'ready',
  theme: 'classic',
  created_at: '2026-01-01T00:00:00Z',
  updated_at: '2026-01-01T00:00:00Z',
  settings: { answers_reveal: 'after_round', play_mode: 'phones' },
}

const round = {
  id: ROUND_ID,
  pack_id: PACK_ID,
  position: 0,
  mechanic: 'standard',
  title_lines: ['QA MEDIA'],
  rules: [],
  rules_audio: null,
  timer_seconds: 60,
  settings: { pointsPerQuestion: 1 },
  off_scoreboard: false,
  answers_reveal: 'after_round',
  meta_line_override: null,
  status: 'ready',
}

const baseQuestion = {
  id: 'qa-question-001',
  round_id: ROUND_ID,
  position: 0,
  question_text: 'Тестовый вопрос с несколькими изображениями разных пропорций',
  media: { question: mediaPaths, answer: [] },
  answer_note: null,
  service: {},
  is_final_question: false,
  status: 'ready',
  hidden: false,
}

const gameState = {
  id: 1,
  game_id: GAME_ID,
  name: 'QA synthetic game',
  pack_id: PACK_ID,
  phase: 'question',
  round_number: 0,
  question_index: 0,
  timer_started_at: null,
  reveal: false,
  completed_rounds: [],
  updated_at: '2026-01-01T00:00:00Z',
}

const team = {
  id: TEAM_ID,
  name: 'QA Team',
  color: '#ffffff',
  game_id: GAME_ID,
  last_seen_at: '2099-01-01T00:00:00Z',
}

function svg(width: number, height: number, label: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="#d7d7d7"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="48">${label}</text></svg>`
}

async function json(route: Route, body: unknown) {
  await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(body) })
}

function isSingle(route: Route) {
  return (route.request().headers().accept ?? '').includes('application/vnd.pgrst.object+json')
}

export async function mockQuizBackend(page: Page, options?: {
  theme?: 'classic' | 'new_year' | 'potter'
  answerMode?: 'choice' | 'order' | 'match'
}) {
  const theme = options?.theme ?? 'classic'
  const answerMode = options?.answerMode ?? 'choice'
  const question = {
    ...baseQuestion,
    answer: answerMode === 'match'
      ? {
          mode: 'match',
          left: ['1', '2', '3', '4'],
          right: ['A', 'B', 'C', 'D'],
          right_labels: ['Альфа', 'Бета', 'Гамма', 'Дельта'],
          correct_pairs: ['1A', '2B', '3C', '4D'],
          display: '1А, 2Б, 3В, 4Г',
        }
      : answerMode === 'order'
        ? {
            mode: 'order',
            choices: [
              { key: 'A', text: 'Первый' },
              { key: 'B', text: 'Второй' },
              { key: 'C', text: 'Третий' },
              { key: 'D', text: 'Четвёртый' },
            ],
            correct_order: 'ABCD',
            display: ['Первый', 'Второй', 'Третий', 'Четвёртый'],
          }
        : {
            mode: 'choice',
            choices: [
              { key: 'A', text: 'Первый' },
              { key: 'B', text: 'Второй' },
              { key: 'C', text: 'Третий' },
              { key: 'D', text: 'Четвёртый' },
            ],
            correct_choice: 'A',
            display: 'Первый',
          },
  }

  await page.route('**/auth/v1/user*', route => json(route, {
    id: 'qa-user-001',
    aud: 'authenticated',
    role: 'authenticated',
    email: 'qa@example.com',
    app_metadata: {},
    user_metadata: {},
  }))

  await page.route('**/rest/v1/**', async route => {
    const method = route.request().method()
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      await route.abort('blockedbyclient')
      return
    }
    await route.fallback()
  })

  await page.route('**/rest/v1/editor_roles*', route => json(route, isSingle(route)
    ? { user_id: 'qa-user-001', role: 'owner', display_name: 'QA' }
    : [{ user_id: 'qa-user-001', role: 'owner', display_name: 'QA' }]))
  await page.route('**/rest/v1/game_sessions*', route => json(route, isSingle(route) ? gameState : [gameState]))
  await page.route('**/rest/v1/packs*', route => json(route, isSingle(route) ? { ...pack, theme } : [{ ...pack, theme }]))
  await page.route('**/rest/v1/pack_rounds*', route => json(route, isSingle(route) ? round : [round]))
  await page.route('**/rest/v1/pack_questions*', route => json(route, isSingle(route) ? question : [question]))
  await page.route('**/rest/v1/teams*', route => json(route, [team]))
  await page.route('**/rest/v1/answers*', route => json(route, []))

  await page.route('**/storage/v1/object/public/quiz-media/qa/landscape.svg', route =>
    route.fulfill({ status: 200, contentType: 'image/svg+xml', body: svg(1600, 900, 'LANDSCAPE') }))
  await page.route('**/storage/v1/object/public/quiz-media/qa/portrait.svg', route =>
    route.fulfill({ status: 200, contentType: 'image/svg+xml', body: svg(900, 1600, 'PORTRAIT') }))
  await page.route('**/storage/v1/object/public/quiz-media/qa/square.svg', route =>
    route.fulfill({ status: 200, contentType: 'image/svg+xml', body: svg(1200, 1200, 'SQUARE') }))
  await page.route('**/storage/v1/object/public/quiz-media/qa/wide.svg', route =>
    route.fulfill({ status: 200, contentType: 'image/svg+xml', body: svg(2000, 800, 'WIDE') }))

  await page.addInitScript(({ teamValue }) => {
    localStorage.setItem('qp-team', JSON.stringify(teamValue))
  }, { teamValue: team })
}

export const QA_ROOM_URL = `#/player?room=${GAME_ID}`
export const QA_HOST_URL = `#/?room=${GAME_ID}`
