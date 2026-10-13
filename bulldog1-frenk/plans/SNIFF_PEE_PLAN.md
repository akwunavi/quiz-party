# SNIFF_PEE для Френка: план производства (14.10.2026)

**Kling не запускался, изображения и видео не генерировались.** Только бесплатная подготовка, ждёт согласования платной генерации.

## Опыт Bulldog №4 (из `../docs/bulldog-race/`, №4 не менялся)
- SNIFF_PEE v2 — исходник ~10 с (241 кадр), игровой тайминг 7,26 с; утверждённое поведение включает язык и повторный подъём лапы. Ранний v1 оставлен для отката.
- Отдельный **RETURN** (исходник 121 кадр, в игре 2,72 с) понадобился потому, что SNIFF у №4 кончается в другом ракурсе (лучший IoU конца SNIFF со стойкой ≈ 0,58); прямое «один STAND как мост» не работало, сокращённый RETURN B (с удалением середины) дал скачок лап, слишком длинный RETURN вызвал «топтание/приседание».
- Цепочка №4: `RUN → STOP → SNIFF_PEE → RETURN → START → RUN`. Оригинальные Kling-промпты №4 в архиве отсутствуют (MISSING), использовать нельзя.

## Что меняет опыт Френка
BUTTERFLY V1 показал, что при **START = END = одна и та же RACE_STAND** (`tail_image`) Kling возвращает ту же стойку с IoU 0,997, нулевым смещением и без скольжения опорных лап. Хвост tail_image растягивает действие, но у клипа «стойка → стойка» лишняя статика в начале и в конце просто обрезается без шва (в отличие от RACE_START). Отсюда схема без отдельного RETURN.

## Рекомендуемый план: ОДИН клип «стойка → SNIFF_PEE → стойка»
| | |
|---|---|
| Клип | `SNIFF_PEE`: принюхивание, подъём задней лапы, удержание, возврат в ту же стойку |
| Инструмент | `image_to_video`, `kling-video-v3_0`, 720p, звук выкл., multi-shot выкл., 1 генерация |
| Длительность | **8 с** (≈ 1 с интерес, 2 с принюхивание, 0,8 с перенос веса и подъём, 2 с удержание, 0,8 с опускание, ~1,4 с возврат и стойка) |
| START = END | `sniff_prep/DOG1_SNIFF_PEE_START_END_racestand.png` (RACE_STAND на плите, SHA `5d873c41…`) |
| Стоимость | **48 кредитов** (6 кредитов/с по шести подтверждённым запускам; точная цена видна только при отправке) |
| Минимальный набор | 1 генерация, 48 кредитов (остаток 321 → 273) |
| Потолок | 2 видео-попытки (≈ 96) + запасной ключевой кадр (2): ≈ 98 кредитов; дальше остановка и согласование |

### Запасная схема (только если первый клип не поднял заднюю лапу)
Ключевой кадр позы: `image_to_image` из RACE_STAND (2 кредита, голова ниже, задняя ближняя лапа поднята, остальные три на тех же местах) → два клипа по 4–5 с (стойка → поза, поза → стойка, ≈ 24–30 кредитов каждый), поза закреплена в обоих. Дороже и сложнее (≈ 50–62), используем только при провале.

