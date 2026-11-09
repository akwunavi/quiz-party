# Bulldog №2 «Зефир» — итоговый статус библиотеки (22.10.2026)
**Библиотека Зефира завершена.** Все гоночные и выборные состояния утверждены пользователем. Race V3, production и общая синхронизация Quiz Party не менялись; merge и deploy не было. Все пути — от папки `bulldog2/` (ветка `claude-frenk-to-codex`, репозиторий `akwunavi/quiz-party`).

## Гонка (Race V3, окна и физика без изменений)
Все клипы — полный кадр 1276×720, 24 к/с, VP9 с alpha. В игре — спрайт 207×116 из атласов лабораторий, со сдвигом спрайта RACE_STAND.

| Состояние | Финальный ассет | Кадры в игре | Лаборатория / проверка | Статус |
|---|---|---|---|---|
| **RUN** | `race_start_v1/alpha/DOG2_RUN_alpha_src28-100.webm` (исходник `assets/sources/bulldog_02_run.mp4`); атлас `lab_start_v1/assets/dog2_atlas.json` | цикл #88–#99 | `lab_start_v1/` | ✅ утверждён, готов к интеграции |
| **RACE_STAND** | кадр RUN #30 из того же alpha и атласа (`r30`), сдвиг спрайта `shiftStand` | #30 | `race_stand_check/`, `lab_start_v1/` | ✅ утверждён, готов |
| **START** (RACE_START B) | RUN #30–#71 → #96 → цикл, компенсация раскачки; атлас `lab_start_v1/assets/dog2_atlas.json` | 1 с окна START + переход в цикл | `lab_start_v1/results/LAB_DOG2_START_B_5_categories_x1.mp4` (коммит 23dd257) | ✅ утверждён, готов |
| **STOP** (STOP B) | `stop_b_alpha/DOG2_STOP_v2_alpha_k27-k40.webm` + `stop_b_alpha/DOG2_STOP_v1_alpha_k66-k73.webm` + RUN #89–#96 + #30; сборка `stop_b_alpha/compose_stopB_rgba.py`; атлас `lab_stop_v1/assets/dog2_stopB_atlas.json`, список `lab_stop_v1/assets/stopB_montage_list.json` | 37 кадров = окно STOP | `lab_stop_v1/results/DOG2_STOP_B_lab_EVENT5_x1.mp4`; `stop_montage_v2/APPROVED.md` (коммит 3573f97) | ✅ утверждён, готов |
| **FINISH** (FINISH_DECELERATE) | **= STOP B** (тот же ассет) | 37 кадров | `lab_stop_v1/results/DOG2_STOP_B_lab_FINISH5_x1.mp4` | ✅ утверждён (FINISH = STOP B), готов |
| **ROLL** | `roll_v3/alpha/DOG2_ROLL_v3_alpha_r1-r121.webm` (исходник `roll_v3/kling/DOG2_ROLL_v3_original.mp4`); атлас `lab_roll_v1/assets/dog2_roll_atlas.json` | r10–r117 (108) + стойка 37 = окно 145 | `lab_roll_v1/results/DOG2_ROLL_lab_MID5_x1.mp4`, `lab_roll_v1/REPORT.md` | ✅ утверждён, готов |
| **BUTTERFLY** | `butterfly_v2/alpha/DOG2_BUTTERFLY_v2_alpha_b1-b121.webm` (исходник `butterfly_v2/kling/DOG2_BUTTERFLY_v2_original.mp4`); атлас `lab_butterfly_v1/assets/dog2_butterfly_atlas.json` | b8–b109 (102) + стойка 19 = окно 121; бабочку рисует игра | `lab_butterfly_v1/results/DOG2_BUTTERFLY_lab_MID5_x1.mp4`, `butterfly_v2/APPROVED.md` (коммит 1eafd09) | ✅ утверждён, готов |
| **SNIFF_PEE** (+ окно RETURN) | `sniff_pee_v1/alpha/DOG2_SNIFF_PEE_v1_alpha_s1-s193.webm` (исходник `sniff_pee_v1/kling/DOG2_SNIFF_PEE_v1_original.mp4`, Kling 4.0); атлас `lab_sniff_v1/assets/dog2_sniff_atlas.json`; монтаж `lab_sniff_v1/assets/rhythm_variants.json` → `selected` = **V1S_SHORT_HOLD** | s6–s142, s141→s128, s129→s142, s143–s176 (199) + стойка 41 = окна SNIFF_PEE + RETURN (240) одним клипом | `lab_sniff_v1/results/rhythm/DOG2_SNIFF_PEE_V1S_SHORT_HOLD_MID5_full_chain_x1.mp4`, `lab_sniff_v1/APPROVED.md` (коммит 4108f01) | ✅ утверждён, готов |

