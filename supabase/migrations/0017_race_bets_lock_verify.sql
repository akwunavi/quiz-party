-- Проверка миграции 0017 (прогонять ОТДЕЛЬНЫМ запуском ПОСЛЕ неё; только чтение — ничего не меняет).
-- Ожидание: trigger_ok = true; covers_delete = true; covers_update = true; checks_ref_round = true (исправленная версия, а не ранняя); security_definer = true.
select
  exists (select 1 from pg_trigger t join pg_class c on c.oid = t.tgrelid
          where t.tgname = 'answers_race_bets_guard' and c.relname = 'answers' and not t.tgisinternal)                       as trigger_ok,
  coalesce((select pg_get_triggerdef(t.oid) like '%INSERT OR DELETE OR UPDATE%' or pg_get_triggerdef(t.oid) like '%INSERT OR UPDATE OR DELETE%'
            from pg_trigger t where t.tgname = 'answers_race_bets_guard' and not t.tgisinternal limit 1), false)             as covers_delete,
  coalesce((select pg_get_triggerdef(t.oid) like '%UPDATE%' from pg_trigger t where t.tgname = 'answers_race_bets_guard' and not t.tgisinternal limit 1), false) as covers_update,
  coalesce((select p.prosrc like '%q-race-'' || new.round_number%' from pg_proc p where p.proname = 'answers_race_bets_guard' limit 1), false) as checks_ref_round,
  coalesce((select p.prosecdef from pg_proc p where p.proname = 'answers_race_bets_guard' limit 1), false)                    as security_definer;
-- Если checks_ref_round = false или covers_delete = false — на базе осталась РАННЯЯ версия 0017: прогоните исправленный файл ещё раз (он идемпотентен и заменит её).
-- Поведенческая проверка (замок «ставка / Старт», подмена question_ref/команды/игры/раунда, DELETE, очки игрока) — scripts/db-test/race-bets.sh на тестовом PostgreSQL.
-- Руками на живой игре: поставьте на телефоне, нажмите «Старт» — после гонки у команды очки по ПЕРВОМУ выбору, что бы ни присылал телефон.
