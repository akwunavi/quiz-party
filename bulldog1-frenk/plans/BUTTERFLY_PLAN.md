# BUTTERFLY для Френка: план и один промпт (13.10.2026)

**Kling не запускался, платная генерация не разрешена.** Только референсы и промпт. Роль по контракту: `RACE_STAND → BUTTERFLY → RACE_STAND`, собака в alpha-клипе, бабочка — отдельный программный объект, мировая координата собаки не меняется.

## Схема
- **START = END = один и тот же кадр** `butterfly_prep/DOG1_BUTTERFLY_START_END_racestand.png` (утверждённая RACE_STAND на плите, он же конец STOP, SHA `5d873c41…c0a6`, 1276×720). Вход и выход в ту же стойку гарантируются tail_image; затем обычный вход в START (`race_start_working/`).
- **Бабочки в видео нет.** В клипе собака следит за невидимым лёгким движением; бабочка рисуется программно по траектории взгляда (ключевые точки по кадрам клипа: угол головы/взгляда, измеряются после генерации). Это убирает главный риск контракта «встроенная бабочка из генерации, контакт уха с маской»; в промпте слово «butterfly» не используется (не рисуется насекомое).
- **Внешность и якорь:** всё то же: свет, окрас, масштаб, камера неподвижна, все четыре лапы остаются на месте. Приёмка: центр и лапы в первом и последнем кадре совпадают со START (≤ 2 px).

## Уроки и как они учтены
| Урок | Решение для BUTTERFLY |
|---|---|
| STOP: Kling размазывает действие по всей длине; «торможения» не было | действие привязано к секундам в промпте; **в начале и конце собака стоит, оба конца = стойка, значит ведущую и хвостовую статику можно обрезать без шва** (в отличие от RACE_START, где обрезка статики ломала переход) |
| RACE_START V1/V2: tail_image тянул подготовку (приседание, ожидание) и вызвал прищур | здесь tail оправдан: нужен точный возврат в ту же стойку; подготовка «раскачки» невозможна, т.к. START уже стойка; прищур снижаем позитивным описанием глаз и взгляда |
| gen3: без tail подготовка исчезла, но на старте движения появился прищур и скольжение лап | лапы на месте весь клип; глаза «шире и ярче» во всём действии, без слов squint/crouch/wait |
| Отрицания в промпте праймят то, что запрещают | ни одного отрицания про лицо и позу; «видимое только собака» вместо «без насекомого» |
| Камера неподвижна, собака «на месте» | как в STOP и gen3 |

## Параметры (не отправлено)
`image_to_video`, `kling-video-v3_0`, 720p, **5 с** (у №4 BUTTERFLY 5,04 с; длительность клипа измеряется после генерации и обрезается), звук выкл., multi-shot выкл., 1 генерация, first_image = tail_image = `DOG1_BUTTERFLY_START_END_racestand.png`. Оценка стоимости **≈ 30 кредитов** (STOP 3 с = 18; точная цена будет в ответе после отправки; остаток 351).

## Промпт (английский, `butterfly_prep/prompt_BUTTERFLY_not_sent.txt`)
```
A stocky fawn-beige French bulldog with a white chest and a dark gray muzzle stands on all four paws in a locked three-quarter side view, facing right, exactly as in the first frame. A tiny, light, fluttering thing that we cannot see drifts around him, and he watches it with delight. At about half a second his ears perk up, his eyes open even wider and his head rises toward the upper right. From one to three and a half seconds his head and neck follow its looping flight: up and forward, then down in front of his chest, then up toward the left above his back, then up and forward again, his nose twitching, his ears turning toward it, his mouth in a happy, curious smile; once he lifts his near front paw a little and puts it down on the same spot. His four paws stay planted on the same spots of the floor the whole time and his body stays in place, only gently leaning with his head. At about four seconds his head and ears slowly settle back into the first-frame pose, and he stands calm and still, exactly like in the first and last frame, until the end.

The camera is fixed and does not move. The frame contains only the dog on a plain seamless light-gray studio backdrop and floor, with a soft shadow under him and soft even lighting. The same dog in every frame, with the same face, fur color, white chest, ears and proportions, four legs.
```

## Приёмка после генерации (каждый кадр, не через 3)
1. Первый и последний кадры = START (разница < 2/255); центр, лапы, линия земли ≤ 2 px.
2. Все четыре лапы на месте весь клип (скольжение ≤ 3 px; одна лапа может приподняться и вернуться на то же место).
3. Глаза открыты на всех кадрах; нет потемнения и «злого» лица; окрас в пределах ΔE 3 от стойки.
4. Нет предметов, насекомого, второй собаки; камера и масштаб неизменны (±3 %).
5. Взгляд читается: угол головы по кадрам даёт гладкую кривую (из неё строится траектория бабочки).
6. Стойка в конце удерживается ≥ 0,5 с; ведущую/хвостовую статику обрезаем по IoU соседних ≥ 0,97.
7. Alpha: существующий конвейер; ухо и лоб проверить на тёмном и светлом фоне.

## План на провал
Возврат не в ту же позу (края не совпали) или лапы поплыли: одна повторная попытка с короче описанием (убрать подъём лапы), потолок два запроса; иначе — программная реакция на стойке (ухо/голова) без Kling или отказ от BUTTERFLY у Френка. Не повторять ту же схему «ради удачи».

## Программная бабочка (отдельно, после клипа)
Спрайт или процедурный объект в мировых координатах рядом с собакой: параметрическая кривая восьмёрки/петли ≈ 1–3,5 с, ключевые точки берутся из измеренного направления взгляда клипа; слой над собакой при пролёте перед мордой, под — за спиной; собака в мировой позиции не смещается.
