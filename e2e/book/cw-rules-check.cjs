// ═══ Правила на заставке кроссворда «Книги» против обычной заставки: тот же кегль пунктов (допуск 5%) ═══
// Для каждого набора правил (1 / 4 / 9 пунктов) делаются две заставки с ОДНИМИ текстами: раунд-кроссворд и обычный раунд.
// Меряем: кегль .rule-item, кегль «ПРАВИЛА», кегль номера, выход за сгиб/снег, пересечение с сеткой.
// usage: QP_BOOK_SCRATCH=… node e2e/book/cw-rules-check.cjs [--no-build] [--out каталог] [--shots]
'use strict'
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path')
const argv = process.argv.slice(2); const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d }
const OUT = path.resolve(opt('--out', 'cw-rules-out')); const SHOTS = argv.includes('--shots'); const LIVE = argv.includes('--live')
const SETS = {
  short4: ['Каждый вопрос — одно слово сетки', 'Буквы на пересечениях общие для двух слов', 'За каждое верное слово — 2 балла', 'Ошибиться можно, штрафа нет'],
  long9: Array.from({ length: 9 }, (_, i) => `Правило номер ${i + 1}: ведущий пишет его достаточно подробно, чтобы оно заняло две строки на проекторе`),
  long4: ['Каждый вопрос раунда — это одно слово кроссворда. Команда видит определение на телефоне и вписывает слово целиком, а на проекторе слово появляется в сетке, когда ведущий откроет разбор вопроса.', 'Буквы на пересечениях общие для двух слов: если вы уже знаете соседнее слово, его буквы подскажут вам вторую половину ответа, поэтому порядок ответов на вопросы можно выбирать самим, как удобнее.', 'За каждое верно угаданное слово команда получает по два балла, а за полностью разгаданный кроссворд без единой ошибки добавляется бонус в пять баллов, который засчитывается сразу после раунда.', 'Ошибиться можно, штрафа нет, но поправить слово после отправки можно только два раза, и ведущий принимает только последний вариант, который команда успела отправить до конца времени.'],
  one: ['Одно-единственное правило раунда'],
}
;(async () => {
  const { startStand, ORIGIN, PIN } = await import('./stand.mjs'); const { makeApi } = await import('./scenes.mjs'); const { buildPack } = await import('./make-pack.mjs')
  fs.mkdirSync(OUT, { recursive: true }); const st = await startStand({ noBuild: argv.includes('--no-build') }); const api = makeApi(ORIGIN, PIN)
  const base = buildPack({ all: true }); const id = 'stand-cwr'; const rounds = []; const idx = {}
  for (const [k, rules] of Object.entries(SETS)) for (const [kind, src] of [['cw', base.rounds[3]], ['std', base.rounds[0]]]) {
    const r = JSON.parse(JSON.stringify(src)); const rid = `${id}-${k}-${kind}`; r.id = rid; r.pack_id = id; r.position = rounds.length; r.rules = rules
    if (kind === 'cw') r.title_lines = ['Кино-сериальный кроссворд']
    for (const q of r.questions) { q.round_id = rid; q.id = rid + '-' + q.position }
    idx[`${k}-${kind}`] = rounds.length; rounds.push(r)
  }
  const pack = { ...base, id, name: 'cw-rules', rounds }
  await fetch(`${ORIGIN}/api/pack/${id}`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-QP-PIN': PIN }, body: JSON.stringify(pack) }).then(r => { if (!r.ok) throw new Error('pack ' + r.status) })
  const b = await chromium.launch(); const res = []; let bad = 0
  const SIZES = process.env.QP_SIZES ? process.env.QP_SIZES.split(',').map(x => x.split('x').map(Number)) : [[1920, 1080], [1366, 768], [1280, 720], [1899, 905]]
  for (const [w, h] of SIZES) {
    const p = await (await b.newContext({ viewport: { width: w, height: h }, serviceWorkers: 'block' })).newPage()
    for (const k of Object.keys(SETS)) {
      const row = { w, h, k }
      for (const kind of ['std', 'cw']) {
        await api.reset(); await api.teams(6); await api.session({ pack_id: id, phase: 'round_intro', round_number: idx[`${k}-${kind}`], question_index: 0, timer_started_at: null, reveal: false })
        if (LIVE) {
          // живой переход (как в игре): экран уже открыт на другой фазе, раунд меняется без перезагрузки — через перелистывание
          await api.session({ pack_id: id, phase: 'scoreboard', round_number: 0, question_index: 0, timer_started_at: null, reveal: false })
          await p.goto('about:blank'); await p.goto(`${ORIGIN}/quiz-party/#/?room=stand`); await p.waitForSelector('.host-screen', { timeout: 20000 }); await p.waitForTimeout(3000)
          await api.session({ phase: 'round_intro', round_number: idx[`${k}-${kind}`] }); await p.waitForSelector('.round-intro .rules-frame', { timeout: 20000 }); await p.waitForTimeout(6500)
        } else {
        await p.goto('about:blank'); await p.goto(`${ORIGIN}/quiz-party/#/?room=stand`); await p.waitForSelector('.round-intro .rules-frame', { timeout: 20000 }); await p.waitForTimeout(6500) }
        row[kind] = await p.evaluate(() => {
          const u = Math.min(innerWidth / 1920, innerHeight / 1080), ox = (innerWidth - 1920 * u) / 2, oy = (innerHeight - 1080 * u) / 2
          const R = e => { const r = e.getBoundingClientRect(); return { l: (r.left - ox) / u, r: (r.right - ox) / u, t: (r.top - oy) / u, b: (r.bottom - oy) / u } }
          const f = document.querySelector('.round-intro .rules-frame'), items = [...f.querySelectorAll('.rule-item')]
          const fs = e => parseFloat(getComputedStyle(e).fontSize) / u
          const lab = f.querySelector('.rules-frame-label'), idx = f.querySelector('.rule-item .idx'), it0 = items[0]
          const gap = items.length > 1 ? (R(items[1]).t - R(items[0]).b) : null
          const g = document.querySelector('.bk-cw-grid table, .bk-cw-grid > *')
          return { item: fs(it0), label: fs(lab), idx: fs(idx), pad: parseFloat(getComputedStyle(it0).paddingTop) / u, gap, frame: R(f), nItems: items.length,
            itemsInside: items.every(e => { const a = R(e), c = R(f); return a.b <= c.b + 1 && a.t >= c.t - 1 }), grid: g ? R(g) : null }
        })
        if (SHOTS) await p.screenshot({ path: path.join(OUT, `${k}-${kind}-${w}x${h}.png`) })
      }
      const a = row.std, c = row.cw
      const near = (x, y) => Math.abs(x - y) <= 0.05 * y
      row.checks = { item: near(c.item, a.item), label: near(c.label, a.label), idx: near(c.idx, a.idx), inside: c.itemsInside, fold: c.frame.l > 960 + 20, snow: c.frame.b <= 900,
        grid: !c.grid || c.grid.r <= c.frame.l, centered: Math.abs((c.frame.t + c.frame.b) / 2 - (150 + 730 / 2)) < 120 }
      const ok = Object.values(row.checks).every(Boolean); if (!ok) bad++
      console.log(ok ? 'OK  ' : 'FAIL', w, h, k, `item cw=${c.item.toFixed(1)} std=${a.item.toFixed(1)} label ${c.label.toFixed(1)}/${a.label.toFixed(1)} idx ${c.idx.toFixed(1)}/${a.idx.toFixed(1)} gap ${c.gap && c.gap.toFixed(1)}/${a.gap && a.gap.toFixed(1)}`, 'frame', JSON.stringify(Object.fromEntries(Object.entries(c.frame).map(([x, y]) => [x, Math.round(y)]))), JSON.stringify(row.checks))
      res.push(row)
    }
  }
  fs.writeFileSync(path.join(OUT, 'cw-rules.json'), JSON.stringify(res, null, 1)); await b.close(); await st.close(); console.log(bad ? `FAILED ${bad}` : 'ALL OK'); process.exit(bad ? 1 : 0)
})().catch(e => { console.error(e); process.exit(1) })
