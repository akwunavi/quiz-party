#!/usr/bin/env bash
# Реальные проверки серверной защиты фаз «3 попыток» (миграция 0019) на НАСТОЯЩЕМ PostgreSQL (не моки).
# Поднимает временный кластер, накатывает схему-минимум + НАСТОЯЩИЕ 0001(is_editor)/0014/0019, гоняет сценарии. Запуск: bash scripts/db-test/reveal-phase.sh
set -u
PGBIN=${PGBIN:-/usr/lib/postgresql/16/bin}; D=${PGTMP:-/tmp/pgtest-reveal}; PORT=${PGPORT:-54331}; ROOT=$(cd "$(dirname "$0")/../.." && pwd)
M=$ROOT/supabase/migrations
if [ "$(id -u)" = 0 ]; then RUN="su postgres -c"; id postgres >/dev/null 2>&1 || useradd -m postgres; else RUN="bash -c"; fi
rm -rf "$D"; mkdir -p "$D"; chown postgres "$D" 2>/dev/null
$RUN "$PGBIN/initdb -D $D/data -A trust >/dev/null && $PGBIN/pg_ctl -D $D/data -o '-p $PORT -k $D' -l $D/log -w start >/dev/null"
trap '$RUN "$PGBIN/pg_ctl -D $D/data -m immediate stop >/dev/null" 2>&1' EXIT
P() { psql -X -q -h "$D" -p $PORT -U postgres -d postgres -v ON_ERROR_STOP=1 "$@"; }
FAIL=0; ok() { if [ "$2" = "$3" ]; then echo "  ✓ $1"; else echo "  ✗ $1: ждали «$3», получили «$2»"; FAIL=1; fi; }
P <<SQL
create schema auth; create function auth.uid() returns uuid language sql stable as \$\$ select nullif(current_setting('test.uid', true), '')::uuid \$\$;
create table editor_roles(user_id uuid primary key);
create table teams(id uuid primary key default gen_random_uuid(), game_id uuid);
create table game_sessions(id text primary key, game_id uuid, round_number int, melody jsonb not null default '{}', updated_at timestamptz default now());
create table answers(id uuid primary key default gen_random_uuid(), team_id uuid not null references teams(id) on delete cascade, game_id uuid not null, question_ref text not null, round_number int not null,
  answer_text text not null default '', stake numeric, is_correct boolean, updated_at timestamptz default now(), created_at timestamptz not null default now(), unique(team_id, question_ref));
