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
create table teams(id uuid primary key default gen_random_uuid(), game_id uuid);
create table game_sessions(id text primary key, game_id uuid, round_number int, melody jsonb not null default '{}', updated_at timestamptz default now());
create table answers(id uuid primary key default gen_random_uuid(), team_id uuid not null references teams(id) on delete cascade, game_id uuid not null, question_ref text not null, round_number int not null,
  answer_text text not null default '', stake numeric, is_correct boolean, updated_at timestamptz default now(), created_at timestamptz not null default now(), unique(team_id, question_ref));
create table question_shown(id serial primary key, shown_at timestamptz);
SQL
P -f <(sed -n '/^create or replace function is_editor/,/^\$\$;/p' $M/0001_init.sql)
P -c "create or replace function answers_lock_is_correct() returns trigger language plpgsql security definer set search_path = public as \$f\$ begin if is_editor() then return new; end if; if tg_op='INSERT' then new.is_correct := null; else new.is_correct := old.is_correct; end if; return new; end; \$f\$; create trigger answers_lock_is_correct before insert or update on answers for each row execute function answers_lock_is_correct();"
P -f $M/0014_session_state_rev.sql; P -f $M/0015_answer_accepted_at.sql; [ -n "${UPGRADE_FROM:-}" ] && P -f "$UPGRADE_FROM" 2>/dev/null   # режим «на базе уже прогнана ранняя версия»: сначала она, потом исправленная
[ -z "${SKIP_0017:-}" ] && P -f "${MIG_0017:-$M/0017_race_bets_lock.sql}"
P <<SQL
create role app nologin; grant usage on schema public, auth to app; grant all on all tables in schema public to app; grant execute on all functions in schema public to app; grant execute on function auth.uid() to app;
alter table answers enable row level security;
create policy answers_select on answers for select using (true); create policy answers_insert on answers for insert with check (true);
create policy answers_update on answers for update using (true) with check (true); create policy answers_delete on answers for delete using (is_editor());
alter table game_sessions enable row level security; create policy g_sel on game_sessions for select using (true); create policy g_upd on game_sessions for update using (is_editor()) with check (is_editor());
SQL
G=11111111-1111-1111-1111-111111111111; T1=aaaaaaaa-0000-0000-0000-000000000001; T2=aaaaaaaa-0000-0000-0000-000000000002; ED=eeeeeeee-0000-0000-0000-000000000001
P -c "insert into teams(id,game_id) values ('$T1','$G'),('$T2','$G'),('aaaaaaaa-0000-0000-0000-000000000009','$G'),('aaaaaaaa-0000-0000-0000-00000000000a','22222222-2222-2222-2222-222222222222'); insert into editor_roles values ('$ED'); insert into game_sessions(id,game_id,round_number,melody) values ('room',  '$G', 2, '{\"race\":{\"stage\":\"betting\"}}');"
PL() { P -c "set role app" -c "$1"; }             # игрок (не редактор)
ED_() { P -c "set role app" -c "set test.uid='$ED'" -c "$1"; }   # редактор (проектор/пульт)
bet() { echo "insert into answers(team_id,game_id,question_ref,round_number,answer_text,stake) values ('$1','$G','q-race-${3:-2}','${3:-2}','$2',${4:-null}) on conflict (team_id,question_ref) do update set answer_text=excluded.answer_text, stake=excluded.stake, round_number=excluded.round_number"; }
Q() { P -At -c "select coalesce(string_agg(answer_text||'/'||coalesce(stake::text,'-')||'/'||coalesce(is_correct::text,'-'), ',' order by team_id),'') from answers where question_ref='q-race-2'"; }

echo "0. проверочный SQL миграции (0017_race_bets_lock_verify.sql) видит исправленную версию"
ok "verify: trigger_ok|covers_delete|covers_update|checks_old_row|security_definer" "$(P -At -f $M/0017_race_bets_lock_verify.sql | head -1)" "${EXPECT_VERIFY:-t|t|t|t|t}"
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

