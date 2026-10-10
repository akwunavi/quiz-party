import { describe, expect, it } from 'vitest'
import { initBlitz, showQuestion, pauseForCheck, resumeAfterCheck, answerCorrect, answerWrong, skip, finishNoQuestions, toResults } from '../../../lib/blitzState'
import { blitzResults } from '../../../lib/blitz'
import { blitzSceneView, revealFrames, revealPhases, revealSceneState, sprintBoardState, type BlitzInput } from '../views'

const teams = [{ id: 'a', name: 'Альфа', color: '#ff0000' }, { id: 'b', name: 'Бета', color: '#00ff00' }, { id: 'c', name: 'Гамма', color: '#0000ff' }]
const bank = [{ id: 'q1' }, { id: 'q2' }, { id: 'q3', hidden: true }]
const qs: Record<string, { text: string; answer: string }> = { q1: { text: 'Столица Норвегии?', answer: 'Осло' }, q2: { text: '7×8?', answer: '56' } }
const input = (state: BlitzInput['state'], now = 0): BlitzInput => ({ state, teams, bank, now, teamSeconds: 60, penalty: 10, question: id => qs[id] })

describe('Лес в игре: «вид» сцен из настоящего состояния', () => {
  it('120 секунд: читаем → идёт время → последние 10 → время вышло', () => {
    expect(sprintBoardState(false, 120)).toBe('read')
    expect(sprintBoardState(true, 87)).toBe('active')
    expect(sprintBoardState(true, 10)).toBe('warning')
    expect(sprintBoardState(true, 0)).toBe('over')
  })

  it('блиц: кубик, ход, вердикты, пауза, итог — по тем же функциям состояния', () => {
    expect(blitzSceneView(input(null)).state).toBe('rolling')
    let s = initBlitz(['b', 'a', 'c'], 60)
    const dice = blitzSceneView(input(s))
    expect(dice.state).toBe('dice')
    expect(dice.teams.map(t => t.id)).toEqual(['b', 'a', 'c'])
    expect(dice.bank).toBe(2) // скрытый вопрос в банк не входит
    s = showQuestion(s, 'q1', 1000)
    const q = blitzSceneView(input(s, 1000 + 2000 + 15_000)) // фора 2 с, потом 15 с
    expect(q).toMatchObject({ state: 'question', active: 'b', q: 'Столица Норвегии?', attempts: 0 })
    expect(q.teams[0].left).toBe(45)
    expect(blitzSceneView(input(s, 1000 + 2000 + 52_000)).state).toBe('warning')
    expect(blitzSceneView(input(s, 1000 + 2000 + 61_000)).state).toBe('timeout')
    const wrong = pauseForCheck(s, 5000, 'no', 'Стокгольм')
    expect(blitzSceneView(input(wrong, 6000))).toMatchObject({ state: 'wrong', attempts: 1, finalWrong: false })
    const right = pauseForCheck(s, 5000, 'ok', 'осло')
    const rv = blitzSceneView(input(right, 6000))
    expect(rv).toMatchObject({ state: 'right', fruitTeam: 'b', answer: 'Осло' })
    expect(rv.teams[0].correct).toBe(1)
    // время во время проверки стоит — те же секунды, что у боевого экрана (liveLeft)
    expect(blitzSceneView(input(right, 60_000)).teams[0].left).toBe(blitzSceneView(input(right, 6000)).teams[0].left)
    const after = answerCorrect(resumeAfterCheck(right, 7000), 7000)
    const btw = blitzSceneView(input(after, 8000))
    expect(btw).toMatchObject({ state: 'between', active: 'a', between: { asking: 'ответили верно!', answer: 'Осло' } })
    // третья неверная — попытки кончились
    let w = showQuestion(after, 'q2', 9000)
    w = answerWrong(resumeAfterCheck(pauseForCheck(w, 9500, 'no', 'x'), 9600), 9600)
    w = answerWrong(resumeAfterCheck(pauseForCheck(w, 9700, 'no', 'y'), 9800), 9800)
    expect(blitzSceneView(input(pauseForCheck(w, 9900, 'no', 'z'), 9900))).toMatchObject({ state: 'wrong', attempts: 3, finalWrong: true, answer: '56' })
    const sk = skip(w, 10_000)
    expect(blitzSceneView(input(sk, 10_100)).between?.asking).toBe('вопрос пропущен')
  })

  it('блиц: итог — ровно blitzResults (та же функция, что пишет зачёт)', () => {
    let s = initBlitz(['a', 'b', 'c'], 60)
    s = answerCorrect(resumeAfterCheck(pauseForCheck(showQuestion(s, 'q1', 0), 100, 'ok', 'Осло'), 200), 200)
    s = finishNoQuestions(s)
    const v = blitzSceneView(input(s))
    expect(v.state).toBe('complete')
    const rows = blitzResults(toResults(s), 10)
    rows.forEach(r => expect(v.results?.get(r.teamId)).toMatchObject({ points: r.points, place: r.place, score: r.score }))
  })

  it('блиц: удалённая из игры команда пропадает с доски, как у BlitzBoard', () => {
    const s = initBlitz(['a', 'x', 'b'], 60)
    expect(blitzSceneView(input(s)).teams.map(t => t.id)).toEqual(['a', 'b'])
  })

  it('три попытки: фазы, «попытки исчерпаны», смена картинок и баллы фаз', () => {
    expect(revealSceneState(1, true, 12)).toBe('p1')
    expect(revealSceneState(1, true, 0)).toBe('p1')
    expect(revealSceneState(3, true, 0)).toBe('over')
    expect(revealSceneState(3, false, 0)).toBe('p3')
    expect(revealSceneState('review', false, 0)).toBe('review')
    expect(revealFrames(4, 2)).toEqual({ shown: [2], prev: [0, 1], still: false })
    expect(revealFrames(4, 3)).toEqual({ shown: [3], prev: [2], still: false })
    expect(revealFrames(2, 2)).toEqual({ shown: [0, 1], prev: [], still: true })
    expect(revealFrames(3, 3)).toEqual({ shown: [2], prev: [], still: true })
    expect(revealFrames(4, 'review').shown).toEqual([0, 1, 2, 3])
    expect(revealPhases({}, false).map(p => [p.sec, p.pts])).toEqual([[30, '2'], [20, '1'], [10, '0,5']])
    expect(revealPhases({}, true, { phase: 2, sec: 10 })[1].sec).toBe(10)
  })
})
