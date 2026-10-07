// Точка входа Magic 2.0 Concept Lab. Отдельная страница (labs/magic2/),
// в сборку игры не входит: vite build собирает только index.html.
import { createRoot } from 'react-dom/client'
import { Lab } from './Lab'
import './lab.css'
import './c1/c1.css'
import './c2/c2.css'
import './c3/c3.css'

createRoot(document.getElementById('root')!).render(<Lab />)