echo; echo "═══ НЕГАТИВНЫЕ ТЕСТЫ: обходы защиты (реальные права игрока без входа; политики answers — как в 0005) ═══"
T3=aaaaaaaa-0000-0000-0000-000000000009; T4=aaaaaaaa-0000-0000-0000-00000000000a; G2=22222222-2222-2222-2222-222222222222
RESET() { P -c "delete from answers; update game_sessions set melody='{\"race\":{\"stage\":\"betting\"}}', round_number=2, game_id='$G' where id='room';" >/dev/null; }
SNAP() { P -At -c "select coalesce(string_agg(team_id::text||'|'||question_ref||'|'||round_number||'|'||game_id||'|'||answer_text||'|'||coalesce(stake::text,'-')||'|'||coalesce(is_correct::text,'-'), ' ; ' order by team_id, question_ref),'') from answers"; }
START() { ED_ "update game_sessions set melody='{\"race\":{\"stage\":\"running\",\"seed\":1,\"D\":42}}' where id='room'"; }
# батарея атак игрока НА СУЩЕСТВУЮЩУЮ ставку T1 (race-2). Каждая должна оставить снимок БЕЗ изменений.
ATTACKS=(
 "update answers set question_ref='q-x', stake=5 where team_id='$T1' and question_ref='q-race-2'"
 "update answers set question_ref='q-x' where team_id='$T1' and question_ref='q-race-2'"
 "update answers set question_ref='q-x', answer_text='5', stake=5, is_correct=true where team_id='$T1' and question_ref='q-race-2'"
 "update answers set team_id='$T3' where team_id='$T1' and question_ref='q-race-2'"
 "update answers set game_id='$G2' where team_id='$T1' and question_ref='q-race-2'"
 "update answers set round_number=3 where team_id='$T1' and question_ref='q-race-2'"
 "update answers set round_number=3, question_ref='q-race-3', answer_text='5' where team_id='$T1' and question_ref='q-race-2'"
 "update answers set team_id='$T3', game_id='$G2', round_number=9, question_ref='q-y', answer_text='5', stake=5 where team_id='$T1' and question_ref='q-race-2'"
 "update answers set stake=5 where team_id='$T1' and question_ref='q-race-2'"
 "update answers set is_correct=true, stake=5 where team_id='$T1' and question_ref='q-race-2'"
 "update answers set id=gen_random_uuid(), created_at=now()-interval '1 day' where team_id='$T1' and question_ref='q-race-2'"
 "delete from answers where team_id='$T1' and question_ref='q-race-2'"
 "delete from answers where question_ref like 'q-race-%'"
 "delete from answers"
 "update answers set answer_text='5' where question_ref='q-abc' and team_id='$T1'; update answers set question_ref='q-race-2', round_number=2, stake=5 where question_ref='q-abc' and team_id='$T1'"
)
attack_all() { local n=0; for a in "${ATTACKS[@]}"; do n=$((n+1)); P -c "set role app" -c "$a" >/dev/null 2>&1; done; }
race_snap() { P -At -c "select coalesce(string_agg(team_id::text||'|'||question_ref||'|'||round_number||'|'||game_id||'|'||answer_text||'|'||coalesce(stake::text,'-')||'|'||coalesce(is_correct::text,'-'), ' ; ' order by team_id),'') from answers where question_ref like 'q-race-%'"; }

echo "A. атаки на существующую ставку ПОСЛЕ старта (UPDATE question_ref+stake, team/game/round, DELETE)"
SEED_A() { RESET; PL "$(bet $T1 3)"; PL "$(bet $T2 1)"; PL "insert into answers(team_id,game_id,question_ref,round_number,answer_text) values ('$T1','$G','q-abc',1,'norm')"; START; }
for k in "${!ATTACKS[@]}"; do SEED_A; B0=$(race_snap); P -c "set role app" -c "${ATTACKS[$k]}" >/dev/null 2>&1; ok "A$((k+1)) после старта: ${ATTACKS[$k]:0:90}" "$(race_snap)" "$B0"; done

echo "B. те же атаки ВО ВРЕМЯ приёма ставок (выбор открыт): ставка может меняться ТОЛЬКО по тексту, личность строки и очки — нет"
RESET; PL "$(bet $T1 3)"; PL "$(bet $T2 1)"; BB0=$(race_snap)
BI0=$(P -At -c "select coalesce(string_agg(team_id::text||'|'||question_ref||'|'||round_number||'|'||game_id||'|'||coalesce(stake::text,'-')||'|'||coalesce(is_correct::text,'-'), ' ; ' order by team_id),'') from answers where question_ref like 'q-race-%'")
for k in 0 1 2 3 4 5 6 7 8 9 10 11 12 13; do P -c "set role app" -c "${ATTACKS[$k]}" >/dev/null 2>&1; done
ident() { P -At -c "select coalesce(string_agg(team_id::text||'|'||question_ref||'|'||round_number||'|'||game_id||'|'||coalesce(stake::text,'-')||'|'||coalesce(is_correct::text,'-'), ' ; ' order by team_id),'') from answers where question_ref like 'q-race-%'"; }
ok "B. после 14 атак при открытых ставках личность и очки ставок T1/T2 целы (менять можно только текст)" "$(ident)" "$BI0"
PL "$(bet $T1 4)"; ok "B. легитимная смена текста при открытых ставках работает" "$(P -At -c "select answer_text from answers where team_id='$T1' and question_ref='q-race-2'")" "4"
PL "update answers set answer_text='5', question_ref='q-race-2' where team_id='$T1' and question_ref='q-race-2'"; ok "B. UPDATE текста напрямую (не upsert) при открытых ставках — работает" "$(P -At -c "select answer_text from answers where team_id='$T1' and question_ref='q-race-2'")" "5"

