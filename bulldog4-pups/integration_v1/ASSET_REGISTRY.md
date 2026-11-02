# Пупс (dog4) — реестр игровых ассетов (02.11.2026)
Все пути — от корня репозитория. Полные SHA-256 и размеры — в `bulldog4-pups/MANIFEST.json`; проверяются `tools/check_package.py` (результат `results/check_package.json`: 25 файлов, все совпали). Файлы в пакет не копировались и не перекодировались — пакет ссылается на них там, где они утверждены.

## Экран выбора (полный кадр 1276×720 анфас, 24 к/с)
| состояние | игровой файл | формат | кадры | статус |
|---|---|---|---|---|
| FRONT_STAND G0 | `bulldog4-pups/front_stand_g0/G0_FRONT_STAND_alpha_1276.png` | PNG RGBA | 1 | принято |
| IDLE G1 | `bulldog4-pups/idle_loop_v1/alpha/DOG4_IDLE_v1_alpha_loop240.webm` | WebM VP9 + alpha | 240 (10,0 с), цикл | принято |
| SELECTED v4 | `bulldog4-pups/selected_v4_game/alpha/DOG4_SELECTED_v4_alpha_s0-s120.webm` | WebM VP9 + alpha | 121 (5,04 с), один раз | принято |
| RETURN_TO_IDLE | — | — | — | не нужен (SELECTED кончается в G0) |
| логика выбора | `bulldog4-pups/integration_v1/runtime/dog4_selection.mjs`, ворота — `MANIFEST.json → selection.policy.gates` | ES-модуль | — | принято (правило), модуль сверен с лабораторией |

Исходники (не для игры, не меняются): `bulldog4-pups/idle_g1/DOG4_IDLE_G1_kling_original.mp4`, `bulldog4-pups/selected_g2v4/DOG4_SELECTED_G2v4_kling_original.mp4`, `bulldog4-pups/front_stand_g0/G0_FRONT_STAND_studio_1276.png`.

## Гонка (атлас Race V3: ячейка 178×100, 24 в ряд, рисуется спрайтом 207×116)
Атлас: `dog4-v3-lab/manifest.json`, раскладка `dog4-v3-lab/layout.json`, кадровый контракт `race-v3-p3-lab/characters/dog4.contract.json`. Побайтная копия PNG — `race-v3-frenk-lab/dog4assets/` (все 9 файлов совпадают по SHA, проверено 02.11).

| состояние | игровой файл (атлас) | кадры | alpha-мастер 1276×720 (ветка Codex : файл) | статус |
|---|---|---|---|---|
| RACE_STAND (BASE) | `dog4-v3-lab/assets/base.png` | 1 | `codex/dog4-run-reference-20261012:DOG4_BASE_STAND.png` (RGB, без alpha; кадр = START f0) | принято |
| START | `dog4-v3-lab/assets/start.png` | 40 | `codex/bulldog4-technical-audit-20261009:dog4-start-alpha.webm` | принято (тайминг рабочий) |
| RUN | `dog4-v3-lab/assets/run.png` | 23 | `preview/bulldog-04-alpha-20261008:dog4-run-alpha.webm` (81 кадр, в игре #0–22) | alpha принята, цикл #11–22 рабочий |
| STOP | `dog4-v3-lab/assets/stop.png` | 37 | `codex/dog4-stop-asset-20261012:dog4_stop_alpha.webm` | принято |
| FINISH | = `stop.png`, затем `base.png` | 37 + BASE 1,5 с | — | рабочий |
| SNIFF_PEE | `dog4-v3-lab/assets/sniff_pee.png` | 229 | `codex/dog4-final-timing-20261012:dog4_sniff_pee_optimized_alpha.webm` (229 + 1 повтор для VFR) | движение принято, тайминг рабочий |
| RETURN (часть SNIFF_PEE) | `dog4-v3-lab/assets/return.png` | 109 | `codex/dog4-return-montage-20261012:dog4_return_A_alpha.webm` | рабочий |
| BUTTERFLY | `dog4-v3-lab/assets/butterfly.png` | 121 | `codex/dog4-butterfly-20261013:dog4_butterfly_alpha.webm` (бабочка вырезана маской) | рабочий |
| ROLL | `dog4-v3-lab/assets/roll.png` | 145 | `codex/dog4-roll-alpha-20261013:dog4_roll_alpha.webm` | хореография принята, стыки рабочие |
| фон арены (не собака) | `dog4-v3-lab/assets/arena.png` | — | — | арена V3, к пакету собаки не относится |

Все атласы — PNG RGBA, сетка совпадает с числом кадров, пустых ячеек нет, углы прозрачные; число кадров = контракт V3 = диапазон `frameFor` в `dog4-v3-lab/model.mjs`. Все alpha-мастера: VP9 + alpha, 1276×720, 24 к/с (у VFR-вариантов START/RETURN из `final-timing` таймкоды переменные, в игре используется атлас). SHA мастеров совпали с аудитом 23.10.

## Проверка и демо
* `tools/check_package.py` → `results/check_package.json` — файлы, форматы, атлас, контракт, якоря.
* `tools/check_selection_logic.mjs` → `results/selection_logic_check.json` — модуль выбора против лаборатории на всех 240 кадрах.
* `results/race_v3_tests_rerun.json` — повтор валидатора V3 и тестов P3 (в копии).
* `demo/DOG4_DEMO_selection_pick_f40.mp4`, `demo/DOG4_DEMO_race_states_inplace.mp4` — короткие демо из файлов пакета.
