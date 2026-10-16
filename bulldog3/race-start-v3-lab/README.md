# Рокки — изолированная лаборатория RACE_START Race V3

Анимационный результат Kling RACE_START принят пользователем. Эта лаборатория проверяет отдельную техническую интеграцию; её игровой вид ещё ждёт визуальной приёмки. Утверждённые STOP, RUN loop и RACE_STAND не изменены. Физика в `model.mjs` побайтово совпадает с существующей моделью Race V3 (`SHA-256 3fa4a72f59bfaee9bfeb4bdd5e6165c122dda76be3945ffa164acebe8b215515`).

## Смотреть без сервера

- [Игровой MP4: пять темпов Рокки](DOG3_ROCKY_RACE_START_GAMEPLAY.mp4)
- [Игровой MP4: Рокки и Bulldog №4](DOG3_ROCKY_VS_DOG4_SCALE.mp4)
- [Крупный план стыка START → RUN](DOG3_ROCKY_START_RUN_SEAM_CLOSE.mp4)
- [Прозрачный RACE_START, WebM VP9 alpha](assets/rocky-race-start-alpha-24.webm)
- [Края на четырёх фонах](ALPHA_QA_WHITE_BLACK_GREEN_BEIGE.jpg)

## Интерактивная лаборатория

Из корня репозитория:

```bash
python -m http.server 8766 --bind 127.0.0.1 --directory bulldog3/race-start-v3-lab
```

Адрес страницы: `http://127.0.0.1:8766/`; сравнение: `http://127.0.0.1:8766/?compare=1`. Есть Play, пауза, возврат и выбор кадра. HTML требует локального HTTP-сервера; MP4 доступны отдельно.

## Воспроизведение обработки

Исходный Kling MP4 без изменений лежит в `assets/DOG3_RACE_START_KLING_V3_ORIGINAL.mp4`. Существующий общий конвейер `bulldog1-frenk/alpha_pipeline/dog_alpha.py` обработал кадры #16–53 во внешнем кэше. `repair_eye_alpha.py` точечно восстанавливает исходный RGB светлого глаза в замкнутых отверстиях alpha-маски. Для игрового клипа выбраны #18–41. `build_assets.py` использует подготовленные RGBA, уже существующий RUN alpha-v2 и утверждённую стойку; `retiming.json` фиксирует точную выборку кадров.

Для проверки и записи MP4: `node bulldog3/race-start-v3-lab/record.mjs`. Нужны установленные `playwright-core`, Chromium `/usr/bin/chromium`, Python и FFmpeg. Это диагностическая лаборатория, не production-компонент.

Точные границы, стыки и оставшиеся ограничения — в [REPORT.md](REPORT.md).
