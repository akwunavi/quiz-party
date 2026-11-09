# Живая публика через Kling: техническая проверка и план двух генераций (на согласование; ничего не запускалось)

Решение: вместо 23 изображений — **одна цельная трибуна с публикой** (Kling image) → **оживить** (Kling image-to-video) → превратить в слои для Canvas. Вывод проверки: **способ технически подходит**, есть три риска (ниже). Деньги не тратились; единственное обращение к Kling — чтение баланса и возможностей: **1888 кредитов**.

## 1. Что проверено и чем

| Вопрос | Результат | Как проверено |
|---|---|---|
| Умеет ли Kling замкнуть петлю? | **Да, через `tail_image`**: у `kling-video-v4_0` (и v3.0, v2.5) можно задать последний кадр. Ставим `tail_image = first_image` — клип возвращается к исходной позе | параметры из `who_am_i` (читалка, не генерация) |
| Подходит ли формат кадра? | Да. Видео берёт пропорции входной картинки (допустимо 0.4–2.5), 21:9 = 2.33. Выход до **1080p** (4K у v4.0 выключен) → кадр ≈ 1920×820, это ровно 1× ширины экрана. Длительность 3–30 с, нам хватит 6 | `who_am_i`, ограничения `mediaConstraints` |
| Играет ли Chromium видео с прозрачностью и рисует его в Canvas? | **Да.** WebM VP9 с альфой: угол прозрачный, объект непрозрачный; два `<video>` с разным сдвигом фазы работают; `file://` через Blob (как в автономном демо) — канвас не «пачкается» | живой замер в headless Chromium (синтетический тест-клип, не арт) |
| Конвейер «ключ + маска движения» работает? | Да: `scripts/arena/crowd_pipeline.py` на тест-клипе → `still.webp` (неподвижная архитектура из первого кадра, 100 КБ) + `crowd.webm` (движущиеся области с альфой, 3.3 МБ за 5 с) + отчёт (доля движения, качество петли) | прогон на синтетическом клипе |
| Цена кадра в арене? | В **программном** рендере (без видеокарты): арена 17 к/с без видео, **14,4 к/с с двумя плитками видео** (≈ +28 мс на кадр). На реальной GPU заметно дешевле, но **это надо измерить на железе проектора** | замер внутри настоящей арены |
| Сколько стоят две генерации? | **Неизвестно.** API цену не показывает, пробный запрос (даже «сухой») списывает кредиты. Измерю точно: баланс до и после каждой генерации | — |

**По дороге найден и исправлен мой дефект:** кадр арены в программном рендере стоил 66 мс из-за размытия северного сияния на полном разрешении. Теперь 36 мс (размытие на маленьком холсте). Исправление в этом же коммите.

## 2. Как публика попадёт в арену (без покадровой анимации людей)
1. Kling рисует трибуну с публикой **на сплошном пурпуре #FF00FF** → пурпур вырезается в прозрачность.
2. Kling оживляет её **при неподвижной камере**; архитектура в видео может «плыть», поэтому в кадр берётся **неподвижный слой из первого кадра**, а видео накладывается **только там, где есть движение** (маска считается автоматически по разбросу яркости во времени).
3. В Canvas: слой `still` + поверх `crowd.webm` (`<video>`, без звука, зациклено). Один модуль = 1920 px при параллаксе 0.92; для 7,8 тыс. px мира плитки идут **зеркально через одну** и играют **с разным сдвигом фазы** (два `<video>`): соседние плитки не хлопают в унисон и не выглядят клонами. Рисуются только видимые плитки.
4. Освещение согласовано через промпт (тот же закат слева-сзади, тёплые окна и гирлянды), цветокоррекция и виньетка арены накрывают слой сверху.
5. Нужна ли вторая вариация — решаем **только после просмотра первого результата** в движении.

## 3. Параметры (проект: два платных вызова, оба — после вашего «да»)

