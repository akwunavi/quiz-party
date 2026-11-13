// Снимки вкладок мокапов редизайна (проверка глазами): node e2e/book/rd-shoot.cjs <каталог> [tab=state,...]
'use strict'
const { chromium } = require('playwright'); const path = require('path')
const out = process.argv[2]; const tabs = ['typo', 'timer', 'teams', 'rules', 'melody', 'finale', 'unified', 'anim']
;(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1900, height: 1000 } }); const errs = []; p.on('pageerror', e => errs.push(String(e)))
  await p.goto('file://' + path.resolve('docs-dev/book-redesign/review/book-redesign-mockups.html')); await p.waitForTimeout(600)
  for (const t of tabs) { await p.evaluate(t => { document.querySelectorAll('#bar button').forEach(x => { if (x.textContent.startsWith({ typo: 'Типогр', timer: 'Таймер', teams: 'Карточки', rules: 'Правила', melody: 'Угадай', finale: 'Финал', unified: 'Единое', anim: 'Анимац' }[t])) x.click() }) }, t); await p.waitForTimeout(500); await p.screenshot({ path: `${out}/rd-${t}.png`, fullPage: true }) }
  console.log('errors', errs); await b.close()
})()
