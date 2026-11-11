-- Проверка миграции 0018 (запускать ОТДЕЛЬНО, после неё). Только чтение.
select 'trigger answers_service_guard' as что, exists (select 1 from pg_trigger where tgname = 'answers_service_guard' and not tgisinternal) as есть
union all select 'функция player_pack_questions', exists (select 1 from pg_proc where proname = 'player_pack_questions')
union all select 'политика questions_select только редакторы', exists (select 1 from pg_policies where tablename = 'pack_questions' and policyname = 'questions_select' and qual ilike '%is_editor%' and qual not ilike '%is_private%');
-- все три строки должны быть true
