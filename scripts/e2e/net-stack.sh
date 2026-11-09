#!/usr/bin/env bash
# Тестовый backend для сквозных проверок: НАСТОЯЩИЕ Postgres (образ Supabase) + PostgREST + GoTrue в docker, миграции репозитория 0001–0017,
# шлюз /rest/v1 и /auth/v1 (как Kong) и статика собранного приложения. Живая база и её данные не затрагиваются: всё локально, ключи тестовые.
# usage: bash scripts/e2e/net-stack.sh up | down      затем: NODE_PATH=$(npm root -g) node e2e/bulldog/net.cjs <outDir>
# Нужны: docker (демон: `dockerd &`), образы supabase/postgres:15.8.1.085, supabase/gotrue:v2.158.1, postgrest/postgrest:v12.2.3 (тянутся сами; Docker Hub
# иногда отвечает 429 — повторить через минуту), psql, node, playwright. Занимает порты 5432, 54321 (шлюз), 54341, 54342, 5301 (статика).
set -u
R=$(cd "$(dirname "$0")/../.." && pwd); PW=testpw_e2e_only; S=super-secret-jwt-token-with-at-least-32-characters-long-e2e
case "${1:-up}" in
down) docker rm -f qp-pg qp-rest qp-auth >/dev/null 2>&1; pkill -f scripts/e2e/gateway.cjs; pkill -f scripts/e2e/static.cjs; echo stopped ;;
up)
  docker rm -f qp-pg qp-rest qp-auth >/dev/null 2>&1
  docker run -d --name qp-pg --network host -e POSTGRES_PASSWORD=$PW supabase/postgres:15.8.1.085 >/dev/null
  until PGPASSWORD=$PW psql -h 127.0.0.1 -U supabase_admin -d postgres -c 'select 1' >/dev/null 2>&1; do sleep 2; done
  export PGPASSWORD=$PW
  for f in $(ls $R/supabase/migrations/*.sql | grep -v verify | sort); do psql -h 127.0.0.1 -U postgres -d postgres -q -f $f >/dev/null 2>&1 || echo "миграция $(basename $f): были ошибки (0001: storage.buckets другой версии — на игру не влияет)"; done
  docker run -d --name qp-rest --network host -e PGRST_DB_URI="postgres://authenticator:$PW@127.0.0.1:5432/postgres" -e PGRST_DB_SCHEMAS=public -e PGRST_DB_ANON_ROLE=anon -e PGRST_JWT_SECRET=$S -e PGRST_SERVER_PORT=54341 -e PGRST_DB_POOL=20 postgrest/postgrest:v12.2.3 >/dev/null
  docker run -d --name qp-auth --network host -e GOTRUE_API_HOST=127.0.0.1 -e GOTRUE_API_PORT=54342 -e API_EXTERNAL_URL=http://127.0.0.1:54321 -e GOTRUE_DB_DRIVER=postgres -e GOTRUE_DB_DATABASE_URL="postgres://supabase_auth_admin:$PW@127.0.0.1:5432/postgres" -e GOTRUE_SITE_URL=http://127.0.0.1:5301 -e GOTRUE_JWT_SECRET=$S -e GOTRUE_JWT_EXP=36000 -e GOTRUE_JWT_AUD=authenticated -e GOTRUE_DISABLE_SIGNUP=false -e GOTRUE_EXTERNAL_EMAIL_ENABLED=true -e GOTRUE_MAILER_AUTOCONFIRM=true supabase/gotrue:v2.158.1 >/dev/null
  until curl -s http://127.0.0.1:54341/ >/dev/null && curl -s http://127.0.0.1:54342/health >/dev/null; do sleep 2; done
  (nohup node $R/scripts/e2e/gateway.cjs > /tmp/gateway.log 2>&1 &); sleep 1
  ANON=$(node $R/scripts/e2e/keys.cjs $S anon); echo "ANON=$ANON" > /tmp/e2e.env; echo "SRV=$(node $R/scripts/e2e/keys.cjs $S service_role)" >> /tmp/e2e.env
  curl -s -X POST http://127.0.0.1:54321/auth/v1/signup -H "apikey: $ANON" -H 'content-type: application/json' -d '{"email":"host@e2e.test","password":"e2e-host-pass-1"}' >/dev/null
  psql -h 127.0.0.1 -U postgres -d postgres -q -f $R/scripts/e2e/seed.sql
  (cd $R && VITE_SUPABASE_URL=http://127.0.0.1:54321 VITE_SUPABASE_ANON_KEY=$ANON npx vite build --outDir /tmp/e2edist --emptyOutDir >/dev/null 2>&1)
  (nohup node $R/scripts/e2e/static.cjs /tmp/e2edist 5301 > /tmp/static.log 2>&1 &)
  echo "стек поднят: шлюз http://127.0.0.1:54321, приложение http://127.0.0.1:5301/quiz-party/" ;;
esac
