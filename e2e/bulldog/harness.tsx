// Стенд для ручной/автоматической проверки проекторной сцены «Скачки бульдогов» в составе приложения (vite dev: /e2e/bulldog/harness.html).
// Настоящий RaceBoard + настоящие часы/движок/ассеты; сеть не нужна (режим preview: команды и ставки подставляет стенд).
// Управление из консоли/Playwright: window.harness.set({ stage, startOffsetSec, courseSec, teams:[{dog}] })
import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import '../../src/styles/global.css'
import { RaceBoard } from '../../src/pages/rounds/RaceRound'
import { serverNow } from '../../src/lib/serverClock'
import type { LoadedPack, LoadedRound } from '../../src/lib/packLoader'
import type { GameState, Team, Answer } from '../../src/types/quiz'

interface Cfg { stage?: 'betting' | 'running' | 'done'; startOffsetSec: number; courseSec: number; seed: number; teams: { dog: number | null }[]; theme: string; show?: boolean }
const round = { id: 'r1', position: 1, mechanic: 'race', title_lines: ['СКАЧКИ БУЛЬДОГОВ'], timer_seconds: 0, settings: { courseSec: 42 }, questions: [] } as unknown as LoadedRound
const pack = { id: 'p1', settings: {}, rounds: [round], theme: 'classic' } as unknown as LoadedPack
const started0 = serverNow()
let setCfg: (c: Partial<Cfg>) => void = () => {}
function App() {
  const [cfg, set] = useState<Cfg>({ stage: undefined, startOffsetSec: 0, courseSec: 42, seed: 777, teams: [{ dog: 1 }, { dog: 3 }, { dog: 3 }, { dog: 5 }], theme: 'classic' })
  setCfg = c => set(p => ({ ...p, ...c }))
  const started = started0
  const teams = cfg.teams.map((t, i) => ({ id: `t${i + 1}`, name: `КОМАНДА ${i + 1}`, color: '#888' })) as unknown as Team[]
  const answers = cfg.teams.filter(t => t.dog).map((t, i) => ({ team_id: `t${cfg.teams.indexOf(t) + 1}`, question_ref: 'q-race-0', round_number: 0, answer_text: String(t.dog), id: `a${i}` })) as unknown as Answer[]
  const gs = { id: 1, game_id: 'g', pack_id: 'p1', phase: 'question', round_number: 0, question_index: 0, timer_started_at: null, reveal: false, completed_rounds: [], updated_at: '',
    melody: { race: cfg.stage ? { stage: cfg.stage, seed: cfg.seed, D: cfg.courseSec, startedAt: new Date(started - cfg.startOffsetSec * 1000).toISOString() } : { stage: 'betting' } } } as unknown as GameState
  return <div className={`theme-${cfg.theme}`} style={{ width: '100vw', height: '100vh' }}>{cfg.show !== false && <RaceBoard pack={pack} round={round} gameState={gs} preview={{ teams, answers }} arena={new URLSearchParams(location.search).has('arena') ? { slotBase: `${import.meta.env.BASE_URL}arena/` } : undefined} onStats={s => { (window as unknown as { __stats: unknown }).__stats = s }} />}</div>
}
;(window as unknown as { harness: unknown }).harness = { age: () => (serverNow() - started0) / 1000, set: (c: Partial<Cfg>) => setCfg(c), now: () => serverNow(), startNow: (extra: Partial<Cfg> = {}) => setCfg({ stage: 'running', startOffsetSec: (started0 - serverNow()) / 1000, ...extra }) }
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>)
