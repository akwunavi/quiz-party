# Рокки №3 — SNIFF_PEE: отклонённые варианты (история)

Оба варианта сделаны текстовым подходом: `kling-video-v3_0`, 10 с, 720p, без звука, first = tail = утверждённая RACE_STAND. **Пользователь отклонил оба: поза метки неправильная — задняя лапа подтягивается под корпус, а не отводится в сторону.** Тот же текст переписывать и запускать ещё одну генерацию Kling 3.0 не нужно (решение 22.10.2026). Исходники не удалять и не перезаписывать.

| Версия | Промпт | Generation ID | Кредиты | Файлы | Почему отклонена |
|---|---|---|---|---|---|
| v1 | [PROMPT_V1_REJECTED.txt](PROMPT_V1_REJECTED.txt) (дословно `sniff-pee-prep/KLING_PROMPT.txt`, commit `411bc32`) | `AVueEISC56VT3GF34LTpJIFP3I5The7_cCYShvPk9ZUT0x1nRvKrO113oJQAKJK4PJG-D4po` | 60 | [`../sniff-pee-generation-v1/`](../sniff-pee-generation-v1/) | Лапа подтянута под живот, читается как почёсывание; нюх ~3 с с глубоким поклоном; корпус развернулся грудью к камере. |
| v2 | [PROMPT_V2_REJECTED.txt](PROMPT_V2_REJECTED.txt) (правки ревью + касание языком) | `AfcXjfjCRlk-7FlKwcfUasFJLXKvOQtmSKpR6rFUflcJinobR7j5g0dDevTDrRRpoA8_o-m6` | 60 | [`../sniff-pee-generation-v2/`](../sniff-pee-generation-v2/) | Нога неподвижна, но снова поджата под корпус, а не отведена в сторону; язык ≈1 с; ракурс уходит к камере на ≈100–180. |

Что общего: слова «outward from the hip / knee bent / lower leg hanging down and slightly backward» не задают **высоту и место лапы**; Kling выбирает самое близкое к стойке положение (лапа под животом). Запреты («no scratching» и т. п.) не помогли. Вывод: нужна картинка позы как цель, а не только текст. Новый подход — `../sniff-pee-marking-pose-v1/`.

Итого потрачено на отклонённые варианты: 120 кредитов (2 × 60).
