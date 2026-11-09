// Стенд карусели выбора бульдога на телефоне (vite dev: /e2e/bulldog/picker.html)
import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import '../../src/styles/global.css'
import { BulldogPicker } from '../../src/components/BulldogPicker'
import { DOG_NAMES } from '../../src/lib/bulldog/config'
function App() {
  const [sel, setSel] = useState<number | null>(null)
  return <div className="theme-classic pl-root" style={{ minHeight: '100vh' }}><div className="pl-list"><div className="pl-card"><div className="pl-qlabel">ВЫБЕРИТЕ СВОЕГО БУЛЬДОГА</div><div className="pl-card-body">
    <BulldogPicker names={DOG_NAMES} counts={[1, 0, 2, 0, 1]} selected={sel} locked={false} onPick={setSel} /></div></div></div></div>
}
ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
