# Френк — STOP, финальная подготовка (Kling НЕ запускался)

## Файлы
- `DOG1_STOP_START.png` — кадр #97 RUN, SHA `15bb7e2c…`, без изменений относительно согласованного.
- `DOG1_STOP_END.png` — RACE_STAND v3 без стойки света, SHA `5d873c41…`. Единственное изменение к прошлой версии: сдвиг на +90 px вправо и −6 px вверх (линия земли 682 ≈ START 680). Без деформации.
- `DOG1_STOP_END_v1_shift35.png` — прошлая версия END (для истории).
- Оригинал `race_stand_v3.png` (SHA `83214715…`) и RUN не менялись.

## Оценка коррекции крайних кадров (по просьбе)
Измерения на холсте 1276×720:
- **Масштаб.** Прежняя оценка «голова −10 %» была глазомерной и неверной. Точнее: расстояние «кончик уха → зрачок» 201 px (END) против 199 px (START), «кончик уха → низ морды» 272 против 283 (−4 %). Голова одного размера. Разница высоты 18 % — это поза: из приседа галопа в вертикальную стойку. Коррекция масштаба не нужна и навредила бы (один множитель не может выровнять и голову, и высоту).
- **Цвет.** Мех START (146,112,95), END (152,126,114), master (175,147,135; насыщенность R−B ≈ 40). END ближе к master (R−B ≈ 38), START насыщеннее (R−B ≈ 51) из-за цвета и размытия видео. Подгонять END под START значит уходить от утверждённой внешности. START менять тоже нельзя: он должен совпадать с RUN в месте стыка.
- **Резкость.** Лапласиан внутри собаки: START ≈ 24, END ≈ 570. START в движении размыт, END неподвижен. Это физика, а не дефект. Размывать END портит внешность, «дорисовывать» резкость в START создаёт артефакты. В промпте прямо говорится, что размытие уходит по мере остановки.
- **Итог:** оставляем исходные кадры. Заменён только сдвиг END (чтобы дать собаке место продвинуться вперёд при торможении, см. ниже).

## Параметры запроса
- Инструмент `image_to_video`, модель `kling-video-v3_0`.
- first_image = `DOG1_STOP_START.png`, tail_image = `DOG1_STOP_END.png`.
- duration = 3 с, resolution = 720p, enable_audio = false, prefer_multi_shots = false, imageCount = 1.

## Что изменено в промпте
1. Убрано требование «остаётся на месте». Френк продвигается вперёд на короткую дистанцию, камера неподвижна. Для этого END сдвинут на ~90 px вправо относительно START.
2. Убрано «ровно три шага»: теперь два-три постепенно сокращающихся шага «как получится естественно».
3. Добавлена фраза про размытие, которое исчезает по мере остановки (объясняет разницу резкости).

## Промпт (английский)
```
A stocky fawn-beige French bulldog with a white chest and a dark gray muzzle is galloping to the right in a locked three-quarter side view and comes to a natural stop. The first frame shows him mid-gallop with his front paws reaching down to the floor; the last frame shows the same dog standing completely still on all four paws a short distance ahead.

Gradual, physically believable braking: the front paws plant ahead of the body and take the weight, the shoulders and chest drop slightly, the head lowers a little, and the hind paws swing forward and step under the hips. The body keeps moving forward a short distance while it slows down, and the dog makes two or three short steps, each one shorter, slower and heavier than the previous one; the bouncing and the stretching of the gallop fade away, the ears settle, and the motion blur disappears as the movement slows. Then the last step lands, the chest rises, the back becomes level, the head lifts, and he stands relaxed and perfectly still on all four paws, exactly like in the last frame, with a calm closed-mouth smile and upright ears. Only a very short moment of stillness at the end.

The camera is completely fixed: no zoom, no pan, no shake, no change of angle. The dog moves forward only a little within the frame, ending exactly where the last frame shows him. Plain seamless light-gray studio backdrop and floor, a soft contact shadow under the paws, the same soft lighting throughout. Natural weight transfer, paws never slide or float, every paw that touches the floor stays planted until it lifts. The same dog in every frame: the same face, fur color, white chest, ears and proportions; no change in size. No other animals, objects, butterflies, text or logos, no extra legs, no jump, no turn toward the camera, no sudden pose change.
```

## Критерии приёмки результата
1. Первый кадр = START, последний = END (наложение).
2. Два-три сокращающихся шага, торможение без скольжения лап и без мгновенной остановки.
3. Продвижение вперёд небольшое, камера и размер собаки без дрейфа.
4. Лапы не пропадают и не двоятся; в конце четыре лапы на земле.
5. Мех, морда и уши не плывут; нет перехода в другую породу или окрас.
6. Финальная стойка короткая (не дольше ~0,5 с).
