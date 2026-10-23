# Bulldog №1 «Фрэнк» — итоговый статус библиотеки (23.10.2026)
**Библиотека Фрэнка завершена.** Все гоночные состояния и вся цепочка экрана выбора, включая выбор в любой момент IDLE (вариант A, `selection_anytime_v1/APPROVED.md`), утверждены пользователем. Следующий отдельный этап — общая тестовая гонка Фрэнка №1, Зефира №2 и Бульдога №4.

Race V3, production и общая синхронизация Quiz Party не менялись; merge и deploy не было. Все пути — от папки `bulldog1-frenk/` (ветка `claude/frenk-audit-20261022`, репозиторий `akwunavi/quiz-party`). Авторитетный список файлов с SHA-256 — `MANIFEST.json → approved_set`, проверка — `python3 library_v1/verify_library.py`. Разбор всех версий — `AUDIT_2026-10-22.md`. Библиотека — `library_v1/` (`frenk-library-1.1.0`). Прежний статус 13–15.10 перенесён в `plans/STATUS_history_2026-10-13_15.md`.

## Гонка (Race V3, окна и физика без изменений)
Интеграционный пакет — `integration_v1/` (контракт `frenk-integration-1.0.0`, runtime `integration_v1/runtime/frenk_visual.mjs`). Атлас всех гоночных клипов — `integration_v1/atlas/frenk_atlas.json` + `frenk_{run,start,stop,sniff,bf,roll}.png`, спрайт 207×116. Лаборатория рядом с №4 — `../race-v3-frenk-lab/` (5 категорий, `results/lab_check.json`, регрессия `integration_v1/results/browser_regression.json`). Клипы — полный кадр 1276×720, 24 к/с, VP9 с alpha.

| Состояние | Финальный ассет | Кадры в игре | Лаборатория / проверка | Статус |
|---|---|---|---|---|
| **RACE_STAND** | `stop_v4/alpha/DOG1_RACE_STAND_v3_alpha_1276.webm` (кадр `roll_prep/KLING_FIRST_AND_LAST_RACE_STAND_v3_1276.png`, мастер `assets/approved/DOG1_RACE_STAND_v3_2720x1536.png`) | один кадр; BASE и `pad` всех действий | `race-v3-frenk-lab/` | ✅ утверждён (v3), готов |
| **RUN** | `git:8e30e51:dog1-run-alpha.webm` (ветка `preview/bulldogs-1235-alpha-20261008`; исходник `bulldog_01_run.mp4`, см. README) | цикл #87–#98 | `race-v3-frenk-lab/results/LAB_FRENK_ALL_EVENTS_5_categories_x1.mp4` | ✅ утверждён, готов |
| **START** (RACE_START) | `race_start_v1/DOG1_RACE_START_v1_alpha.webm` + `race_start_gen3/DOG1_RACE_START_gen3_alpha.webm`; сдвиги `integration_v1/contract/frenk_start_shift_arrays.json` | V1 f1, f7–f11, f16 → gen3 f2–f35 → RUN #88, lead 3 | там же | ✅ утверждён как рабочий (15.10), готов |
| **STOP** (STOP V4) | `stop_v4/alpha/DOG1_STOP_v4_alpha_k38-k73.webm` (исходник `stop_v4/DOG1_STOP_v4_kling_source.mp4`); сдвиги `integration_v1/contract/frenk_stop_v4_shift_arrays.json` | k38–k73 + RACE_STAND = 37 кадров = окно STOP | там же | ✅ утверждён как рабочий, готов |
| **FINISH** | **= STOP V4** (тот же ассет), затем RACE_STAND | 37 кадров | там же | ✅ утверждён (DECISIONS 56), готов |
| **ROLL** | `roll_v1/alpha/DOG1_ROLL_v1_alpha.webm` (исходник `roll_v1/DOG1_ROLL_v1_kling_source.mp4`) | r10–r113 (104) + стойка = окно 145 | `race-v3-frenk-lab/results/LAB_FRENK_ROLL_5_categories_x1.mp4` | ✅ утверждён (коммит `481a113`), готов |
| **BUTTERFLY** | `butterfly_v1/DOG1_BUTTERFLY_v1_alpha_game_f1-f93.webm` (исходник `butterfly_v1/DOG1_BUTTERFLY_v1_kling_source.mp4`); траектория `butterfly_v1/butterfly_trajectory_synced.json` | f1–f93; бабочку рисует игра | `race-v3-frenk-lab/results/LAB_FRENK_BUTTERFLY_5_categories_x1.mp4` | ✅ утверждён как рабочий, готов |
| **SNIFF_PEE** (+ возврат) | **V3.2 EVENT**: `sniff_pee_v3_2_assembly/DOG1_SNIFF_PEE_V3_2_EVENT_alpha_v3_ribbonfix.webm` (монтаж `sniff_pee_v3_2_assembly/DOG1_SNIFF_PEE_V3_2_EVENT.mp4` из SNIFF V2 и MARKING_MOTION v1) | 200 кадров = 8,33 с, сам кончается в RACE_STAND; окно 239,55 = lead 3 + 200 + стойка 36,55 | `race-v3-frenk-lab/results/LAB_FRENK_SNIFF_chain_5_categories_x1.mp4`, `sniff_pee_v3_2_assembly/DOG1_SNIFF_PEE_V3_2_REPORT.md` | ✅ **утверждён как рабочий** (15.10, подтверждено 22.10 и 23.10), готов. Не переделывать; известные дефекты — `KNOWN_ISSUES.md` |

