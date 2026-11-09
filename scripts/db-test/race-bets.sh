#!/usr/bin/env bash
# Реальные проверки серверной блокировки ставок (миграция 0017) на НАСТОЯЩЕМ PostgreSQL (не моки).
# Поднимает временный кластер, накатывает схему-минимум + НАСТОЯЩИЕ 0012(триггер)/0014/0015/0017, гоняет сценарии,
# в том числе гонку «ставка ↔ Старт» двумя параллельными соединениями. Запуск: bash scripts/db-test/race-bets.sh
set -u
PGBIN=${PGBIN:-/usr/lib/postgresql/16/bin}; D=${PGTMP:-/tmp/pgtest-race}; PORT=${PGPORT:-54330}; ROOT=$(cd "$(dirname "$0")/../.." && pwd)
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
create table teams(id uuid primary key default gen_random_uuid());
create table game_sessions(id text primary key, game_id uuid, round_number int, melody jsonb not null default '{}', updated_at timestamptz default now());
create table answers(id uuid primary key default gen_random_uuid(), team_id uuid not null, game_id uuid not null, question_ref text not null, round_number int not null,
  answer_text text not null default '', stake numeric, is_correct boolean, updated_at timestamptz default now(), created_at timestamptz not null default now(), unique(team_id, question_ref));
create table question_shown(id serial primary key, shown_at timestamptz);
SQL
P -f <(sed -n '/^create or replace function is_editor/,/^\$\$;/p' $M/0001_init.sql)
P -c "create or replace function answers_lock_is_correct() returns trigger language plpgsql security definer set search_path = public as \$f\$ begin if is_editor() then return new; end if; if tg_op='INSERT' then new.is_correct := null; else new.is_correct := old.is_correct; end if; return new; end; \$f\$; create trigger answers_lock_is_correct before insert or update on answers for each row execute function answers_lock_is_correct();"
P -f $M/0014_session_state_rev.sql; P -f $M/0015_answer_accepted_at.sql; [ -z "${SKIP_0017:-}" ] && P -f $M/0017_race_bets_lock.sql
P <<SQL
create role app nologin; grant usage on schema public, auth to app; grant all on all tables in schema public to app; grant execute on all functions in schema public to app; grant execute on function auth.uid() to app;
alter table answers enable row level security; create policy a_all on answers for all using (true) with check (true);
alter table game_sessions enable row level security; create policy g_sel on game_sessions for select using (true); create policy g_upd on game_sessions for update using (is_editor()) with check (is_editor());
SQL
G=11111111-1111-1111-1111-111111111111; T1=aaaaaaaa-0000-0000-0000-000000000001; T2=aaaaaaaa-0000-0000-0000-000000000002; ED=eeeeeeee-0000-0000-0000-000000000001
P -c "insert into editor_roles values ('$ED'); insert into game_sessions(id,game_id,round_number,melody) values ('room',  '$G', 2, '{\"race\":{\"stage\":\"betting\"}}');"
PL() { P -c "set role app" -c "$1"; }             # игрок (не редактор)
ED_() { P -c "set role app" -c "set test.uid='$ED'" -c "$1"; }   # редактор (проектор/пульт)
bet() { echo "insert into answers(team_id,game_id,question_ref,round_number,answer_text,stake) values ('$1','$G','q-race-${3:-2}','${3:-2}','$2',${4:-null}) on conflict (team_id,question_ref) do update set answer_text=excluded.answer_text, stake=excluded.stake, round_number=excluded.round_number"; }
Q() { P -At -c "select coalesce(string_agg(answer_text||'/'||coalesce(stake::text,'-')||'/'||coalesce(is_correct::text,'-'), ',' order by team_id),'') from answers where question_ref='q-race-2'"; }

echo "1-3. выбор до старта, смена выбора, одна собака у двух команд"
PL "$(bet $T1 1)"; PL "$(bet $T2 1)"; ok "две команды выбрали собаку 1" "$(Q)" "1/-/-,1/-/-"
PL "$(bet $T1 3)"; ok "смена выбора до старта (T1: 1→3)" "$(Q)" "3/-/-,1/-/-"
echo "игрок не может записать очки и оценку"
PL "$(bet $T1 3 2 5)"; ok "stake от игрока отброшен" "$(Q)" "3/-/-,1/-/-"
PL "update answers set stake=5, is_correct=true where team_id='$T1'"; ok "UPDATE stake/is_correct игроком не прошёл" "$(Q)" "3/-/-,1/-/-"

echo "4-6. Старт (редактор) и запросы после него"
ED_ "update game_sessions set melody='{\"race\":{\"stage\":\"running\",\"seed\":1,\"D\":42}}' where id='room'"
PL "$(bet $T1 5)"; ok "запрос после старта не меняет ставку" "$(Q)" "3/-/-,1/-/-"
PL "$(bet $T2 4)"; ok "повторный/задержанный запрос не перезаписывает" "$(Q)" "3/-/-,1/-/-"
PL "update answers set answer_text='5' where team_id='$T2'"; ok "прямой UPDATE после старта отброшен" "$(Q)" "3/-/-,1/-/-"
PL "$(bet aaaaaaaa-0000-0000-0000-000000000009 2)"; ok "новая команда после старта не создаёт ставку" "$(P -At -c "select count(*) from answers where question_ref='q-race-2'")" "2"

