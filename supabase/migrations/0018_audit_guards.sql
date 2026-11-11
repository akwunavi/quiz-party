-- ═══════════════════════════════════════════════════════════════
-- QUIZ PARTY · Миграция 0018: закрытие дыр аудита (К1 + В1)
-- Запуск: Supabase Dashboard → SQL Editor → вставить целиком → Run
--
-- ПРОГНАТЬ ВРУЧНУЮ на единственной живой базе (ivan-quiz-party.ru). Модель к базе
-- сама НЕ применяет. Только DDL; проверка — отдельным файлом
-- `0018_audit_guards_verify.sql` ПОСЛЕ этого. Идемпотентна.
--
-- ПОРЯДОК ВЫКАТКИ: сначала эта миграция, потом деплой версии 10.64 (иначе телефон
-- игрока будет просить функцию, которой ещё нет, — он тогда берёт пакет прежним
-- способом, но после шага «ответы только для редакторов» это перестанет работать).
-- Эта миграция САМА переключает чтение вопросов: старые телефоны (до 10.64) после
-- неё вопросы не загрузят. Поэтому: миграция и деплой — подряд, не в разгар игры.
--
-- 1) К1. Служебные строки answers ('q-paper-…', 'q-adjust-…', 'q-blitz…' — ручные
--    начисления ведущего и итоги блица) и «сумасшедшие» ставки. RLS answers —
--    «разрешено всем» (телефоны без входа), поэтому любой гость мог записать
--    себе очки напрямую. Триггер молча (без исключения — очередь телефона не
--    должна зацикливаться на «отравленной» записи) отбрасывает запись не-редактора,
--    если ref служебный, либо stake вне 0…100.
-- 2) В1. pack_questions читался кем угодно — весь пакет с ответами вытаскивался из
--    консоли до игры. Теперь SELECT — только редакторам (ведущий/проектор/редактор),
--    а телефон берёт урезанный пакет функцией player_pack_questions(pack): без
--    правильных ответов, «display», разбора и ответных картинок. Слово кроссворда и
--    фраза «Скрэмбла» остаются (без них телефон не построит поле) — известное
--    остаточное допущение, HANDOFF §3en.
--
-- ОТКАТ (отдельным запуском):
--   drop trigger if exists answers_service_guard on public.answers;
--   drop function if exists public.answers_service_guard();
--   drop function if exists public.player_pack_questions(uuid);
--   drop policy if exists questions_select on pack_questions;
--   create policy questions_select on pack_questions for select using (
--     exists (select 1 from pack_rounds r join packs p on p.id = r.pack_id
--       where r.id = round_id and ((not p.is_private or is_owner())
--         or p.id in (select pack_id from game_sessions where pack_id is not null))));
-- ═══════════════════════════════════════════════════════════════

create or replace function public.answers_service_guard() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  -- роли вне RLS (SQL Editor, service_role) — доверенные
  if coalesce((select r.rolsuper or r.rolbypassrls from pg_roles r
               where r.rolname = case when current_setting('role') = 'none' then session_user::text else current_setting('role') end), false) then
    if tg_op = 'DELETE' then return old; end if;
    return new;
  end if;
  if public.is_editor() then
    if tg_op = 'DELETE' then return old; end if;
    return new;
  end if;

  if tg_op = 'DELETE' then
    return old;                         -- удаление и так только у редактора (RLS answers_delete)
  end if;
  if new.question_ref ~ '^(q-paper-|q-adjust-|q-blitz)'
     or (tg_op = 'UPDATE' and old.question_ref ~ '^(q-paper-|q-adjust-|q-blitz)') then
    return null;                        -- служебные строки пишет только ведущий
  end if;
  if new.stake is not null and (new.stake < 0 or new.stake > 100) then
    return null;                        -- ставка игрока ограничена 0…100
  end if;
  return new;
end $$;

drop trigger if exists answers_service_guard on public.answers;
create trigger answers_service_guard before insert or update or delete on public.answers
  for each row execute function public.answers_service_guard();

-- ── В1: пакет для телефонов без ответов ───────────────────────────
create or replace function public.player_pack_questions(p_pack_id uuid) returns jsonb
language sql stable security definer set search_path = public as $$
  select coalesce(jsonb_agg(
    to_jsonb(q)
      || jsonb_build_object(
           'answer', (q.answer - 'correct' - 'display' - 'correct_choice' - 'correct_order' - 'correct_pairs'),
           'media', (q.media - 'answer'),
           'answer_note', null)
    order by q.position), '[]'::jsonb)
  from pack_questions q
  join pack_rounds r on r.id = q.round_id
  join packs p on p.id = r.pack_id
  where r.pack_id = p_pack_id
    and q.hidden = false
    and (not p.is_private or p.id in (select pack_id from game_sessions where pack_id is not null));
$$;
grant execute on function public.player_pack_questions(uuid) to anon, authenticated;

drop policy if exists questions_select on pack_questions;
create policy questions_select on pack_questions for select using (
  is_editor() or is_owner()
);
