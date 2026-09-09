// ═══ Какой origin отдал текущую страницу: облако или локальный сервер бара ═══
//
// НЕ эвристика по IP («похоже на 192.168.x.x») — она ломается на других
// диапазонах сети бара (хот-спот телефона, другой роутер, VPN...). Вместо
// этого локальный сервер (`local-server/server.mjs`) сам подставляет метку
// `<meta name="qp-local" content="1">` в отдаваемый index.html при чтении
// файла. Страница либо пришла с этой меткой, либо нет — надёжный признак.
//
// НЕ переключается автоматически по доступности сервера (health-check) —
// это архитектурно отклонено: автовыбор транспорта создавал бы риск, что
// вкладка сама решит писать не туда, куда думает пользователь. Переход
// между режимами — только явным переходом по URL/QR на другой origin.
export function isLocalMode(): boolean {
  if (typeof document === 'undefined') return false
  return document.querySelector('meta[name="qp-local"]') !== null
}

export function transportMode(): 'cloud' | 'local' {
  return isLocalMode() ? 'local' : 'cloud'
}