## Анализ рисков
| Риск | Оценка | Меры |
|---|---|---|
| Kling не поднимет заднюю лапу | средний (в BUTTERFLY модель выполнила «лапа поднята», но вместо ближней подняла дальнюю) | конкретная поза в промпте (бедро, колено, лапа свисает, таз наклонён, хвост); при провале — запасная схема с ключевым кадром |
| Задняя лапа заменена передней | средний | «hind leg closest to the camera», «other three legs», «four legs in total»; приёмка по кадрам удержания |
| Поднята дальняя задняя лапа (скрыта) | средний | проверить, что поднятая лапа видна сбоку; если скрыта — клип не годится для комической читаемости |
| Смена ракурса | низкий–средний (опускание головы к земле поворачивает корпус) | «facing right», корпус и таз на месте, tail_image возвращает ракурс; приёмка: bbox и центр на удержании ± 8 %, конец = стойка |
| Скольжение опорных лап | низкий (BUTTERFLY: ≤ 2 px) | «all four paws stay in place», опора на трёх лапах; приёмка ≤ 3 px |
| Лишние объекты или жидкость | средний | слово pee и любые отсылки к жидкости не используются; «floor stays plain and empty»; в промпте только собака |
| Лишняя конечность / пропорции | средний | «four legs in total», «original proportions»; приёмка по кадрам удержания (подсчёт лап) |
| Прищур / потемнение морды при движении | средний (RACE_START V1/V2/gen3) | позитивное описание глаз («bright, curious»), без слов squint/crouch |
| Не вернётся в ту же стойку | низкий (tail_image) | допускается; иначе RETURN-клип (30 кредитов, START = последний кадр клипа, END = стойка) |
| Слишком длинное удержание / топтание | низкий–средний | длительность 8 с, статика в конце обрезается; приёмка по IoU соседних |

## Переходы
`STOP f73 → RACE_STAND (удержание по сценарию) → SNIFF_PEE (кадр 1 = стойка) → RACE_STAND → вход START V1 f1,f7–f11,f16 → gen3 f2–f37 → RUN`. Смещение клипа 0 (как у BUTTERFLY), мировая позиция не меняется; нужны метаданные клипа (длительность, кадр конца действия). RETURN в цепочке не требуется, если конец клипа совпадёт со стойкой (IoU ≥ 0,99).

## Приёмка после генерации (каждый кадр, не через 3)
1. Первый и последний кадры = стойка (IoU ≥ 0,99, цвет ≤ 4); центр и линия земли ≤ 2 px.
2. Задняя лапа поднята, **ближняя к камере, видна сбоку**, подсчёт лап: во всех кадрах четыре, на удержании три на земле плюс одна поднятая.
3. Таз и корпус не меняют ракурс (bbox ± 8 %), пропорции те же.
4. Опорные лапы скользят ≤ 3 px; поднятая лапа возвращается на то же место.
5. Нет предметов, лужи, жидкости; пол пустой.
6. Глаза открыты, лицо без потемнения; цвет ± 4 %.
7. Удержание позы ≥ 1,5 с; нет серий статики > 0,5 с вне начала и конца.
8. Alpha: существующий конвейер, ноги и хвост на тёмном и светлом фоне.

## Промпт первого (и в рекомендованной схеме единственного) клипа
`sniff_prep/prompt_SNIFF_PEE_clip1_not_sent.txt`:
```
A stocky fawn-beige French bulldog with a white chest, large upright ears, big round expressive eyes and a dark gray muzzle stands on all four paws in a fixed three-quarter side view facing right, exactly as in the first frame. At the very start his ears perk up and his nose lifts as an interesting smell reaches him. Over the next two seconds he lowers his head and neck toward the floor just in front of his front paws and sniffs with quick, small nose twitches, his nostrils flaring, his ears turned forward and his eyes bright and curious, while his body, his hips and all four paws stay in place.
Then he shifts his weight onto his other three legs, and the hind leg closest to the camera lifts smoothly out to the side: the thigh rises, the knee bends, the lower leg and paw hang relaxed, his hip tilts a little and his tail lifts slightly. He holds this comical pose for about two seconds, glancing around with an innocent, satisfied expression, still facing right with his head at a natural, slightly lowered level.
Then he gently lowers that hind leg and puts the paw back on exactly the same spot, lifts his head, relaxes his ears, and returns to the exact calm standing pose of the first frame, standing still for the last second.
The camera stays completely fixed with the same framing. A plain seamless light-gray studio background and floor, soft contact shadow, consistent studio lighting; the floor stays plain and empty. The scene shows only this one French bulldog with his original fur color, face, white chest and body proportions, and four legs in total.
```
Параметры: `image_to_video`, `kling-video-v3_0`, 720p, 8 с, audio off, multi-shot off, 1 шт., first_image = tail_image = `DOG1_SNIFF_PEE_START_END_racestand.png`. Запуск только по отдельному согласованию.
