// ═══ КАЛИБРОВКА: как реальный Chromium называет ошибки play() ═══
// Фикс гонки звука (audioSource.ts, HANDOFF §3bw) держится на допущении:
// AbortError из play() значит «прервали», а НЕ «отказ загрузки» — и поэтому
// не должен уводить на запасной путь (fetch). Единственный способ это
// проверить — реальный браузер, а не документация (она не гарантирует
// имя ошибки для каждого движка). Этот скрипт гоняет 4 сценария в headless
// Chromium и пишет результат в src/test/media/chromium-semantics.json —
// SpecAudio (src/test/fakeMedia.ts) сверяется с этим файлом в
// fakeMedia.calibration.test.ts, чтобы подставка не разошлась с реальным
// поведением незаметно.
//
// Запуск: node scripts/media-calibration.mjs
// Браузер уже установлен в /opt/pw-browsers — НЕ вызывать playwright install.

import http from 'node:http'
import { chromium } from 'playwright'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

// ── валидный WAV прямо в коде, без бинарника в репозитории ──
function makeWav() {
  const sampleRate = 8000
  const seconds = 1
  const numSamples = sampleRate * seconds
  const dataSize = numSamples * 2
  const buf = Buffer.alloc(44 + dataSize)
  buf.write('RIFF', 0)
  buf.writeUInt32LE(36 + dataSize, 4)
  buf.write('WAVE', 8)
  buf.write('fmt ', 12)
  buf.writeUInt32LE(16, 16)
  buf.writeUInt16LE(1, 20)          // PCM
  buf.writeUInt16LE(1, 22)          // mono
  buf.writeUInt32LE(sampleRate, 24)
  buf.writeUInt32LE(sampleRate * 2, 28)
  buf.writeUInt16LE(2, 32)
  buf.writeUInt16LE(16, 34)
  buf.write('data', 36)
  buf.writeUInt32LE(dataSize, 40)
  for (let i = 0; i < numSamples; i++) {
    const v = Math.round(Math.sin(i / 20) * 8000)
    buf.writeInt16LE(v, 44 + i * 2)
  }
  return buf
}

const wav = makeWav()

const server = http.createServer((req, res) => {
  if (req.url === '/slow.wav') {
    setTimeout(() => {
      res.writeHead(200, { 'Content-Type': 'audio/wav', 'Content-Length': wav.length })
      res.end(wav)
    }, 1500)
    return
  }
  if (req.url === '/fast.wav') {
    res.writeHead(200, { 'Content-Type': 'audio/wav', 'Content-Length': wav.length })
    res.end(wav)
    return
  }
  res.writeHead(404)
  res.end('not found')
})

async function main() {
  await new Promise(resolve => server.listen(0, resolve))
  const port = server.address().port
  const base = `http://127.0.0.1:${port}`

  // Версия браузера, реально установленная в /opt/pw-browsers, может
  // разойтись с тем, что просит текущая версия пакета playwright —
  // указываем путь к исполняемому файлу явно, не полагаясь на автопоиск.
  const explicitPath = process.env.PW_CHROMIUM_PATH
    ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
  const browser = await chromium.launch({
    executablePath: explicitPath,
    args: ['--autoplay-policy=no-user-gesture-required'],
  })
  const page = await browser.newPage()

  const results = {}

  // случай 1: play() → сразу pause()
  results.case1 = await page.evaluate(async (url) => {
    const a = new Audio(url)
    const p = a.play().catch(e => e.name)
    a.pause()
    return p
  }, `${base}/slow.wav`)

  // случай 2: play() → сразу сменить src
  results.case2 = await page.evaluate(async (url) => {
    const a = new Audio(url)
    const p = a.play().catch(e => e.name)
    a.src = url + '?x=2'
    return p
  }, `${base}/slow.wav`)

  // случай 3: play() на несуществующий (404) путь
  results.case3 = await page.evaluate(async (url) => {
    const a = new Audio(url)
    return a.play().catch(e => e.name)
  }, `${base}/does-not-exist.wav`)

  // случай 4: play() → removeAttribute('src') + load()
  results.case4 = await page.evaluate(async (url) => {
    const a = new Audio(url)
    const p = a.play().catch(e => e.name)
    a.removeAttribute('src')
    a.load()
    return p
  }, `${base}/slow.wav`)

  await browser.close()
  server.close()

  console.log('Результат калибровки Chromium:', results)

  if (results.case3 !== 'NotSupportedError') {
    console.error(
      '\n⚠ ВНИМАНИЕ: случай 3 (404) дал НЕ NotSupportedError, а '
      + JSON.stringify(results.case3)
      + '. Это подрывает допущение фикса A1 — что настоящий отказ загрузки '
      + 'называется иначе, чем AbortError. НЕ переписывать фикс автоматически — '
      + 'сообщить и решить отдельно.',
    )
  }

  const out = path.join(path.dirname(fileURLToPath(import.meta.url)),
    '..', 'src', 'test', 'media', 'chromium-semantics.json')
  writeFileSync(out, JSON.stringify(results, null, 2) + '\n')
  console.log('Записано в', out)
}

main().catch(e => { console.error(e); process.exit(1) })
