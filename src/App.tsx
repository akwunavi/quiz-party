import { HashRouter, Routes, Route } from 'react-router-dom'

// Каркас маршрутов (этап 1). Экраны появляются на этапах 2-4:
// /        — HostScreen (проектор + выбор пакета)
// /player  — PlayerPage (?pack=N для шарёбельной ссылки)
// /admin   — AdminPage
// /editor  — конструктор пакетов
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
        <Route path="/" element={<Stub name="Хост" />} />
        <Route path="/player" element={<Stub name="Игрок" />} />
        <Route path="/admin" element={<Stub name="Админка" />} />
        <Route path="/editor" element={<Stub name="Редактор" />} />
      </Routes>
    </HashRouter>
  )
}
