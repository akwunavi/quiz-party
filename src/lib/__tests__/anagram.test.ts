import { describe, it, expect } from 'vitest'
import {
  anagramTemplate, anagramShuffle, anagramOrderValid, anagramTiles, anagramHintOrder,
  anagramMaxHints, anagramHintsOpen, anagramHintTile, emptyBoard, placeTile, clearCell,
  clearBoard, applyHints, boardText, boardComplete, isAnagramCorrect, anagramWinner,
  formatRaceTime, anagramElapsedMs, anagramAcceptedAt, anagramStartIso, hashStr, isoMicros,
  anagramQuestion, anagramFlightPlan, anagramAdvance, anagramBack, readAnagramLocal,
  persistAnagramLocal, anagramLocalKey, anagramPlayerVerdict, ANAGRAM_REVEAL_GUARD_MS,
} from '../anagram'
import type { Answer } from '../../types/quiz'

describe('anagramTemplate', () => {
  it('слова по пробелам, знаки и цифры — на месте, буквы в верхний регистр', () => {
    const t = anagramTemplate('Формула-1  2024')
    expect(t.letters.join('')).toBe('ФОРМУЛА')
    expect(t.words.length).toBe(2)
    expect(t.words[0].map(c => c.kind === 'fixed' ? c.ch : '_').join('')).toBe('_______-1')
    expect(t.words[1].every(c => c.kind === 'fixed')).toBe(true)
  })
  it('Ё остаётся Ё (показывается как есть)', () => {
    expect(anagramTemplate('ёлка').letters).toEqual(['Ё', 'Л', 'К', 'А'])
  })
  it('индексы букв сквозные через слова', () => {
    const t = anagramTemplate('ab cd')
    const idx = t.words.flat().map(c => c.kind === 'letter' ? c.idx : -1)
    expect(idx).toEqual([0, 1, 2, 3])
  })
})

describe('anagramShuffle / anagramOrderValid', () => {
  const letters = anagramTemplate('ПРИВЕТ ТЕТЯ МОТЯ').letters
  it('валидно на 200 сидах подряд', () => {
    for (let s = 1; s <= 200; s++) {
      expect(anagramOrderValid(anagramShuffle(letters, s), letters)).toBe(true)
    }
  })
  it('детерминировано по сиду', () => {
    expect(anagramShuffle(letters, 42)).toEqual(anagramShuffle(letters, 42))
    expect(anagramShuffle(letters, 42)).not.toEqual(anagramShuffle(letters, 43))
  })
  it('сравнение по буквам, а не по индексам: обмен двух одинаковых букв — не перемешивание', () => {
    const l = ['А', 'А', 'Б']
    expect(anagramOrderValid([1, 0, 2], l)).toBe(false)
  })
  it('первая буква фразы на первом месте — невалидно (даже другая плитка с той же буквой)', () => {
    const l = ['А', 'Б', 'А', 'В']
    expect(anagramOrderValid([2, 3, 1, 0], l)).toBe(false)
    expect(anagramOrderValid([1, 0, 3, 2], l)).toBe(true)
  })
  it('не перестановка / не той длины / одна буква — невалидно', () => {
    expect(anagramOrderValid([0, 0, 1], ['А', 'Б', 'В'])).toBe(false)
    expect(anagramOrderValid([1, 0], ['А', 'Б', 'В'])).toBe(false)
    expect(anagramOrderValid([0], ['А'])).toBe(false)
  })
  it('недостижимое (все буквы одинаковы) не зацикливается, возвращает перестановку', () => {
    const o = anagramShuffle(['А', 'А', 'А'], 7)
    expect([...o].sort()).toEqual([0, 1, 2])
    expect(anagramOrderValid(o, ['А', 'А', 'А'])).toBe(false)
  })
  it('anagramTiles раскладывает буквы по плиткам', () => {
    expect(anagramTiles(['А', 'Б', 'В'], [2, 0, 1])).toEqual(['В', 'А', 'Б'])
  })
  it('anagramQuestion: битый order заменяется тождественным, а не роняет экран', () => {
    const q = anagramQuestion('кот', [0, 0])
    expect(q.order).toEqual([0, 1, 2])
  })
})

