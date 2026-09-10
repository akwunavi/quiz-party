-- ═══════════════════════════════════════════════════════════════
-- QUIZ PARTY · Миграция 0013: история отыгрышей пакета (pack_plays)
-- Запуск: Supabase Dashboard → SQL Editor → вставить целиком → Run
--
-- Безопасная миграция — новая таблица, ничего не ломает и не сужает.
-- НЕ зависит от 0012 (RLS lockdown) и не требует его: можно прогнать
-- эту миграцию отдельно, ничем не рискуя.
--
-- Зачем: packs.last_game_id (0010) хранит только ПОСЛЕДНИЙ game_id —
-- выгрузка статистики в редакторе видела только последний вечер. Здесь
-- полная история: какие game_id вообще играли этот пакет и когда, чтобы
-- в редакторе можно было выбрать «все отыгрыши» или конкретный вечер.
-- ═══════════════════════════════════════════════════════════════

create table if not exists public.pack_plays (
  id uuid primary key default gen_random_uuid(),
  pack_id uuid not null references public.packs(id) on delete cascade,
  game_id uuid not null,
  played_at timestamptz not null default now(),
  unique (pack_id, game_id)
);
create index if not exists pack_plays_pack_idx on public.pack_plays (pack_id, played_at desc);

alter table public.pack_plays enable row level security;
drop policy if exists pack_plays_select on public.pack_plays;
create policy pack_plays_select on public.pack_plays for select using (is_editor());
drop policy if exists pack_plays_insert on public.pack_plays;
create policy pack_plays_insert on public.pack_plays for insert with check (is_editor());
drop policy if exists pack_plays_delete on public.pack_plays;
create policy pack_plays_delete on public.pack_plays for delete using (is_owner());

-- бэкфилл best-effort из существующего last_game_id — старые отыгрыши
-- до этой миграции восстановить нечем (game_id прошлых игр, если их
-- было несколько, нигде не хранился), но хотя бы последний известный
-- попадёт в историю сразу, а не только со следующей игры.
insert into public.pack_plays (pack_id, game_id, played_at)
select id, last_game_id, coalesce(updated_at, now())
from public.packs where last_game_id is not null
on conflict (pack_id, game_id) do nothing;
