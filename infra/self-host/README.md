# Перенос на self-hosted Supabase (issue #5, вариант С)

Цель: уйти от блокировок в РФ, разместив свой Supabase на российском VPS,
не переписывая код приложения (`supabase-js` работает с self-host так же,
как с облаком — меняется только `VITE_SUPABASE_URL` и ключи).

**Прод не трогаем до последнего шага.** Всё до пункта 8 делается на новом
сервере параллельно с работающим сейчас облаком — если что-то пойдёт не
так, ничего не сломано, просто пробуем ещё раз.

Сеть текущей рабочей среды Claude Code не может подключиться к
произвольному внешнему серверу — команды на самом VPS выполняет либо
ведущий по этой инструкции, либо среда с настоящим доступом в интернет.

---

## План по дням

**День 1.** Купить VPS (Timeweb Cloud, тариф **MSK 50** — 4 ГБ RAM, 50 ГБ
NVMe, ~1080 ₽/мес; см. `infra/self-host/README.md#шаг-1`), купить/привязать
домен (поддомен существующего домена тоже подходит, например
`db.quiz-party.ru`). Прислать: IP сервера, домен.

**День 2.** Установить Docker, поднять self-hosted Supabase (шаги 2-3),
проверить, что Studio и API отвечают по IP — без домена и TLS, только
убедиться, что стек вообще жив.

**День 3.** Прогнать миграции схемы (шаг 4) + перенести данные (шаг 5) +
перенести файлы Storage (шаг 6) + завести логин редактора заново (шаг 7).

**День 4.** Домен + автоматический TLS через Caddy (шаг 8).

**День 5.** Собрать ТЕСТОВУЮ сборку приложения с `VITE_SUPABASE_URL`,
указывающим на новый сервер (шаг 9), прогнать полную тестовую игру от
лобби до финала со всеми механиками — НЕ с боевыми данными, с тестовым
пакетом. Проверить бэкапы (шаг 10).

**День 6.** Резерв на исправление того, что вылезло на тестовой игре.

**День 7 (не в день реальной игры).** Переключить прод: обновить
`VITE_SUPABASE_URL`/ключи в настройках репозитория GitHub → задеплоить.
Старый облачный проект Supabase не удалять 2-3 недели — это откат, если
что-то всплывёт уже на боевой игре.

---

## Шаг 1. Сервер

Timeweb Cloud → облачный сервер → тариф **MSK 50**, Москва, публичный IP.
После создания придёт root-пароль или SSH-ключ.

```bash
ssh root@<IP_СЕРВЕРА>
```

## Шаг 2. Docker

```bash
curl -fsSL https://get.docker.com | sh
systemctl enable --now docker
docker --version
docker compose version
```

## Шаг 3. Supabase self-host (официальный стек)

Официальный docker-compose всегда актуальнее любой скопированной вручную
копии — берём его прямо из репозитория Supabase, а не переписываем сюда:

```bash
git clone --depth 1 https://github.com/supabase/supabase
cd supabase/docker
cp .env.example .env
```

Дальше в `.env` — сгенерировать секреты (Supabase даёт готовый генератор):
```bash
# JWT_SECRET — любая случайная строка 32+ символов:
openssl rand -base64 32
```
Впиши сгенерированный `JWT_SECRET` в `.env`, затем сгенерируй `ANON_KEY` и
`SERVICE_ROLE_KEY` — инструкция и генератор ключей есть на странице
`supabase.com/docs/guides/self-hosting/docker#securing-your-services`
(ключи — обычные JWT, подписанные твоим `JWT_SECRET`, с ролями `anon` и
`service_role`).

Обязательно смени в `.env` дефолтные пароли: `POSTGRES_PASSWORD`,
`DASHBOARD_USERNAME`/`DASHBOARD_PASSWORD` (вход в Studio).

**Опционально, для экономии памяти на 4 ГБ (наш трафик крошечный, но лучше
перебдеть):** в `docker-compose.yml` можно закомментировать сервис
`realtime` — проект принципиально не использует Supabase Realtime, весь
проект держится на REST-поллинге (см. `blitzApi.ts` и комментарии в коде),
это не пригодится и просто ест память.

```bash
docker compose up -d
docker compose ps        # все сервисы должны быть healthy/running
curl http://localhost:8000/rest/v1/    # должен ответить (не обязательно 200 — не 500)
```

## Шаг 4. Схема базы — прогнать миграции проекта

Наши миграции уже лежат версионированным списком в
`supabase/migrations/*.sql` — прогоняем их по порядку, а не копируем
слепок структуры из облака (так они остаются источником правды).

