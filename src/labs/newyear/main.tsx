// Точка входа New Year Mockup Lab. Отдельная страница (labs/newyear/),
// в сборку игры не входит: vite build собирает только index.html.
import { createRoot } from 'react-dom/client'
import { Lab } from './Lab'
import './lab.css'
import './game/base.css'
import '../../styles/parts/40-ny-engine.css'
import '../../styles/parts/40-ny-book-world.css'
import '../../styles/parts/42-ny-home-world.css'

createRoot(document.getElementById('root')!).render(<Lab />)
