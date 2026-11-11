// PIN ведущего локального сервера бара (10.64). Сервер печатает его в своём окне; ведущий вводит его ОДИН раз на странице /local на своём устройстве (проектор/пульт) —
// дальше каждый запрос к `/api/*` с этого устройства несёт заголовок X-QP-PIN. Телефоны игроков PIN не знают и не должны.
const KEY = 'qp-local-pin'
export const getLocalPin = (): string => { try { return localStorage.getItem(KEY) ?? '' } catch { return '' } }
export const setLocalPin = (v: string) => { try { if (v.trim()) localStorage.setItem(KEY, v.trim()); else localStorage.removeItem(KEY) } catch { /* приватный режим */ } }
export const localPinHeaders = (): Record<string, string> => { const p = getLocalPin(); return p ? { 'X-QP-PIN': p } : {} }
