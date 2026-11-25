// ═══ Музыка «3 попыток» (10.75+, HANDOFF §3fc): настоящее приложение на стенде, перехват play()/pause() ═══
// Проверяет: трек раунда играет с фазы 1, play() один на все три фазы (нет перезапуска), pause() на разборе.
// Без QP_RV_MUSIC трека нет — скрипт должен упасть (контрольный прогон: тишина). Нужен NODE_PATH=$(npm root -g) (playwright).
// Запуск (нужны QP_RV_MUSIC=1 QP_RV_P=1 — фазы по 4 с и трек в настройках раунда 13 пакета «все механики»):
//   QP_RV_MUSIC=1 QP_RV_P=1 QP_BOOK_SCRATCH=<dir> node e2e/book/reveal-music-check.cjs [--no-build]
'use strict'
const { chromium } = require('playwright')
const argv = process.argv.slice(2)

async function main() {
  const { startStand, ORIGIN, PIN } = await import('./stand.mjs')
  const { makeApi } = await import('./scenes.mjs')
  const { PACK_ALL } = await import('./make-pack.mjs')
  const stand = await startStand({ noBuild: argv.includes('--no-build') })
  const api = makeApi(ORIGIN, PIN)
  const browser = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] })
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 }, serviceWorkers: 'block' })
  const page = await ctx.newPage()
  // перехват: журнал play/pause по каждому <audio> (создан через new Audio — в DOM его нет)
  await page.addInitScript(pin => { try { localStorage.setItem('qp-local-pin', pin) } catch { /* */ } }, PIN)
  await page.addInitScript(() => {
    window.__log = []; let n = 0
    const id = new WeakMap()
    const idOf = a => { if (!id.has(a)) id.set(a, ++n); return id.get(a) }
    const P = HTMLMediaElement.prototype.play, Q = HTMLMediaElement.prototype.pause
    HTMLMediaElement.prototype.play = function () { window.__log.push({ t: Date.now(), ev: 'play', el: idOf(this), src: (this.currentSrc || this.src || '').split('/').pop() }); return P.apply(this, arguments) }
    HTMLMediaElement.prototype.pause = function () { window.__log.push({ t: Date.now(), ev: 'pause', el: idOf(this), src: (this.currentSrc || this.src || '').split('/').pop() }); return Q.apply(this, arguments) }
  })
  if (process.env.QP_DEBUG) { page.on('console', m => console.log('[console]', m.type(), m.text().slice(0, 200))); page.on('requestfailed', r => console.log('[reqfail]', r.url())); page.on('response', r => { if (r.request().method() !== 'GET' && !r.ok()) console.log('[http]', r.status(), r.url()) }) }
  const fails = []
  const mel = l => l.filter(x => /mel-0-0/.test(x.src))
  await api.reset(); await api.teams(2)
  await api.session({ pack_id: PACK_ALL, phase: 'question', round_number: 13, question_index: 0, timer_started_at: new Date().toISOString(), reveal: false, melody: {} })
  await page.goto(`${ORIGIN}/quiz-party/#/?room=stand`)
  const t0 = Date.now()
  const samples = []
  // 4 с на фазу + 3 с запас = 7 с; три фазы ≈ 21 с, затем разбор
  for (let i = 0; i < 34; i++) {
    await page.waitForTimeout(1000)
    samples.push(await page.evaluate(() => ({ phase: document.querySelector('.rv-review-screen') ? 'review' : (document.querySelector('.host-topbar .qnum')?.textContent.match(/ФАЗА (\d)/) || [])[1] || '-', log: window.__log.slice() })))
    if (samples[samples.length - 1].phase === 'review') { await page.waitForTimeout(2500); break }
  }
  const last = await page.evaluate(() => window.__log.slice())
  if (process.env.QP_DEBUG) console.log('session:', JSON.stringify(await api.call('/api/session')).slice(0, 600), '\nlog:', JSON.stringify(last).slice(0, 400))
  const seen = [...new Set(samples.map(s => s.phase))]
  const plays = mel(last).filter(x => x.ev === 'play'), pauses = mel(last).filter(x => x.ev === 'pause')
  const firstPlayPhase = samples.find(s => mel(s.log).some(x => x.ev === 'play'))?.phase
  console.log('фазы по секундам:', samples.map(s => s.phase).join(' '))
  console.log('play трека:', plays.length, 'pause трека:', pauses.length, 'первый play на фазе', firstPlayPhase)
  if (!seen.includes('1') || !seen.includes('2') || !seen.includes('3') || !seen.includes('review')) fails.push('не дошли до всех фаз: ' + seen.join(','))
  if (firstPlayPhase !== '1') fails.push('трек не запустился на фазе 1: ' + firstPlayPhase)
  // play() на ЭЛЕМЕНТ, пока он играет, — ровно один (нет перезапусков на фазах)
  if (plays.length !== 1) fails.push(`play() трека вызван ${plays.length} раз(а), ожидался 1`)
  const reviewIdx = samples.findIndex(s => s.phase === 'review')
  const playingAtReview = reviewIdx >= 0 && mel(samples[reviewIdx].log).filter(x => x.ev === 'play').length > mel(samples[reviewIdx].log).filter(x => x.ev === 'pause').length
  if (playingAtReview && mel(last).filter(x => x.ev === 'pause').length < 1) fails.push('трек не остановлен на разборе')
  if (pauses.length < 1) fails.push('нет pause() трека после разбора')
  // состояние реальных audio-элементов не доступно (new Audio вне DOM) — достаточно журнала: play один, pause после review
  const pauseAt = pauses.length ? pauses[pauses.length - 1].t : 0
  const reviewT = t0 + (reviewIdx + 1) * 1000
  console.log('pause трека через', ((pauseAt - reviewT) / 1000).toFixed(1), 'с относительно первого снимка разбора (≤ 0 — остановлен до/в момент показа)')

  // бумага (тишина до «ПРОЧИТАЛ») здесь НЕ прогоняется — в бумажном пакете стенда нет раунда «3 попытки»; правило покрыто юнит-тестом revealMusicSrc
  await page.close()
  console.log(fails.length ? 'FAIL:\n - ' + fails.join('\n - ') : 'OK')
  await browser.close(); await stand.close?.()
  process.exit(fails.length ? 1 : 0)
}
main().catch(e => { console.error(e); process.exit(2) })
