# Bulldog №3 — RACE_STAND: референс и план согласования

Статус этапа референсов: выбран RUN #63. **Обновление:** по отдельному разрешению пользователя сделана одна статичная image-to-image генерация; её результат и ограничения описаны в [race-stand-generation-v1/RESULT_REVIEW.md](race-stand-generation-v1/RESULT_REVIEW.md). Этот документ сохраняет исходный выбор референса и требования. Kling, видео, новый маттинг и production не запускались.

## Материалы для просмотра

- [Все позы рабочего цикла #61–72](reviews/race-stand/DOG3_RUN_61-72_POSES.png) — точная покадровая разметка source и alpha-v2.
- [Сравнение FRONT_STAND / референса #63 / фазы опоры #69](reviews/race-stand/DOG3_RACE_STAND_REFERENCE_COMPARISON.png). Средняя панель намеренно **остаётся беговым кадром**, без дорисованных лап.
- [Исходный source #63](reviews/race-stand/DOG3_RUN_SOURCE_063.png) — RGB кадр 1276×720 без правки, с исходным студийным фоном.
- [Референс корпуса #63 на ровном фоне](reviews/race-stand/DOG3_RUN_BODY_REF_063_NEUTRAL.png) — тот же момент из уже существующего alpha-v2 #27, просто скомпонованный на ровном фоне. **Новый alpha не создавался.** Это рекомендуемое входное изображение для будущего создания RACE_STAND, а не изображение готовой стойки.

Все номера кадров нулевые; source #63 = 63/24 = **2,625 с** = alpha-v2 #27.

## Выбор референса

| Кадры | Плюсы | Почему не готовый RACE_STAND |
| --- | --- | --- |
| #61–62 | Голова высоко; один задний контакт, корпус компактный. | Передние лапы подняты, грудь движется вперёд; у #61 лапы сильнее перекрываются. |
| **#63 — основной** | Чёткие морда, глаза, оба уха, линия спины и круп; боковой с небольшим видимым фронтом ракурс; тёмный окрас без позднего высветления. Задняя лапа на линии земли. | Обе передние лапы находятся в беговой фазе над полом. Вторая задняя лапа тоже не в нейтральной опоре. |
| #64–68 | Более вытянутый боковой силуэт. | Фаза прыжка и сильное вытяжение корпуса/лап: плохая основа для спокойной стойки. |
| #69–70 | Передняя лапа приближается к полу и показывает постановку конечности. | Обе задние лапы в движении/воздухе, корпус ниже, местами заметен смаз. |
| #71–72 | Корпус снова компактнее. | Все лапы переходят к следующему толчку; нейтральной опоры нет. |

Для #63 непрозрачный контур в существующем alpha-v2 ограничен примерно **x=263–955, y=17–660** в исходном кадре 1276×720 (порог alpha>128). Это рамка референса, **не** требование пиксельной фиксации всех конечностей: их необходимо естественно поставить на землю. Уровень опоры — около **y=650–660**, с четырьмя различимыми лапами и анатомически правильными суставами. Сохранять масштаб, позицию корпуса и голову как визуальные ориентиры; не растягивать беговой кадр и не переносить передние лапы вручную.

## Сравнение с архитектурой B

| Параметр | FRONT_STAND (IDLE #0) | RUN #63 и будущий RACE_STAND |
| --- | --- | --- |
| Ракурс | Фронтальный / три четверти вправо. | Правый боковой с небольшой видимой дальней стороной лица; держать ракурс #63. |
| Лапы | Четыре опорные лапы, но в другом ракурсе. | #63 имеет передние лапы в воздухе; новая стойка должна опираться на **все четыре**. |
| Корпус/голова | Исходная поза для выбора. | Сохранить видимые пропорции, короткую морду, уши, шею, круп, хвост и тёмный окрас #63. |
| Применение | IDLE, SELECTED, первый START. | STOP, события, RACE_START, FINISH; необходима проверка настоящих переходов после создания. |

FRONT_STAND нельзя повернуть и выдать за RACE_STAND: на противоположной стороне корпуса и лапах не хватает информации, а ракурс головы будет отличаться от RUN. Беговой #63 нельзя статично удерживать как стойку: передние лапы останутся в воздухе. **Полноценный RACE_STAND потребует создания нового изображения или короткого клипа и последующей визуальной проверки.**

## Готовый prompt для будущего image-to-image создания стойки

**Вход:** `DOG3_RUN_BODY_REF_063_NEUTRAL.png` как основной image reference. `DOG3_FRONT_STAND_SOURCE_000.png` можно использовать только как дополнительный identity reference, если инструмент поддерживает независимые reference slots; не копировать его фронтальный ракурс. Цель — один кадр 1276×720. Не запускать генерацию до согласования пользователем.

```text
Use the attached image as the strict identity, scale, framing, and right-facing side-three-quarter view reference for this exact dark charcoal-grey French bulldog. Keep the same compact muscular torso, broad chest, short back, small tail, large upright ears with their existing shape and inner color, amber eyes, short folded muzzle, facial markings, dark coat, small warm chest marking, and lighting. Keep the camera locked at the same height and keep the dog in the same position and size in the 1276x720 frame.

Create one calm, anatomically natural RACE_STAND pose. The dog is standing still, balanced on all four separate paws on one horizontal ground line. Both front paws and both hind paws visibly touch the ground, with believable shoulders, hips, joints, and weight distribution. Keep the head looking right at approximately the same height and angle as in the reference, and keep the ears upright. Change only the running leg pose and the minimum torso height needed for a physically plausible four-paw stand. Preserve the head and body proportions; do not rotate the dog toward the camera.

Use a plain uniform neutral background. The full dog must remain visible with safe margins. No running, jumping, sitting, floating paws, duplicate or missing limbs, stretched body parts, camera movement, props, studio equipment, original floor, contact shadow, text, or watermark. Output a single sharp reference still.
```

Если доступен только image-to-video режим, та же поза должна быть **конечным удерживаемым кадром**: естественно поставить все четыре лапы, затем удерживать неподвижную стойку минимум 1 с; брать кадр только после остановки. Нельзя считать статический кадр, полученный генерацией, совместимым с STOP/RACE_START без тестового видео настоящих переходов.

## Приёмочные ворота следующего шага

1. Пользователь согласует именно референс #63, правый боковой ракурс и тёмный окрас либо указывает другой кадр. До этого Kling не запускать.
2. После создания новой стойки проверить четыре лапы, форму головы/ушей, корпус, отсутствие студийного оборудования и тени, масштаб и линию земли против RUN #63/#69 и FRONT_STAND #0.
3. Затем отдельно проверять `RUN → STOP → RACE_STAND → RACE_START → RUN`; совпадение силуэтов не заменяет проверку естественной работы лап и поворота корпуса.
