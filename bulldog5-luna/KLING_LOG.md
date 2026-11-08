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
