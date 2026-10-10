// Лес, разбор ответов в игре: раскладка под любое число команд и любые тексты, выбор разбора, строки команд.
// Утверждённые кадры лаборатории — потолок: на тестовых данных лаборатории числа не меняются.
import { describe, expect, it } from 'vitest'
import { COL, STRIP, fitFs, stripLayout, teamColHeight, teamColLayout } from '../teamLayout'
import { fitAnswer, recallBottom, recallFs, stdLayout, type StdData } from '../Std'
import { answerShown, letterStep, matchStep, orderStep, reviewKind, reviewRows } from '../review'
import { matchIdx, matchLayout, labelH } from '../../stage3/Match'
import { orderLayout } from '../../stage3/Order'
import { MATCH_SETS } from '../../stage3/data'
import { MCQ, PHOTO, PHOTOS4, TXT } from '../data'
import type { Answer, Question } from '../../../types/quiz'

const base: StdData = { kind: 'text', title: 'Раунд', qn: 1, qcount: 7, question: TXT.q, answer: TXT.answer, options: [], correct: -1, photos: [], keys: [], caption: '' }
const Q = (answer: Question['answer'], media: Question['media'] = {}): Question => ({ id: 'q1', round_id: 'r', position: 1, question_text: 'Вопрос?', media, answer, answer_note: null } as unknown as Question)
const A = (team_id: string, answer_text: string, is_correct: boolean | null = null): Answer => ({ id: `a-${team_id}`, team_id, game_id: 'g', question_ref: 'q-q1', round_number: 0, answer_text, stake: null, is_correct, updated_at: '' })