## Экран выбора (полный кадр 1276×720 анфас, лаборатория 638×360; цепочка утверждена 23.10, коммит 1d9e566)
`IDLE (цикл 220) → выбор → IDLE своими кадрами до f12 → SELECTED f20–f121 → RETURN_TO_IDLE r2–r121 (один раз) → IDLE с f9, бесконечно`. Логика — `selection_anytime_v1/selection.mjs`; ожидание до SELECTED 0–4,42 с, до видимой реакции до 4,75 с (утверждено).
Библиотека `frenk-library-1.1.0` (`library_v1/`). Все три клипа — `selection_alpha_v1/`, общая камера и плита, без сдвига и масштаба между клипами.

| Состояние | Финальный ассет | Кадры | Проверка | Статус |
|---|---|---|---|---|
| **IDLE** | `selection_alpha_v1/DOG1_IDLE_v1_alpha_loop220.webm` (`loop`); кадры для пути выхода — `selection_alpha_v1/DOG1_IDLE_v1_alpha_f8-f118.webm`; исходник `assets/sources/bulldog_01_idle.mp4` | f8 → f118 → f9, 220 = 9,17 с | `selection_alpha_v1/results/BROWSER_sequence_4backgrounds_frame_exact_x1.mp4`, `selection_anytime_v1/results/DOG1_IDLE_LOOP220_3cycles_4bg_x1.mp4` | ✅ утверждён (DECISIONS 61–62), готов |
| **SELECTED** | `selection_alpha_v1/DOG1_SELECTED_v1_alpha_f20-f121.webm` (исходник `assets/sources/bulldog_01_selected.mp4`) | f20–f121, 102 = 4,25 с | `selection_alpha_v1/results/` | ✅ утверждён (дефекты движения приняты), готов |
| **RETURN_TO_IDLE** | `selection_alpha_v1/DOG1_RETURN_TO_IDLE_v1_alpha_r2-r121.webm` (исходник `return_to_idle_v1/DOG1_RETURN_TO_IDLE_v1_kling_source.mp4`, поправка тона) | r2–r121, 120 = 5,0 с; дальше IDLE с f9 | `selection_alpha_v1/results/BROWSER_sequence_realtime_capture.mp4` | ✅ утверждён, готов |
| **Полная цепочка, выбор в любой момент** | `selection_anytime_v1/` (`selection.mjs`, `index.html`, `lab.mjs`, `tools/`), вход **A**: IDLE f12 → SELECTED f20 | IDLE → выбор → IDLE до f12 → SELECTED → RETURN → IDLE с f9 | `selection_anytime_v1/results/DOG1_SELECT_ANYTIME_CHAIN_A_{4,75,110,150}_4bg_x1.mp4`, `selection_anytime_v1/APPROVED.md`, `REPORT.md` | ✅ утверждена (23.10), готова |