describe('подсказки', () => {
  const letters = anagramTemplate('ПРИВЕТ').letters
  it('hintOrder — перестановка 1..n-1, без первой буквы', () => {
    const h = anagramHintOrder(letters, hashStr('q1'))
    expect([...h].sort((a, b) => a - b)).toEqual([1, 2, 3, 4, 5])
    expect(h).not.toContain(0)
  })
  it('maxHints оставляет две буквы закрытыми', () => {
    expect(anagramMaxHints(6)).toBe(4)
    expect(anagramMaxHints(2)).toBe(0)
    expect(anagramMaxHints(1)).toBe(0)
  })
  const start = '2026-09-30T20:00:00.000Z'
  const t0 = Date.parse(start)
  const base = { startedAtIso: start, intervalSec: 10, timerSec: 60, maxHints: 4 }
  it('0 до старта, 0 при интервале 0', () => {
    expect(anagramHintsOpen({ ...base, startedAtIso: null, nowMs: t0 + 99999 })).toBe(0)
    expect(anagramHintsOpen({ ...base, intervalSec: 0, nowMs: t0 + 99999 })).toBe(0)
    expect(anagramHintsOpen({ ...base, nowMs: t0 + 9999 })).toBe(0)
  })
  it('по одной каждые интервал секунд', () => {
    expect(anagramHintsOpen({ ...base, nowMs: t0 + 10000 })).toBe(1)
    expect(anagramHintsOpen({ ...base, nowMs: t0 + 25000 })).toBe(2)
  })
  it('потолок maxHints', () => {
    expect(anagramHintsOpen({ ...base, timerSec: 600, nowMs: t0 + 500000 })).toBe(4)
  })
  it('подсказка открывается строго ДО конца таймера: 30 с / 10 с — максимум 2 (ревью 9.74)', () => {
    const t = { ...base, timerSec: 30, maxHints: 10 }
    expect(anagramHintsOpen({ ...t, nowMs: t0 + 29999 })).toBe(2)
    expect(anagramHintsOpen({ ...t, nowMs: t0 + 30000 })).toBe(2)
    expect(anagramHintsOpen({ ...t, nowMs: t0 + 90000 })).toBe(2)
    expect(anagramHintsOpen({ ...t, timerSec: 31, nowMs: t0 + 30000 })).toBe(3)
  })
  it('после конца таймера замирает', () => {
    const t = { ...base, timerSec: 25 }
    expect(anagramHintsOpen({ ...t, nowMs: t0 + 25000 })).toBe(2)
    expect(anagramHintsOpen({ ...t, nowMs: t0 + 60000 })).toBe(2)
  })
  it('hintTile — плитка, на которой стоит буква', () => {
    expect(anagramHintTile([2, 0, 1], 0)).toBe(1)
  })
})

