# P1 арены — план генераций (на согласование; ничего не запускалось)

Статус: код слотов готов (`src/lib/bulldog/arena/slots.ts`), проверка присланных файлов готова (`scripts/arena/check_layer.py`). **Нужны только исходные изображения.** Платных генераций я не запускал; на аккаунте Kling доступно **1888 кредитов** (стоимость одной генерации изображения я не знаю — её видно только после первой пробной, поэтому ниже считаю в штуках, не в кредитах). Опорные кадры концептов: `arena-brief/references/` (B-3, C-3, C-5, B-2), по ним задаётся стиль и композиция.

## 1. Два варианта объёма — нужно выбрать один

### Вариант A (рекомендую для первой версии): «как в концепте» — меньше слоёв, быстрее результат
Публика уже стоит на трибунах внутри одного изображения (так нарисованы концепты B-3/C-3), код оживляет её срезами и вспышками. Минус: толпа не отдельный анимируемый слой.

| Слой | Что в кадре | Принятых изображений | Ожидаемо попыток* |
|---|---|---|---|
| `village_mid` | Зимняя деревня: шале 2–3 этажа, тёплые окна, балконы, гирлянды, снежные кровли, дым, колокольня. **Без людей.** | **3** модуля | 8–10 |
| `stands_crowd` | Деревянные многоярусные трибуны и навесы **с плотной публикой** (3 яруса зрителей, разные куртки, шапки, шарфы, флажки), гирлянды, вымпелы | **3** модуля | 8–12 |
| `spruce_set` | Лист из 4–5 крупных заснеженных елей на одном изображении (вырезаются спрайтами, закрывают стыки модулей) | **2** листа | 4–6 |
| **Итого** |  | **8** | **≈ 20–28** |

### Вариант B (полный): отдельные слои и анимируемая толпа
| Слой | Принятых изображений | Ожидаемо попыток* |
|---|---|---|
| `village_mid` — 4 модуля | 4 | 10–12 |
| `stands` — пустые трибуны, 3 модуля | 3 | 9–12 |
| `crowd` — 3 ряда × 2 модуля, поза «спокойно» | 6 | 14–18 |
| `crowd` — те же 6 в позе «руки вверх» (image-to-image от «спокойно», чтобы люди совпали) | 6 | 12–16 |
| `spruce_set` — 2 листа | 2 | 4–6 |
| `forest_far` — дальний склон, бесшовный | 2 | 4–6 |
| **Итого** | **23** | **≈ 55–70** |

*Попытки — оценка с запасом на несогласованность света/палитры и стыки; точное число зависит от доли принятых результатов. Реалистично, что в обоих вариантах 1/3 генераций пойдёт в зачёт.
Рекомендация: **A**, затем (если результат понравится и захочется живой толпы) добавить B только для толпы.

## 2. Общие условия для КАЖДОЙ генерации
- **Формат:** 16:9, максимальное разрешение генератора (≈2752×1536). Из кадра вырезается горизонтальная полоса по нижней линии объектов — поэтому **объекты должны стоять на одной горизонтальной линии у нижнего края кадра**, ниже неё — ничего (ни земли, ни льда).
- **Фон — сплошной #FF00FF (пурпур), без градиента, без облаков, без гор, без теней на фоне.** По нему делаем прозрачность. Если генератор не держит ровный фон — просить «isolated on solid magenta chroma-key background, no sky».
- **Ракурс:** строго боковой, фасады смотрят в камеру, камера на уровне чуть выше земли, **горизонтали горизонтальны**, без сходящейся перспективы (ортографический вид).
- **Свет:** закат слева-сзади (тёплый розово-янтарный), холодный фиолетово-синий заполняющий свет, **тёплые окна, гирлянды и фонари — главные акценты**; снег в тени сиреневый, на свету тёпло-белый.
- **Стиль:** живописно-иллюстративный, как кадры B-3 и C-3: мягкие объёмные формы, читаемые силуэты, не гиперреализм, не плоский вектор; такого же «мягкого 3D-рендера» характера, как собаки.
- **Края:** левые и правые **120 px (при ширине 2752) пустые** (только пурпур) — стыки модулей закрывают ели и фонари, подгонять края друг к другу не нужно.
- **Запрещено:** собаки, лёд/дорожки, текст и надписи, водяные знаки, логотипы, крупные объекты, уходящие ниже нижней линии, одинаковые повторяющиеся шале в соседних модулях.

