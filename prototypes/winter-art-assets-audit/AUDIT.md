# Bulldog Racing — аудит художественных ресурсов B+C

Дата проверки: 2026-11-08. Это исследование ассетов; новая арена, игровой
рендер и Race V3 не создавались и не изменялись.

## Вывод

**Полного художественного набора пока нет.** Доступные CC0 файлы дают
качественные материалы снега/льда/дерева и несколько детализированных
фонарей, ворот и хвойных саженцев. Ключевые объекты концептов B+C — плотные
заснеженные взрослые ели, трибуна, зимнее шале и выразительные болельщики —
не найдены в качестве, согласованном с утверждёнными собаками. Поэтому
переходить к новой сцене из этого набора преждевременно.

## Что реально доступно из этой среды

Среда работает с ограниченным списком сетевых доменов. HTTP-запросы к
`polyhaven.com`, `api.polyhaven.com`, `cdn.polyhaven.com`, `sketchfab.com`,
`api.sketchfab.com`, `kenney.nl`, `ambientcg.com` и `quaternius.com` получили
`CONNECT tunnel failed, response 403`. Каталоги и их официальные файлы не
проверены в этой среде; карточку ассета нельзя считать подтверждением
скачивания. GitHub и `raw.githubusercontent.com` доступны, поэтому ниже
проверены конкретные файлы из публичных репозиториев и зеркал. Браузерный
инструмент общего рабочего стола в текущей среде отсутствует; проверка
проводилась загрузкой файлов и импортом в Blender 4.3.2.

