-- ═══ 0003: ПРОВЕРКА ВОПРОСОВ ИИ ═══
-- Две таблицы:
--   ai_reviews   — последний разбор вопроса или раунда (чтобы не гонять ИИ
--                  повторно на каждый открытый вопрос и не жечь токены);
--   ai_feedback  — решения редактора по замечаниям. Именно они подмешиваются
--                  в следующий запрос как калибровка: модель между вызовами
--                  ничего не помнит, память живёт здесь.
--
-- Применить в SQL-редакторе Supabase.

create table if not exists ai_reviews (
  id uuid primary key default gen_random_uuid(),
  target_kind text not null check (target_kind in ('question', 'round')),
  target_id uuid not null,
  result jsonb not null,
  model text,
  created_at timestamptz not null default now(),
  unique (target_kind, target_id)
);

create table if not exists ai_feedback (
  id uuid primary key default gen_random_uuid(),
  question_id uuid references pack_questions(id) on delete cascade,
  issue_kind text,
  issue_text text not null,
  accepted boolean not null,          -- true — редактор согласился и правил
  created_at timestamptz not null default now()
);

create index if not exists ai_feedback_recent on ai_feedback (created_at desc);

alter table ai_reviews enable row level security;
alter table ai_feedback enable row level security;

-- доступ как у остального редактора: только авторизованным
create policy "ai_reviews rw" on ai_reviews
  for all to authenticated using (true) with check (true);
create policy "ai_feedback rw" on ai_feedback
  for all to authenticated using (true) with check (true);
