# Журнал генераций Kling для Френка

Все запросы шли через подключённый Kling MCP (v1.3.3) от имени аккаунта пользователя. Ссылки на результаты Kling живут около 24 часов, поэтому **файлы в `assets/` — единственные долговечные копии**.
Баланс: 429 кредитов до работы, **405 после** (потрачено 24). Цена видео и картинок заранее инструментом не показывается, она видна только по результату `creditsConsumed`.

Входные референсы загружались через `file_upload` (3 PNG: пережатая копия master 2000×1129, кадры RUN #79 и #90 1276×720). Оригинал `bulldog_01_master.png` в среду не попал.

## 1. RACE_STAND v1 — запасной вариант
- Инструмент `image_to_image`, модель `kling-image-v3_0_omni`, 2k, 16:9, 1 изображение, **2 кредита**.
- Референсы: 图片1 = master (копия), 图片2 = кадр #79, 图片3 = кадр #90.
- generationId `Ab7JOCZdXp5U-uRvP8diRUqFPyiyACZjSqu48MwMG_kikdlzPoTYHP_ws3pMqS7evPmkxj5T`
- Результат: `assets/rejected_experiments/DOG1_RACE_STAND_v1_fallback_2720x1536.png`, SHA `e05ed0739530bfef87bd36c00b0c5ee96debe2f5e46762be74a60d0536a335b2`. Френк узнаваем, четыре лапы на земле, фон светло-серый; почти чистый профиль (виден один глаз), задние лапы подогнуты, стойка света у правого края.
- Промпт (дословно):
```
图片1 is the identity master: the same fawn-beige French bulldog, with soft tan fur, a white chest patch, a dark gray muzzle, large dark brown eyes, large upright bat ears with pink inner ear, a short curled tail, wide chest, compact body, very short sturdy legs. Keep exactly this dog, the same face, the same 3D animated-film rendering and the same fur detail.

Create ONE still image of this exact dog standing completely still on all four paws, with his body turned to the right of the frame in a three-quarter view. Take ONLY the body direction, camera angle and head turn from 图片2 and 图片3. Do NOT copy their running pose, stretched legs, open mouth, motion blur, studio light stand, or watermark.

His chest and body point right; his head also faces mostly right, slightly turned toward the camera so the face stays recognizable, calm closed-mouth smile, ears upright as in 图片1. All four paws are planted flat on the floor: both front legs straight and parallel under the shoulders, both hind legs standing under the hips (the far legs partly hidden behind the near ones), back level, tail visible. Compact standing proportions exactly as in 图片1, not stretched, not mid-stride, no raised paws.

Locked camera at dog's eye level, full body visible with margin around ears and paws. The dog fills about 75% of the image height, paws on the floor line at about 90% of the image height, body centered. Plain seamless uniform light-gray studio backdrop and floor, no objects, no text, no watermark, only a very soft contact shadow under the paws. Sharp focus, crisp fur edges, no motion blur.
```

## 2. RACE_STAND v2 — ОТВЕРГНУТА
- Тот же инструмент/модель/параметры, **2 кредита**. Основа 图片1 = v1, 图片2 = master, 图片3 = кадр #79. Цель: повернуть голову к камере на ~20° и выпрямить спину и задние лапы.
- generationId `AVbMmWSW2KkT3DeESRG3DZX1qQwgpfNoZ0C3ps4EcAIfFw5wHr1nHE4-MLn2isEmgU8VNVji`, SHA `2c0b26f11fc75032699e…5e00` (уменьшенное превью сохранено).
- Итог: **ошибка**. Master перевесил: собака развернулась анфас в камеру, корпус больше не смотрит вправо, фон стал тёмным как у master. Урок: master в запросе правки тянет позу и фон; для правки позы использовать только основу и референс ракурса.

## 3. RACE_STAND v3 — УТВЕРЖДЕНА
- Тот же инструмент/модель/параметры, **2 кредита**. Основа 图片1 = v1, 图片2 = кадр #79 (master не подавался).
- generationId `AVcUSt0bkGA2nxz9eUAyU-tR9UT2gzBH1GAJqDaVgws3uiKi0MJGnORQxd1HTabiuNfIBROn`
- Файл `assets/approved/DOG1_RACE_STAND_v3_2720x1536.png`, SHA `83214715a108c7c216a567e88a825dcc6a010a509ff440ffae7e6a024ccee07a`.
- Промпт (дословно):
```
图片1 is the base image. Keep this exact French bulldog unchanged: the same fawn-beige fur, white chest, dark gray muzzle, big upright ears with pink inside, short curled tail, short sturdy legs, the same relaxed standing pose with all four paws flat on the floor, the same plain light-gray seamless studio backdrop and floor, the same soft lighting, the same 3D animated-film style, the same size and position in the frame, no text and no watermark.

Make ONE edit only: rotate the whole dog about 25 degrees around the vertical axis toward the camera, so the view changes from a pure side profile to a three-quarter view. The dog still faces the RIGHT side of the frame: his chest and nose point right and slightly toward the viewer, his tail end stays on the left and slightly farther away. His head follows the body: a three-quarter face turned to the right, the near eye clearly visible and the far eye partly visible, the muzzle pointing right and slightly toward the camera, the same calm smile. Use 图片2 only as the reference for this amount of body and head turn toward the camera (about 25 to 30 degrees off a side view); do NOT copy its running pose, open mouth, motion blur, stretched legs, studio light stand or background.

The dog must NOT face the camera head-on and must NOT be a pure side profile. The background must stay light gray, not dark. All four paws stay planted still on the floor, no motion blur, sharp focus.
```
- Итог: принята как рабочая. Повернуто примерно на 10–15° вместо 25°; задние лапы всё ещё чуть подогнуты; на правом краю появилась стойка света (убрана в END-кадре заливкой градиента без касания собаки).

## 4. STOP v1 — УТВЕРЖДЁН (полный вариант A)
- Инструмент `image_to_video`, модель `kling-video-v3_0`, first_image = `DOG1_STOP_START.png`, tail_image = `DOG1_STOP_END.png`, duration 3, resolution 720p, enable_audio false, prefer_multi_shots false, imageCount 1, **18 кредитов**.
- generationId `AVCNp1X01jED1Ehwpnk_GAgQ-75EMYVZ9ugNUq-eI8btku1DqOzfCThhlVWJ36CW2FrHOYUg`
- Видео: 1276×720, 24 fps, 73 кадра (3,042 с), h264, **без водяного знака** (брали `urlWithoutWatermark`). Файл `assets/approved/DOG1_STOP_v1_kling_source.mp4`, SHA `30c058904313683007a7ec6e183669ad0c459432bfa80c1eafc9f5158457edf5`.
- Промпт (дословно):
```
A stocky fawn-beige French bulldog with a white chest and a dark gray muzzle is galloping to the right in a locked three-quarter side view and comes to a natural stop. The first frame shows him mid-gallop with his front paws reaching down to the floor; the last frame shows the same dog standing completely still on all four paws a short distance ahead.

Gradual, physically believable braking: the front paws plant ahead of the body and take the weight, the shoulders and chest drop slightly, the head lowers a little, and the hind paws swing forward and step under the hips. The body keeps moving forward a short distance while it slows down, and the dog makes two or three short steps, each one shorter, slower and heavier than the previous one; the bouncing and the stretching of the gallop fade away, the ears settle, and the motion blur disappears as the movement slows. Then the last step lands, the chest rises, the back becomes level, the head lifts, and he stands relaxed and perfectly still on all four paws, exactly like in the last frame, with a calm closed-mouth smile and upright ears. Only a very short moment of stillness at the end.

The camera is completely fixed: no zoom, no pan, no shake, no change of angle. The dog moves forward only a little within the frame, ending exactly where the last frame shows him. Plain seamless light-gray studio backdrop and floor, a soft contact shadow under the paws, the same soft lighting throughout. Natural weight transfer, paws never slide or float, every paw that touches the floor stays planted until it lifts. The same dog in every frame: the same face, fur color, white chest, ears and proportions; no change in size. No other animals, objects, butterflies, text or logos, no extra legs, no jump, no turn toward the camera, no sudden pose change.
```
- Итог: первый и последний кадры совпадают с START и END (1,5 и 1,8 из 255), продвижение вперёд +92 px, финальная стойка около 0,5 с, внешность держится, **но торможения как такового нет**: галоп продолжается около 2 с, затем за 5–6 кадров (50–56) резкая перестройка в стойку, задняя лапа в 50–53 «превращается». Пользователь оценил на глаз как нормальное торможение и принял вариант A. Дефекты записаны в `KNOWN_ISSUES.md`.
- Подготовка START/END: START = кадр #97 RUN (из утверждённого alpha) на плите фона из RACE_STAND v3 + мягкая тень; END = RACE_STAND v3 без стойки света, прямое уменьшение ×0.469 до 1276×720, затем сдвиг на 125 px вправо (в первой версии END было 35 px, потом добавили ещё 90, чтобы оставить место для продвижения) и на 6 px вверх (выровнять линию земли с START: 682 против 680). Подробности и измерения (размер головы, цвет, резкость, почему коррекции не делались) — `plans/STOP_prepare_notes.md`.

## 5. RACE_START V1 — сгенерирован, НЕ принят
- `image_to_video`, `kling-video-v3_0`, first_image `race_start_prep/DOG1_RACE_START_START.png`, tail_image `race_start_prep/DOG1_RACE_START_END_run90.png`, duration 3, 720p, enable_audio false, prefer_multi_shots false, imageCount 1, **18 кредитов**.
- generationId `AUNtTY6feBLC5ETys0U9h0EBWbw6h78Xgtq1W-m5tGa5v_GZGdspYSEbonR60Asv4NnZIDME`.
- Промпт дословно: `race_start_v1/prompt_sent.txt` (= итоговый в `plans/RACE_START_PLAN_v2.md`).
- Файл `race_start_v1/DOG1_RACE_START_v1_kling_source.mp4`, 73 кадра, SHA `826c73fd…6e50`, без водяного знака.
- Итог: последний кадр не совпал с RUN #90 (IoU 0,564, цвет 30,7), подкрадывание ≈1,2 с до галопа, рывок f29–34 с тёмным лицом, ритм 9 кадров. Подробности — `plans/RACE_START_V1_REPORT.md`.
