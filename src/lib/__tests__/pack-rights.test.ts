import { describe, it, expect } from 'vitest'
import { canEditPack, whyReadOnly, isLiveNow } from '../packRights'
import type { EditorUser } from '../auth'
import type { Pack } from '../../types/quiz'

// Правило прав должно совпадать с политиками в базе (миграция 0006).
// Разъедутся — интерфейс либо прячет разрешённое, либо показывает кнопки,
// которые упрутся в отказ.

const owner: EditorUser = { id: 'u-owner', email: 'o@x', role: 'owner', display_name: 'Иван', can_edit_all: true }
const wide: EditorUser = { id: 'u-wide', email: 'w@x', role: 'editor', display_name: 'Широкий', can_edit_all: true }
const narrow: EditorUser = { id: 'u-narrow', email: 'n@x', role: 'editor', display_name: 'Свои', can_edit_all: false }

const pack = (over: Partial<Pack> = {}) =>
  ({ id: 'p', name: 'Пак', status: 'draft', theme: 'classic', is_private: false,
     created_by: 'u-narrow', created_at: '', updated_at: '', ...over }) as Pack

describe('право править пакет', () => {
  it('владельцу можно всё, включая приватные', () => {
    expect(canEditPack(owner, pack({ is_private: true, created_by: 'кто-то' }))).toBe(true)
  })

  it('редактор с can_edit_all правит любые непривтные', () => {
    expect(canEditPack(wide, pack({ created_by: 'чужой' }))).toBe(true)
  })

  it('редактор без can_edit_all правит только свои', () => {
    expect(canEditPack(narrow, pack({ created_by: 'u-narrow' }))).toBe(true)
    expect(canEditPack(narrow, pack({ created_by: 'чужой' }))).toBe(false)
  })

  it('приватный пакет закрыт для любого редактора', () => {
    expect(canEditPack(wide, pack({ is_private: true }))).toBe(false)
    expect(canEditPack(narrow, pack({ is_private: true, created_by: 'u-narrow' }))).toBe(false)
  })

  it('пакет без автора: свои права только у владельца и can_edit_all', () => {
    expect(canEditPack(narrow, pack({ created_by: null }))).toBe(false)
    expect(canEditPack(wide, pack({ created_by: null }))).toBe(true)
    expect(canEditPack(owner, pack({ created_by: null }))).toBe(true)
  })

  it('СТАТУС «ИДЁТ ИГРА» ПРАВА НЕ ОТБИРАЕТ — он залипает после игры', () => {
    expect(canEditPack(narrow, pack({ status: 'active', created_by: 'u-narrow' }))).toBe(true)
    expect(isLiveNow(pack({ status: 'active' }))).toBe(true)
    expect(isLiveNow(pack({ status: 'ready' }))).toBe(false)
  })
})

describe('объяснение вместо молчаливой блокировки', () => {
  it('когда править можно — объяснять нечего', () => {
    expect(whyReadOnly(narrow, pack({ created_by: 'u-narrow' }))).toBeNull()
  })

  it('чужой пакет — сказано, что он чужой', () => {
    expect(whyReadOnly(narrow, pack({ created_by: 'чужой' }))).toContain('другой редактор')
  })

  it('приватный — сказано про владельца', () => {
    expect(whyReadOnly(narrow, pack({ is_private: true }))).toContain('владелец')
  })
})
