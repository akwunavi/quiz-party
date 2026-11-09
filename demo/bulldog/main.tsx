// Автономная демонстрация «Скачек бульдогов» (открывается двойным щелчком по index.html, без сервера и интернета).
// Показывает НАСТОЯЩИЙ RaceBoard приложения (то же полотно, те же часы, Race V3, собаки из public/bulldog); команды и ставки
// подставляет демо-панель вместо базы — как в режиме предпросмотра редактора. Панель стоит ПОД экраном проектора и не перекрывает его.
import React, { useMemo, useState } from 'react'
import ReactDOM from 'react-dom/client'
import '../../src/styles/global.css'
import './demo.css'
import { RaceBoard } from '../../src/pages/rounds/RaceRound'
import { serverNow } from '../../src/lib/serverClock'
import { setAssetSource } from '../../src/lib/bulldog/engine'
import { DOG_IDS, DOG_NAMES, COURSE_SEC_MIN, COURSE_SEC_MAX, DEFAULT_COURSE_SEC } from '../../src/lib/bulldog/config'
import type { StageStats } from '../../src/lib/bulldog/stage'
import type { LoadedPack, LoadedRound } from '../../src/lib/packLoader'
import type { GameState, Team, Answer } from '../../src/types/quiz'

// ── встроенный набор файлов (data/*.js кладут их в window.__BD), вместо fetch, который file:// запрещает
const BD = ((window as unknown as { __BD?: Record<string, unknown> }).__BD ??= {})
const key = (u: string) => u.replace(/^.*?bulldog\//, '').replace(/\?.*$/, '')
const blobs = new Map<string, Blob>()
setAssetSource({
  prefetch: false,
  async json<T>(u: string) { const v = BD[key(u)]; if (v === undefined) throw new Error('нет в демо-наборе: ' + u); return v as T },
  async blob(u: string) {
    const k = key(u); let b = blobs.get(k)
    if (!b) {
      const s = BD[k]; if (typeof s !== 'string') throw new Error('нет в демо-наборе: ' + u)
      const bin = atob(s), a = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) a[i] = bin.charCodeAt(i)
      b = new Blob([a], { type: 'image/webp' }); blobs.set(k, b)
    }
    return b
  },
})

const round = { id: 'r1', position: 1, mechanic: 'race', title_lines: ['СКАЧКИ БУЛЬДОГОВ'], timer_seconds: 0, settings: { courseSec: DEFAULT_COURSE_SEC }, questions: [] } as unknown as LoadedRound
const pack = { id: 'p1', settings: {}, rounds: [round], theme: 'classic' } as unknown as LoadedPack
const TEAM_NAMES = ['ТИГРЫ', 'СОВЫ', 'ЛИСЫ', 'ВОЛКИ', 'ЁЖИКИ', 'ОРЛЫ', 'БОБРЫ', 'ЗУБРЫ', 'РЫСИ', 'ЛОСИ', 'КОТЫ', 'ЯКОРЯ']
const clampTeams = (n: number) => Math.max(1, Math.min(12, n || 1))

interface Cfg { teams: (number | null)[]; D: number; seed: number; startedAt: number | null; run: number; diag: boolean }
const fresh = (prev?: Cfg): Cfg => ({ teams: prev?.teams ?? [null, null, null, null], D: prev?.D ?? DEFAULT_COURSE_SEC, seed: Math.floor(Math.random() * 1e6) + 1, startedAt: null, run: (prev?.run ?? 0) + 1, diag: prev?.diag ?? false })

