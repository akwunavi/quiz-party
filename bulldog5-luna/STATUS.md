# Луна (№5) — статус (08.11.2026)
Kling: RACE_STAND G1 (20) + RUN G1 (30); баланс 2166. Исходники не менялись; результаты их обработки (этап 2) сохранены.

| состояние | что есть | статус |
|---|---|---|
| FRONT_STAND | `stage2/front_stand/DOG5_FRONT_STAND_alpha_f0_1276.png` | **рабочая** (окончательно — в общей сцене выбора) |
| IDLE | вариант A «туда-обратно» 4 с (основной), B 10 с (альтернатива) — `stage2/idle/` | A — основной кандидат, B сохранён |
| SELECTED | alpha s0–s120 с подскоком — `stage2/alpha/` | основной кандидат; уши s71–s78 — компоновка карточки Пупса |
| RETURN_TO_IDLE | монтажом не собирается | нужна 1 генерация; ТЗ `stage2/return_check/RETURN_TO_IDLE_KLING_TZ.md`, не запускалась |
| RUN | **G1** из RACE_STAND G1: честный цикл 12 кадров #60–#71 (запас #99–#110), alpha — `stage5_run/` | **ждёт приёмки**; открыт вопрос длины в галопе (+17 %) — масштаб атласа |
| RACE_STAND | G1 — `stage4_race_stand/DOG5_RACE_STAND_G1_1276.png` | **рабочая** (не финальная); вопрос о финальной — после приёмки RUN |
| START | вероятно, из того же клипа RUN G1 (#21–#59 → цикл #60) | без генерации, нарезка — отдельным этапом |
| STOP / FINISH, SNIFF_PEE + RETURN, ROLL, BUTTERFLY | — | генерации по согласованию |

## Kling — что нужно (запущено: RACE_STAND, RUN)
| | ориентир |
|---|---|
| RETURN_TO_IDLE | 30 |
| RACE_STAND (картинка) | 20 — **потрачено** |
| **RUN** | 30 — **потрачено** |
| START | 30 → вероятно 0 (из клипа RUN) |
| STOP (= FINISH) | 30 |
| SNIFF_PEE + RETURN (10 с) | 60 |
| ROLL | 30 |
| BUTTERFLY | 30 |
| **итого** | потрачено 50; осталось ≈ **180** (RETURN_TO_IDLE, STOP, SNIFF_PEE + RETURN, ROLL, BUTTERFLY; START, вероятно, из клипа RUN), реалистично с повторами ≈ 270–330 |

Порядок: RACE_STAND → RUN → START → STOP → действия; RETURN_TO_IDLE — независимо, когда удобно.
Race V3, библиотеки №1–№4, арена Codex и production не менялись; merge и deploy не было.
