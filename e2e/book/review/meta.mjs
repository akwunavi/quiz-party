// Метаданные сцен для просмотра: группы, где применим переключатель числа команд, кнопки «шаг» (без запуска стенда).
// `node e2e/book/review/meta.mjs --json` печатает список — его читает сборщик статического просмотра.
import { SCENES } from '../scenes.mjs'

export const group = id => {
  if (/^17-|^18-/.test(id)) return 'Архив: Устарело / Не согласовано'
  if (/^01/.test(id)) return 'Лобби'
  if (/^0[4-8]/.test(id)) return 'Вопросы'
  if (/^09/.test(id)) return 'Ожидание'
  if (/^1[012]-|^10-/.test(id) && !/^10b/.test(id)) return 'Раскрытие'
  if (/^1[34]/.test(id)) return 'Мелодия'
  if (/^1[56]/.test(id)) return 'Финал'
  if (/^17/.test(id)) return 'Плитки команд'
  if (/^18/.test(id)) return 'Типографика'
  if (/^66-/.test(id)) return 'Карточка команды'
  if (/^3[0134]-|^32-/.test(id)) return 'Вступление, инфо, перерыв, табло'
  if (/^36-|^6[0-3]-|^02-|^03-/.test(id)) return 'Правила раунда и варианты оформления'
  if (/^35-/.test(id)) return '«120 секунд»'
  if (/^3[789]-/.test(id)) return 'Своя игра'
  if (/^4[012]-/.test(id)) return 'Блиц'
  if (/^4[34]-/.test(id)) return 'Скачки бульдогов'
  if (/^4[5678]-/.test(id)) return '«3 попытки»'
  if (/^49-|^50-/.test(id)) return 'Скрэмбл'
  if (/^5[12]-/.test(id)) return 'Расстановка и кроссворд'
  if (/^5[34567]-/.test(id)) return 'Мелодия: стадии (ставки → ответ)'
  if (/^21-cmp-4v/.test(id)) return '4 вертикальных'
  if (/^21-cmp-4h$/.test(id)) return '4 горизонтальных'
  if (/^21-cmp-4sq/.test(id)) return '4 квадратных'
  if (/^21-cmp-4mix/.test(id)) return '4 смешанных'
  if (/^21-fold/.test(id)) return 'Текст через сгиб'
  if (/^2[01]-/.test(id)) return 'Адаптивность: до/после'
  return 'Прочее'
}
export const teamsApplicable = id => /^(01-lobby-(?!names)|09-answer-time$|10-recall-A|11-|12-|15-finale)/.test(id)
export /** Кнопки «шаг / повторить переход» — только записи в состояние игры (как это сделал бы пульт), без самого пульта. */
function stepsFor(id) {
  const g = group(id)
  const st = []
  if (g === 'Вопросы') st.push({ id: 'next', label: 'Следующий вопрос → (листание страницы)' }, { id: 'prev', label: '← Предыдущий вопрос' }, { id: 'timer', label: 'Перезапустить таймер' })
  if (g === 'Правила') st.push({ id: 'to-q', label: 'Начать раунд → (заставка → вопрос, листание)' }, { id: 'to-intro', label: '← К заставке раунда' })
  if (/^11-|^12-/.test(id)) st.push({ id: 'rereveal', label: 'Повторить раскрытие ответа (скрыть → показать)' }, { id: 'hide', label: 'Скрыть ответ' }, { id: 'show', label: 'Показать ответ' })
  if (/^10-recall-A/.test(id)) st.push({ id: 'show', label: 'Раскрыть ответ (разворот карточки)' }, { id: 'hide', label: 'Вернуть вопрос (до раскрытия)' })
  if (/^13/.test(id)) st.push({ id: 'spin', label: 'Запустить рулетку' })
  if (/^14/.test(id)) st.push({ id: 'play', label: 'Играть отрывок (пластинка; один раз кликните по экрану)' }, { id: 'stop', label: 'Закрыть трек (пластинка стоит)' })
  if (g === 'Лобби' || /^17/.test(id)) st.push({ id: 'addteam', label: '+ Добавить команду' })
  if (g === 'Финал' || g === 'Раскрытие' || g === 'Ожидание') st.push({ id: 'reset', label: 'Начать сцену заново' })
  return st
}


export const sceneList = () => SCENES.map(s => ({ id: s.id, title: s.title, group: group(s.id), teams: teamsApplicable(s.id), steps: stepsFor(s.id), path: s.path ?? null }))

if (process.argv.includes('--json')) console.log(JSON.stringify(sceneList()))
