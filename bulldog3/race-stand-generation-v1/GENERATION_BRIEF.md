# RACE_STAND №3 — подготовка одного image-to-image запуска

Статус: **ожидается отдельное решение пользователя из-за неизвестной цены**. Генерация ещё не запускалась. Вход — побайтная копия утверждённого [RUN #63 на ровном фоне](../reviews/race-stand/DOG3_RUN_BODY_REF_063_NEUTRAL.png): `INPUT_RUN_063.png`, SHA-256 `ecb7b76fc94d97298f89968acde1dd66dde17847c7c9548dcc3ae8b3ba3cd9fe`.

Доступный инструмент `image_gen__imagegen` поддерживает редактирование по локальному изображению, но его интерфейс не сообщает цену или расход кредитов и не предоставляет предварительную оценку. По прямому условию пользователя вызов без отдельного разрешения **запрещён**. Запланирован ровно один вызов с одним исходным изображением; дополнительные варианты и видео не заказывать.

## Prompt для единственной генерации

Это подготовленный английский prompt из [RACE_STAND_PLAN.md](../RACE_STAND_PLAN.md) с одной поправкой по новому требованию пользователя: **допускается только мягкая контактная тень непосредственно под лапами**. Старая тень RUN не переносится.

```text
Edit the attached reference image of this exact French bulldog into one static, anatomically natural RACE_STAND. Treat the image as a strict identity, scale, framing, lighting, and right-facing side-three-quarter view reference. Preserve the same dark charcoal-grey coat and subtle markings, compact muscular torso, broad chest, short back, small tail, large upright ears with their existing shape and inner color, amber eyes, short folded muzzle, face, head shape, and body proportions. Keep the camera fixed at the same height and keep the dog at the same size and position in a 1276x720 frame. Do not rotate the dog toward the viewer.

Change the running pose into a calm, stable, balanced standing pose. All four distinct paws must be visibly planted on one horizontal ground line, with believable shoulders, hips, joints, and weight distribution. The torso must be neutral and still, not suspended or stretched in a running phase. Keep the head looking right at approximately the same height and angle as in the reference, and keep both ears upright. Change only the legs and the minimum body height needed for a physically plausible four-paw stand.

Use a plain uniform neutral background. A soft, small contact shadow directly beneath the planted paws is allowed; do not retain or recreate the original running shadow or floor. Keep the full dog visible with safe margins. No running, jumping, sitting, floating paws, duplicate or missing limbs, stretched body parts, camera movement, change of viewpoint, props, studio equipment, text, or watermark. Produce exactly one sharp still image, not a video.
```

## Проверка результата после разрешения и запуска

Сохранить исходный результат без правок в этой директории. `REF_RUN_069.png` — дословно извлечённый source #69. Скрипт `python3 make_comparison.py ПУТЬ_К_ОРИГИНАЛУ.png` соберёт сравнительный PNG с:

1. [RUN source #63](../reviews/race-stand/DOG3_RUN_SOURCE_063.png) — основной ракурс и пропорции;
2. RUN source #69 из [листа цикла](../reviews/race-stand/DOG3_RUN_61-72_POSES.png) — фаза передней опоры;
3. [FRONT_STAND IDLE #0](../reviews/asset-intake/DOG3_FRONT_STAND_SOURCE_000.png) — идентичность персонажа;
4. сгенерированным RACE_STAND — четыре опоры, голова, масштаб, корпус и отсутствие исходного пола/тени.

Если один результат не проходит проверку, зафиксировать дефект и остановиться. Дополнительную генерацию не выполнять.