Алгоритм выбора в любой момент: цикл IDLE идёт туда-обратно, совместимая стойка — только f8–f13, ворота f12. На спуске IDLE доигрывает спуск до f12. На подъёме IDLE разворачивается и своими кадрами идёт назад к f12, в том числе с середины поворота головы (обратный ход принят). Без ускорения и кроссфейда. Максимальная задержка, замеренная в лаборатории, — **106 кадров = 4,42 с** до SELECTED (выбор на f118) и **4,75 с** до видимой реакции (движение SELECTED с f28). Оба значения утверждены 23.10.

FRONT_STAND (`assets/approved/DOG1_FRONT_STAND_alpha_frame0.png`, RUN #0 = IDLE f1 = SELECTED f1) и FIRST_START (`assets/approved/DOG1_FIRST_START_alpha_src25-63.webm`) утверждены как рабочие 13.10. Ни в одну цепочку они не входят: переход выбор → гонка не проектируется.

## Архив (не удалять, в игре не использовать)
* **SNIFF_PEE:** V1 (`sniff_v1/`, «клевание»), V2 (`sniff_v2/`, его сниф используется в V3.2), позы MARKING_POSE v1–v4 (`marking_pose/`), MARKING_MOTION v1 (`marking_motion_v1/`, вход монтажа V3.2), сборки V3 и V3.1 (`sniff_pee_v3_assembly/`, `sniff_pee_v3_1_assembly/`), alpha V3.2 v1 и v2 floorshadow, поиск референса `sniff_ref_search/`, подготовка `sniff_prep/`.
* **STOP:** v1 (`assets/approved/DOG1_STOP_v1_*`), v2, v3, lying_fix, landing gen B (`stop_v2/`, `stop_v3/`).
* **START:** V1 и V2 целиком, salvage, подготовка gen3 (`race_start_v1/`, `race_start_v1_salvage/`, `race_start_v2/`, `race_start_v2_prep/`, `race_start_gen3_prep/`, `race_start_prep/`); рабочая сборка `race_start_working/`, стык с RUN `race_start_run_join_v1/`, `race_start_run_integration_kit/`.
* **BUTTERFLY:** полный alpha f1–f121 и сырой alpha с остатками насекомого (`butterfly_v1/`), подготовка `butterfly_prep/`.
* **ROLL:** подготовка `roll_prep/`.
* **Экран выбора:** вход B выбора в любой момент (IDLE f12 → SELECTED f4…f19 → f20; alpha `selection_anytime_v1/alpha/DOG1_SELECTED_v1_alpha_f1-f24_entry.webm`, видео `selection_anytime_v1/results/*_B_*`) — без дальнейшей разработки; прежний плеер с выбором только на границе цикла `selection_alpha_v1/player/` и его видео `selection_alpha_v1/results/BROWSER_sequence_*.mp4`; монтажи-кандидаты `idle_selected_v1/`, подготовка RETURN `return_to_idle_prep/`, исходник `return_to_idle_v1/`.
* **Прочее:** `qc_first_start/`, `track_diag/`, `race_v3_character_contract_proposal/`, отвергнутые файлы `assets/rejected_experiments/`.

## Kling
Все генерации Фрэнка шли по отдельному согласованию; журнал с промптами и стоимостью — `KLING_LOG.md`. После 15.10 новых генераций для Фрэнка не было; выбор в любой момент сделан без Kling (0 кредитов, только CPU: alpha SELECTED f1–f24 ≈ 6 минут).
