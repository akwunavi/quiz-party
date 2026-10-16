# ROLL Зефира — промпт v2 (16.10.2026). Kling не запускался
Основа — принятый ROLL Фрэнка. Каждая правка закрывает конкретную проблему, которая уже была у Зефира или Фрэнка.

| Проблема | Где была | Что в промпте |
|---|---|---|
| Голова пропала на спине | ROLL v1 r25–r91 | прямо сказано, где голова (у правого конца тела, лежит на полу) и что морда, глаза, розовый нос и оба уха видны всё время; «one head» в анатомии |
| Белый живот сливается с белой головой | ROLL v1 | убрано «white chest and belly facing the sky»; вместо «belly up» — «onto his back», без акцента на белом брюхе |
| Пасть с зубами | ROLL v1, STOP v1, STOP v2 | позитивно: «mouth stays closed, calm happy face»; в запретах «no open mouth» (сработало в STOP v2) |
| Вставание через разворот к камере | ROLL v1 r94–r103 | «rolls back the same way onto his belly, keeps facing right» |
| Лишние шаги и «доход» на место в конце | STOP v2, bridge v1 | та же картинка в начале и в конце (схема Фрэнка) + «stands still until the end» + «no extra steps» |
| Посадка | bridge v1 | «no sitting» |
| Длинный список запретов работает хуже | урок 5 Фрэнка | 6 запретов |
| Тайминги Kling не выполняет | урок 1 Фрэнка | секунд нет, только «most of the clip», как у Фрэнка |
| Парные лапы (главное требование ROLL) | Фрэнк | сохранено дословно |

```
The same white French bulldog with big pink ears and a pink nose, side view facing right, standing on all four paws exactly as in the first frame. He lies down onto his side and rolls over onto his back, paws up in the air. While he is on his back, his head stays at the right end of his body, resting on the floor, and his face, eyes, pink nose and both big ears stay clearly visible the whole time. He squirms happily, rubbing his back on the floor from side to side. His two front paws move together as a pair, bent at the wrists, paddling up and down in sync, and his two hind legs kick together as a pair in sync, stubby tail wagging. His mouth stays closed, with a calm, happy face. He stays on his back for most of the clip. Then he rolls back the same way onto his belly, keeps facing right, pushes up with his front legs first, stands up on all four paws in exactly the same pose and the same spot as in the last frame, and stays still until the end. He stays in the same place on the floor at the same size. Static camera, same framing, same plain studio background and lighting. One dog with one head, four legs and one tail.

No jumping, no running, no sitting, no extra steps, no open mouth, no objects.
```

Параметры без изменений: `kling-video-v3_0`, first = last = RACE_STAND #30 (`KLING_FIRST_AND_LAST_RACE_STAND_RUN30_1276.png`), 5 с, 720p, 1 видео, без звука, prefer_multi_shots false — **30 кредитов**.

Остаточный риск: полностью белая собака на спине всё равно может потерять читаемость головы. Если повторится — следующий шаг не промпт, а поза: «на боку» вместо «на спине» (голова в профиль всегда видна), это отступление от ROLL Фрэнка, решать тебе.
