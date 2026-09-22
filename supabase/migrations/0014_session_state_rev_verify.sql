-- ═══════════════════════════════════════════════════════════════
-- QUIZ PARTY · Проверочный sanity-check миграции 0014 (state_rev)
--
-- ⚠ ЭТО НЕ МИГРАЦИЯ. Это ручной sanity-check, который ведущий по желанию
-- гоняет ОТДЕЛЬНЫМ ЗАПУСКОМ SQL Editor, ПОСЛЕ основной миграции
-- `0014_session_state_rev.sql`, НЕ ОДНОВРЕМЕННО с ней и НЕ вставляя в тот
-- же прогон (найдено ревью 9.62, HANDOFF §3bx, находка 1 — раньше этот
-- блок жил в подвале самой миграции, и `begin`/`rollback` внутри одного
-- прогона откатывали заодно и саму настоящую миграцию, оставляя базу без
-- изменений при виде «все проверки прошли»).
--
-- Всё внутри begin/rollback: НИЧЕГО не остаётся в таблице после прогона.
-- Ведущий сверяет глазами вывод RAISE NOTICE на каждом шаге.
-- ═══════════════════════════════════════════════════════════════
begin;

-- ПРИМЕЧАНИЕ (нельзя проверить без доступа к реальной базе — сверить
-- глазами при прогоне): блок ниже предполагает, что game_sessions умеет
-- insert по одному только id (остальные колонки — с дефолтами или
-- nullable) и что в таблице есть колонка `phase`. Если insert упадёт на
-- NOT NULL constraint другой колонки — это не авария (весь блок в
-- begin/rollback), просто подставь нужные значения по месту в INSERT
-- ниже и прогони ещё раз.
do $$
declare
  test_id uuid;
  rev_after_first bigint;
  rev_after_repeat bigint;
  rows_affected int;
  rev_after_other_field bigint;
begin
  -- тестовая "комната" — минимальный набор колонок, которые реально есть
  -- в game_sessions (id генерируется сам, остальное — дефолты таблицы)
  insert into public.game_sessions (id) values (gen_random_uuid())
    returning id into test_id;

  raise notice 'Шаг 1: новая строка создана, state_rev должен быть 0';

  -- обновляем поле melody → ожидаем state_rev = 1
  update public.game_sessions set melody = '{"stage":"bidding"}'::jsonb
    where id = test_id;
  select state_rev into rev_after_first from public.game_sessions where id = test_id;
  raise notice 'Шаг 2: после первого изменения melody state_rev = % (ожидается 1)', rev_after_first;
  if rev_after_first <> 1 then raise exception 'ОШИБКА: state_rev должен был стать 1'; end if;

  -- тот же самый melody ещё раз → ожидаем, что state_rev НЕ вырос
  -- (is distinct from должен отсечь пустую перезапись)
  update public.game_sessions set melody = '{"stage":"bidding"}'::jsonb
    where id = test_id;
  select state_rev into rev_after_repeat from public.game_sessions where id = test_id;
  raise notice 'Шаг 3: после ПОВТОРА того же значения state_rev = % (ожидается тот же 1)', rev_after_repeat;
  if rev_after_repeat <> 1 then
    raise exception 'ОШИБКА: state_rev не должен был вырасти при записи тех же данных';
  end if;

  -- CAS с заведомо неверной (устаревшей) версией → ожидаем 0 обновлённых строк
  update public.game_sessions set melody = '{"stage":"snippet"}'::jsonb
    where id = test_id and state_rev = 0;
  get diagnostics rows_affected = row_count;
  raise notice 'Шаг 4: CAS с неверной версией (0 вместо 1) затронул % строк (ожидается 0)', rows_affected;
  if rows_affected <> 0 then raise exception 'ОШИБКА: CAS с неверной версией не должен был пройти'; end if;

  -- обновляем ДРУГОЕ поле → ожидаем state_rev = 2
  update public.game_sessions set phase = 'question' where id = test_id;
  select state_rev into rev_after_other_field from public.game_sessions where id = test_id;
  raise notice 'Шаг 5: после изменения другого поля (phase) state_rev = % (ожидается 2)', rev_after_other_field;
  if rev_after_other_field <> 2 then raise exception 'ОШИБКА: state_rev должен был стать 2'; end if;

  raise notice 'Все проверки прошли. Сейчас всё будет откачено (rollback) — в таблице ничего не останется.';
end $$;

rollback;
