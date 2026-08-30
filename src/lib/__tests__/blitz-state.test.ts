import { describe, it, expect } from 'vitest'
import {
  initBlitz, showQuestion, answerCorrect, answerWrong, skip,
  pauseForCheck, resumeAfterCheck, liveLeft, currentTeam, toResults,
  finishNoQuestions, pickNext, remainingCount, GRACE_MS, MAX_ATTEMPTS,
} from '../blitzState'
import { blitzResults } from '../blitz'
import { blockLayout } from '../../pages/rounds/BlitzRound'

// Механика блица держится на времени, а время в тестах должно быть
// управляемым — поэтому «сейчас» передаётся аргументом, а не берётся из
// Date.now(). Иначе тесты были бы плавающими.

const T = ['a', 'b', 'c']
const start = () => initBlitz(T, 60)

describe('блиц: ход и очередь', () => {
  it('первой ходит команда из головы порядка', () => {
    expect(currentTeam(start())).toBe('a')
  })

  it('после верного ответа ход переходит следующей по кругу', () => {
    let s = start()
    s = showQuestion(s, 'q1', 0)
    s = answerCorrect(s, 5000)
    expect(currentTeam(s)).toBe('b')
    expect(s.correct.a).toBe(1)
  })

  it('круг замыкается: после последней снова первая', () => {
    let s = start()
    for (const q of ['q1', 'q2', 'q3']) {
      s = showQuestion(s, q, 0)
      s = answerCorrect(s, 3000)
    }
    expect(currentTeam(s)).toBe('a')
  })
})

describe('блиц: вопросы сгорают', () => {
  it('вопрос помечается сгоревшим В МОМЕНТ ПОКАЗА', () => {
    const s = showQuestion(start(), 'q1', 0)
    expect(s.used).toContain('q1')
  })

  it('скип не возвращает вопрос в банк', () => {
    let s = showQuestion(start(), 'q1', 0)
    s = skip(s, 4000)
    expect(s.used).toEqual(['q1'])
    expect(s.missed.a).toBe(1)
  })
})

describe('блиц: попытки', () => {
  it('две ошибки оставляют команду на том же вопросе', () => {
    let s = showQuestion(start(), 'q1', 0)
    s = answerWrong(s, 3000)
    s = answerWrong(s, 4000)
    expect(currentTeam(s)).toBe('a')
    expect(s.current?.attempts).toBe(MAX_ATTEMPTS - 1)
    expect(s.missed.a ?? 0).toBe(0)
  })

  it('третья ошибка — минус очко и ход дальше', () => {
    let s = showQuestion(start(), 'q1', 0)
    for (let i = 0; i < MAX_ATTEMPTS; i++) s = answerWrong(s, 3000 + i * 100)
    expect(s.missed.a).toBe(1)
    expect(currentTeam(s)).toBe('b')
  })
})

describe('блиц: время', () => {
  it('первые 2 секунды не тикают', () => {
    const s = showQuestion(start(), 'q1', 0)
    expect(liveLeft(s, 'a', GRACE_MS)).toBe(60_000)
    expect(liveLeft(s, 'a', GRACE_MS + 1000)).toBe(59_000)
  })

  it('время идёт ТОЛЬКО у команды, чей ход', () => {
    const s = showQuestion(start(), 'q1', 0)
    expect(liveLeft(s, 'b', 30_000)).toBe(60_000)
  })

  it('проверка ответа время не съедает', () => {
    let s = showQuestion(start(), 'q1', 0)
    s = pauseForCheck(s, GRACE_MS + 5000)       // потрачено 5 сек
    s = resumeAfterCheck(s, GRACE_MS + 12_000)  // проверяли 7 сек
    expect(liveLeft(s, 'a', GRACE_MS + 12_000)).toBe(55_000)
  })

  it('передача хода не отнимает время у следующей команды', () => {
    let s = start()
    s = showQuestion(s, 'q1', 0)
    s = answerCorrect(s, GRACE_MS + 10_000)
    expect(s.left.a).toBe(50_000)
    expect(s.left.b).toBe(60_000)
  })
})

