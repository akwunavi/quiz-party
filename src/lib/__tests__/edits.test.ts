import { describe, it, expect } from 'vitest'
import { isComplete, spendsEdit } from '../edits'
import type { AnswerSpec } from '../../types/quiz'

const match = { mode: 'match', left: ['1', '2', '3', '4'], right: ['А', 'Б', 'В', 'Г'],
  correct_pairs: {} } as unknown as AnswerSpec
const order = { mode: 'order',
  choices: [{ key: 'А', text: '' }, { key: 'Б', text: '' }, { key: 'В', text: '' }],
  correct_order: 'АБВ' } as unknown as AnswerSpec
const free = { mode: 'free_text', correct: 'х' } as unknown as AnswerSpec

describe('учёт правок', () => {
  it('СОПОСТАВЛЕНИЕ: набор ответа по частям НЕ тратит правки', () => {
    const steps = ['', '1А', '1А,2Б', '1А,2Б,3В', '1А,2Б,3В,4Г']
    let spent = 0
    for (let i = 1; i < steps.length; i++) {
      if (spendsEdit(match, steps[i - 1], steps[i])) spent++
    }
    expect(spent).toBe(0)
  })

  it('СОПОСТАВЛЕНИЕ: смена готового ответа тратит одну правку', () => {
    expect(spendsEdit(match, '1А,2Б,3В,4Г', '1Б,2А,3В,4Г')).toBe(true)
  })

  it('ПОРЯДОК: ввод всей последовательности бесплатен', () => {
    let spent = 0
    const steps = ['', 'А', 'АБ', 'АБВ']
    for (let i = 1; i < steps.length; i++) {
      if (spendsEdit(order, steps[i - 1], steps[i])) spent++
    }
    expect(spent).toBe(0)
  })

  it('ПОРЯДОК: перебор после полного ввода — правка', () => {
    expect(spendsEdit(order, 'АБВ', 'БАВ')).toBe(true)
  })

  it('свободный ответ: первый ввод бесплатен, второй — правка', () => {
    expect(spendsEdit(free, '', 'Москва')).toBe(false)
    expect(spendsEdit(free, 'Москва', 'Тула')).toBe(true)
  })

  it('одинаковый ответ правкой не считается', () => {
    expect(spendsEdit(free, 'Москва', 'Москва')).toBe(false)
  })

  it('неполный ответ не считается готовым', () => {
    expect(isComplete(match, '1А,2Б')).toBe(false)
    expect(isComplete(order, 'АБ')).toBe(false)
  })
})
