import { describe, it, expect } from 'vitest'
import { softHyphenate, syllableBreaks } from '../softHyphen'

const SOFT = '­'
const parts = (s: string) => softHyphenate(s).split(SOFT)

describe('мягкие переносы русских слов', () => {
  it('короткие слова не трогаем', () => {
    expect(softHyphenate('КАМИН')).toBe('КАМИН')
    expect(softHyphenate('ЁЛОЧКА')).toBe('ЁЛОЧКА')
    expect(syllableBreaks('ПОДАРОК')).toEqual([])
  })
  it('длинное слово получает переносы между слогами, склеенное — то же слово', () => {
    const w = 'НОВОГОДНЕРОЖДЕСТВЕНСКАЯ'
    const out = softHyphenate(w)
    expect(out.replace(new RegExp(SOFT, 'g'), '')).toBe(w)
    expect(parts(w).length).toBeGreaterThan(1)
  })
  it('на каждой стороне не меньше трёх букв, гласные/согласные не рвутся посреди буквы', () => {
    for (const w of ['НОВОГОДНЕРОЖДЕСТВЕНСКАЯ', 'МУЗЫКАЛЬНАЯ', 'ПРЕДНОВОГОДНИЙ', 'ВОЛШЕБСТВО', 'ЗАСНЕЖЕННОСТЬ']) {
      for (const p of parts(w)) expect([...p].length).toBeGreaterThanOrEqual(3)
    }
  })
  it('«й», «ь», «ъ» не отрываются от предыдущей буквы', () => {
    for (const w of ['ВЕСЕЛЬЕЗАБАВНЫЙ', 'ОБЪЯВЛЕНИЕМОРОЗА', 'КАЛЕЙДОСКОПЧИК']) for (const p of parts(w)) expect(p[0]).not.toMatch(/[йьъЙЬЪ]/)
  })
  it('слова с не-буквами (дефис, цифры, латиница) не трогаем', () => {
    expect(softHyphenate('ТРИДЦАТЬ-ПЕРВОЕ')).toBe('ТРИДЦАТЬ-ПЕРВОЕ'.replace(/[А-Яа-яЁё]{9,}/g, w => softHyphenate(w)))
    expect(syllableBreaks('LONGLATINWORD')).toEqual([])
  })
  it('не больше одного переноса на каждые четыре буквы', () => {
    const br = syllableBreaks('НОВОГОДНЕРОЖДЕСТВЕНСКАЯ')
    for (let i = 1; i < br.length; i++) expect(br[i] - br[i - 1]).toBeGreaterThanOrEqual(4)
  })
})
