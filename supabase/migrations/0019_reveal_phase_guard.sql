-- ═══════════════════════════════════════════════════════════════
-- QUIZ PARTY · Миграция 0019: серверная защита фаз «3 попыток»
-- Запуск: Supabase Dashboard → SQL Editor → вставить целиком → Run
--
-- ПРОГНАТЬ ВРУЧНУЮ на единственной живой базе (ivan-quiz-party.ru). Модель эту миграцию сама НЕ применяет.
-- Только DDL. Проверка — отдельным файлом `0019_reveal_phase_guard_verify.sql`, отдельным запуском ПОСЛЕ этого.
-- Идемпотентна (create or replace / drop trigger if exists). Существующие строки не меняются.
--
-- Зачем. В «3 попытках» (механика four_pics) команда отвечает в одной из фаз 1/2/3; ответ, принятый в прошлой фазе, в следующих
-- закрыт, верный ответ оценивается по фазе приёма (answers.stake = номер фазы). Раньше это держал только телефон
-- (`revealFormState`, HANDOFF §3eq). RLS answers — «разрешено всем» (by design, телефоны без входа), поэтому любой клиент мог:
--   1) переписать ответ в поздней фазе (запоздавший запрос из очереди, перезагрузка, ручной запрос) и тем самым получить больше очков;
--   2) прислать ответ в разборе / между фазами;
--   3) записать себе stake (фазу) и is_correct напрямую.
--
-- Что делает триггер (BEFORE INSERT OR UPDATE на answers). Он смотрит только на «ответ активного вопроса „3 попыток“»:
-- строку, у которой question_ref = 'q-' || game_sessions.melody -> 'rv' ->> 'qid' для ЭТОЙ игры и ЭТОГО раунда.
-- Все остальные ответы (других вопросов, других механик) проходят как раньше.
--   • роли вне RLS (postgres/SQL Editor, service_role, суперпользователь) и редактор (is_editor(): ведущий/проектор) — без ограничений
--     (он оценивает ответы и сбрасывает игру);
--   • остальные:
--       - фаза обязана быть 1, 2 или 3 (rv.phase) — в 'review' и пока фазы нет запись МОЛЧА пропускается (return null);
--       - stake берётся из rv.phase СЕРВЕРА, а не из присланного (клиент не выбирает фазу), is_correct → null / из OLD;
--       - UPDATE: ответ, уже принятый в ДРУГОЙ фазе (старый текст не пуст, old.stake — число и ≠ текущей фазе), не меняется (return null);
--         внутри той же фазы правка разрешена; личность строки (id, team_id, game_id, question_ref, round_number, created_at) из OLD;
--       - INSERT: команда обязана принадлежать этой игре, ref и round_number — совпадать с активным вопросом.
--     «Молча пропустить», а не исключение: иначе очередь ответов на телефоне зациклилась бы на «отравленной» записи и заблокировала
--     остальные ответы за ней.
--   • фаза читается под замком FOR SHARE на строку game_sessions: переход фазы (UPDATE этой строки) ждёт уже начатые записи и наоборот —
--     запись либо целиком в старой фазе, либо целиком в новой.
-- Если сессии игры нет — запись не-редактора для такого ref не применяется (закрыто по умолчанию).
--
-- ОТКАТ (отдельным запуском):
--   drop trigger if exists answers_reveal_phase_guard on public.answers;
--   drop function if exists public.answers_reveal_phase_guard();
-- (после отката защита фаз снова только клиентская)
-- ═══════════════════════════════════════════════════════════════

create or replace function public.answers_reveal_phase_guard() returns trigger
language plpgsql security definer set search_path = public as $$
declare
  rv jsonb;
  cur_phase text;
  team_game uuid;
begin
  -- роли, которых RLS не касается, и редактор — как в 0017
  if coalesce((select r.rolsuper or r.rolbypassrls from pg_roles r
               where r.rolname = case when current_setting('role') = 'none' then session_user::text else current_setting('role') end), false) then
    return new;
  end if;
  if public.is_editor() then
    return new;
  end if;

  -- замок на строку сессии + состояние «3 попыток» этой игры и этого раунда (из ref/раунда строки, не из присланных полей)
  select gs.melody -> 'rv' into rv
    from public.game_sessions gs
    where gs.game_id = coalesce(new.game_id, old.game_id)
      and gs.round_number = coalesce(new.round_number, old.round_number)
    for share;
  if not found or rv is null or rv ->> 'qid' is null then
    return new;                         -- «3 попыток» тут нет (или сессии нет — как и раньше для обычных ответов): не наш случай
  end if;
  if tg_op = 'UPDATE' and old.question_ref is distinct from new.question_ref
     and ('q-' || (rv ->> 'qid') in (old.question_ref, new.question_ref)) then
    return null;                        -- ответ активного вопроса нельзя ни «увести» на другой ref, ни «подтянуть» чужой на него
  end if;
  if new.question_ref is distinct from ('q-' || (rv ->> 'qid')) then
    return new;                         -- ответ на другой вопрос: поведение не менялось
  end if;

  cur_phase := rv ->> 'phase';
  if cur_phase is null or cur_phase not in ('1', '2', '3') then
    return null;                        -- разбор или фазы ещё нет: принимать нечего
  end if;

  if tg_op = 'UPDATE' then
    -- ответ, принятый в другой фазе, в этой закрыт
    if btrim(coalesce(old.answer_text, '')) <> '' and old.stake is not null and old.stake::text <> cur_phase then
      return null;
    end if;
    new.id := old.id; new.team_id := old.team_id; new.game_id := old.game_id;
    new.question_ref := old.question_ref; new.round_number := old.round_number; new.created_at := old.created_at;
    new.is_correct := old.is_correct;
  else
    select t.game_id into team_game from public.teams t where t.id = new.team_id;
    if not found or (team_game is not null and team_game is distinct from new.game_id) then
      return null;                      -- команда не из этой игры
    end if;
    new.is_correct := null;
  end if;
  new.stake := cur_phase::numeric;      -- фазу выбирает сервер
  return new;
end $$;

drop trigger if exists answers_reveal_phase_guard on public.answers;
create trigger answers_reveal_phase_guard before insert or update on public.answers
  for each row execute function public.answers_reveal_phase_guard();
