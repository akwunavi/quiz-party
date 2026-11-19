-- Проверка миграции 0019 (прогонять ОТДЕЛЬНЫМ запуском ПОСЛЕ неё; только чтение — ничего не меняет).
-- Ожидание: trigger_ok = true; covers_update = true; security_definer = true; forces_phase = true.
select
  exists (select 1 from pg_trigger t join pg_class c on c.oid = t.tgrelid
          where t.tgname = 'answers_reveal_phase_guard' and c.relname = 'answers' and not t.tgisinternal)                    as trigger_ok,
  coalesce((select pg_get_triggerdef(t.oid) like '%UPDATE%' from pg_trigger t where t.tgname = 'answers_reveal_phase_guard' and not t.tgisinternal limit 1), false) as covers_update,
  coalesce((select p.prosecdef from pg_proc p where p.proname = 'answers_reveal_phase_guard' limit 1), false)                  as security_definer,
  coalesce((select p.prosrc like '%new.stake := cur_phase%' from pg_proc p where p.proname = 'answers_reveal_phase_guard' limit 1), false) as forces_phase;
-- Поведенческая проверка (фаза выбирается сервером, ответ прошлой фазы закрыт, разбор не принимает, подмена ref/команды) — scripts/db-test/reveal-phase.sh на тестовом PostgreSQL.
-- Руками на живой игре: в «3 попытках» ответьте в фазе 1, дождитесь фазы 2 — повторная отправка с телефона не меняет ответ.
