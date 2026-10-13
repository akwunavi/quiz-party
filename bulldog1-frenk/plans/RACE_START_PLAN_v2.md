# RACE_START (RACE_STAND → RUN), версия 2 — проверено до Kling

Заменяет `RACE_START_PLAN.md` (v1 остаётся как история). **Kling не запускался.** Кадры и промпт ждут согласования пользователя.
Рабочая гипотеза сохранена: `RACE_STAND → [Kling] → RUN #90 → #91–98 → цикл #87–98`. Ниже три проверки до генерации и итоговые файлы.

Все числа на холсте 1276×720, кадры RUN берутся из утверждённого alpha (`dog1-run-alpha.webm`, номера исходных кадров), стойка — `DOG1_STOP_END.png` (RACE_STAND v3, собака x 403–1019, центр 711, линия земли 680).

## A. Горизонтальное положение стойки
Сравнивал наложением 50 % (`race_start_prep/positioning_overlay_shifts_0_-60_-125_-150.png`) положение стойки и RUN #90 (собака x 279–893, центр 586).

| Сдвиг стойки влево | Нужное перемещение до позиции RUN #90 (центр / морда / зад) | Вывод |
|---|---|---|
| 0 (как в конце STOP) | **−125 px (назад)** | собака должна сместиться назад на 125 px: Kling будет «ехать задом» или телепортировать; отвергнуто |
| −60 | −65 px (назад) | всё ещё назад |
| **−125** | **0 / −1 / +1** | голова на голове, корпус на корпусе, ноль лишнего сдвига |
| −150 | +25 / +24 / +26 | небольшое продвижение вперёд (4 % длины тела) |
| −185 | +60 | уже заметное продвижение, лишнее |

