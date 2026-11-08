# Луна (№5) — журнал генераций Kling

## 1. RACE_STAND, картинка (08.11.2026) — разрешена пользователем одна генерация
* Модель: `gemini-3-pro-image` (Nano Banana Pro) через Kling, image-to-image, 2 входа, 16:9, 2k, 1 картинка. Списано 20 кредитов (баланс до запуска 2216).
* generation_id: `AXAlOxhBUJRSKMSG_s4yWeoDzOqLo-sRs368Vhtkz4LSiyd07x_KHjkvnr7XUksiUUOau0si`.
* image_1 — `stage4_race_stand/inputs/REF_LUNA_SIDE_from_RUNvs2_a19_on_studio_1276.png`: бок Луны из RUN vs2 (alpha v2 #19 = исходник #59) без изменения пикселей, поставлен на ровную плашку студии Луны в масштаб соседей (лапы y = 680, центр x = 640, рост ≈ 620 px).
* image_2 — `stage4_race_stand/inputs/REF_LUNA_FRONT_STAND_f0_1276.png`: FRONT_STAND f0 без изменений.
* Промпт — `stage4_race_stand/PROMPT.txt`.
* Результат: готово за ≈ 2,5 мин работы (≈ 10 мин в очереди). `stage4_race_stand/DOG5_RACE_STAND_G1_kling_original.jpg` (2752×1536, SHA `1148b9cc6e8f9e38…`). Строгий профиль вправо, пятна совпадают с RUN vs2. Ждёт приёмки. Баланс после — 2196.

## 2. RUN G1, видео (08.11.2026) — разрешена пользователем одна попытка
* RACE_STAND G1 принята как рабочая (не финальная). Модель `kling-video-v3_0`, image-to-video, first = `stage4_race_stand/DOG5_RACE_STAND_G1_1276.png`, без tail, 5 с, 720p, `prefer_multi_shots = false`, без звука. Списано 30 кредитов.
* generation_id: `AR07i02aJUsXQ-WTpRYuXcSi4kvN3A8HJYRoT0xjZxezXinkAOiok3fXFXV9qZ9H7OUYE7ld`.
* Промпт — `stage5_run/PROMPT.txt` (= заготовка `stage4_race_stand/RUN_PREP.md`).
* Результат: `stage5_run/DOG5_RUN_G1_kling_original.mp4` (1276×720, 24 к/с, 121 кадр, SHA `135dbad1b9a99bd7…`). Шаг ровно 12 кадров, честный цикл #60–#71 (и #99–#110). Пыль из-под лап в alpha не попала. Баланс после — 2166.

## 3. Партия из пяти генераций (08.11.2026) — разрешено по одной попытке на состояние
Все: `kling-video-v3_0`, image-to-video, first + tail, 720p, `prefer_multi_shots = false`, без звука. Входы — `stage6_batch/inputs/` (SHA в `stage6_batch/inputs/SHA256SUMS`). Промпты — `stage6_batch/PROMPTS.md`. Отправлены одной партией; баланс до — 2166.

| состояние | first | tail | длит. | кредиты | generation_id |
|---|---|---|---|---|---|
| RETURN_TO_IDLE | SELECTED s120 | FRONT_STAND f0 | 5 с | 30 | `AYhq0wk9T0k1Y0Sc52g9kADZJo2HvLy9gg7WFEDcRKZWpktGEpgFgL60HqwYhDYjtZZP4cRA` |
| STOP / FINISH | RUN G1 #72 (кадр после конца цикла #71 — его V3 всегда показывает перед STOP, правило T4) | RACE_STAND G1 | 3 с | 18 | `AdtAWmoRz1XMufrkkLJAseSmd1S4RmKOzg35hNFezoGsD_aXoDbws2lBH791LzcWfbwVKd-K` |
| SNIFF_PEE + RETURN | RACE_STAND G1 | RACE_STAND G1 | 10 с | 60 | `Adjco7c4kw97kN0KScl5Xs2RJt9r0AC1B1RBUEay1eC5g7YeSf_2YmMMgg022oNJw6RE9pZL` |
| ROLL | RACE_STAND G1 | RACE_STAND G1 | 6 с | 36 | `AVcH0YRV9K_n6h-gqrm1ftbrNMolmbECBhwstACOQB-0HRnbWdeB8pCbfLCr5W9rdnzAzdVy` |
| BUTTERFLY | RACE_STAND G1 | RACE_STAND G1 | 5 с | 30 | `AVZmOr8KqfWgsAdEScmACZed0AyhQY7yZpoopV13ehRa_oL8ibsCK08-2hDVQep_zeX-6dMK` |
| **итого** | | | | **174** | |
* Результат: все пять готовы; оригиналы (без водяного знака) — `stage6_batch/sources/`, SHA — `stage6_batch/sources/SHA256SUMS`. Баланс после — **1992**.
* Аудит пользователя: RETURN_TO_IDLE, STOP, BUTTERFLY — довольны; **ROLL** — деформация таза при вставании (исправляется реверсом без генерации, `stage7_fix/roll/`); **SNIFF_PEE** — лапа уходит назад (нужна короткая вставка, ТЗ `stage7_fix/sniff/`, не запускалась).

## 4. SNIFF_PEE — вставка подъёма лапы (08.11.2026) — разрешена одна генерация
* `kling-video-v3_0`, first = исходный SNIFF #93 (`stage7_fix/sniff/SNIFF_f93_first.png`, SHA `91d6ec3045712a12…`), tail = исходный #178 (`SNIFF_f178_tail.png`, SHA `e127ff38a70aa7ae…`), 4 с, 720p, одна сцена, без звука. Списано 24 кредита (баланс до — 1992).
* generation_id: `AVG52TIrCdYW-SGFMIYwn-5vsxqjZhyNAZKuQkBZjyhw2j5Ys34urPo_w4rrkB8pxynyIYXb`. Промпт — `stage7_fix/sniff/SNIFF_AUDIT_AND_FIX_TZ.md`.
* Результат: `stage7_fix/sniff/DOG5_SNIFF_LEGLIFT_INSERT_G1_kling_original.mp4` (97 кадров, SHA `fd4e6a3285859e7f…`). **Не удалось**: лапа снова уходит назад (#32–#92). Повтора не было. Баланс после — 1968.

## 5. SNIFF_PEE — поза поднятой лапы картинкой (08.11.2026) — путь 1, шаг 1
* `gemini-3-pro-image` (Nano Banana Pro) через Kling, image-to-image, вход = исходный SNIFF #93, 16:9, 2k. Списано 20 кредитов (баланс до — 1968).
* generation_id: `Aaiyd9xBR_fjzpb1w33WPeDk_TDd_6KjW1x9GcoMQkUn36m8fJt1mJJNeDHqfkS7XewNBWiE`. Промпт — `stage7_fix/sniff/POSE_PROMPT.txt`. Видео — только после приёмки картинки.
* Результат: `stage7_fix/sniff/DOG5_SNIFF_LEGLIFT_POSE_G1_kling_original.png` (SHA `90f39e152f2976ac…`). Лапа согнута и поднята, но колено направлено назад. Ждёт приёмки. Баланс после — 1948.
