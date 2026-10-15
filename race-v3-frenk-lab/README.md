# Race V3 · Фрэнк + Bulldog №4 · изолированная браузерная лаборатория

Не production и не игра. Физика, планировщик и отрисовка №4 — **неизменённые** модули `dog4-v3-lab/` (`model.mjs`, `scenario.mjs`, `layout.json`, тот же код `draw()` для дорожек №4). Визуальный слой Фрэнка — неизменённый P3 `race-v3-p3-lab/src/visual.mjs` с **лабораторной копией** контракта `characters/frenk.contract.lab.json` (STOP V4 и предложение метаданных сдвигов). Принятый контракт `race-v3-p3-lab/characters/frenk.contract.json` не тронут.

## Запуск
Из корня репозитория: `python3 -m http.server 8000`, затем открыть `http://127.0.0.1:8000/race-v3-frenk-lab/`.
Сценарии:
* `PAIR`: №4 ↔ Фрэнк, NORMAL (SNIFF, BUTTERFLY) и Фрэнк с ROLL (дорожка 5);
* `CHAIN_ALL` / `BUTTERFLY_ALL` / `ROLL_ALL`: Фрэнк во всех пяти категориях скорости;
* `RANDOM`: гонка №4 по seed, как в `dog4-v3-lab`, с возможностью нарисовать одну дорожку Фрэнком («Фрэнк на дорожке»). Физика и результаты при этом не меняются.

## Состав
* `frenk.mjs` — кадр Фрэнка из `visualAt` + сдвиги спрайта (правила в `shift.labRules` контракта); тень рисуется со сдвигом спрайта, то есть следует видимой собаке.
* `assets/frenk_*.png`, `assets/frenk_atlas.json` — атласы 207×116 (игровой размер), собраны `tools/build_frenk_atlas.py` из рабочей alpha (источники перечислены в скрипте), плюс центр масс каждого кадра для проверок.
* `dog4assets/` — побайтовые копии `dog4-v3-lab/assets/*.png` из коммита 921f0fe (в текущем дереве этих файлов нет). Хэши blob-ов совпадают.
* `characters/` — лабораторный контракт, `stop_v4_shift_arrays.json` (предложение), `shift_arrays_lead3.json` (прежние массивы START).
* `tools/lab_check.mjs` — проверки и запись в headless Chromium (`node tools/lab_check.mjs [--record]`): воспроизводимость №4, попиксельное сравнение №4 с исходной страницей, все стыки и тень Фрэнка по каждому кадру 24 к/с, снимок ROLL; `RECORD_KEYS='[["ROLL_ALL","file.mp4"]]'` — записать только выбранные сценарии. `tools/lab_closeups.py KEY LANE OUT.mp4 [roll]` — крупные планы стыков. Результаты в `results/`.