function App() {
  const [cfg, setCfg] = useState<Cfg>(() => fresh())
  const [stats, setStats] = useState<StageStats | null>(null)
  const [, tick] = useState(0)
  const patch = (p: Partial<Cfg>) => setCfg(c => ({ ...c, ...p }))
  const running = cfg.startedAt != null
  const view = useMemo(() => {
    const teams = cfg.teams.map((_, i) => ({ id: `t${i + 1}`, name: TEAM_NAMES[i], color: '#888' })) as unknown as Team[]
    const answers = cfg.teams.flatMap((d, i) => d ? [{ id: `a${i}`, team_id: `t${i + 1}`, question_ref: 'q-race-0', round_number: 0, answer_text: String(d) }] : []) as unknown as Answer[]
    const gs = { id: 1, game_id: 'g', pack_id: 'p1', phase: 'question', round_number: 0, question_index: 0, timer_started_at: null, reveal: false, completed_rounds: [], updated_at: '',
      melody: { race: running ? { stage: 'running', seed: cfg.seed, D: cfg.D, startedAt: new Date(cfg.startedAt!).toISOString() } : { stage: 'betting' } } } as unknown as GameState
    return { teams, answers, gs }
  }, [cfg, running])
  const setTeamCount = (n: number) => { n = clampTeams(n); patch({ teams: Array.from({ length: n }, (_, i) => cfg.teams[i] ?? null) }) }
  const setDog = (i: number, v: number | null) => patch({ teams: cfg.teams.map((d, j) => j === i ? v : d) })
  const randomPick = () => patch({ teams: cfg.teams.map(() => 1 + Math.floor(Math.random() * 5)) })
  const picked = cfg.teams.filter(Boolean).length
  return (
    <div className="demo-root theme-classic">
      <div className="demo-screen"><div className="demo-frame" key={cfg.run}>
        <RaceBoard pack={pack} round={round} gameState={view.gs} preview={{ teams: view.teams, answers: view.answers }} onStats={s => { setStats(s); if (cfg.diag) tick(n => n + 1) }} />
      </div></div>
      <div className="demo-panel" aria-label="Панель демонстрации">
        <div className="dp-row">
          <label>Команд <input type="number" min={1} max={12} value={cfg.teams.length} disabled={running} onChange={e => setTeamCount(+e.target.value)} /></label>
          <label>Длительность гонки, с <input type="number" min={COURSE_SEC_MIN} max={COURSE_SEC_MAX} value={cfg.D} disabled={running}
            onChange={e => patch({ D: Math.max(COURSE_SEC_MIN, Math.min(COURSE_SEC_MAX, +e.target.value || DEFAULT_COURSE_SEC)) })} /></label>
          <button disabled={running} onClick={randomPick}>Все выбрали случайно</button>
          <button className="go" disabled={running || picked === 0} title={picked === 0 ? 'Сначала пусть хотя бы одна команда выберет собаку' : ''}
            onClick={() => patch({ startedAt: serverNow() })}>▶ ЗАКРЫТЬ ВЫБОР И НАЧАТЬ СКАЧКИ</button>
          <button onClick={() => setCfg(c => fresh(c))}>↺ Перезапустить сценарий</button>
          <label className="chk"><input type="checkbox" checked={cfg.diag} onChange={e => patch({ diag: e.target.checked })} /> Диагностика</label>
        </div>
        <div className="dp-teams">
          {cfg.teams.map((d, i) => (
            <label key={i} className="dp-team"><span>{TEAM_NAMES[i]}</span>
              <select value={d ?? ''} disabled={running} onChange={e => setDog(i, e.target.value ? +e.target.value : null)}>
                <option value="">— не выбрала —</option>
                {DOG_IDS.map((id, k) => <option key={id} value={k + 1}>{k + 1}. {DOG_NAMES[k]}</option>)}
              </select>
            </label>
          ))}
        </div>
        {cfg.diag && stats && <pre className="dp-diag">{JSON.stringify(stats, (_k, v) => typeof v === 'number' ? Math.round(v * 100) / 100 : v)}</pre>}
        <div className="dp-hint">Пока гонка не начата, можно менять выбор — собаки реагируют (выбор → возврат к ожиданию). «Перезапустить» возвращает на экран выбора.</div>
      </div>
    </div>
  )
}
ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
