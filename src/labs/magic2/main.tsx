// Точка входа Magic 2.0 Concept Lab. Отдельная страница (labs/magic2/),
// в сборку игры не входит: vite build собирает только index.html.
import { createRoot } from 'react-dom/client'
import { Lab } from './Lab'
import './lab.css'
import './base.css'
import './k1/k1.css'
import './k2/k2.css'
import './k3/k3.css'
import './k4/k4.css'
import './k5/k5.css'

createRoot(document.getElementById('root')!).render(<Lab />)
