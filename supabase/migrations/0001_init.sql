-- ═══════════════════════════════════════════════════════════════
-- QUIZ PARTY · Миграция 0001: базовая схема, роли, RLS
-- Запуск: Supabase Dashboard → SQL Editor → вставить целиком → Run
-- ═══════════════════════════════════════════════════════════════

-- ── Роли редакторов ─────────────────────────────────────────────
-- owner  — Иван: всё (включая удаление, статусы, запуск игры)
-- editor — правка контента, удалений нет (только hide), active-пакет не трогает
create table editor_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('owner', 'editor')),
  display_name text not null default '',
  created_at timestamptz default now()
);

-- Хелперы для RLS
create or replace function is_owner() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from editor_roles where user_id = auth.uid() and role = 'owner');
$$;

create or replace function is_editor() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from editor_roles where user_id = auth.uid());
$$;

-- ── Пакеты ──────────────────────────────────────────────────────
create table packs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  status text not null default 'draft'
    check (status in ('draft','ready','active','played','archived')),
  theme text not null default 'classic',      -- реестр тем в коде
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ── Раунды ──────────────────────────────────────────────────────
create table pack_rounds (
  id uuid primary key default gen_random_uuid(),
  pack_id uuid not null references packs(id) on delete cascade,
  position int not null,
  mechanic text not null,                     -- ключ реестра механик в коде
  title_lines jsonb not null default '[]',
  rules jsonb not null default '[]',
  rules_audio text,
  timer_seconds int not null default 60,
  settings jsonb not null default '{}',       -- настройки механики (jsonb: новые механики без миграций)
  off_scoreboard boolean not null default false,
  answers_reveal text not null default 'after_question'
    check (answers_reveal in ('after_question','after_round','never')),
  meta_line_override text,                    -- null = автогенерация
  status text not null default 'draft' check (status in ('draft','ready')),
  unique (pack_id, position)
);

-- ── Вопросы ─────────────────────────────────────────────────────
create table pack_questions (
  id uuid primary key default gen_random_uuid(),
  round_id uuid not null references pack_rounds(id) on delete cascade,
  position int not null,
  question_text text not null default '',
  media jsonb not null default '{}',   -- { question: [], voice: null, answer: [], hidden: false }
  answer jsonb not null default '{}',  -- { mode, ... } см. типы в src/types/quiz.ts
  answer_note text,
  service jsonb not null default '{}', -- word1/word2 ребусов, пометки редактора
  is_final_question boolean not null default false,
  status text not null default 'draft' check (status in ('draft','ready')),
  hidden boolean not null default false,      -- мягкое удаление
  unique (round_id, position)
);

-- ── Журнал правок ───────────────────────────────────────────────
create table edit_log (
  id bigint generated always as identity primary key,
  editor uuid not null references auth.users(id),
  entity text not null,
  entity_id uuid not null,
  action text not null check (action in ('create','update','hide','restore','duplicate','status')),
  diff jsonb,
  at timestamptz default now()
);

-- ── Игровые таблицы (перенос модели старого проекта) ────────────
create table game_state (
  id int primary key default 1 check (id = 1),  -- singleton
  game_id uuid not null default gen_random_uuid(),
  pack_id uuid references packs(id),
  phase text not null default 'lobby',
  round_number int not null default 0,
  question_index int not null default 0,
  timer_started_at timestamptz,
  reveal boolean not null default false,
  completed_rounds jsonb not null default '[]',
  updated_at timestamptz default now()
);
insert into game_state (id) values (1);

create table teams (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  color text not null default '#14b8a6',
  game_id uuid,
  last_seen_at timestamptz,                   -- heartbeat для лобби
  created_at timestamptz default now()
);

create table answers (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references teams(id) on delete cascade,
  game_id uuid not null,
  question_ref text not null,                 -- 'q-<uuid вопроса>'
  round_number int not null,
  answer_text text not null default '',
  stake numeric,
  is_correct boolean,                         -- null = не проверен; финальное слово админа
  updated_at timestamptz default now(),
  unique (team_id, question_ref)
);

create table question_ratings (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references teams(id) on delete cascade,
  question_ref text not null,
  rating int not null check (rating between 1 and 5),
  created_at timestamptz default now(),
  unique (team_id, question_ref)
);

-- ── Индексы ─────────────────────────────────────────────────────
create index on pack_rounds (pack_id, position);
create index on pack_questions (round_id, position);
create index on answers (game_id, round_number);
create index on edit_log (entity, entity_id);

