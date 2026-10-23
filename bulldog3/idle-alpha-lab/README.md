# Рокки — IDLE B alpha: изолированная лаборатория выбора

Утверждённая карта: [B в frame_map.json](../idle-full-review/frame_map.json). Исходный `bulldog3/assets/incoming/bulldog_3_idle.mp4` и `SELECTED` не изменены.

## Смотреть без сервера

- [Три цикла на белом, чёрном, зелёном и бежевом](DOG3_IDLE_B_THREE_CYCLES_FOUR_BACKGROUNDS.mp4) — H.264 MP4, 30 секунд.
- [Три цикла в проверочном размере экрана выбора](DOG3_IDLE_B_THREE_CYCLES_SELECTION_SCALE.mp4) — H.264 MP4, 30 секунд.
- [Сравнение FRONT_STAND, IDLE #0 и SELECTED #0](FRONT_STAND_IDLE_SELECTED_COMPARISON.png).

## Alpha-файлы

- [Полный утверждённый цикл B, 240 кадров](assets/DOG3_IDLE_B_ALPHA_240.webm) — VP9 с alpha, 1276×720, 24 FPS.
- [Обработанный исходник, 121 кадр](assets/DOG3_IDLE_SOURCE_ALPHA_121.webm).
- [FRONT_STAND #0 с alpha](assets/DOG3_FRONT_STAND_ALPHA.png).

## Локальная лаборатория

Из корня репозитория:

```bash
python3 -m http.server 8000
```

Страница: `http://127.0.0.1:8000/bulldog3/idle-alpha-lab/`. Кнопки переключают фон; ползунок меняет размер. Значение 207×116 px повторяет предыдущий диагностический просмотр варианта B, но не задаёт production-разметку.

[Проверка и ограничения](REPORT.md). RETURN_TO_IDLE и переход к SELECTED здесь не реализованы.
