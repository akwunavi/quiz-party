// Точка входа New Year Mockup Lab. Отдельная страница (labs/newyear/),
// в сборку игры не входит: vite build собирает только index.html.
import { createRoot } from 'react-dom/client'
import { Lab } from './Lab'
import './lab.css'
import './game/base.css'

createRoot(document.getElementById('root')!).render(<Lab />)