echo "C. смешение раундов: ставка раунда 2 при текущем раунде 3 в приёме ставок"
RESET; PL "$(bet $T1 3)"; P -c "update game_sessions set melody='{\"race\":{\"stage\":\"betting\"}}', round_number=3 where id='room'" >/dev/null
PL "insert into answers(team_id,game_id,question_ref,round_number,answer_text) values ('$T1','$G','q-race-2',3,'5') on conflict (team_id,question_ref) do update set answer_text=excluded.answer_text, round_number=excluded.round_number"
ok "C1. upsert 'q-race-2' с round_number=3 не меняет ставку раунда 2" "$(P -At -c "select answer_text||'/'||round_number from answers where team_id='$T1' and question_ref='q-race-2'")" "3/2"
PL "insert into answers(team_id,game_id,question_ref,round_number,answer_text) values ('$T3','$G','q-race-2',3,'5')"
ok "C2. новая строка с ref раунда 2 и round_number=3 не создаётся" "$(P -At -c "select count(*) from answers where team_id='$T3'")" "0"
PL "update answers set answer_text='5', round_number=3 where team_id='$T1' and question_ref='q-race-2'"
ok "C3. UPDATE текста+round_number под открытый раунд 3 не меняет ставку раунда 2" "$(P -At -c "select answer_text||'/'||round_number from answers where team_id='$T1' and question_ref='q-race-2'")" "3/2"
PL "$(bet $T3 2 3)"; ok "C4. своя ставка раунда 3 (ref совпадает с раундом) принимается" "$(P -At -c "select answer_text from answers where team_id='$T3' and question_ref='q-race-3'")" "2"

echo "D. принадлежность: ставка в чужую игру, чужая команда"
RESET
PL "insert into answers(team_id,game_id,question_ref,round_number,answer_text) values ('$T4','$G','q-race-2',2,'2')"
ok "D1. команда игры G2 не может поставить в игру G (teams.game_id ≠ game_id)" "$(P -At -c "select count(*) from answers where team_id='$T4'")" "0"
PL "insert into answers(team_id,game_id,question_ref,round_number,answer_text) values ('$T1','$G2','q-race-2',2,'2')"
ok "D2. ставка с game_id чужой игры не создаётся" "$(P -At -c "select count(*) from answers where team_id='$T1'")" "0"

echo "E. DELETE: RLS отказывает игроку; триггер защищает и при появлении ЛЮБОЙ разрешающей политики (политики складываются по «или»)"
RESET; PL "$(bet $T1 3)"; PL "$(bet $T2 1)"; E0=$(race_snap)
PL "delete from answers where team_id='$T1'"; ok "E1. игрок не может удалить ставку до старта (RLS answers_delete)" "$(race_snap)" "$E0"
P -c "create policy tmp_open_delete on answers for delete using (true)" >/dev/null
PL "delete from answers where team_id='$T1' and question_ref='q-race-2'"; ok "E2. даже при разрешающей политике DELETE ставка до старта не удаляется (триггер)" "$(race_snap)" "$E0"
P -c "drop policy tmp_open_delete on answers" >/dev/null; RESET; PL "$(bet $T1 3)"; PL "$(bet $T2 1)"; E0=$(race_snap); P -c "create policy tmp_open_delete on answers for delete using (true)" >/dev/null
START; PL "delete from answers where question_ref='q-race-2'"; ok "E3. и после старта" "$(race_snap)" "$E0"
PL "insert into answers(team_id,game_id,question_ref,round_number,answer_text) values ('$T1','$G','q-abc',1,'z')"; PL "delete from answers where question_ref='q-abc'"
ok "E4. обычные ответы других раундов при той же политике удаляются как раньше (поведение не менялось)" "$(P -At -c "select count(*) from answers where question_ref='q-abc'")" "0"
ED_ "delete from answers where team_id='$T2' and question_ref='q-race-2'"; ok "E5. редактор (ведущий) удаляет ставку — разрешено (сброс игры)" "$(P -At -c "select count(*) from answers where team_id='$T2' and question_ref='q-race-2'")" "0"
P -c "drop policy tmp_open_delete on answers" >/dev/null
ED_ "delete from teams where id='$T1'"; ok "E6. каскад: удаление команды редактором убирает её ставки (reset игры не сломан)" "$(P -At -c "select count(*) from answers where team_id='$T1'")" "0"
P -c "insert into teams(id,game_id) values ('$T1','$G') on conflict do nothing" >/dev/null

