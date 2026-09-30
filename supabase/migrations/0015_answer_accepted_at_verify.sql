-- ═══════════════════════════════════════════════════════════════
-- QUIZ PARTY · Проверочный sanity-check миграции 0015 (accepted_at)
--
-- ⚠ ЭТО НЕ МИГРАЦИЯ. Гонять ОТДЕЛЬНЫМ запуском SQL Editor ПОСЛЕ
-- `0015_answer_accepted_at.sql`, не в одном прогоне с ней (HANDOFF §3bx,
-- находка 1). Всё внутри begin/rollback — в таблицах ничего не остаётся.
-- Сверять глазами вывод RAISE NOTICE; при провале — RAISE EXCEPTION.
--
-- ПРИМЕЧАНИЕ (не проверено на живой базе): предполагается, что teams
-- вставляется по одному name, а answers — по team_id/game_id/question_ref/
-- round_number (остальное — дефолты). Упадёт на NOT NULL другой колонки —
-- не авария (rollback), подставь значение по месту и прогони ещё раз.
-- ═══════════════════════════════════════════════════════════════
begin;

do $$
declare
  t_id uuid;
  g_id uuid := gen_random_uuid();
  a_id uuid;
  acc1 timestamptz;
  acc2 timestamptz;
  acc3 timestamptz;
  acc4 timestamptz;
  shown timestamptz;
begin
  insert into public.teams (name) values ('__verify_0015__' || g_id::text)
    returning id into t_id;

  -- клиент пытается подсунуть своё время — триггер обязан перезаписать
  insert into public.answers (team_id, game_id, question_ref, round_number, answer_text, accepted_at)
    values (t_id, g_id, 'q-verify', 0, 'кот', '2000-01-01T00:00:00Z')
    returning id, accepted_at into a_id, acc1;
  raise notice 'Шаг 1: insert → accepted_at = % (ожидается сейчас, не 2000 год)', acc1;
  if acc1 < now() - interval '1 minute' then
    raise exception 'ОШИБКА: accepted_at взят из запроса клиента';
  end if;

  perform pg_sleep(0.05);
  -- тот же текст (ретрай очереди) и оценка ведущего — не двигают
  update public.answers set answer_text = 'кот', is_correct = true,
    updated_at = now() where id = a_id returning accepted_at into acc2;
  raise notice 'Шаг 2: тот же текст + оценка → accepted_at = % (ожидается %)', acc2, acc1;
  if acc2 <> acc1 then raise exception 'ОШИБКА: accepted_at сдвинулся без смены текста'; end if;

  -- клиент пытается переписать accepted_at напрямую — игнорируется
  update public.answers set accepted_at = '2000-01-01T00:00:00Z' where id = a_id
    returning accepted_at into acc3;
  raise notice 'Шаг 3: прямая запись accepted_at → % (ожидается %)', acc3, acc1;
  if acc3 <> acc1 then raise exception 'ОШИБКА: accepted_at переписан запросом'; end if;

  perform pg_sleep(0.05);
  -- новый текст — двигает
  update public.answers set answer_text = 'ток' where id = a_id returning accepted_at into acc4;
  raise notice 'Шаг 4: новый текст → accepted_at = % (ожидается позже %)', acc4, acc1;
  if acc4 <= acc1 then raise exception 'ОШИБКА: accepted_at не сдвинулся на смене текста'; end if;

  -- upsert по (team_id, question_ref) — ветка ON CONFLICT DO UPDATE
  insert into public.answers (team_id, game_id, question_ref, round_number, answer_text)
    values (t_id, g_id, 'q-verify', 0, 'ток')
    on conflict (team_id, question_ref) do update set answer_text = excluded.answer_text
    returning accepted_at into acc2;
  raise notice 'Шаг 5: upsert того же текста → % (ожидается %)', acc2, acc4;
  if acc2 <> acc4 then raise exception 'ОШИБКА: upsert того же текста сдвинул accepted_at'; end if;

  -- старт вопроса: клиентский shown_at перезаписывается серверным
  insert into public.question_shown (game_id, round_number, question_ref, shown_at)
    values (g_id, 0, 'q-verify', '2000-01-01T00:00:00Z') returning shown_at into shown;
  raise notice 'Шаг 6: question_shown.shown_at = % (ожидается сейчас)', shown;
  if shown < now() - interval '1 minute' then
    raise exception 'ОШИБКА: shown_at взят из запроса клиента';
  end if;

  raise notice 'Все проверки прошли. Сейчас всё будет откачено (rollback).';
end $$;

rollback;
