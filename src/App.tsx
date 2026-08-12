import { HashRouter, Routes, Route } from 'react-router-dom'
import { HostScreen } from './pages/HostScreen'
import { PlayerPage } from './pages/PlayerPage'
import { AdminPage } from './pages/AdminPage'

// /editor приедет на этапах 3-4.
function Stub({ name }: { name: string }) {
  return <div style={{ padding: 40, fontFamily: 'system-ui' }}>
    <h1>Quiz Party</h1>
    <p>Экран «{name}» — в разработке (см. план этапов в ТЗ).</p>
  </div>
}

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HostScreen />} />
        <Route path="/player" element={<PlayerPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/editor" element={<Stub name="Редактор" />} />
      </Routes>
    </HashRouter>
  )
}