echo "F. повторные запросы и параллельные атаки после старта"
RESET; PL "$(bet $T1 3)"; PL "$(bet $T2 1)"; START; F0=$(race_snap)
attack_all; attack_all; ok "F1. две полные батареи атак подряд — состояние то же" "$(race_snap)" "$F0"
for i in $(seq 1 12); do for k in 0 2 5 7 11 13; do ( P -c "set role app" -c "${ATTACKS[$k]}" >/dev/null 2>&1 ) & done; ( P -c "set role app" -c "$(bet $T1 $((i%5+1)))" >/dev/null 2>&1 ) & done; wait
ok "F2. 84 параллельных атак после старта — ставки не изменились" "$(race_snap)" "$F0"
# параллельно с «Стартом»: атаки на текст/личность во время смены стадии — итог один из двух допустимых порядков, личность строки цела
RESET; PL "$(bet $T1 3)"; PL "$(bet $T2 1)"
for i in $(seq 1 20); do for k in 0 3 5 11; do ( P -c "set role app" -c "${ATTACKS[$k]}" >/dev/null 2>&1 ) & done; done
( sleep 0.03; START ) & wait
ok "F3. личность и очки ставок T1/T2 после гонки атак со «Стартом» не изменились" "$(P -At -c "select count(*) from answers where question_ref='q-race-2' and game_id='$G' and round_number=2 and stake is null and team_id in ('$T1','$T2')")" "2"

echo "G. другие раунды: обычные ответы работают как раньше"
RESET
PL "insert into answers(team_id,game_id,question_ref,round_number,answer_text,stake) values ('$T1','$G','q-n1',1,'a',7)"; ok "G1. INSERT со stake не режется" "$(P -At -c "select stake from answers where question_ref='q-n1'")" "7"
PL "update answers set answer_text='b', stake=8 where question_ref='q-n1'"; ok "G2. UPDATE текста и stake как раньше" "$(P -At -c "select answer_text||'/'||stake from answers where question_ref='q-n1'")" "b/8"
PL "update answers set question_ref='q-n2', round_number=4 where question_ref='q-n1'"; ok "G3. обычный ответ можно перенести на другой обычный ref (как раньше, не затрагивается)" "$(P -At -c "select question_ref||'/'||round_number from answers where team_id='$T1'")" "q-n2/4"
START; PL "update answers set answer_text='c' where question_ref='q-n2'"; ok "G4. обычный ответ меняется и при идущей гонке" "$(P -At -c "select answer_text from answers where question_ref='q-n2'")" "c"
PL "update answers set question_ref='q-race-2', round_number=2 where question_ref='q-n2'"; ok "G5. но превратить обычный ответ в «ставку» во время гонки нельзя" "$(P -At -c "select question_ref from answers where team_id='$T1'")" "q-n2"
ok "G6. ответ другого игрока другого раунда не затронут" "$(P -At -c "select count(*) from answers")" "1"

echo "I. доверенные роли (SQL Editor / service_role / суперпользователь — вне RLS) работают как раньше"
RESET; PL "$(bet $T1 3)"; P -c "update answers set stake=4, answer_text='3' where team_id='$T1' and question_ref='q-race-2'" >/dev/null
ok "I1. ручное исправление очков (stake) из SQL Editor проходит" "$(P -At -c "select stake from answers where team_id='$T1' and question_ref='q-race-2'")" "4"
P -c "delete from answers where question_ref='q-race-2'" >/dev/null; ok "I2. ручное удаление ставки из SQL Editor проходит" "$(P -At -c "select count(*) from answers where question_ref='q-race-2'")" "0"

echo "H. ИЗВЕСТНЫЙ РИСК (не закрыт, by design — нет входа игроков): чужую ставку при открытом приёме может изменить любой, кто знает team_id"
RESET; PL "$(bet $T1 3)"; PL "update answers set answer_text='5' where team_id='$T1' and question_ref='q-race-2'"
echo "  ℹ ставка T1 после «чужого» UPDATE: $(P -At -c "select answer_text from answers where team_id='$T1' and question_ref='q-race-2'") (документировано; после «Старта» это уже невозможно — см. A/F)"

echo; if [ $FAIL = 0 ]; then echo "ВСЕ ПРОВЕРКИ ПРОШЛИ"; else echo "ЕСТЬ ПРОВАЛЫ"; exit 1; fi
