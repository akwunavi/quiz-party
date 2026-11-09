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
<script src="demo.js"></script></body></html>
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
