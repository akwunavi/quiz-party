# Kling — журнал генераций Пупса (№4, сессии Claude)

Ранние генерации №4 делал Codex. Их промпты и настройки не сохранились (`docs/bulldog-race/ASSET_MANIFEST.json`, `missing-008227`).

## 1. G0 FRONT_STAND (23.10.2026)
* **Инструмент:** `image_to_image`, модель `gemini-3-pro-image` (Nano Banana Pro), 16:9, 2k, 1 картинка.
* **Вход:** `selection_prep/REF_RUN0_studio_no_watermark_1276.png` (RUN #0 со студийным фоном, водяной знак убран заливкой фона).
* **Промпт дословно:** `front_stand_g0/prompt_sent.txt` (= `selection_prep/PROMPT_G0_FRONT_STAND_image.txt`).
* **generationId:** `AUy0xaFMjFx2170txrsdyD1bYHuUR_rSlmzR2KmvGxreK9u7mQcr6Dj5G6oQ27YsXaJIyeZM`.
* **Стоимость:** 20 кредитов (Kling сообщил 20; баланс 2416 → 2396, совпадает).
* **Результат:** `front_stand_g0/G0_kling_original_nowm.png`, 2752×1536, SHA-256 `0b7abea44316d3bead411527c3aaa0b8e5434ef1462d08de5a1e705b51577e2a`. Разбор — `front_stand_g0/REVIEW.md`. На приёмке.

## 2. G1 IDLE (23.10.2026)
* **Инструмент:** `image_to_video`, модель `kling-video-v3_0`, 10 с, 720p, 1 видео, `enable_audio=false`, `prefer_multi_shots=false`.
* **Входы:** first = tail = `front_stand_g0/G0_FRONT_STAND_studio_1276.png` (утверждённый G0, SHA-256 `e5b256e1…`).
* **Промпт дословно:** `idle_g1/prompt_sent.txt` (= `selection_prep/PROMPT_G1_IDLE_video.txt`).
* **generationId:** `AdVcqBNw-JlGwca0dNrFIKyiSghCwP5Avc-sjPNgoey3_Bpc_1FyxjmTMUHOxv17ZlV-TukM`.
* **Стоимость:** 60 кредитов (Kling сообщил 60; баланс 2396 → 2336, совпадает). Готово примерно за 2 минуты.
* **Результат:** `idle_g1/DOG4_IDLE_G1_kling_original.mp4` (без логотипа Kling), 1276×720, 24 к/с, 241 кадр, 10,04 с, без аудиодорожки, SHA-256 `a60c29df16b3bb881cb886310f324bb1a94ce4567012f50e7e85d1667143150e`. Разбор — `idle_g1/REVIEW.md`. На приёмке; alpha не делалась.

## 3. G2 SELECTED (23.10.2026)
* **Инструмент:** `image_to_video`, модель `kling-video-v3_0`, 5 с, 720p, 1 видео, `enable_audio=false`, `prefer_multi_shots=false`.
* **Входы:** first = `front_stand_g0/G0_FRONT_STAND_studio_1276.png` (утверждённый G0). Tail не задавался: финал свободный, по плану.
* **Промпт дословно:** `selected_g2/prompt_sent.txt`. Это согласованный `selection_prep/PROMPT_G2_SELECTED_video.txt` с двумя уточнениями перед запуском:
  * «springs back up» → «pushes himself back up» — чтобы не провоцировать прыжок;
  * добавлено: «ends standing steadily on all four paws», «He stays in the same spot in the centre of the frame the whole time, with his chest facing the camera, without turning his body to the side».
* **generationId:** `AT0NS4JLEwXYwkUTEHCcOU5yy75XOgNdp1Q6qEXHjnJkpt1E--XuYbvoqSGgHfyhNlPOmHJE`.
* **Стоимость:** 30 кредитов (Kling сообщил 30; баланс 2336 → 2306, совпадает).
* **Результат:** `selected_g2/DOG4_SELECTED_G2_kling_original.mp4` (без логотипа), 1276×720, 24 к/с, 121 кадр, 5,04 с, без аудиодорожки, SHA-256 `f4dc891dd26af4aec857def74ff0e229d7ae11c16a40c629667757003c2d2a95`. Разбор — `selected_g2/REVIEW.md`. Alpha не делалась. **Отклонён пользователем** (`selected_g2/REJECTED.md`).

## 4. G2 SELECTED v2, вариант A (23.10.2026)
* **Инструмент:** `image_to_video`, `kling-video-v3_0`, 5 с, 720p, 1 видео, `enable_audio=false`, `prefer_multi_shots=false`.
* **Входы:** first = tail = утверждённый G0 (`front_stand_g0/G0_FRONT_STAND_studio_1276.png`).
* **Промпт дословно:** `selected_g2v2/prompt_sent.txt` (= `selection_prep/PROMPT_G2_SELECTED_v2_A_first_tail.txt`); написан заново после отклонения G2.
* **generationId:** `Af4iApaxMpqwCM3Oxc3SHHnRNy0XEtMTaNamdcGyyI8luWI6ZIKcjSffR-SaDfHQFEFR6YhG`.
* **Стоимость:** 30 кредитов (Kling сообщил 30; баланс 2306 → 2276, совпадает).
* **Результат:** `selected_g2v2/DOG4_SELECTED_G2v2_kling_original.mp4`, 1276×720, 24 к/с, 121 кадр, 5,04 с, без звука, SHA-256 `3a771cb76d0d95a3a20a356cce33e09145800cb84742caa45d09bb5efbbe2b4a`. Разбор — `selected_g2v2/REVIEW.md`. Alpha не делалась.

## 5. G2 SELECTED v3, вариант A (23.10.2026)
* **Инструмент:** `image_to_video`, `kling-video-v3_0`, 5 с, 720p, 1 видео, без звука, одна сцена.
* **Входы:** first = tail = утверждённый G0.
* **Промпт дословно:** `selected_g2v3/prompt_sent.txt` (= `selection_prep/PROMPT_G2_SELECTED_v3_A_first_tail.txt`).
* **generationId:** `AVm_OtQn2o2Z4B00nPsin5z-661y0Zj-apv1_ny2i6TWtYv3VbJINaqXuLH7Nbj6VUuxL5qK`.
* **Стоимость:** 30 кредитов (баланс 2276 → 2246, совпадает).
* **Результат:** `selected_g2v3/DOG4_SELECTED_G2v3_kling_original.mp4`, 121 кадр, 5,04 с, SHA-256 `484b06eb1942c8854d4f625410cf7cb8343f0b8d95d6f2bb20fc75362004df81`. Разбор — `selected_g2v3/REVIEW.md`. Несмотря на прямой запрет, лапы снова поднимаются.
