-- ═══ 0009: ВРЕМЯ ПОКАЗА ВОПРОСА + ВРЕМЯ ПЕРВОГО ОТВЕТА ═══
-- Для анализа после игры: не только процент верных, но и скорость —
-- какой вопрос «зашёл на ура», а какой команды разгадывали до последней
-- секунды. Раньше этого не было физически: answers.updated_at трогается
-- при каждой правке ответа и при оценке ведущего, начальный момент
-- отправки терялся, а «когда вопрос показали залу» вообще нигде не лежало
-- (game_sessions.timer_started_at — состояние ТЕКУЩЕГО вопроса, при
-- переходе к следующему прошлое значение теряется).

-- created_at ставится один раз при вставке строки (default применяется
-- только на insert) и дальше не трогается — в отличие от updated_at,
-- которая обновляется и при правке ответа командой, и при оценке
-- ведущего. Разница между ними — это правки, а не время реакции.
alter table answers add column if not exists created_at timestamptz not null default now();

-- Момент, когда ведущий запустил таймер вопроса (после озвучки — см.
-- CLAUDE.md п.4 «игра в баре — ручной старт»). Это и есть «вопрос показан
-- залу» для целей тайминга, а не сам факт появления вопроса на экране:
-- до старта таймера отвечать формально можно, но реально ждут именно
-- этой команды. Пишется тем же действием, что запускает сам таймер
-- (lib/gameActions.ts:startTimer), поэтому те же права, что у
-- game_sessions — только хост, вошедший через HostGate.
create table if not exists question_shown (
  game_id uuid not null,
  round_number int not null,
  question_ref text not null,
  shown_at timestamptz not null default now(),
  primary key (game_id, question_ref)
);
alter table question_shown enable row level security;
drop policy if exists qs_select on question_shown;
create policy qs_select on question_shown for select using (true);
drop policy if exists qs_write on question_shown;
create policy qs_write on question_shown for insert with check (is_editor());
drop policy if exists qs_update on question_shown;
create policy qs_update on question_shown for update using (is_editor()) with check (is_editor());