SQL
P -f <(sed -n '/^create or replace function is_editor/,/^\$\$;/p' $M/0001_init.sql)
P -f $M/0014_session_state_rev.sql
P -f "${MIG_0019:-$M/0019_reveal_phase_guard.sql}"
P <<SQL
create role app nologin; grant usage on schema public, auth to app; grant all on all tables in schema public to app; grant execute on all functions in schema public to app; grant execute on function auth.uid() to app;
alter table answers enable row level security;
create policy answers_select on answers for select using (true); create policy answers_insert on answers for insert with check (true);
create policy answers_update on answers for update using (true) with check (true); create policy answers_delete on answers for delete using (is_editor());
alter table game_sessions enable row level security; create policy g_sel on game_sessions for select using (true); create policy g_upd on game_sessions for update using (is_editor()) with check (is_editor());
SQL
G=11111111-1111-1111-1111-111111111111; T1=aaaaaaaa-0000-0000-0000-000000000001; T2=aaaaaaaa-0000-0000-0000-000000000002; T3=aaaaaaaa-0000-0000-0000-000000000003; TX=aaaaaaaa-0000-0000-0000-00000000000a; ED=eeeeeeee-0000-0000-0000-000000000001
QID=cccccccc-0000-0000-0000-000000000001
P -c "insert into teams(id,game_id) values ('$T1','$G'),('$T2','$G'),('$T3','$G'),('$TX','22222222-2222-2222-2222-222222222222'); insert into editor_roles values ('$ED'); insert into game_sessions(id,game_id,round_number,melody) values ('room','$G',3,'{\"rv\":{\"qid\":\"$QID\",\"phase\":1}}');"
PL() { P -c "set role app" -c "$1"; }
ED_() { P -c "set role app" -c "set test.uid='$ED'" -c "$1"; }
SETPH() { P -c "update game_sessions set melody = jsonb_set(melody,'{rv,phase}','$1'::jsonb) where id='room'"; }
ans() { echo "insert into answers(team_id,game_id,question_ref,round_number,answer_text,stake,is_correct) values ('$1','$G','${5:-q-$QID}','3','$2',$3,${4:-null}) on conflict (team_id,question_ref) do update set answer_text=excluded.answer_text, stake=excluded.stake, is_correct=excluded.is_correct"; }
Q() { P -At -c "select coalesce(string_agg(answer_text||'/'||coalesce(stake::text,'-')||'/'||coalesce(is_correct::text,'-'), ',' order by team_id),'') from answers where question_ref='${1:-q-$QID}'"; }
echo "— фаза 1: фазу выбирает сервер"
PL "$(ans $T1 'один' 3)" ; ok "T1 прислала stake=3 в фазе 1 → записано stake=1" "$(Q)" "один/1/-"
PL "$(ans $T1 'один-б' 1 true)"; ok "правка внутри фазы разрешена, is_correct игрока игнорируется" "$(Q)" "один-б/1/-"
echo "— фаза 2: ответ прошлой фазы закрыт"
SETPH 2
PL "$(ans $T1 'взлом' 2)"; ok "T1 (ответила в фазе 1) не меняет ответ в фазе 2" "$(Q)" "один-б/1/-"
PL "$(ans $T2 'два' 1)"; ok "T2 (молчала в фазе 1) отвечает в фазе 2, stake=2 (не 1)" "$(Q)" "один-б/1/-,два/2/-"
PL "$(ans $T2 'два-б' 99)"; ok "правка внутри фазы 2 разрешена" "$(Q)" "один-б/1/-,два-б/2/-"
echo "— разбор и посторонние"
SETPH '"review"'
PL "$(ans $T2 'поздно' 2)"; ok "в разборе ответ не принимается" "$(Q)" "один-б/1/-,два-б/2/-"
PL "$(ans $T3 'новая' 2)"; ok "в разборе новая команда не пишет" "$(Q)" "один-б/1/-,два-б/2/-"
SETPH 3
PL "$(ans $TX 'чужая' 3)"; ok "команда из другой игры не пишет" "$(Q)" "один-б/1/-,два-б/2/-"
PL "$(ans $T3 'три' 1)"; ok "T3 отвечает в фазе 3, stake=3" "$(Q)" "один-б/1/-,два-б/2/-,три/3/-"
PL "update answers set question_ref='q-подмена' where team_id='$T3'"; ok "ref ответа не меняется" "$(Q)" "один-б/1/-,два-б/2/-,три/3/-"
echo "— другие вопросы и редактор"
PL "$(ans $T1 'обычный' 7 null q-other)"; ok "ответ на другой вопрос — как раньше (stake не трогается)" "$(Q q-other)" "обычный/7/-"
ED_ "$(ans $T1 'один-ред' 1 true)"; ok "редактор оценивает: is_correct=true" "$(Q)" "один-ред/1/true,два-б/2/-,три/3/-"
SETPH '"review"'
ED_ "$(ans $T2 'ред-разбор' 2 false)"; ok "редактор пишет и в разборе" "$(Q)" "один-ред/1/true,ред-разбор/2/false,три/3/-"
echo; [ $FAIL = 0 ] && echo "ВСЕ ПРОВЕРКИ ПРОШЛИ" || { echo "ЕСТЬ ПРОВАЛЫ"; exit 1; }