describe('блиц: конец раунда', () => {
  it('время вышло — раунд закрыт, штраф у этой команды', () => {
    let s = initBlitz(T, 10)
    s = showQuestion(s, 'q1', 0)
    s = answerCorrect(s, GRACE_MS + 15_000)     // потратила больше, чем было
    expect(s.finished).toBe(true)
    expect(s.timedOutTeam).toBe('a')
  })

  it('открытый вопрос доигрывается: ответ засчитан, хотя время вышло', () => {
    let s = initBlitz(T, 10)
    s = showQuestion(s, 'q1', 0)
    s = answerCorrect(s, GRACE_MS + 30_000)
    expect(s.correct.a).toBe(1)                 // +1 очко всё равно получено
    expect(s.finished).toBe(true)
  })

  it('вопросы кончились — штрафа нет ни у кого', () => {
    const s = finishNoQuestions(showQuestion(start(), 'q1', 0))
    expect(s.finished).toBe(true)
    expect(s.timedOutTeam).toBeUndefined()
  })

  it('итог сходится с расчётом баллов', () => {
    let s = initBlitz(['a', 'b'], 10)
    s = showQuestion(s, 'q1', 0)
    s = answerCorrect(s, 3000)                  // a: +1
    s = showQuestion(s, 'q2', 0)
    s = skip(s, 3000)                           // b: −1
    const rows = blitzResults(toResults(s), 10)
    expect(rows.find(r => r.teamId === 'a')!.raw).toBe(1)
    expect(rows.find(r => r.teamId === 'b')!.raw).toBe(-1)
    expect(rows.find(r => r.teamId === 'a')!.score).toBe(10)
  })
})

describe('блиц: выбор вопроса из банка', () => {
  const bank = [
    { id: 'q1' }, { id: 'q2' }, { id: 'q3' },
    { id: 'q4', hidden: true },   // убран из банка навсегда
  ]

  it('скрытые вопросы не выпадают никогда', () => {
    for (const r of [0, 0.34, 0.67, 0.99]) {
      expect(pickNext(bank, [], r)!.id).not.toBe('q4')
    }
  })

  it('сгоревшие вопросы не повторяются', () => {
    const picked = pickNext(bank, ['q1', 'q2'], 0.5)
    expect(picked!.id).toBe('q3')
  })

  it('банк исчерпан — null, а не случайный повтор', () => {
    expect(pickNext(bank, ['q1', 'q2', 'q3'], 0.5)).toBeNull()
  })

  it('счётчик показывает остаток без скрытых и сгоревших', () => {
    expect(remainingCount(bank, [])).toBe(3)
    expect(remainingCount(bank, ['q1'])).toBe(2)
  })

  it('rnd = 1 не выходит за границу массива', () => {
    expect(pickNext(bank, [], 1)!.id).toBe('q3')
  })
})

describe('блиц: раскладка блоков на проекторе', () => {
  it('две команды — две колонки, без верхнего блока', () => {
    expect(blockLayout(2)).toEqual({ top: false, cols: 2 })
  })
  it('нечётное число — один блок сверху по центру', () => {
    expect(blockLayout(3).top).toBe(true)
    expect(blockLayout(5).top).toBe(true)
  })
  it('чётное число — верхнего блока нет', () => {
    expect(blockLayout(4).top).toBe(false)
    expect(blockLayout(6).top).toBe(false)
  })
  it('от семи команд колонок становится четыре', () => {
    expect(blockLayout(8).cols).toBe(4)
  })
})

describe('блиц: вердикт живёт только до применения', () => {
  it('после ошибки с оставшимися попытками вердикт снимается', () => {
    let s = showQuestion(start(), 'q1', 0)
    s = pauseForCheck(s, 3000, 'no', 'мимо')
    s = answerWrong(resumeAfterCheck(s, 8000), 8000)
    expect(s.current?.attempts).toBe(1)
    // иначе проектор навсегда показывает «НЕВЕРНО», а у ведущего вместо
    // скипа висит кнопка «исправить»
    expect(s.current?.verdict).toBeUndefined()
    // текст оставляем: по нему автопроверка отличает новый ответ
    expect(s.current?.lastAnswer).toBe('мимо')
  })

  it('пауза на проверку не съедает время команды', () => {
    let s = showQuestion(start(), 'q1', 0)
    s = pauseForCheck(s, 5000, 'no', 'мимо')          // потрачено 3 с (2 с фора)
    s = answerWrong(resumeAfterCheck(s, 15000), 15000)
    expect(liveLeft(s, 'a', 15000)).toBe(60000 - 3000)
  })
})