## 3. Каркас промпта (одинаковый для всех, меняется только блок «ОБЪЕКТ»)
```
Painterly stylized winter evening illustration, soft volumetric forms, warm-cool dusk lighting:
key light low sunset from the left-back (pink-amber), cool violet-indigo fill from the sky,
glowing warm windows, string lights and lanterns as the main accents. Strictly side orthographic
view, camera slightly above ground, all horizontal lines perfectly horizontal, no perspective
convergence. Wide 16:9 frame. All objects stand on one straight horizontal baseline at the very
bottom edge of the image; nothing below the baseline. Isolated on a flat solid #FF00FF magenta
chroma-key background — no sky, no ground, no clouds, no gradient, no cast shadows on background.
The left and right 120 px of the frame stay empty magenta. No text, no logos, no watermark,
no people unless stated, no dogs, no ice, no foreground objects.
ОБЪЕКТ: ...
```
**Негативные:** `sky, clouds, mountains, ground, ice, track, text, letters, logo, watermark, photo-realistic, flat vector, fisheye, perspective, dogs, blur, duplicate buildings`.

## 4. Блок «ОБЪЕКТ» для каждого слоя
- **village_mid (модуль 1/2/3):** `a continuous row of 4–5 timber alpine chalets of different heights and widths, 2–3 storeys, steep snow-laden roofs with soft thick snow caps, warm glowing windows, wooden balconies with garlands of tiny warm lights, smoking chimneys, a few snowy spruce trees between houses; module 1 includes a small bell tower; module 2 includes a market stall with a red-white striped awning; module 3 includes a large decorated Christmas tree between houses. No people.` (каждый модуль — свой набор зданий)
- **stands_crowd (модуль 1/2/3):** `multi-level wooden spectator grandstand with canopy roof, dark-navy metal accents and warm light panels, garlands and pennant flags along the canopy edge, three tiers densely packed with a cheering crowd in winter coats, hats and scarves, some waving small flags, diverse people, painterly stylized faces; wooden parapet at the base with navy-and-copper banner panels.` Модули 1–3 различаются архитектурой (под навесом / открытые / с высокой центральной частью).
- **spruce_set (лист 1/2):** `a set of 4 large snow-laden spruce trees of different heights (tall, medium, wide, slim), thick drooping snowy branches, a few warm string-light bulbs on lower branches; each tree fully separated with clear magenta space between them, all trunks on the same baseline.`
- *(только B)* **stands (пустые):** `... three tiers of wooden benches completely empty, no people ...`; **crowd ряд 1/2/3:** `a single row of about 40 spectators standing shoulder to shoulder, waist-up, in winter clothes, calm, facing the camera/track, painterly; row 1 largest in the frame, row 3 smallest; on magenta`; **crowd «руки вверх»:** image-to-image от «спокойно» с подписью `same people, arms raised cheering, waving flags`.

## 5. Обработка после генерации (на моей стороне)
1. Вырезать полосу по нижней линии, убрать пурпур (хромакей + удаление пурпурной каймы), мягкий край 1 px.
2. Привести к ширине модуля (2752 px при 1×; для 4K — апскейл 2×, это снижает резкость, поэтому для проектора 4K лучше сразу просить максимальное разрешение).
3. Собрать модули в файл `village_mid.webp` / `stands_crowd.webp` (3 модуля по горизонтали), `spruce_set.webp` (лист) + карту прямоугольников.
4. Прогнать `python3 scripts/arena/check_layer.py <файл> <id>`; положить в `public/arena/`; открыть `arena.html?slots`; снять кадры и MP4 22 с.

## 6. Критерии приёмки (как в ТЗ, §3)
Нет швов и «ореолов» по краю; нижняя кромка садится на борт без щели; публика читается как публика (лица/куртки различимы на 1080p), а не шум; тёплые акценты есть, но не засвечивают собак; **коридор читаемости 5 дорожек чист: ничто не заходит ниже y=568**; на 3840×2160 детали остаются резкими.

## 7. Что нужно от вас, чтобы продолжить
1. Выбрать вариант A или B.
2. Подтвердить, **чем генерируем** (Kling image, другой инструмент, Blender) и дать согласие на расход кредитов (пробная генерация покажет цену одной).
3. Прислать готовые изображения в папку `arena-brief/incoming/` (или любым способом) — дальше сборка и интеграция займут один заход.
