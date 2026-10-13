# Статус Френка (Bulldog №1) на 13.10.2026

Архитектура **B**: две опорные стойки. FRONT_STAND (экран выбора, IDLE, SELECTED, самый первый старт) и RACE_STAND (стойка для остановок и событий внутри гонки).
У Френка свой ракурс: исходная стойка анфас, бег вправо. Геометрия №4 не переносится.

| Состояние | Статус | Файл / источник |
|---|---|---|
| FRONT_STAND | утверждён | кадр #0 `bulldog_01_run.mp4` (совпадает с первым кадром IDLE и SELECTED, разница 0,33/255) |
| IDLE, SELECTED | исходники есть, не менялись | `assets/sources/bulldog_01_idle.mp4`, `bulldog_01_selected.mp4` (IDLE не бесшовный цикл; SELECTED заканчивается возбуждённой позой, а не стойкой) |
| **RACE_STAND** | **утверждена v3** | `assets/approved/DOG1_RACE_STAND_v3_2720x1536.png` (SHA `83214715…ee07`); стойка на плите для STOP/событий: `assets/approved/DOG1_STOP_END.png` |
| **START первый** (FRONT_STAND → бег) | **принят как рабочий (13.10.2026)**: alpha, хореография и стык с RUN согласованы; визуальные дефекты остаются в KNOWN_ISSUES | `assets/approved/DOG1_FIRST_START_alpha_src25-63.webm` (кадры #25–63 оригинала) + `DOG1_FRONT_STAND_alpha_frame0.png`; стык #63→#87: IoU 0,796, цвет 25,1. Отчёт `plans/FIRST_START_REPORT.md` |
| RUN цикл | утверждён **#87–98** (12 кадров = 0,5 с) | `dog1-run-alpha.webm` #87–98 (шов #98→#87 IoU 0,805) |
| **STOP** | **утверждён v1, вариант A (полный)** | `assets/approved/DOG1_STOP_v1_kling_source.mp4` (SHA `30c05890…edf5`, 73 кадра) и `DOG1_STOP_v1_alpha.webm` (SHA `9b2a45bc…113f`) |
| **RACE_START (RACE_STAND → RUN)** | **РАБОЧИЙ вариант: gen3 (принят пользователем 13.10.2026 как рабочий, финальная приёмка зависит от проверки на реальной дорожке)** | `race_start_working/RACE_START_WORKING.md` + `.json`; состав: вход V1 f1,f7–f11,f16 → gen3 f2–f37 → RUN #90–98 → цикл #87–98, 43 кадра = 1,79 с; источник gen3 `race_start_gen3/DOG1_RACE_START_gen3_kling_source.mp4` (SHA `772d432d…9d08`, не менялся), alpha `DOG1_RACE_START_gen3_alpha.webm` |
| RACE_START V1 | **архив** (не принят: подкрадывание ≈1,2 с, ритм 9, рывок с тёмным лицом); кадры f1–f16 используются как вход рабочего варианта | `race_start_v1/`, `plans/RACE_START_V1_REPORT.md`, `plans/RACE_START_V1_SALVAGE_REPORT.md`; запасной гибрид V3 (f1–49 → #90) в `race_start_v1_salvage/` |
| RACE_START V2 | **архив** (не принят: присед и прищур вернулись, лапы скользят) | `race_start_v2/`, `plans/RACE_START_V2_REPORT.md`, подготовка `race_start_v2_prep/` (START f16 используется и в gen3) |
| Проверка на дорожке | выполнена (диагностика, V3 не менялась) | `track_diag/`, `plans/TRACK_DIAGNOSTIC_REPORT.md`; предложение контракта координат `plans/COORDINATE_CONTRACT_PROPOSAL.md` |
| **BUTTERFLY** | **V1 сгенерирован 13.10.2026 (30 кредитов), пригоден как рабочий кандидат, ждёт решения**: возврат в стойку IoU 0,997, лапы не скользят, смещение 0; дефекты: насекомое от Kling (вырезано), двойной подъём дальней лапы, взгляд слабо читается на 207 px | `plans/BUTTERFLY_V1_REPORT.md`, `butterfly_v1/` (оригинал SHA `694436b6…f956c`, alpha, превью, трассировка взгляда и насекомого), `butterfly_v1/BUTTERFLY_TRAJECTORY_PROPOSAL.md` |
| SNIFF_PEE, RETURN, ROLL | не начаты | см. контракт `../docs/bulldog-race/ANIMATION_CONTRACT.md` |
| FINISH | не начат | сначала проверить повторное использование STOP |
| Alpha-конвейер | восстановлен и сохранён; `--floor-shadow` по умолчанию выключена | `alpha_pipeline/` |

Цепочка рабочего варианта: `RUN loop (последний проход до #96) → STOP f1–f73 → RACE_STAND → вход V1 f1,f7–f11,f16 → gen3 f2–f37 → RUN #90–98 → цикл #87–98`.

## Известные допустимые недостатки рабочего RACE_START (подробно — `KNOWN_ISSUES.md`)
прищур и потемнение морды ≈0,3 с (gen3 f7–f13); опорная передняя лапа скользит назад на 14 px холста к толчку и до 22 px к f12; разница оттенка с RUN: ΔE 2,1–3,3 (кратно меньше уже утверждённого шага стойка → RUN, ΔE 6,8; коррекция не нужна); неидеальная фаза шва gen3 f37 → RUN #90 (шаг −2,7 px); STOP несёт +17 px холста запечённого перемещения.

## Потрачено кредитов Kling
108 из 429 (остаток **321**): RACE_STAND ×3 (по 2), STOP (18), RACE_START V1 (18), V2 (18), gen3 (18), BUTTERFLY V1 (30). Новых генераций RACE_START нет без отдельного согласования. Детали — `KLING_LOG.md`.

## Следующий шаг (ожидает согласования)
1. Решение по BUTTERFLY V1 (`plans/BUTTERFLY_V1_REPORT.md`): принять как рабочий / повторить.
2. Контракт координат принят в принципах и сохранён для Codex; профиль N3 (разгон 0,54 с) предпочтителен для тестов, но не утверждён как настройка физики: смена времени разгона требует отдельной проверки влияния на аналитическое движение и результаты гонки.
3. После согласования BUTTERFLY: SNIFF_PEE(+RETURN) → ROLL → FINISH, каждый отдельным этапом (автоматически не начинаю).
