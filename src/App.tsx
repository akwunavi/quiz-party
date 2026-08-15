import { HashRouter, Routes, Route } from 'react-router-dom'
import { HostScreen } from './pages/HostScreen'
import { PlayerPage } from './pages/PlayerPage'
import { AdminPage } from './pages/AdminPage'
import { EditorApp } from './pages/editor/EditorApp'
import { HostGate } from './pages/HostGate'


export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HostGate><HostScreen /></HostGate>} />
        <Route path="/player" element={<PlayerPage />} />
        <Route path="/admin" element={<HostGate><AdminPage /></HostGate>} />
        <Route path="/editor" element={<EditorApp />} />
      </Routes>
    </HashRouter>
  )
}
