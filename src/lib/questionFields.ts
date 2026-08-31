// ═══ Какие поля вопроса показывать для каждой механики ═══
//
// Правило простое: если поле в механике НЕ работает, его не должно быть на
// экране — иначе редактор заполняет его и удивляется, что на игре ничего не
// изменилось. Обратное так же верно: если поле работает, прятать его нельзя.
//
// Раскладка вынесена из формы отдельным модулем ради тестов. Раньше она жила
// прямо в JSX, и кроссворду по недосмотру запрещались медиа вопроса и
// озвучка — хотя проектор для кроссворда рисует ОБЫЧНЫЙ экран вопроса
// (особый у него только титул раунда с сеткой) и оба поля отрабатывает.
import type { MechanicKey } from '../types/quiz'

export interface QuestionFields {
  /** тип ответа задан механикой и не выбирается руками */
  fixedMode: boolean
  /** слот медиа вопроса (картинки, видео, звук) */
  questionMedia: boolean
  /** слот отдельной озвучки вопроса */
  voice: boolean
  mediaLabel: string
  mediaMax: number
  mediaAccept?: string
}

export function questionFields(mech: MechanicKey): QuestionFields {
  // Мелодия: вопрос — это сам трек, поэтому слот один и только звук, а
  // отдельная озвучка поверх трека не играет.
  if (mech === 'melody') return {
    fixedMode: true, questionMedia: true, voice: false,
    mediaLabel: 'Трек (mp3)', mediaMax: 1, mediaAccept: 'audio/*',
  }
  // Ребус: ровно две картинки, из которых складывается слово.
  if (mech === 'rebus') return {
    fixedMode: false, questionMedia: true, voice: true,
    mediaLabel: 'Две картинки ребуса', mediaMax: 2,
  }
  // Кроссворд: тип ответа задан (слово в сетку), а медиа и озвучка —
  // обычные. Определение можно сопроводить картинкой или начитать голосом.
  if (mech === 'crossword') return {
    fixedMode: true, questionMedia: true, voice: true,
    mediaLabel: 'Медиа вопроса (до 4)', mediaMax: 4,
  }
  return {
    fixedMode: false, questionMedia: true, voice: true,
    mediaLabel: 'Медиа вопроса (до 4)', mediaMax: 4,
  }
}