-- ── updated_at триггеры ─────────────────────────────────────────
create or replace function touch_updated_at() returns trigger
language plpgsql as $$ begin new.updated_at = now(); return new; end; $$;
create trigger packs_touch before update on packs
  for each row execute function touch_updated_at();
create trigger game_state_touch before update on game_state
  for each row execute function touch_updated_at();

-- ═══ RLS ════════════════════════════════════════════════════════
alter table editor_roles   enable row level security;
alter table packs          enable row level security;
alter table pack_rounds    enable row level security;
alter table pack_questions enable row level security;
alter table edit_log       enable row level security;
alter table game_state     enable row level security;
alter table teams          enable row level security;
alter table answers        enable row level security;
alter table question_ratings enable row level security;

-- editor_roles: видит сам себя (для UI); менять — только через Dashboard/SQL
create policy roles_read on editor_roles for select using (user_id = auth.uid());

-- Контент пакетов: ЧТЕНИЕ всем (игроки анонимны, грузят вопросы),
-- запись — по ролям.
create policy packs_read  on packs for select using (true);
create policy rounds_read on pack_rounds for select using (true);
create policy quest_read  on pack_questions for select using (true);

-- owner: полный доступ
create policy packs_owner  on packs  for all using (is_owner()) with check (is_owner());
create policy rounds_owner on pack_rounds for all using (is_owner()) with check (is_owner());
create policy quest_owner  on pack_questions for all using (is_owner()) with check (is_owner());

-- editor: insert/update, БЕЗ delete; active-пакеты недоступны на запись
create policy packs_editor_ins on packs for insert
  with check (is_editor());
create policy packs_editor_upd on packs for update
  using (is_editor() and status <> 'active')
  with check (is_editor() and status <> 'active');

create policy rounds_editor_ins on pack_rounds for insert
  with check (is_editor() and exists (select 1 from packs p where p.id = pack_id and p.status <> 'active'));
create policy rounds_editor_upd on pack_rounds for update
  using (is_editor() and exists (select 1 from packs p where p.id = pack_id and p.status <> 'active'))
  with check (is_editor() and exists (select 1 from packs p where p.id = pack_id and p.status <> 'active'));

create policy quest_editor_ins on pack_questions for insert
  with check (is_editor() and exists (
    select 1 from pack_rounds r join packs p on p.id = r.pack_id
    where r.id = round_id and p.status <> 'active'));
create policy quest_editor_upd on pack_questions for update
  using (is_editor() and exists (
    select 1 from pack_rounds r join packs p on p.id = r.pack_id
    where r.id = round_id and p.status <> 'active'))
  with check (is_editor() and exists (
    select 1 from pack_rounds r join packs p on p.id = r.pack_id
    where r.id = round_id and p.status <> 'active'));

-- edit_log: пишут все редакторы, читают все редакторы
create policy log_ins  on edit_log for insert with check (is_editor());
create policy log_read on edit_log for select using (is_editor());

-- Игровые таблицы: анонимные игроки читают и пишут свои сущности
-- (модель доверия как в текущем проекте: закрытая вечеринка, анонимный ключ)
create policy gs_read  on game_state for select using (true);
create policy gs_write on game_state for update using (is_owner()) with check (is_owner());

create policy teams_read  on teams for select using (true);
create policy teams_ins   on teams for insert with check (true);
create policy teams_upd   on teams for update using (true) with check (true);
create policy teams_owner_del on teams for delete using (is_owner());

create policy ans_read  on answers for select using (true);
create policy ans_ins   on answers for insert with check (true);
create policy ans_upd   on answers for update using (true) with check (true);

create policy rate_read on question_ratings for select using (true);
create policy rate_ins  on question_ratings for insert with check (true);

-- ═══ Storage: bucket для медиа ══════════════════════════════════
insert into storage.buckets (id, name, public) values ('quiz-media', 'quiz-media', true)
on conflict (id) do nothing;

create policy media_read on storage.objects for select
  using (bucket_id = 'quiz-media');
create policy media_write on storage.objects for insert
  with check (bucket_id = 'quiz-media' and is_editor());
create policy media_update on storage.objects for update
  using (bucket_id = 'quiz-media' and is_editor());
create policy media_delete on storage.objects for delete
  using (bucket_id = 'quiz-media' and is_owner());