**Генерация 1 — картинка**
- инструмент `text_to_image`, модель **`kling-image-v3_0_omni`** (по умолчанию), `img_resolution=2k`, `aspect_ratio=21:9`, `imageCount=1`
- (запасные модели в том же аккаунте: `gemini-3-pro-image` — лучше сложные сцены, `gemini-3.1-flash-image` — дешевле; цены не знаю)

**Генерация 2 — оживление**
- инструмент `image_to_video`, модель **`kling-video-v4_0`**, `first_image` = `tail_image` = результат генерации 1, `duration=6`, `resolution=1080p`, `aspect_ratio` не передаю (следует за картинкой), `imageCount=1`

**Порядок с остановками:** (а) проверяю баланс → (б) генерация 1 → снова баланс, показываю картинку и фактическую цену, жду «да» → (в) генерация 2 → баланс, MP4, отчёт конвейера. Если картинка не годится, повтор — только с вашего слова.

### Промпт 1 (картинка)
```
Painterly stylized winter evening illustration, soft volumetric forms, warm-cool dusk lighting: low sunset light
from the left-back (pink-amber), cool violet-indigo fill, glowing warm lights as the main accents.
A wide multi-level wooden spectator grandstand seen strictly from the side (orthographic, camera slightly above
the ground, all horizontal lines perfectly horizontal, no perspective convergence), covered by a canopy roof with
warm light panels, string lights and pennant flags, dark-navy metal accents and copper-orange pennants. Three tiers
densely packed with a cheering crowd of about 120 diverse people in winter coats, knit hats and scarves, some holding
small flags, expressive painterly faces readable at a distance. A wooden parapet along the base with navy-and-copper
banner panels. The whole structure stands on one straight horizontal baseline at the very bottom edge of the frame,
nothing below it. Isolated on a flat solid pure magenta #FF00FF background: no sky, no ground, no snow, no clouds,
no gradient, no cast shadows on the background. The left and right 100 px of the frame stay empty magenta.
No text, no letters, no logos, no watermark, no dogs, no ice, no photo-realism, no flat vector look.
```

### Промпт 2 (оживление)
```
Locked-off static camera, absolutely no camera movement, no zoom, no pan. The grandstand architecture, roof, lights,
pennants and banners stay completely rigid and unchanged. The crowd comes alive with gentle natural motion: people clap,
some raise their arms and cheer, small flags wave, a few bounce slightly, heads turn toward the track, small independent
movements out of sync with each other. Nobody leaves their place, no new people appear, faces keep their look.
The flat solid magenta background stays exactly the same color. Calm loopable motion; the last frame returns to the first.
```

## 4. Риски и что будет делать приёмка
1. **«Плывёт» архитектура/лица, мерцает фон.** Смягчено: неподвижный слой берётся из первого кадра, видео — только в маске движения. Приёмка: просмотр в арене на 22 с.
2. **Шов петли.** `tail_image = first_image` + метрика в отчёте (`loop_first_last_mean_diff` < 3 — хорошо). Запасной путь — ping-pong в конвейере.
3. **Края и пурпур.** ИИ может «размазать» пурпур в розовый. Приёмка: `scripts/arena/check_layer.py` (остаток ключа), при плохой кайме — подавление, затем повтор.
4. **Железо.** VP9-альфа в `<video>` — Chromium (проектор), Safari не умеет (запасной вариант — только неподвижный слой). Цену кадра на проекторе измерить до приёмки.
5. **Повтор «клонов».** Зеркало + фазы дают ~4 разных вида; если мало — вторая вариация после оценки.
6. **4K.** Видео выходит в 1080p; на 3840×2160 публика будет мягче — приемлемо для зрительской массы на втором плане.

## 5. Что нужно от вас
Сказать «да» на генерацию 1 (и затем отдельно на генерацию 2). Дополнительно — подтвердить модель (по умолчанию `kling-image-v3_0_omni`) и допустимую верхнюю границу расхода (после генерации 1 покажу фактическую цену, дальше решаете вы).
