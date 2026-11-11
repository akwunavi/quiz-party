#!/usr/bin/env bash
# Проверка миграции 0018 на НАСТОЯЩЕМ PostgreSQL (служебные строки, границы ставки, урезанный пакет).
# Запуск: bash scripts/db-test/audit-guards.sh
set -u
PGBIN=${PGBIN:-/usr/lib/postgresql/16/bin}; D=${PGTMP:-/tmp/pgtest-audit}; PORT=${PGPORT:-54331}; ROOT=$(cd "$(dirname "$0")/../.." && pwd)
M=$ROOT/supabase/migrations
if [ "$(id -u)" = 0 ]; then RUN="su postgres -c"; id postgres >/dev/null 2>&1 || useradd -m postgres; else RUN="bash -c"; fi
rm -rf "$D"; mkdir -p "$D"; chown postgres "$D" 2>/dev/null
$RUN "$PGBIN/initdb -D $D/data -A trust >/dev/null && $PGBIN/pg_ctl -D $D/data -o '-p $PORT -k $D' -l $D/log -w start >/dev/null"
trap '$RUN "$PGBIN/pg_ctl -D $D/data -m immediate stop >/dev/null" 2>&1' EXIT
P() { psql -X -q -h "$D" -p $PORT -U postgres -d postgres -v ON_ERROR_STOP=1 "$@"; }
FAIL=0; ok() { if [ "$2" = "$3" ]; then echo "  ✓ $1"; else echo "  ✗ $1: ждали «$3», получили «$2»"; FAIL=1; fi; }
P <<SQL
create role anon nologin; create role authenticated nologin; create schema auth; create function auth.uid() returns uuid language sql stable as \$\$ select nullif(current_setting('test.uid', true), '')::uuid \$\$;
create table editor_roles(user_id uuid primary key, role text default 'editor');
create function is_editor() returns boolean language sql stable security definer as \$\$ select exists (select 1 from editor_roles where user_id = auth.uid()) \$\$;
create function is_owner() returns boolean language sql stable security definer as \$\$ select exists (select 1 from editor_roles where user_id = auth.uid() and role='owner') \$\$;
create table teams(id uuid primary key default gen_random_uuid(), game_id uuid);
create table game_sessions(id text primary key, game_id uuid, pack_id uuid, round_number int);
create table packs(id uuid primary key, is_private boolean default false);
create table pack_rounds(id uuid primary key, pack_id uuid);
create table pack_questions(id uuid primary key default gen_random_uuid(), round_id uuid, position int, question_text text, media jsonb, answer jsonb, answer_note text, service jsonb default '{}', hidden boolean default false);
create table answers(id uuid primary key default gen_random_uuid(), team_id uuid references teams(id), game_id uuid, question_ref text, round_number int, answer_text text default '', stake numeric, is_correct boolean, unique(team_id, question_ref));
SQL
P -f $M/0018_audit_guards.sql
P <<SQL
create role app nologin; grant usage on schema public, auth to app; grant all on all tables in schema public to app; grant execute on all functions in schema public to app;
alter table answers enable row level security; create policy a_all on answers for all using (true) with check (true);
insert into editor_roles values ('eeeeeeee-0000-0000-0000-000000000001');
insert into teams values ('aaaaaaaa-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111');
insert into packs values ('bbbbbbbb-0000-0000-0000-000000000001', false), ('bbbbbbbb-0000-0000-0000-000000000002', true);
insert into pack_rounds values ('cccccccc-0000-0000-0000-000000000001','bbbbbbbb-0000-0000-0000-000000000001'),('cccccccc-0000-0000-0000-000000000002','bbbbbbbb-0000-0000-0000-000000000002');
insert into pack_questions(round_id,position,question_text,media,answer,answer_note,hidden) values
 ('cccccccc-0000-0000-0000-000000000001',1,'Q1','{"question":[1],"answer":["pic"]}','{"mode":"free_text","correct":"секрет","display":"Секрет"}','разбор',false),
 ('cccccccc-0000-0000-0000-000000000001',2,'Q2','{}','{"mode":"crossword","word":"СЛОВО"}',null,true),
 ('cccccccc-0000-0000-0000-000000000002',1,'приватный','{}','{"mode":"free_text","correct":"x"}',null,false);