describe('колонка «Ответы команд»', () => {
  it('до семи команд — как в лаборатории (строка 118, одна колонка)', () => {
    for (const n of [1, 6, 7]) { const L = teamColLayout(n); expect(L.cols).toBe(1); expect(L.rowH).toBeNull(); expect(L.txtFs).toBe(32) }
  })
  it('8–12 — строки ниже, больше 12 — две колонки; колонка всегда в кадре', () => {
    expect(teamColLayout(8).cols).toBe(1); expect(teamColLayout(12).cols).toBe(1); expect(teamColLayout(13).cols).toBe(2)
    for (let n = 1; n <= 40; n++) expect(COL.top + teamColHeight(n), `n=${n}`).toBeLessThanOrEqual(COL.bottom + 2)
    expect(teamColLayout(12).rowH!).toBeLessThan(118); expect(teamColLayout(24).rowH!).toBeGreaterThanOrEqual(60)
  })
})
describe('полоса команд снизу', () => {
  it('шесть команд — ровно лабораторная полоса', () => { const L = stripLayout(6); expect(L.cw).toBeNull(); expect(L.lift).toBe(0); expect(L.height).toBe(STRIP.labH) })
  it('много команд — 2–4 ряда, полоса не выше разумного и все карточки в ширину кадра', () => {
    for (const n of [7, 12, 13, 24, 30]) {
      const L = stripLayout(n)
      expect(L.rows * L.cols).toBeGreaterThanOrEqual(n)
      expect(L.cols * (L.cw ?? 0) + (L.cols - 1) * 10).toBeLessThanOrEqual(STRIP.width)
      expect(L.lift).toBeLessThanOrEqual(60)
    }
    expect(stripLayout(0).height).toBe(0)
  })
  it('кегль ответа ужимается, а не обрезается раньше времени', () => {
    expect(fitFs('Гоголь', 400, 32, 1)).toBe(32)
    expect(fitFs('Николай Васильевич Гоголь — автор «Мёртвых душ» и «Ревизора»', 400, 32, 2)).toBeLessThan(32)
  })
})
describe('разбор обычного вопроса', () => {
  it('тестовые данные лаборатории — утверждённые числа', () => {
    expect(recallFs(TXT.q)).toBe(40)
    expect(fitAnswer('Гоголь', 1160, 150, 250)).toEqual({ fs: 150, lines: 1 })
    expect(fitAnswer('Пекин', 1160, 104, 150)).toEqual({ fs: 104, lines: 1 })
    const img = stdLayout({ ...base, kind: 'img', question: PHOTO.q, answer: PHOTO.answer, photos: [PHOTO.img] })
    expect(img.frame.rects[0].y).toBe(190); expect(img.frame.rects[0].h).toBeLessThanOrEqual(520)
    const opt = stdLayout({ ...base, kind: 'imgopt', question: PHOTOS4.q, photos: PHOTOS4.imgs, keys: PHOTOS4.keys, correct: 3 })
    expect(opt.frame.rects.map(r => [r.y])).toEqual([[190], [190], [560], [560]])
    const mc = stdLayout({ ...base, kind: 'mc', question: MCQ.q, options: MCQ.options })
    expect([0, 1, 2, 3].map(mc.cx)).toEqual([215, 505, 795, 1085]); expect(mc.optW).toBe(270); expect(mc.optFs).toBe(32); expect(mc.flower).toBe(1)
  })
  it('длинный ответ переносится по словам и влезает в ширину; длинный вопрос мельче и не наезжает на ответ', () => {
    const a = fitAnswer('Николай Васильевич Гоголь', 1160, 150, 250)
    expect(a.lines).toBeLessThanOrEqual(2); expect(a.fs * a.lines).toBeLessThanOrEqual(250)
    const long = 'Эта башня стоит на холме Долголетия над озером Куньминху. '.repeat(6)
    expect(recallFs(long)).toBeLessThan(40)
    expect(recallBottom(long)).toBeLessThan(300)
  })
  it('фото и фото-варианты в своей области, не выше напоминания вопроса', () => {
    const im = { src: 'x', w: 600, h: 900 }, wide = { src: 'y', w: 1600, h: 600 }
    for (const photos of [[im], [im, wide], [wide, wide, im, im]]) {
      const L = stdLayout({ ...base, kind: 'img', question: 'В'.repeat(320), photos })
      for (const r of L.frame.rects) { expect(r.x).toBeGreaterThanOrEqual(60); expect(r.x + r.w).toBeLessThanOrEqual(1240); expect(r.y + r.h).toBeLessThanOrEqual(712) }
      for (const r of L.frame.rects) expect(r.y).toBeGreaterThanOrEqual(recallBottom('В'.repeat(320)))
    }
    for (const n of [2, 3, 4, 5, 6]) {
      const L = stdLayout({ ...base, kind: 'imgopt', photos: Array(n).fill(wide), keys: 'АБВГДЕ'.split('').slice(0, n) })
      for (const r of L.frame.rects) { expect(r.x).toBeGreaterThanOrEqual(60); expect(r.x + r.w).toBeLessThanOrEqual(1260); expect(r.y + r.h).toBeLessThanOrEqual(892) }
    }
  })
  it('бумажная игра: разбор сдвинут к центру кадра', () => {
    const L = stdLayout({ ...base, kind: 'mc', options: MCQ.options }, 310)
    expect((L.cx(0) + L.cx(3)) / 2).toBe(960)
  })
})
describe('Сопоставление и Порядок в игре', () => {
  it('без полосы и подъёма — лабораторная раскладка', () => {
    const a = matchLayout(MATCH_SETS.normal), b = matchLayout(MATCH_SETS.normal, { lift: 0 })
    expect(a).toEqual(b); expect(a.h).toBeLessThanOrEqual(380)
  })
  it('полоса команд на вопросе: россыпь подписей над ней и под картинками', () => {
    for (const S of [MATCH_SETS.normal, MATCH_SETS.long, MATCH_SETS.six]) {
      const sl = stripLayout(24), top = 958 - sl.lift, L = matchLayout(S, { long: S === MATCH_SETS.long, lift: sl.lift, stripTop: top }), idx = matchIdx(S)
      L.bank.forEach((b, i) => {
        const k = idx.indexOf(i), w = k >= 0 ? L.fin[k].w : L.minW
        expect(b.y + labelH(S.right_labels[i], w, S.items.length), `${S.text} ${i}`).toBeLessThanOrEqual(top)
        expect(b.y).toBeGreaterThan(L.img[0].y + L.h)
      })
    }
  })
  it('порядок поднимается вместе с полосой', () => {
    const S = { title: '', qn: 1, qcount: 1, text: '', timer: 0, choices: [{ key: 'А', text: 'x' }, { key: 'Б', text: 'y' }], correct_order: 'БА', media: null }
    expect(orderLayout(S).VY).toBe(858); expect(orderLayout(S, { lift: 32 }).VY).toBe(826)
  })
  it('показ укладывается в срок проверки ShowAnswers (revealDoneMs + 600 мс)', () => {
    for (const n of [2, 3, 4, 5, 6]) {
      const doneS = (100 + 600 * (n - 1) + 500 + 600) / 1000
      const ms = matchStep(n, doneS, n > 4 ? 0.95 : 1.25)
      expect(0.3 + (n - 1) * ms + 1.45).toBeLessThanOrEqual(doneS + 0.001)
      const os = orderStep(n, doneS, n > 5 ? 0.85 : 1.0)
      expect(0.3 + (n - 1) * os + 0.9 * os + 0.4).toBeLessThanOrEqual(doneS + 0.001)
    }
    // открытый ответ: последняя буква встаёт до проверки (1,2 с + 0,6 с)
    for (const len of [3, 6, 12, 24, 40]) expect(0.4 + 0.1 + (len - 1) * letterStep(len) + 0.5).toBeLessThanOrEqual(1.8 + 0.001)
  })
})
describe('данные разбора', () => {
  it('какой разбор рисовать', () => {
    const ft = { mode: 'free_text', correct: 'x', display: 'x' } as const
    expect(reviewKind(Q(ft), 'standard', { qImgs: 0, revealImgs: 0, video: false })).toBe('text')
    expect(reviewKind(Q(ft), 'standard', { qImgs: 1, revealImgs: 1, video: false })).toBe('img')
    expect(reviewKind(Q(ft), 'standard', { qImgs: 0, revealImgs: 0, video: true })).toBe('img')
    expect(reviewKind(Q(ft), 'rebus', { qImgs: 0, revealImgs: 0, video: false })).toBe('img')
    const choice: Question['answer'] = { mode: 'choice', choices: [{ key: 'А', text: '' }, { key: 'Б', text: '' }], correct_choice: 'Б', display: 'Б' }
    expect(reviewKind(Q(choice), 'standard', { qImgs: 2, revealImgs: 2, video: false })).toBe('imgopt')
    expect(reviewKind(Q(choice), 'standard', { qImgs: 1, revealImgs: 1, video: false })).toBe('mc')
    expect(reviewKind(Q({ mode: 'order', choices: [], correct_order: '', display: [] }), 'standard', { qImgs: 0, revealImgs: 0, video: false })).toBe('order')
  })
  it('строки команд: все команды, «не ответили» без текста, вердикт только после проверки — той же формулой', () => {
    const q = Q({ mode: 'choice', choices: [{ key: 'А', text: 'Пушкин' }, { key: 'Б', text: 'Гоголь' }], correct_choice: 'Б', display: 'Гоголь' })
    const teams = [{ id: 't1', name: 'Кот', color: '#ffd700' }, { id: 't2', name: 'Сосны', color: '#00e5ff' }, { id: 't3', name: 'Ёжики', color: '#ff0000' }]
    const answers = [A('t1', 'б'), A('t2', 'А', true), A('gone', 'Б')]
    const all = [...teams, { id: 'gone', name: 'Ушли', color: '#00ff00' }]
    const before = reviewRows(q, teams, all, answers, false)
    expect(before.rows.map(r => r.ok)).toEqual([null, null, null, null])
    expect(before.answered).toBe(3)
    const after = reviewRows(q, teams, all, answers, true)
    expect(after.rows.map(r => [r.name, r.text, r.ok])).toEqual([['Кот', 'Б · Гоголь', true], ['Сосны', 'А · Пушкин', true], ['Ёжики', null, null], ['Ушли', 'Б · Гоголь', true]])
    expect(after.rows[0].color).toMatch(/^hsl\(/)
  })
  it('ответ «Сопоставления» — парами через пробел', () => {
    expect(answerShown(Q({ mode: 'match', left: [], right: [], correct_pairs: [], display: '' }), '1А,2Б, 3В')).toBe('1А 2Б 3В')
  })
})