| Источник | Проверка файлов | Лицензия и вывод |
| --- | --- | --- |
| Sketchfab | Сайт и API заблокированы прокси; ни один файл не загружен | У моделей индивидуальные условия; кандидатов для использования нет |
| Poly Haven напрямую | Сайт, API и CDN заблокированы | [официальное описание API](https://github.com/Poly-Haven/Public-API) указывает CC0 для ассетов; точные страницы отдельных моделей не открылись |
| Poly Haven через [публичное зеркало моделей](https://github.com/Papyszoo/CC0-Public-Domain-Models) | Семь GLB фактически скачаны; Blender импортировал геометрию и встроенные текстуры | [CC0 в репозитории зеркала](https://github.com/Papyszoo/CC0-Public-Domain-Models/blob/main/LICENSE); происхождение каждого зеркального GLB по официальной карточке пока не перепроверено |
| Poly Haven / AmbientCG через [зеркало PBR](https://github.com/Papyszoo/CC0-Public-Domain-Textures) | KTX2 512×512 фактически скачаны, PNG извлечены, Blender открыл PNG | [CC0 в репозитории зеркала](https://github.com/Papyszoo/CC0-Public-Domain-Textures/blob/main/LICENSE); высокие разрешения по первичным ссылкам сейчас недоступны |
| Kenney | Сайт заблокирован; [публичное зеркало](https://github.com/shorepine/kenney) дало GLB дерева и отдельную текстуру; Blender импортировал оба | [описание зеркала](https://github.com/shorepine/kenney/blob/main/README.md) указывает CC0; стиль слишком упрощён для главных декораций |
| Quaternius / Polygonal Mind | Сайты недоступны; зеркальные GLB и превью скачаны и импортированы | CC0 указан в [реестре](https://github.com/ToxSam/open-source-3D-assets) и [лицензии набора](https://github.com/ToxSam/cc0-models-Polygonal-Mind/blob/main/License.md), но первоисточники не проверены; художественно отклонены |
| Khronos glTF Sample Assets | [Lantern GLB](https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Lantern/glTF-Binary/Lantern.glb) фактически загружен, 9,56 МБ, импортирован | [CC0 на странице модели](https://github.com/KhronosGroup/glTF-Sample-Assets/blob/main/Models/Lantern/README.md); безопасный кандидат для второстепенного декора |

## Конкретные кандидаты

Файлы в `downloads/` проверены по сигнатуре и SHA-256 в
[`DOWNLOAD_VALIDATION.json`](DOWNLOAD_VALIDATION.json). Для GLB записаны
результаты импорта Blender и число треугольников в
[`MODEL_TECH_CHECK.json`](MODEL_TECH_CHECK.json).

### Модели

| Модель и файл | Предпросмотр | Фактическая оценка для B+C и боковой камеры |
| --- | --- | --- |
| [Poly Haven Fir Sapling GLB](https://raw.githubusercontent.com/Papyszoo/CC0-Public-Domain-Models/main/packs/polyhaven-nature-plants/models/fir_sapling/fir_sapling.glb), 25,4 МБ, 433 тыс. треугольников | [студийный PNG](review/PolyHaven_fir_sapling_studio.png) | Качественная хвоя и ветви, три разреженных саженца; ракурс устойчив. Не является взрослой заснеженной елью концепта. Годится только дальним планом после зимней обработки. |
| [Poly Haven Pine Sapling Small GLB](https://raw.githubusercontent.com/Papyszoo/CC0-Public-Domain-Models/main/packs/polyhaven-nature-plants/models/pine_sapling_small/pine_sapling_small.glb), 21,9 МБ, 398 тыс. треугольников | [студийный PNG](review/PolyHaven_pine_sapling_small_studio.png) | Та же проблема: тонкие разреженные деревья без снега; дальний план. |
| [Poly Haven Lantern 01 GLB](https://raw.githubusercontent.com/Papyszoo/CC0-Public-Domain-Models/main/packs/polyhaven-urban-street/models/lantern_01/lantern_01.glb), 1,42 МБ, 33,9 тыс. треугольников | [студийный PNG](review/PolyHaven_lantern_01_studio.png) | Детализированный старый фонарь; подходит атмосфере C при тёплом свете, почти независим от бокового ракурса. |
| [Poly Haven Wooden Lantern 01 GLB](https://raw.githubusercontent.com/Papyszoo/CC0-Public-Domain-Models/main/packs/polyhaven-maritime-structures/models/wooden_lantern_01/wooden_lantern_01.glb), 3,77 МБ, 8,3 тыс. треугольников | [студийный PNG](review/PolyHaven_wooden_lantern_01_studio.png) | Деревянный зимний реквизит на заднем плане. Нужно сверить размер с собаками и добавить источник света в Blender. |
| [Poly Haven Large Iron Gate GLB](https://raw.githubusercontent.com/Papyszoo/CC0-Public-Domain-Models/main/packs/polyhaven-urban-street/models/large_iron_gate/large_iron_gate.glb), 3,13 МБ, 38,1 тыс. треугольников | [студийный PNG](review/PolyHaven_large_iron_gate_studio.png) | Может служить воротами за зрителями. Для борта вдоль дорожек слишком высокое и ажурное; на переднем плане перекроет собак. |
| [Khronos Lantern GLB](https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Lantern/glTF-Binary/Lantern.glb), 9,56 МБ, 5,4 тыс. треугольников | [оригинальный PNG](review/Khronos_Lantern_preview.jpg) | Надёжный по правам резервный деревенский фонарь; менее богатый по материалам, чем Poly Haven. |

Весь проверенный ряд Poly Haven показан на [общем листе](review/POLY_HAVEN_MODEL_CANDIDATES.jpg).
Модуль городского фасада технически импортируется, но выглядит как городской
дом, а не зимнее шале, поэтому в набор не рекомендован.

### Материалы

| Материал и файл | Предпросмотр | Оценка |
| --- | --- | --- |
| [Poly Haven Snow 02 KTX2](https://raw.githubusercontent.com/Papyszoo/CC0-Public-Domain-Textures/main/packs/polyhaven-textures/textures/snow_02/snow_02_albedo.ktx2) | [PNG](review/snow_02_preview.png) | Светлый снег для борта и насыпи, ближе к B+C. Фактически загружены albedo, normal и roughness. |
| [AmbientCG Ice002 KTX2](https://raw.githubusercontent.com/Papyszoo/CC0-Public-Domain-Textures/main/packs/ambientcg-textures/textures/Ice002/Ice002_1K-PNG_Color.ktx2) | [PNG](review/Ice002_preview.png) | Детализированные трещины, но лёд темнее и зеленее концепта. Подходит фрагментами; сплошная дорожка снизит читаемость лап. |
| [AmbientCG Snow003 KTX2](https://raw.githubusercontent.com/Papyszoo/CC0-Public-Domain-Textures/main/packs/ambientcg-textures/textures/Snow003/Snow003_1K-PNG_Color.ktx2) | [PNG](review/Snow003_preview.png) | Мягкая снежная фактура для больших масс, после проверки палитры под вечерним светом. |
| [Poly Haven Roof Planks KTX2](https://raw.githubusercontent.com/Papyszoo/CC0-Public-Domain-Textures/main/packs/polyhaven-textures/textures/roof_planks/roof_planks_albedo.ktx2) | [PNG](review/roof_planks_preview.png) | Тёплая деревянная кровля для шале/трибуны, деталь поверхности лучше однотонной модели. |

Сравнение остальных фактур: [Poly Haven](review/POLY_HAVEN_MATERIAL_CANDIDATES.jpg),
[AmbientCG снег и лёд](review/SNOW_ICE_MATERIAL_CANDIDATES.jpg),
[AmbientCG дерево](review/WOOD_MATERIAL_CANDIDATES.jpg).
В зеркале доступны только карты 512×512. Это достаточно для пробного
запекания небольших объектов, но не подтверждает качество крупных планов на
проекторе. Оригинальные разрешения 2K–8K остаются недоступны.

Файл KTX2 напрямую Blender не открыл (`image.size = 0`). Я загрузил
[официальную KTX-Software 4.4.2](https://github.com/KhronosGroup/KTX-Software/releases/tag/v4.4.2)
с GitHub и извлёк PNG командой `ktx extract --transcode rgba8 input.ktx2 output.png`.
Blender успешно загрузил полученный PNG 512×512. Исходные KTX2 и полученные
карты лежат рядом в `downloads/`; лицензия от конвертации не меняется.

## Проверка стилистики

[Утверждённые Фрэнк и Рокки](review/APPROVED_DOG_STYLE_REFERENCES.jpg) имеют
мягкую, довольно детальную 3D-шерсть и выразительные морды. У B+C — плотная
архитектура, многослойный лес, зимне одетая толпа и тёплый свет в холодном
воздухе. [Сравнение на одном листе](review/STYLE_FIT_BC_DOGS_ASSETS.jpg)
показывает, что PBR материалы и фонари ближе к этой цели, чем отклонённые
примитивы `9d6a7f7`. Саженцы недостаточно объёмны, а готовые люди из
Quaternius не имеют зимней одежды и заметно проще собак.

Загруженный набор Polygonal Mind Christmas содержит ёлку, ограду, венок,
фонарь и арку, но [превью](review/POLYGONAL_MIND_CANDIDATES.jpg) демонстрирует
плоский low-poly стиль. [Позы зрителей Quaternius](review/QUATERNIUS_CROWD_CANDIDATES.jpg)
можно использовать только для схемы рассадки, не как финальную толпу.
Kenney Mini Forest tree — GLB 23 КБ с отдельной `Textures/colormap.png`;
оба файла доступны и импортируются, но 182 треугольника неприемлемы для
главных елей.

## Что не найдено

- Взрослые плотные ели с естественным снегом на ветвях и проверенной лицензией.
- Готовая зимняя спортивная трибуна с читаемыми конструкциями.
- Шале или зимний стадион в подходящей стилистике и боковом ракурсе.
- Модели болельщиков в зимней одежде с выразительными позами и лицами.
- Невысокие защитные ограждения, которые не закрывают собак.
- Высокие разрешения первичных снежных и ледяных материалов из официальных каталогов.

## Рекомендация и следующий автоматизированный процесс

Рекомендую **частичный набор**, а не объявление полного art kit: Snow 02,
Ice002 как акцент, Snow003, Roof Planks, Poly Haven Lantern 01 и Wooden Lantern
01. Fir/Pine Sapling — только дальний план. Ворота — только позади дорожек.
Перед использованием зеркальных Poly Haven и AmbientCG файлов в игре следует
сверить отдельные оригинальные карточки и их происхождение после появления
доступа к доменам. Официальный Khronos Lantern уже имеет прямую CC0 запись.

Для недостающих крупных объектов предлагаю два проверяемых шага:

1. Разрешить прямой доступ среды к первичным каталогам и их файловым CDN:
   `polyhaven.com`, `api.polyhaven.com`, `cdn.polyhaven.com`, `sketchfab.com`,
   `api.sketchfab.com`, `kenney.nl`, `ambientcg.com`, `quaternius.com`.
   Затем я могу автоматически отобрать конкретные CC0/CC-BY модели,
   скачать архивы, проверить лицензии и импорт в Blender без ручной работы
   пользователя. **Доступ сейчас не проверен и не обещан.**
2. Если готовых зимних елей не будет, локально в Blender можно адаптировать
   проверенные фотограмметрические хвойные модели: создать снег на ветвях
   по нормалям/высоте, отдельно сохранить исходники и запечь прозрачные
   слои. Возможность скриптового Blender-рендера проверена; **художественное
   качество именно такого снега ещё не проверено**. Для трибуны, шале и людей
   убедительного локального автоматического способа производства из текущих
   файлов пока нет — прежняя сборка из простых геометрических деталей уже
   была отклонена.

Никакая из этих находок не подключена к новой сцене или production.
