-- ═══════════════════════════════════════════════════════════════
-- QUIZ PARTY · Миграция 0017: серверная блокировка ставок «Скачек бульдогов»
-- Запуск: Supabase Dashboard → SQL Editor → вставить целиком → Run
--
-- ПРОГНАТЬ ВРУЧНУЮ на единственной живой базе (ivan-quiz-party.ru). Модель эту
-- миграцию к базе сама НЕ применяет. Только DDL (урок 0014): проверка — отдельным
-- файлом `0017_race_bets_lock_verify.sql`, отдельным запуском ПОСЛЕ этого.
-- Идемпотентна (create or replace / drop trigger if exists).
--
-- Зачем. Ставка — строка answers с question_ref 'q-race-<раунд>', answer_text = номер
-- собаки 1..5, очки на финише пишутся в stake. RLS answers — «разрешено всем»
-- (by design, телефоны без входа), поэтому до этой миграции ЛЮБОЙ клиент мог:
--   1) менять ставку после старта гонки (запоздавший запрос из очереди телефона,
--      перезагрузка, ручной запрос) — и очки считались по изменённой ставке;
--   2) записать себе stake (очки) напрямую — после начисления is_correct уже true.
-- Кнопка на телефоне этого не останавливала: проверялась только на клиенте.
--
-- ПЕРЕРАБОТАНА после независимой проверки (HANDOFF §3du): первая версия пропускала `UPDATE … SET question_ref='q-x'` (смотрела только NEW),
-- не защищала DELETE, брала раунд из NEW (ставку раунда 2 можно было изменить «под» открытый раунд 3) и не сверяла команду с игрой.
-- Файл идемпотентен: на базе, где ранняя версия уже прогнана, повторный запуск ЗАМЕНЯЕТ функцию и триггер на исправленные.
--
-- Что делает триггер (BEFORE INSERT OR UPDATE OR DELETE на answers; «ставка» = строка, у которой OLD или NEW question_ref like 'q-race-%'):
--   • роли вне RLS (postgres/SQL Editor, service_role, суперпользователь) — без ограничений (ручная чистка, каскады);
--   • редактор (ведущий/проектор: is_editor()) — без ограничений (он начисляет очки);
--   • остальные:
--       - INSERT: ref обязан быть ровно 'q-race-<round_number>' (иначе — смешение раундов), команда обязана принадлежать этой игре
--         (teams.game_id; у команды без game_id — как раньше, не проверяется), stake/is_correct → null;
--       - UPDATE: личность строки (id, team_id, game_id, question_ref, round_number, created_at) и очки (stake, is_correct) берутся из OLD —
--         переопределить их нельзя; обычный ответ нельзя превратить в ставку (и ставку — в обычный ответ);
--       - DELETE: ставку не-редактор не удалит (в дополнение к RLS answers_delete, которая сегодня и так пускает только редактора:
--         политики складываются по «или», любая будущая разрешающая политика не должна открыть удаление);
--       - текст меняется ТОЛЬКО пока в сессии ЭТОЙ игры и ЭТОГО раунда (из OLD/ref строки, не из присланных полей) race.stage = 'betting';
--         иначе запись МОЛЧА пропускается (return null). Не исключение — иначе очередь ответов на телефоне зациклилась бы на
--         «отравленной» записи и блокировала остальные ответы за ней.
--   • «Выбор» и «Старт» — строго по порядку блокировки строки game_sessions: триггер
--     берёт её FOR SHARE, а «Старт» (UPDATE этой строки) ждёт всех, кто уже держит
--     SHARE, и наоборот. Кто взял замок первым — тот первый. Ставка, чей замок взят
--     раньше «Старта», засчитана; ставка, дождавшаяся «Старта», перечитывает строку
--     (READ COMMITTED), видит stage='running' и отбрасывается. Окна «проверил и записал
--     между» нет: проверка и запись под одним замком.
--
-- Другие раунды не затронуты: фильтр question_ref like 'q-race-%' (у остальных ref —
-- 'q-<uuid>', uuid не бывает 'race-…'). Старые клиенты совместимы: их запись после
-- старта просто не применяется (их интерфейс может ещё показать выбор — косметика).
-- Существующие строки не меняются. Если сессии игры нет (game_id чужой) — запись
-- не-редактора отбрасывается (закрыто по умолчанию).
--
-- ОТКАТ (отдельным запуском):
--   drop trigger if exists answers_race_bets_guard on public.answers;
--   drop function if exists public.answers_race_bets_guard();
-- (после отката защита ставок снова только клиентская)
-- ═══════════════════════════════════════════════════════════════

create or replace function public.answers_race_bets_guard() returns trigger
language plpgsql security definer set search_path = public as $$
declare
  old_race boolean := false;
  new_race boolean := false;
  team_game uuid;
begin
  -- Роли, которых RLS не касается (postgres в SQL Editor, service_role, суперпользователь), — доверенные: ручная чистка, сброс игры,
  -- каскад при удалении команды работают как раньше. Защита — для ролей, подпадающих под RLS (anon/authenticated через PostgREST).
  if coalesce((select r.rolsuper or r.rolbypassrls from pg_roles r
               where r.rolname = case when current_setting('role') = 'none' then session_user::text else current_setting('role') end), false) then
    if tg_op = 'DELETE' then return old; end if;
    return new;
  end if;

  if tg_op = 'DELETE' then
    if coalesce(old.question_ref like 'q-race-%', false) and not public.is_editor() then
      return null;                      -- ставку не-редактор не удаляет (ни до старта, ни после)
    end if;
    return old;
  end if;

  new_race := coalesce(new.question_ref like 'q-race-%', false);
  if tg_op = 'UPDATE' then old_race := coalesce(old.question_ref like 'q-race-%', false); end if;
  if not new_race and not old_race then
    return new;                         -- обычные ответы других раундов: поведение не менялось
  end if;
  if public.is_editor() then
    return new;                         -- ведущий/проектор: начисляет очки, сбрасывает игру
  end if;

  if tg_op = 'UPDATE' then
    if not old_race then
      return null;                      -- обычный ответ нельзя превратить в ставку
    end if;
    -- личность и очки существующей ставки не переопределяются ничем (в т.ч. вместе с новым question_ref)
    new.id := old.id; new.team_id := old.team_id; new.game_id := old.game_id;
    new.question_ref := old.question_ref; new.round_number := old.round_number; new.created_at := old.created_at;
    new.stake := old.stake; new.is_correct := old.is_correct;
  else
    if new.question_ref is distinct from ('q-race-' || new.round_number::text) then
      return null;                      -- ref и round_number обязаны совпадать (иначе ставку раунда N «пишут» под раунд M)
    end if;
    select t.game_id into team_game from public.teams t where t.id = new.team_id;
    if not found or (team_game is not null and team_game is distinct from new.game_id) then
      return null;                      -- команда не из этой игры
    end if;
    new.stake := null; new.is_correct := null;
  end if;

  -- замок на строку сессии: порядок «ставка / Старт» решается очередью на нём (раунд и игра — из строки ставки, не из присланного)
  perform 1 from public.game_sessions gs
    where gs.game_id = new.game_id
      and gs.round_number = new.round_number
      and gs.melody -> 'race' ->> 'stage' = 'betting'
    for share;
  if not found then
    return null;                        -- выбор закрыт (или не тот раунд): запись не применяется
  end if;
  return new;
end $$;

drop trigger if exists answers_race_bets_guard on public.answers;
create trigger answers_race_bets_guard before insert or update or delete on public.answers
  for each row execute function public.answers_race_bets_guard();
