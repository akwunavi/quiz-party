// Статика собранного приложения под /quiz-party/ (как GitHub Pages) + счётчик запросов /bulldog/. usage: node static.cjs <dist> [port=5301]
const http = require('http'), fs = require('fs'), path = require('path')
const root = process.argv[2], port = +(process.argv[3] || 5301); const hits = { bulldog: 0, list: [] }
const T = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.webp': 'image/webp', '.css': 'text/css', '.woff2': 'font/woff2', '.mp3': 'audio/mpeg' }
http.createServer((q, s) => {
  const u = new URL(q.url, 'http://x')
  if (u.pathname === '/__hits') { s.end(JSON.stringify(hits)); return }
  if (u.pathname === '/__reset') { hits.bulldog = 0; hits.list = []; s.end('ok'); return }
  let p = decodeURIComponent(u.pathname).replace(/^\/quiz-party\//, '/'); if (p.endsWith('/')) p += 'index.html'
  if (p.startsWith('/bulldog/')) { hits.bulldog++; hits.list.push(p + u.search) }
  fs.readFile(path.join(root, p), (e, d) => {
    if (e) return fs.readFile(path.join(root, 'index.html'), (e2, d2) => { s.writeHead(200, { 'content-type': 'text/html' }); s.end(d2) })
    s.writeHead(200, { 'content-type': T[path.extname(p)] || 'application/octet-stream', 'cache-control': 'no-cache' }); s.end(d)
  })
}).listen(port, '127.0.0.1', () => console.log('static up', port))
