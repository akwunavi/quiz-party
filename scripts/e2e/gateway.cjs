// Шлюз «как Kong в Supabase»: /rest/v1/* → PostgREST, /auth/v1/* → GoTrue (префикс срезается), + CORS. Это маршрутизатор, а не имитация: все запросы
// доходят до настоящих PostgREST и GoTrue. usage: node gateway.cjs [port=54321] [rest=54341] [auth=54342]
const http = require('http')
const [PORT, REST, AUTH] = [+(process.argv[2] || 54321), +(process.argv[3] || 54341), +(process.argv[4] || 54342)]
const stats = { total: 0, byPath: {} }
http.createServer((req, res) => {
  const cors = { 'access-control-allow-origin': req.headers.origin || '*', 'access-control-allow-headers': req.headers['access-control-request-headers'] || '*',
    'access-control-allow-methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS', 'access-control-expose-headers': '*', 'access-control-max-age': '600' }
  if (req.method === 'OPTIONS') { res.writeHead(204, cors); res.end(); return }
  if (req.url === '/__stats') { res.writeHead(200, { 'content-type': 'application/json', ...cors }); res.end(JSON.stringify(stats)); return }
  const m = req.url.match(/^\/(rest|auth)\/v1(\/.*)?$/)
  if (!m) { res.writeHead(404, cors); res.end('no route'); return }
  stats.total++; const k = `${req.method} ${m[1]}${(m[2] || '').split('?')[0].split('/').slice(0, 2).join('/')}`; stats.byPath[k] = (stats.byPath[k] || 0) + 1
  const up = http.request({ host: '127.0.0.1', port: m[1] === 'rest' ? REST : AUTH, method: req.method, path: m[2] || '/', headers: { ...req.headers, host: '127.0.0.1' } }, r => {
    res.writeHead(r.statusCode, { ...r.headers, ...cors }); r.pipe(res)
  })
  up.on('error', e => { res.writeHead(502, cors); res.end(String(e)) })
  req.pipe(up)
}).listen(PORT, '127.0.0.1', () => console.log('gateway up', PORT))
