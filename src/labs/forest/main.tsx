// Точка входа Forest Refinement Lab (labs/forest/). В сборку игры не входит.
import { createRoot } from 'react-dom/client'
import { Lab } from './Lab'
import '../magic2/lab.css'
import '../cine7/base.css'
import '../cine7/w3.css'
import './lab.css'
import './stage1/stage1.css'
import './stage2/stage2.css'
import './stage3/stage3.css'
import './stage3/crossword.css'

createRoot(document.getElementById('root')!).render(<Lab />)