SQL
T=aaaaaaaa-0000-0000-0000-000000000001; G=11111111-1111-1111-1111-111111111111; ED=eeeeeeee-0000-0000-0000-000000000001
PL() { P -c "set role app" -c "$1"; }
PQ() { P -At -c "set role app" -c "$1" | tail -1; }
EQ() { P -At -c "set role app" -c "set test.uid='$ED'" -c "$1" | tail -1; }
ED_() { P -c "set role app" -c "set test.uid='$ED'" -c "$1"; }
INS() { echo "insert into answers(team_id,game_id,question_ref,round_number,answer_text,stake) values ('$T','$G','$1',1,'x',${2:-null}) on conflict (team_id,question_ref) do update set stake=excluded.stake, answer_text=excluded.answer_text"; }
C() { P -At -c "select count(*) from answers where question_ref='$1'"; }
echo "К1: служебные строки и границы ставки"
PL "$(INS q-paper-1 50)"; ok "игрок не пишет q-paper-" "$(C q-paper-1)" "0"
PL "$(INS q-adjust-2 50)"; ok "игрок не пишет q-adjust-" "$(C q-adjust-2)" "0"
PL "$(INS q-blitz 5)"; ok "игрок не пишет q-blitz" "$(C q-blitz)" "0"
ED_ "$(INS q-paper-1 50)"; ok "редактор пишет q-paper-" "$(C q-paper-1)" "1"
ED_ "$(INS q-adjust-2 -3)"; ok "редактор: отрицательные корректировки разрешены" "$(C q-adjust-2)" "1"
PL "$(INS q-abc 10)"; ok "обычный ответ со ставкой 10 проходит" "$(C q-abc)" "1"
PL "$(INS q-abc 100000)"; ok "ставка 100000 отброшена (осталась 10)" "$(P -At -c "select stake from answers where question_ref='q-abc'")" "10"
PL "$(INS q-def -5)"; ok "отрицательная ставка не создаёт строку" "$(C q-def)" "0"
PL "update answers set answer_text='h' where question_ref='q-paper-1'"; ok "игрок не правит служебную строку" "$(P -At -c "select answer_text from answers where question_ref='q-paper-1'")" "x"
echo "В1: пакет для телефона"
R=$(PQ "select player_pack_questions('bbbbbbbb-0000-0000-0000-000000000001')")
ok "видимый вопрос один (hidden скрыт)" "$(echo "$R" | python3 -c 'import sys,json; print(len(json.load(sys.stdin)))')" "1"
ok "ответ вырезан" "$(echo "$R" | python3 -c 'import sys,json; q=json.load(sys.stdin)[0]; print("correct" in q["answer"] or "display" in q["answer"] or "answer" in q["media"] or q["answer_note"] is not None)')" "False"
ok "текст и режим остались" "$(echo "$R" | python3 -c 'import sys,json; q=json.load(sys.stdin)[0]; print(q["question_text"], q["answer"]["mode"], q["media"]["question"])')" "Q1 free_text [1]"
ok "приватный пакет без сессии не отдаётся" "$(PQ "select player_pack_questions('bbbbbbbb-0000-0000-0000-000000000002')")" "[]"
P -c "insert into game_sessions values ('room','$G','bbbbbbbb-0000-0000-0000-000000000002',1)"
ok "приватный пакет активной игры отдаётся" "$(PQ "select jsonb_array_length(player_pack_questions('bbbbbbbb-0000-0000-0000-000000000002'))")" "1"
echo "В1: прямое чтение таблицы"
P -c "alter table pack_questions enable row level security"
ok "игрок напрямую вопросы не читает" "$(PQ "select count(*) from pack_questions")" "0"
ok "редактор читает" "$(EQ "select count(*) from pack_questions")" "3"
[ $FAIL = 0 ] && echo "ВСЁ ЗЕЛЁНОЕ" || { echo "ЕСТЬ ПРОВАЛЫ"; exit 1; }
