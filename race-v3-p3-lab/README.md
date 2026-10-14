# Race V3 — P3 lab (изолированный прототип визуального слоя)

Прототип решения P3, принятого 14.10.2026: **общая физика V3 + независимый визуальный слой с контрактом на персонажа**.
Лаборатория **только читает** `dog4-v3-lab/` (модель, сценарий, layout) и `bulldog1-frenk/` (метаданные, shift-массивы). Физика, сценарий, seed, crossing, места, константы V3, production, Dog4 и исходные ассеты не менялись; AI-генераций, новых видео и новой alpha нет (графики и сравнительное превью собраны из уже существующих кадров).

## Состав
| путь | что |
|---|---|
| `src/visual.mjs` | `visualAt(contract, segments, t)` — чистая функция; операции `lead`, `tail`, `pad`, ограниченный `retime`, `shift`; ничего не усекается молча (`overflow`, `MISSING_ASSET` в результате) |
| `src/canonical.mjs` | общие окна V3 **разбираются из `model.mjs`**, лаборатория их не хранит |
| `src/validator.mjs` | валидатор контракта персонажа (арифметика окон, фаза RUN→STOP, `lead`, границы retime, статусы ассетов) |
| `src/loader.mjs` | загрузка контрактов и shift-массивов |
| `characters/dog4.contract.json` | **эталон**: тождественные метаданные Bulldog №4 (воспроизводят `frameFor` один в один) |
| `characters/frenk.contract.json` | Френк: только существующие анимации, остальное помечено (`build_frenk_contract.mjs` строит файл) |
| `tests/suite.mjs`, `tests/run_all.mjs` | T1–T10 (+ T11 не запущен, T12 смешанная гонка) → `results/test_results.json`, `results/TEST_REPORT.md` |
| `tests/mixed_race.mjs` | Френк + 4×Bulldog 4 на реальной физике V3 |
| `analysis/stop_contacts.py` | движение и контакт лап в STOP Френка (в окне и в неподвижном хвосте) |
| `analysis/butterfly_retime.py`, `retime_labels.mjs` | тестовый retime ×1,0932 и сравнение с оригинальным темпом |
| `REPORT.md` | итоги, ограничения, рекомендация |

## Запуск
```
node tests/run_all.mjs 10000          # T1–T10, T11 (NOT_RUN), T12; ~1 мин
node tests/mixed_race.mjs 10000       # смешанная гонка отдельно, демо-гонки в results/
node characters/build_frenk_contract.mjs
# анализ по пикселям (нужны python с numpy/PIL/opencv/matplotlib и ffmpeg с libvpx-vp9):
python3 analysis/stop_contacts.py results/stop_contact_analysis.json results/STOP_CONTACT_CHART.png
node analysis/retime_labels.mjs && python3 analysis/butterfly_retime.py results/butterfly_retime_test.json results/BUTTERFLY_RETIME_x1.0932_vs_original.mp4 results/BUTTERFLY_RETIME_STEPS.png
```
Необязательная опора для `stop_contacts.py` — кадры RUN Френка (`--run-frames`): RUN alpha в этой ветке отсутствует, поэтому сравнение со RUN в результатах помечено как невоспроизводимое из репозитория.

## Формат контракта (v1-lab)
`clips` — сэмплеры (`bands`, `linear`, `table` с метками кадров, `prologueLoop`, `constant`); `windows` — что делает каждое физическое окно (`clip`/`body`/`hold`, `lead`, `tail`, `pad`, `rate`, `tailRateByNext`, `spillFromStart`, `mergeInto`, `status:'missing'`, `provisional`); `assetStatus` — статус каждого клипа (обязателен); `keys`, `run`, `shift`, `limits`. Кадры Френка называются как в `track_diag/frames_meta.json` (`v1f1`, `g3f35`, `run88`, `stop37`), поэтому геометрия берётся прямо оттуда.
