-- ═══════════════════════════════════════════════════════════════
-- QUIZ PARTY · Миграция 0012: RLS lockdown — снос теневых политик
-- Запуск: Supabase Dashboard → SQL Editor → вставить целиком → Run
--
-- ПЕРЕД ЗАПУСКОМ на self-host: сначала сверь реальный состав политик —
--   select tablename, policyname, roles, cmd, qual, with_check
--   from pg_policies where schemaname='public' order by 1,2;
-- Список ниже сверен со снимком ОБЛАЧНОГО проекта 10.09.2026. Self-host
-- мигрировался через pg_dump/psql, скорее всего идентичен — но не
-- гарантированно, и если там найдётся политика, которой нет в списке —
-- дропни её тоже тем же способом (drop policy if exists), прежде чем
-- считать лок завершённым.
--
-- Зачем: миграции 0001 → 0005/0006/0007/0009 переименовывали политики
-- (packs_read → packs_select и т.д.), но `drop policy if exists` в новых
-- файлах называл НОВОЕ имя, а не старое — поэтому политика 0001 год
-- ГОДАМИ жила рядом со своей заменой и складывалась с ней по ИЛИ.
-- Postgres разрешает доступ, если хоть ОДНА permissive-политика говорит
-- true — значит все более строгие политики рядом были декоративными.
--
-- Конкретные находки на живой базе (не гипотеза — снято pg_policies):
--   • packs_anon_status (UPDATE, роль public, qual=true, with_check=true) —
--     ЛЮБОЙ анонимный гость мог поменять ЛЮБУЮ колонку ЛЮБОГО пакета,
--     включая status/is_private/created_by. Не было ни в одном файле
--     миграций — заведена когда-то прямо в SQL Editor.
--   • teams_delete (DELETE, роль public, qual=true) — отдельно от
--     teams_owner_del (is_owner()) — любой гость мог удалить любую
--     команду. Тоже не в файлах миграций.
--   • quest_read/questions_select, packs_read/packs_editor_upd,
--     rounds_read/rounds_select — тривиальные select true / «родитель
--     существует» рядом с верно построенными политиками приватности.
--   • question_ratings: DELETE вообще без политики — ratings.ts реально
--     делает delete() при удалении комментария к раунду, RLS его молча
--     блокировал, код не проверял ошибку (см. правку lib/ratings.ts).
--   • ai_reviews/ai_feedback: `to authenticated using(true)` вместо
--     is_editor() — не анонимная дыра (нужен хоть какой-то auth-аккаунт,
--     а в системе других authenticated, кроме редакторов, нет), но для
--     единообразия сведено к is_editor().
--   • edit_log: log_ins/log_read дублируют editlog_all — функционально
--     одинаковые, оставлен только editlog_all.
--
-- ОТКАТ (если что-то сломалось прямо перед игрой — вставить и запустить,
-- это за минуту возвращает разрешающий режим как было до этой миграции):
--
--   drop policy if exists packs_select on packs;
--   create policy packs_select on packs for select using (true);
--   drop policy if exists packs_editor_upd on packs;
--   create policy packs_editor_upd on packs for update using (true) with check (true);
--   drop policy if exists rounds_select on pack_rounds;
--   create policy rounds_select on pack_rounds for select using (true);
--   drop policy if exists questions_select on pack_questions;
--   create policy questions_select on pack_questions for select using (true);
--   drop policy if exists teams_delete on teams;
--   create policy teams_delete on teams for delete using (true);
--   drop policy if exists qr_delete on question_ratings;
--   create policy qr_delete on question_ratings for delete using (true);
--   drop policy if exists ai_reviews_rw on ai_reviews;
--   create policy ai_reviews_rw on ai_reviews for all to authenticated using (true) with check (true);
--   drop policy if exists ai_feedback_rw on ai_feedback;
--   create policy ai_feedback_rw on ai_feedback for all to authenticated using (true) with check (true);
--   drop trigger if exists answers_lock_is_correct on answers;
--   -- storage-блок в конце файла откатывается своим отдельным SQL там же.
--
-- ═══════════════════════════════════════════════════════════════

