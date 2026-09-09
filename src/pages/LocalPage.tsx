// ═══ /local — пульт локального сервера бара (шаг 6/Part B офлайн-устойчивости) ═══
//
// Служебная страница, как HostGate: без входа (ведущий и так стоит у
// ноутбука, физический доступ к серверу уже даёт доступ ко всему), без
// привязки к теме пакета — раньше пакета ещё может не быть выбрано вовсе.
//
// Показывает статус локального сервера, переключает «холодный замок»
// (armed), даёт QR на свой же адрес и кнопки «выгрузить игру в файл» /
// «залить пакет на сервер».
import { useCallback, useEffect, useState } from 'react'
import QrCode from '../components/QrCode'
import { VERSION } from '../version'
import { copyText } from '../lib/clipboard'
import { createPollLoop } from '../lib/pollLoop'
import { readPack, listCachedPackIds } from '../lib/packCache'

type Health = { ok: true; version: string; rev: number; armed: boolean; gameId: string }

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 2500)
  try {
    const res = await fetch(path, { ...init, signal: controller.signal })
    const text = await res.text()
    const body = text ? JSON.parse(text) : undefined
    if (!res.ok) throw new Error(body?.error ?? `сервер ответил ${res.status}`)
    return body as T
  } finally {
    clearTimeout(timer)
  }
}

function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export function LocalPage() {
  const [health, setHealth] = useState<Health | null>(null)
  const [reachable, setReachable] = useState<boolean | null>(null)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const [copyOk, setCopyOk] = useState(false)
  const [packIds, setPackIds] = useState<string[]>([])
  const [selectedPack, setSelectedPack] = useState('')
  const [packUploadMsg, setPackUploadMsg] = useState('')

  useEffect(() => {
    const loop = createPollLoop<Health | null>(
      () => fetchJson<Health>('/api/health').catch(() => null),
      data => { setHealth(data); setReachable(data != null) },
      { intervalMs: 3000 },
    )
    void loop.poll()
    return () => loop.stop()
  }, [])

  useEffect(() => {
    void listCachedPackIds().then(setPackIds).catch(() => setPackIds([]))
  }, [])

  const toggleArmed = useCallback(async () => {
    if (!health) return
    setBusy(true); setErr('')
    try {
      await fetchJson(health.armed ? '/api/disarm' : '/api/arm', { method: 'POST' })
      const fresh = await fetchJson<Health>('/api/health')
      setHealth(fresh)
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'не получилось переключить режим')
    } finally {
      setBusy(false)
    }
  }, [health])

  const exportGame = useCallback(async () => {
    setErr('')
    try {
      const dump = await fetchJson('/api/export')
      downloadJson(`quiz-party-local-${new Date().toISOString().replace(/[:.]/g, '-')}.json`, dump)
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'не получилось выгрузить игру')
    }
  }, [])

  const uploadPack = useCallback(async () => {
    if (!selectedPack) return
    setPackUploadMsg('заливаю…')
    try {
      const pack = await readPack(selectedPack)
      if (!pack) { setPackUploadMsg('пакета нет в офлайн-кеше этого браузера'); return }
      await fetchJson(`/api/pack/${encodeURIComponent(selectedPack)}`, {
        method: 'POST', body: JSON.stringify(pack),
      })
      setPackUploadMsg('готово — JSON пакета на сервере. Медиа (картинки/звук) заливкой пока '
        + 'не поддержано, сервер отдаст ошибку, если файла не найдёт на диске (см. README).')
    } catch (e) {
      setPackUploadMsg(e instanceof Error ? e.message : 'не получилось залить пакет')
    }
  }, [selectedPack])

  const playerUrl = `${location.origin}${location.pathname}#/player`

  return (
    <div className="gate-screen local-screen">
      <div className="gate-card local-card">
        <div className="mono-tag">QUIZ PARTY · ЛОКАЛЬНЫЙ СЕРВЕР · v{VERSION}</div>

        {reachable === null && <p className="gate-hint">Проверяю сервер…</p>}
        {reachable === false && (
          <p className="gate-hint local-warn">
            Сервер не отвечает по адресу <code>/api/health</code> с ЭТОЙ страницы. Если ты
            открыл(а) эту вкладку на обычном (облачном) адресе сайта — здесь и не будет сервера,
            открой её с адреса локального сервера (см. консоль ноутбука или QR ниже, если он уже
            был показан раньше).
          </p>
        )}
        {health && (
          <div className="local-status">
            <div className={`local-armed-pill ${health.armed ? 'on' : 'off'}`}>
              {health.armed ? 'ЛОКАЛЬНЫЙ РЕЖИМ ВКЛЮЧЁН — идёт запись' : 'ХОЛОДНЫЙ СТАРТ — запись выключена'}
            </div>
            <div className="adm-dim">версия сервера {health.version} · rev {health.rev} · игра {health.gameId.slice(0, 8)}</div>
            <button className="local-toggle" disabled={busy} onClick={() => void toggleArmed()}>
              {busy ? 'Переключаю…' : health.armed ? 'ВЫКЛЮЧИТЬ ЛОКАЛЬНЫЙ РЕЖИМ' : 'ВКЛЮЧИТЬ ЛОКАЛЬНЫЙ РЕЖИМ'}
            </button>
          </div>
        )}
        {err && <div className="gate-err">{err}</div>}

        <div className="local-links">
          <div className="local-link-row">
            <span>Проектор/пульт: <a href="#/">этот же адрес, /#/</a> · <a href="#/admin">админка</a></span>
          </div>
          <div className="local-link-row">
            <span className="local-link-text">{playerUrl}</span>
            <button className="adm-link" onClick={() => void copyText(playerUrl).then(setCopyOk)}>
              {copyOk ? 'скопировано' : 'скопировать ссылку игрока'}
            </button>
          </div>
        </div>

        <QrCode className="local-qr" value={playerUrl} title="QR для подключения игроков" />
        <div className="adm-dim">команды сканируют этот QR тем же способом, что и в облаке —
          адрес просто ведёт на локальный сервер, а не в интернет</div>

        <div className="local-actions">
          <button className="adm-link" onClick={() => void exportGame()}>⇩ выгрузить игру в файл</button>
        </div>

        <div className="local-pack-upload">
          <div className="mono-tag small">ПАКЕТ НА СЕРВЕРЕ</div>
          <p className="gate-hint">Сервер отдаёт вопросы только из пакета, который ты сюда
            залил(а) заранее (нужен пакет, уже скачанный в этом браузере — кнопка «Скачать пакет
            для офлайна» в админке).</p>
          {packIds.length === 0 && <p className="adm-dim">в этом браузере нет офлайн-скачанных пакетов</p>}
          {packIds.length > 0 && (
            <div className="local-link-row">
              <select value={selectedPack} onChange={e => setSelectedPack(e.target.value)}>
                <option value="">выбери пакет…</option>
                {packIds.map(id => <option key={id} value={id}>{id}</option>)}
              </select>
              <button className="adm-link" disabled={!selectedPack} onClick={() => void uploadPack()}>
                залить на сервер
              </button>
            </div>
          )}
          {packUploadMsg && <div className="adm-dim">{packUploadMsg}</div>}
        </div>
      </div>
    </div>
  )
}
