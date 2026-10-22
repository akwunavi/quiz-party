# Экран выбора Зефира — вся цепочка окончательно утверждена (пользователь, 22.10.2026, коммиты 13a7132 и 9814e4f)
**Цепочка:** `IDLE MAIN_L1 (цикл) → выбор → IDLE доигрывает до FRONT_STAND f4 → SELECTED s4–s121 → RETURN_TO_IDLE m1–m109 (один раз) → IDLE f5–f14 → MAIN_L1 с f15, бесконечно`.

| часть | финальный ассет | кадры / длительность |
|---|---|---|
| IDLE MAIN_L1 | `../selection_alpha_v1/DOG2_IDLE_MAIN_L1_alpha_loop131.webm` (`loop`) | f15 → f58, f57 → f40, f41 → f109; 131 кадр = 5,46 с; подъём лапы — часть IDLE |
| выход к FRONT_STAND и вход в цикл после RETURN | кадры `../selection_alpha_v1/DOG2_IDLE_alpha_f1-f121.webm` (исходник IDLE целиком) | путь `selection.mjs → exitPath`; ожидание 0,46–2,42 с (утверждено); вход в цикл f5–f14 |
| SELECTED | `../selection_alpha_v1/DOG2_SELECTED_alpha_f1-f121.webm`, в игре s4–s121 | 118 кадров = 4,92 с |
| RETURN_TO_IDLE | `../return_to_idle_v1/alpha/DOG2_RETURN_TO_IDLE_v1_alpha_m109.webm` | 109 кадров = 4,54 с (`../return_to_idle_v1/APPROVED.md`) |

* **Логика:** `selection.mjs` — `IDLE_LOOP`, `exitPath`, `SELECTED`, `RETURN`, `REENTRY`, `chain`. Клик на кадре ≤ f62 — IDLE назад до f4, клик ≥ f63 — вперёд до f109 → f15 → назад до f4. Без кроссфейда. **Не перерабатывать.**
* **Не менять:** IDLE и подъём лапы, алгоритм выхода, SELECTED, RETURN_TO_IDLE, лабораторию (`index.html`, `lab.mjs`, `tools/`) и результаты проверок (`results/`).
* **Решение для всех пяти собак** (пользователь): выбор = завершение нужного движения IDLE и переход через совместимую стойку, без мгновенного переключения и без кроссфейда.
* **Стыки** (`results/metrics.json`, `results/metrics_chain.json`):
  * IDLE f4 → SELECTED s4: 0,07 px;
  * SELECTED s121 → RETURN: 0,08 px;
  * RETURN → IDLE f5: 0,29 px;
  * цикл f109 → f15: 1,4 px;
  * линия лап на всех стыках 0…−1 px.
* **Проверочные MP4** (`results/`):
  * `DOG2_IDLE_MAIN_L1_alpha_1cycle_4bg.mp4`, `DOG2_IDLE_MAIN_L1_alpha_3cycles_4bg.mp4`;
  * `DOG2_IDLE_to_SELECTED_click_idx{0,30,83,95,110,130}.mp4`;
  * `DOG2_SELECTION_FULL_CHAIN_click_idx{0,30,83,110}.mp4`.
