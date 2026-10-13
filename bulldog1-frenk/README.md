# Bulldog №1 — Френк: рабочий архив Claude Code

Точка входа для любого агента или человека, который продолжает работу над Френком. Это снимок на **13.10.2026**.
Параллельный архив Bulldog Race/V3/№4 (Codex) — в `../docs/bulldog-race/` (начните с его `README.md` и `RECOVERY.md`). Здесь только Френк и общий alpha-конвейер.
Эта папка ничего не меняет в игре, production, `docs/`, V3 и ассетах №4.

## Что где
| Путь | Что |
|---|---|
| `STATUS.md` | что готово, что утверждено, что следующее (читать первым) |
| `DECISIONS.md` | решения пользователя и почему так (чтобы не пересматривать заново) |
| `KLING_LOG.md` | каждая генерация Kling: модель, параметры, дословные промпты, ID, стоимость, итог |
| `KNOWN_ISSUES.md` | известные дефекты исходников и открытые риски |
| `MANIFEST.json` | клипы, SHA-256, FPS, кадры, статусы приёмки |
| `plans/RACE_START_*` | RACE_START: планы (v1, v2), отчёты V1/V2/gen3, координаты; **рабочий вариант gen3** — `race_start_working/` |
| `plans/START_FRAMES_25_39_PLAN.md` | очистка кадров #25–39 исходного START (пробный прогон есть, пакетный нет) |
| `plans/*first_version*`, `plans/STOP_prepare_notes.md` | подготовительные документы RACE_STAND и STOP, как были согласованы |
| `race_start_working/` | рабочий RACE_START (gen3): состав, параметры переходов, массивы компенсации |
| `track_diag/` | изолированный проигрыватель Френка на дорожке по физике V3 (адаптер, метрики, видео) |
| `plans/BUTTERFLY_PLAN.md`, `butterfly_prep/`, `butterfly_v1/`, `plans/BUTTERFLY_V1_REPORT.md` | BUTTERFLY: **V1 принят как рабочий** (оригинал, полный и игровой alpha f1–f93, превью, синхронизированная траектория бабочки) |
| `plans/SNIFF_PEE_PLAN.md`, `sniff_prep/` | SNIFF_PEE: план, референс, промпт первого клипа (не запущено) |
| `race_start_v1/`, `race_start_v1_salvage/`, `race_start_v2/`, `race_start_v2_prep/`, `race_start_gen3/`, `race_start_gen3_prep/` | архив генераций RACE_START и их разбор |
| `alpha_pipeline/` | восстановленный универсальный alpha-конвейер для всех пяти собак |
| `assets/approved/` | утверждённые файлы Френка (RACE_STAND v3, START/END кадры STOP, STOP v1 исходник и alpha) |
| `assets/sources/` | исходники, которых нет в других ветках (IDLE, SELECTED, копия master из чата) |
| `assets/rejected_experiments/` | отвергнутые/запасные версии (не удалять, чтобы не повторять) |
| `assets/SHA256SUMS.txt` | контрольные суммы всех файлов выше |
| `analysis/` | скрипты разового анализа (петля RUN, предпросмотры); справочные, пути вшиты под рабочую среду |

## Исходники Френка, которых нет в этой папке (уже лежат в репозитории)
| Файл | SHA-256 | Где |
|---|---|---|
| `bulldog_01_run.mp4` (оригинальный Kling RUN, 1276×720, 24 fps, 121 кадр) | `bacae613cab9a705691df79aeadc8e547b6d0a1d8c43d37d0d3d970a17eb8409` | ветка `preview/bulldog-real-dogs-20261007` (commit `1c652ce8`), `assets/bulldog_01_run.mp4` |
| `dog1-run-alpha.webm` (утверждённый alpha RUN, исходные кадры #40–120) | `d2c2762797a393f03eca8ec28213d39f43783c52cddbaab59bed9f60a3347075` | ветка `preview/bulldogs-1235-alpha-20261008` (commit `8e30e515`), `dog1-run-alpha.webm` |

Достаньте их `git show <commit>:<путь> > файл` и сверьте SHA-256. `bulldog_01_master.png` (оригинал) в рабочую среду так и **не попал**: есть только пережатая копия из чата.

## Быстрый старт alpha-конвейера
```
cd bulldog1-frenk/alpha_pipeline
./setup.sh          # venv + зависимости + модель (214 МБ, SHA-256 проверяется)
./smoke_test.sh     # перерезает 3 кадра утверждённого STOP и сверяет с утверждённым alpha
. .venv/bin/activate
python dog_alpha.py ИСХОДНИК.mp4 --work work/ИМЯ --out dogN_клип_alpha.webm --exclude-rect none
python verify_alpha.py dogN_клип_alpha.webm --out work/verify_ИМЯ
```
Подробности и параметры — `alpha_pipeline/README.md`.

## Правила работы (действуют сейчас)
- Kling не запускать без прямого согласования пользователя: каждый запрос платный (картинка 2 кредита, видео 18).
- Оригиналы не перезаписывать; утверждённые файлы не менять, новые версии — под новыми именами.
- Не копировать позу, масштаб, ракурс и маски Bulldog №4 на Френка.
- Production, V3, Bulldog №4, merge/deploy — только по отдельному слову пользователя.
