# bulldog-racing — единая библиотека пяти бульдогов

Подготовка к будущему подключению в Quiz Party. **Не арена и не production**: игровой раунд, `docs/` и Race V3 не затронуты.

```
assets/dogs/<frenk|zefir|rocky|pups|luna>/
  manifest.json        состояния, файлы, кадры, статусы приёмки, масштаб
  SOURCES.lock.json    каждый файл: ветка + коммит + путь-источник + sha256 (библиотека не зависит от веток)
  alpha/ sources/ stills/   мастера alpha 1276×720, оригиналы Kling, стойки
  atlas/               игровые атласы + atlas.json (единый индекс)
  contract/            контракт Race V3 (P3) и данные сдвигов
  runtime/ tools/ docs/ display.json
runtime/dog_visual.mjs     единый визуальный слой (кадр из P3 + сдвиги по правилам собаки)
tools/                     сборщик, контракты, валидатор, замеры, отчёты
lab/                       диагностическая лаборатория в браузере
reports/                   VALIDATION_REPORT.md, SIZE_COMPARISON.md, LAB_DEMO.mp4, сырые данные
STATES.md  DISPLAY_CONTRACT.md  KNOWN_ISSUES.md
```

## Команды (из корня репозитория)
* Пересобрать каталог из веток: `python3 bulldog-racing/tools/build_library.py` (нужен `git fetch`; ветки перечислены в `SOURCES.lock.json`).
* Контракты Зефира/Рокки и индексы атласов: `python3 bulldog-racing/tools/make_contracts.py`; атлас Луны: `python3 bulldog-racing/tools/build_luna_atlas.py`.
* Проверка: `node bulldog-racing/tools/validate_library.mjs 200 && python3 bulldog-racing/tools/measure.py && python3 bulldog-racing/tools/make_report.py`.
* Тесты фазы Рокки: `node --test bulldog-racing/tests/rocky_phase.test.mjs`; сравнение до/после: `python3 bulldog-racing/tools/rocky_phase_eval.py`; воспроизводимость из lock: `python3 bulldog-racing/tools/rebuild_from_lock.py`.
* Лаборатория (режим «Рокки: фаза RUN до/после»): `python3 -m http.server 8000`, затем `http://localhost:8000/bulldog-racing/lab/`.

Зависимости: `race-v3-p3-lab/` и `dog4-v3-lab/` (неизменённые, из этой же ветки), Node 22, Python 3 + Pillow + numpy, ffmpeg с libvpx-vp9 (только для пересборки Луны/манифестов).