-- ── packs ──────────────────────────────────────────────────────
-- Теневая дыра — самая серьёзная находка: анонимный UPDATE без условий.
drop policy if exists packs_anon_status on packs;
-- Старая политика 0001, замена — packs_select (0005/0007).
drop policy if exists packs_read on packs;
-- editor_upd (0001) не проверяла приватность и дублирует packs_update
-- (0006, которая уже учитывает is_private/can_edit_all/created_by).
drop policy if exists packs_editor_upd on packs;
-- editor_ins (0001) дублирует packs_insert (0005).
drop policy if exists packs_editor_ins on packs;
-- owner-политика 0001 (for all) — избыточна рядом с select/insert/
-- update/delete 0005/0006, но не дыра сама по себе; сводим для
-- детерминированности состава (is_owner() и так покрыт условиями выше).
drop policy if exists packs_owner on packs;
-- пересоздаём select для детерминированности (условие не меняется —
-- то же самое, что уже верно стояло в 0007)
drop policy if exists packs_select on packs;
create policy packs_select on packs for select using (
  (not is_private or is_owner())
  or id in (select pack_id from game_sessions where pack_id is not null)
);

-- ── pack_rounds ────────────────────────────────────────────────
-- Старая read-true (0001) рядом с тривиальной select 0005 («родитель
-- существует», не проверяет приватность вообще) — обе дыра.
drop policy if exists rounds_read on pack_rounds;
drop policy if exists rounds_owner on pack_rounds;
drop policy if exists rounds_editor_ins on pack_rounds;
drop policy if exists rounds_editor_upd on pack_rounds;
drop policy if exists rounds_select on pack_rounds;
create policy rounds_select on pack_rounds for select using (
  exists (
    select 1 from packs p where p.id = pack_id
      and ((not p.is_private or is_owner())
        or p.id in (select pack_id from game_sessions where pack_id is not null))
  )
);
-- rounds_write (0006) уже верно построена — не трогаем.

-- ── pack_questions ─────────────────────────────────────────────
drop policy if exists quest_read on pack_questions;
drop policy if exists quest_owner on pack_questions;
drop policy if exists quest_editor_ins on pack_questions;
drop policy if exists quest_editor_upd on pack_questions;
drop policy if exists questions_select on pack_questions;
create policy questions_select on pack_questions for select using (
  exists (
    select 1 from pack_rounds r join packs p on p.id = r.pack_id
    where r.id = round_id
      and ((not p.is_private or is_owner())
        or p.id in (select pack_id from game_sessions where pack_id is not null))
  )
);
-- questions_write (0006) уже верно построена — не трогаем.

-- ── edit_log ───────────────────────────────────────────────────
drop policy if exists log_ins on edit_log;
drop policy if exists log_read on edit_log;
-- editlog_all (0005, is_editor() для всех команд) остаётся единственной.

-- ── game_state (легаси, приложение читает/пишет game_sessions,
--   game_state не используется — grep по src/ подтверждает) ──────
-- Снимаем permissive-дубль; полного доступа is_owner() из 0001 (gs_write
-- не переопределялась 0005 под тем же именем — переименована в gs_update)
-- достаточно, раз таблица мертва. Не трогаем дальше — не приоритет,
-- см. HANDOFF §7.
drop policy if exists gs_write on game_state;
drop policy if exists gs_read on game_state;
-- gs_update (0005, is_editor()) и gs_select (0005, true) остаются.

-- ── teams ──────────────────────────────────────────────────────
-- Теневая дыра: анонимный DELETE без условий, рядом с строгой
-- teams_owner_del. Убираем дыру, оставляем ОБЕ строгие политики — они не
-- противоречат друг другу (is_editor() шире is_owner(), но обе честные).
drop policy if exists teams_delete on teams;
drop policy if exists teams_read on teams;
drop policy if exists teams_ins on teams;
drop policy if exists teams_upd on teams;
create policy teams_delete on teams for delete using (is_editor());
-- teams_select/teams_insert/teams_update (0005, true — by design: анонимные
-- игроки без аккаунтов) и teams_owner_del (0005, is_owner()) остаются.

