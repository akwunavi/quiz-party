-- ═══════════════════════════════════════════════════════════════
-- Проверка миграции 0016 (server_now). ⚠ ЭТО НЕ МИГРАЦИЯ.
-- Гонять ОТДЕЛЬНЫМ запуском в SQL Editor ПОСЛЕ 0016_server_now.sql.
-- Ничего не пишет в таблицы. Результат — таблица из одной строки.
-- ═══════════════════════════════════════════════════════════════
select
  public.server_now() as server_now,
  now() as transaction_now,
  abs(extract(epoch from (public.server_now() - clock_timestamp()))) < 1 as ok_close_to_clock,
  (select has_function_privilege('anon', 'public.server_now()', 'execute')) as anon_can_call;
-- Ждём: ok_close_to_clock = true, anon_can_call = true.
