// Точка входа Seven Worlds Lab. Отдельная страница (labs/worlds7/),
// в сборку игры не входит: vite build собирает только index.html.
import { createRoot } from 'react-dom/client'
import { Lab } from './Lab'
import '../magic2/lab.css'
import './base.css'

createRoot(document.getElementById('root')!).render(<Lab />)
