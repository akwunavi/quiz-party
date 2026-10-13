# Френк (Bulldog №1) — комплект для создания RACE_STAND

Статус: комплект согласован пользователем (13.10.2026) с уточнениями ниже. **Блокер: оригинал `bulldog_01_master.png` в сессию не дошёл** (приложен был только как встроенная картинка, файла нет). Изображение НЕ создавалось, Kling не запускался. Production, Race V3 и Bulldog №4 не затронуты.

## 0. Уточнения пользователя (приоритет над текстом ниже)

1. Внешность строго из оригинального `bulldog_01_master.png`, не из пережатой копии. Файл 01 в этой папке — только копия для сравнения, в генератор не подавать.
2. #79 и #90 — только направление корпуса, головы и камеры, не поза бега.
3. Размеры и координаты из раздела 2 — ориентиры для последующего выравнивания, а не повод деформировать собаку. Нарушение пропорций master хуже промаха по масштабу.
4. Для будущего ROLL жёсткого предела 5–6 с нет: важнее полноценное валяние на спине (опыт №4: фактическая длительность определяется действием).

## 1. Файлы комплекта

| № | Файл | Назначение | SHA-256 |
|---|---|---|---|
| 1 | `01_master_FRONT_chatcopy_2000x1129.png` | эталон внешности и пропорций Френка (копия кадра из чата, 2000×1129; **оригинальный `bulldog_01_master.png` как файл не получен** — к генерации взять оригинал) | `2b783ffa…ed28d` |
| 2 | `02_run_frame_079_1276x720.png` | референс **направления корпуса** (кадр #79 оригинального RUN, без обработки) | `1cbfe86b…ea77` |
| 3 | `03_run_frame_090_1276x720.png` | референс **головы/ушей/ракурса** (кадр #90) | `ca07762b…c5b8` |
| 4 | `04_run_frame_079/090_alpha_on_neutral.png` | те же кадры из `dog1-run-alpha.webm` на нейтральном фоне — для сравнения силуэта, в генератор не подавать | `f8912462…0c88`, `ae77a6a6…f310` |

Кадры #79 и #90 взяты из `bulldog_01_run.mp4` (SHA `bacae613…`) без перекодирования масштаба: PNG 1276×720 с водяным знаком и студийным фоном. В генератор подаём файлы 1–3. Водяной знак «KlingAI» на референсах 2–3 в изображении повториться не должен.

## 2. Геометрия, под которую нужна стойка (измерено на RUN loop #87–98)

Холст 1276×720, такой же как у RUN.

- Линия земли (низ лап): y ≈ 655–660 (медиана RUN 658).
- Высота собаки от верха ушей до земли: ≈ 520–560 px (RUN: медиана 537, диапазон 517–583).
- Горизонтальный центр собаки: x ≈ 590 (RUN: 264–918, медиана центра ≈ 591).
- Стоящий Френк короче растянутого галопа (649 px по ширине в RUN), поэтому ширина стойки ожидается ≈ 450–520 px. Требовать «растянуть до 650» нельзя.
- Бежит вправо: морда справа.

Это ориентиры. Выравнивание масштаба и линии земли делается позже трансформом при подготовке клипов; собаку для этого не деформируем. Стартовое изображение желательно близко к этим числам, но пропорции master важнее.

## 3. Финальный промпт (английский)

Режим: image-to-image / reference-based. Референсы: master (identity), #79 (body direction), #90 (head and ear direction).

```
Using the first reference image as the identity and proportion master: the same fawn-beige French bulldog "Frenk" — soft tan fur, a white chest patch, a dark gray muzzle, large dark brown eyes with a warm gentle expression, large upright bat ears with pink inner ear, a short curled tail, wide chest, compact muscular body, very short sturdy legs. Same stylized 3D animated-film rendering, same fur detail and soft studio lighting as the master.

Create ONE still image of this exact dog standing completely still, relaxed and alert, on all four paws, with his body turned to the right of the frame in a three-quarter view, as seen in the second and third reference images (take ONLY the body direction, camera angle and head turn from them — not their running pose, stretched legs, open mouth, motion blur, or studio stand in the background). His chest and body point right; his head also faces mostly right, slightly turned toward the camera so the face stays recognizable, mouth closed or very slightly open in a calm smile, ears upright as in the master.

All four paws are planted flat on the floor with natural weight distribution: both front legs straight and parallel under the shoulders, both hind legs standing under the hips (the far legs partly hidden behind the near ones, correct for a three-quarter view), body horizontal, back level, tail visible behind. Compact standing proportions exactly as in the master — NOT stretched, NOT mid-stride, NO raised paws.

Locked camera at dog's eye level, fixed framing, full body visible with some margin around the ears and paws. Frame 16:9 (1276x720). The dog's height from ear tips to paws is about 75% of the image height, his paws touch the floor line at about 91% of the image height, his body centered horizontally. Plain seamless uniform soft light-gray studio backdrop and floor with no objects, no light stands, no gradient hot spots, no text or watermark; only a very soft contact shadow directly under the paws. Sharp focus across the whole dog, crisp fur edges, no motion blur.
```

Негативный список короткий, только то, что защищает нужное:
`running pose, mid-air paws, motion blur, extra legs, different face, different coat color, front-facing view, text, watermark, background props`.

## 4. Критерии проверки результата

Принять, только если выполнено всё:

1. Это Френк: цвет шерсти, белая грудь, тёмная морда, форма и посадка ушей, глаза, хвост совпадают с master (сравнить рядом).
2. Все четыре лапы на земле, ни одна не поднята и не в шаге; ближние лапы целиком видны, дальние закрыты корпусом корректно.
3. Тело горизонтально, пропорции короткие и приземистые, как в master, без растяжения в галоп.
4. Корпус и голова направлены вправо, угол сопоставим с #79/#90 (смотреть на силуэты в окне 04).
5. Резко, без размытия движения, кромка шерсти чёткая.
6. Полное тело в кадре; масштаб/линия земли/центр близки к ориентирам раздела 2 (не критично, подгоняется трансформом).
7. Фон однородный, без стойки/полос/подсветки, без текста и водяного знака; тень только мягкая под лапами.
8. Мордочка узнаваема (голова чуть к камере), рот не открыт во всю ширину, как в беге.
9. Тот же стиль рендера и освещение, что у master.
10. Отказ при любом: поза «из бега», лишние/потерянные лапы, другая порода/окрас, развёрнутая в камеру собака.

Проверка делается тремя картинками рядом: master | результат | #79.

## 5. План использования утверждённой RACE_STAND

Общее правило: каждый клип сначала проверяется как исходный Kling, потом alpha, потом стык. Опорную позу берём как Start/End Frame; для входов из бега стартовый кадр — реальная фаза RUN, не красивая картинка.

| Клип | Начальный кадр | Конечный кадр | Что нужно проверить |
|---|---|---|---|
| **STOP** | кадр цикла #87–98, фаза, из которой торможение естественно (ориентир — собранная фаза #87/#88; решается по просмотру) | RACE_STAND | торможение по ступеням, а не стойка из воздуха; хвост STOP не стоит неподвижно |
| **RACE_START** | RACE_STAND | кадр, совместимый с циклом #87–98 (в первом START был стык #63→#87) | не держать лишнюю паузу; сначала искать спасаемый кусок готового разгона (#38–63), и только потом генерировать |
| **BUTTERFLY** | RACE_STAND | RACE_STAND | только собака; бабочка отдельный программный объект; 3–4 с хватит |
| **SNIFF_PEE** | RACE_STAND | RACE_STAND или поза, из которой есть естественный RETURN | RETURN генерировать только если конец не совпал со стойкой |
| **ROLL** | RACE_STAND | RACE_STAND | центральная фаза на спине несколько секунд; длительность не ограничиваем жёстко: главное — несколько секунд покачивания на спине, затем естественный подъём |
| **FINISH** | — | — | сначала проверить, годится ли STOP (дешевле всего) |

Цепочки остаются те же: `RUN → STOP → событие → RACE_START → RUN`. FRONT_STAND (кадр #0) используется только для выбора, IDLE, SELECTED и самого первого START (#25–63).

Порядок генераций после утверждения стойки: STOP → RACE_START → (alpha) → BUTTERFLY → SNIFF_PEE(+RETURN) → ROLL → FINISH; каждый — отдельный gate с вашей приёмкой.

## 6. Что ещё не решено

- **Оригинальный `bulldog_01_master.png` нужен для генерации** — в сессии файла нет (поиск по диску и веткам репозитория ничего не дал).
- Alpha-конвейер не трогали и не перестраивали (по вашему указанию до утверждения стойки).
- Размытия и «двойных» задних лап в кадрах #87–89 RUN это не касается, но мы их помним при приёмке цикла.
