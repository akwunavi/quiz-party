# RETURN_TO_IDLE Зефира — план одной генерации (22.10.2026)

**Kling не запускался.** IDLE MAIN_L1, путь IDLE → SELECTED, SELECTED, Race V3 и production не менялись.

## Образец — RETURN_TO_IDLE Фрэнка (принят, с alpha)
Источники: `bulldog1-frenk/return_to_idle_prep/PLAN.md`, `return_to_idle_v1/RESULT.md`, `prompt_sent.txt`.
* **Параметры:** `kling-video-v3_0`, first = SELECTED f121, tail = IDLE f8, 5 с, 720p, без звука, один план. 30 кредитов, одна попытка.
* **Отправлен промпт пользователя дословно** (ниже). Мой черновик был короче и в Kling не уходил.
* **Результат:**
  * r1–r29: держит радость;
  * r30–r53: закрывает пасть, подмигивает;
  * r54–r100: шаг правой передней назад, переставляет лапы, морда успокаивается;
  * r101–r121: замер в позе IDLE f8.
* **Стыки:** совпали по позе, масштабу и месту (сдвиг 0–0,1 px). Кадры Kling были темнее на 2–3 уровня — исправлено постоянной поправкой тона по RGB, после неё стыки 0,77 и 0,83.
* **Монтаж:** r2–r121 (r1 повторяет SELECTED), потом IDLE с f9.
* **Принятые мелочи:**
  * неподвижные 1,2 с в начале;
  * два подмигивания;
  * смаз лапы r68–r72;
  * картинка чуть мягче.

Промпт Фрэнка, который сработал:
```
The same French bulldog smoothly settles down after an excited celebration. Starting from the happy open-mouth pose in the first reference frame, he gently closes his mouth, relaxes his expression, takes a small natural step backward and adjusts his front paws beneath his chest. His body subtly turns into the calm standing orientation shown in the final reference frame. Preserve his recognizable face, anatomy and natural coat markings throughout the motion, with a gradual return to the exact appearance of the final reference. All four paws remain grounded except during small natural steps. End completely still, matching the final reference frame in pose, scale, position and expression. Static camera, consistent background and lighting. No jumping, sitting, running or exaggerated motion.
```

## Зефир: что должен закрыть RETURN
| | FIRST = SELECTED s121 | LAST = IDLE f4 = FRONT_STAND |
|---|---|---|
| выражение | открытая улыбка, глаза широко | пасть закрыта, хмурые брови |
| центр корпуса x | 666,5 px | 654,2 px (на 12 px левее) |
| линия лап | 688 px | 683 px (лапы на 5 px дальше от камеры) |
| высота силуэта | 628 px | 649 px (голова и уши выше) |
| ракурс | анфас | анфас (тот же) |
| фон | та же плита | разница фона 1,0 / 255 |

Задача мягче, чем у Фрэнка. У него собака ещё разворачивалась на ¾ и сводила широко расставленные лапы. У Зефира ракурс тот же, а смещение небольшое: полшага назад-влево и подъём головы.

## Референсы (кадры исходников без изменений, 1276×720)
* FIRST — `KLING_FIRST_SELECTED_s121_1276.png` (SHA 1712822d…e511), последний кадр принятого SELECTED. Последние 16 кадров неподвижны.
* LAST — `KLING_LAST_IDLE_f4_FRONT_STAND_1276.png` (SHA ecad6423…dfdb), кадр f4 IDLE = FRONT_STAND, через который уже принят вход в SELECTED.
* Сравнение — `COMPARE_first_last.png`.

## Параметры
`kling-video-v3_0`, image_to_video, first_image = FIRST, tail_image = LAST, duration **5**, 720p, imageCount 1, prefer_multi_shots **false**, enable_audio **false**.

* 5 с, а не 3: у модели есть время спокойно закрыть пасть и переставить лапы. У Фрэнка из 5 с ушло около 1,2 с неподвижности в начале — её можно срезать монтажом.
* Kling 4.0 не нужен: промежуточного кадра нет, а 4.0 дороже и всегда со звуком.

## Промпт (`PROMPT_RETURN_TO_IDLE_v1.txt`)
Основа — принятый промпт Фрэнка. Изменено только то, что у Зефира иначе:
* порода и окрас;
* фронтальный ракурс без разворота: «turns into the orientation» убрано, иначе Kling может развернуть корпус;
* «furrowed brows» — финальная мимика Зефира;
* «tiny settling step back» — сдвиг у Зефира меньше, чем у Фрэнка;
* голова поднимается и встаёт прямо.
```
The same white French bulldog with large pink ears and a pink nose smoothly settles down after an excited celebration. Starting from the happy open-mouth pose in the first reference frame, facing the camera, he gently closes his mouth, relaxes into his calm frowning expression with slightly furrowed brows, lifts his head a little and turns it to look straight ahead, and takes a tiny settling step back, adjusting his front paws beneath his chest. He keeps facing the camera the whole time. Preserve his recognizable face, anatomy and white coat throughout the motion, with a gradual return to the exact appearance of the final reference. All four paws remain grounded except during small natural steps. End completely still, matching the final reference frame in pose, scale, position and expression. Static camera, consistent background and lighting. No jumping, sitting, running or exaggerated motion.
```

## Стоимость
**30 кредитов.** Цена v3 подтверждена нашими запусками: 6 кр./с, 5 с = 30, так же стоил RETURN Фрэнка. Последний известный баланс — 2506. Одна попытка, без автоповтора. Цена до отправки не показывается: проверю баланс до и после.

## Приёмка MP4 (до монтажа и alpha)
1. **Начало:** r1 совпадает с SELECTED s121.
2. **Конец:** последние кадры совпадают с IDLE f4 — силуэт ≥ 0,9, центр и линия лап ±5 px. Тон допускаю с постоянной поправкой, как у Фрэнка.
3. **Лапы:** переставляются шагом, без скольжения. Нет прыжка, посадки, разворота корпуса.
4. **Морда и окрас:** пасть закрывается, морда приходит к хмурому FRONT_STAND, окрас без вспышек и дрейфа.

Если пункт 2 или 3 не выполнен — клип не берём, вторую попытку без согласования не делаю.

## Будущий стык RETURN_TO_IDLE → IDLE MAIN_L1
* **Монтаж:** r2 … rN, где rN — первый кадр, совпавший с FRONT_STAND f4; неподвижный хвост после него отрезаю. r1 не беру — он повторяет s121.
* **Тон:** если кадры Kling окажутся темнее, как у Фрэнка, — постоянная поправка RGB, вычисленная по стыкам. Форма и движение не меняются.
* **Возврат в цикл:** после rN идёт **f5 → f6 … f14** — собственное начало исходника IDLE, 10 кадров, 0,42 с. Затем **f15 = начало MAIN_L1**, и цикл повторяется как принят. Новых склеек внутри IDLE нет: rN стоит на месте f4.
* **Полная последовательность экрана выбора:** IDLE MAIN_L1 (цикл) → выбор → доигрывание до f4 → SELECTED s4–s121 → RETURN r2–rN → f5–f14 → MAIN_L1 (цикл) …
* **Alpha:** тот же конвейер.
* **Проверки:**
  * 4 фона;
  * стыки s121 → r2 и rN → f5 по центру, линии лап и высоте, как в `lab_select_v1/tools/metrics.py`.
* **Лаборатория:** RETURN добавляется в `lab_select_v1` вторым этапом (после SELECTED), путь выбора не меняется.