describe('доска игрока', () => {
  // КОТ → плитки [Т, К, О] (order: плитка 0 = буква 2 и т.д.)
  const t = anagramTemplate('КОТ')
  const letters = t.letters
  const order = [2, 0, 1]
  it('placeTile кладёт в первую пустую не-подсказочную клетку, дубль плитки игнорирует', () => {
    let b = emptyBoard(3)
    b = placeTile(b, 1, t, [0])
    expect(b.cells).toEqual([null, 1, null])
    expect(placeTile(b, 1, t, [0])).toBe(b)
  })
  it('clearCell не сдвигает остальные и не трогает подсказку', () => {
    const b = { cells: [1, 2, 0] }
    expect(clearCell(b, 1, []).cells).toEqual([1, null, 0])
    expect(clearCell(b, 0, [0])).toBe(b)
  })
  it('clearBoard оставляет только подсказки', () => {
    expect(clearBoard({ cells: [1, 2, 0] }, [2]).cells).toEqual([null, null, 0])
  })
  it('boardText/boardComplete', () => {
    expect(boardText({ cells: [1, 2, 0] }, t, letters, order)).toBe('КОТ')
    expect(boardText({ cells: [1, null, 0] }, t, letters, order)).toBe('КТ')
    expect(boardComplete({ cells: [1, null, 0] }, t)).toBe(false)
    expect(boardComplete({ cells: [1, 2, 0] }, t)).toBe(true)
  })
  it('boardText сохраняет знаки и пробелы', () => {
    const tt = anagramTemplate('ab-1 c')
    expect(boardText({ cells: [0, 1, 2] }, tt, tt.letters, [0, 1, 2])).toBe('AB-1 C')
  })

  describe('applyHints — все случаи', () => {
    it('1) в клетке уже нужная буква — не трогаем', () => {
      const b = { cells: [null, 2, null] }            // клетка 1 = плитка 2 = 'О'
      expect(applyHints(b, letters, order, [1])).toBe(b)
    })
    it('2) пустая клетка — ставится родная плитка', () => {
      const r = applyHints(emptyBoard(3), letters, order, [1])
      expect(r.cells).toEqual([null, anagramHintTile(order, 1), null])
    })
    it('3) в клетке чужая плитка — уходит в пул, ставится нужная', () => {
      const r = applyHints({ cells: [null, 0, null] }, letters, order, [1])  // 'Т' в клетке О
      expect(r.cells).toEqual([null, 2, null])
    })
    it('4) нужная плитка стоит в другой клетке — забираем, та освобождается', () => {
      const r = applyHints({ cells: [2, null, null] }, letters, order, [1])  // 'О' в клетке К
      expect(r.cells).toEqual([null, 2, null])
    })
    it('повторяющиеся буквы: берётся любая свободная плитка с тем же символом', () => {
      // «АБА»: order [1,0,2] → плитки Б,А,А; родная для клетки 2 — плитка 2
      const tt = anagramTemplate('АБА')
      const r = applyHints({ cells: [null, null, null] }, tt.letters, [1, 0, 2], [2])
      expect(tt.letters[[1, 0, 2][r.cells[2]!]]).toBe('А')
      // родная занята в клетке 0 (там тоже А) — берём другую свободную А, клетку 0 не трогаем
      const r2 = applyHints({ cells: [2, null, null] }, tt.letters, [1, 0, 2], [2])
      expect(r2.cells).toEqual([2, null, 1])
    })
    it('идемпотентна', () => {
      const once = applyHints({ cells: [2, 0, null] }, letters, order, [1, 2])
      const twice = applyHints(once, letters, order, [1, 2])
      expect(twice).toBe(once)
      expect(boardText(once, t, letters, order)).toBe('ОТ')
    })
  })
})

describe('isAnagramCorrect', () => {
  it('ё=е, регистр и дефис не важны', () => {
    expect(isAnagramCorrect('ЕЛКА', 'Ёлка')).toBe(true)
    expect(isAnagramCorrect('формула1 2024', 'ФОРМУЛА-1 2024')).toBe(true)
  })
  it('пусто → null', () => {
    expect(isAnagramCorrect('  ', 'кот')).toBeNull()
  })
  it('перестановка двух букв — неверно (опечатки не прощаются)', () => {
    expect(isAnagramCorrect('КТО', 'КОТ')).toBe(false)
    expect(isAnagramCorrect('ПРИВЕТ ТЕТЯ МОТЯ', 'ПРИВЕТ ТЕТЯ МОТЯ')).toBe(true)
    expect(isAnagramCorrect('ПРИВЕТ ТЕТЯ МТОЯ', 'ПРИВЕТ ТЕТЯ МОТЯ')).toBe(false)
  })
})

