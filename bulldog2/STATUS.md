# Bulldog №2 «Зефир» — статус ассетов (16.10.2026)
| Ассет | Статус | Где |
|---|---|---|
| RUN (исходник, цикл #88–#99) | утверждён | `assets/sources/bulldog_02_run.mp4`, alpha `race_start_v1/alpha/DOG2_RUN_alpha_src28-100.webm` |
| RACE_STAND | **утверждён**: RUN #30 | `race_stand_check/`, `lab_start_v1/` |
| RACE_START | **утверждён**: вариант B (#30–#71 → #96 → цикл), компенсация раскачки | `lab_start_v1/` (коммит 23dd257) |
| STOP | **утверждён**: STOP B, 37 кадров, alpha и лаборатория приняты | `stop_montage_v2/APPROVED.md`, `stop_b_alpha/`, `lab_stop_v1/` (коммит 3573f97) |
| FINISH (FINISH_DECELERATE) | **= STOP B** временно, отдельной анимации в этой итерации нет | как STOP |
| ROLL | **исходник утверждён**: ROLL v3 (Kling, first = last = #30), клип r10–r117 (108 кадров) в окне 145; alpha и лаборатория готовы, ждут визуальной приёмки | `roll_v3/`, `lab_roll_v1/` |
| BUTTERFLY | **исходник утверждён**: BUTTERFLY v2 (Kling, first = last = #30, ухо b37–b42 оставлено), клип b8–b109 (102 кадра) в окне 121; alpha (мошка удалена) и лаборатория готовы, **утверждены** (коммит 1eafd09) | `butterfly_v2/`, `lab_butterfly_v1/` |
| SNIFF_PEE (+ RETURN) | нет материала — нужна генерация; разбор, сценарий, промпты A/B и рекомендация готовы, Kling не запускался, ждёт согласования | `sniff_pee_prep/PLAN.md` |
| IDLE, SELECTED (экран выбора) | кандидаты v1, ждут приёмки | `idle_selected_v1/` |
| RETURN_TO_IDLE | нет | — |

Отклонено и не развивается: BUTTERFLY v1 (насекомое на носу), ROLL v1 (без головы), ROLL v2 (заменён v3); STOP v1/v2 целиком, STOP montage v1 (A), обратная связка `stop_bridge_rev_v1/` для STOP, bridge v1.
Физика V3 и окна не менялись.
