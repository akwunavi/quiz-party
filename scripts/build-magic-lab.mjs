// Сборка Magic 2.0 Concept Lab в ОДИН html-файл — чтобы открыть с телефона
// или переслать, без запуска проекта. В сборку игры лаборатория не входит.
//   node scripts/build-ny-lab.mjs [cdn|inline] [выходной файл]
// cdn    — React грузится с cdnjs (страница меньше; так она публикуется)
// inline — всё внутри файла (работает без интернета, кроме шрифтов)
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import esbuild from 'esbuild'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const mode = process.argv[2] ?? 'inline'
const out = process.argv[3] ?? path.join(root, 'dist-lab', 'magic2-lab.html')

const globals = {
  name: 'globals',
  setup(b) {
    if (mode !== 'cdn') return
    b.onResolve({ filter: /^react(-dom)?(\/.*)?$/ }, a => ({ path: a.path, namespace: 'g' }))
    b.onLoad({ filter: /.*/, namespace: 'g' }, a => ({
      // UMD-сборка React не содержит jsx-runtime — мост поверх createElement
      contents: a.path === 'react/jsx-runtime'
        ? 'const R = window.React; const j = (t, p, k) => R.createElement(t, k === undefined ? p : { ...p, key: k }); module.exports = { jsx: j, jsxs: j, Fragment: R.Fragment }'
        : a.path.startsWith('react-dom') ? 'module.exports = window.ReactDOM' : 'module.exports = window.React',
      loader: 'js',
    }))
  },
}

const r = await esbuild.build({
  entryPoints: [path.join(root, 'src/labs/magic2/main.tsx')],
  bundle: true, write: false, format: 'iife', minify: true, outdir: 'o', jsx: 'automatic',
  plugins: [globals], legalComments: 'none', logLevel: 'error',
  define: { 'process.env.NODE_ENV': '"production"' },
})
const js = r.outputFiles.find(f => f.path.endsWith('.js')).text.replace(/<\/script/gi, '<\\/script')
const css = r.outputFiles.find(f => f.path.endsWith('.css'))?.text ?? ''
const fonts = fs.readFileSync(path.join(root, 'labs/magic2/index.html'), 'utf8').match(/<link rel="stylesheet"[^>]+>/)[0]
const react = mode === 'cdn'
  ? '<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js"></script>\n' +
    '<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js"></script>\n'
  : ''
const body = `<title>Magic 2.0 Concept Lab</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
${fonts}
<style>${css}</style>
<div id="root"></div>
${react}<script>${js}</script>
`
fs.mkdirSync(path.dirname(out), { recursive: true })
fs.writeFileSync(out, mode === 'cdn' ? body
  : `<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${body}</head></html>`)
console.log('собрано:', out, Math.round(fs.statSync(out).size / 1024) + ' КБ')
