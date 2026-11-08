# Луна — заготовка генерации RUN (НЕ запускалась; только после приёмки RACE_STAND G1)
## Параметры
`kling-video-v3_0`, 5 с (121 кадр, 24 к/с), 720p, одна сцена, без звука, **first = RACE_STAND G1** (`DOG5_RACE_STAND_G1_1276.png`), tail не задаётся (бег). Ориентир — 30 кредитов.

## Промпт (только то, что должно быть)
> Luna, the same cartoon French bulldog with the white coat and black-gray patches, starts from this calm standing pose and breaks into an energetic, stretched gallop to the right: front legs reach far forward, hind legs push far back, ears flap with each stride, happy open-mouthed smile. She keeps running steadily at the same speed for the rest of the shot, staying in the middle of the frame while the camera tracks her smoothly from the side at the same height and distance. The same plain gray studio with a soft floor and a soft shadow under her paws, the same lighting throughout.

## Что проверяю после генерации (как требует задача)
* фактический период шага (поиск лучшего стыка для длин 8–16 кадров, как в `stage3_run/`), и есть ли **12 подряд кадров** с чистым швом — без повторов и дорисовок;
* контакт лап с полом, устойчивость корпуса, рост и центр против RACE_STAND и соседей;
* минимум 10 повторов цикла в реальном времени рядом с Фрэнком, Зефиром и Пупсом в масштабе игры;
* пригодность для будущих START и STOP: начало клипа (стойка → разгон) может дать START прямо из того же видео, как у Пупса (START = RUN #0–39); фаза кадра перед STOP — по правилу T4;
* alpha общим конвейером, фон не меняется по ходу клипа.

## Риск
Длину шага Kling не задать текстом: может снова выйти 10 или 11 кадров. Тогда генерация **не объявляется успешной**, повтор — только по согласованию.
