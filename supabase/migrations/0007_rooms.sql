-- ═══ 0007: КОМНАТЫ — параллельные игровые сессии ═══
-- Каждый редактор гоняет свой пакет в своей комнате, не мешая остальным.
-- teams/answers уже привязаны к game_id — у каждой комнаты он свой,
-- поэтому команды и ответы изолируются автоматически.

create table if not exists game_sessions (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'Комната',
  created_by uuid default auth.uid(),
  created_at timestamptz not null default now(),
  -- игровые поля: один в один со старым game_state
  game_id uuid not null default gen_random_uuid(),
  pack_id uuid,
  phase text not null default 'lobby',
  round_number int not null default 0,
  question_index int not null default 0,
  timer_started_at timestamptz,
  reveal boolean not null default false,
  completed_rounds jsonb not null default '[]',
  melody jsonb not null default '{}'
);

alter table game_sessions enable row level security;
drop policy if exists gs2_select on game_sessions;
create policy gs2_select on game_sessions for select using (true);
drop policy if exists gs2_insert on game_sessions;
create policy gs2_insert on game_sessions for insert with check (is_editor());
drop policy if exists gs2_update on game_sessions;
create policy gs2_update on game_sessions for update
  using (is_editor()) with check (is_editor());
drop policy if exists gs2_delete on game_sessions;
create policy gs2_delete on game_sessions for delete
  using (is_owner() or created_by = auth.uid());

-- приватный пакет читается анонимно ТОЛЬКО пока он выбран в какой-то комнате
drop policy if exists packs_select on packs;
create policy packs_select on packs for select using (
  not is_private
  or is_owner()
  or id in (select pack_id from game_sessions where pack_id is not null)
);
