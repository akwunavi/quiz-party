-- ═══ 0005: RLS — серверная защита ═══
-- Правила игры:
--   АНОНИМЫ (игроки, зрители): читают контент, пишут только ответы/команды/рейтинги.
--   ХОСТ/РЕДАКТОРЫ (вход по логину, editor_roles): управляют игрой и контентом.
--   ПРИВАТНЫЕ ПАКЕТЫ: видят и правят только владельцы; исключение — пакет,
--   который прямо сейчас играется (game_state.pack_id): его читают все,
--   иначе проектор и телефоны не смогут отрисовать игру.
-- Откат при ЧП (вернуть как было): alter table X disable row level security;

alter table editor_roles    enable row level security;
alter table packs           enable row level security;
alter table pack_rounds     enable row level security;
alter table pack_questions  enable row level security;
alter table edit_log        enable row level security;
alter table game_state      enable row level security;
alter table teams           enable row level security;
alter table answers         enable row level security;
alter table question_ratings enable row level security;

-- editor_roles: каждый видит только свою строку (нужно для входа)
drop policy if exists er_select on editor_roles;
create policy er_select on editor_roles for select
  using (user_id = auth.uid());

-- packs
drop policy if exists packs_select on packs;
create policy packs_select on packs for select using (
  not is_private
  or is_owner()
  or id = (select pack_id from game_state where id = 1)
);
drop policy if exists packs_insert on packs;
create policy packs_insert on packs for insert with check (is_editor());
drop policy if exists packs_update on packs;
create policy packs_update on packs for update
  using (is_editor() and (not is_private or is_owner()))
  with check (is_editor());
drop policy if exists packs_delete on packs;
create policy packs_delete on packs for delete
  using (is_editor() and (not is_private or is_owner()));

-- pack_rounds / pack_questions: видимость наследуется от пакета
-- (подзапрос к packs сам проходит через RLS packs)
drop policy if exists rounds_select on pack_rounds;
create policy rounds_select on pack_rounds for select
  using (exists (select 1 from packs where packs.id = pack_id));
drop policy if exists rounds_write on pack_rounds;
create policy rounds_write on pack_rounds for all
  using (is_editor() and exists (select 1 from packs
    where packs.id = pack_id and (not is_private or is_owner())))
  with check (is_editor());

drop policy if exists questions_select on pack_questions;
create policy questions_select on pack_questions for select
  using (exists (select 1 from pack_rounds where pack_rounds.id = round_id));
drop policy if exists questions_write on pack_questions;
create policy questions_write on pack_questions for all
  using (is_editor() and exists (
    select 1 from pack_rounds r join packs p on p.id = r.pack_id
    where r.id = round_id and (not p.is_private or is_owner())))
  with check (is_editor());

-- edit_log: только редакторы
drop policy if exists editlog_all on edit_log;
create policy editlog_all on edit_log for all
  using (is_editor()) with check (is_editor());

-- game_state: читают все (полинг телефонов), управляет только хост
drop policy if exists gs_select on game_state;
create policy gs_select on game_state for select using (true);
drop policy if exists gs_update on game_state;
create policy gs_update on game_state for update
  using (is_editor()) with check (is_editor());

-- teams: игроки создают/обновляют свободно (у них нет аккаунтов),
-- удалять может только хост
drop policy if exists teams_select on teams;
create policy teams_select on teams for select using (true);
drop policy if exists teams_insert on teams;
create policy teams_insert on teams for insert with check (true);
drop policy if exists teams_update on teams;
create policy teams_update on teams for update using (true) with check (true);
drop policy if exists teams_delete on teams;
create policy teams_delete on teams for delete using (is_editor());

-- answers: телефоны шлют и правят ответы без аккаунтов; чистка — хосту
drop policy if exists answers_select on answers;
create policy answers_select on answers for select using (true);
drop policy if exists answers_insert on answers;
create policy answers_insert on answers for insert with check (true);
drop policy if exists answers_update on answers;
create policy answers_update on answers for update using (true) with check (true);
drop policy if exists answers_delete on answers;
create policy answers_delete on answers for delete using (is_editor());

-- question_ratings: звёзды ставят все
drop policy if exists qr_select on question_ratings;
create policy qr_select on question_ratings for select using (true);
drop policy if exists qr_insert on question_ratings;
create policy qr_insert on question_ratings for insert with check (true);

-- storage: медиа читают все (проектор/телефоны), загружают редакторы
drop policy if exists media_read on storage.objects;
create policy media_read on storage.objects for select
  using (bucket_id = 'quiz-media');
drop policy if exists media_write on storage.objects;
create policy media_write on storage.objects for insert
  with check (bucket_id = 'quiz-media' and is_editor());
drop policy if exists media_update on storage.objects;
create policy media_update on storage.objects for update
  using (bucket_id = 'quiz-media' and is_editor());
drop policy if exists media_delete on storage.objects;
create policy media_delete on storage.objects for delete
  using (bucket_id = 'quiz-media' and is_editor());
