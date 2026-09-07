// Перенос файлов Storage со старого (облачного) Supabase на self-hosted.
// Бакет проекта — quiz-media (публичный), см. infra/self-host/README.md
// шаг 6. Запускать один раз, вручную, с сервера или машины с доступом
// в интернет — не из среды Claude Code (сетевые ограничения песочницы).
//
// SOURCE_URL/SOURCE_KEY — облачный проект (service_role ключ).
// TARGET_URL/TARGET_KEY — новый self-host (service_role ключ с шага 3).
//
//   npm install @supabase/supabase-js
//   SOURCE_URL=... SOURCE_KEY=... TARGET_URL=... TARGET_KEY=... node migrate-storage.mjs

import { createClient } from '@supabase/supabase-js'

const BUCKET = 'quiz-media'

const need = (name) => {
  const v = process.env[name]
  if (!v) { console.error(`не задан ${name}`); process.exit(1) }
  return v
}

const source = createClient(need('SOURCE_URL'), need('SOURCE_KEY'))
const target = createClient(need('TARGET_URL'), need('TARGET_KEY'))

// Storage — плоский список путей, а не файловая система: обходим
// рекурсивно по «папкам» (общий префикс в пути), как это делает сам бакет.
async function listAllPaths(client, prefix = '') {
  const { data, error } = await client.storage.from(BUCKET).list(prefix, { limit: 1000 })
  if (error) throw error
  const paths = []
  for (const item of data ?? []) {
    const full = prefix ? `${prefix}/${item.name}` : item.name
    // Объект без metadata.size — это «папка» (общий префикс), не файл.
    if (item.id === null) paths.push(...await listAllPaths(client, full))
    else paths.push(full)
  }
  return paths
}

async function main() {
  console.log('Считаю список файлов в облаке…')
  const paths = await listAllPaths(source)
  console.log(`Найдено ${paths.length} файлов. Переношу…`)

  let ok = 0, failed = []
  for (const path of paths) {
    const { data, error: dlErr } = await source.storage.from(BUCKET).download(path)
    if (dlErr) { failed.push({ path, stage: 'скачивание', err: dlErr.message }); continue }
    const buf = new Uint8Array(await data.arrayBuffer())
    const { error: upErr } = await target.storage.from(BUCKET)
      .upload(path, buf, { contentType: data.type || undefined, upsert: true })
    if (upErr) { failed.push({ path, stage: 'загрузка', err: upErr.message }); continue }
    ok += 1
    if (ok % 20 === 0) console.log(`  …${ok}/${paths.length}`)
  }

  console.log(`\nГотово: ${ok}/${paths.length} перенесено.`)
  if (failed.length) {
    console.log(`Не удалось (${failed.length}):`)
    for (const f of failed) console.log(`  ${f.path} — ${f.stage}: ${f.err}`)
    process.exitCode = 1
  }
}

main().catch(e => { console.error(e); process.exit(1) })
