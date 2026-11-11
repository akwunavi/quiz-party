#!/usr/bin/env node
// Собирает автономную демо «Скачек бульдогов»: dist-demo/bulldog-racing-demo/ и ZIP рядом (npm run demo:bulldog).
// Что внутри: index.html + demo.js (обычный скрипт, не модуль) + demo.css (шрифты вшиты) + data/<собака>.js (JSON и листы спрайтов, base64).
// Зачем base64: по file:// браузер запрещает fetch и «пачкает» картинки с диска, а движку нужно читать пиксели (нос собаки). Данные из <script> этого не касаются.
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, rmSync, existsSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
const R = process.cwd()
const out = join(R, 'dist-demo', 'bulldog-racing-demo')
execFileSync('npx', ['vite', 'build', '-c', 'vite.demo.config.ts'], { cwd: R, stdio: 'inherit' })
execFileSync('npx', ['vite', 'build', '-c', 'vite.demo.config.ts'], { cwd: R, stdio: 'inherit', env: { ...process.env, DEMO_ENTRY: 'arena' } })
rmSync(out, { recursive: true, force: true }); mkdirSync(join(out, 'data'), { recursive: true })
// шрифты — внутрь css
let css = readFileSync(join(R, 'dist-demo/app/demo.css'), 'utf8'), nf = 0
css = css.replace(/url\((['"]?)\/quiz-party\/fonts\/([^)'"]+)\1\)/g, (_m, _q, f) => { nf++; return `url(data:font/woff2;base64,${readFileSync(join(R, 'public/fonts', f)).toString('base64')})` })
writeFileSync(join(out, 'demo.css'), css)
writeFileSync(join(out, 'demo.js'), readFileSync(join(R, 'dist-demo/app/demo.js')))
// данные собак: только то, что читает игра (race/* и select/*), без still.webp (нужен лишь телефону)
const base = join(R, 'public/bulldog'), dogs = readdirSync(base).filter(d => statSync(join(base, d)).isDirectory())
const walk = d => readdirSync(d).flatMap(n => { const p = join(d, n); return statSync(p).isDirectory() ? walk(p) : [p] })
const scripts = []
for (const dog of dogs) {
  let js = '(window.__BD=window.__BD||{});\n'
  for (const f of walk(join(base, dog))) {
    const k = relative(base, f).split(sep).join('/'); if (k.endsWith('still.webp')) continue
    const buf = readFileSync(f)
    js += `__BD[${JSON.stringify(k)}]=${k.endsWith('.json') ? buf.toString('utf8').trim() : JSON.stringify(buf.toString('base64'))};\n`
  }
  writeFileSync(join(out, 'data', dog + '.js'), js); scripts.push(`data/${dog}.js`)
}
writeFileSync(join(out, 'index.html'), `<!doctype html>
<html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Скачки бульдогов — демо</title><link rel="stylesheet" href="demo.css"></head>
<body><div id="root"><p style="color:#ccc;font:16px sans-serif;padding:24px">Загрузка собак…</p></div>
${scripts.map(s => `<script src="${s}"></script>`).join('\n')}
<script src="arena/slots.js"></script>
<script src="demo.js"></script></body></html>
`)
writeFileSync(join(out, 'arena.js'), readFileSync(join(R, 'dist-demo/app-arena/arena.js')))
// авторские слои арены (public/arena) — рядом, и список для загрузчика
mkdirSync(join(out, 'arena'), { recursive: true }); const artFiles = existsSync(join(R, 'public/arena')) ? readdirSync(join(R, 'public/arena')).filter(f => /\.(webp|png)$/.test(f)) : []
for (const f of artFiles) writeFileSync(join(out, 'arena', f), readFileSync(join(R, 'public/arena', f)))
writeFileSync(join(out, 'arena', 'slots.js'), `window.__ARENA_SLOTS=${JSON.stringify(artFiles)};\n`)
writeFileSync(join(out, 'arena.html'), `<!doctype html>
<html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Зимняя арена — сегмент</title>
<style>html,body{margin:0;height:100%;background:#000;color:#ddd;font:14px system-ui,sans-serif}#root{display:flex;flex-direction:column;height:100vh}#stage{flex:1 1 0;min-height:0;display:flex;align-items:center;justify-content:center}
#cv{max-width:100%;max-height:100%;aspect-ratio:16/9;background:#000}#bar{display:flex;gap:12px;align-items:center;padding:8px 14px;background:#15171c;border-top:1px solid #333}#bar input[type=range]{flex:1}button{padding:6px 12px;cursor:pointer;border:1px solid #555;background:#262a33;color:#eee;border-radius:6px}</style></head>
<body><div id="root"><p style="padding:24px">Загрузка собак…</p></div>
${scripts.map(s => `<script src="${s}"></script>`).join('\n')}
<script src="arena/slots.js"></script>
<script src="arena.js"></script></body></html>
`)
writeFileSync(join(out, 'КАК ОТКРЫТЬ.txt'), `1. Распакуйте архив (правая кнопка → «Извлечь всё…»).
2. Дважды щёлкните index.html (лучше в Chrome или Edge).
3. Выберите собак в панели снизу и нажмите зелёную кнопку «ЗАКРЫТЬ ВЫБОР И НАЧАТЬ СКАЧКИ».
Интернет не нужен. Если открылось в другом браузере и не работает — откройте в Chrome или Edge.
`)
const zip = join(R, 'dist-demo', 'bulldog-racing-demo.zip')
rmSync(zip, { force: true })
execFileSync('python3', ['-I', '-c', `import zipfile,os,sys
o,z=sys.argv[1],sys.argv[2]
with zipfile.ZipFile(z,'w',zipfile.ZIP_DEFLATED,compresslevel=6) as f:
    for d,_,fs in os.walk(o):
        for n in sorted(fs):
            p=os.path.join(d,n); f.write(p,os.path.relpath(p,o))`, out, zip])
console.log(`шрифтов вшито: ${nf}; собак: ${dogs.length}; ZIP: ${(statSync(zip).size / 1e6).toFixed(1)} МБ`)
