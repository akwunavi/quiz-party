// ═══ Forest Refinement Lab — одинаковое содержимое для Original / A / B / C ═══
// Фото — настоящие снимки в свободном доступе из наборов данных scikit-image
// и scikit-learn (NASA — общественное достояние; Летний дворец — из sklearn).
import palace from './media/summer-palace.jpg'
import collins from './media/collins.jpg'
import falcon from './media/falcon9.jpg'
import hubble from './media/hubble-deep-field.jpg'

export type Opt = { key: string; text: string }
export type Img = { src: string; w: number; h: number; caption: string }
export type StateId = 'empty' | 'mc' | 'land' | 'port' | 'two'
export const ROUND_NAME = 'Кино и литература'
export const QNO = 'Вопрос 5 из 7'
export const TOTAL = 30

export const MC = {
  text: 'Кто из писателей сжёг второй том своей поэмы за девять дней до смерти?',
  options: [{ key: 'А', text: 'Александр Пушкин' }, { key: 'Б', text: 'Николай Гоголь' }, { key: 'В', text: 'Михаил Лермонтов' }, { key: 'Г', text: 'Иван Тургенев' }] as Opt[],
}
export const LAND = {
  text: 'В каком городе стоит эта башня над озером?',
  img: { src: palace, w: 1280, h: 854, caption: 'Летний дворец' } as Img,
}
export const PORT = {
  text: 'Эта женщина первой в истории командовала космическим шаттлом. Как её зовут?',
  img: { src: collins, w: 600, h: 800, caption: 'NASA, 1999' } as Img,
}
export const TWO = {
  text: 'Что из этого впервые полетело в космос раньше?',
  imgs: [{ src: falcon, w: 1024, h: 683, caption: 'Ракета Falcon 9' }, { src: hubble, w: 800, h: 698, caption: 'Снимок «Хаббла»' }] as Img[],
  options: [{ key: 'А', text: 'Ракета Falcon 9' }, { key: 'Б', text: 'Телескоп «Хаббл»' }, { key: 'В', text: 'Оба в один год' }, { key: 'Г', text: 'Ни один не летал' }] as Opt[],
}
export const STATES: { id: StateId; name: string }[] = [
  { id: 'empty', name: 'Пустая сцена' }, { id: 'mc', name: 'Вопрос с вариантами' },
  { id: 'land', name: 'Одно горизонтальное фото' }, { id: 'port', name: 'Одно вертикальное фото' }, { id: 'two', name: 'Два фото и варианты' },
]
export type Phase = 'normal' | 'warning' | 'zero'
export const phaseOf = (n: number): Phase => (n <= 0 ? 'zero' : n <= 10 ? 'warning' : 'normal')
