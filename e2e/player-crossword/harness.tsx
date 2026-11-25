// Стенд проверки кроссворда игрока: НАСТОЯЩИЕ ThemeLayer + PlayerCrossword + разметка .pl-root/.pl-list/.pl-card из PlayerPage.
// ?theme=classic|potter|new_year|ny_book  &n=7|11|15  &cur=<индекс слова>
import React from 'react'
import ReactDOM from 'react-dom/client'
import '../../src/styles/global.css'
import { ThemeLayer } from '../../src/components/ThemeLayer'
import { PlayerCrossword } from '../../src/components/PlayerCrossword'
import { CrosswordView, lettersFromAnswers } from '../../src/components/CrosswordView'
import { pickWordAt } from '../../src/lib/crosswordFit'
import type { CrosswordGrid } from '../../src/types/quiz'

const q = new URLSearchParams(location.search)
const theme = (q.get('theme') ?? 'classic') as never
const n = Number(q.get('n') ?? 11)
const ABC = 'АБВГДЕЖЗИКЛМНОПРСТУФ'
// решётка: слова по горизонтали на чётных строках, по вертикали на чётных столбцах — много пересечений
const words: CrosswordGrid['words'] = []
let num = 1
for (let r = 0; r < n; r += 2) words.push({ word: ABC.slice(0, n), clue: '', number: num++, dir: 'across', row: r, col: 0 })
for (let c = 0; c < n; c += 2) words.push({ word: ABC.slice(0, n), clue: '', number: num++, dir: 'down', row: 0, col: c })
const grid: CrosswordGrid = { rows: n, cols: n, words }
const letters = lettersFromAnswers(grid, { [ABC.slice(0, n)]: ABC.slice(0, n) })

function App() {
  const [cur, setCur] = React.useState(Number(q.get('cur') ?? 1))
  const w = words[cur]
  return (
    <ThemeLayer theme={theme}>
      <div className="pl-root">
        <div className="pl-header"><span>Команда</span><span className="pl-round">РАУНД 3</span></div>
        {q.get('old') ? (
          // «до»: прежняя разметка/формула (потолок 26 px от innerWidth, панель в потоке страницы, правила .pl-crossword до правки)
          <div style={{ padding: '10px 8px', borderBottom: '1px solid var(--dim)', overflowX: 'auto' }}>
            <CrosswordView grid={grid} letters={letters} currentWordNumber={w.number} currentDir={w.dir}
              cellSize={Math.min(26, Math.floor((Math.min(innerWidth, 460) - 40) / grid.cols))} />
          </div>
        ) : <PlayerCrossword grid={grid} letters={letters} current={w}
          onPickCell={(r, c) => { const p = pickWordAt(grid, r, c, w); if (p) setCur(words.indexOf(p)) }} />}
        <div className="pl-list">
          <div className="pl-notice">Ответы можно вносить и править весь раунд</div>
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className={`pl-card${i === 0 ? ' pl-card-open' : ''}`}>
              <div className="pl-card-head"><span className="pl-qlabel">№{i + 1} ПО ГОРИЗОНТАЛИ</span></div>
              {i === 0 && <div className="pl-card-body">
                <div className="pl-qtext">Вопрос номер один: назовите слово</div>
                <div className="pl-input-col"><input placeholder="Ответ" /><button className="pl-send">Отправить</button></div>
              </div>}
            </div>
          ))}
        </div>
      </div>
    </ThemeLayer>
  )
}
ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
