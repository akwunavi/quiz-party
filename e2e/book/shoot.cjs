// ═══ Снимки стенда «Книги»: настоящий HostScreen в headless Chromium ═══
//
// Поднимает стенд (stand.mjs), для каждого сценария (scenes.mjs) и каждого вьюпорта:
// пишет состояние через API → открывает проектор в новой вкладке (без PIN —
// только чтение) → page.clock.install() → ждёт селектор готовности, загрузку
// картинок и document.fonts.ready → даёт сцене `settle` мс → останавливает
// часы страницы (pauseAt) → снимок PNG (scratch) + замеры (measure.cjs).
// В конце PNG → WebP ≤ 300 КБ в docs-dev/book-redesign/shots/<набор>/ + measure.json.
//
// usage:
//   QP_BOOK_SCRATCH=/путь/scratch node e2e/book/shoot.cjs [--no-build] [--set baseline]
//       [--only 01-lobby,15-finale] [--vp 1920x1080,1899x905,1366x768] [--no-reduced | --only-reduced]
//       [--mask] [--exact] [--out <каталог>]
//   --mask  — регресс других тем: гасит анимации и прячет canvas (снег, ели), чтобы сравнение «до/после» не ловило случайный кадр;
//   --exact — точные id сцен в --only; --out — куда писать WebP/measure.json (вне репозитория).
// Окружение: QP_BOOK_THEME (тема пакетов), QP_BOOK_APP (готовая сборка, напр. предка).
// Браузер: chromium из PLAYWRIGHT_BROWSERS_PATH (в облачной сессии /opt/pw-browsers).
'use strict'
const { chromium } = require('playwright')
const fs = require('fs')
const path = require('path')
const { spawnSync } = require('child_process')
const { measure } = require('./measure.cjs')

const ROOT = path.resolve(__dirname, '..', '..')
const argv = process.argv.slice(2)
const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d }
const SET = opt('--set', 'baseline')
const VPS = opt('--vp', '1920x1080,1899x905,1366x768').split(',').map(s => s.split('x').map(Number))
const ONLY = (opt('--only', '') || '').split(',').filter(Boolean)
const MASK = argv.includes('--mask')
const EXACT = argv.includes('--exact')
const OUT = opt('--out', '') ? path.resolve(opt('--out', '')) : path.join(ROOT, 'docs-dev', 'book-redesign', 'shots', SET)
const MAX_WEBP = 300 * 1024

