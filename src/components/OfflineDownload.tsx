import { useState } from 'react'
import { usePackOffline } from '../hooks/usePackOffline'
import type { LoadedPack } from '../lib/packLoader'

function mb(bytes: number): string {
  return `${(bytes / 1048576).toFixed(1)} МБ`
}

function persistText(p: ReturnType<typeof usePackOffline>['persist']): string | null {
  if (p == null) return null
  if (p === 'granted') return 'хранилище защищено от очистки браузером'
  if (p === 'denied') return 'браузер НЕ дал защиту хранилища — может подчистить при нехватке места'
  return 'защита хранилища недоступна в этом браузере'
}

/** Кнопка «Скачать пакет для офлайна» + прогресс. Один и тот же компонент
 *  для админки (список служебных кнопок) и для лобби проектора — рисуется
 *  по-разному через `variant`, но логика (`usePackOffline`) общая.
 *
 *  ВАЖНО: `offline` — общий хук, поднятый в родителе (HostInner/AdminPage)
 *  и переданный пропом. Каждый инстанс хука сам по себе тянет свой прогресс
 *  — если завести хук здесь заново, кнопка в `.host-actions` и индикатор
 *  готовности в лобби разъедутся в состояниях. */
export function OfflineDownloadButton({ offline, className, label = 'Скачать пакет для офлайна' }: {
  offline: ReturnType<typeof usePackOffline>
  className?: string
  label?: string
}) {
  const { progress, running, start } = offline
  const text = running
    ? `Качаю офлайн… ${progress?.done ?? 0} / ${progress?.total ?? '?'}`
    : `⇩ ${label}`
  return (
    <button className={className} disabled={running} onClick={() => void start()}>
      {text}
    </button>
  )
}

/** Развёрнутая панель для «Служебного» в админке: кнопка + прогресс +
 *  список того, что не скачалось (ведущему нужно понимать, что чинить в
 *  редакторе — молчать нельзя). */
export function OfflineDownloadPanel({ pack, offline }: { pack: LoadedPack; offline: ReturnType<typeof usePackOffline> }) {
  const { status, progress, persist } = offline
  const [showFailed, setShowFailed] = useState(false)
  const missing = progress
    ? progress.total - progress.done + progress.failed.length
    : status
      ? status.total - status.have
      : null

  return (
    <div className="adm-box offline-dl-panel">
      <OfflineDownloadButton offline={offline} className="adm-link" />
      {(status || progress) && (
        <div className="adm-dim offline-dl-info">
          {progress
            ? `${progress.done} / ${progress.total} файлов · ${mb(progress.bytes)} скачано`
            : status
              ? `${status.have} / ${status.total} файлов уже офлайн${missing ? ` · не хватает ${missing}` : ''}`
              : null}
          {pack.rounds.length === 0 && ' · в пакете нет раундов'}
        </div>
      )}
      {persistText(persist) && <div className="adm-dim offline-dl-persist">{persistText(persist)}</div>}
      {progress && !progress.running && progress.failed.length > 0 && (
        <div className="offline-dl-failed">
          <button className="adm-link" onClick={() => setShowFailed(v => !v)}>
            {showFailed ? '▾' : '▸'} не скачалось: {progress.failed.length}
          </button>
          <div className="adm-dim offline-dl-retry-hint">
            Часто это просто сеть моргнула, а не что-то реально пропавшее —
            жми кнопку выше ещё раз: она докачивает только недостающее, не
            всё заново.
          </div>
          {showFailed && (
            <ul className="offline-dl-failed-list">
              {progress.failed.map(f => <li key={f}>{f}</li>)}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
