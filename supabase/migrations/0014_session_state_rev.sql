-- ═══════════════════════════════════════════════════════════════
-- QUIZ PARTY · Миграция 0014: версия состояния сессии (state_rev)
-- Запуск: Supabase Dashboard → SQL Editor → вставить целиком → Run
--
-- ПРОГНАТЬ ВРУЧНУЮ на единственной живой базе (ivan-quiz-party.ru,
-- self-hosted Supabase). У модели нет доступа к этой базе напрямую —
-- она НЕ применяет эту миграцию сама.
--
-- ⚠ ВАЖНО (найдено ревью 9.62, HANDOFF §3bx, находка 1): этот файл
-- содержит ТОЛЬКО настоящие DDL-команды. Проверочный sanity-check
-- ПЕРЕЕХАЛ в ОТДЕЛЬНЫЙ файл `0014_session_state_rev_verify.sql` — не
-- склеивай их обратно. Причина: если вставить в SQL Editor одним куском
-- код, где ПОСЛЕ этих DDL идёт `begin; ... rollback;`, Postgres выполняет
-- весь текст как ОДНУ неявную транзакцию — `begin` посреди файла не
-- открывает новую, а превращает уже идущую неявную транзакцию в явную, и
-- в неё попадают уже выполненные ДО него `alter table`/`create function`/
-- `create trigger`. Финальный `rollback` в конце отменяет ВООБЩЕ ВСЁ —
-- и проверочные вставки, и саму настоящую миграцию. Вывод в SQL Editor
-- при этом бодро покажет «все проверки прошли», а в базе не изменится
-- ничего: ни колонки `state_rev`, ни триггера. Прогоняй ЭТОТ файл сам по
-- себе (он сам себе транзакция, как обычная миграция) — проверочный файл
-- по желанию ОТДЕЛЬНЫМ запуском ПОСЛЕ.
--
-- Написана ЗАЩИЩЁННО (add column if not exists / create or replace
-- function / drop trigger if exists + create trigger) — безопасна
-- независимо от того, в каком состоянии сейчас эта таблица: повторный
-- прогон ничего не ломает, отсутствие/наличие старых объектов не мешает.
--
-- Зачем: два экрана (проектор и пульт ведущего) читают game_sessions
-- поллингом и пишут patchSession() слепо, без проверки версии. Двойной
-- клик или гонка "автопереход по дедлайну vs клик ведущего" может
-- затереть чужую, более свежую запись своим устаревшим снимком —
-- механика мелодии находила это несколько раз (HANDOFF §3bt/§3bu/§3bv).
-- state_rev — счётчик версий, растущий триггером НА КАЖДОЕ РЕАЛЬНОЕ
-- изменение строки (is distinct from — пустые перезаписи не считаются).
-- Клиент читает rev вместе с состоянием и пишет через
-- `update ... where id = ? and state_rev = <прочитанный>` (CAS —
-- compare-and-swap): если кто-то успел записать раньше, 0 строк
-- обновится, и клиент видит конфликт вместо тихой перезаписи.
--
-- ОТКАТ (если что-то пошло не так — прогнать этот блок отдельно):
--   drop trigger if exists game_sessions_state_rev on public.game_sessions;
--   drop function if exists public.game_sessions_bump_state_rev();
--   alter table public.game_sessions drop column if exists state_rev;
-- ═══════════════════════════════════════════════════════════════

alter table public.game_sessions add column if not exists state_rev bigint not null default 0;

create or replace function public.game_sessions_bump_state_rev() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.state_rev := old.state_rev;
  if new is distinct from old then new.state_rev := old.state_rev + 1; end if;
  return new;
end $$;

drop trigger if exists game_sessions_state_rev on public.game_sessions;
create trigger game_sessions_state_rev before update on public.game_sessions
  for each row execute function public.game_sessions_bump_state_rev();
