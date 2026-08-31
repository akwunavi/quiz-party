import { describe, it, expect } from 'vitest'
import { questionFields } from '../questionFields'
import type { MechanicKey } from '../../types/quiz'

// Раскладка полей вопроса в редакторе. Тесты держат две вещи: поле, которое
// в механике работает, обязано быть на экране, а поле, которое не работает,
// не должно создавать иллюзию настройки.

const ALL: MechanicKey[] = ['standard', 'test_stop', 'rebus', 'jeopardy',
  'stakes_unique', 'stakes_free', 'thematic_x2', 'crossword', 'sprint',
  'melody', 'race', 'blitz']

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

  it('озвучка недоступна только мелодии', () => {
    const without = ALL.filter(m => !questionFields(m).voice)
    expect(without).toEqual(['melody'])
  })
})
