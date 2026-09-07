-- ═══════════════════════════════════════════════════════════════
-- QUIZ PARTY · Миграция 0011: свести расхождение схемы, найденное
-- при переносе на self-hosted Supabase (issue #5)
-- Запуск: Supabase Dashboard → SQL Editor → вставить целиком → Run
--
-- Зачем: пока накатывали миграции 0001–0010 на self-host, свежая база
-- вышла ЧИЩЕ облачной — часть правок в облаке когда-то делалась прямо
-- в SQL Editor, без коммита файла миграции в этот каталог. На self-host
-- этих правок не было, из-за чего сразу нашлись расхождения: колонка,
-- которой быть должна, но её нет; таблицы `blitz_state` не было вовсе.
-- Каждый пункт ниже сверен с живым облаком (`information_schema`/
-- `pg_policies`) — это не гипотеза, а то, что там реально есть.
--
-- На self-host эти правки уже применены вручную при переносе; здесь —
-- чтобы то же самое случилось и на облаке при следующем `db reset`/
-- переносе кем-то ещё, и чтобы файл описывал схему целиком, а не
-- только «официальную» её часть.
-- ═══════════════════════════════════════════════════════════════

-- Отметка «вопрос отыгран» — ставится при показе, переживает обрыв игры
-- (см. lib/editorApi.ts:markPlayed).
alter table public.pack_questions add column if not exists played_at timestamptz;
create index if not exists pack_questions_played_idx
  on public.pack_questions (round_id, played_at);

-- Состояние раунда «100 вопросов» — одной строкой на игру+раунд
-- (см. lib/blitzApi.ts). Таблицы не было в миграциях вообще.
create table if not exists public.blitz_state (
  game_id uuid not null,
  round_number integer not null,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (game_id, round_number)
);
alter table public.blitz_state enable row level security;
drop policy if exists blitz_ins on public.blitz_state;
create policy blitz_ins on public.blitz_state for insert with check (true);
drop policy if exists blitz_read on public.blitz_state;
create policy blitz_read on public.blitz_state for select using (true);
drop policy if exists blitz_upd on public.blitz_state;
create policy blitz_upd on public.blitz_state for update using (true) with check (true);

-- Рандомайзер команд и открытые плитки «Своей игры» — состояние комнаты.
alter table public.game_sessions add column if not exists random_groups jsonb not null default '[]'::jsonb;
alter table public.game_sessions add column if not exists jeopardy_opened jsonb not null default '[]'::jsonb;

-- Оценки вопроса командами: привязка к конкретной игре/раунду и
-- текстовый комментарий (форма оценки в PlayerPage.tsx), плюс сама
-- оценка стала необязательной (можно оставить только комментарий).
alter table public.question_ratings add column if not exists game_id uuid;
alter table public.question_ratings add column if not exists round_number integer;
alter table public.question_ratings add column if not exists comment text;
alter table public.question_ratings add column if not exists updated_at timestamptz default now();
create index if not exists question_ratings_game_idx
  on public.question_ratings (game_id, round_number);
alter table public.question_ratings drop constraint if exists question_ratings_rating_check;
alter table public.question_ratings add constraint question_ratings_rating_check
  check (rating is null or (rating >= 1 and rating <= 10));
alter table public.question_ratings alter column rating drop not null;
