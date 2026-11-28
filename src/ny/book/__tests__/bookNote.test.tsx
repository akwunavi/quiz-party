// ═══ «Книга»: пояснение к ответу — разметка единого вида (10.76) ═══
// Вёрстку (кегль, отступы, отсутствие зелёной полосы) юнит-тест не проверяет — это делает e2e/book/note-check.cjs на настоящем CSS.
// Здесь — только каркас: подпись, разделитель с ромбиком, область подгона, и что текст лежит в отдельной области подгона, а не прямо в блоке.
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'
import { BookNote, BookNoteStatic } from '../BookNote'

const html = (el: React.ReactElement) => {
  const err = vi.spyOn(console, 'error').mockImplementation(() => {})   // useLayoutEffect на сервере — предупреждение React, не ошибка разметки
  try { return renderToStaticMarkup(el) } finally { err.mockRestore() }
}

describe('BookNote', () => {
  it('подпись «ПОЯСНЕНИЕ», разделитель с ромбиком и текст — в отдельной области подгона', () => {
    const h = html(<BookNote text="Снеговик, Оливье, Огород, Оранжевый" className="n-m" />)
    expect(h).toContain('class="bk-note-label">ПОЯСНЕНИЕ<')
    expect(h).toMatch(/class="bk-note-rule bk-rt-rule"[^>]*><i><\/i><b>❖<\/b><i><\/i>/)
    expect(h).toMatch(/class="bk-note-fit"><p class="answer-note bk-note n-m">Снеговик, Оливье, Огород, Оранжевый<\/p>/)
  })
  it('статичный вариант («Скрэмбл») — ступень кегля по длине текста', () => {
    expect(html(<BookNoteStatic text={'а'.repeat(100)} />)).toContain('class="bk-note-box is-static"')
    expect(html(<BookNoteStatic text={'а'.repeat(200)} />)).toContain('is-static is-s')
    expect(html(<BookNoteStatic text={'а'.repeat(300)} />)).toContain('is-static is-xs')
  })
})