Что смотрел: голова и корпус (наложение совпадает при −125), линия земли (стойка 680, лапы RUN #90 находятся в толчке, задние лапы 657, расхождение 23 px — это фаза отталкивания, а не смещение), масштаб (голова одного размера, как установлено для STOP).
**Рекомендация: сдвиг −125 px** (`DOG1_RACE_START_START.png`): минимальный из всех, при котором Kling не должен двигать собаку ни назад, ни на заметное расстояние вперёд. Движением вперёд по трассе управляет модель гонки, видео отвечает за позу и шаг. Запасной вариант −150 (`..._alt_shift150.png`, +25 px вперёд), если Kling будет «замораживать» корпус на месте. Применять только перенос, без деформации.

## B. Последний кадр: #89, #90 или #91
Лист `race_start_prep/end_frame_candidates_88-93_vs_stand.png`.

| | #89 | **#90** | #91 |
|---|---|---|---|
| Сходство силуэта со стойкой (IoU, выравнивание по центру и земле) | 0,579 | **0,611** | 0,603 |
| Задние лапы (низ) | 659, ещё в контакте, отрываются | 657, толчок | 650, уже в полёте |
| Передние лапы | у земли, собраны | подняты к груди | вынесены вперёд |
| Что идёт следующим в цикле | #90: передние лапы уходят вверх | #91: бросок вперёд, передние выносятся | #92: полное растяжение |
Выбор **#90**: ближайшая к стойке по силуэту, задние лапы в последнем толчке; следующий реальный кадр #91 — именно бросок первого большого шага, то есть самое естественное продолжение. #89 — запасной (собранный присед, на кадр раньше). #91 уже в полёте: стыку «стойка → полёт» нужно больше изменений.
Цепочка: клип заканчивается кадром, равным #90, затем идут реальные #91–98 и цикл #87–98.

## C. Длительность и хореография
В оригинальном START (кадры #25–63) от стойки до ритма цикла проходит 1,6 с (толчок около #28–30, первый прыжок #38, ритм к #63). Kling-клип минимум 3 с: нельзя допустить «долго стоит → резкий галоп».
Решение: Френк стартует сразу, **разгон занимает около 1,5–2 секунд**, остальное время держится ровный галоп того же ритма (12 кадров = 0,5 с, два шага в секунду), последний кадр — фаза #90. Лишний хвост ровного галопа затем можно обрезать по лучшему совпадению с кадрами цикла (как делали стык для STOP: подбор пары кадров по силуэту и цвету), не меняя скорость.
**Длительность: 3 с** (минимум модели).

### Если разгон из Kling будет «морфить» (запасной способ с реальными кадрами)
Использовать настоящий разгон из оригинала: **конец Kling-клипа = реальный кадр #45** (из alpha; IoU к стойке 0,607, то есть не хуже #90; позиция x 285–924, центр 604 → сдвиг стойки около −107 px), а дальше реальные #46–63 (18 кадров = 0,75 с) и стык #63→#87 (проверен: IoU 0,796, цвет 25,1, не хуже обычного шага цикла). Kling тогда делает только «стойка → умеренная скорость до #45». Цена: START длиннее (≈ 3 + 0,75 с), зато ритм разгона настоящий. Ранние кадры #37–41 использовать как конец не стоит: это прыжок с вытянутым телом (IoU 0,49–0,54), слишком далёк от стойки.

## Итоговый промпт Kling (не отправлен; редакция после проверки координат)
```
A stocky fawn-beige French bulldog with a white chest and a dark gray muzzle stands calmly in a locked three-quarter side view, facing right. He does not wait: in the very first moment he shifts his weight back over his hind legs and lowers his shoulders and chest a little, ears and eyes forward, as if he has just heard a start signal. Then he thrusts off the floor with both hind paws, his front paws lift and reach forward, and he takes his first short, quick steps. Each step is a little longer and faster than the one before: a front paw lands, the hind paws swing forward under the hips and push off again, the body stretches and bounces, the head leans forward, the ears flap and the mouth opens in a happy pant. After about a second and a half he is running in a full, rhythmic gallop, about two strides per second, and keeps exactly this stride until the end. The last frame is the moment of that gallop where his hind paws push off the floor and his front paws are drawn up under his chest.

The camera does not move at all: no zoom, no pan, no shake. The dog stays in place in the frame and only his body and legs move; his forward travel along the track is added later outside the video. Plain seamless light-gray studio backdrop and floor with a soft shadow under him, the same soft lighting throughout. Natural weight transfer, paws never slide or float. It is the same dog in every frame, with the same face, fur color, white chest, ears and proportions, and the same size.
```
(Итоговая редакция от 13.10.2026 после проверки координат: добавлено «опускает плечи и грудь» и «продвижение по трассе добавляется позже вне видео»; убраны упоминания «небольшого продвижения в кадре».)
Параметры: `image_to_video`, `kling-video-v3_0`, first_image = `race_start_prep/DOG1_RACE_START_START.png`, tail_image = `race_start_prep/DOG1_RACE_START_END_run90.png`, **duration 3**, 720p, `enable_audio=false`, `prefer_multi_shots=false`, `imageCount=1`. Ожидаемая цена по опыту STOP: 18 кредитов (остаток 405).

## Приёмка и обработка после генерации
1. Первый кадр = START-кадр, последний = END #90 (разница < 2/255); контуры последнего кадра по заднему/переднему краю и земле совпадают с #90 не хуже ±5 px.
2. Разгон начинается сразу (нет стояния > 0,3 с), шаги нарастают, нет морфинга лап (смотреть кадры около начала толчка), камера и размер неизменны, внешность Френка сохраняется.
3. Хвост ровного галопа обрезать по лучшей паре с циклом, скорость не менять.
4. Alpha: `dog_alpha.py ... --exclude-rect none --floor-shadow`, проверка `verify_alpha.py`.
5. Предпросмотр цепочки в масштабе 0.235: `RACE_STAND (0,5 с) → RACE_START → RUN loop ×4 → STOP → RACE_STAND`; стыки по IoU и цвету не хуже обычного шага цикла (IoU ≈ 0,68, цвет ≤ 26).

## Файлы
`race_start_prep/DOG1_RACE_START_START.png` (рекомендуемый, сдвиг −125), `..._alt_shift150.png`, `DOG1_RACE_START_END_run90.png` (RUN #90 на той же плите + мягкая тень), листы сравнения.

## Координаты и непрерывность
Проверено отдельным отчётом `RACE_START_COORDINATES_REPORT.md`: START-кадр со сдвигом −125 даёт скачок при существующей архитектуре V3 (нет offset на клип); нужен минимальный интерфейс `shiftFrom/shiftTo` на клип (+125 → 0) или запекание −125 в видео (не рекомендуется).
