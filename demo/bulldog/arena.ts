// Автономная демонстрация зимней арены (arena.html, file://): сегмент гонки Race V3 (seed 328, D=42, окно 8–30 с) на сопровождающей камере.
import { ArenaRenderer } from '../../src/lib/bulldog/arena/arena'
import { installEmbeddedAssets } from './embedded'
installEmbeddedAssets()
const DUR = 22
const root = document.getElementById('root')!
root.innerHTML = `<div id="stage"><canvas id="cv"></canvas></div><div id="bar"><button id="pp">⏸ Пауза</button><button id="rs">↺ С начала</button>
<input id="sl" type="range" min="0" max="${DUR}" step="0.01" value="0"><span id="tm">0.0 / ${DUR} c</span><label><input id="gd" type="checkbox"> Разметка слоёв и дорожек</label><span id="st">Загрузка…</span></div>`
const cv = document.getElementById('cv') as HTMLCanvasElement
// файлы авторских слоёв лежат рядом в папке arena/; пока их нет, не опрашиваем (иначе консоль полна 404). Для проверки готовых слоёв: arena.html?slots
const r = new ArenaRenderer(cv, { slotBase: location.search.includes('slots') ? './arena/' : undefined })
const $ = (id: string) => document.getElementById(id) as HTMLInputElement
let playing = true, t = 0, last = performance.now()
void r.init({ seed: 328, D: 42 }, 8, DUR).then(() => {
  $('st').textContent = r.missing.length ? `Авторские слои (${r.missing.map(m => m.id).join(', ')}) ещё не подключены — см. ASSET_BRIEF` : 'Слои подключены'
  const loop = (now: number) => { if (playing) { t += (now - last) / 1000; if (t > DUR) t = 0 } last = now; r.guide = $('gd').checked; r.draw(t); $('sl').value = String(t); $('tm').textContent = `${t.toFixed(1)} / ${DUR} c`; requestAnimationFrame(loop) }
  requestAnimationFrame(loop)
})
$('pp').onclick = () => { playing = !playing; $('pp').textContent = playing ? '⏸ Пауза' : '▶ Играть' }
$('rs').onclick = () => { t = 0 }
$('sl').oninput = () => { t = +$('sl').value; playing = false; $('pp').textContent = '▶ Играть' }