-- ── answers ────────────────────────────────────────────────────
drop policy if exists ans_read on answers;
drop policy if exists ans_ins on answers;
drop policy if exists ans_upd on answers;
-- answers_select/insert/update (0005, true — by design) и answers_delete
-- (0005, is_editor()) остаются как единственные.

-- Игрок мог сам проставить себе is_correct через answers_update (true).
-- Вместо ужесточения самого update (сломало бы правку своего текста
-- ответа) — BEFORE-триггер, который молча не даёт непривилегированной
-- роли трогать is_correct: на UPDATE возвращает прежнее значение,
-- на INSERT — null (не проверено). Не бросает исключение: обычная
-- правка ответа игроком ничего не должна знать про это поле.
-- Откат: drop trigger if exists answers_lock_is_correct on answers;
create or replace function answers_lock_is_correct() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if is_editor() then
    return new;
  end if;
  if tg_op = 'INSERT' then
    new.is_correct := null;
  else
    new.is_correct := old.is_correct;
  end if;
  return new;
end;
$$;
drop trigger if exists answers_lock_is_correct on answers;
create trigger answers_lock_is_correct before insert or update on answers
  for each row execute function answers_lock_is_correct();

-- ── question_ratings ───────────────────────────────────────────
drop policy if exists rate_read on question_ratings;
drop policy if exists rate_ins on question_ratings;
-- DELETE не имел политики вообще — ratings.ts:saveRoundComment делает
-- delete() при очистке комментария, RLS тихо блокировал (0 affected,
-- без ошибки), код не проверял результат. Заводим политику И правим код
-- (см. src/lib/ratings.ts) — комментарий к раунду удаляет ведущий/
-- редактор, не сам игрок (сам игрок просто оставляет пустую строку,
-- новый upsert её и так перезапишет, а delete — уборка мусора хостом).
drop policy if exists qr_delete on question_ratings;
create policy qr_delete on question_ratings for delete using (is_editor());
-- qr_select/qr_insert/qr_update (0005/0010-контекст, true — by design)
-- остаются.

-- ── ai_reviews / ai_feedback ───────────────────────────────────
-- `to authenticated using(true)` — не анонимная дыра (нужен хоть какой-то
-- логин), но в системе нет других authenticated, кроме редакторов, так
-- что сводим к единому стилю is_editor() заодно.
drop policy if exists "ai_reviews rw" on ai_reviews;
create policy ai_reviews_rw on ai_reviews for all
  using (is_editor()) with check (is_editor());
drop policy if exists "ai_feedback rw" on ai_feedback;
create policy ai_feedback_rw on ai_feedback for all
  using (is_editor()) with check (is_editor());

-- ═══════════════════════════════════════════════════════════════
-- Storage (bucket quiz-media) — ОТДЕЛЬНЫЙ блок, применять осознанно.
--
-- ⚠ ПЕРЕД ЗАПУСКОМ ЭТОГО БЛОКА:
--   1. select public from storage.buckets where id = 'quiz-media';
--      должно вернуть true. Если false — НЕ применять блок, картинки
--      вопросов перестанут открываться по прямой ссылке.
--   2. Сразу ПОСЛЕ запуска — открыть любую ссылку на медиа вопроса
--      (скопировать URL картинки/аудио из уже играного пакета) в
--      приватном окне браузера БЕЗ логина и убедиться, что файл
--      открывается. Публичный bucket отдаёт файлы по прямому URL мимо
--      RLS-select (это отдельный, не табличный механизм в Storage) —
--      закрытие select здесь убирает только ЛИСТИНГ файлов бакета
--      анонимом, не чтение по прямой ссылке.
--
-- Откат:
--   drop policy if exists media_read on storage.objects;
--   create policy media_read on storage.objects for select
--     using (bucket_id = 'quiz-media');
-- ═══════════════════════════════════════════════════════════════
drop policy if exists media_read on storage.objects;
create policy media_read on storage.objects for select
  using (bucket_id = 'quiz-media' and is_editor());
-- media_write/media_update (is_editor()) и media_delete (is_owner()) —
-- уже верно построены в 0001/0005, не трогаем.
