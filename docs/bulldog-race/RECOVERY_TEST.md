# Проверка восстановления из чистого клона

Источник: `git clone --branch codex/dog4-race-v3-5lane-20261012 https://github.com/akwunavi/quiz-party.git /tmp/dog4-clean-recovery`. Обычный clone получил все исторические remote refs; рабочие каталоги `/workspace/artifacts` и `/workspace/attachments` не использовались для тестов.

| Проверка | Результат |
|---|---|
| Главная инструкция и манифест | `docs/bulldog-race/README.md`, `RECOVERY.md` и `ASSET_MANIFEST.json` доступны. |
| Целостность архива | `python docs/bulldog-race/tools/verify_archive.py`: 21 часть, 7 163 уникальных payload, 8 229 логических записей, 0 ошибок. |
| Извлечение файла | `restore_asset.py asset-005608 /tmp/dog4-clean-sniff-v2.webm`: 22 334 904 байта, SHA-256 `c8e5ea8cad5d845d58af76ef5024286d1e42eb2ac24a9d07f417c75d01a149e4`. |
| Фиксированные сценарии | `node validate.mjs` прошёл. |
| Seeded/fallback/распределения и финиш в START | `node fallback_validate.mjs 10000` прошёл: 32 fallback из 10 000, `20261423 → 20261424`, пересечение в START при 41,9103859 с. |
| Контрольное видео | `DOG4_V3_RANDOM_SEED_20261013.mp4`: H.264/yuv420p, 1920×1080, 24 FPS, 64,541667 с; полный ffmpeg decode без ошибок. В Chromium через локальный HTTP `<video>` загрузилось без ошибки и `currentTime` дошёл до 1,70 с. |
| Браузерная лаборатория | `NODE_PATH=/tmp/race-preview-tools/node_modules node browser_check.mjs` прошёл в Chromium: A/B/C и RANDOM 20261013 проиграны до финиша, reset и повторная генерация детерминированы, fallback 20261423→20261424 стабилен, ошибок страницы нет. Playwright Core и Chromium — внешние инструменты теста, обычный HTTP-просмотр лаборатории их не требует. |

Оригинальные тексты Kling prompts и отдельный BONE source остаются недоступны, как указано в `KNOWN_ISSUES.md` и записях `MISSING`. Проверка архива подтверждает сохранность **доступных** файлов, а не полноту всей прежней переписки.
