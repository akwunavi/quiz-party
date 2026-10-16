# Рокки — изолированная лаборатория STOP Race V3

Лаборатория показывает RUN → STOP → RACE_STAND для пяти темпов `.75×`, `.90×`, `1.00×`, `1.10×`, `1.25×`. Все пять строк — **Рокки**, а не разные собаки. В окне STOP ровно 37 кадров при 24 FPS. Физика в `model.mjs` побайтово скопирована из существующей Race V3 (`SHA-256 3fa4a72f59bfaee9bfeb4bdd5e6165c122dda76be3945ffa164acebe8b215515`); исходная модель и production не изменены. Арена также является побайтовой копией.

Обычное видео без сервера: [DOG3_ROCKY_STOP_V3_GAMEPLAY.mp4](DOG3_ROCKY_STOP_V3_GAMEPLAY.mp4). Прозрачный STOP: [assets/rocky-stop-alpha-37.webm](assets/rocky-stop-alpha-37.webm). Прозрачная производная утверждённой стойки: [assets/rocky-race-stand-alpha.png](assets/rocky-race-stand-alpha.png). Проверка контуров на четырёх фонах: [ALPHA_QA_WHITE_BLACK_GREEN_BEIGE.png](ALPHA_QA_WHITE_BLACK_GREEN_BEIGE.png).

Для интерактивного просмотра из корня репозитория:

```bash
python -m http.server 8765 --bind 127.0.0.1 --directory bulldog3/stop-v3-lab
```

Адрес: `http://127.0.0.1:8765/`. Кнопки Play, Начало и ползунок меняют только время просмотра. Для повторной проверки Chromium и записи MP4: `cd bulldog3/stop-v3-lab && node record.mjs`. Требуются установленный `playwright-core`, Chromium `/usr/bin/chromium` и FFmpeg.

`build_assets.py` воспроизводит принятый индивидуальный тайминг и локальное положение рисунка из уже обработанных RGBA кадров. Точный список исходных кадров находится в `retiming.json`. Расчёт alpha исходных STOP #18–72 выполнен существующим `bulldog1-frenk/alpha_pipeline/dog_alpha.py`; одноразовые маски и RGBA лежат вне репозитория в рабочем архиве среды. Отчёт о качестве: [REPORT.md](REPORT.md).
