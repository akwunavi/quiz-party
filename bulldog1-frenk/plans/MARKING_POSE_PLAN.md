# MARKING_POSE — подготовка эталона (14.10.2026), генерация НЕ запущена
Это отдельное целевое изображение для будущего SNIFF_PEE. RACE_STAND v3 и остальные ассеты не меняются.

## Проверка системы (Kling MCP, `image_to_image`)
- Редактирование по конкретному изображению поддерживается: до 10 референсов, ссылка на кадр как 图片1. Доступны `kling-image-v3_0_omni` (использовался для всех RACE_STAND), `kling-image-o1`, `kling-image-v3_0`, Nano Banana 2, Nano Banana Pro, GPT-Image2.
- **Локального редактирования по маске (inpainting таза и лапы) в инструменте нет**: нет входа для маски, только текстовая правка всего кадра. Локальная правка возможна лишь словами в промпте (меняем только заднюю лапу и опорный наклон таза); сохранение остальных пикселей модель не гарантирует, это проверяется наложением после генерации.
- Остаток кредитов: 225.

## Параметры запуска (предлагаются, ждут согласования)
| поле | значение |
|---|---|
| инструмент / модель | `image_to_image` / `kling-image-v3_0_omni` (тот же, что дал RACE_STAND v3) |
| image_1 (图片1) | PRIMARY C1b: `sniff_prep/DOG1_SNIFF_PEE_START_END_racestand.png`, SHA 5d873c41…c0a6 (1276×720) |
| другие референсы | не подаются (C3/C4 только для сравнения глазами, автоматически не смешиваются) |
| разрешение / ратио | 2k, 16:9 (вход 1276×720 ≈ 16:9) |
| количество | 1 изображение |
| **стоимость** | заранее запросить нельзя (инструмент цену не отдаёт, она подтверждается при отправке). **Прецедент на этом аккаунте: ровно 2 кредита** за тот же инструмент/модель/2k/16:9/1 изображение (RACE_STAND v1, v2, v3). Ожидаемо 2 кредита; верхняя граница, которую прошу утвердить: 4 кредита |

## Промпт (один, английский)
Edit 图片1. Keep the exact same French bulldog with identical face, ears, fawn-beige fur, white chest and dark gray muzzle, in the same three-quarter side view facing right, with the same camera, the same scale, the same position in the frame, the same seamless light-gray studio background, the same soft lighting and the same soft contact shadow. Change only the pose of the hind leg nearest to the camera: the dog performs a natural male-dog marking leg lift. The near hind leg is lifted off the floor; the thigh swings outward from the pelvis to the side, toward the camera, and slightly forward; the knee is bent and sits at about the height of the lower belly, in front of the rump; the lower leg hangs down and slightly back from the knee; the paw is relaxed and clearly visible beside the belly, well in front of the tail. The far hind leg stays planted on the floor under the pelvis and carries the weight; both front paws stay planted exactly where they are in 图片1. The pelvis tilts slightly, the back stays level, the body is balanced and not stretched. The head is raised and looks ahead to the right with a calm, slightly mischievous expression, the ears upright. Anatomically correct dog with exactly four legs, sharp focus, clean empty floor.

## Приёмка после генерации (семь пунктов задания)
1. Поднята ближняя задняя лапа. 2. Лапа идёт вбок/вперёд от бедра, не назад. 3. Четыре конечности корректны. 4. Три опорные лапы на прежних местах (сверка наложением на C1b). 5. Морда, уши, окрас без изменений. 6. Нет растяжения корпуса, лишних конечностей, смены масштаба. 7. Годен как целевой кадр image-to-video. Сохраняются: оригинал Kling, копия 1276×720 для видеосервиса, сравнительное наложение (разностная карта и полупрозрачное совмещение). Статус «утверждён» — только после визуальной приёмки пользователем.
