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
-- Что делает триггер (BEFORE INSERT OR UPDATE на answers, ТОЛЬКО для q-race-%):
--   • редактор (ведущий/проектор: is_editor()) — без ограничений (он начисляет очки);
--   • остальные:
--       - stake им недоступен: при INSERT → null, при UPDATE → прежнее значение;
--       - answer_text меняется ТОЛЬКО пока в сессии этой игры race.stage = 'betting'
--         и номер раунда совпадает; иначе запись МОЛЧА пропускается (return null:
--         INSERT не создаёт строку, UPDATE оставляет старую). Не исключение — иначе
--         очередь ответов на телефоне зациклилась бы на «отравленной» записи и
--         блокировала остальные ответы за ней.
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
-- ═══════════════════════════════════════════════════════════════

create or replace function public.answers_race_bets_guard() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.question_ref is null or new.question_ref not like 'q-race-%' then
    return new;
  end if;
  if public.is_editor() then
    return new;                         -- ведущий/проектор: начисляет очки
  end if;

  -- очки игрок записать не может
  if tg_op = 'INSERT' then new.stake := null; else new.stake := old.stake; end if;

  -- замок на строку сессии игры: порядок «ставка / Старт» решается очередью на нём
  perform 1 from public.game_sessions gs
    where gs.game_id = new.game_id
      and gs.round_number = new.round_number
      and gs.melody -> 'race' ->> 'stage' = 'betting'
    for share;
  if not found then
    return null;                        -- выбор закрыт (или не тот раунд): запись не применяется
  end if;

  if tg_op = 'UPDATE' then              -- чужую строку «перепривязать» нельзя
    new.team_id := old.team_id; new.game_id := old.game_id;
    new.question_ref := old.question_ref; new.round_number := old.round_number;
  end if;
  return new;
end $$;

drop trigger if exists answers_race_bets_guard on public.answers;
create trigger answers_race_bets_guard before insert or update on public.answers
  for each row execute function public.answers_race_bets_guard();
