// ═══ Маршруты и разрез бандла по экранам ═══
//
// Экраны грузятся ОТДЕЛЬНЫМИ файлами (`lazy`), а не одним куском. Причина
// простая: гость с телефона открывает только `#/player`, но при общем бандле
// качал заодно проектор, админку и редактор пакетов — сотни килобайт кода,
// который на его экране не появится никогда. В баре, на мобильном интернете,
// это лишние секунды перед первым вопросом.
//
// Что важно помнить при правках:
//   • первый заход на экран — это ЗАПРОС В СЕТЬ. Чтобы у ведущего переход
//     «проектор → админка» не зависел от связи в момент нажатия, остальные
//     экраны ведущего подтягиваются заранее, в простое (Prefetch ниже);
//   • игроку чужие экраны не тянем — у него узкий канал, и ему они не нужны;
//   • если файл экрана не доехал, показываем понятный текст и предлагаем
//     перезагрузку, а не белый экран (ChunkBoundary ниже).
import { Component, Suspense, lazy, useEffect, type ReactNode } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { HostGate } from './pages/HostGate'

// Экраны экспортируются по имени, поэтому переименовываем в default —
// этого ждёт lazy().
const HostScreen = lazy(() => import('./pages/HostScreen').then(m => ({ default: m.HostScreen })))
const PlayerPage = lazy(() => import('./pages/PlayerPage').then(m => ({ default: m.PlayerPage })))
const AdminPage = lazy(() => import('./pages/AdminPage').then(m => ({ default: m.AdminPage })))
const EditorApp = lazy(() => import('./pages/editor/EditorApp').then(m => ({ default: m.EditorApp })))

/** Заглушка на те доли секунды, пока летит файл экрана.
 *  Классы взяты живые (`gate-screen`, `mono-tag`) — те же, что у экрана
 *  входа ведущего, поэтому она выглядит как часть темы, а не как белый лист. */
function ScreenLoading() {
  return (
    <div className="gate-screen">
      <div className="mono-tag">ЗАГРУЖАЕМ ЭКРАН…</div>
    </div>
  )
}

/** Подтягивает остальные экраны ведущего в фоне, когда браузер не занят.
 *  Смысл: к моменту, когда ведущий нажмёт «админка», файл уже в кэше и
 *  переход не зависит от того, ловит ли телефон сеть в эту секунду. */
function Prefetch() {
  const { pathname } = useLocation()
  useEffect(() => {
    // Игрок — только свой экран. Редактор не трогаем: он открывается между
    // играми, в спокойной обстановке, и весит больше всех.
    if (pathname.startsWith('/player')) return
    const warm = () => {
      void import('./pages/HostScreen')
      void import('./pages/AdminPage')
    }
    // requestIdleCallback есть не везде (Safari до 17) — там просто пауза.
    const idle = window.requestIdleCallback
    if (idle) {
      const id = idle(warm)
      return () => window.cancelIdleCallback?.(id)
    }
    const t = window.setTimeout(warm, 2000)
    return () => clearTimeout(t)
  }, [pathname])
  return null
}

/** Файл экрана мог не доехать: сеть моргнула или прод пересобрали, пока
 *  вкладка висела открытой (имена файлов содержат хэш, старые при деплое
 *  исчезают). Раньше такого риска не было — всё скачивалось разом. */
class ChunkBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }

  componentDidCatch(err: unknown) {
    const msg = String((err as Error)?.message ?? err)
    const isChunk = /dynamically imported module|Loading chunk|module script failed|Importing a module/i.test(msg)
    // Одна автоматическая попытка — и только на ошибке загрузки файла: обычный
    // баг рендера иначе увёл бы экран в бесконечный цикл перезагрузок.
    //
    // Перезагрузка ОТЛОЖЕНА намеренно. Вызов location.reload() прямо здесь
    // (React ещё не закончил обработку ошибки) оставлял белый экран — проверено
    // в браузере с оборванной загрузкой. Пауза даёт отрисовать текст ниже,
    // человек видит, что происходит, а не пустоту.
    if (isChunk && !sessionStorage.getItem('qp-chunk-reload')) {
      sessionStorage.setItem('qp-chunk-reload', '1')
      setTimeout(() => location.reload(), 1500)
    }
  }

  render() {
    if (!this.state.failed) return this.props.children
    return (
      <div className="gate-screen">
        <div className="gate-card">
          <div className="mono-tag">ЭКРАН НЕ ЗАГРУЗИЛСЯ</div>
          <p className="gate-hint">Похоже, оборвалась связь. Проверь интернет и
            нажми кнопку — игра и ответы команд никуда не делись, они на сервере.</p>
          <button onClick={() => { sessionStorage.removeItem('qp-chunk-reload'); location.reload() }}>
            Перезагрузить
          </button>
        </div>
      </div>
    )
  }
}

export function App() {
  return (
    <HashRouter>
      <ChunkBoundary>
        <Prefetch />
        <Suspense fallback={<ScreenLoading />}>
          <Routes>
            <Route path="/" element={<HostGate><HostScreen /></HostGate>} />
            <Route path="/player" element={<PlayerPage />} />
            <Route path="/admin" element={<HostGate><AdminPage /></HostGate>} />
            <Route path="/editor" element={<EditorApp />} />
          </Routes>
        </Suspense>
      </ChunkBoundary>
    </HashRouter>
  )
}