## Экран выбора (полный кадр 1276×720 анфас, лаборатория 638×360; цепочка утверждена, коммиты 13a7132, 7339d70, 9814e4f)
`IDLE MAIN_L1 → выбор → FRONT_STAND f4 → SELECTED s4–s121 → RETURN_TO_IDLE (один раз) → IDLE f5–f14 → MAIN_L1`. Логика — `lab_select_v1/selection.mjs`, ожидание выхода из IDLE 0,46–2,42 с (утверждено).

| Состояние | Финальный ассет | Кадры | Проверка | Статус |
|---|---|---|---|---|
| **IDLE** | `selection_alpha_v1/DOG2_IDLE_MAIN_L1_alpha_loop131.webm` (`loop`); путь выхода и вход в цикл — кадры `selection_alpha_v1/DOG2_IDLE_alpha_f1-f121.webm`; исходник `assets/sources/bulldog_2_idle.mp4` | f15 → f58, f57 → f40, f41 → f109; 131 = 5,46 с; подъём лапы входит в IDLE | `lab_select_v1/results/DOG2_IDLE_MAIN_L1_alpha_3cycles_4bg.mp4`, `idle_v2/APPROVED.md` | ✅ утверждён, готов |
| **SELECTED** | `selection_alpha_v1/DOG2_SELECTED_alpha_f1-f121.webm` (исходник `assets/sources/bulldog_2_selected.mp4`) | s4–s121, 118 = 4,92 с | `selected_review/DOG2_SELECTED_s4-s121_selection_scale_4bg.mp4`, `selected_review/REPORT.md` | ✅ утверждён (обрезанные кончики ушей на прыжках допустимы), готов |
| **RETURN_TO_IDLE** | `return_to_idle_v1/alpha/DOG2_RETURN_TO_IDLE_v1_alpha_m109.webm` | r2–r28, r33–r71, r75–r117; 109 = 4,54 с; поправка тона | `return_to_idle_v1/APPROVED.md`, `return_to_idle_v1/COMPARE_original_vs_montage_x1.mp4` | ✅ утверждён, готов |
| **Полная цепочка** | `lab_select_v1/` (`index.html`, `lab.mjs`, `selection.mjs`, `tools/`) | — | `lab_select_v1/results/DOG2_SELECTION_FULL_CHAIN_click_idx{0,30,83,110}.mp4`, `lab_select_v1/APPROVED.md` | ✅ утверждена, готова |

FRONT_STAND = RUN #0 = IDLE f1 = SELECTED f1 (утверждён) — общий кадр экрана выбора; в цепочке используется кадр IDLE f4.

## Архив (не удалять, в игре не использовать)
* **IDLE:** v1 без лапы (`idle_selected_v1/`, f4 → f78 → f5); SHORT_L2 (`idle_v2/`); план генерации IDLE (`idle_prep/`, Kling не запускался).
* **SELECTED:** монтажный кандидат v1 f20–f121 (`idle_selected_v1/`) — в игре используется s4–s121.
* **RETURN_TO_IDLE:** полный исходник Kling v1 r1–r121 (`return_to_idle_v1/kling/`), подготовка `return_to_idle_prep/`.
* **SNIFF_PEE:**
  * ритмы CURRENT, V1_LONG_HOLD, V2_LEAD_AND_HOLD (`lab_sniff_v1/assets/rhythm_variants.json`; видео в `lab_sniff_v1/results/` и `results/rhythm/`);
  * картинка позы B1 (`sniff_pee_b1/`) — вход генерации, в игре не нужна;
  * подготовка `sniff_pee_prep/`.
* **START:** вариант A (`lab_start_v1/results/LAB_DOG2_START_A_reserve_5_categories_x1.mp4`).
* **STOP:** v1/v2 целиком, montage v1 (A), bridge v1, обратная связка (`stop_v1/`, `stop_v2/`, `stop_montage_v1/`, `stop_bridge_v1/`, `stop_bridge_rev_v1/`).
* **ROLL:** v1 (без головы), v2 (`roll_v1/`, `roll_v2/`).
* **BUTTERFLY:** v1 (насекомое на носу, `butterfly_v1/`).

## Kling
Все генерации шли по отдельному согласованию, по одной попытке. Последний баланс 2416 — после RETURN_TO_IDLE (−30).
