# ROLL Зефира — блокер и план одной генерации (16.10.2026). Kling не запускался

## Блокер
В материалах Зефира (`assets/sources/`: RUN, IDLE, SELECTED) **нет ни одного кадра, где собака ложится, лежит на спине или переворачивается**. Смонтировать ROLL из имеющегося нельзя: нужна генерация.
* STOP v1 (лёжка на животе k33–k64) не подходит: это лёжка на животе, а не на спине, с оскалом, и она вне утверждённого материала.
* То же относится к BUTTERFLY и SNIFF_PEE: материала нет ни для одного из трёх действий.

## Лучший вариант — схема ROLL Фрэнка (сработала с первой попытки, 30 кредитов)
* Окно ROLL в V3: 145 кадров, мир не двигается. START B у Зефира начинается прямо с #30 (lead 0), поэтому клип ≤ 145 кадров. Остаток окна закрывает стойка RACE_STAND.
* **first = last = утверждённая RACE_STAND #30**, исходный кадр без сдвига: `KLING_FIRST_AND_LAST_RACE_STAND_RUN30_1276.png` (SHA-256 80e017da…37f1, побайтно `race_stand_prep/RUN_src30_side_stand_1276.png`). Клип начинается и кончается в точке RACE_STAND, поэтому сдвиг спрайта тот же, что у стойки, и стыки получаются без переходов (у Фрэнка 0,02–0,05 px).
* Одна картинка в начале и в конце — у Фрэнка это лучшая схема (BUTTERFLY и ROLL с первой попытки). Схема «разные кадры» и есть то, что ломало STOP Зефира.
* Эталон движения — №4 (`REF_dog4_roll_every6frames_readonly_copy.png`), в Kling не отправляется.

## Параметры
`kling-video-v3_0`, image_to_video, first_image = tail_image = #30; duration 5 (121 кадр), 720p, 1 видео, prefer_multi_shots false, без звука. **30 кредитов.**

## Промпт (промпт ROLL Фрэнка, принятый с первой попытки; заменены только порода и окрас)
```
The same white French bulldog, side view facing right, standing on all four paws exactly as in the first frame. He quickly drops down and rolls over onto his back, belly up, white chest and belly facing the sky. Lying on his back, he squirms happily, rubbing his back on the floor from side to side. His two front paws move together as a pair, bent at the wrists, paddling up and down in sync, and his two hind legs kick together as a pair in sync, all paws up in the air, stubby tail wagging, ears flopping on the floor, a joyful playful face. He stays on his back for most of the clip. Then he rolls back onto his belly, pushes up with his front legs first, stands up on all four paws and settles into exactly the same standing pose and the same spot as in the last frame, holding still at the end. He stays in the same place on the floor at the same size. Static camera, same framing, same plain studio background and lighting. One dog with four legs and one tail. No jumping, no running, no extra steps, no dust, no objects.
```

## Риски, специфичные для Зефира
1. #30 — сжатая стойка «перед стартом». С одинаковым первым и последним кадром это проблемой не было у Фрэнка, но Kling может «додумать» шаги на место (как в STOP). Проверка — пункт 2 приёмки.
2. Белый живот на светлом полу: alpha на спине (живот вверх) сложнее. Конвейер справился с белой шерстью в STOP B, но спина на полу — новая поза. Ленточную чистку пола не запускать (у Фрэнка на ROLL она резала спину).
3. Морда: возможен оскал (был в STOP v1). Если он заметен — брак по пункту 3.

## Приёмка MP4 (до монтажа и alpha)
1. Все четыре фазы: заваливается → **на спине, животом вверх, передние лапы парой, задние парой, ёрзает ≥ 1,5 с** → понятный перекат и вставание передом → стойка.
2. Не уезжает: центр корпуса в первой и последней секунде в пределах ±15 исх. px от #30, низ лап в стойке y 679 ± 5. Шагов на место в конце нет.
3. Анатомия: четыре лапы, один хвост, морда и уши Зефира, без оскала с зубами.
4. Начало и конец совпадают с #30 хотя бы на 3–5 кадрах.
5. Длина полезной части ≤ 145 кадров (5 с выполняется автоматически).
Если не выполнен пункт 1, 2 или 3 — клип не берём, вторую попытку без согласования не делаем.

## После приёмки (отдельно)
Монтаж STOP B → RACE_STAND → ROLL → RACE_STAND (pad) → START B. Alpha тем же конвейером, лаборатория — продолжение `lab_stop_v1`.