describe('гонка', () => {
  const row = (team: string, text: string, acc: string | undefined, upd: string,
    is_correct: boolean | null = null): Answer => ({
    id: team, team_id: team, game_id: 'g', question_ref: 'q-1', round_number: 0,
    answer_text: text, stake: null, is_correct, updated_at: upd, accepted_at: acc,
  })
  it('accepted_at (сервер) приоритетнее updated_at (телефон)', () => {
    const rows = [
      row('a', 'кот', '2026-09-30T20:00:05.000Z', '2026-09-30T20:00:01.000Z'),
      row('b', 'кот', '2026-09-30T20:00:03.000Z', '2026-09-30T20:00:09.000Z'),
    ]
    expect(anagramWinner(rows, 'КОТ')).toBe('b')
  })
  it('без миграции — по updated_at', () => {
    const rows = [row('a', 'кот', undefined, '2026-09-30T20:00:05Z'), row('b', 'кот', undefined, '2026-09-30T20:00:04Z')]
    expect(anagramWinner(rows, 'КОТ')).toBe('b')
    expect(anagramAcceptedAt(rows[0])).toBe('2026-09-30T20:00:05Z')
  })
  it('микросекунды Postgres различаются', () => {
    const rows = [
      row('a', 'кот', '2026-09-30T20:00:05.123457+00:00', 'x'),
      row('b', 'кот', '2026-09-30T20:00:05.123456+00:00', 'x'),
    ]
    expect(anagramWinner(rows, 'КОТ')).toBe('b')
    expect(isoMicros('2026-09-30T20:00:05.123456+00:00') % 1000).toBe(456)
  })
  it('ничья: updated_at, затем team_id', () => {
    const acc = '2026-09-30T20:00:05.000Z'
    expect(anagramWinner([row('b', 'кот', acc, '2026-09-30T20:00:02Z'), row('a', 'кот', acc, '2026-09-30T20:00:03Z')], 'КОТ')).toBe('b')
    expect(anagramWinner([row('b', 'кот', acc, 'u'), row('a', 'кот', acc, 'u')], 'КОТ')).toBe('a')
  })
  it('ручной ✗ снимает победу, следующий забирает; ручной ✓ на неверном тексте участвует', () => {
    const rows = [
      row('a', 'кот', '2026-09-30T20:00:01Z', 'u', false),
      row('b', 'кот', '2026-09-30T20:00:02Z', 'u'),
      row('c', 'кто', '2026-09-30T20:00:03Z', 'u'),
    ]
    expect(anagramWinner(rows, 'КОТ')).toBe('b')
    rows[2] = row('c', 'кто', '2026-09-30T20:00:00Z', 'u', true)
    expect(anagramWinner(rows, 'КОТ')).toBe('c')
  })
  it('никто не угадал → null', () => {
    expect(anagramWinner([row('a', 'кто', 'x', 'y')], 'КОТ')).toBeNull()
  })
  it('formatRaceTime', () => {
    expect(formatRaceTime(7482)).toBe('00:07.482')
    expect(formatRaceTime(61005)).toBe('01:01.005')
    expect(formatRaceTime(-1)).toBe('—')
    expect(formatRaceTime(NaN)).toBe('—')
  })
  it('elapsed и старт: серверный shown_at приоритетнее, иначе ≈ часы ведущего', () => {
    const a = row('a', 'кот', '2026-09-30T20:00:07.482Z', 'u')
    expect(anagramElapsedMs(a, '2026-09-30T20:00:00.000Z')).toBe(7482)
    expect(Number.isNaN(anagramElapsedMs(a, null))).toBe(true)
    const shown = new Map([['q-1', 'S']])
    expect(anagramStartIso(shown, '1', 'T')).toEqual({ iso: 'S', approx: false })
    expect(anagramStartIso(new Map(), '1', 'T')).toEqual({ iso: 'T', approx: true })
    expect(anagramStartIso(new Map(), '1', null)).toEqual({ iso: null, approx: false })
  })
})

describe('план перелётов (ревью 9.74)', () => {
  const M = (e: [number, number][]) => new Map(e)
  it('полёт к той же клетке не перезапускается', () => {
    expect(anagramFlightPlan(M([[3, 5]]), new Set(), M([[3, 5]]))).toEqual({ cancel: [], start: [] })
  })
  it('показ ответа посреди полёта подсказки: летящую не трогаем, остальные стартуют', () => {
    expect(anagramFlightPlan(M([[3, 5], [0, 1], [1, 0]]), new Set(), M([[3, 5]])))
      .toEqual({ cancel: [], start: [0, 1] })
  })
  it('цель исчезла (↻ повтор / смена стадии) — полёт отменяется', () => {
    expect(anagramFlightPlan(M([]), new Set(), M([[3, 5]]))).toEqual({ cancel: [3], start: [] })
  })
  it('клетка сменилась — отмена и новый старт', () => {
    expect(anagramFlightPlan(M([[3, 2]]), new Set(), M([[3, 5]]))).toEqual({ cancel: [3], start: [3] })
  })
  it('севшие не стартуют повторно', () => {
    expect(anagramFlightPlan(M([[3, 5]]), new Set([3]), M([]))).toEqual({ cancel: [], start: [] })
  })
})

