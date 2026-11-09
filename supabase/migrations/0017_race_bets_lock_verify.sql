-- Проверка миграции 0017 (прогонять ОТДЕЛЬНЫМ запуском ПОСЛЕ неё; только чтение — ничего не меняет).
-- Ожидание: первая строка — trigger_ok = true, вторая — функция есть и security definer.
select exists (select 1 from pg_trigger t join pg_class c on c.oid = t.tgrelid
               where t.tgname = 'answers_race_bets_guard' and c.relname = 'answers' and not t.tgisinternal) as trigger_ok;
select p.proname, p.prosecdef as security_definer, p.proconfig as search_path_cfg
  from pg_proc p where p.proname = 'answers_race_bets_guard';
-- Поведенческая проверка (замок «ставка / Старт», запись после старта, stake игрока) — scripts/db-test/race-bets.sh на тестовом PostgreSQL.
-- Живую игру руками проверьте так: откройте выбор, поставьте на телефоне, нажмите «Старт», затем на телефоне попытайтесь сменить собаку
-- (кнопки уже не будет — и запрос, отправленный вручную, не изменит ставку: после гонки у команды очки по ПЕРВОМУ выбору).
