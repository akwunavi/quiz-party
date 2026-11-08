# Луна — SNIFF_PEE + RETURN G1: покадровый разбор и предложение по исправлению (08.11.2026)
Исходник: `../../stage6_batch/sources/DOG5_SNIFF_PEE_RETURN_G1_kling_original.mp4` (241 кадр, 10,04 с). Листы: `SNIFF_full_every6.png` (весь клип), `SNIFF_problem_phase_f93-f183_every6.png` (проблемная фаза крупно).

## Фазы
| кадры | фаза | анатомия | годится |
|---|---|---|---|
| #0–#39 | стойка (RACE_STAND) | — | да |
| #39–#50 | поворот головы к полу | правильная | да |
| #50–#93 | нюхание: нос у пола, все четыре лапы стоят | правильная | **да** |
| #93–#99 | подготовка: перенос веса, лапы стоят | правильная | да (последний чистый кадр — #93) |
| #99–#112 | **подъём**: ближняя задняя уходит **назад**, голень вытягивается | **неправильная** | нет |
| #112–#167 | **удержание**: лапа вытянута назад почти горизонтально, колено не видно | **неправильная** | нет |
| #167–#178 | **опускание**: по той же дуге назад-вниз | **неправильная** | нет |
| #178–#195 | лапа на земле, голова поднимается | правильная | **да** (первый чистый кадр — #178) |
| #195–#240 | стойка, последний кадр ≈ первый (разница 0,99) | — | да |

Корпус, передние лапы и дальняя задняя всё время стоят — сломан только рисунок ближней задней.

## Предложение: заменить только #99–#177 одной короткой генерацией
* **Что сохраняем:** нюхание и возврат исходника — #(30…)93 и #178–#(…215).
* **Новая генерация:** `kling-video-v3_0`, **4 с** (≈ 24 кредита), 720p, одна сцена, без звука, **first = кадр #93** (`SNIFF_f93_first.png`), **tail = кадр #178** (`SNIFF_f178_tail.png`). Стык в обе стороны — кадры самого исходника, поэтому совпадение по краям даёт сам Kling (first точный, tail — приближённый, проверим).
* **Промпт** (только то, что должно быть):
> Luna, the same cartoon French bulldog with the white coat and black-gray patches, stands in strict side profile facing right with her nose down at the floor, exactly as in the first frame. Keeping both front paws and the far hind paw firmly planted and her body steady, she lifts the hind leg nearest to the camera up and out to the side: the knee bends and rises forward under her belly, the lower leg hangs down from the bent knee and the paw comes up beside her hip, like a dog marking a post. She holds the leg raised for a moment, then lowers it back to the floor along the same path and starts lifting her head, ending exactly in the pose of the last frame. Static camera at the same height and distance, the same plain gray studio and lighting, the same scale.
* **Длина собранного клипа:** #30–#93 (64) + новая вставка (≈ 96) + #178–#215 (38) ≈ 198 кадров — входит в окно SNIFF_PEE + RETURN при любом варианте STOP (≤ 204 с хвостом S1, ≤ 215 с S2, ≤ 232 без хвоста). Без ускорения.
* **Приёмка вставки:** колено вперёд, голень вниз, лапа в сторону (к камере), опорные три лапы не скользят, корпус не качается, окрас и масштаб те же; стыки #93 → вставка и вставка → #178 — не больше обычного шага.

**Kling не запускался.** Нужна ваша отдельная команда (≈ 24 кредита, одна попытка).
