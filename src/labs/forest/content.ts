// ═══ Forest Lab (Концепт C) — одинаковое содержимое для всех экранов ═══
// Фото — настоящие снимки в свободном доступе из наборов данных scikit-image
// и scikit-learn: NASA (портрет Айлин Коллинз, Hubble Deep Field) — общественное
// достояние; Falcon 9, кофе — CC0; Летний дворец, георгин — из scikit-learn.
import palace from './media/summer-palace.jpg'
import collins from './media/collins.jpg'
import falcon from './media/falcon9.jpg'
import hubble from './media/hubble-deep-field.jpg'
import coffee from './media/coffee.jpg'
import dahlia from './media/dahlia.jpg'

export type Opt = { key: string; text: string }
export type Img = { src: string; w: number; h: number; caption: string }
export type StateId = 'mc' | 'img1opt' | 'img1open' | 'port' | 'two' | 'six' | 'three' | 'four' | 'long'
export const ROUND_NAME = 'Кино и литература'
export const QNO = 'Вопрос 5 из 7'
export const TOTAL = 30

export const IMG = {
  palace: { src: palace, w: 1280, h: 854, caption: 'Летний дворец, Пекин' },
  collins: { src: collins, w: 600, h: 800, caption: 'Айлин Коллинз, NASA' },
  falcon: { src: falcon, w: 1024, h: 683, caption: 'Falcon 9 на старте' },
  hubble: { src: hubble, w: 800, h: 698, caption: 'Hubble Deep Field' },
  coffee: { src: coffee, w: 900, h: 600, caption: 'Эспрессо' },
  dahlia: { src: dahlia, w: 960, h: 640, caption: 'Георгин' },
} satisfies Record<string, Img>

export const MC = {
  text: 'Кто из писателей сжёг второй том своей поэмы за девять дней до смерти?',
  options: [{ key: 'А', text: 'Александр Пушкин' }, { key: 'Б', text: 'Николай Гоголь' }, { key: 'В', text: 'Михаил Лермонтов' }, { key: 'Г', text: 'Иван Тургенев' }] as Opt[],
}
export const IMG1 = {
  text: 'В каком городе стоит эта башня над озером?',
  options: [{ key: 'А', text: 'Пекин' }, { key: 'Б', text: 'Шанхай' }, { key: 'В', text: 'Сеул' }, { key: 'Г', text: 'Токио' }] as Opt[],
}
export const PORT = { text: 'Эта женщина первой в истории командовала космическим шаттлом. Как её зовут?' }
export const TWO = {
  text: 'Что из этого впервые полетело в космос раньше?',
  options: [{ key: 'А', text: 'Ракета Falcon 9' }, { key: 'Б', text: 'Телескоп «Хаббл»' }, { key: 'В', text: 'Оба в один год' }, { key: 'Г', text: 'Ни один не летал' }] as Opt[],
}
/** «3 попытки», фаза 1: на проекторе только картинки, клетки слова и фаза — текста вопроса в механике нет. */
export const SIX = { word: 'КОСМОС', open: [0], phase: 1 as const }
export const THREE = { text: 'Какой из снимков сделан космическим телескопом?' }
export const FOUR = { text: 'Какой из снимков не связан с космосом?' }
export const LONG = {
  text: 'Эта башня стоит на холме Долголетия над озером Куньминху. Парк сожгли в 1860 году и восстановили в конце XIX века. В каком городе он находится?',
}
export const STATES: { id: StateId; name: string }[] = [
  { id: 'mc', name: 'Текст и варианты (утверждён)' },
  { id: 'img1opt', name: 'Большое фото + варианты' },
  { id: 'img1open', name: 'Большое фото без вариантов' },
  { id: 'port', name: 'Вертикальное фото' },
  { id: 'two', name: 'Два фото разных пропорций' },
  { id: 'six', name: '3 попытки: два фото и слово' },
  { id: 'three', name: 'Три фото-варианта' },
  { id: 'four', name: 'Четыре фото-варианта' },
  { id: 'long', name: 'Длинный вопрос с фото' },
]
export type Phase = 'normal' | 'warning' | 'zero'
export const phaseOf = (n: number): Phase => (n <= 0 ? 'zero' : n <= 10 ? 'warning' : 'normal')
