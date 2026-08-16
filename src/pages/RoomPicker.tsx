// ═══ Выбор комнаты ═══
// Ведущий: список своих комнат + создание. Игрок: список активных комнат
// (или сразу нужная, если пришёл по QR с ?room=).
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { rememberRoom, roomUrl } from '../lib/room'
import { VERSION } from '../version'

interface Room { id: string; name: string; created_at: string; phase: string; created_by: string | null }

export function RoomPicker({ route, forPlayer }: { route: string; forPlayer?: boolean }) {
  const [rooms, setRooms] = useState<Room[]>([])
  const [name, setName] = useState('')
  const [busy, setBusy] = useState(false)

  const load = async () => {
    const { data } = await supabase.from('game_sessions')
      .select('id,name,created_at,phase,created_by')
      .order('created_at', { ascending: false }).limit(20)
    setRooms((data ?? []) as Room[])
  }
  useEffect(() => { void load() }, [])

  const enter = (id: string) => {
    rememberRoom(id)
    window.location.hash = roomUrl(route, id)
  }

  const create = async () => {
    setBusy(true)
    const { data, error } = await supabase.from('game_sessions')
      .insert({ name: name.trim() || 'Комната' }).select('id').single()
    setBusy(false)
    if (!error && data) enter(data.id)
  }

  const remove = async (r: Room) => {
    if (!confirm(`Удалить комнату «${r.name}»? История её команд/ответов останется в БД.`)) return
    await supabase.from('game_sessions').delete().eq('id', r.id)
    void load()
  }

  return (
    <div className="gate-screen">
      <div className="gate-card" style={{ width: 'min(460px, 94vw)' }}>
        <div className="mono-tag">{forPlayer ? 'ВЫБЕРИ ИГРУ' : `QUIZ PARTY · КОМНАТЫ · v${VERSION}`}</div>
        {!forPlayer && (
          <p className="gate-hint">Комната — это независимая игра: свой пакет, свои команды
            и счёт. Как играть: 1) создай или выбери комнату → 2) в ней выбери пакет
            (как раньше) → 3) QR в лобби сам приведёт игроков именно в неё.
            Пакет тут ни при чём: один пакет можно гонять в разных комнатах.
            Название кнопкой 🏠 в админке вернёт тебя к этому списку.</p>
        )}
        {rooms.length === 0 && <p className="gate-hint">Комнат пока нет{forPlayer ? ' — попроси ведущего создать игру' : ''}.</p>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: '46vh', overflowY: 'auto' }}>
          {rooms.map(r => (
            <div key={r.id} style={{ display: 'flex', gap: 8, alignItems: 'stretch' }}>
              <button style={{ flex: 1, textAlign: 'left' }} onClick={() => enter(r.id)}>
                {r.name}
                <span style={{ opacity: .55, fontSize: 13, marginLeft: 10 }}>
                  {new Date(r.created_at).toLocaleDateString('ru')} · {r.phase === 'lobby' ? 'лобби' : 'идёт игра'}
                </span>
              </button>
              {!forPlayer && <button style={{ flex: '0 0 auto', padding: '0 14px' }}
                title="Удалить комнату" onClick={() => void remove(r)}>🗑</button>}
            </div>
          ))}
        </div>
        {!forPlayer && (
          <div style={{ display: 'flex', gap: 8 }}>
            <input style={{ flex: 1 }} placeholder="Название новой комнаты"
              value={name} onChange={e => setName(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') void create() }} />
            <button disabled={busy} onClick={() => void create()}>+ Создать</button>
          </div>
        )}
      </div>
    </div>
  )
}
