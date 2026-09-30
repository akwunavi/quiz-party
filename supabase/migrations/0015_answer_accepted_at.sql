-- ═══════════════════════════════════════════════════════════════
-- QUIZ PARTY · Миграция 0015: серверное время ответа и старта вопроса
-- Запуск: Supabase Dashboard → SQL Editor → вставить целиком → Run
--
-- ПРОГНАТЬ ВРУЧНУЮ на единственной живой базе (ivan-quiz-party.ru,
-- self-hosted Supabase). У модели нет доступа к этой базе — она НЕ
-- применяет эту миграцию сама.
--
-- ⚠ Этот файл — ТОЛЬКО DDL (урок 0014, HANDOFF §3bx, находка 1).
-- Проверка — ОТДЕЛЬНЫЙ файл `0015_answer_accepted_at_verify.sql`, гонять
-- ОТДЕЛЬНЫМ запуском ПОСЛЕ этого. Не склеивай: `begin…rollback` в одном
-- прогоне с DDL откатит и саму миграцию.
--
-- Идемпотентна (if not exists / create or replace / drop trigger if
-- exists): повторный прогон ничего не ломает.
--
-- Зачем: механика «Скрэмбл» в режиме гонки отдаёт балл команде, чей
-- верный ответ пришёл РАНЬШЕ. Сейчас время ответа ставит телефон своими
-- часами (answers.updated_at, lib/answerQueue.ts), а старт вопроса —
-- часы ведущего (question_shown.shown_at, lib/gameActions.ts:startTimer).
-- Часы гостей расходятся на секунды, подделать их тоже можно. Здесь:
--
--   1) answers.accepted_at — серверный момент ПОСЛЕДНЕЙ СМЕНЫ ТЕКСТА
--      ответа. Ставится триггером всегда (клиентское значение в теле
--      запроса игнорируется). Оценка ведущего (is_correct), ставка,
--      updated_at — НЕ двигают. Повтор той же отправки (ретрай очереди)
--      — тоже не двигает.
--   2) question_shown.shown_at — тоже серверным временем (триггер
--      перезаписывает то, что прислал клиент). Решение ведущего
--      30.09.2026. Побочный эффект: колонка «Скорость ответа» в CSV
--      становится честнее (обе точки — часы сервера); старые записи не
--      трогаются.
--
-- clock_timestamp(), а не now(): now() — время начала ТРАНЗАКЦИИ, и пачка
-- upsert (репетиция devSeed) получила бы один штамп на все строки.
--
-- Порядок блоков важен: бэкфилл старых строк стоит ДО создания триггера —
-- иначе сам триггер на этом update оставил бы accepted_at пустым (текст
-- ответа не меняется → «сохранить старое значение», то есть null).
--
-- ОТКАТ (прогнать отдельно, если что-то пошло не так):
--   drop trigger if exists answers_set_accepted_at on public.answers;
--   drop function if exists public.answers_set_accepted_at();
--   alter table public.answers drop column if exists accepted_at;
--   drop trigger if exists question_shown_server_time on public.question_shown;
--   drop function if exists public.question_shown_server_time();
-- ═══════════════════════════════════════════════════════════════

-- 1) серверный момент последней смены текста ответа
alter table public.answers add column if not exists accepted_at timestamptz;

-- бэкфилл уже сыгранных игр (ДО триггера — см. шапку)
update public.answers set accepted_at = coalesce(updated_at, created_at)
  where accepted_at is null;

create or replace function public.answers_set_accepted_at() returns trigger
language plpgsql set search_path = '' as $$
begin
  if tg_op = 'INSERT' then
    new.accepted_at := clock_timestamp();
  elsif new.answer_text is distinct from old.answer_text then
    new.accepted_at := clock_timestamp();
  else
    -- оценка ведущего (is_correct), ставка, updated_at, ретрай того же текста
    new.accepted_at := old.accepted_at;
  end if;
  return new;
end $$;

drop trigger if exists answers_set_accepted_at on public.answers;
create trigger answers_set_accepted_at before insert or update on public.answers
  for each row execute function public.answers_set_accepted_at();

-- 2) старт вопроса — серверным временем
create or replace function public.question_shown_server_time() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.shown_at := clock_timestamp();
  return new;
end $$;

drop trigger if exists question_shown_server_time on public.question_shown;
create trigger question_shown_server_time before insert or update on public.question_shown
  for each row execute function public.question_shown_server_time();
