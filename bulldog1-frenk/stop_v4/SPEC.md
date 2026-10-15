# STOP V4 Фрэнка: RUN → торможение → RACE_STAND на четырёх лапах (план одной генерации, 15.10.2026)

Решение пользователя: посадка не нужна. STOP V3, `stop_v3/lying_fix`, `stop_v3/landing_gen` (в т.ч. Kling B) — архив, в новом STOP не используются (файлы не перемещались, чтобы не ломать ссылки). Kling не запускался, alpha нет, исходники/физика/production не тронуты.

## Входные кадры (1276×720, без изменений, побайтовые копии уже проверенных файлов)
* **First:** `KLING_FIRST_RUN97_on_plate.png` = утверждённый RUN #97 (alpha) на фоновой плите = `stop_v2/DOG1_STOP_START.png` (SHA-256 15bb7e2c…).
* **Last:** `KLING_LAST_RACE_STAND_v3_inplace.png` = утверждённая RACE_STAND v3, сдвинутая на −105 px, чтобы корпус стоял там же, где RUN = `stop_v2/DOG1_STOP_END_inplace.png` (SHA-256 8c4d66a4…).
* Сравнение: `COMPARE_first_last.png` (наложение контуров), фазы RUN: `RUN_phase_94-98.png`.

## Почему RUN #97
* Контракт Фрэнка (`race-v3-p3-lab/characters/frenk.contract.json`, `stopEntry.previousRunFrame = 96`): перед STOP в игре всегда стоит RUN #96, значит первый кадр STOP = #97 даёт стык как обычный шаг цикла, без нового шва.
* По движению: #94–#95 — полёт (низ силуэта y 598/645, лапы в воздухе) → модель продолжит прыжок; #96 — передние лапы только касаются (низ 688, ниже пола); **#97 — передние лапы уже стоят на полу (низ 680), задние идут вперёд под таз** — естественная точка начала торможения; #98 — сбор и толчок задними (провоцирует ещё один шаг).

## Совместимость First/Last (маска силуэта)
| | First (RUN #97) | Last (RACE_STAND in place) |
|---|---|---|
| низ лап (пол) | 679 | 679 |
| центр масс x | 628 | 630 (смещение 2 px) |
| ширина / высота силуэта | 627 / 534 | 622 / 627 (стоит выше: лапы прямые, голова поднята) |
| площадь | 203 тыс. | 186 тыс. (бег вытянут длиннее) |
Собаку не нужно ни перемещать по кадру, ни менять в размере; камера, ракурс (сбоку, морда вправо) и пол одинаковые.

## Важно: та же пара кадров уже была в STOP v2 попытка 1
Тогда модель ≈0,9 с бежала на месте и легла на грудь — из-за промпта (фаза «low, heavy, braced crouch» и посадка). Новый промпт описывает только торможение и стойку, без приседа/посадки, и прямо запрещает шаги после первого кадра. Риск «бега на месте» с кадром галопа сохраняется; это главный пункт приёмки.

## Генерация (одна)
* Модель `kling-video-v3_0`, image_to_video, `first_image` = First, `tail_image` = Last.
* `duration` 3, `resolution` 720p, `imageCount` 1, `prefer_multi_shots` false, `enable_audio` false.
* Стоимость: 18 кредитов (как у всех прошлых генераций STOP с этими параметрами).

Промпт:
```
The same French bulldog, side view, facing right. In the first frame he is landing from a gallop with his front paws on the ground; from this first frame on he is braking, with no more running strides. His front legs brace and absorb the momentum, his hind legs swing forward under the hips and plant, and his body slows down and straightens up. He comes to a complete stop standing on all four straight legs, chest and head held high, exactly as in the last frame, then stands still. He stays in the same spot of the frame at the same size. Static camera, same framing and lighting. No sitting, no lying down, no bowing, no dust.
```

## Приёмка результата (до alpha)
1. Нет ни одного беговой шага после кадра 1; торможение (от кадра 1 до прямой стойки) ≤ ~0,6 с (≤ 15 кадров).
2. Грудь и голова не опускаются ниже уровня первого кадра (верх головы y ≤ ~150 в 1276×720), нет посадки, поклона, лежания.
3. Центр масс уходит не больше ~30 px, низ лап на 679 ± 5, размер собаки постоянный.
4. Лапы после постановки не скользят по полу (несколько px, а не десятки).
5. Финал ≈ RACE_STAND (совпадение силуэта ≥ 0,9), внешность Фрэнка сохранена.

## После приёмки (не сейчас)
Монтаж: RUN … #96 → кадры STOP V4 до первой стойки → удержание/обрезка → RACE_STAND (`stopEntry.previousRunFrame = 96` не меняется); окно `STOP_s` и долг M2 — по фактической длине; alpha — только после того, как пользователь посмотрит MP4.

## Промпт пользователя (15.10.2026, заменяет промпт выше)
```
The same French bulldog, side view, facing right. In the first frame he is already contacting the ground with his front paws after a gallop. From that exact first frame onward, he immediately begins braking and does not perform any new running stride.

His front legs brace and absorb momentum, his hind legs come forward underneath the body and plant, and the body decelerates smoothly. He settles into a complete stop standing upright on all four paws, chest raised, head raised, matching the last frame exactly, then remains still.

He stays in the same place in the frame at the same scale. Static camera, same framing, same lighting, same background.

No extra running step, no sitting, no lying down, no bowing, no crouching on the chest, no dust, no particles, no sliding paws, no jump, no body distortion.
```
Параметры без изменений (kling-video-v3_0, 3 с, 720p, 1 видео, без звука, prefer_multi_shots false, 18 кредитов).
