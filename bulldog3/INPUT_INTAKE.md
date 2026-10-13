# Дополнительные пользовательские вложения №3 — 13.10.2026

Первое сообщение с новым заданием содержало только текст с именами четырёх файлов. После запроса пользователь **отдельно приложил четыре видео**, и они сохранены без изменения байтов в `assets/incoming/`:

| Заявленное имя | Имя фактического вложения | Путь в репозитории |
| --- | --- | --- |
| `bulldog_3_idle.mp4` | `bulldog_3_idle.mp4` | `bulldog3/assets/incoming/bulldog_3_idle.mp4` |
| `bulldog_3_selected.mp4` | `bulldog_3_selected.mp4` | `bulldog3/assets/incoming/bulldog_3_selected.mp4` |
| `bulldog_3_run(1).mp4` | `bulldog_3_run.mp4` | `bulldog3/assets/incoming/bulldog_3_run.mp4` |
| `dog3-run-alpha.webm` | `dog3-run-alpha.webm` | `bulldog3/assets/incoming/dog3-run-alpha.webm` |

Побайтовая проверка SHA-256 показала: присланный RUN совпадает с ранее изученным историческим оригиналом, присланный WebM — с alpha-v1, а не исправленным alpha-v2. Это **пользовательская повторная передача** этих байтов, не результат повторного архивного поиска. Метаданные, хэши и оценка IDLE/SELECTED приведены в [ASSET_ACCEPTANCE.md](ASSET_ACCEPTANCE.md) и [MANIFEST.json](MANIFEST.json).
