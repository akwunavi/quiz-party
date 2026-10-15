# Alpha экрана выбора Фрэнка: IDLE, SELECTED, RETURN_TO_IDLE (v1, 15.10.2026)

Готовые alpha-файлы (исходники лежат отдельно: `../assets/sources/`, `../return_to_idle_v1/`):
* `DOG1_IDLE_v1_alpha_loop220.webm` — цикл IDLE для игры (220 кадров, `loop`), собран `build_idle_loop.sh` из `DOG1_IDLE_v1_alpha_f8-f118.webm`;
* `DOG1_SELECTED_v1_alpha_f20-f121.webm` — 102 кадра;
* `DOG1_RETURN_TO_IDLE_v1_alpha_r2-r121.webm` — 120 кадров, с утверждённой поправкой тона (`../return_to_idle_v1/make_graded_frames.py`).

Как получены — `run_alpha.sh` (проверенный конвейер `../alpha_pipeline/dog_alpha.py`, настройки по умолчанию, без автоматической чистки пола). Плеер для браузера — `player/`, проверки — `tools/`, результаты и видео — `results/`. Отчёт о готовности всей библиотеки — `../library_v1/README.md`.
