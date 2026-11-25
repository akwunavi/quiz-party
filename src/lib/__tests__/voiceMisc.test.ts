import { describe, it, expect } from 'vitest'
import { StallTracker, MIN_STALL_MS } from '../audioStall'
import { collectVoicePaths } from '../voicePaths'
import { voiceChip, voiceSig, voiceStateOf, mayWriteVoice, VOICE_FRESH_MS } from '../voiceStatus'

function tracker() {
  const log = { confirms: 0, maxMs: 0 }
  const t = new StallTracker({ confirm: () => { log.confirms++ }, grow: ms => { log.maxMs = Math.max(log.maxMs, ms) } })
  return { t, log }
}

describe('StallTracker: остановки звука', () => {
  it('ожидание ДО первого playing — не остановка', () => {
    const { t, log } = tracker()
    t.event('waiting', 0); t.tick(5000)
    expect(log.confirms).toBe(0)
  })

  it('остановка в 15 с: один эпизод, максимум 15 с, закрывается по playing', () => {
    const { t, log } = tracker()
    t.event('playing', 0)
    t.event('waiting', 1000)
    t.event('stalled', 1200)                      // второе событие того же эпизода не плодит счёт
    t.tick(1500)
    t.tick(16000)
    t.event('playing', 16000)
    expect(log.confirms).toBe(1)
    expect(log.maxMs).toBe(15000)
    expect(t.open).toBe(false)
  })

  it('мелкое подвисание короче порога не считается', () => {
    const { t, log } = tracker()
    t.event('playing', 0)
    t.event('waiting', 1000)
    t.event('playing', 1000 + MIN_STALL_MS - 1)
    expect(log.confirms).toBe(0)
  })

  it('две остановки — два эпизода; пауза/конец закрывают открытый', () => {
    const { t, log } = tracker()
    t.event('playing', 0)
    t.event('waiting', 100); t.tick(2000); t.event('playing', 2000)
    t.event('waiting', 3000); t.tick(4000); t.event('ended', 4000)
    expect(log.confirms).toBe(2)
    expect(t.open).toBe(false)
  })
})

describe('collectVoicePaths', () => {
  const q = (voice?: string, extra: Record<string, unknown> = {}) => ({ media: { voice, ...extra } })
  const pack = {
    rounds: [
      { rules_audio: 'r0.mp3', questions: [q('a0.mp3'), q('a1.mp3', { answer: ['ans1.mp3', 'pic.png'] })] },
      { rules_audio: 'r1.mp3', questions: [q('b0.mp3', { question: ['song.mp3', 'v.mp4'] }), { hidden: true, media: { voice: 'hid.mp3' } }] },
      { rules_audio: null, questions: [q('c0.mp3')] },
    ],
  }

  it('до первого вопроса: правила раунда, его вопросы, затем следующие раунды', () => {
    expect(collectVoicePaths(pack, 0, 0)).toEqual(
      ['r0.mp3', 'a0.mp3', 'a1.mp3', 'ans1.mp3', 'r1.mp3', 'b0.mp3', 'song.mp3', 'c0.mp3'])
  })

  it('картинки, видео и скрытые вопросы не берутся', () => {
    const all = collectVoicePaths(pack, 0, 0)
    expect(all).not.toContain('pic.png'); expect(all).not.toContain('v.mp4'); expect(all).not.toContain('hid.mp3')
  })

  it('с середины раунда: остаток раунда, дальше раунды, пройденное — в хвосте, без повторов', () => {
    expect(collectVoicePaths(pack, 1, 0)).toEqual(
      ['r1.mp3', 'b0.mp3', 'song.mp3', 'c0.mp3', 'r0.mp3', 'a0.mp3', 'a1.mp3', 'ans1.mp3'])
    const mid = collectVoicePaths(pack, 0, 1)
    expect(mid.slice(0, 2)).toEqual(['a1.mp3', 'ans1.mp3'])
    expect(mid.slice(-2)).toEqual(['r0.mp3', 'a0.mp3'])
    expect(new Set(mid).size).toBe(mid.length)
  })

  it('у пака нет озвучек — пустой список', () => {
    expect(collectVoicePaths({ rounds: [{ rules_audio: null, questions: [q()] }] }, 0, 0)).toEqual([])
  })
})

describe('статус озвучек для пульта', () => {
  it('состояние по счётчикам', () => {
    expect(voiceStateOf(3, 0, 10)).toBe('loading')
    expect(voiceStateOf(10, 0, 10)).toBe('ready')
    expect(voiceStateOf(8, 2, 10)).toBe('error')
    expect(voiceStateOf(5, 2, 10)).toBe('loading')      // ещё качается — не ошибка
  })

  it('строка: нет озвучек — null; идёт, готово, ошибка с «повторить»', () => {
    expect(voiceChip(undefined)).toBeNull()
    expect(voiceChip({ state: 'ready', done: 0, failed: 0, total: 0 })).toBeNull()
    expect(voiceChip({ state: 'loading', done: 3, failed: 0, total: 12 }))
      .toMatchObject({ cls: 'wait', text: '⏳ Озвучка: загружено 3 из 12', retry: false })
    expect(voiceChip({ state: 'ready', done: 12, failed: 0, total: 12 }))
      .toMatchObject({ cls: 'ok', text: '✓ Озвучка: всё загружено (12 из 12)' })
    expect(voiceChip({ state: 'error', done: 10, failed: 2, total: 12 }))
      .toMatchObject({ cls: 'bad', retry: true })
  })

  it('про остановки — только если были', () => {
    expect(voiceChip({ state: 'ready', done: 1, failed: 0, total: 1 })!.stallText).toBeNull()
    expect(voiceChip({ state: 'ready', done: 1, failed: 0, total: 1, stalls: 2, maxStallSec: 14.8 })!.stallText)
      .toBe('были остановки звука: 2 (макс. 14,8 с)')
  })

  it('подпись меняется со счётчиком и не зависит от служебных полей', () => {
    const a = { state: 'loading' as const, done: 1, failed: 0, total: 5 }
    expect(voiceSig(a)).toBe(voiceSig({ ...a, by: 'x', at: 'y', retry: 3 }))
    expect(voiceSig(a)).not.toBe(voiceSig({ ...a, done: 2 }))
    expect(voiceSig(a)).not.toBe(voiceSig({ ...a, stalls: 1, maxStallSec: 3 }))
  })

  it('чужая свежая запись не перебивается, протухшая — да', () => {
    const now = Date.parse('2026-11-25T20:00:30Z')
    const other = { state: 'loading' as const, done: 1, failed: 0, total: 5, by: 'other', at: '2026-11-25T20:00:20Z' }
    expect(mayWriteVoice(other, 'me', now)).toBe(false)
    expect(mayWriteVoice({ ...other, at: new Date(now - VOICE_FRESH_MS - 1).toISOString() }, 'me', now)).toBe(true)
    expect(mayWriteVoice({ ...other, by: 'me' }, 'me', now)).toBe(true)
    expect(mayWriteVoice(undefined, 'me', now)).toBe(true)
  })
})
