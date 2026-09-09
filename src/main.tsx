import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { registerServiceWorker } from './lib/sw'

// возврат на глубокий маршрут после 404-редиректа GitHub Pages
const saved = sessionStorage.getItem('qp-redirect')
if (saved) {
  sessionStorage.removeItem('qp-redirect')
  // HashRouter: путь /quiz-party/admin превращаем в /quiz-party/#/admin
  const route = saved.replace(/^\/quiz-party/, '')
  history.replaceState(null, '', '/quiz-party/#' + (route || '/'))
}
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Офлайн-устойчивость, шаг 8: кеш самого приложения (HTML/JS/CSS/шрифты),
// не только медиа/данные игры (шаги 1–7). Регистрация — best-effort, ничего
// не блокирует; подробности стратегии — `public/sw.js`.
registerServiceWorker()