describe('навигация ведущего (ревью 9.74)', () => {
  const start = '2026-09-30T20:00:00.000Z', t0 = Date.parse(start)
  const base = { reveal: false, timerStartedAt: start, index: 0, count: 3, nowMs: t0 + 10000 }
  it('без показа — сначала показ ответа (и на проекторе тоже)', () => {
    expect(anagramAdvance(base)).toEqual({ kind: 'reveal' })
  })
  it('двойной тап: таймер не пошёл или пошёл < 3 с назад — не показывать, а объяснить', () => {
    expect(anagramAdvance({ ...base, timerStartedAt: null }).kind).toBe('wait')
    expect(anagramAdvance({ ...base, nowMs: t0 + ANAGRAM_REVEAL_GUARD_MS - 1 }).kind).toBe('wait')
    expect(anagramAdvance({ ...base, nowMs: t0 + ANAGRAM_REVEAL_GUARD_MS }).kind).toBe('reveal')
  })
  it('после показа — следующий, на последнем — после раунда', () => {
    expect(anagramAdvance({ ...base, reveal: true })).toEqual({ kind: 'next', index: 1 })
    expect(anagramAdvance({ ...base, reveal: true, index: 2 })).toEqual({ kind: 'afterRound' })
    // возвращённый (показанный, без таймера) вопрос — просто дальше
    expect(anagramAdvance({ ...base, reveal: true, timerStartedAt: null })).toEqual({ kind: 'next', index: 1 })
  })
  it('назад — к ПОКАЗАННОМУ предыдущему, с первого — на заставку', () => {
    expect(anagramBack(2)).toEqual({ kind: 'shown', index: 1 })
    expect(anagramBack(0)).toEqual({ kind: 'intro' })
  })
})

describe('черновик доски на телефоне (ревью 9.74, блокер)', () => {
  it('доска вопроса N не записывается под ключ вопроса N+1', () => {
    const store = new Map<string, string>()
    const kN = anagramLocalKey('g', 'q1'), kN1 = anagramLocalKey('g', 'q2')
    const st = { ...readAnagramLocal(k => store.get(k) ?? null, kN, 3), cells: [0, 1, 2], edits: 2, sent: 'КОТ' }
    expect(persistAnagramLocal((k, v) => store.set(k, v), kN, st)).toBe(true)
    // рендер уже с новым вопросом, состояние ещё старое — запись запрещена
    expect(persistAnagramLocal((k, v) => store.set(k, v), kN1, st)).toBe(false)
    expect(store.has(kN1)).toBe(false)
    const fresh = readAnagramLocal(k => store.get(k) ?? null, kN1, 4)
    expect(fresh).toEqual({ key: kN1, cells: [null, null, null, null], edits: 0, sent: null })
    expect(readAnagramLocal(k => store.get(k) ?? null, kN, 3).edits).toBe(2)
  })
  it('ключ с префиксом qp-answers- (его чистит forgetPlayerData)', () => {
    expect(anagramLocalKey('g', 'q').startsWith('qp-answers-')).toBe(true)
  })
})

describe('вердикт на телефоне (ревью 9.74)', () => {
  const phrase = 'КОТ'
  it('из строки в базе: ручной ✗ ведущего перебивает локальное «отправлено»', () => {
    expect(anagramPlayerVerdict({ sent: 'КОТ', loaded: true, phrase, row: { answer_text: 'КОТ', is_correct: false } })).toBe('wrong')
    expect(anagramPlayerVerdict({ sent: 'КОТ', loaded: true, phrase, row: { answer_text: 'КОТ', is_correct: null } })).toBe('ok')
  })
  it('строки нет — «не дошёл», а не «✓ ВЕРНО»; пока ответы не загружены — «проверяем»', () => {
    expect(anagramPlayerVerdict({ sent: 'КОТ', loaded: true, phrase, row: undefined })).toBe('lost')
    expect(anagramPlayerVerdict({ sent: 'КОТ', loaded: false, phrase, row: undefined })).toBe('checking')
    expect(anagramPlayerVerdict({ sent: null, loaded: true, phrase, row: undefined })).toBeNull()
  })
})

