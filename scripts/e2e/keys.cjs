// JWT для тестового стека: node keys.cjs <secret> <role> — печатает токен (HS256), как выпускает Supabase для anon/service_role.
const c = require('crypto'); const [secret, role] = process.argv.slice(2); const b = o => Buffer.from(JSON.stringify(o)).toString('base64url')
const now = Math.floor(Date.now() / 1000), h = b({ alg: 'HS256', typ: 'JWT' }), p = b({ role, iss: 'supabase', iat: now, exp: now + 86400 * 30 })
console.log(`${h}.${p}.${c.createHmac('sha256', secret).update(`${h}.${p}`).digest('base64url')}`)