```bash
# на VPS, с локальным psql-клиентом внутри контейнера Postgres:
for f in /path/to/quiz-party/supabase/migrations/*.sql; do
  echo "→ $f"
  docker compose exec -T db psql -U postgres -d postgres -f - < "$f"
done
```
(файлы миграций надо занести на сервер — `scp` из репозитория или
`git clone` самого quiz-party на сервер тоже подойдёт, репозиторий
публичный).

## Шаг 5. Данные — перенос из облака

Строка подключения к текущему облаку — в Supabase Dashboard → Project
Settings → Database → Connection string (Session pooler, порт 5432).

```bash
# ТОЛЬКО данные, без схемы (схему уже накатили миграциями на шаге 4):
pg_dump "postgresql://postgres:<ПАРОЛЬ>@<HOST_ОБЛАКА>:5432/postgres" \
  --data-only --schema=public \
  -f quiz9-data.sql

# восстановить в новый self-hosted Postgres:
docker compose exec -T db psql -U postgres -d postgres < quiz9-data.sql
```
Данных мало (база — 14 МБ на момент проверки), перенос — секунды.

## Шаг 6. Файлы Storage

Скрипт `infra/self-host/migrate-storage.mjs` в этом репозитории скачивает
все файлы из облачного Storage и заливает их в self-hosted Storage тем же
путём (bucket/путь сохраняются один в один). Понадобится
`SUPABASE_SERVICE_ROLE_KEY` облака (Dashboard → Project Settings → API) и
такой же ключ нового self-host (сгенерирован на шаге 3).

**Перед запуском** — в Studio нового self-host (Storage → New bucket)
завести бакет `quiz-media`, публичный, точно как в облаке — скрипт файлы
переносит, а сам бакет не создаёт.

`@supabase/supabase-js` уже стоит в зависимостях quiz-party — отдельно
ставить не нужно, запускать прямо из корня репозитория:
```bash
SOURCE_URL="https://tnoqixtasaxpnwuswxwb.supabase.co" \
SOURCE_KEY="<service_role ключ облака>" \
TARGET_URL="https://<твой-домен>" \
TARGET_KEY="<service_role ключ self-host>" \
node infra/self-host/migrate-storage.mjs
```
Файлов немного (199 на момент проверки, 79 МБ) — перенос — пара минут.

## Шаг 7. Логин редактора

На self-host своя таблица пользователей (`auth.users`) — email/пароль
редактора нужно завести заново через Studio (Authentication → Users →
Add user) тем же email, каким входишь сейчас.

## Шаг 8. Домен и TLS

`infra/self-host/Caddyfile` в этом репозитории — Caddy сам получает и
продлевает сертификат Let's Encrypt, конфиг из одной строчки на домен.

```bash
# на VPS, домен должен уже указывать A-записью на IP сервера:
docker run -d --name caddy --network host \
  -v /path/to/infra/self-host/Caddyfile:/etc/caddy/Caddyfile \
  -v caddy_data:/data \
  caddy:2 caddy run --config /etc/caddy/Caddyfile
```

## Шаг 9. Тестовая сборка приложения

НЕ трогая прод — локально или в отдельной ветке:
```bash
VITE_SUPABASE_URL="https://<твой-домен>" \
VITE_SUPABASE_ANON_KEY="<anon-ключ self-host>" \
npm run build
```
Открыть собранное на телефоне БЕЗ VPN, прогнать тестовый пакет от лобби
до финала — все механики хотя бы по разу.

## Шаг 10. Бэкапы (обязательно перед боевым переключением)

На self-host бэкапы — наша забота (на бесплатном облачном тарифе их и
так не было, см. предыдущий разбор issue #5, но self-host без НИКАКИХ
бэкапов — реальный риск данных, не теоретический).

```bash
# простой ежедневный дамп по cron на самом VPS:
0 4 * * * docker compose -f /path/to/supabase/docker/docker-compose.yml \
  exec -T db pg_dump -U postgres postgres | gzip > /backups/db-$(date +\%F).sql.gz
```
Хранить бэкапы **не на этом же сервере** (скачивать на свою машину раз в
неделю, или заливать в дешёвое S3-совместимое хранилище) — бэкап на том
же диске, что и сама база, не переживёт отказа диска.

## Шаг 11. Переключение прода

GitHub → Settings → Secrets and variables → Actions → обновить
`VITE_SUPABASE_URL` и `VITE_SUPABASE_ANON_KEY` на новые → запустить деплой
(Actions → deploy → Run workflow) → проверить версию в собранном `docs/`
как обычно.

Старый Supabase-проект (`tnoqixtasaxpnwuswxwb`) не удалять 2-3 недели —
запасной путь назад, если на первой боевой игре после переезда что-то
всплывёт.
