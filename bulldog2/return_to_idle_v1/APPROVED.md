# RETURN_TO_IDLE Зефира — окончательно утверждён (пользователь, 22.10.2026, коммит 9814e4f)
* **Монтаж:** r2–r28, r33–r71, r75–r117 — **109 кадров = 4,54 с при 24 к/с** (`montage/montage.json`, `montage/make_montage.py`). Без ретайма и кроссфейда.
* **Цвет:** постоянная поправка RGB, линейно от +1,79/+1,98/+1,95 (r1) до +2,25/+2,74/+2,34 (r121) — принята.
* **Финальная alpha:** `alpha/DOG2_RETURN_TO_IDLE_v1_alpha_m109.webm` (VP9 + alpha, 1276×720, 109 кадров, без звука); проверки `alpha/verify/`, `alpha/verify_4bg/`.
* **Стыки приняты:**
  * SELECTED s121 → m1: центр −0,08/0,04 px, линия лап −1;
  * m109 → IDLE f5: −0,29/−0,22 px, линия лап 0.
* **Исходник Kling v1 — архив:** `kling/DOG2_RETURN_TO_IDLE_v1_original.mp4` (полный, 121 кадр), `RESULT.md`, `prompt_sent.txt`. Не используется в игре напрямую, не удалять.
* Повторная генерация и дальнейшее сокращение не нужны.
* **Место в цепочке:** SELECTED s4–s121 → RETURN m1–m109 (один раз) → IDLE f5–f14 → MAIN_L1 с f15 (`../lab_select_v1/selection.mjs`, `chain`).
* **Проверочные MP4:**
  * `COMPARE_original_vs_montage_x1.mp4`;
  * `../lab_select_v1/results/DOG2_SELECTION_FULL_CHAIN_click_idx{0,30,83,110}.mp4`.
