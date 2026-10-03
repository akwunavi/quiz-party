import { describe, it, expect } from 'vitest'
import { questionFields, resizeMatch, MATCH_MIN_PAIRS, MATCH_MAX_PAIRS } from '../questionFields'
import type { MechanicKey } from '../../types/quiz'

// Раскладка полей вопроса в редакторе. Тесты держат две вещи: поле, которое
// в механике работает, обязано быть на экране, а поле, которое не работает,
// не должно создавать иллюзию настройки.

const ALL: MechanicKey[] = ['standard', 'test_stop', 'rebus', 'jeopardy',
  'stakes_unique', 'stakes_free', 'thematic_x2', 'crossword', 'sprint',
  'melody', 'race', 'blitz', 'four_pics', 'anagram']

describe('поля вопроса по механикам', () => {
  it('кроссворду доступны и медиа вопроса, и озвучка', () => {
    const f = questionFields('crossword')
    expect(f.questionMedia).toBe(true)
    expect(f.voice).toBe(true)
    expect(f.mediaMax).toBe(4)
  })

  it('у кроссворда тип ответа задан механикой', () => {
    expect(questionFields('crossword').fixedMode).toBe(true)
  })

  it('мелодия: один слот только под звук и без отдельной озвучки', () => {
    const f = questionFields('melody')
    expect(f.mediaMax).toBe(1)
    expect(f.mediaAccept).toBe('audio/*')
    expect(f.voice).toBe(false)
    expect(f.fixedMode).toBe(true)
  })

  it('ребус: ровно две картинки', () => {
    expect(questionFields('rebus').mediaMax).toBe(2)
    expect(questionFields('rebus').mediaLabel).toContain('ребус')
  })

  it('обычный вопрос: до четырёх файлов, тип ответа выбирается руками', () => {
    const f = questionFields('standard')
    expect(f.mediaMax).toBe(4)
    expect(f.fixedMode).toBe(false)
    expect(f.questionMedia && f.voice).toBe(true)
  })

  it('слот медиа вопроса есть у всех механик', () => {
    for (const m of ALL) expect(questionFields(m).questionMedia).toBe(true)
  })

  it('озвучка недоступна мелодии и «3 попыткам»', () => {
    const without = ALL.filter(m => !questionFields(m).voice)
    expect(without.sort()).toEqual(['four_pics', 'melody'])
  })

  it('«3 попытки»: тип ответа задан механикой, до 4 картинок, без озвучки', () => {
    const f = questionFields('four_pics')
    expect(f.fixedMode).toBe(true)
    expect(f.mediaMax).toBe(4)
    expect(f.voice).toBe(false)
  })

  it('«Скрэмбл»: тип ответа задан механикой, одна картинка, озвучка есть', () => {
    const f = questionFields('anagram')
    expect(f.fixedMode).toBe(true)
    expect(f.mediaMax).toBe(1)
    expect(f.voice).toBe(true)
  })
})

describe('сопоставление: от 2 до 6 пар (9.76)', () => {
  const base = { mode: 'match' as const, left: ['1', '2', '3', '4'], right: ['А', 'Б', 'В', 'Г'],
    correct_pairs: ['1В', '2А', '3Г', '4Б'], right_labels: ['а', 'б', 'в', 'г'], display: '' }

  it('увеличение до 6: номера и буквы дописываются, пары и подписи целы', () => {
    const r = resizeMatch(base, 6)
    expect(r.left).toEqual(['1', '2', '3', '4', '5', '6'])
    expect(r.right).toEqual(['А', 'Б', 'В', 'Г', 'Д', 'Е'])
    expect(r.correct_pairs).toEqual(base.correct_pairs)
    expect(r.right_labels).toEqual(['а', 'б', 'в', 'г', '', ''])
  })

  it('уменьшение до 2: пары с убранными номерами или буквами отбрасываются', () => {
    const r = resizeMatch(base, 2)
    expect(r.left).toEqual(['1', '2'])
    expect(r.right).toEqual(['А', 'Б'])
    // 1В — буквы В больше нет, 2А — осталась
    expect(r.correct_pairs).toEqual(['2А'])
    expect(r.right_labels).toEqual(['а', 'б'])
  })

  it('за пределы 2–6 не выходит', () => {
    expect(resizeMatch(base, 1).left).toHaveLength(MATCH_MIN_PAIRS)
    expect(resizeMatch(base, 9).left).toHaveLength(MATCH_MAX_PAIRS)
  })

  it('картинок у сопоставления — до 6, у обычного вопроса по-прежнему до 4', () => {
    expect(questionFields('standard', 'match').mediaMax).toBe(6)
    expect(questionFields('standard', 'free_text').mediaMax).toBe(4)
    expect(questionFields('standard').mediaMax).toBe(4)
  })
})