echo "7. редактор начисляет очки (stake/is_correct), ставка при этом не меняется"
ED_ "update answers set stake=3, is_correct=true where team_id='$T1'"; ED_ "update answers set stake=5, is_correct=true where team_id='$T2'"
ok "очки записаны редактором" "$(Q)" "3/3/true,1/5/true"
PL "$(bet $T1 1 2 5)"; ok "после начисления игрок не может поменять ни ставку, ни stake" "$(Q)" "3/3/true,1/5/true"
ED_ "$(bet $T1 3 2 3)"; ok "повторное начисление редактором идемпотентно" "$(Q)" "3/3/true,1/5/true"

echo "8. не тот раунд: ставка прошлого раунда при открытых ставках текущего"
P -c "update game_sessions set melody='{\"race\":{\"stage\":\"betting\"}}', round_number=3 where id='room'"
PL "$(bet $T1 4 2)"; ok "запоздавшая запись раунда 2 не проходит в раунде 3" "$(Q)" "3/3/true,1/5/true"
PL "$(bet $T1 4 3)"; ok "ставка раунда 3 проходит" "$(P -At -c "select answer_text from answers where question_ref='q-race-3'")" "4"
echo "9. другие раунды не затронуты"
PL "insert into answers(team_id,game_id,question_ref,round_number,answer_text,stake) values ('$T1','$G','q-abc',1,'x',7)"; ok "обычный ответ как раньше (stake не режется)" "$(P -At -c "select stake from answers where question_ref='q-abc'")" "7"

echo "10. ГОНКА: ставка и «Старт» одновременно (два соединения)"
P -c "update game_sessions set melody='{\"race\":{\"stage\":\"betting\"}}', round_number=2 where id='room'; delete from answers where question_ref='q-race-3'; update answers set answer_text='3' where team_id='$T1' and question_ref='q-race-2';"
# а) Старт взял замок первым и держит 1.5 с; ставка пришла через 0.4 с → ждёт, затем отброшена
( P -c "begin" -c "update game_sessions set melody='{\"race\":{\"stage\":\"running\"}}' where id='room'" -c "select pg_sleep(1.5)" -c "commit" >/dev/null ) &
sleep 0.4; S=$(date +%s.%N); P -c "set role app" -c "$(bet $T1 5)" >/dev/null; E=$(date +%s.%N); wait
ok "а) ставка, пришедшая ВО ВРЕМЯ старта, отброшена" "$(P -At -c "select answer_text from answers where team_id='$T1' and question_ref='q-race-2'")" "3"
ok "а) ставка реально ждала замок (>0.8 с)" "$(awk "BEGIN{print ($E-$S>0.8)?\"yes\":\"no\"}")" "yes"
# б) ставка взяла замок первой (транзакция держит 1.5 с); Старт пришёл через 0.4 с → ждёт ставку, ставка засчитана
P -c "update game_sessions set melody='{\"race\":{\"stage\":\"betting\"}}' where id='room'"
( P -c "set role app" -c "begin" -c "$(bet $T1 5)" -c "select pg_sleep(1.5)" -c "commit" >/dev/null ) &
sleep 0.4; S=$(date +%s.%N); P -c "update game_sessions set melody='{\"race\":{\"stage\":\"running\"}}' where id='room'" >/dev/null; E=$(date +%s.%N); wait
ok "б) ставка, взявшая замок до «Старта», засчитана" "$(P -At -c "select answer_text from answers where team_id='$T1' and question_ref='q-race-2'")" "5"
ok "б) «Старт» дождался ставки (>0.8 с)" "$(awk "BEGIN{print ($E-$S>0.8)?\"yes\":\"no\"}")" "yes"
# в) 30 параллельных ставок против Старта: итог строго один из двух порядков, без «полузаписей»
P -c "update game_sessions set melody='{\"race\":{\"stage\":\"betting\"}}' where id='room'; update answers set answer_text='1' where question_ref='q-race-2'"
for i in $(seq 1 30); do ( P -c "set role app" -c "$(bet $T1 $((i%5+1)))" >/dev/null 2>&1 ) & done
( sleep 0.05; P -c "update game_sessions set melody='{\"race\":{\"stage\":\"running\"}}' where id='room'" >/dev/null ) & wait
F1=$(P -At -c "select answer_text from answers where team_id='$T1' and question_ref='q-race-2'")
sleep 0.2; P -c "set role app" -c "$(bet $T1 4)" >/dev/null; F2=$(P -At -c "select answer_text from answers where team_id='$T1' and question_ref='q-race-2'")
ok "в) после старта ставка больше не меняется (было $F1)" "$F2" "$F1"
echo; if [ $FAIL = 0 ]; then echo "ВСЕ ПРОВЕРКИ ПРОШЛИ"; else echo "ЕСТЬ ПРОВАЛЫ"; exit 1; fi