async function main() {
  const { startStand, ORIGIN, PIN, SCRATCH } = await import('./stand.mjs')
  const { SCENES, makeApi } = await import('./scenes.mjs')
  const PNG_DIR = path.join(SCRATCH, `shots-png-${SET}`)
  fs.mkdirSync(PNG_DIR, { recursive: true }); fs.mkdirSync(OUT, { recursive: true })
  const stand = await startStand({ noBuild: argv.includes('--no-build') })
  const api = makeApi(ORIGIN, PIN)
  const url = `${ORIGIN}/quiz-party/#/?room=stand`
  const browser = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] })
  const scenes = SCENES.filter(s => !ONLY.length || ONLY.some(p => EXACT ? s.id === p : s.id.startsWith(p)))
  const results = []

  async function shootOne(scene, [w, h], { reduced = false, save = true } = {}) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, serviceWorkers: 'block', reducedMotion: reduced ? 'reduce' : 'no-preference' })
    const page = await ctx.newPage()
    const errors = [], media = []
    page.on('pageerror', e => errors.push(String(e.message || e)))
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)) })
    const ext = new Set()
    page.on('request', r => { try { const u = new URL(r.url()); if (!/^(127\.0\.0\.1|localhost)$/.test(u.hostname) && u.protocol.startsWith('http')) ext.add(u.hostname) } catch { /* data: */ } })
    page.on('response', r => { if (/\/api\/media\//.test(r.url())) media.push(`${r.status()} ${decodeURIComponent(r.url().replace(/.*\/api\/media\//, ''))}`) })
    await scene.setup(api)
    // факт РЕАЛЬНОГО воспроизведения звука (событие playing у любого <audio>, в т.ч. не в DOM)
    await page.addInitScript(() => {
      const orig = HTMLMediaElement.prototype.play
      HTMLMediaElement.prototype.play = function (...a) {
        if (!this.__qpWatch) { this.__qpWatch = 1; this.addEventListener('playing', () => { (window.__qpPlaying ||= []).push(decodeURIComponent(this.currentSrc).replace(/.*\//, '')) }) }
        return orig.apply(this, a)
      }
    })
    await page.clock.install()
    // scene.query — параметры адреса сцены (прототипные флаги, напр. bkfin=2 — вариант финала)
    await page.goto(scene.path ? ORIGIN + scene.path : scene.query ? url + '&' + scene.query : url)
    let ok = true, why = ''
    try {
      await page.waitForSelector(scene.ready, { timeout: 15000 })
      await page.evaluate(() => document.fonts.ready)
      await page.waitForFunction(() => [...document.images].every(i => i.complete), null, { timeout: 8000 }).catch(() => { why = 'картинки не догрузились за 8 с' })
      await page.waitForTimeout(scene.settle ?? 2000)
      const t = await page.evaluate(() => Date.now())
      if (!scene.noPause) await page.clock.pauseAt(t + 20)   // noPause — тяжёлые сцены (скачки): pauseAt падает «Cannot fast-forward», кадр снимается живым
      // JS-таймеры сцены (каскад строк финала, StagedChoices, «checked» разбора) — промотать, а не ждать
      if (scene.runFor) { await page.clock.runFor(scene.runFor); await page.waitForTimeout(600) }
      // конечный кадр входных CSS-анимаций (слова вопроса по 0.12 с, каскады правил/строк):
      // конечные анимации доигрываем мгновенно, бесконечные (снег, мерцание) не трогаем
      await page.evaluate(() => document.getAnimations().forEach(a => {
        const it = a.effect?.getComputedTiming?.().iterations
        if (Number.isFinite(it) && a.playState !== 'finished') { try { a.finish() } catch { /* бесконечная задержка */ } }
      }))
      await page.waitForTimeout(250)
      if (MASK) {
        await page.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important} canvas,video{visibility:hidden!important}' })
        await page.waitForTimeout(150)
      }
    } catch (e) { ok = false; why = `нет «${scene.ready}»: ${String(e.message).split('\n')[0]}` }
    const name = `${scene.id}-${w}x${h}${reduced ? '-reduced' : ''}`
    if (save) await page.screenshot({ path: path.join(PNG_DIR, name + '.png') })
    const m = await measure(page, { scene: scene.id, reduced })
    m.playing = await page.evaluate(() => window.__qpPlaying ?? [])
    // шрифты: какие начертания реально загружены (локально) + внешние хосты (должно быть пусто — никаких чужих CDN)
    m.fontFaces = await page.evaluate(() => [...document.fonts].filter(f => f.status === 'loaded').map(f => `${f.family.replace(/"/g, '')} ${f.weight}`).sort())
    m.externalHosts = [...ext]
    await ctx.close()
    const rec = { name, title: scene.title, ok, why, errors: [...new Set(errors)].slice(0, 8), media: [...new Set(media)].filter(s => !s.startsWith('20')), ...m }
    results.push(rec)
    console.log(`${ok ? '✓' : '✗'} ${name}${why ? ' — ' + why : ''}  overlaps=${m.overlaps.length} outside=${m.outside.filter(o => o.of === 'viewport').length} overflow=${m.overflow.length}${rec.errors.length ? ' errors=' + rec.errors.length : ''}`)
  }

  if (!argv.includes('--only-reduced')) for (const scene of scenes) for (const vp of VPS) await shootOne(scene, vp)
  if (!argv.includes('--no-reduced')) for (const scene of scenes) await shootOne(scene, [1920, 1080], { reduced: true, save: false })

  await browser.close(); await stand.close()

  // PNG → WebP ≤ 300 КБ (качество подбирается ступенями)
  const py = `
import os, sys
from PIL import Image
src, dst, lim = sys.argv[1], sys.argv[2], int(sys.argv[3])
for f in sorted(os.listdir(src)):
    if not f.endswith('.png'): continue
    im = Image.open(os.path.join(src, f)).convert('RGB')
    out = os.path.join(dst, f[:-4] + '.webp')
    for q in (80, 72, 64, 56, 48, 40, 32):
        im.save(out, 'WEBP', quality=q, method=6)
        if os.path.getsize(out) <= lim: break
    print(f'{f[:-4]}.webp q={q} {os.path.getsize(out)//1024} KB')
`
  const conv = spawnSync('python3', ['-I', '-c', py, PNG_DIR, OUT, String(MAX_WEBP)], { encoding: 'utf8' })
  if (conv.status !== 0) console.error(conv.stderr)
  else console.log(conv.stdout.trim().split('\n').slice(-3).join('\n'))
  // частичный прогон (--only/--vp) дописывает к прежним замерам, а не стирает их
  const mPath = path.join(OUT, 'measure.json')
  let prev = []; try { prev = JSON.parse(fs.readFileSync(mPath, 'utf8')) } catch { /* первого файла нет */ }
  const names = new Set(results.map(r => r.name))
  const merged = [...prev.filter(r => !names.has(r.name)), ...results].sort((a, b) => a.name.localeCompare(b.name))
  fs.writeFileSync(mPath, JSON.stringify(merged, null, 1))
  console.log(`снимки: ${OUT} · PNG: ${PNG_DIR} · замеров: ${results.length}`)
}

main().catch(e => { console.error(e); process.exit(1) })
